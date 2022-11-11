import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You're not authenticated");
  }
};

export const UserAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.admin) {
      next();
    } else {
      return res.status(403).json("You're not allowed to do that!");
    }
  });
};

export const UserPostAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.body.userId || req.user.admin) {
      next();
    } else {
      return res.status(403).json("You're not allowed to do that!");
    }
  });
};

export const paginatedResult = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    // if (endIndex < (await model.countDocuments().exec())) {
    //   results.next = {
    //     page: page + 1,
    //     limit: limit,
    //   };
    // }

    // if (startIndex > 0) {
    //   results.previous = {
    //     page: page - 1,
    //     limit: limit,
    //   };
    // }
    try {
      results.results = await model
        .find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (err) {
      res.status(500).json(err);
    }
  };
};

export const commentAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log("req.user.id: " + req.user.id);
    console.log("postUserId: :" + req.body.postUserId);
    if (
      req.user.id === req.body.postUserId ||
      req.user.id === req.body.postId ||
      req.user.admin
    ) {
      next();
    } else {
      return res.status(403).json("You're not allowed to do that!");
    }
  });
};