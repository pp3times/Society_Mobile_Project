const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();
const bcrypt = require("bcryptjs");
import createHttpError from "http-errors";
import { signAccessToken } from "../utils/jwt";
import * as yup from 'yup';

export const create = async (data) => {
  const barSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    tableCount: yup.number().required().integer(),
    description: yup.string().required(),
    openTime: yup.string().required(),
    closeTime: yup.string().required(),
    Address: yup.string().required(),
    district: yup.string().required(),
    sub_district: yup.string().required(),
    province: yup.string().required(),
    phoneNumber: yup.string().required(),
  });

  if (!await barSchema.isValid(data)) {
    throw new Error('Bad request');
  }


  const { name, email, password, tableCount, description, openTime, closeTime, Address, district, sub_district, province, phoneNumber } = data;

  const bar = await prisma.bar.create({
    data: {
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 1),
      tableCount: parseInt(tableCount),
      description: description,
      openTime: openTime,
      closeTime: closeTime,
      Address: Address,
      district: district,
      sub_district: sub_district,
      province: province,
      phoneNumber: phoneNumber,
      bannerImage: ''
    }
  });

  return bar;
};

export const login = async (data) => {
  const { email, password } = data;
  const user = await prisma.bar.findUnique({
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

export const allBars = async () => {
  const bars = await prisma.bar.findMany({
    select: {
      id: true,
      name: true,
      tableCount: true,
      description: true,
      openTime: true,
      closeTime: true,
      Address: true,
      district: true,
      sub_district: true,
      province: true,
      phoneNumber: true,
      bannerImage: true,
      rating: true,
      isClose: true,
      updatedAt: true
    }
  });

  return bars;
}

export const createReservation = async (data) => {
  const barSchema = yup.object().shape({
    userId: yup.number().required().integer(),
    tableId: yup.number().required().integer(),
    orderDate: yup.date().required()
  });

  if (!await barSchema.isValid(data)) {
    throw new Error('Bad request');
  }

  const { userId, tableId, orderDate } = data;

  const reservation = await prisma.order.create({
    data: {
      userId: userId,
      tableId: tableId,
      orderDate: orderDate
    }
  });

  return reservation;
}