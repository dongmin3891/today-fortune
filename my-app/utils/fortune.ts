import { FortuneState } from '@/types/fortune';

// KST 시간을 얻는 유틸리티 함수
export function getKSTDate(date: Date = new Date()): Date {
    const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return kstDate;
}

export function getNextAvailableTime(): Date {
    const now = new Date();
    const nextAvailable = new Date(now);
    nextAvailable.setUTCHours(21, 0, 0, 0); // UTC 21:00은 KST 06:00

    // 현재 KST 시간이 06시 이후라면 다음날로 설정
    const currentKSTHour = now.getUTCHours() + 9;
    if (currentKSTHour >= 6) {
        nextAvailable.setUTCDate(nextAvailable.getUTCDate() + 1);
    }

    return nextAvailable;
}

export function isFortuneAvailable(lastCheckedAt: string | null): boolean {
    if (!lastCheckedAt) return true;

    const now = new Date();
    const nextAvailable = getNextAvailableTime();

    return now >= nextAvailable;
}
