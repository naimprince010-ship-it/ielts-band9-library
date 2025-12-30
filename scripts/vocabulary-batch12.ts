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

// Academic Nouns - Part 11
const ACADEMIC_NOUNS_11: VocabularyWord[] = [
  { word: 'prosecution', definition: 'The institution of legal proceedings', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'prospect', definition: 'The possibility of some future event occurring', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'prosperity', definition: 'The state of being prosperous', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'protection', definition: 'The action of protecting someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'protest', definition: 'A statement or action expressing disapproval', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'protocol', definition: 'The official procedure governing affairs', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'prototype', definition: 'A first or preliminary model', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'provision', definition: 'The action of providing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'provocation', definition: 'Action or speech that makes someone annoyed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'proximity', definition: 'Nearness in space or time', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'psychology', definition: 'The scientific study of the human mind', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'publication', definition: 'The preparation and issuing of a book', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'publicity', definition: 'Notice or attention given to someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'punishment', definition: 'The infliction of a penalty as retribution', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'purchase', definition: 'The acquisition of something by buying', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'purity', definition: 'Freedom from adulteration or contamination', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'purpose', definition: 'The reason for which something is done', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'pursuit', definition: 'The action of following or pursuing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'qualification', definition: 'A pass of an examination', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'quality', definition: 'The standard of something as measured', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'quantity', definition: 'The amount or number of a material', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'query', definition: 'A question, especially one expressing doubt', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'quest', definition: 'A long or arduous search for something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'question', definition: 'A sentence worded to elicit information', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'questionnaire', definition: 'A set of printed questions', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'quota', definition: 'A limited quantity of a particular product', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'quotation', definition: 'A group of words taken from a text', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'race', definition: 'A competition between runners or horses', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'radiation', definition: 'The emission of energy as electromagnetic waves', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'radical', definition: 'A person who advocates thorough reform', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'radius', definition: 'A straight line from the center to the circumference', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rage', definition: 'Violent uncontrollable anger', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rally', definition: 'A mass meeting of people making a political protest', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ramification', definition: 'A consequence of an action or event', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'range', definition: 'The area of variation between upper and lower limits', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rank', definition: 'A position in the hierarchy of the armed forces', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ranking', definition: 'A position in a scale of achievement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rate', definition: 'A measure or quantity of a thing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ratio', definition: 'The quantitative relation between two amounts', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rationale', definition: 'A set of reasons or a logical basis', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rationality', definition: 'The quality of being based on reason', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reaction', definition: 'Something done or felt in response', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reader', definition: 'A person who reads', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'readiness', definition: 'The state of being fully prepared', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'realism', definition: 'The attitude of accepting a situation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reality', definition: 'The world or state of things as they exist', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'realization', definition: 'An act of becoming fully aware', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'realm', definition: 'A kingdom', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reason', definition: 'A cause or explanation for an action', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reasoning', definition: 'The action of thinking about something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reassurance', definition: 'The action of removing doubts or fears', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rebellion', definition: 'An act of violent or open resistance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'receipt', definition: 'The action of receiving something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'receiver', definition: 'A person or thing that receives', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reception', definition: 'The action of receiving something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'recession', definition: 'A period of temporary economic decline', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'recipient', definition: 'A person who receives something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reciprocity', definition: 'The practice of exchanging things for mutual benefit', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'recognition', definition: 'The action of recognizing or being recognized', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'recommendation', definition: 'A suggestion or proposal as to the best course', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reconciliation', definition: 'The restoration of friendly relations', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reconstruction', definition: 'The action of reconstructing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'record', definition: 'A thing constituting a piece of evidence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'recovery', definition: 'A return to a normal state of health', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'recreation', definition: 'Activity done for enjoyment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'recruitment', definition: 'The action of enlisting new people', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reduction', definition: 'The action of making something smaller', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'redundancy', definition: 'The state of being no longer needed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reference', definition: 'The action of mentioning or alluding', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'referendum', definition: 'A general vote by the electorate', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'refinement', definition: 'The process of removing impurities', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reflection', definition: 'The throwing back of light or sound', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reform', definition: 'The action of reforming an institution', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'refuge', definition: 'A condition of being safe or sheltered', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'refugee', definition: 'A person who has been forced to leave their country', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'refusal', definition: 'An act of refusing to do something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'regime', definition: 'A government, especially an authoritarian one', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'region', definition: 'An area or division of a country', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'register', definition: 'An official list or record', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'registration', definition: 'The action of registering', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'regression', definition: 'A return to a former state', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'regulation', definition: 'A rule or directive made by an authority', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rehabilitation', definition: 'The action of restoring someone to health', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reign', definition: 'The period of rule of a monarch', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reinforcement', definition: 'The action of strengthening', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rejection', definition: 'The dismissing of a proposal', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'relation', definition: 'The way in which two things are connected', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'relationship', definition: 'The way in which two people are connected', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'relaxation', definition: 'The state of being free from tension', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'release', definition: 'The action of setting someone free', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'relevance', definition: 'The quality of being closely connected', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reliability', definition: 'The quality of being trustworthy', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reliance', definition: 'Dependence on or trust in someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'relief', definition: 'A feeling of reassurance and relaxation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'religion', definition: 'The belief in and worship of a superhuman power', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reluctance', definition: 'Unwillingness or disinclination to do something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'remainder', definition: 'A part or quantity that is left', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'remedy', definition: 'A medicine or treatment for a disease', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
];

// Academic Nouns - Part 12
const ACADEMIC_NOUNS_12: VocabularyWord[] = [
  { word: 'reminder', definition: 'A thing that causes someone to remember', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'removal', definition: 'The action of removing someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'renaissance', definition: 'A revival of or renewed interest in something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'renewal', definition: 'The action of extending the period of validity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'renovation', definition: 'The action of renovating a building', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rent', definition: 'A tenant\'s regular payment to a landlord', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'repetition', definition: 'The action of repeating something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'replacement', definition: 'The action of replacing someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'replication', definition: 'The action of copying or reproducing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'report', definition: 'An account given of a particular matter', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reporter', definition: 'A person who reports news', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'representation', definition: 'The action of speaking on behalf of someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'representative', definition: 'A person chosen to act for another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'repression', definition: 'The action of subduing someone by force', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reproduction', definition: 'The production of offspring', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'republic', definition: 'A state in which supreme power is held by the people', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reputation', definition: 'The beliefs or opinions held about someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'request', definition: 'An act of asking politely for something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'requirement', definition: 'A thing that is compulsory', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rescue', definition: 'An act of saving someone from danger', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'research', definition: 'The systematic investigation into a subject', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'researcher', definition: 'A person who carries out academic research', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'resemblance', definition: 'The state of resembling someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'resentment', definition: 'Bitter indignation at having been treated unfairly', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reservation', definition: 'The action of reserving something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reserve', definition: 'A supply of a commodity not needed for immediate use', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'residence', definition: 'A person\'s home', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'resident', definition: 'A person who lives somewhere permanently', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'residue', definition: 'A small amount of something that remains', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'resignation', definition: 'An act of retiring or giving up a position', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'resilience', definition: 'The capacity to recover quickly from difficulties', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'resistance', definition: 'The refusal to accept or comply with something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'resolution', definition: 'A firm decision to do or not to do something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'resort', definition: 'A place that is frequented for holidays', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'resource', definition: 'A stock or supply of money or materials', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'respect', definition: 'A feeling of deep admiration', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'respondent', definition: 'A person who replies to something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'response', definition: 'A verbal or written answer', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'responsibility', definition: 'The state of being responsible for something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'restoration', definition: 'The action of returning something to a former condition', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'restraint', definition: 'A measure or condition that keeps someone under control', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'restriction', definition: 'A limiting condition or measure', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'result', definition: 'A consequence or outcome of an action', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'resumption', definition: 'The action of beginning something again', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'retail', definition: 'The sale of goods to the public', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'retention', definition: 'The continued possession of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'retirement', definition: 'The action of leaving one\'s job', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'retreat', definition: 'An act of moving back or withdrawing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'retrieval', definition: 'The process of getting something back', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'return', definition: 'An act of coming or going back to a place', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'revelation', definition: 'A surprising and previously unknown fact', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'revenue', definition: 'Income, especially of a company or organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reversal', definition: 'A change to an opposite direction or position', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'review', definition: 'A formal assessment of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'revision', definition: 'The action of revising', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'revival', definition: 'An improvement in the condition of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'revolution', definition: 'A forcible overthrow of a government', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'reward', definition: 'A thing given in recognition of service', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rhetoric', definition: 'The art of effective speaking or writing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rhythm', definition: 'A strong regular repeated pattern of movement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'right', definition: 'A moral or legal entitlement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rigidity', definition: 'The quality of being rigid', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'riot', definition: 'A violent disturbance of the peace', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rise', definition: 'An upward movement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'risk', definition: 'A situation involving exposure to danger', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ritual', definition: 'A religious or solemn ceremony', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rivalry', definition: 'Competition for the same objective', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'role', definition: 'The function assumed by a person', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'root', definition: 'The part of a plant that attaches it to the ground', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rotation', definition: 'The action of rotating around an axis', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'route', definition: 'A way or course taken in getting from a starting point', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'routine', definition: 'A sequence of actions regularly followed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'royalty', definition: 'People of royal blood or status', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rule', definition: 'One of a set of explicit regulations', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ruling', definition: 'An authoritative decision or pronouncement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'rupture', definition: 'An instance of breaking or bursting', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sacrifice', definition: 'An act of giving up something valued', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'safety', definition: 'The condition of being protected from danger', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'salary', definition: 'A fixed regular payment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sale', definition: 'The exchange of a commodity for money', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sample', definition: 'A small part intended to show what the whole is like', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sanction', definition: 'A threatened penalty for disobeying a law', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sanctuary', definition: 'A place of refuge or safety', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'sanitation', definition: 'Conditions relating to public health', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'satisfaction', definition: 'Fulfillment of one\'s wishes or expectations', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'saturation', definition: 'The state of being thoroughly soaked', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'savings', definition: 'Money that is saved', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'scale', definition: 'The relative size or extent of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'scandal', definition: 'An action or event regarded as morally wrong', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'scarcity', definition: 'The state of being scarce or in short supply', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'scenario', definition: 'A written outline of a film or play', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'scene', definition: 'The place where an incident occurs', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'schedule', definition: 'A plan for carrying out a process', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'scheme', definition: 'A large-scale systematic plan', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'scholar', definition: 'A specialist in a particular branch of study', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'scholarship', definition: 'Academic study or achievement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
];

async function seedBatch12(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ACADEMIC_NOUNS_11, ...ACADEMIC_NOUNS_12];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 12: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 12 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 12');
  console.log('Academic Nouns - Parts 11 & 12');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch12(supabase);
  
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
