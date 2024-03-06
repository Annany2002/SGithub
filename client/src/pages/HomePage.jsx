import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import Repos from "../components/Repos";
import ProfileInfo from "../components/ProfileInfo";
import Spinner from "../components/Spinner";

export default function HomePage() {
  const [userInfo, setUserInfo] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("recent");

  const getUser = useCallback(async (username = "Annany2002") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/profile/${username}`);
      const { user, repos } = await res.json();
      setUserInfo(user);
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setRepos(repos);
      return { user, repos };
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const searchUser = async (e, username) => {
    e.preventDefault();

    setLoading(true);
    setRepos([]);
    setUserInfo(null);

    const { user, repos } = await getUser(username);

    setUserInfo(user);
    setRepos(repos);
    setLoading(false);
    setSortType("recent");
  };

  const onSort = (sortType) => {
    if (sortType === "recent") {
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortType === "stars") {
      repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortType === "forks") {
      repos.sort((a, b) => b.forks_count - a.forks_count);
    }
    setSortType(sortType);
    setRepos([...repos]);
  };

  return (
    <div className="m-4">
      <Search searchUser={searchUser} />
      <SortRepos onSort={onSort} sortType={sortType} />
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userInfo && !loading && <ProfileInfo userInfo={userInfo} />}
        {!loading && <Repos repos={repos} />}
        {loading && <Spinner />}
      </div>
    </div>
  );
}
