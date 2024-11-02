import jwt from 'jsonwebtoken';
export function signJwtToken(payload, options = {}) {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, options);
  return token;
}
