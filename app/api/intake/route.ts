import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
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
    // Get user session if available
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;

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
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit intake form' },
      { status: 500 }
    );
  }
}
