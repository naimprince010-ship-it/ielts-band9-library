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

// Arts, Culture and Literature Vocabulary
const ARTS_CULTURE: VocabularyWord[] = [
  { word: 'abstract', definition: 'Relating to or denoting art that does not attempt to represent external reality', part_of_speech: 'adjective', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'aesthetic', definition: 'Concerned with beauty or the appreciation of beauty', part_of_speech: 'adjective', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'allegory', definition: 'A story or poem that can be interpreted to reveal a hidden meaning', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'advanced' },
  { word: 'anthology', definition: 'A published collection of poems or other pieces of writing', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'architecture', definition: 'The art or practice of designing buildings', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'artifact', definition: 'An object made by a human being', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'artistic', definition: 'Having or revealing natural creative skill', part_of_speech: 'adjective', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'authentic', definition: 'Of undisputed origin; genuine', part_of_speech: 'adjective', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'autobiography', definition: 'An account of a person\'s life written by that person', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'avant-garde', definition: 'New and experimental ideas in art', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'advanced' },
  { word: 'biography', definition: 'An account of someone\'s life written by someone else', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'canvas', definition: 'A piece of cloth used as a surface for oil painting', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'caricature', definition: 'A picture giving a ludicrously exaggerated representation', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'ceramic', definition: 'Made of clay and hardened by heat', part_of_speech: 'adjective', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'choreography', definition: 'The sequence of steps in a dance', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'classical', definition: 'Relating to ancient Greek or Latin literature or art', part_of_speech: 'adjective', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'collage', definition: 'A piece of art made by sticking various materials together', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'comedy', definition: 'A play characterized by humor and a happy ending', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'composition', definition: 'The way in which a whole is made up', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'contemporary', definition: 'Living or occurring at the same time', part_of_speech: 'adjective', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'contrast', definition: 'The state of being strikingly different', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'craft', definition: 'An activity involving skill in making things by hand', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'creative', definition: 'Relating to or involving the use of imagination', part_of_speech: 'adjective', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'critic', definition: 'A person who judges the merits of literary or artistic works', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'critique', definition: 'A detailed analysis and assessment', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'cubism', definition: 'An early 20th-century style of painting', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'advanced' },
  { word: 'curator', definition: 'A keeper of a museum or other collection', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'depict', definition: 'To show or represent by a drawing or painting', part_of_speech: 'verb', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'dialogue', definition: 'Conversation between two or more people', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'drama', definition: 'A play for theater, radio, or television', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'epic', definition: 'A long poem narrating heroic deeds', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'essay', definition: 'A short piece of writing on a particular subject', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'exhibition', definition: 'A public display of works of art', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'expressionism', definition: 'A style of painting emphasizing emotional experience', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'advanced' },
  { word: 'fable', definition: 'A short story conveying a moral', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'fiction', definition: 'Literature describing imaginary events and people', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'figurative', definition: 'Departing from a literal use of words', part_of_speech: 'adjective', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'folklore', definition: 'The traditional beliefs and stories of a community', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'gallery', definition: 'A room or building for the display of art', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'genre', definition: 'A category of artistic composition', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'heritage', definition: 'Valued objects and qualities passed down', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'illustration', definition: 'A picture illustrating a book or newspaper', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'imagery', definition: 'Visually descriptive language', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'impressionism', definition: 'A 19th-century art movement', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'advanced' },
  { word: 'inspiration', definition: 'The process of being mentally stimulated', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'interpretation', definition: 'The action of explaining the meaning of something', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'irony', definition: 'The expression of meaning through language that normally signifies the opposite', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'landscape', definition: 'A picture representing an area of countryside', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'legend', definition: 'A traditional story sometimes popularly regarded as historical', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'literary', definition: 'Concerning the writing or study of literature', part_of_speech: 'adjective', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'literature', definition: 'Written works, especially those regarded as having artistic merit', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'lyric', definition: 'Expressing the writer\'s emotions', part_of_speech: 'adjective', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'manuscript', definition: 'A book or document written by hand', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'masterpiece', definition: 'A work of outstanding artistry', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'medieval', definition: 'Relating to the Middle Ages', part_of_speech: 'adjective', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'memoir', definition: 'A historical account written from personal knowledge', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'metaphor', definition: 'A figure of speech making an implicit comparison', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'minimalism', definition: 'A style using simple forms and structures', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'modernism', definition: 'A movement in the arts embracing change', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'monologue', definition: 'A long speech by one actor in a play', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'mosaic', definition: 'A picture made by arranging small colored pieces', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'mural', definition: 'A painting applied directly to a wall', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'museum', definition: 'A building housing a collection of artifacts', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'myth', definition: 'A traditional story explaining natural or social phenomena', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'narrative', definition: 'A spoken or written account of connected events', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'novel', definition: 'A fictitious prose narrative of book length', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'opera', definition: 'A dramatic work set to music', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'orchestra', definition: 'A group of instrumentalists', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'palette', definition: 'A thin board on which an artist mixes colors', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'parody', definition: 'An imitation of the style of a writer or artist', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'patron', definition: 'A person who gives financial support to the arts', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'performance', definition: 'An act of staging or presenting a play or concert', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'perspective', definition: 'The art of representing three-dimensional objects', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'playwright', definition: 'A person who writes plays', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'plot', definition: 'The main events of a play, novel, or film', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'poem', definition: 'A piece of writing in verse', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'poetry', definition: 'Literary work in which language is used for its aesthetic qualities', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'portrait', definition: 'A painting or photograph of a person', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'postmodern', definition: 'Relating to postmodernism', part_of_speech: 'adjective', topic: 'Arts', difficulty_level: 'advanced' },
  { word: 'prose', definition: 'Written or spoken language in its ordinary form', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'protagonist', definition: 'The leading character in a drama or story', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'realism', definition: 'The attitude of accepting a situation as it is', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'renaissance', definition: 'A revival of art and literature', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'replica', definition: 'An exact copy or model of something', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'restoration', definition: 'The action of returning something to a former condition', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'rhetoric', definition: 'The art of effective speaking or writing', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'rhythm', definition: 'A strong, regular repeated pattern of movement or sound', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'romanticism', definition: 'A movement in the arts emphasizing emotion', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'satire', definition: 'The use of humor to criticize people or ideas', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'scene', definition: 'A sequence of continuous action in a play or film', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'screenplay', definition: 'The script of a film', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'script', definition: 'The written text of a play or film', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'sculpture', definition: 'The art of making three-dimensional figures', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'simile', definition: 'A figure of speech comparing two different things', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'sketch', definition: 'A rough or unfinished drawing', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'sonnet', definition: 'A poem of fourteen lines', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'stanza', definition: 'A group of lines forming a unit in a poem', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'statue', definition: 'A carved or cast figure of a person or animal', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'studio', definition: 'A room where an artist works', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'style', definition: 'A manner of doing something', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'surrealism', definition: 'A 20th-century art movement', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'advanced' },
  { word: 'symbol', definition: 'A thing that represents something else', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'symphony', definition: 'An elaborate musical composition', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'technique', definition: 'A way of carrying out a particular task', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'texture', definition: 'The feel or appearance of a surface', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'theater', definition: 'A building where plays are performed', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'theme', definition: 'The subject of a talk or piece of writing', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'tragedy', definition: 'A play dealing with tragic events', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'verse', definition: 'Writing arranged with a metrical rhythm', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'intermediate' },
  { word: 'virtuoso', definition: 'A person highly skilled in music or another art', part_of_speech: 'noun', topic: 'Arts', difficulty_level: 'advanced' },
];

// Psychology and Human Behavior Vocabulary
const PSYCHOLOGY_BEHAVIOR: VocabularyWord[] = [
  { word: 'addiction', definition: 'The fact of being addicted to a substance', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'adolescence', definition: 'The period following puberty', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'aggression', definition: 'Hostile or violent behavior', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'altruism', definition: 'Selfless concern for the well-being of others', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'advanced' },
  { word: 'amnesia', definition: 'A partial or total loss of memory', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'anxiety', definition: 'A feeling of worry or unease', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'attachment', definition: 'An emotional bond between people', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'attitude', definition: 'A settled way of thinking or feeling', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'behavior', definition: 'The way in which one acts or conducts oneself', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'bias', definition: 'Prejudice in favor of or against something', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'cognition', definition: 'The mental action of acquiring knowledge', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'cognitive', definition: 'Relating to cognition', part_of_speech: 'adjective', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'compulsion', definition: 'An irresistible urge to behave in a certain way', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'conditioning', definition: 'The process of training to behave in a certain way', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'conformity', definition: 'Compliance with standards or rules', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'conscience', definition: 'An inner feeling of right and wrong', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'consciousness', definition: 'The state of being aware', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'delusion', definition: 'A false belief held despite evidence', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'denial', definition: 'Refusal to accept something unpleasant', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'depression', definition: 'A mental condition characterized by feelings of severe despondency', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'developmental', definition: 'Concerned with the development of someone', part_of_speech: 'adjective', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'disorder', definition: 'A state of confusion or disruption', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'ego', definition: 'A person\'s sense of self-importance', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'emotion', definition: 'A strong feeling deriving from circumstances', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'empathy', definition: 'The ability to understand another\'s feelings', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'extrovert', definition: 'An outgoing, socially confident person', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'hallucination', definition: 'An experience involving perception of something not present', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'heredity', definition: 'The passing on of characteristics from parents', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'hypnosis', definition: 'The induction of a state of consciousness', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'identity', definition: 'The fact of being who or what a person is', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'impulse', definition: 'A sudden strong urge to act', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'inhibition', definition: 'A feeling that makes one unable to act naturally', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'innate', definition: 'Inborn; natural', part_of_speech: 'adjective', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'instinct', definition: 'An innate pattern of behavior', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'intelligence', definition: 'The ability to acquire and apply knowledge', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'introvert', definition: 'A shy, reticent person', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'intuition', definition: 'The ability to understand something instinctively', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'maturity', definition: 'The state of being fully developed', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'memory', definition: 'The faculty by which the mind stores information', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'motivation', definition: 'The reason for acting in a particular way', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'neurosis', definition: 'A relatively mild mental illness', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'advanced' },
  { word: 'obsession', definition: 'An idea that continually preoccupies the mind', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'paranoia', definition: 'A mental condition characterized by delusions', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'perception', definition: 'The ability to see, hear, or become aware', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'personality', definition: 'The combination of characteristics that form an individual', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'phobia', definition: 'An extreme or irrational fear', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'prejudice', definition: 'Preconceived opinion not based on reason', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'psyche', definition: 'The human soul, mind, or spirit', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'psychoanalysis', definition: 'A system of psychological theory and therapy', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'advanced' },
  { word: 'psychology', definition: 'The scientific study of the human mind', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'psychosis', definition: 'A severe mental disorder', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'advanced' },
  { word: 'rational', definition: 'Based on or in accordance with reason', part_of_speech: 'adjective', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'reflex', definition: 'An action performed without conscious thought', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'regression', definition: 'A return to a former or less developed state', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'reinforcement', definition: 'The action of strengthening', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'repression', definition: 'The action of subduing someone or something', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'resilience', definition: 'The capacity to recover quickly from difficulties', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'schizophrenia', definition: 'A long-term mental disorder', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'advanced' },
  { word: 'self-esteem', definition: 'Confidence in one\'s own worth', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'sensation', definition: 'A physical feeling or perception', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'stimulus', definition: 'A thing that rouses activity', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'stress', definition: 'A state of mental or emotional strain', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'subconscious', definition: 'The part of the mind not fully aware', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'temperament', definition: 'A person\'s nature as it affects their behavior', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'therapy', definition: 'Treatment intended to relieve or heal a disorder', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'trait', definition: 'A distinguishing quality or characteristic', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'trauma', definition: 'A deeply distressing experience', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'unconscious', definition: 'Not conscious', part_of_speech: 'adjective', topic: 'Psychology', difficulty_level: 'intermediate' },
  { word: 'willpower', definition: 'Control exerted to do something', part_of_speech: 'noun', topic: 'Psychology', difficulty_level: 'intermediate' },
];

// Philosophy and Ethics Vocabulary
const PHILOSOPHY_ETHICS: VocabularyWord[] = [
  { word: 'absolute', definition: 'Not qualified or diminished in any way', part_of_speech: 'adjective', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'abstract', definition: 'Existing in thought or as an idea', part_of_speech: 'adjective', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'aesthetic', definition: 'Concerned with beauty', part_of_speech: 'adjective', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'agnostic', definition: 'A person who believes nothing is known about God', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'altruism', definition: 'Selfless concern for others', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'ambiguity', definition: 'The quality of being open to more than one interpretation', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'analogy', definition: 'A comparison between two things', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'atheism', definition: 'Disbelief in the existence of God', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'autonomy', definition: 'The right of self-government', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'belief', definition: 'An acceptance that something is true', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'benevolence', definition: 'The quality of being well meaning', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'concept', definition: 'An abstract idea', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'conscience', definition: 'An inner feeling of right and wrong', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'consciousness', definition: 'The state of being aware', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'consequentialism', definition: 'The doctrine that actions should be judged by their consequences', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'advanced' },
  { word: 'contemplation', definition: 'Deep reflective thought', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'contradiction', definition: 'A combination of statements that are opposed', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'deduction', definition: 'The inference of particular instances from a general law', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'determinism', definition: 'The doctrine that all events are determined by causes', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'advanced' },
  { word: 'dialectic', definition: 'The art of investigating the truth of opinions', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'advanced' },
  { word: 'dilemma', definition: 'A situation in which a difficult choice has to be made', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'doctrine', definition: 'A belief or set of beliefs held by a group', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'dogma', definition: 'A principle laid down by an authority as true', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'dualism', definition: 'The division of something into two opposed aspects', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'advanced' },
  { word: 'empiricism', definition: 'The theory that knowledge comes from sensory experience', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'advanced' },
  { word: 'enlightenment', definition: 'The action of enlightening', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'epistemology', definition: 'The theory of knowledge', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'advanced' },
  { word: 'essence', definition: 'The intrinsic nature of something', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'ethical', definition: 'Relating to moral principles', part_of_speech: 'adjective', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'ethics', definition: 'Moral principles that govern behavior', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'existence', definition: 'The fact or state of living or having objective reality', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'existentialism', definition: 'A philosophical theory emphasizing individual existence', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'advanced' },
  { word: 'fallacy', definition: 'A mistaken belief based on unsound argument', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'fatalism', definition: 'The belief that all events are predetermined', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'free will', definition: 'The power of acting without constraint', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'hedonism', definition: 'The pursuit of pleasure', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'humanism', definition: 'A rationalist outlook emphasizing human values', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'hypothesis', definition: 'A supposition made as a starting point', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'idealism', definition: 'The practice of forming ideals', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'ideology', definition: 'A system of ideas and ideals', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'immorality', definition: 'The state of not conforming to accepted standards', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'induction', definition: 'The inference of a general law from particular instances', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'inference', definition: 'A conclusion reached on the basis of evidence', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'integrity', definition: 'The quality of being honest', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'justice', definition: 'Just behavior or treatment', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'logic', definition: 'Reasoning conducted according to strict principles', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'materialism', definition: 'A tendency to consider material possessions more important', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'metaphysics', definition: 'The branch of philosophy dealing with first principles', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'advanced' },
  { word: 'morality', definition: 'Principles concerning right and wrong', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'nihilism', definition: 'The rejection of all religious and moral principles', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'advanced' },
  { word: 'objectivity', definition: 'The quality of being objective', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'ontology', definition: 'The branch of metaphysics dealing with being', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'advanced' },
  { word: 'paradox', definition: 'A seemingly absurd statement that may be true', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'perception', definition: 'The ability to see or become aware', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'phenomenon', definition: 'A fact or situation that is observed', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'philosophy', definition: 'The study of fundamental questions', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'pragmatism', definition: 'A practical approach to problems', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'premise', definition: 'A previous statement from which another is inferred', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'principle', definition: 'A fundamental truth or proposition', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'rationalism', definition: 'The practice of basing opinions on reason', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'reality', definition: 'The state of things as they actually exist', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'reason', definition: 'The power of the mind to think logically', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'relativism', definition: 'The doctrine that knowledge is relative', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'advanced' },
  { word: 'skepticism', definition: 'A skeptical attitude', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'stoicism', definition: 'The endurance of pain without complaint', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'subjectivity', definition: 'The quality of being based on personal opinions', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'syllogism', definition: 'A form of reasoning in which a conclusion is drawn', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'advanced' },
  { word: 'theism', definition: 'Belief in the existence of a god', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'theory', definition: 'A supposition explaining something', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'truth', definition: 'The quality of being true', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'utilitarianism', definition: 'The doctrine that actions are right if useful', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'advanced' },
  { word: 'value', definition: 'The regard that something is held to deserve', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'virtue', definition: 'Behavior showing high moral standards', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
  { word: 'wisdom', definition: 'The quality of having experience and good judgment', part_of_speech: 'noun', topic: 'Philosophy', difficulty_level: 'intermediate' },
];

async function seedBatch4(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ARTS_CULTURE, ...PSYCHOLOGY_BEHAVIOR, ...PHILOSOPHY_ETHICS];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 4: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 4 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 4');
  console.log('Arts/Culture + Psychology/Behavior + Philosophy/Ethics');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch4(supabase);
  
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
