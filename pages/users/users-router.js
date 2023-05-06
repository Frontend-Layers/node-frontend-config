const express = require('express');
const router = express.Router();
const { getUsers, getUser, postUser, putUser, deleleUser } = require('./users-ctrl');

router.route('/').get(getUsers);
router.route('/add').get(postUser).post(postUser);
router.route('/edit/:id').get(putUser).post(putUser);
router.route('/delete/:id').get(deleleUser);
router.route('/:id').get(getUser);

module.exports = router;
