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

// Advanced Academic Verbs - Part 12
const ADVANCED_VERBS_12: VocabularyWord[] = [
  { word: 'master', definition: 'To acquire complete knowledge or skill in an accomplishment', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'match', definition: 'To correspond or cause to correspond in some essential respect', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'materialize', definition: 'To become actual fact or happen', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'matter', definition: 'To be of importance or have significance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mature', definition: 'To become fully developed physically or reach an advanced stage', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'maximize', definition: 'To make as large or great as possible', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mean', definition: 'To intend to convey or indicate or refer to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'measure', definition: 'To ascertain the size or amount or degree of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mediate', definition: 'To intervene between people in a dispute to bring about agreement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'meet', definition: 'To come into the presence or company of someone by chance or arrangement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'melt', definition: 'To make or become liquefied by heat', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'memorize', definition: 'To commit to memory or learn by heart', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'menace', definition: 'To threaten especially in a malignant or hostile manner', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mend', definition: 'To repair something that is broken or damaged', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mention', definition: 'To refer to something briefly and without going into detail', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'merge', definition: 'To combine or cause to combine to form a single entity', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'merit', definition: 'To deserve or be worthy of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'migrate', definition: 'To move from one region or habitat to another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mimic', definition: 'To imitate someone or their actions or words', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mind', definition: 'To be distressed or annoyed by or object to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'minimize', definition: 'To reduce something to the smallest possible amount or degree', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mirror', definition: 'To show a reflection of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'misinterpret', definition: 'To interpret something wrongly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mislead', definition: 'To cause someone to have a wrong idea or impression about something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'miss', definition: 'To fail to hit or reach or come into contact with something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mitigate', definition: 'To make less severe or serious or painful', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mix', definition: 'To combine or put together to form one substance or mass', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mobilize', definition: 'To organize and encourage people to act in a concerted way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mock', definition: 'To tease or laugh at in a scornful or contemptuous manner', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'model', definition: 'To fashion or shape a figure from clay or wax', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'moderate', definition: 'To make or become less extreme or intense', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'modernize', definition: 'To adapt something to modern needs or habits', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'modify', definition: 'To make partial or minor changes to something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mold', definition: 'To form an object out of malleable material', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'monitor', definition: 'To observe and check the progress or quality of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'monopolize', definition: 'To obtain exclusive possession or control of a trade or commodity', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'motivate', definition: 'To provide someone with a motive for doing something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mount', definition: 'To climb up on or get up on something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mourn', definition: 'To feel or show deep sorrow or regret for someone or their death', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'move', definition: 'To go in a specified direction or manner or change position', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'multiply', definition: 'To obtain from a number another that contains the first number', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'murder', definition: 'To kill someone unlawfully and with premeditation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'murmur', definition: 'To say something in a low or indistinct voice', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'name', definition: 'To give a name to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'narrate', definition: 'To give a spoken or written account of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'narrow', definition: 'To become or make less wide', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'navigate', definition: 'To plan and direct the route or course of a ship or aircraft', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'necessitate', definition: 'To make something necessary as a result or consequence', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'need', definition: 'To require something because it is essential or very important', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'negate', definition: 'To nullify or make ineffective', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'neglect', definition: 'To fail to care for properly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'negotiate', definition: 'To try to reach an agreement or compromise by discussion', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'network', definition: 'To interact with other people to exchange information', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'neutralize', definition: 'To render something ineffective or harmless', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'nominate', definition: 'To propose or formally enter as a candidate for election', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'normalize', definition: 'To bring or return to a normal condition or state', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'note', definition: 'To notice or pay particular attention to something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'notice', definition: 'To become aware of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'notify', definition: 'To inform someone of something typically in a formal manner', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'nourish', definition: 'To provide with the food or other substances necessary for growth', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'nullify', definition: 'To make legally null and void or invalidate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'number', definition: 'To amount to a specified figure or quantity', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'nurture', definition: 'To care for and encourage the growth or development of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'obey', definition: 'To comply with the command or authority of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'object', definition: 'To say something to express one\'s disapproval of or disagreement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'obligate', definition: 'To bind or compel someone especially legally or morally', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'oblige', definition: 'To make someone legally or morally bound to an action or course', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'obscure', definition: 'To keep from being seen or conceal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'observe', definition: 'To notice or perceive something and register it as being significant', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'obsess', definition: 'To preoccupy or fill the mind of someone continually', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'obstruct', definition: 'To block an opening or path or road', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'obtain', definition: 'To get or acquire or secure something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'occupy', definition: 'To reside or have one\'s place of business in a building', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'occur', definition: 'To happen or take place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'offend', definition: 'To cause to feel upset or annoyed or resentful', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'offer', definition: 'To present or proffer something for someone to accept or reject', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'offset', definition: 'To counteract something by having an opposing force or effect', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'omit', definition: 'To leave out or exclude someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'open', definition: 'To move a door or window so as to leave a space allowing access', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'operate', definition: 'To control the functioning of a machine or process', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'oppose', definition: 'To disapprove of and attempt to prevent especially by argument', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'oppress', definition: 'To keep someone in subservience and hardship', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'opt', definition: 'To make a choice from a range of possibilities', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'optimize', definition: 'To make the best or most effective use of a situation or resource', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'orchestrate', definition: 'To arrange or direct the elements of a situation to produce effect', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'order', definition: 'To give an authoritative direction or instruction to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'organize', definition: 'To arrange into a structured whole or order', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'orient', definition: 'To align or position something relative to the points of a compass', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'originate', definition: 'To have a specified beginning', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'oscillate', definition: 'To move or swing back and forth at a regular speed', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'oust', definition: 'To drive out or expel someone from a position or place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'outlaw', definition: 'To ban or make illegal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'outline', definition: 'To give a summary of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'output', definition: 'To produce or deliver or supply data using a computer', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'outweigh', definition: 'To be heavier or more significant or important than', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Verbs - Part 13
const ADVANCED_VERBS_13: VocabularyWord[] = [
  { word: 'overcome', definition: 'To succeed in dealing with a problem or difficulty', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'overestimate', definition: 'To estimate something to be better or larger than it really is', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'overflow', definition: 'To flow over the brim of a receptacle', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'overhear', definition: 'To hear someone or something without meaning to or without speaker\'s knowledge', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'overlap', definition: 'To extend over so as to cover partly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'overlook', definition: 'To fail to notice something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'overpower', definition: 'To defeat or overcome with superior strength', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'override', definition: 'To use one\'s authority to reject or cancel a decision', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'oversee', definition: 'To supervise a person or work especially in an official capacity', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'overtake', definition: 'To catch up with and pass while traveling in the same direction', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'overthrow', definition: 'To remove forcibly from power', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'overwhelm', definition: 'To bury or drown beneath a huge mass', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'owe', definition: 'To have an obligation to pay or repay something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'own', definition: 'To have something as one\'s own or possess', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pace', definition: 'To walk at a steady and consistent speed', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pack', definition: 'To fill a suitcase or bag with clothes and other items needed', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'paint', definition: 'To cover the surface of something with paint', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pair', definition: 'To join or connect to form a pair', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'panic', definition: 'To feel or cause to feel panic', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'parade', definition: 'To walk or march in public in a formal procession', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'parallel', definition: 'To be side by side with something extending in the same direction', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'paralyze', definition: 'To cause a person or part of the body to become partly or wholly incapable', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pardon', definition: 'To forgive or excuse a person or error or offense', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'park', definition: 'To bring a vehicle that one is driving to a halt and leave it temporarily', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'part', definition: 'To move away from each other', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'participate', definition: 'To take part in', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'partition', definition: 'To divide into parts', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'partner', definition: 'To be the partner of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pass', definition: 'To move or cause to move in a specified direction', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'patent', definition: 'To obtain a patent for an invention', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'patrol', definition: 'To keep watch over an area by regularly walking or traveling around', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'patronize', definition: 'To treat with an apparent kindness that betrays a feeling of superiority', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pause', definition: 'To interrupt action or speech briefly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pay', definition: 'To give someone money that is due for work done or goods received', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'peak', definition: 'To reach a highest point either of a specified value or at a specified time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'peer', definition: 'To look keenly or with difficulty at someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'penalize', definition: 'To subject to some form of punishment', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'penetrate', definition: 'To succeed in forcing a way into or through a thing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'perceive', definition: 'To become aware or conscious of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'perfect', definition: 'To make something completely free from faults or defects', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'perform', definition: 'To carry out or accomplish an action or task', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'perish', definition: 'To suffer death typically in a violent or sudden way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'permit', definition: 'To give authorization or consent to someone to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'perpetrate', definition: 'To carry out or commit a harmful or illegal action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'perpetuate', definition: 'To make something continue indefinitely', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'persecute', definition: 'To subject someone to hostility and ill-treatment', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'persevere', definition: 'To continue in a course of action even in the face of difficulty', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'persist', definition: 'To continue firmly or obstinately in an opinion or course of action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'personalize', definition: 'To design or produce something to meet someone\'s individual requirements', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'personify', definition: 'To represent a quality or concept by a figure in human form', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'persuade', definition: 'To cause someone to do something through reasoning or argument', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pertain', definition: 'To be appropriate or relevant or applicable', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'perturb', definition: 'To make someone anxious or unsettled', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pervade', definition: 'To spread through and be perceived in every part of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'petition', definition: 'To make or present a formal request to an authority', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'phase', definition: 'To carry out something in gradual stages', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'photograph', definition: 'To take a photograph of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'phrase', definition: 'To put into a particular form of words', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pick', definition: 'To take hold of and remove a flower or fruit from where it is growing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'picture', definition: 'To represent someone or something in a photograph or picture', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'piece', definition: 'To assemble something from individual parts', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pierce', definition: 'To make a hole in or through something with a sharp pointed object', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pile', definition: 'To place things one on top of another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pilot', definition: 'To act as a pilot of an aircraft or ship', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pin', definition: 'To attach or fasten with a pin or pins', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pinpoint', definition: 'To find or locate exactly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pioneer', definition: 'To develop or be the first to use or apply a new method', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pitch', definition: 'To throw roughly or casually', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pity', definition: 'To feel sorrow for the misfortunes of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'place', definition: 'To put in a particular position', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'plague', definition: 'To cause continual trouble or distress to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'plan', definition: 'To decide on and arrange in advance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'plant', definition: 'To place a seed or plant in the ground so that it can grow', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'play', definition: 'To engage in activity for enjoyment and recreation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'plead', definition: 'To make an emotional appeal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'please', definition: 'To cause to feel happy and satisfied', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pledge', definition: 'To commit someone or oneself by a solemn promise', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'plot', definition: 'To secretly make plans to carry out an illegal or harmful action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'plummet', definition: 'To fall or drop straight down at high speed', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'plunge', definition: 'To jump or dive quickly and energetically', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'point', definition: 'To direct someone\'s attention to the position or direction of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'poison', definition: 'To administer poison to a person or animal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'polarize', definition: 'To divide or cause to divide into two sharply contrasting groups', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'police', definition: 'To have the duty of maintaining law and order in or for an area', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'polish', definition: 'To make the surface of something smooth and shiny by rubbing it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'poll', definition: 'To record the opinion or vote of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pollute', definition: 'To contaminate water or air or a place with harmful substances', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ponder', definition: 'To think about something carefully before making a decision', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pool', definition: 'To put money or other assets into a common fund', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pop', definition: 'To make or cause to make a light explosive sound', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'popularize', definition: 'To make something accessible to the general public', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'populate', definition: 'To form the population of a town or area', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'portray', definition: 'To depict someone or something in a work of art or literature', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'pose', definition: 'To present or constitute a problem or danger', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch21(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_VERBS_12, ...ADVANCED_VERBS_13];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 21: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 21 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 21');
  console.log('Advanced Academic Verbs - Parts 12 & 13');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch21(supabase);
  
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
