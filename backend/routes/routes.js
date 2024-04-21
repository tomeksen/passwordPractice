import express from "express";
import { getUsers, getUser, addUser,loginUser } from "../modules/modules.js";

const api = express.Router();

api.get("/users", getUsers);
api.get("/users/:id", getUser);
api.post("/users", addUser);
api.post("/usersLogin", loginUser);

export default api;
