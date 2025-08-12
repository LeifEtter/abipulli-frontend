import {
  faBrush,
  faEraser,
  faMagicWandSparkles,
  faPaintbrush,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Image } from "abipulli-types";
import Konva from "konva";
import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import { JSX, useEffect, useMemo, useRef, useState } from "react";
import { Layer, Stage, Image as KonvaImage } from "react-konva";
import { ImageApi } from "src/api/endpoints/image";
import { BasicButton } from "src/components/Buttons/BasicButton";
import { StaticImage } from "src/components/Designer/CanvasImages";
import { InputField } from "src/components/Inputs/InputField";
import { PageDescription } from "src/components/Texts/PageDescription";
import { PageTitle } from "src/components/Texts/PageTitle";

export const Route = createFileRoute("/_auth/vorschau/$imageId/verbessern")({
  component: RouteComponent,
});

function RouteComponent() {
  const [tool, setTool] = useState<string>("brush");
  const [strokeWidth, setStrokeWidth] = useState<number>(50);
  const isDrawing = useRef<boolean>(false);
  const imageRef = useRef<any>(null); // Konva.Image or null
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const [improvementText, setImprovementText] = useState<string>();

  const { canvas, context } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 25;
    const context = canvas.getContext("2d");
    if (context) {
      context.strokeStyle = "#df4b26";
      context.globalAlpha = 1;
      context.lineJoin = "round";
      context.lineWidth = strokeWidth;
    }
    return { canvas, context };
  }, []);

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const stage = e.target?.getStage?.();
    lastPos.current = stage?.getPointerPosition?.() ?? null;
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleMouseMove = (
    e: KonvaEventObject<MouseEvent | TouchEvent, Node<NodeConfig>>
  ) => {
    if (
      !isDrawing.current ||
      !imageRef.current ||
      !context ||
      !lastPos.current ||
      !e.target.getStage()
    )
      return;
    context.lineWidth = strokeWidth;
    const image = imageRef.current;
    const stage: Konva.Stage = e.target.getStage()!;

    context.globalCompositeOperation =
      tool === "eraser" ? "destination-out" : "source-over";
    context.beginPath();

    const localPos = {
      x: lastPos.current.x - (image.x?.() ?? 0),
      y: lastPos.current.y - (image.y?.() ?? 0),
    };
    context.moveTo(localPos.x, localPos.y);

    const pos = stage.getPointerPosition?.();
    if (!pos) return;
    const newLocalPos = {
      x: pos.x - (image.x?.() ?? 0),
      y: pos.y - (image.y?.() ?? 0),
    };
    context.lineTo(newLocalPos.x, newLocalPos.y);
    context.closePath();
    context.stroke();

    lastPos.current = pos;
    image.getLayer?.()?.batchDraw?.();
  };

  const { imageId } = useParams({ strict: false });
  const [image, setImage] = useState<Image | null>(null);

  useEffect(() => {
    const getImage = async () => {
      if (!imageId) return;
      try {
        const fetchedImage = await ImageApi.fetch(imageId);
        setImage(fetchedImage ?? null);
      } catch {
        setImage(null);
      }
    };
    getImage();
  }, [imageId]);

  const Toolbar = () => (
    <div className="flex flex-row justify-start mt-6 mb-2 gap-2">
      <div
        onClick={() => setTool("brush")}
        className={`${tool == "brush" ? "bg-black text-white" : "bg-white text-black"} flex flex-row items-center gap-2 py-1 px-2 rounded-md cursor-pointer shadow-md`}
      >
        <FontAwesomeIcon icon={faBrush} className="text-xl" />
        <p className="text-xl font-semibold ">Markieren</p>
      </div>
      <div
        onClick={() => setTool("eraser")}
        className={`${tool == "eraser" ? "bg-black text-white" : "bg-white text-black"} flex flex-row items-center gap-2 py-1 px-2 rounded-md cursor-pointer shadow-md`}
      >
        <FontAwesomeIcon icon={faEraser} className="text-xl" />
        <p className="text-xl font-semibold ">Entmarkieren</p>
      </div>
      <div className="flex flex-row items-center gap-2 bg-white rounded-md justify-start py-1 px-2 shadow-md">
        <p className="font-semibold text-xl">Breite:</p>
        <input
          type="number"
          value={strokeWidth}
          className="rounded-md special-shadow pl-1 border-2 w-14 bg-gray-100 font-semibold"
          onChange={(e) => setStrokeWidth(parseInt(e.target.value ?? 50))}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col items-start">
        <div className="card">
          <PageTitle>Verbessere dein Bild</PageTitle>
          <PageDescription>
            Markiere den Ort des Bildes welches verbessert werden soll und
            beschreibe genau wie du es verbessern willst.
          </PageDescription>
        </div>
        <div className="flex flex-col">
          <Toolbar />
          {image ? (
            <div className="flex flex-row gap-2 items-start">
              <div className="bg-white p-6 rounded-2xl">
                <Stage
                  width={450}
                  height={450}
                  onMouseDown={handleMouseDown}
                  onMousemove={handleMouseMove}
                  onMouseup={handleMouseUp}
                  onTouchStart={handleMouseDown}
                  onTouchMove={handleMouseMove}
                  onTouchEnd={handleMouseUp}
                >
                  <Layer>
                    <StaticImage width={450} src={image.url} />
                    <KonvaImage ref={imageRef} image={canvas} x={0} y={0} />
                  </Layer>
                </Stage>
              </div>
              <div className="card p-6 flex flex-col items-center">
                <InputField<string>
                  value={improvementText ?? ""}
                  onChange={(e) => setImprovementText(e)}
                  label="Wie soll es verbessert werden?"
                  multiline={true}
                  minLines={3}
                />
                <BasicButton icon={faMagicWandSparkles} className="mt-4">
                  Bild Verbessern
                </BasicButton>
              </div>
            </div>
          ) : (
            <div>Bild konnte nicht geladen werden.</div>
          )}
        </div>
      </div>
    </>
  );
}
