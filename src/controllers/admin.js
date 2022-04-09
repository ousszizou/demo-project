const bcrypt = require("bcryptjs");
const db = require("../models");

const User = db.user;
const Role = db.role;

exports.addStudent = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.findOne({ name: "student" }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      user.roles = [role._id];
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send({ message: "Student was registered successfully!" });
      });
    });
  });
}

exports.updateStudent = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.username) {
      user.username = req.body.username;
    }

    if (req.body.email) {
      user.email = req.body.email;
    }

    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8);
    }

    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({ message: "Student was updated successfully!" });
    });
  });
}

exports.getStudent = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "Student not found." });
    }

    res.send(user);
  });
}

exports.getAllStudents = (req, res) => {
  // Get Role's student ID & get all students
  Role.findOne({ name: "student" }, (err, role) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    User.find({ roles: role._id }, (err, users) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send(users);
    });
  });
}

exports.deleteStudent = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "Student not found." });
    }

    res.send({ message: "Student was deleted successfully!" });
  });
}
