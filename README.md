# Story Iconizer

Una webapp futuristica con estetica Black Mirror e Love, Death & Robots che trasforma le storie degli utenti in output criptici in stile sistema distopico, con titoli in formato "system-file", logline spezzate come terminale e tre icone simboliche.

## 🚀 Funzionalità

- **Interfaccia Distopica Avanzata**: UI ispirata a Black Mirror e Love, Death & Robots con effetti glitch dinamici e animazioni epiche
- **AI "Modulo di Estrazione Simbolica"**: Sistema intelligente che opera come un'AI corrotta per analizzare narrazioni e generare output criptici
- **Prompt Ottimizzato Anti-Overfitting**: Algoritmo avanzato che evita la ripetizione di pattern ed esempi, massimizzando creatività e varietà
- **Rilevamento Lingua Automatico**: Supporta Italiano, Inglese, Francese, Spagnolo e Tedesco con prompts specificamente adattati per ogni lingua
- **120+ Icone Simboliche**: Vastissima collezione di icone Lucide per rappresentare concetti astratti, emotivi e letterali
- **Sistema Audio Immersivo**: Suoni cyberpunk sincronizzati con animazioni (scansione, typewriter, boot sounds)
- **Effetti Visivi Epici Rinnovati**: 
  - Glitch indipendenti e meno frequenti per non disturbare l'esperienza utente
  - Effetto "Epic Lock" potenziato al momento del reveal di ogni simbolo
  - Animazioni typewriter realistiche con backspace casuali e velocità variabile
  - Cursore personalizzato in stile terminal su tutta l'interfaccia
  - Background con bande visive migliorate e spotlight effetto del mouse
  - Delay sequenziali ottimizzati per massimo impatto drammatico
- **Output in Stile Sistema**: Titoli con leetspeak (es: `M3M_FR4G:PR0J3CT_ECH0`), logline con operatori di sistema (`->`, `::`, `||`)
- **Strategia Ibrida per Icone**: Bilanciamento intelligente tra simboli astratti e collegamenti letterali
- **Responsive Design**: Ottimizzata per tutti i dispositivi

## 🛠️ Tecnologie Utilizzate

- **Framework**: Next.js 15.2.4 con App Router
- **UI Library**: React 19, Tailwind CSS 4.1.12  
- **Componenti**: Radix UI, Lucide Icons (120+ icone)
- **AI Integration**: OpenAI SDK (@ai-sdk/openai), Vercel AI SDK
- **Validazione**: Zod schema validation per output strutturato
- **Audio System**: Sistema audio personalizzato con Web Audio API
- **Styling**: Tailwind CSS con animazioni personalizzate e keyframes avanzati
- **TypeScript**: Tipizzazione completa per massima affidabilità

## 📦 Installazione

1. **Clona il repository**:
```bash
git clone <repository-url>
cd story-iconizer
```

2. **Installa le dipendenze**:
```bash
pnpm install
# oppure
npm install
```

3. **Configura le variabili d'ambiente**:
```bash
cp .env.local.example .env.local
```
Modifica `.env.local` inserendo:
```
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o
```

4. **Avvia il server di sviluppo**:
```bash
pnpm dev
# oppure
npm run dev
```

5. **Apri il browser** su [http://localhost:3000](http://localhost:3000)

## 🔧 Configurazione

### Variabili d'Ambiente

- `OPENAI_API_KEY`: La tua chiave API di OpenAI (obbligatoria)
- `OPENAI_MODEL`: Il modello da utilizzare (default: `gpt-4o`)
  - Modelli supportati: `gpt-4o`, `gpt-4`, `gpt-4-turbo`, `gpt-3.5-turbo`

### Icone Supportate

Il sistema supporta oltre 120 icone simboliche completamente rinnovate per massima espressività narrativa:

**Icone Tecnologiche Avanzate**: satellite, cpu, database, wifi, terminal, bug, code, server, harddrive, binary, circuit, network, quantum, neural, matrix, bot, radio, rocket, smartphone, laptop, monitor, tablet, bluetooth, usb, storage, memory, microchip, cable, power, signal, antenna, scanner, printer, gamepad

**Icone Simboliche Potenziate**: ghost, heart, star, zap, shield, eye, skull, infinity, void, chaos, order, crosshair, bomb, target, focus, diamond, crystal, prism, vortex, nexus, eclipse, nebula, gem, crown, flame, mask, mirror

**Icone Naturali ed Elementi**: tree, mountain, wave, lightning, butterfly, rose, anchor, feather, flower, leaf, water, storm, rainbow, sun, rain, snow, pine, wind, fire, earth, air, snowflake, droplet, spark, lightning_bolt, tornado

**Icone Umane e Sociali**: compass, key, hourglass, door, phoenix, dragon, wolf, raven, spider, serpent, labyrinth, users, user, people, baby, child, family, couple, group, team, community, handshake, hug, kiss

**Icone Emotive e Psicologiche**: brain, mind, dream, memory, thought, emotion, mood, feeling, soul, spirit, consciousness, imagination, creativity, inspiration, wisdom, intelligence, logic, intuition

**Icone Astratte ed Azioni**: spiral, puzzle, layers, palette, music, image, sound, clock, timer, globe, home, lock, settings, search, scan, help, info, warning, error, success, play, pause, stop, record, edit, create, destroy, transform, evolve

**Icone per Storie Fantasy/Sci-Fi**: magic, spell, potion, wizard, knight, castle, spaceship, alien, robot, cyborg, portal, dimension, universe, galaxy, planet, meteor, comet, black_hole

## 🌐 Sistema Linguistico Avanzato

Il sistema rileva automaticamente la lingua del testo inserito e applica prompt specificamente ottimizzati per ogni lingua, mantenendo l'estetica distopica e la terminologia tecnica. Lingue supportate:

- **Italiano** (default/fallback) - "Modulo di Estrazione Simbolica"
- **Inglese** - "Symbolic Extraction Module"
- **Francese** - "Module d'Extraction Symbolique" 
- **Spagnolo** - "Módulo de Extracción Simbólica"
- **Tedesco** - "Symbolisches Extraktionsmodul"

Ogni lingua ha il proprio set di istruzioni ottimizzate per:
- Terminologia tecnica appropriata
- Stile "system-log" locale
- Operatori di sistema culturalmente adattati
- Effetti leetspeak specifici per alfabeto

## 📁 Struttura del Progetto

```
story-iconizer/
├── app/
│   ├── api/
│   │   └── analyze-story/
│   │       └── route.ts          # API endpoint per l'analisi delle storie
│   ├── globals.css               # Stili globali
│   ├── layout.tsx                # Layout dell'applicazione
│   └── page.tsx                  # Pagina principale
├── components/
│   ├── icon-reveal.tsx           # Componente per il reveal delle icone con effetti glitch potenziati
│   ├── terminal-text.tsx         # Componente per animazioni typewriter realistiche
│   ├── audio-control.tsx         # Controllo audio con sistema glitch indipendente
│   └── ui/                       # Componenti UI Radix (Button, Textarea, etc.)
├── lib/
│   ├── utils.ts                  # Utilità comuni
│   └── audio.ts                  # Sistema audio cyberpunk avanzato
├── public/                       # Asset statici
├── .env.local.example           # Template variabili d'ambiente
└── README.md                    # Documentazione
```

## 🎨 Personalizzazione Avanzata

### Aggiungere Nuove Icone

1. Importa l'icona da `lucide-react` in `components/icon-reveal.tsx`
2. Aggiungila alla mappa `iconMap` con mapping appropriato
3. Includi il nome nell'array `validIcons` in `app/api/analyze-story/route.ts`
4. Aggiungi eventuali sinonimi nella mappa `iconMapping` per la mappatura automatica

### Modificare i Prompt AI

I prompt sono ottimizzati per evitare overfitting e massimizzare creatività:
- **Nessun esempio esplicito**: Evita modelli fissi che l'AI tende a copiare
- **Principi guida**: Spiega COME pensare invece di COSA generare
- **Vincoli ferrei**: Regole non negoziabili (3 icone uniche, JSON valido)
- **Strategia ibrida**: Bilanciamento astratto/letterale per varietà

Per modificare i prompt, edita la funzione `getPromptForLanguage()` in `app/api/analyze-story/route.ts`

### Modificare lo Stile

Il design utilizza Tailwind CSS. I colori principali sono:
- **Rosso**: `red-500`, `red-400` per elementi primari
- **Cyan**: `cyan-400`, `cyan-500` per elementi secondari
- **Grigio**: Varie tonalità per testo e bordi

### Personalizzare gli Effetti Visivi

#### Titolo FRAGMENT.OS
Il titolo è stato semplificato per una migliore leggibilità, rimuovendo gli effetti glitch fastidiosi:
```typescript
const renderTitle = () => {
  return (
    <span className="text-gray-100 font-sans tracking-wide font-medium">
      FRAGMENT.OS
    </span>
  )
}
```

#### Sistema Glitch Indipendente Ottimizzato
Definiti in `components/icon-reveal.tsx`, `components/audio-control.tsx` e `app/globals.css`:
- **Placeholder Icons**: Glitch ogni 30-90 secondi (molto meno frequente)
- **Locked Icons**: Glitch migliorato ogni 60-180 secondi con animazione `locked-icon-glitch`
- **Extract Symbols Button**: Glitch indipendente ogni 90-180 secondi 
- **Options Button**: Glitch rarissimo ogni 120-300 secondi
- **Epic Lock**: Animazione drammatica potenziata al momento del reveal
- **Pulse Glitch**: Effetto durante l'analisi con colori RGB sincronizzati

#### Sistema Typewriter Realistico Avanzato
Implementato in `components/terminal-text.tsx` con funzionalità avanzate:
- **Velocità Variabile**: Caratteri normali (25-65ms), spazi veloci (15ms), punteggiatura lenta (120ms)
- **Effetto Backspace**: 1% di probabilità di cancellare 2-3 caratteri e riscrivere (solo per logline)
- **Suoni Sincronizzati**: Suoni typewriter realistici per ogni carattere visibile
- **Cursore Anti-Jump**: Placeholder invisibile per evitare salti di layout
- **Pause Realistiche**: Pause casuali occasionali per simulare pensiero umano

#### Timing delle Sequenze Ottimizzato
- Delay tra icone: 600ms (modificabile in `icon-reveal.tsx`)
- Durata Epic Lock potenziata: 800ms con effetti avanzati
- Delay titolo: 2600ms dopo inizio analisi
- Delay logline: 500ms dopo completamento titolo (timing dinamico)
- Sistema audio sincronizzato con tutte le animazioni

## 🚀 Deployment

### Vercel (Raccomandato)

1. Pusha il codice su GitHub
2. Collega il repository a Vercel
3. Configura le variabili d'ambiente nel dashboard Vercel
4. Deploy automatico ad ogni push

### Altri Hosting

Per altri servizi di hosting, assicurati che:
- Supportino Node.js 18+
- Abbiano configurate le variabili d'ambiente
- Supportino le API routes di Next.js

## 📱 API

### POST `/api/analyze-story`

Analizza una storia e restituisce titolo, logline e icone simboliche.

**Body**:
```json
{
  "text": "La tua storia qui..."
}
```

**Risposta Esempio**:
```json
{
  "title": "M3M_FR4G:N3UR4L_C0LLAPS3",
  "logline": "COGNITIVE_BREACH >> REALITY_MATRIX_UNSTABLE",
  "symbols": [
    {
      "icon": "brain",
      "reason": "NEURAL_OVERLOAD"
    },
    {
      "icon": "infinity", 
      "reason": "LOOP_DETECTED"
    },
    {
      "icon": "shield",
      "reason": "FIREWALL_BREACH"
    }
  ]
}
```

**Caratteristiche dell'Output**:
- **Titoli**: Stile system-file con leetspeak (`4`, `3`, `1`, `0`, `5`)
- **Logline**: Operatori di sistema (`>>`, `->`, `::`, `||`, `//`)
- **Icon Reasons**: Terminologia tecnica in MAIUSCOLE con underscore
```

## 🐛 Troubleshooting

### Errori Comuni

**"API configuration error"**
- Verifica che `OPENAI_API_KEY` sia configurata correttamente in `.env.local`

**Icone non visualizzate**
- Assicurati che l'icona sia importata e mappata correttamente in `icon-reveal.tsx`

**Errori di build**
- Esegui `pnpm install` per reinstallare le dipendenze
- Controlla che tutte le importazioni siano corrette

### Performance e Ottimizzazioni

Per migliorare le performance:
- Usa `gpt-3.5-turbo` invece di `gpt-4o` per risposte più veloci (trade-off creatività/velocità)
- Implementa caching per le richieste frequenti
- Ottimizza le animazioni CSS per dispositivi meno potenti
- Considera debouncing per input frequenti
- Monitora l'utilizzo dell'API OpenAI per costi

### Ottimizzazioni Specifiche Implementate

- **Sistema Glitch Indipendente**: Ogni elemento ha il proprio timing per evitare sovrapposizioni
- **Animazioni Realistiche**: Typewriter con velocità variabile e backspace casuali
- **Audio System**: Suoni cyberpunk sincronizzati (scansione, typewriter, boot)
- **Cursore Personalizzato**: Stile terminal su tutta l'interfaccia
- **Background Migliorato**: Bande visive più visibili e spotlight mouse
- **Mapping Intelligente**: Sistema automatico di fallback per icone non valide
- **Rilevamento Lingua**: Algoritmo efficiente basato su word frequency
- **Gestione Errori**: Fallback graceful con output tematicamente coerente
- **Validazione Schema**: Zod per garantire consistenza dell'output JSON
- **Timeout Requests**: 15 secondi di timeout per evitare hang
- **Progressive Enhancement**: Animazioni che si adattano alle capacità del dispositivo

## 📄 Licenza

Questo progetto è distribuito sotto licenza MIT. Vedi il file `LICENSE` per maggiori dettagli.

## 🤝 Contributi

I contributi sono benvenuti! Per contribuire:

1. Fork il progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit le tue modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📞 Supporto

Per supporto o domande:
- Apri un [issue](https://github.com/your-username/story-iconizer/issues)
- Contatta il team di sviluppo

---

## 🔄 Changelog Recenti

### v2.1.0 - Ottimizzazioni UX e Performance
- ✨ **Glitch Effects Ottimizzati**: Sistema completamente indipendente e meno invasivo
- 🎵 **Sistema Audio Immersivo**: Suoni cyberpunk sincronizzati con animazioni
- 🖱️ **Cursore Terminal**: Cursore personalizzato su tutta l'interfaccia
- 📝 **Typewriter Realistico**: Velocità variabile e backspace casuali
- 🎨 **Background Migliorato**: Bande visive più visibili e spotlight mouse
- 🆔 **Titolo Semplificato**: Rimossi effetti glitch fastidiosi dal titolo
- 🔧 **120+ Nuove Icone**: Vastissima collezione per analisi più accurate
- 🐛 **Bug Fixes**: Risolto jumping del cursore e build errors

---

**Story Iconizer v2.1** - Trasforma le tue storie in simboli universali con l'intelligenza artificiale 🚀