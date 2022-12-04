const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

require('dotenv').config()
const bcrypt = require('bcryptjs')
import createHttpError from 'http-errors'
import {signAccessToken} from '../utils/jwt'
import * as yup from 'yup'

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
  })

  if (!(await barSchema.isValid(data))) {
    throw new Error('Bad request')
  }

  const {
    name,
    email,
    password,
    tableCount,
    description,
    openTime,
    closeTime,
    Address,
    district,
    sub_district,
    province,
    phoneNumber,
  } = data

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
      bannerImage: '',
    },
  })

  return bar
}

export const login = async (data) => {
  const {email, password} = data
  const user = await prisma.bar.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    throw createHttpError.NotFound('User not registered')
  }

  const checkPassword = bcrypt.compareSync(password, user.password)
  if (!checkPassword)
    throw createError.Unauthorized('Email address or password not valid')

  delete user.password

  const accessToken = await signAccessToken(user)

  return {...user, accessToken}
}

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
      updatedAt: true,
    },
  })

  return bars
}

export const createReservation = async (data) => {
  console.log(data)
  const makeid = (length) => {
    var result = ''
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
  const rnd = (() => {
    const gen = (min, max) =>
      max++ && [...Array(max - min)].map((s, i) => String.fromCharCode(min + i))

    const sets = {
      num: gen(48, 57),
      alphaLower: gen(97, 122),
      alphaUpper: gen(65, 90),
      special: [...`~!@#$%^&*()_+-=[]\{}|;:'",./<>?`],
    }

    function* iter(len, set) {
      if (set.length < 1) set = Object.values(sets).flat()
      for (let i = 0; i < len; i++) yield set[(Math.random() * set.length) | 0]
    }

    return Object.assign(
      (len, ...set) => [...iter(len, set.flat())].join(''),
      sets
    )
  })()
  const barSchema = yup.object().shape({
    userId: yup.number().required().integer(),
    tableId: yup.number().required().integer(),
    orderDate: yup.string().required(),
    // passCode: yup.string().required(),
    // status: yup.string().required(),
  })

  if (!(await barSchema.isValid(data))) {
    throw new Error('Bad request!')
  }

  const {userId, tableId, orderDate} = data

  const reservation = await prisma.order.create({
    data: {
      userId: userId,
      tableId: tableId,
      orderDate: orderDate,
      passCode: rnd(20, rnd.alphaUpper, rnd.special, rnd.alphaLower, rnd.num),
      status: 'WAITING',
    },
  })

  return reservation
}

export const getTableById = async (data) => {
  // const {id} = data
  // console.log(data)
  const response = await prisma.table.findMany({
    where: {
      barId: Number(data),
    },
  })
  return response
}

export const createReviewService = async (data) => {
  const {userId, barId, score, message} = data

  const review = await prisma.review.create({
    data: {
      userId,
      userId,
      barId: barId,
      score: score,
      comment: message,
    },
  })

  return review
}

export const GetAllReviewService = async (barId) => {
  const reviews = await prisma.review.findMany({
    where: {barId: parseInt(barId)},
  })

  return reviews
}

export const getAllTableService = async (barId) => {
  const tables = await prisma.table.findMany({where: {barId: parseInt(barId)}})

  return tables
}

export const getTableReservationService = async (barId) => {
  let orders = null;
  if (barId) {
    console.log(true);
    orders = await prisma.$queryRaw`SELECT * FROM \`Order\` o LEFT JOIN \`Table\` t ON o.tableId = t.id WHERE t.barId = ${barId}`;
  } else {
    console.log(false);
    orders = await prisma.$queryRaw`SELECT * FROM \`Order\` o LEFT JOIN \`Table\` t ON o.tableId = t.id ORDER BY o.id DESC`;
  }

  return orders
}

export const updateBarStatusService = async (barId, status) => {
  const bar = await prisma.bar.update({
    where: {
      id: parseInt(barId),
    },
    data: {
      isClose: status,
    },
    select: {
      name: true,
      isClose: true,
      updatedAt: true,
    },
  })

  return bar
}

export const addTableService = async (data) => {
  const {barId, name, minSeat, maxSeat, available} = data
  const table = await prisma.table.create({
    data: {
      barId: barId,
      name: name,
      minSeat: minSeat,
      maxSeat: maxSeat,
      available: available,
    },
  })

  return table
}

export const deleteTableService = async (tableId) => {
  console.log(tableId)
  const table = await prisma.table.delete({
    where: {
      id: tableId,
    },
  })

  return table
}

export const receiveTableService = async (passcode) => {
  let order = await prisma.order.findFirst({
    where: { passCode: passcode }
  });

  order = await prisma.order.update({
    where: {
      id: order.id
    },
    data: {
      status: 'CHECKIN'
    },
    select: {
      id: true,
      orderDate: true,
      status: true,
      tableSeat: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  console.log(order);

  return order;
}