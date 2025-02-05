import { getKSTDate, isFortuneAvailable } from '../fortune';

describe('Fortune Time Utils', () => {
    // KST 시간 변환 테스트
    describe('getKSTDate', () => {
        it('should convert UTC to KST correctly', () => {
            const utcDate = new Date('2024-01-01T00:00:00Z');
            const kstDate = getKSTDate(utcDate);

            expect(kstDate.getHours()).toBe(9);
        });
    });

    // 운세 확인 가능 여부 테스트
    describe('isFortuneAvailable', () => {
        beforeEach(() => {
            jest.useFakeTimers();
            // 현재 시간을 2024-01-02 10:00 KST (2024-01-02 01:00 UTC)로 설정
            jest.setSystemTime(new Date('2024-01-02T01:00:00Z'));
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        it('should return true if never checked before', () => {
            expect(isFortuneAvailable(null)).toBe(true);
        });

        it('should return true if last check was before 6AM KST today', () => {
            // 오늘 오전 5시 KST (2024-01-02 20:00 UTC)
            const lastCheck = new Date('2024-01-01T20:00:00Z').toISOString();
            expect(isFortuneAvailable(lastCheck)).toBe(true);
        });

        it('should return false if last check was after 6AM KST today', () => {
            // 오늘 오전 7시 KST (2024-01-02 22:00 UTC)
            const lastCheck = new Date('2024-01-02T00:00:00Z').toISOString();
            expect(isFortuneAvailable(lastCheck)).toBe(false);
        });
    });
});
