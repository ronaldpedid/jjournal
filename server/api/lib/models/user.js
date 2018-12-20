const UserDM = require('../database/datamodels/User'),
  UserJournal = require('./userJournal'),
  crypt = require('../safe');

class User {
  async create({ password, username, email }) {
    //take password and hash it with bcrypt
    let hashpassword = await crypt.generatePasswordHash(password);

    //UPD
    const newUser = new UserDM({
      username: username,
      email: email,
      password: hashpassword
    });

    //Save new user to the data base and return the user object
    await newUser.save()

    await this.createJournal(newUser._id);

    return newUser;
  }

  async createJournal(userId) {
    const newUserJournalModel = new UserJournal();
    await newUserJournalModel.create(userId);
  }

  async edit(userId, data) {
    const user = await UserDM.findOneAndUpdate({ _id: userId }, data)
    return user;
  }
}

module.exports = exports.default = User;