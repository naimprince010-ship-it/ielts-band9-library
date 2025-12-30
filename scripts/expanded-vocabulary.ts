import { createClient, SupabaseClient } from '@supabase/supabase-js';

interface VocabularyWord {
  word: string;
  definition: string;
  part_of_speech: string;
  topic: string;
  difficulty_level: string;
}

const BATCH_SIZE = 100;

function getSupabaseClient(): SupabaseClient {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase credentials.');
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

// Extended Academic Word List (AWL) - Sublists 5-10
const AWL_EXTENDED: VocabularyWord[] = [
  // Sublist 5
  { word: 'academy', definition: 'A place of study or training', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'adjust', definition: 'To alter or move slightly to achieve a desired result', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'alter', definition: 'To change in character or composition', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'amend', definition: 'To make minor changes to improve or correct', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'aware', definition: 'Having knowledge or perception of a situation', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'capacity', definition: 'The maximum amount that something can contain', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'challenge', definition: 'A call to prove or justify something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'clause', definition: 'A unit of grammatical organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'compound', definition: 'A thing composed of two or more elements', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'conflict', definition: 'A serious disagreement or argument', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'consult', definition: 'To seek information or advice from someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'contact', definition: 'The state of physical touching', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'beginner' },
  { word: 'decline', definition: 'To become smaller, fewer, or less', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'discrete', definition: 'Individually separate and distinct', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'draft', definition: 'A preliminary version of a piece of writing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'enable', definition: 'To give someone the authority or means to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'energy', definition: 'The strength and vitality required for activity', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'beginner' },
  { word: 'enforce', definition: 'To compel observance of or compliance with', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'entity', definition: 'A thing with distinct and independent existence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'equivalent', definition: 'Equal in value, amount, function, or meaning', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'evolve', definition: 'To develop gradually over time', part_of_speech: 'verb', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'expand', definition: 'To become or make larger or more extensive', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'expose', definition: 'To make visible or reveal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'external', definition: 'Belonging to or forming the outer surface', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'facilitate', definition: 'To make an action or process easier', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fundamental', definition: 'Forming a necessary base or core', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'generate', definition: 'To cause something to arise or come about', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'generation', definition: 'All of the people born at about the same time', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'image', definition: 'A representation of the external form of a person or thing', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'beginner' },
  { word: 'liberal', definition: 'Willing to respect or accept different behaviors or opinions', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'license', definition: 'A permit from an authority to do something', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'logic', definition: 'Reasoning conducted according to strict principles', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'margin', definition: 'The edge or border of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'medical', definition: 'Relating to the science of medicine', part_of_speech: 'adjective', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'mental', definition: 'Relating to the mind', part_of_speech: 'adjective', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'modify', definition: 'To make partial or minor changes to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'monitor', definition: 'To observe and check over a period of time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'network', definition: 'A group of interconnected people or things', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'notion', definition: 'A conception of or belief about something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'objective', definition: 'A thing aimed at or sought; a goal', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'orient', definition: 'To align or position relative to a reference point', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'perspective', definition: 'A particular attitude toward something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'precise', definition: 'Marked by exactness and accuracy of expression', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'prime', definition: 'Of first importance; main', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'psychology', definition: 'The scientific study of the human mind', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'pursue', definition: 'To follow in order to catch or attack', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ratio', definition: 'The quantitative relation between two amounts', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'reject', definition: 'To dismiss as inadequate or unacceptable', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'revenue', definition: 'Income, especially of an organization', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'stable', definition: 'Not likely to change or fail; firmly established', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'style', definition: 'A manner of doing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'beginner' },
  { word: 'substitute', definition: 'A person or thing acting in place of another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sustain', definition: 'To strengthen or support physically or mentally', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'symbol', definition: 'A thing that represents something else', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'target', definition: 'A person, object, or place selected as the aim', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'transit', definition: 'The carrying of people or goods from one place to another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'trend', definition: 'A general direction in which something is developing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'version', definition: 'A particular form of something differing from others', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'welfare', definition: 'The health, happiness, and fortunes of a person', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'whereas', definition: 'In contrast or comparison with the fact that', part_of_speech: 'conjunction', topic: 'Linking', difficulty_level: 'intermediate' },
  // Sublist 6
  { word: 'abstract', definition: 'Existing in thought or as an idea but not having physical existence', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accurate', definition: 'Correct in all details; exact', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'acknowledge', definition: 'To accept or admit the existence or truth of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'aggregate', definition: 'A whole formed by combining several elements', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'allocate', definition: 'To distribute for a particular purpose', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'assign', definition: 'To allocate a task or duty to someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'attach', definition: 'To fasten or join one thing to another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'author', definition: 'A writer of a book, article, or document', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'bond', definition: 'A thing used to tie something or fasten things together', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'brief', definition: 'Of short duration; not lasting long', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'capable', definition: 'Having the ability or quality necessary to do something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'cite', definition: 'To quote as evidence for an argument', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'cooperate', definition: 'To work jointly with others toward the same end', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'discriminate', definition: 'To recognize a distinction; differentiate', part_of_speech: 'verb', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'display', definition: 'To make a prominent exhibition of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'diverse', definition: 'Showing a great deal of variety', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'domain', definition: 'An area of territory owned or controlled', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'edit', definition: 'To prepare written material for publication', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'enhance', definition: 'To intensify, increase, or further improve', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'estate', definition: 'An extensive area of land in the country', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'exceed', definition: 'To be greater in number or size than', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'expert', definition: 'A person who is very knowledgeable about a subject', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'explicit', definition: 'Stated clearly and in detail', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'federal', definition: 'Having or relating to a system of government', part_of_speech: 'adjective', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'fee', definition: 'A payment made for professional advice or services', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'flexible', definition: 'Capable of bending easily without breaking', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'furthermore', definition: 'In addition; besides', part_of_speech: 'adverb', topic: 'Linking', difficulty_level: 'intermediate' },
  { word: 'gender', definition: 'The state of being male or female', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'ignorance', definition: 'Lack of knowledge or information', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'incentive', definition: 'A thing that motivates or encourages someone', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'incidence', definition: 'The occurrence, rate, or frequency of something', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'incorporate', definition: 'To take in or include as part of a whole', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'index', definition: 'An alphabetical list of names or subjects', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inhibit', definition: 'To hinder, restrain, or prevent an action', part_of_speech: 'verb', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'initiate', definition: 'To cause a process or action to begin', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'input', definition: 'What is put in, taken in, or operated on', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'instruct', definition: 'To direct or command someone to do something', part_of_speech: 'verb', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'intelligence', definition: 'The ability to acquire and apply knowledge', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'interval', definition: 'A pause or break in activity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'lecture', definition: 'An educational talk to an audience', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'migrate', definition: 'To move from one region or habitat to another', part_of_speech: 'verb', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'minimum', definition: 'The least or smallest amount possible', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ministry', definition: 'A government department headed by a minister', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'motive', definition: 'A reason for doing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'neutral', definition: 'Not supporting either side in a conflict', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'nevertheless', definition: 'In spite of that; notwithstanding', part_of_speech: 'adverb', topic: 'Linking', difficulty_level: 'intermediate' },
  { word: 'overseas', definition: 'In or to a foreign country across the sea', part_of_speech: 'adverb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'precede', definition: 'To come before something in time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'presume', definition: 'To suppose that something is the case', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rational', definition: 'Based on or in accordance with reason or logic', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'recover', definition: 'To return to a normal state of health or strength', part_of_speech: 'verb', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'reveal', definition: 'To make previously unknown information known', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'scope', definition: 'The extent of the area or subject matter', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'subsidy', definition: 'A sum of money granted to support an enterprise', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'tape', definition: 'A narrow strip of material', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'beginner' },
  { word: 'trace', definition: 'To find or discover by investigation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'transform', definition: 'To make a thorough or dramatic change', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'transport', definition: 'To take or carry from one place to another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'underlie', definition: 'To be the cause or basis of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'utilize', definition: 'To make practical and effective use of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  // Sublist 7
  { word: 'adapt', definition: 'To make suitable for a new use or purpose', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'adult', definition: 'A person who is fully grown or developed', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'beginner' },
  { word: 'advocate', definition: 'A person who publicly supports a cause', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'aid', definition: 'Help or support', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'channel', definition: 'A band of frequencies used in radio and television', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'chemical', definition: 'A compound or substance', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'classic', definition: 'Judged over time to be of the highest quality', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'comprehensive', definition: 'Complete; including all or nearly all elements', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'comprise', definition: 'To consist of; be made up of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'confirm', definition: 'To establish the truth or correctness of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'contrary', definition: 'Opposite in nature, direction, or meaning', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'convert', definition: 'To change the form, character, or function of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'couple', definition: 'Two individuals of the same sort considered together', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'beginner' },
  { word: 'decade', definition: 'A period of ten years', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'definite', definition: 'Clearly stated or decided; not vague', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'deny', definition: 'To state that something is not true', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'differentiate', definition: 'To recognize or identify as different', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dispose', definition: 'To get rid of by throwing away or giving away', part_of_speech: 'verb', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'dynamic', definition: 'Characterized by constant change or activity', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'eliminate', definition: 'To completely remove or get rid of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'empirical', definition: 'Based on observation or experience', part_of_speech: 'adjective', topic: 'Science', difficulty_level: 'advanced' },
  { word: 'equip', definition: 'To supply with the necessary items', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'extract', definition: 'To remove or take out', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'file', definition: 'A folder or box for holding loose papers', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'beginner' },
  { word: 'finite', definition: 'Limited in size or extent', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'foundation', definition: 'The lowest load-bearing part of a building', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'globe', definition: 'The earth', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'grade', definition: 'A particular level of rank, quality, or value', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'guarantee', definition: 'A formal promise or assurance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'hierarchy', definition: 'A system in which members are ranked', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'advanced' },
  { word: 'identical', definition: 'Similar in every detail; exactly alike', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ideology', definition: 'A system of ideas and ideals', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'advanced' },
  { word: 'infer', definition: 'To deduce or conclude from evidence', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'innovate', definition: 'To make changes in something established', part_of_speech: 'verb', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'insert', definition: 'To place, fit, or push something into something else', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'intervene', definition: 'To come between so as to prevent or alter', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'isolate', definition: 'To cause to be or remain alone or apart', part_of_speech: 'verb', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'media', definition: 'The main means of mass communication', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'mode', definition: 'A way or manner in which something occurs', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'paradigm', definition: 'A typical example or pattern of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'phenomenon', definition: 'A fact or situation that is observed to exist', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'priority', definition: 'The fact or condition of being regarded as more important', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'prohibit', definition: 'To formally forbid by law, rule, or authority', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'publication', definition: 'The preparation and issuing of a book or journal', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'quote', definition: 'To repeat or copy out words from a text', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'release', definition: 'To allow or enable to escape from confinement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reverse', definition: 'To move backward', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'simulate', definition: 'To imitate the appearance or character of', part_of_speech: 'verb', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'sole', definition: 'One and only', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'somewhat', definition: 'To a moderate extent or by a moderate amount', part_of_speech: 'adverb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'submit', definition: 'To accept or yield to a superior force', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'successor', definition: 'A person or thing that succeeds another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'survive', definition: 'To continue to live or exist', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'thesis', definition: 'A statement or theory put forward to be proved', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'topic', definition: 'A matter dealt with in a text or discussion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'transmit', definition: 'To cause something to pass on from one place to another', part_of_speech: 'verb', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'ultimate', definition: 'Being or happening at the end of a process', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'unique', definition: 'Being the only one of its kind', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'visible', definition: 'Able to be seen', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'voluntary', definition: 'Done, given, or acting of one\'s own free will', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'intermediate' },
];

// Additional IELTS Topic Vocabulary - Extended
const EXTENDED_TOPICS: VocabularyWord[] = [
  // Education Extended
  { word: 'accreditation', definition: 'Official recognition that an organization meets certain standards', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'advanced' },
  { word: 'alumni', definition: 'Former students of a school or university', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'aptitude', definition: 'A natural ability to do something', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'bilingual', definition: 'Speaking two languages fluently', part_of_speech: 'adjective', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'compulsory', definition: 'Required by law or a rule; obligatory', part_of_speech: 'adjective', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'credential', definition: 'A qualification or achievement', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'curriculum', definition: 'The subjects comprising a course of study', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'diploma', definition: 'A certificate awarded by an educational establishment', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'dropout', definition: 'A person who has abandoned a course of study', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'elective', definition: 'A course that a student can choose to take', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'enrollment', definition: 'The action of enrolling or being enrolled', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'faculty', definition: 'The teaching staff of a university', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'illiteracy', definition: 'The inability to read or write', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'matriculate', definition: 'To be enrolled at a college or university', part_of_speech: 'verb', topic: 'Education', difficulty_level: 'advanced' },
  { word: 'prerequisite', definition: 'A thing that is required as a prior condition', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'proficiency', definition: 'A high degree of competence or skill', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'remedial', definition: 'Giving or intended as a remedy or cure', part_of_speech: 'adjective', topic: 'Education', difficulty_level: 'intermediate' },
  { word: 'sabbatical', definition: 'A period of paid leave granted to a teacher', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'advanced' },
  { word: 'tenure', definition: 'The holding of an office or position', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'advanced' },
  { word: 'truancy', definition: 'The action of staying away from school without permission', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
  
  // Environment Extended
  { word: 'afforestation', definition: 'The establishment of a forest in an area', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'advanced' },
  { word: 'aquifer', definition: 'A body of rock that holds groundwater', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'advanced' },
  { word: 'biodegradable', definition: 'Capable of being decomposed by bacteria', part_of_speech: 'adjective', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'biofuel', definition: 'A fuel derived from living matter', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'carbon-neutral', definition: 'Making no net release of carbon dioxide', part_of_speech: 'adjective', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'compost', definition: 'Decayed organic material used as fertilizer', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'desertification', definition: 'The process by which fertile land becomes desert', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'advanced' },
  { word: 'drought', definition: 'A prolonged period of abnormally low rainfall', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'effluent', definition: 'Liquid waste or sewage discharged into water', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'advanced' },
  { word: 'endangered', definition: 'Seriously at risk of extinction', part_of_speech: 'adjective', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'fauna', definition: 'The animals of a particular region or period', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'flora', definition: 'The plants of a particular region or period', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'fossil', definition: 'The remains of a prehistoric organism', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'geothermal', definition: 'Relating to heat from the earth\'s interior', part_of_speech: 'adjective', topic: 'Environment', difficulty_level: 'advanced' },
  { word: 'glacier', definition: 'A slowly moving mass of ice', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'herbicide', definition: 'A substance used to destroy unwanted vegetation', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'hydroelectric', definition: 'Relating to electricity generated by water power', part_of_speech: 'adjective', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'landfill', definition: 'A place to dispose of refuse by burying it', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'ozone', definition: 'A form of oxygen with three atoms per molecule', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'pesticide', definition: 'A substance used for destroying insects', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'photosynthesis', definition: 'The process by which plants convert sunlight to energy', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'pollutant', definition: 'A substance that pollutes something', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'reforestation', definition: 'The replanting of trees in a deforested area', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'smog', definition: 'Fog or haze combined with smoke and pollutants', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'solar', definition: 'Relating to or determined by the sun', part_of_speech: 'adjective', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'toxic', definition: 'Poisonous', part_of_speech: 'adjective', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'turbine', definition: 'A machine for producing power', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'vegetation', definition: 'Plants considered collectively', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'watershed', definition: 'An area of land that drains into a river', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'wildlife', definition: 'Wild animals collectively', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
  
  // Technology Extended
  { word: 'application', definition: 'A computer program designed for a specific purpose', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'artificial', definition: 'Made or produced by human beings', part_of_speech: 'adjective', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'biometric', definition: 'Relating to the measurement of human characteristics', part_of_speech: 'adjective', topic: 'Technology', difficulty_level: 'advanced' },
  { word: 'blockchain', definition: 'A system of recording information in a way that makes it difficult to change', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'advanced' },
  { word: 'broadband', definition: 'A high-capacity transmission technique', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'browser', definition: 'A program used to navigate the internet', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'compatible', definition: 'Able to exist or work together without conflict', part_of_speech: 'adjective', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'database', definition: 'A structured set of data held in a computer', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'download', definition: 'To copy data from one computer system to another', part_of_speech: 'verb', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'encryption', definition: 'The process of converting information into code', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'advanced' },
  { word: 'firewall', definition: 'A system designed to prevent unauthorized access', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'hardware', definition: 'The physical components of a computer', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'malware', definition: 'Software designed to disrupt or damage a computer', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'nanotechnology', definition: 'Technology on an atomic or molecular scale', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'advanced' },
  { word: 'peripheral', definition: 'A device connected to a computer', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'processor', definition: 'A machine that processes something', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'robotics', definition: 'The branch of technology dealing with robots', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'server', definition: 'A computer that provides data to other computers', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'software', definition: 'The programs used by a computer', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'upload', definition: 'To transfer data to a larger computer system', part_of_speech: 'verb', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'virtual', definition: 'Not physically existing but made to appear so', part_of_speech: 'adjective', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'wireless', definition: 'Using radio waves rather than wires', part_of_speech: 'adjective', topic: 'Technology', difficulty_level: 'intermediate' },
  
  // Health Extended
  { word: 'addiction', definition: 'The fact of being addicted to a substance', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'ailment', definition: 'An illness, typically a minor one', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'allergy', definition: 'A damaging immune response to a substance', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'antibiotic', definition: 'A medicine that inhibits the growth of bacteria', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'cardiovascular', definition: 'Relating to the heart and blood vessels', part_of_speech: 'adjective', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'contagious', definition: 'Spread from one person to another by direct contact', part_of_speech: 'adjective', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'deficiency', definition: 'A lack or shortage', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'disorder', definition: 'A state of confusion or disruption', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'dosage', definition: 'The size or frequency of a dose of medicine', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'fatigue', definition: 'Extreme tiredness resulting from mental or physical exertion', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'genetic', definition: 'Relating to genes or heredity', part_of_speech: 'adjective', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'hygiene', definition: 'Conditions or practices conducive to maintaining health', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'infectious', definition: 'Likely to be transmitted to people through the environment', part_of_speech: 'adjective', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'metabolism', definition: 'The chemical processes that occur within a living organism', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'outbreak', definition: 'A sudden occurrence of something unwelcome', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'pathogen', definition: 'A bacterium, virus, or other microorganism that can cause disease', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'advanced' },
  { word: 'prescription', definition: 'An instruction written by a medical practitioner', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'quarantine', definition: 'A state of isolation to prevent the spread of disease', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'syndrome', definition: 'A group of symptoms that consistently occur together', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'transplant', definition: 'An operation in which an organ is transferred', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
  
  // Economy Extended
  { word: 'acquisition', definition: 'The buying or obtaining of assets or objects', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'asset', definition: 'A useful or valuable thing or person', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'audit', definition: 'An official inspection of an organization\'s accounts', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'bond', definition: 'A certificate issued by a government or company', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'budget', definition: 'An estimate of income and expenditure', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'capital', definition: 'Wealth in the form of money or assets', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'commerce', definition: 'The activity of buying and selling', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'consumption', definition: 'The using up of a resource', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'currency', definition: 'A system of money in general use', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'debt', definition: 'Something owed to someone else', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'dividend', definition: 'A sum of money paid to shareholders', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'equity', definition: 'The value of shares issued by a company', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'expenditure', definition: 'The action of spending funds', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'fiscal', definition: 'Relating to government revenue', part_of_speech: 'adjective', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'franchise', definition: 'An authorization to sell a company\'s goods', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'gross', definition: 'The overall total before deductions', part_of_speech: 'adjective', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'liability', definition: 'A thing for which someone is responsible', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'merger', definition: 'A combination of two things into one', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'mortgage', definition: 'A legal agreement to borrow money to buy property', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'portfolio', definition: 'A range of investments held by a person', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'profit', definition: 'A financial gain', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'quota', definition: 'A limited quantity of a product', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'retail', definition: 'The sale of goods to the public', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'shareholder', definition: 'An owner of shares in a company', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'stock', definition: 'The capital raised by a company through shares', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'transaction', definition: 'An instance of buying or selling something', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'wholesale', definition: 'The selling of goods in large quantities', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
];

// More Academic and General Words
const GENERAL_ACADEMIC: VocabularyWord[] = [
  { word: 'abandon', definition: 'To give up completely', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'abolish', definition: 'To formally put an end to', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'absorb', definition: 'To take in or soak up', part_of_speech: 'verb', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'abundance', definition: 'A very large quantity of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accelerate', definition: 'To increase in rate, amount, or extent', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accommodate', definition: 'To provide lodging or sufficient space for', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accompany', definition: 'To go somewhere with someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accomplish', definition: 'To achieve or complete successfully', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accumulate', definition: 'To gather together or acquire', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accuracy', definition: 'The quality of being correct or precise', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accuse', definition: 'To charge someone with an offense', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'acknowledge', definition: 'To accept or admit the existence of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'activate', definition: 'To make something active or operative', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'acute', definition: 'Present or experienced to a severe degree', part_of_speech: 'adjective', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'adjacent', definition: 'Next to or adjoining something else', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'administer', definition: 'To manage and be responsible for', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'adolescent', definition: 'A young person in the process of developing', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'adverse', definition: 'Preventing success or development', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'advocate', definition: 'To publicly recommend or support', part_of_speech: 'verb', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'aesthetic', definition: 'Concerned with beauty or appreciation of beauty', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'affiliate', definition: 'To officially attach or connect to an organization', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'aggregate', definition: 'A whole formed by combining several elements', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'aggressive', definition: 'Ready or likely to attack or confront', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'allocate', definition: 'To distribute for a particular purpose', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'allot', definition: 'To give or apportion something to someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'allude', definition: 'To suggest or call attention to indirectly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ambiguous', definition: 'Open to more than one interpretation', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ambitious', definition: 'Having a strong desire and determination to succeed', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'amend', definition: 'To make minor changes to improve', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'analogy', definition: 'A comparison between two things', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ancestor', definition: 'A person from whom one is descended', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'anchor', definition: 'A heavy object used to moor a vessel', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'anonymous', definition: 'Not identified by name', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'anticipate', definition: 'To regard as probable; expect', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'apparatus', definition: 'The technical equipment for a particular activity', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'appeal', definition: 'To make a serious or urgent request', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'append', definition: 'To add something as an attachment', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'appreciate', definition: 'To recognize the full worth of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'arbitrary', definition: 'Based on random choice rather than reason', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'archive', definition: 'A collection of historical documents or records', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'arise', definition: 'To emerge; become apparent', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'articulate', definition: 'To express an idea or feeling fluently', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ascertain', definition: 'To find out for certain', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'aspire', definition: 'To direct one\'s hopes or ambitions', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'assemble', definition: 'To gather together in one place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'assert', definition: 'To state a fact or belief confidently', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'assign', definition: 'To allocate a task or duty to someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'assimilate', definition: 'To take in and understand fully', part_of_speech: 'verb', topic: 'Society', difficulty_level: 'advanced' },
  { word: 'associate', definition: 'To connect someone or something with something else', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'assume', definition: 'To suppose to be the case without proof', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'assure', definition: 'To tell someone something positively', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'attain', definition: 'To succeed in achieving', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'attribute', definition: 'To regard something as being caused by', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'authentic', definition: 'Of undisputed origin; genuine', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'authorize', definition: 'To give official permission for', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'automate', definition: 'To convert to automatic operation', part_of_speech: 'verb', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'autonomous', definition: 'Having the freedom to act independently', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedExpandedVocabulary(supabase: SupabaseClient): Promise<void> {
  const allWords = [...AWL_EXTENDED, ...EXTENDED_TOPICS, ...GENERAL_ACADEMIC];
  
  // Remove duplicates by word
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words to seed: ${uniqueWords.length}`);
  
  let insertedCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < uniqueWords.length; i += BATCH_SIZE) {
    const batch = uniqueWords.slice(i, i + BATCH_SIZE);
    
    const { error } = await supabase
      .from('vocabulary')
      .upsert(
        batch.map(w => ({
          word: w.word,
          definition: w.definition,
          part_of_speech: w.part_of_speech,
          topic: w.topic,
          difficulty_level: w.difficulty_level,
          is_enriched: false,
        })),
        { onConflict: 'word' }
      );
    
    if (error) {
      console.error(`Error inserting batch ${Math.floor(i / BATCH_SIZE) + 1}:`, error.message);
      errorCount += batch.length;
    } else {
      insertedCount += batch.length;
      console.log(`Inserted batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} words`);
    }
  }
  
  console.log(`\nSeeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('Expanded IELTS Vocabulary Seeder');
  console.log('Adding AWL Sublists 5-10 + Extended Topic Vocabulary');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedExpandedVocabulary(supabase);
  
  const { count, error } = await supabase
    .from('vocabulary')
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.error('Error getting final count:', error.message);
  } else {
    console.log(`\nFinal vocabulary count in database: ${count}`);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
