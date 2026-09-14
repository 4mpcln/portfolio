import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretDownFilled,
  IconCaretLeftFilled,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconCommand,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconSearch,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconWorld,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';

const SOUND_DEFINES_DOWN: Record<string, [number, number]> = {
  KeyQ: [22245, 95],
  KeyW: [22790, 89],
  KeyE: [23317, 83],
  KeyR: [23817, 92],
  KeyT: [24297, 92],
  KeyY: [24811, 93],
  KeyU: [25313, 95],
  KeyI: [25795, 91],
  KeyO: [26309, 84],
  KeyP: [26804, 83],
  KeyA: [31542, 85],
  KeyS: [32031, 88],
  KeyD: [32492, 85],
  KeyF: [32973, 87],
  KeyG: [33453, 94],
  KeyH: [33986, 93],
  KeyJ: [34425, 88],
  KeyK: [34932, 90],
  KeyL: [35410, 95],
  KeyZ: [38694, 80],
  KeyX: [39148, 76],
  KeyC: [39632, 95],
  KeyV: [40136, 94],
  KeyB: [40621, 107],
  KeyN: [41103, 90],
  KeyM: [41610, 93],
  Space: [51541, 144],
  Quote: [36428, 87],
  Comma: [42110, 92],
  Period: [42594, 90],
};

const charToKeyCode = (char: string) => {
  if (/^[a-z]$/i.test(char)) return `Key${char.toUpperCase()}`;
  if (char === ' ') return 'Space';
  if (char === "'") return 'Quote';
  if (char === ',') return 'Comma';
  if (char === '.') return 'Period';
  return null;
};

export const getQuoteKeyCode = charToKeyCode;

function useKeyboardAudio(enabled: boolean) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    let context: AudioContext | null = null;

    const loadSound = async () => {
      try {
        context = new AudioContext();
        audioContextRef.current = context;

        const response = await fetch('/sound/sound.ogg', { signal: controller.signal });
        if (!response.ok || controller.signal.aborted) return;

        const bytes = await response.arrayBuffer();
        if (controller.signal.aborted) return;

        audioBufferRef.current = await context.decodeAudioData(bytes);
        if (!controller.signal.aborted) setReady(true);
      } catch {
        setReady(false);
      }
    };

    void loadSound();

    return () => {
      controller.abort();
      setReady(false);
      audioBufferRef.current = null;
      audioContextRef.current = null;
      if (context) void context.close().catch(() => {});
    };
  }, [enabled]);

  return useCallback(
    (keyCode: string | null) => {
      if (!enabled || !ready || !keyCode) return;
      const soundDef = SOUND_DEFINES_DOWN[keyCode];
      const context = audioContextRef.current;
      const buffer = audioBufferRef.current;
      if (!soundDef || !context || !buffer) return;

      if (context.state === 'suspended') {
        void context.resume().catch(() => {});
      }

      const [startMs, durationMs] = soundDef;
      const source = context.createBufferSource();
      const gain = context.createGain();

      gain.gain.value = keyCode === 'Space' ? 0.16 : 0.11;
      source.buffer = buffer;
      source.connect(gain);
      gain.connect(context.destination);
      source.start(0, startMs / 1000, durationMs / 1000);
    },
    [enabled, ready],
  );
}

type QuoteKeyboardProps = {
  activeKey: string | null;
  className?: string;
  enableSound?: boolean;
  isTyping: boolean;
  isVisible: boolean;
  onCenterComplete?: () => void;
  onExitComplete?: () => void;
  pressId: number;
  shouldExitRight?: boolean;
};

const keyboardVariants: Variants = {
  hiddenLeft: {
    opacity: 0,
    x: '-135vw',
    y: 90,
    rotate: -48,
    scale: 0.82,
  },
  center: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 78,
      damping: 13,
      mass: 0.9,
      restDelta: 0.001,
      restSpeed: 0.001,
    },
  },
  hiddenRight: {
    opacity: 0,
    x: '135vw',
    y: 88,
    rotate: 48,
    scale: 0.82,
    transition: {
      duration: 0.78,
      ease: [0.72, 0, 0.95, 0.5],
    },
  },
};

export function QuoteKeyboard({
  activeKey,
  className,
  enableSound = true,
  isTyping,
  isVisible,
  onCenterComplete,
  onExitComplete,
  pressId,
  shouldExitRight = false,
}: QuoteKeyboardProps) {
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const releaseTimer = useRef<number | null>(null);
  const playKeySound = useKeyboardAudio(enableSound);

  useEffect(() => {
    if (!isTyping || !activeKey) return;

    setPressedKey(activeKey);
    playKeySound(activeKey);

    if (releaseTimer.current) window.clearTimeout(releaseTimer.current);
    releaseTimer.current = window.setTimeout(() => {
      setPressedKey((current) => (current === activeKey ? null : current));
    }, activeKey === 'Space' ? 220 : 165);

    return () => {
      if (releaseTimer.current) window.clearTimeout(releaseTimer.current);
    };
  }, [activeKey, isTyping, playKeySound, pressId]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none mt-4 flex w-full justify-center overflow-visible sm:mt-5 md:mt-4 lg:mt-6',
        className,
      )}
    >
      <motion.div
        className="origin-top scale-[0.34] min-[380px]:scale-[0.39] min-[430px]:scale-[0.45] sm:scale-[0.58] md:scale-[0.62] lg:scale-[0.84] xl:scale-100"
        variants={keyboardVariants}
        initial="hiddenLeft"
        animate={isVisible ? 'center' : shouldExitRight ? 'hiddenRight' : 'hiddenLeft'}
        onAnimationComplete={(definition) => {
          if (definition === 'center') onCenterComplete?.();
          if (definition === 'hiddenRight') onExitComplete?.();
        }}
      >
      <div className="w-[58rem] rounded-[2rem] bg-neutral-200 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/35 max-[420px]:rounded-[1.6rem]">
        <KeyboardRow>
          <KeyboardKey
            code="Escape"
            pressedKey={pressedKey}
            className="w-[5.8rem] rounded-tl-[1.35rem]"
            childrenClassName="items-start justify-end p-3 text-sm"
          >
            esc
          </KeyboardKey>
          <KeyboardKey code="F1" pressedKey={pressedKey} childrenClassName="justify-end gap-2 pb-3 pt-2 text-sm">
            <IconBrightnessDown className="h-3 w-3" />
            <span>F1</span>
          </KeyboardKey>
          <KeyboardKey code="F2" pressedKey={pressedKey} childrenClassName="justify-end gap-2 pb-3 pt-2 text-sm">
            <IconBrightnessUp className="h-3 w-3" />
            <span>F2</span>
          </KeyboardKey>
          <KeyboardKey code="F3" pressedKey={pressedKey} childrenClassName="justify-end gap-2 pb-3 pt-2 text-sm">
            <IconTable className="h-3 w-3" />
            <span>F3</span>
          </KeyboardKey>
          <KeyboardKey code="F4" pressedKey={pressedKey} childrenClassName="justify-end gap-2 pb-3 pt-2 text-sm">
            <IconSearch className="h-3 w-3" />
            <span>F4</span>
          </KeyboardKey>
          <KeyboardKey code="F5" pressedKey={pressedKey} childrenClassName="justify-end gap-2 pb-3 pt-2 text-sm">
            <IconMicrophone className="h-3 w-3" />
            <span>F5</span>
          </KeyboardKey>
          <KeyboardKey code="F6" pressedKey={pressedKey} childrenClassName="justify-end gap-2 pb-3 pt-2 text-sm">
            <IconMoon className="h-3 w-3" />
            <span>F6</span>
          </KeyboardKey>
          <KeyboardKey code="F7" pressedKey={pressedKey} childrenClassName="justify-end gap-2 pb-3 pt-2 text-sm">
            <IconPlayerTrackPrev className="h-3 w-3" />
            <span>F7</span>
          </KeyboardKey>
          <KeyboardKey code="F8" pressedKey={pressedKey} childrenClassName="justify-end gap-2 pb-3 pt-2 text-sm">
            <IconPlayerSkipForward className="h-3 w-3" />
            <span>F8</span>
          </KeyboardKey>
          <KeyboardKey code="F9" pressedKey={pressedKey} childrenClassName="justify-end gap-2 pb-3 pt-2 text-sm">
            <IconPlayerTrackNext className="h-3 w-3" />
            <span>F9</span>
          </KeyboardKey>
          <KeyboardKey code="F10" pressedKey={pressedKey} childrenClassName="justify-end gap-2 pb-3 pt-2 text-sm">
            <IconVolume3 className="h-3 w-3" />
            <span>F10</span>
          </KeyboardKey>
          <KeyboardKey code="F11" pressedKey={pressedKey} childrenClassName="justify-end gap-2 pb-3 pt-2 text-sm">
            <IconVolume2 className="h-3 w-3" />
            <span>F11</span>
          </KeyboardKey>
          <KeyboardKey code="F12" pressedKey={pressedKey} childrenClassName="justify-end gap-2 pb-3 pt-2 text-sm">
            <IconVolume className="h-3 w-3" />
            <span>F12</span>
          </KeyboardKey>
          <div className="flex h-14 w-14 items-center justify-center rounded-[1rem] bg-neutral-100 shadow-[0_0_2px_rgba(0,0,0,0.45),0_2px_3px_rgba(0,0,0,0.12),0_1px_0_rgba(255,255,255,1)_inset]">
            <div className="h-9 w-9 rounded-full border-2 border-neutral-300" />
          </div>
        </KeyboardRow>

        <KeyboardRow>
          <KeyboardKey code="Backquote" pressedKey={pressedKey}>
            <span>~</span>
            <span>`</span>
          </KeyboardKey>
          {[
            ['Digit1', '!', '1'],
            ['Digit2', '@', '2'],
            ['Digit3', '#', '3'],
            ['Digit4', '$', '4'],
            ['Digit5', '%', '5'],
            ['Digit6', '^', '6'],
            ['Digit7', '&', '7'],
            ['Digit8', '*', '8'],
            ['Digit9', '(', '9'],
            ['Digit0', ')', '0'],
            ['Minus', '-', '_'],
            ['Equal', '+', '='],
          ].map(([code, top, bottom]) => (
            <KeyboardKey key={code} code={code} pressedKey={pressedKey}>
              <span>{top}</span>
              <span>{bottom}</span>
            </KeyboardKey>
          ))}
          <KeyboardKey
            code="Backspace"
            pressedKey={pressedKey}
            className="w-[5.85rem]"
            childrenClassName="items-end justify-end p-3 text-sm lowercase"
          >
            delete
          </KeyboardKey>
        </KeyboardRow>

        <KeyboardRow>
          <KeyboardKey
            code="Tab"
            pressedKey={pressedKey}
            className="w-[5.85rem]"
            childrenClassName="items-start justify-end p-3 text-sm lowercase"
          >
            tab
          </KeyboardKey>
          {'QWERTYUIOP'.split('').map((letter) => (
            <KeyboardKey key={letter} code={`Key${letter}`} pressedKey={pressedKey}>
              {letter}
            </KeyboardKey>
          ))}
          <KeyboardKey code="BracketLeft" pressedKey={pressedKey}>
            <span>{'{'}</span>
            <span>[</span>
          </KeyboardKey>
          <KeyboardKey code="BracketRight" pressedKey={pressedKey}>
            <span>{'}'}</span>
            <span>]</span>
          </KeyboardKey>
          <KeyboardKey code="Backslash" pressedKey={pressedKey}>
            <span>|</span>
            <span>\</span>
          </KeyboardKey>
        </KeyboardRow>

        <KeyboardRow>
          <KeyboardKey
            code="CapsLock"
            pressedKey={pressedKey}
            className="w-[6.7rem]"
            childrenClassName="items-start justify-end p-3 text-sm lowercase"
          >
            caps lock
          </KeyboardKey>
          {'ASDFGHJKL'.split('').map((letter) => (
            <KeyboardKey key={letter} code={`Key${letter}`} pressedKey={pressedKey}>
              {letter}
            </KeyboardKey>
          ))}
          <KeyboardKey code="Semicolon" pressedKey={pressedKey}>
            <span>:</span>
            <span>;</span>
          </KeyboardKey>
          <KeyboardKey code="Quote" pressedKey={pressedKey}>
            <span>"</span>
            <span>'</span>
          </KeyboardKey>
          <KeyboardKey
            code="Enter"
            pressedKey={pressedKey}
            className="w-[6.7rem]"
            childrenClassName="items-end justify-end p-3 text-sm lowercase"
          >
            return
          </KeyboardKey>
        </KeyboardRow>

        <KeyboardRow>
          <KeyboardKey
            code="ShiftLeft"
            pressedKey={pressedKey}
            className="w-[8.65rem]"
            childrenClassName="items-start justify-end p-3 text-sm lowercase"
          >
            shift
          </KeyboardKey>
          {'ZXCVBNM'.split('').map((letter) => (
            <KeyboardKey key={letter} code={`Key${letter}`} pressedKey={pressedKey}>
              {letter}
            </KeyboardKey>
          ))}
          <KeyboardKey code="Comma" pressedKey={pressedKey}>
            <span>&lt;</span>
            <span>,</span>
          </KeyboardKey>
          <KeyboardKey code="Period" pressedKey={pressedKey}>
            <span>&gt;</span>
            <span>.</span>
          </KeyboardKey>
          <KeyboardKey code="Slash" pressedKey={pressedKey}>
            <span>?</span>
            <span>/</span>
          </KeyboardKey>
          <KeyboardKey
            code="ShiftRight"
            pressedKey={pressedKey}
            className="w-[8.65rem]"
            childrenClassName="items-end justify-end p-3 text-sm lowercase"
          >
            shift
          </KeyboardKey>
        </KeyboardRow>

        <KeyboardRow className="mb-0">
          <KeyboardKey
            code="Fn"
            pressedKey={pressedKey}
            className="rounded-bl-[1.35rem]"
            childrenClassName="items-start justify-between p-2.5 text-[0.7rem] leading-none lowercase"
          >
            <span>fn</span>
            <IconWorld className="h-4 w-4" />
          </KeyboardKey>
          <KeyboardKey code="ControlLeft" pressedKey={pressedKey} childrenClassName="items-start justify-between p-2.5 text-[0.7rem] leading-none lowercase">
            <IconChevronUp className="h-3.5 w-3.5" />
            <span>control</span>
          </KeyboardKey>
          <KeyboardKey code="AltLeft" pressedKey={pressedKey} childrenClassName="items-start justify-between p-2.5 text-[0.7rem] leading-none lowercase">
            <OptionKey className="h-4 w-4" />
            <span>option</span>
          </KeyboardKey>
          <KeyboardKey code="MetaLeft" pressedKey={pressedKey} className="w-[4.9rem]" childrenClassName="items-start justify-between p-2.5 text-[0.7rem] leading-none lowercase">
            <IconCommand className="h-4 w-4" />
            <span>command</span>
          </KeyboardKey>
          <KeyboardKey code="Space" pressedKey={pressedKey} className="w-[19rem]" />
          <KeyboardKey code="MetaRight" pressedKey={pressedKey} className="w-[4.9rem]" childrenClassName="items-start justify-between p-2.5 text-[0.7rem] leading-none lowercase">
            <IconCommand className="h-4 w-4" />
            <span>command</span>
          </KeyboardKey>
          <KeyboardKey code="AltRight" pressedKey={pressedKey} childrenClassName="items-start justify-between p-2.5 text-[0.7rem] leading-none lowercase">
            <OptionKey className="h-4 w-4" />
            <span>option</span>
          </KeyboardKey>
          <KeyboardKey code="ArrowLeft" pressedKey={pressedKey}>
            <IconCaretLeftFilled className="h-4 w-4" />
          </KeyboardKey>
          <div className="flex h-14 w-14 flex-col gap-[3px]">
            <KeyboardKey code="ArrowUp" pressedKey={pressedKey} className="h-[1.625rem] w-14 rounded-t-[0.85rem]">
              <IconCaretUpFilled className="h-4 w-4" />
            </KeyboardKey>
            <KeyboardKey code="ArrowDown" pressedKey={pressedKey} className="h-[1.625rem] w-14 rounded-b-[0.85rem]">
              <IconCaretDownFilled className="h-4 w-4" />
            </KeyboardKey>
          </div>
          <KeyboardKey code="ArrowRight" pressedKey={pressedKey} className="rounded-br-[1.35rem]">
            <IconCaretRightFilled className="h-4 w-4" />
          </KeyboardKey>
        </KeyboardRow>
      </div>
      </motion.div>
    </div>
  );
}

function KeyboardRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('mb-[6px] flex gap-[6px]', className)}>{children}</div>;
}

function KeyboardKey({
  children,
  childrenClassName,
  className,
  code,
  pressedKey,
}: {
  children?: ReactNode;
  childrenClassName?: string;
  className?: string;
  code: string;
  pressedKey: string | null;
}) {
  const isPressed = pressedKey === code;

  return (
    <motion.div
      animate={
        isPressed
          ? {
              y: 3,
              scale: 0.92,
              backgroundColor: '#525252',
              color: '#ffffff',
              boxShadow:
                '0 0 0 2px rgba(255,255,255,0.78), 0 0 22px rgba(255,255,255,0.42), 0 0 42px rgba(115,120,130,0.28), 0 1px 0 rgba(255,255,255,0.18) inset',
            }
          : {
              y: 0,
              scale: 1,
              backgroundColor: '#f5f5f5',
              color: '#525252',
              boxShadow:
                '0 0 1px rgba(0,0,0,0.45), 0 1px 1px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,1) inset',
            }
      }
      transition={{ type: 'spring', stiffness: 520, damping: 24, mass: 0.35 }}
      className={cn(
        'relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-[0.8rem] text-base font-medium',
        className,
      )}
    >
      <motion.div
        animate={
          isPressed
            ? {
                opacity: 0,
                scale: 1,
              }
            : {
                opacity: 0,
                scale: 0.65,
              }
        }
        transition={{ duration: 0.14 }}
        className="pointer-events-none absolute inset-1 rounded-[0.65rem] bg-white blur-sm"
      />
      <motion.div
        animate={
          isPressed
            ? {
                scale: 1.18,
                textShadow: '0 0 9px rgba(255,255,255,0.95), 0 0 18px rgba(145,150,160,0.62)',
              }
            : {
                scale: 1,
                textShadow: '0 0 0 rgba(0,0,0,0)',
              }
        }
        transition={{ type: 'spring', stiffness: 520, damping: 18, mass: 0.3 }}
        className={cn('relative z-10 flex h-full w-full flex-col items-center justify-center', childrenClassName)}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function OptionKey({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect height="2" stroke="currentColor" strokeWidth="2" width="10" x="18" y="5" />
      <polygon
        points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
