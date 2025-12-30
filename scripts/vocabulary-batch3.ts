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

// Business and Work Vocabulary
const BUSINESS_WORK: VocabularyWord[] = [
  { word: 'accountability', definition: 'The fact of being responsible for what you do', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'acquisition', definition: 'The buying or obtaining of assets or objects', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'agenda', definition: 'A list of items to be discussed at a meeting', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'appraisal', definition: 'An act of assessing something or someone', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'apprentice', definition: 'A person learning a trade from a skilled employer', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'arbitration', definition: 'The use of an arbitrator to settle a dispute', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'advanced' },
  { word: 'asset', definition: 'A useful or valuable thing or person', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'audit', definition: 'An official inspection of accounts', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'bankrupt', definition: 'Declared in law unable to pay debts', part_of_speech: 'adjective', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'benchmark', definition: 'A standard or point of reference', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'bidder', definition: 'A person or organization making a formal offer', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'blueprint', definition: 'A design plan or other technical drawing', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'boardroom', definition: 'A room where a board of directors meets', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'bonus', definition: 'A sum of money added to a person\'s wages', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'brand', definition: 'A type of product manufactured by a company', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'broker', definition: 'A person who buys and sells goods for others', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'bureaucrat', definition: 'An official in a government department', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'candidate', definition: 'A person who applies for a job', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'capacity', definition: 'The maximum amount that something can contain', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'career', definition: 'An occupation undertaken for a significant period', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'cashflow', definition: 'The total amount of money being transferred', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'chairman', definition: 'A person chosen to preside over a meeting', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'client', definition: 'A person using the services of a professional', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'collaboration', definition: 'The action of working with someone to produce something', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'commission', definition: 'A sum paid to an agent for a transaction', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'commitment', definition: 'The state of being dedicated to a cause', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'compensation', definition: 'Something given to make up for loss or injury', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'competence', definition: 'The ability to do something successfully', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'competitor', definition: 'A person or organization competing with others', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'compliance', definition: 'The action of complying with a command', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'conglomerate', definition: 'A large corporation formed by merging companies', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'advanced' },
  { word: 'consultant', definition: 'A person who provides expert advice professionally', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'consumer', definition: 'A person who purchases goods and services', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'contract', definition: 'A written or spoken agreement', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'contractor', definition: 'A person who undertakes a contract', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'corporate', definition: 'Relating to a large company or group', part_of_speech: 'adjective', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'corporation', definition: 'A large company or group of companies', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'creditor', definition: 'A person or company to whom money is owed', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'deadline', definition: 'The latest time by which something should be completed', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'debtor', definition: 'A person or institution that owes money', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'delegate', definition: 'A person sent to represent others', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'demand', definition: 'An insistent and peremptory request', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'department', definition: 'A division of a large organization', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'depreciation', definition: 'A reduction in the value of an asset', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'director', definition: 'A person who is in charge of an activity', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'dismissal', definition: 'The act of ordering someone to leave', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'distribution', definition: 'The action of sharing something out', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'dividend', definition: 'A sum of money paid to shareholders', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'downsizing', definition: 'The reduction of a company\'s workforce', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'efficiency', definition: 'The state of achieving maximum productivity', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'employee', definition: 'A person employed for wages or salary', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'employer', definition: 'A person or organization that employs people', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'enterprise', definition: 'A project or undertaking', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'entrepreneur', definition: 'A person who sets up a business', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'equity', definition: 'The value of shares issued by a company', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'estimate', definition: 'An approximate calculation or judgment', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'executive', definition: 'A person with senior managerial responsibility', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'expenditure', definition: 'The action of spending funds', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'expertise', definition: 'Expert skill or knowledge in a particular field', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'export', definition: 'To send goods to another country for sale', part_of_speech: 'verb', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'fiscal', definition: 'Relating to government revenue', part_of_speech: 'adjective', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'forecast', definition: 'A prediction or estimate of future events', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'franchise', definition: 'An authorization to sell a company\'s goods', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'freelance', definition: 'Working for different companies at different times', part_of_speech: 'adjective', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'headquarters', definition: 'The premises from which an organization is directed', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'hierarchy', definition: 'A system in which members are ranked', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'import', definition: 'To bring goods into a country from abroad', part_of_speech: 'verb', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'incentive', definition: 'A thing that motivates or encourages someone', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'income', definition: 'Money received for work or through investments', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'inflation', definition: 'A general increase in prices', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'infrastructure', definition: 'The basic physical systems of a country', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'innovation', definition: 'The action of introducing something new', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'insurance', definition: 'An arrangement for compensation in case of loss', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'intern', definition: 'A student or trainee who works to gain experience', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'inventory', definition: 'A complete list of items', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'investment', definition: 'The action of investing money for profit', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'investor', definition: 'A person who invests money', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'invoice', definition: 'A list of goods sent or services provided', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'layoff', definition: 'A discharge of a worker', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'leadership', definition: 'The action of leading a group', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'lease', definition: 'A contract by which one party conveys property', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'liability', definition: 'A thing for which someone is responsible', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'logistics', definition: 'The detailed organization of a complex operation', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'management', definition: 'The process of dealing with or controlling things', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'manager', definition: 'A person responsible for controlling an organization', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'manufacture', definition: 'To make something on a large scale using machinery', part_of_speech: 'verb', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'margin', definition: 'The edge or border of something', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'marketing', definition: 'The action of promoting and selling products', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'mentor', definition: 'An experienced person who advises and helps', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'merger', definition: 'A combination of two things into one', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'monopoly', definition: 'The exclusive possession or control of something', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'mortgage', definition: 'A legal agreement to borrow money to buy property', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'negotiate', definition: 'To try to reach an agreement through discussion', part_of_speech: 'verb', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'networking', definition: 'The action of interacting with others', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'occupation', definition: 'A job or profession', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'outsource', definition: 'To obtain goods or services from an outside supplier', part_of_speech: 'verb', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'overhead', definition: 'The ongoing expenses of operating a business', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'overtime', definition: 'Time worked in addition to normal working hours', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'partnership', definition: 'An association of two or more people as partners', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'patent', definition: 'A government license giving exclusive rights', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'payroll', definition: 'A list of employees and the amount to be paid', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'pension', definition: 'A regular payment made to retired people', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'personnel', definition: 'People employed in an organization', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'portfolio', definition: 'A range of investments held by a person', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'premium', definition: 'An amount to be paid for an insurance policy', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'procurement', definition: 'The action of obtaining or procuring something', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'productivity', definition: 'The effectiveness of productive effort', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'profession', definition: 'A paid occupation requiring training', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'profit', definition: 'A financial gain', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'promotion', definition: 'Activity that supports or encourages', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'proposal', definition: 'A plan or suggestion put forward', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'prospect', definition: 'The possibility of some future event occurring', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'quota', definition: 'A limited quantity of a product', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'recession', definition: 'A period of temporary economic decline', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'recruitment', definition: 'The action of enlisting new people', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'redundancy', definition: 'The state of being no longer needed', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'regulation', definition: 'A rule or directive made by an authority', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'remuneration', definition: 'Money paid for work or a service', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'advanced' },
  { word: 'resignation', definition: 'An act of retiring or giving up a position', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'retail', definition: 'The sale of goods to the public', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'revenue', definition: 'Income, especially of an organization', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'salary', definition: 'A fixed regular payment for work', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'shareholder', definition: 'An owner of shares in a company', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'stakeholder', definition: 'A person with an interest in something', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'startup', definition: 'A newly established business', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'stock', definition: 'The capital raised by a company through shares', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'strategy', definition: 'A plan of action designed to achieve a goal', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'subsidiary', definition: 'A company controlled by a holding company', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'supervisor', definition: 'A person who supervises a person or activity', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'supplier', definition: 'A person or organization that provides something', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'surplus', definition: 'An amount of something left over', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'tariff', definition: 'A tax or duty to be paid on imports or exports', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'taxation', definition: 'The levying of tax', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'tender', definition: 'An offer to carry out work at a stated price', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'trademark', definition: 'A symbol or name identifying a product', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'transaction', definition: 'An instance of buying or selling something', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'turnover', definition: 'The amount of money taken by a business', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'unemployment', definition: 'The state of being without a paid job', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'vacancy', definition: 'An unoccupied position or job', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'vendor', definition: 'A person or company offering something for sale', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'venture', definition: 'A risky or daring journey or undertaking', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'wage', definition: 'A fixed regular payment for work', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'warehouse', definition: 'A large building where goods are stored', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'wholesale', definition: 'The selling of goods in large quantities', part_of_speech: 'noun', topic: 'Economy', difficulty_level: 'intermediate' },
  { word: 'workforce', definition: 'The people engaged in or available for work', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
  { word: 'workplace', definition: 'A place where people work', part_of_speech: 'noun', topic: 'Work', difficulty_level: 'intermediate' },
];

// Media and Communication Vocabulary
const MEDIA_COMMUNICATION: VocabularyWord[] = [
  { word: 'advertisement', definition: 'A notice or announcement promoting a product', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'agenda', definition: 'The underlying intentions or motives', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'anchor', definition: 'A person who presents a news program', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'article', definition: 'A piece of writing in a newspaper or magazine', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'audience', definition: 'The assembled spectators or listeners', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'bias', definition: 'Prejudice in favor of or against something', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'blog', definition: 'A regularly updated website or web page', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'broadcast', definition: 'To transmit a program by radio or television', part_of_speech: 'verb', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'bulletin', definition: 'A short official statement or broadcast', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'campaign', definition: 'An organized course of action to achieve a goal', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'caption', definition: 'A title or brief explanation accompanying an image', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'celebrity', definition: 'A famous person', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'censorship', definition: 'The suppression of speech or public communication', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'circulation', definition: 'The number of copies sold of a newspaper', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'columnist', definition: 'A journalist who writes a regular column', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'commentary', definition: 'The expression of opinions or explanations', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'commercial', definition: 'A television or radio advertisement', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'communicate', definition: 'To share or exchange information', part_of_speech: 'verb', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'correspondent', definition: 'A person who reports news from a particular place', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'coverage', definition: 'The extent to which something is covered', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'critic', definition: 'A person who expresses an unfavorable opinion', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'deadline', definition: 'The latest time by which something should be completed', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'documentary', definition: 'A film or television program presenting facts', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'editorial', definition: 'A newspaper article expressing the editor\'s opinion', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'entertainment', definition: 'The action of providing amusement', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'exclusive', definition: 'A story published by only one newspaper', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'feature', definition: 'A distinctive attribute or aspect', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'footage', definition: 'A length of film made for movies or television', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'headline', definition: 'A heading at the top of an article', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'highlight', definition: 'An outstanding part of an event', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'influence', definition: 'The capacity to have an effect on someone', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'interview', definition: 'A meeting at which information is obtained', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'journalism', definition: 'The activity of writing for newspapers', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'journalist', definition: 'A person who writes for newspapers or magazines', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'mainstream', definition: 'The ideas or activities shared by most people', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'manipulation', definition: 'The action of manipulating something', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'medium', definition: 'An agency or means of doing something', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'misinformation', definition: 'False or inaccurate information', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'network', definition: 'A group of broadcasting stations', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'newscast', definition: 'A broadcast of news reports', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'objectivity', definition: 'The quality of being objective', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'opinion', definition: 'A view or judgment formed about something', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'outlet', definition: 'A means of expressing one\'s talents or emotions', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'paparazzi', definition: 'Freelance photographers who pursue celebrities', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'platform', definition: 'A raised level surface', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'podcast', definition: 'A digital audio file available on the internet', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'press', definition: 'Newspapers or journalists viewed collectively', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'propaganda', definition: 'Information used to promote a political cause', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'publication', definition: 'The preparation and issuing of a book', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'publicity', definition: 'Notice or attention given by the media', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'publisher', definition: 'A person or company that prepares and issues books', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'rating', definition: 'A classification based on quality or popularity', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'readership', definition: 'The readers of a newspaper or magazine', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'reporter', definition: 'A person who reports news', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'review', definition: 'A critical appraisal of a book or play', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'scandal', definition: 'An action or event causing public outrage', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'sensationalism', definition: 'The use of exciting or shocking stories', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'slogan', definition: 'A short memorable phrase used in advertising', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'source', definition: 'A person who provides information', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'sponsor', definition: 'A person or organization that pays for a project', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'streaming', definition: 'A method of transmitting data over the internet', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'subscriber', definition: 'A person who receives a publication regularly', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'tabloid', definition: 'A newspaper with small pages and many pictures', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'telecast', definition: 'A television broadcast', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'transparency', definition: 'The condition of being transparent', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'trending', definition: 'Currently popular or widely discussed', part_of_speech: 'adjective', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'viral', definition: 'Quickly and widely spread on the internet', part_of_speech: 'adjective', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'viewer', definition: 'A person watching television or a film', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
  { word: 'webcast', definition: 'A video broadcast over the internet', part_of_speech: 'noun', topic: 'Media', difficulty_level: 'intermediate' },
];

// Law and Government Vocabulary
const LAW_GOVERNMENT: VocabularyWord[] = [
  { word: 'abolish', definition: 'To formally put an end to', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'acquit', definition: 'To free someone from a criminal charge', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'administration', definition: 'The process of managing a business or organization', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'advocate', definition: 'A person who publicly supports a cause', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'allegation', definition: 'A claim that someone has done something illegal', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'amendment', definition: 'A minor change or addition to a document', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'appeal', definition: 'To apply to a higher court for a reversal', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'authority', definition: 'The power to give orders or make decisions', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'ballot', definition: 'A process of voting in writing', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'bill', definition: 'A draft of a proposed law', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'cabinet', definition: 'A body of advisers to a president', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'campaign', definition: 'An organized course of action', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'candidate', definition: 'A person who applies for a job or is nominated', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'citizen', definition: 'A legally recognized subject of a state', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'civil', definition: 'Relating to ordinary citizens', part_of_speech: 'adjective', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'clause', definition: 'A particular section of a legal document', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'coalition', definition: 'An alliance for combined action', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'congress', definition: 'A national legislative body', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'constitution', definition: 'A body of fundamental principles', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'convict', definition: 'To declare someone guilty of a criminal offense', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'corruption', definition: 'Dishonest or fraudulent conduct', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'court', definition: 'A tribunal presided over by a judge', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'crime', definition: 'An action that constitutes an offense', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'criminal', definition: 'A person who has committed a crime', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'debate', definition: 'A formal discussion on a particular topic', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'decree', definition: 'An official order issued by a legal authority', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'defendant', definition: 'A person accused in a court of law', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'delegate', definition: 'A person sent to represent others', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'democracy', definition: 'A system of government by the whole population', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'diplomat', definition: 'An official representing a country abroad', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'election', definition: 'A formal procedure of choosing a person', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'embassy', definition: 'The official residence of an ambassador', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'enact', definition: 'To make a bill or proposal into law', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'enforce', definition: 'To compel observance of a law', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'evidence', definition: 'Information indicating whether something is true', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'executive', definition: 'The branch of government responsible for implementing laws', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'federal', definition: 'Having or relating to a system of government', part_of_speech: 'adjective', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'governor', definition: 'An official appointed to govern a town or region', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'guilty', definition: 'Culpable of or responsible for a wrongdoing', part_of_speech: 'adjective', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'hearing', definition: 'An opportunity to state one\'s case', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'impeach', definition: 'To charge a public official with misconduct', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'advanced' },
  { word: 'implement', definition: 'To put a decision or plan into effect', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'incumbent', definition: 'The holder of an office or post', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'innocent', definition: 'Not guilty of a crime or offense', part_of_speech: 'adjective', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'judge', definition: 'A public official appointed to decide cases', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'judicial', definition: 'Of or relating to a court of law', part_of_speech: 'adjective', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'jurisdiction', definition: 'The official power to make legal decisions', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'jury', definition: 'A body of people sworn to give a verdict', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'justice', definition: 'Just behavior or treatment', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'lawsuit', definition: 'A claim brought to a court of law', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'lawyer', definition: 'A person who practices law', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'legal', definition: 'Relating to the law', part_of_speech: 'adjective', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'legislation', definition: 'Laws considered collectively', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'legislature', definition: 'The legislative body of a country', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'lobby', definition: 'To seek to influence a politician', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'majority', definition: 'The greater number', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'mandate', definition: 'An official order to do something', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'minister', definition: 'A head of a government department', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'monarchy', definition: 'A form of government with a monarch at the head', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'municipal', definition: 'Relating to a town or district', part_of_speech: 'adjective', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'negotiate', definition: 'To try to reach an agreement', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'opposition', definition: 'Resistance or dissent', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'parliament', definition: 'The highest legislature', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'partisan', definition: 'A strong supporter of a party or cause', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'petition', definition: 'A formal written request', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'plaintiff', definition: 'A person who brings a case against another', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'policy', definition: 'A course of action adopted by a government', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'politician', definition: 'A person who is professionally involved in politics', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'poll', definition: 'The process of voting in an election', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'precedent', definition: 'An earlier event serving as an example', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'president', definition: 'The elected head of a republic', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'prime', definition: 'Of first importance', part_of_speech: 'adjective', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'prosecution', definition: 'The institution of legal proceedings', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'referendum', definition: 'A general vote by the electorate', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'reform', definition: 'To make changes to improve something', part_of_speech: 'verb', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'regime', definition: 'A government, especially an authoritarian one', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'regulation', definition: 'A rule or directive made by an authority', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'representative', definition: 'A person chosen to act for another', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'republic', definition: 'A state in which power is held by the people', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'sanction', definition: 'A threatened penalty for disobeying a law', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'senate', definition: 'The smaller upper assembly in some legislatures', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'senator', definition: 'A member of a senate', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'statute', definition: 'A written law passed by a legislative body', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'testimony', definition: 'A formal written or spoken statement', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'treaty', definition: 'A formally concluded agreement between states', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'trial', definition: 'A formal examination of evidence', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'tribunal', definition: 'A court of justice', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'verdict', definition: 'A decision on a disputed issue', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'veto', definition: 'A constitutional right to reject a decision', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'vote', definition: 'A formal indication of a choice', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
  { word: 'witness', definition: 'A person who sees an event take place', part_of_speech: 'noun', topic: 'Government', difficulty_level: 'intermediate' },
];

async function seedBatch3(supabase: SupabaseClient): Promise<void> {
  const allWords = [...BUSINESS_WORK, ...MEDIA_COMMUNICATION, ...LAW_GOVERNMENT];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 3: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 3 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 3');
  console.log('Business/Work + Media/Communication + Law/Government');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch3(supabase);
  
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
