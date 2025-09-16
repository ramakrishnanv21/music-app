import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Playlist } from '../types';

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: playlist.image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>{playlist.title}</Text>
      <Text style={styles.description} numberOfLines={2}>{playlist.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    marginRight: 16,
    marginBottom: 16,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    color: '#B3B3B3',
    fontSize: 12,
  },
});

export default PlaylistCard;