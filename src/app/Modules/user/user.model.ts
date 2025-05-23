import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser>({
    id : {
        type : String,
        required : [true, 'id is required'],
        
    },
    password : {
        type : String,
        required : [true, 'password is required'],
    },
    needsPasswordChange : {
        type : Boolean,
        default : true,
    },
    role : {
        type : String,
        enum : ['admin', 'student', 'faculty'],
    },
    status : {
        type : String,
        enum : ['in-progress', 'blocked'],
        default : 'in-progress',
    },
    isDeleted : {
        type : Boolean,
        default : false,
    }
},
{
    timestamps : true,
}
)


// pre save middleware/hook : will work on create() save()
userSchema.pre("save", async function (next) {
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
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const User =  model<TUser>('User',userSchema);