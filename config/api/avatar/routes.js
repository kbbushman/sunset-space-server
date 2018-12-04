const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/index');

//Avatar index route ============================
router.get('/', ctrl.avatar.index);

//Avatar Show route- show avatar by ID =============
router.get('/:id', ctrl.avatar.show);

//Avatar create route- create new user ===========
// router.post('/:_id', ctrl.avatar.create);

// Avatar edit/update route ========================
// router.put('/:id', ctrl.avatar.create);

// //Avatar destroy route ============================
// router.delete('/:id', ctrl.avatar.destroy);

module.exports = router;