import { Metadata } from 'next';
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

export const metadata: Metadata = {
    title: 'Song List - SSR',
    description: 'Server-side rendered song list',
};


async function getSongs(): Promise<Song[]> {
    try {
        const res = await fetch('http://localhost:8080/list', {
            cache: 'no-store', //常に最新データを取得するためにキャッシュを無効化
        });

        if (!res.ok) {
            throw new Error('Failed to fetch songs');
        }

        const data: SongListResponse = await res.json();
        return data.songs;
    } catch (error) {
        console.error('Error fetching songs:', error);
        return [];
    }
}

export default async function SSRPage() {
    const songs = await getSongs();

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Song List (SSR)
            </h1>

            {songs.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p>曲情報がありません．</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {songs.map((song) => (
                        <div
                            key={song.id}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <a href="">
                                <img src={song.image} alt={song.name}
                                    className="w-auto h-auto rounded-lg mb-2" />
                            </a>
                            <h3 className="font-semibold text-lg text-gray-800">
                                {song.name}
                            </h3>
                            <p className="font-semibold text-lg text-gray-800">
                                {song.artist}
                            </p>
                            <p className="text-gray-600">{song.artist}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-8 text-center space-x-4">
                <Link
                    href="/csr"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                    CSR バージョンを見る
                </Link>
            </div>
        </div>
    );
}