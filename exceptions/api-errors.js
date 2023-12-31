module.exports = class ApiErrors extends Error{
    status
    error
    constructor(status, message, errors = []) {
        super(message);
        this.status = status
        this.error = errors
    }
    static UnauthorizedError(){
        return new ApiErrors(401, "User is unauthorized", )
    }
    static NotAllowed(){
        return new ApiErrors(405, "Method is not allowed for not admin users ", )
    }
    static BadRequest( message, errors = []){
        return new ApiErrors(400, message, errors)
    }
}