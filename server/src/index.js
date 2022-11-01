import express from 'express'
import bodyParser from 'body-parser'
import cors from "cors";
import adaptRequest from './helpers/adapt-request'
import UserRoute from './routes/UserRoute'

const app = express()

const PORT = process.env.API_PORT || 8080;

var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
app.use(express.json())
app.user(UserRoute);

// const usersController = (req, res) => {
// 	const httpRequest = adaptRequest(req)
//   handleContactsRequest(httpRequest)
//     .then(({ headers, statusCode, data }) =>
//       res
//         .set(headers)
//         .status(statusCode)
//         .send(data)
//     )
//     .catch(e => res.status(500).end())
// }

app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}`))
