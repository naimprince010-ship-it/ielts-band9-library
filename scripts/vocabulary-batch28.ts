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

// Advanced Academic Adjectives - Part 6
const ADVANCED_ADJECTIVES_6: VocabularyWord[] = [
  { word: 'renowned', definition: 'Known or talked about by many people or famous', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'repetitive', definition: 'Containing or characterized by repetition especially when unnecessary', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'representative', definition: 'Typical of a class or group or category', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reproductive', definition: 'Of or relating to reproduction', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'residential', definition: 'Designed for people to live in', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'resistant', definition: 'Offering resistance to something or someone', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'respective', definition: 'Belonging or relating separately to each of two or more people or things', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'responsible', definition: 'Having an obligation to do something or having control over or care for someone', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'responsive', definition: 'Reacting quickly and positively', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'restricted', definition: 'Limited in extent or number or scope or action', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'retail', definition: 'The sale of goods to the public in relatively small quantities for use', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'revolutionary', definition: 'Involving or causing a complete or dramatic change', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rigid', definition: 'Unable to bend or be forced out of shape or not flexible', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'risky', definition: 'Full of the possibility of danger or failure or loss', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'robust', definition: 'Strong and healthy or vigorous', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rough', definition: 'Having an uneven or irregular surface or not smooth or level', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'routine', definition: 'Performed as part of a regular procedure rather than for a special reason', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'royal', definition: 'Having the status of a king or queen or a member of their family', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rural', definition: 'In or relating to or characteristic of the countryside rather than the town', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sacred', definition: 'Connected with God or a god or dedicated to a religious purpose', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'safe', definition: 'Protected from or not exposed to danger or risk or not likely to be harmed', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'satisfactory', definition: 'Fulfilling expectations or needs or acceptable though not outstanding', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'scarce', definition: 'Insufficient for the demand', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'scattered', definition: 'Occurring or found at intervals or various locations rather than all together', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'scenic', definition: 'Providing or relating to views of impressive or beautiful natural scenery', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'scholarly', definition: 'Involving or relating to serious academic study', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'scientific', definition: 'Based on or characterized by the methods and principles of science', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'seasonal', definition: 'Of or relating to or characteristic of a particular season of the year', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'secondary', definition: 'Coming after or less important than or resulting from something original', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'secular', definition: 'Denoting attitudes or activities that have no religious or spiritual basis', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'selective', definition: 'Relating to or involving the selection of the most suitable or best qualified', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'semantic', definition: 'Relating to meaning in language or logic', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'senior', definition: 'Of or for older or more experienced people', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sensible', definition: 'Done or chosen in accordance with wisdom or prudence or likely to be of benefit', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sensitive', definition: 'Quick to detect or respond to slight changes or signals or influences', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sequential', definition: 'Forming or following in a logical order or sequence', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'serious', definition: 'Demanding careful consideration or application', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'severe', definition: 'Very great or intense', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'shallow', definition: 'Of little depth', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sharp', definition: 'Having an edge or point that is able to cut or pierce something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sheer', definition: 'Nothing other than or unmitigated', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'short-term', definition: 'Occurring over or relating to a short period of time', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'significant', definition: 'Sufficiently great or important to be worthy of attention or noteworthy', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'similar', definition: 'Resembling without being identical', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'simple', definition: 'Easily understood or done or presenting no difficulty', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'simultaneous', definition: 'Occurring or operating or done at the same time', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'singular', definition: 'Exceptionally good or great or remarkable', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'skeptical', definition: 'Not easily convinced or having doubts or reservations', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'slight', definition: 'Small in degree or inconsiderable', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'smooth', definition: 'Having an even and regular surface or consistency or free from perceptible projections', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'so-called', definition: 'Used to show that something or someone is commonly designated by the name', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'social', definition: 'Of or relating to society or its organization', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'socialist', definition: 'Adhering to or based on the principles of socialism', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sociological', definition: 'Of or relating to sociology', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'solar', definition: 'Of or relating to or determined by the sun', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sole', definition: 'One and only', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'solid', definition: 'Firm and stable in shape or not liquid or fluid', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'solitary', definition: 'Done or existing alone', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sophisticated', definition: 'Having or revealing a great deal of worldly experience and knowledge', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sovereign', definition: 'Possessing supreme or ultimate power', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'spatial', definition: 'Of or relating to space', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'special', definition: 'Better or greater or otherwise different from what is usual', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'specific', definition: 'Clearly defined or identified', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'spectacular', definition: 'Beautiful in a dramatic and eye-catching way', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'speculative', definition: 'Engaged in or based on conjecture rather than knowledge', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'spiritual', definition: 'Of or relating to or affecting the human spirit or soul as opposed to material', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'spontaneous', definition: 'Performed or occurring as a result of a sudden inner impulse or inclination', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stable', definition: 'Not likely to change or fail or firmly established', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'standard', definition: 'Used or accepted as normal or average', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stark', definition: 'Severe or bare in appearance or outline', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'static', definition: 'Lacking in movement or action or change', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'statistical', definition: 'Of or relating to the use of statistics', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'steady', definition: 'Firmly fixed or supported or balanced or not shaking or moving', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'steep', definition: 'Rising or falling sharply or almost perpendicular', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stern', definition: 'Serious and unrelenting especially in the assertion of authority', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stiff', definition: 'Not easily bent or changed in shape or rigid', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'straightforward', definition: 'Uncomplicated and easy to do or understand', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'strange', definition: 'Unusual or surprising in a way that is unsettling or hard to understand', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'strategic', definition: 'Relating to the identification of long-term or overall aims and interests', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'strict', definition: 'Demanding that rules concerning behavior are obeyed and observed', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'striking', definition: 'Attracting attention by reason of being unusual or extreme or prominent', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'strong', definition: 'Having the power to move heavy weights or perform other physically demanding tasks', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'structural', definition: 'Of or relating to or forming part of the structure of a building or other item', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'subjective', definition: 'Based on or influenced by personal feelings or tastes or opinions', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'subordinate', definition: 'Lower in rank or position', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'subsequent', definition: 'Coming after something in time or following', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'substantial', definition: 'Of considerable importance or size or worth', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'subtle', definition: 'So delicate or precise as to be difficult to analyze or describe', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'successive', definition: 'Following one another or following others', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sudden', definition: 'Occurring or done quickly and unexpectedly or without warning', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sufficient', definition: 'Enough or adequate', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Adjectives - Part 7
const ADVANCED_ADJECTIVES_7: VocabularyWord[] = [
  { word: 'suitable', definition: 'Right or appropriate for a particular person or purpose or situation', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'superficial', definition: 'Existing or occurring at or on the surface', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'superior', definition: 'Higher in rank or status or quality', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'supplementary', definition: 'Completing or enhancing something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'supreme', definition: 'Highest in rank or authority', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'surgical', definition: 'Of or relating to or used in surgery', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'surplus', definition: 'More than what is needed or used or excess', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'surprising', definition: 'Causing surprise or unexpected', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'surrounding', definition: 'All around a particular place or thing', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sustainable', definition: 'Able to be maintained at a certain rate or level', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'symbolic', definition: 'Serving as a symbol', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sympathetic', definition: 'Feeling or showing or expressing sympathy', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'synthetic', definition: 'Made by chemical synthesis especially to imitate a natural product', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'systematic', definition: 'Done or acting according to a fixed plan or system or methodical', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tactical', definition: 'Of or relating to or constituting actions carefully planned to gain a specific end', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tangible', definition: 'Perceptible by touch', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'technical', definition: 'Of or relating to a particular subject or art or craft or its techniques', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'technological', definition: 'Of or relating to or using technology', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'temporary', definition: 'Lasting for only a limited period of time or not permanent', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tense', definition: 'Stretched tight or rigid', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tentative', definition: 'Not certain or fixed or provisional', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'terminal', definition: 'Of or forming or situated at an end or extremity or boundary', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'territorial', definition: 'Of or relating to the ownership of an area of land or sea', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tertiary', definition: 'Third in order or level', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'textual', definition: 'Of or relating to a text or texts', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'thematic', definition: 'Of or relating to or based on subjects or themes', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'theoretical', definition: 'Concerned with or involving the theory of a subject or area of study', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'therapeutic', definition: 'Of or relating to the healing of disease', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'thermal', definition: 'Of or relating to heat', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'thorough', definition: 'Complete with regard to every detail or not superficial or partial', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'thoughtful', definition: 'Absorbed in or involving thought', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tight', definition: 'Fixed or fastened or closed firmly or hard to move or undo or open', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'timely', definition: 'Done or occurring at a favorable or useful time or opportune', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tiny', definition: 'Very small', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tolerant', definition: 'Showing willingness to allow the existence of opinions or behavior that one does not agree with', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'top', definition: 'Highest in position or rank or degree', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'total', definition: 'Comprising the whole number or amount', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tough', definition: 'Strong enough to withstand adverse conditions or rough or careless handling', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'toxic', definition: 'Poisonous', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'traditional', definition: 'Existing in or as part of a tradition or long-established', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tragic', definition: 'Causing or characterized by extreme distress or sorrow', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'transitional', definition: 'Of or relating to or characteristic of a process or period of transition', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'transparent', definition: 'Allowing light to pass through so that objects behind can be distinctly seen', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tremendous', definition: 'Very great in amount or scale or intensity', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tribal', definition: 'Of or characteristic of a tribe or tribes', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tropical', definition: 'Of or typical of or peculiar to the tropics', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'true', definition: 'In accordance with fact or reality', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'typical', definition: 'Having the distinctive qualities of a particular type of person or thing', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ultimate', definition: 'Being or happening at the end of a process or final', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unanimous', definition: 'Of two or more people fully in agreement', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'uncertain', definition: 'Not able to be relied on or not known or definite', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unconventional', definition: 'Not based on or conforming to what is generally done or believed', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'underlying', definition: 'Significant as a cause or basis of something but not necessarily manifest', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'undue', definition: 'Unwarranted or inappropriate because excessive or disproportionate', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unexpected', definition: 'Not expected or regarded as likely to happen', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unfamiliar', definition: 'Not known or recognized', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'uniform', definition: 'Not changing in form or character or remaining the same in all cases', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unique', definition: 'Being the only one of its kind or unlike anything else', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'universal', definition: 'Of or affecting or done by all people or things in the world or in a particular group', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unknown', definition: 'Not known or familiar', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unlikely', definition: 'Not likely to happen or be done or be true or improbable', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unnecessary', definition: 'Not needed', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unprecedented', definition: 'Never done or known before', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unpredictable', definition: 'Not able to be predicted', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unrealistic', definition: 'Not realistic', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unstable', definition: 'Prone to change or fail or likely to give way or not stable', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unusual', definition: 'Not habitually or commonly occurring or done', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'upper', definition: 'Situated above another part', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'urban', definition: 'In or relating to or characteristic of a city or town', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'urgent', definition: 'Requiring immediate action or attention', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'useful', definition: 'Able to be used for a practical purpose or in several ways', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'usual', definition: 'Habitually or typically occurring or done or customary', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'utmost', definition: 'Most extreme or greatest', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'utter', definition: 'Complete or absolute', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'vague', definition: 'Of uncertain or ill-defined or unclear character or meaning', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'valid', definition: 'Having a sound basis in logic or fact or reasonable or cogent', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'valuable', definition: 'Worth a great deal of money', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'variable', definition: 'Not consistent or having a fixed pattern or liable to change', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'varied', definition: 'Incorporating a number of different types or elements or showing variation', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'various', definition: 'Different from one another or of different kinds or sorts', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'vast', definition: 'Of very great extent or quantity or immense', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'verbal', definition: 'Relating to or in the form of words', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'vertical', definition: 'At right angles to a horizontal plane or in a direction or having an alignment', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'viable', definition: 'Capable of working successfully or feasible', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'vigorous', definition: 'Strong or healthy or full of energy', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'violent', definition: 'Using or involving physical force intended to hurt or damage or kill someone', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'virtual', definition: 'Almost or nearly as described but not completely or according to strict definition', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'visible', definition: 'Able to be seen', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'visual', definition: 'Of or relating to seeing or sight', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'vital', definition: 'Absolutely necessary or essential or indispensable', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'vivid', definition: 'Producing powerful feelings or strong or clear images in the mind', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'vocal', definition: 'Of or relating to the human voice', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch28(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_ADJECTIVES_6, ...ADVANCED_ADJECTIVES_7];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 28: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 28 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 28');
  console.log('Advanced Academic Adjectives - Parts 6 & 7');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch28(supabase);
  
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
