/**
 * Calculate preview scale based on the provided zoom level
 * @NOTE: minimum and maximum scale is 0.1 and 1
 *
 * @param zoomlevel - zoom level in number e.g: 100
 * @returns number  scale
 **/
export function calcPreviewDocsScaleLevel(zoomLevel: number) {
  const MIN_SCALE_VALUE = 0.1;
  const MAX_SCALE_VALUE = 1;

  const level = zoomLevel / 100;
  return Math.min(Math.max(level, MIN_SCALE_VALUE), MAX_SCALE_VALUE);
}
