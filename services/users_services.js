const usersRepository = require('../repository/users_repository');

exports.listUsers = async () => {
  try{
    const users = usersRepository.getUsers();
    return (await users).rows;
  } catch (e) {
    throw e;
  }
}