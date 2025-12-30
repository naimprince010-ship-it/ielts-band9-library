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

// Academic Nouns - Part 15
const ACADEMIC_NOUNS_15: VocabularyWord[] = [
  { word: 'suspension', definition: 'The action of suspending someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'suspicion', definition: 'A feeling that something is possible or likely', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sustainability', definition: 'The ability to be maintained at a certain rate', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sweater', definition: 'A knitted garment worn on the upper body', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'switch', definition: 'A device for making and breaking an electrical connection', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'symbol', definition: 'A thing that represents or stands for something else', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'symbolism', definition: 'The use of symbols to represent ideas', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sympathy', definition: 'Feelings of pity and sorrow for someone else', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'symptom', definition: 'A physical or mental feature indicating a condition', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'syndrome', definition: 'A group of symptoms which consistently occur together', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'synthesis', definition: 'The combination of ideas to form a theory', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'system', definition: 'A set of connected things or parts forming a complex whole', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'table', definition: 'A piece of furniture with a flat top', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tactic', definition: 'An action carefully planned to achieve a specific end', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'talent', definition: 'Natural aptitude or skill', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'target', definition: 'A person or thing aimed at', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tariff', definition: 'A tax or duty to be paid on imports or exports', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'task', definition: 'A piece of work to be done', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'taste', definition: 'The sensation of flavor perceived in the mouth', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tax', definition: 'A compulsory contribution to state revenue', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'taxation', definition: 'The levying of tax', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'taxpayer', definition: 'A person who pays taxes', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'teacher', definition: 'A person who teaches', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'teaching', definition: 'The occupation of a teacher', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'team', definition: 'A group of players forming one side in a competitive game', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'teamwork', definition: 'The combined action of a group of people', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'technique', definition: 'A way of carrying out a particular task', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'technology', definition: 'The application of scientific knowledge for practical purposes', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'teenager', definition: 'A person aged between 13 and 19 years', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'telecommunication', definition: 'Communication over a distance by cable or broadcasting', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'telephone', definition: 'A system for transmitting voices over a distance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'television', definition: 'A system for transmitting visual images', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'temperament', definition: 'A person\'s nature especially as it affects their behavior', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'temperature', definition: 'The degree of heat present in a substance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'temple', definition: 'A building devoted to the worship of a god', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tempo', definition: 'The speed at which a passage of music is played', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'temptation', definition: 'A desire to do something wrong or unwise', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tenant', definition: 'A person who occupies land or property rented', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tendency', definition: 'An inclination toward a particular characteristic', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tension', definition: 'The state of being stretched tight', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tenure', definition: 'The conditions under which land is held', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'term', definition: 'A word or phrase used to describe a thing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'terminal', definition: 'The end of a railroad or other transport route', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'termination', definition: 'The action of bringing something to an end', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'terminology', definition: 'The body of terms used in a subject', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'terrain', definition: 'A stretch of land with regard to its physical features', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'territory', definition: 'An area of land under the jurisdiction of a ruler', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'terror', definition: 'Extreme fear', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'terrorism', definition: 'The unlawful use of violence for political aims', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'terrorist', definition: 'A person who uses unlawful violence for political aims', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'test', definition: 'A procedure intended to establish quality or performance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'testament', definition: 'Something that serves as a sign or evidence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'testimony', definition: 'A formal written or spoken statement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'text', definition: 'A book or other written or printed work', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'textbook', definition: 'A book used as a standard work for study', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'textile', definition: 'A type of cloth or woven fabric', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'texture', definition: 'The feel or appearance of a surface', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'theater', definition: 'A building or outdoor area for dramatic performances', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'theft', definition: 'The action of stealing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'theme', definition: 'The subject of a talk or piece of writing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'theology', definition: 'The study of the nature of God and religious belief', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'theorem', definition: 'A general proposition not self-evident', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'theorist', definition: 'A person concerned with the theoretical aspects', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'theory', definition: 'A supposition intended to explain something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'therapy', definition: 'Treatment intended to relieve or heal a disorder', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'thesis', definition: 'A statement or theory put forward as a premise', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'thinking', definition: 'The process of using one\'s mind to consider', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'thought', definition: 'An idea or opinion produced by thinking', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'threat', definition: 'A statement of an intention to inflict pain', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'threshold', definition: 'A strip of wood or stone forming the bottom of a doorway', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tide', definition: 'The alternate rising and falling of the sea', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'timber', definition: 'Wood prepared for use in building', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'time', definition: 'The indefinite continued progress of existence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'timetable', definition: 'A chart showing the departure and arrival times', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'timing', definition: 'The choice or control of when something should be done', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tissue', definition: 'Any of the distinct types of material of which animals consist', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'title', definition: 'The name of a book or other composition', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tobacco', definition: 'A preparation of the nicotine-rich leaves', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tolerance', definition: 'Willingness to accept behavior and beliefs different from one\'s own', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'toll', definition: 'A charge payable for permission to use a road', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tone', definition: 'The overall quality of a musical or vocal sound', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tool', definition: 'A device or implement used to carry out a function', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'top', definition: 'The highest or uppermost point or part', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'topic', definition: 'A matter dealt with in a text or conversation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'torture', definition: 'The action of inflicting severe pain', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'total', definition: 'The whole number or amount of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'touch', definition: 'An act of touching someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tour', definition: 'A journey for pleasure in which several places are visited', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tourism', definition: 'The commercial organization of holidays', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tourist', definition: 'A person who is traveling for pleasure', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tournament', definition: 'A series of contests between a number of competitors', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tower', definition: 'A tall narrow building', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'town', definition: 'An urban area that has a name and defined boundaries', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'trace', definition: 'A mark or line left by something that has passed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'track', definition: 'A rough path or minor road', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'trade', definition: 'The action of buying and selling goods', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'trademark', definition: 'A symbol or word registered to represent a company', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'trader', definition: 'A person who buys and sells goods', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tradition', definition: 'The transmission of customs or beliefs', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
];

// Academic Nouns - Part 16
const ACADEMIC_NOUNS_16: VocabularyWord[] = [
  { word: 'traffic', definition: 'Vehicles moving on a road or public highway', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tragedy', definition: 'An event causing great suffering', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'trail', definition: 'A mark or a series of signs left by the passage', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'train', definition: 'A series of railroad cars moved as a unit', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'trainee', definition: 'A person undergoing training for a particular job', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'trainer', definition: 'A person who trains people or animals', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'training', definition: 'The action of teaching a person a particular skill', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'trait', definition: 'A distinguishing quality or characteristic', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'trajectory', definition: 'The path followed by a projectile', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'transaction', definition: 'An instance of buying or selling something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'transcript', definition: 'A written or printed version of material', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'transfer', definition: 'An act of moving something to another place', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'transformation', definition: 'A thorough or dramatic change in form', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'transition', definition: 'The process of changing from one state to another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'translation', definition: 'The process of translating words or text', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'transmission', definition: 'The action of transmitting something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'transparency', definition: 'The condition of being transparent', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'transplant', definition: 'An operation in which an organ is transplanted', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'transport', definition: 'A system or means of conveying people or goods', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'transportation', definition: 'The action of transporting someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'trap', definition: 'A device or enclosure designed to catch animals', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'trauma', definition: 'A deeply distressing or disturbing experience', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'travel', definition: 'The action of traveling', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'traveler', definition: 'A person who is traveling or who often travels', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'treasure', definition: 'A quantity of precious metals or gems', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'treasury', definition: 'The funds or revenue of a government', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'treatment', definition: 'The manner in which someone behaves toward someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'treaty', definition: 'A formally concluded agreement between countries', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tree', definition: 'A woody perennial plant', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'trend', definition: 'A general direction in which something is developing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'trial', definition: 'A formal examination of evidence before a judge', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tribe', definition: 'A social division in a traditional society', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tribunal', definition: 'A court of justice', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tribute', definition: 'An act or statement intended to show gratitude', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'trigger', definition: 'A device that releases a spring or catch', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'triumph', definition: 'A great victory or achievement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'troop', definition: 'Soldiers or armed forces', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'trouble', definition: 'Difficulty or problems', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'truck', definition: 'A large heavy motor vehicle', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'trust', definition: 'Firm belief in the reliability of someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'truth', definition: 'The quality or state of being true', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tube', definition: 'A long hollow cylinder', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tuition', definition: 'A sum of money charged for teaching', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tumor', definition: 'A swelling of a part of the body', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tunnel', definition: 'An artificial underground passage', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'turmoil', definition: 'A state of great disturbance or confusion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'turnover', definition: 'The amount of money taken by a business', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tutor', definition: 'A private teacher', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'type', definition: 'A category of people or things having common characteristics', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tyranny', definition: 'Cruel and oppressive government or rule', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'uncertainty', definition: 'The state of being uncertain', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'undergraduate', definition: 'A student at a college or university', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'understanding', definition: 'The ability to understand something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'undertaking', definition: 'A formal pledge or promise to do something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'unemployment', definition: 'The state of being unemployed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'unification', definition: 'The process of being united', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'uniform', definition: 'The distinctive clothing worn by members of an organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'uniformity', definition: 'The quality of being uniform', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'union', definition: 'The action of joining together', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'uniqueness', definition: 'The quality of being the only one of its kind', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'unit', definition: 'An individual thing regarded as single and complete', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'unity', definition: 'The state of being united or joined as a whole', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'universe', definition: 'All existing matter and space considered as a whole', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'university', definition: 'A high-level educational institution', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'upgrade', definition: 'An act of upgrading something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'upheaval', definition: 'A violent or sudden change or disruption', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'uprising', definition: 'An act of resistance or rebellion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'uproar', definition: 'A loud and impassioned noise or disturbance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'urbanization', definition: 'The process of making an area more urban', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'urgency', definition: 'Importance requiring swift action', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'usage', definition: 'The action of using something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'use', definition: 'The action of using something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'user', definition: 'A person who uses or operates something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'utility', definition: 'The state of being useful or profitable', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'utilization', definition: 'The action of making practical use of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'utopia', definition: 'An imagined place where everything is perfect', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'vacancy', definition: 'An unoccupied position or job', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'vacation', definition: 'An extended period of leisure and recreation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'vacuum', definition: 'A space entirely devoid of matter', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'validity', definition: 'The quality of being logically sound', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'valley', definition: 'A low area of land between hills or mountains', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'value', definition: 'The regard that something is held to deserve', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'vanity', definition: 'Excessive pride in one\'s appearance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'variable', definition: 'An element or feature that is liable to vary', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'variance', definition: 'The fact or quality of being different', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'variant', definition: 'A form or version of something that differs', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'variation', definition: 'A change or difference in condition', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'variety', definition: 'The quality of being different or diverse', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'vector', definition: 'A quantity having direction as well as magnitude', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'vegetation', definition: 'Plants considered collectively', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'vehicle', definition: 'A thing used for transporting people or goods', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'velocity', definition: 'The speed of something in a given direction', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'vendor', definition: 'A person or company offering something for sale', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'venture', definition: 'A risky or daring journey or undertaking', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'venue', definition: 'The place where something happens', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'verdict', definition: 'A decision on a disputed issue', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'verification', definition: 'The process of establishing the truth', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
];

async function seedBatch14(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ACADEMIC_NOUNS_15, ...ACADEMIC_NOUNS_16];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 14: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 14 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 14');
  console.log('Academic Nouns - Parts 15 & 16');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch14(supabase);
  
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
