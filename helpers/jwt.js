import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const createToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
console.log("JWT_SECRET", JWT_SECRET);

export const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return { payload };
  } catch (error) {
    return error;
  }
};
