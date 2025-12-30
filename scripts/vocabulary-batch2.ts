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

// AWL Sublists 8-10 and NAWL Words
const AWL_NAWL_WORDS: VocabularyWord[] = [
  // Sublist 8
  { word: 'abandon', definition: 'To give up completely', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accompany', definition: 'To go somewhere with someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accumulate', definition: 'To gather together or acquire', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ambiguous', definition: 'Open to more than one interpretation', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'appendix', definition: 'A section at the end of a book with additional information', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'appreciate', definition: 'To recognize the full worth of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'arbitrary', definition: 'Based on random choice rather than reason', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'automate', definition: 'To convert to automatic operation', part_of_speech: 'verb', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'bias', definition: 'Prejudice in favor of or against something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'chart', definition: 'A sheet of information in the form of a table or diagram', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'beginner' },
  { word: 'clarify', definition: 'To make a statement less confused', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'commodity', definition: 'A raw material or agricultural product that can be bought and sold', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'complement', definition: 'A thing that completes or brings to perfection', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conform', definition: 'To comply with rules, standards, or laws', part_of_speech: 'verb', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'contemporary', definition: 'Living or occurring at the same time', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'contradict', definition: 'To deny the truth of a statement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'crucial', definition: 'Of great importance', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'currency', definition: 'A system of money in general use', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'denote', definition: 'To be a sign of; indicate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'detect', definition: 'To discover or identify the presence of', part_of_speech: 'verb', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'deviate', definition: 'To depart from an established course', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'displace', definition: 'To take over the place or function of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'drama', definition: 'A play for theater, radio, or television', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'beginner' },
  { word: 'eventual', definition: 'Occurring at the end of a process', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'exhibit', definition: 'To publicly display', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'exploit', definition: 'To make full use of and derive benefit from', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fluctuate', definition: 'To rise and fall irregularly', part_of_speech: 'verb', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'guideline', definition: 'A general rule or piece of advice', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'highlight', definition: 'To pick out and emphasize', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'implicit', definition: 'Implied though not plainly expressed', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'induce', definition: 'To succeed in persuading or influencing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inevitable', definition: 'Certain to happen; unavoidable', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'infrastructure', definition: 'The basic physical systems of a country or organization', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'inherent', definition: 'Existing in something as a permanent characteristic', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'insight', definition: 'The capacity to gain accurate understanding', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inspect', definition: 'To look at something closely', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'intense', definition: 'Of extreme force, degree, or strength', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'manipulate', definition: 'To handle or control in a skillful manner', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'minimize', definition: 'To reduce to the smallest possible amount', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'nuclear', definition: 'Relating to the nucleus of an atom', part_of_speech: 'adjective', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'offset', definition: 'To counteract by having an opposing force', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'paragraph', definition: 'A distinct section of a piece of writing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'beginner' },
  { word: 'plus', definition: 'With the addition of', part_of_speech: 'preposition', topic: 'Academic', difficulty_level: 'beginner' },
  { word: 'practitioner', definition: 'A person actively engaged in a profession', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'predominant', definition: 'Present as the strongest or main element', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'prospect', definition: 'The possibility of some future event occurring', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'radical', definition: 'Relating to or affecting the fundamental nature', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'random', definition: 'Made or done without method or conscious decision', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reinforce', definition: 'To strengthen or support', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'restore', definition: 'To bring back to a former condition', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'revise', definition: 'To reconsider and alter in light of further evidence', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'schedule', definition: 'A plan for carrying out a process', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'tense', definition: 'Unable to relax because of nervousness', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'terminate', definition: 'To bring to an end', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'theme', definition: 'The subject of a talk, piece of writing, or exhibition', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'thereby', definition: 'By that means; as a result of that', part_of_speech: 'adverb', topic: 'Linking', difficulty_level: 'intermediate' },
  { word: 'uniform', definition: 'Not changing in form or character', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'vehicle', definition: 'A thing used for transporting people or goods', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'via', definition: 'Traveling through a place en route', part_of_speech: 'preposition', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'virtual', definition: 'Almost or nearly as described', part_of_speech: 'adjective', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'visual', definition: 'Relating to seeing or sight', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'widespread', definition: 'Found or distributed over a large area', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  // Sublist 9
  { word: 'accommodate', definition: 'To provide lodging or sufficient space for', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'analogy', definition: 'A comparison between two things', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'anticipate', definition: 'To regard as probable; expect', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'assure', definition: 'To tell someone something positively', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'attain', definition: 'To succeed in achieving', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'behalf', definition: 'In the interests of a person or group', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'bulk', definition: 'The mass or magnitude of something large', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'cease', definition: 'To come or bring to an end', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'coherent', definition: 'Logical and consistent', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'coincide', definition: 'To occur at the same time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'commence', definition: 'To begin', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'compatible', definition: 'Able to exist or work together', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'concurrent', definition: 'Existing or happening at the same time', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'confine', definition: 'To keep or restrict within certain limits', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'controversy', definition: 'Disagreement, typically prolonged and public', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'converse', definition: 'To engage in conversation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'device', definition: 'A thing made for a particular purpose', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'intermediate' },
  { word: 'devote', definition: 'To give all or most of one\'s time to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'diminish', definition: 'To make or become less', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'distort', definition: 'To pull or twist out of shape', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'duration', definition: 'The time during which something continues', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'erode', definition: 'To gradually wear away', part_of_speech: 'verb', topic: 'Environment', difficulty_level: 'intermediate' },
  { word: 'ethic', definition: 'A set of moral principles', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'format', definition: 'The way in which something is arranged', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'founded', definition: 'Having a basis in fact', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inherent', definition: 'Existing as a permanent characteristic', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'insight', definition: 'The capacity to gain understanding', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'integral', definition: 'Necessary to make a whole complete', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'intermediate', definition: 'Coming between two things in time or place', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'manual', definition: 'Relating to or done with the hands', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'mature', definition: 'Fully developed physically', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'mediate', definition: 'To intervene in a dispute to bring about agreement', part_of_speech: 'verb', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'medium', definition: 'An agency or means of doing something', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'military', definition: 'Relating to the armed forces', part_of_speech: 'adjective', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'minimal', definition: 'Of a minimum amount, quantity, or degree', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'mutual', definition: 'Experienced or done by each of two parties', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'norm', definition: 'Something that is usual or expected', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'overlap', definition: 'To extend over and cover a part of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'passive', definition: 'Accepting what happens without active response', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'portion', definition: 'A part of a whole', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'preliminary', definition: 'Denoting an action or event preceding the main one', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'protocol', definition: 'The official procedure or system of rules', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'qualitative', definition: 'Relating to the quality of something', part_of_speech: 'adjective', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'refine', definition: 'To remove impurities or unwanted elements', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'relax', definition: 'To make or become less tense', part_of_speech: 'verb', topic: 'Health', difficulty_level: 'beginner' },
  { word: 'restrain', definition: 'To prevent from doing something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'revolution', definition: 'A forcible overthrow of a government', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'rigid', definition: 'Unable to bend or be forced out of shape', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'route', definition: 'A way or course taken in getting from a starting point', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'scenario', definition: 'A written outline of a film or play', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sphere', definition: 'A round solid figure', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'subordinate', definition: 'Lower in rank or position', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'supplement', definition: 'Something added to complete a thing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'suspend', definition: 'To temporarily prevent from continuing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'team', definition: 'A group of people working together', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'beginner' },
  { word: 'temporary', definition: 'Lasting for only a limited period', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'trigger', definition: 'To cause an event or situation to happen', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'unify', definition: 'To make or become united', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'violate', definition: 'To break or fail to comply with a rule', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'vision', definition: 'The faculty or state of being able to see', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  // Sublist 10
  { word: 'adjacent', definition: 'Next to or adjoining something else', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'albeit', definition: 'Although', part_of_speech: 'conjunction', topic: 'Linking', difficulty_level: 'advanced' },
  { word: 'assemble', definition: 'To gather together in one place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'collapse', definition: 'To suddenly fall down or give way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'colleague', definition: 'A person with whom one works', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'compile', definition: 'To produce by assembling information', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conceive', definition: 'To form or devise a plan or idea', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'convince', definition: 'To cause someone to believe firmly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'depress', definition: 'To make someone feel utterly dispirited', part_of_speech: 'verb', topic: 'Health', difficulty_level: 'intermediate' },
  { word: 'encounter', definition: 'To unexpectedly experience or be faced with', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'enormous', definition: 'Very large in size, quantity, or extent', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'forthcoming', definition: 'About to happen or appear', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'incline', definition: 'To feel willing or favorably disposed toward', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'integrity', definition: 'The quality of being honest and having strong moral principles', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'intrinsic', definition: 'Belonging naturally; essential', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'invoke', definition: 'To cite or appeal to as an authority', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'levy', definition: 'To impose a tax, fee, or fine', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'likewise', definition: 'In the same way; also', part_of_speech: 'adverb', topic: 'Linking', difficulty_level: 'intermediate' },
  { word: 'nonetheless', definition: 'In spite of that; nevertheless', part_of_speech: 'adverb', topic: 'Linking', difficulty_level: 'intermediate' },
  { word: 'notwithstanding', definition: 'In spite of', part_of_speech: 'preposition', topic: 'Linking', difficulty_level: 'advanced' },
  { word: 'odd', definition: 'Different from what is usual or expected', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ongoing', definition: 'Continuing; still in progress', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'panel', definition: 'A flat board on which instruments are fixed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'persist', definition: 'To continue firmly in an opinion or course of action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'pose', definition: 'To present or constitute a problem or danger', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reluctance', definition: 'Unwillingness or disinclination to do something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'so-called', definition: 'Used to show that something is commonly designated by the name', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'straightforward', definition: 'Uncomplicated and easy to do or understand', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'undergo', definition: 'To experience or be subjected to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'whereby', definition: 'By which', part_of_speech: 'adverb', topic: 'Linking', difficulty_level: 'advanced' },
];

// Society and Culture Words
const SOCIETY_CULTURE: VocabularyWord[] = [
  { word: 'aboriginal', definition: 'Inhabiting or existing in a land from the earliest times', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'activism', definition: 'The policy or action of using vigorous campaigning', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'affirmative', definition: 'Agreeing with or consenting to a statement', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'alienation', definition: 'The state of being isolated from a group', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'assimilation', definition: 'The process of taking in and fully understanding information', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'autonomy', definition: 'The right or condition of self-government', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'advanced' },
  { word: 'bourgeois', definition: 'Of or characteristic of the middle class', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'advanced' },
  { word: 'bureaucracy', definition: 'A system of government with many departments', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'capitalism', definition: 'An economic system based on private ownership', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'census', definition: 'An official count of a population', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'civilization', definition: 'The stage of human social development', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'coalition', definition: 'An alliance for combined action', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'cohesion', definition: 'The action of forming a united whole', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'communal', definition: 'Shared by all members of a community', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'conformity', definition: 'Compliance with standards, rules, or laws', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'consensus', definition: 'General agreement', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'conservative', definition: 'Holding to traditional attitudes and values', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'constituency', definition: 'A body of voters in a specified area', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'contemporary', definition: 'Living or occurring at the same time', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'cosmopolitan', definition: 'Familiar with and at ease in many different countries', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'democracy', definition: 'A system of government by the whole population', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'demographic', definition: 'Relating to the structure of populations', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'deviant', definition: 'Departing from usual or accepted standards', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'diaspora', definition: 'The dispersion of people from their original homeland', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'advanced' },
  { word: 'dictatorship', definition: 'Government by a dictator', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'discrimination', definition: 'The unjust treatment of different categories of people', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'diversity', definition: 'The state of being diverse; variety', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'egalitarian', definition: 'Relating to the principle of equal rights', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'advanced' },
  { word: 'elite', definition: 'A select group that is superior in terms of ability', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'emancipation', definition: 'The fact or process of being set free', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'emigration', definition: 'The act of leaving one\'s own country to settle in another', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'empowerment', definition: 'The process of becoming stronger and more confident', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'ethnic', definition: 'Relating to a population subgroup with a common cultural tradition', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'exclusion', definition: 'The process of excluding or being excluded', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'feminism', definition: 'The advocacy of women\'s rights on the basis of equality', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'globalization', definition: 'The process of international integration', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'heritage', definition: 'Property that is or may be inherited', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'homogeneous', definition: 'Of the same kind; alike', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'advanced' },
  { word: 'humanitarian', definition: 'Concerned with or seeking to promote human welfare', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'ideology', definition: 'A system of ideas and ideals', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'immigration', definition: 'The action of coming to live permanently in a foreign country', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'imperialism', definition: 'A policy of extending a country\'s power', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'inclusion', definition: 'The action or state of including', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'indigenous', definition: 'Originating or occurring naturally in a particular place', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'inequality', definition: 'Difference in size, degree, or circumstances', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'integration', definition: 'The action of integrating', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'liberalism', definition: 'A political philosophy based on liberty and equality', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'marginalization', definition: 'Treatment of a person as insignificant', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'migration', definition: 'Movement from one part of something to another', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'minority', definition: 'The smaller number or part', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'multicultural', definition: 'Relating to or containing several cultural groups', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'nationalism', definition: 'Identification with one\'s own nation', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'oppression', definition: 'Prolonged cruel or unjust treatment', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'patriarchy', definition: 'A system of society in which men hold the power', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'pluralism', definition: 'A condition in which two or more groups coexist', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'advanced' },
  { word: 'prejudice', definition: 'Preconceived opinion not based on reason', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'progressive', definition: 'Favoring or implementing social reform', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'racism', definition: 'Prejudice or discrimination based on race', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'refugee', definition: 'A person who has been forced to leave their country', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'segregation', definition: 'The action of setting someone apart from others', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'socialism', definition: 'A political theory advocating state ownership', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'solidarity', definition: 'Unity or agreement of feeling or action', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'sovereignty', definition: 'Supreme power or authority', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'stereotype', definition: 'A widely held but fixed and oversimplified image', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'stigma', definition: 'A mark of disgrace associated with a circumstance', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'stratification', definition: 'The arrangement of something into different groups', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'advanced' },
  { word: 'tolerance', definition: 'Willingness to accept behavior different from one\'s own', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'tradition', definition: 'The transmission of customs or beliefs', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'urbanization', definition: 'The process of making an area more urban', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
  { word: 'xenophobia', definition: 'Dislike of or prejudice against people from other countries', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'advanced' },
];

// Science and Research Words
const SCIENCE_RESEARCH: VocabularyWord[] = [
  { word: 'accuracy', definition: 'The quality of being correct or precise', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'algorithm', definition: 'A process or set of rules to be followed in calculations', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'anomaly', definition: 'Something that deviates from what is standard or expected', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'apparatus', definition: 'The technical equipment for a particular activity', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'calibrate', definition: 'To mark an instrument with a standard scale', part_of_speech: 'verb', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'catalyst', definition: 'A substance that increases the rate of a chemical reaction', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'chromosome', definition: 'A thread-like structure of nucleic acids and protein', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'clinical', definition: 'Relating to the observation and treatment of patients', part_of_speech: 'adjective', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'compound', definition: 'A thing composed of two or more elements', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'correlation', definition: 'A mutual relationship between two or more things', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'criterion', definition: 'A principle or standard by which something is judged', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'data', definition: 'Facts and statistics collected for analysis', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'deduce', definition: 'To arrive at a fact or conclusion by reasoning', part_of_speech: 'verb', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'deviation', definition: 'The action of departing from an established course', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'diagnosis', definition: 'The identification of the nature of an illness', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'dimension', definition: 'A measurable extent of a particular kind', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'empirical', definition: 'Based on observation or experience', part_of_speech: 'adjective', topic: 'Science', difficulty_level: 'advanced' },
  { word: 'enzyme', definition: 'A substance produced by a living organism', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'equation', definition: 'A statement that the values of two expressions are equal', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'experiment', definition: 'A scientific procedure to make a discovery', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'formula', definition: 'A mathematical relationship expressed in symbols', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'frequency', definition: 'The rate at which something occurs', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'gene', definition: 'A unit of heredity transferred from parent to offspring', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'hypothesis', definition: 'A supposition made as a starting point for investigation', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'immune', definition: 'Resistant to a particular infection', part_of_speech: 'adjective', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'indicator', definition: 'A thing that indicates the state of something', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'laboratory', definition: 'A room or building equipped for scientific experiments', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'magnitude', definition: 'The great size or extent of something', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'methodology', definition: 'A system of methods used in a particular area', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'molecule', definition: 'A group of atoms bonded together', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'mutation', definition: 'The changing of the structure of a gene', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'observation', definition: 'The action of observing something carefully', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'organism', definition: 'An individual animal, plant, or single-celled life form', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'parameter', definition: 'A numerical characteristic of a population', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'particle', definition: 'A minute portion of matter', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'phenomenon', definition: 'A fact or situation that is observed to exist', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'precision', definition: 'The quality of being exact and accurate', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'prediction', definition: 'A thing predicted; a forecast', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'probability', definition: 'The extent to which something is likely to happen', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'procedure', definition: 'An established way of doing something', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'proportion', definition: 'A part, share, or number considered in relation to a whole', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'quantitative', definition: 'Relating to the quantity of something', part_of_speech: 'adjective', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'radiation', definition: 'The emission of energy as electromagnetic waves', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'random', definition: 'Made or done without method or conscious decision', part_of_speech: 'adjective', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'reliability', definition: 'The quality of being trustworthy or performing consistently', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'replicate', definition: 'To make an exact copy of', part_of_speech: 'verb', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'sample', definition: 'A small part intended to show what the whole is like', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'sequence', definition: 'A particular order in which related things follow', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'significant', definition: 'Sufficiently great or important to be worthy of attention', part_of_speech: 'adjective', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'simulation', definition: 'Imitation of a situation or process', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'specimen', definition: 'An individual animal, plant, or piece of a mineral', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'spectrum', definition: 'A band of colors produced by separation of light', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'statistic', definition: 'A fact or piece of data from a study', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'stimulus', definition: 'A thing that rouses activity or energy', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'synthesis', definition: 'The combination of ideas to form a theory', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'theoretical', definition: 'Concerned with or involving the theory of a subject', part_of_speech: 'adjective', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'theory', definition: 'A supposition or system of ideas explaining something', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'validity', definition: 'The quality of being logically or factually sound', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'variable', definition: 'An element that is liable to vary or change', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
  { word: 'verify', definition: 'To make sure or demonstrate that something is true', part_of_speech: 'verb', topic: 'Science', difficulty_level: 'intermediate' },
];

async function seedBatch2(supabase: SupabaseClient): Promise<void> {
  const allWords = [...AWL_NAWL_WORDS, ...SOCIETY_CULTURE, ...SCIENCE_RESEARCH];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 2: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 2 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 2');
  console.log('AWL Sublists 8-10 + Society/Culture + Science/Research');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch2(supabase);
  
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
