import { User } from "../models/User.js";
import {cryptPassword, comparePassword} from '../utils/encryptPass.js'

const validateUser = (username) => {
  return User.getUsers().find((user) => user.username === username);
};
const hashPassword = (password) => {
  cryptPassword(password, (err, hash) => {
    password = hash
  });
  return password
};
// Users
export const getUsers = (req, res) => {
  const result = User.getUsers();
  if (result) {
    res.status(200).json(User.getUsers());
  } else {
    res.status(400).json({ message: "Error getting users" });
  }
};

export const getUser = (req, res) => {
  const user = User.getUsers().find(
    (user) => user.userId === Number(req.params.id)
  );
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).json({ message: "Error getting user" });
  }
};

export const addUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (validateUser(username)) {
    return res.status(400).json({ message: "User already exists" });
  }
  if (username && password) {
    cryptPassword(password, (err, hash) => {
      if (err) {
        return res.status(400).json({ message: "Error creating user" });
      }
      const user = new User(username, hash);
      res.status(201).json(user);
    });
  } else {
    res.status(400).json({ message: "Error creating user" });
  }
};


export const loginUser = (req, res) => {
  const username = req.body.username;
  let password = req.body.password;
 
  const user = validateUser(username);
  if (user && user.password) {
    comparePassword(hashPassword(password), user.password, (err, isMatch) => {
      if (err) {
        return res.status(400).json({ message: "Error logging in" });
      }
      if (isMatch) {
        return res.status(200).json(user);
      } else {
        return res.status(400).json({ message: "Invalid password" });
      }
    });
  } else {
    res.status(400).json({ message: "Error logging in" });
  }
}

