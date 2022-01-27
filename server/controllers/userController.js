const User = require ('../models/userModel');

const userController = {};

userController.getAllUsers = (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
        res.locals.users = users;
        return next();
    })
};

userController.createUser = (req, res, next) => {
    const {username, password} = req.body;
    console.log(req.body)
    User.create({username: username, password: password})
        .then(() => {
            res.locals = req.body;
            return next();
        })
        .catch((err)=>{
            return next('Error in userController.createUser: ' + JSON.stringify(err));
        });
        
}

module.exports = userController;