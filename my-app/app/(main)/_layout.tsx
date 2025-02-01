import { Colors } from '@/constants/colors';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function MainLayout() {
    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                title: '오늘의 직장 운세',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: Colors.card,
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: Colors.text,
                    fontSize: 18,
                },
                headerShadowVisible: false,
                contentStyle: {
                    backgroundColor: Colors.background,
                },
                headerRight: ({ tintColor }) => (
                    <TouchableOpacity style={{ padding: 8, marginRight: 8 }} onPress={() => router.push('/settings')}>
                        <Ionicons name="settings-outline" size={24} color={tintColor} />
                    </TouchableOpacity>
                ),
            }}
        >
            <Stack.Screen name="home/index" />
            <Stack.Screen name="home/fortune" />
            <Stack.Screen
                name="settings"
                options={{
                    headerRight: undefined,
                }}
            />
        </Stack>
    );
}
