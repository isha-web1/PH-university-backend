import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import validator from "validator";
import config from "../config";
import {
  
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./students/students.interface";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "first name must be included"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid",
    },
  },
  secondName: { type: String },
  lastName: { type: String, required: [true, "last name must be included"] },
});

const GuardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "father name must be included"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "father occupation must be included"],
  },
  fatherContact: {
    type: String,
    required: [true, "father contact number must be included"],
  },
  motherName: {
    type: String,
    required: [true, "mother name must be included"],
  },
  motherOccupation: {
    type: String,
    required: [true, "mother occupation must be included"],
  },
  motherContact: {
    type: String,
    required: [true, "mother contact must be included"],
  },
});

const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, "name is must be included"] },
  occupation: {
    type: String,
    required: [true, "occupation is must be included"],
  },
  contact: {
    type: String,
    required: [true, "contact number must be included"],
  },
  address: { type: String, required: [true, "address must be included"] },
});

const StudentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ["female", "male"],
      message: "gender is required",
    },
    required: true,
  },
  dateOfBirth: { type: Date },
  email: {
    type: String,
    required: [true, "email must be included"],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "{VALUE} is not valid email type",
    },
  },
  contactNo: {
    type: String,
    required: [true, "contact number must be included"],
  },
  emergencyContact: {
    type: String,
    required: [true, "emergency contact number must be included"],
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  },
  presentAddress: {
    type: String,
    required: [true, "present address must be included"],
  },
  permanentAddress: {
    type: String,
    required: [true, "permanent address must be included"],
  },
  guardian: {
    type: GuardianSchema,
    required: true,
  },
  localGuardian: {
    type: LocalGuardianSchema,
    required: true,
  },
  profileImage: { type: String },
  isActive: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
  },
  isDeleted:{
      type : Boolean,
      default : false
  }
});



// pre save middleware/hook : will work on create() save()
StudentSchema.pre("save", async function (next) {
  // console.log(this, 'pre hook : we will save the data')
  // hashing password and save into DB
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// post save middleware/hook
StudentSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// Query middleware
StudentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  });

  StudentSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({$match : {isDeleted :{$ne : true}}})
    next();
  });
// create custom static method

StudentSchema.statics.isUserExists = async function(id:string){
    const existingUser = await Student.findOne({id});
    return existingUser
}

// create a custom instance method
// StudentSchema.methods.isUserExists = async function(id : string){
//     const existingUser = await Student.findOne({id});
//     return existingUser
// }



export const Student = model<TStudent, StudentModel>("Student", StudentSchema);
