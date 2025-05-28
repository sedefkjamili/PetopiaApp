import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

type Notification = {
  _id: string;
  title: string;
  body: string;
  createdAt?: string;
};

export default function NotificationsScreen() {
  const router = useRouter();
  const [isNavVisible, setNavVisible] = useState(false);
  const translateX = useState(new Animated.Value(-300))[0];
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const toggleNavBar = () => {
    setNavVisible(!isNavVisible);
    Animated.timing(translateX, {
      toValue: isNavVisible ? -300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fetch('http://172.20.10.4:5000/api/notifications')
      .then(res => {
        console.log('Response status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Fetched notifications:', data);
        const list = Array.isArray(data) ? data : data.notifications;
        setNotifications([...list].reverse()); // en son geleni en başa al
      })
      .catch(err => console.error('Failed to fetch notifications', err));
  }, []);

  return (
    <View style={styles.container}>
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
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/signin')}>
          <Text style={styles.navButtonText}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Blue Background */}
      <View style={[styles.blueBackground, { height: height * 0.3 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.welcomeText}>Notifications</Text>
      </View>

      {/* White Section with first notification */}
      <View style={styles.formSection}>

        {notifications.length === 0 ? (
          <Text style={styles.emptyText}>No notifications yet 📭</Text>
        ) : (
          notifications.map((item) => (
            <View key={item._id} style={styles.card}>
              <Text style={styles.notificationTitle}>🔔 {item.title}</Text>
              <Text style={styles.notificationBody}>{item.body}</Text>
              {item.createdAt && (
                <Text style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
                  {new Date(item.createdAt).toLocaleString()}
                </Text>
              )}
            </View>
          ))
        )}

      </View>
    </View>
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
    marginTop: 40,
    textAlign: 'center',
  },
  formSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -100,
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#34495e',
  },
  notificationBody: { fontSize: 16, color: '#7f8c8d' },
  backButton: { position: 'absolute', top: 10, left: 0 },
  backArrow: {
    fontSize: 26,
    color: '#FFC107',
    fontWeight: 'bold',
    marginLeft: 20,
  },
});
