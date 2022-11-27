const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();
const bcrypt = require("bcryptjs");
import createHttpError from "http-errors";
import { signAccessToken } from "../utils/jwt";

export const register = async (data) => {
  const { email, name } = data;
  let status = 0;

  const emailCheck = await prisma.user.findUnique({
    where: { email: email },
  });
  const nameCheck = await prisma.user.findUnique({
    where: { name: name },
  });
  console.log(emailCheck);
  if (emailCheck && nameCheck) {
    status = 1;
  } else if (emailCheck) {
    status = 2;
  } else if (nameCheck) {
    status = 3;
  } else {
    data.password = bcrypt.hashSync(data.password, 8);
    const user = await prisma.user.create({
      data,
    });
    data.accessToken = await signAccessToken(user);
    status = data;
  }
  return status;
};

export const login = async (data) => {
  const { email, password } = data;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw createHttpError.NotFound("User not registered");
  }

  const checkPassword = bcrypt.compareSync(password, user.password);
  if (!checkPassword)
    throw createError.Unauthorized("Email address or password not valid");

  delete user.password;

  const accessToken = await signAccessToken(user);

  return { ...user, accessToken };
};
