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

// Advanced Academic Verbs - Part 18
const ADVANCED_VERBS_18: VocabularyWord[] = [
  { word: 'spray', definition: 'To apply liquid to someone or something in the form of tiny drops', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'spread', definition: 'To open out something so as to extend its surface area', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'spring', definition: 'To move or jump suddenly or rapidly upward or forward', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sprinkle', definition: 'To scatter or pour small drops or particles of a substance over', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'spur', definition: 'To give an incentive or encouragement to someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'spy', definition: 'To work for a government or other organization by secretly collecting information', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'squeeze', definition: 'To firmly press something soft or yielding typically with one\'s fingers', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stab', definition: 'To thrust a knife or other pointed weapon into someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stabilize', definition: 'To make or become unlikely to change or fail', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stack', definition: 'To arrange a number of things in a pile typically a neat one', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'staff', definition: 'To provide an organization with staff', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stage', definition: 'To present a performance of a play or other show', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stagger', definition: 'To walk or move unsteadily as if about to fall', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stain', definition: 'To mark something with colored patches or dirty marks', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stake', definition: 'To support a plant with a stake or stakes', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stall', definition: 'To stop or cause to stop making progress', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stamp', definition: 'To bring down one\'s foot heavily on the ground or on something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stand', definition: 'To have or maintain an upright position supported by one\'s feet', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'standardize', definition: 'To cause something to conform to a standard', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stare', definition: 'To look fixedly or vacantly at someone or something with eyes wide open', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'start', definition: 'To come into being or begin or be reckoned from a particular point', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'startle', definition: 'To cause to feel sudden shock or alarm', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'starve', definition: 'To suffer or die or cause to suffer or die from hunger', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'state', definition: 'To express something definitely or clearly in speech or writing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'station', definition: 'To put in or assign to a specified place for a particular purpose', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stay', definition: 'To remain in the same place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'steal', definition: 'To take another person\'s property without permission or legal right', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'steer', definition: 'To guide or control the movement of a vehicle or vessel', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stem', definition: 'To originate in or be caused by', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'step', definition: 'To lift and set down one\'s foot or one foot after the other', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stereotype', definition: 'To view or represent as a stereotype', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stick', definition: 'To push a sharp or pointed object into or through something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stiffen', definition: 'To make or become stiff or stiffer', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stifle', definition: 'To make someone unable to breathe properly or suffocate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stigmatize', definition: 'To describe or regard as worthy of disgrace or great disapproval', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stimulate', definition: 'To raise levels of physiological or nervous activity in the body', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sting', definition: 'To wound or pierce with a sting', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stir', definition: 'To move a spoon or other implement around in a liquid or substance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stock', definition: 'To have or keep a supply of a particular product or type available', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stop', definition: 'To cease to perform a specified action or have a specified experience', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'store', definition: 'To keep or accumulate something for future use', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'storm', definition: 'To move angrily or forcefully in a specified direction', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'straighten', definition: 'To make or become straight', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'strain', definition: 'To force a part of one\'s body or oneself to make a strenuous effort', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'strand', definition: 'To leave someone without the means to move from somewhere', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'strangle', definition: 'To squeeze or constrict the neck of a person or animal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'strap', definition: 'To fasten or secure in a specified place or position with a strap', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'strategize', definition: 'To devise a strategy or strategies', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'streamline', definition: 'To design or provide with a form that presents little resistance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'strengthen', definition: 'To make or become stronger', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stress', definition: 'To subject to pressure or tension', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stretch', definition: 'To be made or be capable of being made longer or wider', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stride', definition: 'To walk with long decisive steps in a specified direction', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'strike', definition: 'To hit forcibly and deliberately with one\'s hand or a weapon', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'strip', definition: 'To remove all coverings from', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'strive', definition: 'To make great efforts to achieve or obtain something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stroke', definition: 'To move one\'s hand with gentle pressure over a surface', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'structure', definition: 'To construct or arrange according to a plan or give a pattern to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'struggle', definition: 'To make forceful or violent efforts to get free of restraint', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'study', definition: 'To devote time and attention to acquiring knowledge on a subject', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stuff', definition: 'To fill a receptacle or space tightly with something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stumble', definition: 'To trip or momentarily lose one\'s balance or almost fall', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'stun', definition: 'To knock unconscious or into a dazed or semiconscious state', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'subdue', definition: 'To overcome or quieten or bring under control', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'subject', definition: 'To cause or force to undergo a particular experience or form of treatment', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'submerge', definition: 'To descend below the surface of an area of water', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'submit', definition: 'To accept or yield to a superior force or to the authority of another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'subordinate', definition: 'To treat or regard as of lesser importance than something else', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'subscribe', definition: 'To arrange to receive something regularly typically a publication', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'subside', definition: 'To become less intense or severe or widespread', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'subsidize', definition: 'To support an organization or activity financially', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'substitute', definition: 'To use or add in place of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'subtract', definition: 'To take away a number or amount from another to calculate difference', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'succeed', definition: 'To achieve the desired aim or result', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'succumb', definition: 'To fail to resist pressure or temptation or some negative force', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'suck', definition: 'To draw into the mouth by contracting the muscles of the lip and mouth', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sue', definition: 'To institute legal proceedings against a person or institution', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'suffer', definition: 'To experience or be subjected to something bad or unpleasant', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'suffice', definition: 'To be enough or adequate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'suggest', definition: 'To put forward for consideration', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'suit', definition: 'To be convenient for or acceptable to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sum', definition: 'To find the sum of two or more amounts', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'summarize', definition: 'To give a brief statement of the main points of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'summon', definition: 'To authoritatively or urgently call on someone to be present', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'supervise', definition: 'To observe and direct the execution of a task or activity', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'supplement', definition: 'To add an extra element or amount to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'supply', definition: 'To make something needed or wanted available to someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'support', definition: 'To bear all or part of the weight of or hold up', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'suppose', definition: 'To assume that something is the case on the basis of evidence', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'suppress', definition: 'To forcibly put an end to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'surface', definition: 'To rise or come up to the surface of the water or the ground', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'surge', definition: 'To move suddenly and powerfully forward or upward', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Verbs - Part 19
const ADVANCED_VERBS_19: VocabularyWord[] = [
  { word: 'surmount', definition: 'To overcome a difficulty or obstacle', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'surpass', definition: 'To exceed or be greater than', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'surprise', definition: 'To cause someone to feel mild astonishment or shock', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'surrender', definition: 'To cease resistance to an enemy or opponent and submit to their authority', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'surround', definition: 'To be all around someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'survey', definition: 'To look closely at or examine someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'survive', definition: 'To continue to live or exist especially in spite of danger', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'suspect', definition: 'To have an idea or impression of the existence or truth of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'suspend', definition: 'To temporarily prevent from continuing or being in force or effect', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sustain', definition: 'To strengthen or support physically or mentally', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'swallow', definition: 'To cause or allow something to pass down the throat', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'swap', definition: 'To take part in an exchange of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sway', definition: 'To move or cause to move slowly or rhythmically backward and forward', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'swear', definition: 'To make a solemn statement or promise undertaking to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sweep', definition: 'To clean an area by brushing away dirt or litter', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'swell', definition: 'To become larger or rounder in size typically as a result of accumulation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'swim', definition: 'To propel the body through water by using the limbs', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'swing', definition: 'To move or cause to move back and forth or from side to side', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'switch', definition: 'To change the position or direction or focus of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'symbolize', definition: 'To be a symbol of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'sympathize', definition: 'To feel or express sympathy', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'synchronize', definition: 'To cause to occur or operate at the same time or rate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'synthesize', definition: 'To combine a number of things into a coherent whole', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'systematize', definition: 'To arrange according to an organized system or make systematic', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tackle', definition: 'To make determined efforts to deal with a problem or difficult task', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tag', definition: 'To attach a label to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tailor', definition: 'To make or adapt for a particular purpose or person', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'take', definition: 'To lay hold of something with one\'s hands or reach for and hold', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'talk', definition: 'To speak in order to give information or express ideas or feelings', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tame', definition: 'To domesticate an animal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tamper', definition: 'To interfere with something in order to cause damage or make changes', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tap', definition: 'To strike with a quick light blow or blows', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'target', definition: 'To select as an object of attention or attack', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'taste', definition: 'To perceive or experience the flavor of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tax', definition: 'To impose a tax on someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'teach', definition: 'To show or explain to someone how to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tear', definition: 'To pull something apart or to pieces with force', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tease', definition: 'To make fun of or attempt to provoke a person or animal in a playful way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'telephone', definition: 'To contact someone by telephone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tell', definition: 'To communicate information or facts or news to someone in spoken words', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'temper', definition: 'To act as a neutralizing or counterbalancing force to something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tempt', definition: 'To entice or attempt to entice someone to do or acquire something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tend', definition: 'To regularly or frequently behave in a particular way or have a tendency', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'terminate', definition: 'To bring to an end', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'terrify', definition: 'To cause to feel extreme fear', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'test', definition: 'To take measures to check the quality or performance of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'testify', definition: 'To give evidence as a witness in a law court', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'thank', definition: 'To express gratitude to someone especially by saying thank you', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'thaw', definition: 'To become liquid or soft as a result of warming up', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'theorize', definition: 'To form a theory or set of theories about something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'think', definition: 'To have a particular opinion or belief or idea about someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'threaten', definition: 'To state one\'s intention to take hostile action against someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'thrill', definition: 'To cause someone to have a sudden feeling of excitement and pleasure', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'thrive', definition: 'To prosper or flourish', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'throw', definition: 'To propel something with force through the air by a movement of the arm', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'thrust', definition: 'To push something suddenly or violently in a specified direction', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tick', definition: 'To make regular short sharp sounds typically of a clock or watch', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tie', definition: 'To attach or fasten with string or similar cord', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tighten', definition: 'To make or become tight or tighter', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tilt', definition: 'To move or cause to move into a sloping position', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'time', definition: 'To plan or schedule or arrange when something should happen or be done', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tip', definition: 'To overbalance so as to fall or turn over', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tire', definition: 'To feel or cause to feel in need of rest or sleep', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'title', definition: 'To give a name to a book or composition or other work', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'toast', definition: 'To cook or brown food by exposure to a grill or fire or other source', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tolerate', definition: 'To allow the existence or occurrence or practice of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tone', definition: 'To give greater strength or firmness to the body or a muscle', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'top', definition: 'To exceed an amount or level or number', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'topple', definition: 'To overbalance or become unsteady and fall slowly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'torture', definition: 'To inflict severe pain on', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'toss', definition: 'To throw something somewhere lightly or easily or casually', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'total', definition: 'To amount in number to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'touch', definition: 'To come so close to an object as to be or come into contact with it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tour', definition: 'To make a tour of an area', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tow', definition: 'To pull another vehicle or boat along with a rope or chain', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'trace', definition: 'To find or discover by investigation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'track', definition: 'To follow the course or trail of someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'trade', definition: 'To buy and sell goods and services', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'trail', definition: 'To draw or be drawn along the ground or other surface behind someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'train', definition: 'To teach a particular skill or type of behavior through practice', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'trample', definition: 'To tread on and crush', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'transcend', definition: 'To be or go beyond the range or limits of something abstract', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'transcribe', definition: 'To put thoughts or speech or data into written or printed form', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'transfer', definition: 'To move from one place to another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'transform', definition: 'To make a thorough or dramatic change in the form or appearance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'transgress', definition: 'To infringe or go beyond the bounds of a moral principle or law', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'transit', definition: 'To pass across or through an area', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'translate', definition: 'To express the sense of words or text in another language', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'transmit', definition: 'To cause something to pass on from one place or person to another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch24(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_VERBS_18, ...ADVANCED_VERBS_19];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 24: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 24 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 24');
  console.log('Advanced Academic Verbs - Parts 18 & 19');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch24(supabase);
  
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
