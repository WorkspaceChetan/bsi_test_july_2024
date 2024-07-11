import { createTheme, ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import FavioriteUsersListing, { FavoriteUsersListingProps } from ".";

describe("FavoriteUsersListing Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const WrapperTestComponent = (props: FavoriteUsersListingProps) => {
    const dummyAllUsers: FavoriteUsersListingProps = {
      AllUsers: { users: [], total: 0, skip: 0, limit: 0, error: "" },
    };
    return (
      <ThemeProvider theme={createTheme()}>
        <FavioriteUsersListing allUsers={dummyAllUsers} />
      </ThemeProvider>
    );
  };

  it("Should render component", () => {
    render(
      <WrapperTestComponent
        AllUsers={{
          users: [],
          total: 0,
          skip: 0,
          limit: 0,
          error: "",
        }}
      />
    );
    expect(screen.getByTestId("users-table-card")).toBeInTheDocument();
  });
});
