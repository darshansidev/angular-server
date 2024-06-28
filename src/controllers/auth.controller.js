const authService = require('../services/auth.service');

const signupUser = async (req, res, next) => {
    try {
        const user = req.body;
        user.photoProof = req.file?.path;
        const data = await authService.createUser(user);

        res.json({ status: 200, message: 'User Added successfully', data });
    } catch (error) {
        next(error)
    }
}

const loginUsers = async (req, res, next) => {
    try {
        const user = req.body;
        const data = await authService.loginUser(user);
        res.json({ status: 200, message: 'User logged in successfully', data });
    } catch (error) {
        next(error);
    }
}
const logoutUser = async (req, res) => {
    try {
        res.clearCookie();
    } catch (error) {
        next(error)
    }
}

module.exports = { signupUser, loginUsers }