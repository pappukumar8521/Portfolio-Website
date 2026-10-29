import prisma from '../config/db.js';

// @desc    Submit Contact Request
// @route   POST /api/contact
// @access  Public
export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, Email, and Message are required fields.'
      });
    }

    const contact = await prisma.contactRequest.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        subject: subject ? subject.trim() : 'General Inquiry',
        message: message.trim(),
        status: 'UNREAD'
      }
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Our team will get back to you shortly.',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact inquiries
// @route   GET /api/contact
// @access  Private (Admin)
export const getContacts = async (req, res, next) => {
  try {
    const { status } = req.query;
    const where = {};

    if (status && status !== 'ALL') {
      where.status = status.toUpperCase();
    }

    const contacts = await prisma.contactRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      success: true,
      data: contacts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact request status
// @route   PATCH /api/contact/:id
// @access  Private (Admin)
export const updateContact = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid contact ID' });
    }

    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const updated = await prisma.contactRequest.update({
      where: { id },
      data: { status }
    });

    res.status(200).json({
      success: true,
      message: 'Contact status updated successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};
