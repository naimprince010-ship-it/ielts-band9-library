import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'ielts_last_visited';

interface LastVisitedData {
  lessonSlug?: string;
  lessonTitle?: string;
  lessonType?: string;
  quizId?: string;
  quizTitle?: string;
  collectionId?: string;
  collectionTitle?: string;
  timestamp: number;
}

export function useLastVisited() {
  const [lastVisited, setLastVisited] = useState<LastVisitedData | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored) as LastVisitedData;
        const hoursSinceVisit = (Date.now() - data.timestamp) / (1000 * 60 * 60);
        if (hoursSinceVisit < 24) {
          setLastVisited(data);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (e) {
      console.error('Error loading last visited:', e);
    }
  }, []);

  const saveLesson = useCallback((slug: string, title: string, type: string) => {
    const data: LastVisitedData = {
      lessonSlug: slug,
      lessonTitle: title,
      lessonType: type,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setLastVisited(data);
  }, []);

  const saveQuiz = useCallback((quizId: string, title: string) => {
    const data: LastVisitedData = {
      quizId,
      quizTitle: title,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setLastVisited(data);
  }, []);

  const saveCollection = useCallback((collectionId: string, title: string) => {
    const data: LastVisitedData = {
      collectionId,
      collectionTitle: title,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setLastVisited(data);
  }, []);

  const clearLastVisited = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setLastVisited(null);
  }, []);

  const getLastVisitedUrl = useCallback(() => {
    if (!lastVisited) return null;
    if (lastVisited.lessonSlug) return `/lesson/${lastVisited.lessonSlug}`;
    if (lastVisited.quizId) return `/quiz/${lastVisited.quizId}`;
    if (lastVisited.collectionId) return `/collections/${lastVisited.collectionId}`;
    return null;
  }, [lastVisited]);

  const getLastVisitedLabel = useCallback(() => {
    if (!lastVisited) return null;
    if (lastVisited.lessonTitle) return lastVisited.lessonTitle;
    if (lastVisited.quizTitle) return lastVisited.quizTitle;
    if (lastVisited.collectionTitle) return lastVisited.collectionTitle;
    return null;
  }, [lastVisited]);

  return {
    lastVisited,
    saveLesson,
    saveQuiz,
    saveCollection,
    clearLastVisited,
    getLastVisitedUrl,
    getLastVisitedLabel,
  };
}

const SCROLL_POSITION_KEY = 'ielts_scroll_positions';

export function useScrollPosition(pageKey: string) {
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SCROLL_POSITION_KEY);
      if (stored) {
        const positions = JSON.parse(stored);
        if (positions[pageKey]) {
          setTimeout(() => {
            window.scrollTo(0, positions[pageKey]);
          }, 100);
        }
      }
    } catch (e) {
      console.error('Error restoring scroll position:', e);
    }
  }, [pageKey]);

  useEffect(() => {
    const saveScrollPosition = () => {
      try {
        const stored = localStorage.getItem(SCROLL_POSITION_KEY);
        const positions = stored ? JSON.parse(stored) : {};
        positions[pageKey] = window.scrollY;
        localStorage.setItem(SCROLL_POSITION_KEY, JSON.stringify(positions));
      } catch (e) {
        console.error('Error saving scroll position:', e);
      }
    };

    window.addEventListener('beforeunload', saveScrollPosition);
    return () => {
      saveScrollPosition();
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, [pageKey]);
}
