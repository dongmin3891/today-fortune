import { FortuneState } from '../types/fortune';

export function getNextAvailableTime(): Date {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(6, 0, 0, 0);
    return tomorrow;
}

export function isFortuneAvailable(lastCheckedAt: string | null): boolean {
    if (!lastCheckedAt) return true;

    const now = new Date();
    const lastChecked = new Date(lastCheckedAt);
    const nextAvailable = new Date(lastChecked);
    nextAvailable.setDate(nextAvailable.getDate() + 1);
    nextAvailable.setHours(6, 0, 0, 0);

    return now >= nextAvailable;
}
