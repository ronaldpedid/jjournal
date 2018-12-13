const bcrypt = require('bcrypt');
const saltRounds = 12;


module.exports = {
  generatePasswordHash: generatePasswordHash
}

/**
 * Generates and returns a bcrypt hash
 */
//save the new user


async function generatePasswordHash(password) {
  return bcrypt.hash(password, saltRounds)
    .then(hash => hash)
    .catch(err => {
      throw err;
    });

}

