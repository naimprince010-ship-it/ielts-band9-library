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
    throw new Error(
      'Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.'
    );
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

function extractWordsFromCollocations(collocations: string[]): string[] {
  const words: string[] = [];
  for (const collocation of collocations) {
    const parts = collocation.split(/[\s+\-\/]+/);
    for (const part of parts) {
      const cleaned = part.toLowerCase().replace(/[^a-z]/g, '');
      if (cleaned.length > 2) {
        words.push(cleaned);
      }
    }
  }
  return words;
}

function extractWordsFromExamples(examples: { sentence: string; explanation: string }[]): string[] {
  const words: string[] = [];
  const wordPattern = /["']([a-zA-Z\s\-]+)["']/g;
  
  for (const example of examples) {
    let match;
    while ((match = wordPattern.exec(example.explanation)) !== null) {
      const word = match[1].toLowerCase().trim();
      if (word.length > 2 && !word.includes(' ')) {
        words.push(word);
      }
    }
  }
  return words;
}

async function seedVocabularyFromIELTSWordList(supabase: SupabaseClient): Promise<void> {
  console.log('Generating comprehensive IELTS vocabulary word list...');
  
  const ieltsWords: VocabularyWord[] = [
    // Education & Learning
    { word: 'curriculum', definition: 'The subjects comprising a course of study', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
    { word: 'pedagogy', definition: 'The method and practice of teaching', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'advanced' },
    { word: 'literacy', definition: 'The ability to read and write', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
    { word: 'cognitive', definition: 'Related to mental processes of perception, memory, judgment', part_of_speech: 'adjective', topic: 'Education', difficulty_level: 'advanced' },
    { word: 'academic', definition: 'Related to education and scholarship', part_of_speech: 'adjective', topic: 'Education', difficulty_level: 'intermediate' },
    { word: 'scholarship', definition: 'Academic study or achievement; a grant for education', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
    { word: 'tuition', definition: 'Teaching or instruction; fees for education', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
    { word: 'enroll', definition: 'To register or sign up for a course', part_of_speech: 'verb', topic: 'Education', difficulty_level: 'beginner' },
    { word: 'graduate', definition: 'To complete a course of study', part_of_speech: 'verb', topic: 'Education', difficulty_level: 'beginner' },
    { word: 'dissertation', definition: 'A long essay on a particular subject for a degree', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'advanced' },
    { word: 'thesis', definition: 'A statement or theory put forward to be proved', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'advanced' },
    { word: 'seminar', definition: 'A class for discussion and research', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
    { word: 'lecture', definition: 'An educational talk to an audience', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'beginner' },
    { word: 'syllabus', definition: 'An outline of subjects in a course', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
    { word: 'assessment', definition: 'The evaluation of student performance', part_of_speech: 'noun', topic: 'Education', difficulty_level: 'intermediate' },
    
    // Environment & Climate
    { word: 'sustainable', definition: 'Able to be maintained at a certain rate or level', part_of_speech: 'adjective', topic: 'Environment', difficulty_level: 'intermediate' },
    { word: 'biodiversity', definition: 'The variety of plant and animal life', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'advanced' },
    { word: 'ecosystem', definition: 'A biological community of interacting organisms', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
    { word: 'conservation', definition: 'Prevention of wasteful use of resources', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
    { word: 'pollution', definition: 'The presence of harmful substances in the environment', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'beginner' },
    { word: 'emissions', definition: 'The production and discharge of gases', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
    { word: 'renewable', definition: 'Capable of being replaced by natural processes', part_of_speech: 'adjective', topic: 'Environment', difficulty_level: 'intermediate' },
    { word: 'deforestation', definition: 'The clearing of forests', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
    { word: 'extinction', definition: 'The state of a species no longer existing', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
    { word: 'habitat', definition: 'The natural home of an animal or plant', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
    { word: 'carbon', definition: 'A chemical element; carbon dioxide emissions', part_of_speech: 'noun', topic: 'Environment', difficulty_level: 'intermediate' },
    { word: 'greenhouse', definition: 'Related to gases that trap heat in atmosphere', part_of_speech: 'adjective', topic: 'Environment', difficulty_level: 'intermediate' },
    { word: 'recycle', definition: 'To convert waste into reusable material', part_of_speech: 'verb', topic: 'Environment', difficulty_level: 'beginner' },
    { word: 'contaminate', definition: 'To make impure by exposure to pollutants', part_of_speech: 'verb', topic: 'Environment', difficulty_level: 'intermediate' },
    { word: 'deplete', definition: 'To use up the supply of something', part_of_speech: 'verb', topic: 'Environment', difficulty_level: 'intermediate' },
    
    // Technology & Innovation
    { word: 'innovation', definition: 'A new method, idea, or product', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'intermediate' },
    { word: 'automation', definition: 'The use of machines to perform tasks', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'intermediate' },
    { word: 'artificial', definition: 'Made by humans rather than occurring naturally', part_of_speech: 'adjective', topic: 'Technology', difficulty_level: 'intermediate' },
    { word: 'digital', definition: 'Relating to computer technology', part_of_speech: 'adjective', topic: 'Technology', difficulty_level: 'beginner' },
    { word: 'virtual', definition: 'Not physically existing but made to appear so', part_of_speech: 'adjective', topic: 'Technology', difficulty_level: 'intermediate' },
    { word: 'algorithm', definition: 'A process or set of rules for calculations', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'advanced' },
    { word: 'cybersecurity', definition: 'Protection of computer systems from theft', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'advanced' },
    { word: 'bandwidth', definition: 'The capacity for data transfer', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'advanced' },
    { word: 'interface', definition: 'A point where two systems meet and interact', part_of_speech: 'noun', topic: 'Technology', difficulty_level: 'intermediate' },
    { word: 'obsolete', definition: 'No longer produced or used; out of date', part_of_speech: 'adjective', topic: 'Technology', difficulty_level: 'intermediate' },
    { word: 'revolutionize', definition: 'To change something radically', part_of_speech: 'verb', topic: 'Technology', difficulty_level: 'intermediate' },
    { word: 'streamline', definition: 'To make more efficient', part_of_speech: 'verb', topic: 'Technology', difficulty_level: 'intermediate' },
    { word: 'integrate', definition: 'To combine one thing with another', part_of_speech: 'verb', topic: 'Technology', difficulty_level: 'intermediate' },
    { word: 'optimize', definition: 'To make the best use of', part_of_speech: 'verb', topic: 'Technology', difficulty_level: 'intermediate' },
    { word: 'disrupt', definition: 'To interrupt or disturb an activity', part_of_speech: 'verb', topic: 'Technology', difficulty_level: 'intermediate' },
    
    // Health & Wellbeing
    { word: 'diagnosis', definition: 'The identification of an illness', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
    { word: 'symptom', definition: 'A physical or mental sign of a condition', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
    { word: 'chronic', definition: 'Persisting for a long time', part_of_speech: 'adjective', topic: 'Health', difficulty_level: 'intermediate' },
    { word: 'acute', definition: 'Severe but short-lasting', part_of_speech: 'adjective', topic: 'Health', difficulty_level: 'intermediate' },
    { word: 'preventive', definition: 'Designed to prevent disease', part_of_speech: 'adjective', topic: 'Health', difficulty_level: 'intermediate' },
    { word: 'pharmaceutical', definition: 'Related to medicinal drugs', part_of_speech: 'adjective', topic: 'Health', difficulty_level: 'advanced' },
    { word: 'epidemic', definition: 'A widespread occurrence of disease', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
    { word: 'pandemic', definition: 'A disease prevalent over a whole country or world', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
    { word: 'immunity', definition: 'Resistance to a particular infection', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
    { word: 'vaccination', definition: 'Treatment to produce immunity', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
    { word: 'nutrition', definition: 'The process of providing food for health', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
    { word: 'sedentary', definition: 'Characterized by much sitting', part_of_speech: 'adjective', topic: 'Health', difficulty_level: 'intermediate' },
    { word: 'obesity', definition: 'The condition of being very overweight', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
    { word: 'therapy', definition: 'Treatment intended to relieve a disorder', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'intermediate' },
    { word: 'rehabilitation', definition: 'Restoration to health through training', part_of_speech: 'noun', topic: 'Health', difficulty_level: 'advanced' },
    
    // Economy & Business
    { word: 'inflation', definition: 'A general increase in prices', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
    { word: 'recession', definition: 'A period of economic decline', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
    { word: 'unemployment', definition: 'The state of being without a job', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
    { word: 'investment', definition: 'The action of investing money', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
    { word: 'revenue', definition: 'Income, especially of a company', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
    { word: 'deficit', definition: 'The amount by which spending exceeds income', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
    { word: 'surplus', definition: 'An amount left over when requirements are met', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
    { word: 'commodity', definition: 'A raw material or agricultural product', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
    { word: 'tariff', definition: 'A tax on imports or exports', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'advanced' },
    { word: 'subsidy', definition: 'Money granted by government to assist', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
    { word: 'monopoly', definition: 'Exclusive control of a commodity or service', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
    { word: 'entrepreneur', definition: 'A person who starts a business', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
    { word: 'bankruptcy', definition: 'The state of being unable to pay debts', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
    { word: 'fluctuate', definition: 'To rise and fall irregularly', part_of_speech: 'verb', topic: 'Economy', difficulty_level: 'intermediate' },
    { word: 'diversify', definition: 'To make or become more varied', part_of_speech: 'verb', topic: 'Economy', difficulty_level: 'intermediate' },
    
    // Society & Culture
    { word: 'demographic', definition: 'Relating to population statistics', part_of_speech: 'adjective', topic: 'Society', difficulty_level: 'advanced' },
    { word: 'urbanization', definition: 'The process of making an area more urban', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
    { word: 'migration', definition: 'Movement from one place to another', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
    { word: 'integration', definition: 'The process of combining into a whole', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
    { word: 'discrimination', definition: 'Unjust treatment based on category', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
    { word: 'inequality', definition: 'Difference in size, degree, or circumstances', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
    { word: 'diversity', definition: 'The state of being diverse; variety', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
    { word: 'heritage', definition: 'Valued objects and qualities passed down', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
    { word: 'tradition', definition: 'A custom passed through generations', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'beginner' },
    { word: 'stereotype', definition: 'A widely held but oversimplified image', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
    { word: 'prejudice', definition: 'Preconceived opinion not based on reason', part_of_speech: 'noun', topic: 'Society', difficulty_level: 'intermediate' },
    { word: 'assimilate', definition: 'To absorb into a wider society', part_of_speech: 'verb', topic: 'Society', difficulty_level: 'advanced' },
    { word: 'marginalize', definition: 'To treat as insignificant', part_of_speech: 'verb', topic: 'Society', difficulty_level: 'advanced' },
    { word: 'empower', definition: 'To give power or authority to', part_of_speech: 'verb', topic: 'Society', difficulty_level: 'intermediate' },
    { word: 'advocate', definition: 'To publicly support or recommend', part_of_speech: 'verb', topic: 'Society', difficulty_level: 'intermediate' },
    
    // Government & Law
    { word: 'legislation', definition: 'Laws considered collectively', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
    { word: 'regulation', definition: 'A rule made by an authority', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
    { word: 'policy', definition: 'A course of action adopted by government', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
    { word: 'democracy', definition: 'A system of government by the people', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
    { word: 'bureaucracy', definition: 'A system of government with many officials', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'advanced' },
    { word: 'jurisdiction', definition: 'The official power to make legal decisions', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'advanced' },
    { word: 'constitution', definition: 'A body of fundamental principles', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
    { word: 'amendment', definition: 'A change or addition to a legal document', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
    { word: 'sovereignty', definition: 'Supreme power or authority', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'advanced' },
    { word: 'referendum', definition: 'A general vote on a single political question', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'advanced' },
    { word: 'sanction', definition: 'A penalty for disobeying a law', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
    { word: 'enforce', definition: 'To compel observance of a law', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
    { word: 'implement', definition: 'To put a decision or plan into effect', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
    { word: 'abolish', definition: 'To formally put an end to', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
    { word: 'ratify', definition: 'To give formal consent to', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'advanced' },
    
    // Media & Communication
    { word: 'broadcast', definition: 'To transmit by radio or television', part_of_speech: 'verb', topic: 'Media', difficulty_level: 'intermediate' },
    { word: 'journalism', definition: 'The activity of writing for newspapers', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
    { word: 'propaganda', definition: 'Information used to promote a cause', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
    { word: 'censorship', definition: 'The suppression of speech or information', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
    { word: 'bias', definition: 'Prejudice for or against something', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
    { word: 'credibility', definition: 'The quality of being trusted', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
    { word: 'viral', definition: 'Spreading rapidly through the internet', part_of_speech: 'adjective', topic: 'Media', difficulty_level: 'intermediate' },
    { word: 'mainstream', definition: 'The ideas accepted by most people', part_of_speech: 'adjective', topic: 'Media', difficulty_level: 'intermediate' },
    { word: 'anonymous', definition: 'Not identified by name', part_of_speech: 'adjective', topic: 'Media', difficulty_level: 'intermediate' },
    { word: 'controversial', definition: 'Giving rise to public disagreement', part_of_speech: 'adjective', topic: 'Media', difficulty_level: 'intermediate' },
    { word: 'sensationalize', definition: 'To present in an exaggerated way', part_of_speech: 'verb', topic: 'Media', difficulty_level: 'advanced' },
    { word: 'disseminate', definition: 'To spread information widely', part_of_speech: 'verb', topic: 'Media', difficulty_level: 'advanced' },
    { word: 'manipulate', definition: 'To control or influence cleverly', part_of_speech: 'verb', topic: 'Media', difficulty_level: 'intermediate' },
    { word: 'verify', definition: 'To make sure something is true', part_of_speech: 'verb', topic: 'Media', difficulty_level: 'intermediate' },
    { word: 'publicize', definition: 'To make widely known', part_of_speech: 'verb', topic: 'Media', difficulty_level: 'intermediate' },
    
    // Science & Research
    { word: 'hypothesis', definition: 'A proposed explanation for a phenomenon', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
    { word: 'experiment', definition: 'A scientific procedure to test a hypothesis', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'beginner' },
    { word: 'methodology', definition: 'A system of methods used in research', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'advanced' },
    { word: 'empirical', definition: 'Based on observation or experience', part_of_speech: 'adjective', topic: 'Science', difficulty_level: 'advanced' },
    { word: 'theoretical', definition: 'Based on theory rather than practice', part_of_speech: 'adjective', topic: 'Science', difficulty_level: 'intermediate' },
    { word: 'quantitative', definition: 'Relating to quantity or amount', part_of_speech: 'adjective', topic: 'Science', difficulty_level: 'advanced' },
    { word: 'qualitative', definition: 'Relating to quality or character', part_of_speech: 'adjective', topic: 'Science', difficulty_level: 'advanced' },
    { word: 'correlation', definition: 'A mutual relationship between things', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'advanced' },
    { word: 'variable', definition: 'An element that may change', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
    { word: 'phenomenon', definition: 'A fact or situation observed to exist', part_of_speech: 'noun', topic: 'Science', difficulty_level: 'intermediate' },
    { word: 'analyze', definition: 'To examine in detail', part_of_speech: 'verb', topic: 'Science', difficulty_level: 'intermediate' },
    { word: 'synthesize', definition: 'To combine elements into a whole', part_of_speech: 'verb', topic: 'Science', difficulty_level: 'advanced' },
    { word: 'validate', definition: 'To check or prove the validity of', part_of_speech: 'verb', topic: 'Science', difficulty_level: 'intermediate' },
    { word: 'replicate', definition: 'To make an exact copy of', part_of_speech: 'verb', topic: 'Science', difficulty_level: 'intermediate' },
    { word: 'conclude', definition: 'To bring to an end; to deduce', part_of_speech: 'verb', topic: 'Science', difficulty_level: 'intermediate' },
    
    // Work & Career
    { word: 'occupation', definition: 'A job or profession', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
    { word: 'profession', definition: 'A paid occupation requiring training', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
    { word: 'qualification', definition: 'A quality or accomplishment for a job', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
    { word: 'competence', definition: 'The ability to do something successfully', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
    { word: 'promotion', definition: 'Advancement to a higher position', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
    { word: 'redundancy', definition: 'The state of being no longer needed', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
    { word: 'freelance', definition: 'Working for different companies', part_of_speech: 'adjective', topic: 'Work', difficulty_level: 'intermediate' },
    { word: 'remote', definition: 'Working from a location away from office', part_of_speech: 'adjective', topic: 'Work', difficulty_level: 'intermediate' },
    { word: 'collaborative', definition: 'Involving two or more parties working together', part_of_speech: 'adjective', topic: 'Work', difficulty_level: 'intermediate' },
    { word: 'productive', definition: 'Achieving a significant amount', part_of_speech: 'adjective', topic: 'Work', difficulty_level: 'intermediate' },
    { word: 'delegate', definition: 'To entrust a task to another person', part_of_speech: 'verb', topic: 'Work', difficulty_level: 'intermediate' },
    { word: 'supervise', definition: 'To observe and direct the work of', part_of_speech: 'verb', topic: 'Work', difficulty_level: 'intermediate' },
    { word: 'recruit', definition: 'To enlist new members or employees', part_of_speech: 'verb', topic: 'Work', difficulty_level: 'intermediate' },
    { word: 'resign', definition: 'To voluntarily leave a job', part_of_speech: 'verb', topic: 'Work', difficulty_level: 'intermediate' },
    { word: 'negotiate', definition: 'To discuss to reach an agreement', part_of_speech: 'verb', topic: 'Work', difficulty_level: 'intermediate' },
    
    // Academic Writing Words
    { word: 'significant', definition: 'Sufficiently great or important', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'substantial', definition: 'Of considerable importance or size', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'fundamental', definition: 'Forming a necessary base', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'comprehensive', definition: 'Complete; including all elements', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'prevalent', definition: 'Widespread in a particular area', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
    { word: 'inherent', definition: 'Existing as a natural part', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
    { word: 'explicit', definition: 'Stated clearly and in detail', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'implicit', definition: 'Implied though not directly expressed', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'subsequent', definition: 'Coming after something in time', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'prior', definition: 'Existing or coming before', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'constitute', definition: 'To be a part of a whole', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'comprise', definition: 'To consist of; to be made up of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'derive', definition: 'To obtain something from a source', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'establish', definition: 'To set up on a permanent basis', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'indicate', definition: 'To point out; to show', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    
    // Linking Words & Discourse Markers
    { word: 'furthermore', definition: 'In addition; besides', part_of_speech: 'adverb', topic: 'Linking', difficulty_level: 'intermediate' },
    { word: 'moreover', definition: 'As a further matter; besides', part_of_speech: 'adverb', topic: 'Linking', difficulty_level: 'intermediate' },
    { word: 'nevertheless', definition: 'In spite of that; notwithstanding', part_of_speech: 'adverb', topic: 'Linking', difficulty_level: 'intermediate' },
    { word: 'consequently', definition: 'As a result', part_of_speech: 'adverb', topic: 'Linking', difficulty_level: 'intermediate' },
    { word: 'subsequently', definition: 'After a particular thing has happened', part_of_speech: 'adverb', topic: 'Linking', difficulty_level: 'intermediate' },
    { word: 'alternatively', definition: 'As another option', part_of_speech: 'adverb', topic: 'Linking', difficulty_level: 'intermediate' },
    { word: 'conversely', definition: 'Introducing a statement that contrasts', part_of_speech: 'adverb', topic: 'Linking', difficulty_level: 'advanced' },
    { word: 'likewise', definition: 'In the same way; also', part_of_speech: 'adverb', topic: 'Linking', difficulty_level: 'intermediate' },
    { word: 'hence', definition: 'As a consequence; for this reason', part_of_speech: 'adverb', topic: 'Linking', difficulty_level: 'intermediate' },
    { word: 'thereby', definition: 'By that means; as a result of that', part_of_speech: 'adverb', topic: 'Linking', difficulty_level: 'advanced' },
    
    // Additional common IELTS words
    { word: 'adequate', definition: 'Sufficient for a specific need', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'apparent', definition: 'Clearly visible or understood', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'appropriate', definition: 'Suitable or proper in the circumstances', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'beneficial', definition: 'Favorable or advantageous', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'considerable', definition: 'Notably large in size or amount', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'consistent', definition: 'Acting in the same way over time', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'crucial', definition: 'Of great importance', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'distinct', definition: 'Recognizably different', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'dominant', definition: 'Most important or influential', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'evident', definition: 'Plain or obvious', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'feasible', definition: 'Possible to do easily', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'inevitable', definition: 'Certain to happen', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'initial', definition: 'Existing or occurring at the beginning', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'potential', definition: 'Having the capacity to develop', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'primary', definition: 'Of chief importance', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'relevant', definition: 'Closely connected to the matter', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'specific', definition: 'Clearly defined or identified', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'sufficient', definition: 'Enough; adequate', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'valid', definition: 'Having a sound basis', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'achieve', definition: 'To successfully reach a goal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'acquire', definition: 'To buy or obtain', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'affect', definition: 'To have an effect on', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'allocate', definition: 'To distribute for a particular purpose', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'alter', definition: 'To change or modify', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'assess', definition: 'To evaluate or estimate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'assume', definition: 'To suppose to be the case', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'attribute', definition: 'To regard as being caused by', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'clarify', definition: 'To make less confused', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'commit', definition: 'To carry out or perpetrate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'communicate', definition: 'To share or exchange information', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'concentrate', definition: 'To focus attention or effort', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'conduct', definition: 'To organize and carry out', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'confirm', definition: 'To establish the truth of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'contribute', definition: 'To give in order to help achieve', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'convert', definition: 'To change the form or function', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'create', definition: 'To bring into existence', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'beginner' },
    { word: 'decline', definition: 'To become smaller or fewer', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'define', definition: 'To state the exact meaning', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'demonstrate', definition: 'To clearly show the existence of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'distribute', definition: 'To give shares of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'dominate', definition: 'To have a commanding influence', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'eliminate', definition: 'To completely remove', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'emerge', definition: 'To move out of or become apparent', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'emphasize', definition: 'To give special importance to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'enable', definition: 'To give the ability to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'enhance', definition: 'To intensify or improve', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'ensure', definition: 'To make certain that something happens', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'estimate', definition: 'To roughly calculate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'evaluate', definition: 'To form an idea of the value', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'expand', definition: 'To become or make larger', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'expose', definition: 'To make visible or reveal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'facilitate', definition: 'To make an action easier', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'focus', definition: 'To concentrate attention on', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'generate', definition: 'To cause to arise or come about', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'identify', definition: 'To establish the identity of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'illustrate', definition: 'To explain by using examples', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'imply', definition: 'To strongly suggest the truth', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'impose', definition: 'To force something to be accepted', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'influence', definition: 'To have an effect on', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'initiate', definition: 'To cause a process to begin', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'interpret', definition: 'To explain the meaning of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'investigate', definition: 'To carry out research', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'involve', definition: 'To include as a necessary part', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'justify', definition: 'To show to be right or reasonable', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'maintain', definition: 'To cause to continue', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'modify', definition: 'To make partial changes to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'obtain', definition: 'To get or acquire', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'occur', definition: 'To happen or take place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'participate', definition: 'To take part in', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'perceive', definition: 'To become aware of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'predict', definition: 'To say what will happen', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'promote', definition: 'To further the progress of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'pursue', definition: 'To follow in order to catch', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'react', definition: 'To respond to something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'recognize', definition: 'To identify from previous encounters', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'reduce', definition: 'To make smaller or less', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'reflect', definition: 'To think deeply about', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'regulate', definition: 'To control by means of rules', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'rely', definition: 'To depend on with confidence', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'remove', definition: 'To take away from a place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'require', definition: 'To need for a particular purpose', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'resolve', definition: 'To settle or find a solution', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'respond', definition: 'To say something in reply', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'restrict', definition: 'To put a limit on', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'retain', definition: 'To continue to have', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'reveal', definition: 'To make known', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'seek', definition: 'To attempt to find', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'select', definition: 'To carefully choose', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'shift', definition: 'To move or change', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'specify', definition: 'To identify clearly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'submit', definition: 'To present for consideration', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'summarize', definition: 'To give a brief statement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'support', definition: 'To give assistance to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'sustain', definition: 'To strengthen or support', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'transfer', definition: 'To move from one place to another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'transform', definition: 'To make a thorough change', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'undergo', definition: 'To experience or be subjected to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'utilize', definition: 'To make practical use of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
    { word: 'vary', definition: 'To differ in size or amount', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  ];

  console.log(`Total words to seed: ${ieltsWords.length}`);
  
  let insertedCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < ieltsWords.length; i += BATCH_SIZE) {
    const batch = ieltsWords.slice(i, i + BATCH_SIZE);
    
    const { data, error } = await supabase
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
  
  console.log(`\nSeeding complete!`);
  console.log(`Successfully inserted: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Seed Script');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedVocabularyFromIELTSWordList(supabase);
  
  const { count, error } = await supabase
    .from('vocabulary')
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.error('Error getting final count:', error.message);
  } else {
    console.log(`\nFinal vocabulary count: ${count}`);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
