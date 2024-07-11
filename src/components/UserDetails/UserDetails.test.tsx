import { createTheme, ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import UserDetails, { UserDetailsProps } from ".";
import { User } from "@/services/types";
import { FavoriteUsersServices } from "@/services/favoriteUsers.services";

describe("UserDetails Component", () => {
  const user: User = {
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
      address: "51, bitch street",
      state: "New York",
      stateCode: "123456",
      postalCode: "123456",
      coordinates: {
        lat: 0,
        lng: 0,
      },
      country: "USA",
    },
    macAddress: "00-14-22-01-23-45",
    university: "NYU",
    bank: {
      cardNumber: "1234-5678-9012-3456",
      cardType: "Visa",
      currency: "USD",
      iban: "US1234567890",
      cardExpire: "02/2027",
    },
    company: {
      name: "Tech Corp",
      department: "Engineering",
      title: "Software Engineer",
      address: {
        city: "New York",
        address: "51, bitch street",
        state: "New York",
        stateCode: "123456",
        postalCode: "123456",
        coordinates: {
          lat: 0,
          lng: 0,
        },
        country: "USA",
      },
    },
    ein: "12-3456789",
    ssn: "123-45-6789",
    userAgent: "Mozilla/5.0",
    crypto: {
      coin: "$",
      wallet: "abc",
      network: "abc",
    },
    role: "user",
    favorite: false,
  };

  const WrapperTestComponent = (props: UserDetailsProps) => {
    return (
      <ThemeProvider theme={createTheme()}>
        <UserDetails {...props} />
      </ThemeProvider>
    );
  };

  it("Should render component", () => {
    render(<WrapperTestComponent userDetails={user} />);

    expect(screen.getByTestId("user-details-container")).toBeInTheDocument();
  });

  it("should update user's favorite status correctly in local storage", () => {
    render(<WrapperTestComponent userDetails={user} />);

    const favoriteButton = screen.getByTestId("favorite-button");

    fireEvent.click(favoriteButton);
    expect(FavoriteUsersServices.addToFavoriteUsers).toHaveBeenCalledWith(1);

    fireEvent.click(favoriteButton);
    expect(FavoriteUsersServices.removeFromFavoriteUsers).toHaveBeenCalledWith(
      1
    );
  });
});
