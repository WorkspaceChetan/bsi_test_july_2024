import { FAVOURITE_USERS } from "@/constants/common.constants";

export class FavoriteUsersServices {
  static getFavoriteUsers = () => {
    const favouriteUsers = localStorage.getItem(FAVOURITE_USERS)
      ? (JSON.parse(localStorage.getItem(FAVOURITE_USERS)!) as string[])
      : ([] as string[]);
    return favouriteUsers;
  };

  static setFavoriteUsers = (data: string[]) => {
    localStorage.setItem(FAVOURITE_USERS, JSON.stringify(data));
  };

  static addToFavoriteUsers = (id: number) => {
    const favouriteUsers = FavoriteUsersServices.getFavoriteUsers();
    if (!favouriteUsers.includes(id.toString())) {
      favouriteUsers.push(id.toString());
      FavoriteUsersServices.setFavoriteUsers(favouriteUsers);
    }
    return favouriteUsers;
  };

  static removeFromFavoriteUsers = (id: number) => {
    const favouriteUsers = FavoriteUsersServices.getFavoriteUsers();
    const index = favouriteUsers.findIndex((x) => x === id.toString());

    if (index !== -1) {
      favouriteUsers.splice(index, 1);
      FavoriteUsersServices.setFavoriteUsers(favouriteUsers);
    }
    return favouriteUsers;
  };
}
