import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/colors';
import { FortuneHistory } from '@/types/fortune';
import { getFortuneHistory } from '@/utils/fortune';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {
    const [history, setHistory] = useState<FortuneHistory[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        setIsLoading(true);
        const fortuneHistory = await getFortuneHistory();
        console.log(fortuneHistory);
        setHistory(fortuneHistory);
        setIsLoading(false);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    const renderHistoryItem = ({ item }: { item: FortuneHistory }) => (
        <View style={styles.historyItem}>
            <Text style={styles.date}>{formatDate(item.date)}</Text>
            <View style={styles.fortuneCard}>
                <Text style={styles.fortuneText}>{item.fortune}</Text>
            </View>
        </View>
    );

    const clearStorage = async () => {
        try {
            await AsyncStorage.clear();
            loadHistory(); // 히스토리 다시 로드
        } catch (error) {
            console.error('Error clearing storage:', error);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>지난 운세</Text>
                </View>
                <View style={styles.centerContainer}>
                    <Text style={styles.loadingText}>불러오는 중...</Text>
                </View>
            </View>
        );
    }

    if (history.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>지난 운세</Text>
                </View>
                {__DEV__ && ( // 개발 모드에서만 보이는 버튼
                    <TouchableOpacity style={styles.clearButton} onPress={clearStorage}>
                        <Text style={styles.clearButtonText}>초기화</Text>
                    </TouchableOpacity>
                )}
                <View style={styles.centerContainer}>
                    <Text style={styles.emptyTitle}>아직 운세 기록이 없어요</Text>
                    <Text style={styles.emptyText}>
                        매일 새로운 운세를 확인하고{'\n'}
                        나만의 운세 기록을 만들어보세요
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>지난 운세</Text>
                {__DEV__ && ( // 개발 모드에서만 보이는 버튼
                    <TouchableOpacity style={styles.clearButton} onPress={clearStorage}>
                        <Text style={styles.clearButtonText}>초기화</Text>
                    </TouchableOpacity>
                )}
                <Text style={styles.subtitle}>최근 7일간의 운세를 확인해보세요</Text>
            </View>
            <FlatList
                data={history}
                renderItem={renderHistoryItem}
                keyExtractor={(item) => item.date}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        padding: 20,
        paddingBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.subText,
    },
    listContainer: {
        padding: 20,
    },
    historyItem: {
        marginBottom: 20,
    },
    date: {
        fontSize: 14,
        color: Colors.subText,
        marginBottom: 8,
    },
    fortuneCard: {
        backgroundColor: Colors.card,
        padding: 20,
        borderRadius: 16,
        elevation: 2,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    fortuneText: {
        fontSize: 16,
        lineHeight: 24,
        color: Colors.text,
        letterSpacing: -0.3,
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 12,
        textAlign: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: Colors.subText,
        textAlign: 'center',
        lineHeight: 24,
    },
    loadingText: {
        fontSize: 16,
        color: Colors.subText,
    },
    clearButton: {
        marginTop: 8,
        padding: 8,
        backgroundColor: '#ff6b6b',
        borderRadius: 8,
    },
    clearButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
});
