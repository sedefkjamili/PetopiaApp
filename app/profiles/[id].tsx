import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

const allAnimals = [
  {
    id: '1',
    name: 'Baileys',
    description: 'Malteese Terrier.',
    age: '7 years',
    gender: 'Male',
    weight: '5 kg',
    needs: 'Regular exercise, needs a large yard to run.',
    phone: '555-1234',
    image: require('../../assets/images/baileys.jpeg'),
  },
  {
    id: '2',
    name: 'Milo',
    description: 'Playful tabby cat.',
    age: '1 year',
    gender: 'Male',
    weight: '4 kg',
    needs: 'Loves to play, needs daily affection.',
    phone: '555-5678',
    image: require('../../assets/images/milo.jpeg'),
  },
  {
    id: '3',
    name: 'Kiwi',
    description: 'Colorful parrot.',
    age: '6 months',
    gender: 'Unknown',
    weight: '0.3 kg',
    needs: 'Loves fruit, needs attention.',
    phone: '555-6789',
    image: require('../../assets/images/kiwi.jpeg'),
  },
];

export default function ProfilePage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const animal = allAnimals.find((item) => item.id === id);

  if (!animal) {
    return (
      <View style={styles.screen}>
        <Text style={styles.name}>Animal not found 🐾</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Üst Mavi Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Cat</Text>
        <View style={{ width: 24 }} /> {/* Sağ boşluk için boş view */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Hayvan Kartı */}
        <View style={styles.card}>
          <Image source={animal.image} style={styles.image} />

          <View style={styles.infoContainer}>
            <Text style={styles.name}>{animal.name}</Text>
            <Text style={styles.location}>📍 123 Anywhere St., Any City</Text>

            <View style={styles.detailsRow}>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Gender</Text>
                <Text style={styles.detailValue}>{animal.gender}</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Age</Text>
                <Text style={styles.detailValue}>{animal.age}</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Weight</Text>
                <Text style={styles.detailValue}>{animal.weight}</Text>
              </View>
            </View>

            {/* Sahip Bilgisi */}
            <View style={styles.ownerSection}>
              <Image source={require('../../assets/images/logo7.png')} style={styles.ownerImage} />
              <View style={styles.ownerText}>
                <Text style={styles.ownerName}>Marceline</Text>
                <Text style={styles.ownerRole}>Pet owner</Text>
              </View>
            </View>

            {/* Ek Açıklama */}
            <Text style={styles.description}>
              {animal.needs}
            </Text>
          </View>
        </View>

        {/* Adopt Me Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            alert(`📞 Contact this number: ${animal.phone}`);
          }}
        >
          <Text style={styles.buttonText}>Adopt me</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f1f8ff' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f56c3',
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  backArrow: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  topBarTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 16,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    width: '100%',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    marginBottom: 16,
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  detailBox: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f56c3',
  },
  ownerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ownerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  ownerText: {
    justifyContent: 'center',
  },
  ownerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
  },
  ownerRole: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#1f56c3',
    paddingVertical: 14,
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
