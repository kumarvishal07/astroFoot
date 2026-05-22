import HoroscopeCarousel from '@/components/HoroscopeCarousel';
import { useRouter } from 'expo-router';
import { Footprints, Mail, MessageCircle, Sparkles } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, ImageBackground, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    const subject = `AstroSole Consultation Inquiry`;
    const body = `Hello,\n\nI would like to request a detailed podomancy reading.`;
    const url = `mailto:mybusiness7795@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(url).catch(() => {
      alert("Make sure you have an email client installed");
    });
  };

  const textDict = {
    en: {
      title: "AstroSole",
      subtitle: "Unlock the secrets of your sole",
      description: "Scan your foot to discover your personality, destiny, and inner self.",
      buttonText: "Start Foot Reading",
      talkToAstrologer: "Talk to Astrologer",
      emailUs: "Email Us",
      langToggle: "हिन्दी"
    },
    hi: {
      title: "एस्ट्रोसोल",
      subtitle: "अपने तलवों के रहस्य खोलें",
      description: "अपने व्यक्तित्व, भाग्य और आंतरिक स्व को जानने के लिए अपने पैर को स्कैन करें।",
      buttonText: "पैर की रीडिंग शुरू करें",
      talkToAstrologer: "ज्योतिषी से बात करें",
      emailUs: "हमें ईमेल करें",
      langToggle: "English"
    }
  };

  const t = textDict[language];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Half: Palm Reading Image Background with Overlay */}
      <View style={styles.topHalf}>
        <ImageBackground
          source={require('../../assets/images/astrologer.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          {/* Dark Overlay for readability */}
          <View style={styles.overlay}>
            {/* Header row inside overlay */}
            <View style={styles.headerTop}>
              <View style={styles.titleContainer}>
                <Footprints color="#E0C097" size={24} style={styles.titleIcon} />
                <Text style={styles.title}>{t.title}</Text>
              </View>
              <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
                <Text style={styles.langButtonText}>{t.langToggle}</Text>
              </TouchableOpacity>
            </View>

            {/* Middle description plate */}
            <View style={styles.headerMiddle}>
              <Text style={styles.subtitle}>{t.subtitle}</Text>
              <Text style={styles.description}>{t.description}</Text>
            </View>

            {/* Bottom spacer inside overlay to balance space */}
            <View style={{ height: 10 }} />
          </View>
        </ImageBackground>
      </View>

      {/* Bottom Half: Carousel & Contact */}
      <View style={styles.bottomHalf}>
        {/* Start Foot Reading Button */}
        <View style={styles.ctaWrapper}>
          <TouchableOpacity style={styles.scanButton} onPress={() => router.push('/scan')} activeOpacity={0.8}>
            <Sparkles color="#1C0B2B" size={20} style={styles.buttonIcon} />
            <Text style={styles.scanButtonText}>{t.buttonText}</Text>
          </TouchableOpacity>
        </View>

        {/* Horoscope Carousel */}
        <View style={styles.carouselWrapper}>
          <HoroscopeCarousel />
        </View>

        {/* Contact/Support Buttons */}
        <View style={styles.contactContainer}>
          <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
            <MessageCircle color="#FFFFFF" size={18} style={{ marginRight: 6 }} />
            <Text style={styles.whatsappText}>{t.talkToAstrologer}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.emailButton} onPress={handleEmail}>
            <Mail color="#E0C097" size={18} style={{ marginRight: 6 }} />
            <Text style={styles.emailText}>{t.emailUs}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C0B2B',
  },
  topHalf: {
    flex: 1.15,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(28, 11, 43, 0.45)',
    padding: 16,
    justifyContent: 'space-between',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  titleIcon: {
    marginTop: -2,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E0C097',
    fontFamily: 'serif',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  langButton: {
    backgroundColor: 'rgba(28, 11, 43, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0C097',
  },
  langButtonText: {
    color: '#E0C097',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerMiddle: {
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(28, 11, 43, 0.25)',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(224, 192, 151, 0.1)',
  },
  subtitle: {
    fontSize: 14,
    color: '#E0C097',
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#EAEAEA',
    textAlign: 'center',
    lineHeight: 16,
  },
  ctaWrapper: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    marginTop: 4,
  },
  scanButton: {
    flexDirection: 'row',
    backgroundColor: '#E0C097',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#E0C097',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    width: '100%',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 6,
  },
  scanButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1C0B2B',
  },
  bottomHalf: {
    flex: 0.85,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    paddingBottom: 16,
    paddingTop: 8,
  },
  carouselWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  whatsappButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#25D366',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsappText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emailButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E0C097',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailText: {
    color: '#E0C097',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
