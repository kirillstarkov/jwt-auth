const ApiErrors = require("../exceptions/api-error")

module.exports = function (err, req, res, next) {
    console.log(err)
    if(err instanceof ApiErrors){
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: "Unknown error"})
}