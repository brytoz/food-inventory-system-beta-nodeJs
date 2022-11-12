const Sequelize = require('sequelize');
const db = require('../db/db')

const Coupon = db.define('coupons', {
  code: {
    type: Sequelize.STRING,
    unique: true
  },
  status: {
    type: Sequelize.BOOLEAN,
  },
});


module.exports = Coupon