import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function About() {
  const router = useRouter();
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

  return (
    <ScrollView style={styles.container}>
      {/* Ana Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleNavBar}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Petopia</Text>
      </View>

      {/* Navigation Bar */}
      <Animated.View style={[styles.navBar, { transform: [{ translateX }] }]}>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/home')}>
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/about')}>
          <Text style={styles.navButtonText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/contact')}>
          <Text style={styles.navButtonText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/signin')}>
          <Text style={styles.navButtonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>

        {/* Üst Başlık ve Açıklama */}
      <View style={styles.topSection}>
        <Text style={styles.pageTitle}>About Us</Text>
        <Text style={styles.subtitle}>
          Petopia is a digital platform for showcasing animals in shelters, making adoption easier.
        </Text>
      </View>

         {/* Logo */}
         <Image
          source={require('../assets/images/logo3.png')} 
          style={styles.image}
          resizeMode="contain"
        />

      {/* Alt Beyaz Bölüm */}
      <View style={styles.bottomSection}>
        <Text style={styles.feature}>🐾 View detailed animal profiles</Text>
        <Text style={styles.feature}>🐾 Filter animals by category</Text>
        <Text style={styles.feature}>🐾 Easy contact for adoption</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0050B7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0050B7',
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    zIndex: 100,
  },
  logo: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
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
    height: '100%',
    width: 250,
    paddingTop: 50,
    paddingHorizontal: 16,
    zIndex: 999,
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
  topSection: {
    backgroundColor: '#0050B7',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginBottom: -6,
  },  
  bottomSection: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 100,
    alignItems: 'center',
  },
  feature: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 20,
    textAlign: 'center',
  },
});
