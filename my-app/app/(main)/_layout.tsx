import { Stack } from 'expo-router';

export default function MainLayout() {
    return (
        <Stack
            screenOptions={{
                title: '오늘의 직장 운세',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen name="home/index" />
            <Stack.Screen name="home/fortune" />
        </Stack>
    );
}
