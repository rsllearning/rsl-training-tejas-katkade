import React from 'react';
import { TextField } from '../fields';

export const Step1Personal: React.FC = () => {
  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Step 1: Personal Details</h2>
        <p className="step-description">
          Please provide your personal information so our hiring team can get in touch with you.
        </p>
      </div>

      <div className="form-grid">
        <TextField
          name="personal.fullName"
          label="Full Name"
          placeholder="e.g. Tejas Katkade"
          autoComplete="name"
          required
        />

        <TextField
          name="personal.email"
          label="Email Address"
          type="email"
          placeholder="e.g. candidate@example.com"
          autoComplete="email"
          required
        />

        <TextField
          name="personal.phone"
          label="Phone Number"
          type="tel"
          placeholder="10-digit mobile number (e.g. 9876543210)"
          autoComplete="tel"
          maxLength={10}
          required
        />

        <TextField
          name="personal.dateOfBirth"
          label="Date of Birth"
          type="date"
          helperText="Must be 18 years or older to apply."
          required
        />

        <TextField
          name="personal.city"
          label="Current City"
          placeholder="e.g. Pune"
          required
        />
      </div>
    </div>
  );
};
