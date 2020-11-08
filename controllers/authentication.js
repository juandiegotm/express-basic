const { mongoUtils, dataBase } = require("../lib/utils/mongo.js");
const {comparePasswords, getHashedPassword} = require("../lib/utils/bcrypt")
const COLLECTION_NAME = 'usuarios';

async function loginOnDB(username, password) {
    const user = await findUser(username); 
    if(user && await comparePasswords(password, user.password))
        return user;
    return null;
}

async function findUser(username) {
    const client = await mongoUtils.conn();
    const user = await client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .findOne({username})
    .finally(() => client.close());
    return user;
}

async function signin(username, password, rol){
    const client = await mongoUtils.conn();
    return await client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .insertOne({username, password: await getHashedPassword(password), rol})
    .finally(() => client.close());
}
module.exports = {
    loginOnDB,
    findUser,
    signin,
}