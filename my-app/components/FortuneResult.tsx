import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

type FortuneResultProps = {
    fortune: string;
};

export function FortuneResult({ fortune }: FortuneResultProps) {
    return (
        <View style={styles.container}>
            <View style={styles.resultContainer}>
                <Text style={styles.fortuneText}>{fortune}</Text>
            </View>
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
    resetInfo: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
});
