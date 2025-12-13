import { cssInterop } from "nativewind";

// Or create a helper function to reduce repetition
export function createSvgIcon(SvgComponent: any) {
  return cssInterop(SvgComponent, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        width: 'width',
        height: 'height',
        fill: 'fill',
        stroke: 'stroke',
        opacity: 'opacity',
      }
    }
  });
}