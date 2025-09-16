import React, { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Song } from '../types';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrevious: () => void;
  playbackInstance: Audio.Sound | null;
  position: number;
  duration: number;
  seekTo: (ms: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
// ...existing code...
return context;
// ...existing code...
}

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackInstance, setPlaybackInstance] = useState<Audio.Sound | null>(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (playbackInstance) {
        playbackInstance.unloadAsync();
      }
    };
  }, [playbackInstance]);

  const playSong = async (song: Song) => {
    // Stop previous audio
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      setPlaybackInstance(null);
    }
    setCurrentSong(song);
    const { sound } = await Audio.Sound.createAsync(
      { uri: song.url },
      { shouldPlay: true },
      onPlaybackStatusUpdate
    );
    setPlaybackInstance(sound);
    setIsPlaying(true);
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);
    }
  };
  const seekTo = async (ms: number) => {
    if (playbackInstance) {
      await playbackInstance.setPositionAsync(ms);
    }
  };

  const togglePlayPause = async () => {
    if (!playbackInstance) return;
    if (isPlaying) {
      await playbackInstance.pauseAsync();
      setIsPlaying(false);
    } else {
      await playbackInstance.playAsync();
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    // Implement next song logic
    console.log('Playing next song');
  };

  const playPrevious = () => {
    // Implement previous song logic
    console.log('Playing previous song');
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        togglePlayPause,
        playNext,
        playPrevious,
        playbackInstance,
        position,
        duration,
        seekTo,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}