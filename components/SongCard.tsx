import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { Song } from '../types';

interface SongCardProps {
  song: Song;
  onPress: () => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: song.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{song.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{song.artist}</Text>
      </View>
      <Text style={styles.duration}>{song.duration}</Text>
      <TouchableOpacity>
        <Icon name="ellipsis-horizontal" size={20} color="#B3B3B3" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  artist: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  duration: {
    color: '#B3B3B3',
    marginHorizontal: 16,
  },
});

export default SongCard;