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

// Academic Nouns - Part 9
const ACADEMIC_NOUNS_9: VocabularyWord[] = [
  { word: 'opportunity', definition: 'A set of circumstances that makes it possible', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'opposition', definition: 'Resistance or dissent', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'oppression', definition: 'Prolonged cruel or unjust treatment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'optimism', definition: 'Hopefulness and confidence about the future', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'option', definition: 'A thing that is or may be chosen', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'orbit', definition: 'The curved path of a celestial object', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'orchestra', definition: 'A group of instrumentalists', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'order', definition: 'The arrangement of people or things', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'organ', definition: 'A part of an organism that is typically self-contained', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'organism', definition: 'An individual animal, plant, or single-celled life form', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'organization', definition: 'An organized body of people with a particular purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'orientation', definition: 'The determination of the relative position', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'origin', definition: 'The point or place where something begins', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'originality', definition: 'The ability to think independently and creatively', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'outbreak', definition: 'The sudden or violent start of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'outcome', definition: 'The way a thing turns out', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'outlay', definition: 'An amount of money spent on something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'outlet', definition: 'A pipe or hole through which water or gas may escape', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'outline', definition: 'A line or set of lines enclosing or indicating the shape', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'outlook', definition: 'A person\'s point of view or general attitude', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'output', definition: 'The amount of something produced', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'outrage', definition: 'An extremely strong reaction of anger', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'outset', definition: 'The start or beginning of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'outsider', definition: 'A person who does not belong to a particular group', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'overlap', definition: 'A part or amount that overlaps', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'oversight', definition: 'An unintentional failure to notice or do something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'overview', definition: 'A general review or summary', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ownership', definition: 'The act or state of possessing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'pace', definition: 'The speed at which someone or something moves', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'package', definition: 'An object or group of objects wrapped in paper', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'pact', definition: 'A formal agreement between individuals or parties', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'panel', definition: 'A flat or curved component', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'paradigm', definition: 'A typical example or pattern of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'paradox', definition: 'A seemingly absurd statement that may be true', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'paragraph', definition: 'A distinct section of a piece of writing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'parallel', definition: 'A person or thing that is similar to another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'parameter', definition: 'A numerical or other measurable factor', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'paraphrase', definition: 'A rewording of something written or spoken', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'participant', definition: 'A person who takes part in something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'participation', definition: 'The action of taking part in something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'particle', definition: 'A minute portion of matter', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'partnership', definition: 'The state of being a partner', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'passage', definition: 'The act of moving through or past something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'passion', definition: 'Strong and barely controllable emotion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'patent', definition: 'A government authority conferring a right', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'path', definition: 'A way or track laid down for walking', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'patience', definition: 'The capacity to accept delay without getting angry', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'pattern', definition: 'A repeated decorative design', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'peak', definition: 'The pointed top of a mountain', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'peer', definition: 'A person of the same age or status', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'penalty', definition: 'A punishment imposed for breaking a law', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'penetration', definition: 'The action of penetrating something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'pension', definition: 'A regular payment made during retirement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'perception', definition: 'The ability to see, hear, or become aware', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'perfection', definition: 'The condition of being perfect', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'performance', definition: 'An act of staging or presenting a play', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'peril', definition: 'Serious and immediate danger', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'period', definition: 'A length or portion of time', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'periodical', definition: 'A magazine or newspaper published at regular intervals', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'permanence', definition: 'The state of lasting or remaining unchanged', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'permission', definition: 'Consent or authorization to do something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'permit', definition: 'An official document giving authorization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'persecution', definition: 'Hostility and ill-treatment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'persistence', definition: 'Firm continuance in a course of action', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'personality', definition: 'The combination of characteristics that form an individual', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'personnel', definition: 'People employed in an organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'perspective', definition: 'A particular attitude toward something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'persuasion', definition: 'The action of persuading someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'pessimism', definition: 'A tendency to see the worst aspect', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'petition', definition: 'A formal written request', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'phase', definition: 'A distinct period or stage in a process', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'phenomenon', definition: 'A fact or situation that is observed to exist', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'philosopher', definition: 'A person engaged in the study of philosophy', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'philosophy', definition: 'The study of the fundamental nature of knowledge', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'phrase', definition: 'A small group of words standing together', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'physician', definition: 'A person qualified to practice medicine', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'physics', definition: 'The branch of science concerned with matter and energy', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'physiology', definition: 'The branch of biology dealing with functions', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'pioneer', definition: 'A person who is among the first to explore', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'pitch', definition: 'The quality of a sound governed by frequency', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'placement', definition: 'The action of putting someone in a position', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'plague', definition: 'A contagious bacterial disease', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'plaintiff', definition: 'A person who brings a case against another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'plan', definition: 'A detailed proposal for doing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'planet', definition: 'A celestial body moving in an elliptical orbit', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'plantation', definition: 'An estate on which crops are cultivated', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'plateau', definition: 'An area of relatively level high ground', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'platform', definition: 'A raised level surface on which people stand', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'plausibility', definition: 'The quality of seeming reasonable', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'plea', definition: 'A request made in an urgent manner', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'pledge', definition: 'A solemn promise or undertaking', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'plight', definition: 'A dangerous or difficult situation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'plot', definition: 'A plan made in secret by a group', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'plurality', definition: 'The fact of being plural', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'poetry', definition: 'Literary work in which special intensity is given', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'point', definition: 'The tapered sharp end of a tool', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'polarization', definition: 'Division into two sharply contrasting groups', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'policy', definition: 'A course of action adopted by an organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
];

// Academic Nouns - Part 10
const ACADEMIC_NOUNS_10: VocabularyWord[] = [
  { word: 'politics', definition: 'The activities associated with governance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'poll', definition: 'The process of voting in an election', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'pollution', definition: 'The presence of a substance with harmful effects', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'pool', definition: 'A small area of still water', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'popularity', definition: 'The state of being liked or admired', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'population', definition: 'All the inhabitants of a particular town', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'portfolio', definition: 'A large thin flat case for loose sheets', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'portion', definition: 'A part of a whole', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'portrait', definition: 'A painting or photograph of a person', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'portrayal', definition: 'A depiction of someone in a work of art', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'pose', definition: 'A particular way of standing or sitting', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'position', definition: 'A place where someone or something is located', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'possession', definition: 'The state of having or owning something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'possibility', definition: 'A thing that may happen or be the case', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'postulate', definition: 'A thing suggested as a basis for reasoning', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'potential', definition: 'Latent qualities or abilities', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'poverty', definition: 'The state of being extremely poor', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'power', definition: 'The ability to do something or act', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'practicality', definition: 'The quality of being practical', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'practice', definition: 'The actual application of an idea', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'practitioner', definition: 'A person actively engaged in an art', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'pragmatism', definition: 'A practical approach to problems', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'praise', definition: 'The expression of approval or admiration', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'precedent', definition: 'An earlier event or action that is regarded as an example', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'precision', definition: 'The quality of being exact and accurate', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'precondition', definition: 'A condition that must be fulfilled beforehand', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'predecessor', definition: 'A person who held a job before the current holder', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'prediction', definition: 'A thing predicted; a forecast', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'predominance', definition: 'The state of being greater in number', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'preface', definition: 'An introduction to a book', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'preference', definition: 'A greater liking for one alternative', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'prejudice', definition: 'Preconceived opinion not based on reason', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'preliminary', definition: 'An action or event preceding something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'premise', definition: 'A previous statement from which another is inferred', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'premium', definition: 'An amount to be paid for an insurance policy', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'preoccupation', definition: 'The state of being preoccupied', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'preparation', definition: 'The action of making ready', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'prerequisite', definition: 'A thing that is required as a prior condition', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'prescription', definition: 'An instruction written by a medical practitioner', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'presence', definition: 'The state of existing or being present', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'presentation', definition: 'The proffering or giving of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'preservation', definition: 'The action of preserving something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'presidency', definition: 'The office of president', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'president', definition: 'The elected head of a republican state', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'pressure', definition: 'Continuous physical force exerted', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'prestige', definition: 'Widespread respect and admiration', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'presumption', definition: 'An idea that is taken to be true', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'prevalence', definition: 'The fact of being prevalent', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'prevention', definition: 'The action of stopping something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'price', definition: 'The amount of money expected', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'pride', definition: 'A feeling of deep pleasure from achievements', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'primary', definition: 'A preliminary election to appoint delegates', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'prime', definition: 'The state of greatest strength or vigor', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'principal', definition: 'The person with the highest authority', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'principle', definition: 'A fundamental truth or proposition', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'priority', definition: 'The fact of being regarded as more important', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'privacy', definition: 'The state of being free from public attention', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'privilege', definition: 'A special right or advantage', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'probability', definition: 'The extent to which something is probable', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'probe', definition: 'A thorough investigation into a matter', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'problem', definition: 'A matter or situation regarded as unwelcome', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'procedure', definition: 'An established way of doing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'proceeding', definition: 'An event or a series of activities', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'process', definition: 'A series of actions to achieve a particular end', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'processing', definition: 'The action of performing a series of operations', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'proclamation', definition: 'A public or official announcement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'procurement', definition: 'The action of obtaining something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'producer', definition: 'A person who supervises the making of a film', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'product', definition: 'An article or substance manufactured', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'production', definition: 'The action of making or manufacturing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'productivity', definition: 'The state of being productive', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'profession', definition: 'A paid occupation requiring training', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'professional', definition: 'A person engaged in a specified activity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'proficiency', definition: 'A high degree of competence or skill', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'profile', definition: 'An outline of something in side view', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'profit', definition: 'A financial gain', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'profitability', definition: 'The degree to which a business yields profit', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'program', definition: 'A planned series of future events', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'progress', definition: 'Forward or onward movement toward a destination', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'progression', definition: 'The process of developing gradually', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'prohibition', definition: 'The action of forbidding something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'project', definition: 'An individual or collaborative enterprise', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'projection', definition: 'An estimate of future possibilities', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'proliferation', definition: 'Rapid increase in numbers', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'prominence', definition: 'The state of being important or famous', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'promise', definition: 'A declaration that one will do something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'promotion', definition: 'Activity that supports or provides encouragement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'prompt', definition: 'An act of assisting or encouraging', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'pronouncement', definition: 'A formal or authoritative announcement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'proof', definition: 'Evidence establishing a fact', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'propaganda', definition: 'Information used to promote a political cause', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'propensity', definition: 'An inclination or natural tendency', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'property', definition: 'A thing or things belonging to someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'proportion', definition: 'A part or share of a whole', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'proposal', definition: 'A plan or suggestion put forward', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'proposition', definition: 'A statement expressing a judgment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'proprietor', definition: 'The owner of a business', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'prose', definition: 'Written or spoken language in its ordinary form', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
];

async function seedBatch11(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ACADEMIC_NOUNS_9, ...ACADEMIC_NOUNS_10];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 11: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 11 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 11');
  console.log('Academic Nouns - Parts 9 & 10');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch11(supabase);
  
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
