import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Screens auto-registered by folder structure */}
    </Stack>
  );
}
