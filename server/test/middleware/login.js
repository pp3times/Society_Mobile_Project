export const loginMiddleware = (req, res, next) => {
	if(req.body.username === "jeremy" && 
		 req.body.password === "3times") {
			res.send('Login Success')
		  next()
		}
	else res.send("Wrong username and password") 
}