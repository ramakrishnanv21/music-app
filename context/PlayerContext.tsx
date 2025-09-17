import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Audio } from "expo-av";
import { Song } from "../types";
import { songs } from "../data/mockData";
import { Platform } from "react-native";
import { songAssets } from "../contants";

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
  const [isCurrentSongPlayingFinished, setisCurrentSongPlayingFinished] =
    useState(false);
  const [playbackInstance, setPlaybackInstance] = useState<Audio.Sound | null>(
    null
  );
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

  useEffect(() => {
    if (isCurrentSongPlayingFinished) {
      setTimeout(() => {
        playNext();
      }, 300);
    }
  }, [isCurrentSongPlayingFinished]);

  const playSong = async (song: Song) => {
    setisCurrentSongPlayingFinished(false);
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      setPlaybackInstance(null);
    }
    let selectedSong = song;
    if (selectedSong) {
      setCurrentSong(selectedSong);
    }

    let source;
    if (Platform.OS === "web") {
      // Use remote URL for web
      source = { uri: `/assets/songs/Favorites/${selectedSong.url}` };
    } else {
      // Use require for native
      source =
        selectedSong.url && songAssets[selectedSong.url]
          ? songAssets[selectedSong.url]
          : songAssets["Chikku-Bukku-Rayile.mp3"];
    }

    const { sound } = await Audio.Sound.createAsync(
      source,
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
      // Only play next if not looping and song finished naturally
      if (status.didJustFinish && !status.isLooping) {
        setisCurrentSongPlayingFinished(true);
      }
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
    console.log("Playing next song...", currentSong);
    if (!currentSong) return;
    const idx = songs.findIndex((s: Song) => s.id === currentSong.id);
    if (idx === -1) return;
    if (idx < songs.length - 1) {
      playSong(songs[idx + 1]);
    } else {
      setIsPlaying(false); // Stop playback at the end
      setCurrentSong(null); // Clear currentSong when finished
    }
  };

  const playPrevious = () => {
    if (!currentSong) return;
    const idx = songs.findIndex((s: Song) => s.id === currentSong.id);
    if (idx === -1) return;
    const prevIdx = (idx - 1 + songs.length) % songs.length;
    playSong(songs[prevIdx]);
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
};
