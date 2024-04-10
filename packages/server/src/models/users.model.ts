import { model, Schema, Document } from 'mongoose';
import { User, UserRole } from '@interfaces/users.interface';

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.GUEST,
    },
    token: {
      type: String,
      nullable: true,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

const userModel = model<User & Document>('Users', userSchema);

export default userModel;
