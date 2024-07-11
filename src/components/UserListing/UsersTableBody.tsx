import { User } from "@/services/types";
import {
  TableRow,
  TableCell,
  Box,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/StarBorder";
import Link from "next/link";
import { getFormatedDate } from "@/ustils/common.utils";

export type UsersTableBodyPropsType = {
  user: User;
  onClickFavorite: (id: number, isFavorite?: boolean) => void;
};

const UsersTableBody = ({ user, onClickFavorite }: UsersTableBodyPropsType) => {
  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      data-e2e="users-table-row"
    >
      <TableCell component="th" scope="row">
        {user.id || "-"}
      </TableCell>
      <TableCell component="th" scope="row">
        {user.firstName || ""} {user.lastName || "-"}
      </TableCell>
      <TableCell>{user.username || "-"}</TableCell>
      <TableCell>{user.email || "-"}</TableCell>
      <TableCell sx={{ textAlign: "right" }}>{user.phone || "-"}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>{user.gender || "-"}</TableCell>
      <TableCell sx={{ textAlign: "left" }}>
        {getFormatedDate(user.birthDate || "")}
      </TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Button
            variant="outlined"
            size="small"
            sx={{ whiteSpace: "nowrap", textTransform: "none" }}
            LinkComponent={Link}
            href={`/user-details/${user.id}`}
          >
            View Details
          </Button>
          <IconButton
            color="warning"
            onClick={() => onClickFavorite(user.id, user.favorite)}
            data-e2e="users-table-favorite-button"
          >
            <Tooltip title="Faviorite">
              {user.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Tooltip>
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default UsersTableBody;
