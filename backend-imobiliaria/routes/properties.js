const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware(['agent', 'admin']), propertyController.createProperty);
router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getPropertyById);
router.put('/:id', authMiddleware, roleMiddleware(['agent', 'admin']), propertyController.updateProperty);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), propertyController.deleteProperty);

module.exports = router;