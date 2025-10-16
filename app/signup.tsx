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

export default function SignupScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignup = async () => {
    setErrorMessage('');

    if (!username || !email || !password) {
      setErrorMessage('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      const usersData = await AsyncStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      const exists = users.find((u) => u.username === username);
      if (exists) {
        setErrorMessage('Username already exists');
        return;
      }

      users.push({ username, email, password });
      await AsyncStorage.setItem('users', JSON.stringify(users));

      setSuccessMessage('Account created! Please login.');
      setTimeout(()=> {
        router.replace('/login');
      }, 1500);
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

        {/* Toast error */}
        <Toast
          isShow={!!errorMessage}
          positionIndicator="top"
          color="error"
        >
          {errorMessage}
        </Toast>

        {/* Toast Success */}
        <Toast
          isShow={!!successMessage}
          positionIndicator="top"
          color="success"
        >
          {successMessage}
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
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrorMessage('');
          }}
          keyboardType="email-address"
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
          onPress={handleSignup}
          disabled={loading}
        >
          <Text color="#fff" bold>
            {loading ? 'Signing up...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <Block row middle style={{ marginVertical: 25 }}>
          <Block style={styles.line} />
          <Text muted style={{ marginHorizontal: 10 }}>
            OR
          </Text>
          <Block style={styles.line} />
        </Block>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text size={14}>
            Already have an account?{' '}
            <Text color="#3897f0" bold>
              Log in
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
  },
});
