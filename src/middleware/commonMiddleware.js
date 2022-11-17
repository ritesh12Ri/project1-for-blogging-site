const jwt = require("jsonwebtoken")
const blogModels = require("../models/blogModels")


const authentication = async function (req, res, next) {

    try {
        let token = req.headers['x-api-key']
        if (!token) {
            return res.status(400).send({ message: "bad request,token is required" })
        }
        let verify = jwt.verify(token, "Ritesh-Rajput")
        if (!verify) {
            return res.status(401).send({ message: "authentication failed" })
        }
        req.decoded = verify.authorId
        next()
    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }

}



const authorization = async function (req, res, next) {
    try {
        let authorId = req.decoded
        let blogId = req.params.blogId
        let query = req.query
       if(blogId){
        let data = await blogModels.findById(blogId)
        if (!data) {
            return res.status(404).send({ status:false, message: "this blogId does not exits" })
        }
        if (data.authorId != authorId) {
            return res.status(403).send({ status: false, message: "authorization failed!you are not authorized" })
        }
        next()
       }else if(query){
        let data = await blogModels.findOne(query)
        if (!data) {
            return res.status(404).send({ status:false, message: "these fields are not exits" })
        }
        if (data.authorId != authorId) {
            return res.status(403).send({ status: false, message: "authorization failed" })
        }
        next()
       }
    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
}


module.exports = { authentication, authorization }