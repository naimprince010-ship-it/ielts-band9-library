import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

/**
 * The four ways the app's chrome (Navbar / Footer / MobileNav) needs to
 * behave depending on what the person is doing:
 *
 * - 'browse'  — full chrome. Home, library pages, static pages. The default.
 * - 'focused' — Navbar stays (so people can still get around) but the
 *               Footer disappears — dashboards, quiz, practice hub, etc.
 * - 'exam'    — fully immersive, no Navbar/Footer/MobileNav at all — sectional
 *               tests, the full mock test, anywhere a stray nav click would
 *               blow up someone's attempt.
 * - 'tool'    — same chrome footprint as 'focused' today, reserved for
 *               utility pages (Flashcards, Writing Checker, Typing Practice)
 *               that will later render their own toolbar in the Navbar's
 *               center/action slots instead of the generic nav links.
 */
export type NavMode = 'browse' | 'focused' | 'exam' | 'tool';

export interface NavConfig {
  mode: NavMode;
  /** Short label a mode-aware Navbar can show in place of the logo/links, e.g. "Reading — Passage 2 of 3". */
  title?: string;
  /** Arbitrary content for the Navbar's center slot — a timer, a progress bar, a question navigator. */
  centerContent?: ReactNode;
  /** Right-aligned contextual buttons for the Navbar's action slot — Save Draft, Submit, Exit, etc. */
  actions?: ReactNode;
  /** Exam mode: called before a navigation away from the page is allowed to proceed; return false to block it. */
  onExitAttempt?: () => boolean;
  /**
   * Opts a 'focused' page into an entirely different chrome skin instead of
   * the standard Navbar — currently just the hand-authored Deep Vocabulary
   * Lesson experience, which keeps its own dark StudentAppHeader rather than
   * the light Navbar every other page uses. Leave unset for the default.
   */
  headerVariant?: 'default' | 'studentApp';
}

const DEFAULT_NAV_CONFIG: NavConfig = { mode: 'browse' };

interface NavContextValue {
  navConfig: NavConfig;
  setNavConfig: (config: NavConfig) => void;
  resetNavConfig: () => void;
}

const NavContext = createContext<NavContextValue | undefined>(undefined);

export function NavProvider({ children }: { children: ReactNode }) {
  const [navConfig, setNavConfigState] = useState<NavConfig>(DEFAULT_NAV_CONFIG);

  const setNavConfig = useCallback((config: NavConfig) => {
    setNavConfigState(config);
  }, []);

  const resetNavConfig = useCallback(() => {
    setNavConfigState(DEFAULT_NAV_CONFIG);
  }, []);

  const value = useMemo<NavContextValue>(
    () => ({ navConfig, setNavConfig, resetNavConfig }),
    [navConfig, setNavConfig, resetNavConfig]
  );

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNavContext() {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error('useNavContext must be used within a NavProvider');
  }
  return context;
}

/**
 * Lets a page declare (and, when it unmounts, automatically retract) its own
 * nav behaviour — richer than the base mode a route sets on <Layout mode=…>.
 * Call once near the top of a page component:
 *
 *   useNavConfig({ mode: 'exam', title: 'Reading — Passage 2 of 3', actions: <SubmitButton /> });
 *
 * This always wins over the mode a route passes to <Layout>, on both mount
 * and unmount ordering — see the comment on Layout's useLayoutEffect for why.
 *
 * The effect depends on every field of `config`, so if `actions` (or
 * `centerContent`/`onExitAttempt`) needs to reflect live state — e.g. a
 * Bookmark button that should flip appearance the instant a lesson is
 * bookmarked — the effect re-fires and republishes automatically. The
 * tradeoff: a fresh object literal with a fresh JSX node inside it (like
 * `actions: <button onClick={...}>...</button>`) is a new reference on
 * every render, so this will re-fire on every render of the calling page
 * unless that node is memoized. For anything non-static, wrap the dynamic
 * fields in useMemo keyed on the values they actually depend on:
 *
 *   const actions = useMemo(() => <BookmarkButton ... />, [isBookmarked]);
 *   useNavConfig({ mode: 'focused', title: lesson.title, actions });
 *
 * For a fully static config (just `{ mode: 'focused' }`, the common case),
 * no memoization is needed — mode/title rarely change identity in a way
 * that matters, and re-running this effect is cheap regardless.
 */
export function useNavConfig(config: NavConfig) {
  const { setNavConfig, resetNavConfig } = useNavContext();

  useEffect(() => {
    setNavConfig(config);
    return () => resetNavConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.mode, config.title, config.centerContent, config.actions, config.onExitAttempt, config.headerVariant, setNavConfig, resetNavConfig]);
}

/**
 * Enforces `onExitAttempt` at the browser level. Called once from Layout
 * (not from individual pages) so any page that sets `onExitAttempt` via
 * useNavConfig gets this automatically, without remembering to wire it up
 * itself.
 *
 * This project routes with plain <BrowserRouter>, not a data router, so
 * React Router's useBlocker (which only works with createBrowserRouter /
 * RouterProvider) isn't available here. This is the manual equivalent,
 * covering the two ways someone can leave a page that useBlocker would
 * normally catch:
 *
 *  - beforeunload — tab close, refresh, typing a new address, closing the
 *    window. Browsers ignore any custom message and show their own generic
 *    "leave site?" dialog; setting returnValue is just what triggers it.
 *  - popstate — the browser/in-app Back and Forward buttons. Not covered
 *    by beforeunload at all. Handled by pushing one extra "sentinel"
 *    history entry the moment the guard arms; pressing Back consumes that
 *    entry (so the URL doesn't actually change yet) and fires popstate,
 *    which is intercepted here to ask onExitAttempt(). Answering yes calls
 *    history.back() again to actually leave; answering no re-arms the
 *    sentinel so the next Back press is caught the same way.
 *
 * Deliberately does NOT intercept clicks on in-app <Link>/navigate() calls
 * — with a declarative router there's no central place to catch those
 * short of wrapping every navigation call site. In practice this is a
 * smaller gap than it sounds: exam-mode pages render with Navbar/Footer/
 * MobileNav removed (see Layout), so there are normally no in-app links
 * available to click away from an active exam in the first place.
 */
export function useNavExitGuard(onExitAttempt: (() => boolean) | undefined) {
  useEffect(() => {
    if (!onExitAttempt) return;

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);

    window.history.pushState({ __navExitGuard: true }, '', window.location.href);

    const onPopState = () => {
      if (onExitAttempt()) {
        window.removeEventListener('popstate', onPopState);
        window.removeEventListener('beforeunload', onBeforeUnload);
        window.history.back();
      } else {
        window.history.pushState({ __navExitGuard: true }, '', window.location.href);
      }
    };
    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
      window.removeEventListener('popstate', onPopState);
    };
  }, [onExitAttempt]);
}
