import mongoose from "mongoose";

const Schema = mongoose.Schema;
const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
  },
  masterAdminId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  users: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      isActive: {
        type: Boolean,
        required: true,
      },
      joinedDate: {
        type: Date,
        required: true,
      },
      updatedBy: {},
    },
  ],
  sprints: [
    {
      sprintId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      isActive: {
        type: Boolean,
        required: true,
      },
      deleted: {
        type: Boolean,
        required: true,
      },
    },
  ],
  issues: [
    {
      issueId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      deleted: {
        type: Boolean,
        required: true,
      },
    },
  ],
  createdBy: {},
  createdAt: {
    type: Date,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
  updatedBy: {},
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
