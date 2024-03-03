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
  description: {
    type: String,
    required: false,
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
        default: true
      },
      joinedDate: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        default: "invited",
        enum: ["active", "inactive","invited"]
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
        default: true
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
        default: false
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
    default: false
  },
  updatedAt: {
    type: Date,
  },
  updatedBy: {},
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
