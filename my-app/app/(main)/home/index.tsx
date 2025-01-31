import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/colors';

export default function HomeScreen() {
    const router = useRouter();

    const handleFortuneCheck = () => {
        router.push('/home/fortune');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>오늘의 직장 운세</Text>
            <TouchableOpacity style={styles.fortuneButton} onPress={handleFortuneCheck}>
                <Text style={styles.buttonText}>오늘의 운세 보기</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.background,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        color: Colors.text,
    },
    fortuneButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        elevation: 3,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.card,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
