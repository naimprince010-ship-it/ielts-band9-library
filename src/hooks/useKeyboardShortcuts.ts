import { useEffect, useCallback } from 'react';

interface KeyboardShortcutOptions {
  key: string;
  callback: () => void;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  enabled?: boolean;
}

export function useKeyboardShortcut(options: KeyboardShortcutOptions) {
  const { key, callback, ctrl = false, shift = false, alt = false, enabled = true } = options;

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;
    
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    const keyMatch = event.key.toLowerCase() === key.toLowerCase();
    const ctrlMatch = ctrl ? (event.ctrlKey || event.metaKey) : true;
    const shiftMatch = shift ? event.shiftKey : true;
    const altMatch = alt ? event.altKey : true;

    if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
      event.preventDefault();
      callback();
    }
  }, [key, callback, ctrl, shift, alt, enabled]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

export function useMultipleKeyboardShortcuts(shortcuts: KeyboardShortcutOptions[]) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    for (const shortcut of shortcuts) {
      if (!shortcut.enabled) continue;

      const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
      const ctrlMatch = shortcut.ctrl ? (event.ctrlKey || event.metaKey) : !event.ctrlKey && !event.metaKey;
      const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
      const altMatch = shortcut.alt ? event.altKey : !event.altKey;

      if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
        event.preventDefault();
        shortcut.callback();
        break;
      }
    }
  }, [shortcuts]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

export function useQuizKeyboardShortcuts(options: {
  onSelectOption?: (index: number) => void;
  onSubmit?: () => void;
  onNext?: () => void;
  onHint?: () => void;
  optionCount?: number;
  enabled?: boolean;
}) {
  const { onSelectOption, onSubmit, onNext, onHint, optionCount = 4, enabled = true } = options;

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      if (event.key === 'Enter' && onSubmit) {
        event.preventDefault();
        onSubmit();
      }
      return;
    }

    if (event.key >= '1' && event.key <= String(optionCount) && onSelectOption) {
      event.preventDefault();
      onSelectOption(parseInt(event.key) - 1);
    }

    if (event.key === 'Enter' && onNext) {
      event.preventDefault();
      onNext();
    }

    if ((event.key === 'h' || event.key === 'H') && onHint) {
      event.preventDefault();
      onHint();
    }
  }, [onSelectOption, onSubmit, onNext, onHint, optionCount, enabled]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
