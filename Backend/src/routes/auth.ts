import _ from "lodash";
import Joi from "joi";
import bycrpt from "bcrypt";
import express from "express";
import { User } from "../models/user";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user: any = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid user or password.");

  let validPassword = await bycrpt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid user or password.");

  const token = user.generateAuthToken();

  res.send(token);
});

const validate = (req: any) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
};

export default router;
