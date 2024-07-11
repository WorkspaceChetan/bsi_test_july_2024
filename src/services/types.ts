export type CoOrdinates = {
  lat: number;
  lng: number;
};

export type UserAddress = {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: CoOrdinates;
  country: string;
};

export type UserHair = {
  color: string;
  type: string;
};

export type UserBank = {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
};

export type UserCompanyAddress = {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: CoOrdinates;
  country: string;
};

export type UserCompany = {
  department: string;
  name: string;
  title: string;
  address: UserCompanyAddress;
};

export type UserCrypto = {
  coin: string;
  wallet: string;
  network: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: UserHair;
  ip: string;
  address: UserAddress;
  macAddress: string;
  university: string;
  bank: UserBank;
  company: UserCompany;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: UserCrypto;
  role: "admin" | "moderator" | "user";
  favorite: boolean;
};

export type AllUsers = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
  error: string;
};

export type AllUsersParams = {
  limit: number;
  skip: number;
};
