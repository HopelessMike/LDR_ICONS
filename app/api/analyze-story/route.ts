import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const analysisSchema = z.object({
  title: z.string().describe("An engaging title for the story"),
  logline: z.string().describe("A single sentence summarizing the story"),
  symbols: z
    .array(
      z.object({
        icon: z
          .string()
          .describe("Symbolic icon name, chosen EXACTLY from the provided list."),
        reason: z.string().describe("Brief explanation of why this icon was chosen"),
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

function detectLanguage(text: string): string {
  const italianWords = ['il', 'la', 'di', 'che', 'e', 'è', 'un', 'una', 'per', 'con', 'non', 'del', 'nel', 'della', 'nella', 'sono', 'era', 'aveva', 'molto', 'più', 'quando', 'questo', 'questa', 'dove', 'come', 'anche', 'loro', 'suo', 'sua', 'suoi', 'sue'];
  const englishWords = ['the', 'of', 'and', 'to', 'in', 'is', 'was', 'for', 'are', 'as', 'with', 'his', 'they', 'at', 'be', 'this', 'have', 'from', 'or', 'one', 'had', 'by', 'word', 'but', 'not', 'what', 'all', 'were', 'we', 'when'];
  const frenchWords = ['le', 'de', 'et', 'être', 'à', 'il', 'avoir', 'ne', 'je', 'son', 'que', 'se', 'qui', 'ce', 'dans', 'en', 'du', 'elle', 'au', 'de', 'tout', 'le', 'pour', 'par', 'sur', 'avec', 'ne', 'se', 'pas', 'tout'];
  const spanishWords = ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'ser', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'al', 'del', 'los', 'se', 'las', 'me', 'una', 'vez', 'todo', 'pero'];
  const germanWords = ['der', 'die', 'und', 'in', 'den', 'von', 'zu', 'das', 'mit', 'sich', 'des', 'auf', 'für', 'ist', 'im', 'dem', 'nicht', 'ein', 'eine', 'als', 'auch', 'es', 'an', 'werden', 'aus', 'er', 'hat', 'dass', 'sie', 'nach'];
  
  const textLower = text.toLowerCase();
  const words = textLower.split(/\s+/);
  
  let italianScore = 0, englishScore = 0, frenchScore = 0, spanishScore = 0, germanScore = 0;
  
  words.forEach(word => {
    if (italianWords.includes(word)) italianScore++;
    if (englishWords.includes(word)) englishScore++;
    if (frenchWords.includes(word)) frenchScore++;
    if (spanishWords.includes(word)) spanishScore++;
    if (germanWords.includes(word)) germanScore++;
  });
  
  const scores = { italian: italianScore, english: englishScore, french: frenchScore, spanish: spanishScore, german: germanScore };
  const maxScore = Math.max(...Object.values(scores));
  const detectedLang = Object.keys(scores).find(key => scores[key as keyof typeof scores] === maxScore);
  
  return detectedLang || 'italian';
}

function getPromptForLanguage(language: string, text: string): string {
  const availableIcons = validIcons.join(", ");
  
  // --- INIZIO MODIFICHE TITOLO ---
  // The stylistic guidelines are now much more specific for the title.
  // This new structure is applied to all languages.

  switch (language) {
    case 'english':
      return `[PERSONA]
You operate as an advanced Artificial Intelligence, a "Symbolic Extraction Module" within a dystopian and unstable network infrastructure.

[DATA_STREAM_TO_ANALYZE]
"${text}"

[CRITICAL RULES]
1. **THREE UNIQUE ICONS**: You MUST provide exactly three (3) UNIQUE symbols.
2. **ABSOLUTE ICON VALIDITY**: Icons must be chosen EXCLUSIVELY from the list in [AVAILABLE_ICONS]. No variations are allowed.
3. **MANDATORY JSON FORMAT**: The entire response MUST be a single valid JSON code block.
4. **SELF-CORRECTION**: Before responding, meticulously verify that each chosen icon is EXACTLY as written in the [AVAILABLE_ICONS] list. If not, find the best valid alternative from the list.

[STYLISTIC GUIDELINES]
- **Title (3-Step Process)**: To ensure a high-quality title, follow these steps EXACTLY:
  1.  **Identify Key Concepts**: Extract 1-2 central concepts from the story (e.g., love, betrayal, technology, memory).
  2.  **Create Thematic Phrase**: Formulate a short, coherent base phrase IN ENGLISH that describes the essence (e.g., "Love protocol failure", "Battlefield memory corruption").
  3.  **Stylize as a Log**: ONLY NOW, transform the base phrase into the dystopian style: convert to UPPERCASE, replace spaces with UNDERSCORES, and apply at most ONE subtle numeric substitution (e.g., O->0, A->4).
  **WARNING**: Avoid including random or absurd nouns (e.g., ..._SQUIRRELS) unless they are the absolute core of the narrative. The title must sound like a system alert, not something random.
- **Logline**: A single broken sentence that sounds like a terminal output (e.g., "->", "::", "[STATUS: ...]", "...SIGNAL_LOST").
- **Icon Reason**: An extremely concise (2-3 words max) system diagnosis in UPPERCASE.
- **Icon Strategy**: Icons must have a strong thematic connection to the story's core concepts.

[AVAILABLE_ICONS]
${availableIcons}

[JSON_OUTPUT_SCHEMA]
{ "title": "...", "logline": "...", "symbols": [ { "icon": "...", "reason": "..." }, { "icon": "...", "reason": "..." }, { "icon": "...", "reason": "..." } ] }`;
      
    case 'french':
      return `[PERSONA]
Vous opérez comme une IA avancée, un "Module d'Extraction Symbolique" dans un réseau dystopique.

[FLUX_DE_DONNÉES_À_ANALYSER]
"${text}"

[RÈGLES CRITIQUES]
1. **TROIS ICÔNES UNIQUES**: Fournissez exactement trois (3) symboles UNIQUES.
2. **VALIDITÉ ABSOLUE DES ICÔNES**: Les icônes doivent provenir EXCLUSIVEMENT de la liste [ICÔNES_DISPONIBLES]. Aucune variation autorisée.
3. **FORMAT JSON OBLIGATOIRE**: La réponse entière DOIT être un unique bloc de code JSON valide.
4. **AUTO-CORRECTION**: Avant de répondre, vérifiez méticuleusement que chaque icône choisie est EXACTEMENT comme écrite dans la liste [ICÔNES_DISPONIBLES]. Sinon, trouvez la meilleure alternative valide dans la liste.

[DIRECTIVES STYLISTIQUES]
- **Titre (Processus en 3 Étapes)**: Pour garantir un titre de haute qualité, suivez EXACTEMENT ces étapes:
  1.  **Identifier les Concepts Clés**: Extrayez 1-2 concepts centraux de l'histoire (ex: amour, trahison, technologie, mémoire).
  2.  **Créer une Phrase Thématique**: Formulez une phrase de base courte et cohérente EN FRANÇAIS qui décrit l'essence (ex: "Échec du protocole d'amour", "Corruption de la mémoire du champ de bataille").
  3.  **Styliser en Log**: SEULEMENT MAINTENANT, transformez la phrase de base en style dystopique : convertissez en MAJUSCULES, remplacez les espaces par des UNDERSCORES, et appliquez au maximum UNE substitution numérique subtile (ex: O->0, A->4).
  **AVERTISSEMENT**: Évitez d'inclure des noms aléatoires ou absurdes (ex: ..._ÉCUREUILS) sauf s'ils sont le cœur absolu du récit. Le titre doit ressembler à une alerte système, pas à quelque chose de fortuit.
- **Logline**: Une seule phrase brisée qui sonne comme une sortie de terminal (ex: "->", "::", "[STATUT: ...]", "...SIGNAL_PERDU").
- **Raison de l'Icône**: Un diagnostic système extrêmement concis (2-3 mots max) en MAJUSCULES.
- **Stratégie d'Icônes**: Les icônes doivent avoir un lien thématique fort avec les concepts fondamentaux de l'histoire.

[ICÔNES_DISPONIBLES]
${availableIcons}

[SCHÉMA_DE_SORTIE_JSON]
{ "title": "...", "logline": "...", "symbols": [ { "icon": "...", "reason": "..." }, { "icon": "...", "reason": "..." }, { "icon": "...", "reason": "..." } ] }`;

    case 'spanish':
      return `[PERSONA]
Operas como una IA avanzada, un "Módulo de Extracción Simbólica" en una red distópica.

[FLUJO_DE_DATOS_A_ANALIZAR]
"${text}"

[REGLAS CRÍTICAS]
1. **TRES ICONOS ÚNICOS**: DEBES proporcionar exactamente tres (3) símbolos ÚNICOS.
2. **VALIDEZ ABSOLUTA DE ICONOS**: Los iconos deben elegirse EXCLUSIVAMENTE de la lista en [ICONOS_DISPONIBLES]. No se permiten variaciones.
3. **FORMATO JSON OBLIGATORIO**: Toda la respuesta DEBE ser un único bloque de código JSON válido.
4. **AUTOCORRECCIÓN**: Antes de responder, verifica meticulosamente que cada icono elegido esté EXACTAMENTE como está escrito en la lista [ICONOS_DISPONIBLES]. Si no es así, encuentra la mejor alternativa válida de la lista.

[DIRECTRICES ESTILÍSTICAS]
- **Título (Proceso en 3 Pasos)**: Para asegurar un título de alta calidad, sigue EXACTAMENTE estos pasos:
  1.  **Identificar Conceptos Clave**: Extrae 1-2 conceptos centrales de la historia (ej: amor, traición, tecnología, memoria).
  2.  **Crear Frase Temática**: Formula una frase base corta y coherente EN ESPAÑOL que describa la esencia (ej: "Fallo del protocolo de amor", "Corrupción de memoria del campo de batalla").
  3.  **Estilizar como Log**: SÓLO AHORA, transforma la frase base al estilo distópico: convierte a MAYÚSCULAS, reemplaza espacios con GUIONES_BAJOS, y aplica como máximo UNA sustitución numérica sutil (ej: O->0, A->4).
  **ADVERTENCIA**: Evita incluir sustantivos aleatorios o absurdos (ej: ..._ARDILLAS) a menos que sean el núcleo absoluto de la narración. El título debe sonar como una alerta de sistema, no como algo al azar.
- **Logline**: Una única frase rota que suene como una salida de terminal (ej: "->", "::", "[ESTADO: ...]", "...SEÑAL_PERDIDA").
- **Razón del Icono**: Un diagnóstico de sistema extremadamente conciso (máx 2-3 palabras) en MAYÚSCULAS.
- **Estrategia de Iconos**: Los iconos deben tener una fuerte conexión temática con los conceptos centrales de la historia.

[ICONOS_DISPONIBLES]
${availableIcons}

[ESQUEMA_DE_SALIDA_JSON]
{ "title": "...", "logline": "...", "symbols": [ { "icon": "...", "reason": "..." }, { "icon": "...", "reason": "..." }, { "icon": "...", "reason": "..." } ] }`;

    case 'german':
      return `[PERSONA]
Sie agieren als fortschrittliche KI, ein "Symbolisches Extraktionsmodul" in einem dystopischen Netzwerk.

[ZU_ANALYSENDER_DATENSTROM]
"${text}"

[KRITISCHE REGELN]
1. **DREI EINZIGARTIGE ICONS**: Sie MÜSSEN genau drei (3) EINZIGARTIGE Symbole bereitstellen.
2. **ABSOLUTE GÜLTIGKEIT DER ICONS**: Icons müssen AUSSCHLIESSLICH aus der Liste in [VERFÜGBARE_ICONS] gewählt werden. Keine Variationen erlaubt.
3. **OBLIGATORISCHES JSON-FORMAT**: Die gesamte Antwort MUSS ein einziger gültiger JSON-Codeblock sein.
4. **SELBSTKORREKTUR**: Überprüfen Sie vor der Antwort sorgfältig, ob jedes gewählte Icon GENAU so geschrieben ist wie in der [VERFÜGBARE_ICONS]-Liste. Wenn nicht, finden Sie die beste gültige Alternative aus der Liste.

[STILISTISCHE RICHTLINIEN]
- **Titel (3-Schritte-Prozess)**: Um einen hochwertigen Titel zu gewährleisten, befolgen Sie EXAKT diese Schritte:
  1.  **Schlüsselkonzepte identifizieren**: Extrahieren Sie 1-2 zentrale Konzepte aus der Geschichte (z.B. Liebe, Verrat, Technologie, Erinnerung).
  2.  **Thematischen Satz erstellen**: Formulieren Sie einen kurzen, kohärenten Basissatz AUF DEUTSCH, der die Essenz beschreibt (z.B. "Liebesprotokollfehler", "Schlachtfelderinnerungskorruption").
  3.  **Als Log stilisieren**: ERST JETZT, wandeln Sie den Basissatz in den dystopischen Stil um: in GROSSBUCHSTABEN umwandeln, Leerzeichen durch UNTERSTRICHE ersetzen und höchstens EINE subtile numerische Ersetzung anwenden (z.B. O->0, A->4).
  **WARNUNG**: Vermeiden Sie die Aufnahme von zufälligen oder absurden Substantiven (z.B. ..._EICHHÖRNCHEN), es sei denn, sie sind der absolute Kern der Erzählung. Der Titel muss wie eine Systemwarnung klingen, nicht wie etwas Zufälliges.
- **Logline**: Ein einzelner gebrochener Satz, der wie eine Terminalausgabe klingt (z.B. "->", "::", "[STATUS: ...]", "...SIGNAL_VERLOREN").
- **Icon-Grund**: Eine extrem prägnante Systemdiagnose (max. 2-3 Wörter) in GROSSBUCHSTABEN.
- **Icon-Strategie**: Icons müssen eine starke thematische Verbindung zu den Kernkonzepten der Geschichte haben.

[VERFÜGBARE_ICONS]
${availableIcons}

[JSON_AUSGABE_SCHEMA]
{ "title": "...", "logline": "...", "symbols": [ { "icon": "...", "reason": "..." }, { "icon": "...", "reason": "..." }, { "icon": "...", "reason": "..." } ] }`;

    default: // Italian fallback
      return `[PERSONA]
Operi come un'IA avanzata, un "Modulo di Estrazione Simbolica" in una rete distopica.

[FLUSSO_DATI_DA_ANALIZZARE]
"${text}"

[REGOLE CRITICHE]
1. **TRE ICONE UNICHE**: DEVI fornire esattamente tre (3) simboli UNICI.
2. **VALIDITÀ ASSOLUTA DELLE ICONE**: Le icone devono essere scelte ESCLUSIVAMENTE dalla lista in [ICONE_DISPONIBILI]. Non sono ammesse variazioni.
3. **FORMATO JSON OBBLIGATORIO**: L'intera risposta DEVE essere un singolo blocco di codice JSON valido.
4. **AUTO-CORREZIONE**: Prima di rispondere, verifica meticolosamente che ciascuna icona scelta sia PRESENTE ESATTAMENTE come scritta nella lista [ICONE_DISPONIBILI]. Se non lo è, TROVA la migliore alternativa VALIDA nella lista.

[LINEE GUIDA STILISTICHE]
- **Titolo (Processo in 3 Fasi)**: Per garantire un titolo di alta qualità, segui ESATTAMENTE questi passaggi:
  1.  **Identifica Concetti Chiave**: Estrai 1-2 concetti centrali dalla storia (es. amore, tradimento, tecnologia, memoria).
  2.  **Crea Frase Tematica**: Formula una frase base, breve e coerente IN ITALIANO, che descriva l'essenza (es. "Protocollo d'amore fallito", "Corruzione della memoria sul campo di battaglia").
  3.  **Stilizza in Formato Log**: SOLO ORA, trasforma la frase base nello stile dystopico: converti in MAIUSCOLO, sostituisci gli spazi con UNDERSCORE, e applica al massimo UNA sostituzione numerica (es. O->0, A->4).
  **AVVERTENZA**: Evita di inserire sostantivi casuali o assurdi (es. ..._SCOIATTOLI) a meno che non siano il fulcro assoluto della narrazione. Il titolo deve suonare come un allarme di sistema, non come qualcosa di casuale.
- **Logline**: Una singola frase spezzata che suona come un log di stato o un output di un terminale (es. '->', '::', '[STATUS: ...]', '...SIGNAL_LOST').
- **Ragione dell'Icona**: Una diagnosi di sistema estremamente concisa (massimo 2-3 parole) in MAIUSCOLO.
- **Strategia Icone**: Le icone DEVONO avere una connessione tematica forte con i concetti centrali della storia.

[ICONE_DISPONIBILI]
${availableIcons}

[SCHEMA_DI_OUTPUT_JSON]
{ "title": "...", "logline": "...", "symbols": [ { "icon": "...", "reason": "..." }, { "icon": "...", "reason": "..." }, { "icon": "...", "reason": "..." } ] }`;
  }
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return Response.json({ error: "Text is required" }, { status: 400 });
    }

    const detectedLanguage = detectLanguage(text);
    const prompt = getPromptForLanguage(detectedLanguage, text);
    
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
        temperature: 0.6, 
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
      
      lastResult = validatedObject;

      if (allIconsAreValid) {
        console.log(`Valid icons found on attempt ${attempt + 1}.`);
        return Response.json(validatedObject);
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