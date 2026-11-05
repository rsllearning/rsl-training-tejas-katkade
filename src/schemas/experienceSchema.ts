import { z } from 'zod';

const numericField = (numberSchema: z.ZodNumber) =>
  z.preprocess(
    (val) => (val === '' || val === null || val === undefined ? undefined : Number(val)),
    numberSchema
  );

/**
 * Company Schema with cross-field validation rule:
 * - "to" date must be on or after "from" date.
 */
export const companySchema = z
  .object({
    companyName: z
      .string()
      .trim()
      .min(2, 'Company name is required')
      .max(100, 'Company name cannot exceed 100 characters'),

    role: z
      .string()
      .trim()
      .min(2, 'Role / Designation is required')
      .max(80, 'Role cannot exceed 80 characters'),

    fromDate: z.string().min(1, 'From date is required'),

    toDate: z.string().min(1, 'To date is required'),
  })
  .refine(
    (data) => {
      if (!data.fromDate || !data.toDate) return true;
      return new Date(data.toDate) >= new Date(data.fromDate);
    },
    {
      message: '"To" date must be on or after "From" date',
      path: ['toDate'],
    }
  );

/**
 * Discriminated Union Variant 1: Fresher
 */
export const fresherExperienceSchema = z.object({
  status: z.literal('fresher'),
  availabilityToJoin: z
    .string()
    .trim()
    .min(1, 'Please specify your availability to join'),
});

/**
 * Discriminated Union Variant 2: Experienced
 */
export const experiencedExperienceSchema = z.object({
  status: z.literal('experienced'),
  totalExperienceYears: numericField(
    z
      .number({
        required_error: 'Total experience is required',
        invalid_type_error: 'Total experience must be a valid number',
      })
      .positive('Total experience must be greater than 0')
      .max(50, 'Total experience cannot exceed 50 years')
  ),

  noticePeriodDays: numericField(
    z
      .number({
        required_error: 'Notice period is required',
        invalid_type_error: 'Notice period must be a valid number',
      })
      .min(0, 'Notice period cannot be negative')
      .max(365, 'Notice period cannot exceed 365 days')
  ),

  companies: z
    .array(companySchema)
    .min(1, 'At least one previous company is required for experienced candidates'),
});

/**
 * Step 3: Experience Schema
 * Modelled as a discriminated union on the 'status' property.
 */
export const experienceSchema = z.discriminatedUnion('status', [
  fresherExperienceSchema,
  experiencedExperienceSchema,
]);

export type CompanyFormData = z.infer<typeof companySchema>;
export type FresherExperienceFormData = z.infer<typeof fresherExperienceSchema>;
export type ExperiencedExperienceFormData = z.infer<typeof experiencedExperienceSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
