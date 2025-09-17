import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Track } from '../App';
import { usePlayer } from '../context/PlayerContext';
import { songs } from '../data/mockData';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { playSong, currentSong, isPlaying, togglePlayPause } = usePlayer();
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    setTracks(songs);
  }, []);

  function handleSongPress(track: Track) {
    const isCurrent =
      currentSong &&
      currentSong.id === track.id &&
      currentSong.title === track.title &&
      currentSong.artist === track.artist;

    if (isCurrent) {
      togglePlayPause();
    } else {
      playSong({
        id: track.id,
        title: track.title,
        artist: track.artist,
        album: '',
        duration: track.duration,
        image: track.image,
        url: track.url,
      });
      
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Discover</Text>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => handleSongPress(item)}>
            <Image source={require('../assets/cover-placeholder.png')} style={styles.cover} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.artist}>{item.artist}</Text>
            </View>
            <Text style={styles.duration}>{item.duration}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  cover: { width: 56, height: 56, borderRadius: 6, backgroundColor: '#ddd' },
  info: { flex: 1, marginLeft: 12 },
  title: { fontSize: 16, fontWeight: '600' },
  artist: { color: '#666', marginTop: 2 },
  duration: { width: 48, textAlign: 'right', color: '#666' }
});
