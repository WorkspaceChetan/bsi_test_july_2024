import { User } from "@/services/types";
import { Box, Divider } from "@mui/material";
import {
  UserDetailsContainer,
  UserDetailsTable,
  UserDetailsTableItem,
  UserDetailsTableItemHeader,
} from "./UserDetails.styled";

const UserDetails = ({ userDetails }: { userDetails: User }) => {
  return (
    <UserDetailsContainer>
      <Box
        component="img"
        src={userDetails.image}
        alt="user avatar"
        sx={{ width: 150, height: 150 }}
      />
      <UserDetailsTable>
        <UserDetailsTableItem>
          <UserDetailsTableItemHeader>Name</UserDetailsTableItemHeader>
          <Box>
            {userDetails.firstName} {userDetails.lastName}
          </Box>
        </UserDetailsTableItem>
        <UserDetailsTableItem>
          <UserDetailsTableItemHeader>Username</UserDetailsTableItemHeader>
          <Box>{userDetails.username}</Box>
        </UserDetailsTableItem>
        <UserDetailsTableItem>
          <UserDetailsTableItemHeader>Email</UserDetailsTableItemHeader>
          <Box>{userDetails.email}</Box>
        </UserDetailsTableItem>
        <UserDetailsTableItem>
          <UserDetailsTableItemHeader>Phone</UserDetailsTableItemHeader>
          <Box>{userDetails.phone}</Box>
        </UserDetailsTableItem>
        <UserDetailsTableItem>
          <UserDetailsTableItemHeader>Gender</UserDetailsTableItemHeader>
          <Box>{userDetails.gender}</Box>
        </UserDetailsTableItem>
        <UserDetailsTableItem>
          <UserDetailsTableItemHeader>Address</UserDetailsTableItemHeader>
          <Box>
            {userDetails.address.address}, {userDetails.address.city},{" "}
            {userDetails.address.state}, {userDetails.address.country} -{" "}
            {userDetails.address.postalCode}
          </Box>
        </UserDetailsTableItem>
      </UserDetailsTable>
    </UserDetailsContainer>
  );
};

export default UserDetails;
