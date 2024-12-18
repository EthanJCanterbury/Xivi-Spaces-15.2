
import { useState, useEffect } from 'react';
import { Search, Play, Pause, Heart, SkipBack, SkipForward } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function MusicPlayer() {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState<any[]>([]);
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio());
  const [likedSongs, setLikedSongs] = useState<any[]>([]);
  const [showLikedSongs, setShowLikedSongs] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLooping, setIsLooping] = useState(false);

  const searchSongs = async () => {
    if (!query.trim()) return;
    
    try {
      const response = await fetch(`/api/music/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSongs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error searching songs:', error);
      setSongs([]);
    }
  };

  const toggleLike = (song: any) => {
    if (likedSongs.some(s => s.videoId === song.videoId)) {
      setLikedSongs(likedSongs.filter(s => s.videoId !== song.videoId));
    } else {
      setLikedSongs([...likedSongs, song]);
    }
  };

  const playNext = () => {
    const playlist = showLikedSongs ? likedSongs : songs;
    const currentIndex = playlist.findIndex(s => s.videoId === currentSong?.videoId);
    if (currentIndex < playlist.length - 1) {
      playSong(playlist[currentIndex + 1]);
    }
  };

  const playPrevious = () => {
    const playlist = showLikedSongs ? likedSongs : songs;
    const currentIndex = playlist.findIndex(s => s.videoId === currentSong?.videoId);
    if (currentIndex > 0) {
      playSong(playlist[currentIndex - 1]);
    }
  };

  const playSong = async (song: any) => {
    if (currentSong?.videoId === song.videoId) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
      return;
    }

    try {
      const response = await fetch(`/api/music/stream?videoId=${song.videoId}`);
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 429) {
          alert('Too many requests. Please wait a moment before trying again.');
          return;
        }
        throw new Error(data.error || 'Failed to get stream URL');
      }
      
      audio.src = data.url;
      await audio.play();
      setCurrentSong(song);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing song:', error);
      alert('Failed to play song. Please try again in a moment.');
    }
  };

  useEffect(() => {
    const handleEnded = () => {
      if (!isLooping) {
        setIsPlaying(false);
      }
    };
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.loop = isLooping;
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
    };
  }, [audio]);

  return (
    <div className="p-4 h-full flex flex-col gap-4">
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for songs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchSongs()}
          />
          <Button onClick={searchSongs}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={!showLikedSongs && !showWelcome ? "default" : "outline"} 
            onClick={() => {setShowLikedSongs(false); setShowWelcome(false)}}
          >
            All Songs
          </Button>
          <Button 
            variant={showLikedSongs ? "default" : "outline"} 
            onClick={() => {setShowLikedSongs(true); setShowWelcome(false)}}
          >
            Liked Songs ({likedSongs.length})
          </Button>
          <Button 
            variant={showWelcome ? "default" : "outline"} 
            onClick={() => {setShowWelcome(true); setShowLikedSongs(false)}}
          >
            Welcome
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {showWelcome ? (
          <div className="p-6 text-center space-y-4">
            <h1 className="text-2xl font-bold">Welcome to Xivi Music!</h1>
            <p className="text-muted-foreground">
              Search for your favorite songs, create a collection of liked tracks, and enjoy music playback with features like:
            </p>
            <ul className="list-disc text-left ml-6 space-y-2">
              <li>Search and play music</li>
              <li>Like your favorite songs</li>
              <li>Create a playlist of liked songs</li>
              <li>Loop individual tracks</li>
              <li>Navigate between songs with previous/next controls</li>
            </ul>
          </div>
        ) : (
        {(showLikedSongs ? likedSongs : songs).map((song) => (
          <Card
            key={song.videoId}
            className="p-3 mb-2 cursor-pointer hover:bg-accent"
            onClick={() => playSong(song)}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{song.title}</div>
                <div className="text-sm text-muted-foreground">{song.artist}</div>
              </div>
              <div className="flex gap-2">
                {currentSong?.videoId === song.videoId && (
                  <div>{isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(song);
                  }}
                >
                  <Heart
                    className="h-4 w-4"
                    fill={likedSongs.some(s => s.videoId === song.videoId) ? "currentColor" : "none"}
                  />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        )}
      </div>

      {currentSong && (
        <Card className="p-3 mt-auto">
          <div className="font-medium">{currentSong.title}</div>
          <div className="text-sm text-muted-foreground">{currentSong.artist}</div>
          <div className="flex justify-center gap-4 mt-2">
            <Button variant="ghost" size="icon" onClick={playPrevious}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => playSong(currentSong)}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={playNext}>
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsLooping(!isLooping)}
              className={isLooping ? "text-primary" : ""}
            >
              🔁
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
