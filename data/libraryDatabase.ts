/**
 * ============================================================================
 * University Digital Library Database & Mock Knowledge Vault
 * ============================================================================
 */

import {
  Book,
  UserBookInteraction,
  DailyLearningLog,
  BookWithInteraction,
  LibraryDeskSummary
} from "@/types/library";

export * from "@/types/library";

// ────────────────────────────────────────────────────────────────────────────
// Core Academic Engineering & Technical Library Collection
// ────────────────────────────────────────────────────────────────────────────

export const initialBooksDatabase: Book[] = [
  {
    id: "book-clrs-algo",
    title: "Introduction to Algorithms",
    subtitle: "The Standard Global Bible of Algorithms & Computational Complexity",
    author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    department: "CSE",
    isbn: "978-0262046305",
    pages: 1312,
    rating: 4.9,
    publishYear: 2022,
    edition: "4th Edition",
    publisher: "MIT Press",
    availabilityStatus: "Available",
    coverImage: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?q=80&w=800&auto=format&fit=crop",
    synopsis: "The definitive textbook and professional reference for computer science algorithms. Covers asymptotic notations, divide-and-conquer, randomized algorithms, dynamic programming, greedy methods, advanced B-trees, Fibonacci heaps, network flow, and NP-completeness.",
    tags: ["Algorithms", "Data Structures", "Big-O", "GATE CSE", "Competitive Programming"],
    callNumber: "QA76.6 .C66 2022",
    fileSize: "28.4 MB"
  },
  {
    id: "book-clean-code",
    title: "Clean Code",
    subtitle: "A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin (Uncle Bob)",
    department: "CSE",
    isbn: "978-0132350884",
    pages: 464,
    rating: 4.8,
    publishYear: 2008,
    edition: "1st Edition",
    publisher: "Prentice Hall",
    availabilityStatus: "Available",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    synopsis: "Essential guide on writing clean, readable, and testable code. Details concrete rules of meaningful naming, single responsibility functions, error handling strategies, TDD unit testing, concurrency, and systematic code smell refactoring.",
    tags: ["Software Engineering", "Refactoring", "Clean Architecture", "OOP Design"],
    callNumber: "QA76.76.D47 M37 2008",
    fileSize: "12.2 MB"
  },
  {
    id: "book-ddia",
    title: "Designing Data-Intensive Applications",
    subtitle: "The Big Ideas Behind Reliable, Scalable, and Maintainable Systems",
    author: "Martin Kleppmann",
    department: "Data Science",
    isbn: "978-1449373320",
    pages: 616,
    rating: 5.0,
    publishYear: 2017,
    edition: "1st Edition",
    publisher: "O'Reilly Media",
    availabilityStatus: "Digital Only",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop",
    synopsis: "A masterclass exploration of the trade-offs in modern database architectures. Covers storage engines (LSM-Trees vs B-Trees), serialization formats, replication lag, partitioning, distributed consensus (Paxos/Raft), stream processing, and event sourcing.",
    tags: ["Distributed Systems", "Database Engines", "Consensus", "Stream Processing", "Big Data"],
    callNumber: "QA76.9.D3 K58 2017",
    fileSize: "18.6 MB"
  },
  {
    id: "book-aima",
    title: "Artificial Intelligence: A Modern Approach",
    subtitle: "The Leading Textbook on AI & Intelligent Autonomous Agents",
    author: "Stuart Russell & Peter Norvig",
    department: "AI & ML",
    isbn: "978-0134610993",
    pages: 1152,
    rating: 4.9,
    publishYear: 2020,
    edition: "4th Edition",
    publisher: "Pearson",
    availabilityStatus: "Available",
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    synopsis: "The comprehensive global authority on artificial intelligence. Unifies classical logic, informed heuristic search (A*), constraint satisfaction, Markov decision processes, reinforcement learning, deep neural nets, and AI safety ethics.",
    tags: ["Artificial Intelligence", "Reinforcement Learning", "Heuristic Search", "Machine Learning"],
    callNumber: "Q335 .R87 2020",
    fileSize: "34.1 MB"
  },
  {
    id: "book-microelectronics-sedra",
    title: "Microelectronic Circuits",
    subtitle: "Analysis and Design of Analog & Digital Integrated Circuits",
    author: "Adel S. Sedra, Kenneth C. Smith, Tony Chan Carusone",
    department: "ECE",
    isbn: "978-0190853464",
    pages: 1488,
    rating: 4.8,
    publishYear: 2020,
    edition: "8th Edition",
    publisher: "Oxford University Press",
    availabilityStatus: "Issued",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    synopsis: "The benchmark text for microelectronics and semiconductor circuit design. In-depth analysis of MOSFET/BJT physics, multi-stage op-amp design, differential amplifiers, frequency compensation, feedback topologies, and CMOS logic gates.",
    tags: ["Semiconductors", "MOSFETs", "Op-Amps", "VLSI", "Analog Electronics"],
    callNumber: "TK7867 .S43 2020",
    fileSize: "41.5 MB"
  },
  {
    id: "book-aerodynamics-anderson",
    title: "Fundamentals of Aerodynamics",
    subtitle: "Inviscid, Incompressible, Compressible & Viscous Fluid Flows",
    author: "John D. Anderson Jr.",
    department: "Aerospace",
    isbn: "978-1259129919",
    pages: 1152,
    rating: 4.9,
    publishYear: 2016,
    edition: "6th Edition",
    publisher: "McGraw-Hill Education",
    availabilityStatus: "Available",
    coverImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop",
    synopsis: "Acclaimed aerospace engineering volume on aerodynamic theory. Detailed derivation of continuity, momentum, Navier-Stokes, vortex panel methods, finite wing downwash, Prandtl-Glauert compressibility rules, and supersonic shock wave relations.",
    tags: ["Aerodynamics", "Flight Dynamics", "Shock Waves", "Fluid Mechanics", "GATE Aerospace"],
    callNumber: "TL570 .A677 2016",
    fileSize: "32.8 MB"
  },
  {
    id: "book-thermo-cengel",
    title: "Thermodynamics: An Engineering Approach",
    subtitle: "Energy, Exergy, Gas Power Cycles & Thermal Systems",
    author: "Yunus A. Çengel, Michael A. Boles, Mehmet Kanoğlu",
    department: "Mechanical",
    isbn: "978-1260048667",
    pages: 1008,
    rating: 4.8,
    publishYear: 2019,
    edition: "9th Edition",
    publisher: "McGraw-Hill Education",
    availabilityStatus: "Available",
    coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800&auto=format&fit=crop",
    synopsis: "Intuitive treatment of macroscopic engineering thermodynamics. Thorough breakdown of First and Second Laws, Steady Flow Energy Equations, availability/exergy analysis, Rankine steam cycles with reheat, Otto/Diesel IC cycles, and psychrometrics.",
    tags: ["Thermodynamics", "Power Cycles", "Exergy", "Mechanical Engineering", "Thermal Systems"],
    callNumber: "TJ265 .C43 2019",
    fileSize: "26.7 MB"
  },
  {
    id: "book-molecular-biology-alberts",
    title: "Molecular Biology of the Cell",
    subtitle: "Genomics, Cellular Architecture & Bio-nanomachines",
    author: "Bruce Alberts, Rebecca Heald, Alexander Johnson",
    department: "Biotechnology",
    isbn: "978-0393884821",
    pages: 1552,
    rating: 4.9,
    publishYear: 2022,
    edition: "7th Edition",
    publisher: "W. W. Norton & Company",
    availabilityStatus: "Digital Only",
    coverImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop",
    synopsis: "The preeminent authority in molecular cell biology and genetics. Covers chromatin structure, gene regulatory networks, recombinant DNA technology, CRISPR-Cas9 genome engineering, signal transduction, and bioprocess fermentation.",
    tags: ["Biotechnology", "Genomics", "CRISPR", "Cell Biology", "Molecular Genetics"],
    callNumber: "QH581.2 .M64 2022",
    fileSize: "55.0 MB"
  },
  {
    id: "book-concrete-nilson",
    title: "Design of Concrete Structures",
    subtitle: "Reinforced & Prestressed Concrete Structural Mechanics",
    author: "Arthur H. Nilson, David Darwin, Charles W. Dolan",
    department: "Civil",
    isbn: "978-0073293493",
    pages: 800,
    rating: 4.7,
    publishYear: 2016,
    edition: "15th Edition",
    publisher: "McGraw-Hill",
    availabilityStatus: "Available",
    coverImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
    synopsis: "Master standard for reinforced concrete civil design. Covers limit state design concepts, ultimate flexural strength of beams, diagonal shear tension, bond/anchorage lengths, axial-flexure interaction in columns, and seismic ductile detailing.",
    tags: ["Civil Engineering", "Structural Design", "RCC", "Concrete Mechanics", "Structural Analysis"],
    callNumber: "TA683.2 .N55 2016",
    fileSize: "21.4 MB"
  },
  {
    id: "book-os-silberschatz",
    title: "Operating System Concepts",
    subtitle: "Process Scheduling, Concurrency, Virtual Memory & Security",
    author: "Abraham Silberschatz, Peter B. Galvin, Greg Gagne",
    department: "CSE",
    isbn: "978-1119800361",
    pages: 1200,
    rating: 4.8,
    publishYear: 2021,
    edition: "10th Dinosaur Edition",
    publisher: "Wiley",
    availabilityStatus: "Available",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    synopsis: "Renowned 'Dinosaur Book' presenting core operating systems architectures. Covers kernel system calls, process synchronization, Peterson's algorithm, semaphores, deadlock handling, demand-paged virtual memory, and Linux file systems.",
    tags: ["Operating Systems", "Concurrency", "Virtual Memory", "Linux Kernel", "Processes"],
    callNumber: "QA76.76.O63 S5583 2021",
    fileSize: "29.3 MB"
  },
  {
    id: "book-networking-kurose",
    title: "Computer Networking: A Top-Down Approach",
    subtitle: "Transport Protocols, BGP Routing, SDN & Network Security",
    author: "James F. Kurose & Keith W. Ross",
    department: "CSE",
    isbn: "978-0136681557",
    pages: 864,
    rating: 4.8,
    publishYear: 2021,
    edition: "8th Edition",
    publisher: "Pearson",
    availabilityStatus: "Available",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    synopsis: "Top-down approach to internet protocols and system architectures. Explores HTTP/3, DNS, TCP flow and congestion control (Reno/CUBIC), OSPF/BGP routing protocols, Software-Defined Networking (SDN), and modern TLS 1.3 cryptography.",
    tags: ["Computer Networks", "TCP/IP", "Routing Protocols", "Socket Programming", "Cyber Security"],
    callNumber: "TK5105.5 .K87 2021",
    fileSize: "23.9 MB"
  },
  {
    id: "book-deep-learning-goodfellow",
    title: "Deep Learning",
    subtitle: "Adaptive Computation, Convolutional Nets & Generative Models",
    author: "Ian Goodfellow, Yoshua Bengio, Aaron Courville",
    department: "AI & ML",
    isbn: "978-0262035613",
    pages: 800,
    rating: 4.9,
    publishYear: 2016,
    edition: "1st Edition",
    publisher: "MIT Press",
    availabilityStatus: "Digital Only",
    coverImage: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=800&auto=format&fit=crop",
    synopsis: "The foundational mathematical text on deep neural networks. Covers linear algebra foundations, backpropagation, stochastic gradient descent, CNNs, Sequence RNNs, autoencoders, and Generative Adversarial Networks (GANs).",
    tags: ["Deep Learning", "Neural Networks", "PyTorch", "Computer Vision", "GANs"],
    callNumber: "Q325.5 .G66 2016",
    fileSize: "19.5 MB"
  }
];

// ────────────────────────────────────────────────────────────────────────────
// Mock User Book Interactions (Desk Bookmarks, Reading Progress & Recents)
// ────────────────────────────────────────────────────────────────────────────

export const initialUserInteractions: Record<string, UserBookInteraction> = {
  "book-clrs-algo": {
    bookId: "book-clrs-algo",
    lastAccessedDate: "2026-09-12T09:15:00Z",
    progressPercentage: 42,
    isBookmarkedOnDesk: true,
    currentPage: 550,
    totalReadingMinutes: 380,
    notesCount: 14,
    highlightCount: 32
  },
  "book-clean-code": {
    bookId: "book-clean-code",
    lastAccessedDate: "2026-09-11T19:40:00Z",
    progressPercentage: 78,
    isBookmarkedOnDesk: true,
    currentPage: 362,
    totalReadingMinutes: 290,
    notesCount: 22,
    highlightCount: 45
  },
  "book-ddia": {
    bookId: "book-ddia",
    lastAccessedDate: "2026-09-10T16:20:00Z",
    progressPercentage: 65,
    isBookmarkedOnDesk: true,
    currentPage: 400,
    totalReadingMinutes: 310,
    notesCount: 18,
    highlightCount: 29
  },
  "book-aima": {
    bookId: "book-aima",
    lastAccessedDate: "2026-09-09T14:30:00Z",
    progressPercentage: 30,
    isBookmarkedOnDesk: true,
    currentPage: 345,
    totalReadingMinutes: 180,
    notesCount: 8,
    highlightCount: 16
  },
  "book-thermo-cengel": {
    bookId: "book-thermo-cengel",
    lastAccessedDate: "2026-09-08T11:00:00Z",
    progressPercentage: 25,
    isBookmarkedOnDesk: false,
    currentPage: 252,
    totalReadingMinutes: 140,
    notesCount: 5,
    highlightCount: 12
  },
  "book-aerodynamics-anderson": {
    bookId: "book-aerodynamics-anderson",
    lastAccessedDate: "2026-09-05T14:10:00Z",
    progressPercentage: 15,
    isBookmarkedOnDesk: false,
    currentPage: 172,
    totalReadingMinutes: 95,
    notesCount: 3,
    highlightCount: 7
  },
  "book-microelectronics-sedra": {
    bookId: "book-microelectronics-sedra",
    lastAccessedDate: "2026-09-04T10:20:00Z",
    progressPercentage: 50,
    isBookmarkedOnDesk: true,
    currentPage: 744,
    totalReadingMinutes: 240,
    notesCount: 11,
    highlightCount: 20
  }
};

// ────────────────────────────────────────────────────────────────────────────
// Daily Learning Activity Logs (Study streaks & minutes)
// ────────────────────────────────────────────────────────────────────────────

export const initialDailyLogs: DailyLearningLog[] = [
  {
    date: "2026-09-12",
    topicsCovered: ["CLRS Chapter 22: Graph BFS/DFS", "Topological Sort"],
    minutesRead: 65,
    streakDays: 14
  },
  {
    date: "2026-09-11",
    topicsCovered: ["Clean Code: Concurrency & Locks", "Refactoring Smells"],
    minutesRead: 50,
    streakDays: 13
  },
  {
    date: "2026-09-10",
    topicsCovered: ["DDIA: Raft Distributed Consensus", "Leader Election"],
    minutesRead: 75,
    streakDays: 12
  },
  {
    date: "2026-09-09",
    topicsCovered: ["AIMA: Markov Decision Processes", "Bellman Equations"],
    minutesRead: 60,
    streakDays: 11
  },
  {
    date: "2026-09-08",
    topicsCovered: ["Thermodynamics: Rankine Cycle Reheat", "Exergy Balances"],
    minutesRead: 45,
    streakDays: 10
  },
  {
    date: "2026-09-07",
    topicsCovered: ["OS Concepts: Demand Paging", "Page Replacement LRU"],
    minutesRead: 55,
    streakDays: 9
  },
  {
    date: "2026-09-06",
    topicsCovered: ["Networking: TCP Reno Congestion", "BGP Path Vector"],
    minutesRead: 40,
    streakDays: 8
  }
];

// ────────────────────────────────────────────────────────────────────────────
// Library Query & Data Access Helper Functions
// ────────────────────────────────────────────────────────────────────────────

/**
 * Retrieve all books in the catalog.
 */
export function getAllBooks(): Book[] {
  return initialBooksDatabase;
}

/**
 * Retrieve a specific book by its ID.
 */
export function getBookById(id: string): Book | undefined {
  return initialBooksDatabase.find((b) => b.id.toLowerCase() === id.toLowerCase());
}

/**
 * Retrieve a book along with its active user interaction metadata.
 */
export function getBookWithInteraction(id: string): BookWithInteraction | undefined {
  const book = getBookById(id);
  if (!book) return undefined;
  return {
    ...book,
    interaction: initialUserInteractions[book.id]
  };
}

/**
 * Retrieve featured, highly rated books (Rating >= 4.85).
 */
export function getFeaturedBooks(): Book[] {
  return initialBooksDatabase.filter((book) => book.rating >= 4.85);
}

/**
 * Retrieve books recently accessed by the user, ordered by timestamp descending.
 */
export function getRecentlyAccessed(): BookWithInteraction[] {
  return initialBooksDatabase
    .filter((b) => initialUserInteractions[b.id]?.lastAccessedDate)
    .map((b) => ({
      ...b,
      interaction: initialUserInteractions[b.id]
    }))
    .sort((a, b) => {
      const dateA = new Date(a.interaction?.lastAccessedDate || 0).getTime();
      const dateB = new Date(b.interaction?.lastAccessedDate || 0).getTime();
      return dateB - dateA;
    });
}

/**
 * Retrieve books pinned/bookmarked on the user's active reading desk.
 */
export function getDeskFavorites(): BookWithInteraction[] {
  return initialBooksDatabase
    .filter((b) => initialUserInteractions[b.id]?.isBookmarkedOnDesk)
    .map((b) => ({
      ...b,
      interaction: initialUserInteractions[b.id]
    }));
}

/**
 * Search the library collection across title, subtitle, author, ISBN, and tags.
 */
export function searchBooks(query: string, departmentFilter?: string): Book[] {
  const normalizedQuery = query.trim().toLowerCase();

  return initialBooksDatabase.filter((book) => {
    // Check department filter
    if (
      departmentFilter &&
      departmentFilter !== "All" &&
      book.department.toLowerCase() !== departmentFilter.toLowerCase()
    ) {
      return false;
    }

    if (!normalizedQuery) return true;

    // Keyword matching across multiple attributes
    const matchTitle = book.title.toLowerCase().includes(normalizedQuery);
    const matchSubtitle = book.subtitle.toLowerCase().includes(normalizedQuery);
    const matchAuthor = book.author.toLowerCase().includes(normalizedQuery);
    const matchIsbn = book.isbn.toLowerCase().includes(normalizedQuery);
    const matchDepartment = book.department.toLowerCase().includes(normalizedQuery);
    const matchTags = book.tags?.some((t) => t.toLowerCase().includes(normalizedQuery));

    return matchTitle || matchSubtitle || matchAuthor || matchIsbn || matchDepartment || matchTags;
  });
}

/**
 * Retrieve books by specific academic department.
 */
export function getBooksByDepartment(department: string): Book[] {
  if (!department || department === "All") return initialBooksDatabase;
  return initialBooksDatabase.filter(
    (b) => b.department.toLowerCase() === department.toLowerCase()
  );
}

/**
 * Retrieve the daily study log ledger.
 */
export function getDailyLearningLogs(): DailyLearningLog[] {
  return initialDailyLogs;
}

/**
 * Compute the user's current reading streak in days.
 */
export function getCurrentStreak(): number {
  return initialDailyLogs[0]?.streakDays || 14;
}

/**
 * Computes aggregated desk summary metrics for study dashboards.
 */
export function getLibraryDeskSummary(): LibraryDeskSummary {
  const deskBooks = getDeskFavorites();
  const currentlyReading = Object.values(initialUserInteractions).filter(
    (i) => i.progressPercentage > 0 && i.progressPercentage < 100
  );
  const completed = Object.values(initialUserInteractions).filter(
    (i) => i.progressPercentage >= 100
  );

  const weeklyMinutes = initialDailyLogs.reduce((acc, log) => acc + log.minutesRead, 0);

  const deptCounts: Record<string, number> = {};
  deskBooks.forEach((b) => {
    deptCounts[b.department] = (deptCounts[b.department] || 0) + 1;
  });

  const topDepartments = Object.entries(deptCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([dept]) => dept);

  return {
    totalBooksOnDesk: deskBooks.length,
    currentlyReadingCount: currentlyReading.length,
    completedBooksCount: completed.length,
    currentStreakDays: getCurrentStreak(),
    totalMinutesReadThisWeek: weeklyMinutes,
    topDepartments
  };
}

export default initialBooksDatabase;
