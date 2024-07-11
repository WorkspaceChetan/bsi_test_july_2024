import { createTheme, ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";

import UsersListHead from "./UsersListHead";

describe("UsersListHead Component", () => {
  const WrapperTestComponent = () => {
    return (
      <ThemeProvider theme={createTheme()}>
        <UsersListHead />
      </ThemeProvider>
    );
  };

  it("Should render component", () => {
    render(<WrapperTestComponent />);

    expect(screen.getByTestId("users-list-head")).toBeInTheDocument();
  });
});
