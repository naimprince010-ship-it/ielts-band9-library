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
  },

  // Lesson 6: Shopping - Comparatives and Superlatives
  {
    id: 'natural-comparatives',
    title: 'Shopping for Clothes',
    slug: 'shopping-for-clothes',
    description: 'Learn comparatives and superlatives naturally through a shopping experience.',
    level: 'beginner',
    topic: 'Comparatives & Superlatives',
    targetPattern: 'adjective + -er / more + adjective / the + adjective + -est / the most + adjective',
    is_premium: false,
    estimated_time: 14,
    contexts: [
      {
        id: 'shopping-story-1',
        title: 'At the Clothing Store',
        text: 'Lisa went shopping with her sister. She tried on three dresses. The blue dress was nice, but the red one was nicer. The green dress was the nicest of all! However, it was also the most expensive. Her sister said, "The red dress is cheaper than the green one, and it looks better on you." Lisa agreed. She also bought a jacket. The leather jacket was warmer than the cotton one, but the wool jacket was the warmest. In the end, Lisa chose the most comfortable clothes that fit her budget.',
        annotations: [
          { start: 127, end: 132, kind: 'pattern', label: 'comparative', targetId: 'nicer-1', tooltip: 'nicer = nice + r (comparative)' },
          { start: 159, end: 165, kind: 'pattern', label: 'superlative', targetId: 'nicest-1', tooltip: 'the nicest = the + nice + st (superlative)' },
          { start: 206, end: 220, kind: 'pattern', label: 'superlative', targetId: 'most-expensive-1', tooltip: 'the most expensive = superlative for long adjectives' },
          { start: 256, end: 263, kind: 'pattern', label: 'comparative', targetId: 'cheaper-1', tooltip: 'cheaper = cheap + er (comparative)' },
          { start: 264, end: 268, kind: 'chunk', label: 'comparison word', targetId: 'than-1', tooltip: 'than = used after comparatives' },
          { start: 299, end: 305, kind: 'pattern', label: 'comparative', targetId: 'better-1', tooltip: 'better = comparative of "good" (irregular)' },
          { start: 365, end: 371, kind: 'pattern', label: 'comparative', targetId: 'warmer-1', tooltip: 'warmer = warm + er (comparative)' },
          { start: 372, end: 376, kind: 'chunk', label: 'comparison word', targetId: 'than-2', tooltip: 'than = used after comparatives' },
          { start: 418, end: 425, kind: 'pattern', label: 'superlative', targetId: 'warmest-1', tooltip: 'the warmest = the + warm + est (superlative)' },
          { start: 455, end: 471, kind: 'pattern', label: 'superlative', targetId: 'most-comfortable-1', tooltip: 'the most comfortable = superlative for long adjectives' }
        ],
        audioUrl: undefined
      }
    ],
    exercises: [
      {
        id: 'comp-ex-1',
        type: 'pattern-recognition',
        contextId: 'shopping-story-1',
        prompt: 'Find all the comparative forms (adjectives comparing two things).',
        interaction: 'select-highlight',
        correctTargets: ['nicer-1', 'cheaper-1', 'better-1', 'warmer-1'],
        hint: 'Comparatives often end in "-er" or use "more"',
        successMessage: 'Great! Comparatives compare two things using -er or more.'
      },
      {
        id: 'comp-ex-2',
        type: 'pattern-recognition',
        contextId: 'shopping-story-1',
        prompt: 'Find all the superlative forms (the best/most of all).',
        interaction: 'select-highlight',
        correctTargets: ['nicest-1', 'most-expensive-1', 'warmest-1', 'most-comfortable-1'],
        hint: 'Superlatives use "the" + "-est" or "the most"',
        successMessage: 'Excellent! Superlatives show the highest degree.'
      },
      {
        id: 'comp-ex-3',
        type: 'fill-blank',
        contextId: 'shopping-story-1',
        prompt: 'Complete: This phone is _____ than that one. (expensive)',
        interaction: 'short-answer',
        correctAnswer: 'more expensive',
        acceptedAnswers: ['more expensive'],
        recastExamples: [
          { commonWrong: 'expensiver', recast: 'Almost! Long adjectives use "more", not "-er". Say: "more expensive than"' },
          { commonWrong: 'most expensive', recast: 'Close! For comparing two things, use "more", not "most". Say: "more expensive than"' }
        ],
        hint: 'Long adjectives (3+ syllables) use "more" for comparatives',
        successMessage: 'Perfect! "More expensive" is correct for long adjectives.'
      },
      {
        id: 'comp-ex-4',
        type: 'fill-blank',
        contextId: 'shopping-story-1',
        prompt: 'Complete: This is _____ book I have ever read. (good)',
        interaction: 'short-answer',
        correctAnswer: 'the best',
        acceptedAnswers: ['the best'],
        recastExamples: [
          { commonWrong: 'the goodest', recast: 'Almost! "Good" is irregular: good → better → best. Say: "the best book"' },
          { commonWrong: 'the most good', recast: 'Close! "Good" is irregular. The superlative is "the best".' }
        ],
        hint: '"Good" is irregular: good → better → best',
        successMessage: 'Correct! "The best" is the superlative of "good".'
      },
      {
        id: 'comp-ex-5',
        type: 'mcq',
        contextId: 'shopping-story-1',
        prompt: 'Which is correct?',
        interaction: 'mcq',
        options: ['She is more tall than me.', 'She is taller than me.', 'She is the tallest than me.', 'She is most tall than me.'],
        correctAnswer: 'She is taller than me.',
        hint: 'Short adjectives (1-2 syllables) use "-er"',
        successMessage: 'Right! Short adjectives like "tall" use "-er" for comparatives.'
      }
    ],
    chunks: ['more than', 'less than', 'the most', 'the least', 'better than', 'worse than'],
    quickRecap: 'Comparatives compare two things: short adjectives add -er (taller, nicer), long adjectives use "more" (more expensive). Superlatives show the highest: short adjectives add -est (the tallest), long adjectives use "the most" (the most beautiful). Irregular: good→better→best, bad→worse→worst.'
  },

  // Lesson 7: Conditionals (If sentences)
  {
    id: 'natural-conditionals',
    title: 'Making Plans and Dreams',
    slug: 'making-plans-and-dreams',
    description: 'Learn conditional sentences naturally through everyday situations and dreams.',
    level: 'intermediate',
    topic: 'Conditionals',
    targetPattern: 'If + present, will + verb / If + past, would + verb',
    is_premium: false,
    estimated_time: 16,
    contexts: [
      {
        id: 'conditional-story-1',
        title: 'Weekend Plans',
        text: 'Tom is planning his weekend. He thinks, "If it rains tomorrow, I will stay home and watch movies. If the weather is nice, I will go to the beach with my friends." His friend asks, "What would you do if you won the lottery?" Tom laughs and says, "If I won a million dollars, I would travel around the world! I would buy a house by the sea and I would help my family." Then he adds, "But if I had more time, I would learn to play the guitar. If I were rich, I would donate to charity too."',
        annotations: [
          { start: 47, end: 49, kind: 'pattern', label: 'if (condition)', targetId: 'if-1', tooltip: 'If = introduces a condition' },
          { start: 50, end: 55, kind: 'verb', label: 'present simple', targetId: 'rains-1', tooltip: 'Present simple after "if" for real possibilities' },
          { start: 67, end: 71, kind: 'pattern', label: 'will (result)', targetId: 'will-1', tooltip: 'will = result of the condition' },
          { start: 103, end: 105, kind: 'pattern', label: 'if (condition)', targetId: 'if-2', tooltip: 'If = introduces a condition' },
          { start: 122, end: 124, kind: 'verb', label: 'present simple', targetId: 'is-1', tooltip: 'Present simple after "if"' },
          { start: 133, end: 137, kind: 'pattern', label: 'will (result)', targetId: 'will-2', tooltip: 'will = result of the condition' },
          { start: 198, end: 203, kind: 'pattern', label: 'would (unreal)', targetId: 'would-1', tooltip: 'would = unreal/imaginary result' },
          { start: 215, end: 217, kind: 'pattern', label: 'if (unreal)', targetId: 'if-3', tooltip: 'If = introduces unreal condition' },
          { start: 222, end: 225, kind: 'verb', label: 'past simple', targetId: 'won-1', tooltip: 'Past simple for unreal conditions' },
          { start: 253, end: 256, kind: 'pattern', label: 'if (unreal)', targetId: 'if-4', tooltip: 'If = introduces unreal condition' },
          { start: 259, end: 262, kind: 'verb', label: 'past simple', targetId: 'won-2', tooltip: 'Past simple for unreal conditions' },
          { start: 287, end: 292, kind: 'pattern', label: 'would (unreal)', targetId: 'would-2', tooltip: 'would = unreal/imaginary result' },
          { start: 325, end: 330, kind: 'pattern', label: 'would (unreal)', targetId: 'would-3', tooltip: 'would = unreal/imaginary result' },
          { start: 369, end: 374, kind: 'pattern', label: 'would (unreal)', targetId: 'would-4', tooltip: 'would = unreal/imaginary result' },
          { start: 410, end: 412, kind: 'pattern', label: 'if (unreal)', targetId: 'if-5', tooltip: 'If = introduces unreal condition' },
          { start: 415, end: 418, kind: 'verb', label: 'past simple', targetId: 'had-1', tooltip: 'Past simple for unreal conditions' },
          { start: 435, end: 440, kind: 'pattern', label: 'would (unreal)', targetId: 'would-5', tooltip: 'would = unreal/imaginary result' },
          { start: 472, end: 474, kind: 'pattern', label: 'if (unreal)', targetId: 'if-6', tooltip: 'If = introduces unreal condition' },
          { start: 477, end: 481, kind: 'verb', label: 'were (subjunctive)', targetId: 'were-1', tooltip: 'were = used for all subjects in unreal conditions' },
          { start: 492, end: 497, kind: 'pattern', label: 'would (unreal)', targetId: 'would-6', tooltip: 'would = unreal/imaginary result' }
        ],
        audioUrl: undefined
      }
    ],
    exercises: [
      {
        id: 'cond-ex-1',
        type: 'pattern-recognition',
        contextId: 'conditional-story-1',
        prompt: 'Find all the "will" patterns (for real/possible situations).',
        interaction: 'select-highlight',
        correctTargets: ['will-1', 'will-2'],
        hint: '"Will" is used for real possibilities in the future',
        successMessage: 'Great! "Will" shows real possibilities (First Conditional).'
      },
      {
        id: 'cond-ex-2',
        type: 'pattern-recognition',
        contextId: 'conditional-story-1',
        prompt: 'Find all the "would" patterns (for unreal/imaginary situations).',
        interaction: 'select-highlight',
        correctTargets: ['would-1', 'would-2', 'would-3', 'would-4', 'would-5', 'would-6'],
        hint: '"Would" is used for imaginary or unreal situations',
        successMessage: 'Excellent! "Would" shows unreal situations (Second Conditional).'
      },
      {
        id: 'cond-ex-3',
        type: 'fill-blank',
        contextId: 'conditional-story-1',
        prompt: 'Complete: If I _____ you, I would apologize. (be)',
        interaction: 'short-answer',
        correctAnswer: 'were',
        acceptedAnswers: ['were'],
        recastExamples: [
          { commonWrong: 'was', recast: 'Almost! In unreal conditions, we use "were" for all subjects. Say: "If I were you"' },
          { commonWrong: 'am', recast: 'Good try! For unreal conditions, use past tense. Say: "If I were you"' }
        ],
        hint: 'In unreal conditions, we use "were" for all subjects (I, he, she, it)',
        successMessage: 'Perfect! "If I were you" is the correct form for advice.'
      },
      {
        id: 'cond-ex-4',
        type: 'fill-blank',
        contextId: 'conditional-story-1',
        prompt: 'Complete: If it _____ sunny tomorrow, we will have a picnic. (be)',
        interaction: 'short-answer',
        correctAnswer: 'is',
        acceptedAnswers: ['is', "'s"],
        recastExamples: [
          { commonWrong: 'will be', recast: 'Almost! After "if" for real possibilities, use present simple, not "will". Say: "If it is sunny"' },
          { commonWrong: 'was', recast: 'Close! For real future possibilities, use present simple. Say: "If it is sunny"' }
        ],
        hint: 'For real possibilities, use present simple after "if"',
        successMessage: 'Correct! Present simple after "if" for real possibilities.'
      },
      {
        id: 'cond-ex-5',
        type: 'mcq',
        contextId: 'conditional-story-1',
        prompt: 'Which sentence talks about an UNREAL situation?',
        interaction: 'mcq',
        options: ['If I have time, I will call you.', 'If I had wings, I would fly.', 'If she comes, we will start.', 'If it rains, I will take an umbrella.'],
        correctAnswer: 'If I had wings, I would fly.',
        hint: 'Unreal situations use past tense + would',
        successMessage: 'Right! Having wings is impossible, so it\'s unreal (Second Conditional).'
      }
    ],
    chunks: ['if I were you', 'what would you do', 'I would love to', 'if only'],
    quickRecap: 'First Conditional (real): If + present simple, will + verb (If it rains, I will stay home). Second Conditional (unreal): If + past simple, would + verb (If I won the lottery, I would travel). Use "were" for all subjects in unreal conditions (If I were rich...).'
  },

  // Lesson 8: Present Perfect (Life experiences)
  {
    id: 'natural-present-perfect',
    title: 'Life Experiences',
    slug: 'life-experiences',
    description: 'Learn Present Perfect naturally through sharing life experiences.',
    level: 'intermediate',
    topic: 'Present Perfect',
    targetPattern: 'have/has + past participle (V3)',
    is_premium: false,
    estimated_time: 15,
    contexts: [
      {
        id: 'experience-story-1',
        title: 'Travel Stories',
        text: 'At a party, friends are sharing their experiences. Maria says, "I have visited Paris three times. It is my favorite city!" John replies, "I have never been to Europe, but I have traveled to Japan twice. Have you ever tried sushi?" Maria answers, "Yes, I have eaten sushi many times. I have also learned to make it at home." Their friend asks, "Has anyone here climbed a mountain?" Tom raises his hand. "I have climbed Mount Fuji! It was amazing. I have taken hundreds of photos there."',
        annotations: [
          { start: 60, end: 72, kind: 'pattern', label: 'present perfect', targetId: 'have-visited-1', tooltip: 'have visited = have + past participle' },
          { start: 123, end: 138, kind: 'pattern', label: 'present perfect negative', targetId: 'have-never-been-1', tooltip: 'have never been = negative present perfect' },
          { start: 159, end: 173, kind: 'pattern', label: 'present perfect', targetId: 'have-traveled-1', tooltip: 'have traveled = have + past participle' },
          { start: 188, end: 202, kind: 'pattern', label: 'present perfect question', targetId: 'have-you-ever-1', tooltip: 'Have you ever = question about life experience' },
          { start: 234, end: 246, kind: 'pattern', label: 'present perfect', targetId: 'have-eaten-1', tooltip: 'have eaten = have + past participle' },
          { start: 268, end: 284, kind: 'pattern', label: 'present perfect', targetId: 'have-also-learned-1', tooltip: 'have also learned = have + past participle' },
          { start: 330, end: 341, kind: 'pattern', label: 'present perfect question', targetId: 'has-anyone-1', tooltip: 'Has anyone = question with he/she/it form' },
          { start: 387, end: 399, kind: 'pattern', label: 'present perfect', targetId: 'have-climbed-1', tooltip: 'have climbed = have + past participle' },
          { start: 432, end: 442, kind: 'pattern', label: 'present perfect', targetId: 'have-taken-1', tooltip: 'have taken = have + past participle' },
          { start: 73, end: 84, kind: 'chunk', label: 'frequency', targetId: 'three-times', tooltip: 'three times = how many times' },
          { start: 174, end: 179, kind: 'chunk', label: 'frequency', targetId: 'twice-1', tooltip: 'twice = two times' },
          { start: 247, end: 257, kind: 'chunk', label: 'frequency', targetId: 'many-times', tooltip: 'many times = often' }
        ],
        audioUrl: undefined
      }
    ],
    exercises: [
      {
        id: 'pp-ex-1',
        type: 'pattern-recognition',
        contextId: 'experience-story-1',
        prompt: 'Find all the "have + past participle" patterns.',
        interaction: 'select-highlight',
        correctTargets: ['have-visited-1', 'have-never-been-1', 'have-traveled-1', 'have-eaten-1', 'have-also-learned-1', 'have-climbed-1', 'have-taken-1'],
        hint: 'Look for "have" or "has" followed by a verb in past participle form',
        successMessage: 'Great! Present Perfect uses have/has + past participle.'
      },
      {
        id: 'pp-ex-2',
        type: 'pattern-recognition',
        contextId: 'experience-story-1',
        prompt: 'Find the question forms of Present Perfect.',
        interaction: 'select-highlight',
        correctTargets: ['have-you-ever-1', 'has-anyone-1'],
        hint: 'Questions start with "Have" or "Has"',
        successMessage: 'Excellent! Questions invert: Have you...? Has she...?'
      },
      {
        id: 'pp-ex-3',
        type: 'fill-blank',
        contextId: 'experience-story-1',
        prompt: 'Complete: I _____ never _____ to Australia. (be)',
        interaction: 'short-answer',
        correctAnswer: 'have been',
        acceptedAnswers: ['have been', "have never been"],
        recastExamples: [
          { commonWrong: 'have went', recast: 'Almost! The past participle of "go" is "been" (for places). Say: "I have never been to Australia."' },
          { commonWrong: 'was', recast: 'Good try! For experiences, use Present Perfect. Say: "I have never been to Australia."' }
        ],
        hint: 'Use "been" (not "went") for places with Present Perfect',
        successMessage: 'Perfect! "Have been" is correct for places.'
      },
      {
        id: 'pp-ex-4',
        type: 'fill-blank',
        contextId: 'experience-story-1',
        prompt: 'Complete: She _____ already _____ the movie. (see)',
        interaction: 'short-answer',
        correctAnswer: 'has seen',
        acceptedAnswers: ['has seen', "has already seen"],
        recastExamples: [
          { commonWrong: 'has saw', recast: 'Almost! The past participle of "see" is "seen". Say: "She has already seen the movie."' },
          { commonWrong: 'have seen', recast: 'Close! For she/he/it, use "has", not "have". Say: "She has seen the movie."' }
        ],
        hint: 'She/he/it uses "has", and "see" becomes "seen"',
        successMessage: 'Correct! "Has seen" is the right form for she/he/it.'
      },
      {
        id: 'pp-ex-5',
        type: 'mcq',
        contextId: 'experience-story-1',
        prompt: 'Which question is correct?',
        interaction: 'mcq',
        options: ['Did you ever eat sushi?', 'Have you ever eaten sushi?', 'Do you ever eaten sushi?', 'Are you ever eat sushi?'],
        correctAnswer: 'Have you ever eaten sushi?',
        hint: 'For life experiences, use Present Perfect',
        successMessage: 'Right! "Have you ever + past participle" asks about life experiences.'
      }
    ],
    chunks: ['have you ever', 'I have never', 'has already', 'have just', 'have been to'],
    quickRecap: 'Present Perfect (have/has + past participle) talks about life experiences and actions connected to now. Use "ever" in questions (Have you ever...?), "never" for negative experiences (I have never...), and "already/just/yet" for recent actions. For places, use "been" (I have been to Paris).'
  },

  // Lesson 9: Passive Voice
  {
    id: 'natural-passive',
    title: 'How Things Are Made',
    slug: 'how-things-are-made',
    description: 'Learn Passive Voice naturally through descriptions of processes.',
    level: 'intermediate',
    topic: 'Passive Voice',
    targetPattern: 'be + past participle (is made, was built, will be done)',
    is_premium: false,
    estimated_time: 14,
    contexts: [
      {
        id: 'passive-story-1',
        title: 'The Chocolate Factory',
        text: 'Today we visited a chocolate factory. The guide explained how chocolate is made. First, cocoa beans are collected from farms in Africa and South America. Then, the beans are roasted and ground into a paste. Sugar and milk are added to create different flavors. The mixture is heated and stirred for hours. Finally, the chocolate is poured into molds and cooled. The finished chocolates are wrapped in colorful paper and packed into boxes. Over 1000 boxes are produced every day! The factory was built in 1950 and has been expanded twice since then.',
        annotations: [
          { start: 79, end: 86, kind: 'pattern', label: 'passive (present)', targetId: 'is-made-1', tooltip: 'is made = passive voice (present)' },
          { start: 107, end: 120, kind: 'pattern', label: 'passive (present)', targetId: 'are-collected-1', tooltip: 'are collected = passive voice (present)' },
          { start: 175, end: 186, kind: 'pattern', label: 'passive (present)', targetId: 'are-roasted-1', tooltip: 'are roasted = passive voice (present)' },
          { start: 191, end: 197, kind: 'pattern', label: 'passive (present)', targetId: 'ground-1', tooltip: 'ground = past participle of "grind"' },
          { start: 221, end: 230, kind: 'pattern', label: 'passive (present)', targetId: 'are-added-1', tooltip: 'are added = passive voice (present)' },
          { start: 270, end: 279, kind: 'pattern', label: 'passive (present)', targetId: 'is-heated-1', tooltip: 'is heated = passive voice (present)' },
          { start: 284, end: 291, kind: 'pattern', label: 'passive (present)', targetId: 'stirred-1', tooltip: 'stirred = past participle' },
          { start: 322, end: 331, kind: 'pattern', label: 'passive (present)', targetId: 'is-poured-1', tooltip: 'is poured = passive voice (present)' },
          { start: 349, end: 355, kind: 'pattern', label: 'passive (present)', targetId: 'cooled-1', tooltip: 'cooled = past participle' },
          { start: 381, end: 392, kind: 'pattern', label: 'passive (present)', targetId: 'are-wrapped-1', tooltip: 'are wrapped = passive voice (present)' },
          { start: 418, end: 424, kind: 'pattern', label: 'passive (present)', targetId: 'packed-1', tooltip: 'packed = past participle' },
          { start: 449, end: 461, kind: 'pattern', label: 'passive (present)', targetId: 'are-produced-1', tooltip: 'are produced = passive voice (present)' },
          { start: 487, end: 496, kind: 'pattern', label: 'passive (past)', targetId: 'was-built-1', tooltip: 'was built = passive voice (past)' },
          { start: 509, end: 525, kind: 'pattern', label: 'passive (present perfect)', targetId: 'has-been-expanded-1', tooltip: 'has been expanded = passive voice (present perfect)' }
        ],
        audioUrl: undefined
      }
    ],
    exercises: [
      {
        id: 'pass-ex-1',
        type: 'pattern-recognition',
        contextId: 'passive-story-1',
        prompt: 'Find all the present passive forms (is/are + past participle).',
        interaction: 'select-highlight',
        correctTargets: ['is-made-1', 'are-collected-1', 'are-roasted-1', 'are-added-1', 'is-heated-1', 'is-poured-1', 'are-wrapped-1', 'are-produced-1'],
        hint: 'Look for "is" or "are" followed by a past participle',
        successMessage: 'Great! Present passive uses is/are + past participle.'
      },
      {
        id: 'pass-ex-2',
        type: 'pattern-recognition',
        contextId: 'passive-story-1',
        prompt: 'Find the past passive form (was/were + past participle).',
        interaction: 'select-highlight',
        correctTargets: ['was-built-1'],
        hint: 'Look for "was" or "were" followed by a past participle',
        successMessage: 'Excellent! Past passive uses was/were + past participle.'
      },
      {
        id: 'pass-ex-3',
        type: 'fill-blank',
        contextId: 'passive-story-1',
        prompt: 'Complete: English _____ in many countries. (speak)',
        interaction: 'short-answer',
        correctAnswer: 'is spoken',
        acceptedAnswers: ['is spoken'],
        recastExamples: [
          { commonWrong: 'is speak', recast: 'Almost! Use the past participle after "is". Say: "English is spoken in many countries."' },
          { commonWrong: 'speaks', recast: 'Good try! For passive, use "is + past participle". Say: "English is spoken."' }
        ],
        hint: 'Passive = is/are + past participle',
        successMessage: 'Perfect! "Is spoken" is the correct passive form.'
      },
      {
        id: 'pass-ex-4',
        type: 'fill-blank',
        contextId: 'passive-story-1',
        prompt: 'Complete: The Eiffel Tower _____ in 1889. (build)',
        interaction: 'short-answer',
        correctAnswer: 'was built',
        acceptedAnswers: ['was built'],
        recastExamples: [
          { commonWrong: 'was build', recast: 'Almost! Use the past participle "built". Say: "The Eiffel Tower was built in 1889."' },
          { commonWrong: 'built', recast: 'Close! For passive, add "was". Say: "The Eiffel Tower was built in 1889."' }
        ],
        hint: 'Past passive = was/were + past participle',
        successMessage: 'Correct! "Was built" is the past passive form.'
      },
      {
        id: 'pass-ex-5',
        type: 'mcq',
        contextId: 'passive-story-1',
        prompt: 'Which sentence is in passive voice?',
        interaction: 'mcq',
        options: ['The chef cooked the meal.', 'The meal was cooked by the chef.', 'The chef is cooking.', 'The meal tastes delicious.'],
        correctAnswer: 'The meal was cooked by the chef.',
        hint: 'Passive focuses on the action, not who did it',
        successMessage: 'Right! "Was cooked" is passive - the meal receives the action.'
      }
    ],
    chunks: ['is made of', 'was built by', 'is known for', 'are used for'],
    quickRecap: 'Passive Voice focuses on the action, not who does it. Form: be + past participle. Present: is/are + V3 (Coffee is grown in Brazil). Past: was/were + V3 (The book was written in 1990). Use "by" to mention who did it (The cake was made by my mother).'
  },

  // Lesson 10: Reported Speech
  {
    id: 'natural-reported-speech',
    title: 'What Did They Say?',
    slug: 'what-did-they-say',
    description: 'Learn Reported Speech naturally through conversations and stories.',
    level: 'intermediate',
    topic: 'Reported Speech',
    targetPattern: 'said (that) + backshift tense',
    is_premium: false,
    estimated_time: 15,
    contexts: [
      {
        id: 'reported-story-1',
        title: 'The Job Interview Story',
        text: 'After his interview, Mark told his friends about it. He said that the interviewer had been very friendly. She had asked him about his experience. Mark told them that he had worked at a bank for five years. The interviewer said that she was impressed with his skills. She told him that they would call him next week. Mark said he felt confident about the job. His friend asked what the salary was. Mark replied that they had offered him a good package. Everyone said that they were happy for him.',
        annotations: [
          { start: 59, end: 63, kind: 'pattern', label: 'reporting verb', targetId: 'said-1', tooltip: 'said = reporting verb' },
          { start: 64, end: 68, kind: 'pattern', label: 'that clause', targetId: 'that-1', tooltip: 'that = introduces reported speech' },
          { start: 89, end: 97, kind: 'verb', label: 'past perfect', targetId: 'had-been-1', tooltip: 'had been = backshift from "was"' },
          { start: 120, end: 129, kind: 'verb', label: 'past perfect', targetId: 'had-asked-1', tooltip: 'had asked = backshift from "asked"' },
          { start: 159, end: 163, kind: 'pattern', label: 'reporting verb', targetId: 'told-1', tooltip: 'told = reporting verb (needs object)' },
          { start: 179, end: 189, kind: 'verb', label: 'past perfect', targetId: 'had-worked-1', tooltip: 'had worked = backshift from "worked"' },
          { start: 228, end: 232, kind: 'pattern', label: 'reporting verb', targetId: 'said-2', tooltip: 'said = reporting verb' },
          { start: 243, end: 246, kind: 'verb', label: 'past simple', targetId: 'was-1', tooltip: 'was = backshift from "am"' },
          { start: 282, end: 286, kind: 'pattern', label: 'reporting verb', targetId: 'told-2', tooltip: 'told = reporting verb (needs object)' },
          { start: 302, end: 307, kind: 'verb', label: 'would', targetId: 'would-1', tooltip: 'would = backshift from "will"' },
          { start: 337, end: 341, kind: 'pattern', label: 'reporting verb', targetId: 'said-3', tooltip: 'said = reporting verb' },
          { start: 345, end: 349, kind: 'verb', label: 'past simple', targetId: 'felt-1', tooltip: 'felt = backshift from "feel"' },
          { start: 385, end: 390, kind: 'pattern', label: 'reporting verb', targetId: 'asked-1', tooltip: 'asked = reporting verb for questions' },
          { start: 419, end: 426, kind: 'pattern', label: 'reporting verb', targetId: 'replied-1', tooltip: 'replied = reporting verb' },
          { start: 437, end: 448, kind: 'verb', label: 'past perfect', targetId: 'had-offered-1', tooltip: 'had offered = backshift from "offered"' },
          { start: 478, end: 482, kind: 'pattern', label: 'reporting verb', targetId: 'said-4', tooltip: 'said = reporting verb' },
          { start: 493, end: 497, kind: 'verb', label: 'past simple', targetId: 'were-1', tooltip: 'were = backshift from "are"' }
        ],
        audioUrl: undefined
      }
    ],
    exercises: [
      {
        id: 'rep-ex-1',
        type: 'pattern-recognition',
        contextId: 'reported-story-1',
        prompt: 'Find all the reporting verbs (said, told, asked, replied).',
        interaction: 'select-highlight',
        correctTargets: ['said-1', 'told-1', 'said-2', 'told-2', 'said-3', 'asked-1', 'replied-1', 'said-4'],
        hint: 'Reporting verbs introduce what someone said',
        successMessage: 'Great! These verbs introduce reported speech.'
      },
      {
        id: 'rep-ex-2',
        type: 'pattern-recognition',
        contextId: 'reported-story-1',
        prompt: 'Find the past perfect verbs (had + past participle).',
        interaction: 'select-highlight',
        correctTargets: ['had-been-1', 'had-asked-1', 'had-worked-1', 'had-offered-1'],
        hint: 'Past perfect is used when the original was past simple',
        successMessage: 'Excellent! Past simple becomes past perfect in reported speech.'
      },
      {
        id: 'rep-ex-3',
        type: 'fill-blank',
        contextId: 'reported-story-1',
        prompt: 'Direct: "I am happy." → Reported: She said she _____ happy.',
        interaction: 'short-answer',
        correctAnswer: 'was',
        acceptedAnswers: ['was'],
        recastExamples: [
          { commonWrong: 'is', recast: 'Almost! In reported speech, "am/is" becomes "was". Say: "She said she was happy."' },
          { commonWrong: 'were', recast: 'Close! For "she", use "was", not "were". Say: "She said she was happy."' }
        ],
        hint: '"Am/is" becomes "was" in reported speech',
        successMessage: 'Perfect! "Am" becomes "was" in reported speech.'
      },
      {
        id: 'rep-ex-4',
        type: 'fill-blank',
        contextId: 'reported-story-1',
        prompt: 'Direct: "I will call you." → Reported: He said he _____ call me.',
        interaction: 'short-answer',
        correctAnswer: 'would',
        acceptedAnswers: ['would'],
        recastExamples: [
          { commonWrong: 'will', recast: 'Almost! In reported speech, "will" becomes "would". Say: "He said he would call me."' }
        ],
        hint: '"Will" becomes "would" in reported speech',
        successMessage: 'Correct! "Will" becomes "would" in reported speech.'
      },
      {
        id: 'rep-ex-5',
        type: 'mcq',
        contextId: 'reported-story-1',
        prompt: 'Direct: "I have finished." → Reported: She said she _____.',
        interaction: 'mcq',
        options: ['has finished', 'had finished', 'have finished', 'finished'],
        correctAnswer: 'had finished',
        hint: 'Present perfect becomes past perfect',
        successMessage: 'Right! "Have/has" becomes "had" in reported speech.'
      }
    ],
    chunks: ['said that', 'told me that', 'asked if', 'replied that'],
    quickRecap: 'Reported Speech tells what someone said. Tenses shift back: am/is→was, are→were, will→would, have→had. Use "said" alone or "told + person". For questions, use "asked if/whether". Pronouns change too (I→he/she, my→his/her).'
  },

  // Lesson 11: Articles (a/an/the)
  {
    id: 'natural-articles',
    title: 'A Day at the Zoo',
    slug: 'a-day-at-the-zoo',
    description: 'Learn articles naturally through a story about visiting the zoo.',
    level: 'beginner',
    topic: 'Articles',
    targetPattern: 'a/an (indefinite) vs the (definite) vs zero article',
    is_premium: false,
    estimated_time: 13,
    contexts: [
      {
        id: 'articles-story-1',
        title: 'Visiting the Zoo',
        text: 'Last Sunday, we went to the zoo. It was a beautiful day with a clear blue sky. At the entrance, we bought a map and an ice cream. The map showed all the animals. First, we saw the elephants. An elephant was eating leaves. The elephant was huge! Then we visited the monkey house. A monkey was playing with a ball. We also saw a lion sleeping in the sun. The lion looked very peaceful. For lunch, we ate at a restaurant near the lake. The food was delicious. It was an amazing day!',
        annotations: [
          { start: 28, end: 31, kind: 'pattern', label: 'the (specific)', targetId: 'the-1', tooltip: 'the zoo = specific place we\'re talking about' },
          { start: 42, end: 43, kind: 'pattern', label: 'a (first mention)', targetId: 'a-1', tooltip: 'a beautiful day = first mention, not specific' },
          { start: 62, end: 63, kind: 'pattern', label: 'a (first mention)', targetId: 'a-2', tooltip: 'a clear blue sky = first mention' },
          { start: 79, end: 82, kind: 'pattern', label: 'the (known)', targetId: 'the-2', tooltip: 'the entrance = the entrance of the zoo (known)' },
          { start: 94, end: 95, kind: 'pattern', label: 'a (first mention)', targetId: 'a-3', tooltip: 'a map = first mention' },
          { start: 104, end: 106, kind: 'pattern', label: 'an (before vowel)', targetId: 'an-1', tooltip: 'an ice cream = "an" before vowel sound' },
          { start: 119, end: 122, kind: 'pattern', label: 'the (mentioned before)', targetId: 'the-3', tooltip: 'the map = already mentioned' },
          { start: 138, end: 141, kind: 'pattern', label: 'the (general group)', targetId: 'the-4', tooltip: 'the animals = all animals at the zoo' },
          { start: 161, end: 164, kind: 'pattern', label: 'the (specific group)', targetId: 'the-5', tooltip: 'the elephants = the elephants at this zoo' },
          { start: 166, end: 168, kind: 'pattern', label: 'an (first mention)', targetId: 'an-2', tooltip: 'an elephant = one elephant, first mention' },
          { start: 193, end: 196, kind: 'pattern', label: 'the (same one)', targetId: 'the-6', tooltip: 'the elephant = the same elephant mentioned before' },
          { start: 227, end: 230, kind: 'pattern', label: 'the (specific)', targetId: 'the-7', tooltip: 'the monkey house = specific place' },
          { start: 232, end: 233, kind: 'pattern', label: 'a (first mention)', targetId: 'a-4', tooltip: 'a monkey = one monkey, first mention' },
          { start: 257, end: 258, kind: 'pattern', label: 'a (first mention)', targetId: 'a-5', tooltip: 'a ball = first mention' },
          { start: 276, end: 277, kind: 'pattern', label: 'a (first mention)', targetId: 'a-6', tooltip: 'a lion = first mention' },
          { start: 296, end: 299, kind: 'pattern', label: 'the (unique)', targetId: 'the-8', tooltip: 'the sun = unique, only one sun' },
          { start: 301, end: 304, kind: 'pattern', label: 'the (same one)', targetId: 'the-9', tooltip: 'the lion = the same lion mentioned before' },
          { start: 351, end: 352, kind: 'pattern', label: 'a (first mention)', targetId: 'a-7', tooltip: 'a restaurant = first mention' },
          { start: 363, end: 366, kind: 'pattern', label: 'the (specific)', targetId: 'the-10', tooltip: 'the lake = specific lake at the zoo' },
          { start: 368, end: 371, kind: 'pattern', label: 'the (mentioned)', targetId: 'the-11', tooltip: 'the food = the food at the restaurant' },
          { start: 400, end: 402, kind: 'pattern', label: 'an (before vowel)', targetId: 'an-3', tooltip: 'an amazing day = "an" before vowel sound' }
        ],
        audioUrl: undefined
      }
    ],
    exercises: [
      {
        id: 'art-ex-1',
        type: 'pattern-recognition',
        contextId: 'articles-story-1',
        prompt: 'Find all uses of "a" (first mention of something).',
        interaction: 'select-highlight',
        correctTargets: ['a-1', 'a-2', 'a-3', 'a-4', 'a-5', 'a-6', 'a-7'],
        hint: '"A" is used for first mention or non-specific things',
        successMessage: 'Great! "A" introduces something for the first time.'
      },
      {
        id: 'art-ex-2',
        type: 'pattern-recognition',
        contextId: 'articles-story-1',
        prompt: 'Find all uses of "an" (before vowel sounds).',
        interaction: 'select-highlight',
        correctTargets: ['an-1', 'an-2', 'an-3'],
        hint: '"An" is used before words starting with vowel sounds (a, e, i, o, u)',
        successMessage: 'Excellent! "An" is used before vowel sounds.'
      },
      {
        id: 'art-ex-3',
        type: 'fill-blank',
        contextId: 'articles-story-1',
        prompt: 'Complete: I saw _____ elephant at the zoo.',
        interaction: 'short-answer',
        correctAnswer: 'an',
        acceptedAnswers: ['an'],
        recastExamples: [
          { commonWrong: 'a', recast: 'Almost! "Elephant" starts with a vowel sound, so use "an". Say: "an elephant"' },
          { commonWrong: 'the', recast: 'Close! For first mention of any elephant, use "an". Say: "I saw an elephant."' }
        ],
        hint: 'Use "an" before words starting with vowel sounds',
        successMessage: 'Perfect! "An" is used before "elephant" (vowel sound).'
      },
      {
        id: 'art-ex-4',
        type: 'fill-blank',
        contextId: 'articles-story-1',
        prompt: 'Complete: I bought a book. _____ book was interesting.',
        interaction: 'short-answer',
        correctAnswer: 'The',
        acceptedAnswers: ['The', 'the'],
        recastExamples: [
          { commonWrong: 'A', recast: 'Almost! We already mentioned the book, so use "the". Say: "The book was interesting."' }
        ],
        hint: 'Use "the" when we already know which one',
        successMessage: 'Correct! "The" is used for something already mentioned.'
      },
      {
        id: 'art-ex-5',
        type: 'mcq',
        contextId: 'articles-story-1',
        prompt: 'Which is correct?',
        interaction: 'mcq',
        options: ['I need a umbrella.', 'I need an umbrella.', 'I need the umbrella.', 'I need umbrella.'],
        correctAnswer: 'I need an umbrella.',
        hint: '"Umbrella" starts with a vowel sound',
        successMessage: 'Right! "An umbrella" because "umbrella" starts with a vowel sound.'
      }
    ],
    chunks: ['a lot of', 'the same', 'in the morning', 'at the end'],
    quickRecap: 'Articles: "A/an" for first mention or non-specific (a book, an apple). "The" for specific or already mentioned (the book I bought). Use "an" before vowel sounds (an hour, an umbrella). No article for general plurals (I like dogs) or uncountable nouns (Water is important).'
  },

  // Lesson 12: Countable/Uncountable Nouns
  {
    id: 'natural-countable',
    title: 'At the Supermarket',
    slug: 'at-the-supermarket',
    description: 'Learn countable and uncountable nouns naturally through shopping.',
    level: 'beginner',
    topic: 'Countable & Uncountable Nouns',
    targetPattern: 'many/few (countable) vs much/little (uncountable)',
    is_premium: false,
    estimated_time: 14,
    contexts: [
      {
        id: 'countable-story-1',
        title: 'Shopping for Dinner',
        text: 'Mom is making a shopping list for dinner. She needs some rice and a little oil for cooking. She also wants to buy some vegetables. "How many tomatoes do we need?" asks her son. "We need five tomatoes and some lettuce," she replies. "Do we have any milk?" "No, we don\'t have much milk left. Buy two bottles, please." At the store, they also get some bread, a few eggs, and a little butter. "How much sugar do we have at home?" Mom thinks. "We have enough sugar, but we need some flour." They don\'t buy many snacks because they want to eat healthy food.',
        annotations: [
          { start: 60, end: 64, kind: 'pattern', label: 'some (uncountable)', targetId: 'some-1', tooltip: 'some rice = uncountable noun' },
          { start: 73, end: 81, kind: 'pattern', label: 'a little (uncountable)', targetId: 'a-little-1', tooltip: 'a little oil = small amount of uncountable' },
          { start: 128, end: 132, kind: 'pattern', label: 'some (plural)', targetId: 'some-2', tooltip: 'some vegetables = countable plural' },
          { start: 135, end: 143, kind: 'pattern', label: 'how many (countable)', targetId: 'how-many-1', tooltip: 'how many tomatoes = countable question' },
          { start: 186, end: 190, kind: 'pattern', label: 'number (countable)', targetId: 'five-1', tooltip: 'five tomatoes = countable, can use numbers' },
          { start: 205, end: 209, kind: 'pattern', label: 'some (uncountable)', targetId: 'some-3', tooltip: 'some lettuce = uncountable noun' },
          { start: 237, end: 240, kind: 'pattern', label: 'any (question)', targetId: 'any-1', tooltip: 'any milk = question form' },
          { start: 264, end: 268, kind: 'pattern', label: 'much (uncountable)', targetId: 'much-1', tooltip: 'much milk = uncountable in negative' },
          { start: 285, end: 288, kind: 'pattern', label: 'number (countable)', targetId: 'two-1', tooltip: 'two bottles = countable, can use numbers' },
          { start: 330, end: 334, kind: 'pattern', label: 'some (uncountable)', targetId: 'some-4', tooltip: 'some bread = uncountable noun' },
          { start: 336, end: 341, kind: 'pattern', label: 'a few (countable)', targetId: 'a-few-1', tooltip: 'a few eggs = small number of countable' },
          { start: 353, end: 361, kind: 'pattern', label: 'a little (uncountable)', targetId: 'a-little-2', tooltip: 'a little butter = small amount of uncountable' },
          { start: 371, end: 379, kind: 'pattern', label: 'how much (uncountable)', targetId: 'how-much-1', tooltip: 'how much sugar = uncountable question' },
          { start: 417, end: 423, kind: 'pattern', label: 'enough (both)', targetId: 'enough-1', tooltip: 'enough sugar = works with both types' },
          { start: 445, end: 449, kind: 'pattern', label: 'some (uncountable)', targetId: 'some-5', tooltip: 'some flour = uncountable noun' },
          { start: 467, end: 471, kind: 'pattern', label: 'many (countable)', targetId: 'many-1', tooltip: 'many snacks = countable in negative' }
        ],
        audioUrl: undefined
      }
    ],
    exercises: [
      {
        id: 'count-ex-1',
        type: 'pattern-recognition',
        contextId: 'countable-story-1',
        prompt: 'Find all uses of "much" and "how much" (for uncountable nouns).',
        interaction: 'select-highlight',
        correctTargets: ['much-1', 'how-much-1'],
        hint: '"Much" is used with uncountable nouns',
        successMessage: 'Great! "Much" is for uncountable nouns (milk, sugar, water).'
      },
      {
        id: 'count-ex-2',
        type: 'pattern-recognition',
        contextId: 'countable-story-1',
        prompt: 'Find all uses of "many" and "how many" (for countable nouns).',
        interaction: 'select-highlight',
        correctTargets: ['how-many-1', 'many-1'],
        hint: '"Many" is used with countable nouns',
        successMessage: 'Excellent! "Many" is for countable nouns (tomatoes, eggs, snacks).'
      },
      {
        id: 'count-ex-3',
        type: 'fill-blank',
        contextId: 'countable-story-1',
        prompt: 'Complete: How _____ water do you drink every day?',
        interaction: 'short-answer',
        correctAnswer: 'much',
        acceptedAnswers: ['much'],
        recastExamples: [
          { commonWrong: 'many', recast: 'Almost! "Water" is uncountable, so use "much". Say: "How much water..."' }
        ],
        hint: 'Water is uncountable - use "much"',
        successMessage: 'Perfect! "How much" is used for uncountable nouns.'
      },
      {
        id: 'count-ex-4',
        type: 'fill-blank',
        contextId: 'countable-story-1',
        prompt: 'Complete: I have _____ friends in this city. (small number)',
        interaction: 'short-answer',
        correctAnswer: 'a few',
        acceptedAnswers: ['a few', 'few'],
        recastExamples: [
          { commonWrong: 'a little', recast: 'Almost! "Friends" is countable, so use "a few". Say: "I have a few friends."' },
          { commonWrong: 'little', recast: 'Close! "Friends" is countable. Use "a few" for countable nouns.' }
        ],
        hint: 'Friends are countable - use "a few"',
        successMessage: 'Correct! "A few" is used for countable nouns.'
      },
      {
        id: 'count-ex-5',
        type: 'mcq',
        contextId: 'countable-story-1',
        prompt: 'Which is UNCOUNTABLE?',
        interaction: 'mcq',
        options: ['apple', 'information', 'book', 'egg'],
        correctAnswer: 'information',
        hint: 'Uncountable nouns cannot be counted with numbers',
        successMessage: 'Right! "Information" is uncountable - we say "some information", not "two informations".'
      },
      {
        id: 'count-ex-6',
        type: 'fill-blank',
        contextId: 'countable-story-1',
        prompt: 'Complete: There isn\'t _____ time left. (uncountable)',
        interaction: 'short-answer',
        correctAnswer: 'much',
        acceptedAnswers: ['much', 'any'],
        recastExamples: [
          { commonWrong: 'many', recast: 'Almost! "Time" is uncountable, so use "much". Say: "There isn\'t much time."' }
        ],
        hint: 'Time is uncountable - use "much" in negatives',
        successMessage: 'Perfect! "Much" is used with uncountable nouns in negatives.'
      }
    ],
    chunks: ['a lot of', 'a little bit of', 'a few more', 'how much', 'how many'],
    quickRecap: 'Countable nouns can be counted (one apple, two books). Uncountable nouns cannot (water, rice, information). Use "many/few/a few" with countable. Use "much/little/a little" with uncountable. "Some" and "a lot of" work with both!'
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
              ${shouldHighlight ? `${colors.bg} ${colors.text} border ${colors.border}` : 'hover:bg-muted'}
              ${isSelected ? 'ring-2 ring-offset-1 ring-accent font-semibold' : ''}
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
      <div className="flex items-center gap-2 text-muted-foreground/70 text-sm">
        <VolumeX className="h-4 w-4" />
        <span>Audio coming soon</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-3 bg-accent/10 rounded-lg p-3">
      <audio ref={audioRef} src={audioUrl} />
      <Button
        variant="ghost"
        size="sm"
        onClick={togglePlay}
        className="h-10 w-10 rounded-full bg-accent hover:bg-accent/90 text-white"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
      </Button>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Volume2 className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium text-foreground">Listen to: {title}</span>
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
        return 'bg-muted border-border text-foreground';
      default:
        return 'bg-muted border-border text-foreground';
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
        return <Eye className="h-5 w-5 text-accent" />;
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
      <div className="min-h-screen bg-gradient-to-b from-muted/50 to-background">
        <div className="py-12 bg-foreground text-background">
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
            <h2 className="text-xl font-semibold text-foreground mb-2">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border shadow-sm">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mb-3">
                  <BookOpen className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-medium mb-1">1. Read & Listen</h3>
                <p className="text-sm text-muted-foreground">Immerse yourself in a short story with highlighted patterns.</p>
              </div>
              <div className="bg-white rounded-lg p-4 border shadow-sm">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-medium mb-1">2. Spot Patterns</h3>
                <p className="text-sm text-muted-foreground">Identify grammar patterns naturally from the context.</p>
              </div>
              <div className="bg-white rounded-lg p-4 border shadow-sm">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                  <MessageCircle className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="font-medium mb-1">3. Gentle Feedback</h3>
                <p className="text-sm text-muted-foreground">Get friendly corrections, not harsh "wrong" messages.</p>
              </div>
              <div className="bg-white rounded-lg p-4 border shadow-sm">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mb-3">
                  <Award className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-medium mb-1">4. Natural Mastery</h3>
                <p className="text-sm text-muted-foreground">Build intuition for correct grammar usage.</p>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-foreground mb-4">Available Lessons</h2>
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
                      'bg-muted text-foreground'
                    }>
                      {lesson.level}
                    </Badge>
                    {lesson.is_premium && (
                      <Badge variant="outline" className="text-amber-600 border-amber-300">
                        Premium
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-accent transition-colors">
                    {lesson.title}
                  </CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span>{lesson.contexts.length} stories</span>
                      <span>{lesson.exercises.length} exercises</span>
                    </div>
                    <span className="flex items-center gap-1 text-accent group-hover:translate-x-1 transition-transform">
                      Start
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Prefer traditional grammar exercises?</p>
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
      <div className="min-h-screen bg-muted py-8">
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
              <div className="flex items-center gap-2 text-accent mb-2">
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
              
              <div className="bg-accent/10 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
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
      <div className="min-h-screen bg-muted py-8">
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
          <Card className="mb-4 bg-muted">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
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
              <div className="flex items-center gap-2 text-accent mb-2">
                <Target className="h-5 w-5" />
                <span className="text-sm font-medium capitalize">{currentExercise.type.replace('-', ' ')}</span>
              </div>
              <CardTitle className="text-xl">{currentExercise.prompt}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pattern Recognition - Select Highlight */}
              {currentExercise.interaction === 'select-highlight' && (
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Click on the words in the story above that match the question.
                  </p>
                  {selectedTargets.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-muted-foreground">Selected:</span>
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
                            ? 'border-accent bg-accent/10'
                            : 'border-border hover:border-accent/50 hover:bg-accent/10'
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
      <div className="min-h-screen bg-muted py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-foreground to-foreground/80 rounded-full flex items-center justify-center mb-4">
                <Award className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl">Lesson Complete!</CardTitle>
              <CardDescription>{selectedLesson.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-5xl font-bold text-accent">{percentage}%</div>
              <p className="text-muted-foreground">
                You got {score} out of {selectedLesson.exercises.length} correct
              </p>
              <Progress value={percentage} className="h-3" />
              
              {selectedLesson.quickRecap && (
                <div className="bg-accent/10 rounded-lg p-4 text-left">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    What You Learned
                  </h4>
                  <p className="text-sm text-muted-foreground">{selectedLesson.quickRecap}</p>
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
