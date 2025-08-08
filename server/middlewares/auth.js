

import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      const err = new Error('unauthorized');
      err.statusCode = 403;
      throw err;
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (verifyError, decoded) => {
      if (verifyError) {
        const err = new Error('unauthorized');
        err.statusCode = 403;
        return next(err);
      }
      req.email = decoded.email;
      return next();
    });
  } catch (error) {
    return next(error);
  }
};
export default auth;