import UserListing from "@/components/UserListing";
import { UserService } from "@/services/user.services";

export default async function Home() {
  const allUsers = await UserService.getAllUser({
    limit: 10,
    skip: 0,
  });

  return <UserListing allUsers={allUsers} />;
}
