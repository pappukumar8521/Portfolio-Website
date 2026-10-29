import prisma from '../config/db.js';

// @desc    Get Admin Dashboard KPI Statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalCandidates,
      freshersCount,
      experiencedCount,
      newRequestsCount,
      referralRequestsCount,
      contactRequestsCount,
      pendingReferrals,
      unreadContacts
    ] = await Promise.all([
      prisma.candidate.count(),
      prisma.candidate.count({ where: { candidateType: 'FRESHER' } }),
      prisma.candidate.count({ where: { candidateType: 'EXPERIENCED' } }),
      prisma.candidate.count({ where: { status: 'NEW' } }),
      prisma.referralRequest.count(),
      prisma.contactRequest.count(),
      prisma.referralRequest.count({ where: { status: 'PENDING' } }),
      prisma.contactRequest.count({ where: { status: 'UNREAD' } })
    ]);

    // Group by status
    const statusGrouping = await prisma.candidate.groupBy({
      by: ['status'],
      _count: {
        id: true
      }
    });

    const statusCounts = statusGrouping.reduce((acc, curr) => {
      acc[curr.status] = curr._count.id;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      stats: {
        totalCandidates,
        freshersCount,
        experiencedCount,
        newRequestsCount,
        referralRequestsCount,
        contactRequestsCount,
        pendingReferrals,
        unreadContacts,
        statusCounts
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Public Services and Testimonials
// @route   GET /api/public/data
// @access  Public
export const getPublicData = async (req, res, next) => {
  try {
    const [services, testimonials] = await Promise.all([
      prisma.service.findMany({
        where: { active: true },
        orderBy: { id: 'asc' }
      }),
      prisma.testimonial.findMany({
        where: { active: true },
        orderBy: { id: 'asc' }
      })
    ]);

    res.status(200).json({
      success: true,
      services: services.map(s => ({
        ...s,
        features: s.features ? JSON.parse(s.features) : []
      })),
      testimonials
    });
  } catch (error) {
    next(error);
  }
};
