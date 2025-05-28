import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const diseasesData = [
  { id: '1', type: 'Dog', name: 'Parvovirus', description: 'A contagious virus mainly affecting dogs.' },
  { id: '2', type: 'Dog', name: 'Rabies', description: 'Deadly virus transmitted through saliva.' },
  { id: '3', type: 'Cat', name: 'Feline Leukemia', description: 'A viral infection affecting cats.' },
  { id: '4', type: 'Cat', name: 'Feline Immunodeficiency Virus', description: 'Weakens cat’s immune system.' },
  { id: '5', type: 'Bird', name: 'Psittacosis', description: 'Bacterial infection common in birds.' },
  { id: '6', type: 'Bird', name: 'Avian Flu', description: 'Contagious viral infection in birds.' },
];

export default function DiseasesScreen() {
  const router = useRouter();
  const [isNavVisible, setNavVisible] = useState(false);
  const translateX = useState(new Animated.Value(-300))[0];
  const [selectedType, setSelectedType] = useState('All');

  const toggleNavBar = () => {
    setNavVisible(!isNavVisible);
    Animated.timing(translateX, {
      toValue: isNavVisible ? -300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const filteredDiseases = selectedType === 'All'
    ? diseasesData
    : diseasesData.filter(disease => disease.type === selectedType);

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
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/home')}>
          <Text style={styles.navButtonText}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Blue background section */}
      <View style={[styles.blueBackground, { height: height * 0.45 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.welcomeText}>Animal Diseases</Text>
        <Text style={styles.subText}>Select an animal type to view common diseases.</Text>
        <Image
          source={require('../assets/images/logo5.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* White Form Section */}
      <View style={styles.formSection}>
        {/* Kategori Butonları */}
        <View style={styles.buttonContainer}>
          {['All', 'Dog', 'Cat', 'Bird'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.filterButton, selectedType === type && styles.filterButtonSelected]}
              onPress={() => setSelectedType(type)}
            >
              <Text style={styles.filterButtonText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Hastalık Listesi */}
        <FlatList
          data={filteredDiseases}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.diseaseName}>🐾 {item.name}</Text>
              <Text style={styles.diseaseDesc}>{item.description}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f8ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f56c3',
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
  subText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    width: '80%',
    height: 250,
    alignSelf: 'center',
  },
  formSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 24,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  filterButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 5,
  },
  filterButtonSelected: {
    backgroundColor: '#0050B7',
  },
  filterButtonText: {
    color: '#000',
    fontWeight: 'bold',
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
  diseaseName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#34495e',
  },
  diseaseDesc: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 0,
  },
  backArrow: {
    fontSize: 26,
    color: '#FFC107',
    fontWeight: 'bold',
    marginLeft: 20,
  },
});
