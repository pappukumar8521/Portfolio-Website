import prisma from '../config/db.js';

// @desc    Submit Career Assessment / Candidate Profile
// @route   POST /api/candidates
// @access  Public
export const createCandidate = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      candidateType,
      yearsOfExperience,
      currentRole,
      targetRole,
      primarySkills,
      currentCtc,
      expectedCtc,
      noticePeriod,
      currentLocation,
      preferredLocation,
      requiredService,
      linkedInUrl,
      message
    } = req.body;

    // Required fields validation
    if (!name || !email || !phone || !targetRole || !primarySkills || !requiredService) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields: Name, Email, Phone, Target Role, Primary Skills, and Required Service.'
      });
    }

    // Determine normalized candidateType
    const normalizedType =
      candidateType && candidateType.toUpperCase() === 'EXPERIENCED'
        ? 'EXPERIENCED'
        : 'FRESHER';

    // Parse yearsOfExperience
    let parsedExp = 0.0;
    if (yearsOfExperience !== undefined && yearsOfExperience !== '') {
      parsedExp = parseFloat(yearsOfExperience) || 0.0;
    }

    // Process file upload if present
    let resumeUrl = null;
    let resumeOriginalName = null;
    if (req.file) {
      resumeUrl = `/uploads/resumes/${req.file.filename}`;
      resumeOriginalName = req.file.originalname;
    }

    const candidate = await prisma.candidate.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        candidateType: normalizedType,
        yearsOfExperience: parsedExp,
        currentRole: currentRole ? currentRole.trim() : null,
        targetRole: targetRole.trim(),
        primarySkills: primarySkills.trim(),
        currentCtc: currentCtc ? currentCtc.trim() : null,
        expectedCtc: expectedCtc ? expectedCtc.trim() : null,
        noticePeriod: noticePeriod ? noticePeriod.trim() : null,
        currentLocation: currentLocation ? currentLocation.trim() : null,
        preferredLocation: preferredLocation ? preferredLocation.trim() : null,
        requiredService: requiredService.trim(),
        resumeUrl,
        resumeOriginalName,
        linkedInUrl: linkedInUrl ? linkedInUrl.trim() : null,
        message: message ? message.trim() : null,
        status: 'NEW'
      }
    });

    res.status(201).json({
      success: true,
      message: 'Your career profile and assessment details have been submitted successfully. A senior mentor will review it shortly.',
      candidateId: candidate.id
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get candidates list with search, filter, and pagination
// @route   GET /api/candidates
// @access  Private (Admin)
export const getCandidates = async (req, res, next) => {
  try {
    const {
      search,
      candidateType,
      status,
      page = 1,
      limit = 50,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const where = {};

    if (candidateType && candidateType !== 'ALL') {
      where.candidateType = candidateType.toUpperCase();
    }

    if (status && status !== 'ALL') {
      where.status = status.toUpperCase();
    }

    if (search && search.trim() !== '') {
      const q = search.trim();
      where.OR = [
        { name: { contains: q } },
        { email: { contains: q } },
        { phone: { contains: q } },
        { targetRole: { contains: q } },
        { primarySkills: { contains: q } },
        { currentRole: { contains: q } }
      ];
    }

    const take = parseInt(limit, 10);
    const skip = (parseInt(page, 10) - 1) * take;

    const [total, candidates] = await Promise.all([
      prisma.candidate.count({ where }),
      prisma.candidate.findMany({
        where,
        take,
        skip,
        orderBy: {
          [sortBy]: sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc'
        }
      })
    ]);

    res.status(200).json({
      success: true,
      data: candidates,
      meta: {
        total,
        page: parseInt(page, 10),
        limit: take,
        pages: Math.ceil(total / take)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single candidate details
// @route   GET /api/candidates/:id
// @access  Private (Admin)
export const getCandidateById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid candidate ID' });
    }

    const candidate = await prisma.candidate.findUnique({
      where: { id },
      include: {
        referralRequests: true
      }
    });

    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }

    res.status(200).json({
      success: true,
      data: candidate
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update candidate status or admin notes
// @route   PATCH /api/candidates/:id
// @access  Private (Admin)
export const updateCandidate = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid candidate ID' });
    }

    const { status, adminNotes } = req.body;

    const dataToUpdate = {};
    if (status !== undefined) {
      dataToUpdate.status = status;
    }
    if (adminNotes !== undefined) {
      dataToUpdate.adminNotes = adminNotes;
    }

    const updated = await prisma.candidate.update({
      where: { id },
      data: dataToUpdate
    });

    res.status(200).json({
      success: true,
      message: 'Candidate updated successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete candidate
// @route   DELETE /api/candidates/:id
// @access  Private (Admin)
export const deleteCandidate = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid candidate ID' });
    }

    await prisma.candidate.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Candidate deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

