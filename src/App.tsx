import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  jobApplicationSchema,
  defaultFormValues,
  type JobApplicationFormData,
} from './schemas';
import { StepWizard } from './components/wizard/StepWizard';
import './styles/form.css';

export const App: React.FC = () => {
  /**
   * One single useForm instance for the entire 5-step wizard.
   * - Schema: jobApplicationSchema (single source of truth for validation rules)
   * - Types: inferred via z.infer<typeof jobApplicationSchema>
   * - Mode: 'onTouched' provides the best user experience (validates on first blur,
   *   then re-validates onChange once dirty, without annoying users on initial keystrokes).
   */
  const methods = useForm<JobApplicationFormData>({
    resolver: zodResolver(jobApplicationSchema),
    mode: 'onTouched',
    defaultValues: defaultFormValues,
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo-section">
            <span className="logo-badge">RSL Careers</span>
            <h1 className="portal-title">Job Application Portal</h1>
          </div>
          <p className="portal-tagline">
            Join our engineering team at Raja Software Labs. Fill out the 5-step application below.
          </p>
        </div>
      </header>

      <main className="app-main">
        <FormProvider {...methods}>
          <StepWizard />
        </FormProvider>
      </main>

      <footer className="app-footer">
        <p>© 2026 Raja Software Labs. Form Architecture & Runtime Schema Validation Assignment.</p>
      </footer>
    </div>
  );
};

export default App;
