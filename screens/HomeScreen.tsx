import React from 'react';
import { View, Text, ScrollView, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { recentPlaylists, madeForYou, popularArtists, songs } from '../data/mockData';
import PlaylistCard from '../components/PlaylistCard';
import SongCard from '../components/SongCard';
import { usePlayer } from '../context/PlayerContext';

const HomeScreen: React.FC = () => {
  const { playSong } = usePlayer();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Recently played</Text>
        <FlatList
          data={recentPlaylists}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PlaylistCard playlist={item} />}
          contentContainerStyle={styles.listContent}
        />

        <Text style={styles.sectionTitle}>Made for you</Text>
        <FlatList
          data={madeForYou}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PlaylistCard playlist={item} />}
          contentContainerStyle={styles.listContent}
        />

        <Text style={styles.sectionTitle}>Popular artists</Text>
        <FlatList
          data={popularArtists}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.artistCard}>
              <Image source={{ uri: item.image }} style={styles.artistImage} />
              <Text style={styles.artistName}>{item.name}</Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />

        <Text style={styles.sectionTitle}>Recently played songs</Text>
        {songs.map((song) => (
          <SongCard 
            key={song.id} 
            song={song} 
            onPress={() => playSong(song)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
    marginLeft: 8,
  },
  listContent: {
    paddingHorizontal: 8,
  },
  artistCard: {
    marginRight: 16,
    alignItems: 'center',
  },
  artistImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
  },
  artistName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HomeScreen;