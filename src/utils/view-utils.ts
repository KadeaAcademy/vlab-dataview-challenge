// TODO: use maximum and minimum XY positions instead
export const generateEdgePosition = () => {
  return {
    x: Math.floor(Math.random() * 1400 + 100),
    y: Math.floor(Math.random() * 700 + 100),
  };
};