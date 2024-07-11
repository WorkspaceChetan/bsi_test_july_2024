"use client";

import { AllUsers, User } from "@/services/types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useCallback, useEffect, useState } from "react";
import UsersListHead from "./UsersListHead";
import TablePager from "../TablePager";
import { UserService } from "@/services/user.services";
import UsersTableBody from "./UsersTableBody";
import { EscortExportToCSV, exportCSVData } from "./utils";
import { toast } from "react-toastify";
import { FavoriteUsersServices } from "@/services/favoriteUsers.services";

const UserListing = ({ allUsers }: { allUsers: AllUsers }) => {
  const [filter, setFilter] = useState({
    page: 1,
    pageSize: allUsers.limit,
    total: allUsers.total,
  });
  const [users, setUsers] = useState(allUsers.users);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState<string>();

  const fetchUsers = useCallback((users: User[]) => {
    const favoriteUsers = FavoriteUsersServices.getFavoriteUsers();

    const userData = [...users].map((user) => {
      user.favorite = Boolean(
        favoriteUsers.filter((userId) => Number(userId) === user.id).length
      );
      return user;
    });
    setUsers(userData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePagination = useCallback(
    async (page: number, pageSize: number, text: string) => {
      setIsLoading(true);
      let allUsers;

      if (text) {
        allUsers = await UserService.getSearchUserData(
          text,
          pageSize,
          (page - 1) * pageSize
        );
      } else {
        allUsers = await UserService.getAllUser({
          limit: pageSize,
          skip: (page - 1) * pageSize,
        });
      }

      setFilter({ ...filter, page, pageSize, total: allUsers.total });
      fetchUsers(allUsers.users);
      setIsLoading(false);
    },
    [fetchUsers, filter]
  );

  const handleChangePage = useCallback(
    (value: number) => {
      handleChangePagination(value, filter.pageSize, text || "");
    },
    [filter.pageSize, handleChangePagination, text]
  );

  const handleChangePageSize = useCallback(
    (value: number) => {
      handleChangePagination(1, value, text || "");
    },
    [handleChangePagination, text]
  );

  const handleSearch = useCallback(
    async (text: string) => {
      handleChangePagination(1, filter.pageSize, text);
    },
    [filter, handleChangePagination]
  );

  const handleClickFavorite = (id: number, isFavorite?: boolean) => {
    if (isFavorite) {
      FavoriteUsersServices.removeFromFavoriteUsers(id);
    } else {
      FavoriteUsersServices.addToFavoriteUsers(id);
    }
    fetchUsers(users);
  };

  const handleCSVExport = () => {
    if (users.length) {
      const csv = EscortExportToCSV(users);
      exportCSVData(csv, `Users-(${new Date().getUTCMilliseconds()}).csv`);
      toast.success("Data exported successfully!");
    } else {
      toast.error("No data available.");
    }
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      if (text !== undefined) {
        handleSearch(text);
      }
    }, 1000);

    return () => clearTimeout(debounceFunction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useEffect(() => {
    fetchUsers(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card variant="outlined" data-e2e="users-table-card">
      <CardHeader title="Users" data-e2e="users-table-card-header" />
      <Divider />
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <TextField
            id="search-bar"
            className="text"
            variant="outlined"
            placeholder="Search..."
            size="small"
            onChange={(e) => setText(e.target.value)}
          />
          <Tooltip title="Export CSV">
            <IconButton
              onClick={handleCSVExport}
              sx={{
                justifySelf: "end",
                backgroundColor: "primary.main",
                color: "common.white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              <SaveAltIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ width: "100%" }}>
            <Table>
              <UsersListHead />
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={10}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          p: 2,
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : users.length ? (
                  users.map((item, index) => (
                    <UsersTableBody
                      key={index}
                      user={item}
                      onClickFavorite={handleClickFavorite}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          p: 2,
                        }}
                      >
                        <Typography variant="body1">
                          User is not found.
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {users && users.length > 0 && (
            <Box sx={{ width: "calc(100% - 32px)", p: 2 }}>
              <TablePager
                page={filter.page}
                rowsPerPage={filter.pageSize}
                handleChangePage={handleChangePage}
                handleChangePageSize={handleChangePageSize}
                totalRecords={filter.total}
              />
            </Box>
          )}
        </Paper>
      </CardContent>
    </Card>
  );
};

export default UserListing;
