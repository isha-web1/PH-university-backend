import { Schema, model, } from 'mongoose';
import validator from 'validator';
import { Guardian, LocalGuardian,  Student, UserName } from './students/students.interface';


const userNameSchema = new Schema<UserName>({
    firstName: { type: String, required: [true, 'first name must be included'], 
        validate : {
            validator : (value : string) => validator.isAlpha(value),
            message : '{VALUE} is not valid'
        }
    },
    secondName: { type: String },
    lastName: { type: String, required: [true, 'last name must be included'] }
})

const GuardianSchema = new Schema<Guardian>({
    fatherName : {type : String, required : [true, 'father name must be included']},
    fatherOccupation : {type : String, required : [true, 'father occupation must be included']},
    fatherContact : {type : String, required : [true, 'father contact number must be included']},
    motherName : {type : String, required : [true, 'mother name must be included']},
    motherOccupation : {type : String, required : [true, 'mother occupation must be included']},
    motherContact : {type : String, required : [true, 'mother contact must be included']}
});

const LocalGuardianSchema = new Schema<LocalGuardian>({
    name : {type : String, required : [true, 'name is must be included']},
    occupation : {type : String, required : [true, 'occupation is must be included']},
    contact : {type : String, required : [true, 'contact number must be included']},
    address : {type : String, required : [true, 'address must be included']}
});

const StudentSchema = new Schema<Student>({
    id: { type: String, required : true, unique : true },
    name: {
        type : userNameSchema,
        required : true
    },
    gender : {
        type : String,
        enum : {
            values : ['female','male'],
            message : 'gender is required'
        },
        required : true
    },
    dateOfBirth : {type : Date},
    email : {type : String, required : [true, 'email must be included'], unique : true,
        validate : {
            validator : (value : string) => validator.isEmail(value),
            message : '{VALUE} is not valid email type'
        }
    },
    contactNo : {type : String, required : [true, 'contact number must be included']},
    emergencyContact : {type : String, required : [true, 'emergency contact number must be included']},
    bloodGroup : {
        type  : String,
        enum : ['A+','A-','B+','B-','O+','O-','AB+','AB-'],

    },
    presentAddress : {type : String, required : [true, 'present address must be included']},
    permanentAddress : {type : String, required : [true, 'permanent address must be included']},
    guardian : {
        type : GuardianSchema,
        required : true
    },
    localGuardian : {
        type : LocalGuardianSchema,
        required : true
    },
    profileImage : {type : String},
    isActive : {
        type : String,
        enum : ['active','blocked'],
        default : 'active'
    }

})

export const StudentModel = model<Student>('Student', StudentSchema);