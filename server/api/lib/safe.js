const bcrypt = require('bcrypt');
const saltRounds = 12;

module.exports = {
  generatePasswordHash: generatePasswordHash
}

async function generatePasswordHash(password) {
  return bcrypt.hash(password, saltRounds)
    .then(hash => hash)
    .catch(err => {
      throw err;
    });

}

