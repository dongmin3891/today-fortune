import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import React from 'react';

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
    },
    resultContainer: {
        padding: 20,
        backgroundColor: '#F8F9FA',
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginBottom: 16,
    },
    fortuneText: {
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 28,
    },
    shareButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginBottom: 12,
    },
    shareButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    resetInfo: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
});
