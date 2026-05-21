import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { generateDetailedReading } from '@/data/podomancy';
import { Sparkles, Activity, Heart, Compass, Search, Users, Info } from 'lucide-react-native';

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [reading, setReading] = useState<ReturnType<typeof generateDetailedReading> | null>(null);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  useEffect(() => {
    // Generate the random detailed reading when the screen loads
    setReading(generateDetailedReading());
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  if (!reading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Unveiling your destiny...</Text>
      </View>
    );
  }

  // Language Dictionary for static text
  const textDict = {
    en: {
      title: "Your Podomancy Reading",
      detectedTitle: "Detected Features",
      shape: "Shape",
      lines: "Lines",
      size: "Size",
      personalityTitle: "Personality & Social Life",
      futureTitle: "Future & Career",
      healthTitle: "Health & Vitality",
      relationshipTitle: "Love & Relationships",
      suggestionTitle: "Life Suggestions & Advice",
      howItWorksTitle: "How We Predict",
      howItWorksDesc: "Podomancy (foot palmistry) is an ancient astrological science. By analyzing the structural shape of your foot, the depth of the lines on your sole, and overall proportions, we tap into your cosmic energy. These features act as a mirror to your inner personality, health vitality, and future destiny.",
      doneButton: "Done",
      langToggle: "Switch to Hindi (हिंदी)"
    },
    hi: {
      title: "आपकी पोडोमेंसी (पैर की) रीडिंग",
      detectedTitle: "पाई गई विशेषताएँ",
      shape: "आकार",
      lines: "रेखाएं",
      size: "आकार (Size)",
      personalityTitle: "व्यक्तित्व और सामाजिक जीवन",
      futureTitle: "भविष्य और करियर",
      healthTitle: "स्वास्थ्य और जीवन शक्ति",
      relationshipTitle: "प्यार और रिश्ते",
      suggestionTitle: "जीवन के लिए सुझाव और सलाह",
      howItWorksTitle: "हम भविष्यवाणी कैसे करते हैं",
      howItWorksDesc: "पोडोमेंसी (पैर की हस्तरेखा) एक प्राचीन ज्योतिषीय विज्ञान है। आपके पैर के संरचनात्मक आकार, तलवे की रेखाओं की गहराई और समग्र अनुपात का विश्लेषण करके, हम आपकी ब्रह्मांडीय ऊर्जा का आकलन करते हैं। ये विशेषताएं आपके आंतरिक व्यक्तित्व, स्वास्थ्य और भविष्य के भाग्य के दर्पण के रूप में कार्य करती हैं।",
      doneButton: "पूर्ण (Done)",
      langToggle: "Switch to English"
    }
  };

  const t = textDict[language];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
          <Text style={styles.langButtonText}>{t.langToggle}</Text>
        </TouchableOpacity>
        
        <Sparkles color="#E0C097" size={40} style={{marginTop: 15}} />
        <Text style={styles.title}>{t.title}</Text>
        {params.name ? <Text style={styles.greeting}>For {params.name}</Text> : null}
      </View>

      <View style={styles.detectionCard}>
        <View style={styles.cardHeader}>
          <Search color="#1C0B2B" size={20} />
          <Text style={styles.detectionTitle}>{t.detectedTitle}</Text>
        </View>
        <Text style={styles.detectionText}>• {t.shape}: {reading.detected.shape[language]}</Text>
        <Text style={styles.detectionText}>• {t.lines}: {reading.detected.lines[language]}</Text>
        <Text style={styles.detectionText}>• {t.size}: {reading.detected.size[language]}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Users color="#E0C097" size={24} />
          <Text style={styles.cardTitle}>{t.personalityTitle}</Text>
        </View>
        <Text style={styles.cardText}>{reading.predictions.personality[language]}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Compass color="#E0C097" size={24} />
          <Text style={styles.cardTitle}>{t.futureTitle}</Text>
        </View>
        <Text style={styles.cardText}>{reading.predictions.future[language]}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Activity color="#E0C097" size={24} />
          <Text style={styles.cardTitle}>{t.healthTitle}</Text>
        </View>
        <Text style={styles.cardText}>{reading.predictions.health[language]}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Heart color="#E0C097" size={24} />
          <Text style={styles.cardTitle}>{t.relationshipTitle}</Text>
        </View>
        <Text style={styles.cardText}>{reading.predictions.relationship[language]}</Text>
      </View>

      <View style={styles.suggestionCard}>
        <View style={styles.cardHeader}>
          <Sparkles color="#E0C097" size={24} />
          <Text style={styles.suggestionCardTitle}>{t.suggestionTitle}</Text>
        </View>
        <Text style={styles.suggestionCardText}>{reading.predictions.suggestion[language]}</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.cardHeader}>
          <Info color="#1C0B2B" size={20} />
          <Text style={styles.infoTitle}>{t.howItWorksTitle}</Text>
        </View>
        <Text style={styles.infoText}>{t.howItWorksDesc}</Text>
      </View>

      <TouchableOpacity 
        style={styles.doneButton} 
        onPress={() => router.replace('/')}
      >
        <Text style={styles.doneButtonText}>{t.doneButton}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C0B2B',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1C0B2B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#E0C097',
    fontSize: 18,
    fontFamily: 'serif',
  },
  header: {
    alignItems: 'center',
    marginVertical: 10,
  },
  langButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(224, 192, 151, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0C097',
  },
  langButtonText: {
    color: '#E0C097',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E0C097',
    marginTop: 10,
    fontFamily: 'serif',
    textAlign: 'center',
  },
  greeting: {
    fontSize: 18,
    color: '#A080C0',
    marginTop: 5,
    fontStyle: 'italic',
  },
  detectionCard: {
    backgroundColor: '#E0C097',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    marginTop: 10,
    shadowColor: '#E0C097',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  detectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C0B2B',
    marginLeft: 8,
    textTransform: 'uppercase',
  },
  detectionText: {
    fontSize: 15,
    color: '#2A1540',
    marginTop: 5,
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'rgba(50, 20, 80, 0.6)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#7A4B94',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#EAEAEA',
    lineHeight: 24,
  },
  suggestionCard: {
    backgroundColor: '#150720',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1.5,
    borderColor: '#E0C097',
    shadowColor: '#E0C097',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  suggestionCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E0C097',
    marginLeft: 10,
    fontFamily: 'serif',
    letterSpacing: 1,
  },
  suggestionCardText: {
    fontSize: 16,
    color: '#D4C4E2',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  infoCard: {
    backgroundColor: 'rgba(224, 192, 151, 0.8)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C0B2B',
    marginLeft: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1C0B2B',
    marginTop: 5,
    lineHeight: 20,
  },
  doneButton: {
    backgroundColor: '#E0C097',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 15,
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C0B2B',
  },
});
