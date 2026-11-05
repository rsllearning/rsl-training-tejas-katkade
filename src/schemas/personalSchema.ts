import { z } from 'zod';

/**
 * Step 1: Personal Details Schema
 * Includes cross-field / dependent validation rule:
 * - Candidate must be at least 18 years of age based on dateOfBirth.
 */
export const personalSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(80, 'Full name cannot exceed 80 characters')
    .regex(/^[a-zA-Z\s.'-]+$/, 'Full name must only contain letters, spaces, hyphens, or dots'),

  email: z
    .string()
    .trim()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address'),

  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, 'Phone number must be a valid 10-digit number'),

  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine(
      (dobStr) => {
        const dob = new Date(dobStr);
        if (isNaN(dob.getTime())) return false;

        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        return age >= 18;
      },
      {
        message: 'Candidate must be at least 18 years old',
      }
    ),

  city: z
    .string()
    .trim()
    .min(2, 'Current city must be at least 2 characters')
    .max(50, 'City cannot exceed 50 characters'),
});

export type PersonalDetailsFormData = z.infer<typeof personalSchema>;
