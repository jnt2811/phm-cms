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

export const validateDate = (dob) => {
  const day = parseInt(dob.slice(0, 2));
  const month = parseInt(dob.slice(3, 5));
  const year = parseInt(dob.slice(6, 10));

  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const standardMonths = [4, 6, 9, 11];
  const extendedMonths = [1, 3, 5, 7, 8, 10, 12];
  const leapMonths = [2];

  if (standardMonths.includes(month) && day <= 30) return true;
  else if (extendedMonths.includes(month) && day <= 31) return true;
  else if (leapMonths.includes(month) && day <= 29) {
    if (!isLeapYear && day === 29) return false;
    else return true;
  } else return false;
};

export const formatPhone = (phone) => {
  if (!isEmptyData(phone)) {
    let tempVal = "";

    for (let i = 0; i < phone.length; i++) {
      tempVal += phone.charAt(i);
      if (i === 3 || i === 6) tempVal += " ";
    }

    return tempVal;
  }

  return phone;
};

export const isEmptyData = (data) => {
  if (data === null || data === undefined) return true;
  if (JSON.stringify(data) === "{}") return true;
  if (JSON.stringify(data) === "[]") return true;
  if (data === "") return true;
  return false;
};
