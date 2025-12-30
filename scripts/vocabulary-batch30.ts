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

// Advanced Academic Nouns - Part 2
const ADVANCED_NOUNS_2: VocabularyWord[] = [
  { word: 'attraction', definition: 'The action or power of evoking interest or pleasure or liking for someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'attribute', definition: 'A quality or feature regarded as a characteristic or inherent part of someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'audience', definition: 'The assembled spectators or listeners at a public event such as a play or concert', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'authority', definition: 'The power or right to give orders or make decisions or enforce obedience', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'authorization', definition: 'The action or fact of authorizing or being authorized', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'autonomy', definition: 'The right or condition of self-government especially in a particular sphere', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'availability', definition: 'The quality of being able to be used or obtained', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'awareness', definition: 'Knowledge or perception of a situation or fact', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'background', definition: 'The area or scenery behind the main object of contemplation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'balance', definition: 'An even distribution of weight enabling someone or something to remain upright', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'barrier', definition: 'A fence or other obstacle that prevents movement or access', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'basis', definition: 'The underlying support or foundation for an idea or argument or process', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'behavior', definition: 'The way in which one acts or conducts oneself especially toward others', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'belief', definition: 'An acceptance that a statement is true or that something exists', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'benchmark', definition: 'A standard or point of reference against which things may be compared or assessed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'beneficiary', definition: 'A person who derives advantage from something especially a trust or will or insurance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'benefit', definition: 'An advantage or profit gained from something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bias', definition: 'Prejudice in favor of or against one thing or person or group compared with another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bond', definition: 'A thing used to tie something or to fasten things together', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'boom', definition: 'A period of great prosperity or rapid economic growth', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'boundary', definition: 'A line that marks the limits of an area or a dividing line', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'breakthrough', definition: 'A sudden or dramatic and important discovery or development', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'budget', definition: 'An estimate of income and expenditure for a set period of time', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bulk', definition: 'The mass or magnitude of something large', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'burden', definition: 'A load typically a heavy one', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bureaucracy', definition: 'A system of government in which most of the important decisions are made by officials', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'calculation', definition: 'A mathematical determination of the size or number of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'campaign', definition: 'An organized course of action to achieve a particular goal', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'candidate', definition: 'A person who applies for a job or is nominated for election', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'capability', definition: 'The power or ability to do something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'capacity', definition: 'The maximum amount that something can contain', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'capital', definition: 'Wealth in the form of money or other assets owned by a person or organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'capitalism', definition: 'An economic and political system in which a country\'s trade and industry are controlled', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'capture', definition: 'The action of capturing or of being captured', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'career', definition: 'An occupation undertaken for a significant period of a person\'s life', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'catalyst', definition: 'A substance that increases the rate of a chemical reaction without itself undergoing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'category', definition: 'A class or division of people or things regarded as having particular shared characteristics', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'caution', definition: 'Care taken to avoid danger or mistakes', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'celebration', definition: 'The action of marking one\'s pleasure at an important event or occasion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'census', definition: 'An official count or survey of a population typically recording various details', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'certainty', definition: 'Firm conviction that something is the case', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'certification', definition: 'The action or process of providing someone or something with an official document', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'challenge', definition: 'A call to take part in a contest or competition especially a duel', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'chaos', definition: 'Complete disorder and confusion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'characteristic', definition: 'A feature or quality belonging typically to a person or place or thing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'charity', definition: 'The voluntary giving of help typically in the form of money to those in need', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'chart', definition: 'A sheet of information in the form of a table or graph or diagram', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'circumstance', definition: 'A fact or condition connected with or relevant to an event or action', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'citation', definition: 'A quotation from or reference to a book or paper or author', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'citizen', definition: 'A legally recognized subject or national of a state or commonwealth', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'civilization', definition: 'The stage of human social and cultural development and organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'claim', definition: 'An assertion of the truth of something typically one that is disputed or in doubt', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'clarification', definition: 'The action of making a statement or situation less confused and more comprehensible', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'clarity', definition: 'The quality of being clear in particular', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'classification', definition: 'The action or process of classifying something according to shared qualities', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'clause', definition: 'A unit of grammatical organization next below the sentence in rank', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'client', definition: 'A person or organization using the services of a lawyer or other professional person', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'climate', definition: 'The weather conditions prevailing in an area in general or over a long period', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'coalition', definition: 'An alliance for combined action especially a temporary alliance of political parties', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'code', definition: 'A system of words or letters or figures or other symbols substituted for other words', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'coherence', definition: 'The quality of being logical and consistent', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'coincidence', definition: 'A remarkable concurrence of events or circumstances without apparent causal connection', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'collaboration', definition: 'The action of working with someone to produce or create something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'collapse', definition: 'An instance of a structure falling down or in', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'colleague', definition: 'A person with whom one works especially in a profession or business', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'collection', definition: 'The action or process of collecting someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'colony', definition: 'A country or area under the full or partial political control of another country', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'combination', definition: 'A joining or merging of different parts or qualities in which the component elements', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'comfort', definition: 'A state of physical ease and freedom from pain or constraint', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'command', definition: 'An authoritative order', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'commentary', definition: 'An expression of opinions or offering of explanations about an event or situation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'commerce', definition: 'The activity of buying and selling especially on a large scale', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'commission', definition: 'An instruction or command or duty or task committed to a person or group', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'commitment', definition: 'The state or quality of being dedicated to a cause or activity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'commodity', definition: 'A raw material or primary agricultural product that can be bought and sold', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'communication', definition: 'The imparting or exchanging of information or news', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'community', definition: 'A group of people living in the same place or having a particular characteristic in common', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'companion', definition: 'A person or animal with whom one spends a lot of time or with whom one travels', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'comparison', definition: 'A consideration or estimate of the similarities or dissimilarities between two things', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'compensation', definition: 'Something typically money awarded to someone as a recompense for loss or injury', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'competence', definition: 'The ability to do something successfully or efficiently', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'competition', definition: 'The activity or condition of competing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'competitor', definition: 'A person who takes part in an athletic contest', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'compilation', definition: 'The action or process of producing something especially a list or book', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'complaint', definition: 'A statement that a situation is unsatisfactory or unacceptable', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'complement', definition: 'A thing that completes or brings to perfection', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'completion', definition: 'The action or process of finishing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'complexity', definition: 'The state or quality of being intricate or complicated', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'compliance', definition: 'The action or fact of complying with a wish or command', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'complication', definition: 'A circumstance that complicates something or a difficulty', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'component', definition: 'A part or element of a larger whole especially a part of a machine or vehicle', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'composition', definition: 'The nature of something\'s ingredients or constituents or the way in which a whole', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'comprehension', definition: 'The action or capability of understanding something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'compromise', definition: 'An agreement or a settlement of a dispute that is reached by each side making concessions', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'concentration', definition: 'The action or power of focusing one\'s attention or mental effort', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'concept', definition: 'An abstract idea or a general notion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conception', definition: 'The action of conceiving a child or of a child being conceived', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'concern', definition: 'Anxiety or worry', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Nouns - Part 3
const ADVANCED_NOUNS_3: VocabularyWord[] = [
  { word: 'conclusion', definition: 'The end or finish of an event or process', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'condition', definition: 'The state of something with regard to its appearance or quality or working order', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conduct', definition: 'The manner in which a person behaves especially on a particular occasion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conference', definition: 'A formal meeting for discussion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'confession', definition: 'A formal statement admitting that one is guilty of a crime', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'confidence', definition: 'The feeling or belief that one can rely on someone or something or firm trust', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'configuration', definition: 'An arrangement of elements in a particular form or figure or combination', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'confirmation', definition: 'The action of confirming something or the state of being confirmed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conflict', definition: 'A serious disagreement or argument typically a protracted one', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conformity', definition: 'Compliance with standards or rules or laws', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'confrontation', definition: 'A hostile or argumentative meeting or situation between opposing parties', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'confusion', definition: 'Lack of understanding or uncertainty', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'congregation', definition: 'A group of people assembled for religious worship', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conjunction', definition: 'A word used to connect clauses or sentences or to coordinate words', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'connection', definition: 'A relationship in which a person or thing or idea is linked or associated with something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conscience', definition: 'An inner feeling or voice viewed as acting as a guide to the rightness or wrongness', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consciousness', definition: 'The state of being awake and aware of one\'s surroundings', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consensus', definition: 'General agreement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consent', definition: 'Permission for something to happen or agreement to do something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consequence', definition: 'A result or effect of an action or condition', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conservation', definition: 'The action of conserving something in particular', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consideration', definition: 'Careful thought typically over a period of time', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consistency', definition: 'Conformity in the application of something typically that which is necessary', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consolidation', definition: 'The action or process of making something stronger or more solid', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conspiracy', definition: 'A secret plan by a group to do something unlawful or harmful', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'constant', definition: 'A situation or state of affairs that does not change', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'constitution', definition: 'A body of fundamental principles or established precedents according to which a state', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'constraint', definition: 'A limitation or restriction', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'construction', definition: 'The building of something typically a large structure', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consultation', definition: 'The action or process of formally consulting or discussing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consumer', definition: 'A person who purchases goods and services for personal use', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consumption', definition: 'The using up of a resource', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contact', definition: 'The state or condition of physical touching', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contamination', definition: 'The action or state of making or being made impure by polluting or poisoning', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contemplation', definition: 'The action of looking thoughtfully at something for a long time', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'content', definition: 'The things that are held or included in something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'context', definition: 'The circumstances that form the setting for an event or statement or idea', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'continent', definition: 'Any of the world\'s main continuous expanses of land', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contingency', definition: 'A future event or circumstance that is possible but cannot be predicted with certainty', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'continuity', definition: 'The unbroken and consistent existence or operation of something over a period of time', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contract', definition: 'A written or spoken agreement especially one concerning employment or sales', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contradiction', definition: 'A combination of statements or ideas or features of a situation that are opposed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contrast', definition: 'The state of being strikingly different from something else typically something in juxtaposition', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contribution', definition: 'A gift or payment to a common fund or collection', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'control', definition: 'The power to influence or direct people\'s behavior or the course of events', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'controversy', definition: 'Disagreement typically when prolonged or public or heated', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'convention', definition: 'A way in which something is usually done especially within a particular area or activity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conversation', definition: 'A talk especially an informal one between two or more people', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conversion', definition: 'The process of changing or causing something to change from one form to another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conviction', definition: 'A formal declaration that someone is guilty of a criminal offense', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cooperation', definition: 'The process of working together to the same end', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'coordination', definition: 'The organization of the different elements of a complex body or activity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'core', definition: 'The central or most important part of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'corporation', definition: 'A company or group of people authorized to act as a single entity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'correlation', definition: 'A mutual relationship or connection between two or more things', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'correspondence', definition: 'A close similarity or connection or equivalence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'corruption', definition: 'Dishonest or fraudulent conduct by those in power typically involving bribery', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cost', definition: 'An amount that has to be paid or spent to buy or obtain something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'council', definition: 'An advisory or deliberative or administrative body of people formally constituted', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'counterpart', definition: 'A person or thing holding a position or performing a function that corresponds', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'country', definition: 'A nation with its own government occupying a particular territory', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'coup', definition: 'A sudden and decisive action in politics especially one resulting in a change of government', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'courage', definition: 'The ability to do something that frightens one', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'course', definition: 'The route or direction followed by a ship or aircraft or road or river', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'court', definition: 'A tribunal presided over by a judge or judges or a magistrate in civil and criminal cases', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'coverage', definition: 'The extent to which something deals with or applies to something else', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'craft', definition: 'An activity involving skill in making things by hand', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'creation', definition: 'The action or process of bringing something into existence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'creativity', definition: 'The use of the imagination or original ideas especially in the production of an artistic work', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'creature', definition: 'An animal as distinct from a human being', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'credibility', definition: 'The quality of being trusted and believed in', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'credit', definition: 'The ability of a customer to obtain goods or services before payment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'crime', definition: 'An action or omission that constitutes an offense that may be prosecuted by the state', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'crisis', definition: 'A time of intense difficulty or trouble or danger', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'criterion', definition: 'A principle or standard by which something may be judged or decided', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'critic', definition: 'A person who expresses an unfavorable opinion of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'criticism', definition: 'The expression of disapproval of someone or something based on perceived faults', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'critique', definition: 'A detailed analysis and assessment of something especially a literary or artistic work', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'crop', definition: 'A cultivated plant that is grown as food especially a grain or fruit or vegetable', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'crowd', definition: 'A large number of people gathered together in a disorganized or unruly way', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'culture', definition: 'The arts and other manifestations of human intellectual achievement regarded collectively', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'curiosity', definition: 'A strong desire to know or learn something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'currency', definition: 'A system of money in general use in a particular country', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'curriculum', definition: 'The subjects comprising a course of study in a school or college', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'custom', definition: 'A traditional and widely accepted way of behaving or doing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'customer', definition: 'A person or organization that buys goods or services from a store or business', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cycle', definition: 'A series of events that are regularly repeated in the same order', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch30(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_NOUNS_2, ...ADVANCED_NOUNS_3];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 30: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 30 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 30');
  console.log('Advanced Academic Nouns - Parts 2 & 3');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch30(supabase);
  
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
