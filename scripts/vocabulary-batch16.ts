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

// Advanced Academic Verbs - Part 2
const ADVANCED_VERBS_2: VocabularyWord[] = [
  { word: 'appease', definition: 'To pacify or placate someone by acceding to their demands', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'append', definition: 'To add something as an attachment or supplement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'applaud', definition: 'To show approval or praise by clapping', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'apply', definition: 'To make a formal application or request', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'appoint', definition: 'To assign a job or role to someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'apportion', definition: 'To divide and allocate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'appraise', definition: 'To assess the value or quality of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'appreciate', definition: 'To recognize the full worth of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'apprehend', definition: 'To arrest someone for a crime', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'approach', definition: 'To come near or nearer to someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'appropriate', definition: 'To take something for one\'s own use without permission', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'approve', definition: 'To officially agree to or accept as satisfactory', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'approximate', definition: 'To come close or be similar to something in quality', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'arbitrate', definition: 'To reach an authoritative judgment or settlement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'argue', definition: 'To give reasons or cite evidence in support of an idea', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'arise', definition: 'To emerge or become apparent', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'arouse', definition: 'To evoke or awaken a feeling or response', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'arrange', definition: 'To put things in a neat or attractive order', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'arrest', definition: 'To seize someone by legal authority', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'articulate', definition: 'To express an idea or feeling fluently and coherently', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ascend', definition: 'To go up or climb', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ascertain', definition: 'To find something out for certain', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ascribe', definition: 'To attribute something to a cause', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'aspire', definition: 'To direct one\'s hopes or ambitions toward achieving something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assail', definition: 'To make a concerted or violent attack on', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assassinate', definition: 'To murder an important person for political or religious reasons', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assault', definition: 'To make a physical attack on', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assemble', definition: 'To come or bring together in one place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assent', definition: 'To express approval or agreement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assert', definition: 'To state a fact or belief confidently and forcefully', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assess', definition: 'To evaluate or estimate the nature or quality of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assign', definition: 'To allocate a job or duty', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assimilate', definition: 'To take in information or ideas and understand fully', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assist', definition: 'To help someone typically by doing a share of the work', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'associate', definition: 'To connect someone or something with something else', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assume', definition: 'To suppose to be the case without proof', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assure', definition: 'To tell someone something positively to dispel doubt', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'astonish', definition: 'To surprise or impress someone greatly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'attach', definition: 'To fasten or join one thing to another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'attack', definition: 'To take aggressive action against a place or enemy forces', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'attain', definition: 'To succeed in achieving something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'attempt', definition: 'To make an effort to achieve or complete something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'attend', definition: 'To be present at an event or meeting', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'attest', definition: 'To provide or serve as clear evidence of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'attract', definition: 'To cause to come to a place or participate in a venture', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'attribute', definition: 'To regard something as being caused by someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'audit', definition: 'To conduct an official financial examination of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'augment', definition: 'To make something greater by adding to it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'authenticate', definition: 'To prove or show something to be true or genuine', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'authorize', definition: 'To give official permission for or approval to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'automate', definition: 'To convert a process to be operated by automatic equipment', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'avenge', definition: 'To inflict harm in return for an injury or wrong', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'avert', definition: 'To turn away one\'s eyes or thoughts', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'avoid', definition: 'To keep away from or stop oneself from doing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'await', definition: 'To wait for an event', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'awaken', definition: 'To rouse from sleep or cause to stop sleeping', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'award', definition: 'To give or order the giving of something as an official payment', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'backfire', definition: 'To have the opposite effect to what was intended', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'balance', definition: 'To keep or put something in a steady position', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ban', definition: 'To officially or legally prohibit', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'banish', definition: 'To send someone away from a country as an official punishment', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bankrupt', definition: 'To reduce someone to bankruptcy', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bargain', definition: 'To negotiate the terms and conditions of a transaction', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'base', definition: 'To use something as the foundation for something else', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bear', definition: 'To carry the weight of or support', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'beat', definition: 'To strike a person or an animal repeatedly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'become', definition: 'To begin to be', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'befriend', definition: 'To act as a friend to someone by offering help', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'beg', definition: 'To ask someone earnestly or humbly for something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'begin', definition: 'To start or perform the first part of an action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'behave', definition: 'To act or conduct oneself in a specified way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'believe', definition: 'To accept something as true or feel sure of the truth', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'belong', definition: 'To be the property of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bend', definition: 'To shape or force something straight into a curve', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'benefit', definition: 'To receive an advantage or profit', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bequeath', definition: 'To leave property to a person by a will', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'beseech', definition: 'To ask someone urgently and fervently to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bestow', definition: 'To confer or present an honor or gift', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'betray', definition: 'To be disloyal to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bewilder', definition: 'To cause someone to become perplexed and confused', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bid', definition: 'To offer a certain price for something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bind', definition: 'To tie or fasten something tightly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'blame', definition: 'To assign responsibility for a fault or wrong', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'blast', definition: 'To blow up or break apart something solid with explosives', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'blend', definition: 'To mix a substance with another substance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bless', definition: 'To invoke divine favor upon', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'block', definition: 'To make the movement or flow in a passage impossible', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bloom', definition: 'To produce flowers or be in flower', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'blow', definition: 'To move creating an air current', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'blur', definition: 'To make or become unclear or less distinct', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'boast', definition: 'To talk with excessive pride and self-satisfaction', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'boil', definition: 'To reach or cause to reach the temperature at which it bubbles', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bolster', definition: 'To support or strengthen or prop up', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bombard', definition: 'To attack a place continuously with bombs or other missiles', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bond', definition: 'To join or be joined securely to something else', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'boost', definition: 'To help or encourage something to increase or improve', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'border', definition: 'To form an edge along or beside something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bore', definition: 'To make someone feel weary and uninterested', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'borrow', definition: 'To take and use something belonging to someone else', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Verbs - Part 3
const ADVANCED_VERBS_3: VocabularyWord[] = [
  { word: 'bother', definition: 'To take the trouble to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bounce', definition: 'To move quickly up away from a surface after hitting it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bound', definition: 'To walk or run with leaping strides', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'boycott', definition: 'To withdraw from commercial or social relations as a protest', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'brace', definition: 'To prepare oneself for something difficult or unpleasant', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'branch', definition: 'To divide into one or more subdivisions', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'breach', definition: 'To make a gap in and break through a wall or barrier', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'break', definition: 'To separate or cause to separate into pieces', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'breathe', definition: 'To take air into the lungs and then expel it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'breed', definition: 'To cause an animal to produce offspring', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bribe', definition: 'To persuade someone to act in one\'s favor by a gift of money', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bridge', definition: 'To be or make a bridge over something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'brighten', definition: 'To make or become more light', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bring', definition: 'To come to a place with someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'broadcast', definition: 'To transmit a program or some information by radio or television', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'broaden', definition: 'To make or become larger in distance from side to side', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'browse', definition: 'To survey objects casually especially goods for sale', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bruise', definition: 'To inflict an injury on someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'budget', definition: 'To allow or provide a particular amount of money in a budget', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'build', definition: 'To construct something by putting parts or material together', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'burden', definition: 'To load heavily', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'burn', definition: 'To be or cause to be destroyed by fire', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'burst', definition: 'To break open or apart suddenly and violently', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bury', definition: 'To put or hide underground', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'buttress', definition: 'To increase the strength of or justification for', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'calculate', definition: 'To determine the amount or number of something mathematically', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'calibrate', definition: 'To mark an instrument with a standard scale of readings', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'call', definition: 'To cry out to someone in order to summon them', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'calm', definition: 'To make someone tranquil and quiet or soothe', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'campaign', definition: 'To work in an organized and active way toward a particular goal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cancel', definition: 'To decide or announce that a planned event will not take place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'capitalize', definition: 'To take the chance to gain advantage from', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'captivate', definition: 'To attract and hold the attention or interest of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'capture', definition: 'To take into one\'s possession or control by force', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'care', definition: 'To feel concern or interest or attach importance to something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'carry', definition: 'To support and move someone or something from one place to another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'carve', definition: 'To cut a hard material in order to produce an object', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cast', definition: 'To cause light or shadow to appear on a surface', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'catalog', definition: 'To make a systematic list of items', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'categorize', definition: 'To place in a particular class or group', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cater', definition: 'To provide food and drink at a social event', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cause', definition: 'To make something happen', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'caution', definition: 'To warn or advise someone against something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cease', definition: 'To come or bring to an end', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cede', definition: 'To give up power or territory', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'celebrate', definition: 'To acknowledge a significant or happy day or event', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cement', definition: 'To fix with cement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'censor', definition: 'To examine and suppress unacceptable parts of a book or film', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'censure', definition: 'To express severe disapproval of someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'centralize', definition: 'To concentrate control of an activity under a single authority', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'certify', definition: 'To attest or confirm in a formal statement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'challenge', definition: 'To dispute the truth or validity of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'champion', definition: 'To support the cause of or defend', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'change', definition: 'To make or become different', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'channel', definition: 'To direct toward a particular end or object', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'characterize', definition: 'To describe the distinctive nature or features of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'charge', definition: 'To demand a price from someone for a service or goods', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'charm', definition: 'To delight greatly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'chart', definition: 'To make a map of an area', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'chase', definition: 'To pursue in order to catch or catch up with', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'check', definition: 'To examine something in order to determine its accuracy', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cherish', definition: 'To protect and care for someone lovingly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'choke', definition: 'To have severe difficulty in breathing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'choose', definition: 'To pick out or select someone or something as being the best', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'chronicle', definition: 'To record a related series of events in a factual way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'circulate', definition: 'To move or cause to move continuously through a closed system', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'circumscribe', definition: 'To restrict something within limits', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'circumvent', definition: 'To find a way around an obstacle', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cite', definition: 'To quote a passage or book as evidence for an argument', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'claim', definition: 'To state or assert that something is the case', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'clarify', definition: 'To make a statement or situation less confused', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'clash', definition: 'To come into conflict or be at variance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'classify', definition: 'To arrange a group in classes or categories', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cleanse', definition: 'To make something thoroughly clean', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'clear', definition: 'To remove an obstruction or unwanted item from', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'climb', definition: 'To go or come up a slope or incline', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cling', definition: 'To hold on tightly to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'close', definition: 'To move so as to cover an opening', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'clothe', definition: 'To put clothes on oneself or someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cluster', definition: 'To form a cluster or be gathered in a cluster', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'coach', definition: 'To train or instruct a team or player', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'coalesce', definition: 'To come together and form one mass or whole', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'coerce', definition: 'To persuade an unwilling person to do something by using force', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'coexist', definition: 'To exist at the same time or in the same place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'coincide', definition: 'To occur at or during the same time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'collaborate', definition: 'To work jointly on an activity especially to produce something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'collapse', definition: 'To fall down or in suddenly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'collate', definition: 'To collect and combine texts or information', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'collect', definition: 'To bring or gather together things', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'collide', definition: 'To hit with force when moving', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'colonize', definition: 'To send a group of settlers to a place and establish control', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'combat', definition: 'To take action to reduce or destroy', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'combine', definition: 'To unite or merge for a common purpose', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'comfort', definition: 'To ease the grief or distress of or console', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'command', definition: 'To give an authoritative order', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'commemorate', definition: 'To recall and show respect for someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'commence', definition: 'To begin or be begun', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'commend', definition: 'To praise formally or officially', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'comment', definition: 'To express an opinion or reaction in speech or writing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch16(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_VERBS_2, ...ADVANCED_VERBS_3];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 16: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 16 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 16');
  console.log('Advanced Academic Verbs - Parts 2 & 3');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch16(supabase);
  
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
