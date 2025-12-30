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

// Advanced Academic Verbs - Part 8
const ADVANCED_VERBS_8: VocabularyWord[] = [
  { word: 'exacerbate', definition: 'To make a problem or bad situation worse', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exaggerate', definition: 'To represent something as being larger or better than it really is', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'examine', definition: 'To inspect someone or something in detail to determine their nature', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exceed', definition: 'To be greater in number or size than a quantity or number', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'excel', definition: 'To be exceptionally good at or proficient in an activity', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exchange', definition: 'To give something and receive something of the same kind in return', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'excite', definition: 'To cause strong feelings of enthusiasm and eagerness in someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exclude', definition: 'To deny someone access to or bar someone from a place or group', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'excuse', definition: 'To attempt to lessen the blame attaching to a fault or offense', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'execute', definition: 'To carry out or put into effect a plan or course of action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exemplify', definition: 'To be a typical example of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exempt', definition: 'To free from an obligation or liability imposed on others', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exercise', definition: 'To use or apply a faculty or right or process', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exert', definition: 'To apply or bring to bear a force or influence', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exhaust', definition: 'To drain someone of their physical or mental resources', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exhibit', definition: 'To publicly display a work of art or item of interest', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exhilarate', definition: 'To make someone feel very happy and animated', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exile', definition: 'To expel and bar someone from their native country', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exist', definition: 'To have objective reality or being', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'expand', definition: 'To become or make larger or more extensive', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'expect', definition: 'To regard something as likely to happen', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'expedite', definition: 'To make an action or process happen sooner or be accomplished faster', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'expel', definition: 'To deprive someone of membership of or involvement in a school', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'expend', definition: 'To spend or use up a resource such as money or energy', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'experience', definition: 'To encounter or undergo an event or occurrence', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'experiment', definition: 'To perform a scientific procedure to make a discovery', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'expire', definition: 'To come to the end of the period of validity', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'explain', definition: 'To make an idea or situation clear to someone by describing it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'explode', definition: 'To burst or shatter violently and noisily as a result of pressure', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exploit', definition: 'To make full use of and derive benefit from a resource', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'explore', definition: 'To travel in or through an unfamiliar country or area', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'export', definition: 'To send goods or services to another country for sale', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'expose', definition: 'To make something visible by uncovering it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'express', definition: 'To convey a thought or feeling in words or by gestures', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'extend', definition: 'To cause to cover a larger area or make longer', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exterminate', definition: 'To destroy completely', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'extract', definition: 'To remove or take out especially by effort or force', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'extrapolate', definition: 'To extend the application of a method to an unknown situation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fabricate', definition: 'To invent or concoct something typically with deceitful intent', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'face', definition: 'To be positioned with the face or front toward something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'facilitate', definition: 'To make an action or process easy or easier', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'factor', definition: 'To include or exclude as a relevant element when making a decision', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fade', definition: 'To gradually grow faint and disappear', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fail', definition: 'To be unsuccessful in achieving one\'s goal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'faint', definition: 'To lose consciousness for a short time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fall', definition: 'To move downward typically rapidly and freely without control', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'falsify', definition: 'To alter information or evidence so as to mislead', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'familiarize', definition: 'To give someone knowledge or understanding of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fancy', definition: 'To feel a desire or liking for', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fascinate', definition: 'To draw irresistibly the attention and interest of someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fashion', definition: 'To make into a particular or the required form', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fasten', definition: 'To close or join securely', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fatigue', definition: 'To cause someone to feel tired or exhausted', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'favor', definition: 'To feel or show approval or preference for', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fear', definition: 'To be afraid of someone or something as likely to be dangerous', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'feature', definition: 'To have as a prominent attribute or aspect', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'feed', definition: 'To give food to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'feel', definition: 'To be aware of a person or object through touching', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'feign', definition: 'To pretend to be affected by a feeling or state', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fetch', definition: 'To go for and then bring back someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fight', definition: 'To take part in a violent struggle involving physical force', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'figure', definition: 'To think or consider or expect to be the case', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'file', definition: 'To place a document in a cabinet or folder in a particular order', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fill', definition: 'To cause a space or container to become full', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'filter', definition: 'To pass a liquid or gas through a device to remove unwanted material', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'finalize', definition: 'To complete or agree on a finished and definitive version of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'finance', definition: 'To provide funding for a person or enterprise', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'find', definition: 'To discover or perceive by chance or unexpectedly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fine', definition: 'To punish someone by making them pay a sum of money', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'finish', definition: 'To bring a task or activity to an end or complete', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fire', definition: 'To discharge a gun or other weapon', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fit', definition: 'To be of the right shape and size for', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fix', definition: 'To fasten something securely in a particular place or position', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'flag', definition: 'To mark an item for attention or treatment in a specified way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'flatter', definition: 'To lavish insincere praise and compliments upon', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'flee', definition: 'To run away from a place or situation of danger', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'float', definition: 'To rest or move on or near the surface of a liquid', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'flood', definition: 'To cover or submerge an area with water', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'flourish', definition: 'To grow or develop in a healthy or vigorous way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'flow', definition: 'To move along or out steadily and continuously in a current', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fluctuate', definition: 'To rise and fall irregularly in number or amount', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'flush', definition: 'To cleanse something by causing large quantities of water to pass through', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fly', definition: 'To move through the air using wings', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'focus', definition: 'To adapt to the prevailing level of light and become able to see clearly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fold', definition: 'To bend something over on itself so that one part of it covers another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'follow', definition: 'To go or come after a person or thing proceeding ahead', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'forbid', definition: 'To refuse to allow something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'force', definition: 'To make someone do something against their will', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'forecast', definition: 'To predict or estimate a future event or trend', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'foresee', definition: 'To be aware of beforehand or predict', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'forge', definition: 'To make or shape a metal object by heating it in a fire', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'forget', definition: 'To fail to remember', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'forgive', definition: 'To stop feeling angry or resentful toward someone for an offense', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'form', definition: 'To bring together parts or combine to create something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'formalize', definition: 'To give something legal or formal status', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'format', definition: 'To arrange or put into a format', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Verbs - Part 9
const ADVANCED_VERBS_9: VocabularyWord[] = [
  { word: 'formulate', definition: 'To create or devise methodically a strategy or proposal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'forsake', definition: 'To abandon or renounce a person or thing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fortify', definition: 'To strengthen a place with defensive works', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'foster', definition: 'To encourage or promote the development of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'found', definition: 'To establish or originate an institution or organization', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fracture', definition: 'To break or cause to break', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fragment', definition: 'To break or cause to break into fragments', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'frame', definition: 'To place a picture or photograph in a frame', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'free', definition: 'To release from captivity or confinement or slavery', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'freeze', definition: 'To turn or be turned into ice or another solid as a result of cold', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'frequent', definition: 'To visit a place often or habitually', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'frighten', definition: 'To make someone afraid or anxious', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'frustrate', definition: 'To prevent a plan or attempted action from progressing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fuel', definition: 'To supply or power an industrial plant or vehicle with fuel', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fulfill', definition: 'To bring to completion or reality or achieve or realize', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'function', definition: 'To work or operate in a proper or particular way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fund', definition: 'To provide with money for a particular purpose', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'furnish', definition: 'To provide a house or room with furniture and fittings', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fuse', definition: 'To join or blend to form a single entity', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gain', definition: 'To obtain or secure something desired or favorable', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gamble', definition: 'To play games of chance for money or bet on an uncertain outcome', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gather', definition: 'To come together or assemble or accumulate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gauge', definition: 'To estimate or determine the magnitude or amount of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gaze', definition: 'To look steadily and intently especially in admiration', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'generalize', definition: 'To make a general or broad statement by inferring from specific cases', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'generate', definition: 'To cause something especially an emotion or situation to arise', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gesture', definition: 'To make a gesture', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'give', definition: 'To freely transfer the possession of something to someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'glance', definition: 'To take a brief or hurried look', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'glare', definition: 'To stare in an angry or fierce way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'glimpse', definition: 'To see or perceive briefly or partially', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'glorify', definition: 'To describe or represent as admirable especially unjustifiably', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'glow', definition: 'To give out steady light without flame', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'govern', definition: 'To conduct the policy and affairs of a state or organization', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grab', definition: 'To grasp or seize suddenly and roughly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grace', definition: 'To do honor or credit to someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grade', definition: 'To arrange in or allocate to grades or classify or sort', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'graduate', definition: 'To successfully complete an academic degree or course', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grant', definition: 'To agree to give or allow something requested to someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grasp', definition: 'To seize and hold firmly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'greet', definition: 'To give a polite word or sign of welcome or recognition', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grieve', definition: 'To suffer grief', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grind', definition: 'To reduce something to small particles or powder by crushing it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grip', definition: 'To take and keep a firm hold of or grasp tightly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'groom', definition: 'To brush and clean the coat of a horse or dog', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ground', definition: 'To prohibit or prevent a pilot or an aircraft from flying', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'group', definition: 'To put together or place in a group or groups', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grow', definition: 'To undergo natural development by increasing in size and changing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'guarantee', definition: 'To provide a formal assurance or promise', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'guard', definition: 'To watch over in order to protect or control', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'guess', definition: 'To estimate or suppose something without sufficient information', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'guide', definition: 'To show or indicate the way to someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'halt', definition: 'To bring or come to an abrupt stop', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hamper', definition: 'To hinder or impede the movement or progress of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hand', definition: 'To pick something up and give it to someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'handle', definition: 'To feel or manipulate with the hands', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hang', definition: 'To suspend or be suspended from above with the lower part dangling', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'happen', definition: 'To take place or occur', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'harass', definition: 'To subject someone to aggressive pressure or intimidation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'harbor', definition: 'To keep a thought or feeling typically a negative one in one\'s mind', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'harden', definition: 'To make or become hard or harder', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'harm', definition: 'To physically injure', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'harmonize', definition: 'To add notes to a melody to produce harmony', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'harness', definition: 'To control and make use of natural resources', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'harvest', definition: 'To gather a crop as a harvest', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hasten', definition: 'To be quick to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hate', definition: 'To feel intense or passionate dislike for someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'haul', definition: 'To pull or drag with effort or force', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'haunt', definition: 'To manifest itself at a place regularly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'head', definition: 'To be in the leading position on', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'heal', definition: 'To cause a wound or injury to become sound or healthy again', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'heap', definition: 'To put objects or a loose substance in a heap', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hear', definition: 'To perceive with the ear the sound made by someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'heat', definition: 'To make or become hot or warm', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'heighten', definition: 'To make or become more intense', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'help', definition: 'To make it easier for someone to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'herald', definition: 'To be a sign that something is about to happen', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hesitate', definition: 'To pause before saying or doing something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hide', definition: 'To put or keep out of sight or conceal from the view of others', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'highlight', definition: 'To pick out and emphasize', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hijack', definition: 'To illegally seize an aircraft or ship while in transit', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hinder', definition: 'To create difficulties for someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hint', definition: 'To suggest or indicate something indirectly or covertly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hire', definition: 'To employ someone for wages', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hit', definition: 'To bring one\'s hand or a tool into contact with someone quickly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hoard', definition: 'To accumulate money or valued objects and hide or store away', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hold', definition: 'To grasp or carry or support with one\'s arms or hands', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'honor', definition: 'To regard with great respect', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hook', definition: 'To attach or fasten with a hook or hooks', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hope', definition: 'To want something to happen or be the case', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'horrify', definition: 'To fill with horror or shock', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'host', definition: 'To act as host at an event or for a television program', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'house', definition: 'To provide space for or accommodate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hover', definition: 'To remain in one place in the air', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hug', definition: 'To squeeze someone tightly in one\'s arms', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch19(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_VERBS_8, ...ADVANCED_VERBS_9];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 19: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 19 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 19');
  console.log('Advanced Academic Verbs - Parts 8 & 9');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch19(supabase);
  
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
