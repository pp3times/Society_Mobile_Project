const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export const getUsers = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
};

export const getUserById = async (req, res) => {
  const response = await prisma.user.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  return response;
};

export const createUser = async (data) => {
  const { name, phoneNumber, email, password } = data;
  const user = await prisma.user.create({
    data: {
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    },
  });
  return user;
};

export const getUserReservationService = async (userId) => {
  const reservation = await prisma.order.findMany({ 
    where: { userId: userId }, 
    include: {
      tableSeat: { 
        include: {
          bar: true 
        }
      }
    } 
  });
  return reservation;
}

export const updateUserService = async (userId, data) => {
  const user = await prisma.user.update({
    where: {
      id: parseInt(userId)
    },
    data: data
  });

  return user;
}

export const getUserService = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId)
    }
  });

  return user;
}