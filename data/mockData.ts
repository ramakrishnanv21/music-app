import { Artist, Playlist, Song } from "../types";

export const recentPlaylists: Playlist[] = [
  {
    id: '1',
    title: 'Today\'s Top Hits',
    description: 'Taylor Swift is on top of the Hottest 50!',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    songs: [],
  },
  {
    id: '2',
    title: 'RapCaviar',
    description: 'New music from Drake, Kendrick and more',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
    songs: [],
  },
  {
    id: '3',
    title: 'All Out 80s',
    description: 'The biggest hits of the 1980s.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    songs: [],
  },
];

export const madeForYou: Playlist[] = [
  {
    id: '4',
    title: 'Daily Mix 1',
    description: 'Made for you based on your listening habits',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    songs: [],
  },
  {
    id: '5',
    title: 'Discover Weekly',
    description: 'Your weekly mixtape of fresh music',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    songs: [],
  },
  {
    id: '6',
    title: 'Release Radar',
    description: 'Catch all the latest music from artists you follow',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
    songs: [],
  },
];

export const popularArtists: Artist[] = [
  {
    id: '7',
    name: 'Taylor Swift',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
  },
  {
    id: '8',
    name: 'Drake',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
  },
  {
    id: '9',
    name: 'The Weeknd',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
  },
];

export const songs: Song[] = [
  {
    id: '10',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '11',
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:35',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '12',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: '3:23',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];