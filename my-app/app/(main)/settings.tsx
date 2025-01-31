import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { Colors } from '@/constants/colors';
import {
    requestNotificationPermission,
    scheduleFortuneNotification,
    checkNotificationStatus,
} from '@/utils/notification';

export default function SettingsScreen() {
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

    useEffect(() => {
        checkCurrentStatus();
    }, []);

    const checkCurrentStatus = async () => {
        const status = await checkNotificationStatus();
        setIsNotificationEnabled(status);
    };

    const handleNotificationToggle = async () => {
        if (!isNotificationEnabled) {
            const permission = await requestNotificationPermission();
            if (permission) {
                const scheduled = await scheduleFortuneNotification();
                if (scheduled) {
                    setIsNotificationEnabled(true);
                    Alert.alert('알림 설정 완료', '오전 9시까지 운세를 확인하지 않으시면 알림을 보내드려요!');
                }
            } else {
                Alert.alert('알림 권한 필요', '설정에서 알림 권한을 허용해주세요.');
            }
        } else {
            await Notifications.cancelAllScheduledNotificationsAsync();
            setIsNotificationEnabled(false);
            Alert.alert('알림 해제 완료', '더 이상 운세 알림을 받지 않습니다.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>알림 설정</Text>
                <View style={styles.settingItem}>
                    <View style={styles.settingContent}>
                        <Text style={styles.settingTitle}>운세 알림</Text>
                        <Text style={styles.settingDescription}>오전 9시까지 운세를 확인하지 않으시면 알려드려요</Text>
                    </View>
                    <Switch
                        value={isNotificationEnabled}
                        onValueChange={handleNotificationToggle}
                        trackColor={{ false: '#ddd', true: Colors.primary }}
                        thumbColor="#fff"
                    />
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
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.subText,
        marginBottom: 16,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.card,
        padding: 16,
        borderRadius: 12,
    },
    settingContent: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 4,
    },
    settingDescription: {
        fontSize: 14,
        color: Colors.subText,
    },
});
