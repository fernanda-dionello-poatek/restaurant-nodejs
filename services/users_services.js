const usersRepository = require("../repository/users_repository");
const users_validators = require("./utils/users_validators");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.SECRET;

exports.userValidation = async (user) => {
  try {
    users_validators.validateUserLogin(user);
    const userFounded = await usersRepository.findUsername(user.username);
    users_validators.validateUser(userFounded, user);

    const token = jwt.sign(
      {
        id: userFounded.rows[0].id,
        username: userFounded.rows[0].username,
      },
      secret,
      { expiresIn: "1h" }
    );
    return token;
  } catch (err) {
    throw err;
  }
};

exports.tokenValidation = (token, next) => {
  try {
    users_validators.validateToken(token);
    jwt.verify(token, secret, (error, payload) => {
      if (error) {
        err = { message: "Invalid Token", status: 403 };
        throw err;
      } else {
        // console.log("User id: "+ payload.id);
        next();
      }
    });
  } catch (err) {
    throw err;
  }
};

exports.listUsers = async () => {
  try {
    const users = usersRepository.getUsers();
    return (await users).rows;
  } catch (e) {
    throw e;
  }
};

exports.getUserById = async (id) => {
  try {
    await users_validators.validateUserId(id);
    const users = usersRepository.getUserById(id);

    return (await users).rows[0];
  } catch (e) {
    throw e;
  }
};

exports.deleteUserById = async (id) => {
  try {
    await users_validators.validateUserId(id);
    const users = usersRepository.deleteUserById(id);
    return (await users).rows[0];
  } catch (e) {
    throw e;
  }
};

exports.updateUserById = async (id, user) => {
  try {
    await users_validators.validateUserUpdate(user, id);
    const userFounded = await usersRepository.findUsername(user.username);
    users_validators.validateUsername(userFounded, user);
    const users = await usersRepository.updateUserById(id, user);
    return await users;
  } catch (e) {
    throw e;
  }
};

exports.createUser = async (user) => {
  try {
    users_validators.validateUserLogin(user);
    const userFounded = await usersRepository.findUsername(user.username);
    users_validators.validateUsername(userFounded, user);

    let encryptPassword = crypto.createHash("sha1");
    encryptPassword.update(user.password);
    const pwd = encryptPassword.digest("hex");
    const userCreated = await usersRepository.createUser(user, pwd);
    return await userCreated;
    return;
  } catch (err) {
    throw err;
  }
};
