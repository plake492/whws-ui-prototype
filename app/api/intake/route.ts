import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getApiUser } from '@/lib/supabase-server';
import { z } from 'zod';

// Validation schema matching the form
const IntakeSubmissionSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  ageRange: z.string().optional(),
  location: z.string().optional(),
  gender: z.string().optional(),
  lifeStage: z.string().optional(),
  topics: z.array(z.string()).optional().default([]),
  symptoms: z.string().optional(),
  diagnosis: z.string().optional(),
  medications: z.string().optional(),
  goals: z.string().optional(),
  communityComfort: z.string().optional(),
  consentInfo: z.boolean(),
  consentEmergency: z.boolean(),
  consentPrivacy: z.boolean(),
});

export async function POST(request: NextRequest) {
  try {
    // Get user session if available (optional for intake)
    const user = await getApiUser();
    const userId = user?.id;

    // Parse and validate request body
    const body = await request.json();
    const validatedData = IntakeSubmissionSchema.parse(body);

    // Create intake form submission
    const submission = await prisma.intakeFormSubmission.create({
      data: {
        ...validatedData,
        userId: userId || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: submission.id,
        message: 'Intake form submitted successfully'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting intake form:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit intake form' },
      { status: 500 }
    );
  }
}
