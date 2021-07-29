import errorCodes from "./constances/errorCodes";

export const addComma = (val) => {
  let tempVal = val;

  if (!isNaN(val)) {
    tempVal = val.toString();
  }

  if (tempVal.length > 4) {
    let newVal = "";

    for (let i = tempVal.length - 1; i >= 0; i--) {
      newVal += tempVal.charAt(i);
      if ((i + 2) % 3 === 0 && i !== 0) newVal += ",";
    }

    return newVal.split("").reverse().join("");
  }

  return tempVal;
};

export const convertErrorCodeToMessage = (code) => {
  if (errorCodes[code]) return errorCodes[code];
  return;
};
