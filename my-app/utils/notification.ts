import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FORTUNE_STORAGE_KEY } from '@/constants/storage';
import { SchedulableTriggerInputTypes } from 'expo-notifications';
import { getKSTDate } from '@/utils/fortune';

// 알림 권한 요청
export async function requestNotificationPermission() {
    if (!Device.isDevice) {
        return false;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        return false;
    }

    return true;
}

// 매일 오전 9시 알림 스케줄 설정
export async function scheduleFortuneNotification() {
    try {
        // 기존 알림 모두 취소
        await Notifications.cancelAllScheduledNotificationsAsync();

        // 현재 KST 시간 가져오기
        const nowKST = getKSTDate();
        const currentHour = nowKST.getHours();

        // 알림 시간 배열 (9시, 12시, 15시, 18시)
        const notificationHours = [9, 12, 15, 18];

        // 운세 확인 여부 체크
        const fortuneState = await AsyncStorage.getItem(FORTUNE_STORAGE_KEY);
        if (fortuneState) {
            const { lastCheckedAt } = JSON.parse(fortuneState);
            // 오늘 이미 운세를 확인했다면 알림 스케줄링 하지 않음
            if (!isFortuneAvailable(lastCheckedAt)) {
                return true;
            }
        }

        for (const hour of notificationHours) {
            // 현재 시간 이후의 알림만 설정
            if (currentHour < hour) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: '오늘의 운세를 아직 확인하지 않으셨네요! 🔮',
                        body: '잠시 시간을 내어 오늘의 운세를 확인해보세요.',
                        sound: true,
                    },
                    trigger: {
                        hour: hour,
                        minute: 0,
                        repeats: true,
                    },
                });
            }
        }

        return true;
    } catch (error) {
        console.error('Error scheduling notification:', error);
        return false;
    }
}

// 알림 설정 상태 확인
export async function checkNotificationStatus() {
    if (!Device.isDevice) {
        return false;
    }

    const settings = await Notifications.getPermissionsAsync();
    return settings.granted;
}

// 알림 설정 초기화
export async function initializeNotifications() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });
}
