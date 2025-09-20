import React, { createContext, useState, ReactNode, useEffect, useRef, useContext } from "react";
import { Audio } from "expo-av";
import { Song } from "../types";
import { songs } from "../data";
import { Platform } from "react-native";
import { songAssets } from "../contants";

// Initialize audio mode
async function setupAudio() {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    playsInSilentModeIOS: true,
    playThroughEarpieceAndroid: false,
    staysActiveInBackground: true,
    shouldDuckAndroid: true,
    // Remove duplicate playThroughEarpieceAndroid
    // Use numeric values for interruption modes for better compatibility
    interruptionModeIOS: 1, // INTERRUPTION_MODE_IOS_DO_NOT_MIX
    interruptionModeAndroid: 2, // INTERRUPTION_MODE_ANDROID_DUCK_OTHERS
  });
}

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
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCurrentSongPlayingFinished, setIsCurrentSongPlayingFinished] = useState(false);
  const [playbackInstance, setPlaybackInstance] = useState<Audio.Sound | null>(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(true);

  // Initialize audio mode on mount
  useEffect(() => {
    setupAudio();
    return () => {
      isMounted.current = false;
      if (playbackInstance) {
        playbackInstance.unloadAsync();
      }
    };
  }, []);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (playbackInstance) {
        playbackInstance.unloadAsync();
      }
    };
  }, [playbackInstance]);

  useEffect(() => {
    console.log('isCurrentSongPlayingFinished changed:', isCurrentSongPlayingFinished);
    if (isCurrentSongPlayingFinished) {
      console.log('Playing next song...');
      const playNextSong = async () => {
        try {
          await playNext();
          // Reset the flag after successfully playing the next song
          setIsCurrentSongPlayingFinished(false);
        } catch (error) {
          console.error('Error playing next song:', error);
        }
      };
      
      // Small delay to ensure state updates are processed
      const timer = setTimeout(playNextSong, 100);
      return () => clearTimeout(timer);
    }
  }, [isCurrentSongPlayingFinished]);

  const loadAndPlaySong = async (song: Song) => {
    setIsCurrentSongPlayingFinished(false);

    if (!song) return;
    
    setIsLoading(true);
    setCurrentSong(song);

    try {
      // Unload previous sound if exists
      if (playbackInstance) {
        await playbackInstance.unloadAsync();
      }

      // Determine the source based on platform
      let source;
      if (Platform.OS === "web") {
        source = { uri: `/assets/songs/Favorites/${song.url}` };
      } else {
        source = song.url && songAssets[song.url] 
          ? songAssets[song.url] 
          : songAssets["Chikku-Bukku-Rayile.mp3"];
      }

      // Create and play the new sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        source,
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      if (isMounted.current) {
        setPlaybackInstance(newSound);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error loading sound:', error);
      if (isMounted.current) {
        setIsPlaying(false);
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (!isMounted.current || isSeekingRef.current) return;
    
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      
      if (status.isPlaying !== isPlaying) {
        setIsPlaying(!!status.isPlaying);
      }
      
      if (status.didJustFinish && !status.isLooping) {
        console.log('Song finished, setting isCurrentSongPlayingFinished to true');
        setIsCurrentSongPlayingFinished(true);
      }
    }
  };

  // Track if user is currently seeking
  const isSeekingRef = useRef(false);
  const seekTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const seekTo = async (ms: number) => {
    if (!playbackInstance) return;
    
    // Update the position immediately for smooth UI feedback
    setPosition(ms);
    
    // Clear any pending seek operations
    if (seekTimeoutRef.current) {
      clearTimeout(seekTimeoutRef.current);
    }
    
    // Debounce the actual seek operation for better performance
    isSeekingRef.current = true;
    
    seekTimeoutRef.current = setTimeout(async () => {
      try {
        await playbackInstance.setPositionAsync(ms);
        // Small delay to ensure the position is updated before allowing new seeks
        setTimeout(() => {
          isSeekingRef.current = false;
        }, 100);
      } catch (error) {
        console.error('Error seeking:', error);
        isSeekingRef.current = false;
      }
    }, 100); // 100ms debounce time
  };

  const togglePlayPause = async () => {
    if (!playbackInstance) {
      if (currentSong) {
        await loadAndPlaySong(currentSong);
      } else if (songs.length > 0) {
        await loadAndPlaySong(songs[0]);
      }
      return;
    }

    try {
      if (isPlaying) {
        await playbackInstance.pauseAsync();
      } else {
        await playbackInstance.playAsync();
      }
    } catch (error) {
      console.error('Error toggling play/pause:', error);
    }
  };

  const playNext = async () => {
    console.log('playNext called, currentSong:', currentSong?.title);
    
    if (!currentSong) {
      if (songs.length > 0) {
        await loadAndPlaySong(songs[0]);
      }
      return;
    }

    const currentIndex = songs.findIndex((s: Song) => s.id === currentSong.id);
    if (currentIndex === -1) {
      console.log('Current song not found in songs list');
      return;
    }
    
    const nextIndex = (currentIndex + 1) % songs.length;
    console.log(`Playing next song at index ${nextIndex}: ${songs[nextIndex]?.title}`);
    
    if (songs[nextIndex]) {
      await loadAndPlaySong(songs[nextIndex]);
    } else {
      console.error('No next song available');
    }
  };

  const playPrevious = async () => {
    if (!currentSong) {
      if (songs.length > 0) {
        await loadAndPlaySong(songs[songs.length - 1]);
      }
      return;
    }

    const currentIndex = songs.findIndex((s: Song) => s.id === currentSong.id);
    if (currentIndex === -1) return;
    
    // If we're more than 3 seconds into the song, restart it
    if (position > 3000) {
      if (playbackInstance) {
        await playbackInstance.setPositionAsync(0);
        await playbackInstance.playAsync();
      }
      return;
    }
    
    // Otherwise, go to previous song
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    await loadAndPlaySong(songs[prevIndex]);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong: loadAndPlaySong,
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
};
