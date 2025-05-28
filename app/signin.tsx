import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from './context/AuthContext'; // ✅ doğru import

const { width, height } = Dimensions.get('window');

export default function SignInScreen() {
  const router = useRouter();
  const { login } = useAuth(); // ✅ doğru kullanım

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNavVisible, setNavVisible] = useState(false);
  const translateX = useState(new Animated.Value(-300))[0];

  const toggleNavBar = () => {
    setNavVisible(!isNavVisible);
    Animated.timing(translateX, {
      toValue: isNavVisible ? -300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('http://172.20.10.4:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await login(data.token); // ✅ token context'e yazıldı
        Alert.alert('Welcome', `Logged in as ${data.user.name}`);
        router.push('/profile');
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error: any) {
      Alert.alert('Network Error', error.message || 'An unexpected error occurred');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleNavBar}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Petopia</Text>
      </View>

      <Animated.View
        style={[styles.navBar, { transform: [{ translateX }] }]}
        pointerEvents={isNavVisible ? 'auto' : 'none'}
      >
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/home')}>
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/about')}>
          <Text style={styles.navButtonText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/contact')}>
          <Text style={styles.navButtonText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/profile')}>
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/signin')}>
          <Text style={styles.navButtonText}>Sign In</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={[styles.blueBackground, { height: height * 0.45 }]}>
        <Text style={styles.welcomeText}>Hi Welcome Back!</Text>
        <Text style={styles.subText}>
          Don’t have an account?{' '}
          <Text style={styles.signUpLink} onPress={() => router.push('/signup')}>
            Sign up
          </Text>
        </Text>
        <Image
          source={require('../assets/images/logo1.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formSection}>
        <TextInput
          placeholder="Full Name or Email"
          placeholderTextColor="#444"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#444"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => router.push('/forgotpassword')}>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f8ff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f56c3',
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  logo: { width: 40, height: 40 },
  headerTitle: {
    fontSize: 18,
    color: 'black',
    textAlign: 'left',
    flex: 1,
    marginLeft: 12,
    fontWeight: 'bold',
  },
  navBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#0050B7',
    height: height,
    width: 250,
    paddingTop: 50,
    paddingHorizontal: 16,
    zIndex: 1000,
  },
  navButton: {
    marginVertical: 10,
    paddingVertical: 12,
    backgroundColor: '#FF9F1C',
    borderRadius: 10,
    alignItems: 'center',
  },
  navButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  blueBackground: {
    backgroundColor: '#1f56c3',
    paddingTop: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  subText: { fontSize: 16, color: '#fff', marginTop: 20, textAlign: 'center' },
  signUpLink: { color: '#FFC107', fontWeight: 'bold' },
  image: { width: '80%', height: 450, alignSelf: 'center' },
  formSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 24,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#1f56c3',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  forgot: {
    color: '#1f56c3',
    textAlign: 'right',
    width: '100%',
    fontWeight: '500',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#1f56c3',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});
