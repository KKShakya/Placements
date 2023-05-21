const User = require('../modal/userModal.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//register using name email and password
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //if one is missing throw error
    if (!name || !email || !password) {
      return res.status(400).send("Please Enter all the details");
    }

    //checking if already registered
    let user = await User.findOne({ email });

    if (user) {
      return res.status(409).send("User Already Exist");
    }

    //encrypting the pasword
    const encrypt = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: encrypt });
    await user.save();
    return res.status(200).json({ success: true, message: "Your Account has been created." })

  } catch (error) {
    res.status(500).send(error.message);
  }
}



// login routes
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Please Enter all the details")
    }


    // forcefully getting password because
    // in schema we have password select as fasle;
    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(409).send("Your email or password is incorrect")
    }

    //comapre password andd generate token
    if (user && (await bcrypt.compare(password, user.password))) {

      const token = jwt.sign({ "userID": user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      return res.status(200).json({ message: "Login Failed.", "token": token });

    }

  } catch (error) {
    res.status(500).send(error.message);
  }
}


//geting profiles of users
const getUser = async (req, res) => {

  try {

    if (req.user !== null) {
      return res.status(200).json(req.user);
    } else {
      return res.status(400).json({ message: "User not Found." });
    }

  } catch (error) {
    res.status(500).send(error.message);
  }

}



module.exports = { getUser, register, login }