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

// Academic Nouns - Part 1
const ACADEMIC_NOUNS_1: VocabularyWord[] = [
  { word: 'aberration', definition: 'A departure from what is normal or expected', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'abstraction', definition: 'The quality of dealing with ideas rather than events', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'abundance', definition: 'A very large quantity of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'acceleration', definition: 'Increase in the rate or speed of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accessibility', definition: 'The quality of being able to be reached or entered', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accomplishment', definition: 'Something that has been achieved successfully', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accountability', definition: 'The fact of being responsible for decisions', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accumulation', definition: 'The acquisition or gradual gathering of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accuracy', definition: 'The quality of being correct or precise', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'acquisition', definition: 'The learning or developing of a skill', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'adaptation', definition: 'The action of adapting or being adapted', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'adherence', definition: 'Attachment or commitment to a person or cause', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'adjustment', definition: 'A small alteration or movement made to achieve a desired fit', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'administration', definition: 'The process of managing a business or organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'admission', definition: 'The process of being received into a place', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'advancement', definition: 'The process of promoting a cause or plan', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'adversity', definition: 'Difficulties or misfortune', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'advocacy', definition: 'Public support for or recommendation of a cause', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'affiliation', definition: 'The state of being officially attached to an organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'aftermath', definition: 'The consequences of a significant unpleasant event', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'agenda', definition: 'A list of items to be discussed at a meeting', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'aggregation', definition: 'The formation of a number of things into a cluster', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'allegation', definition: 'A claim that someone has done something illegal', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'alliance', definition: 'A union formed for mutual benefit', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'allocation', definition: 'The action of distributing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'alteration', definition: 'The action of altering or being altered', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'alternative', definition: 'One of two or more available possibilities', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ambiguity', definition: 'The quality of being open to more than one interpretation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'amendment', definition: 'A minor change or addition designed to improve', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'analogy', definition: 'A comparison between two things for explanation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'analysis', definition: 'Detailed examination of the elements of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'anomaly', definition: 'Something that deviates from what is standard', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'anticipation', definition: 'The action of anticipating something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'apparatus', definition: 'The technical equipment needed for an activity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'appendix', definition: 'A section at the end of a book with additional matter', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'application', definition: 'A formal request to an authority', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'appreciation', definition: 'Recognition of the quality or value of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'approach', definition: 'A way of dealing with something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'approximation', definition: 'A value that is nearly but not exactly correct', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'arbitration', definition: 'The use of an arbitrator to settle a dispute', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'architecture', definition: 'The art or practice of designing buildings', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'arena', definition: 'A place or scene of activity or debate', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'argument', definition: 'A reason given in support of an idea', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'arrangement', definition: 'The action of arranging or being arranged', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'articulation', definition: 'The formation of clear and distinct sounds', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'aspect', definition: 'A particular part or feature of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'aspiration', definition: 'A hope or ambition of achieving something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'assertion', definition: 'A confident and forceful statement of fact', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'assessment', definition: 'The evaluation of the nature or quality', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'asset', definition: 'A useful or valuable thing or person', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'assignment', definition: 'A task or piece of work allocated to someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'assistance', definition: 'The provision of help or support', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'association', definition: 'A group of people organized for a joint purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'assumption', definition: 'A thing that is accepted as true without proof', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'assurance', definition: 'A positive declaration intended to give confidence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'attachment', definition: 'An extra part added to something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'attainment', definition: 'The action of achieving a goal', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'attempt', definition: 'An act of trying to achieve something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'attendance', definition: 'The action of being present at a place', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'attention', definition: 'Notice taken of someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'attitude', definition: 'A settled way of thinking or feeling', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'attribute', definition: 'A quality or feature regarded as characteristic', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'audience', definition: 'The assembled spectators or listeners', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'authority', definition: 'The power to give orders or make decisions', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'authorization', definition: 'Official permission or approval', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'autonomy', definition: 'The right of self-government', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'availability', definition: 'The quality of being able to be used', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'awareness', definition: 'Knowledge or perception of a situation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'backdrop', definition: 'The setting or background for a scene', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'background', definition: 'The circumstances that form the setting', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'backlash', definition: 'A strong and adverse reaction', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'balance', definition: 'An even distribution of weight', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'barrier', definition: 'A fence or obstacle that prevents movement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'baseline', definition: 'A starting point used for comparisons', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'basis', definition: 'The underlying support for an idea', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'benchmark', definition: 'A standard against which things may be compared', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'beneficiary', definition: 'A person who derives advantage from something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'benefit', definition: 'An advantage or profit gained from something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'bias', definition: 'Prejudice in favor of or against something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'blueprint', definition: 'A design plan or technical drawing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'boundary', definition: 'A line that marks the limits of an area', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'breakthrough', definition: 'A sudden important discovery or development', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'budget', definition: 'An estimate of income and expenditure', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'bureaucracy', definition: 'A system of government with many departments', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'caliber', definition: 'The quality of someone\'s character or ability', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'campaign', definition: 'An organized course of action to achieve a goal', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'capability', definition: 'The power or ability to do something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'capacity', definition: 'The maximum amount that something can contain', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'catalyst', definition: 'A person or thing that precipitates an event', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'category', definition: 'A class or division of things', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'causation', definition: 'The action of causing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'certainty', definition: 'Firm conviction that something is the case', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'certification', definition: 'The action of providing official recognition', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'challenge', definition: 'A call to take part in a contest', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'characteristic', definition: 'A feature typical of a person or thing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'chronology', definition: 'The arrangement of events in time order', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'circumstance', definition: 'A fact or condition connected with an event', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'citation', definition: 'A quotation from or reference to a source', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'civilization', definition: 'The stage of human social development', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'clarification', definition: 'The action of making a statement less confused', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'classification', definition: 'The action of classifying something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
];

// Academic Nouns - Part 2
const ACADEMIC_NOUNS_2: VocabularyWord[] = [
  { word: 'clause', definition: 'A unit of grammatical organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'clientele', definition: 'Clients collectively', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'coalition', definition: 'An alliance for combined action', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'code', definition: 'A system of words or figures for secrecy', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'cognition', definition: 'The mental action of acquiring knowledge', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'coherence', definition: 'The quality of being logical and consistent', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'cohesion', definition: 'The action of forming a united whole', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'collaboration', definition: 'The action of working with someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'colleague', definition: 'A person with whom one works', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'commentary', definition: 'An expression of opinions or explanations', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'commission', definition: 'An instruction or command to do something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'commitment', definition: 'The state of being dedicated to a cause', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'commodity', definition: 'A raw material or agricultural product', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'communication', definition: 'The imparting or exchanging of information', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'community', definition: 'A group of people living in the same place', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'comparison', definition: 'The act of comparing two or more things', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'compensation', definition: 'Something given to make up for loss', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'competence', definition: 'The ability to do something successfully', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'competition', definition: 'The activity of competing against others', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'compilation', definition: 'The action of producing a collection', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'complexity', definition: 'The state of having many parts', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'compliance', definition: 'The action of complying with a command', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'component', definition: 'A part or element of a larger whole', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'composition', definition: 'The nature of something\'s ingredients', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'comprehension', definition: 'The ability to understand something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'compromise', definition: 'An agreement reached by mutual concession', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'computation', definition: 'The action of mathematical calculation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'concentration', definition: 'The action of focusing one\'s attention', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'concept', definition: 'An abstract idea or general notion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conception', definition: 'The way in which something is perceived', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'concern', definition: 'A matter of interest or importance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conclusion', definition: 'A judgment reached by reasoning', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'condition', definition: 'The state of something with regard to appearance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conduct', definition: 'The manner in which a person behaves', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conference', definition: 'A formal meeting for discussion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'confidence', definition: 'The feeling of self-assurance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'configuration', definition: 'An arrangement of elements in a particular form', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'confirmation', definition: 'The action of confirming something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conflict', definition: 'A serious disagreement or argument', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conformity', definition: 'Compliance with standards or rules', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'confrontation', definition: 'A hostile or argumentative meeting', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conjunction', definition: 'A combination of events or circumstances', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'connection', definition: 'A relationship in which things are linked', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'connotation', definition: 'An idea or feeling that a word invokes', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conscience', definition: 'An inner feeling of right and wrong', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'consciousness', definition: 'The state of being awake and aware', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'consensus', definition: 'General agreement among a group', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'consequence', definition: 'A result or effect of an action', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conservation', definition: 'Prevention of wasteful use of a resource', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'consideration', definition: 'Careful thought about something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'consistency', definition: 'Conformity in the application of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'consolidation', definition: 'The action of making something stronger', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'consortium', definition: 'An association of several companies', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conspiracy', definition: 'A secret plan by a group to do something unlawful', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'constant', definition: 'A situation that does not change', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'constraint', definition: 'A limitation or restriction', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'construction', definition: 'The building of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'consultation', definition: 'The action of seeking advice', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'consumption', definition: 'The using up of a resource', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'contamination', definition: 'The action of making something impure', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'contemplation', definition: 'The action of looking thoughtfully', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'content', definition: 'The things that are held or included', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'context', definition: 'The circumstances that form the setting', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'contingency', definition: 'A future event that is possible but not certain', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'continuity', definition: 'The unbroken existence of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'contract', definition: 'A written or spoken agreement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'contradiction', definition: 'A combination of statements that are opposed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'contrast', definition: 'The state of being strikingly different', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'contribution', definition: 'A gift or payment to a common fund', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'controversy', definition: 'Disagreement typically when prolonged', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'convention', definition: 'A way in which something is usually done', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'convergence', definition: 'The process of coming together', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conversion', definition: 'The process of changing from one form to another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conviction', definition: 'A firmly held belief or opinion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'cooperation', definition: 'The process of working together', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'coordination', definition: 'The organization of different elements', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'correlation', definition: 'A mutual relationship between two things', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'correspondence', definition: 'A close similarity or connection', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'counterpart', definition: 'A person or thing holding a similar position', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'coverage', definition: 'The extent to which something deals with', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'creation', definition: 'The action of bringing something into existence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'creativity', definition: 'The use of imagination or original ideas', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'credibility', definition: 'The quality of being trusted and believed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'credit', definition: 'The ability to obtain goods before payment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'crisis', definition: 'A time of intense difficulty or danger', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'criterion', definition: 'A principle for judging or deciding', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'critique', definition: 'A detailed analysis and assessment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'culmination', definition: 'The highest or climactic point', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'currency', definition: 'A system of money in general use', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'curriculum', definition: 'The subjects comprising a course of study', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'custody', definition: 'The protective care of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'cycle', definition: 'A series of events that are regularly repeated', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'database', definition: 'A structured set of data held in a computer', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'deadline', definition: 'The latest time by which something should be completed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'debate', definition: 'A formal discussion on a particular topic', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'decade', definition: 'A period of ten years', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'decay', definition: 'The state of deteriorating', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'deception', definition: 'The action of deceiving someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'decision', definition: 'A conclusion reached after consideration', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
];

async function seedBatch7(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ACADEMIC_NOUNS_1, ...ACADEMIC_NOUNS_2];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 7: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 7 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 7');
  console.log('Academic Nouns - Parts 1 & 2');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch7(supabase);
  
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
