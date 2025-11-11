import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tabs, useRouter } from 'expo-router';
import { Block } from 'galio-framework';
import { useEffect } from 'react';
import { Image, TouchableOpacity } from 'react-native';

export default function TabLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem('loggedInUser');
      if (!user) router.replace('/login');
    };
    checkLogin();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('loggedInUser');
    router.replace('/login');
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3897f0',
        headerTitle: () => (
          <Block row middle>
            <Image
              source={require('../../assets/images/CastCombeLandscapelogoDark.webp')}
              style={{ width: 120, height: 40 }}
              resizeMode="contain"
            />
          </Block>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
            <FontAwesome name="sign-out" size={24} color="gray" />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
