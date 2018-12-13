let bcrypt = require('bcrypt-nodejs');
let saltRounds = 12;

async function init(req, res) {
  let p = await generatePasswordHash('testpass').catch((err) => console.log(err));
  console.log(p);
  if (!p) {
    console.log(err);
  }

}

async function generatePasswordHash(password) {
  console.log(password + ' is the pass');
  return bcrypt.hash(password, saltRounds, null, () => {
    console.log(password);
  })

}

init();