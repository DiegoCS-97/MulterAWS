const express = require('express');
const UsersController = require('../controllers/usersController');
const {User} = require('../models/index');
const bodyParser = require('body-parser');
const multer = require('multer');