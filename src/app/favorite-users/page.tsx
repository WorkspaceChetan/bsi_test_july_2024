import FavioriteUsersListing from "@/components/FavoriteUsersListing";
import { UserService } from "@/services/user.services";

const FavoriteUsers = async () => {
  const allUsers = await UserService.getAllUser({
    limit: 0,
    skip: 0,
  });

  return <FavioriteUsersListing allUsers={allUsers} />;
};

export default FavoriteUsers;
