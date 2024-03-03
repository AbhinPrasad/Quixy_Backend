import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  profession: {
    type: String,
    required: true,
    // enum: ['Developer', 'Designer', 'Manager', 'Analyst']
  },
  company: {
    type: String,
    required: false
  },
  joinedDate: {
    type: Date,
    required: true
  },
  projects: [{
    projectId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    joinedDate: {
      type: Date,
      required: true
    },
    masterAdmin: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  issues: [{
    issueId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    deleted: {
      type:Boolean,
      default:false
    }
  }],
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }
});

const User = mongoose.model('User', userSchema);

export default User;