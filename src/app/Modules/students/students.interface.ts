

export type UserName = {
    firstName : string;
    secondName?: string;
    lastName : string;
}

export type Guardian = {
    fatherName : string;
    fatherOccupation : string;
    fatherContact : string;
    motherName : string;
    motherOccupation : string;
    motherContact : string;
}

export type LocalGuardian = {
    name : string;
    occupation : string;
    contact : string;
    address : string;
}

export type Student = {
    id : string;
    password : string,
    name : UserName;
    gender : 'male' | 'female';
    dateOfBirth? : Date;
    email : string;
    contactNo : string;
    emergencyContact : string;
    bloodGroup? : "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
    presentAddress : string;
    permanentAddress : string;
    guardian : Guardian;
    localGuardian : LocalGuardian;
    profileImage? : string;
    isActive : 'active' | 'blocked';


}