// src/routes/api/tts/+server.ts

import { json, error } from '@sveltejs/kit';
import textToSpeech from '@google-cloud/text-to-speech';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private'; // SvelteKit의 환경 변수 모듈

// 1. Vercel 환경 변수에서 JSON 문자열을 가져옵니다.
const credentialsJson = env.GOOGLE_APPLICATION_CREDENTIALS;

if (!credentialsJson) {
	throw new Error('GOOGLE_CREDENTIALS_JSON 환경 변수가 설정되지 않았습니다.');
}

// 2. JSON 문자열을 파싱하여 인증 객체를 만듭니다.
const credentials = JSON.parse(credentialsJson);

// 3. 파싱한 인증 객체를 사용하여 클라이언트를 생성합니다.
const client = new textToSpeech.TextToSpeechClient({ credentials });

export const POST: RequestHandler = async ({ request }) => {
	const { text } = await request.json();

	if (!text) {
		throw error(400, 'Text to synthesize is required.');
	}

	const ttsRequest = {
		input: { text: text },
		voice: { languageCode: 'de-DE', name: 'de-DE-Chirp3-HD-Charon' },
		audioConfig: { audioEncoding: 'MP3' as const }
	};

	try {
		const [response] = await client.synthesizeSpeech(ttsRequest);
		const audioContent = Buffer.from(response.audioContent as Uint8Array).toString('base64');
		return json({ audioContent });
	} catch (e) {
		console.error('Google TTS API Error:', e);
		throw error(500, 'Failed to synthesize speech.');
	}
};