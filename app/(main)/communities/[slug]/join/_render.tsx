'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import FormWrapper from '@/components/FormWrapper';
import { ageRanges, genderOptions, lifeStages, topicOptions } from '@/lib/intake';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@/types';
import { z } from 'zod';

const IntakeFormSchema = z.object({
  name: z.string().min(1, 'Preferred name is required'),
  email: z.string().email('Please enter a valid email'),
  ageRange: z.string().min(1, 'Please select an age range'),
  location: z.string().min(1, 'Please enter your country/region'),
  gender: z.string().min(1, 'Please select a gender identity'),
  lifeStage: z.string().optional(),
  topics: z.array(z.string()).default([]),
  symptoms: z.string().optional(),
  diagnosis: z.string().optional(),
  medications: z.string().optional(),
  goals: z.string().optional(),
  communityComfort: z.string().optional(),

  // Explicit consent checkboxes
  consentInfo: z.boolean().refine((v) => v === true, 'You must acknowledge this to continue'),
  consentEmergency: z.boolean().refine((v) => v === true, 'You must acknowledge this to continue'),
  consentPrivacy: z.boolean().refine((v) => v === true, 'You must consent in order to use this service'),
});

export type IntakeFormValues = z.infer<typeof IntakeFormSchema>;

const steps = ['About you', 'Health topics', 'Goals & consent'];

// Helper: fields in each step for partial validation
const stepFieldGroups: string[][] = [
  ['name', 'email', 'ageRange', 'location', 'gender', 'lifeStage'],
  ['topics', 'symptoms', 'diagnosis', 'medications'],
  ['goals', 'communityComfort', 'consentInfo', 'consentEmergency', 'consentPrivacy'],
];

export default function IntakeFormPage({ user }: { user: User }) {
  const [activeStep, setActiveStep] = useState(0);

  const {
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<IntakeFormValues>({
    resolver: zodResolver(IntakeFormSchema) as any,
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      ageRange: '',
      location: '',
      gender: '',
      lifeStage: '',
      topics: [],
      symptoms: '',
      diagnosis: '',
      medications: '',
      goals: '',
      communityComfort: '',
      consentInfo: false,
      consentEmergency: false,
      consentPrivacy: false,
    },
  });

  const isLastStep = activeStep === steps.length - 1;

  const handleNext = async () => {
    const fieldsToValidate = stepFieldGroups[activeStep];
    const valid = await trigger(fieldsToValidate as any, { shouldFocus: true });
    if (!valid) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: IntakeFormValues) => {
    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit intake form');
      }

      const result = await response.json();
      console.log('Intake submission successful:', result);

      // TODO: Show success message and/or redirect user
      // For now, just log success
      alert('Thank you! Your intake form has been submitted successfully.');
    } catch (error) {
      console.error('Error submitting intake form:', error);
      alert(error instanceof Error ? error.message : 'An error occurred while submitting the form. Please try again.');
    }
  };

  return (
    <FormWrapper>
      <Typography variant="h3" fontWeight={600} mb={1}>
        Women's Health Intake
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        This voluntary form helps us personalize your experience. It is not a substitute for diagnosis or emergency
        care.
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={{ typography: { fontSize: 12 } }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
          // Mobile-first spacing
        }}
      >
        {/* STEP 0: About you */}
        {activeStep === 0 && (
          <>
            <TextField
              label="Preferred Name"
              fullWidth
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <FormControl fullWidth error={!!errors.ageRange}>
              <InputLabel>Age Range</InputLabel>
              <Controller
                name="ageRange"
                control={control}
                render={({ field }) => (
                  <Select label="Age Range" {...field}>
                    {ageRanges.map((age) => (
                      <MenuItem key={age} value={age}>
                        {age}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.ageRange?.message}</FormHelperText>
            </FormControl>

            <TextField
              label="Location (Country / Region)"
              fullWidth
              {...register('location')}
              error={!!errors.location}
              helperText={errors.location?.message}
            />

            <FormControl fullWidth error={!!errors.gender}>
              <InputLabel>Gender Identity</InputLabel>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select label="Gender Identity" {...field}>
                    {genderOptions.map((g) => (
                      <MenuItem key={g} value={g}>
                        {g}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.gender?.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Current Life Stage (optional)</InputLabel>
              <Controller
                name="lifeStage"
                control={control}
                render={({ field }) => (
                  <Select label="Current Life Stage (optional)" {...field}>
                    {lifeStages.map((stage) => (
                      <MenuItem key={stage} value={stage}>
                        {stage}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </>
        )}

        {/* STEP 1: Health topics */}
        {activeStep === 1 && (
          <>
            <Box>
              <Typography fontWeight={600} mb={1}>
                Topics of Interest
              </Typography>
              <Controller
                name="topics"
                control={control}
                render={({ field }) => {
                  const current = field.value || [];
                  const handleToggle = (topic: string) => {
                    if (current.includes(topic)) {
                      field.onChange(current.filter((t: string) => t !== topic));
                    } else {
                      field.onChange([...current, topic]);
                    }
                  };

                  return (
                    <FormGroup>
                      {topicOptions.map((topic) => (
                        <FormControlLabel
                          key={topic}
                          control={<Checkbox checked={current.includes(topic)} onChange={() => handleToggle(topic)} />}
                          label={topic}
                        />
                      ))}
                    </FormGroup>
                  );
                }}
              />
            </Box>

            <TextField label="Current Symptoms (optional)" fullWidth multiline minRows={3} {...register('symptoms')} />

            <TextField
              label="Diagnosed Conditions (optional)"
              fullWidth
              multiline
              minRows={2}
              {...register('diagnosis')}
            />

            <TextField
              label="Medications / Supplements (optional)"
              fullWidth
              multiline
              minRows={2}
              {...register('medications')}
            />
          </>
        )}

        {/* STEP 2: Goals & consent */}
        {activeStep === 2 && (
          <>
            <TextField label="Your Main Goals (optional)" fullWidth multiline minRows={3} {...register('goals')} />

            <FormControl fullWidth>
              <InputLabel>Comfort Sharing in a Community (optional)</InputLabel>
              <Controller
                name="communityComfort"
                control={control}
                render={({ field }) => (
                  <Select label="Comfort Sharing in a Community (optional)" {...field}>
                    <MenuItem value="Very comfortable">Very comfortable</MenuItem>
                    <MenuItem value="Somewhat comfortable">Somewhat comfortable</MenuItem>
                    <MenuItem value="Prefer to stay private">Prefer to stay private</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                Consent & Acknowledgments
              </Typography>

              <FormControl error={!!errors.consentInfo} component="fieldset" sx={{ mb: 1 }}>
                <FormControlLabel
                  control={
                    <Controller
                      name="consentInfo"
                      control={control}
                      render={({ field }) => (
                        <Checkbox {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                      )}
                    />
                  }
                  label="I understand this platform provides community and informational support only, and is not a substitute for medical diagnosis or treatment."
                />
                <FormHelperText>{errors.consentInfo?.message}</FormHelperText>
              </FormControl>

              <FormControl error={!!errors.consentEmergency} component="fieldset" sx={{ mb: 1 }}>
                <FormControlLabel
                  control={
                    <Controller
                      name="consentEmergency"
                      control={control}
                      render={({ field }) => (
                        <Checkbox {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                      )}
                    />
                  }
                  label="I understand this service cannot assist with urgent or life-threatening issues and I should call emergency services in those cases."
                />
                <FormHelperText>{errors.consentEmergency?.message}</FormHelperText>
              </FormControl>

              <FormControl error={!!errors.consentPrivacy} component="fieldset">
                <FormControlLabel
                  control={
                    <Controller
                      name="consentPrivacy"
                      control={control}
                      render={({ field }) => (
                        <Checkbox {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                      )}
                    />
                  }
                  label="I consent to the voluntary collection of the information I provide according to the Privacy Policy."
                />
                <FormHelperText>{errors.consentPrivacy?.message}</FormHelperText>
              </FormControl>
            </Box>
          </>
        )}

        {/* Navigation buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
            gap: 2,
          }}
        >
          <Button type="button" variant="text" disabled={activeStep === 0} onClick={handleBack} fullWidth>
            Back
          </Button>

          {isLastStep ? (
            <Button type="submit" variant="contained" disabled={isSubmitting} fullWidth>
              {isSubmitting ? 'Submitting...' : 'Submit Intake Form'}
            </Button>
          ) : (
            <Button type="button" variant="contained" onClick={handleNext} fullWidth>
              Next
            </Button>
          )}
        </Box>
      </Box>
    </FormWrapper>
  );
}
