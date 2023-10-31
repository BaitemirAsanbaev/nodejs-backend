const ApiError = require("../exceptions/api-errors")
const TokenService = require("../service/token-service")
module.exports = async (req, res, next)=>{
  try {
    const authorizationHeader = req.headers.authorization
    if(!authorizationHeader){
      return next(ApiError.UnauthorizedError()) 
    }
    const accessToken = authorizationHeader.split(' ')[1]
    if(!accessToken){
      return next(ApiError.UnauthorizedError()) 
    }
    const userData = await TokenService.validateAccessToken(accessToken)
    if(!userData){
      return next(ApiError.UnauthorizedError()) 
    }
    req.user = userData
    next()
  }
  catch (e) {
    next(ApiError.UnauthorizedError())
  }
}