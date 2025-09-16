import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { usePlayer } from '../context/PlayerContext';
import Icon from '@expo/vector-icons/Ionicons';
import PlayerControls from './PlayerControls';

const MiniPlayer: React.FC = () => {
  const { currentSong, isPlaying, togglePlayPause, playNext } = usePlayer();
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);

  if (!currentSong) {
    return null;
  }

  return (
    <>
      <TouchableOpacity 
        style={styles.container}
        onPress={() => setIsPlayerExpanded(true)}
      >
        <Image source={{ uri: currentSong.image }} style={styles.image} />
        <View style={styles.songInfo}>
          <Text style={styles.title} numberOfLines={1}>{currentSong.title}</Text>
          <Text style={styles.artist} numberOfLines={1}>{currentSong.artist}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity onPress={togglePlayPause}>
            <Icon 
              name={isPlaying ? 'pause' : 'play'} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={playNext}>
            <Icon name="play-skip-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Modal
        visible={isPlayerExpanded}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setIsPlayerExpanded(false)}
      >
        <View style={styles.fullPlayerContainer}>
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => setIsPlayerExpanded(false)}
              style={styles.closeButton}
            >
              <Icon name="chevron-down" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.playerTitle}>Now Playing</Text>
            <TouchableOpacity style={styles.menuButton}>
              <Icon name="ellipsis-horizontal" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.albumArtContainer}>
            <Image 
              source={{ uri: currentSong.image }} 
              style={styles.albumArt} 
            />
          </View>

          <PlayerControls isExpanded={true} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#181818',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#282828',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  songInfo: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  artist: {
    color: '#B3B3B3',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  fullPlayerContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
  },
  closeButton: {
    padding: 8,
  },
  playerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 8,
  },
  albumArtContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  albumArt: {
    width: 300,
    height: 300,
    borderRadius: 8,
  },
});

export default MiniPlayer;