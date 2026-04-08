import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit, LIMITS } from './_rateLimit';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const FALLBACK_WORDS = [
  "abandon", "abundant", "academic", "accelerate", "accessible", "accommodate", "accumulate", "accurate", "achieve", "acknowledge",
  "acquire", "adapt", "adequate", "adjacent", "adjust", "advocate", "affect", "aggregate", "allocate", "alter",
  "alternative", "ambiguous", "amend", "analogy", "analyze", "annual", "anticipate", "apparent", "append", "appreciate",
  "approach", "appropriate", "approximate", "arbitrary", "area", "aspect", "assemble", "assess", "assign", "assist",
  "assume", "assure", "attach", "attain", "attitude", "attribute", "author", "authority", "automate", "available",
  "aware", "behalf", "benefit", "bias", "bond", "brief", "bulk", "capable", "capacity", "category",
  "cease", "challenge", "channel", "chapter", "chart", "cite", "civil", "clarify", "classic", "clause",
  "code", "coherent", "coincide", "collapse", "colleague", "commence", "comment", "commission", "commit", "commodity",
  "communicate", "community", "compact", "compensate", "compile", "complement", "complex", "comply", "component", "compound",
  "comprehensive", "comprise", "compute", "conceive", "concentrate", "concept", "conclude", "concurrent", "conduct", "confer",
  "confine", "confirm", "conflict", "conform", "consent", "consequent", "conserve", "considerable", "consist", "constant",
  "constitute", "constrain", "construct", "consult", "consume", "contact", "contemplate", "contemporary", "content", "contest",
  "context", "continue", "contract", "contradict", "contrary", "contrast", "contribute", "controversy", "convene", "converge",
  "convert", "convince", "cooperate", "coordinate", "core", "corporate", "correspond", "couple", "create", "credit",
  "criteria", "critic", "crucial", "culture", "currency", "cycle", "data", "debate", "decade", "decline",
  "deduce", "define", "definite", "demonstrate", "denote", "deny", "depict", "depress", "derive", "design",
  "despite", "detect", "deviate", "device", "devote", "differentiate", "dimension", "diminish", "discrete", "discriminate",
  "displace", "display", "dispose", "distinct", "distort", "distribute", "diverse", "document", "domain", "domestic",
  "dominate", "draft", "drama", "duration", "dynamic", "economy", "edit", "element", "eliminate", "emerge",
  "emphasize", "empirical", "enable", "encounter", "energy", "enforce", "enhance", "enormous", "ensure", "entity",
  "environment", "equate", "equip", "equivalent", "erode", "error", "establish", "estate", "estimate", "ethic",
  "ethnic", "evaluate", "eventual", "evident", "evolve", "exceed", "exclude", "exhibit", "exist", "expand",
  "expert", "explicit", "exploit", "export", "expose", "external", "extract", "facilitate", "factor", "feature",
  "federal", "fee", "file", "final", "finance", "finite", "flexible", "fluctuate", "focus", "format",
  "formula", "forthcoming", "found", "foundation", "frame", "framework", "function", "fund", "fundamental", "further",
  "gender", "generate", "generic", "globe", "goal", "grade", "grant", "guarantee", "guideline", "hence",
  "hierarchy", "highlight", "hypothesis", "identical", "identify", "ideology", "ignore", "illustrate", "image", "immigrate",
  "impact", "implement", "implicate", "implicit", "imply", "impose", "incentive", "incidence", "incline", "include",
  "income", "incorporate", "index", "indicate", "individual", "induce", "inevitable", "infer", "infrastructure", "inherent",
  "inhibit", "initial", "initiate", "injure", "innovate", "input", "insert", "insight", "inspect", "instance",
  "institute", "instruct", "integral", "integrate", "integrity", "intellect", "intensify", "interact", "intermediate", "internal",
  "interpret", "interval", "intervene", "intrinsic", "invest", "investigate", "invoke", "involve", "isolate", "issue",
  "item", "job", "journal", "justify", "label", "labor", "layer", "lecture", "legal", "legislate",
  "levy", "liberal", "license", "likewise", "link", "locate", "logic", "maintain", "major", "manipulate",
  "manual", "margin", "mature", "maximize", "mechanism", "media", "mediate", "medical", "medium", "mental",
  "method", "migrate", "military", "minimal", "minimize", "minimum", "minister", "minor", "mode", "modify",
  "monitor", "motif", "mutate", "neutral", "nevertheless", "nonetheless", "norm", "normal", "notion", "notwithstanding",
  "nuclear", "objective", "obtain", "obvious", "occupy", "occur", "odd", "offset", "ongoing", "option",
  "orient", "outcome", "output", "overall", "overlap", "oversee", "parallel", "parameter", "participate", "partner",
  "passive", "pattern", "perceive", "percent", "period", "persist", "perspective", "phase", "phenomenon", "philosophy",
  "physical", "plus", "policy", "portion", "pose", "positive", "possess", "potential", "practitioner", "precede",
  "precise", "predict", "predominant", "preliminary", "presume", "previous", "primary", "prime", "principal", "principle",
  "prior", "priority", "proceed", "process", "procure", "professional", "prohibit", "project", "promote", "proportion",
  "prospect", "protocol", "psychology", "publish", "pursue", "qualitative", "quote", "radical", "random", "range",
  "ratio", "rational", "react", "recover", "refine", "regime", "region", "register", "regulate", "reinforce",
  "reject", "relax", "release", "relevant", "reluctant", "rely", "remove", "require", "research", "resemble",
  "resolve", "resource", "respond", "restore", "restrain", "restrict", "retain", "reveal", "revenue", "reverse",
  "revise", "revolution", "rigid", "role", "route", "scenario", "schedule", "scheme", "scope", "section",
  "sector", "secure", "seek", "select", "sequence", "series", "set", "shift", "significant", "similar",
  "simulate", "site", "so-called", "sole", "somewhat", "source", "specific", "specify", "sphere", "stable",
  "statistic", "status", "steady", "stipulate", "strategy", "stress", "structure", "style", "subordinate", "subsequent",
  "subsidy", "substitute", "successive", "sufficient", "sum", "summary", "supplement", "survey", "survive", "suspend",
  "sustain", "symbol", "tape", "target", "task", "team", "technical", "technique", "technology", "temporary",
  "tense", "terminate", "text", "theme", "theory", "thereby", "thesis", "topic", "trace", "tradition",
  "transfer", "transform", "transit", "transmit", "transport", "trend", "trigger", "ultimate", "undergo", "underlie",
  "undertake", "uniform", "unify", "unique", "utilize", "valid", "vary", "vehicle", "version", "via",
  "violate", "virtual", "visible", "vision", "visual", "volume", "voluntary", "welfare", "whereas", "whereby"
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!checkRateLimit(req, res, LIMITS.light, 'typing-words')) return;

  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      console.warn('Supabase credentials not configured, using fallback');
      return res.status(200).json({
        success: true,
        words: shuffleArray(FALLBACK_WORDS).slice(0, 50),
        totalAvailable: FALLBACK_WORDS.length
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    const { count: totalCount } = await supabase
      .from('vocabulary')
      .select('*', { count: 'exact', head: true });

    if (!totalCount || totalCount === 0) {
      return res.status(200).json({
        success: true,
        words: shuffleArray(FALLBACK_WORDS).slice(0, 50),
        totalAvailable: FALLBACK_WORDS.length,
        message: 'Using fallback vocabulary'
      });
    }

    const batchSize = 200;
    const maxOffset = Math.max(0, totalCount - batchSize);
    const randomOffset = Math.floor(Math.random() * (maxOffset + 1));

    const { data: wordsData, error: fetchError } = await supabase
      .from('vocabulary')
      .select('word')
      .range(randomOffset, randomOffset + batchSize - 1);

    if (fetchError) {
      console.error('Error fetching words:', fetchError);
      return res.status(500).json({ 
        error: 'Failed to fetch words',
        details: fetchError.message
      });
    }

    if (!wordsData || wordsData.length === 0) {
      return res.status(200).json({
        success: true,
        words: shuffleArray(FALLBACK_WORDS).slice(0, 50),
        totalAvailable: FALLBACK_WORDS.length,
        message: 'Using fallback vocabulary'
      });
    }

    const shuffledWords = shuffleArray(wordsData.map(w => w.word));
    const selectedWords = shuffledWords.slice(0, 50);

    return res.status(200).json({
      success: true,
      words: selectedWords,
      totalAvailable: totalCount
    });

  } catch (error) {
    console.error('Typing Words API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch typing words',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
