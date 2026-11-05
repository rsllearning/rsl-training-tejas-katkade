import { z } from 'zod';
import { personalSchema } from './personalSchema';
import { educationSchema } from './educationSchema';
import { experienceSchema } from './experienceSchema';
import { applicationSchema } from './applicationSchema';

/**
 * Combined Master Schema for the 5-Step Job Application Form.
 * Includes cross-step dependent rule:
 * - For experienced candidates, expected joining date should not be earlier than the notice period.
 */
export const jobApplicationSchema = z
  .object({
    personal: personalSchema,
    education: educationSchema,
    experience: experienceSchema,
    application: applicationSchema,
  })
  .superRefine((data, ctx) => {
    // Cross-step validation: notice period vs expected joining date
    if (
      data.experience.status === 'experienced' &&
      typeof data.experience.noticePeriodDays === 'number' &&
      data.experience.noticePeriodDays > 0 &&
      data.application?.expectedJoiningDate
    ) {
      const minDate = new Date();
      minDate.setHours(0, 0, 0, 0);
      minDate.setDate(minDate.getDate() + data.experience.noticePeriodDays);

      const chosenDate = new Date(data.application.expectedJoiningDate);
      if (chosenDate < minDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Expected joining date cannot be earlier than your notice period (${data.experience.noticePeriodDays} days from today)`,
          path: ['application', 'expectedJoiningDate'],
        });
      }
    }
  });

export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;

/**
 * Default initial form values matching the inferred types.
 */
export const defaultFormValues = {
  personal: {
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    city: '',
  },
  education: {
    qualifications: [
      {
        degree: '',
        institution: '',
        yearOfPassing: '' as unknown as number,
        percentage: '' as unknown as number,
      },
    ],
  },
  experience: {
    status: 'fresher' as const,
    availabilityToJoin: 'Immediate',
    totalExperienceYears: '' as unknown as number,
    noticePeriodDays: '' as unknown as number,
    companies: [
      {
        companyName: '',
        role: '',
        fromDate: '',
        toDate: '',
      },
    ],
  },
  application: {
    position: '',
    expectedJoiningDate: '',
    portfolioUrl: '',
    coverNote: '',
    agreeToTerms: false as unknown as true,
  },
};
