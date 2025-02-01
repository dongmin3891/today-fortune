import { View, Text, TouchableOpacity, StyleSheet, Animated, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useRef, useState, useEffect } from 'react';
import { Colors } from '@/constants/colors';
import { FortuneBagIcon } from '@/components/icons/FortuneBagIcon';
import { Ionicons } from '@expo/vector-icons';
import { getNextAvailableTime } from '@/utils/fortune';

export default function HomeScreen() {
    const router = useRouter();
    const today = new Date();
    const formattedDate = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    });

    const buttonScale = useRef(new Animated.Value(1)).current;
    const [timeUntilNext, setTimeUntilNext] = useState('');

    useEffect(() => {
        const updateRemainingTime = () => {
            const now = new Date();
            const target = new Date();
            target.setHours(6, 0, 0, 0);

            // 현재 시간이 오전 6시 이후라면 다음 날 오전 6시로 설정
            if (now.getHours() >= 6) {
                target.setDate(target.getDate() + 1);
            }

            const diff = target.getTime() - now.getTime();
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            setTimeUntilNext(`${hours}시간 ${minutes}분`);
        };

        // 초기 실행
        updateRemainingTime();

        // 1분마다 업데이트
        const timer = setInterval(updateRemainingTime, 60000);

        return () => clearInterval(timer);
    }, []);

    const handlePressIn = () => {
        Animated.spring(buttonScale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(buttonScale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.date}>{formattedDate}</Text>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.headerSection}>
                    <Text style={styles.title}>오늘의{'\n'}직장 운세</Text>
                    <Text style={styles.subtitle}>매일 아침 6시에 업데이트 됩니다</Text>
                    <Text style={styles.nextUpdate}>다음 운세까지 {timeUntilNext} 남았어요</Text>
                </View>

                <View style={styles.buttonSection}>
                    <Pressable
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        onPress={() => router.push('/home/fortune')}
                    >
                        <Animated.View style={[styles.fortuneButton, { transform: [{ scale: buttonScale }] }]}>
                            <View style={styles.buttonContent}>
                                <FortuneBagIcon size={24} color={Colors.card} />
                                <Text style={styles.buttonText}>운세 확인하기</Text>
                            </View>
                        </Animated.View>
                    </Pressable>
                    <Text style={styles.description}>당신의 하루가 더 특별해지는 순간</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'space-between',
        paddingTop: '20%',
        paddingBottom: 40,
    },
    headerSection: {
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 40,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 12,
        lineHeight: 48,
    },
    subtitle: {
        fontSize: 15,
        color: Colors.subText,
        letterSpacing: -0.3,
        marginBottom: 4,
    },
    buttonSection: {
        width: '100%',
    },
    fortuneButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 18,
        borderRadius: 16,
        elevation: 3,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        marginBottom: 16,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    buttonText: {
        color: Colors.card,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: -0.3,
    },
    description: {
        fontSize: 15,
        color: Colors.subText,
        textAlign: 'center',
        letterSpacing: -0.3,
    },
    date: {
        fontSize: 16,
        color: Colors.primary,
        marginBottom: 8,
        fontWeight: '600',
    },
    nextUpdate: {
        fontSize: 14,
        color: Colors.subText,
        letterSpacing: -0.3,
        opacity: 0.8,
    },
});
