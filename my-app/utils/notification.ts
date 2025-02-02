import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FORTUNE_STORAGE_KEY } from '@/constants/storage';
import { SchedulableTriggerInputTypes } from 'expo-notifications';

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
        await Notifications.cancelAllScheduledNotificationsAsync();

        // 오전 9시 첫 알림
        await Notifications.scheduleNotificationAsync({
            content: {
                title: '오늘의 운세를 아직 확인하지 않으셨네요! 🔮',
                body: '잠시 시간을 내어 오늘의 운세를 확인해보세요.',
                sound: true,
            },
            trigger: {
                type: SchedulableTriggerInputTypes.DAILY,
                hour: 9,
                minute: 0,
            },
        });

        // 12시, 15시, 18시 추가 알림
        const additionalHours = [12, 15, 18];

        for (const hour of additionalHours) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: '아직 오늘의 운세를 확인하지 않으셨어요 ✨',
                    body: '잠깐 시간을 내어 운세를 확인하고 기분 전환해보세요!',
                    sound: true,
                },
                trigger: {
                    type: SchedulableTriggerInputTypes.DAILY,
                    hour,
                    minute: 0,
                },
            });
        }

        // 알림이 실제로 표시되기 전에 확인하는 리스너
        Notifications.addNotificationResponseReceivedListener(async (response) => {
            try {
                const fortuneState = await AsyncStorage.getItem(FORTUNE_STORAGE_KEY);
                if (!fortuneState) return;

                const { lastCheckedAt } = JSON.parse(fortuneState);
                const lastChecked = new Date(lastCheckedAt);
                const today = new Date();

                // 이미 오늘 운세를 확인했다면 알림 제거
                if (
                    lastChecked.getFullYear() === today.getFullYear() &&
                    lastChecked.getMonth() === today.getMonth() &&
                    lastChecked.getDate() === today.getDate()
                ) {
                    await Notifications.cancelAllScheduledNotificationsAsync();
                }
            } catch (error) {
                console.error('Error checking fortune state:', error);
            }
        });

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
