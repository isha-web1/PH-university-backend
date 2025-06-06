import { z } from 'zod';

const createUserNameValidationSchema = z.object({
    firstName: z.string().min(1, 'First name must be included').regex(/^[A-Za-z]+$/, 'First name must contain only alphabets'),
    secondName: z.string().optional(),
    lastName: z.string().min(1, 'Last name must be included')
});

const createGuardianValidationSchema = z.object({
    fatherName: z.string().min(1, 'Father name must be included'),
    fatherOccupation: z.string().min(1, 'Father occupation must be included'),
    fatherContact: z.string().min(1, 'Father contact number must be included'),
    motherName: z.string().min(1, 'Mother name must be included'),
    motherOccupation: z.string().min(1, 'Mother occupation must be included'),
    motherContact: z.string().min(1, 'Mother contact must be included')
});

const createLocalGuardianValidationSchema = z.object({
    name: z.string().min(1, 'Name must be included'),
    occupation: z.string().min(1, 'Occupation must be included'),
    contact: z.string().min(1, 'Contact number must be included'),
    address: z.string().min(1, 'Address must be included')
});

const createStudentValidationSchema =  z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      // profileImg: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});


const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      // profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const StudentValidations = {
     createStudentValidationSchema,
        updateStudentValidationSchema
};
