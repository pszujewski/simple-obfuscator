const test1 =
  "In time, Vivian would learn the history of her mother’s family, the layers of it that coursed through her veins and mingled with her elite Westford blood. Vivian’s maternal grandmother, Claire, had grown up in a house riddled with domestic violence, often watching helplessly as her father beat her mother. Claire had also taken on the responsibility of raising her five younger siblings. Years later, Claire’s father—Vivian’s great-grandfather—had attempted suicide. He was ultimately institutionalized in a Bangor psychiatric hospital. When Claire’s time came to marry, she fell into an all too common cycle of despair—with an abusive husband whose reach extended to his two daughters. Vivian’s Aunt Lynette, who was stricken with cerebral palsy, bore the brunt of her father’s damage. Emma, the younger of the two, built a fortress in a corner of her mind, one that still holds unlocked secrets of those early days. ";

const test2 =
  "she craved pancakes and grandmotherly warmth. “You could throw a rock from one side of Mam’s house to the other, and it wasn’t much to look at from the outside, but I loved going there,” Vivian recalled. ";

function getObfuscated(text) {
  return obfuscate(text).join(" ");
}

function obfuscate(text) {
  const words = text.split(" ");
  return words.map((word) => {
    if (doNotScrambleWord(word)) {
      return word;
    }
    return scramble(word);
  });
}

const lengthDivisor = getLengthDivisor();

function doNotScrambleWord(str) {
  return str.length < lengthDivisor;
}

function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':“"\\|,.<>\/?~’—]/;
  return specialChars.test(str);
}

function scramble(word) {
  let tokens = word.split("");
  
  let len = tokens.length;
  let n = Math.floor(len / lengthDivisor);

  if (n === len) {
    n--;
  }

  let swap;
  let i;

  while (n > 0) {
    if (containsSpecialChars(tokens[n])) {
      n--;
    } else {
      i = getRandomAlphaTokenIndex(tokens, 10);
      swap = tokens[n];
      tokens[n] = tokens[i];
      tokens[i] = swap;
      n--;
    }
  }
  return tokens.join("");
}

function getRandomAlphaTokenIndex(tokens, numberOfTimesToTry) {
  const i = Math.floor(Math.random() * tokens.length);
  if (!containsSpecialChars(tokens[i])) {
    return i;
  }
  if (numberOfTimesToTry === 0) {
    return 0;
  }
  return getRandomAlphaTokenIndex(tokens, numberOfTimesToTry - 1);
}

function getLengthDivisor() {
  if (process.argv[2] && parseInt(process.argv[2])) {
    return parseInt(process.argv[2]);
  }
  return 2;
}

console.log(getObfuscated(test1));
