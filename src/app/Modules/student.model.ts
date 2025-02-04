import { Schema, model, connect } from 'mongoose';
import { Student } from './students/students.interface';

const StudentSchema = new Schema<Student>({
    id: { type: String },
    name: {
        firstName: { type: String, required: true },
        secondName: { type: String },
        lastName: { type: String, required: true }
    },
    gender : ['female','male'],
    dateOfBirth : {type : Date},
    email : {type : String, required : true},
    contactNo : {type : String, required : true},
    emergencyContact : {type : String, required : true},
    bloodGroup : ['A+','A-','B+','B-','O+','O-','AB+','AB-'],
    presentAddress : {type : String, required : true},
    permanentAddress : {type : String, required : true},
    guardian : {
        fatherName : {type : String, required : true},
        fatherOccupation : {type : String, required : true},
        fatherContact : {type : String, required : true},
        motherName : {type : String, required : true},
        motherOccupation : {type : String, required : true},
        motherContact : {type : String, required : true}
    },
    localGuardian : {
        name : {type : String, required : true},
        occupation : {type : String, required : true},
        contact : {type : String, required : true},
        address : {type : String, required : true}
    },
    profileImage : {type : String},
    isActive : ['active','blocked']

})