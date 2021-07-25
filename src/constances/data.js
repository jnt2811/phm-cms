export const sexKeys = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
};
export const petKeys = {
  DOG: "dog",
  CAT: "cat",
};
export const healthStatus = {
  GOOD: "good",
  BAD: "bad",
  UNDEFINED: "undefined",
};

export const volunteerList = [
  {
    id: 1001,
    key: 1001,
    name: "Nguyễn Thị A",
    dob: "22/01/2000",
    sex: sexKeys.FEMALE,
    phone: "0812376458",
    address: "Việt Nam",
    collab: true,
  },
  {
    id: 1002,
    key: 1002,
    name: "Trần Văn B",
    dob: "15/12/2000",
    sex: sexKeys.MALE,
    phone: "0357670118",
    address: "Việt Nam",
    collab: true,
  },
  {
    id: 1003,
    key: 1003,
    name: "Nguyễn Văn C",
    dob: "21/07/2000",
    sex: sexKeys.MALE,
    phone: "0468357119",
    address: "Việt Nam",
    collab: false,
  },
];

export const donationList = [
  {
    key: 1001,
    name: "Nguyễn Thị A",
    phone: "0812376458",
    sex: sexKeys.FEMALE,
    createdAt: "22/01/2021",
    amount: "2000000",
  },
  {
    key: 1002,
    name: "Trần Văn B",
    phone: "0357670118",
    sex: sexKeys.MALE,
    createdAt: "15/12/2020",
    amount: "1500000",
  },
  {
    key: 1003,
    name: "Nguyễn Văn C",
    phone: "0468357119",
    sex: sexKeys.MALE,
    createdAt: "21/07/2021",
    amount: "3000000",
  },
];

export const petList = [
  {
    id: 101,
    key: 101,
    name: "Tomas",
    type: petKeys.DOG,
    color: "Vàng",
    rescuedAt: "21/07/2021",
    healhStatus: healthStatus.GOOD,
  },
  {
    id: 102,
    key: 102,
    name: "Dora",
    type: petKeys.CAT,
    color: "Đen",
    rescuedAt: "21/07/2021",
    healhStatus: healthStatus.UNDEFINED,
  },
  {
    id: 103,
    key: 103,
    name: "Dummie",
    type: petKeys.DOG,
    color: "Xám",
    rescuedAt: "21/07/2021",
    healhStatus: healthStatus.BAD,
  },
];

export const clinicList = [
  {
    id: 1001,
    key: 1001,
    name: "Phòng khám ABC",
    phone: "0812376458",
    collab: true,
  },
  {
    id: 1002,
    key: 1002,
    name: "Phòng khám XYZ",
    phone: "0357670118",
    collab: true,
  },
  {
    id: 1003,
    key: 1003,
    name: "Phòng khám BBQ",
    phone: "0468357119",
    collab: false,
  },
];
