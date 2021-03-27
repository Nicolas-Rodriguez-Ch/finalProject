const { validationResult } = require('express-validator');
const { accessToken } = require('../helpers/jwtAuth');
const User = require(`../Models/user.model`);

const getUsers = (req, res) =>{
    // read all users
};
const getUser = (req, res) =>{ 

};
const createUser = async (req, res) =>{ 
    // leer de body -> validar la información
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ errors: `bad request not email or password provided` })
    }
    const emailExist = await User.findOne({ email });

    if (emailExist) {
        res.status(400).json({ errors: `bad request email already exists`})
    }

    const user = new User ({email, password});
    try {
        const savedUser = await user.save();
        const userToken = await accessToken(savedUser.id);
        res.send(userToken);
      } catch (error) {
        console.error(error);
      }
};

const loginUser = async (req, res) => {
    const { email, password } =req.body;

    // TODO: validate emial exist password exist
    const user = await User.findOne({ email });
    try {
        if (!user) {
            res.status(401).json({ errors: `unauthorized` });
        }
        const userToken = await accessToken(user.id);
        res.send(userToken)
    } catch (error) {
        console.log(error)
    }
    res.send(user)
    // validate password ->


}
const editUser = (req, res) =>{ res.send('hello world')};
const deleteUser = (req, res) =>{ res.send('hello world')};

module.exports={
    getUsers, 
    getUser, 
    createUser, 
    editUser, 
    deleteUser, 
    loginUser,
};