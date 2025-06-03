import { createFileRoute } from "@tanstack/react-router";
import GreyFront from "src/assets/pullovers/grey-front.png";
import CyanFront from "src/assets/pullovers/cyan-front.png";
import SandFront from "src/assets/pullovers/sand-front.png";
import { Spacer } from "src/components/Misc/Spacer";
import { MediumLabel } from "src/components/Texts/MediumLabel";
import { SingleDesignTab } from "src/components/Designer/SingleDesignTab";
import { SingleViewOption } from "src/components/Designer/SingleViewOption";
import { SingleImageCard } from "src/components/Designer/SingleImageCard";
import { SingleColorOption } from "src/components/Designer/SingleColorOption";
import { SinglePulloverOption } from "src/components/Designer/SinglePulloverOption";

export const Route = createFileRoute("/_auth/designer")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col items-center gap-2 mt-12 ml-8">
        <MediumLabel text="Designs" />
        <SingleDesignTab image={GreyFront} />
        <SingleDesignTab image={CyanFront} />
        <SingleDesignTab image={SandFront} selected={true} />
      </div>
      <div className="px-4 pt-12 w-6/12">
        <div className="w-full h-10/12 border-2 rounded-2xl border-ap-new-gray bg-ap-new-dark-beige shadow-ap-special-shadow flex items-center justify-center">
          <img src={SandFront} alt="" className="h-11/12 object-cover" />
        </div>
        <div className="flex flex-row mt-4 gap-3">
          <SingleViewOption view="Vorne" selected={true} />
          <SingleViewOption view="Hinten" />
          <Spacer />
          <button className="border-2 w-60 h-15 rounded-lg bg-ap-new-green shadow-ap-button cursor-pointer">
            <p className="font-semibold">Design Speichern</p>
          </button>
        </div>
      </div>
      <div className="flex flex-col pt-12 gap-4 w-3/12">
        <div className="flex flex-row gap-5">
          <div>
            <MediumLabel text="Farbe" />
            <div className="flex flex-row gap-2 mt-5">
              <SingleColorOption color="grey" selected={true} />
              <SingleColorOption color="red" selected={true} />
              <SingleColorOption color="green" selected={true} />
              <SingleColorOption color="white" selected={true} />
            </div>
          </div>
          <div>
            <MediumLabel text="Pullover-Art" />
            <div className="flex flex-row gap-2">
              <SinglePulloverOption image={GreyFront} name="Normal" />
              <SinglePulloverOption
                image={CyanFront}
                name="Oversized"
                selected={true}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col p-2 items-center border-2 border-ap-new-gray rounded-xl border-ap bg-ap-new-dark-beige">
          <MediumLabel text="Text Elemente" />
        </div>
        <div className="flex flex-col py-4 gap-2 items-center border-2 border-ap-new-gray rounded-xl border-ap bg-ap-new-dark-beige">
          <MediumLabel text="Bild Elemente" />
          <div className="w-11/12 grid grid-cols-2 xl:grid-cols-3 gap-4">
            <SingleImageCard image="a" />
            <SingleImageCard image="a" />
            <SingleImageCard image="a" />
            <SingleImageCard image="a" />
            <SingleImageCard image="a" />
            <SingleImageCard image="a" />
          </div>
          <button className="border-2 h-12 w-58 mt-4 rounded-lg bg-ap-new-green cursor-pointer">
            <p className="font-semibold">+ Von Abipulli Bibliothek</p>
          </button>
          <button className="px-12 py-3 w-58 cursor-pointer bg-linear-to-r from-ap-gradient-blue to-ap-gradient-red  text-white font-medium rounded-md shadow-sm">
            Mit KI Generieren
          </button>
        </div>
      </div>
    </div>
  );
}
