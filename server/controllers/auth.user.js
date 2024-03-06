import User from "../models/user.model.js";

export async function getUser(req, res) {
  const { username } = req.params;
  try {
    const resUser = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });
    const user = await resUser.json();

    const resRepo = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          authorization: `token ${process.env.GITHUB_API_KEY}`,
        },
      }
    );

    const repos = await resRepo.json();
    res.status(200).json({ user, repos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function likeProfile(req, res) {
  try {
    const { username } = req.params;
    const user = await User.findById(req.user._id.toString());

    const userToLike = await User.findOne({ username });

    if (!userToLike) {
      return res
        .status(404)
        .json({ error: "User is not a member of this application" });
    }

    if (user.likedProfiles.includes(userToLike.username)) {
      return res.status(404).json({ error: "User already liked" });
    }

    userToLike.likedBy.push({
      username: user.name,
      avatarUrl: user.avatarUrl,
      likedDate: Date.now(),
    });
    user.likedProfiles.push(userToLike.username);

    await Promise.all([userToLike.save(), user.save()]);

    res.status(200).json({ message: "User liked" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getLikes(req, res) {
  try {
    const user = await User.findById(req.user._id.toString());
    res.status(200).json({ likedBy: user.likedBy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
