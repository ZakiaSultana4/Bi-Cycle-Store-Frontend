import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/hooks/useDarkMode";
import {
  useAllUserQuery,
  useUpdateBlockedUserMutation,
  useDeleteUserMutation,
  useMakeAdminMutation,
} from "@/redux/features/auth/authApi";
import { useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { toast } from "sonner";

export function AllUsers() {
      const { darkMode } = useDarkMode();
  const { isLoading, data } = useAllUserQuery(undefined);
  const [updateBlockedUser] = useUpdateBlockedUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [makeAdmin] = useMakeAdminMutation();
  const [search, setSearch] = useState("");


  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    isBlocked: boolean;
    profileImage: string;
  }

  interface AllUsersResponse {
    data: User[];
  }

  const filteredData =
    (data as AllUsersResponse | undefined)?.data?.filter((item: User) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredData.length / usersPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleActiveUser = async (id: string) => {
    const res = await updateBlockedUser({ id, data: { isBlocked: true } });
    if (res?.data) {
      toast.success("User blocked successfully.");
    } else if (res?.error) {
      toast.error("Admin cannot be blocked.");
    } else {
      toast.error("Failed to block user.");
    }
  };

  const handleDeActiveUser = async (id: string) => {
    const res = await updateBlockedUser({ id, data: { isBlocked: false } });
    if (res?.data) {
      toast.success("User activated successfully.");
    } else {
      toast.error("Please try again!");
    }
  };

  const handleDeleteUser = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;
    const res = await deleteUser(id);
    if ("data" in res) {
      toast.success("User deleted successfully.");
    } else {
      toast.error("Failed to delete user.");
    }
  };

  const handleMakeAdmin = async (id: string) => {
    try {
      const res = await makeAdmin(id);
      if ("data" in res) {
        toast.success("User promoted to admin.");
      } else if ("error" in res) {
        toast.error("Failed to promote user: " + JSON.stringify(res.error));
      } else {
        toast.error("Unknown error occurred while promoting user.");
      }
    } catch {
      toast.error("An exception occurred. Please try again.");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div
      className={`relative overflow-x-auto shadow-md sm:rounded-lg mt-5 ${
        darkMode
          ? "bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]"
          : "bg-[var(--primary-foreground)] text-[var(--primary-darkbackground)]"
      }`}
    >
    

      <div className="flex justify-between items-center p-2">
        <input
          className={`p-2 border-2 rounded-md w-full max-w-xs ${
            darkMode
              ? "border-gray-400 bg-[var(--primary-darkbackground)] text-[var(--primary-foreground)]"
              : "border-black bg-white text-black"
          }`}
          type="text"
          placeholder="Search name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <table className="w-full text-sm text-left">
        <thead
          className={`text-xs uppercase ${
            darkMode ? "bg-slate-800 text-white" : "bg-slate-700 text-white"
          }`}
        >
          <tr>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Address</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3">Active</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>

        {currentUsers.length > 0 ? (
          <tbody>
            {currentUsers.map((item) => (
              <tr
                key={item._id}
                className={`odd:bg-transparent even:bg-[${darkMode ? "var(--primary-darkbackground-alt)" : "gray-50"}] border-b border-gray-200`}
              >
                <td className="px-6 py-4">
                  <img src={item.profileImage} className="w-8 h-8 rounded-full" alt="User" />
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.role}</td>
                <td>
                  {item.isBlocked ? (
                    <FaTimes className="w-4 text-red-500" />
                  ) : (
                    <FaCheck className="w-4 text-green-500" />
                  )}
                </td>
                <td className="space-x-1 space-y-2 text-white">
                  {item.isBlocked ? (
                    <Button
                      onClick={() => handleDeActiveUser(item._id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Activate
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleActiveUser(item._id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Block
                    </Button>
                  )}

                  {item.role !== "admin" && (
                    <Button
                      onClick={() => handleMakeAdmin(item._id)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Make Admin
                    </Button>
                  )}

                  <Button
                    onClick={() => handleDeleteUser(item._id)}
                    className="bg-gray-800 hover:bg-black"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={8} className="text-center py-8 text-xl">
                No users found.
              </td>
            </tr>
          </tbody>
        )}
      </table>

      {filteredData.length > usersPerPage && (
                 <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        maxPageButtons={7}
        darkMode={darkMode}
      />
      )}
    </div>
  );
}
