// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
import { getUsers, getUserById } from "../services/user.service";

export const getUsersControl = async (req, res) => {
  try {
    const user = await getUsers();
    res.status(200).json({ status: true, message: "All users", payload: user });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

export const getUserByIdControl = async (req, res) => {
  try {
    const response = await getUserById();
    res.status(200).json({ status: "200", payload: response });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, phoneNumber, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
      },
    });
    res.status(201).json({status: "201", payload: user});
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// export const updateUser = async (req, res) => {
//   const { name, phoneNumber, email, password } = req.body;
//   try {
//     const user = await prisma.user.update({
//       where: {
//         id: Number(req.params.id),
//       },
//       data: {
//         name: name,
//         phoneNumber: phoneNumber,
//         email: email,
//         password: password,
//       },
//     });
//     res.status(200).json({status: "200", payload: user});
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// };

// export const deleteUser = async (req, res) => {
//   try {
//     const user = await prisma.user.delete({
//       where: {
//         id: Number(req.params.id),
//       },
//     });
//     res.status(200).json({status: "200", payload: user});
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// };