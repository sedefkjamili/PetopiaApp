import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter(); // useRouter hook'u, sayfa geçişi için kullanılıyor

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')} // Logoyu buraya yerleştiriyoruz
        style={styles.logo}
      />
      <Text style={styles.title}>Best Club For Your Little Pet</Text>
      <Text style={styles.subtitle}>Petopia</Text>
      
      {/* Yönlendirme butonu */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/home')} // Burada '/home' ekranına yönlendiriyoruz
      >
        <Text style={styles.buttonText}>Let's Get Started!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0050B7', // Arka plan rengi
    paddingHorizontal: 20,
    paddingTop: height * 0.1, // Üstten biraz boşluk bırakıyoruz
  },
  logo: {
    width: 150, // Logoyu biraz büyüttük
    height: 150,
    marginBottom: 40,
  },
  title: {
    fontSize: 32, // Başlık fontunu büyüttük
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Arial', // Font ailesi
  },
  subtitle: {
    fontSize: 22,
    color: 'white',
    marginBottom: 40,
    fontFamily: 'Arial', // Alt başlık fontu
  },
  button: {
    backgroundColor: '#FF9F1C', // Buton rengi
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 12, // Yuvarlatılmış köşeler
    alignItems: 'center',
    elevation: 5, // Hafif gölge efekti
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
