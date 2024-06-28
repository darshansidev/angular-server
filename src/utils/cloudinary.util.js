// Import the Cloudinary SDK
const cloudinary = require('cloudinary').v2;
const path = require('path');

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Function to upload an image to Cloudinary
const uploadImage = (filePath) => {
    if (!filePath) {
        return;
    }
    const filename = path.basename(filePath);
    const folderName = 'Smsp Image Folder';
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(filePath, { public_id: `${folderName}/${filename}` }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

// Function to delete an image from Cloudinary
const deleteImage = (publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = { uploadImage, deleteImage }
