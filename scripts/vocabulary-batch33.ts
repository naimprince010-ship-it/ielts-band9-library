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

// Advanced Academic Nouns - Part 8
const ADVANCED_NOUNS_8: VocabularyWord[] = [
  { word: 'girl', definition: 'A female child', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'glass', definition: 'A hard brittle substance typically transparent or translucent made by fusing sand', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'glimpse', definition: 'A momentary or partial view', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'globe', definition: 'The earth', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'glory', definition: 'High renown or honor won by notable achievements', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'goal', definition: 'The object of a person\'s ambition or effort or an aim or desired result', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'god', definition: 'A superhuman being or spirit worshiped as having power over nature or human fortunes', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gold', definition: 'A yellow precious metal the chemical element of atomic number 79 valued especially', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'good', definition: 'That which is morally right or righteousness', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'goodness', definition: 'The quality of being good in particular', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'goods', definition: 'Merchandise or possessions', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'governance', definition: 'The action or manner of governing', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'government', definition: 'The governing body of a nation or state or community', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'governor', definition: 'An official appointed to govern a town or region', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grace', definition: 'Simple elegance or refinement of movement', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grade', definition: 'A particular level of rank or quality or proficiency or value', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'graduate', definition: 'A person who has successfully completed a course of study or training', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grain', definition: 'Wheat or any other cultivated cereal crop used as food', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grammar', definition: 'The whole system and structure of a language or of languages in general', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grandparent', definition: 'A parent of one\'s father or mother or a grandmother or grandfather', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grant', definition: 'A sum of money given by an organization especially a government for a particular purpose', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'graph', definition: 'A diagram showing the relation between variable quantities typically of two variables', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grasp', definition: 'A firm hold or grip', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grass', definition: 'Vegetation consisting of typically short plants with long narrow leaves growing wild', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gratitude', definition: 'The quality of being thankful or readiness to show appreciation for and to return kindness', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gravity', definition: 'The force that attracts a body toward the center of the earth or toward any other physical body', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'greatness', definition: 'The quality of being great or distinguished or eminent', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'greed', definition: 'Intense and selfish desire for something especially wealth or power or food', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'greenhouse', definition: 'A glass building in which plants are grown that need protection from cold weather', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grief', definition: 'Deep sorrow especially that caused by someone\'s death', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grip', definition: 'A firm hold or a tight grasp or clasp', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'grocery', definition: 'A grocer\'s store or business', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ground', definition: 'The solid surface of the earth', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'group', definition: 'A number of people or things that are located close together or are considered or classed together', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'growth', definition: 'The process of increasing in physical size', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'guarantee', definition: 'A formal promise or assurance typically in writing that certain conditions will be fulfilled', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'guard', definition: 'A person who keeps watch especially a soldier or other person formally assigned to protect', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'guardian', definition: 'A defender or protector or keeper', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'guess', definition: 'An estimate or supposition without sufficient information to be sure of being correct', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'guest', definition: 'A person who is invited to visit the home of or take part in a function organized by another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'guidance', definition: 'Advice or information aimed at resolving a problem or difficulty especially as given by someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'guide', definition: 'A person who advises or shows the way to others', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'guideline', definition: 'A general rule or principle or piece of advice', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'guilt', definition: 'The fact of having committed a specified or implied offense or crime', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gun', definition: 'A weapon incorporating a metal tube from which bullets or shells or other missiles are propelled', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'guy', definition: 'A man', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'habit', definition: 'A settled or regular tendency or practice especially one that is hard to give up', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'habitat', definition: 'The natural home or environment of an animal or plant or other organism', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hair', definition: 'Any of the fine threadlike strands growing from the skin of humans or mammals or other animals', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'half', definition: 'Either of two equal or corresponding parts into which something is or can be divided', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hall', definition: 'The room or space just inside the front entrance of a house or apartment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'halt', definition: 'A suspension of movement or activity typically a temporary one', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hand', definition: 'The end part of a person\'s arm beyond the wrist including the palm or fingers or thumb', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'handful', definition: 'A quantity that fills the hand', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'handling', definition: 'The action of taking or holding something in the hands', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'happiness', definition: 'The state of being happy', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'harbor', definition: 'A place on the coast where vessels may find shelter especially one protected from rough water', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hardship', definition: 'Severe suffering or privation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hardware', definition: 'Tools or machinery or other durable equipment', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'harm', definition: 'Physical injury especially that which is deliberately inflicted', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'harmony', definition: 'The combination of simultaneously sounded musical notes to produce chords and chord progressions', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'harvest', definition: 'The process or period of gathering in crops', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'haste', definition: 'Excessive speed or urgency of movement or action or hurry', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hat', definition: 'A shaped covering for the head worn for warmth or as a fashion item or as part of a uniform', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hatred', definition: 'Intense dislike or ill will', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hazard', definition: 'A danger or risk', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'head', definition: 'The upper part of the human body or the front or upper part of the body of an animal', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'headline', definition: 'A heading at the top of an article or page in a newspaper or magazine', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'headquarters', definition: 'The premises occupied by a military commander and the commander\'s staff', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'health', definition: 'The state of being free from illness or injury', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hearing', definition: 'The faculty of perceiving sounds', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'heart', definition: 'A hollow muscular organ that pumps the blood through the circulatory system by rhythmic contraction', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'heat', definition: 'The quality of being hot or high temperature', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'heaven', definition: 'A place regarded in various religions as the abode of God or the gods and the angels', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'height', definition: 'The measurement from base to top or from head to foot of a standing person', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'heir', definition: 'A person legally entitled to the property or rank of another on that person\'s death', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'helicopter', definition: 'A type of aircraft that derives both lift and propulsion from one or more sets of horizontally revolving', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hell', definition: 'A place regarded in various religions as a spiritual realm of evil and suffering', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'help', definition: 'The action of helping someone to do something or the fact of being useful', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hemisphere', definition: 'A half of a sphere', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'heritage', definition: 'Valued objects and qualities such as cultural traditions or unspoiled countryside or historic buildings', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hero', definition: 'A person who is admired or idealized for courage or outstanding achievements or noble qualities', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hesitation', definition: 'The action of pausing or hesitating before saying or doing something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hierarchy', definition: 'A system or organization in which people or groups are ranked one above the other', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'highlight', definition: 'An outstanding part of an event or period of time', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'highway', definition: 'A main road especially one connecting major towns or cities', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hill', definition: 'A naturally raised area of land not as high or craggy as a mountain', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hint', definition: 'A slight or indirect indication or suggestion', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'historian', definition: 'An expert in or student of history especially that of a particular period or region or social phenomenon', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'history', definition: 'The study of past events particularly in human affairs', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hit', definition: 'An instance of striking or being struck', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hobby', definition: 'An activity done regularly in one\'s leisure time for pleasure', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Nouns - Part 9
const ADVANCED_NOUNS_9: VocabularyWord[] = [
  { word: 'holder', definition: 'A device or implement for holding something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hole', definition: 'A hollow place in a solid body or surface', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'holiday', definition: 'An extended period of leisure and recreation especially one spent away from home or in traveling', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'homeland', definition: 'A person\'s or a people\'s native land', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'homework', definition: 'Schoolwork that a student is required to do at home', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'honesty', definition: 'The quality of being free from deceit and untruthfulness or sincere', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'honor', definition: 'High respect or esteem', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hook', definition: 'A piece of metal or other material curved or bent back at an angle for catching hold of', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hope', definition: 'A feeling of expectation and desire for a certain thing to happen', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'horizon', definition: 'The line at which the earth\'s surface and the sky appear to meet', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hormone', definition: 'A regulatory substance produced in an organism and transported in tissue fluids such as blood', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'horror', definition: 'An intense feeling of fear or shock or disgust', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'horse', definition: 'A large plant-eating domesticated mammal with solid hoofs and a flowing mane and tail', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hospital', definition: 'An institution providing medical and surgical treatment and nursing care for sick or injured people', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hospitality', definition: 'The friendly and generous reception and entertainment of guests or visitors or strangers', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'host', definition: 'A person who receives or entertains other people as guests', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hostage', definition: 'A person seized or held as security for the fulfillment of a condition', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hostility', definition: 'Hostile behavior or unfriendliness or opposition', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hotel', definition: 'An establishment providing accommodations or meals or other services for travelers and tourists', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hour', definition: 'A period of time equal to a twenty-fourth part of a day and night and divided into 60 minutes', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'house', definition: 'A building for human habitation especially one that is lived in by a family or small group', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'household', definition: 'A house and its occupants regarded as a unit', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'housing', definition: 'Houses and apartments considered collectively', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'humanity', definition: 'Human beings collectively', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'humiliation', definition: 'The action of humiliating someone or the state of being humiliated', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'humor', definition: 'The quality of being amusing or comic especially as expressed in literature or speech', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hunger', definition: 'A feeling of discomfort or weakness caused by lack of food coupled with the desire to eat', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hunt', definition: 'An act of hunting wild animals or game', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hunter', definition: 'A person or animal that hunts', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hurricane', definition: 'A storm with a violent wind in particular a tropical cyclone in the Caribbean', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'husband', definition: 'A married man considered in relation to his spouse', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hypothesis', definition: 'A supposition or proposed explanation made on the basis of limited evidence as a starting point', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ice', definition: 'Frozen water a brittle transparent crystalline solid', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'icon', definition: 'A person or thing regarded as a representative symbol of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'idea', definition: 'A thought or suggestion as to a possible course of action', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ideal', definition: 'A person or thing regarded as perfect', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'identification', definition: 'The action or process of identifying someone or something or the fact of being identified', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'identity', definition: 'The fact of being who or what a person or thing is', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ideology', definition: 'A system of ideas and ideals especially one that forms the basis of economic or political theory', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ignorance', definition: 'Lack of knowledge or information', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'illness', definition: 'A disease or period of sickness affecting the body or mind', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'illusion', definition: 'A thing that is or is likely to be wrongly perceived or interpreted by the senses', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'illustration', definition: 'A picture illustrating a book or newspaper or magazine', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'image', definition: 'A representation of the external form of a person or thing in sculpture or painting', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'imagination', definition: 'The faculty or action of forming new ideas or images or concepts of external objects not present', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'imbalance', definition: 'Lack of proportion or relation between corresponding things', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'immigrant', definition: 'A person who comes to live permanently in a foreign country', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'immigration', definition: 'The action of coming to live permanently in a foreign country', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'impact', definition: 'The action of one object coming forcibly into contact with another', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'implication', definition: 'The conclusion that can be drawn from something although it is not explicitly stated', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'import', definition: 'A commodity or service or article brought in from abroad for sale', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'importance', definition: 'The state or fact of being of great significance or value', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'imposition', definition: 'The action or process of imposing something or of being imposed', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'impossibility', definition: 'The state or fact of being impossible', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'impression', definition: 'An idea or feeling or opinion about something or someone especially one formed without conscious thought', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'imprisonment', definition: 'The state of being imprisoned or captivity', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'improvement', definition: 'An example or instance of improving or being improved', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'impulse', definition: 'A sudden strong and unreflective urge or desire to act', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inability', definition: 'The state of being unable to do something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'incentive', definition: 'A thing that motivates or encourages one to do something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'incidence', definition: 'The occurrence or rate or frequency of a disease or crime or something else undesirable', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'incident', definition: 'An event or occurrence', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inclination', definition: 'A person\'s natural tendency or urge to act or feel in a particular way or a disposition', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inclusion', definition: 'The action or state of including or of being included within a group or structure', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'income', definition: 'Money received especially on a regular basis for work or through investments', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'incorporation', definition: 'The inclusion of something as part of a whole', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'increase', definition: 'An instance of growing or making greater', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'independence', definition: 'The fact or state of being independent', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'index', definition: 'An alphabetical list of names or subjects or other items treated in a printed work', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'indication', definition: 'A sign or piece of information that indicates something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'indicator', definition: 'A thing especially a trend or fact that indicates the state or level of something', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'indictment', definition: 'A formal charge or accusation of a serious crime', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'individual', definition: 'A single human being as distinct from a group or class or family', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'individualism', definition: 'The habit or principle of being independent and self-reliant', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'individuality', definition: 'The quality or character of a particular person or thing that distinguishes them from others', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'induction', definition: 'The action or process of inducting someone to a position or organization', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'industry', definition: 'Economic activity concerned with the processing of raw materials and manufacture of goods', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inequality', definition: 'Difference in size or degree or circumstances or lack of equality', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'infant', definition: 'A very young child or baby', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'infection', definition: 'The process of infecting or the state of being infected', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inference', definition: 'A conclusion reached on the basis of evidence and reasoning', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inflation', definition: 'A general increase in prices and fall in the purchasing value of money', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'influence', definition: 'The capacity to have an effect on the character or development or behavior of someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'information', definition: 'Facts provided or learned about something or someone', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'infrastructure', definition: 'The basic physical and organizational structures and facilities needed for the operation', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ingredient', definition: 'Any of the foods or substances that are combined to make a particular dish', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inhabitant', definition: 'A person or animal that lives in or occupies a place', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inheritance', definition: 'A thing that is inherited', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inhibition', definition: 'A feeling that makes one self-conscious and unable to act in a relaxed and natural way', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'initiative', definition: 'The ability to assess and initiate things independently', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'injection', definition: 'An instance of injecting or being injected', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'injury', definition: 'An instance of being injured', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'injustice', definition: 'Lack of fairness or justice', part_of_speech: 'noun', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch33(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_NOUNS_8, ...ADVANCED_NOUNS_9];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 33: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 33 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 33');
  console.log('Advanced Academic Nouns - Parts 8 & 9');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch33(supabase);
  
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
