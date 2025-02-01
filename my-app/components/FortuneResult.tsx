import { View, Text, StyleSheet, TouchableOpacity, Share, Platform, Animated, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useRef, useEffect, useState } from 'react';
import { Colors } from '@/constants/colors';
import ViewShot from 'react-native-view-shot';
import { Ionicons } from '@expo/vector-icons';
import { FORTUNE_MESSAGES } from '@/constants/fortunes';
import * as Sharing from 'expo-sharing';
type FortuneResultProps = {
    fortune: string;
};

export function FortuneResult({ fortune }: FortuneResultProps) {
    const router = useRouter();
    const viewShotRef = useRef<ViewShot>(null);
    const today = new Date();
    const formattedDate = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    });
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const buttonScale = useRef(new Animated.Value(1)).current;
    const [message] = useState(() => FORTUNE_MESSAGES[Math.floor(Math.random() * FORTUNE_MESSAGES.length)]);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleShare = async () => {
        try {
            if (viewShotRef.current?.capture) {
                const uri = await viewShotRef.current.capture();

                if (Platform.OS === 'ios' || Platform.OS === 'android') {
                    await Sharing.shareAsync(uri, {
                        dialogTitle: '오늘의 직장 운세',
                        mimeType: 'image/png', // ✅ 확장자 지정
                    });
                } else {
                    await Share.share({
                        message: `[오늘의 직장 운세]\n\n${fortune}\n\n#직장운세 #오늘의운세`,
                    });
                }
            }
        } catch (error) {
            console.error('Error sharing fortune:', error);
            await Share.share({
                message: `[오늘의 직장 운세]\n\n${fortune}\n\n#직장운세 #오늘의운세`,
            });
        }
    };

    const handlePressIn = () => {
        Animated.spring(buttonScale, {
            toValue: 0.97,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(buttonScale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <ViewShot
                ref={viewShotRef}
                options={{
                    format: 'jpg',
                    quality: 0.9,
                }}
                style={styles.shotContainer}
            >
                <View style={styles.cardContainer}>
                    <View style={styles.header}>
                        <Text style={styles.date}>{formattedDate}</Text>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>오늘의 운세</Text>
                            <Text style={styles.subtitle}>{message}</Text>
                        </View>
                    </View>

                    <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                        <Text style={styles.fortuneText}>{fortune}</Text>
                    </Animated.View>
                </View>
            </ViewShot>

            <View style={styles.footer}>
                <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={handleShare}>
                    <Animated.View style={[styles.shareButton, { transform: [{ scale: buttonScale }] }]}>
                        <View style={styles.buttonContent}>
                            <Ionicons name="share-outline" size={20} color={Colors.card} />
                            <Text style={styles.shareButtonText}>공유하기</Text>
                        </View>
                    </Animated.View>
                </Pressable>
                <TouchableOpacity style={styles.historyButton} onPress={() => router.push('/home/history')}>
                    <View style={styles.buttonContent}>
                        <Ionicons name="time-outline" size={20} color={Colors.primary} />
                        <Text style={styles.historyButtonText}>지난 운세 보기</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.updateInfo}>매일 아침 6시에 업데이트 됩니다</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 28,
    },
    date: {
        fontSize: 16,
        color: Colors.primary,
        marginBottom: 8,
        fontWeight: '600',
    },
    titleContainer: {
        gap: 6,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.text,
    },
    subtitle: {
        fontSize: 15,
        color: Colors.subText,
        letterSpacing: -0.3,
    },
    content: {
        flex: 1,
        backgroundColor: Colors.card,
        paddingHorizontal: 40,
        paddingVertical: 48,
        justifyContent: 'center',
        marginHorizontal: 20,
        borderRadius: 20,
        elevation: 3,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
    },
    fortuneText: {
        fontSize: 22,
        lineHeight: 34,
        color: Colors.text,
        letterSpacing: -0.5,
        textAlign: 'center',
        fontWeight: '600',
        flexWrap: 'wrap',
        flexShrink: 1,
    },
    decorationLeft: {
        position: 'absolute',
        left: 0,
        top: '15%',
        width: 4,
        height: '70%',
        backgroundColor: Colors.primary,
        opacity: 0.08,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    decorationRight: {
        position: 'absolute',
        right: 0,
        top: '15%',
        width: 4,
        height: '70%',
        backgroundColor: Colors.primary,
        opacity: 0.08,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
    },
    quoteMark: {
        position: 'absolute',
        fontSize: 80,
        fontFamily: 'System',
        color: Colors.primary,
        opacity: 0.06,
        zIndex: 0,
    },
    quoteMarkLeft: {
        left: 0,
        top: -10,
    },
    quoteMarkRight: {
        right: 0,
        bottom: -30,
        transform: [{ rotate: '180deg' }],
    },
    footer: {
        padding: 20,
        paddingTop: 32,
    },
    shareButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 14,
        marginBottom: 12,
        elevation: 3,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    shareButtonText: {
        color: Colors.card,
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: -0.3,
    },
    updateInfo: {
        fontSize: 14,
        color: Colors.subText,
        textAlign: 'center',
        letterSpacing: -0.2,
    },
    historyButton: {
        backgroundColor: Colors.background,
        paddingVertical: 16,
        borderRadius: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    historyButtonText: {
        color: Colors.primary,
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: -0.3,
    },
    shotContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: 20,
    },
    cardContainer: {
        flex: 1,
        marginHorizontal: 20,
    },
});
