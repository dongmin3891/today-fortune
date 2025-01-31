import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isFortuneAvailable } from '../../../utils/fortune';

const FORTUNE_STORAGE_KEY = '@fortune_state';

export default function HomeScreen() {
    const router = useRouter();

    useEffect(() => {
        checkFortuneState();
    }, []);

    const checkFortuneState = async () => {
        try {
            const fortuneState = await AsyncStorage.getItem(FORTUNE_STORAGE_KEY);
            if (fortuneState) {
                const { lastCheckedAt, fortune } = JSON.parse(fortuneState);
                if (!isFortuneAvailable(lastCheckedAt)) {
                    // 아직 다음 운세를 볼 수 없는 경우, 저장된 운세 결과 페이지로 이동
                    router.replace('/home/fortune');
                }
            }
        } catch (error) {
            console.error('Error checking fortune state:', error);
        }
    };

    const handleFortuneCheck = async () => {
        try {
            const fortuneState = await AsyncStorage.getItem(FORTUNE_STORAGE_KEY);
            if (fortuneState) {
                const { lastCheckedAt } = JSON.parse(fortuneState);
                if (!isFortuneAvailable(lastCheckedAt)) {
                    // 아직 운세를 볼 수 없는 경우 메시지 표시
                    alert('다음 운세는 내일 오전 6시부터 확인할 수 있습니다.');
                    return;
                }
            }
            router.push('/home/fortune');
        } catch (error) {
            console.error('Error checking fortune availability:', error);
            router.push('/home/fortune'); // 에러 발생 시 운세 보기 허용
        }
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
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    fortuneButton: {
        backgroundColor: '#FF6B6B',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
