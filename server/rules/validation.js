const Joi = require('joi')


const RegValidation = (data) => {

    const schema = Joi.object().keys({
        username: Joi.string().min(6).required(),
        role: Joi.string().required(),
        code: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })

    // VALIDATE ADMIN USERS INPUT DATA
    return schema.validate(data)
}
 

const CouponValidation = (data) => {


    const schema = Joi.object().keys({
        code: Joi.string().min(9).max(10).required(),
        status: Joi.optional(),
    })

    // VALIDATE dictionary INPUT DATA
    return schema.validate(data)
}

const LoginValidation = (data) => {

    const schema = Joi.object().keys({
        username: Joi.string().min(6).required(),
        password: Joi.string().required(),
    })
    return schema.validate(data)
}

const passwordValidation = (data) => {

    const schema = Joi.object().keys({
        username: Joi.allow(),
        password: Joi.string().required(),
    })
    return schema.validate(data)
}

const ProductValidation = (data) => {

    const schema = Joi.object().keys({
        product_name: Joi.string().min(3).required(),
        price: Joi.string().required(),
        category: Joi.string().required(),
        status: Joi.allow(),
        expiry: Joi.string().required()
    })

    // VALIDATE ADMIN USERS INPUT DATA
    return schema.validate(data)
}
 
module.exports = {passwordValidation, ProductValidation,CouponValidation,LoginValidation,  RegValidation}