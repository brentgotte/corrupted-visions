const express = require('express');
const router = express.Router();
const ProfileService = require('../services/ProfileService');

router.get('/:qrCode', async (req, res) => {
  try {
    const { qrCode } = req.params;

    const profile = await ProfileService.findByQRCode(qrCode);

    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    res.json({
      name: profile.name,
      jobTitle: profile.jobTitle,
      company: profile.company,
      email: profile.email,
      phone: profile.phone,
    });

  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
});

module.exports = router;