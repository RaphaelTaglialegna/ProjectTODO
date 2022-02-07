const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');
const MacaddressValidadtion = require('../middlewares/MacaddressValidadtion');

router.post('/',TaskValidation, TaskController.create);
router.put('/:id', TaskValidation, TaskController.update);

router.get('/filter/all',MacaddressValidadtion, TaskController.all);
router.get('/:id', TaskController.show);


module.exports = router; 