import { Animated, StyleSheet, Text } from 'react-native';
import React from 'react';

type FortuneAnimationProps = {
    spin: Animated.AnimatedInterpolation<string>;
};

export function FortuneAnimation({ spin }: FortuneAnimationProps) {
    return <Animated.Text style={[styles.fortuneBag, { transform: [{ rotate: spin }] }]}>🎋</Animated.Text>;
}

const styles = StyleSheet.create({
    fortuneBag: {
        fontSize: 80,
    },
});
