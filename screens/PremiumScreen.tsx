import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PremiumScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spotify Premium</Text>
      <Text style={styles.subtitle}>Get 3 months of Premium for free</Text>
      
      <View style={styles.features}>
        <Text style={styles.feature}>• Ad-free music listening</Text>
        <Text style={styles.feature}>• Download to listen offline</Text>
        <Text style={styles.feature}>• Premium sound quality</Text>
        <Text style={styles.feature}>• Cancel anytime</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>GET 3 MONTHS FREE</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Individual plan only. $9.99/month after. Terms and conditions apply. Open only to users who haven't already tried Premium.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 32,
    textAlign: 'center',
  },
  features: {
    marginBottom: 32,
    alignSelf: 'flex-start',
  },
  feature: {
    color: 'white',
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#1DB954',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginBottom: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    color: '#B3B3B3',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default PremiumScreen;