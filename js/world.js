export const WORLD_WIDTH_PX = 512;
export const WORLD_HEIGHT_PX = 480;
const WORLD_NO_MANS_LAND_PX = 32;

export const isWithinBoundsNorth = (y) => y > WORLD_NO_MANS_LAND_PX;
export const isWithinBoundsSouth = (y) => y < WORLD_HEIGHT_PX - WORLD_NO_MANS_LAND_PX * 2;
export const isWithinBoundsWest = (x) => x > WORLD_NO_MANS_LAND_PX;
export const isWithinBoundsEast = (x) => x < WORLD_WIDTH_PX - WORLD_NO_MANS_LAND_PX * 2;
