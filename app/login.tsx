import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Block, Text, Toast } from 'galio-framework';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');

    if (!username || !password) {
      setErrorMessage('Please enter username and password');
      return;
    }

    try {
      setLoading(true);
      const usersData = await AsyncStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        setErrorMessage('Invalid username or password');
        return;
      }

      await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
      router.replace('/(tabs)');
    } catch (error) {
      console.error(error);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Block flex middle style={styles.container}>
        <Image
          source={require('../assets/images/CastCombeLandscapelogoDark.webp')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Toast
          isShow={!!errorMessage}
          positionIndicator="top"
          color="error"
        >
          {errorMessage}
        </Toast>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setErrorMessage('');
          }}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage('');
          }}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text color="#fff" bold>
            {loading ? 'Logging in...' : 'Log In'}
          </Text>
        </TouchableOpacity>

        <Block row middle style={{ marginVertical: 25 }}>
          <Block style={styles.line} />
          <Text muted style={{ marginHorizontal: 10 }}>
            OR
          </Text>
          <Block style={styles.line} />
        </Block>

        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text size={14}>
            Don’t have an account?{' '}
            <Text color="#3897f0" bold>
              Sign up
            </Text>
          </Text>
        </TouchableOpacity>
      </Block>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#fafafa',
    borderColor: '#dbdbdb',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3897f0',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    width: '100%',
  },
  line: {
    height: 1,
    backgroundColor: '#ddd',
    flex: 1,
  }
});
