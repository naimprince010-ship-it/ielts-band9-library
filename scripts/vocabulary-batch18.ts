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

// Advanced Academic Verbs - Part 6
const ADVANCED_VERBS_6: VocabularyWord[] = [
  { word: 'dilute', definition: 'To make a liquid thinner or weaker by adding water', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'diminish', definition: 'To make or become less', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'direct', definition: 'To control the operations of or manage or govern', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disable', definition: 'To limit someone in their movements or activities', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disagree', definition: 'To have or express a different opinion', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disappear', definition: 'To cease to be visible', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disappoint', definition: 'To fail to fulfill the hopes or expectations of someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disapprove', definition: 'To have or express an unfavorable opinion about something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disarm', definition: 'To take a weapon or weapons away from a person or force', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'discard', definition: 'To get rid of something as no longer useful or desirable', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'discern', definition: 'To perceive or recognize something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'discharge', definition: 'To tell someone officially that they can or must leave', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'discipline', definition: 'To train someone to obey rules or a code of behavior', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disclaim', definition: 'To refuse to acknowledge or deny responsibility for', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disclose', definition: 'To make secret or new information known', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disconnect', definition: 'To break the connection of or between', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'discount', definition: 'To deduct an amount from the usual price of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'discourage', definition: 'To cause someone to lose confidence or enthusiasm', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'discover', definition: 'To find something unexpectedly or in the course of a search', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'discredit', definition: 'To harm the good reputation of someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'discriminate', definition: 'To recognize a distinction or differentiate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'discuss', definition: 'To talk about something with another person or group', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disdain', definition: 'To consider to be unworthy of one\'s consideration', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disguise', definition: 'To give someone or oneself a different appearance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disgust', definition: 'To cause someone to feel revulsion or profound disapproval', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disillusion', definition: 'To cause someone to realize that a belief is false', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disintegrate', definition: 'To break up into small parts as the result of impact', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dislike', definition: 'To feel distaste for or hostility toward', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dislocate', definition: 'To disturb the normal arrangement or position of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dislodge', definition: 'To knock or force out of position', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dismantle', definition: 'To take a machine or structure to pieces', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dismay', definition: 'To cause someone to feel consternation and distress', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dismiss', definition: 'To order or allow to leave or send away', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disobey', definition: 'To fail to obey rules or someone in authority', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dispatch', definition: 'To send off to a destination or for a purpose', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dispel', definition: 'To make a doubt or feeling disappear', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dispense', definition: 'To distribute or provide a service or information', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disperse', definition: 'To distribute or spread over a wide area', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'displace', definition: 'To take over the place or position of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'display', definition: 'To make a prominent exhibition of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'displease', definition: 'To make someone feel annoyed or upset', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dispose', definition: 'To get rid of by throwing away or giving or selling', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disprove', definition: 'To prove that something is false', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dispute', definition: 'To argue about something or disagree with', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disqualify', definition: 'To declare someone ineligible for an office or activity', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disregard', definition: 'To pay no attention to or ignore', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disrupt', definition: 'To interrupt an event or activity by causing a disturbance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dissect', definition: 'To methodically cut up a body or plant to study its parts', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disseminate', definition: 'To spread something especially information widely', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dissent', definition: 'To hold or express opinions that are at variance with official', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dissipate', definition: 'To disperse or scatter', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dissolve', definition: 'To become or cause to become incorporated into a liquid', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dissuade', definition: 'To persuade someone not to take a particular course of action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'distance', definition: 'To make someone or something far off or remote', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'distill', definition: 'To purify a liquid by vaporizing then condensing it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'distinguish', definition: 'To recognize or treat someone or something as different', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'distort', definition: 'To pull or twist out of shape', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'distract', definition: 'To prevent someone from giving full attention to something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'distribute', definition: 'To give shares of something or deal out', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'disturb', definition: 'To interfere with the normal arrangement or functioning of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'diverge', definition: 'To separate from another route and go in a different direction', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'diversify', definition: 'To make or become more diverse or varied', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'divert', definition: 'To cause someone or something to change course or direction', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'divide', definition: 'To separate or be separated into parts', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'divorce', definition: 'To legally dissolve one\'s marriage with someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'divulge', definition: 'To make known private or sensitive information', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'document', definition: 'To record something in written or other form', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dodge', definition: 'To avoid something by a sudden quick movement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dominate', definition: 'To have a commanding influence on or exercise control over', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'donate', definition: 'To give money or goods for a good cause', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'doom', definition: 'To condemn to certain destruction or death', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'double', definition: 'To become twice as much or as many', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'doubt', definition: 'To feel uncertain about', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'download', definition: 'To copy data from one computer system to another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'draft', definition: 'To prepare a preliminary version of a text', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'drag', definition: 'To pull someone or something along forcefully', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'drain', definition: 'To cause the water or other liquid in something to run out', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dramatize', definition: 'To adapt a novel or actual event for presentation as a play', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'draw', definition: 'To produce a picture or diagram by making lines and marks', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dread', definition: 'To anticipate with great apprehension or fear', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dream', definition: 'To experience dreams during sleep', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dress', definition: 'To put on one\'s clothes', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'drift', definition: 'To be carried slowly by a current of air or water', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'drill', definition: 'To produce a hole in something by boring with a drill', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'drink', definition: 'To take a liquid into the mouth and swallow', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'drive', definition: 'To operate and control the direction and speed of a vehicle', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'drop', definition: 'To let or make something fall vertically', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'drown', definition: 'To die through submersion in and inhalation of water', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dry', definition: 'To become dry', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dump', definition: 'To deposit or dispose of garbage or waste material', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'duplicate', definition: 'To make or be an exact copy of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dwell', definition: 'To live in or at a specified place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dwindle', definition: 'To diminish gradually in size or amount', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Verbs - Part 7
const ADVANCED_VERBS_7: VocabularyWord[] = [
  { word: 'earn', definition: 'To obtain money in return for labor or services', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ease', definition: 'To make something less serious or severe', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'eat', definition: 'To put food into the mouth and chew and swallow it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'echo', definition: 'To repeat a sound or statement in agreement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'eclipse', definition: 'To deprive someone or something of significance or power', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'economize', definition: 'To spend less or reduce one\'s expenses', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'edit', definition: 'To prepare written material for publication by correcting', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'educate', definition: 'To give intellectual or moral instruction to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'effect', definition: 'To cause something to happen or bring about', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'elaborate', definition: 'To develop or present a theory or policy in detail', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'elapse', definition: 'To pass or go by of time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'elect', definition: 'To choose someone to hold public office by voting', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'electrify', definition: 'To charge with electricity or pass an electric current through', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'elevate', definition: 'To raise or lift something up to a higher position', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'elicit', definition: 'To evoke or draw out a response or reaction from someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'eliminate', definition: 'To completely remove or get rid of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'elucidate', definition: 'To make something clear or explain', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'elude', definition: 'To evade or escape from a danger or enemy', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'emanate', definition: 'To issue or spread out from a source', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'emancipate', definition: 'To set free especially from legal or political restrictions', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'embark', definition: 'To go on board a ship or aircraft', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'embarrass', definition: 'To cause someone to feel awkward or ashamed', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'embed', definition: 'To fix an object firmly and deeply in a surrounding mass', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'embody', definition: 'To give a body to a spirit or be an expression of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'embrace', definition: 'To hold someone closely in one\'s arms', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'emerge', definition: 'To move out of or away from something and come into view', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'emigrate', definition: 'To leave one\'s own country to settle permanently in another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'emit', definition: 'To produce and discharge something especially gas or radiation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'emphasize', definition: 'To give special importance or prominence to something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'employ', definition: 'To give work to someone and pay them for it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'empower', definition: 'To give someone the authority or power to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'empty', definition: 'To remove all the contents of a container', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'emulate', definition: 'To match or surpass a person or achievement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enable', definition: 'To give someone or something the authority or means to do', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enact', definition: 'To make a bill or other proposal law', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'encounter', definition: 'To unexpectedly experience or be faced with something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'encourage', definition: 'To give support or confidence or hope to someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'encroach', definition: 'To advance beyond proper or former limits', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'endanger', definition: 'To put someone or something at risk or in danger', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'endeavor', definition: 'To try hard to do or achieve something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'endorse', definition: 'To declare one\'s public approval or support of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'endow', definition: 'To give or bequeath an income or property to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'endure', definition: 'To suffer something painful or difficult patiently', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enforce', definition: 'To compel observance of or compliance with a law or rule', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'engage', definition: 'To occupy or attract someone\'s interest or attention', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'engender', definition: 'To cause or give rise to a feeling or situation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'engineer', definition: 'To design and build a machine or structure', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'engrave', definition: 'To cut or carve a text or design on a hard surface', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'engulf', definition: 'To sweep over something so as to surround or cover it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enhance', definition: 'To intensify or increase or further improve the quality of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enjoy', definition: 'To take delight or pleasure in an activity or occasion', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enlarge', definition: 'To make or become bigger or more extensive', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enlighten', definition: 'To give someone greater knowledge and understanding', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enlist', definition: 'To enroll or be enrolled in the armed services', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enrage', definition: 'To make someone very angry', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enrich', definition: 'To improve or enhance the quality or value of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enroll', definition: 'To officially register as a member of an institution', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ensue', definition: 'To happen or occur afterward or as a result', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ensure', definition: 'To make certain that something shall occur or be the case', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'entail', definition: 'To involve something as a necessary or inevitable part', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enter', definition: 'To come or go into a place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'entertain', definition: 'To provide someone with amusement or enjoyment', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enthuse', definition: 'To express eager enjoyment or interest', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'entice', definition: 'To attract or tempt by offering pleasure or advantage', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'entitle', definition: 'To give someone a legal right or a just claim to receive', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'entrench', definition: 'To establish an attitude or habit so firmly that change is difficult', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'entrust', definition: 'To assign the responsibility for doing something to someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enumerate', definition: 'To mention a number of things one by one', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'envelop', definition: 'To wrap up or cover or surround completely', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'envisage', definition: 'To contemplate or conceive of as a possibility', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'envision', definition: 'To imagine as a future possibility or visualize', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'envy', definition: 'To desire to have a quality or possession of another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'epitomize', definition: 'To be a perfect example of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'equal', definition: 'To be the same as in quantity or degree', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'equate', definition: 'To consider one thing to be the same as another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'equip', definition: 'To supply with the necessary items for a particular purpose', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'eradicate', definition: 'To destroy completely or put an end to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'erase', definition: 'To rub out or remove writing or marks', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'erect', definition: 'To construct a building or wall or other upright structure', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'erode', definition: 'To gradually wear away soil or rock or land', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'err', definition: 'To be mistaken or incorrect or make a mistake', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'erupt', definition: 'To become active and eject lava or ash', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'escalate', definition: 'To increase rapidly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'escape', definition: 'To break free from confinement or control', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'escort', definition: 'To accompany someone or something somewhere', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'espouse', definition: 'To adopt or support a cause or belief', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'establish', definition: 'To set up an organization or system on a permanent basis', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'estimate', definition: 'To roughly calculate or judge the value or amount of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'evacuate', definition: 'To remove someone from a place of danger to a safe place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'evade', definition: 'To escape or avoid especially by cleverness or trickery', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'evaluate', definition: 'To form an idea of the amount or value of or assess', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'evaporate', definition: 'To turn from liquid into vapor', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'evolve', definition: 'To develop gradually especially from a simple to complex form', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch18(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_VERBS_6, ...ADVANCED_VERBS_7];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 18: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 18 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 18');
  console.log('Advanced Academic Verbs - Parts 6 & 7');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch18(supabase);
  
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
