"use client";
import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause, Disc, Sliders, Activity } from "lucide-react";

export default function AudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [soundMode, setSoundMode] = useState("THE_VOID_BASS"); // THE_VOID_BASS, SYNDICATE_VOICES, SLOW_BURN
  const [cutoffFreq, setCutoffFreq] = useState(800); // Hz
  const [isClient, setIsClient] = useState(false);

  // Audio nodes and context refs
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const mainGainRef = useRef(null);
  const filterNodeRef = useRef(null);
  const sequencerIntervalRef = useRef(null);
  const activeOscillatorsRef = useRef([]);

  // Canvas visualizer refs
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Sound description mapping
  const soundModes = [
    { id: "THE_VOID_BASS", label: "VOID_BASS", bpm: 124 },
    { id: "SYNDICATE_VOICES", label: "SYN_ATMOS", bpm: 90 },
    { id: "SLOW_BURN", label: "SLOW_BURN", bpm: 110 },
  ];

  useEffect(() => {
    setIsClient(true);
    // Load state from localStorage if exists
    const savedMute = localStorage.getItem("xtc_synth_muted") === "true";
    const savedSound = localStorage.getItem("xtc_synth_sound") || "THE_VOID_BASS";
    setIsMuted(savedMute);
    setSoundMode(savedSound);

    return () => {
      stopSynthesizer();
    };
  }, []);

  // Update localStorage when changed
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("xtc_synth_muted", isMuted.toString());
      if (mainGainRef.current) {
        mainGainRef.current.gain.value = isMuted ? 0 : 0.25;
      }
    }
  }, [isMuted, isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("xtc_synth_sound", soundMode);
      // If playing, reboot sequencer with new parameters
      if (isPlaying) {
        stopSequencer();
        startSequencer();
      }
    }
  }, [soundMode, isClient]);

  useEffect(() => {
    if (filterNodeRef.current && audioCtxRef.current) {
      // Smooth filter transitions
      filterNodeRef.current.frequency.setTargetAtTime(
        cutoffFreq,
        audioCtxRef.current.currentTime,
        0.05
      );
    }
  }, [cutoffFreq]);

  const initAudio = () => {
    if (audioCtxRef.current) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // Create Main Nodes
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyserRef.current = analyser;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(cutoffFreq, ctx.currentTime);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);
    filterNodeRef.current = filter;

    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(isMuted ? 0 : 0.25, ctx.currentTime);
    mainGainRef.current = mainGain;

    // Connect flow: Synthesizer Source Nodes -> Filter -> Analyser -> Main Gain -> Destination
    filter.connect(analyser);
    analyser.connect(mainGain);
    mainGain.connect(ctx.destination);

    // Start Visualizer Drawing Loop
    drawVisualizer();
  };

  const drawVisualizer = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!analyserRef.current) return;
      animationFrameRef.current = requestAnimationFrame(draw);

      analyserRef.current.getByteFrequencyData(dataArray);

      ctx.fillStyle = "rgba(10, 8, 18, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 1.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2.5;

        // Visualizer color gradient matching XTC neon hues (purple/green/crimson)
        const red = Math.floor(153 + (i * 2));
        const green = Math.floor(51 + (i * 1));
        const blue = Math.floor(255 - (i * 3));

        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, 0.85)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);

        x += barWidth;
      }
    };

    draw();
  };

  // Synthesize progressive techno beats and sequences programmatically
  const startSequencer = () => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const filter = filterNodeRef.current;

    const mode = soundModes.find((m) => m.id === soundMode) || soundModes[0];
    const stepTime = 60 / mode.bpm / 2; // Eighth notes
    let stepCount = 0;

    const runStep = () => {
      const time = ctx.currentTime;

      // Ensure audio context remains active
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // SEQUENCE 1: "THE_VOID_BASS" - Brutalist progressive driving sub-bass
      if (soundMode === "THE_VOID_BASS") {
        // Synthesize kick on every quarter note (step 0, 2, 4, 6...)
        if (stepCount % 2 === 0) {
          playKick(time);
        }

        // Bassline melody
        const bassNotes = [32.70, 32.70, 38.89, 38.89, 43.65, 43.65, 30.87, 34.65]; // C1, Eb1, F1, B0, C#1
        const activeNote = bassNotes[stepCount % bassNotes.length];
        
        // Bass trigger on offbeats
        if (stepCount % 2 === 1 || stepCount % 4 === 2) {
          playSynthBass(activeNote, time, stepTime * 0.8);
        }

        // Hihat on offbeats
        if (stepCount % 2 === 1) {
          playHihat(time);
        }
      }

      // SEQUENCE 2: "SYNDICATE_VOICES" - Ethereal ambient resonance sweeps
      else if (soundMode === "SYNDICATE_VOICES") {
        // Slow atmospheric drone triggers
        if (stepCount % 16 === 0) {
          // Play deep minor pad cluster
          playPadChord([65.41, 77.78, 98.00], time, stepTime * 15); // C2, Eb2, G2
        }
        if (stepCount % 16 === 8) {
          playPadChord([58.27, 73.42, 87.31], time, stepTime * 15); // Bb1, D2, F2
        }
        
        // Add minimalist high ticking clicks
        if (stepCount % 4 === 1 || stepCount % 4 === 3) {
          playClick(time);
        }
      }

      // SEQUENCE 3: "SLOW_BURN" - Organic minimal tech pulse
      else if (soundMode === "SLOW_BURN") {
        // Subtle soft sub-kick
        if (stepCount % 2 === 0) {
          playSoftSubKick(time);
        }

        // Rhythmic organic tick pattern
        if (stepCount % 4 === 2 || stepCount % 8 === 5) {
          playWoodblock(time);
        }

        // Floating dynamic bass tickle
        if (stepCount % 8 === 1 || stepCount % 8 === 3 || stepCount % 8 === 6) {
          playSynthBass(48.99, time, stepTime * 0.5); // G1
        }
      }

      stepCount = (stepCount + 1) % 16;
    };

    // Run step loop with high precision scheduler timing
    const lookAhead = 25.0; // ms
    const scheduleAheadTime = 0.1; // sec
    let nextNoteTime = ctx.currentTime;

    const scheduler = () => {
      while (nextNoteTime < ctx.currentTime + scheduleAheadTime) {
        // Run step with offset schedule timing
        runStep();
        nextNoteTime += stepTime;
      }
      sequencerIntervalRef.current = setTimeout(scheduler, lookAhead);
    };

    scheduler();
  };

  const stopSequencer = () => {
    if (sequencerIntervalRef.current) {
      clearTimeout(sequencerIntervalRef.current);
      sequencerIntervalRef.current = null;
    }
    // Fade out and disconnect active oscillators
    activeOscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
      } catch (e) {}
    });
    activeOscillatorsRef.current = [];
  };

  // SOUND SYNTHESIS CORE MATH STREAMS

  const playKick = (time) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(filterNodeRef.current);

    osc.frequency.setValueAtTime(150, time);
    // Pitch sweep downwards
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.12);

    gain.gain.setValueAtTime(1.0, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

    osc.start(time);
    osc.stop(time + 0.16);

    activeOscillatorsRef.current.push(osc);
  };

  const playSoftSubKick = (time) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.connect(gain);
    gain.connect(filterNodeRef.current);

    osc.frequency.setValueAtTime(90, time);
    osc.frequency.exponentialRampToValueAtTime(38, time + 0.2);

    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.22);

    osc.start(time);
    osc.stop(time + 0.23);
  };

  const playSynthBass = (frequency, time, duration) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.connect(gain);
    gain.connect(filterNodeRef.current);

    osc.frequency.setValueAtTime(frequency, time);
    // Dynamic vibrato sweep
    osc.frequency.linearRampToValueAtTime(frequency * 1.01, time + duration);

    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

    osc.start(time);
    osc.stop(time + duration + 0.05);

    activeOscillatorsRef.current.push(osc);
  };

  const playHihat = (time) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    // Hihat synthesized using white noise
    const bufferSize = ctx.sampleRate * 0.05; // 50ms buffer
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Dynamic bandpass filter specifically calibrated for high frequency clicks
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 10000;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    noise.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(filterNodeRef.current);

    noise.start(time);
    noise.stop(time + 0.05);
  };

  const playClick = (time) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.connect(gain);
    gain.connect(filterNodeRef.current);

    osc.frequency.setValueAtTime(8000, time);
    gain.gain.setValueAtTime(0.02, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.01);

    osc.start(time);
    osc.stop(time + 0.015);
  };

  const playWoodblock = (time) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.connect(gain);
    gain.connect(filterNodeRef.current);

    osc.frequency.setValueAtTime(1400, time);
    osc.frequency.exponentialRampToValueAtTime(800, time + 0.05);

    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);

    osc.start(time);
    osc.stop(time + 0.07);
  };

  const playPadChord = (frequencies, time, duration) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    frequencies.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sawtooth";
      osc.connect(gain);
      gain.connect(filterNodeRef.current);

      osc.frequency.setValueAtTime(freq, time);
      // Gentle chord sweep detuning
      osc.frequency.linearRampToValueAtTime(freq * 1.005, time + duration);

      gain.gain.setValueAtTime(0.08, time);
      gain.gain.linearRampToValueAtTime(0.06, time + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.start(time);
      osc.stop(time + duration + 0.1);

      activeOscillatorsRef.current.push(osc);
    });
  };

  const startSynthesizer = () => {
    initAudio();
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    setIsPlaying(true);
    startSequencer();
  };

  const stopSynthesizer = () => {
    setIsPlaying(false);
    stopSequencer();
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  if (!isClient) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 glass-panel p-4 rounded-xl border border-primary/20 bg-background/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col gap-3.5 w-64 md:w-72 select-none group transition-all duration-300 hover:border-primary/45">
      {/* Header Deck Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Disc className={`w-4 h-4 text-primary ${isPlaying ? "animate-spin" : ""}`} />
          <span className="font-label-sm text-[10px] text-on-surface uppercase tracking-widest block font-bold">
            SYNTH_CALIBRATOR
          </span>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 rounded hover:bg-primary/10 hover:text-primary transition-colors text-on-surface-variant"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={isPlaying ? stopSynthesizer : startSynthesizer}
            className="p-1 rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors border border-primary/30"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Visualizer Canvas */}
      <div className="w-full h-8 bg-surface-container-high/40 rounded overflow-hidden border border-primary/10 relative">
        <canvas ref={canvasRef} width={260} height={32} className="w-full h-full block" />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
            <span className="font-label-sm text-[8px] text-primary uppercase tracking-[0.2em] animate-pulse">
              Click play to calibrate audio
            </span>
          </div>
        )}
      </div>

      {/* Program Selectors */}
      <div className="flex flex-col gap-1.5">
        <span className="font-label-sm text-[8px] text-on-surface-variant uppercase tracking-wider">
          PROGRAM SELECT
        </span>
        <div className="grid grid-cols-3 gap-1">
          {soundModes.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                initAudio();
                setSoundMode(m.id);
              }}
              className={`font-label-sm text-[8px] py-1.5 rounded-sm uppercase tracking-wider text-center border transition-all ${
                soundMode === m.id
                  ? "bg-primary text-on-primary border-primary font-bold shadow-[0_0_8px_rgba(153,51,255,0.4)]"
                  : "border-primary/10 hover:border-primary/35 text-on-surface-variant bg-surface/10 hover:bg-surface/20"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resonance Filter Modulator */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <span className="font-label-sm text-[8px] text-on-surface-variant uppercase tracking-wider">
            LOWPASS_RESONANCE
          </span>
          <span className="font-label-sm text-[8px] text-primary tracking-wide">
            {cutoffFreq} Hz
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
          <input
            type="range"
            min="120"
            max="4500"
            step="10"
            value={cutoffFreq}
            onChange={(e) => {
              initAudio();
              setCutoffFreq(Number(e.target.value));
            }}
            className="w-full h-1 bg-surface-container-high/70 rounded-lg appearance-none cursor-pointer accent-primary border-none focus:outline-none"
            aria-label="Lowpass filter cutoff frequency"
          />
        </div>
      </div>
    </div>
  );
}
