import prisma from '../config/db.js';

// @desc    Submit Referral Request
// @route   POST /api/referrals
// @access  Public
export const createReferral = async (req, res, next) => {
  try {
    const {
      candidateName,
      candidateEmail,
      candidatePhone,
      currentCompany,
      targetCompany,
      roleTitle,
      experienceYears,
      linkedInUrl,
      notes
    } = req.body;

    if (!candidateName || !candidateEmail || !candidatePhone || !targetCompany || !roleTitle) {
      return res.status(400).json({
        success: false,
        message: 'Please provide Name, Email, Phone, Target Company, and Role Title.'
      });
    }

    let parsedExp = 0.0;
    if (experienceYears !== undefined && experienceYears !== '') {
      parsedExp = parseFloat(experienceYears) || 0.0;
    }

    // Process file upload if present
    let resumeUrl = null;
    if (req.file) {
      resumeUrl = `/uploads/resumes/${req.file.filename}`;
    }

    const referral = await prisma.referralRequest.create({
      data: {
        candidateName: candidateName.trim(),
        candidateEmail: candidateEmail.trim().toLowerCase(),
        candidatePhone: candidatePhone.trim(),
        currentCompany: currentCompany ? currentCompany.trim() : null,
        targetCompany: targetCompany.trim(),
        roleTitle: roleTitle.trim(),
        experienceYears: parsedExp,
        linkedInUrl: linkedInUrl ? linkedInUrl.trim() : null,
        resumeUrl,
        notes: notes ? notes.trim() : null,
        status: 'PENDING'
      }
    });

    res.status(201).json({
      success: true,
      message: 'Referral inquiry submitted successfully. We will check eligibility and network availability.',
      data: referral
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all referral requests
// @route   GET /api/referrals
// @access  Private (Admin)
export const getReferrals = async (req, res, next) => {
  try {
    const { status, targetCompany } = req.query;
    const where = {};

    if (status && status !== 'ALL') {
      where.status = status.toUpperCase();
    }

    if (targetCompany && targetCompany !== 'ALL') {
      where.targetCompany = { contains: targetCompany.trim() };
    }

    const referrals = await prisma.referralRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        candidate: {
          select: { id: true, name: true, email: true, phone: true }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: referrals
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update referral request status
// @route   PATCH /api/referrals/:id
// @access  Private (Admin)
export const updateReferral = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid referral ID' });
    }

    const { status, notes } = req.body;
    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const updated = await prisma.referralRequest.update({
      where: { id },
      data: updateData
    });

    res.status(200).json({
      success: true,
      message: 'Referral updated successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};
