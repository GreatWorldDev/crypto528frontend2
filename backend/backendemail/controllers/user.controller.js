// const { LoggerLevel } = require("mongodb")

const fs = require('fs');
const _ = require('lodash');
const { User } = require('../models/user');
const helper = require('../utils/user.helper');
const userService = require('./Services/userservice');

class UserController {
  async create(req, res) {
    // how to check that user is already saved!
    try {
      console.log(req.body);
      const { email, location, locale } = req.body;
      const isValid = userService.validateEmail(req.body.email);

      if (!isValid) {
        return res.status(400).send({
          success: false,
          message: 'Please enter a valid email address'
        });
      }

      const existingUser = await userService.findByEmail(email);

      if (!_.isEmpty(existingUser)) {
        return res.status(409).send({
          success: false,
          message: 'You have previously subscribed'
        });
      }

      const user = new User({ email, location });
      await user.save();

      helper.sendGreetingEmail(email, 'Thanks for subscribing', locale);

      return res.status(201).send({
        success: true,
        message: 'Thank you for subscribing',
        data: user
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: 'Something went wrong! Contact support'
      });
    }
  }

  async submitEmail(req, res) {
    const { email } = req.body;

    const isValid = userService.validateEmail(req.body.email);

    if (!isValid) {
      return res.status(400).send({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Check for duplicate ==> read file for csv
    fs.appendFile('./Email.csv', `${email},\n`, (err) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: 'An Errorr occured'
        });
      }
    });
    res.status(201).send({
      success: true,
      message: 'Thank you for subscribing'
    });
  }
}

module.exports = new UserController();
// export default new UserController();
