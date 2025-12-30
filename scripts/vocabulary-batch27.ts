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

// Advanced Academic Adjectives - Part 4
const ADVANCED_ADJECTIVES_4: VocabularyWord[] = [
  { word: 'linguistic', definition: 'Of or relating to language or linguistics', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'literal', definition: 'Taking words in their usual or most basic sense without metaphor', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'literary', definition: 'Concerning the writing or study or content of literature', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'local', definition: 'Relating or restricted to a particular place or its surroundings', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'logical', definition: 'Of or according to the rules of logic or formal argument', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'long-term', definition: 'Occurring over or relating to a long period of time', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lucrative', definition: 'Producing a great deal of profit', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'magnetic', definition: 'Relating to or produced by magnetism', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'magnificent', definition: 'Impressively beautiful or elaborate or extravagant or striking', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mainstream', definition: 'The ideas or activities that are regarded as normal or conventional', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'major', definition: 'Important or serious or significant', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mandatory', definition: 'Required by law or rules or compulsory', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'manifest', definition: 'Clear or obvious to the eye or mind', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'manual', definition: 'Of or done with the hands', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'marginal', definition: 'Of secondary or minor importance or not central', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'marine', definition: 'Of or relating to or found in the sea', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'marital', definition: 'Of or relating to marriage or the relations between husband and wife', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'masculine', definition: 'Having qualities or appearance traditionally associated with men', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'massive', definition: 'Large and heavy or solid', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'maternal', definition: 'Of or relating to a mother especially during pregnancy or shortly after', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mathematical', definition: 'Of or relating to mathematics', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mature', definition: 'Fully developed physically or full-grown', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'maximum', definition: 'As great or high or intense as possible or permitted', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mechanical', definition: 'Working or produced by machines or machinery', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'medical', definition: 'Of or relating to the science of medicine or to the treatment of illness', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'medieval', definition: 'Of or relating to the Middle Ages', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mental', definition: 'Of or relating to the mind', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mere', definition: 'Used to emphasize how small or insignificant someone or something is', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'metaphorical', definition: 'Characteristic of or relating to metaphor or figurative', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'methodical', definition: 'Done in a systematic way or orderly', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'metropolitan', definition: 'Of or relating to or denoting a metropolis or large city', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'microscopic', definition: 'So small as to be visible only with a microscope', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mild', definition: 'Not severe or harsh or strict or lenient', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'military', definition: 'Of or relating to or characteristic of soldiers or armed forces', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'minimal', definition: 'Of a minimum amount or quantity or degree or negligible', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'minimum', definition: 'Smallest or lowest', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'minor', definition: 'Lesser in importance or seriousness or significance', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mobile', definition: 'Able to move or be moved freely or easily', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'moderate', definition: 'Average in amount or intensity or degree', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'modern', definition: 'Of or relating to the present or recent times as opposed to the remote past', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'modest', definition: 'Unassuming or moderate in the estimation of one\'s abilities or achievements', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'molecular', definition: 'Of or relating to or consisting of molecules', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'monetary', definition: 'Of or relating to money or currency', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'moral', definition: 'Concerned with the principles of right and wrong behavior and the goodness', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'multiple', definition: 'Having or involving several parts or elements or components', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'municipal', definition: 'Of or relating to a city or town or its governing body', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mutual', definition: 'Experienced or done by each of two or more parties toward the other', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mysterious', definition: 'Difficult or impossible to understand or explain or strange', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'naive', definition: 'Showing a lack of experience or wisdom or judgment or innocence', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'narrow', definition: 'Of small width in relation to length', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'national', definition: 'Of or relating to or characteristic of a nation or common to a whole nation', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'native', definition: 'Associated with the country or area or circumstances of a person\'s birth', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'natural', definition: 'Existing in or caused by nature or not made or caused by humankind', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'naval', definition: 'Of or relating to a navy or navies', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'necessary', definition: 'Required to be done or achieved or present or needed or essential', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'negative', definition: 'Consisting in or characterized by the absence rather than the presence', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'negligible', definition: 'So small or unimportant as to be not worth considering or insignificant', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'neighboring', definition: 'Next to or very near another place or adjacent', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'nervous', definition: 'Easily agitated or apprehensive', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'neutral', definition: 'Not helping or supporting either side in a conflict or disagreement', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'noble', definition: 'Belonging to a hereditary class with high social or political status', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'nominal', definition: 'Existing in name only', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'normal', definition: 'Conforming to a standard or usual or typical or expected', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'notable', definition: 'Worthy of attention or notice or remarkable', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'noticeable', definition: 'Easily seen or noticed or clear or apparent', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'notorious', definition: 'Famous or well known typically for some bad quality or deed', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'novel', definition: 'New or unusual in an interesting way', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'nuclear', definition: 'Of or relating to the nucleus of an atom', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'numerical', definition: 'Of or relating to or expressed as a number or numbers', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'numerous', definition: 'Great in number or many', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'objective', definition: 'Not influenced by personal feelings or opinions in considering facts', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'obligatory', definition: 'Required by a legal or moral or other rule or compulsory', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'obscure', definition: 'Not discovered or known about or uncertain', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'obvious', definition: 'Easily perceived or understood or clear or self-evident or apparent', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'occasional', definition: 'Occurring or appearing or done infrequently and irregularly', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'occupational', definition: 'Of or relating to a job or profession', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'odd', definition: 'Different from what is usual or expected or strange', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'offensive', definition: 'Causing someone to feel deeply hurt or upset or insulted', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'official', definition: 'Relating to an authority or public body and its duties or actions', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ongoing', definition: 'Continuing or still in progress', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'operational', definition: 'In or ready for use', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'optimal', definition: 'Best or most favorable or optimum', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'optional', definition: 'Available to be chosen but not obligatory', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'oral', definition: 'By word of mouth or spoken rather than written', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ordinary', definition: 'With no special or distinctive features or normal', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'organic', definition: 'Of or relating to or derived from living matter', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'organizational', definition: 'Of or relating to an organization', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'original', definition: 'Present or existing from the beginning or first or earliest', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'orthodox', definition: 'Conforming to what is generally or traditionally accepted as right or true', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'outer', definition: 'Outside or external', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'outstanding', definition: 'Exceptionally good', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'overall', definition: 'Taking everything into account', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'overwhelming', definition: 'Very great in amount', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Adjectives - Part 5
const ADVANCED_ADJECTIVES_5: VocabularyWord[] = [
  { word: 'parallel', definition: 'Side by side and having the same distance continuously between them', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'partial', definition: 'Existing only in part or incomplete', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'particular', definition: 'Used to single out an individual member of a specified group or class', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'passive', definition: 'Accepting or allowing what happens or what others do without active response', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'paternal', definition: 'Of or appropriate to a father', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'peculiar', definition: 'Strange or odd or unusual', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pending', definition: 'Awaiting decision or settlement', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'perceived', definition: 'Interpreted or looked on in a particular way or regarded', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'peripheral', definition: 'Of or relating to or situated on the edge or periphery of something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'permanent', definition: 'Lasting or intended to last or remain unchanged indefinitely', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'perpetual', definition: 'Never ending or changing', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'persistent', definition: 'Continuing firmly or obstinately in a course of action in spite of difficulty', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'personal', definition: 'Of or concerning or affecting a particular person rather than anyone else', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'persuasive', definition: 'Good at persuading someone to do or believe something through reasoning', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pessimistic', definition: 'Tending to see the worst aspect of things or believe that the worst will happen', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'philosophical', definition: 'Of or relating to the study of the fundamental nature of knowledge', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'physical', definition: 'Of or relating to the body as opposed to the mind', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pivotal', definition: 'Of crucial importance in relation to the development or success of something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'plausible', definition: 'Seeming reasonable or probable', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'plural', definition: 'More than one in number', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'polar', definition: 'Of or relating to the North or South Pole', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'political', definition: 'Of or relating to the government or the public affairs of a country', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'popular', definition: 'Liked or admired or enjoyed by many people or by a particular person or group', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'portable', definition: 'Able to be easily carried or moved especially because of being a lighter version', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'positive', definition: 'Consisting in or characterized by the presence or possession of features', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'possible', definition: 'Able to be done or within the power or capacity of someone or something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'potential', definition: 'Having or showing the capacity to become or develop into something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'powerful', definition: 'Having great power or strength', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'practical', definition: 'Of or concerned with the actual doing or use of something rather than theory', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pragmatic', definition: 'Dealing with things sensibly and realistically in a way that is based on practical', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'precise', definition: 'Marked by exactness and accuracy of expression or detail', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'predictable', definition: 'Able to be predicted', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'predominant', definition: 'Present as the strongest or main element', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'preliminary', definition: 'Denoting an action or event preceding or done in preparation for something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'premature', definition: 'Occurring or done before the usual or proper time or too early', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'present', definition: 'Being or existing in a specified place', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'presidential', definition: 'Of or relating to a president or presidency', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prestigious', definition: 'Inspiring respect and admiration or having high status', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prevalent', definition: 'Widespread in a particular area at a particular time', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'previous', definition: 'Existing or occurring before in time or order', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'primary', definition: 'Of chief importance or principal', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prime', definition: 'Of first importance or main or chief', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'primitive', definition: 'Relating to or denoting a preliterate or nonindustrial society or culture', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'principal', definition: 'First in order of importance or main', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prior', definition: 'Existing or coming before in time or order or importance', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'private', definition: 'Belonging to or for the use of one particular person or group of people only', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'probable', definition: 'Likely to be the case or to happen', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'problematic', definition: 'Constituting or presenting a problem or difficulty', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'procedural', definition: 'Of or relating to an official or established procedure', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'productive', definition: 'Producing or able to produce large amounts of goods or crops or other commodities', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'professional', definition: 'Of or relating to or connected with a profession', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'profitable', definition: 'Yielding profit or financial gain', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'profound', definition: 'Very great or intense', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'progressive', definition: 'Happening or developing gradually or in stages or proceeding step by step', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prolonged', definition: 'Continuing for a long time or longer than usual or extended', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prominent', definition: 'Important or famous', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'promising', definition: 'Showing signs of future success or excellence', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'proper', definition: 'Truly what something is said or regarded to be or genuine', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'proportional', definition: 'Corresponding in size or amount to something else', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prospective', definition: 'Expected or expecting to be the specified thing in the future', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'prosperous', definition: 'Successful in material terms or flourishing financially', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'protective', definition: 'Capable of or intended to protect someone or something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'provincial', definition: 'Of or concerning a province of a country or empire', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'provisional', definition: 'Arranged or existing for the present possibly to be changed later', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'psychological', definition: 'Of or affecting or arising in the mind or related to the mental', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'public', definition: 'Of or concerning the people as a whole', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pure', definition: 'Not mixed or adulterated with any other substance or material', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'qualitative', definition: 'Relating to or measuring or measured by the quality of something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'quantitative', definition: 'Relating to or measuring or measured by the quantity of something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'questionable', definition: 'Doubtful as regards truth or quality', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'racial', definition: 'Of or relating to race', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'radical', definition: 'Relating to or affecting the fundamental nature of something or far-reaching', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'random', definition: 'Made or done or happening without method or conscious decision', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rapid', definition: 'Happening in a short time or at a fast pace', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rare', definition: 'Not occurring very often', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rational', definition: 'Based on or in accordance with reason or logic', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'raw', definition: 'In its natural state or not yet processed or purified', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'realistic', definition: 'Having or showing a sensible and practical idea of what can be achieved', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reasonable', definition: 'Having sound judgment or fair and sensible', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'recent', definition: 'Having happened or started only a short time ago', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reciprocal', definition: 'Given or felt or done in return', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'redundant', definition: 'Not or no longer needed or useful or superfluous', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'regional', definition: 'Of or relating to or characteristic of a region', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'regular', definition: 'Arranged in or constituting a constant or definite pattern', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'regulatory', definition: 'Serving or intended to regulate something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'relative', definition: 'Considered in relation or in proportion to something else', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'relevant', definition: 'Closely connected or appropriate to what is being done or considered', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reliable', definition: 'Consistently good in quality or performance or able to be trusted', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'religious', definition: 'Relating to or believing in a religion', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reluctant', definition: 'Unwilling and hesitant or disinclined', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'remarkable', definition: 'Worthy of attention or striking', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'remote', definition: 'Situated far from the main centers of population or distant', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch27(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_ADJECTIVES_4, ...ADVANCED_ADJECTIVES_5];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 27: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 27 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 27');
  console.log('Advanced Academic Adjectives - Parts 4 & 5');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch27(supabase);
  
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
