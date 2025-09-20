'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Song {
    id: string;
    image: string;
    artist: string;
    name: string;
    like: number;
}

interface SongListResponse {
    songs: Song[];
}

export default function CSRPage() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/songs');

                if (!response.ok) {
                    const errorData = await response.json();

                    throw new Error(`HTTP ${response.status}: ${errorData.details || errorData.error || 'Unknown error'}`);
                }

                const data: SongListResponse = await response.json();
                setSongs(data.songs);
            } catch (error) {
                console.error('Error fetching songs:', error);
                const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
                setError(`노래 목록을 불러오는 중 오류가 발생했습니다: ${errorMessage}`);
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, []);

    const refreshSongs = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/songs');

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP ${response.status}: ${errorData.details || errorData.error || 'Unknown error'}`);
            }

            const data: SongListResponse = await response.json();
            setSongs(data.songs);
        } catch (error) {
            console.error('Error refreshing songs:', error);
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
            setError(`새로고침 중 오류가 발생했습니다: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Song List (CSR)
            </h1>

            <div className="mb-6 text-center">
                <button
                    onClick={refreshSongs}
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                    {loading ? 'ロード中．．．' : 'リロード'}
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="ml-2">ロード中．．．</span>
                </div>
            ) : error ? (
                <div className="text-center text-red-500">
                    <p>{error}</p>
                </div>
            ) : songs.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p>曲情報がありません．</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {songs.map((song) => (
                        <div
                            key={song.id}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                        >
                            <a href="">
                                <img src={song.image} alt={song.name} className="w-auto h-48 object-cover mb-2 rounded" />
                            </a>
                            <h3 className="font-semibold text-lg text-gray-800">
                                {song.name}
                            </h3>
                            <p className="text-gray-600">{song.artist}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-8 text-center space-x-4">
                <Link
                    href="/ssr"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    SSR バージョンを見る
                </Link>

            </div>
        </div>
    );
}