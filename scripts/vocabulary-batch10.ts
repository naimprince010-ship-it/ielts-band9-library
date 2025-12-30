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

// Academic Nouns - Part 7
const ACADEMIC_NOUNS_7: VocabularyWord[] = [
  { word: 'interference', definition: 'The action of interfering or process of being interfered with', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'interior', definition: 'The inner part of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'intermediary', definition: 'A person who acts as a link between people', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'interpretation', definition: 'The action of explaining the meaning', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'interval', definition: 'An intervening time or space', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'intervention', definition: 'The action of intervening', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'intimacy', definition: 'Close familiarity or friendship', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'intimidation', definition: 'The action of intimidating someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'intrusion', definition: 'The action of intruding', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'intuition', definition: 'The ability to understand something immediately', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'invasion', definition: 'An instance of invading a country', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'invention', definition: 'The action of inventing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inventory', definition: 'A complete list of items', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'investigation', definition: 'The action of investigating something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'investment', definition: 'The action of investing money', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'investor', definition: 'A person who invests money', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'involvement', definition: 'The fact of being involved with something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'irony', definition: 'The expression of meaning using language that normally signifies the opposite', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'isolation', definition: 'The process of isolating or being isolated', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'issue', definition: 'An important topic for debate', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'item', definition: 'An individual article or unit', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'iteration', definition: 'The repetition of a process', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'jargon', definition: 'Special words used by a profession', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'journal', definition: 'A newspaper or magazine dealing with a particular subject', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'journalism', definition: 'The activity of writing for newspapers', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'journey', definition: 'An act of traveling from one place to another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'judgment', definition: 'The ability to make considered decisions', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'jurisdiction', definition: 'The official power to make legal decisions', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'justification', definition: 'The action of showing something to be right', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'juxtaposition', definition: 'The fact of placing things close together', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'kinship', definition: 'Blood relationship', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'knowledge', definition: 'Facts or information acquired through experience', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'label', definition: 'A small piece of paper attached to an object', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'labor', definition: 'Work, especially hard physical work', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'laboratory', definition: 'A room or building equipped for scientific experiments', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'lack', definition: 'The state of being without something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'landmark', definition: 'An object or feature of a landscape', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'landscape', definition: 'All the visible features of an area of land', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'language', definition: 'The method of human communication', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'latitude', definition: 'The angular distance of a place north or south', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'launch', definition: 'An act of launching something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'layer', definition: 'A sheet or thickness of material', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'layout', definition: 'The way in which parts of something are arranged', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'leadership', definition: 'The action of leading a group', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'league', definition: 'A collection of people or groups combined for a purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'lecture', definition: 'An educational talk to an audience', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'legacy', definition: 'An amount of money or property left to someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'legislation', definition: 'Laws considered collectively', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'legitimacy', definition: 'Conformity to the law or to rules', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'leisure', definition: 'Free time', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'length', definition: 'The measurement of something from end to end', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'lesson', definition: 'A period of learning or teaching', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'level', definition: 'A position on a scale of amount or quality', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'leverage', definition: 'The exertion of force by means of a lever', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'liability', definition: 'The state of being responsible for something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'liaison', definition: 'Communication or cooperation between people', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'liberation', definition: 'The act of setting someone free', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'liberty', definition: 'The state of being free within society', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'license', definition: 'A permit from an authority to own or use something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'likelihood', definition: 'The state or fact of something being likely', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'limitation', definition: 'A limiting rule or circumstance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'lineage', definition: 'Direct descent from an ancestor', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'link', definition: 'A relationship between two things', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'literacy', definition: 'The ability to read and write', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'literature', definition: 'Written works regarded as having artistic merit', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'litigation', definition: 'The process of taking legal action', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'livelihood', definition: 'A means of securing the necessities of life', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'loan', definition: 'A thing that is borrowed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'lobby', definition: 'A group seeking to influence politicians', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'locale', definition: 'A place where something happens', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'locality', definition: 'The position or site of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'location', definition: 'A particular place or position', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'logic', definition: 'Reasoning conducted according to strict principles', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'logistics', definition: 'The detailed coordination of a complex operation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'longevity', definition: 'Long life', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'longitude', definition: 'The angular distance of a place east or west', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'loss', definition: 'The fact of no longer having something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'loyalty', definition: 'A strong feeling of support or allegiance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'machinery', definition: 'Machines collectively', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'magnitude', definition: 'The great size or extent of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'mainstream', definition: 'The ideas or activities that are shared by most people', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'maintenance', definition: 'The process of maintaining something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'majority', definition: 'The greater number', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'malfunction', definition: 'A failure to function normally', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'management', definition: 'The process of dealing with or controlling things', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'mandate', definition: 'An official order to do something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'manifestation', definition: 'The action of showing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'manipulation', definition: 'The action of manipulating something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'manner', definition: 'A way in which a thing is done', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'manual', definition: 'A book giving instructions', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'manufacture', definition: 'The making of articles on a large scale', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'manuscript', definition: 'A book or document written by hand', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'margin', definition: 'The edge or border of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'marker', definition: 'An object used to indicate a position', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'market', definition: 'A regular gathering of people for buying and selling', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'mass', definition: 'A coherent body of matter with no definite shape', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'mastery', definition: 'Comprehensive knowledge or skill', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'material', definition: 'The matter from which a thing is made', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'matrix', definition: 'An environment in which something develops', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'maturity', definition: 'The state of being mature', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
];

// Academic Nouns - Part 8
const ACADEMIC_NOUNS_8: VocabularyWord[] = [
  { word: 'maximum', definition: 'The greatest amount possible', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'means', definition: 'An action or system by which a result is achieved', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'measure', definition: 'A plan or course of action taken', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'measurement', definition: 'The action of measuring something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'mechanism', definition: 'A system of parts working together', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'mediation', definition: 'Intervention in a dispute to resolve it', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'medication', definition: 'A substance used for medical treatment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'medium', definition: 'An agency or means of doing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'membership', definition: 'The fact of being a member of a group', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'memoir', definition: 'A historical account written from personal knowledge', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'memorandum', definition: 'A written message in business', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'memory', definition: 'The faculty by which the mind stores information', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'mentality', definition: 'The characteristic way of thinking', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'mentor', definition: 'An experienced person who advises', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'merchandise', definition: 'Goods to be bought and sold', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'merger', definition: 'A combination of two things into one', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'merit', definition: 'The quality of being particularly good', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'metabolism', definition: 'The chemical processes in a living organism', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'metaphor', definition: 'A figure of speech in which a word is applied to something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'method', definition: 'A particular form of procedure', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'methodology', definition: 'A system of methods used in a particular area', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'microorganism', definition: 'A microscopic organism', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'migration', definition: 'Movement from one region to another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'milestone', definition: 'A significant stage or event', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'millennium', definition: 'A period of a thousand years', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'mindset', definition: 'The established set of attitudes held by someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'mineral', definition: 'A solid inorganic substance of natural occurrence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'minimum', definition: 'The least or smallest amount possible', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ministry', definition: 'A government department headed by a minister', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'minority', definition: 'The smaller number or part', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'miracle', definition: 'A surprising and welcome event', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'misconception', definition: 'A view or opinion that is incorrect', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'mission', definition: 'An important assignment carried out', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'mobility', definition: 'The ability to move or be moved freely', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'mode', definition: 'A way or manner in which something occurs', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'model', definition: 'A three-dimensional representation of a person or thing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'moderation', definition: 'The avoidance of excess or extremes', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'modernization', definition: 'The process of adapting to modern needs', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'modification', definition: 'The action of modifying something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'molecule', definition: 'A group of atoms bonded together', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'momentum', definition: 'The quantity of motion of a moving body', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'monarchy', definition: 'A form of government with a monarch at the head', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'monopoly', definition: 'The exclusive possession of the supply of a commodity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'morality', definition: 'Principles concerning the distinction between right and wrong', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'mortality', definition: 'The state of being subject to death', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'motion', definition: 'The action of moving', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'motivation', definition: 'The reason for acting in a particular way', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'motive', definition: 'A reason for doing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'movement', definition: 'An act of changing physical location', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'multitude', definition: 'A large number', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'municipality', definition: 'A city or town that has corporate status', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'mutation', definition: 'The changing of the structure of a gene', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'narrative', definition: 'A spoken or written account of connected events', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'nation', definition: 'A large body of people united by common descent', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'nationalism', definition: 'Patriotic feeling or principles', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'nationality', definition: 'The status of belonging to a particular nation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'nature', definition: 'The phenomena of the physical world collectively', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'necessity', definition: 'The fact of being required or indispensable', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'neglect', definition: 'The state of being uncared for', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'negligence', definition: 'Failure to take proper care', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'negotiation', definition: 'Discussion aimed at reaching an agreement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'neighborhood', definition: 'A district or community within a town', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'network', definition: 'A group of interconnected people or things', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'neutrality', definition: 'The state of not supporting either side', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'niche', definition: 'A comfortable or suitable position in life', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'nobility', definition: 'The quality of being noble in character', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'nomination', definition: 'The action of nominating or being nominated', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'norm', definition: 'Something that is usual or expected', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'nostalgia', definition: 'A sentimental longing for the past', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'notation', definition: 'A series of written symbols used to represent numbers', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'notion', definition: 'A conception of or belief about something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'notoriety', definition: 'The state of being famous for something bad', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'novelty', definition: 'The quality of being new or unusual', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'nuance', definition: 'A subtle difference in meaning', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'nucleus', definition: 'The central and most important part', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'nutrient', definition: 'A substance that provides nourishment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'nutrition', definition: 'The process of providing food necessary for health', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'obedience', definition: 'Compliance with an order or law', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'objective', definition: 'A thing aimed at or sought', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'obligation', definition: 'An act or course of action to which a person is bound', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'observation', definition: 'The action of observing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'observer', definition: 'A person who watches or notices something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'obsession', definition: 'An idea or thought that continually preoccupies', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'obstacle', definition: 'A thing that blocks one\'s way', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'obstruction', definition: 'A thing that impedes or prevents passage', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'occupation', definition: 'A job or profession', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'occurrence', definition: 'An incident or event', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'odds', definition: 'The ratio between the amounts staked', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'offense', definition: 'A breach of a law or rule', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'offering', definition: 'A thing offered', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'offset', definition: 'A consideration that diminishes the effect', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'offspring', definition: 'A person\'s child or children', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'omission', definition: 'Someone or something that has been left out', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'onset', definition: 'The beginning of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'opening', definition: 'A space or gap that allows passage', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'operation', definition: 'The fact or condition of functioning', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'operator', definition: 'A person who operates equipment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'opinion', definition: 'A view or judgment formed about something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'opponent', definition: 'Someone who competes against another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
];

async function seedBatch10(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ACADEMIC_NOUNS_7, ...ACADEMIC_NOUNS_8];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 10: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 10 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 10');
  console.log('Academic Nouns - Parts 7 & 8');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch10(supabase);
  
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
