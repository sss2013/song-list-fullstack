import { NextResponse } from 'next/server';

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

export async function GET() {
    try {
        console.log('API 라우트: /api/songs 호출됨');

        const response = await fetch('http://localhost:8080/list', {
            cache: 'no-store',
        });

        console.log('백엔드 응답 상태:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('백엔드 에러 응답:', errorText);

            // サーバーが作動してない時に見せるダミーデータ
            if (response.status === 0 || !response.status) {
                console.log('백엔드 서버 연결 실패 - 임시 데이터 반환');
                return NextResponse.json({
                    songs: [
                        { id: '1', artist: '테스트 아티스트 1', name: '테스트 곡 1', image: '', like: 0 },
                        { id: '2', artist: '테스트 아티스트 2', name: '테스트 곡 2', image: '', like: 0 },
                    ]
                });
            }

            throw new Error(`Backend returned ${response.status}: ${errorText}`);
        }

        const data: SongListResponse = await response.json();
        console.log('받은 데이터:', data);

        return NextResponse.json(data);
    } catch (error) {
        console.error('API Error:', error);

        // ネットワークエラーの場合、ダミーデータを返す
        if (error instanceof TypeError && error.message.includes('fetch')) {
            console.log('ネットワークエラーを検出 - ダミーデータを返します');
            return NextResponse.json({
                songs: [
                    { id: '1', artist: '임시 아티스트 1', name: '임시 곡 1', image: '', like: 0 },
                    { id: '2', artist: '임시 아티스트 2', name: '임시 곡 2', image: '', like: 0 },
                ]
            });
        }

        return NextResponse.json(
            {
                error: 'Failed to fetch songs',
                details: error instanceof Error ? error.message : '알 수 없는 에러'
            },
            { status: 500 }
        );
    }
}