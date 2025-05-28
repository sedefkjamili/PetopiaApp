import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

const lostPetsData = [
  {
    id: '1',
    name: 'Max',
    description: 'Lost near Central Park, last seen in the east side.',
    phone: '555-1234',
    image: 'https://placekitten.com/203/203',
  },
  {
    id: '2',
    name: 'Bella',
    description: 'Ran away during a storm, she is very timid.',
    phone: '555-5678',
    image: 'https://placekitten.com/204/204',
  },
  {
    id: '3',
    name: 'Charlie',
    description: 'Missing since yesterday near the river. Loves to play.',
    phone: '555-7890',
    image: 'https://placekitten.com/205/205',
  },
];

export default function LostPetsPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Lost Pets</Text>

      <FlatList
        data={lostPetsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardText}>{item.description}</Text>
              <Text style={styles.cardText}>📞 {item.phone}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => alert(`Contacting ${item.name}`)}
              >
                <Text style={styles.buttonText}>Contact Owner</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#f7f7f7', // Light grey background
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
    paddingVertical: 10,
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 18,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#34495e',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  button: {
    marginTop: 12,
    backgroundColor: '#ff6b81',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#ff6b81',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
