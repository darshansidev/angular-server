const profileService = require('../services/profile.service');

const getProfileById = async (req, res, next) => {
    try {
        const userData = req.user;
        const userId = req.params.userId;

        const data = await profileService.getProfileByIdService(userData, userId);

        res.json({ status: 200, message: 'Profile Fetched Successfully', data });

    } catch (error) {
        next(error)
    }
}
const getAllProfile = async (req, res, next) => {
    try {

        const userData = req.user;

        const data = await profileService.getAllProfileService(userData);

        res.json({ status: 200, message: 'Get All User Successfully', data });
    } catch (error) {
        next(error)
    }
}
const editProfile = async (req, res, next) => {
    try {
        const userData = req.user;
        const userId = req.params.userId;
        const profileData = req.body;

        profileData.photoProof = req.file?.path;

        const data = await profileService.editProfileService(userData, userId, profileData);

        res.json({ status: 200, message: 'Profile Edited successfully', data });
    } catch (error) {
        next(error)
    }
}
const deleteProfile = async (req, res, next) => {
    try {
        const userData = req.user;
        const userId = req.params.userId;

        const data = await profileService.deleteProfileService(userId, userData);

        res.json({ status: 200, message: 'Profile Deleted successfully', data });
    } catch (error) {
        next(error)
    }
}


module.exports = { getProfileById, getAllProfile, editProfile, deleteProfile }