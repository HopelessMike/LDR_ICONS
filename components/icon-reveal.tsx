"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  Satellite,
  Brain,
  Ghost,
  Heart,
  Star,
  Zap,
  Shield,
  Eye,
  Compass,
  Crown,
  Flame,
  Moon,
  Skull,
  Cpu,
  Database,
  Lock,
  Wifi,
  Terminal,
  Bug,
  Code,
  Server,
  HardDrive,
  Sword,
  Diamond,
  Key,
  Hourglass,
  Mountain,
  Waves,
  Zap as Lightning,
  Anchor,
  Feather,
  Gem,
  Bird,
  Network,
  Atom,
  Brain as Neural,
  Grid3X3,
  Infinity,
  Bot,
  Binary,
  CircuitBoard,
  Dna,
  Fingerprint,
  Glasses,
  Lightbulb,
  Microscope,
  Plug,
  Power,
  RadioIcon as Radio,
  Rocket,
  Settings,
  Target,
  Users,
  Wrench,
  Crosshair,
  Focus,
  Gamepad2,
  Headphones,
  Image,
  Layers,
  Music,
  Palette,
  Puzzle,
  Scan,
  Search,
  Volume2,
  Wind,
  Briefcase,
  Building,
  Calendar,
  Car,
  Clock,
  Coins,
  FileText,
  Folder,
  Globe,
  Home,
  MapPin,
  Percent,
  Printer,
  Ruler,
  ShoppingBag,
  Truck,
  Umbrella,
  Wallet,
  Bookmark,
  Book,
  Pen,
  Trophy,
  Gift,
  Stamp,
  Scissors,
  PaintBucket,
  Camera,
  Film,
  Mic,
  Speaker,
  Phone,
  Mail,
  MessageCircle,
  Share,
  ThumbsUp,
  VideoIcon as Video,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  HelpCircle,
  Plus,
  Minus,
  X,
  Check,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  SmileIcon as Smile,
  Frown,
  Meh,
  Angry,
  Laugh,
  Baby,
  UserIcon as User,
  UserCheck,
  UserX,
  UsersIcon as People,
  PersonStanding,
  Sun,
  CloudRain,
  Snowflake,
  TreePine,
  Flower,
  Leaf,
  Droplets,
  CloudLightning,
  Rainbow,
  Cat,
  Dog,
  Fish,
  Rabbit,
  Turtle,
  Sunrise,
  Sunset,
  Timer,
  CalendarDays,
  HeartHandshake,
  Cross,
  Smartphone,
  Laptop,
  Monitor,
  Tablet,
  Bluetooth,
  Usb,
  HardDriveIcon as Storage,
  MemoryStick,
  Bomb,
  ShieldAlert,
  Wand2,
  Sparkles,
  Plane,
  Train,
  Ship,
  Bike,
  Apple,
  Coffee,
  Wine,
  UtensilsCrossed,
  Megaphone,
  Radio as RadioWave,
  Antenna,
  Battery,
  BatteryLow,
  Fuel,
  ShieldCheck,
  ShieldX,
  KeyRound,
  Pill,
  Stethoscope,
  Thermometer,
  Syringe,
  GraduationCap,
  School,
  Library,
  Paintbrush,
  Palette as ArtPalette,
  Medal,
  Award,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart,
  PieChart,
  Hammer,
  Drill,
  Gauge,
  Orbit,
  Telescope,
  CircleDot,
  Square,
  Triangle,
  Hexagon,
  // New icons from user request
  Accessibility,
  Activity,
  AlarmClock,
  Ambulance,
  Amphora,
  Aperture,
  Armchair,
  Axes,
  Banana,
  Barrel,
  Banknote,
  Bath,
  BatteryCharging,
  BedSingle,
  Beef,
  Beer,
  Bell,
  Binoculars,
  Biohazard,
  Bitcoin,
  BicepsFlexed,
  Bone,
  BottleWine as Bottle,
  BowArrow,
  BrainCircuit,
  Box,
  Brush,
  Bubbles,
  Cake,
  CakeSlice,
  Calculator,
  Candy,
  CandyCane,
  CarTaxiFront,
  Carrot,
  Castle,
  Cctv,
  ChartColumnIncreasing,
  ChefHat,
  Cherry,
  Church,
  Cigarette,
  CigaretteOff,
  CircleParking,
  CirclePower,
  Citrus,
  Clapperboard,
  ClipboardCheck,
  Cloud,
  CloudDrizzle,
  CloudMoon,
  CloudSun,
  Clover,
  Cog,
  Cookie,
  CookingPot,
  Croissant,
  Disc3,
  Dices,
  Drama,
  Dribbble,
  Drum,
  Drumstick,
  Dumbbell,
  Ear,
  EarOff,
  Earth,
  Eclipse,
  Egg,
  EggFried,
  Eraser,
  Euro,
  Expand,
  EyeClosed,
  EyeOff,
  Factory,
  FerrisWheel,
  FireExtinguisher,
  Flag,
  FlameKindling,
  Flashlight,
  FlaskConical,
  Flower2,
  Footprints,
  GamepadIcon as Gamepad,
  GlassWater,
  Grape,
  Guitar,
  Ham,
  Hamburger,
  Hand,
  HandFist,
  HandMetal,
  Handbag,
  Handshake,
  HatGlasses,
  Haze,
  HeartCrack,
  Hospital,
  House,
  IceCreamCone,
  Kayak,
  Lamp,
  LifeBuoy,
  MapPinned,
  Martini,
  Megaphone as MegaphoneIcon,
  MessageCircleHeart,
  MicVocal,
  Milk,
  Minimize2,
  Mouse,
  Origami,
  PackageOpen,
  Panda,
  Paperclip,
  PartyPopper,
  Piano,
  Pi,
  Pickaxe,
  PiggyBank,
  Pizza,
  Popcorn,
  Pyramid,
  Rat,
  Radar,
  Radiation,
  RadioTower,
  Recycle,
  Rewind,
  Rose,
  Sailboat,
  Salad,
  Sandwich,
  Scale,
  ShipWheel,
  Shirt,
  ShoppingCart,
  Shovel,
  ShowerHead,
  Shrimp,
  Shuffle,
  Siren,
  Snail,
  Sofa,
  Soup,
  Speech,
  Sprout,
  Squirrel,
  Swords,
  Tag,
  Tent,
  TestTubeDiagonal,
  ThumbsDown,
  Ticket,
  Toilet,
  Tractor,
  TrafficCone,
  TrainFront,
  Trash2,
  TreePine as Tree,
  Turtle as TurtleIcon,
  Tv,
  Utensils,
  VenusAndMars,
  Volleyball,
  Wallet as WalletIcon,
  WandSparkles,
  Watch,
  Wifi as WifiIcon,
  Wine as WineIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { audioSystem } from "@/lib/audio"

interface IconRevealProps {
  icon: string
  reason: string
  show: boolean
  isAnalyzing: boolean
  isError: boolean
  slotIndex: number
}

const iconMap: Record<string, React.ComponentType<any>> = {
  satellite: Satellite, memory: Brain, ghost: Ghost, heart: Heart, star: Star, zap: Zap, shield: Shield, eye: Eye, compass: Compass, crown: Crown, flame: Flame, moon: Moon, skull: Skull, cpu: Cpu, database: Database, lock: Lock, wifi: Wifi, terminal: Terminal, bug: Bug, code: Code, server: Server, harddrive: HardDrive, sword: Sword, diamond: Diamond, key: Key, hourglass: Hourglass, tree: TreePine, mountain: Mountain, wave: Waves, lightning: Lightning, butterfly: Bug, rose: Flower, anchor: Anchor, feather: Feather, crystal: Gem, spiral: Zap, mask: Eye, mirror: Shield, door: Terminal, phoenix: Bird, dragon: Flame, wolf: Dog, raven: Bird, spider: Bug, serpent: Waves, labyrinth: Grid3X3, prism: Diamond, vortex: Zap, nexus: Network, eclipse: Moon, nebula: Star, quantum: Atom, neural: Neural, matrix: Grid3X3, void: Terminal, chaos: Zap, order: Grid3X3, infinity: Infinity, bot: Bot, binary: Binary, circuit: CircuitBoard, dna: Dna, fingerprint: Fingerprint, glasses: Glasses, lightbulb: Lightbulb, microscope: Microscope, plug: Plug, power: Power, radio: Radio, rocket: Rocket, settings: Settings, target: Target, users: Users, wrench: Wrench, crosshair: Crosshair, focus: Focus, gamepad: Gamepad2, headphones: Headphones, image: Image, layers: Layers, music: Music, palette: Palette, puzzle: Puzzle, scan: Scan, search: Search, sound: Volume2, wind: Wind, briefcase: Briefcase, building: Building, calendar: Calendar, car: Car, clock: Clock, coins: Coins, document: FileText, folder: Folder, globe: Globe, home: Home, location: MapPin, percent: Percent, printer: Printer, ruler: Ruler, bag: ShoppingBag, truck: Truck, umbrella: Umbrella, wallet: Wallet, bookmark: Bookmark, book: Book, pen: Pen, trophy: Trophy, gift: Gift, stamp: Stamp, scissors: Scissors, paint: PaintBucket, camera: Camera, film: Film, microphone: Mic, speaker: Speaker, phone: Phone, mail: Mail, message: MessageCircle, share: Share, like: ThumbsUp, video: Video, warning: AlertTriangle, info: Info, success: CheckCircle, error: XCircle, help: HelpCircle, plus: Plus, minus: Minus, close: X, check: Check, up: ArrowUp, down: ArrowDown, left: ArrowLeft, right: ArrowRight, smile: Smile, frown: Frown, meh: Meh, angry: Angry, laugh: Laugh, baby: Baby, user: User, usercheck: UserCheck, userx: UserX, people: People, standing: PersonStanding, sun: Sun, rain: CloudRain, snow: Snowflake, pine: TreePine, flower: Flower, leaf: Leaf, water: Droplets, storm: CloudLightning, rainbow: Rainbow, cat: Cat, dog: Dog, fish: Fish, rabbit: Rabbit, turtle: Turtle, sunrise: Sunrise, sunset: Sunset, timer: Timer, stopwatch: Timer, days: CalendarDays, handshake: HeartHandshake, kiss: Heart, child: Baby, cross: Cross, tomb: Cross, smartphone: Smartphone, laptop: Laptop, monitor: Monitor, tablet: Tablet, bluetooth: Bluetooth, usb: Usb, storage: Storage, memory_stick: MemoryStick, bomb: Bomb, crosshairs: Crosshair, shield_alert: ShieldAlert, wand: Wand2, sparkles: Sparkles, plane: Plane, train: Train, ship: Ship, bike: Bike, apple: Apple, coffee: Coffee, wine: Wine, food: UtensilsCrossed, megaphone: Megaphone, radio_wave: RadioWave, antenna: Antenna, battery: Battery, battery_low: BatteryLow, fuel: Fuel, shield_check: ShieldCheck, shield_x: ShieldX, key_round: KeyRound, pill: Pill, stethoscope: Stethoscope, thermometer: Thermometer, syringe: Syringe, graduation: GraduationCap, school: School, library: Library, paintbrush: Paintbrush, art_palette: ArtPalette, medal: Medal, award: Award, dollar: DollarSign, trending_up: TrendingUp, trending_down: TrendingDown, bar_chart: BarChart, pie_chart: PieChart, hammer: Hammer, screwdriver: Wrench, drill: Drill, temperature: Thermometer, gauge: Gauge, orbit: Orbit, telescope: Telescope, forever: Infinity, circle_dot: CircleDot, square: Square, triangle: Triangle, hexagon: Hexagon, accessibility: Accessibility, activity: Activity, alarm: AlarmClock, ambulance: Ambulance, amphora: Amphora, aperture: Aperture, armchair: Armchair, axes: Axes, banana: Banana, barrel: Barrel, banknote: Banknote, bath: Bath, battery_charging: BatteryCharging, bed: BedSingle, beef: Beef, beer: Beer, bell: Bell, binoculars: Binoculars, biohazard: Biohazard, bitcoin: Bitcoin, biceps: BicepsFlexed, bone: Bone, bottle: Bottle, bow: BowArrow, brain_circuit: BrainCircuit, box: Box, brush: Brush, bubbles: Bubbles, cake: Cake, cake_slice: CakeSlice, calculator: Calculator, candy: Candy, candy_cane: CandyCane, taxi: CarTaxiFront, carrot: Carrot, castle: Castle, cctv: Cctv, chart: ChartColumnIncreasing, chef: ChefHat, cherry: Cherry, church: Church, cigarette: Cigarette, cigarette_off: CigaretteOff, parking: CircleParking, power_circle: CirclePower, citrus: Citrus, clapperboard: Clapperboard, clipboard: ClipboardCheck, cloud: Cloud, drizzle: CloudDrizzle, cloud_moon: CloudMoon, cloud_sun: CloudSun, clover: Clover, cog: Cog, cookie: Cookie, pot: CookingPot, croissant: Croissant, disc: Disc3, dice: Dices, drama: Drama, dribbble: Dribbble, drum: Drum, drumstick: Drumstick, dumbbell: Dumbbell, ear: Ear, ear_off: EarOff, earth: Earth, eclipse_icon: Eclipse, egg: Egg, fried_egg: EggFried, eraser: Eraser, euro: Euro, expand: Expand, eye_closed: EyeClosed, eye_off: EyeOff, factory: Factory, ferris_wheel: FerrisWheel, fire_extinguisher: FireExtinguisher, flag: Flag, flame_kindling: FlameKindling, flashlight: Flashlight, flask: FlaskConical, flower2: Flower2, footprints: Footprints, gamepad_alt: Gamepad, glass_water: GlassWater, grape: Grape, guitar: Guitar, ham: Ham, hamburger: Hamburger, hand: Hand, fist: HandFist, metal: HandMetal, handbag: Handbag, handshake_icon: Handshake, hat_glasses: HatGlasses, haze: Haze, heart_crack: HeartCrack, hospital: Hospital, house_icon: House, ice_cream: IceCreamCone, kayak: Kayak, lamp: Lamp, life_buoy: LifeBuoy, map_pinned: MapPinned, martini: Martini, megaphone_icon: MegaphoneIcon, message_heart: MessageCircleHeart, mic_vocal: MicVocal, milk: Milk, minimize: Minimize2, mouse: Mouse, origami: Origami, package_open: PackageOpen, panda: Panda, paperclip: Paperclip, party: PartyPopper, piano: Piano, pi: Pi, pickaxe: Pickaxe, piggy_bank: PiggyBank, pizza: Pizza, popcorn: Popcorn, pyramid: Pyramid, rat: Rat, radar: Radar, radiation: Radiation, radio_tower: RadioTower, recycle: Recycle, rewind: Rewind, rose_icon: Rose, sailboat: Sailboat, salad: Salad, sandwich: Sandwich, scale: Scale, ship_wheel: ShipWheel, shirt: Shirt, shopping_cart: ShoppingCart, shovel: Shovel, shower: ShowerHead, shrimp: Shrimp, shuffle: Shuffle, siren: Siren, snail: Snail, sofa: Sofa, soup: Soup, speech: Speech, sprout: Sprout, squirrel: Squirrel, swords: Swords, tag: Tag, tent: Tent, test_tube: TestTubeDiagonal, thumbs_down: ThumbsDown, ticket: Ticket, toilet: Toilet, tractor: Tractor, traffic_cone: TrafficCone, train_front: TrainFront, trash: Trash2, tree_alt: Tree, turtle_alt: TurtleIcon, tv: Tv, utensils: Utensils, venus_mars: VenusAndMars, volleyball: Volleyball, wallet_alt: WalletIcon, wand_sparkles: WandSparkles, watch: Watch, wifi_alt: WifiIcon, wine_alt: WineIcon
}

const randomIcons = Object.keys(iconMap)
const initialIcons = ["heart", "skull", "bot"] // Icone iniziali

export function IconReveal({ icon, reason, show, isAnalyzing, isError, slotIndex }: IconRevealProps) {
  const [currentIcon, setCurrentIcon] = useState(initialIcons[slotIndex] || "terminal")
  const [isLocked, setIsLocked] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [displayIcon, setDisplayIcon] = useState(initialIcons[slotIndex] || "terminal") // Icona effettivamente mostrata
  const [isEpicLocking, setIsEpicLocking] = useState(false)
  const [glitchType, setGlitchType] = useState<'normal' | 'intense'>('normal')
  const [isRolling, setIsRolling] = useState(false);
  const [individualGlitchActive, setIndividualGlitchActive] = useState(false);

  // Main effect for controlling icon states (rolling, locking, idle)
  useEffect(() => {
    // Start rolling when analysis begins
    if (isAnalyzing && !isRolling) {
      setIsLocked(false);
      setIsRolling(true);

      animationIntervalRef.current = setInterval(() => {
        const newIcon = randomIcons[Math.floor(Math.random() * randomIcons.length)];
        setDisplayIcon(newIcon);
      }, 70); // Adjust speed of the roll
    }

    // Handle the reveal sequence when analysis is done and results should be shown
    if (!isAnalyzing && show) {
      // Schedule the lock-in for this specific icon based on its index
      const delay = slotIndex * 600; // 600ms delay between each icon lock
      const lockTimeout = setTimeout(() => {
        // Stop the rolling animation *only for this icon*
        if (animationIntervalRef.current) {
          clearInterval(animationIntervalRef.current);
          animationIntervalRef.current = null;
        }
        setIsRolling(false);
        setIsEpicLocking(true);
        
        const finalIcon = icon || "help";
        setCurrentIcon(finalIcon);
        setDisplayIcon(finalIcon);
        setIsLocked(true);

        // Play lock sound with slight pitch variation based on slot index
        const pitch = 1 + (slotIndex * 0.15); // 1.0, 1.15, 1.3 for variety
        audioSystem.playIconLock(pitch);

        // Reset epic lock effect after animation
        const epicLockTimeout = setTimeout(() => setIsEpicLocking(false), 800);
        return () => clearTimeout(epicLockTimeout);

      }, delay);

      return () => clearTimeout(lockTimeout);
    }
    
    // Handle reset to initial/idle state
    if (!isAnalyzing && !show) {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = null;
      }
      setIsRolling(false);
      const initialIcon = initialIcons[slotIndex] || "terminal";
      setCurrentIcon(initialIcon);
      setDisplayIcon(initialIcon);
      setIsLocked(false);
    }

  }, [isAnalyzing, show, icon, slotIndex]);

  // Effect to clean up interval on unmount
  useEffect(() => {
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, []);
  
  // Independent glitch system for each icon - idle icons
  useEffect(() => {
    if (!isAnalyzing && !show) {
      const scheduleGlitch = () => {
        // Random delay between 30-90 seconds for placeholder icons (much less frequent)
        const baseDelay = 30000 + Math.random() * 60000;
        const slotStagger = slotIndex * 5000; // 5 second stagger per slot
        const totalDelay = baseDelay + slotStagger;
        
        const timeoutId = setTimeout(() => {
          setGlitchType(Math.random() > 0.6 ? 'intense' : 'normal'); // More intense glitches
          setIndividualGlitchActive(true);
          
          // Glitch lasts for 300ms (longer)
          setTimeout(() => {
            setIndividualGlitchActive(false);
          }, 300);
          
          // Schedule next glitch
          scheduleGlitch();
        }, totalDelay);
        
        return () => clearTimeout(timeoutId);
      };
      
      const cleanup = scheduleGlitch();
      return cleanup;
    }
  }, [isAnalyzing, show, slotIndex])

  // Independent glitch system for locked icons
  useEffect(() => {
    if (isLocked) {
      const scheduleLockedGlitch = () => {
        // Very rare but more dramatic for locked icons: 60-180 seconds
        const baseDelay = 60000 + Math.random() * 120000;
        const slotStagger = slotIndex * 10000; // 10 second stagger per slot
        const totalDelay = baseDelay + slotStagger;
        
        const timeoutId = setTimeout(() => {
          setGlitchType('intense'); // Always intense for locked icons
          setIndividualGlitchActive(true);
          
          // Longer, more dramatic glitch for locked icons
          setTimeout(() => {
            setIndividualGlitchActive(false);
          }, 350);
          
          // Schedule next glitch
          scheduleLockedGlitch();
        }, totalDelay);
        
        return () => clearTimeout(timeoutId);
      };
      
      const cleanup = scheduleLockedGlitch();
      return cleanup;
    }
  }, [isLocked, slotIndex])
  
  const IconComponent = iconMap[displayIcon] || Terminal

  const lockedColorClass = isError 
    ? "border-yellow-500/80 shadow-[0_0_30px_rgba(250,204,21,0.4)]" 
    : "border-red-500/80 shadow-[0_0_30px_rgba(239,68,68,0.4)]"
    
  const lockedIconColorClass = isError 
    ? "text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]"
    : "text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]"
    
  const lockedTextColorClass = isError ? "text-yellow-400" : "text-red-400"

  return (
    <div className="relative">
      <div
        className={cn(
          "w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 border-2 bg-black/90 flex items-center justify-center relative overflow-hidden cursor-pointer transition-all duration-500",
          (isAnalyzing || isRolling) && "border-gray-600/70 shadow-[0_0_30px_rgba(156,163,175,0.3)] animate-static-overlay-border", // Static/noise border during analysis
          isLocked && lockedColorClass,
          !isAnalyzing && !isRolling && !show && "border-gray-800/50",
        )}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <IconComponent
          className={cn(
            "w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 transition-all duration-300 relative z-10",
            (isAnalyzing || isRolling) && "text-gray-400 animate-pulse-glitch", // Icona glitchata durante l'analisi
            isLocked && lockedIconColorClass,
            !isAnalyzing && !isRolling && !show && individualGlitchActive && `text-gray-600 ${glitchType === 'intense' ? 'animate-idle-glitch-intense' : 'animate-idle-glitch'}`, // Independent glitch for idle icons
            !isAnalyzing && !isRolling && !show && !individualGlitchActive && "text-gray-600", // Normal idle state
            isLocked && individualGlitchActive && "animate-locked-icon-glitch", // Enhanced glitch for locked icons
            isEpicLocking && "animate-epic-lock", // Epic effect quando si blocca
          )}
        />

        {(isAnalyzing || isRolling) && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-500/30 to-transparent animate-scan-vertical" />
            <div className="absolute inset-0 static-noise-effect" /> {/* Aggiunto effetto statico */}
          </>
        )}

        {isLocked && <div className={cn("absolute inset-0 border-2 animate-pulse", isError ? "border-yellow-500/60" : "border-red-500/60")} />}
      </div>

      {showTooltip && isLocked && reason && (
        <div className={cn(
            "absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-black/95 p-2 md:p-3 rounded text-xs font-mono max-w-xs z-20 animate-fade-in tooltip-glitch", // Glitch sul tooltip
             isError 
                ? "border border-yellow-700/50 text-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.2)]"
                : "border border-red-700/50 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
            )}
        >
          &gt; {reason}
        </div>
      )}

      <div className="absolute -bottom-6 md:-bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-mono text-center w-24">
        {(isAnalyzing || isRolling) && <span className="text-gray-400 animate-pulse">SCANNING_DATA...</span>}
        {isLocked && <span className={lockedTextColorClass}>{isError ? "SYSTEM_CORRUPTED" : "_L0CKED_"}</span>}
        {!isAnalyzing && !isRolling && !show && <span className="text-gray-600">IDLE_SCAN</span>}
      </div>
    </div>
  )
}