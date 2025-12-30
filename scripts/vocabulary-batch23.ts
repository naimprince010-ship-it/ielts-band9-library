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

// Advanced Academic Verbs - Part 16
const ADVANCED_VERBS_16: VocabularyWord[] = [
  { word: 'rescue', definition: 'To save someone from a dangerous or distressing situation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'research', definition: 'To investigate systematically', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'resemble', definition: 'To have qualities or features especially those of appearance in common', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'resent', definition: 'To feel bitterness or indignation at a circumstance or action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reserve', definition: 'To retain for future use', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reside', definition: 'To have one\'s permanent home in a particular place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'resign', definition: 'To voluntarily leave a job or other position', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'resist', definition: 'To withstand the action or effect of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'resolve', definition: 'To settle or find a solution to a problem or dispute', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'resort', definition: 'To turn to and adopt a strategy or course of action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'respect', definition: 'To admire someone or something deeply as a result of their abilities', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'respond', definition: 'To say something in reply', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rest', definition: 'To cease work or movement in order to relax or recover strength', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'restore', definition: 'To bring back a previous right or practice or situation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'restrain', definition: 'To prevent someone or something from doing something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'restrict', definition: 'To put a limit on or keep under control', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'restructure', definition: 'To organize differently', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'result', definition: 'To occur or follow as the consequence of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'resume', definition: 'To begin to do or pursue something again after a pause', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'retain', definition: 'To continue to have something or keep possession of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'retaliate', definition: 'To make an attack or assault in return for a similar attack', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'retard', definition: 'To delay or hold back in terms of progress or development', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'retire', definition: 'To leave one\'s job and cease to work typically upon reaching retirement age', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'retreat', definition: 'To withdraw from enemy forces as a result of their superior power', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'retrieve', definition: 'To get or bring something back or regain possession of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'return', definition: 'To come or go back to a place or person', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reveal', definition: 'To make previously unknown or secret information known to others', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'revenge', definition: 'To inflict hurt or harm on someone for an injury or wrong done', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reverse', definition: 'To move backward', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'revert', definition: 'To return to a previous state or condition or practice', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'review', definition: 'To examine or assess something formally with the possibility of change', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'revise', definition: 'To reconsider and alter something in the light of further evidence', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'revive', definition: 'To restore to life or consciousness', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'revoke', definition: 'To put an end to the validity or operation of a decree or decision', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'revolt', definition: 'To rise in rebellion', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'revolutionize', definition: 'To change something radically or fundamentally', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'reward', definition: 'To make a gift of something to someone in recognition of their services', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rid', definition: 'To make someone or something free of a troublesome or unwanted person', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ride', definition: 'To sit on and control the movement of an animal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ridicule', definition: 'To subject someone or something to contemptuous and dismissive language', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ring', definition: 'To make a clear resonant or vibrating sound', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rinse', definition: 'To wash something with clean water to remove soap or dirt', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'riot', definition: 'To take part in a violent public disturbance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rip', definition: 'To tear or pull something quickly or forcibly away from something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rise', definition: 'To move from a lower position to a higher one or come or go up', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'risk', definition: 'To expose someone or something valued to danger or harm', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rival', definition: 'To be or seem to be equal or comparable to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'roam', definition: 'To move about or travel aimlessly or unsystematically', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rob', definition: 'To take property unlawfully from a person or place by force or threat', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rock', definition: 'To move gently to and fro or from side to side', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'roll', definition: 'To move or cause to move in a particular direction by turning over', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'root', definition: 'To establish deeply and firmly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rot', definition: 'To gradually decay or cause to decay by the action of bacteria', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rotate', definition: 'To move or cause to move in a circle around an axis or center', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rub', definition: 'To move one\'s hand or a cloth repeatedly to and fro on the surface', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ruin', definition: 'To reduce a building or place to a state of decay or destruction', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rule', definition: 'To exercise ultimate power or authority over an area and its people', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'run', definition: 'To move at a speed faster than a walk never having both feet on ground', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rupture', definition: 'To break or burst suddenly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'rush', definition: 'To move with urgent haste', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sabotage', definition: 'To deliberately destroy or damage or obstruct something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sacrifice', definition: 'To offer or kill as a religious sacrifice', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sadden', definition: 'To cause to feel sorrow or unhappy', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'safeguard', definition: 'To protect from harm or damage with an appropriate measure', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sail', definition: 'To travel in a boat with sails especially as a sport or recreation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'salvage', definition: 'To rescue a wrecked or disabled ship or its cargo from loss at sea', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sample', definition: 'To take a sample or samples of something for analysis', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sanction', definition: 'To give official permission or approval for an action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'satisfy', definition: 'To meet the expectations or needs or desires of someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'saturate', definition: 'To cause something to become thoroughly soaked with liquid', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'save', definition: 'To keep safe or rescue someone or something from harm or danger', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'say', definition: 'To utter words so as to convey information or express a feeling', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'scale', definition: 'To climb up or over something high and steep', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'scan', definition: 'To look at all parts of something carefully to detect some feature', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'scare', definition: 'To cause great fear or nervousness in or frighten', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'scatter', definition: 'To throw in various random directions', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'schedule', definition: 'To arrange or plan an event to take place at a particular time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'scheme', definition: 'To make plans especially in a devious way or with intent to do wrong', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'score', definition: 'To gain a point or goal in a competitive game', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'scorn', definition: 'To feel or express contempt or derision for', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'scramble', definition: 'To make one\'s way quickly or awkwardly up a steep slope', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'scratch', definition: 'To score or mark the surface of something with a sharp object', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'scream', definition: 'To give a long loud piercing cry or cries expressing emotion', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'screen', definition: 'To conceal or protect or shelter someone or something with a screen', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'scrutinize', definition: 'To examine or inspect closely and thoroughly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'seal', definition: 'To fasten or close securely', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'search', definition: 'To try to find something by looking or otherwise seeking carefully', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'seat', definition: 'To arrange for someone to sit somewhere', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'seclude', definition: 'To keep someone away from other people', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'secure', definition: 'To fix or attach something firmly so that it cannot be moved or lost', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'seduce', definition: 'To attract someone to a belief or into a course of action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'see', definition: 'To perceive with the eyes or discern visually', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'seek', definition: 'To attempt to find something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'seem', definition: 'To give the impression or sensation of being something or having quality', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Verbs - Part 17
const ADVANCED_VERBS_17: VocabularyWord[] = [
  { word: 'segment', definition: 'To divide something into separate parts or sections', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'segregate', definition: 'To set apart from the rest or from each other or isolate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'seize', definition: 'To take hold of suddenly and forcibly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'select', definition: 'To carefully choose as being the best or most suitable', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sell', definition: 'To give or hand over something in exchange for money', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'send', definition: 'To cause to go or be taken to a particular destination', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sense', definition: 'To perceive by a sense or senses', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sensitize', definition: 'To make someone or something sensitive to certain stimuli', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sentence', definition: 'To declare the punishment decided for an offender', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'separate', definition: 'To cause to move or be apart', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sequence', definition: 'To arrange in a particular order', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'serve', definition: 'To perform duties or services for another person or organization', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'set', definition: 'To put or place or lay something in a specified place or position', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'settle', definition: 'To resolve or reach an agreement about an argument or problem', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sever', definition: 'To divide by cutting or slicing especially suddenly and forcibly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'shade', definition: 'To screen from direct light', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'shake', definition: 'To move or cause to move with short quick movements', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'shape', definition: 'To give a particular shape or form to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'share', definition: 'To give a portion of something to others', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sharpen', definition: 'To make or become sharp or sharper', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'shatter', definition: 'To break or cause to break suddenly and violently into pieces', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'shed', definition: 'To allow leaves or fruit to fall to the ground', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'shelter', definition: 'To protect or shield from something harmful', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'shift', definition: 'To move or cause to move from one place to another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'shine', definition: 'To give out a bright light', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ship', definition: 'To transport goods or people on a ship', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'shock', definition: 'To cause someone to feel surprised and upset', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'shoot', definition: 'To kill or wound a person or animal with a bullet or arrow', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'shop', definition: 'To visit one or more stores or websites to buy goods', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'shorten', definition: 'To make or become shorter', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'shout', definition: 'To utter a loud call or cry typically as an expression of emotion', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'show', definition: 'To be or allow or cause to be visible', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'shrink', definition: 'To become or make smaller in size or amount or contract', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'shrug', definition: 'To raise one\'s shoulders slightly and momentarily to express doubt', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'shut', definition: 'To move something so that it blocks an opening or close', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sicken', definition: 'To make someone feel disgusted or appalled', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sigh', definition: 'To emit a long deep breath expressing sadness or relief', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sign', definition: 'To write one\'s name on a letter or document as identification', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'signal', definition: 'To transmit information or instructions by means of a gesture', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'signify', definition: 'To be an indication of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'silence', definition: 'To cause to become silent or prohibit or prevent from speaking', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'simplify', definition: 'To make something simpler or easier to do or understand', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'simulate', definition: 'To imitate the appearance or character of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sing', definition: 'To make musical sounds with the voice', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sink', definition: 'To go down below the surface of something especially of a liquid', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sit', definition: 'To adopt or be in a position in which one\'s weight is supported', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'situate', definition: 'To fix or build something in a certain place or position', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sketch', definition: 'To make a rough drawing of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'skip', definition: 'To move along lightly stepping from one foot to the other', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'slap', definition: 'To hit someone or something with the palm of one\'s hand', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'slash', definition: 'To cut with a wide sweeping movement typically using a knife', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'slaughter', definition: 'To kill animals for food', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sleep', definition: 'To rest with eyes closed and with consciousness suspended', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'slice', definition: 'To cut something into slices', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'slide', definition: 'To move along a smooth surface while maintaining continuous contact', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'slip', definition: 'To lose one\'s footing and slide unintentionally for a short distance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'slow', definition: 'To reduce one\'s speed or the speed of a vehicle or process', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'smash', definition: 'To violently break something into pieces', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'smell', definition: 'To perceive or detect the odor or scent of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'smile', definition: 'To form one\'s features into a pleased or kind expression', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'smoke', definition: 'To emit smoke or visible vapor', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'smooth', definition: 'To give a flat or regular surface or appearance to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'smother', definition: 'To kill someone by covering their nose and mouth', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'snap', definition: 'To break or cause to break suddenly and completely', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'snatch', definition: 'To quickly seize something in a rude or eager way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'soak', definition: 'To make or allow something to become thoroughly wet', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'soar', definition: 'To fly or rise high in the air', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'socialize', definition: 'To mix socially with others', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'soften', definition: 'To make or become less hard', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'solve', definition: 'To find an answer to or explanation or means of dealing with', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'soothe', definition: 'To gently calm a person or their feelings', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sort', definition: 'To arrange systematically in groups or separate according to type', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sound', definition: 'To emit or cause to emit sound', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'source', definition: 'To obtain from a particular source', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'spare', definition: 'To give something of which one has enough to someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'spark', definition: 'To emit sparks of fire or electricity', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'spawn', definition: 'To release or deposit eggs', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'speak', definition: 'To say something in order to convey information or express feeling', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'specialize', definition: 'To concentrate on and become expert in a particular subject', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'specify', definition: 'To identify clearly and definitely', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'speculate', definition: 'To form a theory or conjecture about a subject without firm evidence', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'speed', definition: 'To move quickly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'spell', definition: 'To write or name the letters that form a word in correct sequence', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'spend', definition: 'To pay out money in buying or hiring goods or services', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'spill', definition: 'To cause or allow liquid to flow over the edge of its container', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'spin', definition: 'To turn or cause to turn or whirl around quickly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'spiral', definition: 'To move in a spiral course', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'split', definition: 'To break or cause to break forcibly into parts', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'spoil', definition: 'To diminish or destroy the value or quality of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sponsor', definition: 'To provide funds for a project or activity or person', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'spot', definition: 'To see or notice or recognize someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch23(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_VERBS_16, ...ADVANCED_VERBS_17];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 23: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 23 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 23');
  console.log('Advanced Academic Verbs - Parts 16 & 17');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch23(supabase);
  
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
