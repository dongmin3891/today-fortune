import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/colors';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.headerSection}>
                    <Text style={styles.title}>오늘의{'\n'}직장 운세</Text>
                    <Text style={styles.subtitle}>매일 아침 6시에 업데이트 됩니다</Text>
                </View>

                <View style={styles.buttonSection}>
                    <TouchableOpacity style={styles.fortuneButton} onPress={() => router.push('/home/fortune')}>
                        <Text style={styles.buttonText}>운세 확인하기</Text>
                    </TouchableOpacity>
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
});
