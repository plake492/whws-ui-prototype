import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting sponsor seeding...');

  // Create Sponsor 1: Women's Wellness Clinic
  const sponsor1 = await prisma.sponsor.create({
    data: {
      name: "Women's Wellness Clinic",
      slug: 'womens-wellness-clinic',
      logoUrl: '/sponsor_logos/cvs_logo.png',
      heroImageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=400&fit=crop',
      shortBio: "Comprehensive women's healthcare with compassionate, expert care.",
      description: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: "Women's Wellness Clinic has been serving the community for over 20 years with " },
              { type: 'text', marks: [{ type: 'bold' }], text: 'comprehensive, compassionate healthcare' },
              { type: 'text', text: ' for women of all ages.' },
            ],
          },
          {
            type: 'heading',
            attrs: { level: 3 },
            content: [{ type: 'text', text: 'Our Services' }],
          },
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Annual exams and preventive care' }] }],
              },
              {
                type: 'listItem',
                content: [
                  { type: 'paragraph', content: [{ type: 'text', text: 'Breast cancer screening and diagnosis' }] },
                ],
              },
              {
                type: 'listItem',
                content: [
                  { type: 'paragraph', content: [{ type: 'text', text: 'Hormone therapy and menopause management' }] },
                ],
              },
              {
                type: 'listItem',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Mental health support' }] }],
              },
            ],
          },
        ],
      },
      category: 'Healthcare',
      healthFocus: ['Breast Cancer', "Women's Health", 'Preventive Care'],
      isFeatured: true,
      displayOrder: 1,
      website: 'https://www.womenswellnessclinic.com',
      phone: '(555) 123-4567',
      email: 'info@womenswellnessclinic.com',
      address: '123 Health Ave, Suite 200, Orlando, FL 32801',
      isActive: true,
    },
  });

  // Create Sponsor 2: Vitality Nutrition
  const sponsor2 = await prisma.sponsor.create({
    data: {
      name: 'Vitality Nutrition',
      slug: 'vitality-nutrition',
      logoUrl: '/sponsor_logos/sephora-logo.png',
      heroImageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=400&fit=crop',
      shortBio: 'Science-backed nutrition supplements designed specifically for women.',
      description: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'At Vitality Nutrition, we believe in ' },
              { type: 'text', marks: [{ type: 'bold' }], text: 'empowering women through optimal nutrition' },
              { type: 'text', text: '. Our products are formulated by nutritionists and doctors.' },
            ],
          },
          {
            type: 'heading',
            attrs: { level: 3 },
            content: [{ type: 'text', text: 'Featured Products' }],
          },
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: "Women's Daily Multivitamin" }] }],
              },
              {
                type: 'listItem',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Bone Health Support' }] }],
              },
              {
                type: 'listItem',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Menopause Relief Formula' }] }],
              },
              {
                type: 'listItem',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Prenatal Vitamins' }] }],
              },
            ],
          },
        ],
      },
      category: 'Nutrition',
      healthFocus: ["Women's Health", 'Wellness', 'Supplements'],
      isFeatured: true,
      displayOrder: 2,
      website: 'https://www.vitalitynutrition.com',
      phone: '(555) 234-5678',
      email: 'support@vitalitynutrition.com',
      isActive: true,
    },
  });

  // Create Sponsor 3: Serenity Spa & Wellness
  const sponsor3 = await prisma.sponsor.create({
    data: {
      name: 'Serenity Spa & Wellness',
      slug: 'serenity-spa-wellness',
      logoUrl: '/sponsor_logos/womans_center_for_radiology_icon.png',
      heroImageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=400&fit=crop',
      shortBio: 'Holistic wellness and self-care in a tranquil environment.',
      description: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'Serenity Spa offers a ' },
              { type: 'text', marks: [{ type: 'bold' }], text: 'sanctuary for relaxation and rejuvenation' },
              {
                type: 'text',
                text: '. From therapeutic massages to skincare treatments, we focus on your total wellbeing.',
              },
            ],
          },
          {
            type: 'heading',
            attrs: { level: 3 },
            content: [{ type: 'text', text: 'Our Treatments' }],
          },
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Therapeutic massage therapy' }] }],
              },
              {
                type: 'listItem',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Facial and skincare treatments' }] }],
              },
              {
                type: 'listItem',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Aromatherapy sessions' }] }],
              },
              {
                type: 'listItem',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Meditation and wellness classes' }] }],
              },
            ],
          },
        ],
      },
      category: 'Wellness',
      healthFocus: ['Mental Health', 'Stress Relief', 'Self-Care'],
      isFeatured: true,
      displayOrder: 3,
      website: 'https://www.serenityspa.com',
      phone: '(555) 345-6789',
      email: 'hello@serenityspa.com',
      isActive: true,
    },
  });

  // Create Sponsor 4: MindfulFit Yoga Studio
  const sponsor4 = await prisma.sponsor.create({
    data: {
      name: 'MindfulFit Yoga Studio',
      slug: 'mindfulfit-yoga',
      logoUrl: '/sponsor_logos/the_menopause_society_logo.webp',
      heroImageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=400&fit=crop',
      shortBio: 'Yoga and fitness classes designed for women of all ages and abilities.',
      description: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'MindfulFit combines ' },
              { type: 'text', marks: [{ type: 'bold' }], text: 'traditional yoga with modern fitness' },
              {
                type: 'text',
                text: ' to create a supportive environment for women to strengthen their bodies and minds.',
              },
            ],
          },
          {
            type: 'heading',
            attrs: { level: 3 },
            content: [{ type: 'text', text: 'Class Offerings' }],
          },
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Vinyasa Flow Yoga' }] }],
              },
              {
                type: 'listItem',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Prenatal and Postnatal Yoga' }] }],
              },
              {
                type: 'listItem',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Restorative Yoga' }] }],
              },
              {
                type: 'listItem',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Strength and Conditioning' }] }],
              },
            ],
          },
        ],
      },
      category: 'Fitness',
      healthFocus: ['Physical Health', 'Mental Health', 'Wellness'],
      isFeatured: true,
      displayOrder: 4,
      website: 'https://www.mindfulfityoga.com',
      phone: '(555) 456-7890',
      email: 'classes@mindfulfityoga.com',
      isActive: true,
    },
  });

  console.log('Created sponsors:', { sponsor1, sponsor2, sponsor3, sponsor4 });

  // Create Offers for Sponsor 1
  const offer1 = await prisma.offer.create({
    data: {
      sponsorId: sponsor1.id,
      title: 'Free Annual Wellness Exam',
      description:
        'Comprehensive annual exam including preventive screening and health counseling. Perfect for establishing or maintaining your healthcare routine.',
      discountDetails: 'First exam FREE',
      termsConditions:
        'Valid for new patients only. Must be 18 years or older. Cannot be combined with insurance. One per person.',
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2025-12-31'),
      totalLimit: 100,
      perUserLimit: 1,
      currentRedemptions: 23,
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
      isActive: true,
      isFeatured: true,
    },
  });

  const offer2 = await prisma.offer.create({
    data: {
      sponsorId: sponsor1.id,
      title: '20% Off Mammogram Screening',
      description:
        'Early detection saves lives. Get 20% off your mammogram screening with our state-of-the-art equipment and experienced radiologists.',
      discountDetails: '20% off regular price',
      termsConditions: 'Valid for self-pay patients. Can be combined with insurance deductible. No expiration.',
      validFrom: new Date('2024-01-01'),
      validUntil: null,
      totalLimit: null,
      perUserLimit: 2,
      currentRedemptions: 45,
      imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop',
      isActive: true,
      isFeatured: false,
    },
  });

  // Create Offers for Sponsor 2
  const offer3 = await prisma.offer.create({
    data: {
      sponsorId: sponsor2.id,
      title: '$15 Off First Order',
      description:
        'Try our science-backed supplements designed specifically for women. First-time customers get $15 off any order over $50.',
      discountDetails: '$15 off orders $50+',
      termsConditions: 'Valid for new customers only. Online orders only. Use code: WELCOME15 at checkout.',
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2025-06-30'),
      totalLimit: 500,
      perUserLimit: 1,
      currentRedemptions: 234,
      imageUrl: 'https://images.unsplash.com/photo-1556742521-9713bf272865?w=600&h=400&fit=crop',
      isActive: true,
      isFeatured: true,
    },
  });

  const offer4 = await prisma.offer.create({
    data: {
      sponsorId: sponsor2.id,
      title: 'Free Nutrition Consultation',
      description:
        '30-minute virtual consultation with a certified nutritionist to discuss your health goals and get personalized supplement recommendations.',
      discountDetails: 'FREE consultation (value $75)',
      termsConditions: 'Must schedule within 30 days of redemption. Virtual consultation only.',
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2025-12-31'),
      totalLimit: 200,
      perUserLimit: 1,
      currentRedemptions: 87,
      imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop',
      isActive: true,
      isFeatured: false,
    },
  });

  // Create Offers for Sponsor 3
  const offer5 = await prisma.offer.create({
    data: {
      sponsorId: sponsor3.id,
      title: 'Buy 1 Get 1 Massage',
      description:
        'Enjoy two 60-minute therapeutic massages for the price of one. Perfect for sharing with a friend or treating yourself twice!',
      discountDetails: 'BOGO on 60-min massage',
      termsConditions:
        'Must use both sessions within 60 days. Cannot be combined with other offers. Gratuity not included.',
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2025-03-31'),
      totalLimit: 150,
      perUserLimit: 1,
      currentRedemptions: 67,
      imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop',
      isActive: true,
      isFeatured: true,
    },
  });

  const offer6 = await prisma.offer.create({
    data: {
      sponsorId: sponsor3.id,
      title: '25% Off Facial Treatment',
      description:
        'Rejuvenate your skin with our signature facial treatment. Choose from anti-aging, hydrating, or deep cleansing options.',
      discountDetails: '25% off any facial',
      termsConditions: 'Valid Monday-Thursday only. Must book in advance. One per customer.',
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2025-12-31'),
      totalLimit: null,
      perUserLimit: 1,
      currentRedemptions: 103,
      imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=400&fit=crop',
      isActive: true,
      isFeatured: false,
    },
  });

  // Create Offers for Sponsor 4
  const offer7 = await prisma.offer.create({
    data: {
      sponsorId: sponsor4.id,
      title: 'First Month Free - Unlimited Classes',
      description:
        'Join our yoga community and attend unlimited classes for your first month absolutely free. All levels welcome!',
      discountDetails: 'First month FREE',
      termsConditions:
        'New members only. Auto-renews at $89/month after first month unless cancelled. No commitment required.',
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2025-12-31'),
      totalLimit: 50,
      perUserLimit: 1,
      currentRedemptions: 31,
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
      isActive: true,
      isFeatured: true,
    },
  });

  const offer8 = await prisma.offer.create({
    data: {
      sponsorId: sponsor4.id,
      title: '3 Private Sessions for $99',
      description:
        'Get personalized attention with three one-on-one yoga sessions tailored to your goals and fitness level.',
      discountDetails: '3 sessions for $99 (save $51)',
      termsConditions: 'Must use all 3 sessions within 90 days. Cannot be transferred or refunded.',
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2025-06-30'),
      totalLimit: 30,
      perUserLimit: 1,
      currentRedemptions: 14,
      imageUrl: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&h=400&fit=crop',
      isActive: true,
      isFeatured: false,
    },
  });

  console.log('Created offers:', { offer1, offer2, offer3, offer4, offer5, offer6, offer7, offer8 });

  console.log('Sponsor seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding sponsors:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
