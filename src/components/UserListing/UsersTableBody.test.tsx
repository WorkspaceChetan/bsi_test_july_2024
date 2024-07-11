import { createTheme, ThemeProvider } from "@mui/material";
import {
  act,
  fireEvent,
  getByTestId,
  render,
  screen,
} from "@testing-library/react";

import UsersTableBody, { UsersTableBodyPropsType } from "./UsersTableBody";

describe("UsersTableBody Component", () => {
  const WrapperTestComponent = (props: UsersTableBodyPropsType) => {
    return (
      <ThemeProvider theme={createTheme()}>
        <UsersTableBody {...props} />
      </ThemeProvider>
    );
  };

  it("should render user details correctly when valid user data is provided", () => {
    const user = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      maidenName: "",
      age: 30,
      gender: "male",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      username: "johndoe",
      password: "password",
      birthDate: "1990-01-01",
      image: "",
      bloodGroup: "A+",
      height: 180,
      weight: 75,
      eyeColor: "blue",
      hair: { color: "brown", type: "curly" },
      ip: "127.0.0.1",
      address: {
        city: "New York",
        street: "5th Avenue",
        number: 1,
        zipcode: "10001",
      },
      macAddress: "00-14-22-01-23-45",
      university: "NYU",
      bank: {
        cardNumber: "1234-5678-9012-3456",
        cardType: "Visa",
        currency: "USD",
        iban: "US1234567890",
      },
      company: {
        name: "Tech Corp",
        department: "Engineering",
        title: "Software Engineer",
      },
      ein: "12-3456789",
      ssn: "123-45-6789",
      userAgent: "Mozilla/5.0",
      crypto: {
        bitcoinAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
        ethereumAddress: "0x32Be343B94f860124dC4fEe278FDCBD38C102D88",
      },
      role: "user",
    };
    const date = new Date(2023, 9, 10);
    const { getByText } = render(
      <UsersTableBody user={user as any} date={date} />
    );
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("johndoe")).toBeInTheDocument();
    expect(getByText("john.doe@example.com")).toBeInTheDocument();
    expect(getByText("123-456-7890")).toBeInTheDocument();
    expect(getByText("male")).toBeInTheDocument();
    expect(getByText("10/10/2023")).toBeInTheDocument();
  });

  // Renders correctly when user data fields are empty or null
  it("should render correctly when user data fields are empty or null", () => {
    const user = {
      id: null,
      firstName: "",
      lastName: "",
      maidenName: "",
      age: null,
      gender: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      birthDate: "",
      image: "",
      bloodGroup: "",
      height: null,
      weight: null,
      eyeColor: "",
      hair: { color: "", type: "" },
      ip: "",
      address: { city: "", street: "", number: null, zipcode: "" },
      macAddress: "",
      university: "",
      bank: { cardNumber: "", cardType: "", currency: "", iban: "" },
      company: { name: "", department: "", title: "" },
      ein: "",
      ssn: "",
      userAgent: "",
      crypto: { bitcoinAddress: "", ethereumAddress: "" },
      role: "",
    };
    const date = new Date(2023, 9, 10);
    const { getByText } = render(
      <UsersTableBody user={user as any} date={date} />
    );
    expect(getByText("10/10/2023")).toBeInTheDocument();
  });
});
