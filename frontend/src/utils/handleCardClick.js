export const handleCardClick = ({
  index,
  flipped,
  matched,
  cards,
  setFlipped,
  setMatched,
  setTurns,
  cardFlipSound,
  pendingCards,
  setPendingCards,
  timerRef,
}) => {
  // Estä klikkaukset, jos kortti on jo käännetty tai matched-listassa
  if (flipped.includes(index) || matched.includes(index)) return;

  // Jos on jo kaksi käännettyä korttia (jotka eivät täsmää) ja käyttäjä klikkaa uutta korttia
  if (flipped.length === 2 && !pendingCards.includes(index)) {
    // Peruuta aiempi timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Käännä kaikki kortit takaisin paitsi matched-kortit
    setFlipped((prevFlipped) => prevFlipped.filter((i) => matched.includes(i)));
    setPendingCards([]);

    // Soita ääni uudelle kortille
    cardFlipSound.currentTime = 0;
    cardFlipSound.play();

    // Käännetään uusi kortti heti
    setFlipped((prev) => [...prev.filter((i) => matched.includes(i)), index]);
    return;
  }

  // Normaali klikkaus (0 tai 1 kortti käännettynä)
  cardFlipSound.currentTime = 0;
  cardFlipSound.play();

  const newFlipped = [...flipped, index];
  setFlipped(newFlipped);

  // Jos kaksi korttia on käännetty, tarkista onko match
  if (newFlipped.length === 2) {
    setTurns((prevTurns) => prevTurns + 1);

    const [first, second] = newFlipped;

    if (cards[first].name === cards[second].name) {
      // Match löytyi
      setMatched((prevMatched) => [...prevMatched, first, second]);
      setFlipped([]);
    } else {
      // Ei matchia, aseta odotustila
      setPendingCards([first, second]);
      timerRef.current = setTimeout(() => {
        setFlipped((prevFlipped) =>
          prevFlipped.filter((i) => matched.includes(i))
        );
        setPendingCards([]);
      }, 1000);
    }
  }
};
