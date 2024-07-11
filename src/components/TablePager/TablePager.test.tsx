import { createTheme, ThemeProvider } from "@mui/material";
import { act, fireEvent, render, screen } from "@testing-library/react";
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

  const setup = (props: Partial<TablePagerProps> = {}) => {
    const defaultProps: TablePagerProps = {
      page: 1,
      rowsPerPage: 10,
      totalRecords: 100,
      handleChangePage: jest.fn(),
      handleChangePageSize: jest.fn(),
    };

    return render(<TablePager {...defaultProps} {...props} />);
  };
  it("Should render component", () => {
    render(<WrapperTestComponent />);
    expect(screen.getByTestId("table-pager")).toBeInTheDocument();
  });

  it("Should handle zero totalRecords gracefully", () => {
    render(<WrapperTestComponent totalRecords={0} />);
    expect(screen.getByTestId("table-pager-pagination")).toHaveTextContent("1");
  });

  it("should call handleChangePage with the correct value", () => {
    const handleChangePage = jest.fn();
    const { getByTestId } = setup({ handleChangePage });

    const paginationElement = getByTestId("table-pager-pagination");
    const nextPageButton = paginationElement.querySelector(
      '[aria-label="Go to page 2"]'
    );

    if (nextPageButton) {
      fireEvent.click(nextPageButton);
    }

    expect(handleChangePage).toHaveBeenCalledWith(2);
  });
});
