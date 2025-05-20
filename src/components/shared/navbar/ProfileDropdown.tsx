import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useAuthMeQuery, useLogOutMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { TUser } from "@/types/types";
import { Button } from "@/components/ui/button";
import clsx from "clsx"; // Optional helper to manage classNames

interface ProfileDropdownProps {
  user: TUser;
  darkMode?: boolean;
}

export function ProfileDropdown({ user, darkMode = false }: ProfileDropdownProps) {
  const dispatch = useAppDispatch();
  const { data } = useAuthMeQuery(undefined);
  const [logOut] = useLogOutMutation();

  const handleLogOut = async () => {
    dispatch(logout());
    toast.success("Logged out!");
    await logOut({});
  };

  const bgColor = darkMode ? "[var(--primary-darkbackground)] " : "[var(--primary-foreground)]";
  const textColor = darkMode ? "textp-var(--primary-foreground)]" : "text-[var(--primary-darkbackground)] ";
  const hoverBg = darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100";
  const borderColor = darkMode ? "border-gray-600" : "border-gray-200";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={data?.data?.profileImage || "https://github.com/shadcn.png"}
            alt="profile image"
          />
          <AvatarFallback>Profile</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={clsx("mt-5 w-56 mr-20 rounded shadow", bgColor, textColor, borderColor)}>
        <DropdownMenuItem className="flex flex-col items-center">
          <h1 className="w-full text-xl font-semibold text-center">
            {user?.name?.length > 15 ? `${user?.name.slice(0, 10)}...` : user?.name}
          </h1>
        </DropdownMenuItem>

        <DropdownMenuItem>
          {user?.role === "admin" ? (
            <Link to="/admin/dashboard" className="w-full cursor-pointer">
              <Button
                variant="outline"
                className={clsx("w-full", textColor, hoverBg, darkMode && "border-gray-600 cursor-pointer")}
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/user/dashboard" className="w-full cursor-pointer">
              <Button
                variant="outline"
                className={clsx("w-full", textColor, hoverBg, darkMode && "border-gray-600 ")}
              >
                Dashboard
              </Button>
            </Link>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Button
            onClick={handleLogOut}
            variant="outline"
            className="w-full bg-teal-600 text-white cursor-pointer"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
