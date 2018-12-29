const UserDM = require('../database/datamodels/User'),
  UserJournal = require('./userJournal'),
  UserTechBook = require('./userTechBook'),
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
    await this.createBook(newUser._id);

    return newUser;
  }

  async createJournal(userId) {
    const newUserJournalModel = new UserJournal();
    await newUserJournalModel.create(userId);
  }

  async createBook(userId) {
    const newUserTechBookModel = new UserTechBook();
    await newUserTechBookModel.create(userId);
  }

  async edit(userId, data) {
    const user = await UserDM.findOneAndUpdate({ _id: userId }, data)
    return user;
  }

  async incEntryAmount(userId, amount) {
    await UserDM.findOneAndUpdate({ _id: userId }, { $inc: { numOfEntries: amount } });
    return user;
  }

  async getUser(userId) {
    const user = await UserDM.findOne({ _id: userId });
    console.log(user);
    return user;
  }

  async delete(userId) {
    return await UserDM.findByIdAndDelete({ _id: userId });
  }

}

module.exports = exports.default = User;