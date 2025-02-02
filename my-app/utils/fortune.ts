import { FortuneHistory, FortuneState } from '@/types/fortune';
import AsyncStorage from '@react-native-async-storage/async-storage';

// KST 시간을 얻는 유틸리티 함수
export function getKSTDate(date: Date = new Date()): Date {
    const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return kstDate;
}

export function getNextAvailableTime(): Date {
    const now = new Date();

    // 다음 운세 확인 가능 시간은 KST 06:00 (UTC 21:00)
    const nextAvailable = new Date();
    nextAvailable.setUTCHours(21, 0, 0, 0); // UTC 21:00

    // 현재 시간이 KST 06:00(UTC 21:00) 이후라면 다음날로 설정
    if (now.getUTCHours() >= 21) {
        nextAvailable.setUTCDate(nextAvailable.getUTCDate() + 1);
    }

    return nextAvailable;
}

export function isFortuneAvailable(lastCheckedAt: string | null): boolean {
    if (!lastCheckedAt) return true;

    const lastCheckedKST = getKSTDate(new Date(lastCheckedAt));
    const nowKST = getKSTDate();

    // 같은 날짜인지 확인
    return (
        lastCheckedKST.getFullYear() !== nowKST.getFullYear() ||
        lastCheckedKST.getMonth() !== nowKST.getMonth() ||
        lastCheckedKST.getDate() !== nowKST.getDate()
    );
}

export const saveFortuneHistory = async (fortune: string) => {
    try {
        const history = await AsyncStorage.getItem('fortune_history');
        const newHistory: FortuneHistory = {
            date: new Date().toISOString(),
            fortune,
        };

        if (history) {
            const historyArray: FortuneHistory[] = JSON.parse(history);
            await AsyncStorage.setItem('fortune_history', JSON.stringify([newHistory, ...historyArray].slice(0, 7)));
        } else {
            await AsyncStorage.setItem('fortune_history', JSON.stringify([newHistory]));
        }
    } catch (error) {
        console.error('Error saving fortune history:', error);
    }
};

export const getFortuneHistory = async (): Promise<FortuneHistory[]> => {
    try {
        const history = await AsyncStorage.getItem('fortune_history');
        return history ? JSON.parse(history) : [];
    } catch (error) {
        console.error('Error getting fortune history:', error);
        return [];
    }
};
