const bcrypt = require('bcrypt');

const getHashedPassword = (password) => {
    return bcrypt.hash(password, 10);
};

const comparePasswords = (requestPassword, password) => {
    return bcrypt.compare(requestPassword, password);
}

module.exports = {
    getHashedPassword,
    comparePasswords
};