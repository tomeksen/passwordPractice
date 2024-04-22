import express from "express";
import { getUsers, getUser, addUser,loginUser } from "../controller/controller.js";

const api = express.Router();

api.get("/users", getUsers);
api.get("/users/:id", getUser);
api.post("/users", addUser);
api.post("/usersLogin", loginUser);

export default api;
