import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import HoroscopeCarousel from '@/components/HoroscopeCarousel';
import { Sparkles, Footprints, MessageCircle, Mail } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const handleWhatsApp = () => {
    const message = `Hello Astrologer, I would like to know more about Podomancy.`;
    const url = `whatsapp://send?phone=917003891953&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      alert("Make sure WhatsApp is installed on your device");
    });
  };

  const handleEmail = () => {
    const subject = `AstroFoot Consultation Inquiry`;
    const body = `Hello,\n\nI would like to request a detailed podomancy reading.`;
    const url = `mailto:mybusiness7795@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(url).catch(() => {
      alert("Make sure you have an email client installed");
    });
  };

  const textDict = {
    en: {
      title: "Podomancy",
      subtitle: "Unlock the secrets of your sole",
      description: "Discover what your foot shape, arches, and toe lengths say about your personality, destiny, and inner self.",
      buttonText: "Start Foot Reading",
      talkToAstrologer: "Talk to Astrologer",
      emailUs: "Email Us",
      langToggle: "हिंदी"
    },
    hi: {
      title: "पोडोमेंसी",
      subtitle: "अपने तलवों के रहस्य खोलें",
      description: "जानें कि आपके पैर का आकार, मेहराब और पैर की उंगलियों की लंबाई आपके व्यक्तित्व, भाग्य और आंतरिक स्व के बारे में क्या कहती है।",
      buttonText: "पैर की रीडिंग शुरू करें",
      talkToAstrologer: "ज्योतिषी से बात करें",
      emailUs: "हमें ईमेल करें",
      langToggle: "English"
    }
  };

  const t = textDict[language];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
          <Text style={styles.langButtonText}>{t.langToggle}</Text>
        </TouchableOpacity>

        <Image 
          source={require('../../assets/images/astrologer.png')} 
          style={styles.heroImage} 
        />
        <View style={styles.titleContainer}>
          <Footprints color="#E0C097" size={32} />
          <Text style={styles.title}>{t.title}</Text>
        </View>
        <Text style={styles.subtitle}>{t.subtitle}</Text>
      </View>

      <View style={styles.actionContainer}>
        <Text style={styles.description}>{t.description}</Text>
        <TouchableOpacity style={styles.scanButton} onPress={() => router.push('/scan')} activeOpacity={0.8}>
          <Sparkles color="#1C0B2B" size={24} style={styles.buttonIcon} />
          <Text style={styles.scanButtonText}>{t.buttonText}</Text>
        </TouchableOpacity>
      </View>

      <HoroscopeCarousel />

      <View style={styles.contactContainer}>
        <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
          <MessageCircle color="#FFFFFF" size={20} style={{marginRight: 8}} />
          <Text style={styles.whatsappText}>{t.talkToAstrologer}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.emailButton} onPress={handleEmail}>
          <Mail color="#E0C097" size={20} style={{marginRight: 8}} />
          <Text style={styles.emailText}>{t.emailUs}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C0B2B',
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  langButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(224, 192, 151, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0C097',
    marginBottom: 15,
  },
  langButtonText: {
    color: '#E0C097',
    fontSize: 14,
    fontWeight: 'bold',
  },
  heroImage: {
    width: width * 0.9,
    height: width * 0.6,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#7A4B94',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E0C097',
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 16,
    color: '#A080C0',
    marginTop: 5,
    fontStyle: 'italic',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 15,
    marginTop: 10,
  },
  whatsappButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#25D366',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsappText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emailButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E0C097',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailText: {
    color: '#E0C097',
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    color: '#EAEAEA',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  scanButton: {
    flexDirection: 'row',
    backgroundColor: '#E0C097',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#E0C097',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonIcon: {
    marginRight: 10,
  },
  scanButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C0B2B',
  },
});
