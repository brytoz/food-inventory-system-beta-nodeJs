const router = require('express').Router()
const Users = require('../models/Users.js')
const Products = require('../models/Products.js')
const Coupon = require('../models/Coupon.js')
const {
  CouponValidation,
  RegValidation,
  ProductValidation,
  LoginValidation, 
  passwordValidation
} = require('../rules/validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { validateToken } = require('../router/VerifyToken')
const { verify } = require('jsonwebtoken')
dotenv.config()


// COUPON
router.post('/coupons',  async (req, res) => {

  // error message check
  const { value, error } = CouponValidation(req.body)

  if (error) {
      return res.status(202).send(error.details[0].message)
  }

  const {code}  = req.body


  //code duplicate check 
  const codeCheck = await Coupon.findOne({
      where: { code}
  })
  if(codeCheck) return res.status(202).send("This code already exist already Exists")


  // send and save info - database
  const postMe = await Coupon.create({
      code,
      status:false
  }).then((userInfo) => {
      res.status(200).send("Upload Successful")
  }).catch((err) => {
      res.status(400).send('I think something might be wrong with your internet connection')
  })

})
router.get("/getAllCodes", validateToken, (req, res) => 

Coupon.findAll().then((data) => res.status(200).send(data)).catch((err) => res.status(202).send("Unable to fetch your requested data"))

);


// USERS
router.post('/register',  async (req, res) => {

  // error message check
  const { value, error } = RegValidation(req.body)

  if (error) {
      return res.status(202).send(error.details[0].message)
  }

  const {username,role, code}  = req.body

  //username duplicate check
  const userCheck = await Users.findOne({
      where: { username}
  })
  if(userCheck) return res.status(202).send("Username already Exists")

//code existence check 
  const codeCheck = await Coupon.findOne({
      where: { code }
  })
  if(!codeCheck) return res.status(202).send("code doesnt exist")

  if(codeCheck.status == 1) return res.status(202).send("This code has been used")
  
  // encrypt the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)


  // update Code status
  const codeStatus = await Coupon.update(
      {status: 1},
      {where: { code}}
  )

  // send and save info - database
  const postMe = await Users.create({
      username,
      password:hashedPassword,
      code,
      role,
  }).then((userInfo) => {
      res.status(200).send("Registered Successful")
  }).catch((err) => {
      res.status(400).send('I think something might be wrong with your internet connection')
  })

})

router.get("/getAllAdmin", validateToken ,(req, res) => 

Users.findAll().then((data) => res.status(200).send(data)).catch((err) => res.status(202).send("Unable to fetch your requested data"))

);
// LOGIN
router.post('/login', async (req, res, next) => {
  // error message check
  const { value, error } = LoginValidation(req.body)

  if (error) {
    return res.status(202).send(error.details[0].message)
  }

  const { username, password } = req.body

  //Email duplucate check
  const userCheck = await Users.findOne({
    where: { username },
  })
  if (!userCheck) return res.status(202).send('username doesnt exist!')

  //  check Password
  const passwordCheck = await bcrypt
    .compare(password, userCheck.password)
    .then((result) => {
      if (!result) return res.status(202).send('Invalid Password')

      const giveToken = jwt.sign(
        {
          id: userCheck.id,
          username: userCheck.username,
          phone: userCheck.phone,
        },
        process.env.USERS,
        { expiresIn: '1d' },
      )

      const newCookie = res.cookie('user', giveToken, {
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
        // httpOnly: true,
        // secure:true,
        // signed: true
      })

      if (newCookie) {
        res.status(200).json({
          data: 'Success. Redirecting...',
          user: username,
          auth: true,
          loggedIn: true,
          cookie: req.cookies,
        })
      } else {
        res.clearCookie('user')
        res
          .status(202)
          .json({ auth: false, loggedIn: false, cookie: 'No cookies' })
      }
    })

  next()
})

//  get current user
router.get('/me', validateToken, async (req, res) => {
  var token =
    req.cookies.user ||
    req.headers['x-access-token'] ||
    req.headers['authorization']

  if (!token) {
    return res
      .status(400)
      .send('You cannot perform any activities until you are logged In')
  }

  verify(token, process.env.USERS, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' })
    } else {
      req.decoded = decoded

      await Users.findByPk(req.decoded.id, async (err, user) => {
        return (req.currentUser = user)
      })
        .then((data) => res.status(200).json({ data }))
        .catch((err) =>
          res.status(403).send('Unable to fetch your requested data'),
        )
    }
  })
})

router.get('/logout', (req, res, next) => {
  console.log(req.cookies.user)
  if (req.cookies.user) {
    res.clearCookie('user')
    res.status(202).json({ auth: false, loggedIn: false, cookie: 'No cookies' })
    res.end()
  } else {
    res
      .status(202)
      .json({ auth: false, loggedIn: false, cookie: 'You are not logged in' })
    next()
  }

  next()
})
 

// products
router.post('/products', validateToken,  async (req, res) => {

  // error message check
  const { value, error } = ProductValidation(req.body)

  if (error) {
      return res.status(202).send(error.details[0].message)
  }

  const {product_name, category, price,  expiry}  = req.body
  
  
 

  // send and save info - database
  const postMe = await Products.create({
    product_name,
    price,
      category,
      status: "Available",
      expiry,
  }).then((sendInfo) => {
      res.status(200).send("Upload Successful")
  }).catch((err) => {
      res.status(400).send('I think something might be wrong with your internet connection')
  })

})

router.get("/getproducts", (req, res) => 

  Products.findAll().then((data) => res.status(200).send(data)).catch((err) => res.status(202).send("Unable to fetch your requested data"))

);

router.post('/updatepassword', validateToken, async (req, res) => {
  // error message check
  const { value, error } = passwordValidation(req.body)

  if (error) {
    return res.status(202).send(error.details[0].message)
  }

  const { username } = req.body

  // encrypt the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  // send and update info - database
  const postMe = await Users.update(
    {
      password: hashedPassword,
    },
    { where: { username } },
  )
    .then((userInfo) => {
      res.status(200).send('Updated Successfully')
    })
    .catch((err) => {
      res
        .status(400)
        .send('I think something might be wrong with your internet connection')
    })
})

// delete  posts with ld
router.post('/delete-post', validateToken, async (req, res) => {
  const { id } = req.body

  // delete   status
  await Products.destroy({
    where: {
      id: id,
    },
  })
    .then((userInfo) => {
      res.status(200).send('Deleted Successfully')
    })
    .catch((err) => {
      res
        .status(400)
        .send(
          'I think something might be wrong with your internet connection. Or try refreshing the page.',
        )
    })
})
module.exports = router
