const UserDM = require('../database/datamodels/User'),
  UserTechBook = require('./userTechBook'),
  Technique = require('../database/datamodels/techniques/Technique');


class TechniqueEntry {
  async create({ name, positionFrom, desc, owner }) {
    const newTechnique = new Technique({
      name: name,
      positionFrom: positionFrom,
      desc: desc,
      owner: owner
    });

    await newTechnique.save()

    return newTechnique;
  }

  async addTechnique(techniqueId) {
    const newTechniqueModel = new UserTechBook();
    await newTechniqueModel.createTechnique(techniqueId);
  }

  async edit(techniqueId, data) {
    const technique = await Technique.findOneAndUpdate({ _id: techniqueId }, data);
    return technique;
  }


}

module.exports = exports.default = TechniqueEntry;