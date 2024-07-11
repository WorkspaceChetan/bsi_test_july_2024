"use client";

import { User } from "@/services/types";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  UserDetailsContainer,
  UserDetailsTable,
  UserDetailsTableItem,
  UserDetailsTableItemHeader,
} from "./UserDetails.styled";
import FavoriteIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/StarBorder";
import { FavoriteUsersServices } from "@/services/favoriteUsers.services";
import { useCallback, useEffect, useState } from "react";

export type UserDetailsProps = {
  userDetails: User;
};

const UserDetails = ({ userDetails }: UserDetailsProps) => {
  const [user, setUser] = useState(userDetails);

  const fetchUser = useCallback((user: User) => {
    const favoriteUsers = FavoriteUsersServices.getFavoriteUsers();

    const updatedUser = {
      ...user,
      favorite: Boolean(favoriteUsers.includes(user.id.toString())),
    };
    setUser(updatedUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickFavorite = (id: number, isFavorite?: boolean) => {
    if (isFavorite) {
      FavoriteUsersServices.removeFromFavoriteUsers(id);
    } else {
      FavoriteUsersServices.addToFavoriteUsers(id);
    }

    fetchUser(user);
  };

  useEffect(() => {
    fetchUser(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserDetailsContainer data-e2e="user-details-container">
      <Box
        component="img"
        src={user.image}
        alt="user avatar"
        sx={{ width: 150, height: 150 }}
      />
      <UserDetailsTable>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <IconButton
            color="warning"
            onClick={() => handleClickFavorite(user.id, user.favorite)}
            data-e2e="favorite-button"
          >
            <Tooltip title="Faviorite">
              {user.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Tooltip>
          </IconButton>
        </Box>
        <UserDetailsTableItem>
          <UserDetailsTableItemHeader>Name</UserDetailsTableItemHeader>
          <Box>
            {user.firstName} {user.lastName}
          </Box>
        </UserDetailsTableItem>
        <UserDetailsTableItem>
          <UserDetailsTableItemHeader>Username</UserDetailsTableItemHeader>
          <Box>{user.username}</Box>
        </UserDetailsTableItem>
        <UserDetailsTableItem>
          <UserDetailsTableItemHeader>Email</UserDetailsTableItemHeader>
          <Box>{user.email}</Box>
        </UserDetailsTableItem>
        <UserDetailsTableItem>
          <UserDetailsTableItemHeader>Phone</UserDetailsTableItemHeader>
          <Box>{user.phone}</Box>
        </UserDetailsTableItem>
        <UserDetailsTableItem>
          <UserDetailsTableItemHeader>Gender</UserDetailsTableItemHeader>
          <Box>{user.gender}</Box>
        </UserDetailsTableItem>
        <UserDetailsTableItem>
          <UserDetailsTableItemHeader>Address</UserDetailsTableItemHeader>
          <Box>
            {user.address.address}, {user.address.city}, {user.address.state},{" "}
            {user.address.country} - {user.address.postalCode}
          </Box>
        </UserDetailsTableItem>
      </UserDetailsTable>
    </UserDetailsContainer>
  );
};

export default UserDetails;
