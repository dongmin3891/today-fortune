import { View, StyleSheet, Animated, Text } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Colors } from '@/constants/colors';
import { FortuneBagIcon } from './icons/FortuneBagIcon';

type Props = {
    spin: Animated.AnimatedInterpolation<string>;
};

export function FortuneAnimation({ spin }: Props) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Animated.View
                    style={[
                        styles.iconContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ rotate: spin }],
                        },
                    ]}
                >
                    <FortuneBagIcon size={80} color={Colors.primary} />
                </Animated.View>
                <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
                    오늘의 운세를 확인하고 있어요
                </Animated.Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginBottom: 24,
    },
    loadingText: {
        fontSize: 15,
        color: Colors.subText,
        letterSpacing: -0.3,
    },
});
