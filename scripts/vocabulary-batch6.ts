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

// Additional Academic Verbs
const ACADEMIC_VERBS: VocabularyWord[] = [
  { word: 'abolish', definition: 'To formally put an end to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'absorb', definition: 'To take in or soak up', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'abstain', definition: 'To restrain oneself from doing something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accelerate', definition: 'To increase in rate or speed', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accentuate', definition: 'To make more noticeable or prominent', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'acclaim', definition: 'To praise enthusiastically and publicly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'acclimatize', definition: 'To become accustomed to a new climate or conditions', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accrue', definition: 'To accumulate or receive over time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'acquaint', definition: 'To make someone aware of or familiar with', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'actualize', definition: 'To make a reality of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'adhere', definition: 'To stick fast to a surface or substance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'adjudicate', definition: 'To make a formal judgment on a disputed matter', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'administer', definition: 'To manage and be responsible for', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'admonish', definition: 'To warn or reprimand someone firmly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'advocate', definition: 'To publicly recommend or support', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'affirm', definition: 'To state as a fact; assert strongly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'aggravate', definition: 'To make worse or more serious', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'alleviate', definition: 'To make suffering less severe', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'amalgamate', definition: 'To combine or unite to form one organization', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ameliorate', definition: 'To make something bad better', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'amplify', definition: 'To increase the volume or extent of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'annex', definition: 'To add as an extra or subordinate part', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'annotate', definition: 'To add notes of explanation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'annul', definition: 'To declare invalid', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'appease', definition: 'To pacify or placate by acceding to demands', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'apportion', definition: 'To divide and allocate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'appraise', definition: 'To assess the value or quality of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'apprehend', definition: 'To arrest someone for a crime', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'arbitrate', definition: 'To reach an authoritative judgment', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'articulate', definition: 'To express an idea fluently', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ascertain', definition: 'To find out for certain', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'aspire', definition: 'To direct one\'s hopes or ambitions', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'assail', definition: 'To make a concerted or violent attack', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'assent', definition: 'To express approval or agreement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'assert', definition: 'To state a fact confidently', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'assimilate', definition: 'To take in and understand fully', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'attest', definition: 'To provide or serve as clear evidence', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'augment', definition: 'To make greater by adding to it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'authenticate', definition: 'To prove or show to be true', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'authorize', definition: 'To give official permission for', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'avert', definition: 'To turn away or prevent', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'beget', definition: 'To bring about; cause', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'bequeath', definition: 'To leave property to a person by a will', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'bestow', definition: 'To confer or present an honor', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'bolster', definition: 'To support or strengthen', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'breach', definition: 'To make a gap in and break through', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'broaden', definition: 'To make or become wider', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'buttress', definition: 'To increase the strength of or justification for', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'calibrate', definition: 'To mark an instrument with a standard scale', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'capitalize', definition: 'To take advantage of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'captivate', definition: 'To attract and hold the attention of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'categorize', definition: 'To place in a particular class or group', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'cede', definition: 'To give up power or territory', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'centralize', definition: 'To concentrate control in a single authority', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'certify', definition: 'To attest or confirm in a formal statement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'characterize', definition: 'To describe the distinctive nature of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'chronicle', definition: 'To record events in factual detail', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'circumscribe', definition: 'To restrict within limits', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'circumvent', definition: 'To find a way around an obstacle', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'clarify', definition: 'To make a statement less confused', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'classify', definition: 'To arrange in classes or categories', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'coalesce', definition: 'To come together to form one mass', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'codify', definition: 'To arrange laws into a systematic code', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'coerce', definition: 'To persuade using force or threats', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'coincide', definition: 'To occur at the same time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'collaborate', definition: 'To work jointly on an activity', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'collate', definition: 'To collect and combine texts or information', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'commemorate', definition: 'To recall and show respect for', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'commend', definition: 'To praise formally or officially', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'commission', definition: 'To order or authorize the production of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'compel', definition: 'To force or oblige to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'compensate', definition: 'To give something to reduce the bad effect', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'compile', definition: 'To produce by assembling information', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'complement', definition: 'To add to in a way that enhances', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'comply', definition: 'To act in accordance with a wish', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'comprehend', definition: 'To grasp mentally; understand', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'compress', definition: 'To flatten by pressure; squeeze', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'comprise', definition: 'To consist of; be made up of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'compute', definition: 'To calculate or reckon', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conceal', definition: 'To keep from sight; hide', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'concede', definition: 'To admit that something is true', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conceive', definition: 'To form or devise a plan or idea', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'concentrate', definition: 'To focus all one\'s attention', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conclude', definition: 'To bring to an end', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'concur', definition: 'To be of the same opinion; agree', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'condemn', definition: 'To express complete disapproval of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'condense', definition: 'To make more dense or compact', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'condone', definition: 'To accept behavior that is wrong', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conduct', definition: 'To organize and carry out', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'confer', definition: 'To grant a title or honor', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'confine', definition: 'To keep within certain limits', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'confirm', definition: 'To establish the truth of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'confiscate', definition: 'To take or seize with authority', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conform', definition: 'To comply with rules or standards', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'confront', definition: 'To face up to and deal with', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'congregate', definition: 'To gather into a crowd or mass', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conjecture', definition: 'To form an opinion without evidence', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consent', definition: 'To give permission for something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conserve', definition: 'To protect from harm or destruction', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'consolidate', definition: 'To make something physically stronger', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'constitute', definition: 'To be a part of a whole', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'constrain', definition: 'To compel or force toward a course', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'construct', definition: 'To build or erect', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'construe', definition: 'To interpret in a particular way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'consult', definition: 'To seek information or advice from', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'consume', definition: 'To use up a resource', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'contaminate', definition: 'To make impure by exposure', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'contemplate', definition: 'To look thoughtfully for a long time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'contend', definition: 'To struggle to surmount a difficulty', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'contest', definition: 'To engage in competition to attain', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'contradict', definition: 'To deny the truth of a statement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'contrast', definition: 'To compare in such a way as to emphasize differences', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'contribute', definition: 'To give in order to help achieve', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'contrive', definition: 'To create or bring about by deliberate use', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'convene', definition: 'To come or bring together for a meeting', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'converge', definition: 'To come together from different directions', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'convert', definition: 'To change the form or function of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'convey', definition: 'To transport or carry to a place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'convince', definition: 'To cause someone to believe firmly', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'cooperate', definition: 'To work jointly with others', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'coordinate', definition: 'To bring the different elements into a relationship', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'correlate', definition: 'To have a mutual relationship', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'corroborate', definition: 'To confirm or give support to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'counteract', definition: 'To act against something to reduce its effect', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'culminate', definition: 'To reach a climax or point of highest development', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'cultivate', definition: 'To try to acquire or develop', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'curtail', definition: 'To reduce in extent or quantity', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'decentralize', definition: 'To transfer authority from central to local government', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'decipher', definition: 'To succeed in understanding', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'declare', definition: 'To announce openly or formally', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dedicate', definition: 'To devote time or effort to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'deduce', definition: 'To arrive at a fact by reasoning', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'deem', definition: 'To regard or consider in a specified way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'defer', definition: 'To put off to a later time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'define', definition: 'To state the exact meaning of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'delegate', definition: 'To entrust a task to another person', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'deliberate', definition: 'To engage in long and careful consideration', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'delineate', definition: 'To describe or portray precisely', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'demonstrate', definition: 'To clearly show the existence of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'denote', definition: 'To be a sign of; indicate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'denounce', definition: 'To publicly declare to be wrong', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'depict', definition: 'To show or represent by a drawing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'deplete', definition: 'To use up the supply of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'deploy', definition: 'To move into position for military action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'depreciate', definition: 'To diminish in value over time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'derive', definition: 'To obtain something from a source', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'designate', definition: 'To officially assign a status', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'detect', definition: 'To discover or identify the presence of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'deter', definition: 'To discourage someone from doing something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'deteriorate', definition: 'To become progressively worse', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'determine', definition: 'To cause something to occur in a particular way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'devastate', definition: 'To destroy or ruin', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'devise', definition: 'To plan or invent by careful thought', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'devote', definition: 'To give all or most of one\'s time to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'diagnose', definition: 'To identify the nature of an illness', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'differentiate', definition: 'To recognize or identify as different', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'diffuse', definition: 'To spread over a wide area', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'digest', definition: 'To break down food in the alimentary canal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dilute', definition: 'To make a liquid thinner or weaker', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'diminish', definition: 'To make or become less', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'discard', definition: 'To get rid of as no longer useful', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'discern', definition: 'To perceive or recognize something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'disclose', definition: 'To make known; reveal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'discount', definition: 'To regard as being unworthy of consideration', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'discourage', definition: 'To cause someone to lose confidence', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'discriminate', definition: 'To recognize a distinction', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dismiss', definition: 'To order or allow to leave', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dispel', definition: 'To make a doubt or feeling disappear', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'disperse', definition: 'To distribute or spread over a wide area', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'displace', definition: 'To take over the place or function of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'display', definition: 'To make a prominent exhibition of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dispose', definition: 'To get rid of by throwing away', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'disprove', definition: 'To prove that something is false', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dispute', definition: 'To argue about; debate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'disregard', definition: 'To pay no attention to; ignore', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'disrupt', definition: 'To interrupt by causing a disturbance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'disseminate', definition: 'To spread information widely', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dissipate', definition: 'To disperse or scatter', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dissolve', definition: 'To become incorporated into a liquid', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'distinguish', definition: 'To recognize or treat as different', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'distort', definition: 'To pull or twist out of shape', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'distribute', definition: 'To give shares of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'diverge', definition: 'To separate from another route', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'diversify', definition: 'To make or become more diverse', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'divert', definition: 'To cause to change course or direction', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'document', definition: 'To record in written form', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dominate', definition: 'To have a commanding influence on', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'draft', definition: 'To prepare a preliminary version', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'duplicate', definition: 'To make an exact copy of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'dwell', definition: 'To live in or at a specified place', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'intermediate' },
];

// Additional Academic Adjectives
const ACADEMIC_ADJECTIVES: VocabularyWord[] = [
  { word: 'abrupt', definition: 'Sudden and unexpected', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'abundant', definition: 'Existing or available in large quantities', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accessible', definition: 'Able to be reached or entered', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'accountable', definition: 'Required to explain actions or decisions', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'acute', definition: 'Present or experienced to a severe degree', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'adamant', definition: 'Refusing to be persuaded or to change one\'s mind', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'adequate', definition: 'Sufficient for a specific requirement', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'adjacent', definition: 'Next to or adjoining something else', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'adverse', definition: 'Preventing success or development', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'affluent', definition: 'Having a great deal of money; wealthy', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'aggregate', definition: 'Formed or calculated by the combination of many separate units', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'akin', definition: 'Of similar character', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'alleged', definition: 'Said, without proof, to have taken place', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ambivalent', definition: 'Having mixed feelings about something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'ample', definition: 'Enough or more than enough; plentiful', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'analogous', definition: 'Comparable in certain respects', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'anonymous', definition: 'Not identified by name', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'apparent', definition: 'Clearly visible or understood', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'applicable', definition: 'Relevant or appropriate', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'appropriate', definition: 'Suitable or proper in the circumstances', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'approximate', definition: 'Close to the actual, but not completely accurate', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'arbitrary', definition: 'Based on random choice rather than reason', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'arduous', definition: 'Involving or requiring strenuous effort', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'assertive', definition: 'Having or showing a confident personality', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'astute', definition: 'Having an ability to accurately assess situations', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'authentic', definition: 'Of undisputed origin; genuine', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'autonomous', definition: 'Having the freedom to act independently', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'averse', definition: 'Having a strong dislike or opposition', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'benevolent', definition: 'Well meaning and kindly', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'biased', definition: 'Unfairly prejudiced for or against something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'blatant', definition: 'Done openly and unashamedly', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'brief', definition: 'Of short duration', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'broad', definition: 'Having a distance larger than usual', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'candid', definition: 'Truthful and straightforward', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'capable', definition: 'Having the ability to do something', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'chronic', definition: 'Persisting for a long time', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'civic', definition: 'Relating to a city or town', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'civil', definition: 'Relating to ordinary citizens', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'classic', definition: 'Judged over time to be of the highest quality', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'coherent', definition: 'Logical and consistent', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'collective', definition: 'Done by people acting as a group', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'comparable', definition: 'Able to be likened to another', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'compatible', definition: 'Able to exist or work together', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'compelling', definition: 'Evoking interest or attention', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'competent', definition: 'Having the necessary ability or knowledge', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'complex', definition: 'Consisting of many different parts', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'comprehensive', definition: 'Complete; including all elements', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'compulsory', definition: 'Required by law or a rule', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'conceivable', definition: 'Capable of being imagined or grasped mentally', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
  { word: 'concise', definition: 'Giving a lot of information clearly', part_of_speech: 'adjective', topic: 'Academic', difficulty_level: 'intermediate' },
];

async function seedBatch6(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ACADEMIC_VERBS, ...ACADEMIC_ADJECTIVES];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 6: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 6 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 6');
  console.log('Academic Verbs + Academic Adjectives');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch6(supabase);
  
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
