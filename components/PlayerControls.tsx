// Helper to format ms to mm:ss
function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { usePlayer } from '../context/PlayerContext';
import Slider from '@react-native-community/slider';

interface PlayerControlsProps {
  isExpanded?: boolean;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({ isExpanded = false }) => {
  const { currentSong, isPlaying, togglePlayPause, playNext, playPrevious, position, duration, seekTo } = usePlayer();

  if (!currentSong) {
    return null;
  }

  return (
    <View style={styles.container}>
      {isExpanded && (
        <>
          <View style={styles.progressContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration || 1}
              value={position}
              onSlidingComplete={seekTo}
              minimumTrackTintColor="#1DB954"
              maximumTrackTintColor="#535353"
              thumbTintColor="#1DB954"
            />
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(position)}</Text>
              <Text style={styles.timeText}>-{formatTime((duration || 0) - position)}</Text>
            </View>
          </View>

          <View style={styles.songInfoExpanded}>
            <Text style={styles.titleExpanded} numberOfLines={1}>{currentSong.title}</Text>
            <Text style={styles.artistExpanded} numberOfLines={1}>{currentSong.artist}</Text>
          </View>
        </>
      )}

      <View style={styles.controlsRow}>
        <TouchableOpacity onPress={playPrevious} style={styles.controlButton}>
          <Icon name="play-skip-back" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
          <Icon 
            name={isPlaying ? 'pause' : 'play'} 
            size={32} 
            color="black" 
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={playNext} style={styles.controlButton}>
          <Icon name="play-skip-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {isExpanded && (
        <View style={styles.additionalControls}>
          <TouchableOpacity style={styles.additionalButton}>
            <Icon name="repeat" size={24} color="#B3B3B3" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.additionalButton}>
            <Icon name="shuffle" size={24} color="#B3B3B3" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.additionalButton}>
            <Icon name="heart-outline" size={24} color="#B3B3B3" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.additionalButton}>
            <Icon name="list" size={24} color="#B3B3B3" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#181818',
  },
  progressContainer: {
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  timeText: {
    color: '#B3B3B3',
    fontSize: 12,
  },
  songInfoExpanded: {
    alignItems: 'center',
    marginBottom: 30,
  },
  titleExpanded: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  artistExpanded: {
    color: '#B3B3B3',
    fontSize: 18,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  controlButton: {
    padding: 16,
  },
  playButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 16,
    marginHorizontal: 20,
  },
  additionalControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  additionalButton: {
    padding: 12,
  },
});

export default PlayerControls;