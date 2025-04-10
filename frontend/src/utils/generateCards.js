export const generateCards = (pairs) => {
  const baseImages = [
    "/images/cards/image1.png",
    "/images/cards/image2.png",
    "/images/cards/image3.png",
    "/images/cards/image4.png",
    "/images/cards/image5.png",
    "/images/cards/image6.png",
    "/images/cards/image7.png",
    "/images/cards/image8.png",
    "/images/cards/image9.png",
    "/images/cards/image10.png",
    "/images/cards/image11.png",
    "/images/cards/image12.png",
    "/images/cards/image13.png",
    "/images/cards/image14.png",
    "/images/cards/image15.png",
    "/images/cards/image16.png",
    "/images/cards/image17.png",
    "/images/cards/image18.png",
  ];

  // Shuffle the baseImages array
  const shuffledImages = baseImages.sort(() => Math.random() - 0.5);

  // Select the required number of pairs
  const selectedImages = shuffledImages.slice(0, pairs);

  // Create card pairs
  const cards = selectedImages.flatMap((image, index) => [
    { id: index * 2, name: image },
    { id: index * 2 + 1, name: image },
  ]);

  // Shuffle the cards
  return cards.sort(() => Math.random() - 0.5);
};
