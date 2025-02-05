import { scheduleFortuneNotification } from '../notification';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Notifications 모듈 모킹
jest.mock('expo-notifications');

describe('Notification Utils', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe('scheduleFortuneNotification', () => {
        it('should schedule notifications only for future hours', async () => {
            // 현재 시간을 오후 5시 KST (08:00 UTC)로 설정
            jest.setSystemTime(new Date('2024-01-01T08:00:00Z'));

            await scheduleFortuneNotification();

            // 18시에 대한 알림만 스케줄되어야 함
            expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledTimes(1);
            expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith(
                expect.objectContaining({
                    content: expect.objectContaining({
                        title: expect.stringContaining('운세'),
                        sound: true,
                    }),
                    trigger: expect.objectContaining({
                        hour: 18,
                        minute: 0,
                        repeats: true,
                    }),
                })
            );
        });

        it('should cancel all notifications when fortune is checked', async () => {
            const mockFortuneState = {
                lastCheckedAt: new Date().toISOString(),
            };

            // AsyncStorage 모킹
            jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue(JSON.stringify(mockFortuneState));

            // 알림 응답 시뮬레이션
            const listener = jest.fn();
            Notifications.addNotificationResponseReceivedListener.mockImplementation(listener);

            await scheduleFortuneNotification();

            // 운세 확인 후 알림 취소 확인
            expect(Notifications.cancelAllScheduledNotificationsAsync).toHaveBeenCalled();
        });
    });
});
