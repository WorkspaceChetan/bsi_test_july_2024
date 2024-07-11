import { createTheme, ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import Sidebar from ".";

describe("Sidebar Component", () => {
  const WrapperTestComponent = () => {
    return (
      <ThemeProvider theme={createTheme()}>
        <Sidebar />
      </ThemeProvider>
    );
  };

  it("Should render component", () => {
    render(<WrapperTestComponent />);

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  it("should open the sidebar when the menu icon is clicked", () => {
    render(<WrapperTestComponent />);
    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);
  });
});
