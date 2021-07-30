import errorCodes from "./constances/errorCodes";

export const formatPrice = (val, currency) => {
  let tempVal = val;

  if (!isNaN(val)) {
    tempVal = val.toString();
  }

  if (tempVal.length > 3) {
    let newVal = "";
    let counter = 0;

    for (let i = tempVal.length - 1; i >= 0; i--) {
      counter++;
      newVal += tempVal.charAt(i);
      if (counter % 3 === 0 && i !== 0) newVal += ",";
    }

    tempVal = newVal.split("").reverse().join("");
  }

  tempVal += ` ${currency}`;

  return tempVal;
};

export const convertErrorCodeToMessage = (code) => {
  if (errorCodes[code]) return errorCodes[code];
  return;
};
