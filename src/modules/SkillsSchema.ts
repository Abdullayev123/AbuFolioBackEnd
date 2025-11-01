import mongoose from "mongoose";
const { Schema } = mongoose;

interface Skills {
  name: string;
  description: string;
  icon: string;
}

const SkillsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
});

export default mongoose.model<Skills>("Skills", SkillsSchema);
