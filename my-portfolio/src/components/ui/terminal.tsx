import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface TerminalCommand {
  command: string;
  label?: string;
  description: string;
  aliases?: string[];
}

export interface TerminalProps {
  commands: TerminalCommand[];
  activeCommand?: string;
  defaultCommand?: string;
  username?: string;
  className?: string;
  enableSound?: boolean;
  onCommandChange?: (command: string) => void;
}

const normalizeCommand = (value: string) => value.trim().toLowerCase();
const hintCommands = ['internship', 'project', 'design'];

export function Terminal({
  commands,
  activeCommand,
  defaultCommand = 'internship',
  username = 'krit@portfolio',
  className,
  enableSound = false,
  onCommandChange,
}: TerminalProps) {
  const [input, setInput] = useState('');
  const [internalCommand, setInternalCommand] = useState(defaultCommand);
  const [response, setResponse] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [hintText, setHintText] = useState('');
  const [hintIndex, setHintIndex] = useState(0);
  const [isDeletingHint, setIsDeletingHint] = useState(false);
  const pendingTimerRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const commandMap = useMemo(() => {
    const map = new Map<string, TerminalCommand>();
    commands.forEach((item) => {
      map.set(normalizeCommand(item.command), item);
      item.aliases?.forEach((alias) => map.set(normalizeCommand(alias), item));
    });
    return map;
  }, [commands]);

  const currentCommand = activeCommand ?? internalCommand;
  const resolvedActiveCommand = commandMap.get(normalizeCommand(currentCommand)) ?? commands[0];
  const availableCommands = commands.map((item) => item.command).join(', ');

  useEffect(() => {
    setResponse(resolvedActiveCommand?.description ?? `Type one of: ${availableCommands}`);
    setStatusMessage('');
    setIsError(false);
  }, [availableCommands, resolvedActiveCommand]);

  useEffect(() => {
    return () => {
      if (pendingTimerRef.current) window.clearTimeout(pendingTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const currentHint = hintCommands[hintIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeletingHint) {
      if (hintText.length < currentHint.length) {
        timer = window.setTimeout(() => {
          setHintText(currentHint.substring(0, hintText.length + 1));
        }, 120);
      } else {
        timer = window.setTimeout(() => {
          setIsDeletingHint(true);
        }, 1200);
      }
    } else if (hintText.length > 0) {
      timer = window.setTimeout(() => {
        setHintText(currentHint.substring(0, hintText.length - 1));
      }, 70);
    } else {
      timer = window.setTimeout(() => {
        setHintIndex((current) => (current + 1) % hintCommands.length);
        setIsDeletingHint(false);
      }, 260);
    }

    return () => window.clearTimeout(timer);
  }, [hintIndex, hintText, isDeletingHint]);

  const playCommandSound = () => {
    if (!enableSound) return;
    const audio = new Audio('/sounds/sound.ogg');
    audio.play().catch(() => undefined);
  };

  const runCommand = (rawCommand: string) => {
    const nextCommand = normalizeCommand(rawCommand);
    if (!nextCommand) return;

    playCommandSound();

    if (nextCommand === 'clear') {
      if (pendingTimerRef.current) window.clearTimeout(pendingTimerRef.current);
      setInput('');
      setStatusMessage('');
      setResponse(`Type one of: ${availableCommands}`);
      setIsError(false);
      return;
    }

    const selectedCommand = commandMap.get(nextCommand);

    if (!selectedCommand) {
      if (pendingTimerRef.current) window.clearTimeout(pendingTimerRef.current);
      const seconds = Math.floor(Math.random() * 3) + 1;
      setStatusMessage(`Searching for your data... ${seconds}s`);
      setResponse('');
      setIsError(false);
      setInput('');
      pendingTimerRef.current = window.setTimeout(() => {
        setStatusMessage('');
        setResponse(`404 Not Found : Seem nothing like '${rawCommand}', Try one of : ${availableCommands}`);
        setIsError(true);
      }, 1000);
      return;
    }

    if (pendingTimerRef.current) window.clearTimeout(pendingTimerRef.current);
    const seconds = Math.floor(Math.random() * 3) + 1;
    setStatusMessage(`Preflight checks running... ${seconds}s`);
    setResponse('');
    setIsError(false);
    setInput('');
    pendingTimerRef.current = window.setTimeout(() => {
      setInternalCommand(selectedCommand.command);
      setStatusMessage('');
      setResponse(selectedCommand.description);
      onCommandChange?.(selectedCommand.command);
    }, 1000);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(input);
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/15 bg-black/80 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-md',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-300" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          searching experience terminal
        </p>
      </div>

      <div className="space-y-4 p-4 font-mono text-sm md:p-6 md:text-base">
        <div className="flex flex-wrap gap-2">
          {commands.map((item) => {
            const isActive = resolvedActiveCommand?.command === item.command;
            return (
              <button
                key={item.command}
                type="button"
                title={item.description}
                onClick={() => runCommand(item.command)}
                className={cn(
                  'rounded-lg border px-3 py-2 text-xs font-semibold transition-colors md:text-sm',
                  isActive
                    ? 'border-cyan-400/70 bg-cyan-400/15 text-white'
                    : 'border-white/10 bg-white/[0.04] text-gray-300 hover:border-white/25 hover:bg-white/10 hover:text-white',
                )}
              >
                {item.label ?? item.command}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="flex min-w-0 items-baseline gap-2 leading-none">
          <span className="shrink-0 leading-none text-cyan-300">{username}</span>
          <span className="shrink-0 leading-none text-gray-500">:~$</span>
          <div
            className="relative min-w-0 flex-1 cursor-text leading-none"
            onClick={() => inputRef.current?.focus()}
          >
            {input ? (
              <span className="inline-flex min-w-0 items-center leading-none">
                <span className="break-all leading-none text-white">{input}</span>
                <span className="terminal-cursor ml-1 inline-block h-[1.32em] w-[0.65em] bg-gray-300" />
              </span>
            ) : (
              <span className="inline-flex min-w-0 items-center gap-1 leading-none text-gray-600">
                <span className="terminal-cursor inline-block h-[1.32em] w-[0.65em] bg-gray-300" />
                <span className="leading-none">{hintText}</span>
              </span>
            )}
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="absolute inset-0 h-full w-full bg-transparent text-transparent caret-transparent outline-none"
              spellCheck={false}
              aria-label="Experience command"
            />
          </div>
        </form>

        {statusMessage && <p className="leading-relaxed text-gray-500">{statusMessage}</p>}

        {response && (
          <p className={cn('leading-relaxed', isError ? 'text-red-300' : 'text-gray-300')}>
            <span className={cn('mr-2', isError ? 'text-red-400' : 'text-cyan-300')}>
              {isError ? 'x' : 'ok'}
            </span>
            {response}
          </p>
        )}
      </div>
    </div>
  );
}
