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

// Academic Nouns - Part 5
const ACADEMIC_NOUNS_5: VocabularyWord[] = [
  { word: 'federation', definition: 'A group of states with a central government', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'feedback', definition: 'Information about reactions to a product', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fellowship', definition: 'A group of people meeting to pursue a shared interest', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fertility', definition: 'The quality of being fertile', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fiber', definition: 'A thread or filament from which a textile is formed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fiction', definition: 'Literature describing imaginary events', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fidelity', definition: 'Faithfulness to a person or cause', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'field', definition: 'An area of open land', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'figure', definition: 'A number or numerical symbol', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'file', definition: 'A folder or box for holding loose papers', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'filter', definition: 'A porous device for removing impurities', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'finance', definition: 'The management of large amounts of money', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'finding', definition: 'A conclusion reached as a result of inquiry', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'flexibility', definition: 'The quality of bending easily without breaking', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fluctuation', definition: 'An irregular rising and falling in number', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fluency', definition: 'The ability to speak or write a language easily', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'flux', definition: 'The action of flowing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'focus', definition: 'The center of interest or activity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'forecast', definition: 'A prediction of what will happen', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'foreground', definition: 'The part of a view that is nearest to the observer', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'foresight', definition: 'The ability to predict what will happen', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'format', definition: 'The way in which something is arranged', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'formation', definition: 'The action of forming or process of being formed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'formula', definition: 'A mathematical relationship expressed in symbols', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'formulation', definition: 'The action of creating or preparing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fortitude', definition: 'Courage in pain or adversity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'forum', definition: 'A place or meeting for open discussion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fossil', definition: 'The remains of a prehistoric organism', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'foundation', definition: 'The lowest load-bearing part of a building', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fraction', definition: 'A numerical quantity that is not a whole number', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fragmentation', definition: 'The process of breaking into fragments', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'framework', definition: 'A basic structure underlying a system', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'franchise', definition: 'An authorization to sell a company\'s goods', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fraud', definition: 'Wrongful deception intended to result in financial gain', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'freedom', definition: 'The state of being free', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'frequency', definition: 'The rate at which something occurs', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'friction', definition: 'The resistance that one surface encounters', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'frontier', definition: 'A line or border separating two countries', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'frustration', definition: 'The feeling of being upset or annoyed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fulfillment', definition: 'Satisfaction gained from developing abilities', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'function', definition: 'An activity that is natural to a purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fund', definition: 'A sum of money saved for a particular purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fundamental', definition: 'A central or primary rule or principle', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'funding', definition: 'Money provided for a particular purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'fusion', definition: 'The process of joining two things together', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'futility', definition: 'Pointlessness or uselessness', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'gain', definition: 'An increase in wealth or resources', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'gap', definition: 'A break or hole in an object', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'gauge', definition: 'An instrument for measuring', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'gender', definition: 'The state of being male or female', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'gene', definition: 'A unit of heredity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'generalization', definition: 'A general statement derived from specific cases', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'generation', definition: 'All of the people born at about the same time', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'generosity', definition: 'The quality of being kind and generous', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'genesis', definition: 'The origin or mode of formation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'genre', definition: 'A category of artistic composition', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'geography', definition: 'The study of physical features of the earth', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'geology', definition: 'The science that deals with the earth\'s physical structure', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'gesture', definition: 'A movement of part of the body', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'globalization', definition: 'The process of international integration', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'goal', definition: 'The object of a person\'s ambition', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'governance', definition: 'The action of governing a state', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'gradient', definition: 'An inclined part of a road or railway', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'grant', definition: 'A sum of money given by an organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'graph', definition: 'A diagram showing the relation between quantities', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'gravity', definition: 'The force that attracts a body toward the earth', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'grid', definition: 'A framework of spaced bars', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'grievance', definition: 'A real or imagined wrong causing resentment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'gross', definition: 'The overall total', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ground', definition: 'The solid surface of the earth', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'groundwork', definition: 'Preliminary work as a foundation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'growth', definition: 'The process of increasing in physical size', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'guarantee', definition: 'A formal promise or assurance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'guidance', definition: 'Advice or information aimed at resolving a problem', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'guideline', definition: 'A general rule or piece of advice', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'habitat', definition: 'The natural home of an animal or plant', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'hallmark', definition: 'A distinctive feature', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'handicap', definition: 'A condition that restricts ability', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'handling', definition: 'The act of touching or managing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'hardship', definition: 'Severe suffering or privation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'harmony', definition: 'The combination of simultaneously sounded notes', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'harvest', definition: 'The process of gathering in crops', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'hazard', definition: 'A danger or risk', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'heading', definition: 'A title at the head of a page or section', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'headquarters', definition: 'The premises occupied by a military commander', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'health', definition: 'The state of being free from illness', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'hearing', definition: 'The faculty of perceiving sounds', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'height', definition: 'The measurement from base to top', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'heir', definition: 'A person legally entitled to property', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'hemisphere', definition: 'A half of a sphere', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'heritage', definition: 'Property that is inherited', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'hesitation', definition: 'The action of pausing before saying or doing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'hierarchy', definition: 'A system in which members are ranked', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'highlight', definition: 'An outstanding part of an event', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'hindrance', definition: 'A thing that provides resistance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'historian', definition: 'An expert in or student of history', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'homogeneity', definition: 'The quality of being all the same', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
];

// Academic Nouns - Part 6
const ACADEMIC_NOUNS_6: VocabularyWord[] = [
  { word: 'horizon', definition: 'The line at which the earth\'s surface and sky appear to meet', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'hospitality', definition: 'The friendly reception of guests', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'hostility', definition: 'Hostile behavior; unfriendliness', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'household', definition: 'A house and its occupants', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'humanity', definition: 'Human beings collectively', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'humiliation', definition: 'The action of humiliating someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'humility', definition: 'A modest view of one\'s own importance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'hypothesis', definition: 'A supposition made as a starting point', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'icon', definition: 'A person or thing regarded as a representative symbol', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ideal', definition: 'A person or thing regarded as perfect', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'identification', definition: 'The action of identifying someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'identity', definition: 'The fact of being who or what a person is', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ideology', definition: 'A system of ideas and ideals', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ignorance', definition: 'Lack of knowledge or information', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'illustration', definition: 'A picture illustrating a book', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'image', definition: 'A representation of the external form', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'imagination', definition: 'The faculty of forming new ideas', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'imbalance', definition: 'Lack of proportion or relation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'imitation', definition: 'The action of using someone as a model', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'immigration', definition: 'The action of coming to live permanently', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'impact', definition: 'The action of one object coming forcibly into contact', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'impediment', definition: 'A hindrance or obstruction', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'imperative', definition: 'An essential or urgent thing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'implementation', definition: 'The process of putting a decision into effect', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'implication', definition: 'The conclusion that can be drawn', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'import', definition: 'A commodity brought in from abroad', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'importance', definition: 'The state of being of great significance', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'imposition', definition: 'The action of imposing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'impression', definition: 'An idea or opinion of what something is like', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'improvement', definition: 'An instance of improving', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'impulse', definition: 'A sudden strong urge to act', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inability', definition: 'The state of being unable to do something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inadequacy', definition: 'The state of being inadequate', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'incentive', definition: 'A thing that motivates or encourages', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'incidence', definition: 'The occurrence or rate of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'incident', definition: 'An event or occurrence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inclination', definition: 'A person\'s natural tendency to act', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inclusion', definition: 'The action of including or being included', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'income', definition: 'Money received for work or investments', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'incompatibility', definition: 'Inability to exist together', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inconsistency', definition: 'The fact of being inconsistent', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'incorporation', definition: 'The inclusion of something as part of a whole', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'increase', definition: 'An instance of growing or making greater', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'increment', definition: 'An increase or addition', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'independence', definition: 'The fact of being independent', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'index', definition: 'An alphabetical list of names or subjects', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'indication', definition: 'A sign or piece of information', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'indicator', definition: 'A thing that indicates the state', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'indifference', definition: 'Lack of interest or concern', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'individual', definition: 'A single human being', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'individualism', definition: 'The habit of being independent', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'induction', definition: 'The action of inducing or bringing about', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'industrialization', definition: 'The development of industries', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'industry', definition: 'Economic activity concerned with processing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inefficiency', definition: 'The state of not achieving maximum productivity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inequality', definition: 'Difference in size or degree', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inevitability', definition: 'The quality of being certain to happen', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'infancy', definition: 'The state of being an infant', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'infection', definition: 'The process of infecting or being infected', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inference', definition: 'A conclusion reached on the basis of evidence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inflation', definition: 'A general increase in prices', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'influence', definition: 'The capacity to have an effect on character', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'influx', definition: 'An arrival of large numbers of people', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'information', definition: 'Facts provided or learned about something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'infrastructure', definition: 'The basic physical systems of a country', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ingredient', definition: 'Any of the foods that are combined', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inhabitant', definition: 'A person or animal that lives in a place', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inheritance', definition: 'A thing that is inherited', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inhibition', definition: 'A feeling that makes one unable to act', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'initiative', definition: 'The ability to assess and initiate things', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'injection', definition: 'An instance of injecting or being injected', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'injury', definition: 'An instance of being injured', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'injustice', definition: 'Lack of fairness or justice', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'innovation', definition: 'A new method or idea', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'input', definition: 'What is put in or taken in', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inquiry', definition: 'An act of asking for information', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'insertion', definition: 'The action of inserting something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'insight', definition: 'The capacity to gain an accurate understanding', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inspection', definition: 'Careful examination or scrutiny', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'inspiration', definition: 'The process of being mentally stimulated', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'instability', definition: 'Lack of stability', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'installation', definition: 'The action of installing someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'instance', definition: 'An example or single occurrence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'instinct', definition: 'An innate pattern of behavior', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'institution', definition: 'A society or organization founded for a purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'instruction', definition: 'A direction or order', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'instrument', definition: 'A tool or implement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'insufficiency', definition: 'The condition of being insufficient', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'insurance', definition: 'A practice of providing compensation for loss', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'integration', definition: 'The action of integrating', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'integrity', definition: 'The quality of being honest', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'intellect', definition: 'The faculty of reasoning and understanding', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'intelligence', definition: 'The ability to acquire and apply knowledge', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'intensity', definition: 'The quality of being intense', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'intention', definition: 'A thing intended; an aim or plan', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'interaction', definition: 'Reciprocal action or influence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'interest', definition: 'The state of wanting to know about something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'intermediate' },
];

async function seedBatch9(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ACADEMIC_NOUNS_5, ...ACADEMIC_NOUNS_6];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 9: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 9 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 9');
  console.log('Academic Nouns - Parts 5 & 6');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch9(supabase);
  
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
