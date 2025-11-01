import { Request, Response } from "express";
import Skill from "../modules/SkillsSchema";

export const getSkills = async (req: Request, res: Response) => {
  try {
    const data = await Skill.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const getSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findById(id);
    res.status(200).send(skill);
  } catch (error) {
    res.status(404).send("Skill not found");
  }
};

export const addSkill = async (req: Request, res: Response) => {
  try {
    const { name, description, icon } = req.body;
    const skill = new Skill({ name, description, icon });
    await skill.save();
    res.status(201).send("Skill added");
  } catch (error) {
    res.status(400).send("Error adding skill");
  }
};

export const deleteSkills = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Skill.findByIdAndDelete(id);
    res.status(200).send("Skill deleted");
  } catch (error) {}
};
