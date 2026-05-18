import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Dimensions, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Camera, ScanLine, Footprints, Upload, User, MapPin, Phone, Mail } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ScanScreen() {
  const router = useRouter();
  
  // Form State
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  // Scanner State
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scanAnim = useRef(new Animated.Value(0)).current;

  const handleFormSubmit = () => {
    if (!name.trim() || !mobile.trim()) {
      Alert.alert("Missing Details", "Please enter at least your Name and Mobile number to continue.");
      return;
    }
    setIsFormCompleted(true);
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("You need to allow camera access to take a photo of your foot.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("You need to allow camera roll permissions to upload an image.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const startScan = () => {
    if (!imageUri) return;
    
    setIsScanning(true);
    
    // Looping animation for scanner line
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        })
      ])
    ).start();

    // Simulate network/processing delay before navigating
    setTimeout(() => {
      Animated.timing(scanAnim).stop();
      setIsScanning(false);
      // Pass the collected details to the result screen
      router.replace({
        pathname: '/result',
        params: { name, address, mobile, email }
      });
    }, 4500);
  };

  if (!isFormCompleted) {
    return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.title}>Your Details</Text>
          <Text style={styles.subtitle}>Enter your details to receive personalized insights</Text>

          <View style={styles.inputGroup}>
            <User color="#A080C0" size={20} style={styles.inputIcon} />
            <TextInput 
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#7A4B94"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Phone color="#A080C0" size={20} style={styles.inputIcon} />
            <TextInput 
              style={styles.input}
              placeholder="Mobile Number"
              placeholderTextColor="#7A4B94"
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={setMobile}
            />
          </View>

          <View style={styles.inputGroup}>
            <Mail color="#A080C0" size={20} style={styles.inputIcon} />
            <TextInput 
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#7A4B94"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={[styles.inputGroup, styles.textAreaGroup]}>
            <MapPin color="#A080C0" size={20} style={[styles.inputIcon, {marginTop: 12}]} />
            <TextInput 
              style={[styles.input, styles.textArea]}
              placeholder="Address / Location"
              placeholderTextColor="#7A4B94"
              multiline
              numberOfLines={3}
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
            <Text style={styles.submitButtonText}>Proceed to Scan</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.skipButton} onPress={() => setIsFormCompleted(true)}>
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Foot Scanner</Text>
      <Text style={styles.subtitle}>Take a clear photo of your foot's sole</Text>

      <View style={styles.imageContainer}>
        {imageUri ? (
          <>
            <Image source={{ uri: imageUri }} style={styles.image} />
            {isScanning && (
              <Animated.View 
                style={[
                  styles.scannerLine, 
                  { 
                    transform: [{
                      translateY: scanAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 350] // Approximate height of the image container
                      })
                    }]
                  }
                ]} 
              >
                <ScanLine color="#E0C097" size={32} />
              </Animated.View>
            )}
            {isScanning && (
              <View style={styles.scanningOverlay}>
                <Text style={styles.scanningText}>Analyzing Podomancy Features...</Text>
              </View>
            )}
          </>
        ) : (
          <View style={styles.placeholder}>
            <Footprints color="#4A2B64" size={64} opacity={0.5} />
            <Text style={styles.placeholderText}>No image selected</Text>
          </View>
        )}
      </View>

      {!isScanning && !imageUri && (
        <View style={styles.initialButtonRow}>
          <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
            <Camera color="#1C0B2B" size={20} style={{marginRight: 8}} />
            <Text style={styles.actionText}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
            <Upload color="#1C0B2B" size={20} style={{marginRight: 8}} />
            <Text style={styles.actionText}>Upload Image</Text>
          </TouchableOpacity>
        </View>
      )}

      {imageUri && !isScanning && (
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={takePhoto}>
            <Text style={styles.secondaryButtonText}>Retake Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scanButton} onPress={startScan}>
            <Text style={styles.scanButtonText}>Analyze Foot</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C0B2B',
  },
  formContainer: {
    padding: 24,
    paddingTop: 60,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(50, 20, 80, 0.5)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#7A4B94',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  textAreaGroup: {
    alignItems: 'flex-start',
  },
  inputIcon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    color: '#EAEAEA',
    fontSize: 16,
    paddingVertical: 15,
  },
  textArea: {
    textAlignVertical: 'top',
    height: 100,
  },
  submitButton: {
    backgroundColor: '#E0C097',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#E0C097',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C0B2B',
  },
  skipButton: {
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#A080C0',
    textDecorationLine: 'underline',
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E0C097',
    fontFamily: 'serif',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#A080C0',
    marginBottom: 30,
    textAlign: 'center',
  },
  imageContainer: {
    width: width * 0.8,
    height: (width * 0.8) * (4/3),
    backgroundColor: '#2A1540',
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4A2B64',
    marginBottom: 30,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    alignItems: 'center',
  },
  placeholderText: {
    color: '#A080C0',
    marginTop: 10,
    fontSize: 16,
  },
  initialButtonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    gap: 15,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0C097',
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#E0C097',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  actionText: {
    color: '#1C0B2B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  secondaryButton: {
    backgroundColor: 'rgba(74, 43, 100, 0.5)',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#7A4B94',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#E0C097',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scanButton: {
    backgroundColor: '#E0C097',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#E0C097',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    justifyContent: 'center',
  },
  scanButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C0B2B',
  },
  scannerLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(224, 192, 151, 0.8)',
    shadowColor: '#E0C097',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  scanningOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(28, 11, 43, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningText: {
    color: '#E0C097',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    fontFamily: 'serif',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  }
});
