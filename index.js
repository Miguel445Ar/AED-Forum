const jwt = require("jsonwebtoken");

const user = {
    username: "Miguel",
    password: "12345",
    role: "Admin"
};


const USER_ROLE = Object.freeze({
    ADMIN: "ADMIN",
    USER: "User"
});

console.log(USER_ROLE);
USER_ROLE.ADMIN = 3;
console.log(USER_ROLE);