const Sequelize = require('sequelize');
const db = require('../db/db')

const Products = db.define('products', {
    product_name: {
        type: Sequelize.STRING,
    },
    category: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.STRING,
    },
    expiry: {
        type: Sequelize.STRING,
    },
});


module.exports = Products    