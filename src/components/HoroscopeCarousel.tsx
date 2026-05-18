import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { dailyHoroscope } from '../data/podomancy';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

export default function HoroscopeCarousel() {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % dailyHoroscope.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const getItemLayout = (_: any, index: number) => ({
    length: CARD_WIDTH + 20,
    offset: (CARD_WIDTH + 20) * index,
    index,
  });

  const todayDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const renderItem = ({ item }: { item: typeof dailyHoroscope[0] }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.symbol}>{item.symbol}</Text>
        <Text style={styles.sign}>{item.sign}</Text>
      </View>
      <Text style={styles.date}>{todayDate}</Text>
      <Text style={styles.horoscope}>{item.horoscope}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Horoscope</Text>
      <FlatList
        ref={flatListRef}
        data={dailyHoroscope}
        renderItem={renderItem}
        keyExtractor={(item) => item.sign}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20} // CARD_WIDTH + margin
        decelerationRate="fast"
        contentContainerStyle={styles.listContainer}
        getItemLayout={getItemLayout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E0C097', // Mystical gold
    marginLeft: 20,
    marginBottom: 10,
    fontFamily: 'serif',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: 'rgba(50, 20, 80, 0.6)', // Deep purple with opacity
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#7A4B94',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  symbol: {
    fontSize: 24,
    color: '#E0C097',
    marginRight: 10,
  },
  sign: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  date: {
    fontSize: 14,
    color: '#A080C0',
    marginBottom: 10,
  },
  horoscope: {
    fontSize: 16,
    color: '#EAEAEA',
    lineHeight: 22,
  },
});
