const toKebab = (string) => {
  const words = string.toLowerCase().split(" ");
  const result = words.reduce((prev, word, index) => {
    if (!word || word === " ") return prev;
    let updatedResult = (index ? " " : "") + prev;
    updatedResult += word.charAt(0).toUpperCase() + word.slice(1);
    updatedResult += index === words.length ? "" : " ";
    return updatedResult;
  }, "");
  return result.trim();
};

export default toKebab;