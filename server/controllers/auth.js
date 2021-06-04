const users = [];
const bcrypt = require("bcryptjs");

module.exports = {
  login: (req, res) => {
    console.log("Logging In User");
    console.log(req.body);
    const { username, password } = req.body;
    for (let i = 0; i < users.length; i++) {
      const existing = bcrypt.compareSync(password, users[i].passwordHash);
      if (existing && users[i].username === username) {
        let objectToReturn = { ...users[i] };
        delete objectToReturn.passwordHash;
        res.status(200).send(objectToReturn);
        return;
      }
    }
    res.status(400).send("User not found.");
  },

  register: (req, res) => {
    console.log("Registering User");
    console.log(req.body);
    const { username, email, firstName, lastName, password } = req.body;

    const salt = bcrypt.genSaltSync(5);
    const passwordHash = bcrypt.hashSync(password, salt);

    let newUser = {
      username: username,
      email: email,
      firstName: firstName,
      lastName: lastName,
      passwordHash,
    };
    users.push(newUser);
    res.status(200).send(req.body);
  },
};
