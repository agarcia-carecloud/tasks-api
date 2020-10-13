const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    description: { type: String },
    isComplete: { type: Boolean },
    completionDate: { type: String },
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", taskSchema);
module.exports = Task;
