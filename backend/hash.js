const { createHmac } = await import('crypto');

const secret = 'first-project';

export default function Hashing(password) {
    const hash = createHmac('sha256', secret)
        .update(password)
        .digest('hex');
    return hash;
}
