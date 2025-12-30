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

// Advanced Academic Verbs - Part 10
const ADVANCED_VERBS_10: VocabularyWord[] = [
  { word: 'humiliate', definition: 'To make someone feel ashamed and foolish', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hunt', definition: 'To pursue and kill a wild animal for sport or food', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hurl', definition: 'To throw an object with great force', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hurry', definition: 'To move or act with haste or rush', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hurt', definition: 'To cause physical pain or injury to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'hypothesize', definition: 'To put something forward as a hypothesis', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'identify', definition: 'To establish or indicate who or what someone or something is', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'idle', definition: 'To spend time doing nothing or be idle', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ignite', definition: 'To catch fire or cause to catch fire', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'ignore', definition: 'To refuse to take notice of or acknowledge', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'illuminate', definition: 'To light up', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'illustrate', definition: 'To explain or make something clear by using examples', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'imagine', definition: 'To form a mental image or concept of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'imitate', definition: 'To take or follow as a model', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'immerse', definition: 'To dip or submerge in a liquid', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'immigrate', definition: 'To come to live permanently in a foreign country', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'impair', definition: 'To weaken or damage something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'impart', definition: 'To make information known or communicate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'impede', definition: 'To delay or prevent someone or something by obstructing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'imperil', definition: 'To put at risk of being harmed or destroyed', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'implement', definition: 'To put a decision or plan into effect', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'implicate', definition: 'To show someone to be involved in a crime', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'imply', definition: 'To strongly suggest the truth or existence of something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'import', definition: 'To bring goods or services into a country from abroad', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'impose', definition: 'To force something unwelcome or unfamiliar to be accepted', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'impress', definition: 'To make someone feel admiration and respect', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'imprison', definition: 'To put or keep in prison or a place like a prison', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'improve', definition: 'To make or become better', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'improvise', definition: 'To create and perform spontaneously or without preparation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inaugurate', definition: 'To begin or introduce a system or policy', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'incite', definition: 'To encourage or stir up violent or unlawful behavior', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'incline', definition: 'To feel willing or favorably disposed toward an action', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'include', definition: 'To comprise or contain as part of a whole', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'incorporate', definition: 'To take in or contain something as part of a whole', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'increase', definition: 'To become or make greater in size or amount', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'incur', definition: 'To become subject to something unwelcome as a result of one\'s actions', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'indicate', definition: 'To point out or show', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'indict', definition: 'To formally accuse of or charge with a serious crime', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'induce', definition: 'To succeed in persuading or influencing someone to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'indulge', definition: 'To allow oneself to enjoy the pleasure of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'infect', definition: 'To affect a person or organism with a disease-causing organism', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'infer', definition: 'To deduce or conclude information from evidence and reasoning', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'infiltrate', definition: 'To enter or gain access to an organization or place surreptitiously', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inflate', definition: 'To fill something with air or gas so it becomes distended', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inflict', definition: 'To cause something unpleasant or painful to be suffered by someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'influence', definition: 'To have an effect on the character or behavior of someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inform', definition: 'To give someone facts or information or tell', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'infringe', definition: 'To actively break the terms of a law or agreement', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'infuriate', definition: 'To make someone extremely angry and impatient', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inhabit', definition: 'To live in or occupy a place or environment', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inherit', definition: 'To receive money or property from someone who has died', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inhibit', definition: 'To hinder or restrain or prevent an action or process', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'initiate', definition: 'To cause a process or action to begin', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inject', definition: 'To introduce a liquid into the body with a syringe', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'injure', definition: 'To do physical harm or damage to someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'innovate', definition: 'To make changes in something established by introducing new methods', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inquire', definition: 'To ask for information from someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'insert', definition: 'To place or fit something into another thing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'insist', definition: 'To demand something forcefully not accepting refusal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inspect', definition: 'To look at someone or something closely', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'inspire', definition: 'To fill someone with the urge or ability to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'install', definition: 'To place or fix equipment or machinery in position ready for use', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'instigate', definition: 'To bring about or initiate an action or event', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'instill', definition: 'To gradually but firmly establish an idea or attitude in a person\'s mind', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'institute', definition: 'To set in motion or establish something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'instruct', definition: 'To direct or command someone to do something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'insulate', definition: 'To protect something by interposing material that prevents loss', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'insult', definition: 'To speak to or treat with disrespect or scornful abuse', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'insure', definition: 'To arrange for compensation in the event of damage or loss', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'integrate', definition: 'To combine one thing with another so that they become a whole', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intend', definition: 'To have a course of action as one\'s purpose or objective', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intensify', definition: 'To become or make more intense', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'interact', definition: 'To act in such a way as to have an effect on another', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intercept', definition: 'To obstruct someone or something so as to prevent them from continuing', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'interest', definition: 'To excite the curiosity or attention of someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'interfere', definition: 'To prevent a process or activity from continuing or being carried out', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'interpret', definition: 'To explain the meaning of information or actions', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'interrogate', definition: 'To ask questions of someone closely or aggressively', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'interrupt', definition: 'To stop the continuous progress of an activity or process', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intervene', definition: 'To come between so as to prevent or alter a result or course of events', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'interview', definition: 'To hold an interview with someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intimidate', definition: 'To frighten or overawe someone especially to make them do what one wants', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'introduce', definition: 'To bring something into use or operation for the first time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'intrude', definition: 'To put oneself deliberately into a place or situation where one is unwelcome', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'invade', definition: 'To enter a country or region so as to subjugate or occupy it', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'invent', definition: 'To create or design something that has not existed before', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'invest', definition: 'To expend money with the expectation of achieving a profit', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'investigate', definition: 'To carry out a systematic or formal inquiry to discover facts', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'invite', definition: 'To make a polite or formal request to someone to go somewhere', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'invoke', definition: 'To cite or appeal to someone or something as an authority', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'involve', definition: 'To have or include something as a necessary or integral part', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'irritate', definition: 'To make someone annoyed or impatient or angry', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'isolate', definition: 'To cause a person or place to be or remain alone or apart from others', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'issue', definition: 'To supply or distribute something for use or sale', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

// Advanced Academic Verbs - Part 11
const ADVANCED_VERBS_11: VocabularyWord[] = [
  { word: 'jeopardize', definition: 'To put someone or something into a situation in which there is danger', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'join', definition: 'To link or connect', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'joke', definition: 'To make jokes or talk humorously', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'journey', definition: 'To travel somewhere', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'judge', definition: 'To form an opinion or conclusion about', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'juggle', definition: 'To continuously toss into the air and catch a number of objects', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'jump', definition: 'To push oneself off a surface and into the air by using the muscles', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'justify', definition: 'To show or prove to be right or reasonable', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'keep', definition: 'To have or retain possession of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'kick', definition: 'To strike or propel forcibly with the foot', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'kidnap', definition: 'To abduct someone and hold them captive', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'kill', definition: 'To cause the death of a person or animal', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'kindle', definition: 'To light or set on fire', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'kiss', definition: 'To touch with the lips as a sign of love or greeting', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'kneel', definition: 'To be in or assume a position in which the body is supported by a knee', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'knit', definition: 'To make a garment or other item by interlocking loops of wool', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'knock', definition: 'To strike a surface noisily to attract attention', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'know', definition: 'To be aware of through observation or inquiry or information', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'label', definition: 'To attach a label to something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lack', definition: 'To be without or deficient in', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lag', definition: 'To fall behind in movement or progress or development', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'land', definition: 'To come down through the air and alight on the ground', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'last', definition: 'To continue for a specified period of time', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'laugh', definition: 'To make the spontaneous sounds and movements of the face and body', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'launch', definition: 'To set a boat in motion by pushing it or allowing it to roll into water', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lay', definition: 'To put down especially gently or carefully', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lead', definition: 'To cause a person or animal to go with one by holding them', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'leak', definition: 'To accidentally lose or admit contents through a hole or crack', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lean', definition: 'To be in or move into a sloping position', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'leap', definition: 'To jump or spring a long way to a great height or with great force', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'learn', definition: 'To gain or acquire knowledge of or skill in something by study', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lease', definition: 'To grant the temporary possession or use of lands or property', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'leave', definition: 'To go away from', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lecture', definition: 'To deliver an educational lecture or lectures', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'legalize', definition: 'To make something that was previously illegal permissible by law', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'legislate', definition: 'To make or enact laws', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lend', definition: 'To grant to someone the use of something on the understanding it will be returned', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lengthen', definition: 'To make or become longer', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lessen', definition: 'To make or become less or diminish', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'let', definition: 'To not prevent or forbid or allow', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'level', definition: 'To give a flat and even surface to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'leverage', definition: 'To use something to maximum advantage', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'levy', definition: 'To impose a tax or fee or fine', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'liberate', definition: 'To set someone free from a situation', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'license', definition: 'To grant a license to someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lie', definition: 'To be in or assume a horizontal or resting position on a supporting surface', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lift', definition: 'To raise to a higher position or level', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'light', definition: 'To provide with light or lighting or illuminate', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lighten', definition: 'To make or become lighter in weight or pressure or severity', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'like', definition: 'To find agreeable or enjoyable or satisfactory', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'liken', definition: 'To point out the resemblance of someone or something to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'limit', definition: 'To set or serve as a limit to', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'line', definition: 'To stand or be positioned at intervals along', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'linger', definition: 'To stay in a place longer than necessary', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'link', definition: 'To make or form or suggest a connection with or between', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'liquidate', definition: 'To wind up the affairs of a company or firm by ascertaining liabilities', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'list', definition: 'To make a list of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'listen', definition: 'To give one\'s attention to a sound', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'litigate', definition: 'To go to law or take a claim or dispute to a court of law', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'live', definition: 'To remain alive', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'load', definition: 'To put a load or large amount of something on or in a vehicle', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'loan', definition: 'To lend a sum of money or item of property', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lobby', definition: 'To seek to influence a politician or public official on an issue', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'locate', definition: 'To discover the exact place or position of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lock', definition: 'To fasten or secure something with a lock', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lodge', definition: 'To present a complaint or appeal to the proper authorities', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'log', definition: 'To enter an item of information in an official record', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'long', definition: 'To have a strong wish or desire', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'look', definition: 'To direct one\'s gaze toward someone or something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'loom', definition: 'To appear as a shadowy form especially one that is large or threatening', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'loosen', definition: 'To make something less tight or firmly fixed', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lose', definition: 'To be deprived of or cease to have or retain something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'love', definition: 'To feel a deep romantic or sexual attachment to someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lower', definition: 'To move something in a downward direction', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lure', definition: 'To tempt a person or an animal to do something or to go somewhere', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'lurk', definition: 'To be or remain hidden so as to wait in ambush for someone', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'magnify', definition: 'To make something appear larger than it is', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mail', definition: 'To send something by mail', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'maintain', definition: 'To cause or enable a condition or state of affairs to continue', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'make', definition: 'To form something by putting parts together or combining substances', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'manage', definition: 'To be in charge of a company or establishment or undertaking', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mandate', definition: 'To give someone authority to act in a certain way', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'maneuver', definition: 'To move skillfully or carefully', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'manifest', definition: 'To display or show a quality or feeling by one\'s acts or appearance', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'manipulate', definition: 'To handle or control a tool or mechanism in a skillful manner', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'manufacture', definition: 'To make something on a large scale using machinery', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'map', definition: 'To represent an area on a map or make a map of', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'march', definition: 'To walk in a military manner with a regular measured tread', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'marginalize', definition: 'To treat a person or group as insignificant or peripheral', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mark', definition: 'To make a visible impression or stain on', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'market', definition: 'To advertise or promote something', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'marry', definition: 'To join in marriage', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
  { word: 'mask', definition: 'To cover the face with a mask', part_of_speech: 'verb', topic: 'Academic', difficulty_level: 'advanced' },
];

async function seedBatch20(supabase: SupabaseClient): Promise<void> {
  const allWords = [...ADVANCED_VERBS_10, ...ADVANCED_VERBS_11];
  
  const uniqueWords = allWords.filter((word, index, self) =>
    index === self.findIndex((w) => w.word.toLowerCase() === word.word.toLowerCase())
  );
  
  console.log(`Total unique words in batch 20: ${uniqueWords.length}`);
  
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
  
  console.log(`\nBatch 20 seeding complete!`);
  console.log(`Successfully processed: ${insertedCount} words`);
  console.log(`Errors: ${errorCount}`);
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('IELTS Vocabulary Batch 20');
  console.log('Advanced Academic Verbs - Parts 10 & 11');
  console.log('='.repeat(60));
  console.log('');

  const supabase = getSupabaseClient();
  
  await seedBatch20(supabase);
  
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
