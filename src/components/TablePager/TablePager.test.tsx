import { createTheme, ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import TablePager, { TablePagerProps } from ".";

describe("TablePager Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const WrapperTestComponent = (props: TablePagerProps) => {
    return (
      <ThemeProvider theme={createTheme()}>
        <TablePager {...props} />
      </ThemeProvider>
    );
  };

  WrapperTestComponent.defaultProps = {
    page: 1,
    rowsPerPage: 10,
    totalRecords: 100,
    handleChangePage: jest.fn(),
    handleChangePageSize: jest.fn(),
  };

  it("Should render component", () => {
    render(<WrapperTestComponent />);
    expect(screen.getByTestId("table-pager")).toBeInTheDocument();
  });

  it("Should handle zero totalRecords gracefully", () => {
    render(<WrapperTestComponent totalRecords={0} />);
    expect(screen.getByTestId("table-pager-pagination")).toHaveTextContent("1");
  });
});
