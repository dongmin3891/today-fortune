// 기본 Jest 확장
require('@testing-library/jest-native/extend-expect');

// AsyncStorage 모킹
jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
}));

// Notifications 모킹
jest.mock('expo-notifications', () => ({
    scheduleNotificationAsync: jest.fn(),
    cancelAllScheduledNotificationsAsync: jest.fn(),
    addNotificationResponseReceivedListener: jest.fn(),
    getPermissionsAsync: jest.fn(),
    requestPermissionsAsync: jest.fn(),
    setNotificationHandler: jest.fn(),
}));

// 전역 설정
global.expect = expect;
global.jest = jest;
