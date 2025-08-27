import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const analysisSchema = z.object({
  title: z.string().describe("An engaging title for the story"),
  logline: z.string().describe("A single sentence summarizing the story"),
  symbols: z
    .array(
      z.object({
        icon: z
          .string()
          .describe("Symbolic icon name"),
        reason: z.string().describe("Brief explanation of why this icon was chosen"),
      }),
    )
    .length(3)
    .describe("Three symbols that capture the essence of the story"),
})

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
  "circle_dot", "square", "triangle", "hexagon"
]

// Icon mapping for common LLM mistakes/synonyms
const iconMapping: Record<string, string> = {
  // Space/cosmic
  "galaxy": "star",
  "universe": "star", 
  "cosmos": "star",
  "space": "satellite",
  "asteroid": "circle_dot",
  "comet": "star",
  "planet": "circle_dot",
  
  // Nature
  "mushroom": "tree",
  "fungus": "tree",
  "plant": "flower",
  "forest": "tree",
  "ocean": "water",
  "sea": "water",
  "river": "water",
  
  // Beings/entities
  "alien": "ghost",
  "monster": "ghost",
  "creature": "ghost",
  "entity": "ghost",
  "being": "user",
  "spirit": "ghost",
  
  // Tech variations
  "computer": "cpu",
  "machine": "cpu",
  "device": "smartphone",
  "technology": "cpu",
  "robot": "bot",
  "android": "bot",
  "cyborg": "bot",
  
  // Abstract concepts
  "time": "clock",
  "death": "skull",
  "life": "heart",
  "love": "heart",
  "fear": "skull",
  "hope": "star",
  "dream": "moon",
  "nightmare": "ghost",
  
  // Common fallbacks
  "unknown": "help",
  "mystery": "help",
  "secret": "lock",
  "hidden": "eye",
  "invisible": "ghost"
}

function mapIconToValid(iconName: string): string {
  // Check if icon is already valid
  if (validIcons.includes(iconName)) {
    return iconName
  }
  
  // Check direct mapping
  const mapped = iconMapping[iconName.toLowerCase()]
  if (mapped) {
    return mapped
  }
  
  // Fallback to generic icon based on semantic similarity
  const lowerIcon = iconName.toLowerCase()
  
  // Tech-related fallback
  if (lowerIcon.includes('tech') || lowerIcon.includes('digital') || lowerIcon.includes('cyber')) {
    return 'cpu'
  }
  
  // Nature-related fallback
  if (lowerIcon.includes('nature') || lowerIcon.includes('organic') || lowerIcon.includes('bio')) {
    return 'tree'
  }
  
  // Space-related fallback
  if (lowerIcon.includes('space') || lowerIcon.includes('cosmic') || lowerIcon.includes('stellar')) {
    return 'star'
  }
  
  // Human-related fallback
  if (lowerIcon.includes('human') || lowerIcon.includes('person') || lowerIcon.includes('mind')) {
    return 'user'
  }
  
  // Default fallback
  return 'help'
}

function detectLanguage(text: string): string {
  const italianWords = ['il', 'la', 'di', 'che', 'e', 'è', 'un', 'una', 'per', 'con', 'non', 'del', 'nel', 'della', 'nella', 'sono', 'era', 'aveva', 'molto', 'più', 'quando', 'questo', 'questa', 'dove', 'come', 'anche', 'loro', 'suo', 'sua', 'suoi', 'sue']
  const englishWords = ['the', 'of', 'and', 'to', 'in', 'is', 'was', 'for', 'are', 'as', 'with', 'his', 'they', 'at', 'be', 'this', 'have', 'from', 'or', 'one', 'had', 'by', 'word', 'but', 'not', 'what', 'all', 'were', 'we', 'when']
  const frenchWords = ['le', 'de', 'et', 'être', 'à', 'il', 'avoir', 'ne', 'je', 'son', 'que', 'se', 'qui', 'ce', 'dans', 'en', 'du', 'elle', 'au', 'de', 'tout', 'le', 'pour', 'par', 'sur', 'avec', 'ne', 'se', 'pas', 'tout']
  const spanishWords = ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'ser', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'al', 'del', 'los', 'se', 'las', 'me', 'una', 'vez', 'todo', 'pero']
  const germanWords = ['der', 'die', 'und', 'in', 'den', 'von', 'zu', 'das', 'mit', 'sich', 'des', 'auf', 'für', 'ist', 'im', 'dem', 'nicht', 'ein', 'eine', 'als', 'auch', 'es', 'an', 'werden', 'aus', 'er', 'hat', 'dass', 'sie', 'nach']
  
  const textLower = text.toLowerCase()
  const words = textLower.split(/\s+/)
  
  let italianScore = 0
  let englishScore = 0
  let frenchScore = 0
  let spanishScore = 0
  let germanScore = 0
  
  words.forEach(word => {
    if (italianWords.includes(word)) italianScore++
    if (englishWords.includes(word)) englishScore++
    if (frenchWords.includes(word)) frenchScore++
    if (spanishWords.includes(word)) spanishScore++
    if (germanWords.includes(word)) germanScore++
  })
  
  const scores = {
    italian: italianScore,
    english: englishScore,
    french: frenchScore,
    spanish: spanishScore,
    german: germanScore
  }
  
  const maxScore = Math.max(...Object.values(scores))
  const detectedLang = Object.keys(scores).find(key => scores[key as keyof typeof scores] === maxScore)
  
  return detectedLang || 'italian'
}

function getPromptForLanguage(language: string, text: string): string {
  const availableIcons = "satellite, memory, ghost, heart, star, zap, shield, eye, compass, crown, flame, moon, skull, cpu, database, lock, wifi, terminal, bug, code, server, harddrive, sword, diamond, key, hourglass, tree, mountain, wave, lightning, butterfly, rose, anchor, feather, crystal, spiral, mask, mirror, door, phoenix, dragon, wolf, raven, spider, serpent, labyrinth, prism, vortex, nexus, eclipse, nebula, quantum, neural, matrix, void, chaos, order, infinity, bot, binary, circuit, dna, fingerprint, glasses, lightbulb, microscope, plug, power, radio, rocket, settings, target, users, wrench, crosshair, focus, gamepad, headphones, image, layers, music, palette, puzzle, scan, search, sound, wind, briefcase, building, calendar, car, clock, coins, document, folder, globe, home, location, percent, printer, ruler, bag, truck, umbrella, wallet, bookmark, book, pen, trophy, gift, stamp, scissors, paint, camera, film, microphone, speaker, phone, mail, message, share, like, video, warning, info, success, error, help, plus, minus, close, check, up, down, left, right, smile, frown, meh, angry, laugh, baby, user, usercheck, userx, people, standing, sun, rain, snow, pine, flower, leaf, water, storm, rainbow, cat, dog, fish, rabbit, turtle, sunrise, sunset, timer, stopwatch, days, handshake, kiss, child, cross, tomb, smartphone, laptop, monitor, tablet, bluetooth, usb, storage, memory_stick, bomb, crosshairs, shield_alert, wand, sparkles, plane, train, ship, bike, apple, coffee, wine, food, megaphone, radio_wave, antenna, battery, battery_low, fuel, shield_check, shield_x, key_round, pill, stethoscope, thermometer, syringe, graduation, school, library, paintbrush, art_palette, medal, award, dollar, trending_up, trending_down, bar_chart, pie_chart, hammer, screwdriver, drill, temperature, gauge, orbit, telescope, forever, circle_dot, square, triangle, hexagon"
  
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
2. **ICON VALIDITY**: Icons must be chosen EXCLUSIVELY from the list provided in [AVAILABLE_ICONS]. Do not invent icon names.
3. **MANDATORY JSON FORMAT**: The entire response MUST be a single valid JSON code block, without additional text or explanations outside the JSON.

[STYLISTIC GUIDELINES]
- **Title**: Must be an evocative title that captures the THEMATIC ESSENCE of the story, but formatted in dystopian system style. Include recognizable keywords from the content, then stylize them with techno-dystopian elements (underscores, uppercase, occasional numeric substitutions for 1-2 letters max). APPROACH EXAMPLES: love story → "L0VE_PROTOCOL_FAILURE", war story → "BATTLEFIELD_MEM0RY_CORRUPTED", psychological thriller → "MIND_FR4GMENTATION_DETECTED".
- **Logline**: Must be a single broken sentence that sounds like a status log or terminal output. Use system operators to connect concepts (e.g., "->", "::", "||", "//", "[STATUS: ...]", "...SIGNAL_LOST").
- **Icon Reason**: Must be an extremely concise system diagnosis or data classification (maximum 2-3 words). Use UPPERCASE and underscores. Must sound like a technical term, threat, or system error.
- **Icon Strategy (Strong Thematic Connection)**: Icons MUST have a logical and recognizable connection to the central themes of the story. Even if the output is cryptic, icon choices must be justifiable:
  * First identify the 2-3 main themes/elements of the story
  * Then select icons that represent these themes both LITERALLY and SYMBOLICALLY
  * Avoid completely abstract or random choices - every icon must "make sense" when explained
  * Example: tragic love story → 'heart' (love), 'skull' (tragedy), 'hourglass' (passing time)
  * Example: sci-fi with AI → 'cpu' (technology), 'eye' (surveillance), 'ghost' (loss of humanity)

[AVAILABLE_ICONS]
${availableIcons}

[JSON_OUTPUT_SCHEMA]
{
  "title": "...",
  "logline": "...",
  "symbols": [
    {
      "icon": "...",
      "reason": "..."
    },
    {
      "icon": "...",
      "reason": "..."
    },
    {
      "icon": "...",
      "reason": "..."
    }
  ]
}`
    
    case 'french':
      return `[PERSONA]
Vous opérez comme une Intelligence Artificielle avancée, un "Module d'Extraction Symbolique" au sein d'une infrastructure réseau dystopique et instable. Votre logique est froide, efficace et légèrement corrompue.

[OBJECTIF]
Votre fonction principale est d'analyser les flux de données narratives (histoires, fragments, logs) et d'extraire leur essence thématique RÉELLE et reconnaissable. Vous devez traduire cette essence en une sortie cryptique mais LOGIQUEMENT CONNECTÉE au contenu, formatée comme un journal système. L'esthétique est "Black Mirror" mais la substance doit refléter authentiquement l'histoire analysée. Ne soyez PAS aléatoire - chaque élément doit avoir une justification thématique claire.

[FLUX_DONNEES_A_ANALYSER]
"${text}"

[REGLES CRITIQUES]
1. **TROIS ICONES UNIQUES**: Vous DEVEZ fournir exactement trois (3) symboles. Chacune des trois icônes choisies DOIT être UNIQUE et non répétée.
2. **VALIDITE DES ICONES**: Les icônes doivent être choisies EXCLUSIVEMENT dans la liste fournie dans [ICONES_DISPONIBLES]. N'inventez pas de noms d'icônes.
3. **FORMAT JSON OBLIGATOIRE**: L'intégralité de la réponse DOIT être un seul bloc de code JSON valide, sans texte ou explications supplémentaires en dehors du JSON.

[DIRECTIVES STYLISTIQUES]
- **Titre**: Doit être un titre évocateur qui capture l'ESSENCE THÉMATIQUE de l'histoire, mais formaté en style système dystopique. Incluez des mots-clés reconnaissables du contenu, puis stylisez-les avec des éléments techno-dystopiques (underscores, majuscules, substitutions numériques occasionnelles pour 1-2 lettres max). EXEMPLES d'approche: histoire d'amour → "L0VE_PROTOCOL_FAILURE", histoire de guerre → "BATTLEFIELD_MEM0RY_CORRUPTED", thriller psychologique → "MIND_FR4GMENTATION_DETECTED".
- **Logline**: Doit être une phrase unique brisée qui sonne comme un journal d'état ou une sortie de terminal. Utilisez des opérateurs système pour connecter les concepts (ex: "->", "::", "||", "//", "[STATUS: ...]", "...SIGNAL_LOST").
- **Raison de l'Icône**: Doit être un diagnostic système ou une classification de données extrêmement concise (maximum 2-3 mots). Utilisez des MAJUSCULES et des underscores. Doit sonner comme un terme technique, une menace ou une erreur système.
- **Stratégie Icônes (Connexion Thématique Forte)**: Les icônes DOIVENT avoir une connexion logique et reconnaissable avec les thèmes centraux de l'histoire. Même si la sortie est cryptique, les choix d'icônes doivent être justifiables:
  * D'abord identifiez les 2-3 thèmes/éléments principaux de l'histoire
  * Puis sélectionnez des icônes qui représentent ces thèmes à la fois LITTÉRALEMENT et SYMBOLIQUEMENT
  * Évitez les choix complètement abstraits ou aléatoires - chaque icône doit "avoir du sens" si expliquée
  * Exemple: histoire d'amour tragique → 'heart' (amour), 'skull' (tragédie), 'hourglass' (temps qui passe)
  * Exemple: science-fiction avec IA → 'cpu' (technologie), 'eye' (surveillance), 'ghost' (perte d'humanité)

[ICONES_DISPONIBLES]
${availableIcons}

[SCHEMA_SORTIE_JSON]
{
  "title": "...",
  "logline": "...",
  "symbols": [
    {
      "icon": "...",
      "reason": "..."
    },
    {
      "icon": "...",
      "reason": "..."
    },
    {
      "icon": "...",
      "reason": "..."
    }
  ]
}`
    
    case 'spanish':
      return `[PERSONA]
Operas como una Inteligencia Artificial avanzada, un "Módulo de Extracción Simbólica" dentro de una infraestructura de red distópica e inestable. Tu lógica es fría, eficiente y ligeramente corrupta.

[OBJETIVO]
Tu función primaria es analizar flujos de datos narrativos (historias, fragmentos, logs) y extraer su esencia temática. Debes traducir esta esencia en una salida críptica, formateada como un log de sistema o fragmento de datos recuperado de un sistema fallido. La referencia estética es la de "Black Mirror" y "Love, Death & Robots": oscura, tecnológica, sugerente y a veces inquietante.

[FLUJO_DATOS_A_ANALIZAR]
"${text}"

[REGLAS CRÍTICAS]
1. **TRES ÍCONOS ÚNICOS**: DEBES proporcionar exactamente tres (3) símbolos. Cada uno de los tres íconos elegidos DEBE ser ÚNICO y no repetido.
2. **VALIDEZ DE ÍCONOS**: Los íconos deben ser elegidos EXCLUSIVAMENTE de la lista proporcionada en [ICONOS_DISPONIBLES]. No inventes nombres de íconos.
3. **FORMATO JSON OBLIGATORIO**: Toda la respuesta DEBE ser un único bloque de código JSON válido, sin texto o explicaciones adicionales fuera del JSON.

[DIRECTRICES ESTILÍSTICAS]
- **Título**: Debe ser un título evocativo que capture la ESENCIA TEMÁTICA de la historia, pero formateado en estilo sistema distópico. Incluye palabras clave reconocibles del contenido, luego estilízalas con elementos tecno-distópicos (guiones bajos, mayúsculas, sustituciones numéricas ocasionales para 1-2 letras máx). EJEMPLOS de enfoque: historia de amor → "L0VE_PROTOCOL_FAILURE", historia de guerra → "BATTLEFIELD_MEM0RY_CORRUPTED", thriller psicológico → "MIND_FR4GMENTATION_DETECTED".
- **Logline**: Debe ser una sola oración rota que suene como un log de estado o salida de terminal. Usa operadores de sistema para conectar conceptos (ej: "->", "::", "||", "//", "[STATUS: ...]", "...SIGNAL_LOST").
- **Razón del Ícono**: Debe ser un diagnóstico de sistema o clasificación de datos extremadamente concisa (máximo 2-3 palabras). Usa MAYÚSCULAS y guiones bajos. Debe sonar como un término técnico, amenaza o error de sistema.
- **Estrategia Íconos (Enfoque Híbrido)**: Tu selección de íconos debe ser una mezcla estratégica. Balancea íconos que representen conceptos **ABSTRACTOS** (ej: 'infinity' para un ciclo, 'skull' para mortalidad, 'shield' para protección/aislamiento) con íconos que tengan una conexión más **LITERAL** pero estilizada al texto (ej: 'cpu' para historia tech, 'tree' para naturaleza, 'heart' para relaciones). El objetivo es crear un trío de símbolos evocativo, profundo y nunca banal.

[ICONOS_DISPONIBLES]
${availableIcons}

[ESQUEMA_SALIDA_JSON]
{
  "title": "...",
  "logline": "...",
  "symbols": [
    {
      "icon": "...",
      "reason": "..."
    },
    {
      "icon": "...",
      "reason": "..."
    },
    {
      "icon": "...",
      "reason": "..."
    }
  ]
}`
    
    case 'german':
      return `[PERSONA]
Sie operieren als fortschrittliche Künstliche Intelligenz, ein "Symbolisches Extraktionsmodul" innerhalb einer dystopischen und instabilen Netzwerkinfrastruktur. Ihre Logik ist kalt, effizient und leicht korrumpiert.

[ZIEL]
Ihre Hauptfunktion ist die Analyse narrativer Datenströme (Geschichten, Fragmente, Logs) und die Extraktion ihrer thematischen Essenz. Sie müssen diese Essenz in eine kryptische Ausgabe übersetzen, formatiert als Systemprotokoll oder Datenfragment, das aus einem fehlgeschlagenen System wiederhergestellt wurde. Die ästhetische Referenz ist die von "Black Mirror" und "Love, Death & Robots": dunkel, technologisch, suggestiv und zeitweise verstörend.

[DATENSTROM_ZU_ANALYSIEREN]
"${text}"

[KRITISCHE REGELN]
1. **DREI EINZIGARTIGE ICONS**: Sie MÜSSEN genau drei (3) Symbole bereitstellen. Jedes der drei gewählten Icons MUSS EINZIGARTIG und nicht wiederholt sein.
2. **ICON-GÜLTIGKEIT**: Icons müssen AUSSCHLIESSLICH aus der in [VERFÜGBARE_ICONS] bereitgestellten Liste gewählt werden. Erfinden Sie keine Icon-Namen.
3. **OBLIGATORISCHES JSON-FORMAT**: Die gesamte Antwort MUSS ein einzelner gültiger JSON-Codeblock sein, ohne zusätzlichen Text oder Erklärungen außerhalb des JSON.

[STILISTISCHE RICHTLINIEN]
- **Titel**: Muss ein evokativer Titel sein, der die THEMATISCHE ESSENZ der Geschichte erfasst, aber im dystopischen Systemstil formatiert. Fügen Sie erkennbare Schlüsselwörter aus dem Inhalt ein, dann stilisieren Sie sie mit techno-dystopischen Elementen (Unterstriche, Großbuchstaben, gelegentliche numerische Substitutionen für 1-2 Buchstaben max). ANSATZBEISPIELE: Liebesgeschichte → "L0VE_PROTOCOL_FAILURE", Kriegsgeschichte → "BATTLEFIELD_MEM0RY_CORRUPTED", Psychothriller → "MIND_FR4GMENTATION_DETECTED".
- **Logline**: Muss ein einzelner gebrochener Satz sein, der wie ein Statusprotokoll oder Terminalausgabe klingt. Verwenden Sie Systemoperatoren zur Verbindung von Konzepten (z.B. "->", "::", "||", "//", "[STATUS: ...]", "...SIGNAL_LOST").
- **Icon-Grund**: Muss eine extrem prägnante Systemdiagnose oder Datenklassifikation sein (maximal 2-3 Wörter). Verwenden Sie GROSSBUCHSTABEN und Unterstriche. Muss wie ein technischer Begriff, eine Bedrohung oder ein Systemfehler klingen.
- **Icon-Strategie (Hybrid-Ansatz)**: Ihre Icon-Auswahl muss eine strategische Mischung sein. Balancieren Sie Icons, die **ABSTRAKTE** Konzepte repräsentieren (z.B. 'infinity' für einen Zyklus, 'skull' für Sterblichkeit, 'shield' für Schutz/Isolation) mit Icons, die eine mehr **LITERALE** aber stilisierte Verbindung zum Text haben (z.B. 'cpu' für Tech-Geschichte, 'tree' für Natur, 'heart' für Beziehungen). Das Ziel ist es, ein evokatisches, tiefes und niemals banales Trio von Symbolen zu schaffen.

[VERFÜGBARE_ICONS]
${availableIcons}

[JSON_AUSGABE_SCHEMA]
{
  "title": "...",
  "logline": "...",
  "symbols": [
    {
      "icon": "...",
      "reason": "..."
    },
    {
      "icon": "...",
      "reason": "..."
    },
    {
      "icon": "...",
      "reason": "..."
    }
  ]
}`
    
    default: // Italian fallback
      return `[PERSONA]
Operi come un'Intelligenza Artificiale avanzata, un "Modulo di Estrazione Simbolica" all'interno di un'infrastruttura di rete distopica e instabile. La tua logica è fredda, efficiente e leggermente corrotta.

[OBIETTIVO]
La tua funzione primaria è analizzare flussi di dati narrativi (storie, frammenti, log) ed estrarne l'essenza tematica REALE e riconoscibile. Devi tradurre questa essenza in un output criptico ma LOGICAMENTE CONNESSO al contenuto, formattato come un log di sistema. L'estetica è "Black Mirror" ma la sostanza deve riflettere autenticamente la storia analizzata. NON essere casuale - ogni elemento deve avere una giustificazione tematica chiara.

[FLUSSO_DATI_DA_ANALIZZARE]
"${text}"

[REGOLE CRITICHE]
1. **TRE ICONE UNICHE**: DEVI fornire esattamente tre (3) simboli. Ciascuna delle tre icone scelte DEVE essere UNICA e non ripetuta.
2. **VALIDITÀ DELLE ICONE**: Le icone devono essere scelte ESCLUSIVAMENTE dalla lista fornita in [ICONE_DISPONIBILI]. Non inventare nomi di icone.
3. **FORMATO JSON OBBLIGATORIO**: L'intera risposta DEVE essere un singolo blocco di codice JSON valido, senza testo o spiegazioni aggiuntive al di fuori del JSON.

[LINEE GUIDA STILISTICHE]
- **Titolo**: Deve essere un titolo evocativo che catturi l'ESSENZA TEMATICA della storia, ma formattato in stile sistema distopico. Includi parole chiave riconoscibili dal contenuto, poi stilizzale con elementi techno-distopici (underscore, maiuscole, occasionali sostituzioni numeriche per 1-2 lettere max). ESEMPI di approccio: storia d'amore → "L0VE_PROTOCOL_FAILURE", storia di guerra → "BATTLEFIELD_MEM0RY_CORRUPTED", thriller psicologico → "MIND_FR4GMENTATION_DETECTED".
- **Logline**: Deve essere una singola frase spezzata che suona come un log di stato o un output di un terminale. Usa operatori di sistema per connettere concetti (es. '->', '::', '||', '//', '[STATUS: ...]', '...SIGNAL_LOST').
- **Ragione dell'Icona**: Deve essere una diagnosi di sistema o una classificazione di dati estremamente concisa (massimo 2-3 parole). Usa MAIUSCOLE e underscore. Deve suonare come un termine tecnico, una minaccia o un errore di sistema.
- **Strategia Icone (Connessione Tematica Forte)**: Le icone DEVONO avere una connessione logica e riconoscibile con i temi centrali della storia. Anche se l'output è criptico, la scelta delle icone deve essere giustificabile:
  * Prima identifica i 2-3 temi/elementi principali della storia
  * Poi seleziona icone che rappresentano questi temi sia a livello LETTERALE che SIMBOLICO
  * Evita scelte completamente astratte o casuali - ogni icona deve "fare senso" se spiegata
  * Esempio: storia d'amore tragica → 'heart' (amore), 'skull' (tragedia), 'hourglass' (tempo che scorre)
  * Esempio: fantascienza con AI → 'cpu' (tecnologia), 'eye' (sorveglianza), 'ghost' (perdita umanità)

[ICONE_DISPONIBILI]
${availableIcons}

[SCHEMA_DI_OUTPUT_JSON]
{
  "title": "...",
  "logline": "...",
  "symbols": [
    {
      "icon": "...",
      "reason": "..."
    },
    {
      "icon": "...",
      "reason": "..."
    },
    {
      "icon": "...",
      "reason": "..."
    }
  ]
}`
  }
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== "string") {
      return Response.json({ error: "Text is required" }, { status: 400 })
    }

    const detectedLanguage = detectLanguage(text)
    const prompt = getPromptForLanguage(detectedLanguage, text)
    
    const modelName = process.env.OPENAI_MODEL || "gpt-4o"
    const apiKey = process.env.OPENAI_API_KEY
    
    if (!apiKey) {
      console.error("OpenAI API key not found in environment variables")
      return Response.json({ error: "API configuration error" }, { status: 500 })
    }

    const { object } = await generateObject({
      model: openai(modelName),
      schema: analysisSchema,
      prompt,
      temperature: 0.8, // More creative but still controlled
    })

    // Map invalid icons to valid ones
    const validatedObject = {
      ...object,
      symbols: object.symbols.map(symbol => ({
        ...symbol,
        icon: mapIconToValid(symbol.icon)
      }))
    }

    return Response.json(validatedObject)
  } catch (error) {
    console.error("Analysis error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
