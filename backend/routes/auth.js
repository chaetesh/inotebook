const express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const mysql = require("mysql2");

const JWT_SECRET = "Aeteshis@goodboy";

const mysqlConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "app",
};

const connection = mysql.createConnection(mysqlConfig);

// Create a user using POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("name", "Enter a Valid name").isLength({ min: 3 }),
    body("password", "Password at least 5 Characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    };

    // Inserting new user into MySQL
    connection.query("INSERT INTO user SET ?", user, (error, results) => {
      if (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server error");
      }

      const data = {
        user: {
          id: results.insertId,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken);
      success = true;
      res.json({ success, authtoken });
    });
  }
);

// Authenticate a user using POST "/api/auth/login".
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Fetching user from MySQL based on email
    connection.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      async (error, results) => {
        if (error) {
          console.error(error.message);
          return res.status(500).send("Internal Server error");
        }

        if (results.length === 0) {
          return res.status(400).json({ success, error: "Wrong Credentials!" });
        }

        const user = results[0];
        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
          return res.status(400).json({ success, error: "Wrong Credentials!" });
        }

        const data = {
          user: {
            id: user.id,
          },
        };

        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);
        success = true;

        res.json({ success, authtoken });
      }
    );
  }
);

module.exports = router;
