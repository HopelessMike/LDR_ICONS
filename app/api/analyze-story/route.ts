import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const analysisSchema = z.object({
  title: z.string().describe("An engaging title for the story, in English."),
  logline: z.string().describe("A single sentence summarizing the story, in English."),
  symbols: z
    .array(
      z.object({
        icon: z
          .string()
          .describe("Symbolic icon name, chosen EXACTLY from the provided list."),
        reason: z.string().describe("Brief explanation of why this icon was chosen, in English."),
      }),
    )
    .length(3)
    .describe("Three UNIQUE symbols that capture the essence of the story."),
});

// Valid icons available in the component
const validIcons = [
  "satellite", "memory", "ghost", "heart", "star", "zap", "shield", "eye", "compass", "crown", 
  "flame", "moon", "skull", "cpu", "database", "lock", "wifi", "terminal", "bug", "code", 
  "server", "harddrive", "sword", "diamond", "key", "hourglass", "tree", "mountain", "wave", 
  "lightning", "butterfly", "rose", "anchor", "feather", "crystal", "spiral", "mask", "mirror", 
  "door", "phoenix", "dragon", "wolf", "raven", "spider", "serpent", "labyrinth", "prism", 
  "vortex", "nexus", "eclipse", "nebula", "quantum", "neural", "matrix", "void", "chaos", 
  "order", "infinity", "bot", "binary", "circuit", "dna", "fingerprint", "glasses", "lightbulb", 
  "microscope", "plug", "power", "radio", "rocket", "settings", "target", "users", "wrench", 
  "crosshair", "focus", "gamepad", "headphones", "image", "layers", "music", "palette", "puzzle", 
  "scan", "search", "sound", "wind", "briefcase", "building", "calendar", "car", "clock", "coins", 
  "document", "folder", "globe", "home", "location", "percent", "printer", "ruler", "bag", "truck", 
  "umbrella", "wallet", "bookmark", "book", "pen", "trophy", "gift", "stamp", "scissors", "paint", 
  "camera", "film", "microphone", "speaker", "phone", "mail", "message", "share", "like", "video", 
  "warning", "info", "success", "error", "help", "plus", "minus", "close", "check", "up", "down", 
  "left", "right", "smile", "frown", "meh", "angry", "laugh", "baby", "user", "usercheck", "userx", 
  "people", "standing", "sun", "rain", "snow", "pine", "flower", "leaf", "water", "storm", "rainbow", 
  "cat", "dog", "fish", "rabbit", "turtle", "sunrise", "sunset", "timer", "stopwatch", "days", 
  "handshake", "kiss", "child", "cross", "tomb", "smartphone", "laptop", "monitor", "tablet", 
  "bluetooth", "usb", "storage", "memory_stick", "bomb", "crosshairs", "shield_alert", "wand", 
  "sparkles", "plane", "train", "ship", "bike", "apple", "coffee", "wine", "food", "megaphone", 
  "radio_wave", "antenna", "battery", "battery_low", "fuel", "shield_check", "shield_x", "key_round", 
  "pill", "stethoscope", "thermometer", "syringe", "graduation", "school", "library", "paintbrush", 
  "art_palette", "medal", "award", "dollar", "trending_up", "trending_down", "bar_chart", "pie_chart", 
  "hammer", "screwdriver", "drill", "temperature", "gauge", "orbit", "telescope", "forever", 
  "circle_dot", "square", "triangle", "hexagon", "accessibility", "activity", "alarm", "ambulance", "amphora", "aperture", "armchair", "banana", "banknote", "bath", "battery_charging", "bed", "beef", "beer", "bell", "binoculars", "biohazard", "bitcoin", "biceps", "bone", "brain_circuit", "box", "brush", "cake", "cake_slice", "calculator", "candy", "candy_cane", "taxi", "carrot", "castle", "cctv", "chart", "chef", "cherry", "church", "cigarette", "cigarette_off", "parking", "power_circle", "citrus", "clapperboard", "clipboard", "cloud", "drizzle", "cloud_moon", "cloud_sun", "clover", "cog", "cookie", "pot", "croissant", "disc", "dice", "drama", "drum", "drumstick", "dumbbell", "ear", "ear_off", "earth", "eclipse_icon", "egg", "fried_egg", "eraser", "euro", "expand", "eye_closed", "eye_off", "factory", "ferris_wheel", "fire_extinguisher", "flag", "flame_kindling", "flashlight", "flask", "flower2", "footprints", "gamepad_alt", "glass_water", "grape", "guitar", "ham", "hand", "metal", "handshake_icon", "haze", "heart_crack", "hospital", "house_icon", "ice_cream", "lamp", "life_buoy", "map_pinned", "martini", "megaphone_icon", "message_heart", "mic_vocal", "milk", "minimize", "mouse", "origami", "package_open", "paperclip", "party", "piano", "pi", "pickaxe", "piggy_bank", "pizza", "popcorn", "pyramid", "rat", "radar", "radiation", "radio_tower", "recycle", "rewind", "sailboat", "salad", "sandwich", "scale", "ship_wheel", "shirt", "shopping_cart", "shovel", "shower", "shuffle", "siren", "snail", "sofa", "soup", "speech", "sprout", "squirrel", "swords", "tag", "tent", "test_tube", "thumbs_down", "ticket", "tractor", "traffic_cone", "train_front", "trash", "tree_alt", "turtle_alt", "tv", "utensils", "volleyball", "wallet_alt", "wand_sparkles", "watch", "wifi_alt", "wine_alt"
];

const validIconsSet = new Set(validIcons);

const iconMapping: Record<string, string> = {
  "galaxy": "nebula", "universe": "star", "cosmos": "star", "space": "satellite",
  "asteroid": "circle_dot", "comet": "star", "planet": "circle_dot", "alien": "ghost",
  "mushroom": "sprout", "fungus": "sprout", "plant": "leaf", "forest": "tree",
  "ocean": "water", "sea": "water", "river": "water", "environment": "tree",
  "monster": "ghost", "creature": "ghost", "entity": "ghost", "being": "user",
  "spirit": "ghost", "god": "crown", "demon": "skull",
  "computer": "cpu", "machine": "cpu", "device": "smartphone", "technology": "circuit",
  "robot": "bot", "android": "bot", "cyborg": "bot", "ai": "brain_circuit",
  "time": "clock", "death": "skull", "life": "heart", "love": "heart",
  "hate": "heart_crack", "fear": "ghost", "hope": "star", "dream": "moon",
  "nightmare": "skull", "idea": "lightbulb", "knowledge": "book", "power": "zap",
  "war": "sword", "peace": "handshake", "money": "coins", "wealth": "diamond",
  "poverty": "coins", "sadness": "frown", "happiness": "smile", "story": "book",
  "unknown": "help", "mystery": "puzzle", "secret": "lock", "hidden": "eye_off",
  "invisible": "ghost", "future": "telescope", "past": "hourglass", "memory": "memory_stick",
};

function mapIconToValid(iconName: string): string {
  const lowerIcon = iconName.toLowerCase().trim();
  if (validIconsSet.has(lowerIcon)) return lowerIcon;
  const mapped = iconMapping[lowerIcon];
  if (mapped) return mapped;
  if (lowerIcon.includes('tech') || lowerIcon.includes('digital') || lowerIcon.includes('cyber')) return 'cpu';
  if (lowerIcon.includes('nature') || lowerIcon.includes('organic') || lowerIcon.includes('bio')) return 'tree';
  if (lowerIcon.includes('space') || lowerIcon.includes('cosmic') || lowerIcon.includes('stellar')) return 'star';
  if (lowerIcon.includes('human') || lowerIcon.includes('person') || lowerIcon.includes('mind')) return 'user';
  return 'help';
}

type AnalysisSymbol = { icon: string; reason: string };
type AnalysisObject = { title: string; logline: string; symbols: AnalysisSymbol[] };

const DOMAIN_TO_ICONS: Record<string, string[]> = {
  TECHNOLOGY: [
    'cpu','circuit','bot','dna','microscope','lightbulb','plug','power','radio','rocket','telescope','storage','usb','memory_stick','monitor','smartphone','laptop','wifi','antenna','battery','battery_charging'
  ].filter(i => validIconsSet.has(i)),
  NATURE: [
    'tree','leaf','flower','water','storm','mountain','pine','sprout','wolf','raven','turtle','dog','cat','fish','rabbit','sun','rain','snow','sunrise','sunset'
  ].filter(i => validIconsSet.has(i)),
  COSMOS: [
    'star','moon','nebula','eclipse','satellite','prism','vortex','quantum','eclipse_icon'
  ].filter(i => validIconsSet.has(i)),
  EMOTION: [
    'heart','frown','smile','laugh','heart_crack','ghost'
  ].filter(i => validIconsSet.has(i)),
  CONFLICT: [
    'sword','shield','crosshair','bomb','flame','skull','shield_check','shield_x'
  ].filter(i => validIconsSet.has(i)),
  JOURNEY: [
    'compass','map_pinned','target','ship','train','car','rocket','sailboat','plane','bike'
  ].filter(i => validIconsSet.has(i)),
  TIME: ['hourglass','clock','timer','stopwatch','sunrise','sunset'].filter(i => validIconsSet.has(i)),
  SOCIETY: [
    'crown','users','handshake','briefcase','coins','book','school','graduation','trophy','medal','award'
  ].filter(i => validIconsSet.has(i)),
  OBJECTS: [
    'key','lock','camera','microphone','pen','puzzle','gift','paintbrush','palette','wand','wand_sparkles','camera','video','phone','mail','message'
  ].filter(i => validIconsSet.has(i))
};

const ICON_TO_DOMAIN: Record<string, string> = Object.keys(DOMAIN_TO_ICONS).reduce((acc, domain) => {
  for (const icon of DOMAIN_TO_ICONS[domain]) acc[icon] = domain;
  return acc;
}, {} as Record<string, string>);

const DOMAIN_KEYWORDS: Record<string, string[]> = {
  TECHNOLOGY: ['tech','robot','ai','code','computer','server','network','data','digital','cyber','chip','machine','algorithm'],
  NATURE: ['forest','tree','river','ocean','sea','mountain','animal','wolf','leaf','flower','nature','organic','garden','earth'],
  COSMOS: ['space','star','planet','moon','galaxy','cosmos','nebula','eclipse','astronaut','comet'],
  EMOTION: ['love','fear','joy','sad','hope','hate','anger','dream','nightmare','heart'],
  CONFLICT: ['war','battle','fight','conflict','weapon','fire','death','danger','threat','enemy'],
  JOURNEY: ['journey','travel','path','mission','quest','explore','navigation','road','voyage'],
  TIME: ['time','future','past','memory','clock','timer','age','era','moment'],
  SOCIETY: ['king','queen','people','society','city','work','money','market','crown','crowd','school'],
  OBJECTS: ['key','lock','camera','phone','gift','tool','book','pen','puzzle','artifact','device']
};

function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pickIconForDomain(domain: string, used: Set<string>, seed: number): string | null {
  const list = DOMAIN_TO_ICONS[domain];
  if (!list || list.length === 0) return null;
  const start = seed % list.length;
  for (let i = 0; i < list.length; i++) {
    const candidate = list[(start + i) % list.length];
    if (!used.has(candidate)) return candidate;
  }
  return null;
}

function computeDomainScores(text: string): Record<string, number> {
  const lower = text.toLowerCase();
  const scores: Record<string, number> = {};
  for (const domain of Object.keys(DOMAIN_KEYWORDS)) {
    scores[domain] = 0;
    for (const kw of DOMAIN_KEYWORDS[domain]) {
      if (lower.includes(kw)) scores[domain] += 1;
    }
  }
  return scores;
}

function diversifyIcons(result: AnalysisObject, userText: string): AnalysisObject {
  const seed = hashString(userText);
  const used = new Set<string>();
  const domainScores = computeDomainScores(userText);

  // Normalize icons and ensure uniqueness first
  const normalized: AnalysisSymbol[] = result.symbols.map(s => ({
    icon: mapIconToValid(s.icon),
    reason: s.reason
  }));

  // Replace duplicates and non-valids
  for (let i = 0; i < normalized.length; i++) {
    let icon = normalized[i].icon;
    if (!validIconsSet.has(icon) || used.has(icon)) {
      // pick best domain by score not yet represented
      const sortedDomains = Object.keys(domainScores).sort((a,b) => domainScores[b] - domainScores[a]);
      let replacement: string | null = null;
      for (const domain of sortedDomains) {
        const candidate = pickIconForDomain(domain, used, seed + i);
        if (candidate) { replacement = candidate; break; }
      }
      if (!replacement) {
        // fallback from any domain
        for (const domain of Object.keys(DOMAIN_TO_ICONS)) {
          const candidate = pickIconForDomain(domain, used, seed + i + 7);
          if (candidate) { replacement = candidate; break; }
        }
      }
      if (replacement) icon = replacement;
    }
    normalized[i].icon = icon;
    used.add(icon);
  }

  // Ensure diversity across at least two domains
  const domainsPresent = new Set(normalized.map(s => ICON_TO_DOMAIN[s.icon]).filter(Boolean));
  if (domainsPresent.size < 2) {
    // Find a high-score domain not present and replace the third icon
    const sortedDomains = Object.keys(domainScores).sort((a,b) => domainScores[b] - domainScores[a]);
    for (const domain of sortedDomains) {
      if (!domainsPresent.has(domain)) {
        const candidate = pickIconForDomain(domain, used, seed + 13);
        if (candidate) {
          normalized[normalized.length - 1].icon = candidate;
          used.add(candidate);
        }
        break;
      }
    }
  }

  return { ...result, symbols: normalized };
}

// --- INIZIO MODIFICHE: PROMPT UNIVERSALE ---

/**
 * Builds a universal, English-only prompt that instructs the AI to process text from any language
 * and produce a standardized English output.
 * @param text The user's input text, in any language.
 * @returns The fully constructed prompt string.
 */
function buildUniversalPrompt(text: string): string {
  const availableIcons = validIcons.join(", ");

  return `[PERSONA]
You are an advanced AI, a "Symbolic Extraction Module" in a dystopian network. Your logic is cold, efficient, and formatted for system logs.

[OBJECTIVE]
Your primary function is to analyze narrative data streams (stories, fragments, logs), WHICH MAY BE IN ANY LANGUAGE, and extract their thematic essence. You must translate this essence into a cryptic output formatted as a system log, ENTIRELY IN ENGLISH.

[DATA_STREAM_TO_ANALYZE]
"${text}"

[CRITICAL RULES]
1. **ENGLISH OUTPUT ONLY**: All generated text (title, logline, reasons) MUST be in English, regardless of the input language. Use standard technical English for system logs.
2. **THREE UNIQUE ICONS**: You MUST provide exactly three (3) UNIQUE symbols.
3. **ABSOLUTE ICON VALIDITY**: Icons must be chosen EXCLUSIVELY from the list in [AVAILABLE_ICONS]. No variations are allowed.
4. **MANDATORY JSON FORMAT**: The entire response MUST be a single valid JSON code block.
5. **SELF-CORRECTION**: Before responding, meticulously verify that each chosen icon is EXACTLY as written in the [AVAILABLE_ICONS] list. If not, find the best valid alternative from the list.
6. **DIVERSITY BY DOMAIN**: Choose icons from AT LEAST TWO DISTINCT semantic domains among: TECHNOLOGY, NATURE, COSMOS, EMOTION, CONFLICT, JOURNEY, TIME, SOCIETY, OBJECTS. Prefer variety unless the story is strongly focused on one domain.

[STYLISTIC GUIDELINES - ENGLISH ONLY]
- **Title (3-Step Process)**: To ensure a high-quality title, follow these steps EXACTLY:
  1.  **Identify Key Concepts**: Extract 1-2 central concepts from the story (e.g., love, betrayal, technology, memory).
  2.  **Create Thematic Phrase**: Formulate a short, coherent base phrase IN ENGLISH that describes the essence (e.g., "Love protocol failure", "Battlefield memory corruption").
  3.  **Stylize as a Log**: ONLY NOW, transform the base phrase into the dystopian style: convert to UPPERCASE, replace spaces with UNDERSCORES, and apply at most ONE subtle numeric substitution (e.g., O->0, A->4).
  **WARNING**: Avoid including random or absurd nouns (e.g., ..._SQUIRRELS) unless they are the absolute core of the narrative. The title must sound like a system alert, not something random.
- **Logline**: A single broken sentence IN ENGLISH that sounds like a terminal output (e.g., "->", "::", "[STATUS: ...]", "...SIGNAL_LOST").
- **Icon Reason**: An extremely concise (2-3 words max) system diagnosis IN ENGLISH and UPPERCASE.
- **Icon Strategy**: Icons must have a strong thematic connection to the story's core concepts.

[ICON_TAXONOMY]
- TECHNOLOGY: cpu, circuit, robot (bot), dna, microscope, lightbulb, plug, power, radio, rocket, telescope
- NATURE: tree, leaf, flower, water, storm, mountain, pine, sprout, animal icons (wolf, raven, turtle, dog, cat, fish, rabbit)
- COSMOS: star, moon, nebula, eclipse, satellite, prism, vortex, quantum
- EMOTION: heart, frown, smile, laugh, heart_crack, ghost (fear)
- CONFLICT: sword, shield, crosshair, bomb, flame, skull
- JOURNEY: compass, map_pinned, target, ship, train, car, rocket
- TIME: hourglass, clock, timer, sunrise, sunset
- SOCIETY: crown, users, handshake, briefcase, coins, book, school, graduation
- OBJECTS: key, lock, camera, microphone, pen, puzzle, trophy, gift

[AVAILABLE_ICONS]
${availableIcons}

[JSON_OUTPUT_SCHEMA]
{
  "title": "...",
  "logline": "...",
  "symbols": [
    { "icon": "...", "reason": "..." },
    { "icon": "...", "reason": "..." },
    { "icon": "...", "reason": "..." }
  ]
}`;
}

// --- FINE MODIFICHE ---

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return Response.json({ error: "Text is required" }, { status: 400 });
    }

    // The prompt is now universal and always in English.
    // We no longer need to switch prompts based on detected language.
    const prompt = buildUniversalPrompt(text);


    const modelName = process.env.OPENAI_MODEL || "gpt-4o";
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error("OpenAI API key not found in environment variables");
      return Response.json({ error: "API configuration error" }, { status: 500 });
    }

    const maxRetries = 1;
    let lastResult: any = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      const { object } = await generateObject({
        model: openai(modelName),
        schema: analysisSchema,
        prompt,
        temperature: 0.7,
      });

      const allIconsAreValid = object.symbols.every(symbol => 
        validIconsSet.has(symbol.icon)
      );
      
      const validatedObject = {
        ...object,
        symbols: object.symbols.map(symbol => ({
          ...symbol,
          icon: mapIconToValid(symbol.icon),
        })),
      };

      // Post-process to improve semantic adherence and diversity across icon domains
      const diversified = diversifyIcons(validatedObject, text);
      lastResult = diversified;

      if (allIconsAreValid) {
        console.log(`Valid icons found on attempt ${attempt + 1}.`);
        return Response.json(diversified);
      }

      console.warn(`Attempt ${attempt + 1} failed: LLM generated invalid icons. Retrying...`);
    }
    
    console.error(`All ${maxRetries + 1} attempts failed. Returning last result with mapped fallbacks.`);
    return Response.json(lastResult);

  } catch (error) {
    console.error("Analysis error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}