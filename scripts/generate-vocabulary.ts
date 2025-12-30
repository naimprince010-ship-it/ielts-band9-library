import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

interface VocabularyWord {
  word: string;
  definition: string;
  part_of_speech: string;
  topic: string;
  difficulty_level: string;
  source: string;
  cefr_level: string;
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

// Academic Word List (AWL) - 570 word families, verified academic vocabulary
const AWL_WORDS: Partial<VocabularyWord>[] = [
  // Sublist 1 - Most frequent
  { word: 'analyze', definition: 'To examine methodically and in detail', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'approach', definition: 'A way of dealing with something', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'area', definition: 'A region or part of a town, country, or the world', part_of_speech: 'noun', cefr_level: 'A2' },
  { word: 'assess', definition: 'To evaluate or estimate the nature, ability, or quality of', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'assume', definition: 'To suppose to be the case, without proof', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'authority', definition: 'The power or right to give orders or make decisions', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'available', definition: 'Able to be used or obtained', part_of_speech: 'adjective', cefr_level: 'A2' },
  { word: 'benefit', definition: 'An advantage or profit gained from something', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'concept', definition: 'An abstract idea or general notion', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'consist', definition: 'To be composed or made up of', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'constitute', definition: 'To be a part of a whole', part_of_speech: 'verb', cefr_level: 'C1' },
  { word: 'context', definition: 'The circumstances that form the setting for an event', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'contract', definition: 'A written or spoken agreement', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'create', definition: 'To bring something into existence', part_of_speech: 'verb', cefr_level: 'A2' },
  { word: 'data', definition: 'Facts and statistics collected for reference or analysis', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'define', definition: 'To state or describe exactly the nature or scope of', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'derive', definition: 'To obtain something from a specified source', part_of_speech: 'verb', cefr_level: 'C1' },
  { word: 'distribute', definition: 'To give shares of something to a number of recipients', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'economy', definition: 'The state of a country in terms of production and consumption', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'environment', definition: 'The surroundings or conditions in which a person lives', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'establish', definition: 'To set up on a permanent basis', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'estimate', definition: 'To roughly calculate or judge the value or amount of', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'evident', definition: 'Plain or obvious; clearly seen or understood', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'export', definition: 'To send goods to another country for sale', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'factor', definition: 'A circumstance that contributes to a result', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'finance', definition: 'The management of large amounts of money', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'formula', definition: 'A mathematical relationship expressed in symbols', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'function', definition: 'An activity that is natural to or the purpose of a thing', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'identify', definition: 'To establish or indicate who or what someone or something is', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'income', definition: 'Money received for work or through investments', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'indicate', definition: 'To point out or show', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'individual', definition: 'A single human being as distinct from a group', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'interpret', definition: 'To explain the meaning of information or actions', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'involve', definition: 'To include as a necessary part or result', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'issue', definition: 'An important topic or problem for debate or discussion', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'labor', definition: 'Work, especially physical work', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'legal', definition: 'Relating to the law', part_of_speech: 'adjective', cefr_level: 'B1' },
  { word: 'legislate', definition: 'To make or enact laws', part_of_speech: 'verb', cefr_level: 'C1' },
  { word: 'major', definition: 'Important, serious, or significant', part_of_speech: 'adjective', cefr_level: 'B1' },
  { word: 'method', definition: 'A particular procedure for accomplishing something', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'occur', definition: 'To happen or take place', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'percent', definition: 'One part in every hundred', part_of_speech: 'noun', cefr_level: 'A2' },
  { word: 'period', definition: 'A length or portion of time', part_of_speech: 'noun', cefr_level: 'A2' },
  { word: 'policy', definition: 'A course of action adopted by an organization', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'principle', definition: 'A fundamental truth or proposition', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'proceed', definition: 'To begin or continue a course of action', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'process', definition: 'A series of actions to achieve a particular end', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'require', definition: 'To need for a particular purpose', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'research', definition: 'Systematic investigation to establish facts', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'respond', definition: 'To say something in reply', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'role', definition: 'The function assumed by a person in a particular situation', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'section', definition: 'Any of the more or less distinct parts of something', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'sector', definition: 'An area or portion that is distinct from others', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'significant', definition: 'Sufficiently great or important to be worthy of attention', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'similar', definition: 'Resembling without being identical', part_of_speech: 'adjective', cefr_level: 'A2' },
  { word: 'source', definition: 'A place from which something comes or can be obtained', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'specific', definition: 'Clearly defined or identified', part_of_speech: 'adjective', cefr_level: 'B1' },
  { word: 'structure', definition: 'The arrangement of and relations between parts', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'theory', definition: 'A supposition intended to explain something', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'vary', definition: 'To differ in size, amount, degree, or nature', part_of_speech: 'verb', cefr_level: 'B2' },
  // Sublist 2
  { word: 'achieve', definition: 'To successfully reach a desired objective', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'acquire', definition: 'To buy or obtain for oneself', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'administrate', definition: 'To manage and be responsible for the running of', part_of_speech: 'verb', cefr_level: 'C1' },
  { word: 'affect', definition: 'To have an effect on; make a difference to', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'appropriate', definition: 'Suitable or proper in the circumstances', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'aspect', definition: 'A particular part or feature of something', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'assist', definition: 'To help someone, typically by doing a share of the work', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'category', definition: 'A class or division of people or things', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'chapter', definition: 'A main division of a book', part_of_speech: 'noun', cefr_level: 'A2' },
  { word: 'commission', definition: 'An instruction or command to do something', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'community', definition: 'A group of people living in the same place', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'complex', definition: 'Consisting of many different and connected parts', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'compute', definition: 'To calculate or reckon a figure or amount', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'conclude', definition: 'To bring to an end', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'conduct', definition: 'To organize and carry out', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'consequent', definition: 'Following as a result or effect', part_of_speech: 'adjective', cefr_level: 'C1' },
  { word: 'construct', definition: 'To build or erect something', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'consume', definition: 'To eat, drink, or ingest food or drink', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'credit', definition: 'The ability to obtain goods before payment', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'culture', definition: 'The arts and other manifestations of human achievement', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'design', definition: 'A plan or drawing produced to show the function of something', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'distinct', definition: 'Recognizably different in nature from something else', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'element', definition: 'A component or part of something', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'equate', definition: 'To consider one thing to be the same as another', part_of_speech: 'verb', cefr_level: 'C1' },
  { word: 'evaluate', definition: 'To form an idea of the amount or value of', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'feature', definition: 'A distinctive attribute or aspect of something', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'final', definition: 'Coming at the end of a series', part_of_speech: 'adjective', cefr_level: 'A2' },
  { word: 'focus', definition: 'The center of interest or activity', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'impact', definition: 'The effect or influence of one thing on another', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'injure', definition: 'To do physical harm or damage to someone', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'institute', definition: 'An organization having a particular purpose', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'invest', definition: 'To put money into financial schemes with the expectation of profit', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'item', definition: 'An individual article or unit', part_of_speech: 'noun', cefr_level: 'A2' },
  { word: 'journal', definition: 'A newspaper or magazine dealing with a particular subject', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'maintain', definition: 'To cause or enable to continue', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'normal', definition: 'Conforming to a standard; usual or typical', part_of_speech: 'adjective', cefr_level: 'A2' },
  { word: 'obtain', definition: 'To get, acquire, or secure something', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'participate', definition: 'To take part in an activity or event', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'perceive', definition: 'To become aware or conscious of something', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'positive', definition: 'Consisting in or characterized by the presence of features', part_of_speech: 'adjective', cefr_level: 'B1' },
  { word: 'potential', definition: 'Having or showing the capacity to develop into something', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'previous', definition: 'Existing or occurring before in time or order', part_of_speech: 'adjective', cefr_level: 'B1' },
  { word: 'primary', definition: 'Of chief importance; principal', part_of_speech: 'adjective', cefr_level: 'B1' },
  { word: 'purchase', definition: 'To acquire by paying for it; buy', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'range', definition: 'The area of variation between upper and lower limits', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'region', definition: 'An area of a country or the world having definable characteristics', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'regulate', definition: 'To control or maintain the rate or speed of', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'relevant', definition: 'Closely connected or appropriate to the matter at hand', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'reside', definition: 'To have one\'s permanent home in a particular place', part_of_speech: 'verb', cefr_level: 'C1' },
  { word: 'resource', definition: 'A stock or supply of materials or assets', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'restrict', definition: 'To put a limit on; keep under control', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'secure', definition: 'Fixed or fastened so as not to give way', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'seek', definition: 'To attempt to find something', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'select', definition: 'To carefully choose as being the best or most suitable', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'site', definition: 'An area of ground on which something is located', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'strategy', definition: 'A plan of action designed to achieve a long-term aim', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'survey', definition: 'A general view, examination, or description', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'text', definition: 'A book or other written or printed work', part_of_speech: 'noun', cefr_level: 'A2' },
  { word: 'tradition', definition: 'The transmission of customs or beliefs from generation to generation', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'transfer', definition: 'To move from one place to another', part_of_speech: 'verb', cefr_level: 'B1' },
  // Sublist 3
  { word: 'alternative', definition: 'One of two or more available possibilities', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'circumstance', definition: 'A fact or condition connected with an event or action', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'comment', definition: 'A verbal or written remark expressing an opinion', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'compensate', definition: 'To give something to reduce or balance the bad effect of damage', part_of_speech: 'verb', cefr_level: 'C1' },
  { word: 'component', definition: 'A part or element of a larger whole', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'consent', definition: 'Permission for something to happen', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'considerable', definition: 'Notably large in size, amount, or extent', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'constant', definition: 'Occurring continuously over a period of time', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'constrain', definition: 'To compel or force toward a particular course of action', part_of_speech: 'verb', cefr_level: 'C1' },
  { word: 'contribute', definition: 'To give in order to help achieve or provide something', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'convene', definition: 'To come or bring together for a meeting', part_of_speech: 'verb', cefr_level: 'C1' },
  { word: 'coordinate', definition: 'To bring the different elements into a relationship', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'core', definition: 'The central or most important part of something', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'corporate', definition: 'Relating to a large company or group', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'correspond', definition: 'To have a close similarity; match or agree', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'criteria', definition: 'A principle or standard by which something may be judged', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'deduce', definition: 'To arrive at a fact or conclusion by reasoning', part_of_speech: 'verb', cefr_level: 'C1' },
  { word: 'demonstrate', definition: 'To clearly show the existence or truth of something', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'document', definition: 'A piece of written, printed, or electronic matter', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'dominate', definition: 'To have a commanding influence on', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'emphasis', definition: 'Special importance, value, or prominence given to something', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'ensure', definition: 'To make certain that something will occur', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'exclude', definition: 'To deny access to or bar from a place, group, or privilege', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'framework', definition: 'A basic structure underlying a system or concept', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'fund', definition: 'A sum of money saved or made available for a particular purpose', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'illustrate', definition: 'To explain or make something clear by using examples', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'immigrate', definition: 'To come to live permanently in a foreign country', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'imply', definition: 'To strongly suggest the truth or existence of something', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'initial', definition: 'Existing or occurring at the beginning', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'instance', definition: 'An example or single occurrence of something', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'interact', definition: 'To act in such a way as to have an effect on another', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'justify', definition: 'To show or prove to be right or reasonable', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'layer', definition: 'A sheet or thickness of material covering a surface', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'link', definition: 'A relationship between two things or situations', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'locate', definition: 'To discover the exact place or position of', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'maximize', definition: 'To make as large or great as possible', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'minor', definition: 'Lesser in importance, seriousness, or significance', part_of_speech: 'adjective', cefr_level: 'B1' },
  { word: 'negate', definition: 'To nullify; make ineffective', part_of_speech: 'verb', cefr_level: 'C1' },
  { word: 'outcome', definition: 'The way a thing turns out; a consequence', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'partner', definition: 'A person who takes part in an undertaking with another', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'philosophy', definition: 'The study of the fundamental nature of knowledge and reality', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'physical', definition: 'Relating to the body as opposed to the mind', part_of_speech: 'adjective', cefr_level: 'B1' },
  { word: 'proportion', definition: 'A part, share, or number considered in comparative relation', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'publish', definition: 'To prepare and issue a book, journal, or piece of music', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'react', definition: 'To respond or behave in a particular way in response to something', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'register', definition: 'To enter or record in an official list', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'rely', definition: 'To depend on with full trust or confidence', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'remove', definition: 'To take something away or off from the position occupied', part_of_speech: 'verb', cefr_level: 'A2' },
  { word: 'scheme', definition: 'A large-scale systematic plan or arrangement', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'sequence', definition: 'A particular order in which related events follow each other', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'sex', definition: 'Either of the two main categories of male and female', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'shift', definition: 'To move or cause to move from one place to another', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'specify', definition: 'To identify clearly and definitely', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'sufficient', definition: 'Enough; adequate', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'task', definition: 'A piece of work to be done or undertaken', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'technical', definition: 'Relating to a particular subject, art, or craft', part_of_speech: 'adjective', cefr_level: 'B1' },
  { word: 'technique', definition: 'A way of carrying out a particular task', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'technology', definition: 'The application of scientific knowledge for practical purposes', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'valid', definition: 'Having a sound basis in logic or fact', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'volume', definition: 'The amount of space that a substance or object occupies', part_of_speech: 'noun', cefr_level: 'B1' },
  // Sublist 4
  { word: 'access', definition: 'The means or opportunity to approach or enter a place', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'adequate', definition: 'Sufficient for a specific requirement', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'annual', definition: 'Occurring once every year', part_of_speech: 'adjective', cefr_level: 'B1' },
  { word: 'apparent', definition: 'Clearly visible or understood; obvious', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'approximate', definition: 'Close to the actual, but not completely accurate', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'attitude', definition: 'A settled way of thinking or feeling about something', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'attribute', definition: 'A quality or feature regarded as characteristic', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'civil', definition: 'Relating to ordinary citizens and their concerns', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'code', definition: 'A system of words, letters, or signs used to represent others', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'commit', definition: 'To carry out or perpetrate a mistake, crime, or immoral act', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'communicate', definition: 'To share or exchange information, news, or ideas', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'concentrate', definition: 'To focus all one\'s attention on a particular object or activity', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'confer', definition: 'To grant a title, degree, benefit, or right', part_of_speech: 'verb', cefr_level: 'C1' },
  { word: 'contrast', definition: 'The state of being strikingly different from something else', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'cycle', definition: 'A series of events that are regularly repeated', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'debate', definition: 'A formal discussion on a particular matter', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'despite', definition: 'Without being affected by; in spite of', part_of_speech: 'preposition', cefr_level: 'B1' },
  { word: 'dimension', definition: 'A measurable extent of a particular kind', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'domestic', definition: 'Relating to the running of a home or family relations', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'emerge', definition: 'To move out of or away from something and become visible', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'error', definition: 'A mistake', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'ethnic', definition: 'Relating to a population subgroup with a common cultural tradition', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'goal', definition: 'The object of a person\'s ambition or effort', part_of_speech: 'noun', cefr_level: 'A2' },
  { word: 'grant', definition: 'To agree to give or allow something requested', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'hence', definition: 'As a consequence; for this reason', part_of_speech: 'adverb', cefr_level: 'B2' },
  { word: 'hypothesis', definition: 'A supposition made as a starting point for further investigation', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'implement', definition: 'To put a decision, plan, or agreement into effect', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'implicate', definition: 'To show someone to be involved in a crime', part_of_speech: 'verb', cefr_level: 'C1' },
  { word: 'impose', definition: 'To force something unwelcome to be accepted or put in place', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'integrate', definition: 'To combine one thing with another to form a whole', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'internal', definition: 'Of or situated on the inside', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'investigate', definition: 'To carry out a systematic inquiry to discover facts', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'job', definition: 'A paid position of regular employment', part_of_speech: 'noun', cefr_level: 'A1' },
  { word: 'label', definition: 'A small piece of paper attached to an object', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'mechanism', definition: 'A system of parts working together in a machine', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'obvious', definition: 'Easily perceived or understood; clear', part_of_speech: 'adjective', cefr_level: 'B1' },
  { word: 'occupy', definition: 'To reside or have one\'s place of business in', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'option', definition: 'A thing that is or may be chosen', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'output', definition: 'The amount of something produced by a person, machine, or industry', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'overall', definition: 'Taking everything into account', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'parallel', definition: 'Side by side and having the same distance continuously between them', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'parameter', definition: 'A numerical or other measurable factor forming one of a set', part_of_speech: 'noun', cefr_level: 'C1' },
  { word: 'phase', definition: 'A distinct period or stage in a process of change', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'predict', definition: 'To say or estimate that something will happen in the future', part_of_speech: 'verb', cefr_level: 'B1' },
  { word: 'principal', definition: 'First in order of importance; main', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'prior', definition: 'Existing or coming before in time, order, or importance', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'professional', definition: 'Relating to or connected with a profession', part_of_speech: 'adjective', cefr_level: 'B1' },
  { word: 'project', definition: 'An individual or collaborative enterprise', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'promote', definition: 'To further the progress of something', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'regime', definition: 'A government, especially an authoritarian one', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'resolve', definition: 'To settle or find a solution to a problem or dispute', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'retain', definition: 'To continue to have; keep possession of', part_of_speech: 'verb', cefr_level: 'B2' },
  { word: 'series', definition: 'A number of things of a similar kind coming one after another', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'statistic', definition: 'A fact or piece of data from a study of a large quantity', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'status', definition: 'The relative social, professional, or other standing of someone', part_of_speech: 'noun', cefr_level: 'B2' },
  { word: 'stress', definition: 'A state of mental or emotional strain or tension', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'subsequent', definition: 'Coming after something in time; following', part_of_speech: 'adjective', cefr_level: 'B2' },
  { word: 'sum', definition: 'A particular amount of money', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'summary', definition: 'A brief statement of the main points of something', part_of_speech: 'noun', cefr_level: 'B1' },
  { word: 'undertake', definition: 'To commit oneself to and begin an enterprise or responsibility', part_of_speech: 'verb', cefr_level: 'B2' },
];

// IELTS Topic-based vocabulary
const TOPIC_WORDS: Partial<VocabularyWord>[] = [
  // Education
  { word: 'curriculum', definition: 'The subjects comprising a course of study', part_of_speech: 'noun', topic: 'Education', cefr_level: 'B2' },
  { word: 'pedagogy', definition: 'The method and practice of teaching', part_of_speech: 'noun', topic: 'Education', cefr_level: 'C1' },
  { word: 'literacy', definition: 'The ability to read and write', part_of_speech: 'noun', topic: 'Education', cefr_level: 'B2' },
  { word: 'cognitive', definition: 'Related to mental processes of perception and memory', part_of_speech: 'adjective', topic: 'Education', cefr_level: 'C1' },
  { word: 'scholarship', definition: 'Academic study or achievement; a grant for education', part_of_speech: 'noun', topic: 'Education', cefr_level: 'B2' },
  { word: 'tuition', definition: 'Teaching or instruction; fees for education', part_of_speech: 'noun', topic: 'Education', cefr_level: 'B2' },
  { word: 'dissertation', definition: 'A long essay on a particular subject for a degree', part_of_speech: 'noun', topic: 'Education', cefr_level: 'C1' },
  { word: 'thesis', definition: 'A statement or theory put forward to be proved', part_of_speech: 'noun', topic: 'Education', cefr_level: 'B2' },
  { word: 'seminar', definition: 'A class for discussion and research', part_of_speech: 'noun', topic: 'Education', cefr_level: 'B2' },
  { word: 'syllabus', definition: 'An outline of subjects in a course', part_of_speech: 'noun', topic: 'Education', cefr_level: 'B2' },
  { word: 'plagiarism', definition: 'The practice of taking someone else\'s work as your own', part_of_speech: 'noun', topic: 'Education', cefr_level: 'C1' },
  { word: 'vocational', definition: 'Relating to an occupation or employment', part_of_speech: 'adjective', topic: 'Education', cefr_level: 'B2' },
  { word: 'undergraduate', definition: 'A university student who has not yet taken a first degree', part_of_speech: 'noun', topic: 'Education', cefr_level: 'B2' },
  { word: 'postgraduate', definition: 'A student engaged in a course of study after completing a first degree', part_of_speech: 'noun', topic: 'Education', cefr_level: 'B2' },
  { word: 'extracurricular', definition: 'Activities pursued in addition to the normal course of study', part_of_speech: 'adjective', topic: 'Education', cefr_level: 'B2' },
  
  // Environment
  { word: 'sustainable', definition: 'Able to be maintained at a certain rate or level', part_of_speech: 'adjective', topic: 'Environment', cefr_level: 'B2' },
  { word: 'biodiversity', definition: 'The variety of plant and animal life', part_of_speech: 'noun', topic: 'Environment', cefr_level: 'C1' },
  { word: 'ecosystem', definition: 'A biological community of interacting organisms', part_of_speech: 'noun', topic: 'Environment', cefr_level: 'B2' },
  { word: 'conservation', definition: 'Prevention of wasteful use of resources', part_of_speech: 'noun', topic: 'Environment', cefr_level: 'B2' },
  { word: 'emissions', definition: 'The production and discharge of gases', part_of_speech: 'noun', topic: 'Environment', cefr_level: 'B2' },
  { word: 'renewable', definition: 'Capable of being replaced by natural processes', part_of_speech: 'adjective', topic: 'Environment', cefr_level: 'B2' },
  { word: 'deforestation', definition: 'The clearing of forests', part_of_speech: 'noun', topic: 'Environment', cefr_level: 'B2' },
  { word: 'extinction', definition: 'The state of a species no longer existing', part_of_speech: 'noun', topic: 'Environment', cefr_level: 'B2' },
  { word: 'habitat', definition: 'The natural home of an animal or plant', part_of_speech: 'noun', topic: 'Environment', cefr_level: 'B2' },
  { word: 'contaminate', definition: 'To make impure by exposure to pollutants', part_of_speech: 'verb', topic: 'Environment', cefr_level: 'B2' },
  { word: 'deplete', definition: 'To use up the supply of something', part_of_speech: 'verb', topic: 'Environment', cefr_level: 'B2' },
  { word: 'degradation', definition: 'The condition or process of degrading or being degraded', part_of_speech: 'noun', topic: 'Environment', cefr_level: 'C1' },
  { word: 'erosion', definition: 'The gradual destruction of something', part_of_speech: 'noun', topic: 'Environment', cefr_level: 'B2' },
  { word: 'preservation', definition: 'The action of preserving something', part_of_speech: 'noun', topic: 'Environment', cefr_level: 'B2' },
  { word: 'ecological', definition: 'Relating to the relation of organisms to their environment', part_of_speech: 'adjective', topic: 'Environment', cefr_level: 'B2' },
  
  // Technology
  { word: 'innovation', definition: 'A new method, idea, or product', part_of_speech: 'noun', topic: 'Technology', cefr_level: 'B2' },
  { word: 'automation', definition: 'The use of machines to perform tasks', part_of_speech: 'noun', topic: 'Technology', cefr_level: 'B2' },
  { word: 'algorithm', definition: 'A process or set of rules for calculations', part_of_speech: 'noun', topic: 'Technology', cefr_level: 'C1' },
  { word: 'cybersecurity', definition: 'Protection of computer systems from theft', part_of_speech: 'noun', topic: 'Technology', cefr_level: 'C1' },
  { word: 'bandwidth', definition: 'The capacity for data transfer', part_of_speech: 'noun', topic: 'Technology', cefr_level: 'C1' },
  { word: 'interface', definition: 'A point where two systems meet and interact', part_of_speech: 'noun', topic: 'Technology', cefr_level: 'B2' },
  { word: 'obsolete', definition: 'No longer produced or used; out of date', part_of_speech: 'adjective', topic: 'Technology', cefr_level: 'B2' },
  { word: 'revolutionize', definition: 'To change something radically', part_of_speech: 'verb', topic: 'Technology', cefr_level: 'B2' },
  { word: 'streamline', definition: 'To make more efficient', part_of_speech: 'verb', topic: 'Technology', cefr_level: 'B2' },
  { word: 'optimize', definition: 'To make the best use of', part_of_speech: 'verb', topic: 'Technology', cefr_level: 'B2' },
  { word: 'disrupt', definition: 'To interrupt or disturb an activity', part_of_speech: 'verb', topic: 'Technology', cefr_level: 'B2' },
  { word: 'connectivity', definition: 'The state of being connected or interconnected', part_of_speech: 'noun', topic: 'Technology', cefr_level: 'B2' },
  { word: 'digitalization', definition: 'The conversion of information into digital format', part_of_speech: 'noun', topic: 'Technology', cefr_level: 'C1' },
  { word: 'infrastructure', definition: 'The basic physical systems of a business or nation', part_of_speech: 'noun', topic: 'Technology', cefr_level: 'B2' },
  { word: 'proliferation', definition: 'Rapid increase in the number of something', part_of_speech: 'noun', topic: 'Technology', cefr_level: 'C1' },
  
  // Health
  { word: 'diagnosis', definition: 'The identification of an illness', part_of_speech: 'noun', topic: 'Health', cefr_level: 'B2' },
  { word: 'symptom', definition: 'A physical or mental sign of a condition', part_of_speech: 'noun', topic: 'Health', cefr_level: 'B2' },
  { word: 'chronic', definition: 'Persisting for a long time', part_of_speech: 'adjective', topic: 'Health', cefr_level: 'B2' },
  { word: 'acute', definition: 'Severe but short-lasting', part_of_speech: 'adjective', topic: 'Health', cefr_level: 'B2' },
  { word: 'preventive', definition: 'Designed to prevent disease', part_of_speech: 'adjective', topic: 'Health', cefr_level: 'B2' },
  { word: 'pharmaceutical', definition: 'Related to medicinal drugs', part_of_speech: 'adjective', topic: 'Health', cefr_level: 'C1' },
  { word: 'epidemic', definition: 'A widespread occurrence of disease', part_of_speech: 'noun', topic: 'Health', cefr_level: 'B2' },
  { word: 'pandemic', definition: 'A disease prevalent over a whole country or world', part_of_speech: 'noun', topic: 'Health', cefr_level: 'B2' },
  { word: 'immunity', definition: 'Resistance to a particular infection', part_of_speech: 'noun', topic: 'Health', cefr_level: 'B2' },
  { word: 'vaccination', definition: 'Treatment to produce immunity', part_of_speech: 'noun', topic: 'Health', cefr_level: 'B2' },
  { word: 'nutrition', definition: 'The process of providing food for health', part_of_speech: 'noun', topic: 'Health', cefr_level: 'B2' },
  { word: 'sedentary', definition: 'Characterized by much sitting', part_of_speech: 'adjective', topic: 'Health', cefr_level: 'B2' },
  { word: 'obesity', definition: 'The condition of being very overweight', part_of_speech: 'noun', topic: 'Health', cefr_level: 'B2' },
  { word: 'rehabilitation', definition: 'Restoration to health through training', part_of_speech: 'noun', topic: 'Health', cefr_level: 'C1' },
  { word: 'prognosis', definition: 'The likely course of a disease or ailment', part_of_speech: 'noun', topic: 'Health', cefr_level: 'C1' },
  
  // Economy
  { word: 'inflation', definition: 'A general increase in prices', part_of_speech: 'noun', topic: 'Economy', cefr_level: 'B2' },
  { word: 'recession', definition: 'A period of economic decline', part_of_speech: 'noun', topic: 'Economy', cefr_level: 'B2' },
  { word: 'unemployment', definition: 'The state of being without a job', part_of_speech: 'noun', topic: 'Economy', cefr_level: 'B2' },
  { word: 'revenue', definition: 'Income, especially of a company', part_of_speech: 'noun', topic: 'Economy', cefr_level: 'B2' },
  { word: 'deficit', definition: 'The amount by which spending exceeds income', part_of_speech: 'noun', topic: 'Economy', cefr_level: 'B2' },
  { word: 'surplus', definition: 'An amount left over when requirements are met', part_of_speech: 'noun', topic: 'Economy', cefr_level: 'B2' },
  { word: 'commodity', definition: 'A raw material or agricultural product', part_of_speech: 'noun', topic: 'Economy', cefr_level: 'B2' },
  { word: 'tariff', definition: 'A tax on imports or exports', part_of_speech: 'noun', topic: 'Economy', cefr_level: 'C1' },
  { word: 'subsidy', definition: 'Money granted by government to assist', part_of_speech: 'noun', topic: 'Economy', cefr_level: 'B2' },
  { word: 'monopoly', definition: 'Exclusive control of a commodity or service', part_of_speech: 'noun', topic: 'Economy', cefr_level: 'B2' },
  { word: 'entrepreneur', definition: 'A person who starts a business', part_of_speech: 'noun', topic: 'Economy', cefr_level: 'B2' },
  { word: 'bankruptcy', definition: 'The state of being unable to pay debts', part_of_speech: 'noun', topic: 'Economy', cefr_level: 'B2' },
  { word: 'fluctuate', definition: 'To rise and fall irregularly', part_of_speech: 'verb', topic: 'Economy', cefr_level: 'B2' },
  { word: 'diversify', definition: 'To make or become more varied', part_of_speech: 'verb', topic: 'Economy', cefr_level: 'B2' },
  { word: 'depreciation', definition: 'A reduction in the value of an asset over time', part_of_speech: 'noun', topic: 'Economy', cefr_level: 'C1' },
  
  // Society
  { word: 'demographic', definition: 'Relating to population statistics', part_of_speech: 'adjective', topic: 'Society', cefr_level: 'C1' },
  { word: 'urbanization', definition: 'The process of making an area more urban', part_of_speech: 'noun', topic: 'Society', cefr_level: 'B2' },
  { word: 'migration', definition: 'Movement from one place to another', part_of_speech: 'noun', topic: 'Society', cefr_level: 'B2' },
  { word: 'discrimination', definition: 'Unjust treatment based on category', part_of_speech: 'noun', topic: 'Society', cefr_level: 'B2' },
  { word: 'inequality', definition: 'Difference in size, degree, or circumstances', part_of_speech: 'noun', topic: 'Society', cefr_level: 'B2' },
  { word: 'diversity', definition: 'The state of being diverse; variety', part_of_speech: 'noun', topic: 'Society', cefr_level: 'B2' },
  { word: 'heritage', definition: 'Valued objects and qualities passed down', part_of_speech: 'noun', topic: 'Society', cefr_level: 'B2' },
  { word: 'stereotype', definition: 'A widely held but oversimplified image', part_of_speech: 'noun', topic: 'Society', cefr_level: 'B2' },
  { word: 'prejudice', definition: 'Preconceived opinion not based on reason', part_of_speech: 'noun', topic: 'Society', cefr_level: 'B2' },
  { word: 'assimilate', definition: 'To absorb into a wider society', part_of_speech: 'verb', topic: 'Society', cefr_level: 'C1' },
  { word: 'marginalize', definition: 'To treat as insignificant', part_of_speech: 'verb', topic: 'Society', cefr_level: 'C1' },
  { word: 'empower', definition: 'To give power or authority to', part_of_speech: 'verb', topic: 'Society', cefr_level: 'B2' },
  { word: 'advocate', definition: 'To publicly support or recommend', part_of_speech: 'verb', topic: 'Society', cefr_level: 'B2' },
  { word: 'cohesion', definition: 'The action of forming a united whole', part_of_speech: 'noun', topic: 'Society', cefr_level: 'C1' },
  { word: 'stratification', definition: 'The arrangement of something into different groups', part_of_speech: 'noun', topic: 'Society', cefr_level: 'C1' },
  
  // Government & Law
  { word: 'legislation', definition: 'Laws considered collectively', part_of_speech: 'noun', topic: 'Government', cefr_level: 'B2' },
  { word: 'regulation', definition: 'A rule made by an authority', part_of_speech: 'noun', topic: 'Government', cefr_level: 'B2' },
  { word: 'democracy', definition: 'A system of government by the people', part_of_speech: 'noun', topic: 'Government', cefr_level: 'B2' },
  { word: 'bureaucracy', definition: 'A system of government with many officials', part_of_speech: 'noun', topic: 'Government', cefr_level: 'C1' },
  { word: 'jurisdiction', definition: 'The official power to make legal decisions', part_of_speech: 'noun', topic: 'Government', cefr_level: 'C1' },
  { word: 'constitution', definition: 'A body of fundamental principles', part_of_speech: 'noun', topic: 'Government', cefr_level: 'B2' },
  { word: 'amendment', definition: 'A change or addition to a legal document', part_of_speech: 'noun', topic: 'Government', cefr_level: 'B2' },
  { word: 'sovereignty', definition: 'Supreme power or authority', part_of_speech: 'noun', topic: 'Government', cefr_level: 'C1' },
  { word: 'referendum', definition: 'A general vote on a single political question', part_of_speech: 'noun', topic: 'Government', cefr_level: 'C1' },
  { word: 'sanction', definition: 'A penalty for disobeying a law', part_of_speech: 'noun', topic: 'Government', cefr_level: 'B2' },
  { word: 'enforce', definition: 'To compel observance of a law', part_of_speech: 'verb', topic: 'Government', cefr_level: 'B2' },
  { word: 'abolish', definition: 'To formally put an end to', part_of_speech: 'verb', topic: 'Government', cefr_level: 'B2' },
  { word: 'ratify', definition: 'To give formal consent to', part_of_speech: 'verb', topic: 'Government', cefr_level: 'C1' },
  { word: 'veto', definition: 'A constitutional right to reject a decision', part_of_speech: 'noun', topic: 'Government', cefr_level: 'C1' },
  { word: 'bipartisan', definition: 'Involving cooperation between two political parties', part_of_speech: 'adjective', topic: 'Government', cefr_level: 'C1' },
  
  // Media & Communication
  { word: 'journalism', definition: 'The activity of writing for newspapers', part_of_speech: 'noun', topic: 'Media', cefr_level: 'B2' },
  { word: 'propaganda', definition: 'Information used to promote a cause', part_of_speech: 'noun', topic: 'Media', cefr_level: 'B2' },
  { word: 'censorship', definition: 'The suppression of speech or information', part_of_speech: 'noun', topic: 'Media', cefr_level: 'B2' },
  { word: 'bias', definition: 'Prejudice for or against something', part_of_speech: 'noun', topic: 'Media', cefr_level: 'B2' },
  { word: 'credibility', definition: 'The quality of being trusted', part_of_speech: 'noun', topic: 'Media', cefr_level: 'B2' },
  { word: 'viral', definition: 'Spreading rapidly through the internet', part_of_speech: 'adjective', topic: 'Media', cefr_level: 'B2' },
  { word: 'mainstream', definition: 'The ideas accepted by most people', part_of_speech: 'adjective', topic: 'Media', cefr_level: 'B2' },
  { word: 'controversial', definition: 'Giving rise to public disagreement', part_of_speech: 'adjective', topic: 'Media', cefr_level: 'B2' },
  { word: 'sensationalize', definition: 'To present in an exaggerated way', part_of_speech: 'verb', topic: 'Media', cefr_level: 'C1' },
  { word: 'disseminate', definition: 'To spread information widely', part_of_speech: 'verb', topic: 'Media', cefr_level: 'C1' },
  { word: 'manipulate', definition: 'To control or influence cleverly', part_of_speech: 'verb', topic: 'Media', cefr_level: 'B2' },
  { word: 'verify', definition: 'To make sure something is true', part_of_speech: 'verb', topic: 'Media', cefr_level: 'B2' },
  { word: 'publicize', definition: 'To make widely known', part_of_speech: 'verb', topic: 'Media', cefr_level: 'B2' },
  { word: 'misinformation', definition: 'False or inaccurate information', part_of_speech: 'noun', topic: 'Media', cefr_level: 'B2' },
  { word: 'disinformation', definition: 'Deliberately misleading information', part_of_speech: 'noun', topic: 'Media', cefr_level: 'C1' },
  
  // Science & Research
  { word: 'hypothesis', definition: 'A proposed explanation for a phenomenon', part_of_speech: 'noun', topic: 'Science', cefr_level: 'B2' },
  { word: 'methodology', definition: 'A system of methods used in research', part_of_speech: 'noun', topic: 'Science', cefr_level: 'C1' },
  { word: 'empirical', definition: 'Based on observation or experience', part_of_speech: 'adjective', topic: 'Science', cefr_level: 'C1' },
  { word: 'theoretical', definition: 'Based on theory rather than practice', part_of_speech: 'adjective', topic: 'Science', cefr_level: 'B2' },
  { word: 'quantitative', definition: 'Relating to quantity or amount', part_of_speech: 'adjective', topic: 'Science', cefr_level: 'C1' },
  { word: 'qualitative', definition: 'Relating to quality or character', part_of_speech: 'adjective', topic: 'Science', cefr_level: 'C1' },
  { word: 'correlation', definition: 'A mutual relationship between things', part_of_speech: 'noun', topic: 'Science', cefr_level: 'C1' },
  { word: 'variable', definition: 'An element that may change', part_of_speech: 'noun', topic: 'Science', cefr_level: 'B2' },
  { word: 'phenomenon', definition: 'A fact or situation observed to exist', part_of_speech: 'noun', topic: 'Science', cefr_level: 'B2' },
  { word: 'synthesize', definition: 'To combine elements into a whole', part_of_speech: 'verb', topic: 'Science', cefr_level: 'C1' },
  { word: 'validate', definition: 'To check or prove the validity of', part_of_speech: 'verb', topic: 'Science', cefr_level: 'B2' },
  { word: 'replicate', definition: 'To make an exact copy of', part_of_speech: 'verb', topic: 'Science', cefr_level: 'B2' },
  { word: 'paradigm', definition: 'A typical example or pattern of something', part_of_speech: 'noun', topic: 'Science', cefr_level: 'C1' },
  { word: 'anomaly', definition: 'Something that deviates from what is standard', part_of_speech: 'noun', topic: 'Science', cefr_level: 'C1' },
  { word: 'causation', definition: 'The relationship between cause and effect', part_of_speech: 'noun', topic: 'Science', cefr_level: 'C1' },
];

// Linking words and discourse markers
const LINKING_WORDS: Partial<VocabularyWord>[] = [
  { word: 'furthermore', definition: 'In addition; besides', part_of_speech: 'adverb', topic: 'Linking', cefr_level: 'B2' },
  { word: 'moreover', definition: 'As a further matter; besides', part_of_speech: 'adverb', topic: 'Linking', cefr_level: 'B2' },
  { word: 'nevertheless', definition: 'In spite of that; notwithstanding', part_of_speech: 'adverb', topic: 'Linking', cefr_level: 'B2' },
  { word: 'consequently', definition: 'As a result', part_of_speech: 'adverb', topic: 'Linking', cefr_level: 'B2' },
  { word: 'subsequently', definition: 'After a particular thing has happened', part_of_speech: 'adverb', topic: 'Linking', cefr_level: 'B2' },
  { word: 'alternatively', definition: 'As another option', part_of_speech: 'adverb', topic: 'Linking', cefr_level: 'B2' },
  { word: 'conversely', definition: 'Introducing a statement that contrasts', part_of_speech: 'adverb', topic: 'Linking', cefr_level: 'C1' },
  { word: 'likewise', definition: 'In the same way; also', part_of_speech: 'adverb', topic: 'Linking', cefr_level: 'B2' },
  { word: 'thereby', definition: 'By that means; as a result of that', part_of_speech: 'adverb', topic: 'Linking', cefr_level: 'C1' },
  { word: 'whereas', definition: 'In contrast or comparison with the fact that', part_of_speech: 'conjunction', topic: 'Linking', cefr_level: 'B2' },
  { word: 'notwithstanding', definition: 'In spite of', part_of_speech: 'preposition', topic: 'Linking', cefr_level: 'C1' },
  { word: 'henceforth', definition: 'From this time on', part_of_speech: 'adverb', topic: 'Linking', cefr_level: 'C1' },
  { word: 'nonetheless', definition: 'In spite of that; nevertheless', part_of_speech: 'adverb', topic: 'Linking', cefr_level: 'B2' },
  { word: 'accordingly', definition: 'In a way that is appropriate to the circumstances', part_of_speech: 'adverb', topic: 'Linking', cefr_level: 'B2' },
  { word: 'simultaneously', definition: 'At the same time', part_of_speech: 'adverb', topic: 'Linking', cefr_level: 'B2' },
];

function buildVocabularyList(): VocabularyWord[] {
  const allWords: VocabularyWord[] = [];
  const seenWords = new Set<string>();
  
  // Add AWL words
  for (const word of AWL_WORDS) {
    if (word.word && !seenWords.has(word.word.toLowerCase())) {
      seenWords.add(word.word.toLowerCase());
      allWords.push({
        word: word.word,
        definition: word.definition || '',
        part_of_speech: word.part_of_speech || 'noun',
        topic: word.topic || 'Academic',
        difficulty_level: word.cefr_level === 'C1' || word.cefr_level === 'C2' ? 'advanced' : 'intermediate',
        source: 'AWL',
        cefr_level: word.cefr_level || 'B2',
      });
    }
  }
  
  // Add topic words
  for (const word of TOPIC_WORDS) {
    if (word.word && !seenWords.has(word.word.toLowerCase())) {
      seenWords.add(word.word.toLowerCase());
      allWords.push({
        word: word.word,
        definition: word.definition || '',
        part_of_speech: word.part_of_speech || 'noun',
        topic: word.topic || 'General',
        difficulty_level: word.cefr_level === 'C1' || word.cefr_level === 'C2' ? 'advanced' : 'intermediate',
        source: 'IELTS Topic',
        cefr_level: word.cefr_level || 'B2',
      });
    }
  }
  
  // Add linking words
  for (const word of LINKING_WORDS) {
    if (word.word && !seenWords.has(word.word.toLowerCase())) {
      seenWords.add(word.word.toLowerCase());
      allWords.push({
        word: word.word,
        definition: word.definition || '',
        part_of_speech: word.part_of_speech || 'adverb',
        topic: word.topic || 'Linking',
        difficulty_level: word.cefr_level === 'C1' || word.cefr_level === 'C2' ? 'advanced' : 'intermediate',
        source: 'Discourse Markers',
        cefr_level: word.cefr_level || 'B2',
      });
    }
  }
  
  return allWords;
}

async function seedVocabulary(supabase: SupabaseClient): Promise<void> {
  console.log('Building comprehensive IELTS vocabulary list...');
  
  const words = buildVocabularyList();
  console.log(`Total unique words: ${words.length}`);
  
  let insertedCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < words.length; i += BATCH_SIZE) {
    const batch = words.slice(i, i + BATCH_SIZE);
    
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
  
  console.log(`\nSeeding complete!`);
  console.log(`Successfully inserted: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
  
  // Save word list to JSON for reference
  const outputPath = path.join(__dirname, 'vocabulary-list.json');
  fs.writeFileSync(outputPath, JSON.stringify(words, null, 2));
  console.log(`\nWord list saved to: ${outputPath}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Generator & Seeder');
  console.log('Sources: AWL, IELTS Topic Vocabulary, Discourse Markers');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedVocabulary(supabase);
  
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
