type Record = {
    timestamp: number;
    count: number;
};

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 3;

const ipCache = new Map<string, Record>();

export function checkRateLimit(ip: string): boolean {
const now = Date.now();
const record = ipCache.get(ip);

if (record) {
    if (now - record.timestamp < RATE_LIMIT_WINDOW) {
    if (record.count >= RATE_LIMIT_MAX) return false;

    record.count += 1;
    ipCache.set(ip, record);
    return true;
    } else {
    ipCache.set(ip, { count: 1, timestamp: now });
    return true;
    }
} else {
    ipCache.set(ip, { count: 1, timestamp: now });
    return true;
}
}
