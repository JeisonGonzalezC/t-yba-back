import { createHmac, timingSafeEqual } from 'crypto';

export const hash = (salt: string, pwd: string) => {
    const hmac = createHmac('sha256', salt);
    return hmac.update(pwd).digest('hex');
};

export const safeEqual = (a: string, b: string) => {
    return a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));
};
