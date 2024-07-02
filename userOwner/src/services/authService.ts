import jwt from 'jsonwebtoken';

export const generateAuthToken = (payload: any): string => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' });
};

export const setAuthTokenCookie = (res: any, token: string): void => {
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
};
