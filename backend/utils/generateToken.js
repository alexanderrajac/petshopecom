import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const secret = process.env.JWT_SECRET || "petshop_jwt_secure_secret_key_prod";
  const token = jwt.sign({ userId }, secret, {
    expiresIn: "30d",
  });

  // set JWT token as HTTP only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
