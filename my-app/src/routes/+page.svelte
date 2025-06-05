<script>
    import Typewriter from "svelte-typewriter";

    let started = false;
    let overlayVisible = true;

    let index = 0;
    let showNext = false;
    let scriptM = [
        {
            text: "Guten Tag, Dr. Möbius. Vielen Dank, dass Sie sich Zeit nehmen.",
        },
        {
            text: "Weil ich etwas erschaffen habe, das niemals hätte erschaffen werden dürfen.",
        },
        { text: "Was genau meinen Sie damit?" },
    ];

    function handleDone() {
        showNext = true;
    }
    function nextLine() {
        if (!showNext) return;
        if (index < scriptM.length - 1) {
            index++;
            showNext = false;
        }
    }

    function startInterview() {
        started = true;
        overlayVisible = false;
    }
</script>

<!-- background img -->
<img
    src="Moebius.png"
    alt="Möbius"
    class="w-screen h-screen object-cover pointer-events-none absolute transition-transform duration-[3000ms] ease-out"
    class:scale-110={started}
/>
<button class="fixed top-0 btn" on:click={nextLine}>uwu</button>

<!-- background 반투명 가리개, start button 누르기 전까지만 visible -->
{#if overlayVisible}
    <div
        class="w-screen h-screen absolute inset-0 bg-black/50 transition-opacity duration-700"
        style="opacity: 1;"
    ></div>
{/if}

<!-- start 화면 -->
{#if !started}
    <div class="absolute flex flex-col items-center justify-center">
        <div class="flex flex-col items-center justify-center">
            <h1>Deutsch Projekt</h1>
            <p>Die Physiker</p>
        </div>
        <p>Ein Interview mit Möbius</p>
        <button
            on:click={startInterview}
            class="mt-4 px-4 py-2 bg-white text-black rounded"
        >
            Start
        </button>
    </div>
{/if}

<!-- interview 시작 후 화면 -->
{#if started}
    <!-- 대사창 (하단 고정) -->
    <div class="fixed bottom-0 left-0 w-full px-4 pb-6 z-20">
        <div
            class="mx-auto w-full max-w-4xl bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg p-4 text-white space-y-2"
        >
            <!-- 이름 + 직책 -->
            <div class="flex space-x-2 items-baseline">
                <p class="text-xl font-bold">Möbius</p>
                <p class="text-sm text-blue-400 font-semibold">KI Entwickler</p>
            </div>
            <!-- 대사 -->
            <Typewriter><p>{scriptM.text[index]}</p></Typewriter>
        </div>
    </div>
{/if}
