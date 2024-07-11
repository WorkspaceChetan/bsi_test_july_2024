import { TableHead, TableRow, TableCell } from "@mui/material";

const UsersListHead = () => {
  return (
    <TableHead data-e2e="users-list-head">
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Full name</TableCell>
        <TableCell>Username</TableCell>
        <TableCell>Email</TableCell>
        <TableCell sx={{ textAlign: "right" }}>Mobile number</TableCell>
        <TableCell sx={{ textAlign: "center" }}>Gender</TableCell>
        <TableCell sx={{ textAlign: "left" }}>Birth date</TableCell>
        <TableCell sx={{ width: "1%" }}>Action</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default UsersListHead;
