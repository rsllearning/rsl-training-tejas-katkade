import type { JobApplicationFormData } from '../schemas';

export type ApiSimulationMode = 'success' | 'server_validation_error' | 'server_error';

export interface SubmitSuccessResponse {
  ok: true;
  type: 'success';
  data: {
    applicationId: string;
    submittedAt: string;
    candidateName: string;
    position: string;
    email: string;
  };
}

export interface SubmitValidationErrorResponse {
  ok: false;
  type: 'validation';
  message: string;
  fieldErrors: Record<string, string>;
}

export interface SubmitServerErrorResponse {
  ok: false;
  type: 'server_error';
  message: string;
}

export type SubmitApiResponse =
  | SubmitSuccessResponse
  | SubmitValidationErrorResponse
  | SubmitServerErrorResponse;

/**
 * Mock API function simulating submission to careers portal server.
 * Delays for 1.5s (1500ms) to simulate real-world network latency.
 */
export async function submitJobApplication(
  formData: JobApplicationFormData,
  simulationMode: ApiSimulationMode = 'success'
): Promise<SubmitApiResponse> {
  // Simulate 1.5-second network latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (simulationMode === 'server_validation_error') {
    return {
      ok: false,
      type: 'validation',
      message: 'Server validation failed: Some fields contain conflicts.',
      fieldErrors: {
        'personal.email': 'This email address is already registered in our applicant tracking system.',
      },
    };
  }

  if (simulationMode === 'server_error') {
    return {
      ok: false,
      type: 'server_error',
      message: 'Internal Server Error (500): The database server failed to persist the application. Please try again later.',
    };
  }

  // Simulated successful submission
  const randomId = Math.floor(100000 + Math.random() * 900000);
  return {
    ok: true,
    type: 'success',
    data: {
      applicationId: `RSL-CAREER-${randomId}`,
      submittedAt: new Date().toISOString(),
      candidateName: formData.personal.fullName,
      position: formData.application.position,
      email: formData.personal.email,
    },
  };
}
