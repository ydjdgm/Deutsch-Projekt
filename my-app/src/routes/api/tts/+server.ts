// src/routes/api/tts/+server.ts

import { json, error } from '@sveltejs/kit';
import textToSpeech from '@google-cloud/text-to-speech';
import type { RequestHandler } from './$types';
import path from 'path';

// 클라이언트 인스턴스 생성
const keyFilePath = path.resolve('src/lib/secrets/cloud_tts_api.json'); // "your-key-file-name.json"은 실제 파일 이름으로 바꿔주세요.
const client = new textToSpeech.TextToSpeechClient({
	keyFilename: keyFilePath
});


export const POST: RequestHandler = async ({ request }) => {
	const { text } = await request.json();

	if (!text) {
		throw error(400, 'Text to synthesize is required.');
	}

	const ttsRequest = {
		input: { text: text },
		// 목소리 설정
		voice: { languageCode: 'de-DE', name: 'de-DE-Wavenet-M' },
		// 오디오 형식 설정
		audioConfig: { audioEncoding: 'MP3' as const }
	};

	try {
		// Google API 호출
		const [response] = await client.synthesizeSpeech(ttsRequest);
		
        // 👇 이 부분이 수정되었습니다.
        // Uint8Array를 Node.js의 Buffer로 변환한 후, base64로 인코딩합니다.
		const audioContent = Buffer.from(response.audioContent as Uint8Array).toString('base64');

		return json({ audioContent });

	} catch (e) {
		console.error('Google TTS API Error:', e);
		throw error(500, 'Failed to synthesize speech.');
	}
};