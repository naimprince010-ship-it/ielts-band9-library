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

// Advanced Academic Adjectives - Part 8
const ADVANCED_ADJECTIVES_8: VocabularyWord[] = [
  { word: 'volatile', definition: 'Liable to change rapidly and unpredictably especially for the worse', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'voluntary', definition: 'Done or given or acting of one\'s own free will', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'vulnerable', definition: 'Susceptible to physical or emotional attack or harm', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'warm', definition: 'Of or at a fairly or comfortably high temperature', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'weak', definition: 'Lacking the power to perform physically demanding tasks or lacking physical strength', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wealthy', definition: 'Having a great deal of money or resources or assets or rich', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'weird', definition: 'Suggesting something supernatural or uncanny', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'western', definition: 'Situated in the west or directed toward or facing the west', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'whole', definition: 'All of or entire', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wholesale', definition: 'Done on a large scale or extensive', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wide', definition: 'Of great or more than average width', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'widespread', definition: 'Found or distributed over a large area or number of people', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wild', definition: 'Living or growing in the natural environment or not domesticated or cultivated', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'willing', definition: 'Ready or eager or prepared to do something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wise', definition: 'Having or showing experience or knowledge or good judgment', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wonderful', definition: 'Inspiring delight or pleasure or admiration or extremely good or marvelous', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'working', definition: 'Having paid employment', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'worldwide', definition: 'Extending or reaching throughout the world', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'worse', definition: 'Of poorer quality or lower standard or less good or desirable', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'worst', definition: 'Of the poorest quality or the lowest standard or the least good or desirable', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'worthwhile', definition: 'Worth the time or money or effort spent or of value or importance', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'worthy', definition: 'Deserving effort or attention or respect', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'written', definition: 'Composed in writing', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'wrong', definition: 'Not correct or true', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'young', definition: 'Having lived or existed for only a short time', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Nouns - Part 1
const ADVANCED_NOUNS_1: VocabularyWord[] = [
  { word: 'abandonment', definition: 'The action or fact of abandoning or being abandoned', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'aberration', definition: 'A departure from what is normal or usual or expected', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'abolition', definition: 'The action or an act of abolishing a system or practice or institution', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'absence', definition: 'The state of being away from a place or person', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'absorption', definition: 'The process or action by which one thing absorbs or is absorbed by another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'abstraction', definition: 'The quality of dealing with ideas rather than events', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'abundance', definition: 'A very large quantity of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'acceleration', definition: 'Increase in the rate or speed of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'acceptance', definition: 'The action of consenting to receive or undertake something offered', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accessibility', definition: 'The quality of being able to be reached or entered', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accommodation', definition: 'A room or group of rooms or building in which someone may live or stay', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accomplishment', definition: 'Something that has been achieved successfully', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accountability', definition: 'The fact or condition of being accountable or responsibility', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accumulation', definition: 'The acquisition or gradual gathering of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accuracy', definition: 'The quality or state of being correct or precise', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'accusation', definition: 'A charge or claim that someone has done something illegal or wrong', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'achievement', definition: 'A thing done successfully typically by effort or courage or skill', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'acknowledgment', definition: 'Acceptance of the truth or existence of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'acquisition', definition: 'An asset or object bought or obtained typically by a library or museum', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'activation', definition: 'The action or process of making something active or operative', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adaptation', definition: 'The action or process of adapting or being adapted', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'addiction', definition: 'The fact or condition of being addicted to a particular substance or activity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'addition', definition: 'The action or process of adding something to something else', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adequacy', definition: 'The state or quality of being adequate or satisfactory or acceptable', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adherence', definition: 'Attachment or commitment to a person or cause or belief', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adjustment', definition: 'A small alteration or movement made to achieve a desired fit or result', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'administration', definition: 'The process or activity of running a business or organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'admission', definition: 'A statement acknowledging the truth of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adoption', definition: 'The action or fact of legally taking another\'s child and bringing it up', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'advancement', definition: 'The process of promoting a cause or plan', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'advantage', definition: 'A condition or circumstance that puts one in a favorable or superior position', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'advent', definition: 'The arrival of a notable person or thing or event', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adversity', definition: 'Difficulties or misfortune', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'advertisement', definition: 'A notice or announcement in a public medium promoting a product or service', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'advocacy', definition: 'Public support for or recommendation of a particular cause or policy', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'affection', definition: 'A gentle feeling of fondness or liking', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'affiliation', definition: 'The state or process of affiliating or being affiliated', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'aftermath', definition: 'The consequences or aftereffects of a significant unpleasant event', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'agenda', definition: 'A list of items to be discussed at a formal meeting', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'aggression', definition: 'Hostile or violent behavior or attitudes toward another or readiness to attack', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'agreement', definition: 'Harmony or accordance in opinion or feeling or a position or result of agreeing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'agriculture', definition: 'The science or practice of farming including cultivation of the soil', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'aid', definition: 'Help typically of a practical nature', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'allegation', definition: 'A claim or assertion that someone has done something illegal or wrong', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'alliance', definition: 'A union or association formed for mutual benefit especially between countries', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'allocation', definition: 'The action or process of allocating or distributing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'allowance', definition: 'The amount of something that is permitted especially within a set of regulations', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'alteration', definition: 'The action or process of altering or being altered', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'alternative', definition: 'One of two or more available possibilities', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ambiguity', definition: 'Uncertainty or inexactness of meaning in language', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ambition', definition: 'A strong desire to do or to achieve something typically requiring determination', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'amendment', definition: 'A minor change in a document', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'analogy', definition: 'A comparison between two things typically for the purpose of explanation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'analysis', definition: 'Detailed examination of the elements or structure of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'analyst', definition: 'A person who conducts analysis', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ancestor', definition: 'A person typically one more remote than a grandparent from whom one is descended', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'anger', definition: 'A strong feeling of annoyance or displeasure or hostility', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'angle', definition: 'The space usually measured in degrees between two intersecting lines or surfaces', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'announcement', definition: 'A formal public statement about a fact or occurrence or intention', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'anomaly', definition: 'Something that deviates from what is standard or normal or expected', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'anticipation', definition: 'The action of anticipating something or expectation or prediction', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'anxiety', definition: 'A feeling of worry or nervousness or unease typically about an imminent event', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'apparatus', definition: 'The technical equipment or machinery needed for a particular activity or purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'appeal', definition: 'A serious or urgent request typically to the public', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'appearance', definition: 'The way that someone or something looks', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'appetite', definition: 'A natural desire to satisfy a bodily need especially for food', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'application', definition: 'A formal request to an authority for something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'appreciation', definition: 'The recognition and enjoyment of the good qualities of someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'approach', definition: 'A way of dealing with something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'approval', definition: 'The action of officially agreeing to something or accepting something as satisfactory', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'approximation', definition: 'A value or quantity that is nearly but not exactly correct', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'architecture', definition: 'The art or practice of designing and constructing buildings', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'argument', definition: 'An exchange of diverging or opposite views typically a heated or angry one', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'arrangement', definition: 'The action or process or result of arranging or being arranged', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'array', definition: 'An impressive display or range of a particular type of thing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'arrival', definition: 'The action or process of arriving', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'articulation', definition: 'The action of putting into words an idea or feeling of a specified type', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'artifact', definition: 'An object made by a human being typically an item of cultural or historical interest', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'aspect', definition: 'A particular part or feature of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'aspiration', definition: 'A hope or ambition of achieving something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assault', definition: 'A physical attack', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assembly', definition: 'A group of people gathered together in one place for a common purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assertion', definition: 'A confident and forceful statement of fact or belief', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assessment', definition: 'The evaluation or estimation of the nature or quality or ability of someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'asset', definition: 'A useful or valuable thing or person or quality', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assignment', definition: 'A task or piece of work allocated to someone as part of a job or course', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assistance', definition: 'The provision of money or resources or information to help someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'association', definition: 'A group of people organized for a joint purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assumption', definition: 'A thing that is accepted as true or as certain to happen without proof', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'assurance', definition: 'A positive declaration intended to give confidence or a promise', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'atmosphere', definition: 'The envelope of gases surrounding the earth or another planet', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'attachment', definition: 'An extra part or extension that is or can be attached to something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'attainment', definition: 'The action or fact of achieving a goal toward which one has worked', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'attempt', definition: 'An act of trying to achieve something typically one that is unsuccessful', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'attendance', definition: 'The action or state of going regularly to or being present at a place or event', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'attention', definition: 'Notice taken of someone or something or the regarding of someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'attitude', definition: 'A settled way of thinking or feeling about someone or something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch29(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_ADJECTIVES_8, ...ADVANCED_NOUNS_1];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 29: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 29 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 29');
  console.log('Advanced Academic Adjectives Part 8 & Nouns Part 1');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch29(supabase);
  
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
