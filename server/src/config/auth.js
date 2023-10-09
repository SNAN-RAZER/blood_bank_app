const jwt = require("jsonwebtoken");

const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      throw Error("Token not available");
    } else {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      req.body.userId = decodedToken.userId;

      next();
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

module.exports = authMiddleWare;
