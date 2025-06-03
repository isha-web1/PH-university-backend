
import { model, Schema } from "mongoose";
import validator from "validator";

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
  id: { type: String, required: [true, 'id is required'], unique: true },
  user : {
    type : Schema.Types.ObjectId,
    required : [true, 'user id is required'],
    unique : true,
    ref : 'User'
  },

  name: {
    type: userNameSchema,
    required: [true, "name is required"],
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
  admissionSemester : {
       type : Schema.Types.ObjectId,
        ref : 'AcademicSemester',
  },
  isDeleted:{
      type : Boolean,
      default : false
  },
  academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
},{
  toJSON: {
    virtuals: true,
  }
});

// virtual field

StudentSchema.virtual('fullName').get(function(){
  return `${this?.name?.firstName} ${this?.name?.secondName} ${this?.name?.lastName}`
})





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
