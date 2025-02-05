import { FortuneHistory, FortuneState } from '@/types/fortune';
import AsyncStorage from '@react-native-async-storage/async-storage';

// KST 시간을 얻는 유틸리티 함수
export function getKSTDate(date: Date = new Date()): Date {
    // UTC+9 (한국 시간)로 변환
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    return new Date(utc + 9 * 60 * 60 * 1000);
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

    // 오늘 오전 6시를 기준으로 설정
    const todayLimit = new Date(nowKST);
    todayLimit.setHours(6, 0, 0, 0);

    // 현재 시간이 오전 6시 이전이면 전날 오전 6시를 기준으로 설정
    if (nowKST.getHours() < 6) {
        todayLimit.setDate(todayLimit.getDate() - 1);
    }

    // 마지막 체크 시간이 오늘(또는 전날) 오전 6시 이전이면 운세 확인 가능
    return lastCheckedKST < todayLimit;
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
