import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || 'admin@hiremitra.com';
  const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@HireMitra2025';
  const adminName = process.env.ADMIN_DEFAULT_NAME || 'HireMitra Administrator';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: adminName,
        role: 'ADMIN'
      }
    });
    console.log(`✅ Admin created: ${admin.email}`);
  } else {
    console.log(`ℹ️ Admin already exists: ${existingAdmin.email}`);
  }

  // 2. Seed Services
  const servicesCount = await prisma.service.count();
  if (servicesCount === 0) {
    await prisma.service.createMany({
      data: [
        {
          title: 'ATS Resume Engineering',
          category: 'Core Service',
          description: 'Custom tailored, keyword-optimized resumes formatted for high parsing accuracy in Taleo, Workday, and Lever ATS systems.',
          icon: 'FileText',
          features: JSON.stringify([
            'High parse rate keyword alignment',
            'Quantifiable achievement metrics formula',
            'Clean modern single/two-page templates',
            'Full LinkedIn profile headline & summary revamp'
          ]),
          pricing: 'Starting at ₹999'
        },
        {
          title: 'Fresher Job-Ready Accelerator',
          category: 'Freshers',
          description: 'Comprehensive 1-on-1 hands-on mentoring from fundamental programming to production projects, mock interviews, and job applications.',
          icon: 'GraduationCap',
          features: JSON.stringify([
            'Java, Spring Boot, React, SQL foundational drills',
            'Live GitHub project development guidance',
            'HR round & behavioral questions preparation',
            '3 realistic 1-on-1 mock interviews with feedback',
            'Job application strategy & referral assistance'
          ]),
          pricing: 'Custom Mentorship Plan'
        },
        {
          title: 'Experienced Switch Sprint (3-10+ Yrs)',
          category: 'Experienced',
          description: 'Specialized switch blueprint for senior engineers, tech leads, and managers targeting tier-1 tech firms and MNCs.',
          icon: 'Briefcase',
          features: JSON.stringify([
            'System Design (LLD & HLD) deep dives',
            'Project experience positioning & architectural narratives',
            'Managerial & leadership situational rounds',
            'Notice period strategy & multi-offer salary negotiation',
            'Referral assistance across MNCs and product networks'
          ]),
          pricing: 'Custom Switch Plan'
        },
        {
          title: '1-on-1 Mock Interviews & Feedback',
          category: 'Interview Prep',
          description: 'Realistic technical and behavioral mock sessions conducted by seasoned senior industry engineers with detailed scoring rubrics.',
          icon: 'Video',
          features: JSON.stringify([
            '60-minute recorded video mock interview',
            'Live coding / system design whiteboarding',
            'Detailed scoring across 6 evaluation parameters',
            'Actionable 10-day improvement roadmap'
          ]),
          pricing: 'Per Session Booking'
        },
        {
          title: 'Referral Assistance Through Network',
          category: 'Referrals',
          description: 'Connect your verified profile with professional network insiders at leading technology companies and global delivery centers.',
          icon: 'Users',
          features: JSON.stringify([
            'Profile screening against target job requisitions',
            'Internal network referral routing where openings exist',
            'Referral tracking and follow-up guidance',
            'Transparent compliance with all company hiring policies'
          ]),
          pricing: 'Included in Mentorship'
        }
      ]
    });
    console.log('✅ Seeded default services.');
  }

  // 3. Seed Testimonials
  const testimonialsCount = await prisma.testimonial.count();
  if (testimonialsCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          name: 'Aakash Sharma',
          role: 'Associate Software Engineer',
          company: 'Capgemini',
          quote: 'As a tier-3 college graduate, I had zero interview calls despite sending 200+ applications. HireMitra revamped my resume for ATS, helped me build a real microservices project, and coached me on Java/Spring questions. Got placed within 45 days!',
          rating: 5,
          candidateType: 'FRESHER'
        },
        {
          name: 'Priyanka Nambiar',
          role: 'Senior Java Developer',
          company: 'Deloitte',
          quote: 'Having 5 years of experience, my main struggle was clearing high-level system design and explaining legacy migration. The mock interviews were rigorous and pinpointed exactly where I was rambling. Switched with a 65% hike.',
          rating: 5,
          candidateType: 'EXPERIENCED'
        },
        {
          name: 'Rohan Gupta',
          role: 'Frontend Engineer',
          company: 'Tech Mahindra',
          quote: 'The practical feedback on my React portfolio and the honesty of the mentors stood out. No fake promises, just rock-solid preparation and referral support through an alumnus.',
          rating: 5,
          candidateType: 'FRESHER'
        },
        {
          name: 'Deepak Varma',
          role: 'Lead Full Stack Architect',
          company: 'Cognizant',
          quote: 'The managerial round coaching and salary negotiation strategy alone were worth 10x the effort. They taught me how to present trade-offs like a principal engineer.',
          rating: 5,
          candidateType: 'EXPERIENCED'
        }
      ]
    });
    console.log('✅ Seeded default testimonials.');
  }

  // 4. Seed initial sample candidates for admin demonstration
  const candidatesCount = await prisma.candidate.count();
  if (candidatesCount === 0) {
    await prisma.candidate.create({
      data: {
        name: 'Rahul Verma',
        email: 'rahul.verma@example.com',
        phone: '+91 98765 43210',
        candidateType: 'FRESHER',
        yearsOfExperience: 0.0,
        currentRole: 'Computer Science Graduate (2024)',
        targetRole: 'Java Full Stack Developer',
        primarySkills: 'Java, Spring Boot, React.js, MySQL, Git',
        currentCtc: 'Fresher (0 LPA)',
        expectedCtc: '6-8 LPA',
        noticePeriod: 'Immediate',
        currentLocation: 'Bangalore, India',
        preferredLocation: 'Bangalore / Remote / Pune',
        requiredService: 'Fresher Job-Ready Accelerator',
        linkedInUrl: 'https://linkedin.com/in/rahulverma-dev',
        message: 'Looking for guidance on building industry-standard projects and preparing for product & MNC technical rounds.',
        status: 'UNDER_REVIEW',
        adminNotes: 'Candidate has solid core Java basics. Needs help structuring Spring Boot REST APIs and project deployment.'
      }
    });

    await prisma.candidate.create({
      data: {
        name: 'Ananya Deshmukh',
        email: 'ananya.d@example.com',
        phone: '+91 98123 45678',
        candidateType: 'EXPERIENCED',
        yearsOfExperience: 4.5,
        currentRole: 'Software Engineer',
        targetRole: 'Senior Backend Engineer / Tech Lead',
        primarySkills: 'Node.js, TypeScript, PostgreSQL, Docker, AWS, Redis',
        currentCtc: '12 LPA',
        expectedCtc: '20-22 LPA',
        noticePeriod: '60 Days (Negotiable)',
        currentLocation: 'Pune, India',
        preferredLocation: 'Pune / Hyderabad / Bangalore',
        requiredService: 'Experienced Switch Sprint (3-10+ Yrs)',
        linkedInUrl: 'https://linkedin.com/in/ananya-deshmukh',
        message: 'Facing challenges in cracking HLD rounds and salary negotiation. Want referral assistance in top MNCs.',
        status: 'NEW',
        adminNotes: 'Strong profile. Recommended for System Design mock drills.'
      }
    });
    console.log('✅ Seeded sample candidates.');
  }

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

