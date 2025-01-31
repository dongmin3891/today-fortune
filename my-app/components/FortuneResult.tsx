import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/colors';

type FortuneResultProps = {
    fortune: string;
};

export function FortuneResult({ fortune }: FortuneResultProps) {
    const handleShare = async () => {
        try {
            await Share.share({
                message: `[오늘의 직장 운세]\n\n${fortune}\n\n#직장운세 #오늘의운세`,
            });
        } catch (error) {
            console.error('Error sharing fortune:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.resultContainer}>
                <Text style={styles.fortuneText}>{fortune}</Text>
            </View>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                <Text style={styles.shareButtonText}>공유하기</Text>
            </TouchableOpacity>
            <Text style={styles.resetInfo}>매일 오전 6시에 초기화 돼요</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '90%',
    },
    resultContainer: {
        width: '100%',
        padding: 24,
        backgroundColor: Colors.card,
        borderRadius: 20,
        elevation: 2,
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        marginBottom: 20,
    },
    fortuneText: {
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 30,
        color: Colors.text,
        fontWeight: '500',
    },
    shareButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        marginBottom: 16,
        elevation: 2,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    shareButtonText: {
        color: Colors.card,
        fontSize: 16,
        fontWeight: '600',
    },
    resetInfo: {
        fontSize: 13,
        color: Colors.subText,
        textAlign: 'center',
    },
});
