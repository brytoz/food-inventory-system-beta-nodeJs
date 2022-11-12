const {verify}  = require('jsonwebtoken')
const dotenv  = require('dotenv');
dotenv.config()

const validateToken = (req,res,next) => {

    const usersToken = req.headers['x-access-token'] || req.cookies.user ||  req.headers['authorization'];;

    console.log(usersToken)

    if(!usersToken) { return res.status(404).send("You do not have the permission to perform this action!!") }

    try{
        const validToken = verify(usersToken, process.env.USERS)

        if(validToken) {
            next();
        }
    }catch(err){
        res.clearCookie("user")
        return res.status(400).send("Error validating")
    }
}

 


module.exports = {validateToken}