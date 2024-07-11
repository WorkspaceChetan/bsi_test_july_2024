import { createTheme, ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";

import { AllUsers } from "@/services/types";
import UserListing from ".";

describe("UserListing Component", () => {
  const WrapperTestComponent = (props: AllUsers) => {
    return (
      <ThemeProvider theme={createTheme()}>
        <UserListing
          allUsers={{
            ...props,
          }}
        />
      </ThemeProvider>
    );
  };

  WrapperTestComponent.defaultProps = {
    users: [],
    total: 0,
    skip: 0,
    limit: 0,
    error: "test",
  };

  it("Should render component", () => {
    render(<WrapperTestComponent />);

    expect(screen.getByTestId("users-table-card")).toBeInTheDocument();
    expect(screen.getByTestId("users-table-card-header")).toBeInTheDocument();
  });
});
