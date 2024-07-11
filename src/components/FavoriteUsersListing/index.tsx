"use client";

import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import TablePager from "../TablePager";
import UsersListHead from "../UserListing/UsersListHead";
import UsersTableBody from "../UserListing/UsersTableBody";
import { AllUsers, User } from "@/services/types";
import { useCallback, useEffect, useState } from "react";
import { FavoriteUsersServices } from "@/services/favoriteUsers.services";

export type FavoriteUsersListingProps = {
  AllUsers: AllUsers;
};
const FavioriteUsersListing = ({
  allUsers,
}: {
  allUsers: FavoriteUsersListingProps;
}) => {
  const [filter, setFilter] = useState({
    page: 1,
    pageSize: 10,
    total: allUsers.AllUsers.total,
  });
  const [users, setUsers] = useState(allUsers.AllUsers.users);

  const fetchUsers = useCallback((users: User[]) => {
    const favoriteUsers = FavoriteUsersServices.getFavoriteUsers();

    const userData = [...users].filter((user) => {
      user.favorite = Boolean(
        favoriteUsers.filter((userId) => Number(userId) === user.id).length
      );
      return user.favorite === true;
    });
    setUsers(userData);
    setFilter({ ...filter, total: userData.length });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePagination = useCallback(
    async (page: number, pageSize: number) => {
      setFilter({ ...filter, page, pageSize });
    },
    [filter]
  );

  const handleChangePage = useCallback(
    (value: number) => {
      handleChangePagination(value, filter.pageSize);
    },
    [filter.pageSize, handleChangePagination]
  );

  const handleChangePageSize = useCallback(
    (value: number) => {
      handleChangePagination(1, value);
    },
    [handleChangePagination]
  );

  const handleClickFavorite = (id: number, isFavorite?: boolean) => {
    if (isFavorite) {
      FavoriteUsersServices.removeFromFavoriteUsers(id);
    } else {
      FavoriteUsersServices.addToFavoriteUsers(id);
    }

    fetchUsers(users);
  };

  useEffect(() => {
    fetchUsers(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card variant="outlined" data-e2e="users-table-card">
      <CardHeader title="Favorite Users" data-e2e="users-table-card-header" />
      <Divider />
      <CardContent data-e2e="users-table-card-content">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer
            sx={{ width: "100%" }}
            data-e2e="users-table-card-table-container">
            <Table>
              <UsersListHead />
              <TableBody>
                {users.length ? (
                  users.map((item, index) => {
                    if (
                      index >= (filter.page - 1) * filter.pageSize &&
                      index < filter.page * filter.pageSize
                    )
                      return (
                        <UsersTableBody
                          key={index}
                          user={item}
                          onClickFavorite={handleClickFavorite}
                          data-e2e={`{"users-table-card-table-${index}"}`}
                        />
                      );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          p: 2,
                        }}>
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

export default FavioriteUsersListing;
