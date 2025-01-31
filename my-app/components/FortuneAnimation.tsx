import { View, StyleSheet, Animated, Text } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/colors';

type FortuneAnimationProps = {
    spin: Animated.AnimatedInterpolation<string>;
};

export function FortuneAnimation({ spin }: FortuneAnimationProps) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Animated.View
                    style={[
                        styles.fortuneBag,
                        {
                            transform: [{ rotate: spin }],
                        },
                    ]}
                >
                    <Text style={styles.fortuneEmoji}>🎋</Text>
                </Animated.View>
                <Text style={styles.loadingText}>오늘의 운세를 확인하고 있어요</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '20%', // 약간 위로 올림
    },
    fortuneBag: {
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    fortuneEmoji: {
        fontSize: 80,
    },
    loadingText: {
        fontSize: 16,
        color: Colors.subText,
        letterSpacing: -0.3,
    },
});
