import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function AddPetScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSavePet = async () => {
    if (!name || !type || !description || !imageUri) {
      Alert.alert('Missing Fields', 'Please fill in all fields and select a picture.');
      return;
    }

    try {
      const response = await fetch('http://172.20.10.4:5000/api/pets/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, type, description, imageUri }),
      });

      const text = await response.text();

      try {
        const data = JSON.parse(text);
        if (response.ok) {
          // Bildirimi veritabanına gönder
          await fetch('http://172.20.10.4:5000/api/notifications/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: 'New Pet Added 🐶',
              body: `A new pet named "${name}" has been added to the list.`,
            }),
          });

          Alert.alert('Success', `Pet "${name}" has been added!`);
          router.push('/profile');
        } else {
          Alert.alert('Error', data.error || 'Something went wrong');
        }
      } catch (e) {
        console.error('Non-JSON response:', text);
        Alert.alert('Error', 'Server returned an invalid response.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to connect to server');
    }
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
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/home')}>
          <Text style={styles.navButtonText}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Blue background section */}
      <View style={[styles.blueBackground, { height: height * 0.45 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.welcomeText}>Add a New Pet</Text>
        <Text style={styles.subText}>Please fill in the information below.</Text>
        <Image
          source={require('../assets/images/logo6.png')}
          style={styles.image}
          resizeMode="contain"
        />\
      </View>

      {/* White Form Section */}
      <View style={styles.formSection}>
        <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
          <Text style={styles.pickImageText}>Pick a Pet Picture</Text>
        </TouchableOpacity>

        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        )}

        <TextInput
          placeholder="Pet Name"
          placeholderTextColor="#444"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Type (Dog, Cat, Bird)"
          placeholderTextColor="#444"
          style={styles.input}
          value={type}
          onChangeText={setType}
        />
        <TextInput
          placeholder="Short Description"
          placeholderTextColor="#444"
          style={[styles.input, { height: 100 }]}
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleSavePet}>
          <Text style={styles.buttonText}>Save Pet</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f8ff' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1f56c3', paddingVertical: 16, paddingHorizontal: 16, justifyContent: 'space-between' },
  logo: { width: 40, height: 40 },
  headerTitle: { fontSize: 18, color: 'black', textAlign: 'left', flex: 1, marginLeft: 12, fontWeight: 'bold' },
  navBar: { position: 'absolute', top: 0, left: 0, backgroundColor: '#0050B7', height: height, width: 250, paddingTop: 50, paddingHorizontal: 16, zIndex: 1000 },
  navButton: { marginVertical: 10, paddingVertical: 12, backgroundColor: '#FF9F1C', borderRadius: 10, alignItems: 'center' },
  navButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  blueBackground: { backgroundColor: '#1f56c3', paddingTop: 20, paddingHorizontal: 24, alignItems: 'center' },
  welcomeText: { fontSize: 30, color: '#fff', fontWeight: 'bold', marginTop: 40, textAlign: 'center' },
  subText: { fontSize: 16, color: '#fff', marginTop: 20, textAlign: 'center' },
  image: { width: '80%', height: 250, alignSelf: 'center' },
  formSection: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30, padding: 24, alignItems: 'center' },
  input: { width: '100%', borderWidth: 1, borderColor: '#1f56c3', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16, marginBottom: 16, fontSize: 16 },
  button: { backgroundColor: '#1f56c3', paddingVertical: 14, borderRadius: 12, alignItems: 'center', width: '100%' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  pickImageButton: { backgroundColor: '#FF9F1C', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, marginBottom: 16 },
  pickImageText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  previewImage: { width: 200, height: 200, borderRadius: 20, marginBottom: 16 },
  backButton: { position: 'absolute', top: 10, left: 0 },
  backArrow: { fontSize: 26, color: '#FFC107', fontWeight: 'bold', marginLeft: 20 },
});
