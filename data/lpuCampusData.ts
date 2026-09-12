// ============================================================
// Campus Connect — Lovely Professional University (LPU) Geo-Dataset
// Center Anchor: [31.2536, 75.7037] (Block 34 / Central Academic Zone)
// ============================================================

export type LocationCategory = "academic" | "stationery" | "food" | "landmark";

export interface CampusLocation {
  id: string;
  name: string;
  category: LocationCategory;
  block: string;
  roomOrFloor: string;
  coords: [number, number]; // [Latitude, Longitude]
  walkingMinutesFromBlock34: number;
  distanceMeters: number;
  operatingHours: string;
  description: string;
  popularFor: string[];
  highlightBadge: string;
  contactOrServices?: string;
  imageUrl?: string;
}

export const LPU_CENTER_COORDS: [number, number] = [31.2536, 75.7037];

export const CAMPUS_CATEGORIES: {
  id: LocationCategory | "all";
  label: string;
  color: string;
  bgLight: string;
  textDark: string;
  borderClass: string;
}[] = [
  {
    id: "all",
    label: "All Locations",
    color: "#0f172a",
    bgLight: "bg-slate-100 dark:bg-slate-800",
    textDark: "text-slate-900 dark:text-white",
    borderClass: "border-slate-300 dark:border-slate-700",
  },
  {
    id: "academic",
    label: "Buildings",
    color: "#2563eb",
    bgLight: "bg-blue-50 dark:bg-blue-950/40",
    textDark: "text-blue-700 dark:text-blue-300",
    borderClass: "border-blue-200 dark:border-blue-800",
  },
  {
    id: "stationery",
    label: "Stationery",
    color: "#d97706",
    bgLight: "bg-amber-50 dark:bg-amber-950/40",
    textDark: "text-amber-700 dark:text-amber-300",
    borderClass: "border-amber-200 dark:border-amber-800",
  },
  {
    id: "food",
    label: "Food & Cafes",
    color: "#e11d48",
    bgLight: "bg-rose-50 dark:bg-rose-950/40",
    textDark: "text-rose-700 dark:text-rose-300",
    borderClass: "border-rose-200 dark:border-rose-800",
  },
  {
    id: "landmark",
    label: "Landmarks",
    color: "#7c3aed",
    bgLight: "bg-purple-50 dark:bg-purple-950/40",
    textDark: "text-purple-700 dark:text-purple-300",
    borderClass: "border-purple-200 dark:border-purple-800",
  },
];

export const LPU_CAMPUS_LOCATIONS: CampusLocation[] = [
  // ── 1. Building Guide (Academic) ───────────────────────────
  {
    id: "block-33-34",
    name: "Block 33 & 34 (School of Computer Science & Engineering)",
    category: "academic",
    block: "Block 33 & 34",
    roomOrFloor: "Ground to 5th Floor",
    coords: [31.2536, 75.7037],
    walkingMinutesFromBlock34: 0,
    distanceMeters: 0,
    operatingHours: "08:30 AM – 06:00 PM (Mon-Sat)",
    description:
      "Core academic block for Scaler SST & B.Tech CSE programs. Houses supercomputing labs, faculty cabin chambers, smart lecture theatres, and IoT hardware research hubs.",
    popularFor: ["Mac Labs", "Faculty Cabins", "Scaler SST Labs", "CSE Seminar Halls"],
    highlightBadge: "CSE Academic Anchor",
    contactOrServices: "Dean Office Room 402 · Student Helpdesk Ground Floor",
  },
  {
    id: "block-36",
    name: "Block 36 (School of Mechanical & Civil Engineering)",
    category: "academic",
    block: "Block 36",
    roomOrFloor: "Ground to 4th Floor",
    coords: [31.2548, 75.7022],
    walkingMinutesFromBlock34: 3,
    distanceMeters: 180,
    operatingHours: "08:30 AM – 05:30 PM",
    description:
      "Specialized engineering labs containing heavy machinery testing bays, CNC workshops, aerodynamics tunnels, and CAD/CAM workstations.",
    popularFor: ["Robotics Bay", "Fluid Mechanics Lab", "Surveying Hub", "3D Prototyping"],
    highlightBadge: "Engineering Workshops",
    contactOrServices: "Workshop Superintendent Ext. 4231",
  },
  {
    id: "block-38",
    name: "Block 38 (School of Computer Applications & IT)",
    category: "academic",
    block: "Block 38",
    roomOrFloor: "Ground to 4th Floor",
    coords: [31.2522, 75.7049],
    walkingMinutesFromBlock34: 2,
    distanceMeters: 140,
    operatingHours: "08:30 AM – 06:00 PM",
    description:
      "Hub for Computer Applications (BCA/MCA), cloud virtualization bays, cyber security testing arena, and software engineering project rooms.",
    popularFor: ["Cloud Computing Lab", "Cyber Security Arena", "Apple iOS Lab", "Server Racks"],
    highlightBadge: "IT & Applications",
    contactOrServices: "IT Support Helpdesk Floor 1",
  },
  {
    id: "block-55",
    name: "Block 55 (Division of Student Welfare - DSW)",
    category: "academic",
    block: "Block 55",
    roomOrFloor: "Ground to 3rd Floor",
    coords: [31.2555, 75.7061],
    walkingMinutesFromBlock34: 4,
    distanceMeters: 290,
    operatingHours: "09:00 AM – 06:00 PM",
    description:
      "Central student welfare command center. Coordinates university cultural fests, student clubs, NCC/NSS squads, sports administration, and student discipline tribunals.",
    popularFor: ["Club Registration", "Fest Approvals", "Duty Leave Desk", "Sports Pass"],
    highlightBadge: "Student Welfare HQ",
    contactOrServices: "DSW Registry Floor 2 · Clubs Office Floor 1",
  },

  // ── 2. Tuck Shops & Stationery ─────────────────────────────
  {
    id: "central-stationery-34",
    name: "Central Stationery & Xerox Hub",
    category: "stationery",
    block: "Block 34",
    roomOrFloor: "Basement Level (-1)",
    coords: [31.2534, 75.7035],
    walkingMinutesFromBlock34: 1,
    distanceMeters: 30,
    operatingHours: "08:00 AM – 08:00 PM",
    description:
      "High-speed spiral binding, dissertation color printing, official university file covers, lab record sheets, drafting instruments, and stationery essentials.",
    popularFor: ["Project Binding", "Color Printing", "Lab Records", "Electronics Kits"],
    highlightBadge: "Fast Printing & Xerox",
    contactOrServices: "Bulk Print WhatsApp Desk Available",
  },
  {
    id: "unimall-stationery",
    name: "UniMall Tuck Shop & Printing Center",
    category: "stationery",
    block: "UniMall",
    roomOrFloor: "1st Floor, Shop #114",
    coords: [31.2562, 75.7050],
    walkingMinutesFromBlock34: 4,
    distanceMeters: 310,
    operatingHours: "09:00 AM – 10:00 PM (Open Late)",
    description:
      "Complete book depot and premium art & architecture stationery, university merchandise, backpacks, notebook bundles, and passport photo instant kiosk.",
    popularFor: ["Architectural Sheets", "Hardcover Theses", "Uni Merchandise", "Passport Photos"],
    highlightBadge: "Full-Stock Bookstore",
    contactOrServices: "Book Reservations & Express Plotter Printing",
  },
  {
    id: "bh4-depot",
    name: "BH-4 Academic Supply Depot",
    category: "stationery",
    block: "Boys Hostel 4",
    roomOrFloor: "Ground Floor Arcade",
    coords: [31.2510, 75.7020],
    walkingMinutesFromBlock34: 5,
    distanceMeters: 380,
    operatingHours: "07:30 AM – 11:00 PM",
    description:
      "Hostel-side stationery depot serving night-owl students with late assignment printing, exam stationery kits, chargers, and essential cables.",
    popularFor: ["Late-Night Printing", "USB Flash Drives", "Scientific Calculators", "Exam Kits"],
    highlightBadge: "Night-Owl Support",
    contactOrServices: "Open until 11:00 PM during exam seasons",
  },

  // ── 3. Food Hubs & Outlets ─────────────────────────────────
  {
    id: "unimall-food-court",
    name: "UniMall Mega Food Court & Franchises",
    category: "food",
    block: "UniMall",
    roomOrFloor: "3rd & 4th Floors",
    coords: [31.2564, 75.7052],
    walkingMinutesFromBlock34: 4,
    distanceMeters: 320,
    operatingHours: "10:00 AM – 11:00 PM",
    description:
      "Central air-conditioned multi-cuisine food palace featuring Dominos, Subway, Baskin Robbins, Chai Point, Punjabi dhaba counters, and South Indian tiffins.",
    popularFor: ["Dominos Pizza", "Subway", "Dosa Corner", "Smoothie Bars"],
    highlightBadge: "30+ Food Brands",
    contactOrServices: "Central Billing · Dine-in Seating Capacity 600+",
  },
  {
    id: "block-34-nescafe",
    name: "Block 34 Nescafe & Fresh Juice Kiosk",
    category: "food",
    block: "Block 34",
    roomOrFloor: "Central Courtyard",
    coords: [31.2538, 75.7039],
    walkingMinutesFromBlock34: 1,
    distanceMeters: 25,
    operatingHours: "08:00 AM – 09:30 PM",
    description:
      "Quick-service campus favorite for iced frappes, espresso, double-masala Maggi, grilled sandwiches, and fresh citrus juices.",
    popularFor: ["Cold Coffee", "Cheese Grilled Sandwich", "Double Maggi", "Oreo Shake"],
    highlightBadge: "Instant Quick Bites",
    contactOrServices: "UPI Quick Pay Accepted",
  },
  {
    id: "sdm-kiosk-plaza",
    name: "Shanti Devi Mittal Kiosk Plaza",
    category: "food",
    block: "SDMA Plaza",
    roomOrFloor: "Open-Air Esplanade",
    coords: [31.2570, 75.7040],
    walkingMinutesFromBlock34: 5,
    distanceMeters: 390,
    operatingHours: "09:00 AM – 10:30 PM",
    description:
      "Vibrant street-food terrace surrounding the auditorium fountains. Best for authentic momos, shawarma rolls, bubble teas, waffles, and live tea stalls.",
    popularFor: ["Steamed & Kurkure Momos", "Shawarma", "Bubble Tea", "Belgian Waffles"],
    highlightBadge: "Evening Hangout Hub",
    contactOrServices: "Open Seating Promenade",
  },

  // ── 4. Campus Landmarks ("Hot Buildings") ──────────────────
  {
    id: "unimall-landmark",
    name: "UniMall (Central Commercial Complex)",
    category: "landmark",
    block: "UniMall",
    roomOrFloor: "4-Story Mega Complex",
    coords: [31.2563, 75.7051],
    walkingMinutesFromBlock34: 4,
    distanceMeters: 310,
    operatingHours: "09:00 AM – 11:00 PM (Daily)",
    description:
      "LPU's flagship lifestyle and commercial epicenter. Features multi-brand apparel stores, bowling alley, salons, university bank branches, ATMs, and mega food court.",
    popularFor: ["State Bank of India", "Bowling Alley", "Apparel Stores", "Electronics"],
    highlightBadge: "Campus Lifestyle Mall",
    contactOrServices: "Full ATM Row Ground Floor · Pharmacy Ground Floor",
  },
  {
    id: "sdma-auditorium",
    name: "Shanti Devi Mittal Auditorium (SDMA)",
    category: "landmark",
    block: "SDMA Complex",
    roomOrFloor: "Main Hall (Seats 3,500)",
    coords: [31.2575, 75.7038],
    walkingMinutesFromBlock34: 6,
    distanceMeters: 440,
    operatingHours: "Event Schedule Dependent",
    description:
      "World-class acoustic theatre hosting university convocations, global celebrity nights, TEDxLPU conferences, and national tech summits.",
    popularFor: ["Convocations", "TEDx Talks", "Celebrity Concerts", "Hackathon Ceremonies"],
    highlightBadge: "Grand Auditorium",
    contactOrServices: "Main Foyer Entrance via East Gate",
  },
  {
    id: "unipolis-landmark",
    name: "Baldev Raj Mittal Unipolis",
    category: "landmark",
    block: "Unipolis Open Stadium",
    roomOrFloor: "Open-Air Mega Canopy",
    coords: [31.2550, 75.7042],
    walkingMinutesFromBlock34: 2,
    distanceMeters: 160,
    operatingHours: "Open 24/7",
    description:
      "Colossal 10,000+ spectator amphitheater covered by a tensile architecture canopy. The pulse of LPU for youth festivals, tech exhibitions, and university gatherings.",
    popularFor: ["One India Cultural Fest", "Auto Expo", "Sports Tournaments", "Live DJ Shows"],
    highlightBadge: "10,000+ Capacity Arena",
    contactOrServices: "Stage Management Control Box North End",
  },
  {
    id: "central-library-landmark",
    name: "Central Library & Knowledge Resource Centre",
    category: "landmark",
    block: "Library Building",
    roomOrFloor: "5 Automated Floors",
    coords: [31.2542, 75.7031],
    walkingMinutesFromBlock34: 1,
    distanceMeters: 80,
    operatingHours: "Open 24/7 (Reading Halls)",
    description:
      "Modern 5-storey knowledge citadel with 1.5M+ books, automated RFID check-out kiosks, IEEE/ACM digital research bays, silent reading floors, and discussion pods.",
    popularFor: ["IEEE Research Bay", "RFID Borrowing", "Silent Study Floors", "24/7 AC Rooms"],
    highlightBadge: "24/7 Digital Library",
    contactOrServices: "Reference Desk Floor 1 · Digital Repository Floor 3",
  },
];
