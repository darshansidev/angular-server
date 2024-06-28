const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    contactNo: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    userType: {
        type: String,
        enum: ['User', 'Admin', 'Tenant', 'Owner'],
        default: 'User'
    },
    photoProof: {
        type: String,
        default: '',
        trim: true,
    },
    onCloudinaryLink: {
        type: String,
        default: '',
        trim: true
    },
    cloudPublicId: {
        type: String,
        default: '',
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isAccess: {
        type: Boolean,
        default: false
    }
}, { timestamps: true, versionKey: false })

// Define pre hook to update isActive when token expires
userSchema.pre('save', function (next) {
    // Check if token is expired (you need to define your logic here)
    if (this.isModified('token') && !this.token) {
        this.isActive = false; // Set isActive to false if token is expired
    }
    next();
});

module.exports = mongoose.model("User", userSchema);