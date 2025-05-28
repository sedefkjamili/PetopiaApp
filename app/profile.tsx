import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen() {
  const router = useRouter();
  const [isNavVisible, setNavVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const translateX = useState(new Animated.Value(-300))[0];

  const toggleNavBar = () => {
    setNavVisible(!isNavVisible);
    Animated.timing(translateX, {
      toValue: isNavVisible ? -300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    checkLogin();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/signin');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleNavBar}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Petopia</Text>
      </View>

      {/* Navigation Bar */}
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
        {isLoggedIn ? (
          <TouchableOpacity style={styles.navButton} onPress={handleLogout}>
            <Text style={styles.navButtonText}>Log Out</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.navButton} onPress={() => router.push('/signin')}>
            <Text style={styles.navButtonText}>Login</Text>
          </TouchableOpacity>
        )}
      </Animated.View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Text style={styles.title}>My Profile</Text>
        <Image
          source={require('../assets/images/logo7.png')}
          style={styles.profileImage}
          resizeMode="contain"
        />

        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card} onPress={() => router.push('/userprofiles/demo')}>
            <Text style={styles.cardIcon}>👤</Text>
            <Text style={styles.cardTitle}>Profile</Text>
            <Text style={styles.cardDesc}>View your profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => router.push('/notifications')}>
            <Text style={styles.cardIcon}>🔔</Text>
            <Text style={styles.cardTitle}>Notifications</Text>
            <Text style={styles.cardDesc}>View your reminders</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card} onPress={() => router.push('/diseases')}>
            <Text style={styles.cardIcon}>🦠</Text>
            <Text style={styles.cardTitle}>Diseases</Text>
            <Text style={styles.cardDesc}>View animal diseases</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => router.push('/addpet')}>
            <Text style={styles.cardIcon}>➕</Text>
            <Text style={styles.cardTitle}>Add Pet</Text>
            <Text style={styles.cardDesc}>Add a new pet</Text>
          </TouchableOpacity>
        </View>
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
  navButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  profileSection: { alignItems: 'center', paddingVertical: 30 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2c3e50', marginBottom: 20 },
  profileImage: { width: 200, height: 200, borderRadius: 75, marginBottom: 20 },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: '40%',
    elevation: 5,
  },
  cardIcon: { fontSize: 40, marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#34495e' },
  cardDesc: { fontSize: 14, color: '#7f8c8d', textAlign: 'center', marginTop: 5 },
});
