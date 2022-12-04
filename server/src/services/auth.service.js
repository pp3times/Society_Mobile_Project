const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();
const bcrypt = require("bcryptjs");
import createHttpError from "http-errors";
import { signAccessToken } from "../utils/jwt";

export const register = async (data) => {
  const {email, name, password, phoneNumber} = data;
  
  const isEmailUnique = await prisma.user.findUnique({ where: { email: email } }) === null;
  const isNameUnique = await prisma.user.findUnique({ where: { name: name } }) === null;

  if (!isEmailUnique) {
    return 'This email was already used';
  }

  if (!isNameUnique) {
    return 'This name was already used';
  }

  const passwordHash = bcrypt.hashSync(password, 8);

  const user = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: passwordHash,
      phoneNumber: phoneNumber
    }
  });

  const accessToken = await signAccessToken(user);

  user.accessToken = accessToken;

  return user;
}

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
