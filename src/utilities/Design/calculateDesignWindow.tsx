// Assume base Size of 2000 as screen width and
export interface DesignCanvasSize {
  width: number;
  height: number;
}

interface DesignCanvasSizeMap {
  small: DesignCanvasSize;
  medium: DesignCanvasSize;
  large: DesignCanvasSize;
  xl: DesignCanvasSize;
}

const DESIGN_CANVAS_SIZES: DesignCanvasSizeMap = {
  small: { width: 300, height: 300 },
  medium: { width: 500, height: 600 },
  large: { width: 700, height: 800 },
  xl: { width: 1100, height: 1400 },
};

interface GetDesignCanvasSizeParams {
  windowWidth: number;
}

export const getDesignCanvasSize = ({
  windowWidth,
}: GetDesignCanvasSizeParams) => {
  if (windowWidth < 800) {
    return DESIGN_CANVAS_SIZES.small;
  } else if (windowWidth < 1000) {
    return DESIGN_CANVAS_SIZES.medium;
  } else if (windowWidth < 2000) {
    return DESIGN_CANVAS_SIZES.large;
  } else {
    return DESIGN_CANVAS_SIZES.xl;
  }
};
