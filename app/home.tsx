import React, { useState } from 'react';
import { Alert } from 'react-native';

import {
  View, Text, FlatList, StyleSheet, Image, TouchableOpacity,
  ScrollView, TextInput, Dimensions, Animated
} from 'react-native';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;
const { width, height } = Dimensions.get('window');

const newAnimals = [
  {
    id: '1',
    name: 'Baileys',
    description: 'Malteese Terrier.',
    type: 'Dog',
    image: require('../assets/images/baileys.jpeg'),
  },
  {
    id: '2',
    name: 'Milo',
    description: 'Playful tabby cat.',
    type: 'Cat',
    image: require('../assets/images/milo.jpeg'),
  },
  {
    id: '3',
    name: 'Kiwi',
    description: 'Funny cat.',
    type: 'Bird',
    image: require('../assets/images/kiwi.jpeg'),
  },
];

const lostPets = [
  {
    id: '4',
    name: 'Max',
    description: 'Lost near Central Park, last seen in the east side.',
    phone: '555-1234',
    image: require('../assets/images/max.jpeg'),
  },
  {
    id: '5',
    name: 'Bella',
    description: 'Ran away during a storm, she is very timid.',
    phone: '555-5678',
    image: require('../assets/images/bella.jpeg'),
  },
];

export default function Home() {
  const router = useRouter();
  const [isNavVisible, setNavVisible] = useState(false);
  const translateX = useState(new Animated.Value(-300))[0];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const toggleNavBar = () => {
    setNavVisible(!isNavVisible);
    Animated.timing(translateX, {
      toValue: isNavVisible ? -300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const filteredAnimals = newAnimals.filter((animal) => {
    const matchesSearch = animal.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || animal.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleNavBar}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Petopia</Text>
      </View>

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

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search animal by name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.categoryButtons}>
          {['All', 'Dog', 'Cat', 'Bird'].map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonSelected]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={styles.categoryButtonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.title}>New Animals</Text>
        <FlatList
          data={filteredAnimals}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.cardVertical, { width: screenWidth * 0.8, marginRight: 16 }]}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardText}>{item.description}</Text>
                <TouchableOpacity style={styles.button} onPress={() => router.push(`/profiles/${item.id}`)}>
                  <Text style={styles.buttonText}>Go to profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {selectedCategory === 'All' && (
        <View style={styles.sectionContainer}>
          <Text style={styles.title}>Lost Pets</Text>
          <FlatList
  data={lostPets}
  horizontal
  showsHorizontalScrollIndicator={false}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={[styles.cardVertical, { width: screenWidth * 0.8, marginRight: 16 }]}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardText}>{item.description}</Text>
        <Text style={styles.cardText}>📞 {item.phone}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert(
              "Profile",
              `Navigate to ${item.name}'s profile?`,
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "OK",
                  onPress: () => router.push(`/profiles/${item.id}`),
                },
              ]
            );
          }}
        >
          <Text style={styles.buttonText}>Go to profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}
/>

        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f8ff' },
  sectionContainer: { marginBottom: 20, paddingTop: 20, paddingHorizontal: 16 },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0050B7', paddingVertical: 16, paddingHorizontal: 16, justifyContent: 'space-between' },
  logo: { width: 40, height: 40 },
  headerTitle: { fontSize: 18, color: 'black', textAlign: 'left', flex: 1 },
  navBar: { position: 'absolute', top: 0, left: 0, backgroundColor: '#0050B7', height: '100%', width: 250, paddingTop: 50, paddingHorizontal: 16, zIndex: 1000 },
  navButton: { marginVertical: 10, paddingVertical: 12, backgroundColor: '#FF9F1C', borderRadius: 10, alignItems: 'center' },
  navButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  searchContainer: { paddingHorizontal: 16, marginTop: 10 },
  searchInput: { backgroundColor: '#fff', borderColor: '#ccc', borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10, marginBottom: 10, fontSize: 16 },
  categoryButtons: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  categoryButton: { backgroundColor: '#e0e0e0', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  categoryButtonSelected: { backgroundColor: '#0050B7' },
  categoryButtonText: { color: '#000', fontWeight: 'bold' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2c3e50', marginBottom: 20, textAlign: 'center' },
  cardVertical: { backgroundColor: 'white', borderRadius: 18, marginBottom: 20, overflow: 'hidden', elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 5 },
  image: { width: '100%', height: 200, resizeMode: 'cover', borderTopLeftRadius: 18, borderTopRightRadius: 18 },
  cardBody: { padding: 12 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#34495e', marginBottom: 6 },
  cardText: { fontSize: 14, color: '#7f8c8d', marginBottom: 8 },
  button: { marginTop: 10, backgroundColor: '#FF9F1C', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '600', fontSize: 16 }
});
