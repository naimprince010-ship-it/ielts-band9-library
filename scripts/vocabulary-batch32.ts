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

// Advanced Academic Nouns - Part 6
const ADVANCED_NOUNS_6: VocabularyWord[] = [
  { word: 'era', definition: 'A long and distinct period of history with a particular feature or characteristic', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'erosion', definition: 'The process of eroding or being eroded by wind or water or other natural agents', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'error', definition: 'A mistake', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'escape', definition: 'An act of breaking free from confinement or control', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'essay', definition: 'A short piece of writing on a particular subject', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'essence', definition: 'The intrinsic nature or indispensable quality of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'establishment', definition: 'The action of establishing something or being established', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'estate', definition: 'An extensive area of land in the country usually with a large house', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'estimate', definition: 'An approximate calculation or judgment of the value or number or quantity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'estimation', definition: 'A rough calculation of the value or number or quantity or extent of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ethic', definition: 'A set of moral principles especially ones relating to or affirming a specified group', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ethics', definition: 'Moral principles that govern a person\'s behavior or the conducting of an activity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'evaluation', definition: 'The making of a judgment about the amount or value or quality of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'event', definition: 'A thing that happens especially one of importance or significance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'evidence', definition: 'The available body of facts or information indicating whether a belief is true', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'evolution', definition: 'The gradual development of something especially from a simple to a more complex form', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'examination', definition: 'A detailed inspection or investigation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'example', definition: 'A thing characteristic of its kind or illustrating a general rule', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exception', definition: 'A person or thing that is excluded from a general statement or does not follow a rule', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'excess', definition: 'An amount of something that is more than necessary or permitted or desirable', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exchange', definition: 'An act of giving one thing and receiving another especially of the same type', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'excitement', definition: 'A feeling of great enthusiasm and eagerness', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exclusion', definition: 'The process or state of excluding or being excluded', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'execution', definition: 'The carrying out or putting into effect of a plan or order or course of action', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'executive', definition: 'A person with senior managerial responsibility in a business organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exemption', definition: 'The process of freeing or state of being free from an obligation or liability', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exercise', definition: 'Activity requiring physical effort carried out especially to sustain or improve health', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exhibition', definition: 'A public display of works of art or other items of interest held in an art gallery', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exile', definition: 'The state of being barred from one\'s native country typically for political reasons', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'existence', definition: 'The fact or state of living or having objective reality', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exit', definition: 'A way out especially of a public building or room or passenger vehicle', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'expansion', definition: 'The action of becoming larger or more extensive', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'expectation', definition: 'A strong belief that something will happen or be the case in the future', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'expedition', definition: 'A journey or voyage undertaken by a group of people with a particular purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'expenditure', definition: 'The action of spending funds', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'expense', definition: 'The cost required for something or the money spent on something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'experience', definition: 'Practical contact with and observation of facts or events', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'experiment', definition: 'A scientific procedure undertaken to make a discovery or test a hypothesis', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'expert', definition: 'A person who has a comprehensive and authoritative knowledge of or skill in a particular area', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'expertise', definition: 'Expert skill or knowledge in a particular field', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'expiration', definition: 'The ending of the fixed period for which a contract is valid', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'explanation', definition: 'A statement or account that makes something clear', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exploitation', definition: 'The action or fact of treating someone unfairly in order to benefit from their work', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exploration', definition: 'The action of traveling in or through an unfamiliar area in order to learn about it', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'explosion', definition: 'A violent and destructive shattering or blowing apart of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'export', definition: 'A commodity or service or article sold abroad', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exposure', definition: 'The state of being exposed to contact with something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'expression', definition: 'The process of making known one\'s thoughts or feelings', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'extension', definition: 'A part that is added to something to enlarge or prolong it or a continuation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'extent', definition: 'The area covered by something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'extinction', definition: 'The state or process of a species or other group of organisms ceasing to exist', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'extract', definition: 'A short passage taken from a text or film or piece of music', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'extraction', definition: 'The action of taking out something especially using effort or force', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'extreme', definition: 'Either of two abstract things that are as different from each other as possible', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fabric', definition: 'Cloth or other material produced by weaving or knitting textile fibers', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'face', definition: 'The front part of a person\'s head from the forehead to the chin', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'facility', definition: 'A place or amenity or piece of equipment provided for a particular purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fact', definition: 'A thing that is indisputably the case', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'faction', definition: 'A small organized dissenting group within a larger one especially in politics', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'factor', definition: 'A circumstance or fact or influence that contributes to a result or outcome', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'factory', definition: 'A building or group of buildings where goods are manufactured or assembled', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'faculty', definition: 'An inherent mental or physical power', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'failure', definition: 'Lack of success', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'faith', definition: 'Complete trust or confidence in someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fall', definition: 'An act of falling or collapsing or a sudden uncontrollable descent', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fame', definition: 'The condition of being known or talked about by many people', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'family', definition: 'A group consisting of parents and children living together in a household', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'famine', definition: 'Extreme scarcity of food', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fantasy', definition: 'The faculty or activity of imagining things especially things that are impossible', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fare', definition: 'The money a passenger on public transportation has to pay', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'farm', definition: 'An area of land and its buildings used for growing crops and rearing animals', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'farmer', definition: 'A person who owns or manages a farm', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fascination', definition: 'The power to fascinate someone or the state of being fascinated', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fashion', definition: 'A popular trend especially in styles of dress and ornament or manners of behavior', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fate', definition: 'The development of events beyond a person\'s control regarded as determined by a supernatural power', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fatigue', definition: 'Extreme tiredness typically resulting from mental or physical exertion or illness', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fault', definition: 'An unattractive or unsatisfactory feature especially in a piece of work or in a person', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'favor', definition: 'An attitude of approval or liking', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fear', definition: 'An unpleasant emotion caused by the belief that someone or something is dangerous', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'feasibility', definition: 'The state or degree of being easily or conveniently done', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'feature', definition: 'A distinctive attribute or aspect of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'federation', definition: 'A group of states with a central government but independence in internal affairs', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fee', definition: 'A payment made to a professional person or to a professional or public body', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'feedback', definition: 'Information about reactions to a product or a person\'s performance of a task', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'feeling', definition: 'An emotional state or reaction', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fellow', definition: 'A man or boy', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fellowship', definition: 'The condition of sharing similar interests or experiences or activities', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fence', definition: 'A barrier or railing or other upright structure typically of wood or wire', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'festival', definition: 'A day or period of celebration typically a religious commemoration', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fever', definition: 'An abnormally high body temperature usually accompanied by shivering or headache', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fiber', definition: 'A thread or filament from which a vegetable tissue or mineral substance or textile is formed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fiction', definition: 'Literature in the form of prose especially short stories and novels that describes imaginary events', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'field', definition: 'An area of open land especially one planted with crops or pasture', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'figure', definition: 'A number especially one that forms part of official statistics or relates to the financial performance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'file', definition: 'A folder or box for holding loose papers that are typically arranged in a particular order', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Nouns - Part 7
const ADVANCED_NOUNS_7: VocabularyWord[] = [
  { word: 'film', definition: 'A story or event recorded by a camera as a set of moving images and shown in a theater', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'filter', definition: 'A porous device for removing impurities or solid particles from a liquid or gas', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'finance', definition: 'The management of large amounts of money especially by governments or large companies', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'finding', definition: 'A conclusion reached as a result of an inquiry or investigation or trial', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fire', definition: 'Combustion or burning in which substances combine chemically with oxygen from the air', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'firm', definition: 'A business concern especially one involving a partnership of two or more people', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fitness', definition: 'The condition of being physically fit and healthy', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'flag', definition: 'A piece of cloth or similar material typically oblong or square attachable by one edge', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'flame', definition: 'A hot glowing body of ignited gas that is generated by something on fire', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'flavor', definition: 'The distinctive quality of a particular food or drink as perceived by the taste buds', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'flaw', definition: 'A mark or blemish or other imperfection that mars a substance or object', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'flesh', definition: 'The soft substance consisting of muscle and fat that is found between the skin and bones', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'flexibility', definition: 'The quality of bending easily without breaking', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'flight', definition: 'The action or process of flying through the air', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'flood', definition: 'An overflowing of a large amount of water beyond its normal confines', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'floor', definition: 'The lower surface of a room on which one may walk', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'flow', definition: 'The action or fact of moving along in a steady continuous stream', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fluctuation', definition: 'An irregular rising and falling in number or amount or a variation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fluid', definition: 'A substance that has no fixed shape and yields easily to external pressure or a gas or liquid', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'focus', definition: 'The center of interest or activity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'folk', definition: 'People in general', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'follower', definition: 'An adherent or devotee of a particular person or cause or activity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'food', definition: 'Any nutritious substance that people or animals eat or drink or that plants absorb', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fool', definition: 'A person who acts unwisely or imprudently or a silly person', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'foot', definition: 'The lower extremity of the leg below the ankle on which a person stands or walks', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'football', definition: 'A form of team game played in North America with an oval ball on a field marked out as a gridiron', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'footprint', definition: 'The impression left by a foot or shoe on the ground or a surface', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'force', definition: 'Strength or energy as an attribute of physical action or movement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'forecast', definition: 'A prediction or estimate of future events especially coming weather or a financial trend', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'foreground', definition: 'The part of a view that is nearest to the observer especially in a picture or photograph', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'forest', definition: 'A large area covered chiefly with trees and undergrowth', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'forgiveness', definition: 'The action or process of forgiving or being forgiven', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'form', definition: 'The visible shape or configuration of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'format', definition: 'The way in which something is arranged or set out', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'formation', definition: 'The action of forming or process of being formed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'formula', definition: 'A mathematical relationship or rule expressed in symbols', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'formulation', definition: 'The action of creating or preparing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fort', definition: 'A fortified building or strategic position', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fortune', definition: 'Chance or luck as an external or arbitrary force affecting human affairs', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'forum', definition: 'A place or meeting or medium where ideas and views on a particular issue can be exchanged', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fossil', definition: 'The remains or impression of a prehistoric organism preserved in petrified form', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'foundation', definition: 'The lowest load-bearing part of a building typically below ground level', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'founder', definition: 'A person who establishes an institution or settlement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fraction', definition: 'A numerical quantity that is not a whole number', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fragment', definition: 'A small part broken or separated off something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'frame', definition: 'A rigid structure that surrounds or encloses something such as a door or window', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'framework', definition: 'A basic structure underlying a system or concept or text', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'franchise', definition: 'An authorization granted by a government or company to an individual or group', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fraud', definition: 'Wrongful or criminal deception intended to result in financial or personal gain', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'freedom', definition: 'The state of being free or at liberty rather than in confinement or under physical restraint', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'freight', definition: 'Goods transported in bulk by truck or train or ship or aircraft', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'frequency', definition: 'The rate at which something occurs or is repeated over a particular period of time', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'friction', definition: 'The resistance that one surface or object encounters when moving over another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'friend', definition: 'A person whom one knows and with whom one has a bond of mutual affection', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'friendship', definition: 'The emotions or conduct of friends or the state of being friends', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'frontier', definition: 'A line or border separating two countries', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'frustration', definition: 'The feeling of being upset or annoyed especially because of inability to change or achieve', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fuel', definition: 'Material such as coal or gas or oil that is burned to produce heat or power', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fulfillment', definition: 'Satisfaction or happiness as a result of fully developing one\'s abilities or character', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'function', definition: 'An activity or purpose natural to or intended for a person or thing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fund', definition: 'A sum of money saved or made available for a particular purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fundamental', definition: 'A central or primary rule or principle on which something is based', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'funding', definition: 'Money provided especially by an organization or government for a particular purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'funeral', definition: 'A ceremony or service held shortly after a person\'s death usually including the burial', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'furniture', definition: 'Large movable equipment such as tables and chairs used to make a house or building suitable', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fury', definition: 'Wild or violent anger', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fusion', definition: 'The process or result of joining two or more things together to form a single entity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'future', definition: 'The time or a period of time following the moment of speaking or writing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gain', definition: 'An increase in wealth or resources', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gallery', definition: 'A room or building for the display or sale of works of art', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'game', definition: 'A form of play or sport especially a competitive one played according to rules', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gang', definition: 'An organized group of criminals', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gap', definition: 'A break or hole in an object or between two objects', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'garbage', definition: 'Wasted or spoiled food and other refuse as from a kitchen or household', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'garden', definition: 'A piece of ground often near a house used for growing flowers or fruit or vegetables', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gas', definition: 'An airlike fluid substance which expands freely to fill any space available', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gate', definition: 'A hinged barrier used to close an opening in a wall or fence or hedge', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gathering', definition: 'An assembly or meeting especially a social or festive one or one held for a specific purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gaze', definition: 'A steady intent look', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gear', definition: 'A toothed wheel that works with others to alter the relation between the speed of a driving mechanism', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gender', definition: 'Either of the two sexes male and female especially when considered with reference to social', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gene', definition: 'A unit of heredity that is transferred from a parent to offspring and is held to determine', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'generalization', definition: 'A general statement or concept obtained by inference from specific cases', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'generation', definition: 'All of the people born and living at about the same time regarded collectively', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'generosity', definition: 'The quality of being kind and generous', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'genius', definition: 'Exceptional intellectual or creative power or other natural ability', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'genre', definition: 'A category of artistic composition as in music or literature characterized by similarities', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gentleman', definition: 'A chivalrous or courteous or honorable man', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'geography', definition: 'The study of the physical features of the earth and its atmosphere and of human activity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gesture', definition: 'A movement of part of the body especially a hand or the head to express an idea or meaning', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gift', definition: 'A thing given willingly to someone without payment or a present', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch32(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_NOUNS_6, ...ADVANCED_NOUNS_7];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 32: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 32 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 32');
  console.log('Advanced Academic Nouns - Parts 6 & 7');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch32(supabase);
  
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
