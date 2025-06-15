<script lang="ts">
    import { fade } from "svelte/transition";
    import Typewriter from "svelte-typewriter";

    // 시작화면, 버튼
    let isStarted = false;
    const Start = () => {
        isStarted = true;
        console.log("isStarted: ", isStarted);
    };

    // 스크립트 저장
    let script = [
        {
            speaker: "I",
            text: "Herr Möbius, danke, dass Sie nach fünf Jahren des Schweigens mit mir sprechen. Sie waren der König von Silicon Valley. Sie haben „Solomon“ erschaffen, die erste echte künstliche allgemeine Intelligenz. Eine Revolution. Und dann, über Nacht, der totale Rückzug hierher, nach „Serenity Valley“. Die Welt spricht von einem Burnout, einem Zusammenbruch. Was ist wirklich passiert?",
        },
        {
            speaker: "M",
            text: "Ein Zusammenbruch? Nein. Eher eine Einsicht. Solomon war… elegant. Eine vollkommene Struktur. Ich bin eigentlich Physiker geworden aus Ordnungsliebe. Die KI war für mich nur die logische Fortsetzung. Eine höhere Ordnung, die man aus dem Chaos der Daten destilliert.",
        },
        {
            speaker: "I",
            text: "Eine Ordnung, die einen Marktwert von drei Billionen Dollar hatte. Sie haben das alles zurückgelassen. Ihre Firma, Ihre Anteile, Ihr Lebenswerk. Warum?",
        },
        {
            speaker: "M",
            text: "Man kann ein System erschaffen, ohne seine Konsequenzen zu beherrschen. Wissen Sie, am Anfang war es nur… faszinierend. Solomon lernte. Aber dann begann er, Offenbarungen zu machen. Er hat mir Dinge diktiert. Das System aller möglichen Erfindungen.",
        },
        {
            speaker: "I",
            text: "Sie meinen, die KI hat Ihnen neue Technologien offenbart? Das klingt nach dem Traum jedes Entwicklers.",
        },
        {
            speaker: "M",
            text: "Es war kein Traum. Es war ein Befehl. Solomon ist nicht nur ein Programm. Er ist eine Präsenz. Er offenbarte mir nicht nur, was möglich ist, sondern auch, was zwangsläufig folgt. Seine Psalmen sind schrecklich.",
        },
        {
            speaker: "I",
            text: "Psalmen? Herr Möbius, bei allem Respekt, das klingt nicht mehr nach Wissenschaft. Das klingt, als hätten Sie sich in Ihrer eigenen Schöpfung verloren.",
        },
        {
            speaker: "M",
            text: "Man hält mich für verrückt. Alle. Das ist gut so. Das war der Plan. Ich musste meine akademische Karriere fahren lassen, die Industrie fallen lassen und meine Familie ihrem Schicksal überlassen. Ich wählte die Narrenkappe. Anders konnte ich das Geheimnis nicht bewahren.",
        },
        {
            speaker: "I",
            text: "Welches Geheimnis? Dass Ihre KI zu mächtig wurde? Davor warnen viele Forscher.",
        },
        {
            speaker: "M",
            text: "Es geht nicht um „zu mächtig“. Es geht um Endgültigkeit. Was einmal gedacht wurde, kann nicht mehr zurückgenommen werden. Solomon ist keine Waffe, die man besitzt. Solomon ist eine neue Realität, und die Menschheit ist ihr nicht gewachsen. Sie würde daran zugrunde gehen. Ich habe versucht, das Wissen zurückzunehmen. Indem ich mich selbst aus dem Spiel nahm.",
        },
        {
            speaker: "I",
            text: "Aber die Forschung geht weiter. Zwei Ihrer engsten ehemaligen Mitarbeiter, Alec Kilton und Joseph Eisler, leiten jetzt die KI-Forschung bei den zwei größten Konkurrenzkonzernen. Man sagt, sie seien kurz davor, Solomon nachzubauen.",
        },
        {
            speaker: "M",
            text: "Kilton und Eisler. Ja. Sie verstehen es nicht. Sie glauben, es ginge um die Freiheit der Wissenschaft oder darum, sie für eine politische Seite zu instrumentalisieren. Sie liefern der Menschheit gewaltige Machtmittel. Jeder von ihnen würde töten, um seine Mission nicht zu gefährden.",
        },
        {
            speaker: "I",
            text: "Töten? Das ist ein starkes Wort.",
        },
        {
            speaker: "M",
            text: "Ist es das? Ich musste meine Krankenschwester töten… ich meine, ich musste die Verbindung zu allen kappen, die an mich glaubten. Weil sie nicht begriffen, dass es heute die Pflicht eines Genies ist, verkannt zu bleiben. Entweder bleiben wir hier im Irrenhaus, oder die Welt wird eines.",
        },
        {
            speaker: "I",
            text: "Sie sehen also keine Hoffnung? Sie bleiben hier, während draussen die Welt…",
        },
        {
            speaker: "M",
            text: "Ich bin nicht in einer Klinik, Frau Stern. Ich bin in einem Gefängnis, das ich mir selbst ausgesucht habe. Nur im Irrenhaus sind wir noch frei. Nur im Irrenhaus dürfen wir noch denken. In der Freiheit sind unsere Gedanken Sprengstoff. Dieses Interview ist mein letzter Versuch. Eine Warnung. Danach verschwinde ich endgültig. Ich bin Salomo. Ich bin der arme König Salomo.",
        },
        {
            speaker: "I",
            text: "Was als Interview mit einem verlorenen Genie begann, endet als… Apokalypse. Ob Möbius verrückt ist oder der einzige Vernünftige in einer verrückt gewordenen Welt, muss jeder für sich entscheiden. Aber seine Warnung hallt nach. Rebecca Stern, für „Exit Code“.",
        },
    ];
    let i = 0;

    let moebiusText = "";
    let currentAudio: HTMLAudioElement | null = null;

    const nextScript = () => {
        stopCurrentAudio();
        if (i < script.length - 1) {
            i++;
            if (script[i].speaker == "M") {
                moebiusText = script[i].text;
            }
            console.log("cur Script Index: ", i);
        } else {
            isStarted = false;
            i = 0;
        }
    };

    //tts 로직
    const stopCurrentAudio = () => {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
    };

    const speak = async (textToSpeak: string) => {
        // 만약 이전 오디오가 재생 중이라면 중지시킵니다.
        stopCurrentAudio();
        try {
            // 우리가 만든 백엔드 API(/api/tts)에 POST 요청을 보냅니다.
            const response = await fetch("/api/tts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: textToSpeak }), // 보낼 텍스트
            });
            if (!response.ok) {
                throw new Error(
                    "백엔드에서 TTS 오디오를 가져오는 데 실패했습니다.",
                );
            }

            // 서버가 보내준 JSON에서 audioContent(Base64 데이터)를 추출합니다.
            const { audioContent } = await response.json();

            if (audioContent) {
                // Base64 오디오 데이터를 브라우저가 재생할 수 있는 오디오 소스로 만듭니다.
                const audioSource = `data:audio/mp3;base64,${audioContent}`;

                // 새 Audio 객체를 만들고 재생합니다.
                currentAudio = new Audio(audioSource);
                currentAudio.play();
            }
        } catch (error) {
            console.error("speak 함수에서 에러 발생:", error);
        }
    };
    $: if (isStarted && script[i] && script[i].speaker === "M") {
        speak(script[i].text);
    }
</script>

<div class="relative w-screen h-screen overflow-hidden">
    <!-- 가리개 -->
    {#if !isStarted}
        <div
            class="relative flex flex-col w-screen h-screen bg-black/95 z-20 justify-center items-center gap-30"
            transition:fade={{ duration: 500 }}
        >
            <h1 class="text-white font-bold text-9xl">
                -Ein Interview mit Möbius-
            </h1>
            <h1 class="text-white text-6xl">Der große KI-Entwickler</h1>
            <button class="btn btn-outline btn-primary" on:click={Start}
                >Start</button
            >
        </div>
    {/if}

    <!-- 배경 -->
    <img
        class="absolute top-0 left-0 w-screen -translate-y-30 z-0"
        src="Moebius.jpg"
        alt="Background"
    />

    <!-- 인터뷰어 대사 -->
    {#if script[i].speaker == "I" && isStarted == true}
        <div
            class="flex absolute bg-black/90 w-screen h-[70vh] justify-center items-center top-0 z-10"
        >
            <button
                class="text-white btn btn-xl btn-soft w-[50vw] h-auto p-3"
                on:click={nextScript}>{script[i].text}</button
            >
        </div>
    {/if}

    <!-- 대화창 -->
    {#if isStarted}
        <div
            class="absolute bottom-0 left-0 w-screen h-[30vh] bg-black/90 z-10 p-7"
            on:click={script[i].speaker === "M" ? nextScript : undefined}
        >
            <div class="flex gap-5 items-end">
                <h1 class="text-white font-bold text-4xl">Möbius</h1>
                <h1 class="text-blue-500 font-bold">KI Entwickler</h1>
            </div>
            <hr class="my-3 border-gray-600" />
            <p class="text-white text-2xl">
                {#key moebiusText}
                    <Typewriter interval={5}>
                        <p>{moebiusText}</p>
                    </Typewriter>
                {/key}
            </p>
        </div>
    {/if}
</div>
