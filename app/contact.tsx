import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Contact() {
  const router = useRouter();
  const [isNavVisible, setNavVisible] = useState(false);
  const translateX = useState(new Animated.Value(-300))[0];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const toggleNavBar = () => {
    setNavVisible(!isNavVisible);
    Animated.timing(translateX, {
      toValue: isNavVisible ? -300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleSend = async () => {
  if (!name || !email || !message) {
    alert('Please fill out all fields');
    return;
  }

  try {
    const res = await fetch('http://172.20.10.4:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      alert(data.message || 'Something went wrong');
    }
  } catch (err) {
    console.error(err);
    alert('Failed to send message');
  }
};

  return (
    <ScrollView style={styles.container}>
      {/* Navigation Header */}
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={toggleNavBar}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Petopia</Text>
      </View>

      {/* Slide Navigation Bar */}
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

      {/* Sayfa Başlığı */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Contact Us</Text>
      </View>

      {/* Açıklama ve Görsel */}
      <View style={styles.topSection}>
        <Text style={styles.subtitle}>We would love to hear from you!</Text>
        <Image
          source={require('../assets/images/logo4.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Form Bölümü */}
      <View style={styles.formSection}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Your Message"
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0050B7',
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0050B7',
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  logo: {
    width: 40,
    height: 40,
  },
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
    height: '100%',
    width: 250,
    paddingTop: 60,
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
  pageHeader: {
    backgroundColor: '#0050B7',
    alignItems: 'center',
    paddingVertical: 20,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  topSection: {
    backgroundColor: '#0050B7',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginBottom: -30, // 🔥 Eksi margin kullanıyoruz (resmi aşağı itiyoruz!)
  },
  
  formSection: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 0,   // 🔥 Yukarıdan marjin vermiyoruz
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 100,
    alignItems: 'center',
  },  
  input: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#FF9F1C',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
