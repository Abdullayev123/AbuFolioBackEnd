import { Request, Response } from "express";
import MyWorks from "../modules/MyWorksSchema";
import cloudinary from "../utils/cloudinary";

export const getWorks = async (req: Request, res: Response) => {
  try {
    const works = await MyWorks.find();
    res.status(200).json(works);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getWork = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const works = await MyWorks.findById(id);
    res.status(200).json(works);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const addWork = async (req: Request, res: Response) => {
  try {
    const {
      projectName,
      projectDetails,
      usingTech,
      projectLink,
      githubLink,
      isLive,
    } = req.body;

    const file = req.file;

    let uploadedImageUrl = "";
    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "myworks",
      });
      uploadedImageUrl = result.secure_url;
    }

    const newWork = new MyWorks({
      imageUrl: uploadedImageUrl,
      projectName,
      projectDetails,
      usingTech,
      projectLink,
      githubLink,
      isLive,
    });

    const savedWork = await newWork.save();
    res.status(201).json(savedWork);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const deleteWork = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedWork = await MyWorks.findByIdAndDelete(id);
    if (!deletedWork) {
      return res.status(404).json({ message: "Work not found" });
    }
    res.status(200).json({ message: "Work deleted successfully", deletedWork });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
export const updateWork = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      imageUrl,
      projectName,
      projectDetails,
      usingTech,
      projectLink,
      githubLink,
      isLive,
    } = req.body;
    const updatedWork = await MyWorks.findByIdAndUpdate(
      id,
      {
        imageUrl,
        projectName,
        projectDetails,
        usingTech,
        projectLink,
        githubLink,
        isLive,
      },
      {
        new: true,
      }
    );
    if (!updatedWork) {
      return res.status(404).json({ message: "Work not found" });
    }
    res.status(200).json(updatedWork);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
