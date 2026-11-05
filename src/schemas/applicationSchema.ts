import { z } from 'zod';

/**
 * Step 4: Application Details Schema
 * Includes cross-field validation rule:
 * - Expected joining date must be today or in the future.
 */
export const applicationSchema = z.object({
  position: z
    .string()
    .trim()
    .min(1, 'Please select the position applied for'),

  expectedJoiningDate: z
    .string()
    .min(1, 'Expected joining date is required')
    .refine(
      (dateStr) => {
        if (!dateStr) return false;
        const selected = new Date(dateStr);
        if (isNaN(selected.getTime())) return false;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected >= today;
      },
      {
        message: 'Expected joining date must be today or in the future',
      }
    ),

  portfolioUrl: z
    .string()
    .trim()
    .url('Portfolio link must be a valid URL (e.g. https://github.com/username)')
    .or(z.literal(''))
    .optional(),

  coverNote: z
    .string()
    .trim()
    .max(1000, 'Cover note cannot exceed 1000 characters')
    .optional(),

  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions to proceed' }),
  }),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
