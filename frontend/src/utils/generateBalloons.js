export const generateBalloons = () => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: Math.random() * 100 + "vw",
    delay: Math.random() * 3 + "s",
  }));
};
