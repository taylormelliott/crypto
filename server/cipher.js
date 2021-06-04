const str = "l oryh fubswrorjb";
const getMap = (legend, shift) => {
  return legend.reduce((charsMap, currentChar, charIndex) => {
    const copy = { ...charsMap };
    let ind = (charIndex - shift) % legend.length;
    if (ind < 0) {
      ind += legend.length;
    }
    copy[currentChar] = legend[ind];
    return copy;
  }, {});
};
const encrypt = (str, shift = 0) => {
  const legend = "abcdefghijklmnopqrstuvwxyz".split("");
  const map = getMap(legend, shift);
  return str
    .toLowerCase()
    .split("")
    .map((char) => map[char] || char)
    .join("");
};
console.log(encrypt(str, 3));
