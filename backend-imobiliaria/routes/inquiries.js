const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, inquiryController.createInquiry);
router.get('/', authMiddleware, inquiryController.getAllInquiries);
router.get('/:id', authMiddleware, inquiryController.getInquiryById);
router.delete('/:id', authMiddleware, inquiryController.deleteInquiry);

module.exports = router;