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

// Academic Nouns - Part 17
const ACADEMIC_NOUNS_17: VocabularyWord[] = [
  { word: 'version', definition: 'A particular form of something differing in certain respects', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'vessel', definition: 'A ship or large boat', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'veteran', definition: 'A person who has had long experience in a particular field', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'viability', definition: 'Ability to work successfully', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'vice', definition: 'Immoral or wicked behavior', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'victim', definition: 'A person harmed or killed as a result of a crime', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'victory', definition: 'An act of defeating an enemy or opponent', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'video', definition: 'The recording or broadcasting of moving visual images', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'view', definition: 'The ability to see something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'viewer', definition: 'A person who looks at or watches something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'viewpoint', definition: 'A particular attitude or way of considering a matter', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'vigor', definition: 'Physical strength and good health', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'village', definition: 'A group of houses and associated buildings', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'violation', definition: 'The action of violating someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'violence', definition: 'Behavior involving physical force intended to hurt', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'virtue', definition: 'Behavior showing high moral standards', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'virus', definition: 'An infective agent that typically consists of nucleic acid', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'visibility', definition: 'The state of being able to see or be seen', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'vision', definition: 'The faculty or state of being able to see', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'visit', definition: 'An act of going to see a person or place', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'visitor', definition: 'A person visiting a person or place', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'vitality', definition: 'The state of being strong and active', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'vocabulary', definition: 'The body of words used in a particular language', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'vocation', definition: 'A strong feeling of suitability for a particular career', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'voice', definition: 'The sound produced in a person\'s larynx', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'volatility', definition: 'Liability to change rapidly and unpredictably', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'volume', definition: 'The amount of space that a substance or object occupies', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'volunteer', definition: 'A person who freely offers to take part in an enterprise', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'vote', definition: 'A formal indication of a choice between candidates', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'voter', definition: 'A person who votes or has the right to vote', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'vulnerability', definition: 'The quality of being exposed to the possibility of attack', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'wage', definition: 'A fixed regular payment earned for work', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'war', definition: 'A state of armed conflict between different nations', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'warehouse', definition: 'A large building where raw materials or goods are stored', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'warfare', definition: 'Engagement in or the activities involved in war', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'warmth', definition: 'The quality or state of being warm', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'warning', definition: 'A statement or event that indicates a possible danger', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'warrant', definition: 'A document issued by a legal authority', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'warranty', definition: 'A written guarantee promising to repair or replace', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'waste', definition: 'Material that is not wanted', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'water', definition: 'A colorless transparent liquid', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'wave', definition: 'A long body of water curling into an arched form', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'way', definition: 'A method or manner of doing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'weakness', definition: 'The state or condition of lacking strength', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'wealth', definition: 'An abundance of valuable possessions or money', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'weapon', definition: 'A thing designed to inflict bodily harm', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'weather', definition: 'The state of the atmosphere at a place and time', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'web', definition: 'A network of fine threads constructed by a spider', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'website', definition: 'A location connected to the Internet', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'wedding', definition: 'A marriage ceremony', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'week', definition: 'A period of seven days', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'weekend', definition: 'Saturday and Sunday', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'weight', definition: 'A body\'s relative mass', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'welfare', definition: 'The health and happiness of a person or group', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'west', definition: 'The direction toward the point of the horizon', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'wheel', definition: 'A circular object that revolves on an axle', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'whole', definition: 'A thing that is complete in itself', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'width', definition: 'The measurement from side to side', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'wilderness', definition: 'An uncultivated uninhabited region', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'wildlife', definition: 'Wild animals collectively', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'will', definition: 'The faculty by which a person decides on actions', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'willingness', definition: 'The quality of being prepared to do something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'wind', definition: 'The perceptible natural movement of the air', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'window', definition: 'An opening in the wall of a building', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'wine', definition: 'An alcoholic drink made from fermented grape juice', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'wing', definition: 'A modified forelimb that bears feathers', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'winner', definition: 'A person or thing that wins something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'winter', definition: 'The coldest season of the year', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'wisdom', definition: 'The quality of having experience and good judgment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'wish', definition: 'A desire or hope for something to happen', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'withdrawal', definition: 'The action of withdrawing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'witness', definition: 'A person who sees an event', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'woman', definition: 'An adult human female', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'wonder', definition: 'A feeling of surprise mingled with admiration', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'wood', definition: 'The hard fibrous material forming the trunk', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'word', definition: 'A single distinct meaningful element of speech', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'work', definition: 'Activity involving mental or physical effort', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'worker', definition: 'A person who does a specified type of work', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'workforce', definition: 'The people engaged in or available for work', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'workplace', definition: 'A place where people work', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'workshop', definition: 'A room or building in which goods are manufactured', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'world', definition: 'The earth with all its countries and peoples', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'worry', definition: 'A state of anxiety and uncertainty', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'worship', definition: 'The feeling or expression of reverence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'worth', definition: 'The value equivalent to that of someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'wound', definition: 'An injury to living tissue caused by a cut', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'wrath', definition: 'Extreme anger', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'writer', definition: 'A person who has written a particular text', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'writing', definition: 'The activity or skill of marking coherent words', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'yard', definition: 'A unit of linear measure equal to 3 feet', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'year', definition: 'The time taken by a planet to make one revolution', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'yield', definition: 'The full amount of an agricultural or industrial product', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'youth', definition: 'The period between childhood and adult age', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'zeal', definition: 'Great energy or enthusiasm in pursuit of a cause', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'zone', definition: 'An area or stretch of land having a particular characteristic', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
];

// Advanced Academic Verbs - Part 1
const ADVANCED_VERBS_1: VocabularyWord[] = [
  { word: 'abase', definition: 'To behave in a way that belittles or degrades someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'abate', definition: 'To become less intense or widespread', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'abbreviate', definition: 'To shorten a word or phrase', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'abdicate', definition: 'To renounce one\'s throne', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'abduct', definition: 'To take someone away illegally by force', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'abet', definition: 'To encourage or assist someone to do something wrong', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'abhor', definition: 'To regard with disgust and hatred', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'abide', definition: 'To accept or act in accordance with a rule', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'abjure', definition: 'To solemnly renounce a belief or claim', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'abound', definition: 'To exist in large numbers or amounts', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'abridge', definition: 'To shorten a book or other text without losing the sense', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'abrogate', definition: 'To repeal or do away with a law or agreement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'absolve', definition: 'To set or declare someone free from blame', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'abstain', definition: 'To restrain oneself from doing something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accede', definition: 'To agree to a demand or request', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accentuate', definition: 'To make more noticeable or prominent', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'acclaim', definition: 'To praise enthusiastically and publicly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'acclimate', definition: 'To become accustomed to a new climate or conditions', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accommodate', definition: 'To provide lodging or sufficient space for', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accompany', definition: 'To go somewhere with someone as a companion', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accomplish', definition: 'To achieve or complete successfully', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accost', definition: 'To approach and address someone boldly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accredit', definition: 'To give official authorization or approval to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accrue', definition: 'To accumulate or receive payments or benefits over time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accumulate', definition: 'To gather together or acquire an increasing amount', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accuse', definition: 'To charge someone with an offense or crime', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accustom', definition: 'To make someone accept something as normal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'achieve', definition: 'To successfully bring about or reach a desired objective', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'acknowledge', definition: 'To accept or admit the existence or truth of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'acquaint', definition: 'To make someone aware of or familiar with', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'acquiesce', definition: 'To accept something reluctantly but without protest', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'acquire', definition: 'To buy or obtain an asset or object for oneself', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'acquit', definition: 'To free someone from a criminal charge', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'activate', definition: 'To make something active or operative', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'actualize', definition: 'To make a reality of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adapt', definition: 'To make suitable for a new use or purpose', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adhere', definition: 'To stick fast to a surface or substance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adjoin', definition: 'To be next to and joined with a building or room', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adjourn', definition: 'To break off a meeting with the intention of resuming', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adjudicate', definition: 'To make a formal judgment or decision about a problem', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adjust', definition: 'To alter or move something slightly to achieve a desired fit', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'administer', definition: 'To manage and be responsible for the running of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'admire', definition: 'To regard with respect or warm approval', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'admit', definition: 'To confess to be true or to be the case', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'admonish', definition: 'To warn or reprimand someone firmly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adopt', definition: 'To legally take another\'s child and bring it up as one\'s own', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adore', definition: 'To love and respect someone deeply', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adorn', definition: 'To make more beautiful or attractive', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adulterate', definition: 'To render something poorer in quality by adding another substance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'advance', definition: 'To move forward in a purposeful way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'advertise', definition: 'To describe or draw attention to a product', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'advise', definition: 'To offer suggestions about the best course of action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'advocate', definition: 'To publicly recommend or support', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'affect', definition: 'To have an effect on or make a difference to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'affiliate', definition: 'To officially attach or connect to an organization', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'affirm', definition: 'To state as a fact or assert strongly and publicly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'affix', definition: 'To stick or attach something to something else', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'afflict', definition: 'To cause pain or suffering to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'aggravate', definition: 'To make a problem or offense worse or more serious', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'aggregate', definition: 'To form or group into a class or cluster', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'agitate', definition: 'To make someone troubled or nervous', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'agonize', definition: 'To undergo great mental anguish through worrying', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'aid', definition: 'To help or support someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'alienate', definition: 'To cause someone to feel isolated or estranged', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'align', definition: 'To place or arrange things in a straight line', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'allege', definition: 'To claim or assert that someone has done something illegal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'alleviate', definition: 'To make suffering or a problem less severe', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'allocate', definition: 'To distribute resources or duties for a particular purpose', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'allot', definition: 'To give or apportion something to someone as a share', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'allow', definition: 'To give permission for something to happen', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'allude', definition: 'To suggest or call attention to indirectly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'alter', definition: 'To change or cause to change in character or composition', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'alternate', definition: 'To occur in turn repeatedly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'amalgamate', definition: 'To combine or unite to form one organization', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'amass', definition: 'To gather together or accumulate a large amount', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'amaze', definition: 'To surprise someone greatly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ambush', definition: 'To make a surprise attack on someone from a concealed position', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ameliorate', definition: 'To make something bad or unsatisfactory better', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'amend', definition: 'To make minor changes to a text to make it fairer', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'amplify', definition: 'To increase the volume of sound', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'amputate', definition: 'To cut off a limb by surgical operation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'amuse', definition: 'To cause someone to find something funny', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'analyze', definition: 'To examine methodically and in detail', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'anchor', definition: 'To moor a ship to the sea bottom with an anchor', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'anger', definition: 'To fill someone with anger or provoke anger in', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'animate', definition: 'To bring to life', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'annex', definition: 'To append or add as an extra or subordinate part', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'annihilate', definition: 'To destroy utterly or obliterate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'annotate', definition: 'To add notes to a text or diagram giving explanation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'announce', definition: 'To make a public and typically formal declaration', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'annoy', definition: 'To irritate someone or make them a little angry', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'annul', definition: 'To declare invalid an official agreement or decision', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'anoint', definition: 'To smear or rub with oil typically as part of a religious ceremony', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'anticipate', definition: 'To regard as probable or expect or predict', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'apologize', definition: 'To express regret for something that one has done wrong', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'appall', definition: 'To greatly dismay or horrify', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch15(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ACADEMIC_NOUNS_17, ...ADVANCED_VERBS_1];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 15: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 15 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 15');
  console.log('Academic Nouns Part 17 & Advanced Verbs Part 1');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch15(supabase);
  
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
