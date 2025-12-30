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

// Advanced Academic Verbs - Part 4
const ADVANCED_VERBS_4: VocabularyWord[] = [
  { word: 'commit', definition: 'To carry out or perpetrate a mistake or crime', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'communicate', definition: 'To share or exchange information or ideas', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'compare', definition: 'To estimate or measure the similarity or dissimilarity between', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'compel', definition: 'To force or oblige someone to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'compensate', definition: 'To give something to someone in recognition of loss or suffering', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'compete', definition: 'To strive to gain or win something by defeating others', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'compile', definition: 'To produce a list or book by assembling information', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'complain', definition: 'To express dissatisfaction or annoyance about something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'complement', definition: 'To add to something in a way that enhances or improves it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'complete', definition: 'To finish making or doing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'complicate', definition: 'To make something more difficult or confusing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'comply', definition: 'To act in accordance with a wish or command', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'compose', definition: 'To write or create a work of art especially music or poetry', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'compound', definition: 'To make something bad worse or intensify the negative aspects', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'comprehend', definition: 'To grasp mentally or understand', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'compress', definition: 'To flatten by pressure or squeeze or press', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'comprise', definition: 'To consist of or be made up of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'compromise', definition: 'To settle a dispute by mutual concession', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'compute', definition: 'To calculate or reckon a figure or amount', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conceal', definition: 'To keep from sight or hide', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'concede', definition: 'To admit that something is true or valid after first denying it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conceive', definition: 'To form or devise a plan or idea in the mind', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'concentrate', definition: 'To focus one\'s attention or mental effort on a particular object', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'concern', definition: 'To relate to or be about', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conclude', definition: 'To bring something to an end', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'concur', definition: 'To be of the same opinion or agree', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'condemn', definition: 'To express complete disapproval of or censure', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'condense', definition: 'To make something denser or more concentrated', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'condition', definition: 'To have a significant influence on or determine the manner of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conduct', definition: 'To organize and carry out', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'confer', definition: 'To grant or bestow a title or benefit', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'confess', definition: 'To admit or state that one has committed a crime', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'confide', definition: 'To tell someone about a secret or private matter', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'confine', definition: 'To keep or restrict someone or something within certain limits', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'confirm', definition: 'To establish the truth or correctness of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'confiscate', definition: 'To take or seize someone\'s property with authority', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conflict', definition: 'To be incompatible or at variance or clash', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conform', definition: 'To comply with rules or standards or laws', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'confront', definition: 'To meet someone face to face with hostile or argumentative intent', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'confuse', definition: 'To cause someone to become bewildered or perplexed', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'congratulate', definition: 'To give someone good wishes when something special has happened', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conjecture', definition: 'To form an opinion or supposition about something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'connect', definition: 'To bring together or into contact so that a real link is established', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conquer', definition: 'To overcome and take control of a place or people by use of force', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consecrate', definition: 'To make or declare something sacred', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consent', definition: 'To give permission for something to happen', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conserve', definition: 'To protect something from harm or destruction', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consider', definition: 'To think carefully about something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consist', definition: 'To be composed or made up of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'console', definition: 'To comfort someone at a time of grief or disappointment', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consolidate', definition: 'To make something physically stronger or more solid', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'conspire', definition: 'To make secret plans jointly to commit an unlawful act', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'constitute', definition: 'To be a part of a whole', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'constrain', definition: 'To severely restrict the scope or extent of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'construct', definition: 'To build or erect something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consult', definition: 'To seek information or advice from someone with expertise', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consume', definition: 'To eat or drink or ingest', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contact', definition: 'To communicate with someone typically in order to give or receive information', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contain', definition: 'To have or hold someone or something within', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contaminate', definition: 'To make something impure by exposure to a polluting substance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contemplate', definition: 'To look thoughtfully for a long time at', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contend', definition: 'To struggle to surmount a difficulty or danger', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contest', definition: 'To engage in competition to attain a position of power', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'continue', definition: 'To persist in an activity or process', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contract', definition: 'To decrease in size or number or range', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contradict', definition: 'To deny the truth of a statement by asserting the opposite', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contrast', definition: 'To differ strikingly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contribute', definition: 'To give something in order to help achieve or provide something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'contrive', definition: 'To create or bring about by deliberate use of skill', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'control', definition: 'To determine the behavior or supervise the running of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'convene', definition: 'To come or bring together for a meeting or activity', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'converge', definition: 'To come together from different directions', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'converse', definition: 'To engage in conversation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'convert', definition: 'To cause to change in form or character or function', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'convey', definition: 'To transport or carry to a place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'convict', definition: 'To declare someone to be guilty of a criminal offense', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'convince', definition: 'To cause someone to believe firmly in the truth of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cooperate', definition: 'To act jointly or work toward the same end', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'coordinate', definition: 'To bring the different elements of something into a relationship', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cope', definition: 'To deal effectively with something difficult', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'copy', definition: 'To make a similar or identical version of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'correct', definition: 'To put right an error or fault', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'correlate', definition: 'To have a mutual relationship or connection', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'correspond', definition: 'To have a close similarity or match or agree almost exactly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'corroborate', definition: 'To confirm or give support to a statement or theory', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'corrode', definition: 'To destroy or damage metal or other materials slowly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'corrupt', definition: 'To cause to act dishonestly in return for money or personal gain', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cost', definition: 'To require the payment of a specified sum of money', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'counsel', definition: 'To give advice to someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'count', definition: 'To determine the total number of a collection of items', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'counter', definition: 'To speak or act in opposition to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'counteract', definition: 'To act against something in order to reduce its force', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'couple', definition: 'To combine', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cover', definition: 'To put something such as a cloth or lid on top of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'crave', definition: 'To feel a powerful desire for something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'create', definition: 'To bring something into existence', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'credit', definition: 'To publicly acknowledge someone as a participant', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Verbs - Part 5
const ADVANCED_VERBS_5: VocabularyWord[] = [
  { word: 'creep', definition: 'To move slowly and carefully so as not to be heard or noticed', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cripple', definition: 'To cause someone to become unable to walk or move properly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'criticize', definition: 'To indicate the faults of someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cross', definition: 'To go or extend across or to the other side of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'crowd', definition: 'To fill a space almost completely leaving little room to move', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'crush', definition: 'To press or squeeze with force so as to break or damage', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cultivate', definition: 'To prepare and use land for crops or gardening', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'curb', definition: 'To restrain or keep in check', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cure', definition: 'To relieve a person or animal of the symptoms of a disease', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'curtail', definition: 'To reduce in extent or quantity or impose a restriction on', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cushion', definition: 'To soften the effect of an impact on', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'cut', definition: 'To make an opening or incision in something with a sharp tool', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'damage', definition: 'To inflict physical harm on something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dampen', definition: 'To make slightly wet', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dare', definition: 'To have the courage to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dazzle', definition: 'To blind temporarily with a sudden bright light', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deal', definition: 'To take part in commercial trading of a particular commodity', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'debate', definition: 'To argue about a subject especially in a formal manner', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'decay', definition: 'To rot or decompose through the action of bacteria and fungi', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deceive', definition: 'To cause someone to believe something that is not true', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'decide', definition: 'To come to a resolution in the mind as a result of consideration', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'declare', definition: 'To say something in a solemn and emphatic manner', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'decline', definition: 'To politely refuse an invitation or offer', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'decode', definition: 'To convert a coded message into intelligible language', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'decompose', definition: 'To decay or cause to decay', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'decorate', definition: 'To make something look more attractive by adding extra items', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'decrease', definition: 'To make or become smaller or fewer in size or amount', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dedicate', definition: 'To devote time or effort to a particular task or purpose', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deduce', definition: 'To arrive at a fact or conclusion by reasoning', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deduct', definition: 'To subtract or take away an amount or part from a total', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deem', definition: 'To regard or consider in a specified way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deepen', definition: 'To make or become deep or deeper', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'defeat', definition: 'To win a victory over someone in a battle or other contest', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'defend', definition: 'To resist an attack made on someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'defer', definition: 'To put off an action or event to a later time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'define', definition: 'To state or describe exactly the nature or scope of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deflect', definition: 'To cause something to change direction by interposing something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'defy', definition: 'To openly resist or refuse to obey', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'degrade', definition: 'To treat or regard someone with contempt or disrespect', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'delay', definition: 'To make someone or something late or slow', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'delegate', definition: 'To entrust a task or responsibility to another person', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'delete', definition: 'To remove or obliterate written or printed matter', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deliberate', definition: 'To engage in long and careful consideration', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'delight', definition: 'To please someone greatly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deliver', definition: 'To bring and hand over a letter or goods to the proper recipient', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'demand', definition: 'To ask authoritatively or brusquely', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'demolish', definition: 'To pull or knock down a building', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'demonstrate', definition: 'To clearly show the existence or truth of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'demote', definition: 'To give someone a lower rank or less senior position', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'denote', definition: 'To be a sign of or indicate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'denounce', definition: 'To publicly declare to be wrong or evil', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deny', definition: 'To state that one refuses to admit the truth of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'depart', definition: 'To leave typically in order to start a journey', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'depend', definition: 'To be controlled or determined by', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'depict', definition: 'To show or represent by a drawing or painting', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deplete', definition: 'To use up the supply or resources of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deplore', definition: 'To feel or express strong disapproval of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deploy', definition: 'To move troops or equipment into position for military action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deport', definition: 'To expel a foreigner from a country', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deposit', definition: 'To put or set down something in a specific place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'depreciate', definition: 'To diminish in value over a period of time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'depress', definition: 'To make someone feel utterly dispirited or dejected', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deprive', definition: 'To deny a person or place the possession or use of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'derive', definition: 'To obtain something from a specified source', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'descend', definition: 'To move or fall downward', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'describe', definition: 'To give an account in words of someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'desert', definition: 'To abandon a person or cause in a way considered disloyal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deserve', definition: 'To do something or have qualities worthy of reward or punishment', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'design', definition: 'To decide upon the look and functioning of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'designate', definition: 'To appoint someone to a specified position', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'desire', definition: 'To strongly wish for or want something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'despise', definition: 'To feel contempt or a deep repugnance for', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'destabilize', definition: 'To upset the stability of or cause unrest in', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'destroy', definition: 'To put an end to the existence of something by damaging it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'detach', definition: 'To disengage something or part of something and remove it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'detail', definition: 'To describe item by item or give the full particulars of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'detain', definition: 'To keep someone in official custody', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'detect', definition: 'To discover or identify the presence or existence of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deter', definition: 'To discourage someone from doing something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deteriorate', definition: 'To become progressively worse', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'determine', definition: 'To cause something to occur in a particular way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'detest', definition: 'To dislike intensely', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'detonate', definition: 'To explode or cause to explode', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'devastate', definition: 'To destroy or ruin something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'develop', definition: 'To grow or cause to grow and become more mature or advanced', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'deviate', definition: 'To depart from an established course', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'devise', definition: 'To plan or invent a complex procedure or mechanism', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'devote', definition: 'To give all or a large part of one\'s time or resources to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'devour', definition: 'To eat food or prey hungrily or quickly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'diagnose', definition: 'To identify the nature of an illness or problem', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dictate', definition: 'To lay down authoritatively or prescribe', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'differ', definition: 'To be unlike or dissimilar', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'differentiate', definition: 'To recognize or ascertain what makes someone or something different', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'diffuse', definition: 'To spread or cause to spread over a wide area', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'digest', definition: 'To break down food in the alimentary canal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'dignify', definition: 'To make something seem worthy and impressive', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch17(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_VERBS_4, ...ADVANCED_VERBS_5];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 17: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 17 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 17');
  console.log('Advanced Academic Verbs - Parts 4 & 5');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch17(supabase);
  
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
