import { FaHeart } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export default function LikeProfile({ userInfo }) {
  const { authUser } = useAuthContext();

  const isOwnProfile = authUser?.username === userInfo.login;
  const handleLikeProfile = async () => {
    try {
      const res = await fetch(`/api/users/like/${userInfo.login}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (!authUser || isOwnProfile) return null;
  return (
    <button
      className="p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex items-center gap-2"
      onClick={handleLikeProfile}
    >
      <FaHeart size={16} /> Like Profile
    </button>
  );
}
