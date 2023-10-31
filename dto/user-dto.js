module.exports = class UserDto {
    email
    id
    role

    constructor({ email, _id, role }) {
        this.email = email;
        this.id = _id;
        this.role = role;
    }
}
