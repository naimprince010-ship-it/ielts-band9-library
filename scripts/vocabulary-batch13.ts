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

// Academic Nouns - Part 13
const ACADEMIC_NOUNS_13: VocabularyWord[] = [
  { word: 'scope', definition: 'The extent of the area or subject matter', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'score', definition: 'The number of points achieved in a game', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'scrutiny', definition: 'Critical observation or examination', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'search', definition: 'An act of searching for someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'season', definition: 'Each of the four divisions of the year', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'seat', definition: 'A thing made or used for sitting on', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'secrecy', definition: 'The action of keeping something secret', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'secret', definition: 'Something that is kept hidden', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'secretariat', definition: 'A permanent administrative office', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'section', definition: 'Any of the more or less distinct parts', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sector', definition: 'An area or portion that is distinct', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'security', definition: 'The state of being free from danger', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sediment', definition: 'Matter that settles to the bottom of a liquid', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'segment', definition: 'Each of the parts into which something is divided', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'segregation', definition: 'The action of setting someone apart', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'selection', definition: 'The action of carefully choosing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'self', definition: 'A person\'s essential being', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'seminar', definition: 'A conference for discussion or training', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'senate', definition: 'Any of various legislative bodies', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sensation', definition: 'A physical feeling or perception', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sense', definition: 'A faculty by which the body perceives', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sensitivity', definition: 'The quality of being sensitive', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sentence', definition: 'A set of words that is complete in itself', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sentiment', definition: 'A view or attitude toward a situation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'separation', definition: 'The action of moving apart', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sequence', definition: 'A particular order in which related events follow', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'series', definition: 'A number of things of a similar kind', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'service', definition: 'The action of helping or doing work', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'session', definition: 'A meeting of a deliberative body', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'setback', definition: 'A reversal or check in progress', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'setting', definition: 'The place or type of surroundings', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'settlement', definition: 'An official agreement intended to resolve a dispute', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'severity', definition: 'The fact or condition of being severe', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sex', definition: 'Either of the two main categories of male and female', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'shade', definition: 'Comparative darkness caused by shelter', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'shadow', definition: 'A dark area or shape produced by a body', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'shape', definition: 'The external form or appearance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'share', definition: 'A part or portion of a larger amount', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'shareholder', definition: 'An owner of shares in a company', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sheet', definition: 'A large rectangular piece of cotton', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'shelter', definition: 'A place giving temporary protection', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'shift', definition: 'A slight change in position or direction', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ship', definition: 'A large boat for transporting people or goods', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'shipment', definition: 'A quantity of goods shipped together', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'shock', definition: 'A sudden upsetting or surprising event', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'shortage', definition: 'A state or situation in which something needed cannot be obtained', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'shortcoming', definition: 'A fault or failure to meet a certain standard', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'show', definition: 'A spectacle or display of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'shrinkage', definition: 'The process of shrinking', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'side', definition: 'A position to the left or right of an object', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sight', definition: 'The faculty or power of seeing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sign', definition: 'An object or quality that indicates something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'signal', definition: 'A gesture or action used to convey information', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'signature', definition: 'A person\'s name written in a distinctive way', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'significance', definition: 'The quality of being worthy of attention', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'silence', definition: 'Complete absence of sound', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'similarity', definition: 'The state of being similar to something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'simplicity', definition: 'The quality of being easy to understand', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'simulation', definition: 'Imitation of a situation or process', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sin', definition: 'An immoral act considered to be a transgression', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sincerity', definition: 'The quality of being free from pretense', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'site', definition: 'An area of ground on which a town is built', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'situation', definition: 'A set of circumstances in which one finds oneself', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'size', definition: 'The relative extent of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'skepticism', definition: 'A skeptical attitude; doubt', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sketch', definition: 'A rough or unfinished drawing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'skill', definition: 'The ability to do something well', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'slavery', definition: 'The state of being a slave', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'slice', definition: 'A thin broad piece of food', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'slope', definition: 'A surface of which one end is at a higher level', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'slump', definition: 'A sudden severe or prolonged fall in price', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'snapshot', definition: 'An informal photograph', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'socialism', definition: 'A political and economic theory', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'society', definition: 'The aggregate of people living together', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sociology', definition: 'The study of the development and structure of human society', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'software', definition: 'The programs used to operate computers', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'soil', definition: 'The upper layer of earth', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'soldier', definition: 'A person who serves in an army', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'solidarity', definition: 'Unity or agreement of feeling or action', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'solitude', definition: 'The state of being alone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'solution', definition: 'A means of solving a problem', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sophistication', definition: 'The quality of being sophisticated', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sort', definition: 'A category of things having some common feature', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'soul', definition: 'The spiritual part of a human being', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sound', definition: 'Vibrations that travel through the air', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'source', definition: 'A place from which something comes', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sovereignty', definition: 'Supreme power or authority', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'space', definition: 'A continuous area or expanse', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'span', definition: 'The full extent of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'speaker', definition: 'A person who speaks', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'specialist', definition: 'A person who concentrates on a particular subject', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'specialization', definition: 'The process of concentrating on a narrow area', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'species', definition: 'A group of living organisms', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'specification', definition: 'An act of identifying something precisely', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'specimen', definition: 'An individual animal or plant', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'spectacle', definition: 'A visually striking performance or display', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'spectator', definition: 'A person who watches at a show or game', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'spectrum', definition: 'A band of colors produced by separation of light', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
];

// Academic Nouns - Part 14
const ACADEMIC_NOUNS_14: VocabularyWord[] = [
  { word: 'speculation', definition: 'The forming of a theory without firm evidence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'speech', definition: 'The expression of thoughts and feelings by articulate sounds', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'speed', definition: 'The rate at which someone or something moves', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'spending', definition: 'The action of spending funds', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sphere', definition: 'A round solid figure', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'spirit', definition: 'The nonphysical part of a person', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'spite', definition: 'A desire to hurt or annoy another person', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'split', definition: 'A tear or crack in something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'spokesman', definition: 'A person who makes statements on behalf of a group', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sponsor', definition: 'A person or organization that provides funds', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sponsorship', definition: 'The position of being a sponsor', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'spot', definition: 'A particular place or point', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'spotlight', definition: 'A lamp projecting a narrow beam of light', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'spread', definition: 'The fact of spreading over an area', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'stability', definition: 'The state of being stable', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'staff', definition: 'All the people employed by a particular organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'stage', definition: 'A point or period in a process', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'stagnation', definition: 'The state of not flowing or moving', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'stake', definition: 'A strong wooden or metal post', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'stakeholder', definition: 'A person with an interest in something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'stance', definition: 'The way in which someone stands', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'standard', definition: 'A level of quality or attainment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'standpoint', definition: 'An attitude to or outlook on issues', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'state', definition: 'The particular condition that someone is in', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'statement', definition: 'A definite or clear expression of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'statistic', definition: 'A fact or piece of data from a study', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'statistics', definition: 'The practice of collecting and analyzing numerical data', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'status', definition: 'The relative social or professional standing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'statute', definition: 'A written law passed by a legislative body', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'stereotype', definition: 'A widely held but fixed and oversimplified image', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'stigma', definition: 'A mark of disgrace associated with a circumstance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'stimulation', definition: 'The raising of levels of physiological activity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'stimulus', definition: 'A thing that rouses activity or energy', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'stock', definition: 'The goods or merchandise kept on the premises', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'storage', definition: 'The action of storing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'store', definition: 'A quantity or supply of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'storm', definition: 'A violent disturbance of the atmosphere', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'story', definition: 'An account of imaginary or real people and events', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'strain', definition: 'A force tending to pull or stretch something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'strand', definition: 'A single thin length of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'stranger', definition: 'A person whom one does not know', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'strategy', definition: 'A plan of action designed to achieve a goal', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'stream', definition: 'A small narrow river', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'strength', definition: 'The quality or state of being physically strong', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'stress', definition: 'A state of mental or emotional strain', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'stretch', definition: 'An act of stretching one\'s limbs or body', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'strike', definition: 'A refusal to work organized by employees', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'structure', definition: 'The arrangement of and relations between parts', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'struggle', definition: 'A forceful effort to get free', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'student', definition: 'A person who is studying at a school', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'studio', definition: 'A room where an artist works', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'study', definition: 'The devotion of time and attention to acquiring knowledge', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'stuff', definition: 'Matter or material of a specified kind', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'style', definition: 'A manner of doing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'subject', definition: 'A person or thing that is being discussed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'submission', definition: 'The action of accepting or yielding', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'subordinate', definition: 'A person under the authority of another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'subscriber', definition: 'A person who receives a publication regularly', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'subscription', definition: 'The action of making or agreeing to make a payment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'subsidy', definition: 'A sum of money granted by the government', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'substance', definition: 'A particular kind of matter with uniform properties', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'substitute', definition: 'A person or thing acting in place of another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'substitution', definition: 'The action of replacing someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'suburb', definition: 'An outlying district of a city', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'success', definition: 'The accomplishment of an aim or purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'succession', definition: 'A number of people or things sharing a characteristic', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'successor', definition: 'A person or thing that succeeds another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'suffering', definition: 'The state of undergoing pain or distress', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sufficiency', definition: 'The condition of being enough', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'suggestion', definition: 'An idea or plan put forward for consideration', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'suicide', definition: 'The action of killing oneself intentionally', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'suit', definition: 'A set of outer clothes made of the same fabric', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'suitability', definition: 'The quality of being right or appropriate', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sum', definition: 'A particular amount of money', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'summary', definition: 'A brief statement of the main points', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'summit', definition: 'The highest point of a hill or mountain', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'supermarket', definition: 'A large self-service store selling foods', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'supervision', definition: 'The action of supervising someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'supervisor', definition: 'A person who supervises a person or activity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'supplement', definition: 'Something that completes or enhances something else', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'supplier', definition: 'A person or organization that provides something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'supply', definition: 'A stock of a resource from which a person can be provided', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'support', definition: 'A thing that bears the weight of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'supporter', definition: 'A person who approves of and encourages', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'supposition', definition: 'An uncertain belief', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'suppression', definition: 'The action of suppressing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'supremacy', definition: 'The state of being supreme', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'surface', definition: 'The outside part or uppermost layer', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'surge', definition: 'A sudden powerful forward or upward movement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'surplus', definition: 'An amount of something left over', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'surprise', definition: 'An unexpected event or fact', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'surrender', definition: 'The action of surrendering', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'surveillance', definition: 'Close observation of a person or group', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'survey', definition: 'A general view or examination of someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'survival', definition: 'The state of continuing to live', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'survivor', definition: 'A person who survives', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'susceptibility', definition: 'The state of being likely to be influenced', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'suspect', definition: 'A person thought to be guilty of a crime', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
];

async function seedBatch13(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ACADEMIC_NOUNS_13, ...ACADEMIC_NOUNS_14];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 13: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 13 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 13');
  console.log('Academic Nouns - Parts 13 & 14');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch13(supabase);
  
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
