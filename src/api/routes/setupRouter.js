const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const { JSONParser } = require("../middleware/bodyParser");
const { SALT_ROUNDS, ADMIN_ID, ROLES } = require("../utils/constants");

// Pick out the errors
const { DUPLICATE_ADMIN_USER } = require("../utils/constants").ERRORS;

const UserModel = require("../models/userModel");

const setupAdminUser = async (req, res, next) => {
  const { name, email, about, password } = req.body;

  try {
    const adminUserFromDb = await UserModel.get(1);

    if (adminUserFromDb) next(DUPLICATE_ADMIN_USER);

    // hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // create the admin user
    const adminUser = {
      id: ADMIN_ID,
      name,
      email,
      password: hashedPassword,
      about,
      role: ROLES.ADMIN
    };

    const newUser = await UserModel.insert(adminUser);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

router.post("/", JSONParser, setupAdminUser);

module.exports = router;