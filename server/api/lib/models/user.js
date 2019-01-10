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

  //creates
  async createJournal(userId) {
    const newUserJournalModel = new UserJournal();
    await newUserJournalModel.create(userId);
  }

  async createBook(userId) {
    const newUserTechBookModel = new UserTechBook();
    await newUserTechBookModel.create(userId);
  }

  //edit user
  async edit(userId, data) {
    const user = await UserDM.findOneAndUpdate({ _id: userId }, data)
    return user;
  }


  //increases
  async incEntryAmount(userId, amount) {
    await UserDM.findOneAndUpdate({ _id: userId }, { $inc: { numOfEntries: amount } });

  }

  async incSparringMatchesAmount(userId, amount) {
    await UserDM.findOneAndUpdate({ _id: userId }, { $inc: { totalSparringMatches: amount } });

  }

  async incSparringMatchesTimeAmount(userId, amount) {
    await UserDM.findOneAndUpdate({ _id: userId }, { $inc: { totalSparringTime: amount } });
  }

  async incRegisteredTechniqueAmount(userId, amount) {
    await UserDM.findOneAndUpdate({ _id: userId }, { $inc: { numOfTechniques: amount } });
  }

  async incAccountPoints(userId, amount) {
    await UserDM.findOneAndUpdate({ _id: userId }, { $inc: { accountPoints: amount } });
  }

  //decreases

  async decEntryAmount(userId, amount) {
    await UserDM.findOneAndUpdate({ _id: userId }, { $dec: { numOfEntries: -amount } });

  }

  async decSparringMatchesAmount(userId, amount) {
    await UserDM.findOneAndUpdate({ _id: userId }, { $inc: { totalSparringMatches: -amount } });

  }

  async decSparringMatchesTimeAmount(userId, amount) {
    await UserDM.findOneAndUpdate({ _id: userId }, { $inc: { totalSparringTime: -amount } });
  }

  async decRegisteredTechniqueAmount(userId, amount) {
    await UserDM.findOneAndUpdate({ _id: userId }, { $inc: { numOfTechniques: -amount } });
  }

  async decAccountPoints(userId, amount) {
    await UserDM.findOneAndUpdate({ _id: userId }, { $inc: { accountPoints: -amount } });
  }


  //sets
  async setNewCurrentWeight(userId, amount) {
    await UserDM.findOneAndUpdate({ _id: userId }, { $set: { currentWeight: amount } });
  }

  async setWeightLossAmount(userId, amount) {
    await UserDM.findOneAndUpdate({ _id: userId }, { $set: { recentWeightLoss: amount } });
  }

  async setAverageWeight(userId, amount) {
    await UserDM.findOneAndUpdate({ _id: userId }, { $set: { averageWeight: parseInt(amount) } });
  }

  //adds
  async addToAverageWeightArray(userId, amount) {
    await UserDM.findOneAndUpdate({ _id: userId }, { $push: { averageWeightArray: parseInt(amount) } });
  }

  async addEntryToJournal(userId, entryId) {
    await UserDM.findOneAndUpdate({ _id: userId }, { $push: { entries: entryId } });
  }

  async addTechniqueToBook(userId, techniqueId) {
    await UserDM.findOneAndUpdate({ _id: userId }, { $push: { techniques: techniqueId } });
  }


  //removes

  async removeEntryFromJournal(userId, entryId) {
    await UserDM.findOneAndUpdate({ _id: userId }, { $pull: { entries: entryId } });
  }

  async removeTechniqueFromBook(userId, techniqueId) {
    await UserDM.findOneAndUpdate({ _id: userId }, { $pull: { techniques: techniqueId } });
  }



  //get
  async getUser(userId) {
    const user = await UserDM.findOne({ _id: userId });
    console.log(user);
    return user;
  }

  async getTechnique(techniqueId) {
    const technique = await TechniqueDM
  }

  //delete
  async delete(userId) {
    return await UserDM.findByIdAndDelete({ _id: userId });
  }

}

module.exports = exports.default = User;