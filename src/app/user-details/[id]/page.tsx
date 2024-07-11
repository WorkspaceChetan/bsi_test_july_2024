import UserDetails from "@/components/UserDetails";
import { User } from "@/services/types";
import { UserService } from "@/services/user.services";

interface IPageProps {
  params: { id: string };
}

const UserDetailsPage = async ({ params }: IPageProps) => {
  const userDetails = await UserService.getUserById(Number(params.id));
  return <UserDetails userDetails={userDetails || ({} as User)} />;
};

export default UserDetailsPage;
