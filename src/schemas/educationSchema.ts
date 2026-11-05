import { z } from 'zod';

/**
 * Preprocessor helper for numerical inputs to properly handle empty strings.
 * Applies the preprocess wrapper around the configured ZodNumber schema.
 */
const numericField = (numberSchema: z.ZodNumber) =>
  z.preprocess(
    (val) => (val === '' || val === null || val === undefined ? undefined : Number(val)),
    numberSchema
  );

export const qualificationSchema = z.object({
  degree: z
    .string()
    .trim()
    .min(2, 'Degree / Course is required')
    .max(100, 'Degree name cannot exceed 100 characters'),

  institution: z
    .string()
    .trim()
    .min(2, 'Institution / College name is required')
    .max(120, 'Institution name cannot exceed 120 characters'),

  yearOfPassing: numericField(
    z
      .number({
        required_error: 'Year of passing is required',
        invalid_type_error: 'Year of passing must be a valid number',
      })
      .int('Year of passing must be a whole year')
      .min(1960, 'Year must be 1960 or later')
      .max(new Date().getFullYear() + 5, 'Year cannot be more than 5 years in the future')
  ),

  percentage: numericField(
    z
      .number({
        required_error: 'Percentage is required',
        invalid_type_error: 'Percentage must be a valid number',
      })
      .min(0, 'Percentage cannot be less than 0')
      .max(100, 'Percentage cannot exceed 100')
  ),
});

/**
 * Step 2: Education Details Schema
 * Requires at least one qualification entry.
 */
export const educationSchema = z.object({
  qualifications: z
    .array(qualificationSchema)
    .min(1, 'At least one qualification entry is required'),
});

export type QualificationFormData = z.infer<typeof qualificationSchema>;
export type EducationFormData = z.infer<typeof educationSchema>;
