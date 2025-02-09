import { useState, useEffect } from "react";

interface Song {
  title: string;
  artists: string;
}

interface UseDeepSleepSongsResult {
  songs: Song[];
  isLoading: boolean;
  error: string | null;
}

const useDeepSleepSongs = (): UseDeepSleepSongsResult => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token =
      "BQCTFwGn6RiJ6TCc7kNsTcrFKq6D2YCe2nlzLzy2qySptDciU0afwI5BBczbeULOpbHcXdXLKPrrU4r7UatUWi2EX7kvB4MaNOLgtpq2ptzwrVbk6J-9QK7M0HO9eCUFijXTbM_eI_3j5yyOROaySNXTDJ87lWUCh5XtTUaiRSwdUVI2NjdgT2zS_bkATy8PFx9N1S5HT2f-FrWXeKZebAiLJClMHju07oHqs4clQQTI59GbE-C-6aa6a-E3eCuz5KFCx-BqkM69qzBcYoNxkw5alM50_l-MULZM68PeOzzais09K4pAmbP8UFZv";

    const fetchWebApi = async (endpoint, method) => {
      try {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method,
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        return await res.json();
      } catch (error) {
        throw new Error(`Spotify API request failed: ${error.message}`);
      }
    };

    const fetchSleepSongs = async () => {
      try {
        const data = await fetchWebApi(
          "v1/search?q=deep%20sleeping&type=track&limit=5&market=US",
          "GET"
        );

        const tracks =
          data.tracks?.items?.map(({ name, artists }) => ({
            title: name,
            artists: artists.map((artist) => artist.name).join(", "),
          })) || [];

        setSongs(tracks);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSleepSongs();
  }, []);

  return { songs, isLoading, error };
};

export default useDeepSleepSongs;
