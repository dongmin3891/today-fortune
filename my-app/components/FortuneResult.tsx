import { View, Text, StyleSheet, TouchableOpacity, Share, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { Colors } from '@/constants/colors';
import ViewShot from 'react-native-view-shot';

type FortuneResultProps = {
    fortune: string;
};

export function FortuneResult({ fortune }: FortuneResultProps) {
    const router = useRouter();
    const viewShotRef = useRef<ViewShot>(null);
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

    const handleShare = async () => {
        try {
            if (viewShotRef.current) {
                const uri = await viewShotRef.current.capture();

                if (Platform.OS === 'ios') {
                    await Share.share({
                        url: uri,
                        message: `[오늘의 직장 운세]\n\n${fortune}\n\n#직장운세 #오늘의운세`,
                    });
                } else {
                    await Share.share({
                        title: '오늘의 직장 운세',
                        message: `[오늘의 직장 운세]\n\n${fortune}\n\n#직장운세 #오늘의운세`,
                        url: `file://${uri}`,
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
                        <Text style={styles.title}>오늘의 운세</Text>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.fortuneText}>{fortune}</Text>
                    </View>
                </View>
            </ViewShot>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                    <Text style={styles.shareButtonText}>공유하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.historyButton} onPress={() => router.push('/home/history')}>
                    <Text style={styles.historyButtonText}>지난 운세 보기</Text>
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
        paddingBottom: 24,
    },
    date: {
        fontSize: 14,
        color: Colors.subText,
        marginBottom: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.text,
    },
    content: {
        flex: 1,
        backgroundColor: Colors.card,
        paddingHorizontal: 32,
        paddingVertical: 40,
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
        fontSize: 24,
        lineHeight: 36,
        color: Colors.text,
        letterSpacing: -0.5,
        textAlign: 'center',
        fontWeight: '600',
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
