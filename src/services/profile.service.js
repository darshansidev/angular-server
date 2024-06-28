require('dotenv').config();
const User = require('../models/user.model');
const { HttpException } = require('../exceptions/HttpsException');
const fs = require('fs');
const { uploadImage, deleteImage } = require('../utils/cloudinary.util');
const { mongoose } = require('mongoose');

const getProfileByIdService = async (userData, userId) => {

    if (userData._id == userId || userData.userType === 'Admin') {

        const getCollectionData = await User.findOne({ _id: new mongoose.Types.ObjectId(userId), isDeleted: false });

        return getCollectionData;
    }
    else {

        throw HttpException(401, "Unauthorized To Access....")
    }
}

const getAllProfileService = async (userData) => {
    if (userData.userType === 'Admin') {

        const getCollectionData = await User.find({ isDeleted: false });

        return getCollectionData;
    }
    else {

        throw HttpException(401, "Unauthorized To Access....")
    }
}
const editProfileService = async (userData, userId, profileData) => {
    const uId = new mongoose.Types.ObjectId(userId);
    if (userData._id == userId || userData.userType === 'Admin') {

        const getCollectionData = await User.findOne({ _id: new mongoose.Types.ObjectId(userId) });

        if (!getCollectionData) throw HttpException(409, "No Data Found");

        if (profileData.photoProof !== getCollectionData.onCloudinaryLink && profileData.photoProof !== undefined && profileData.photoProof !== null) {

            if (getCollectionData.cloudPublicId) {
                const oldImagePublicId = getCollectionData.cloudPublicId;

                await deleteImage(oldImagePublicId);
            }


            const cloudImageLink = await uploadImage(profileData?.photoProof);
            profileData.onCloudinaryLink = await cloudImageLink?.secure_url;
            profileData.cloudPublicId = await cloudImageLink?.public_id;
        }

        const updatedCollection = await User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userId) }, { ...profileData }, { new: true });

        if (!updatedCollection) throw HttpException(409, "Profile Data Not Updated");

        return updatedCollection;
    }
    else {

        throw HttpException(401, "Unauthorized To Access....")
    }
}

const deleteProfileService = async (userId, userData) => {
    if (userData.userType === 'Admin') {

        const deletedCollection = await User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userId), isDeleted: false }, { isDeleted: true }, { new: true });

        if (!deletedCollection) {
            throw HttpException(409, "User Doesn't Existing.....")
        }
        return deletedCollection;
    }
    else {
        throw HttpException(401, "Unauthorized To Access....")
    }
}

module.exports = { getProfileByIdService, getAllProfileService, editProfileService, deleteProfileService }