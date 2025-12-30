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

// Academic Nouns - Part 3
const ACADEMIC_NOUNS_3: VocabularyWord[] = [
  { word: 'declaration', definition: 'A formal or explicit statement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'decline', definition: 'A gradual and continuous loss of strength', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dedication', definition: 'The quality of being committed to a task', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'deduction', definition: 'The action of deducting or subtracting', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'deficiency', definition: 'A lack or shortage', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'deficit', definition: 'The amount by which something falls short', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'definition', definition: 'A statement of the exact meaning of a word', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'degradation', definition: 'The condition of being degraded', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'delegation', definition: 'A body of delegates or representatives', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'deliberation', definition: 'Long and careful consideration', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'delineation', definition: 'The action of describing something precisely', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'delivery', definition: 'The action of delivering something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'demand', definition: 'An insistent and peremptory request', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'democracy', definition: 'A system of government by the whole population', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'demographic', definition: 'A particular sector of a population', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'demonstration', definition: 'The action of showing that something exists', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'denial', definition: 'The action of declaring something to be untrue', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'denomination', definition: 'A recognized autonomous branch of a church', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'density', definition: 'The degree of compactness of a substance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'department', definition: 'A division of a large organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dependence', definition: 'The state of relying on someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'depiction', definition: 'The action of depicting something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'depletion', definition: 'Reduction in the number or quantity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'deployment', definition: 'The movement of troops or equipment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'depression', definition: 'Severe despondency and dejection', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'deprivation', definition: 'The lack of material benefits considered basic', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'derivation', definition: 'The obtaining of something from a source', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'derivative', definition: 'Something which is based on another source', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'description', definition: 'A spoken or written representation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'designation', definition: 'The choosing and naming of someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'destination', definition: 'The place to which someone is going', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'destruction', definition: 'The action of destroying something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'detection', definition: 'The action of discovering something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'deterioration', definition: 'The process of becoming progressively worse', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'determination', definition: 'Firmness of purpose; resoluteness', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'deterrent', definition: 'A thing that discourages or prevents', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'development', definition: 'The process of developing or being developed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'deviation', definition: 'The action of departing from an established course', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'device', definition: 'A thing made for a particular purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'diagnosis', definition: 'The identification of the nature of an illness', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'diagram', definition: 'A simplified drawing showing the appearance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dialect', definition: 'A particular form of a language', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dialogue', definition: 'A conversation between two or more people', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dichotomy', definition: 'A division into two contrasting things', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'differentiation', definition: 'The action of distinguishing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'diffusion', definition: 'The spreading of something more widely', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dilemma', definition: 'A situation in which a difficult choice has to be made', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dimension', definition: 'A measurable extent of some kind', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'diplomacy', definition: 'The profession of managing international relations', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'direction', definition: 'A course along which someone moves', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'directive', definition: 'An official or authoritative instruction', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'disability', definition: 'A physical or mental condition that limits', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'disadvantage', definition: 'An unfavorable circumstance or condition', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'disagreement', definition: 'Lack of consensus or approval', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'disappearance', definition: 'The action of disappearing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'disappointment', definition: 'Sadness caused by the nonfulfillment of hopes', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'disaster', definition: 'A sudden event causing great damage', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'discipline', definition: 'The practice of training people to obey rules', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'disclosure', definition: 'The action of making new information known', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'discontinuity', definition: 'A distinct break in physical continuity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'discourse', definition: 'Written or spoken communication', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'discovery', definition: 'The action of finding something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'discrepancy', definition: 'A lack of compatibility between two things', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'discretion', definition: 'The quality of behaving in a way that avoids', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'discrimination', definition: 'The unjust treatment of different categories', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'discussion', definition: 'The action of talking about something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dismissal', definition: 'The act of ordering someone to leave', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'disorder', definition: 'A state of confusion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'disparity', definition: 'A great difference', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'displacement', definition: 'The moving of something from its place', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'display', definition: 'A performance or show intended for public viewing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'disposal', definition: 'The action of getting rid of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'disposition', definition: 'A person\'s inherent qualities of mind', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dispute', definition: 'A disagreement or argument', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'disruption', definition: 'Disturbance or problems which interrupt', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dissemination', definition: 'The action of spreading something widely', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dissertation', definition: 'A long essay on a particular subject', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'distinction', definition: 'A difference or contrast between similar things', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'distortion', definition: 'The action of giving a misleading account', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'distribution', definition: 'The action of sharing something out', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'divergence', definition: 'The process of separating from a main route', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'diversity', definition: 'The state of being diverse; variety', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'division', definition: 'The action of separating something into parts', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'doctrine', definition: 'A belief or set of beliefs held by a group', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'documentation', definition: 'Material that provides official information', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'domain', definition: 'An area of territory owned or controlled', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dominance', definition: 'Power and influence over others', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'donation', definition: 'Something that is given to a charity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'draft', definition: 'A preliminary version of a piece of writing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'drainage', definition: 'The action of draining something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'drawback', definition: 'A feature that renders something less acceptable', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'duration', definition: 'The time during which something continues', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dynamic', definition: 'A force that stimulates change', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dysfunction', definition: 'Abnormality or impairment in function', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ecology', definition: 'The branch of biology dealing with organisms', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'economics', definition: 'The branch of knowledge concerned with production', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'economy', definition: 'The wealth and resources of a country', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ecosystem', definition: 'A biological community of interacting organisms', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
];

// Academic Nouns - Part 4
const ACADEMIC_NOUNS_4: VocabularyWord[] = [
  { word: 'edition', definition: 'A particular form of a published text', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'effectiveness', definition: 'The degree to which something is successful', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'efficiency', definition: 'The state of achieving maximum productivity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'elaboration', definition: 'The process of developing in detail', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'element', definition: 'A component or part of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'elevation', definition: 'The action of raising something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'elimination', definition: 'The complete removal of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'elite', definition: 'A select group that is superior', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'embargo', definition: 'An official ban on trade', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'emergence', definition: 'The process of coming into view', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'emission', definition: 'The production and discharge of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'emphasis', definition: 'Special importance or prominence given', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'empiricism', definition: 'The theory that knowledge comes from experience', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'employment', definition: 'The condition of having paid work', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'empowerment', definition: 'The process of becoming stronger', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'enactment', definition: 'The process of passing legislation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'encounter', definition: 'An unexpected or casual meeting', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'endeavor', definition: 'An attempt to achieve a goal', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'endorsement', definition: 'An act of giving public approval', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'enforcement', definition: 'The act of compelling observance of a law', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'engagement', definition: 'A formal agreement to get married', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'enhancement', definition: 'An increase or improvement in quality', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'enlightenment', definition: 'The action of enlightening', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'enrollment', definition: 'The action of enrolling or being enrolled', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'enterprise', definition: 'A project or undertaking', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'enthusiasm', definition: 'Intense enjoyment or interest', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'entity', definition: 'A thing with distinct and independent existence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'entrepreneur', definition: 'A person who sets up a business', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'entry', definition: 'An act of going or coming in', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'environment', definition: 'The surroundings in which a person lives', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'epidemic', definition: 'A widespread occurrence of an infectious disease', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'episode', definition: 'An event or a group of events', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'equality', definition: 'The state of being equal', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'equation', definition: 'A statement that the values of two expressions are equal', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'equilibrium', definition: 'A state in which opposing forces are balanced', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'equipment', definition: 'The necessary items for a particular purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'equity', definition: 'The quality of being fair and impartial', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'equivalence', definition: 'The condition of being equal in value', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'era', definition: 'A long and distinct period of history', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'erosion', definition: 'The process of eroding or being eroded', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'error', definition: 'A mistake', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'escalation', definition: 'A rapid increase; an intensification', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'essence', definition: 'The intrinsic nature of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'establishment', definition: 'The action of establishing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'estimate', definition: 'An approximate calculation or judgment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ethics', definition: 'Moral principles that govern behavior', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ethnicity', definition: 'The fact of belonging to a social group', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'evaluation', definition: 'The making of a judgment about value', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'evidence', definition: 'The available body of facts', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'evolution', definition: 'The gradual development of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'examination', definition: 'A detailed inspection or investigation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'exception', definition: 'A person or thing that is excluded', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'excess', definition: 'An amount of something that is more than necessary', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'exchange', definition: 'An act of giving one thing and receiving another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'exclusion', definition: 'The process of excluding or being excluded', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'execution', definition: 'The carrying out of a plan or course of action', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'exemption', definition: 'The process of freeing from an obligation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'exercise', definition: 'Activity requiring physical effort', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'exhaustion', definition: 'A state of extreme physical or mental fatigue', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'exhibition', definition: 'A public display of works of art', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'existence', definition: 'The fact or state of living or having objective reality', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'expansion', definition: 'The action of becoming larger or more extensive', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'expectation', definition: 'A strong belief that something will happen', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'expedition', definition: 'A journey undertaken by a group', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'expenditure', definition: 'The action of spending funds', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'expense', definition: 'The cost required for something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'experience', definition: 'Practical contact with and observation of facts', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'experiment', definition: 'A scientific procedure undertaken to make a discovery', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'expertise', definition: 'Expert skill or knowledge in a particular field', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'expiration', definition: 'The ending of the fixed period for which a contract is valid', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'explanation', definition: 'A statement that makes something clear', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'exploitation', definition: 'The action of making use of a resource', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'exploration', definition: 'The action of traveling in an unfamiliar area', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'explosion', definition: 'A violent shattering as a result of internal pressure', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'export', definition: 'A commodity sent to another country for sale', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'exposure', definition: 'The state of being exposed to contact with something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'expression', definition: 'The process of making known one\'s thoughts', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'extension', definition: 'A part that is added to something to enlarge it', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'extent', definition: 'The area covered by something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'extraction', definition: 'The action of taking out something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'extreme', definition: 'Either of two abstract things that are as different as possible', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fabric', definition: 'Cloth produced by weaving or knitting', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fabrication', definition: 'The action of manufacturing or inventing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'facade', definition: 'The face of a building', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'facet', definition: 'One side of something many-sided', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'facilitation', definition: 'The action of making something easier', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'facility', definition: 'A place provided for a particular purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'faction', definition: 'A small organized dissenting group', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'factor', definition: 'A circumstance that contributes to a result', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'faculty', definition: 'An inherent mental or physical power', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'failure', definition: 'Lack of success', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fallacy', definition: 'A mistaken belief based on unsound argument', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fame', definition: 'The condition of being known by many people', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'famine', definition: 'Extreme scarcity of food', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fascination', definition: 'The power to fascinate someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fashion', definition: 'A popular trend in styles of dress', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fatigue', definition: 'Extreme tiredness resulting from mental or physical exertion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'feasibility', definition: 'The state of being possible', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'feature', definition: 'A distinctive attribute or aspect', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
];

async function seedBatch8(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ACADEMIC_NOUNS_3, ...ACADEMIC_NOUNS_4];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 8: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 8 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 8');
  console.log('Academic Nouns - Parts 3 & 4');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch8(supabase);
  
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
