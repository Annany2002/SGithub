import { IoLocationOutline } from "react-icons/io5";
import {
  RiGitRepositoryFill,
  RiUserFollowFill,
  RiUserFollowLine,
} from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { TfiThought } from "react-icons/tfi";
import { FaEye } from "react-icons/fa";

import { formatMemberSince } from "../utils/functions";

import LikeProfile from "./LikeProfile";

export default function ProfileInfo({ userInfo }) {
  const memberSince = formatMemberSince(userInfo.created_at);

  return (
    <div className="lg:w-1/3 w-full flex flex-col gap-2 md:sticky md:top-10">
      <div className="bg-glass rounded-lg p-4">
        <div className="flex gap-4 items-center">
          <a href={userInfo?.html_url} target="_blank" rel="noreferrer">
            <img
              src={userInfo?.avatar_url}
              className="rounded-md w-24 h-24 mb-2"
              alt=""
            />
          </a>
          <div className="flex gap-2 items-center flex-col">
            <LikeProfile userInfo={userInfo} />
            <a
              href={userInfo?.html_url}
              target="_blank"
              rel="noreferrer"
              className="bg-glass font-medium w-full text-xs p-2 rounded-md cursor-pointer border border-blue-400 flex items-center gap-2"
            >
              <FaEye size={16} />
              View on Github
            </a>
          </div>
        </div>

        {userInfo?.bio ? (
          <div className="flex items-center gap-2">
            <TfiThought />
            <p className="text-sm">{userInfo?.bio.substring(0, 60)}...</p>
          </div>
        ) : null}

        {userInfo?.location ? (
          <div className="flex items-center gap-2">
            <IoLocationOutline />
            {userInfo?.location}
          </div>
        ) : null}

        {userInfo?.twitter_username ? (
          <a
            href={`https://twitter.com/${userInfo.twitter_username}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-sky-500"
          >
            <FaXTwitter />
            {userInfo?.twitter_username}
          </a>
        ) : null}

        <div className="my-2">
          <p className="text-gray-600 font-bold text-sm">Member since</p>
          <p className="">{memberSince}</p>
        </div>

        {userInfo?.email && (
          <div className="my-2">
            <p className="text-gray-600 font-bold text-sm">Email address</p>
            <p className="">{userInfo.email}</p>
          </div>
        )}

        {userInfo?.name && (
          <div className="my-2">
            <p className="text-gray-600 font-bold text-sm">Full name</p>
            <p className="">{userInfo?.name}</p>
          </div>
        )}

        <div className="my-2">
          <p className="text-gray-600 font-bold text-sm">Username</p>
          <p className="">{userInfo?.login}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mx-4">
        <div className="flex items-center gap-2 bg-glass rounded-lg p-2 flex-1 min-w-24">
          <RiUserFollowFill className="w-5 h-5 text-blue-800" />
          <p className="text-xs">Followers: {userInfo?.followers}</p>
        </div>

        <div className="flex items-center gap-2 bg-glass rounded-lg p-2 flex-1 min-w-24">
          <RiUserFollowLine className="w-5 h-5 text-blue-800" />
          <p className="text-xs">Following: {userInfo?.following}</p>
        </div>

        <div className="flex items-center gap-2 bg-glass rounded-lg p-2 flex-1 min-w-24">
          <RiGitRepositoryFill className="w-5 h-5 text-blue-800" />
          <p className="text-xs">Public repos: {userInfo?.public_repos}</p>
        </div>

        <div className="flex items-center gap-2 bg-glass rounded-lg p-2 flex-1 min-w-24">
          <RiGitRepositoryFill className="w-5 h-5 text-blue-800" />
          <p className="text-xs">Public gists: {userInfo?.public_gists}</p>
        </div>
      </div>
    </div>
  );
}
