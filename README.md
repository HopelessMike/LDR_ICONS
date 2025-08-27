# Story Iconizer

Una webapp futuristica con estetica Black Mirror e Love, Death & Robots che trasforma le storie degli utenti in output criptici in stile sistema distopico, con titoli in formato "system-file", logline spezzate come terminale e tre icone simboliche.

## 🚀 Funzionalità

- **Interfaccia Distopica Avanzata**: UI ispirata a Black Mirror e Love, Death & Robots con effetti glitch dinamici e animazioni epiche
- **AI "Modulo di Estrazione Simbolica"**: Sistema intelligente che opera come un'AI corrotta per analizzare narrazioni e generare output criptici
- **Prompt Ottimizzato Anti-Overfitting**: Algoritmo avanzato che evita la ripetizione di pattern ed esempi, massimizzando creatività e varietà
- **Rilevamento Lingua Automatico**: Supporta Italiano, Inglese, Francese, Spagnolo e Tedesco con prompts specificamente adattati per ogni lingua
- **140+ Icone Simboliche**: Vasta collezione di icone Lucide per rappresentare concetti astratti e letterali
- **Effetti Visivi Epici**: 
  - Glitch casuali sulle icone in stato idle
  - Effetto "Epic Lock" al momento del reveal di ogni simbolo
  - Animazione typewriter per titoli e logline
  - Delay sequenziali per massimo impatto drammatico
- **Output in Stile Sistema**: Titoli con leetspeak (es: `M3M_FR4G:PR0J3CT_ECH0`), logline con operatori di sistema (`->`, `::`, `||`)
- **Strategia Ibrida per Icone**: Bilanciamento intelligente tra simboli astratti e collegamenti letterali
- **Responsive Design**: Ottimizzata per tutti i dispositivi

## 🛠️ Tecnologie Utilizzate

- **Framework**: Next.js 15.2.4 con App Router
- **UI Library**: React 19, Tailwind CSS 4.1.12
- **Componenti**: Radix UI, Lucide Icons
- **AI Integration**: OpenAI SDK (@ai-sdk/openai), Vercel AI SDK
- **Validazione**: Zod schema validation
- **Styling**: Tailwind CSS con animazioni personalizzate

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

Il sistema supporta oltre 140 icone simboliche per massima espressività:

**Icone Tecnologiche**: satellite, cpu, database, wifi, terminal, bug, code, server, harddrive, binary, circuit, network, quantum, neural, matrix, bot, radio, rocket, smartphone, laptop, monitor, tablet, bluetooth, usb, storage, memory_stick

**Icone Simboliche**: ghost, heart, star, zap, shield, eye, skull, infinity, void, chaos, order, crosshair, bomb, target, focus, diamond, crystal, prism, vortex, nexus, eclipse, nebula

**Icone Naturali**: tree, mountain, wave, lightning, butterfly, rose, anchor, feather, flower, leaf, water, storm, rainbow, sun, rain, snow, pine

**Icone Umane**: compass, crown, flame, moon, sword, key, hourglass, mask, mirror, door, phoenix, dragon, wolf, raven, spider, serpent, labyrinth, users, user, people, baby, child

**Icone Astratte**: spiral, puzzle, layers, palette, music, image, sound, wind, clock, timer, globe, home, lock, settings, search, scan, help, info, warning, error, success

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
│   ├── icon-reveal.tsx           # Componente per il reveal delle icone
│   ├── icon-placeholder.tsx      # Placeholder per le icone
│   ├── theme-provider.tsx        # Provider per i temi
│   └── ui/                       # Componenti UI Radix
├── lib/
│   └── utils.ts                  # Utilità comuni
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

#### Effetti Glitch del Titolo
Definiti in `app/page.tsx` nella funzione `renderTitle()`. Personalizzabili:
- Frequenza degli effetti (`Math.random() * 8000 + 3000`)
- Intensità degli effetti
- Tipi di effetti (flicker, color-shift, position-shift, static)

#### Effetti delle Icone
Definiti in `components/icon-reveal.tsx` e `app/globals.css`:
- **Idle Glitch**: Effetto casuale ogni 3 secondi sulle icone grigie
- **Epic Lock**: Animazione drammatica al momento del lock (scale, brightness, text-shadow)
- **Pulse Glitch**: Effetto durante l'analisi con colori RGB

#### Animazioni Typewriter
Personalizzabili in `app/globals.css`:
- `animate-typewriter`: Per i titoli (2s con delay 1s)
- `animate-typewriter-delayed`: Per le logline (2s con delay 3s)

#### Timing delle Sequenze
- Delay tra icone: 600ms (modificabile in `icon-reveal.tsx`)
- Durata Epic Lock: 800ms
- Delay titolo: 2600ms dopo inizio analisi
- Delay logline: 4100ms dopo inizio analisi

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

**Story Iconizer** - Trasforma le tue storie in simboli universali con l'intelligenza artificiale 🚀