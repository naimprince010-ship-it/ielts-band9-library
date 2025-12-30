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

// Sports and Recreation Vocabulary
const SPORTS_RECREATION: VocabularyWord[] = [
  { word: 'achievement', definition: 'A thing done successfully with effort or skill', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'amateur', definition: 'A person who engages in an activity for pleasure', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'athlete', definition: 'A person who is proficient in sports', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'athletic', definition: 'Physically strong and active', part_of_speech: 'adjective', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'championship', definition: 'A contest for the position of champion', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'coach', definition: 'A person who trains an athlete or team', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'compete', definition: 'To strive to gain or win something', part_of_speech: 'verb', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'competition', definition: 'The activity of competing against others', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'competitive', definition: 'Having a strong desire to compete or succeed', part_of_speech: 'adjective', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'competitor', definition: 'A person who takes part in a competition', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'defeat', definition: 'To win a victory over someone in a contest', part_of_speech: 'verb', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'discipline', definition: 'A branch of knowledge or training', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'endurance', definition: 'The ability to endure an unpleasant process', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'enthusiasm', definition: 'Intense enjoyment or interest', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'equipment', definition: 'The necessary items for a particular purpose', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'exercise', definition: 'Activity requiring physical effort', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'facility', definition: 'A place provided for a particular purpose', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'fitness', definition: 'The condition of being physically fit', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'gymnasium', definition: 'A room or building equipped for gymnastics', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'hobby', definition: 'An activity done regularly for enjoyment', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'league', definition: 'A collection of teams that compete against each other', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'leisure', definition: 'Free time when one is not working', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'marathon', definition: 'A long-distance running race', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'medal', definition: 'A metal disc given as an award', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'opponent', definition: 'A person who competes against another', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'participate', definition: 'To take part in an activity', part_of_speech: 'verb', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'performance', definition: 'An act of staging or presenting a play', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'physical', definition: 'Relating to the body', part_of_speech: 'adjective', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'professional', definition: 'A person engaged in a specified activity as a main occupation', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'recreation', definition: 'Activity done for enjoyment', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'referee', definition: 'An official who watches a game', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'rival', definition: 'A person competing with another', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'score', definition: 'The number of points achieved in a game', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'spectator', definition: 'A person who watches an event', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'sponsor', definition: 'A person or organization that pays for an event', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'stadium', definition: 'A sports arena with tiers of seats', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'stamina', definition: 'The ability to sustain prolonged effort', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'strategy', definition: 'A plan of action designed to achieve a goal', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'strength', definition: 'The quality of being physically strong', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'technique', definition: 'A way of carrying out a particular task', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'tournament', definition: 'A series of contests between competitors', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'training', definition: 'The action of teaching a skill', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'trophy', definition: 'A cup or other decorative object awarded as a prize', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'victory', definition: 'An act of defeating an enemy or opponent', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
  { word: 'workout', definition: 'A session of vigorous physical exercise', part_of_speech: 'noun', topic: 'Sports', difficulty_level: 'intermediate' },
];

// Travel and Tourism Vocabulary
const TRAVEL_TOURISM: VocabularyWord[] = [
  { word: 'accommodation', definition: 'A room or building in which to stay', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'adventure', definition: 'An unusual and exciting experience', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'airline', definition: 'An organization providing air transport', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'airport', definition: 'A complex of runways and buildings for aircraft', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'attraction', definition: 'A place of interest to tourists', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'backpacker', definition: 'A person who travels with a backpack', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'boarding', definition: 'The action of getting on a ship or aircraft', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'booking', definition: 'An act of reserving accommodation', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'brochure', definition: 'A small book containing pictures and information', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'budget', definition: 'An estimate of income and expenditure', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'cabin', definition: 'A small shelter or house', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'camping', definition: 'The activity of spending a vacation in a tent', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'cruise', definition: 'A voyage on a ship for pleasure', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'customs', definition: 'The place at a port or airport where officials check goods', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'departure', definition: 'The action of leaving', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'destination', definition: 'The place to which someone is going', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'domestic', definition: 'Existing or occurring inside a country', part_of_speech: 'adjective', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'ecotourism', definition: 'Tourism directed toward natural environments', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'excursion', definition: 'A short journey or trip', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'expedition', definition: 'A journey undertaken for a specific purpose', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'explore', definition: 'To travel through an unfamiliar area', part_of_speech: 'verb', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'flight', definition: 'A journey made by air', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'guide', definition: 'A person who advises or shows the way', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'hospitality', definition: 'The friendly reception of guests', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'hostel', definition: 'An establishment providing inexpensive accommodation', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'immigration', definition: 'The action of coming to live in a foreign country', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'international', definition: 'Existing or occurring between nations', part_of_speech: 'adjective', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'itinerary', definition: 'A planned route or journey', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'journey', definition: 'An act of traveling from one place to another', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'landmark', definition: 'An object or feature easily recognized from a distance', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'luggage', definition: 'Suitcases or bags for a traveler', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'monument', definition: 'A statue or building erected to commemorate', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'passport', definition: 'An official document certifying identity', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'pilgrim', definition: 'A person who journeys to a sacred place', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'resort', definition: 'A place frequented for holidays', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'route', definition: 'A way or course taken in getting from a starting point', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'safari', definition: 'An expedition to observe animals in their natural habitat', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'scenery', definition: 'The natural features of a landscape', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'sightseeing', definition: 'The activity of visiting places of interest', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'souvenir', definition: 'A thing kept as a reminder of a place', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'terminal', definition: 'A departure and arrival building for passengers', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'tourist', definition: 'A person who is traveling for pleasure', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'transit', definition: 'The carrying of people or goods from one place to another', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'traveler', definition: 'A person who is traveling', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'vacation', definition: 'An extended period of recreation', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'visa', definition: 'An endorsement on a passport', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
  { word: 'voyage', definition: 'A long journey involving travel by sea or space', part_of_speech: 'noun', topic: 'Travel', difficulty_level: 'intermediate' },
];

// Food and Nutrition Vocabulary
const FOOD_NUTRITION: VocabularyWord[] = [
  { word: 'additive', definition: 'A substance added to food to improve it', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'appetite', definition: 'A natural desire to satisfy a bodily need', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'balanced', definition: 'Keeping different things in equal proportions', part_of_speech: 'adjective', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'beverage', definition: 'A drink other than water', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'calorie', definition: 'A unit of energy', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'carbohydrate', definition: 'A substance found in foods like bread and potatoes', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'cholesterol', definition: 'A compound found in body tissues', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'consumption', definition: 'The using up of a resource', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'cuisine', definition: 'A style of cooking', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'dairy', definition: 'Containing or made from milk', part_of_speech: 'adjective', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'deficiency', definition: 'A lack or shortage', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'delicacy', definition: 'A choice or expensive food', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'diet', definition: 'The kinds of food that a person habitually eats', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'dietary', definition: 'Relating to or provided by diet', part_of_speech: 'adjective', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'digestion', definition: 'The process of breaking down food', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'edible', definition: 'Fit to be eaten', part_of_speech: 'adjective', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'famine', definition: 'Extreme scarcity of food', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'fiber', definition: 'Dietary material containing substances such as cellulose', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'flavor', definition: 'The distinctive taste of a food or drink', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'genetically', definition: 'In a way that relates to genes', part_of_speech: 'adverb', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'gourmet', definition: 'A connoisseur of good food', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'harvest', definition: 'The process of gathering in crops', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'ingredient', definition: 'Any of the foods that are combined to make a dish', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'intake', definition: 'An amount of food or drink taken in', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'malnutrition', definition: 'Lack of proper nutrition', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'metabolism', definition: 'The chemical processes in a living organism', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'mineral', definition: 'A solid inorganic substance', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'nourishment', definition: 'The food necessary for growth and health', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'nutrient', definition: 'A substance that provides nourishment', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'nutrition', definition: 'The process of providing food necessary for health', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'obesity', definition: 'The condition of being grossly fat', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'organic', definition: 'Produced without artificial chemicals', part_of_speech: 'adjective', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'portion', definition: 'A part of a whole', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'preservative', definition: 'A substance used to preserve food', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'processed', definition: 'Treated or prepared by a special method', part_of_speech: 'adjective', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'protein', definition: 'A nutrient found in meat, eggs, and beans', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'recipe', definition: 'A set of instructions for preparing a dish', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'supplement', definition: 'Something added to complete a thing', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'sustainable', definition: 'Able to be maintained at a certain rate', part_of_speech: 'adjective', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'vegan', definition: 'A person who does not eat animal products', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'vegetarian', definition: 'A person who does not eat meat', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
  { word: 'vitamin', definition: 'An organic compound essential for nutrition', part_of_speech: 'noun', topic: 'Food', difficulty_level: 'intermediate' },
];

// History and Archaeology Vocabulary
const HISTORY_ARCHAEOLOGY: VocabularyWord[] = [
  { word: 'ancient', definition: 'Belonging to the very distant past', part_of_speech: 'adjective', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'antiquity', definition: 'The ancient past', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'archaeologist', definition: 'A person who studies human history through excavation', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'archaeology', definition: 'The study of human history through excavation', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'archive', definition: 'A collection of historical documents', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'artifact', definition: 'An object made by a human being', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'bronze', definition: 'An alloy of copper and tin', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'century', definition: 'A period of one hundred years', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'chronicle', definition: 'A factual written account of events', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'chronological', definition: 'Arranged in the order of time', part_of_speech: 'adjective', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'civilization', definition: 'The stage of human social development', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'colonial', definition: 'Relating to a colony or colonialism', part_of_speech: 'adjective', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'conquest', definition: 'The subjugation of a people or territory', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'contemporary', definition: 'Living or occurring at the same time', part_of_speech: 'adjective', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'decade', definition: 'A period of ten years', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'decline', definition: 'A gradual decrease', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'descendant', definition: 'A person descended from a particular ancestor', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'discovery', definition: 'The action of finding something', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'dynasty', definition: 'A line of hereditary rulers', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'empire', definition: 'An extensive group of states ruled over by a single monarch', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'epoch', definition: 'A period of time in history', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'era', definition: 'A long and distinct period of history', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'excavation', definition: 'The action of excavating something', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'expedition', definition: 'A journey undertaken for a specific purpose', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'feudal', definition: 'Relating to feudalism', part_of_speech: 'adjective', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'fossil', definition: 'The remains of a prehistoric organism', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'heritage', definition: 'Property that is or may be inherited', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'historian', definition: 'An expert in or student of history', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'historical', definition: 'Of or concerning history', part_of_speech: 'adjective', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'indigenous', definition: 'Originating in a particular place', part_of_speech: 'adjective', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'inscription', definition: 'Words inscribed on something', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'legacy', definition: 'Something left or handed down by a predecessor', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'medieval', definition: 'Relating to the Middle Ages', part_of_speech: 'adjective', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'millennium', definition: 'A period of a thousand years', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'monarchy', definition: 'A form of government with a monarch at the head', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'monument', definition: 'A statue or building erected to commemorate', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'origin', definition: 'The point where something begins', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'paleontology', definition: 'The study of fossils', part_of_speech: 'noun', topic: 'History', difficulty_level: 'advanced' },
  { word: 'prehistoric', definition: 'Relating to the period before written records', part_of_speech: 'adjective', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'preservation', definition: 'The action of preserving something', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'primitive', definition: 'Relating to an early stage of development', part_of_speech: 'adjective', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'reconstruction', definition: 'The action of reconstructing something', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'relic', definition: 'An object surviving from an earlier time', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'remnant', definition: 'A small remaining quantity of something', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'renaissance', definition: 'A revival of art and literature', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'restoration', definition: 'The action of returning something to a former condition', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'revolution', definition: 'A forcible overthrow of a government', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'ruins', definition: 'The remains of a building that has been destroyed', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'settlement', definition: 'A place where people establish a community', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'tomb', definition: 'A large vault for burying the dead', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'tradition', definition: 'The transmission of customs or beliefs', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
  { word: 'warfare', definition: 'Engagement in or the activities involved in war', part_of_speech: 'noun', topic: 'History', difficulty_level: 'intermediate' },
];

// Urban Planning and Architecture Vocabulary
const URBAN_ARCHITECTURE: VocabularyWord[] = [
  { word: 'affordable', definition: 'Inexpensive; reasonably priced', part_of_speech: 'adjective', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'amenity', definition: 'A desirable or useful feature of a building', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'apartment', definition: 'A self-contained housing unit', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'blueprint', definition: 'A design plan or technical drawing', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'boundary', definition: 'A line that marks the limits of an area', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'building', definition: 'A structure with a roof and walls', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'commercial', definition: 'Concerned with or engaged in commerce', part_of_speech: 'adjective', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'community', definition: 'A group of people living in the same place', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'commute', definition: 'To travel some distance between home and work', part_of_speech: 'verb', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'congestion', definition: 'Overcrowding; clogging', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'construction', definition: 'The building of something', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'density', definition: 'The degree of compactness of a substance', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'design', definition: 'A plan or drawing produced to show the look of something', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'development', definition: 'The process of developing or being developed', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'district', definition: 'An area of a country or city', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'dwelling', definition: 'A house or place of residence', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'expansion', definition: 'The action of becoming larger', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'facade', definition: 'The face of a building', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'foundation', definition: 'The lowest load-bearing part of a building', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'gentrification', definition: 'The process of renovating a district', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'advanced' },
  { word: 'habitat', definition: 'The natural home of an organism', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'housing', definition: 'Houses and apartments considered collectively', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'industrial', definition: 'Relating to or characterized by industry', part_of_speech: 'adjective', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'infrastructure', definition: 'The basic physical systems of a country', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'landmark', definition: 'An object or feature easily recognized', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'landscape', definition: 'All the visible features of an area', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'metropolitan', definition: 'Relating to a large city', part_of_speech: 'adjective', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'municipality', definition: 'A city or town with its own local government', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'neighborhood', definition: 'A district within a town or city', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'pedestrian', definition: 'A person walking rather than traveling in a vehicle', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'planning', definition: 'The process of making plans for something', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'pollution', definition: 'The presence of harmful substances in the environment', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'population', definition: 'All the inhabitants of a particular place', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'property', definition: 'A building or buildings and the land belonging to it', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'public', definition: 'Of or concerning the people as a whole', part_of_speech: 'adjective', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'redevelopment', definition: 'The action of developing something again', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'regeneration', definition: 'The action of regenerating', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'renovation', definition: 'The action of renovating a building', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'residential', definition: 'Designed for people to live in', part_of_speech: 'adjective', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'rural', definition: 'In, relating to, or characteristic of the countryside', part_of_speech: 'adjective', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'skyscraper', definition: 'A very tall building', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'sprawl', definition: 'The spread of urban development into neighboring areas', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'structure', definition: 'A building or other object constructed from parts', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'suburb', definition: 'An outlying district of a city', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'sustainable', definition: 'Able to be maintained at a certain rate', part_of_speech: 'adjective', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'traffic', definition: 'Vehicles moving on a road', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'transportation', definition: 'The action of transporting someone or something', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'urban', definition: 'In, relating to, or characteristic of a city', part_of_speech: 'adjective', topic: 'Urban', difficulty_level: 'intermediate' },
  { word: 'zoning', definition: 'The division of an area into zones', part_of_speech: 'noun', topic: 'Urban', difficulty_level: 'intermediate' },
];

async function seedBatch5(supabase: SupabaseClient): Promise<void> {
  const allWords = [...SPORTS_RECREATION, ...TRAVEL_TOURISM, ...FOOD_NUTRITION, ...HISTORY_ARCHAEOLOGY, ...URBAN_ARCHITECTURE];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 5: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 5 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 5');
  console.log('Sports + Travel + Food + History + Urban Planning');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch5(supabase);
  
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
