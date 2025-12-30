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

// Advanced Academic Adjectives - Part 2
const ADVANCED_ADJECTIVES_2: VocabularyWord[] = [
  { word: 'definitive', definition: 'Done or reached decisively and with authority', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deliberate', definition: 'Done consciously and intentionally', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'demographic', definition: 'Relating to the structure of populations', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dense', definition: 'Closely compacted in substance', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dependent', definition: 'Contingent on or determined by', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'detrimental', definition: 'Tending to cause harm', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'diagnostic', definition: 'Concerned with the diagnosis of illness or other problems', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'digital', definition: 'Relating to or using signals or information represented by discrete values', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'diplomatic', definition: 'Of or concerning the profession or skill of managing international relations', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'discrete', definition: 'Individually separate and distinct', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'discriminatory', definition: 'Making or showing an unfair or prejudicial distinction between different categories', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'distinct', definition: 'Recognizably different in nature from something else of a similar type', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'distinctive', definition: 'Characteristic of one person or thing and so serving to distinguish it', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'diverse', definition: 'Showing a great deal of variety or very different', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'domestic', definition: 'Of or relating to the running of a home or to family relations', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dominant', definition: 'Most important or powerful or influential', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'drastic', definition: 'Likely to have a strong or far-reaching effect or radical and extreme', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dual', definition: 'Consisting of two parts or elements or aspects', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'durable', definition: 'Able to withstand wear or pressure or damage or hard-wearing', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dynamic', definition: 'Characterized by constant change or activity or progress', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ecological', definition: 'Relating to or concerned with the relation of living organisms to one another', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'economic', definition: 'Of or relating to economics or the economy', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'efficient', definition: 'Achieving maximum productivity with minimum wasted effort or expense', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'elaborate', definition: 'Involving many carefully arranged parts or details or detailed and complicated', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'electoral', definition: 'Of or relating to elections or electors', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'elementary', definition: 'Of or relating to the most rudimentary aspects of a subject', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'eligible', definition: 'Having the right to do or obtain something or satisfying the appropriate conditions', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'elusive', definition: 'Difficult to find or catch or achieve', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'emerging', definition: 'In the process of coming into being or prominence', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'empirical', definition: 'Based on or verifiable by observation or experience rather than theory', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'endemic', definition: 'Native or restricted to a certain country or area', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'enormous', definition: 'Very large in size or quantity or extent', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'environmental', definition: 'Relating to the natural world and the impact of human activity on its condition', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'epidemic', definition: 'Of the nature of an epidemic', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'equal', definition: 'Being the same in quantity or size or degree or value', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'equivalent', definition: 'Equal in value or function or meaning', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'erroneous', definition: 'Wrong or incorrect', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'essential', definition: 'Absolutely necessary or extremely important', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'eternal', definition: 'Lasting or existing forever or without end', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ethical', definition: 'Of or relating to moral principles or the branch of knowledge dealing with these', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ethnic', definition: 'Of or relating to a population subgroup with a common national or cultural tradition', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'eventual', definition: 'Occurring at the end of or as a result of a series of events or ultimate', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'evident', definition: 'Plain or obvious or clearly seen or understood', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'evolutionary', definition: 'Relating to the gradual development of something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exact', definition: 'Not approximated in any way or precise', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'excessive', definition: 'More than is necessary or normal or desirable or immoderate', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exclusive', definition: 'Excluding or not admitting other things', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'executive', definition: 'Having the power to put plans or actions into effect', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exhaustive', definition: 'Examining or including or considering all elements or aspects or fully comprehensive', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exotic', definition: 'Originating in or characteristic of a distant foreign country', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'experimental', definition: 'Based on untested ideas or techniques and not yet established or finalized', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'explicit', definition: 'Stated clearly and in detail leaving no room for confusion or doubt', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'exponential', definition: 'Becoming more and more rapid', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'extensive', definition: 'Covering or affecting a large area', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'external', definition: 'Belonging to or forming the outer surface or structure of something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'extinct', definition: 'Having no living members', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'extraordinary', definition: 'Very unusual or remarkable', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'extreme', definition: 'Reaching a high or the highest degree or very great', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'factual', definition: 'Concerned with what is actually the case rather than interpretations', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fair', definition: 'In accordance with the rules or standards or legitimate', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'familiar', definition: 'Well known from long or close association', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fatal', definition: 'Causing death', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'favorable', definition: 'Expressing approval', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'feasible', definition: 'Possible to do easily or conveniently', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'federal', definition: 'Having or relating to a system of government in which several states form a unity', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'feminine', definition: 'Having qualities or appearance traditionally associated with women', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fertile', definition: 'Producing or capable of producing abundant vegetation or crops', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fierce', definition: 'Having or displaying an intense or ferocious aggressiveness', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'final', definition: 'Coming at the end of a series', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'financial', definition: 'Of or relating to finance', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'finite', definition: 'Limited in size or extent', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fiscal', definition: 'Of or relating to government revenue especially taxes', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fixed', definition: 'Fastened securely in position', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'flexible', definition: 'Capable of bending easily without breaking', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fluent', definition: 'Able to express oneself easily and articulately', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'focal', definition: 'Of or relating to the center or most important part', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'foreign', definition: 'Of or from or in or characteristic of a country or language other than one\'s own', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'formal', definition: 'Done in accordance with rules of convention or etiquette', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'formidable', definition: 'Inspiring fear or respect through being impressively large or powerful', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'forthcoming', definition: 'About to happen or appear', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fragile', definition: 'Easily broken or damaged', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'frank', definition: 'Open or honest or direct in speech or writing', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'frequent', definition: 'Occurring or done on many occasions in short intervals', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fruitful', definition: 'Producing good or helpful results or productive', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'functional', definition: 'Of or having a special activity or purpose or function', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'fundamental', definition: 'Forming a necessary base or core or of central importance', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'futile', definition: 'Incapable of producing any useful result or pointless', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'generic', definition: 'Characteristic of or relating to a class or group of things or not specific', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'genetic', definition: 'Of or relating to genes or heredity', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'genuine', definition: 'Truly what something is said to be or authentic', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'geographic', definition: 'Of or relating to geography', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'global', definition: 'Of or relating to the whole world or worldwide', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gradual', definition: 'Taking place or progressing slowly or by degrees', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'graphic', definition: 'Of or relating to visual art especially involving drawing or engraving', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Adjectives - Part 3
const ADVANCED_ADJECTIVES_3: VocabularyWord[] = [
  { word: 'grave', definition: 'Giving cause for alarm or serious', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'gross', definition: 'Unattractively large or bloated', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'harsh', definition: 'Unpleasantly rough or jarring to the senses', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hazardous', definition: 'Risky or dangerous', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hereditary', definition: 'Passed down by inheritance', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hierarchical', definition: 'Of the nature of a hierarchy or arranged in order of rank', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'historic', definition: 'Famous or important in history or potentially so', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'historical', definition: 'Of or concerning history or past events', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'holistic', definition: 'Characterized by comprehension of the parts of something as intimately interconnected', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'homogeneous', definition: 'Of the same kind or alike', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'horizontal', definition: 'Parallel to the plane of the horizon or at right angles to the vertical', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hostile', definition: 'Unfriendly or antagonistic', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'humanitarian', definition: 'Concerned with or seeking to promote human welfare', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'humble', definition: 'Having or showing a modest or low estimate of one\'s own importance', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hybrid', definition: 'Of mixed character or composed of mixed parts', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hypothetical', definition: 'Of or based on or serving as a hypothesis', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ideal', definition: 'Satisfying one\'s conception of what is perfect or most suitable', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'identical', definition: 'Similar in every detail or exactly alike', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ideological', definition: 'Based on or relating to a system of ideas and ideals', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ignorant', definition: 'Lacking knowledge or awareness in general or uneducated or unsophisticated', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'illegal', definition: 'Contrary to or forbidden by law especially criminal law', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'illicit', definition: 'Forbidden by law or rules or custom', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'imaginative', definition: 'Having or showing creativity or inventiveness', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'immediate', definition: 'Occurring or done at once or instant', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'immense', definition: 'Extremely large or great especially in scale or degree', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'imminent', definition: 'About to happen', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'immune', definition: 'Resistant to a particular infection or toxin owing to the presence of specific antibodies', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'imperial', definition: 'Of or relating to an empire', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'implicit', definition: 'Implied though not plainly expressed', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'impressive', definition: 'Evoking admiration through size or quality or skill or grand or awesome', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inadequate', definition: 'Lacking the quality or quantity required or insufficient for a purpose', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inappropriate', definition: 'Not suitable or proper in the circumstances', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inclined', definition: 'Leaning or turning away from the vertical or horizontal or sloping', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inclusive', definition: 'Including all the services or items normally expected or required', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'incompatible', definition: 'Not able to exist or work together', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inconsistent', definition: 'Not staying the same throughout or acting at variance with one\'s own principles', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'incredible', definition: 'Impossible to believe', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'independent', definition: 'Free from outside control or not depending on another\'s authority', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'indigenous', definition: 'Originating or occurring naturally in a particular place or native', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'indirect', definition: 'Not directly caused by or resulting from something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'individual', definition: 'Single or separate', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'industrial', definition: 'Of or relating to or characterized by industry', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inevitable', definition: 'Certain to happen or unavoidable', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inferior', definition: 'Lower in rank or status or quality', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'infinite', definition: 'Limitless or endless in space or extent or size or impossible to measure', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'influential', definition: 'Having great influence on someone or something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'informal', definition: 'Having a relaxed or friendly or unofficial style or manner or nature', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inherent', definition: 'Existing in something as a permanent or essential or characteristic attribute', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'initial', definition: 'Of or at the beginning or first', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'innate', definition: 'Inborn or natural', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inner', definition: 'Located inside or further in', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'innovative', definition: 'Featuring new methods or advanced and original', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'institutional', definition: 'Of or relating to or established as part of an institution', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'instrumental', definition: 'Serving as a means of pursuing an aim or policy', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'insufficient', definition: 'Not enough or adequate', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'integral', definition: 'Necessary to make a whole complete or essential or fundamental', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intellectual', definition: 'Of or relating to the intellect', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intelligent', definition: 'Having or showing intelligence especially of a high level', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intense', definition: 'Of extreme force or degree or strength', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intensive', definition: 'Concentrated on a single area or subject or into a short time or very thorough', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'interactive', definition: 'Influencing or having an effect on each other', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intermediate', definition: 'Coming between two things in time or place or order', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'internal', definition: 'Of or situated on the inside', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'international', definition: 'Existing or occurring or carried on between two or more nations', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intimate', definition: 'Closely acquainted or familiar or close', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intricate', definition: 'Very complicated or detailed', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intrinsic', definition: 'Belonging naturally or essential', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intuitive', definition: 'Using or based on what one feels to be true even without conscious reasoning', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'invalid', definition: 'Not valid especially having no legal force', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'invaluable', definition: 'Extremely useful or indispensable', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inverse', definition: 'Opposite or contrary in position or direction or order or effect', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'invisible', definition: 'Unable to be seen or not visible to the eye', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'involuntary', definition: 'Done without will or conscious control', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'irrational', definition: 'Not logical or reasonable', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'irrelevant', definition: 'Not connected with or relevant to something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'irreversible', definition: 'Not able to be undone or altered', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'isolated', definition: 'Far away from other places or buildings or people or remote', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'joint', definition: 'Shared or held or made by two or more people or parties together', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'judicial', definition: 'Of or by or appropriate to a court or judge', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'keen', definition: 'Having or showing eagerness or enthusiasm', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'key', definition: 'Of crucial importance', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lateral', definition: 'Of or relating to or situated at the side of something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'latter', definition: 'Situated or occurring nearer to the end of something than to the beginning', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lawful', definition: 'Conforming to or permitted or recognized by law or rules', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'leading', definition: 'Most important', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'legal', definition: 'Of or relating to or based on the law', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'legislative', definition: 'Having the power to make laws', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'legitimate', definition: 'Conforming to the law or to rules', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lengthy', definition: 'Of considerable or unusual length especially in time', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'liable', definition: 'Responsible by law or legally answerable', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'liberal', definition: 'Open to new behavior or opinions and willing to discard traditional values', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch26(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_ADJECTIVES_2, ...ADVANCED_ADJECTIVES_3];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 26: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 26 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 26');
  console.log('Advanced Academic Adjectives - Parts 2 & 3');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch26(supabase);
  
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
