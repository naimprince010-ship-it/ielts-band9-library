import { Lesson } from '@/types';
import { Quiz, QuizQuestion } from './quizData';

function generateQuestionsFromLesson(lesson: Lesson): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const content = lesson.content;
  
  if (!content) return questions;

  // Generate questions from collocations
  if (content.collocations && content.collocations.length > 0) {
    content.collocations.forEach((collocation, index) => {
      const words = collocation.split(' ');
      if (words.length >= 2) {
        // Create fill-in-the-blank by removing one word
        const blankIndex = Math.floor(Math.random() * words.length);
        const answer = words[blankIndex];
        const sentenceWords = [...words];
        sentenceWords[blankIndex] = '_____';
        const sentence = `Complete the collocation: "${sentenceWords.join(' ')}"`;
        
        questions.push({
          id: `${lesson.id}-col-${index}`,
          sentence,
          blank: '_____',
          answer,
          hint: `This is a common IELTS collocation related to ${lesson.topic}`,
          explanation: `"${collocation}" is a natural collocation frequently used in academic English.`,
          category: 'vocabulary',
          topic: lesson.topic || 'General',
          difficulty: lesson.level === 'beginner' ? 'beginner' : lesson.level === 'advanced' ? 'advanced' : 'intermediate'
        });
      }
    });
  }

  // Generate questions from examples
  if (content.examples && content.examples.length > 0) {
    content.examples.slice(0, 5).forEach((example, index) => {
      // Find a key word to blank out (usually a sophisticated word)
      const sentence = example.sentence;
      const words = sentence.split(/\s+/);
      
      // Look for words that are likely vocabulary targets (longer words, not common)
      const commonWords = ['the', 'a', 'an', 'is', 'are', 'was', 'were', 'has', 'have', 'had', 'to', 'of', 'in', 'on', 'for', 'and', 'or', 'but', 'that', 'this', 'with', 'as', 'by', 'at', 'from', 'be', 'been', 'being', 'can', 'could', 'would', 'should', 'will', 'may', 'might', 'must', 'it', 'its', 'they', 'their', 'them', 'we', 'our', 'you', 'your', 'he', 'she', 'his', 'her', 'not', 'more', 'most', 'such', 'than', 'also', 'very', 'just', 'only', 'even', 'so', 'if', 'when', 'where', 'which', 'who', 'what', 'how', 'why', 'all', 'each', 'every', 'both', 'few', 'many', 'much', 'some', 'any', 'no', 'other', 'new', 'old', 'first', 'last', 'long', 'great', 'little', 'own', 'same', 'right', 'big', 'high', 'different', 'small', 'large', 'next', 'early', 'young', 'important', 'public', 'good', 'bad'];
      
      const targetWords = words.filter(w => {
        const cleanWord = w.replace(/[.,!?;:'"()]/g, '').toLowerCase();
        return cleanWord.length > 5 && !commonWords.includes(cleanWord);
      });
      
      if (targetWords.length > 0) {
        const targetWord = targetWords[0];
        const cleanTarget = targetWord.replace(/[.,!?;:'"()]/g, '');
        const blankSentence = sentence.replace(targetWord, '_____');
        
        questions.push({
          id: `${lesson.id}-ex-${index}`,
          sentence: blankSentence,
          blank: '_____',
          answer: cleanTarget,
          hint: example.explanation ? example.explanation.substring(0, 50) + '...' : `Related to ${lesson.topic}`,
          explanation: example.explanation || `This word is commonly used in ${lesson.topic} contexts.`,
          category: 'vocabulary',
          topic: lesson.topic || 'General',
          difficulty: lesson.level === 'beginner' ? 'beginner' : lesson.level === 'advanced' ? 'advanced' : 'intermediate'
        });
      }
    });
  }

  // Generate questions from synonyms
  if (content.synonyms && content.synonyms.length > 0) {
    content.synonyms.forEach((synGroup, index) => {
      if (synGroup.synonyms && synGroup.synonyms.length > 0) {
        const randomSynonym = synGroup.synonyms[Math.floor(Math.random() * synGroup.synonyms.length)];
        questions.push({
          id: `${lesson.id}-syn-${index}`,
          sentence: `What is a Band 9 synonym for "${synGroup.word}"? (Answer: ${randomSynonym.split(',')[0]})`,
          blank: '_____',
          answer: randomSynonym.split(',')[0].trim(),
          hint: `Think of a more sophisticated alternative to "${synGroup.word}"`,
          explanation: `"${randomSynonym}" is a more sophisticated alternative to "${synGroup.word}" for Band 7+ writing.`,
          category: 'vocabulary',
          topic: lesson.topic || 'General',
          difficulty: 'intermediate'
        });
      }
    });
  }

  return questions;
}

export function generateQuizFromLesson(lesson: Lesson): Quiz | null {
  if (lesson.type !== 'vocabulary') return null;
  
  const questions = generateQuestionsFromLesson(lesson);
  
  if (questions.length < 3) return null;
  
  // Limit to 10 questions per quiz
  const selectedQuestions = questions.slice(0, 10);
  
  return {
    id: `auto-${lesson.id}`,
    title: `${lesson.title} Quiz`,
    description: `Test your knowledge of vocabulary from: ${lesson.title}`,
    category: 'vocabulary',
    topic: lesson.topic || 'General',
    difficulty: lesson.level === 'beginner' ? 'beginner' : lesson.level === 'advanced' ? 'advanced' : 'intermediate',
    timeLimit: 300, // 5 minutes
    questions: selectedQuestions,
    is_premium: lesson.is_premium || false
  };
}

export function generateAllVocabularyQuizzes(lessons: Lesson[]): Quiz[] {
  const quizzes: Quiz[] = [];
  
  lessons.forEach(lesson => {
    if (lesson.type === 'vocabulary' && lesson.is_published) {
      const quiz = generateQuizFromLesson(lesson);
      if (quiz && quiz.questions.length >= 3) {
        quizzes.push(quiz);
      }
    }
  });
  
  return quizzes;
}

// Generate topic-based quizzes by combining questions from multiple lessons
export function generateTopicQuiz(lessons: Lesson[], topic: string): Quiz | null {
  const topicLessons = lessons.filter(l => 
    l.type === 'vocabulary' && 
    l.topic === topic && 
    l.is_published
  );
  
  if (topicLessons.length === 0) return null;
  
  const allQuestions: QuizQuestion[] = [];
  
  topicLessons.forEach(lesson => {
    const questions = generateQuestionsFromLesson(lesson);
    allQuestions.push(...questions);
  });
  
  if (allQuestions.length < 5) return null;
  
  // Shuffle and select 10-15 questions
  const shuffled = allQuestions.sort(() => Math.random() - 0.5);
  const selectedQuestions = shuffled.slice(0, Math.min(15, shuffled.length));
  
  // Determine if premium based on majority of lessons
  const premiumCount = topicLessons.filter(l => l.is_premium).length;
  const isPremium = premiumCount > topicLessons.length / 2;
  
  return {
    id: `topic-${topic.toLowerCase().replace(/\s+/g, '-')}`,
    title: `${topic} Vocabulary Quiz`,
    description: `Comprehensive quiz covering all ${topic} vocabulary lessons`,
    category: 'vocabulary',
    topic,
    difficulty: 'intermediate',
    timeLimit: 450, // 7.5 minutes for topic quizzes
    questions: selectedQuestions,
    is_premium: isPremium
  };
}
