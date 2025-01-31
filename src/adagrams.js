const LETTER_POOL = {A:9, B:2, C:2, D:4, E:12, F:2, G:3, H:2, I:9, J:1, K:1, 
    L:4, M:2, N:6, O:8, P:2, Q:1, R:6, S:4, T:6, U:4, V:2, W:2, X:1, Y:2, Z:1};

const SCORE_CHART = {A:1, B:3, C:3, D:2, E:1, F:4, G:2, H:4, I:1, J:8, K:5, 
    L:1, M:3, N:1, O:1, P:3, Q:10, R:1, S:1, T:1, U:1, V:4, W:4, X:8, Y:4, Z:10};

export const drawLetters = () => {
  const weightedPool = [];

  for (let [key, value] of Object.entries(LETTER_POOL)) {
    weightedPool.push(...Array(value).fill(key));
  }
  
  const hand = [];

  while (hand.length < 10) {
    const letterIndex = Math.floor(Math.random() * weightedPool.length);
    hand.push(weightedPool[letterIndex]);
    weightedPool.splice(letterIndex, 1);
  }
  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const handCopy = [...lettersInHand];
  
  for (let i = 0; i < input.length; i++) {
    if (handCopy.includes(input[i])) {
      handCopy.shift();
    } else {
      return false;
    }
  }
  return true;
};

export const scoreWord = (word) => {
  let score = 0;
  for (let char of word.toUpperCase()) {
    if (char in SCORE_CHART) score += SCORE_CHART[char];
  }
  if (word.length >= 7) score += 8;

  return score;
};

export const highestScoreFrom = (words) => {
  let highestScore = 0;
  let topPlayers;

  for (let word of words) {
    let wordScore = scoreWord(word);
    if (wordScore > highestScore) {
      highestScore = wordScore;
      topPlayers = [{word: word, score: wordScore}];
    }
    else if (wordScore == topPlayers[0]['score']) {
      topPlayers.push({word: word, score: wordScore});
    }
  }

  let winner = topPlayers[0]
  for (let player of topPlayers) {
    if (player['word'].length == 10) {
      winner = player;
      return winner;
    }
    if (player['word'].length < winner['word'].length) {
      winner = player;
    }
  }
  return winner;
};

