import { View, Text, TouchableOpacity, StyleSheet, Animated, Pressable } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Colors } from '@/constants/colors';
import { FortuneBagIcon } from '@/components/icons/FortuneBagIcon';
import { Ionicons } from '@expo/vector-icons';
import { getNextAvailableTime, isFortuneAvailable } from '@/utils/fortune';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FORTUNE_STORAGE_KEY = '@fortune_state';

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
    const tooltipAnim = useRef(new Animated.Value(0)).current;
    const [hasCheckedToday, setHasCheckedToday] = useState(false);

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

    useEffect(() => {
        // 말풍선 애니메이션
        Animated.loop(
            Animated.sequence([
                Animated.timing(tooltipAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(tooltipAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    // 화면이 포커스될 때마다 운세 상태 체크
    useFocusEffect(
        useCallback(() => {
            checkTodayFortune();
        }, [])
    );

    // 기존의 useEffect는 유지 (초기 로딩용)
    useEffect(() => {
        checkTodayFortune();
    }, []);

    const checkTodayFortune = async () => {
        try {
            const fortuneState = await AsyncStorage.getItem(FORTUNE_STORAGE_KEY);
            if (fortuneState) {
                const { lastCheckedAt } = JSON.parse(fortuneState);
                setHasCheckedToday(!isFortuneAvailable(lastCheckedAt));
            } else {
                setHasCheckedToday(false);
            }
        } catch (error) {
            console.error('Error checking fortune:', error);
            setHasCheckedToday(false);
        }
    };

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
                    {hasCheckedToday ? (
                        <Text style={styles.nextUpdate}>다음 운세까지 {timeUntilNext} 남았어요</Text>
                    ) : (
                        <Text style={styles.encourageText}>아직 오늘의 운을 확인하지 않으셨네요! 🍀</Text>
                    )}
                </View>

                <View style={styles.buttonSection}>
                    {!hasCheckedToday && (
                        <View style={styles.tooltipContainer}>
                            <Animated.View
                                style={[
                                    styles.tooltip,
                                    {
                                        transform: [
                                            {
                                                translateY: tooltipAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0, -8],
                                                }),
                                            },
                                        ],
                                        opacity: tooltipAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0.7, 1],
                                        }),
                                    },
                                ]}
                            >
                                <Text style={styles.tooltipText}>오늘은 어떤 행운이 기다리고 있을까요? ✨</Text>
                                <View style={styles.tooltipArrow} />
                            </Animated.View>
                        </View>
                    )}
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
                    <Text style={styles.description}>
                        {hasCheckedToday ? '당신의 하루가 더 특별해지는 순간' : '오늘의 운세로 시작하는 활기찬 하루'}
                    </Text>
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
    tooltipContainer: {
        alignItems: 'center',
        marginBottom: 12,
    },
    tooltip: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        position: 'relative',
    },
    tooltipText: {
        color: Colors.card,
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: -0.3,
    },
    tooltipArrow: {
        position: 'absolute',
        bottom: -8,
        left: '50%',
        marginLeft: -8,
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderTopWidth: 8,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: Colors.primary,
    },
    encourageText: {
        fontSize: 14,
        color: Colors.primary,
        letterSpacing: -0.3,
        opacity: 0.9,
        fontWeight: '600',
    },
});
