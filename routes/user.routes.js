import { Router } from "express";
import {
  getUser,
  getUsers,
  deleteUser,
} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middlewate.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => res.send({ title: "CREATE new user" }));

userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE user by id" }));

userRouter.delete("/:id", deleteUser);

export default userRouter;
