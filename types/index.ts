export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  image: string;
  url: string; // audio source url
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  image?: string;
  songs: Song[];
}

export interface Artist {
  id: string;
  name: string;
  image: string;
}