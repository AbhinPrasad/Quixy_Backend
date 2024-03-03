import moment from "moment";
import { Project, User } from "../models/index.js";
import {dataConstants as constants, messageConstants as message} from "../constants/index.js";
import { createdBy } from "../utils/common.js";
import response from "../utils/response.js";

export const createProject = async (req, res, next) => {
  try {
    const body = req.body;
    //TODO: check if user exists!
    body.createdBy = createdBy(req);
    const date = moment().toDate();

    const doc = new Project({
      name: body.projectName,
      shortName: body.projectShortName,
      description: body.projectDescription,
      masterAdminId: body.userId,
      users: [
        {
          userId: body.userId,
          role: constants.masterAdmin,
          joinedDate: date,
          status: constants.active,
        },
      ],
      createdAt: date,
      createdBy: body.createdBy,
    });
    const saveProject = await doc.save();

    if (!saveProject) {
      return next({ statusCode: 400, message: message.createProjectFailed });
    }
    //users => projects [] => projectId,role,joinedDate,masterAdmin
    const updateUser = await User.findOneAndUpdate(
      { _id: body.userId },
      {
        $push: {
          projects: {
            projectId: saveProject._id,
            role: constants.masterAdmin,
            joinedDate: date,
            masterAdmin: true,
          },
        },
      },
      { new: true } //returns the updated user
    );

    response(res, message.createProjectSuccess, {
      projectId: saveProject._id,
      userId: updateUser._id,
    });
  } catch (error) {
    next(error);
  }
};
