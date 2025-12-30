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

// Advanced Academic Nouns - Part 4
const ADVANCED_NOUNS_4: VocabularyWord[] = [
  { word: 'damage', definition: 'Physical harm caused to something in such a way as to impair its value or usefulness', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'data', definition: 'Facts and statistics collected together for reference or analysis', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'database', definition: 'A structured set of data held in a computer especially one that is accessible', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deadline', definition: 'The latest time or date by which something should be completed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deal', definition: 'An agreement entered into by two or more parties for their mutual benefit', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'death', definition: 'The action or fact of dying or being killed or the end of the life of a person', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'debate', definition: 'A formal discussion on a particular topic in a public meeting or legislative assembly', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'debt', definition: 'Something typically money that is owed or due', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'decade', definition: 'A period of ten years', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'decay', definition: 'The state or process of rotting or decomposition', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'decision', definition: 'A conclusion or resolution reached after consideration', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'declaration', definition: 'A formal or explicit statement or announcement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'decline', definition: 'A gradual and continuous loss of strength or numbers or quality or value', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'decrease', definition: 'An instance of becoming smaller or fewer', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dedication', definition: 'The quality of being dedicated or committed to a task or purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deduction', definition: 'The action of deducting or subtracting something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deed', definition: 'An action that is performed intentionally or consciously', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'defeat', definition: 'An instance of defeating or being defeated', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'defect', definition: 'A shortcoming or imperfection or lack', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'defense', definition: 'The action of defending from or resisting attack', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deficiency', definition: 'A lack or shortage', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deficit', definition: 'The amount by which something especially a sum of money is too small', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'definition', definition: 'A statement of the exact meaning of a word especially in a dictionary', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'degree', definition: 'The amount or level or extent to which something happens or is present', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'delay', definition: 'A period of time by which something is late or postponed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'delegation', definition: 'A body of delegates or representatives or a deputation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deliberation', definition: 'Long and careful consideration or discussion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'delivery', definition: 'The action of delivering letters or packages or ordered goods', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'demand', definition: 'An insistent and peremptory request made as if by right', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'democracy', definition: 'A system of government by the whole population or all the eligible members', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'demonstration', definition: 'The action or process of showing the existence or truth of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'denial', definition: 'The action of declaring something to be untrue', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'density', definition: 'The degree of compactness of a substance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'department', definition: 'A division of a large organization such as a government or business', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'departure', definition: 'The action of leaving typically to start a journey', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dependence', definition: 'The state of relying on or being controlled by someone or something else', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deployment', definition: 'The movement of troops or equipment to a place or position for military action', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deposit', definition: 'A sum of money placed or kept in a bank account usually to gain interest', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'depression', definition: 'Feelings of severe despondency and dejection', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deprivation', definition: 'The damaging lack of material benefits considered to be basic necessities', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'depth', definition: 'The distance from the top or surface of something to its bottom', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deputy', definition: 'A person whose immediate superior is a senior figure within an organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'derivation', definition: 'The obtaining or developing of something from a source or origin', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'descent', definition: 'An action of moving downward or dropping or falling', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'description', definition: 'A spoken or written representation or account of a person or object or event', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'desert', definition: 'A dry barren area of land especially one covered with sand that is characteristically desolate', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'design', definition: 'A plan or drawing produced to show the look and function or workings of a building', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'designation', definition: 'The choosing and naming of someone to be the holder of an official position', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'desire', definition: 'A strong feeling of wanting to have something or wishing for something to happen', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'destination', definition: 'The place to which someone or something is going or being sent', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'destruction', definition: 'The action or process of causing so much damage to something that it no longer exists', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'detail', definition: 'An individual feature or fact or item', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'detection', definition: 'The action or process of identifying the presence of something concealed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'determination', definition: 'Firmness of purpose or resoluteness', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'development', definition: 'The process of developing or being developed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deviation', definition: 'The action of departing from an established course or accepted standard', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'device', definition: 'A thing made or adapted for a particular purpose especially a piece of mechanical', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'diagnosis', definition: 'The identification of the nature of an illness or other problem by examination', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'diagram', definition: 'A simplified drawing showing the appearance or structure or workings of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dialect', definition: 'A particular form of a language that is peculiar to a specific region or social group', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dialogue', definition: 'Conversation between two or more people as a feature of a book or play or movie', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'diameter', definition: 'A straight line passing from side to side through the center of a body or figure', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dictatorship', definition: 'Government by a dictator', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'diet', definition: 'The kinds of food that a person or animal or community habitually eats', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'difference', definition: 'A point or way in which people or things are not the same', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'differentiation', definition: 'The action or process of differentiating or distinguishing between two or more things', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'difficulty', definition: 'The state or condition of being difficult', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dignity', definition: 'The state or quality of being worthy of honor or respect', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dilemma', definition: 'A situation in which a difficult choice has to be made between two or more alternatives', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dimension', definition: 'A measurable extent of some kind such as length or breadth or depth or height', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'diplomacy', definition: 'The profession or activity or skill of managing international relations', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'direction', definition: 'A course along which someone or something moves', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'director', definition: 'A person who is in charge of an activity or department or organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disability', definition: 'A physical or mental condition that limits a person\'s movements or senses or activities', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disadvantage', definition: 'An unfavorable circumstance or condition that reduces the chances of success', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disagreement', definition: 'Lack of consensus or approval', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disappointment', definition: 'Sadness or displeasure caused by the nonfulfillment of one\'s hopes or expectations', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disaster', definition: 'A sudden event such as an accident or a natural catastrophe that causes great damage', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'discipline', definition: 'The practice of training people to obey rules or a code of behavior using punishment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disclosure', definition: 'The action of making new or secret information known', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'discourse', definition: 'Written or spoken communication or debate', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'discovery', definition: 'The action or process of discovering or being discovered', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'discretion', definition: 'The quality of behaving or speaking in such a way as to avoid causing offense', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'discrimination', definition: 'The unjust or prejudicial treatment of different categories of people or things', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'discussion', definition: 'The action or process of talking about something typically in order to reach a decision', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disease', definition: 'A disorder of structure or function in a human or animal or plant especially one', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dismissal', definition: 'The act of ordering or allowing someone to leave', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disorder', definition: 'A state of confusion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'displacement', definition: 'The moving of something from its place or position', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'display', definition: 'A performance or show or event intended for public entertainment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disposal', definition: 'The action or process of throwing away or getting rid of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disposition', definition: 'A person\'s inherent qualities of mind and character', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dispute', definition: 'A disagreement or argument or debate', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disruption', definition: 'Disturbance or problems that interrupt an event or activity or process', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dissatisfaction', definition: 'Lack of satisfaction', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dissertation', definition: 'A long essay on a particular subject especially one written as a requirement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Nouns - Part 5
const ADVANCED_NOUNS_5: VocabularyWord[] = [
  { word: 'distance', definition: 'An amount of space between two things or people', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'distinction', definition: 'A difference or contrast between similar things or people', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'distortion', definition: 'The action of distorting or the state of being distorted', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'distribution', definition: 'The action of sharing something out among a number of recipients', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'district', definition: 'An area of a country or city especially one regarded as a distinct unit', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disturbance', definition: 'The interruption of a settled and peaceful condition', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'diversity', definition: 'The state of being diverse or variety', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dividend', definition: 'A sum of money paid regularly typically quarterly by a company to its shareholders', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'division', definition: 'The action of separating something into parts or the process of being separated', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'doctrine', definition: 'A belief or set of beliefs held and taught by a church or political party', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'document', definition: 'A piece of written or printed or electronic matter that provides information or evidence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'documentation', definition: 'Material that provides official information or evidence or that serves as a record', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'domain', definition: 'An area of territory owned or controlled by a ruler or government', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dominance', definition: 'Power and influence over others', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'donation', definition: 'Something that is given to a charity especially a sum of money', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'donor', definition: 'A person who donates something especially money to a fund or charity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dose', definition: 'A quantity of a medicine or drug taken or recommended to be taken at a particular time', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'doubt', definition: 'A feeling of uncertainty or lack of conviction', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'draft', definition: 'A preliminary version of a piece of writing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'drainage', definition: 'The action or process of draining something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'drama', definition: 'A play for theater or radio or television', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'drawback', definition: 'A feature that renders something less acceptable or a disadvantage or problem', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dream', definition: 'A series of thoughts or images or sensations occurring in a person\'s mind during sleep', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'drift', definition: 'A continuous slow movement from one place to another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'drive', definition: 'An innate or biologically determined urge to attain a goal or satisfy a need', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'drought', definition: 'A prolonged period of abnormally low rainfall or a shortage of water resulting from this', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'drug', definition: 'A medicine or other substance which has a physiological effect when ingested', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'duration', definition: 'The time during which something continues', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'duty', definition: 'A moral or legal obligation or a responsibility', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dynamic', definition: 'A force that stimulates change or progress within a system or process', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'earnings', definition: 'Money obtained in return for labor or services', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'earthquake', definition: 'A sudden and violent shaking of the ground sometimes causing great destruction', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ease', definition: 'Absence of difficulty or effort', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ecology', definition: 'The branch of biology that deals with the relations of organisms to one another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'economy', definition: 'The wealth and resources of a country or region especially in terms of the production', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ecosystem', definition: 'A biological community of interacting organisms and their physical environment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'edge', definition: 'The outside limit of an object or area or surface or a place or part farthest away', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'edition', definition: 'A particular form or version of a published text', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'editor', definition: 'A person who is in charge of and determines the final content of a text', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'education', definition: 'The process of receiving or giving systematic instruction especially at a school', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'educator', definition: 'A person who provides instruction or education or a teacher', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'effect', definition: 'A change that is a result or consequence of an action or other cause', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'effectiveness', definition: 'The degree to which something is successful in producing a desired result', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'efficiency', definition: 'The state or quality of being efficient', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'effort', definition: 'A vigorous or determined attempt', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'elaboration', definition: 'The process of developing or presenting a theory or policy or system in further detail', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'election', definition: 'A formal and organized process of electing or being elected especially of members', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'electricity', definition: 'A form of energy resulting from the existence of charged particles', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'element', definition: 'A part or aspect of something abstract especially one that is essential or characteristic', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'elevation', definition: 'The action or fact of elevating or being elevated', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'elimination', definition: 'The complete removal or destruction of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'elite', definition: 'A select part of a group that is superior to the rest in terms of ability or qualities', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'embargo', definition: 'An official ban on trade or other commercial activity with a particular country', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'emergence', definition: 'The process of coming into view or into existence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'emergency', definition: 'A serious or unexpected or often dangerous situation requiring immediate action', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'emission', definition: 'The production and discharge of something especially gas or radiation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'emotion', definition: 'A natural instinctive state of mind deriving from one\'s circumstances or mood', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'emperor', definition: 'A sovereign ruler of great power and rank especially one ruling an empire', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'emphasis', definition: 'Special importance or value or prominence given to something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'empire', definition: 'An extensive group of states or countries under a single supreme authority', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'employee', definition: 'A person employed for wages or salary especially at nonexecutive level', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'employer', definition: 'A person or organization that employs people', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'employment', definition: 'The condition of having paid work', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'encounter', definition: 'An unexpected or casual meeting with someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'encouragement', definition: 'The action of giving someone support or confidence or hope', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'endeavor', definition: 'An attempt to achieve a goal', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ending', definition: 'An end or final part of something especially a period of time or an activity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'endorsement', definition: 'An act of giving one\'s public approval or support to someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'endurance', definition: 'The fact or power of enduring an unpleasant or difficult process or situation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enemy', definition: 'A person who is actively opposed or hostile to someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'energy', definition: 'The strength and vitality required for sustained physical or mental activity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enforcement', definition: 'The act of compelling observance of or compliance with a law or rule or obligation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'engagement', definition: 'A formal agreement to get married', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'engine', definition: 'A machine with moving parts that converts power into motion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'engineer', definition: 'A person who designs or builds or maintains engines or machines or public works', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'engineering', definition: 'The branch of science and technology concerned with the design or building', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enhancement', definition: 'An increase or improvement in quality or value or extent', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enjoyment', definition: 'The state or process of taking pleasure in something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enquiry', definition: 'An act of asking for information', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enrollment', definition: 'The action of enrolling or being enrolled', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enterprise', definition: 'A project or undertaking typically one that is difficult or requires effort', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'entertainment', definition: 'The action of providing or being provided with amusement or enjoyment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enthusiasm', definition: 'Intense and eager enjoyment or interest or approval', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'entity', definition: 'A thing with distinct and independent existence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'entrance', definition: 'An opening such as a door or passageway or gate that allows access to a place', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'entrepreneur', definition: 'A person who organizes and operates a business or businesses taking on greater risk', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'entry', definition: 'An act of going or coming in', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'environment', definition: 'The surroundings or conditions in which a person or animal or plant lives or operates', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'epidemic', definition: 'A widespread occurrence of an infectious disease in a community at a particular time', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'episode', definition: 'An event or a group of events occurring as part of a larger sequence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'equality', definition: 'The state of being equal especially in status or rights or opportunities', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'equation', definition: 'A statement that the values of two mathematical expressions are equal', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'equilibrium', definition: 'A state in which opposing forces or influences are balanced', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'equipment', definition: 'The necessary items for a particular purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'equity', definition: 'The quality of being fair and impartial', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch31(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_NOUNS_4, ...ADVANCED_NOUNS_5];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 31: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 31 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 31');
  console.log('Advanced Academic Nouns - Parts 4 & 5');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch31(supabase);
  
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
