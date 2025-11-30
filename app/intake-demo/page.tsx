'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const IntakeFormPage = () => {
  const [form, setForm] = useState({
    name: '',
    ageRange: '',
    email: '',
    location: '',
    gender: '',
    lifeStage: '',
    topics: [] as string[],
    symptoms: '',
    diagnosis: '',
    medications: '',
    goals: '',
    communityComfort: '',
  });

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTopicToggle = (topic: string) => {
    setForm((prev) => {
      const selected = prev.topics.includes(topic) ? prev.topics.filter((t) => t !== topic) : [...prev.topics, topic];

      return { ...prev, topics: selected };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Submitted:', form);
  };

  const TOPIC_OPTIONS = [
    'Menstrual health',
    'Fertility / TTC',
    'Pregnancy',
    'Postpartum care',
    'Hormone health',
    'PCOS',
    'Endometriosis',
    'Sexual health',
    'Menopause',
    'Chronic pain',
  ];

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Women's Health Intake Form
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {/* Name */}
        <TextField
          label="Preferred Name"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          fullWidth
        />

        {/* Email */}
        <TextField
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          fullWidth
        />

        {/* Age Range */}
        <FormControl fullWidth>
          <InputLabel>Age Range</InputLabel>
          <Select value={form.ageRange} label="Age Range" onChange={(e) => handleChange('ageRange', e.target.value)}>
            {['Under 18', '18–24', '25–34', '35–44', '45–54', '55–64', '65+'].map((age) => (
              <MenuItem key={age} value={age}>
                {age}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Location */}
        <TextField
          label="Location (Country / Region)"
          value={form.location}
          onChange={(e) => handleChange('location', e.target.value)}
          fullWidth
        />

        {/* Gender */}
        <FormControl fullWidth>
          <InputLabel>Gender Identity</InputLabel>
          <Select value={form.gender} label="Gender Identity" onChange={(e) => handleChange('gender', e.target.value)}>
            {['Woman', 'Trans Woman', 'Non-binary', 'Intersex', 'Prefer not to say'].map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Life Stage */}
        <FormControl fullWidth>
          <InputLabel>Current Life Stage</InputLabel>
          <Select
            value={form.lifeStage}
            label="Current Life Stage"
            onChange={(e) => handleChange('lifeStage', e.target.value)}
          >
            {[
              'Trying to conceive',
              'Pregnancy',
              'Postpartum',
              'Perimenopause',
              'Menopause',
              'Post-menopause',
              'Chronic condition management',
              "Women's general wellness",
            ].map((stage) => (
              <MenuItem key={stage} value={stage}>
                {stage}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Topics */}
        <Box>
          <Typography fontWeight={600} mb={1}>
            Topics of Interest
          </Typography>
          <FormGroup>
            {TOPIC_OPTIONS.map((topic) => (
              <FormControlLabel
                key={topic}
                control={<Checkbox checked={form.topics.includes(topic)} onChange={() => handleTopicToggle(topic)} />}
                label={topic}
              />
            ))}
          </FormGroup>
        </Box>

        {/* Symptoms */}
        <TextField
          label="Current Symptoms (optional)"
          value={form.symptoms}
          onChange={(e) => handleChange('symptoms', e.target.value)}
          multiline
          minRows={3}
          fullWidth
        />

        {/* Diagnoses */}
        <TextField
          label="Diagnosed Conditions (optional)"
          value={form.diagnosis}
          onChange={(e) => handleChange('diagnosis', e.target.value)}
          multiline
          minRows={2}
          fullWidth
        />

        {/* Medications */}
        <TextField
          label="Medications / Supplements (optional)"
          value={form.medications}
          onChange={(e) => handleChange('medications', e.target.value)}
          multiline
          minRows={2}
          fullWidth
        />

        {/* Goals */}
        <TextField
          label="Your Main Goals (optional)"
          value={form.goals}
          onChange={(e) => handleChange('goals', e.target.value)}
          multiline
          minRows={2}
          fullWidth
        />

        {/* Community Comfort */}
        <FormControl fullWidth>
          <InputLabel>Comfort Sharing in a Community</InputLabel>
          <Select
            value={form.communityComfort}
            label="Comfort Sharing in a Community"
            onChange={(e) => handleChange('communityComfort', e.target.value)}
          >
            {['Very comfortable', 'Somewhat comfortable', 'Prefer to stay private'].map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" size="large" type="submit" sx={{ mt: 2 }}>
          Submit Intake Form
        </Button>
      </Box>
    </Container>
  );
};

export default IntakeFormPage;
