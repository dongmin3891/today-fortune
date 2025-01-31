import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WORK_FORTUNES } from '../../../constants/fortunes';
import { FortuneAnimation } from '../../../components/FortuneAnimation';
import { FortuneResult } from '../../../components/FortuneResult';
import { getNextAvailableTime } from '../../../utils/fortune';

const FORTUNE_STORAGE_KEY = '@fortune_state';

export default function FortuneScreen() {
    const router = useRouter();
    const spinValue = useRef(new Animated.Value(0)).current;
    const [fortune, setFortune] = useState('');
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        checkStoredFortune();
    }, []);

    const checkStoredFortune = async () => {
        try {
            const fortuneState = await AsyncStorage.getItem(FORTUNE_STORAGE_KEY);
            if (fortuneState) {
                const state = JSON.parse(fortuneState);
                setFortune(state.fortune);
                setShowResult(true);
            } else {
                startFortuneAnimation();
            }
        } catch (error) {
            console.error('Error checking stored fortune:', error);
            startFortuneAnimation();
        }
    };

    const startFortuneAnimation = () => {
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            const randomFortune = WORK_FORTUNES[Math.floor(Math.random() * WORK_FORTUNES.length)];
            setFortune(randomFortune);
            setShowResult(true);
            saveFortune(randomFortune);
        });
    };

    const saveFortune = async (fortuneText: string) => {
        try {
            const fortuneState = {
                lastCheckedAt: new Date().toISOString(),
                fortune: fortuneText,
                nextAvailableAt: getNextAvailableTime().toISOString(),
            };
            await AsyncStorage.setItem(FORTUNE_STORAGE_KEY, JSON.stringify(fortuneState));
        } catch (error) {
            console.error('Error saving fortune:', error);
        }
    };

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            {!showResult ? <FortuneAnimation spin={spin} /> : <FortuneResult fortune={fortune} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
});
