import { Colors } from '@/constants/colors';
import { Stack } from 'expo-router';

export default function MainLayout() {
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
            }}
        >
            <Stack.Screen name="home/index" />
            <Stack.Screen name="home/fortune" />
        </Stack>
    );
}
