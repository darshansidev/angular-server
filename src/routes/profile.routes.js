const router = require('express').Router();
const profileController = require('../controllers/profile.controller');
const { upload } = require('../middlewares/multer.middleware');
const authMiddleware = require('../middlewares/tokenVerify.middleware');

router.get('/get/:userId', authMiddleware, profileController.getProfileById);
router.get('/getDetails', authMiddleware, profileController.getAllProfile);
router.put('/update/:userId', upload.single('photoProof'), authMiddleware, profileController.editProfile);
router.delete('/delete/:userId', authMiddleware, profileController.deleteProfile);

module.exports = router;