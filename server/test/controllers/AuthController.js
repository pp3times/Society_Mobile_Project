import { PrismaClient } from '@prisma/client'
const createError = require('http-errors')
const prisma = new PrismaClient()
import jwt from 'jwt-simple'

const SECRET = process.env.SECRET;

export const loginUser = async (req, res) => {
	try {
		const payload = {
			sub: req.body.username,
			iat: new Data().getTime() // issued at time
		}
		res.send(jwt.encode(payload, SECRET)).status(200).json({status: "200", payload: payload});
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
}