const asyncHandler = require('express-async-handler');
const User = require('./users-schema');
const path = require('path');

/**
 * Get all users
 */
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});

    let i = 0;
    const usersList = users.map((item) => {
      return `<tr>
                <td>${i++}</td>
                <td><a href="/users/${item._id}">${item.title}</a></td>
                <td><a href="/users/edit/${item._id}">Edit</a></td>
                <td><a href="/users/delete/${item._id}">Delete</a></li></td>
            </tr>`;
    }).join('');

    res.status(200).render(path.join(__dirname, '/users-tpl.ejs'), {
      usersList
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Get one User
 */
const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) { res.status(400).json({ message: `Cannot find User id: ${req.params.id}` }); }

    const userDetails = user.text;
    const userId = user._id;

    res.status(200).render(path.join(__dirname, '/users-tpl-one.ejs'), {
      userId,
      userDetails
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Add new User
 */
const postUser = asyncHandler(async (req, res) => {
  try {

    if (!req.body.text) {
      res.status(200).render(path.join(__dirname, '/users-tpl-add.ejs'));
    } else {

      const user = await User.create({
        text: req.body.text
      });

      res.status(200).render(path.join(__dirname, '/users-tpl-add.ejs', { user }));
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Update User
 */
const putUser = asyncHandler(async (req, res) => {
  let userId = '';
  let userText = '';

  try {
    const user = await User.findById(req.params.id);

    if (!user) { res.status(400).json({ message: `Cannot find User id: ${req.params.id}` }); }

    userId = user._id;
    userText = user.text;

    if (!req.body.text) {
      res.status(200).render(path.join(__dirname, '/users-tpl-edit.ejs', { userId, userText }));
    } else {

      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });

      userId = updatedUser._id;
      userText = updatedUser.text;

      res.status(200).render(path.join(__dirname, '/users-tpl-edit.ejs', { userId, userText }));
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});

/**
 * Delete User
 */
const deleleUser = asyncHandler(async (req, res) => {

  try {
    const user = await User.findById(req.params.id);

    if (!user) { res.status(400).json({ message: `Cannot find User id: ${req.params.id}` }); }

    await user.remove();

    res.status(200).redirect('/users');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { getUsers, getUser, postUser, putUser, deleleUser };
