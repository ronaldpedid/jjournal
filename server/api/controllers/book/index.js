const util = require('../../lib/utils.js'),
  User = require('../../lib/models/user'),
  Technique = require('../../lib/models/technique')
//validate = require('../../lib/validators.js'),

module.exports = {
  registerTechnique: registerTechnique,
  retrieveBook: retrieveBook,
  retrieveUserTechniques: retrieveUserTechniques,
  retrieveAllTechniques: retrieveAllTechniques,
  retrieveTechnique: retrieveTechnique,
  updateTechnique: updateTechnique,
  deleteTechnique: deleteTechnique
}

//get a single item from the db
async function retrieveBook(req, res) {
  return new Promise((resolve, reject) => {
    Book.findById(req.params.id)
      .then(book => (res.json(book)));
  })
    .catch(err => res.status(404).json({ success: false }));
}

//create a post request to add a new item to the db
async function registerTechnique(req, res) {
  try {
    const techniqueModel = new Technique();
    const userModel = new User();

    const newTechnique = await techniqueModel.create(req.body);
    const updatedTechniqueNum = await userModel.incRegisteredTechniqueAmount(req.user._id, 1);

    return res.json({ newTechnique, updatedTechniqueNum });
  } catch (err) {
    res.status(500);
    console.log(err);
    res.json({ error: true })
  }
}

//get a list of all items from the db
async function retrieveAllTechniques(req, res) {
  return new Promise((resolve, reject) => {
    Technique.find()
      .sort({ date: -1 })
      .then(technique => (res.json(technique)))
      .catch(err => console.log(err));
  })
}


async function retrieveUserTechniques(req, res) {
  return new Promise((resolve, reject) => {
    User.findById(req.user.id)
      .sort({ date: -1 })
      .then(technique => (res.json(technique)))
      .catch(err => console.log(err));
  })
}

//delete an item from the db
async function deleteTechnique(req, res) {
  return new Promise((resolve, reject) => {
    Technique.findById(req.params.id)
      .then(technique => technique.remove()
        .then(() => res.json({ Success: true })));
  })
    .catch(err => res.status(404).json({ success: false }));
}


//update an item from the db
async function updateTechnique(req, res) {
  return new Promise((resolve, reject) => {
    Technique.findById(req.params.id)
      .then(technique =>
        technique.save()
          .then(technique => res.json(technique)));
  })
    .catch(err => res.status(404).json({ success: false }));
}

//get a single item from the db
async function retrieveTechnique(req, res) {
  return new Promise((resolve, reject) => {
    Technique.findById(req.params.id)
      .then(technique => (res.json(technique)));
  })
    .catch(err => res.status(404).json({ success: false }));
}