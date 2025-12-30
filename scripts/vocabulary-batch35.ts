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

// Advanced Academic Nouns - Part 12
const ADVANCED_NOUNS_12: VocabularyWord[] = [
  { word: 'liquid', definition: 'A substance that flows freely but is of constant volume having a consistency like that of water', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'list', definition: 'A number of connected items or names written or printed consecutively typically one below the other', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'listener', definition: 'A person who listens especially someone who does so in an attentive manner', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'literacy', definition: 'The ability to read and write', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'literature', definition: 'Written works especially those considered to have superior or lasting artistic merit', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'litigation', definition: 'The process of taking legal action', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'liver', definition: 'A large lobed glandular organ in the abdomen of vertebrates involved in many metabolic processes', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'living', definition: 'An income sufficient to live on or the means of earning it', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'load', definition: 'A heavy or bulky thing that is being carried or is about to be carried', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'loan', definition: 'A thing that is borrowed especially a sum of money that is expected to be paid back with interest', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lobby', definition: 'A room providing a space out of which one or more other rooms or corridors lead typically one near the entrance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'local', definition: 'A local person or thing in particular', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'locality', definition: 'The position or site of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'location', definition: 'A particular place or position', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lock', definition: 'A mechanism for keeping a door or lid or container fastened typically operated only by a key', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'log', definition: 'A part of the trunk or a large branch of a tree that has fallen or been cut off', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'logic', definition: 'Reasoning conducted or assessed according to strict principles of validity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'loneliness', definition: 'Sadness because one has no friends or company', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'look', definition: 'An act of directing one\'s gaze in order to see someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'loop', definition: 'A shape produced by a curve that bends around and crosses itself', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lord', definition: 'Someone or something having power or authority or influence or a master or ruler', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'loss', definition: 'The fact or process of losing something or someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lot', definition: 'A particular group or set of people or things', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lottery', definition: 'A means of raising money by selling numbered tickets and giving prizes to the holders of numbers drawn', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'love', definition: 'An intense feeling of deep affection', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lover', definition: 'A person who loves someone or is loved by someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'loyalty', definition: 'A strong feeling of support or allegiance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'luck', definition: 'Success or failure apparently brought by chance rather than through one\'s own actions', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'luggage', definition: 'Suitcases or other bags in which to pack personal belongings for traveling', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lumber', definition: 'Timber sawn into rough planks or otherwise partly prepared', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lunch', definition: 'A meal eaten in the middle of the day typically one that is lighter or less formal than an evening meal', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lung', definition: 'Each of the pair of organs situated within the rib cage consisting of elastic sacs with branching passages', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'luxury', definition: 'The state of great comfort and extravagant living', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'machine', definition: 'An apparatus using or applying mechanical power and having several parts each with a definite function', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'machinery', definition: 'Machines collectively', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'magazine', definition: 'A periodical publication containing articles and illustrations typically covering a particular subject', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'magic', definition: 'The power of apparently influencing the course of events by using mysterious or supernatural forces', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'magistrate', definition: 'A civil officer or lay judge who administers the law especially one who conducts a court', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'magnitude', definition: 'The great size or extent of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mail', definition: 'Letters and packages conveyed by the postal system', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mainstream', definition: 'The ideas or activities or opinions that are regarded as normal or conventional', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'maintenance', definition: 'The process of maintaining or preserving someone or something or the state of being maintained', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'majority', definition: 'The greater number', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'maker', definition: 'A person or thing that makes or produces something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'makeup', definition: 'Cosmetics such as lipstick or powder applied to the face used to enhance or alter the appearance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'male', definition: 'A male person or plant or animal', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mall', definition: 'A large building or series of connected buildings containing a variety of retail stores', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mammal', definition: 'A warm-blooded vertebrate animal of a class that is distinguished by the possession of hair or fur', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'man', definition: 'An adult human male', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'management', definition: 'The process of dealing with or controlling things or people', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'manager', definition: 'A person responsible for controlling or administering all or part of a company or similar organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mandate', definition: 'An official order or commission to do something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'manifestation', definition: 'The action or fact of showing an abstract idea', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'manipulation', definition: 'The action of manipulating something in a skillful manner', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mankind', definition: 'Human beings considered collectively or the human race', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'manner', definition: 'A way in which a thing is done or happens', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mansion', definition: 'A large impressive house', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'manual', definition: 'A book of instructions especially for operating a machine or learning a subject or a handbook', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'manufacture', definition: 'The making of articles on a large scale using machinery', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'manufacturer', definition: 'A person or company that makes goods for sale', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'manuscript', definition: 'A book or document or piece of music written by hand rather than typed or printed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'map', definition: 'A diagrammatic representation of an area of land or sea showing physical features or cities or roads', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'marble', definition: 'A hard crystalline metamorphic form of limestone typically white with mottlings or streaks of color', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'march', definition: 'An act or instance of marching', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'margin', definition: 'The edge or border of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mark', definition: 'A small area on a surface having a different color from its surroundings typically one caused by accident', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'marker', definition: 'An object used to indicate a position or place or route', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'market', definition: 'A regular gathering of people for the purchase and sale of provisions or livestock or other commodities', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'marketing', definition: 'The action or business of promoting and selling products or services including market research', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'marketplace', definition: 'An open space where a market is or was formerly held in a town', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'marriage', definition: 'The legally or formally recognized union of two people as partners in a personal relationship', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mask', definition: 'A covering for all or part of the face worn as a disguise or to amuse or terrify other people', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mass', definition: 'A coherent typically large body of matter with no definite shape', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'massacre', definition: 'An indiscriminate and brutal slaughter of people', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'master', definition: 'A man who has people working for him especially servants or slaves', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mastery', definition: 'Comprehensive knowledge or skill in a subject or accomplishment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'match', definition: 'A contest in which people or teams compete against each other in a particular sport', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mate', definition: 'Each of a pair of birds or other animals', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'material', definition: 'The matter from which a thing is or can be made', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mathematics', definition: 'The abstract science of number or quantity or space either as abstract concepts or as applied', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'matter', definition: 'Physical substance in general as distinct from mind and spirit or that which occupies space', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'maturity', definition: 'The state or period or quality of being mature', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'maximum', definition: 'The greatest or highest amount possible or attained', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mayor', definition: 'The elected head of a city or town or other municipality', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'meadow', definition: 'A piece of grassland especially one used for hay', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'meal', definition: 'Any of the regular occasions in a day when a reasonably large amount of food is eaten', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'meaning', definition: 'What is meant by a word or text or concept or action', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'means', definition: 'An action or system by which a result is brought about or a method', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'meantime', definition: 'The intervening period of time', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'measure', definition: 'A plan or course of action taken to achieve a particular purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'measurement', definition: 'The action of measuring something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'meat', definition: 'The flesh of an animal typically a mammal or bird as food', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mechanic', definition: 'A person who repairs and maintains machinery', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Nouns - Part 13
const ADVANCED_NOUNS_13: VocabularyWord[] = [
  { word: 'mechanism', definition: 'A system of parts working together in a machine or a piece of machinery', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'medal', definition: 'A metal disc with an inscription or design made to commemorate an event or awarded as a distinction', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'media', definition: 'The main means of mass communication especially television or radio or newspapers and the Internet', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'median', definition: 'The middle value in a series of values arranged in order of size', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mediation', definition: 'Intervention in a dispute in order to resolve it or arbitration', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'medication', definition: 'A drug or other form of medicine that is used to treat or prevent disease', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'medicine', definition: 'The science or practice of the diagnosis or treatment or prevention of disease', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'meditation', definition: 'The action or practice of meditating', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'medium', definition: 'An agency or means of doing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'meeting', definition: 'An assembly of people especially the members of a society or committee for discussion or entertainment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'melody', definition: 'A sequence of single notes that is musically satisfying', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'member', definition: 'An individual or organization or country that belongs to a group or society or team', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'membership', definition: 'The fact of being a member of a group', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'membrane', definition: 'A pliable sheetlike structure acting as a boundary or lining or partition in an organism', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'memoir', definition: 'A historical account or biography written from personal knowledge or special sources', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'memorial', definition: 'A statue or structure established to remind people of a person or event', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'memory', definition: 'The faculty by which the mind stores and remembers information', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'menace', definition: 'A person or thing that is likely to cause harm or a threat or danger', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mention', definition: 'A reference to someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mentor', definition: 'An experienced and trusted adviser', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'menu', definition: 'A list of dishes available in a restaurant', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'merchant', definition: 'A person or company involved in wholesale trade especially one dealing with foreign countries', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mercy', definition: 'Compassion or forgiveness shown toward someone whom it is within one\'s power to punish or harm', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'merger', definition: 'A combination of two things especially companies into one', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'merit', definition: 'The quality of being particularly good or worthy especially so as to deserve praise or reward', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mess', definition: 'A dirty or untidy state of things or of a place', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'message', definition: 'A verbal or written or recorded communication sent to or left for a recipient who cannot be contacted', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'messenger', definition: 'A person who carries a message or is employed to carry messages', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'metal', definition: 'A solid material that is typically hard or shiny or malleable or fusible or ductile', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'metaphor', definition: 'A figure of speech in which a word or phrase is applied to an object or action to which it is not literally applicable', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'method', definition: 'A particular form of procedure for accomplishing or approaching something especially a systematic one', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'methodology', definition: 'A system of methods used in a particular area of study or activity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'microphone', definition: 'An instrument for converting sound waves into electrical energy variations which may then be amplified', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'microscope', definition: 'An optical instrument used for viewing very small objects such as mineral samples or animal or plant cells', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'middle', definition: 'The point or position at an equal distance from the sides or edges or ends of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'midnight', definition: 'Twelve o\'clock at night', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'midst', definition: 'The middle part or point', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'migration', definition: 'Seasonal movement of animals from one region to another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mile', definition: 'A unit of linear measure equal to 1760 yards approximately 1.609 kilometers', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'milestone', definition: 'A stone set up beside a road to mark the distance in miles to a particular place', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'milk', definition: 'An opaque white fluid rich in fat and protein secreted by female mammals for the nourishment of their young', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mill', definition: 'A building equipped with machinery for grinding grain into flour', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mind', definition: 'The element of a person that enables them to be aware of the world and their experiences', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mine', definition: 'An excavation in the earth for extracting coal or other minerals', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mineral', definition: 'A solid inorganic substance of natural occurrence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'minimum', definition: 'The least or smallest amount or quantity possible or attainable or required', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mining', definition: 'The process or industry of obtaining coal or other minerals from a mine', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'minister', definition: 'A head of a government department', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ministry', definition: 'A government department headed by a minister of state', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'minority', definition: 'The smaller number or part especially a number that is less than half the whole number', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'minute', definition: 'A period of time equal to sixty seconds or a sixtieth of an hour', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'miracle', definition: 'A surprising and welcome event that is not explicable by natural or scientific laws', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mirror', definition: 'A reflective surface now typically of glass coated with a metal amalgam that reflects a clear image', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'misery', definition: 'A state or feeling of great distress or discomfort of mind or body', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'missile', definition: 'An object that is forcibly propelled at a target either by hand or from a mechanical weapon', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mission', definition: 'An important assignment carried out for political or religious or commercial purposes', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'missionary', definition: 'A person sent on a religious mission especially one sent to promote Christianity in a foreign country', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mistake', definition: 'An action or judgment that is misguided or wrong', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mix', definition: 'Two or more different qualities or things or people placed or combined or considered together', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mixture', definition: 'A substance made by mixing other substances together', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mob', definition: 'A large crowd of people especially one that is disorderly and intent on causing trouble or violence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mobility', definition: 'The ability to move or be moved freely and easily', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mode', definition: 'A way or manner in which something occurs or is experienced or expressed or done', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'model', definition: 'A three-dimensional representation of a person or thing or of a proposed structure typically on a smaller scale', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'modification', definition: 'The action of modifying something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'molecule', definition: 'A group of atoms bonded together representing the smallest fundamental unit of a chemical compound', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'moment', definition: 'A very brief period of time', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'momentum', definition: 'The quantity of motion of a moving body measured as a product of its mass and velocity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'monarch', definition: 'A sovereign head of state especially a king or queen or emperor', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'monarchy', definition: 'A form of government with a monarch at the head', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'monastery', definition: 'A building or buildings occupied by a community of monks living under religious vows', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'money', definition: 'A current medium of exchange in the form of coins and banknotes or coins and banknotes collectively', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'monitor', definition: 'A device used for observing or checking or keeping a continuous record of a process or quantity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'monk', definition: 'A member of a religious community of men typically living under vows of poverty or chastity or obedience', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'monkey', definition: 'A small to medium-sized primate that typically has a long tail most kinds of which live in trees', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'monopoly', definition: 'The exclusive possession or control of the supply or trade in a commodity or service', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'monster', definition: 'An imaginary creature that is typically large or ugly or frightening', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'month', definition: 'Each of the twelve named periods into which a year is divided', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'monument', definition: 'A statue or building or other structure erected to commemorate a famous or notable person or event', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mood', definition: 'A temporary state of mind or feeling', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'moon', definition: 'The natural satellite of the earth visible chiefly at night by reflected light from the sun', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'morality', definition: 'Principles concerning the distinction between right and wrong or good and bad behavior', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'morning', definition: 'The period of time between midnight and noon especially from sunrise to noon', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mortality', definition: 'The state of being subject to death', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mortgage', definition: 'A legal agreement by which a bank or other creditor lends money at interest in exchange for taking title', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mosque', definition: 'A Muslim place of worship', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mother', definition: 'A woman in relation to her child or children', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'motion', definition: 'The action or process of moving or being moved', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'motivation', definition: 'The reason or reasons one has for acting or behaving in a particular way', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'motive', definition: 'A reason for doing something especially one that is hidden or not obvious', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch35(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_NOUNS_12, ...ADVANCED_NOUNS_13];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 35: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 35 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 35');
  console.log('Advanced Academic Nouns - Parts 12 & 13');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch35(supabase);
  
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
