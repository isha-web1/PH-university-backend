import { z } from 'zod';

const userNameValidationSchema = z.object({
    firstName: z.string().min(1, 'First name must be included').regex(/^[A-Za-z]+$/, 'First name must contain only alphabets'),
    secondName: z.string().optional(),
    lastName: z.string().min(1, 'Last name must be included')
});

const GuardianValidationSchema = z.object({
    fatherName: z.string().min(1, 'Father name must be included'),
    fatherOccupation: z.string().min(1, 'Father occupation must be included'),
    fatherContact: z.string().min(1, 'Father contact number must be included'),
    motherName: z.string().min(1, 'Mother name must be included'),
    motherOccupation: z.string().min(1, 'Mother occupation must be included'),
    motherContact: z.string().min(1, 'Mother contact must be included')
});

const LocalGuardianValidationSchema = z.object({
    name: z.string().min(1, 'Name must be included'),
    occupation: z.string().min(1, 'Occupation must be included'),
    contact: z.string().min(1, 'Contact number must be included'),
    address: z.string().min(1, 'Address must be included')
});

const StudentValidationSchema = z.object({
    id: z.string().min(1, 'ID is required'),
    name: userNameValidationSchema,
    gender: z.enum(['male', 'female'], { message: 'Gender is required' }),
    dateOfBirth: z.coerce.date().optional(),
    email: z.string().min(1, 'Email must be included').email('Invalid email format'),
    contactNo: z.string().min(1, 'Contact number must be included'),
    emergencyContact: z.string().min(1, 'Emergency contact number must be included'),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']).optional(),
    presentAddress: z.string().min(1, 'Present address must be included'),
    permanentAddress: z.string().min(1, 'Permanent address must be included'),
    guardian: GuardianValidationSchema,
    localGuardian: LocalGuardianValidationSchema,
    profileImage: z.string().optional(),
    isActive: z.enum(['active', 'blocked']).default('active')
});

export default StudentValidationSchema;
