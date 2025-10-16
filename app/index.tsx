import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Block } from 'galio-framework';
import { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';


export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem('loggedInUser');
      router.replace(user ? '/(tabs)' : '/login');
    };
    setTimeout(() => {
      checkLogin();
    }, 1500);
  }, []);

  return (
    <Block flex middle style={styles.container}>
      <Image
        source={require('../assets/images/CastCombeLandscapelogoDark.webp')}
        style={styles.logo}
        resizeMode="contain"
      />

      <ActivityIndicator size={30} color="#000" />
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 120,
  },
});