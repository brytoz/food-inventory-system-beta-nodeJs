const Sequelize = require('sequelize');
const db = require('../db/db')

const Users = db.define('users', {
    username: {
        type: Sequelize.STRING,
        unique: true
    }, 
    password: {
        type: Sequelize.STRING,
    },
    role: {
        type: Sequelize.STRING,
    },  
    code: {
        type: Sequelize.STRING,
    },  
});


module.exports = Users