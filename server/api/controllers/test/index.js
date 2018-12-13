const utils = require('../../lib/utils');
const User = require('../../lib/database/models/User');

module.exports = {
  returnData: returnData,
  returnPosted: returnPosted,
  returnUser: returnUser
}

async function returnData(req, res) {
  return new Promise((resolve, reject) => {
    res.json({ hello: "hello World" });
  })
}

async function returnPosted(req, res) {
  return new Promise((resolve, reject) => {
    res.json({ posted: "posted" });
  })
}

async function returnUser(username, email) {
  return new Promise((resolve, reject) => {
    User.find({
      username: username,
      email: email
    }, (err, previousUser) => {
      if (err) {
        reject(err);
      }
      else if (previousUser.length > 0) {
        resolve(previousUser);
      }
      else if (previousUser.length === 0) {
        reject('No user could be recovered');
      }
    }).catch((err) => { console.log(err); reject(err); })
  });
}