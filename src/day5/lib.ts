export const name = "library-5";

export const LETTERS = "abcdefghijklmnopqrstuvwxyz";

export const getLetterRegex = (letter: string): string => {
  return letter + letter.toUpperCase() + "|" + letter.toUpperCase() + letter;
};

export const getRegexPolarity = (): RegExp => {
  return new RegExp(
    `(${LETTERS.split("")
      .map(getLetterRegex)
      .join("|")})`,
    "g"
  );
};
export const getRegexLetter = (letter: string): RegExp => {
  return new RegExp(letter, "gi");
};

export const reduceString = (string: string): string => {
  let previousLength: number = string.length + 1;
  let newString: string = string;

  while (previousLength > newString.length) {
    previousLength = newString.length;
    newString = newString.replace(getRegexPolarity(), "");
  }

  return newString;
};

export const reduceLetter = (string: string, letter: string) => {
  return reduceString(string.replace(getRegexLetter(letter), ""));
};

export const formatResult = (value: number): string => `${value}`;
