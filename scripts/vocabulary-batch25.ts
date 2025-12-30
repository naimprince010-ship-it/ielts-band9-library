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

// Advanced Academic Verbs - Part 20
const ADVANCED_VERBS_20: VocabularyWord[] = [
  { word: 'transplant', definition: 'To move or transfer something to another place or situation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'transport', definition: 'To take or carry people or goods from one place to another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'trap', definition: 'To catch an animal in a trap', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'travel', definition: 'To make a journey typically of some length or abroad', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'traverse', definition: 'To travel across or through', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tread', definition: 'To walk in a specified way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'treasure', definition: 'To keep carefully a valuable or valued item', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'treat', definition: 'To behave toward or deal with in a certain way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tremble', definition: 'To shake involuntarily typically as a result of anxiety or excitement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'trend', definition: 'To change or develop in a general direction', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'trespass', definition: 'To enter the owner\'s land or property without permission', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'trigger', definition: 'To cause an event or situation to happen or exist', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'trim', definition: 'To make something neat or of the required size or form by cutting away', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'triple', definition: 'To become three times as much or as many', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'triumph', definition: 'To achieve a victory or be successful', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'trouble', definition: 'To cause distress or anxiety to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'trust', definition: 'To believe in the reliability or truth or ability of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'try', definition: 'To make an attempt or effort to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tuck', definition: 'To push or fold or turn the edges or ends of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tumble', definition: 'To fall suddenly or clumsily or headlong', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'tune', definition: 'To adjust a musical instrument to the correct or uniform pitch', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'turn', definition: 'To move or cause to move in a circular direction wholly or partly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'twist', definition: 'To form into a bent or distorted shape', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'type', definition: 'To write something on a typewriter or computer by pressing the keys', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'typify', definition: 'To be characteristic or a representative example of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'undergo', definition: 'To experience or be subjected to something typically unpleasant', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'underlie', definition: 'To be the cause or basis of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'underline', definition: 'To draw a line under a word or phrase to give emphasis', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'undermine', definition: 'To erode the base or foundation of a rock formation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'understand', definition: 'To perceive the intended meaning of words or a speaker', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'undertake', definition: 'To commit oneself to and begin an enterprise or responsibility', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'undo', definition: 'To unfasten or untie or loosen something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unfold', definition: 'To open or spread out from a folded position', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unify', definition: 'To make or become united or uniform or whole', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unite', definition: 'To come or bring together for a common purpose or action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unleash', definition: 'To release from a leash or restraint', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unload', definition: 'To remove goods from a vehicle or ship or container', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unlock', definition: 'To undo the lock of something using a key', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'unveil', definition: 'To remove a veil or covering from especially as part of a ceremony', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'update', definition: 'To make something more modern or up to date', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'upgrade', definition: 'To raise something to a higher standard', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'uphold', definition: 'To confirm or support something that has been questioned', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'upset', definition: 'To make someone unhappy or disappointed or worried', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'urge', definition: 'To try earnestly or persistently to persuade someone to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'use', definition: 'To take or hold or deploy something as a means of accomplishing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'usher', definition: 'To show or guide someone somewhere', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'utilize', definition: 'To make practical and effective use of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'utter', definition: 'To make a sound or say something with one\'s voice', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'vacate', definition: 'To leave a place that one previously occupied', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'validate', definition: 'To check or prove the validity or accuracy of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'value', definition: 'To estimate the monetary worth of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'vanish', definition: 'To disappear suddenly and completely', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'vary', definition: 'To differ in size or amount or degree or nature from something else', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'veil', definition: 'To cover with or as though with a veil', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'vent', definition: 'To give free expression to a strong emotion', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'venture', definition: 'To undertake a risky or daring journey or course of action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'verbalize', definition: 'To express ideas or feelings in words especially by speaking out loud', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'verify', definition: 'To make sure or demonstrate that something is true or accurate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'vest', definition: 'To confer or bestow power or authority or property on someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'veto', definition: 'To exercise a veto against a decision or proposal made by a body', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'vibrate', definition: 'To move or cause to move continuously and rapidly to and fro', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'view', definition: 'To look at or inspect', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'vindicate', definition: 'To clear someone of blame or suspicion', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'violate', definition: 'To break or fail to comply with a rule or formal agreement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'visit', definition: 'To go to see and spend time with someone socially', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'visualize', definition: 'To form a mental image of or imagine', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'voice', definition: 'To express something in words', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'volunteer', definition: 'To freely offer to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'vote', definition: 'To give or register a vote', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'vouch', definition: 'To assert or confirm as a result of one\'s own experience', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'vow', definition: 'To solemnly promise to do a specified thing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wade', definition: 'To walk through water or another liquid or soft substance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wage', definition: 'To carry on a war or campaign', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wait', definition: 'To stay where one is or delay action until a particular time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wake', definition: 'To emerge or cause to emerge from a state of sleep', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'walk', definition: 'To move at a regular and fairly slow pace by lifting and setting down', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wander', definition: 'To walk or move in a leisurely or casual or aimless way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'want', definition: 'To have a desire to possess or do something or wish for', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ward', definition: 'To admit someone to a hospital ward', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'warm', definition: 'To make or become warm', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'warn', definition: 'To inform someone in advance of an impending or possible danger', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'warrant', definition: 'To justify or necessitate a certain course of action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wash', definition: 'To clean with water and typically soap or detergent', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'waste', definition: 'To use or expend carelessly or extravagantly or to no purpose', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'watch', definition: 'To look at or observe attentively typically over a period of time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'water', definition: 'To pour or sprinkle water over a plant or an area of ground', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wave', definition: 'To move one\'s hand to and fro in greeting or as a signal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'weaken', definition: 'To make or become weaker in power or resolve or physical strength', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wear', definition: 'To have on one\'s body or a part of one\'s body as clothing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'weather', definition: 'To wear away or change the appearance or texture of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'weave', definition: 'To form fabric or a fabric item by interlacing long threads', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wed', definition: 'To get married to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'weigh', definition: 'To find out how heavy someone or something is', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Verbs - Part 21
const ADVANCED_VERBS_21: VocabularyWord[] = [
  { word: 'welcome', definition: 'To greet someone arriving in a glad or friendly way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'weld', definition: 'To join together metal pieces or parts by heating the surfaces', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'whip', definition: 'To beat a person or animal with a whip or similar instrument', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'whisper', definition: 'To speak very softly using one\'s breath without one\'s vocal cords', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'widen', definition: 'To make or become wider', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wield', definition: 'To hold and use a weapon or tool', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'win', definition: 'To be successful or victorious in a contest or conflict', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wind', definition: 'To cause to have difficulty breathing because of exertion', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wipe', definition: 'To clean or dry something by rubbing its surface with a cloth', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wire', definition: 'To install electric circuits or wires in', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wish', definition: 'To feel or express a strong desire or hope for something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'withdraw', definition: 'To remove or take away something from a particular place or position', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wither', definition: 'To become dry and shriveled', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'withhold', definition: 'To refuse to give something that is due to or is desired by another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'withstand', definition: 'To remain undamaged or unaffected by or resist', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'witness', definition: 'To see an event typically a crime or accident take place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wonder', definition: 'To desire or be curious to know something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'work', definition: 'To be engaged in physical or mental activity in order to achieve a purpose', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'worry', definition: 'To give way to anxiety or unease or allow one\'s mind to dwell on difficulty', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'worsen', definition: 'To make or become worse', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'worship', definition: 'To show reverence and adoration for a deity', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wound', definition: 'To inflict an injury on', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wrap', definition: 'To cover or enclose someone or something in paper or soft material', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wreck', definition: 'To cause the destruction of a ship by sinking or breaking up', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wrestle', definition: 'To take part in a fight either as a sport or in earnest', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wring', definition: 'To squeeze and twist something to force liquid from it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'write', definition: 'To mark letters or words or other symbols on a surface', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'yell', definition: 'To shout in a loud or sharp way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'yield', definition: 'To produce or provide a natural or agricultural product', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'zone', definition: 'To divide into or assign to zones', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Adjectives - Part 1
const ADVANCED_ADJECTIVES_1: VocabularyWord[] = [
  { word: 'abrupt', definition: 'Sudden and unexpected', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'abstract', definition: 'Existing in thought or as an idea but not having a physical existence', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'abundant', definition: 'Existing or available in large quantities or plentiful', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accessible', definition: 'Able to be reached or entered', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accurate', definition: 'Correct in all details or exact', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'acute', definition: 'Present or experienced to a severe or intense degree', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adequate', definition: 'Satisfactory or acceptable in quality or quantity', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adjacent', definition: 'Next to or adjoining something else', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adverse', definition: 'Preventing success or development or harmful or unfavorable', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'aesthetic', definition: 'Concerned with beauty or the appreciation of beauty', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'affluent', definition: 'Having a great deal of money or wealthy', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'aggregate', definition: 'Formed or calculated by the combination of many separate units', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'alleged', definition: 'Said without proof to have taken place or to have a specified quality', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ambiguous', definition: 'Open to more than one interpretation or having a double meaning', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ambitious', definition: 'Having or showing a strong desire and determination to succeed', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ample', definition: 'Enough or more than enough or plentiful', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'analogous', definition: 'Comparable in certain respects typically in a way that makes clearer', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'anonymous', definition: 'Not identified by name or of unknown name', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'apparent', definition: 'Clearly visible or understood or obvious', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'applicable', definition: 'Relevant or appropriate', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'arbitrary', definition: 'Based on random choice or personal whim rather than any reason', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'authentic', definition: 'Of undisputed origin or genuine', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'autonomous', definition: 'Having the freedom to govern itself or control its own affairs', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'beneficial', definition: 'Favorable or advantageous or resulting in good', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'biased', definition: 'Unfairly prejudiced for or against someone or something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'brief', definition: 'Of short duration', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'broad', definition: 'Having an extent from side to side or wide', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'capable', definition: 'Having the ability or qualities necessary to do or achieve something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'chronic', definition: 'Persisting for a long time or constantly recurring', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'civil', definition: 'Of or relating to ordinary citizens and their concerns', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'classical', definition: 'Of or relating to ancient Greek or Latin literature or art', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'coherent', definition: 'Logical and consistent', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'collective', definition: 'Done by people acting as a group', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'compatible', definition: 'Able to exist or occur together without conflict', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'competent', definition: 'Having the necessary ability or knowledge or skill to do something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'complex', definition: 'Consisting of many different and connected parts', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'comprehensive', definition: 'Complete or including all or nearly all elements or aspects', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'compulsory', definition: 'Required by law or a rule or obligatory', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conceivable', definition: 'Capable of being imagined or grasped mentally', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'concurrent', definition: 'Existing or happening or done at the same time', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conducive', definition: 'Making a certain situation or outcome likely or possible', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'confidential', definition: 'Intended to be kept secret', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consecutive', definition: 'Following continuously', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'considerable', definition: 'Notably large in size or amount or extent or degree', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consistent', definition: 'Acting or done in the same way over time especially to be fair', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'constant', definition: 'Occurring continuously over a period of time', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'constitutional', definition: 'Of or relating to an established set of principles governing a state', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contemporary', definition: 'Living or occurring at the same time', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contextual', definition: 'Depending on or relating to the circumstances that form the setting', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contrary', definition: 'Opposite in nature or direction or meaning', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'controversial', definition: 'Giving rise or likely to give rise to public disagreement', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conventional', definition: 'Based on or in accordance with what is generally done or believed', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cooperative', definition: 'Involving mutual assistance in working toward a common goal', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'corporate', definition: 'Of or relating to a corporation especially a large company', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'corresponding', definition: 'Analogous or equivalent in character or form or function', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'credible', definition: 'Able to be believed or convincing', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'critical', definition: 'Expressing adverse or disapproving comments or judgments', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'crucial', definition: 'Of great importance especially in the success or failure of something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cumulative', definition: 'Increasing or increased in quantity or degree by successive additions', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'decisive', definition: 'Settling an issue or producing a definite result', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch25(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_VERBS_20, ...ADVANCED_VERBS_21, ...ADVANCED_ADJECTIVES_1];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 25: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 25 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 25');
  console.log('Advanced Academic Verbs Parts 20-21 & Adjectives Part 1');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch25(supabase);
  
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
