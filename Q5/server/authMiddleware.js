const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('🔒 No Bearer token found in Authorization header');
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // שימור הנתונים מתוך הטוקן בבקשה
    console.log('✅ Token is valid. Payload:', decoded);
    next();
  } catch (err) {
    console.warn('❌ Invalid or expired token:', err.message);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
