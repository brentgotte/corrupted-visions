const mockProfiles = {
  "123": {
    name: "John Doe",
    jobTitle: "Software Engineer",
    company: "Tech Corp",
    email: "john@techcorp.com",
    phone: "+123456789"
  }
};

module.exports = {
  async findByQRCode(qrCode) {
  return mockProfiles[qrCode] ?? null;
  }
};