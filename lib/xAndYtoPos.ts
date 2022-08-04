export const xAndYToPos = (x: number, y: number) => {
  return `${x}-${y}`;
};

export const posToXAndY = (pos: string): { x: number; y: number } => {
  const split = pos.split("-");
  return {
    x: parseInt(split[0]),
    y: parseInt(split[1]),
  };
};
