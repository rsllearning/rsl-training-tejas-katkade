# Job Application Form - Form Architecture & Runtime Schema Validation

## How to Run the Project

### Steps to Run Locally
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.
---

## Schema Organization (`src/schemas/`)

The application enforces **Zod as the single source of truth** for all validation rules, data contracts, and TypeScript types. No validation logic is placed inside UI components, and no TypeScript interfaces are written by hand.

Schemas are organized modularly in `src/schemas/`:

| File | Purpose | Key Inferred Types |
| :--- | :--- | :--- |
| `personalSchema.ts`| Step 1: Personal Details validation (Name, Email, 10-digit Phone, DOB 18+, City) | `PersonalDetailsFormData` |
| `educationSchema.ts` | Step 2: Academic qualification array schema requiring at least 1 record | `QualificationFormData`, `EducationFormData` |
| `experienceSchema.ts` | Step 3: Work experience modelled as a **discriminated union** on `status` (`'fresher' \| 'experienced'`) | `FresherExperienceFormData`, `ExperiencedExperienceFormData`, `ExperienceFormData` |
| `applicationSchema.ts` | Step 4: Position, joining date, optional portfolio URL, cover note, and terms acceptance | `ApplicationFormData` |
| `jobApplicationSchema.ts` | Master schema combining all steps with cross-step refinement rules and default values | `JobApplicationFormData` |

---

## Validation Rules & Dependent Multi-Field Checks

Validation rules include sensible formats and limits, plus **four dependent multi-field rules**:

1. **Candidate Age (18 or older):**
   - Implemented in `personalSchema.ts` via `.refine()` on `dateOfBirth`. Calculates candidate age relative to current date and ensures the candidate is at least 18 years old.
2. **Employment Date Range ("To" date >= "From" date):**
   - Implemented in `experienceSchema.ts` via `.refine()` on `companySchema`. Verifies that the previous company's "To" date is on or after its "From" date, attaching the error specifically to the `toDate` field.
3. **Future Joining Date:**
   - Implemented in `applicationSchema.ts` via `.refine()` on `expectedJoiningDate`. Ensures that the proposed joining date is today or in the future.
4. **Notice Period vs. Joining Date Alignment (Cross-Step Rule):**
   - Implemented in `jobApplicationSchema.ts` via `.superRefine()`. For experienced candidates with an active notice period, the expected joining date cannot be earlier than `today + noticePeriodDays`.

---

## Validation Mode Choice & Rationale

We configured React Hook Form with **`mode: 'onTouched'`**:

```ts
const methods = useForm<JobApplicationFormData>({
  resolver: zodResolver(jobApplicationSchema),
  mode: 'onTouched',
  defaultValues: defaultFormValues,
});
```

### Why `onTouched`?
- **Avoids aggressive early validation:** With `mode: 'onChange'`, users get hit with red errors immediately upon typing the first letter of an email or phone number.
- **Immediate feedback on field exit:** Validating on blur gives users the chance to complete an entry before feedback is provided.
- **Fast recovery once dirty:** Once a field has been touched and marked invalid, it re-validates `onChange` so error messages disappear immediately as soon as the user corrects the input.
- **Strict step-gate progression:** Calling `trigger('currentStepField', { shouldFocus: true })` prior to step progression ensures that incomplete or invalid entries cannot slip into subsequent steps.

---

## State Management: Where Form State Lives

- **Single Form Instance:** A single `useForm` instance is initialized in `App.tsx` and shared down the component tree using React Hook Form's `<FormProvider>`.
- **Zero External Store Duplication:** Form values are **never copied** into Redux, Zustand, or React Context. Form state remains strictly inside React Hook Form's internal ref-based store.
- **Preserved History:** When candidates click "Back" or use "Edit" buttons from Step 5, data is completely preserved because step components read and write directly to the single form instance.

---

## Performance: Deliberate Re-render Optimizations

To keep the application fast and responsive, we implemented targeted subscription boundaries:

1. **Isolated Conditional Experience Section (`<ExperienceConditionalFields />`):**
   - In Step 3, switching between Fresher and Experienced uses `useWatch({ name: 'experience.status' })` inside an isolated child component.
   - Keystrokes in other fields and parent wizard controls do not trigger re-renders of the step header, navigation bar, or radio selector.
2. **Isolated Character Counter Badge (`<CoverNoteCharacterCount />`):**
   - In Step 4, typing into the cover note updates a `useWatch({ name: 'application.coverNote' })` subscriber encapsulated inside the small counter badge.
   - The rest of Step 4 (position selector, joining date, portfolio link, terms checkbox) is completely shielded from re-renders on every keystroke.
3. **Uncontrolled Field Components via `useFormContext`:**
   - Reusable inputs (`TextField`, `SelectField`, `TextAreaField`) leverage native uncontrolled DOM inputs connected via `register(name)`. React does not re-render the component tree on each keystroke.
4. **Focused Review Subscription:**
   - Only the Step 5 review screen subscribes to whole-form values via `useWatch()`, and only while that step is actively mounted.
