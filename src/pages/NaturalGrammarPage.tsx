import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Volume2, 
  VolumeX,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  RefreshCw,
  Lightbulb,
  Eye,
  Sparkles,
  MessageCircle,
  Target,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  NaturalLesson, 
  StoryContext, 
  Annotation,
  ANNOTATION_COLORS,
  AnnotationKind,
  NaturalFeedback
} from '@/types';

// Sample Natural Approach Lesson Data
const SAMPLE_NATURAL_LESSONS: NaturalLesson[] = [
  // Lesson 1: My Daily Routine - Present Simple Tense
  {
    id: 'natural-present-simple',
    title: 'My Daily Routine',
    slug: 'my-daily-routine',
    description: 'Learn Present Simple tense naturally through everyday routines and habits.',
    level: 'beginner',
    topic: 'Present Simple Tense',
    targetPattern: 'Subject + V1 (base form / -s/-es for he/she/it)',
    is_premium: false,
    estimated_time: 12,
    contexts: [
      {
        id: 'routine-story-1',
        title: 'Maria\'s Morning',
        text: 'Maria wakes up at 6:30 every morning. She brushes her teeth and takes a quick shower. Then she makes breakfast for her family. Her husband drinks coffee while she prefers tea. Their children eat cereal and fruit. Maria works at a hospital, so she leaves home at 7:45. She drives to work and arrives before 8:30. She loves her job because she helps people every day.',
        annotations: [
          { start: 6, end: 11, kind: 'verb', label: 'present simple (wake)', targetId: 'wakes-1', tooltip: 'wakes = wake + s (for she)' },
          { start: 44, end: 51, kind: 'verb', label: 'present simple (brush)', targetId: 'brushes-1', tooltip: 'brushes = brush + es (for she)' },
          { start: 67, end: 72, kind: 'verb', label: 'present simple (take)', targetId: 'takes-1', tooltip: 'takes = take + s (for she)' },
          { start: 96, end: 101, kind: 'verb', label: 'present simple (make)', targetId: 'makes-1', tooltip: 'makes = make + s (for she)' },
          { start: 136, end: 142, kind: 'verb', label: 'present simple (drink)', targetId: 'drinks-1', tooltip: 'drinks = drink + s (for he)' },
          { start: 159, end: 166, kind: 'verb', label: 'present simple (prefer)', targetId: 'prefers-1', tooltip: 'prefers = prefer + s (for she)' },
          { start: 188, end: 191, kind: 'verb', label: 'present simple (eat)', targetId: 'eat-1', tooltip: 'eat = base form (for they)' },
          { start: 218, end: 223, kind: 'verb', label: 'present simple (work)', targetId: 'works-1', tooltip: 'works = work + s (for she)' },
          { start: 252, end: 258, kind: 'verb', label: 'present simple (leave)', targetId: 'leaves-1', tooltip: 'leaves = leave + s (for she)' },
          { start: 278, end: 284, kind: 'verb', label: 'present simple (drive)', targetId: 'drives-1', tooltip: 'drives = drive + s (for she)' },
          { start: 297, end: 304, kind: 'verb', label: 'present simple (arrive)', targetId: 'arrives-1', tooltip: 'arrives = arrive + s (for she)' },
          { start: 320, end: 325, kind: 'verb', label: 'present simple (love)', targetId: 'loves-1', tooltip: 'loves = love + s (for she)' },
          { start: 346, end: 351, kind: 'verb', label: 'present simple (help)', targetId: 'helps-1', tooltip: 'helps = help + s (for she)' },
          { start: 17, end: 29, kind: 'chunk', label: 'time expression', targetId: 'every-morning', tooltip: 'Time expressions like "every morning" signal habits' }
        ],
        audioUrl: undefined
      }
    ],
    exercises: [
      {
        id: 'ps-ex-1',
        type: 'pattern-recognition',
        contextId: 'routine-story-1',
        prompt: 'Find all the verbs that end with "-s" or "-es". These show actions for he/she/it.',
        interaction: 'select-highlight',
        correctTargets: ['wakes-1', 'brushes-1', 'takes-1', 'makes-1', 'drinks-1', 'prefers-1', 'works-1', 'leaves-1', 'drives-1', 'arrives-1', 'loves-1', 'helps-1'],
        hint: 'Look for verbs that describe what Maria or her husband does',
        successMessage: 'Excellent! In Present Simple, we add -s/-es for he/she/it!'
      },
      {
        id: 'ps-ex-2',
        type: 'fill-blank',
        contextId: 'routine-story-1',
        prompt: 'Complete: My brother _____ to school every day. (go)',
        interaction: 'short-answer',
        correctAnswer: 'goes',
        acceptedAnswers: ['goes'],
        recastExamples: [
          { commonWrong: 'go', recast: 'Almost! For he/she/it, we add -es to "go". Native speakers say: "My brother goes to school."' },
          { commonWrong: 'gos', recast: 'Close! "Go" is special - we add -es, not just -s: "goes"' }
        ],
        hint: 'Remember: go + es = goes (for he/she/it)',
        successMessage: 'Perfect! "Goes" is correct for he/she/it.'
      },
      {
        id: 'ps-ex-3',
        type: 'mcq',
        contextId: 'routine-story-1',
        prompt: 'Which sentence is correct?',
        interaction: 'mcq',
        options: ['She drink coffee every morning.', 'She drinks coffee every morning.', 'She drinking coffee every morning.', 'She drinkes coffee every morning.'],
        correctAnswer: 'She drinks coffee every morning.',
        hint: 'For she/he/it, add -s to the verb',
        successMessage: 'Right! "She drinks" is the correct Present Simple form.'
      },
      {
        id: 'ps-ex-4',
        type: 'fill-blank',
        contextId: 'routine-story-1',
        prompt: 'Complete: They _____ breakfast at 7 AM. (eat)',
        interaction: 'short-answer',
        correctAnswer: 'eat',
        acceptedAnswers: ['eat'],
        recastExamples: [
          { commonWrong: 'eats', recast: 'Almost! "They" is plural, so we use the base form. Native speakers say: "They eat breakfast."' },
          { commonWrong: 'eating', recast: 'Good try! But for habits, we use Present Simple (not -ing). Say: "They eat breakfast."' }
        ],
        hint: 'For I/you/we/they, use the base form (no -s)',
        successMessage: 'Correct! "They eat" uses the base form.'
      }
    ],
    chunks: ['every morning', 'every day', 'wakes up', 'goes to'],
    quickRecap: 'Present Simple shows habits and routines. Add -s/-es for he/she/it (she works, he goes). Use base form for I/you/we/they (they work, I go). Time expressions like "every day" signal Present Simple.'
  },

  // Lesson 2: Last Weekend's Trip - Past Simple Tense
  {
    id: 'natural-past-simple',
    title: 'Last Weekend\'s Trip',
    slug: 'last-weekends-trip',
    description: 'Learn Past Simple tense naturally through a story about a weekend adventure.',
    level: 'beginner',
    topic: 'Past Simple Tense',
    targetPattern: 'V2 forms (went, saw, visited, etc.)',
    is_premium: false,
    estimated_time: 15,
    contexts: [
      {
        id: 'past-story-1',
        title: 'A Trip to the Mountains',
        text: 'Last weekend, my family went to the mountains. We left home early and drove for three hours. The scenery was beautiful! We saw tall trees and a clear blue lake. My children played near the water while I took photos. We ate lunch at a small restaurant and tried local food. The owner was very friendly and told us about the area. We walked along a forest trail and discovered a hidden waterfall. Everyone felt amazed by its beauty. We returned home tired but happy.',
        annotations: [
          { start: 0, end: 12, kind: 'chunk', label: 'time expression', targetId: 'last-weekend-1', tooltip: 'Last weekend signals past tense' },
          { start: 24, end: 28, kind: 'verb', label: 'past tense (go)', targetId: 'went-1', tooltip: 'went = past of "go" (irregular)' },
          { start: 52, end: 56, kind: 'verb', label: 'past tense (leave)', targetId: 'left-1', tooltip: 'left = past of "leave" (irregular)' },
          { start: 72, end: 77, kind: 'verb', label: 'past tense (drive)', targetId: 'drove-1', tooltip: 'drove = past of "drive" (irregular)' },
          { start: 106, end: 109, kind: 'verb', label: 'past tense (be)', targetId: 'was-1', tooltip: 'was = past of "is" (irregular)' },
          { start: 124, end: 127, kind: 'verb', label: 'past tense (see)', targetId: 'saw-1', tooltip: 'saw = past of "see" (irregular)' },
          { start: 172, end: 178, kind: 'verb', label: 'past tense (play)', targetId: 'played-1', tooltip: 'played = past of "play" (regular: +ed)' },
          { start: 204, end: 208, kind: 'verb', label: 'past tense (take)', targetId: 'took-1', tooltip: 'took = past of "take" (irregular)' },
          { start: 220, end: 223, kind: 'verb', label: 'past tense (eat)', targetId: 'ate-1', tooltip: 'ate = past of "eat" (irregular)' },
          { start: 260, end: 265, kind: 'verb', label: 'past tense (try)', targetId: 'tried-1', tooltip: 'tried = past of "try" (regular: y→ied)' },
          { start: 288, end: 291, kind: 'verb', label: 'past tense (be)', targetId: 'was-2', tooltip: 'was = past of "is" (irregular)' },
          { start: 313, end: 317, kind: 'verb', label: 'past tense (tell)', targetId: 'told-1', tooltip: 'told = past of "tell" (irregular)' },
          { start: 347, end: 353, kind: 'verb', label: 'past tense (walk)', targetId: 'walked-1', tooltip: 'walked = past of "walk" (regular: +ed)' },
          { start: 382, end: 392, kind: 'verb', label: 'past tense (discover)', targetId: 'discovered-1', tooltip: 'discovered = past of "discover" (regular: +ed)' },
          { start: 427, end: 431, kind: 'verb', label: 'past tense (feel)', targetId: 'felt-1', tooltip: 'felt = past of "feel" (irregular)' },
          { start: 462, end: 470, kind: 'verb', label: 'past tense (return)', targetId: 'returned-1', tooltip: 'returned = past of "return" (regular: +ed)' }
        ],
        audioUrl: undefined
      }
    ],
    exercises: [
      {
        id: 'past-ex-1',
        type: 'pattern-recognition',
        contextId: 'past-story-1',
        prompt: 'Find the irregular past tense verbs (verbs that DON\'T end in -ed).',
        interaction: 'select-highlight',
        correctTargets: ['went-1', 'left-1', 'drove-1', 'was-1', 'saw-1', 'took-1', 'ate-1', 'was-2', 'told-1', 'felt-1'],
        hint: 'Irregular verbs change their form completely (go→went, see→saw)',
        successMessage: 'Great! These irregular verbs don\'t follow the -ed pattern.'
      },
      {
        id: 'past-ex-2',
        type: 'pattern-recognition',
        contextId: 'past-story-1',
        prompt: 'Now find the regular past tense verbs (verbs that end in -ed).',
        interaction: 'select-highlight',
        correctTargets: ['played-1', 'tried-1', 'walked-1', 'discovered-1', 'returned-1'],
        hint: 'Regular verbs add -ed to make past tense',
        successMessage: 'Excellent! Regular verbs simply add -ed.'
      },
      {
        id: 'past-ex-3',
        type: 'fill-blank',
        contextId: 'past-story-1',
        prompt: 'Complete: Yesterday, I _____ a beautiful sunset. (see)',
        interaction: 'short-answer',
        correctAnswer: 'saw',
        acceptedAnswers: ['saw'],
        recastExamples: [
          { commonWrong: 'seed', recast: 'Almost! "See" is irregular. Native speakers say: "I saw a sunset." (see→saw)' },
          { commonWrong: 'seen', recast: 'Close! "Seen" is the past participle. For simple past: "I saw a sunset."' },
          { commonWrong: 'see', recast: 'Good try! We need past tense. Native speakers say: "I saw" for yesterday.' }
        ],
        hint: 'Think about how the family "saw" things in the story...',
        successMessage: 'Perfect! "Saw" is the past tense of "see".'
      },
      {
        id: 'past-ex-4',
        type: 'fill-blank',
        contextId: 'past-story-1',
        prompt: 'Complete: We _____ delicious food at the restaurant. (eat)',
        interaction: 'short-answer',
        correctAnswer: 'ate',
        acceptedAnswers: ['ate'],
        recastExamples: [
          { commonWrong: 'eated', recast: 'Almost! "Eat" is irregular. Native speakers say: "We ate food." (eat→ate)' },
          { commonWrong: 'eaten', recast: 'Close! "Eaten" is the past participle. For simple past: "We ate food."' }
        ],
        hint: 'This is an irregular verb - it changes completely',
        successMessage: 'Correct! "Ate" is the past tense of "eat".'
      },
      {
        id: 'past-ex-5',
        type: 'mcq',
        contextId: 'past-story-1',
        prompt: 'Which sentence uses the correct past tense?',
        interaction: 'mcq',
        options: ['We goed to the beach.', 'We went to the beach.', 'We wented to the beach.', 'We go to the beach yesterday.'],
        correctAnswer: 'We went to the beach.',
        hint: '"Go" is an irregular verb',
        successMessage: 'Right! "Went" is the correct past tense of "go".'
      }
    ],
    chunks: ['last weekend', 'went to', 'drove for', 'walked along'],
    quickRecap: 'Past Simple tells completed actions. Regular verbs add -ed (walked, played). Irregular verbs change form (go→went, see→saw, eat→ate). Time expressions like "last weekend" and "yesterday" signal past tense.'
  },

  // Lesson 3: Planning a Birthday - Future Tense
  {
    id: 'natural-future',
    title: 'Planning a Birthday',
    slug: 'planning-a-birthday',
    description: 'Learn Future tense naturally through planning a birthday party.',
    level: 'beginner',
    topic: 'Future Tense',
    targetPattern: 'will + V1 / be going to + V1',
    is_premium: false,
    estimated_time: 14,
    contexts: [
      {
        id: 'future-story-1',
        title: 'Sara\'s Birthday Plans',
        text: 'Next Saturday is Sara\'s birthday. She is going to have a big party at her house. Her mother will bake a chocolate cake, and her father is going to decorate the garden. Sara will invite all her friends from school. They are going to play games and dance to music. Her grandmother will bring a special gift from abroad. Sara thinks it is going to be the best birthday ever! After the party, the family will watch fireworks together.',
        annotations: [
          { start: 0, end: 13, kind: 'chunk', label: 'future time', targetId: 'next-saturday', tooltip: 'Next Saturday signals future' },
          { start: 40, end: 54, kind: 'verb', label: 'going to (plan)', targetId: 'going-to-have', tooltip: 'is going to have = planned future' },
          { start: 98, end: 107, kind: 'verb', label: 'will (future)', targetId: 'will-bake', tooltip: 'will bake = future action' },
          { start: 145, end: 162, kind: 'verb', label: 'going to (plan)', targetId: 'going-to-decorate', tooltip: 'is going to decorate = planned future' },
          { start: 180, end: 191, kind: 'verb', label: 'will (future)', targetId: 'will-invite', tooltip: 'will invite = future action' },
          { start: 228, end: 244, kind: 'verb', label: 'going to (plan)', targetId: 'going-to-play', tooltip: 'are going to play = planned future' },
          { start: 283, end: 293, kind: 'verb', label: 'will (future)', targetId: 'will-bring', tooltip: 'will bring = future action' },
          { start: 340, end: 353, kind: 'verb', label: 'going to (prediction)', targetId: 'going-to-be', tooltip: 'is going to be = prediction based on evidence' },
          { start: 400, end: 410, kind: 'verb', label: 'will (future)', targetId: 'will-watch', tooltip: 'will watch = future action' }
        ],
        audioUrl: undefined
      }
    ],
    exercises: [
      {
        id: 'fut-ex-1',
        type: 'pattern-recognition',
        contextId: 'future-story-1',
        prompt: 'Find all the "will + verb" patterns in the story.',
        interaction: 'select-highlight',
        correctTargets: ['will-bake', 'will-invite', 'will-bring', 'will-watch'],
        hint: 'Look for "will" followed by a verb',
        successMessage: 'Great! "Will + verb" is used for future actions and promises.'
      },
      {
        id: 'fut-ex-2',
        type: 'pattern-recognition',
        contextId: 'future-story-1',
        prompt: 'Find all the "going to + verb" patterns.',
        interaction: 'select-highlight',
        correctTargets: ['going-to-have', 'going-to-decorate', 'going-to-play', 'going-to-be'],
        hint: 'Look for "is/are going to" followed by a verb',
        successMessage: 'Excellent! "Going to" is used for plans and predictions.'
      },
      {
        id: 'fut-ex-3',
        type: 'fill-blank',
        contextId: 'future-story-1',
        prompt: 'Complete: I _____ help you with the party tomorrow. (will)',
        interaction: 'short-answer',
        correctAnswer: 'will help',
        acceptedAnswers: ['will help', "'ll help"],
        recastExamples: [
          { commonWrong: 'will helping', recast: 'Almost! After "will", use the base form. Native speakers say: "I will help you."' },
          { commonWrong: 'will helps', recast: 'Close! After "will", no -s needed. Say: "I will help you."' }
        ],
        hint: 'Will + base form of the verb',
        successMessage: 'Perfect! "Will help" is correct for future.'
      },
      {
        id: 'fut-ex-4',
        type: 'fill-blank',
        contextId: 'future-story-1',
        prompt: 'Complete: They _____ visit us next week. (going to)',
        interaction: 'short-answer',
        correctAnswer: 'are going to visit',
        acceptedAnswers: ['are going to visit', "are gonna visit"],
        recastExamples: [
          { commonWrong: 'going to visit', recast: 'Almost! We need "are" before "going to". Say: "They are going to visit us."' },
          { commonWrong: 'is going to visit', recast: 'Close! "They" needs "are", not "is". Say: "They are going to visit us."' }
        ],
        hint: 'They + are + going to + verb',
        successMessage: 'Correct! "Are going to visit" shows a planned future action.'
      },
      {
        id: 'fut-ex-5',
        type: 'mcq',
        contextId: 'future-story-1',
        prompt: 'Which is correct for a sudden decision?',
        interaction: 'mcq',
        options: ['I am going to answer the phone.', 'I will answer the phone.', 'I going to answer the phone.', 'I am will answer the phone.'],
        correctAnswer: 'I will answer the phone.',
        hint: 'We use "will" for decisions made at the moment of speaking',
        successMessage: 'Right! "Will" is used for spontaneous decisions.'
      }
    ],
    chunks: ['next Saturday', 'is going to', 'are going to', 'will be'],
    quickRecap: 'Future tense uses "will + verb" for promises, offers, and spontaneous decisions. Use "be going to + verb" for plans and predictions based on evidence. Both talk about future events!'
  },

  // Lesson 4: Ordering at a Café - Modals for Politeness
  {
    id: 'natural-modals-polite',
    title: 'Ordering at a Café',
    slug: 'ordering-at-a-cafe',
    description: 'Learn polite expressions and modals naturally through café conversations.',
    level: 'beginner',
    topic: 'Modals for Politeness',
    targetPattern: 'Could you / Would you / I would like / May I',
    is_premium: false,
    estimated_time: 12,
    contexts: [
      {
        id: 'cafe-story-1',
        title: 'At the Coffee Shop',
        text: 'Customer: Good morning! Could I see the menu, please?\nWaiter: Of course! Here you are.\nCustomer: Thank you. I would like a cappuccino, please.\nWaiter: Would you like anything to eat?\nCustomer: Could you recommend something?\nWaiter: I would suggest our fresh croissants.\nCustomer: That sounds lovely. May I also have a glass of water?\nWaiter: Certainly! Would you prefer still or sparkling?\nCustomer: Still water would be fine, thank you.\nWaiter: I will bring your order shortly.',
        annotations: [
          { start: 26, end: 34, kind: 'pattern', label: 'polite request', targetId: 'could-i-1', tooltip: 'Could I = polite way to ask for something' },
          { start: 105, end: 117, kind: 'pattern', label: 'polite want', targetId: 'would-like-1', tooltip: 'I would like = polite way to say "I want"' },
          { start: 148, end: 162, kind: 'pattern', label: 'polite offer', targetId: 'would-you-like', tooltip: 'Would you like = polite offer' },
          { start: 189, end: 198, kind: 'pattern', label: 'polite request', targetId: 'could-you-1', tooltip: 'Could you = polite way to ask someone to do something' },
          { start: 226, end: 240, kind: 'pattern', label: 'polite suggestion', targetId: 'would-suggest', tooltip: 'I would suggest = polite recommendation' },
          { start: 283, end: 288, kind: 'pattern', label: 'polite permission', targetId: 'may-i-1', tooltip: 'May I = very polite way to ask permission' },
          { start: 338, end: 352, kind: 'pattern', label: 'polite question', targetId: 'would-you-prefer', tooltip: 'Would you prefer = polite way to offer choices' },
          { start: 370, end: 383, kind: 'chunk', label: 'polite response', targetId: 'would-be-fine', tooltip: 'would be fine = polite acceptance' }
        ],
        audioUrl: undefined
      }
    ],
    exercises: [
      {
        id: 'modal-ex-1',
        type: 'pattern-recognition',
        contextId: 'cafe-story-1',
        prompt: 'Find all the polite request patterns using "Could".',
        interaction: 'select-highlight',
        correctTargets: ['could-i-1', 'could-you-1'],
        hint: 'Look for "Could I" and "Could you"',
        successMessage: 'Great! "Could" makes requests more polite than "Can".'
      },
      {
        id: 'modal-ex-2',
        type: 'pattern-recognition',
        contextId: 'cafe-story-1',
        prompt: 'Find all the patterns using "Would".',
        interaction: 'select-highlight',
        correctTargets: ['would-like-1', 'would-you-like', 'would-suggest', 'would-you-prefer', 'would-be-fine'],
        hint: 'Look for "Would you", "I would like", etc.',
        successMessage: 'Excellent! "Would" is very common in polite English.'
      },
      {
        id: 'modal-ex-3',
        type: 'fill-blank',
        contextId: 'cafe-story-1',
        prompt: 'Complete politely: _____ I have a coffee, please? (request)',
        interaction: 'short-answer',
        correctAnswer: 'Could',
        acceptedAnswers: ['Could', 'May', 'Can'],
        recastExamples: [
          { commonWrong: 'Give me', recast: 'That sounds a bit direct! Native speakers say: "Could I have a coffee, please?" to be polite.' },
          { commonWrong: 'I want', recast: 'That\'s quite direct. Try: "Could I have..." or "I would like..." for politeness.' }
        ],
        hint: 'Use "Could" or "May" for polite requests',
        successMessage: 'Perfect! "Could I" is a polite way to make requests.'
      },
      {
        id: 'modal-ex-4',
        type: 'fill-blank',
        contextId: 'cafe-story-1',
        prompt: 'Complete politely: I _____ a sandwich, please. (want)',
        interaction: 'short-answer',
        correctAnswer: 'would like',
        acceptedAnswers: ['would like', "'d like"],
        recastExamples: [
          { commonWrong: 'want', recast: 'That works, but it\'s more polite to say: "I would like a sandwich, please."' },
          { commonWrong: 'would want', recast: 'Almost! We say "would like", not "would want". Try: "I would like a sandwich."' }
        ],
        hint: '"I would like" is more polite than "I want"',
        successMessage: 'Correct! "I would like" is the polite way to express wants.'
      },
      {
        id: 'modal-ex-5',
        type: 'mcq',
        contextId: 'cafe-story-1',
        prompt: 'Which is the MOST polite way to ask for help?',
        interaction: 'mcq',
        options: ['Help me with this.', 'Can you help me?', 'Could you help me, please?', 'You help me.'],
        correctAnswer: 'Could you help me, please?',
        hint: '"Could" + "please" = very polite',
        successMessage: 'Right! "Could you... please?" is very polite.'
      }
    ],
    chunks: ['Could I', 'Could you', 'I would like', 'Would you like', 'May I'],
    quickRecap: 'Polite English uses modals! "Could I/you" for requests, "I would like" instead of "I want", "May I" for formal permission, "Would you like" for offers. Always add "please" and "thank you"!'
  },

  // Lesson 5: Describing My Room - Prepositions of Place
  {
    id: 'natural-prepositions',
    title: 'Describing My Room',
    slug: 'describing-my-room',
    description: 'Learn prepositions of place naturally by describing rooms and locations.',
    level: 'beginner',
    topic: 'Prepositions of Place',
    targetPattern: 'in, on, under, next to, between, behind, in front of',
    is_premium: false,
    estimated_time: 13,
    contexts: [
      {
        id: 'room-story-1',
        title: 'My Cozy Bedroom',
        text: 'My bedroom is my favorite place in the house. There is a large bed in the middle of the room. On the bed, there are two soft pillows and a warm blanket. Next to the bed, there is a small wooden table with a lamp on it. My books are on the shelf above the desk. Under the desk, I keep my school bag. The wardrobe is in the corner, between the window and the door. Behind the door, there is a mirror. In front of the window, I have a comfortable chair where I like to read.',
        annotations: [
          { start: 40, end: 42, kind: 'pattern', label: 'preposition', targetId: 'in-1', tooltip: 'in = inside something' },
          { start: 72, end: 74, kind: 'pattern', label: 'preposition', targetId: 'in-2', tooltip: 'in = inside/within an area' },
          { start: 96, end: 98, kind: 'pattern', label: 'preposition', targetId: 'on-1', tooltip: 'on = on the surface of' },
          { start: 165, end: 172, kind: 'chunk', label: 'preposition phrase', targetId: 'next-to-1', tooltip: 'next to = beside, at the side of' },
          { start: 224, end: 226, kind: 'pattern', label: 'preposition', targetId: 'on-2', tooltip: 'on = on the surface of' },
          { start: 246, end: 248, kind: 'pattern', label: 'preposition', targetId: 'on-3', tooltip: 'on = on the surface of' },
          { start: 264, end: 269, kind: 'pattern', label: 'preposition', targetId: 'above-1', tooltip: 'above = higher than, over' },
          { start: 281, end: 286, kind: 'pattern', label: 'preposition', targetId: 'under-1', tooltip: 'under = below, beneath' },
          { start: 330, end: 332, kind: 'pattern', label: 'preposition', targetId: 'in-3', tooltip: 'in = inside an area' },
          { start: 345, end: 352, kind: 'chunk', label: 'preposition phrase', targetId: 'between-1', tooltip: 'between = in the middle of two things' },
          { start: 380, end: 386, kind: 'chunk', label: 'preposition phrase', targetId: 'behind-1', tooltip: 'behind = at the back of' },
          { start: 417, end: 428, kind: 'chunk', label: 'preposition phrase', targetId: 'in-front-of-1', tooltip: 'in front of = facing, before' }
        ],
        audioUrl: undefined
      }
    ],
    exercises: [
      {
        id: 'prep-ex-1',
        type: 'pattern-recognition',
        contextId: 'room-story-1',
        prompt: 'Find all uses of "in" in the story.',
        interaction: 'select-highlight',
        correctTargets: ['in-1', 'in-2', 'in-3'],
        hint: '"In" is used for enclosed spaces or areas',
        successMessage: 'Great! "In" shows something is inside or within an area.'
      },
      {
        id: 'prep-ex-2',
        type: 'pattern-recognition',
        contextId: 'room-story-1',
        prompt: 'Find all uses of "on" in the story.',
        interaction: 'select-highlight',
        correctTargets: ['on-1', 'on-2', 'on-3'],
        hint: '"On" is used for surfaces',
        successMessage: 'Excellent! "On" shows something is on a surface.'
      },
      {
        id: 'prep-ex-3',
        type: 'fill-blank',
        contextId: 'room-story-1',
        prompt: 'Complete: The cat is sleeping _____ the sofa. (surface)',
        interaction: 'short-answer',
        correctAnswer: 'on',
        acceptedAnswers: ['on'],
        recastExamples: [
          { commonWrong: 'in', recast: 'Almost! For surfaces, we use "on". Native speakers say: "The cat is on the sofa."' },
          { commonWrong: 'at', recast: 'Close! For surfaces like sofas, beds, tables, we use "on": "The cat is on the sofa."' }
        ],
        hint: 'The sofa is a surface - what preposition do we use?',
        successMessage: 'Perfect! "On" is used for surfaces.'
      },
      {
        id: 'prep-ex-4',
        type: 'fill-blank',
        contextId: 'room-story-1',
        prompt: 'Complete: The shoes are _____ the bed. (below)',
        interaction: 'short-answer',
        correctAnswer: 'under',
        acceptedAnswers: ['under', 'beneath', 'below'],
        recastExamples: [
          { commonWrong: 'down', recast: 'Almost! For position below something, we use "under". Say: "The shoes are under the bed."' },
          { commonWrong: 'in', recast: 'Not quite! "Under" means below. Say: "The shoes are under the bed."' }
        ],
        hint: 'What preposition means "below"?',
        successMessage: 'Correct! "Under" means below or beneath something.'
      },
      {
        id: 'prep-ex-5',
        type: 'mcq',
        contextId: 'room-story-1',
        prompt: 'The pharmacy is _____ the bank and the post office.',
        interaction: 'mcq',
        options: ['next to', 'between', 'behind', 'in front of'],
        correctAnswer: 'between',
        hint: 'It\'s in the middle of two places',
        successMessage: 'Right! "Between" is used when something is in the middle of two things.'
      },
      {
        id: 'prep-ex-6',
        type: 'fill-blank',
        contextId: 'room-story-1',
        prompt: 'Complete: The lamp is _____ the table. (beside)',
        interaction: 'short-answer',
        correctAnswer: 'next to',
        acceptedAnswers: ['next to', 'beside', 'by'],
        recastExamples: [
          { commonWrong: 'near to', recast: 'Almost! We say "next to" or "near" (without "to"). Try: "The lamp is next to the table."' },
          { commonWrong: 'besides', recast: 'Close! "Besides" means "in addition to". For location, use "beside" or "next to".' }
        ],
        hint: 'What phrase means "at the side of"?',
        successMessage: 'Perfect! "Next to" means beside or at the side of something.'
      }
    ],
    chunks: ['next to', 'in front of', 'in the middle of', 'on the shelf', 'under the desk'],
    quickRecap: 'Prepositions show location! "In" for enclosed spaces (in the room), "on" for surfaces (on the table), "under" for below, "next to" for beside, "between" for middle of two things, "behind" for back, "in front of" for facing.'
  }
];

// Component to render text with highlighted annotations
const HighlightedText: React.FC<{
  context: StoryContext;
  selectedTargets: string[];
  onAnnotationClick: (targetId: string) => void;
  showAllHighlights: boolean;
}> = ({ context, selectedTargets, onAnnotationClick, showAllHighlights }) => {
  const { text, annotations } = context;
  
  // Sort annotations by start position
  const sortedAnnotations = [...annotations].sort((a, b) => a.start - b.start);
  
  // Build segments with highlights
  const segments: { text: string; annotation?: Annotation }[] = [];
  let lastEnd = 0;
  
  for (const ann of sortedAnnotations) {
    // Add text before this annotation
    if (ann.start > lastEnd) {
      segments.push({ text: text.slice(lastEnd, ann.start) });
    }
    // Add the annotated text
    segments.push({ text: text.slice(ann.start, ann.end), annotation: ann });
    lastEnd = ann.end;
  }
  // Add remaining text
  if (lastEnd < text.length) {
    segments.push({ text: text.slice(lastEnd) });
  }
  
  return (
    <p className="text-lg leading-relaxed">
      {segments.map((segment, idx) => {
        if (!segment.annotation) {
          return <span key={idx}>{segment.text}</span>;
        }
        
        const ann = segment.annotation;
        const colors = ANNOTATION_COLORS[ann.kind as AnnotationKind] || ANNOTATION_COLORS.pattern;
        const isSelected = selectedTargets.includes(ann.targetId);
        const shouldHighlight = showAllHighlights || isSelected;
        
        return (
          <span
            key={idx}
            onClick={() => onAnnotationClick(ann.targetId)}
            className={`
              cursor-pointer rounded px-1 py-0.5 transition-all duration-200
              ${shouldHighlight ? `${colors.bg} ${colors.text} border ${colors.border}` : 'hover:bg-gray-100'}
              ${isSelected ? 'ring-2 ring-offset-1 ring-indigo-500 font-semibold' : ''}
            `}
            title={ann.tooltip || ann.label}
          >
            {segment.text}
          </span>
        );
      })}
    </p>
  );
};

// Audio Player Component
const AudioPlayer: React.FC<{ audioUrl?: string; title: string }> = ({ audioUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);
  
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  if (!audioUrl) {
    return (
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <VolumeX className="h-4 w-4" />
        <span>Audio coming soon</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-3 bg-indigo-50 rounded-lg p-3">
      <audio ref={audioRef} src={audioUrl} />
      <Button
        variant="ghost"
        size="sm"
        onClick={togglePlay}
        className="h-10 w-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
      </Button>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Volume2 className="h-4 w-4 text-indigo-600" />
          <span className="text-sm font-medium text-indigo-800">Listen to: {title}</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>
    </div>
  );
};

// Recasting Feedback Component
const RecastFeedback: React.FC<{
  feedback: NaturalFeedback;
  onAction: () => void;
}> = ({ feedback, onAction }) => {
  const getStatusStyles = () => {
    switch (feedback.status) {
      case 'correct':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'recast':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'hint':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'reveal':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };
  
  const getIcon = () => {
    switch (feedback.status) {
      case 'correct':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'recast':
        return <MessageCircle className="h-5 w-5 text-amber-600" />;
      case 'hint':
        return <Lightbulb className="h-5 w-5 text-blue-600" />;
      case 'reveal':
        return <Eye className="h-5 w-5 text-purple-600" />;
      default:
        return null;
    }
  };
  
  return (
    <div className={`p-4 rounded-lg border ${getStatusStyles()} animate-in fade-in duration-300`}>
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1">
          <p className="font-medium mb-1">{feedback.message}</p>
          {feedback.recast && (
            <p className="text-sm opacity-90 italic">"{feedback.recast}"</p>
          )}
          {feedback.explanation && (
            <p className="text-sm mt-2 opacity-80">{feedback.explanation}</p>
          )}
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <Button size="sm" onClick={onAction} variant={feedback.status === 'correct' ? 'default' : 'outline'}>
          {feedback.nextAction}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

// Main Natural Grammar Page Component
export default function NaturalGrammarPage() {
  const [selectedLesson, setSelectedLesson] = useState<NaturalLesson | null>(null);
  const [currentContextIndex, setCurrentContextIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [stage, setStage] = useState<'select' | 'story' | 'exercise' | 'results'>('select');
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<NaturalFeedback | null>(null);
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  const [score, setScore] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  
  const currentContext = selectedLesson?.contexts[currentContextIndex];
  const currentExercise = selectedLesson?.exercises[currentExerciseIndex];
  
  // Start a lesson
  const startLesson = (lesson: NaturalLesson) => {
    setSelectedLesson(lesson);
    setCurrentContextIndex(0);
    setCurrentExerciseIndex(0);
    setStage('story');
    setSelectedTargets([]);
    setUserAnswer('');
    setAttempts(0);
    setFeedback(null);
    setShowAllHighlights(false);
    setScore(0);
    setCompletedExercises([]);
  };
  
  // Handle annotation click for pattern recognition
  const handleAnnotationClick = (targetId: string) => {
    if (stage !== 'exercise' || currentExercise?.interaction !== 'select-highlight') return;
    
    setSelectedTargets(prev => {
      if (prev.includes(targetId)) {
        return prev.filter(t => t !== targetId);
      }
      return [...prev, targetId];
    });
  };
  
  // Check pattern recognition answer
  const checkPatternRecognition = () => {
    if (!currentExercise?.correctTargets) return;
    
    const correct = currentExercise.correctTargets;
    const selected = selectedTargets;
    
    // Check if all correct targets are selected and no extras
    const allCorrect = correct.every(t => selected.includes(t));
    const noExtras = selected.every(t => correct.includes(t));
    
    if (allCorrect && noExtras) {
      setFeedback({
        status: 'correct',
        message: currentExercise.successMessage || 'Excellent! You found the right patterns!',
        nextAction: 'Continue'
      });
      setScore(score + 1);
      setCompletedExercises([...completedExercises, currentExercise.id]);
    } else if (selected.length === 0) {
      setFeedback({
        status: 'hint',
        message: 'Click on the highlighted words in the story that match the question.',
        explanation: currentExercise.hint,
        nextAction: 'Try Again'
      });
    } else {
      setAttempts(attempts + 1);
      if (attempts >= 2) {
        setFeedback({
          status: 'reveal',
          message: 'Let me show you the correct answers.',
          explanation: `The correct patterns are highlighted in the story.`,
          nextAction: 'Continue'
        });
        setSelectedTargets(correct);
        setShowAllHighlights(true);
      } else {
        setFeedback({
          status: 'recast',
          message: 'Not quite! Look more carefully at the story.',
          explanation: currentExercise.hint,
          nextAction: 'Try Again'
        });
      }
    }
  };
  
  // Check fill-blank or short-answer
  const checkAnswer = () => {
    if (!currentExercise) return;
    
    const normalizedAnswer = userAnswer.toLowerCase().trim();
    const correctAnswer = currentExercise.correctAnswer?.toLowerCase().trim();
    const acceptedAnswers = currentExercise.acceptedAnswers?.map(a => a.toLowerCase().trim()) || [];
    
    // Check for exact match or accepted answers
    const isCorrect = normalizedAnswer === correctAnswer || acceptedAnswers.includes(normalizedAnswer);
    
    if (isCorrect) {
      setFeedback({
        status: 'correct',
        message: currentExercise.successMessage || 'Perfect! That\'s exactly right!',
        nextAction: 'Continue'
      });
      setScore(score + 1);
      setCompletedExercises([...completedExercises, currentExercise.id]);
    } else {
      setAttempts(attempts + 1);
      
      // Check for recast examples
      const recastMatch = currentExercise.recastExamples?.find(
        r => r.commonWrong.toLowerCase() === normalizedAnswer
      );
      
      if (recastMatch) {
        setFeedback({
          status: 'recast',
          message: recastMatch.recast,
          explanation: recastMatch.explanation,
          nextAction: 'Try Again'
        });
      } else if (attempts >= 2) {
        setFeedback({
          status: 'reveal',
          message: 'Here\'s how native speakers say it:',
          recast: currentExercise.correctAnswer,
          nextAction: 'Continue'
        });
        setCompletedExercises([...completedExercises, currentExercise.id]);
      } else {
        setFeedback({
          status: 'recast',
          message: 'Almost there! Let me help you.',
          explanation: currentExercise.hint,
          nextAction: 'Try Again'
        });
      }
    }
  };
  
  // Check MCQ answer
  const checkMCQ = (selectedOption: string) => {
    if (!currentExercise) return;
    
    const isCorrect = selectedOption === currentExercise.correctAnswer;
    
    if (isCorrect) {
      setFeedback({
        status: 'correct',
        message: currentExercise.successMessage || 'Correct! Well done!',
        nextAction: 'Continue'
      });
      setScore(score + 1);
      setCompletedExercises([...completedExercises, currentExercise.id]);
    } else {
      setAttempts(attempts + 1);
      if (attempts >= 1) {
        setFeedback({
          status: 'reveal',
          message: `The correct answer is: ${currentExercise.correctAnswer}`,
          explanation: currentExercise.hint,
          nextAction: 'Continue'
        });
        setCompletedExercises([...completedExercises, currentExercise.id]);
      } else {
        setFeedback({
          status: 'recast',
          message: 'Not quite! Think about what you learned from the story.',
          explanation: currentExercise.hint,
          nextAction: 'Try Again'
        });
      }
    }
  };
  
  // Handle feedback action (continue or try again)
  const handleFeedbackAction = () => {
    if (feedback?.status === 'correct' || feedback?.status === 'reveal') {
      nextExercise();
    } else {
      setFeedback(null);
      if (feedback?.status !== 'hint') {
        setUserAnswer('');
      }
    }
  };
  
  // Move to next exercise
  const nextExercise = () => {
    setFeedback(null);
    setUserAnswer('');
    setSelectedTargets([]);
    setAttempts(0);
    setShowAllHighlights(false);
    
    // Find next exercise for current context
    const currentContextExercises = selectedLesson?.exercises.filter(
      ex => ex.contextId === currentContext?.id
    ) || [];
    const currentIndexInContext = currentContextExercises.findIndex(
      ex => ex.id === currentExercise?.id
    );
    
    if (currentIndexInContext < currentContextExercises.length - 1) {
      // More exercises for this context
      const nextEx = currentContextExercises[currentIndexInContext + 1];
      const globalIndex = selectedLesson?.exercises.findIndex(ex => ex.id === nextEx.id) || 0;
      setCurrentExerciseIndex(globalIndex);
    } else if (currentContextIndex < (selectedLesson?.contexts.length || 1) - 1) {
      // Move to next context
      setCurrentContextIndex(currentContextIndex + 1);
      const nextContextId = selectedLesson?.contexts[currentContextIndex + 1]?.id;
      const nextContextFirstEx = selectedLesson?.exercises.find(ex => ex.contextId === nextContextId);
      if (nextContextFirstEx) {
        const globalIndex = selectedLesson?.exercises.findIndex(ex => ex.id === nextContextFirstEx.id) || 0;
        setCurrentExerciseIndex(globalIndex);
      }
      setStage('story');
    } else {
      // All done
      setStage('results');
    }
  };
  
  // Proceed from story to exercises
  const startExercises = () => {
    setStage('exercise');
    // Find first exercise for current context
    const firstExercise = selectedLesson?.exercises.find(
      ex => ex.contextId === currentContext?.id
    );
    if (firstExercise) {
      const index = selectedLesson?.exercises.findIndex(ex => ex.id === firstExercise.id) || 0;
      setCurrentExerciseIndex(index);
    }
  };
  
  // Reset to lesson selection
  const resetToSelection = () => {
    setSelectedLesson(null);
    setStage('select');
    setScore(0);
    setCompletedExercises([]);
  };
  
  // Render lesson selection
  if (stage === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="py-12 bg-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-10 w-10" />
              <h1 className="text-3xl font-bold">Natural Grammar Learning</h1>
            </div>
            <p className="text-lg opacity-90 max-w-2xl">
              Learn grammar the way native speakers do - through stories, patterns, and gentle guidance. 
              No rules to memorize, just natural language acquisition!
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Badge className="bg-white/20 text-white">Inductive Approach</Badge>
              <Badge className="bg-white/20 text-white">Context-First</Badge>
              <Badge className="bg-white/20 text-white">Pattern Recognition</Badge>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border shadow-sm">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-medium mb-1">1. Read & Listen</h3>
                <p className="text-sm text-gray-600">Immerse yourself in a short story with highlighted patterns.</p>
              </div>
              <div className="bg-white rounded-lg p-4 border shadow-sm">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-medium mb-1">2. Spot Patterns</h3>
                <p className="text-sm text-gray-600">Identify grammar patterns naturally from the context.</p>
              </div>
              <div className="bg-white rounded-lg p-4 border shadow-sm">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                  <MessageCircle className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="font-medium mb-1">3. Gentle Feedback</h3>
                <p className="text-sm text-gray-600">Get friendly corrections, not harsh "wrong" messages.</p>
              </div>
              <div className="bg-white rounded-lg p-4 border shadow-sm">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-medium mb-1">4. Natural Mastery</h3>
                <p className="text-sm text-gray-600">Build intuition for correct grammar usage.</p>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Lessons</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_NATURAL_LESSONS.map(lesson => (
              <Card 
                key={lesson.id}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => startLesson(lesson)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={
                      lesson.level === 'beginner' ? 'bg-green-100 text-green-800' :
                      lesson.level === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }>
                      {lesson.level}
                    </Badge>
                    {lesson.is_premium && (
                      <Badge variant="outline" className="text-amber-600 border-amber-300">
                        Premium
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-indigo-600 transition-colors">
                    {lesson.title}
                  </CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>{lesson.contexts.length} stories</span>
                      <span>{lesson.exercises.length} exercises</span>
                    </div>
                    <span className="flex items-center gap-1 text-indigo-600 group-hover:translate-x-1 transition-transform">
                      Start
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Prefer traditional grammar exercises?</p>
            <Link to="/grammar/exercises">
              <Button variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Traditional Exercises
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Render story view
  if (stage === 'story' && currentContext) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <Button variant="ghost" onClick={resetToSelection}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Lessons
            </Button>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                Story {currentContextIndex + 1} of {selectedLesson?.contexts.length}
              </Badge>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <BookOpen className="h-5 w-5" />
                <span className="text-sm font-medium">Read & Listen</span>
              </div>
              <CardTitle className="text-2xl">{currentContext.title}</CardTitle>
              <CardDescription>
                Read the story below. Notice the highlighted patterns - they'll help you understand {selectedLesson?.topic}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <AudioPlayer audioUrl={currentContext.audioUrl} title={currentContext.title} />
              
              <div className="bg-white rounded-lg p-6 border shadow-sm">
                <HighlightedText
                  context={currentContext}
                  selectedTargets={[]}
                  onAnnotationClick={() => {}}
                  showAllHighlights={true}
                />
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-4">
                <h4 className="font-medium text-indigo-800 mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Pattern Legend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(ANNOTATION_COLORS).map(([kind, colors]) => (
                    <span
                      key={kind}
                      className={`px-2 py-1 rounded text-xs ${colors.bg} ${colors.text} border ${colors.border}`}
                    >
                      {kind}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={startExercises} size="lg">
                  I've Read the Story
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  // Render exercise view
  if (stage === 'exercise' && currentExercise && currentContext) {
    const progressPercent = ((completedExercises.length) / (selectedLesson?.exercises.length || 1)) * 100;
    
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <Button variant="ghost" onClick={resetToSelection}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Lessons
              </Button>
              <Badge variant="outline">
                Exercise {completedExercises.length + 1} of {selectedLesson?.exercises.length}
              </Badge>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
          
          {/* Story Context Reference */}
          <Card className="mb-4 bg-gray-50">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm font-medium">{currentContext.title}</span>
              </div>
              <div className="text-sm">
                <HighlightedText
                  context={currentContext}
                  selectedTargets={selectedTargets}
                  onAnnotationClick={handleAnnotationClick}
                  showAllHighlights={showAllHighlights}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Exercise Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <Target className="h-5 w-5" />
                <span className="text-sm font-medium capitalize">{currentExercise.type.replace('-', ' ')}</span>
              </div>
              <CardTitle className="text-xl">{currentExercise.prompt}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pattern Recognition - Select Highlight */}
              {currentExercise.interaction === 'select-highlight' && (
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm">
                    Click on the words in the story above that match the question.
                  </p>
                  {selectedTargets.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-gray-500">Selected:</span>
                      {selectedTargets.map(targetId => {
                        const ann = currentContext.annotations.find(a => a.targetId === targetId);
                        return ann ? (
                          <Badge key={targetId} variant="secondary">
                            {currentContext.text.slice(ann.start, ann.end)}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  )}
                  {!feedback && (
                    <Button onClick={checkPatternRecognition} disabled={selectedTargets.length === 0}>
                      Check My Selection
                    </Button>
                  )}
                </div>
              )}
              
              {/* Short Answer / Fill Blank */}
              {currentExercise.interaction === 'short-answer' && (
                <div className="space-y-4">
                  <Input
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer..."
                    disabled={feedback?.status === 'correct' || feedback?.status === 'reveal'}
                    className="text-lg"
                    onKeyDown={(e) => e.key === 'Enter' && !feedback && userAnswer && checkAnswer()}
                  />
                  {!feedback && (
                    <Button onClick={checkAnswer} disabled={!userAnswer.trim()}>
                      Check Answer
                    </Button>
                  )}
                </div>
              )}
              
              {/* MCQ */}
              {currentExercise.interaction === 'mcq' && currentExercise.options && (
                <div className="space-y-2">
                  {currentExercise.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => !feedback && checkMCQ(option)}
                      disabled={!!feedback}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        feedback?.status === 'correct' && option === currentExercise.correctAnswer
                          ? 'border-green-500 bg-green-50'
                          : feedback?.status === 'reveal' && option === currentExercise.correctAnswer
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Feedback */}
              {feedback && (
                <RecastFeedback feedback={feedback} onAction={handleFeedbackAction} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  // Render results
  if (stage === 'results' && selectedLesson) {
    const percentage = Math.round((score / selectedLesson.exercises.length) * 100);
    
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <Award className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl">Lesson Complete!</CardTitle>
              <CardDescription>{selectedLesson.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-5xl font-bold text-indigo-600">{percentage}%</div>
              <p className="text-gray-600">
                You got {score} out of {selectedLesson.exercises.length} correct
              </p>
              <Progress value={percentage} className="h-3" />
              
              {selectedLesson.quickRecap && (
                <div className="bg-indigo-50 rounded-lg p-4 text-left">
                  <h4 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    What You Learned
                  </h4>
                  <p className="text-sm text-indigo-700">{selectedLesson.quickRecap}</p>
                </div>
              )}
              
              {selectedLesson.chunks && selectedLesson.chunks.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-4 text-left">
                  <h4 className="font-semibold text-blue-800 mb-2">Key Chunks to Remember</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLesson.chunks.map((chunk, idx) => (
                      <Badge key={idx} className="bg-blue-100 text-blue-800">
                        {chunk}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => startLesson(selectedLesson)}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button onClick={resetToSelection}>
                  Choose Another Lesson
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  return null;
}
