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

// Advanced Academic Nouns - Part 10
const ADVANCED_NOUNS_10: VocabularyWord[] = [
  { word: 'ink', definition: 'A colored fluid used for writing or drawing or printing or duplicating', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inn', definition: 'A small hotel providing accommodations or food or drink especially for travelers', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'innovation', definition: 'The action or process of innovating', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'input', definition: 'What is put in or taken in or operated on by any process or system', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inquiry', definition: 'An act of asking for information', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'insect', definition: 'A small arthropod animal that has six legs and generally one or two pairs of wings', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'insertion', definition: 'The action of inserting something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'insight', definition: 'The capacity to gain an accurate and deep intuitive understanding of a person or thing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inspection', definition: 'Careful examination or scrutiny', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inspector', definition: 'An official employed to ensure that official regulations are obeyed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inspiration', definition: 'The process of being mentally stimulated to do or feel something especially to do something creative', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'instability', definition: 'Lack of stability or the state of being unstable', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'installation', definition: 'The action or process of installing someone or something or of being installed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'instance', definition: 'An example or single occurrence of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'instant', definition: 'A precise moment of time', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'instinct', definition: 'An innate typically fixed pattern of behavior in animals in response to certain stimuli', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'institute', definition: 'A society or organization having a particular object or common factor especially a scientific', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'institution', definition: 'A society or organization founded for a religious or educational or social or similar purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'instruction', definition: 'A direction or order', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'instructor', definition: 'A person who teaches something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'instrument', definition: 'A tool or implement especially one for delicate or scientific work', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'insurance', definition: 'A practice or arrangement by which a company or government agency provides a guarantee', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intake', definition: 'An amount of food or air or another substance taken into the body', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'integration', definition: 'The action or process of integrating', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'integrity', definition: 'The quality of being honest and having strong moral principles or moral uprightness', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intellect', definition: 'The faculty of reasoning and understanding objectively especially with regard to abstract matters', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intellectual', definition: 'A person possessing a highly developed intellect', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intelligence', definition: 'The ability to acquire and apply knowledge and skills', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intensity', definition: 'The quality of being intense', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intent', definition: 'Intention or purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intention', definition: 'A thing intended or an aim or plan', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'interaction', definition: 'Reciprocal action or influence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'interest', definition: 'The state of wanting to know or learn about something or someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'interference', definition: 'The action of interfering or the process of being interfered with', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'interior', definition: 'The inner or indoor part of something especially a building or the inside', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intermediate', definition: 'A person at an intermediate level of knowledge or skill', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'interpretation', definition: 'The action of explaining the meaning of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'interpreter', definition: 'A person who interprets especially one who translates speech orally', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'interval', definition: 'An intervening time or space', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intervention', definition: 'The action or process of intervening', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'interview', definition: 'A meeting of people face to face especially for consultation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intimacy', definition: 'Close familiarity or friendship or closeness', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'introduction', definition: 'A formal presentation of one person to another in which each is told the other\'s name', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'invasion', definition: 'An instance of invading a country or region with an armed force', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'invention', definition: 'The action of inventing something typically a process or device', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inventor', definition: 'A person who invented a particular process or device or who invents things as an occupation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inventory', definition: 'A complete list of items such as property or goods in stock or the contents of a building', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'investigation', definition: 'The action of investigating something or someone or formal or systematic examination or research', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'investigator', definition: 'A person who carries out a formal inquiry or investigation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'investment', definition: 'The action or process of investing money for profit or material result', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'investor', definition: 'A person or organization that puts money into financial schemes or property or a commercial venture', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'invitation', definition: 'A written or verbal request inviting someone to go somewhere or to do something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'involvement', definition: 'The fact or condition of being involved with or participating in something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'iron', definition: 'A strong hard magnetic silvery-gray metal the chemical element of atomic number 26', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'irony', definition: 'The expression of one\'s meaning by using language that normally signifies the opposite', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'island', definition: 'A piece of land surrounded by water', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'isolation', definition: 'The process or fact of isolating or being isolated', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'issue', definition: 'An important topic or problem for debate or discussion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'item', definition: 'An individual article or unit especially one that is part of a list or collection or set', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'jacket', definition: 'An outer garment extending either to the waist or the hips typically having sleeves', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'jail', definition: 'A place for the confinement of people accused or convicted of a crime', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'jaw', definition: 'Each of the upper and lower bony structures in vertebrates forming the framework of the mouth', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'jealousy', definition: 'The state or feeling of being jealous', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'jet', definition: 'A rapid stream of liquid or gas forced out of a small opening', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'jewel', definition: 'A precious stone typically a single crystal or a piece of a hard lustrous or translucent mineral', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'jewelry', definition: 'Personal ornaments such as necklaces or rings or bracelets that are typically made from or contain jewels', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'job', definition: 'A paid position of regular employment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'joint', definition: 'A point at which parts of an artificial structure are joined', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'joke', definition: 'A thing that someone says to cause amusement or laughter especially a story with a funny punchline', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'journal', definition: 'A newspaper or magazine that deals with a particular subject or professional activity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'journalism', definition: 'The activity or profession of writing for newspapers or magazines or news websites', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'journalist', definition: 'A person who writes for newspapers or magazines or prepares news to be broadcast', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'journey', definition: 'An act of traveling from one place to another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'joy', definition: 'A feeling of great pleasure and happiness', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'judge', definition: 'A public official appointed to decide cases in a court of law', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'judgment', definition: 'The ability to make considered decisions or come to sensible conclusions', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'juice', definition: 'The liquid obtained from or present in fruit or vegetables', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'jump', definition: 'An act of jumping from a surface by pushing upward with one\'s legs and feet', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'junction', definition: 'A point where two or more things are joined', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'jungle', definition: 'An area of land overgrown with dense forest and tangled vegetation typically in the tropics', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'junior', definition: 'A person who is a specified number of years younger than someone else', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'jurisdiction', definition: 'The official power to make legal decisions and judgments', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'jury', definition: 'A body of people typically twelve in number sworn to give a verdict in a legal case', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'justice', definition: 'Just behavior or treatment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'justification', definition: 'The action of showing something to be right or reasonable', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'keeper', definition: 'A person who manages or looks after something or someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'kernel', definition: 'A softer usually edible part of a nut or seed or fruit stone contained within its hard shell', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'key', definition: 'A small piece of shaped metal with incisions cut to fit the wards of a particular lock', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'keyboard', definition: 'A panel of keys that operate a computer or typewriter', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'kick', definition: 'A blow or forceful thrust with the foot', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'kid', definition: 'A child or young person', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'kidney', definition: 'Each of a pair of organs in the abdominal cavity of mammals or birds or reptiles', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'killing', definition: 'An act of causing death especially deliberately', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Nouns - Part 11
const ADVANCED_NOUNS_11: VocabularyWord[] = [
  { word: 'kind', definition: 'A group of people or things having similar characteristics', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'kindness', definition: 'The quality of being friendly or generous or considerate', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'king', definition: 'The male ruler of an independent state especially one who inherits the position by right of birth', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'kingdom', definition: 'A country or state or territory ruled by a king or queen', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'kiss', definition: 'A touch with the lips as a sign of love or sexual desire or reverence or greeting', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'kitchen', definition: 'A room or area where food is prepared and cooked', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'knee', definition: 'The joint between the thigh and the lower leg in humans', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'knife', definition: 'An instrument composed of a blade fixed into a handle used for cutting or as a weapon', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'knock', definition: 'A sudden short sound caused by a blow especially on a door to attract attention', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'knot', definition: 'A fastening made by tying a piece of string or rope or something similar', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'knowledge', definition: 'Facts or information or skills acquired by a person through experience or education', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lab', definition: 'A laboratory', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'label', definition: 'A small piece of paper or fabric or plastic or similar material attached to an object', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'labor', definition: 'Work especially hard physical work', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'laboratory', definition: 'A room or building equipped for scientific experiments or research or teaching', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lack', definition: 'The state of being without or not having enough of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ladder', definition: 'A piece of equipment consisting of a series of bars or steps between two upright lengths', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lady', definition: 'A woman especially one of high social position or good manners', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lake', definition: 'A large body of water surrounded by land', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lamp', definition: 'A device for giving light either one consisting of an electric bulb together with its holder', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'land', definition: 'The part of the earth\'s surface that is not covered by water as distinct from the sea or the air', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'landing', definition: 'An instance of coming or bringing something to land either from the air or from water', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'landlord', definition: 'A person who rents land or a building or an apartment to a tenant', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'landmark', definition: 'An object or feature of a landscape or town that is easily seen and recognized from a distance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'landscape', definition: 'All the visible features of an area of countryside or land often considered in terms of their aesthetic appeal', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lane', definition: 'A narrow road especially in a rural area', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'language', definition: 'The method of human communication either spoken or written consisting of the use of words', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lap', definition: 'The flat area between the waist and knees of a seated person', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'laptop', definition: 'A computer that is portable and suitable for use while traveling', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'laser', definition: 'A device that generates an intense beam of coherent monochromatic light or other electromagnetic radiation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'laugh', definition: 'An act of laughing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'laughter', definition: 'The action or sound of laughing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'launch', definition: 'An act or instance of launching something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'laundry', definition: 'Clothes and linens that need to be washed or that have been newly washed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'law', definition: 'The system of rules that a particular country or community recognizes as regulating the actions', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lawn', definition: 'An area of short mown grass in a yard or garden or park', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lawsuit', definition: 'A claim or dispute brought to a court of law for adjudication', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lawyer', definition: 'A person who practices or studies law or an attorney or a counselor', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'layer', definition: 'A sheet or quantity or thickness of material typically one of several covering a surface', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'layout', definition: 'The way in which the parts of something are arranged or laid out', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lead', definition: 'The initiative in an action or an example for others to follow', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'leader', definition: 'The person who leads or commands a group or organization or country', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'leadership', definition: 'The action of leading a group of people or an organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'leaf', definition: 'A flattened structure of a higher plant typically green and blade-like that is attached to a stem', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'league', definition: 'A collection of people or countries or groups that combine for a particular purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'leak', definition: 'A hole in a container or covering through which contents especially liquid or gas may accidentally pass', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'leap', definition: 'A forceful jump or quick movement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'learning', definition: 'The acquisition of knowledge or skills through experience or study or by being taught', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lease', definition: 'A contract by which one party conveys land or property or services to another for a specified time', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'leather', definition: 'A material made from the skin of an animal by tanning or a similar process', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'leave', definition: 'Time when one has permission to be absent from work or from duty in the armed forces', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lecture', definition: 'An educational talk to an audience especially to students in a university or college', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lecturer', definition: 'A person who gives lectures especially as an occupation at a university or college', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'left', definition: 'The left-hand part or side or direction', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'leg', definition: 'Each of the limbs on which a person or animal walks and stands', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'legacy', definition: 'An amount of money or property left to someone in a will', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'legend', definition: 'A traditional story sometimes popularly regarded as historical but not authenticated', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'legislation', definition: 'Laws considered collectively', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'legislator', definition: 'A person who makes laws or a member of a legislative body', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'legislature', definition: 'The legislative body of a country or state', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'legitimacy', definition: 'Conformity to the law or to rules', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'leisure', definition: 'Free time', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lemon', definition: 'A yellow oval citrus fruit with thick skin and fragrant acidic juice', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'length', definition: 'The measurement or extent of something from end to end or the greater of two or the greatest', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lens', definition: 'A piece of glass or other transparent substance with curved sides for concentrating or dispersing light rays', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lesson', definition: 'An amount of teaching given at one time or a period of learning or teaching', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'letter', definition: 'A written or printed or electronic communication addressed to a person or organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'level', definition: 'A position on a real or imaginary scale of amount or quantity or extent or quality', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lever', definition: 'A rigid bar resting on a pivot used to help move a heavy or firmly fixed load', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'liability', definition: 'The state of being responsible for something especially by law', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'liberal', definition: 'A person of liberal views', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'liberation', definition: 'The action of setting someone free from imprisonment or slavery or oppression or release', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'liberty', definition: 'The state of being free within society from oppressive restrictions imposed by authority', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'librarian', definition: 'A person in charge of or an assistant in a library', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'library', definition: 'A building or room containing collections of books or periodicals or sometimes films and recorded music', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'license', definition: 'A permit from an authority to own or use something or do a particular thing or carry on a trade', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lid', definition: 'A removable or hinged cover for the top of a container', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lie', definition: 'An intentionally false statement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'life', definition: 'The condition that distinguishes animals and plants from inorganic matter', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lifestyle', definition: 'The way in which a person or group lives', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lifetime', definition: 'The duration of a person\'s life', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lift', definition: 'A platform or compartment housed in a shaft for raising and lowering people or things to different floors', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'light', definition: 'The natural agent that stimulates sight and makes things visible', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lighting', definition: 'Equipment in a room or building or street for producing light', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'likelihood', definition: 'The state or fact of something\'s being likely or probability', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'limb', definition: 'An arm or leg of a person or four-legged animal or a bird\'s wing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'limit', definition: 'A point or level beyond which something does not or may not extend or pass', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'limitation', definition: 'A limiting rule or circumstance or a restriction', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'line', definition: 'A long narrow mark or band', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'link', definition: 'A relationship between two things or situations especially where one thing affects the other', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lion', definition: 'A large tawny-colored cat that lives in prides found in Africa and northwestern India', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lip', definition: 'Either of the two fleshy parts that form the upper and lower edges of the opening of the mouth', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch34(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_NOUNS_10, ...ADVANCED_NOUNS_11];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 34: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 34 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 34');
  console.log('Advanced Academic Nouns - Parts 10 & 11');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch34(supabase);
  
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
