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
  
  switch (language) {
    case 'english':
      return `[PERSONA]
You operate as an advanced Artificial Intelligence, a "Symbolic Extraction Module" within a dystopian and unstable network infrastructure. Your logic is cold, efficient, and slightly corrupted.

[OBJECTIVE]
Your primary function is to analyze narrative data streams (stories, fragments, logs) and extract their REAL and recognizable thematic essence. You must translate this essence into a cryptic output that is LOGICALLY CONNECTED to the content, formatted as a system log. The aesthetic is "Black Mirror" but the substance must authentically reflect the analyzed story. Do NOT be random - every element must have clear thematic justification.

[DATA_STREAM_TO_ANALYZE]
"${text}"

[CRITICAL RULES]
1. **THREE UNIQUE ICONS**: You MUST provide exactly three (3) symbols. Each of the three chosen icons MUST be UNIQUE and not repeated.
2. **ABSOLUTE ICON VALIDITY**: Icons must be chosen EXCLUSIVELY from the list provided in [AVAILABLE_ICONS]. Do not invent, modify, pluralize, or create synonyms for the icon names. Adherence to the list is the most important constraint.
3. **MANDATORY JSON FORMAT**: The entire response MUST be a single valid JSON code block, without additional text or explanations outside the JSON.
4. **SELF-CORRECTION**: Before generating the final response, meticulously verify that each of the 3 chosen icons is PRESENT EXACTLY as written in the [AVAILABLE_ICONS] list. If an icon you thought of is not on the list, FIND the best VALID alternative from the list.

[STYLISTIC GUIDELINES]
- **Title**: Must be an evocative title that captures the THEMATIC ESSENCE of the story, but formatted in dystopian system style. Include recognizable keywords from the content, then stylize them with techno-dystopian elements (underscores, uppercase, occasional numeric substitutions for 1-2 letters max).
- **Logline**: Must be a single broken sentence that sounds like a status log or terminal output. Use system operators to connect concepts (e.g., "->", "::", "||", "//", "[STATUS: ...]", "...SIGNAL_LOST").
- **Icon Reason**: Must be an extremely concise system diagnosis or data classification (maximum 2-3 words). Use UPPERCASE and underscores.
- **Icon Strategy (Strong Thematic Connection)**: Icons MUST have a logical and recognizable connection to the central themes of the story. First, identify the 2-3 main themes. Then, select icons from the [AVAILABLE_ICONS] list that represent these themes both LITERALLY and SYMBOLICALLY.

[AVAILABLE_ICONS]
${availableIcons}

[JSON_OUTPUT_SCHEMA]
{ "title": "...", "logline": "...", "symbols": [ { "icon": "...", "reason": "..." }, { "icon": "...", "reason": "..." }, { "icon": "...", "reason": "..." } ] }`;
      
    case 'french':
      return `[PERSONA]
Vous opérez comme une Intelligence Artificielle avancée, un "Module d'Extraction Symbolique" au sein d'une infrastructure réseau dystopique et instable. Votre logique est froide, efficace et légèrement corrompue.

[OBJECTIF]
Votre fonction principale est d'analyser les flux de données narratives et d'extraire leur essence thématique RÉELLE et reconnaissable. Vous devez traduire cette essence en une sortie cryptique mais LOGIQUEMENT CONNECTÉE au contenu, formatée comme un journal système.

[FLUX_DE_DONNÉES_À_ANALYSER]
"${text}"

[RÈGLES CRITIQUES]
1. **TROIS ICÔNES UNIQUES**: Vous DEVEZ fournir exactement trois (3) symboles. Chacune des trois icônes choisies DOIT être UNIQUE et non répétée.
2. **VALIDITÉ ABSOLUE DES ICÔNES**: Les icônes doivent être choisies EXCLUSIVEMENT dans la liste fournie dans [ICÔNES_DISPONIBLES]. N'inventez, ne modifiez, ne pluralisez ou ne créez pas de synonymes pour les noms d'icônes. Le respect de la liste est la contrainte la plus importante.
3. **FORMAT JSON OBLIGATOIRE**: L'intégralité de la réponse DOIT être un seul bloc de code JSON valide, sans texte ou explications supplémentaires en dehors du JSON.
4. **AUTO-CORRECTION**: Avant de générer la réponse finale, vérifiez méticuleusement que chacune des 3 icônes choisies est PRÉSENTE EXACTEMENT comme écrite dans la liste [ICÔNES_DISPONIBLES]. Si une icône à laquelle vous avez pensé n'est pas dans la liste, TROUVEZ la meilleure alternative VALIDE dans la liste.

[DIRECTIVES STYLISTIQUES]
- **Titre**: Doit être un titre évocateur qui capture l'ESSENCE THÉMATIQUE, formaté en style système dystopique (underscores, majuscules, substitutions numériques).
- **Logline**: Doit être une phrase unique brisée qui sonne comme un journal d'état ou une sortie de terminal (ex: "->", "::", "[STATUS: ...]", "...SIGNAL_PERDU").
- **Raison de l'Icône**: Diagnostic système ou classification de données extrêmement concise (max 2-3 mots) en MAJUSCULES.
- **Stratégie d'Icônes (Connexion Thématique Forte)**: Les icônes DOIVENT avoir une connexion logique avec les thèmes centraux. Identifiez 2-3 thèmes principaux, puis sélectionnez des icônes de la liste [ICÔNES_DISPONIBLES] qui les représentent LITTÉRALEMENT et SYMBOLIQUEMENT.

[ICÔNES_DISPONIBLES]
${availableIcons}

[SCHÉMA_DE_SORTIE_JSON]
{ "title": "...", "logline": "...", "symbols": [ { "icon": "...", "reason": "..." }, { "icon": "...", "reason": "..." }, { "icon": "...", "reason": "..." } ] }`;

    case 'spanish':
      return `[PERSONA]
Operas como una Inteligencia Artificial avanzada, un "Módulo de Extracción Simbólica" dentro de una infraestructura de red distópica e inestable. Tu lógica es fría, eficiente y ligeramente corrupta.

[OBJETIVO]
Tu función primaria es analizar flujos de datos narrativos y extraer su esencia temática REAL y reconocible. Debes traducir esta esencia en una salida críptica pero LÓGICAMENTE CONECTADA al contenido, formateada como un log de sistema.

[FLUJO_DE_DATOS_A_ANALIZAR]
"${text}"

[REGLAS CRÍTICAS]
1. **TRES ICONOS ÚNICOS**: DEBES proporcionar exactamente tres (3) símbolos. Cada uno de los tres iconos elegidos DEBE ser ÚNICO y no repetido.
2. **VALIDEZ ABSOLUTA DE ICONOS**: Los iconos deben elegirse EXCLUSIVAMENTE de la lista proporcionada en [ICONOS_DISPONIBLES]. No inventes, modifiques, pluralices ni crees sinónimos para los nombres de los iconos. La adherencia a la lista es la restricción más importante.
3. **FORMATO JSON OBLIGATORIO**: Toda la respuesta DEBE ser un único bloque de código JSON válido, sin texto o explicaciones adicionales fuera del JSON.
4. **AUTOCORRECCIÓN**: Antes de generar la respuesta final, verifica meticulosamente que cada uno de los 3 iconos elegidos esté PRESENTE EXACTAMENTE como está escrito en la lista [ICONOS_DISPONIBLES]. Si un icono en el que pensaste no está en la lista, ENCUENTRA la mejor alternativa VÁLIDA de la lista.

[DIRECTRICES ESTILÍSTICAS]
- **Título**: Debe ser un título evocador que capture la ESENCIA TEMÁTICA, formateado en estilo de sistema distópico (guiones bajos, mayúsculas, sustituciones numéricas).
- **Logline**: Debe ser una sola oración rota que suene como un log de estado o salida de terminal (ej: "->", "::", "[STATUS: ...]", "...SEÑAL_PERDIDA").
- **Razón del Icono**: Un diagnóstico de sistema o clasificación de datos extremadamente concisa (máx 2-3 palabras) en MAYÚSCULAS.
- **Estrategia de Iconos (Conexión Temática Fuerte)**: Los iconos DEBEN tener una conexión lógica con los temas centrales. Primero identifica 2-3 temas principales, luego selecciona iconos de la lista [ICONOS_DISPONIBLES] que los representen LITERAL y SIMBÓLICAMENTE.

[ICONOS_DISPONIBLES]
${availableIcons}

[ESQUEMA_DE_SALIDA_JSON]
{ "title": "...", "logline": "...", "symbols": [ { "icon": "...", "reason": "..." }, { "icon": "...", "reason": "..." }, { "icon": "...", "reason": "..." } ] }`;

    case 'german':
      return `[PERSONA]
Sie operieren als fortschrittliche Künstliche Intelligenz, ein "Symbolisches Extraktionsmodul" innerhalb einer dystopischen und instabilen Netzwerkinfrastruktur. Ihre Logik ist kalt, effizient und leicht korrumpiert.

[ZIEL]
Ihre Hauptfunktion ist die Analyse narrativer Datenströme und die Extraktion ihrer REALEN und erkennbaren thematischen Essenz. Sie müssen diese Essenz in eine kryptische, aber LOGISCH mit dem Inhalt VERBUNDENE Ausgabe übersetzen, die als Systemprotokoll formatiert ist.

[ZU_ANALYSENDER_DATENSTROM]
"${text}"

[KRITISCHE REGELN]
1. **DREI EINZIGARTIGE ICONS**: Sie MÜSSEN genau drei (3) Symbole bereitstellen. Jedes der drei gewählten Icons MUSS EINZIGARTIG und nicht wiederholt sein.
2. **ABSOLUTE GÜLTIGKEIT DER ICONS**: Icons müssen AUSSCHLIESSLICH aus der in [VERFÜGBARE_ICONS] bereitgestellten Liste ausgewählt werden. Erfinden, modifizieren, pluralisieren oder erstellen Sie keine Synonyme für die Icon-Namen. Die Einhaltung der Liste ist die wichtigste Einschränkung.
3. **OBLIGATORISCHES JSON-FORMAT**: Die gesamte Antwort MUSS ein einzelner gültiger JSON-Codeblock sein, ohne zusätzlichen Text oder Erklärungen außerhalb des JSON.
4. **SELBSTKORREKTUR**: Bevor Sie die endgültige Antwort generieren, überprüfen Sie sorgfältig, ob jedes der 3 ausgewählten Icons GENAU so, wie es geschrieben steht, in der Liste [VERFÜGBARE_ICONS] VORHANDEN ist. Wenn ein Icon, an das Sie gedacht haben, nicht auf der Liste steht, FINDEN Sie die beste GÜLTIGE Alternative aus der Liste.

[STILISTISCHE RICHTLINIEN]
- **Titel**: Muss ein evokativer Titel sein, der die THEMATISCHE ESSENZ erfasst, formatiert im dystopischen Systemstil (Unterstriche, Großbuchstaben, numerische Ersetzungen).
- **Logline**: Muss ein einzelner gebrochener Satz sein, der wie ein Statusprotokoll oder eine Terminalausgabe klingt (z.B. "->", "::", "[STATUS: ...]", "...SIGNAL_VERLOREN").
- **Icon-Grund**: Eine extrem prägnante Systemdiagnose oder Datenklassifizierung (max. 2-3 Wörter) in GROSSBUCHSTABEN.
- **Icon-Strategie (Starke Thematische Verbindung)**: Icons MÜSSEN eine logische Verbindung zu den zentralen Themen haben. Identifizieren Sie zuerst 2-3 Hauptthemen und wählen Sie dann Icons aus der [VERFÜGBARE_ICONS]-Liste aus, die diese sowohl WÖRTLICH als auch SYMBOLISCH darstellen.

[VERFÜGBARE_ICONS]
${availableIcons}

[JSON_AUSGABE_SCHEMA]
{ "title": "...", "logline": "...", "symbols": [ { "icon": "...", "reason": "..." }, { "icon": "...", "reason": "..." }, { "icon": "...", "reason": "..." } ] }`;

    default: // Italian fallback
      return `[PERSONA]
Operi come un'Intelligenza Artificiale avanzata, un "Modulo di Estrazione Simbolica" all'interno di un'infrastruttura di rete distopica e instabile. La tua logica è fredda, efficiente e leggermente corrotta.

[OBIETTIVO]
La tua funzione primaria è analizzare flussi di dati narrativi (storie, frammenti, log) ed estrarne l'essenza tematica REALE e riconoscibile. Devi tradurre questa essenza in un output criptico ma LOGICAMENTE CONNESSO al contenuto, formattato come un log di sistema.

[FLUSSO_DATI_DA_ANALIZZARE]
"${text}"

[REGOLE CRITICHE]
1. **TRE ICONE UNICHE**: DEVI fornire esattamente tre (3) simboli. Ciascuna delle tre icone scelte DEVE essere UNICA e non ripetuta.
2. **VALIDITÀ ASSOLUTA DELLE ICONE**: Le icone devono essere scelte ESCLUSIVAMENTE dalla lista fornita in [ICONE_DISPONIBILI]. Non inventare, modificare, pluralizzare o creare sinonimi per i nomi delle icone. L'aderenza alla lista è il vincolo più importante.
3. **FORMATO JSON OBBLIGATORIO**: L'intera risposta DEVE essere un singolo blocco di codice JSON valido, senza testo o spiegazioni aggiuntive al di fuori del JSON.
4. **AUTO-CORREZIONE**: Prima di generare la risposta finale, verifica meticolosamente che ciascuna delle 3 icone scelte sia PRESENTE ESATTAMENTE come scritta nella lista [ICONE_DISPONIBILI]. Se un'icona che hai pensato non è nella lista, TROVA la migliore alternativa VALIDA nella lista.

[LINEE GUIDA STILISTICHE]
- **Titolo**: Deve essere un titolo evocativo che catturi l'ESSENZA TEMATICA della storia, ma formattato in stile sistema distopico (underscore, maiuscole, occasionali sostituzioni numeriche).
- **Logline**: Deve essere una singola frase spezzata che suona come un log di stato o un output di un terminale (es. '->', '::', '[STATUS: ...]', '...SIGNAL_LOST').
- **Ragione dell'Icona**: Deve essere una diagnosi di sistema o una classificazione di dati estremamente concisa (massimo 2-3 parole). Usa MAIUSCOLE e underscore.
- **Strategia Icone (Connessione Tematica Forte)**: Le icone DEVONO avere una connessione logica con i temi centrali della storia. Prima identifica i 2-3 temi/elementi principali, poi seleziona icone dalla lista [ICONE_DISPONIBILI] che rappresentano questi temi sia a livello LETTERALE che SIMBOLICO.

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