import {
  addSkill,
  deleteSkills,
  getSkill,
  getSkills,
} from "./../controller/SkillsController";
import { Router } from "express";

const skillsRoutes = Router();

skillsRoutes.get("/", getSkills);
skillsRoutes.get("/:id", getSkill);
skillsRoutes.post("/add-skill", addSkill);
skillsRoutes.delete("/delete-skill/:id", deleteSkills);

export default skillsRoutes;
