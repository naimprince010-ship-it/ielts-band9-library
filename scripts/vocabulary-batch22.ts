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

// Advanced Academic Verbs - Part 14
const ADVANCED_VERBS_14: VocabularyWord[] = [
  { word: 'position', definition: 'To put or arrange someone or something in a particular place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'possess', definition: 'To have as belonging to one or own', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'post', definition: 'To display a notice in a public place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'postpone', definition: 'To cause or arrange for something to take place at a later time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'postulate', definition: 'To suggest or assume the existence or truth of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pour', definition: 'To flow rapidly in a steady stream', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'practice', definition: 'To perform an activity or exercise a skill repeatedly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'praise', definition: 'To express warm approval or admiration of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pray', definition: 'To address a solemn request or expression of thanks to a deity', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'preach', definition: 'To deliver a sermon or religious address to an assembled group', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'precede', definition: 'To come before something in time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'precipitate', definition: 'To cause an event or situation to happen suddenly or prematurely', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'preclude', definition: 'To prevent from happening or make impossible', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'predict', definition: 'To say or estimate that a specified thing will happen in the future', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'predispose', definition: 'To make someone liable or inclined to a specified attitude or action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'predominate', definition: 'To be the strongest or main element or be greater in number', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prefer', definition: 'To like one thing or person better than another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prejudice', definition: 'To give rise to prejudice in someone or make biased', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prepare', definition: 'To make something ready for use or consideration', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prescribe', definition: 'To advise and authorize the use of a medicine or treatment', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'present', definition: 'To show or offer something for others to scrutinize or consider', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'preserve', definition: 'To maintain something in its original or existing state', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'preside', definition: 'To be in the position of authority in a meeting or gathering', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'press', definition: 'To move or cause to move into a position of contact with something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pressure', definition: 'To attempt to persuade or coerce someone into doing something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'presume', definition: 'To suppose that something is the case on the basis of probability', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pretend', definition: 'To speak and act so as to make it appear that something is the case', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prevail', definition: 'To prove more powerful than opposing forces or be victorious', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prevent', definition: 'To keep something from happening or arising', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'price', definition: 'To decide the amount required as payment for something offered', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pride', definition: 'To be especially proud of a particular quality or skill', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'print', definition: 'To produce books or newspapers by a mechanical process', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prioritize', definition: 'To designate or treat something as more important than other things', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'privatize', definition: 'To transfer a business or industry from public to private ownership', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'probe', definition: 'To physically explore or examine something with the hands or an instrument', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'proceed', definition: 'To begin or continue a course of action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'process', definition: 'To perform a series of mechanical or chemical operations on something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'proclaim', definition: 'To announce officially or publicly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'procure', definition: 'To obtain something especially with care or effort', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'produce', definition: 'To make or manufacture from components or raw materials', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'profess', definition: 'To claim openly but often falsely that one has a quality or feeling', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'profile', definition: 'To describe someone or something in a short article', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'profit', definition: 'To obtain a financial advantage or benefit', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'program', definition: 'To provide a computer or other machine with coded instructions', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'progress', definition: 'To move forward or onward in space or time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prohibit', definition: 'To formally forbid something by law or rule or other authority', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'project', definition: 'To estimate or forecast something on the basis of present trends', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'proliferate', definition: 'To increase rapidly in numbers or multiply', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prolong', definition: 'To extend the duration of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'promise', definition: 'To assure someone that one will definitely do or give something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'promote', definition: 'To further the progress of something especially a cause or venture', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prompt', definition: 'To cause or bring about an action or feeling', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pronounce', definition: 'To make the sound of a word or part of a word', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'propagate', definition: 'To spread and promote an idea or theory widely', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'propel', definition: 'To drive or push or cause to move in a particular direction', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'propose', definition: 'To put forward an idea or plan for consideration or discussion', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prosecute', definition: 'To institute legal proceedings against a person or organization', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prosper', definition: 'To succeed in material terms or be financially successful', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'protect', definition: 'To keep safe from harm or injury', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'protest', definition: 'To express an objection to what someone has said or done', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prove', definition: 'To demonstrate the truth or existence of something by evidence', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'provide', definition: 'To make available for use or supply', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'provoke', definition: 'To stimulate or give rise to a reaction or emotion', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'publicize', definition: 'To make something widely known', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'publish', definition: 'To prepare and issue a book or journal for public sale', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pull', definition: 'To exert force on someone or something to move them toward oneself', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pump', definition: 'To force liquid or gas to move in a specified direction', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'punch', definition: 'To strike with the fist', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'punish', definition: 'To inflict a penalty or sanction on someone as retribution', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'purchase', definition: 'To acquire something by paying for it or buy', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'purify', definition: 'To remove contaminants from', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pursue', definition: 'To follow or chase someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'push', definition: 'To exert force on someone or something to move them away from oneself', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'put', definition: 'To move to or place in a particular position', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'puzzle', definition: 'To cause someone to feel confused because they cannot understand', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'qualify', definition: 'To be entitled to a particular benefit or privilege', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'quantify', definition: 'To express or measure the quantity of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'quarrel', definition: 'To have an angry argument or disagreement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'query', definition: 'To ask a question about something especially to express doubt', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'question', definition: 'To ask questions of someone especially in an official context', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'queue', definition: 'To take one\'s place in a queue', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'quit', definition: 'To leave a place usually permanently', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'quote', definition: 'To repeat or copy out a group of words from a text or speech', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'race', definition: 'To compete with another or others to see who is fastest', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'radiate', definition: 'To emit energy especially light or heat in the form of rays', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rage', definition: 'To feel or express violent uncontrollable anger', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'raid', definition: 'To conduct a raid on', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'raise', definition: 'To lift or move to a higher position or level', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rally', definition: 'To come together in order to support a person or cause', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'range', definition: 'To vary or extend between specified limits', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rank', definition: 'To give someone or something a rank or place within a grading system', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rate', definition: 'To assign a standard or value to something according to a particular scale', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ratify', definition: 'To sign or give formal consent to a treaty or contract', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rationalize', definition: 'To attempt to explain or justify behavior or an attitude', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Verbs - Part 15
const ADVANCED_VERBS_15: VocabularyWord[] = [
  { word: 'reach', definition: 'To stretch out an arm in a specified direction to touch or grasp', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'react', definition: 'To respond or behave in a particular way in response to something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'read', definition: 'To look at and comprehend the meaning of written or printed matter', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'realize', definition: 'To become fully aware of something as a fact or understand clearly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reap', definition: 'To cut or gather a crop or harvest', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rear', definition: 'To bring up and care for a child until they are fully grown', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reason', definition: 'To think or argue in a logical manner', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reassure', definition: 'To say or do something to remove the doubts and fears of someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rebel', definition: 'To rise in opposition or armed resistance to an established government', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rebuild', definition: 'To build something again after it has been damaged or destroyed', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rebuke', definition: 'To express sharp disapproval or criticism of someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'recall', definition: 'To bring a fact or event back into one\'s mind or remember', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'recede', definition: 'To go or move back or further away from a previous position', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'receive', definition: 'To be given or presented with or paid something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reckon', definition: 'To establish by counting or calculation or compute', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reclaim', definition: 'To retrieve or recover something previously lost or given', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'recognize', definition: 'To identify someone or something from having encountered them before', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'recommend', definition: 'To put forward someone or something with approval as being suitable', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reconcile', definition: 'To restore friendly relations between', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reconstruct', definition: 'To build or form something again after it has been damaged', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'record', definition: 'To set down in writing or some other permanent form for later reference', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'recount', definition: 'To tell someone about something or give an account of an event', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'recover', definition: 'To return to a normal state of health or strength', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'recreate', definition: 'To create again', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'recruit', definition: 'To enlist someone in the armed forces', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rectify', definition: 'To put something right or correct', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'recur', definition: 'To occur again periodically or repeatedly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'recycle', definition: 'To convert waste into reusable material', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'redeem', definition: 'To compensate for the faults or bad aspects of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'redirect', definition: 'To direct something to a new or different place or purpose', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reduce', definition: 'To make smaller or less in amount or degree or size', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'refer', definition: 'To mention or allude to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'refine', definition: 'To remove impurities or unwanted elements from a substance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reflect', definition: 'To throw back heat or light or sound without absorbing it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reform', definition: 'To make changes in something to improve it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'refrain', definition: 'To stop oneself from doing something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'refresh', definition: 'To give new strength or energy to or reinvigorate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'refund', definition: 'To pay back money to someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'refuse', definition: 'To indicate or show that one is not willing to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'refute', definition: 'To prove a statement or theory to be wrong or false', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'regain', definition: 'To obtain possession or use of something again after losing it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'regard', definition: 'To consider or think of in a specified way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'regenerate', definition: 'To regrow new tissue', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'register', definition: 'To enter or record on an official list or directory', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'regret', definition: 'To feel sad or disappointed over something that has happened', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'regulate', definition: 'To control or maintain the rate or speed of a machine or process', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rehabilitate', definition: 'To restore someone to health or normal life by training and therapy', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rehearse', definition: 'To practice a play or piece of music for later public performance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reign', definition: 'To hold royal office or rule as king or queen', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reimburse', definition: 'To repay a person who has spent or lost money', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reinforce', definition: 'To strengthen or support especially with additional personnel', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reinstate', definition: 'To restore someone or something to their former position or condition', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reiterate', definition: 'To say something again or a number of times', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reject', definition: 'To dismiss as inadequate or inappropriate or not to one\'s taste', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rejoice', definition: 'To feel or show great joy or delight', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'relate', definition: 'To make or show a connection between', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'relax', definition: 'To make or become less tense or anxious', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'relay', definition: 'To receive and pass on information or a message', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'release', definition: 'To allow or enable to escape from confinement or set free', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'relegate', definition: 'To consign or dismiss to an inferior rank or position', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'relieve', definition: 'To cause pain or distress or anxiety to become less severe', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'relinquish', definition: 'To voluntarily cease to keep or claim or give up', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'relocate', definition: 'To move to a new place and establish one\'s home or business there', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rely', definition: 'To depend on with full trust or confidence', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'remain', definition: 'To continue to exist especially after other similar things have ceased', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'remark', definition: 'To say something as a comment or mention', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'remedy', definition: 'To set right an undesirable situation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'remember', definition: 'To have in or be able to bring to one\'s mind an awareness of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'remind', definition: 'To cause someone to remember someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'remit', definition: 'To cancel or refrain from exacting or inflicting a debt or punishment', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'remove', definition: 'To take something away or off from the position occupied', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'render', definition: 'To provide or give a service or help or assistance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'renew', definition: 'To resume an activity after an interruption', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'renounce', definition: 'To formally declare one\'s abandonment of a claim or right', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'renovate', definition: 'To restore something old especially a building to a good state of repair', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rent', definition: 'To pay someone for the use of something typically property or land', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'repair', definition: 'To fix or mend a thing suffering from damage or a fault', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'repay', definition: 'To pay back a loan or debt', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'repeal', definition: 'To revoke or annul a law or congressional act', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'repeat', definition: 'To say again something one has already said', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'repel', definition: 'To drive or force an attack or attacker back or away', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'replace', definition: 'To take the place of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'replicate', definition: 'To make an exact copy of or reproduce', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reply', definition: 'To say something in response to something someone has said', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'report', definition: 'To give a spoken or written account of something that one has observed', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'represent', definition: 'To be entitled or appointed to act or speak for someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'repress', definition: 'To subdue someone or something by force', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reproduce', definition: 'To produce a copy or representation of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'repudiate', definition: 'To refuse to accept or be associated with', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'request', definition: 'To politely or formally ask for', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'require', definition: 'To need for a particular purpose', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch22(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_VERBS_14, ...ADVANCED_VERBS_15];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 22: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 22 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 22');
  console.log('Advanced Academic Verbs - Parts 14 & 15');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch22(supabase);
  
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
