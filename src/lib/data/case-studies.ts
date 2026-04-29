import type { CaseStudy } from '@/lib/types';

export const CASE_STUDIES: CaseStudy[] = [
  // ─────────────────────────────────────────────────────────────────
  // ECORUN
  // ─────────────────────────────────────────────────────────────────
  {
    slug: 'ecorun',
    subtitle: 'Endless Runner Systems Built for Production Scale',
    techTags: ['Unity', 'Mobile', 'Gameplay Architecture', 'Performance Optimization'],
    intro: [
      'A mobile endless runner designed around scalable gameplay systems, production-ready architecture, and stable performance across a wide range of Android devices.',
      'Rather than treating optimization as a late-stage fix, EcoRun was built with performance and maintainability as foundational engineering decisions from day one.',
    ],

    overview: [
      'EcoRun was built to support long-term feature expansion without the common technical debt that endless runners often accumulate.',
      'Systems like power-ups, progression loops, collectibles, obstacle spawning, and player state management tend to become tightly coupled very quickly. Early prototypes may work, but scaling them safely becomes expensive.',
      'The goal was to avoid that trap by building gameplay architecture that could survive production growth, not just prototype success.',
      'At the same time, the game needed to maintain stable performance across a wide range of Android devices, making optimization a core architectural concern rather than a later polish step.',
    ],

    ownership: {
      intro: 'I owned the design and implementation of production-critical gameplay systems, with a focus on architecture stability, modularity, and mobile performance.',
      items: [
        'Player movement systems',
        'Static player + moving world architecture',
        'Obstacle spawning and pooling systems',
        'Collectible and power-up systems',
        'Ability-driven airborne coin spawning',
        'Player state management (run, jump, slide, stunned)',
        'Controller refactor using SOLID principles',
        'Performance optimization for mobile devices',
        'Lighting and rendering optimization strategy',
      ],
      footer: 'The focus was not just building features, but building systems that could safely scale.',
    },

    challenge: {
      opening: [
        'The main challenge was maintaining flexibility while gameplay complexity kept increasing.',
        'As power-ups, abilities, progression systems, and live content expansion grew, the risk of architectural decay became obvious. Without strong boundaries between gameplay systems, even small feature additions could create regressions inside core movement and player logic.',
        'At the same time, mobile performance constraints meant optimization could not be reactive. It had to be built into the foundation.',
      ],
      notText: 'How do we build an endless runner?',
      wasText: 'How do we keep an endless runner stable when its mechanics keep growing?',
      closing: 'That question shaped every technical decision.',
    },

    decisions: [
      {
        index: '01',
        title: 'Static Player + Moving World Architecture',
        before: [
          'Instead of continuously moving the player forward through the world, I used a static player with a moving environment approach.',
        ],
        bulletLabel: 'This improved:',
        bullets: [
          'Camera consistency',
          'Lane switching precision',
          'Obstacle spawning control',
          'Floating-point stability during long sessions',
          'Future maintainability of progression systems',
        ],
        after: [
          'What seems like a small movement decision became one of the most important architectural choices in the entire project.',
          'It simplified future expansion significantly while improving gameplay consistency across devices.',
        ],
      },
      {
        index: '02',
        title: 'Refactoring PlayerController Using SOLID',
        before: [
          'Rather than relying on a monolithic PlayerController, responsibilities were separated into focused systems:',
        ],
        bullets: [
          'Input handling',
          'Movement and physics',
          'Player states',
          'Ability and power-up handling',
        ],
        after: [
          'Each system communicated through events and interfaces instead of direct dependencies.',
          'This reduced feature integration risk, improved testing safety, and allowed mechanics to evolve independently without destabilizing core movement logic.',
          'This was critical for long-term maintainability.',
        ],
      },
      {
        index: '03',
        title: 'Power-Ups as Temporary Modifiers',
        before: [
          'Power-ups were designed as temporary behavior modifiers instead of logic controllers.',
        ],
        bulletLabel: 'This ensured:',
        bullets: [
          'Clean activation and deactivation',
          'Predictable stacking behavior',
          'No permanent state corruption',
          'Safe addition of new abilities without rewriting existing systems',
        ],
        after: [
          'This approach made long-term feature expansion significantly safer and reduced regression risk during iteration.',
        ],
      },
      {
        index: '04',
        title: 'Performance-First Mobile Architecture',
        before: [
          'Because EcoRun targets mobile devices, performance decisions shaped system design from the beginning.',
        ],
        bulletLabel: 'This included:',
        bullets: [
          'Object pooling for obstacles and collectibles',
          'Minimal Update() dependency',
          'Event-driven gameplay flow',
          'Deterministic gameplay interactions',
          'Lightweight collision handling',
        ],
        after: [
          'Instead of optimizing late, the architecture itself supported stable runtime performance.',
        ],
      },
      {
        index: '05',
        title: 'Lighting and Visual Optimization',
        before: [
          'To achieve polished visuals without sacrificing FPS, I avoided expensive real-time lighting dependencies.',
        ],
        bulletLabel: 'Instead, I used:',
        bullets: [
          'Baked lighting for static environments',
          'Light probes for dynamic objects',
          'Fake blob shadows instead of real-time shadows',
        ],
        after: [
          'This delivered stronger visual quality while maintaining stable performance on mid-range Android devices.',
        ],
      },
    ],

    results: {
      opening: 'The final architecture delivered both gameplay stability and production flexibility.',
      items: [
        'Stable 50–60 FPS across mid-range Android devices',
        'Lower maintenance overhead during feature expansion',
        'Reduced controller regressions through cleaner system boundaries',
        'Faster iteration when adding new gameplay mechanics',
        'Safer long-term support for live content and progression systems',
      ],
      closing: [
        'The result was not just a functional endless runner, but a gameplay foundation that could continue growing without repeated architectural rewrites.',
      ],
    },

    improvements: {
      opening: 'If EcoRun were extended further, the next major focus would be:',
      items: [
        'Deeper data-driven progression balancing',
        'Live Ops tooling for faster tuning updates',
        'Analytics-driven gameplay decision making',
        'More scalable backend-ready progression systems',
      ],
      closing: [
        'The important part is that the current architecture supports these improvements without requiring major refactors.',
        'That is the real success of the system.',
      ],
    },

    reflection: {
      opening: [
        'Simple games often create the most dangerous technical debt because they look easy early.',
        'Endless runners are a good example of this.',
        'Without strong architectural decisions, small gameplay additions quickly turn into fragile systems that are difficult to maintain and expensive to expand.',
        'EcoRun reinforced a principle I apply across all production work:',
      ],
      principle: 'Features are temporary.\nSystems survive production.',
      closing: [
        'Building for scalability early reduces both bugs and long-term development stress far more than late optimization ever can.',
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // YAARO KI RASOI
  // ─────────────────────────────────────────────────────────────────
  {
    slug: 'ykr',
    subtitle: 'Interaction Systems Built for Performance Stability',
    techTags: ['Unreal Engine', 'Mobile', 'Gameplay Systems', 'Performance Optimization'],
    intro: [
      'A kitchen simulation game designed around responsive interaction systems, scalable gameplay architecture, and stable performance across a wide range of mobile devices.',
      'Yaaro Ki Rasoi focused on high-frequency player interactions like cooking, chopping, plating, and serving inside a dense interactive environment where responsiveness directly affected gameplay quality.',
      'The challenge was not building the mechanics.',
      'It was making those systems scale without performance collapse as the project grew.',
    ],

    overview: [
      'Kitchen simulation games create a unique technical problem.',
      'Individually, systems like chopping, cooking, plating, UI prompts, and interaction feedback are simple to prototype. But when all of them run together inside a dense environment, performance and maintainability become the real challenge.',
      'Frequent interactions, heavy UI feedback, FX usage, and multiple simultaneous gameplay states can quickly create hidden CPU and GPU cost, especially on mobile devices.',
      'The goal was to build interaction systems that remained responsive under production load, while avoiding the common trap of solving performance problems too late.',
      'Optimization had to be part of the architecture, not post-production cleanup.',
    ],

    ownership: {
      intro: 'I owned the design and implementation of gameplay interaction systems, mobile performance strategy, and production-focused architecture decisions across Unreal Engine C++ and Blueprints.',
      items: [
        'Core interaction systems for cooking, chopping, plating, and serving',
        'World-space UI optimization strategy',
        'Tick reduction across C++ and Blueprint systems',
        'Niagara FX performance optimization',
        'Event-driven gameplay architecture',
        'Interaction flow design and execution systems',
        'Gameplay responsiveness improvements',
        'Mobile performance stability across device tiers',
      ],
      footer: 'The focus was not just feature delivery, but ensuring those systems could scale safely without constant refactoring.',
    },

    challenge: {
      opening: [
        'The real problem was system density.',
        'As more interactable objects, UI prompts, effects, and gameplay loops were added, performance degradation became increasingly visible, especially on lower-end mobile devices.',
        'Three major bottlenecks emerged:',
      ],
      bottlenecks: [
        'Heavy world-space UI usage',
        'Excessive Tick-based logic',
        'High-cost Niagara FX',
      ],
      connector: 'Each problem looked separate, but the root cause was the same: Systems that worked individually were too expensive when combined.',
      realQuestion: 'How do we preserve responsiveness and clarity without allowing performance cost to scale with every new mechanic?',
      closing: 'That question shaped every technical decision.',
    },

    decisions: [
      {
        index: '01',
        title: 'World-Space Widget Optimization',
        before: [
          'Early versions relied heavily on world-space widgets for interaction prompts, progress indicators, and gameplay feedback.',
          'As interactable objects increased, so did rendering overhead.',
        ],
        bulletLabel: 'This created:',
        bullets: [
          'GPU cost from excessive UI rendering',
          'Frame drops during interaction-heavy moments',
          'Performance inconsistency across device tiers',
        ],
        transition: ['Instead of removing feedback entirely, I restructured where and how UI was rendered.'],
        bulletLabel2: 'This included:',
        bullets2: [
          'Minimizing active world-space widgets at runtime',
          'Moving frequently visible UI to screen-space HUD systems',
          'Widget pooling for reuse instead of repeated creation/destruction',
          'Updating UI only when gameplay state changed',
        ],
        after: [
          'This significantly reduced rendering overhead while preserving gameplay clarity.',
        ],
      },
      {
        index: '02',
        title: 'Replacing Tick-Driven Logic with Event-Driven Systems',
        before: [
          'As gameplay systems expanded, many features relied heavily on Tick() in both C++ and Blueprints.',
        ],
        bulletLabel: 'This created:',
        bullets: [
          'High CPU usage',
          'Inefficient polling-based updates',
          'Hidden runtime cost during complex gameplay states',
        ],
        transition: ['I performed a full audit of Tick usage and replaced it wherever continuous updates were unnecessary.'],
        bulletLabel2: 'This included:',
        bullets2: [
          'Removing unnecessary Tick functions',
          'Replacing polling with timers for periodic logic',
          'Moving logic to event-driven execution',
          'Reserving Tick only for frame-critical updates',
        ],
        after: [
          'This reduced CPU load while keeping gameplay responsive and easier to maintain.',
        ],
      },
      {
        index: '03',
        title: 'Niagara FX Optimization Through Practical Trade-Offs',
        before: [
          'Niagara added strong visual polish, but on mobile devices it created significant performance instability.',
        ],
        bulletLabel: 'During stress scenarios:',
        bullets: [
          'FX-heavy moments caused major frame drops',
          'Visual consistency varied between devices',
          'Lower-end devices struggled to maintain responsiveness',
        ],
        transition: ['Instead of forcing Niagara across the entire project, I made selective trade-offs.'],
        bulletLabel2: 'This included:',
        bullets2: [
          'Replacing many Niagara effects with flipbook-based sprite animations',
          'Using pre-baked effects for frequent gameplay interactions',
          'Reserving Niagara only where it delivered clear gameplay value',
        ],
        after: [
          'This improved device coverage significantly without sacrificing gameplay readability.',
        ],
      },
      {
        index: '04',
        title: 'Centralized Interaction Architecture',
        before: [
          'Interaction systems were redesigned to avoid expensive per-object logic and duplicated execution paths.',
        ],
        bulletLabel: 'This included:',
        bullets: [
          'Centralized interaction handling instead of isolated per-object systems',
          'Event-based interaction checks instead of continuous polling',
          'Clear separation between interaction detection and interaction execution',
        ],
        after: [
          'This reduced duplication, simplified debugging, and made new kitchen mechanics significantly easier to extend safely.',
        ],
      },
    ],

    results: {
      opening: 'The final architecture delivered both stable performance and stronger production scalability.',
      items: [
        'Improved frame rate stability across mobile devices',
        'Reduced CPU and GPU load during peak gameplay moments',
        'More consistent gameplay responsiveness across device tiers',
        'Cleaner gameplay logic with fewer hidden performance costs',
        'Systems that scaled without repeated refactoring during feature growth',
      ],
      closing: [
        'The result was not just better optimization, but safer long-term production support.',
      ],
    },

    improvements: {
      opening: 'If development continued further, the next major focus would be:',
      items: [
        'Adaptive quality settings based on real-time device profiling',
        'Deeper FX scalability systems across device tiers',
        'Analytics-driven performance tuning for live optimization',
        'Stronger tooling for performance validation during content expansion',
      ],
      closing: [
        'The important part is that the current architecture supports these improvements without requiring major rewrites.',
        'That is what production-ready architecture should do.',
      ],
    },

    reflection: {
      opening: [
        'Performance problems are rarely visual problems first.',
        'They are usually architectural problems that become visible through performance.',
        'World-space UI, Tick-heavy logic, and expensive FX were not isolated bugs. They were symptoms of systems scaling without enough structural control.',
        'Yaaro Ki Rasoi reinforced a principle that applies across both Unity and Unreal projects:',
      ],
      principle: 'Responsiveness is part of gameplay design.',
      closing: [
        'If the system feels slow, unstable, or inconsistent, players experience it as bad gameplay, not bad optimization.',
        'Good engineering protects both performance and player trust.',
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // BULLBASH
  // ─────────────────────────────────────────────────────────────────
  {
    slug: 'bullbash',
    subtitle: 'Real-Time Multiplayer Systems Built for Fair Competitive Play',
    techTags: ['Unity', 'Mobile Multiplayer', 'Real-Time Strategy', 'Network Optimization'],
    intro: [
      'A fast-paced PvP strategy game built around real-time multiplayer fairness, responsive gameplay systems, and stable mobile performance across a wide range of devices.',
      'BullBash focused on competitive player-vs-player battles where timing, positioning, and tactical decision-making directly determined match outcomes.',
      'The challenge was not just making multiplayer work.',
      'It was making multiplayer feel fair under real mobile network conditions.',
    ],

    overview: [
      'BullBash is a real-time PvP strategy game inspired by Clash Royale, designed for mobile devices where players compete in fast tactical battles using units, positioning, and power-up decisions.',
      'Unlike turn-based strategy games, every action happens under live match pressure.',
      'That creates a very different technical problem.',
      'Players do not judge multiplayer by whether it technically connects.',
      'They judge it by fairness.',
      'If delayed inputs, desync, or inconsistent battle outcomes occur, players experience it as broken gameplay, not network instability.',
      'The goal was to build multiplayer systems that remained responsive, predictable, and trustworthy even under unstable mobile network conditions, while still supporting dynamic strategy and strong performance across device tiers.',
    ],

    ownership: {
      intro: 'I worked on multiplayer gameplay systems, real-time synchronization strategy, gameplay depth systems, and mobile performance optimization across core PvP loops.',
      items: [
        'Multiplayer synchronization and state consistency',
        'Network optimization and RPC strategy',
        'Power-up system design for mid-match strategy',
        'Lag compensation and gameplay fairness handling',
        'Gameplay responsiveness improvements',
        'Real-time state validation and conflict reduction',
        'Mobile performance optimization',
        'Object pooling and memory stability',
      ],
      footer: 'The focus was not simply multiplayer functionality, but competitive fairness and long-term production stability.',
    },

    challenge: {
      opening: [
        'Real-time mobile multiplayer creates a trust problem.',
        'Players must believe the game is fair.',
        'As development progressed, three major problem areas emerged:',
      ],
      bottlenecks: [
        'Lag and desynchronization during real-time battles',
        'Predictable gameplay with weak mid-match strategic depth',
        'Performance instability during visually intense matches',
      ],
      connector: 'Each issue looked separate, but the root cause was the same: Systems that worked technically were not yet strong enough for competitive gameplay.',
      realQuestion: 'How do we make players trust both the gameplay and the multiplayer system under imperfect network conditions?',
      closing: 'That question shaped every major decision.',
    },

    decisions: [
      {
        index: '01',
        title: 'Multiplayer Synchronization and Lag Compensation',
        before: [
          'Early multiplayer builds suffered from:',
        ],
        bullets: [
          'Noticeable input delay',
          'State desynchronization between players',
          'Inconsistent battle outcomes under poor mobile network conditions',
        ],
        transition: [
          'This directly damaged competitive fairness.',
          'Instead of pushing more data, I focused on sending less but sending the right information.',
        ],
        bulletLabel2: 'This included:',
        bullets2: [
          'Reducing message size and update frequency',
          'Sending only gameplay-critical state changes instead of full state snapshots',
          'Efficient serialization for smaller payloads',
          'Cleaner RPC and SyncVar usage with only authoritative data synced',
          'Lag compensation so delayed actions could resolve fairly without breaking match consistency',
        ],
        after: [
          'The goal was not perfect network conditions.',
          'It was predictable and trustworthy gameplay under imperfect ones.',
          'This significantly improved player confidence in match outcomes.',
        ],
      },
      {
        index: '02',
        title: 'Dynamic Mid-Match Power-Up Strategy',
        before: [
          'Early testing revealed a different problem.',
          'Matches became too predictable once they started.',
          'Players had limited ways to adapt during live gameplay, which reduced engagement and strategic depth.',
          'I designed and implemented a dynamic power-up system that created meaningful decisions during active matches instead of passive bonus collection.',
        ],
        bulletLabel: 'This included:',
        bullets: [
          'Contextual power-up choices based on live match progress',
          'Real-time decision making without interrupting gameplay flow',
          'Fast and intuitive UI for high-pressure selection',
          'Balanced power-up effects designed to encourage adaptation instead of repetition',
        ],
        after: [
          'This shifted power-ups from passive rewards into active strategic tools.',
          'The result was stronger player engagement and less predictable gameplay outcomes.',
        ],
      },
      {
        index: '03',
        title: 'Mobile Performance and Visual Stability',
        before: [
          'Stylized visuals supported gameplay clarity, but performance varied significantly across device tiers.',
        ],
        bulletLabel: 'This created:',
        bullets: [
          'Frame drops during intense combat scenarios',
          'Higher memory usage on lower-end devices',
          'Runtime spikes caused by allocations and unnecessary processing',
        ],
        transition: [
          'Optimization focused on keeping battles smooth without sacrificing visual readability.',
        ],
        bulletLabel2: 'This included:',
        bullets2: [
          'Texture compression and reduced polygon complexity',
          'Main loop optimization and removal of unnecessary calculations',
          'Adaptive frame rate strategies based on device capability',
          'Dynamic graphical adjustments for weaker hardware',
          'Object pooling and garbage collection optimization to prevent runtime spikes',
        ],
        after: [
          'The goal was stable competitive gameplay, not maximum visual complexity.',
          'Performance consistency matters more than visual ambition in PvP systems.',
        ],
      },
    ],

    results: {
      opening: 'The final architecture delivered stronger multiplayer fairness, better gameplay responsiveness, and stable mobile performance.',
      items: [
        'Significantly reduced lag and multiplayer desynchronization',
        'Fair and predictable real-time PvP battles across unstable network conditions',
        'Higher player engagement through dynamic mid-match strategy systems',
        'Stable frame rates across low-end and mid-range mobile devices',
        'Scalable multiplayer systems ready for live competitive environments',
      ],
      closing: [
        'The result was not just a functioning multiplayer game, but a competitive system players could trust.',
        'That trust is the real product.',
      ],
    },

    improvements: {
      opening: 'If BullBash were extended further, the next major focus would be:',
      items: [
        'Server-authoritative validation for high-stakes competitive modes',
        'Advanced matchmaking based on both latency and player skill',
        'Analytics-driven balancing for power-up systems and live tuning',
        'Better cheat prevention systems for competitive integrity',
      ],
      closing: [
        'The important part is that the current systems were designed to support these improvements without requiring major architectural rewrites.',
        'That is what scalable multiplayer architecture should do.',
      ],
    },

    reflection: {
      opening: [
        'Multiplayer performance is not a networking problem first.',
        'It is a systems design problem.',
        'Sending more data does not create fairness.',
        'Clear authority, predictable resolution, and trust in outcomes do.',
        'BullBash reinforced a principle that applies across all competitive multiplayer systems:',
      ],
      principle: 'Players forgive difficulty.\nThey do not forgive unfairness.',
      closing: [
        'Good multiplayer engineering protects fairness before it protects features.',
        'That is what keeps players coming back.',
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // TANKZ N GLORY
  // ─────────────────────────────────────────────────────────────────
  {
    slug: 'tankz',
    subtitle: 'Multiplayer Combat Systems Built for Fair Competitive Play',
    techTags: ['Unity', 'Mobile Multiplayer', 'Team Deathmatch', 'Progression Systems'],
    intro: [
      'A real-time 4v4 mobile team-based shooter built around fair multiplayer combat, scalable gameplay systems, and long-term player progression.',
      'Tankz N Glory focused on competitive team battles where responsiveness, combat consistency, and strategic progression directly shaped player retention.',
      'The challenge was not simply building a shooter.',
      'It was creating a multiplayer system players could trust while supporting long-term progression without breaking gameplay balance.',
    ],

    overview: [
      'Tankz N Glory is a real-time 4v4 team deathmatch game built for mobile devices, designed around fast competitive combat and scalable long-term progression.',
      'The project needed to support:',
    ],
    overviewBullets: [
      'Real-time multiplayer fairness',
      'Deep gameplay systems through abilities, stats, and inventory',
      'Meaningful progression without damaging competitive integrity',
    ],
    overviewPost: [
      'Unlike casual multiplayer games, players judge shooters through responsiveness and fairness first.',
      'If combat feels delayed, inconsistent, or unbalanced, players experience it as broken gameplay.',
      'The goal was to build multiplayer architecture and progression systems that remained predictable, extensible, and production-ready as new content, tanks, and competitive systems expanded.',
    ],

    ownership: {
      intro: 'I worked on multiplayer combat architecture, gameplay systems design, progression systems, and performance stability across the core PvP loop.',
      items: [
        'Multiplayer synchronization and combat fairness systems',
        'Server-authoritative combat architecture',
        'Client-side prediction and lag compensation',
        'Ability systems and stat modifier architecture',
        'Inventory and tank progression systems',
        'Tank class and combat role design',
        'Progression and retention system design',
        'Performance optimization for mobile matchmaking and loading',
      ],
      footer: 'The focus was not just building features, but building systems that could scale without creating competitive instability.',
    },

    challenge: {
      opening: [
        'Real-time mobile shooters create a difficult balance problem.',
        'Players expect fast, responsive combat, but mobile networks and device limitations constantly fight that expectation.',
        'As development progressed, three major problem areas emerged:',
      ],
      bottlenecks: [
        'Fairness and consistency in real-time multiplayer combat',
        'Scalable gameplay systems for abilities, stats, and customization',
        'Progression systems that supported retention without becoming pay-to-win',
      ],
      connector: 'Each issue looked separate, but the root problem was the same: Systems that worked independently needed to remain stable when combined inside competitive multiplayer.',
      realQuestion: 'How do we build progression and depth without sacrificing fairness?',
      closing: 'That question shaped every major technical decision.',
    },

    decisions: [
      {
        index: '01',
        title: 'Server-Authoritative Multiplayer Combat',
        before: [
          'Early multiplayer prototypes exposed common real-time shooter problems:',
        ],
        bullets: [
          'Players appearing out of sync',
          'Delayed actions under poor network conditions',
          'Inconsistent combat outcomes between clients',
        ],
        transition: [
          'This directly damaged trust in competitive gameplay.',
          'Instead of relying on client trust, I focused on authoritative combat resolution.',
        ],
        bulletLabel2: 'This included:',
        bullets2: [
          'Server-authoritative validation for all combat-critical logic',
          'Client-side prediction to keep controls responsive',
          'Interpolation for smoother remote player movement',
          'Network optimization to send only essential state changes',
          'Lag compensation and periodic validation for consistency',
        ],
        after: [
          'The goal was not perfect network conditions.',
          'It was fair combat outcomes under imperfect ones.',
          'That difference matters.',
        ],
      },
      {
        index: '02',
        title: 'Data-Driven Gameplay Systems for Tanks and Abilities',
        before: [
          'Without strong architecture, customization systems quickly become hard-coded and difficult to balance.',
          'That creates long-term production pain.',
          'I designed gameplay systems as modular, data-driven components instead of tightly coupled feature logic.',
          'This included:',
        ],
        subsections: [
          {
            title: 'Tank Stats System',
            items: ['Attack', 'Defense', 'Speed', 'Critical Chance'],
            footer: 'Stats could be modified through upgrades, abilities, and progression systems without rewriting core gameplay logic.',
          },
          {
            title: 'Ability System',
            intro: 'Abilities applied temporary or conditional modifiers instead of permanent state changes.',
            bulletLabel: 'This ensured:',
            items: [
              'Predictable stacking behavior',
              'Safe activation and deactivation',
              'Cleaner balancing across multiple tank types',
            ],
          },
          {
            title: 'Inventory System',
            bulletLabel: 'The inventory handled:',
            items: ['Tank ownership', 'Loadouts', 'Unlocks', 'Upgrade progression'],
          },
        ],
        after: [
          'Gameplay data was separated from UI representation, making expansion significantly safer.',
          'This allowed new tanks and systems to be added without architectural rewrites.',
        ],
      },
      {
        index: '03',
        title: 'Strategic Depth Through Tank Roles',
        before: [
          'Early playtests showed that raw shooting mechanics alone were not enough to sustain engagement.',
          'Players needed stronger reasons to coordinate and adapt.',
          'I introduced clear tank classes that created team strategy through role-based gameplay.',
        ],
        bulletLabel: 'This included:',
        bullets: [
          'Assault → High damage and frontline pressure',
          'Support → Buffs, survivability, and team utility',
          'Scout → Speed, flanking, and map control',
        ],
        after: [
          'Each role interacted differently with abilities and stat systems, encouraging cooperation and reducing repetitive mirror-match gameplay.',
          'This improved both competitive depth and long-term retention.',
        ],
      },
      {
        index: '04',
        title: 'Progression Systems That Reinforced Gameplay',
        before: [
          'Without progression systems, matches felt isolated and disposable.',
          'But badly designed progression creates pay-to-win frustration.',
          'The goal was progression that rewarded mastery, not advantage.',
        ],
        bulletLabel: 'This included:',
        bullets: [
          'XP-based progression tied to performance',
          'Transparent stat tracking and player feedback',
          'Unlockable upgrades that expanded playstyle choices',
          'Matchmaking aligned with progression to preserve fairness',
        ],
        after: [
          'Progression became a retention system without replacing skill-based gameplay.',
          'That distinction is critical.',
        ],
      },
      {
        index: '05',
        title: 'Performance as a Supporting System',
        before: [
          'Performance was treated as infrastructure, not post-production cleanup.',
          'Gameplay systems fail if technical friction interrupts the player experience.',
        ],
        bulletLabel: 'This included:',
        bullets: [
          'Optimized asset loading for faster match startup',
          'Stable 30 FPS targeting for lower-end devices',
          'Match flow allowing players to enter as soon as loading completed',
          'Reduced runtime spikes through better memory and state handling',
        ],
        after: [
          'The goal was not visual ambition.',
          'It was frictionless competitive gameplay.',
          'Performance protects fairness too.',
        ],
      },
    ],

    results: {
      opening: 'The final architecture delivered stronger multiplayer trust, scalable gameplay systems, and healthier long-term progression loops.',
      items: [
        'Fair and consistent real-time 4v4 multiplayer combat',
        'Scalable systems for abilities, inventory, and tank progression',
        'Increased strategic depth through clear role-based gameplay',
        'Faster match starts and stable performance across low-end devices',
        'Architecture capable of supporting future competitive modes and content expansion',
      ],
      closing: [
        'The result was not just a functional multiplayer shooter, but a system designed for long-term competitive support.',
      ],
    },

    improvements: {
      opening: 'If Tankz N Glory were extended further, the next major focus would be:',
      items: [
        'Stronger server-side validation for competitive ranked modes',
        'Deeper meta-progression and seasonal progression systems',
        'Advanced matchmaking based on latency, skill, and role preference',
        'Stronger competitive analytics for live balancing decisions',
      ],
      closing: [
        'The important part is that the current architecture supports these improvements without major refactoring.',
        'That is what production-ready multiplayer systems should do.',
      ],
    },

    reflection: {
      opening: [
        'Multiplayer fairness starts with architecture, not balancing.',
        'Players do not trust a game because damage numbers look fair.',
        'They trust it because actions resolve predictably and systems feel consistent.',
        'Tankz N Glory reinforced a principle that applies across every competitive multiplayer project:',
      ],
      principle: 'Progression should support competition.\nIt should never replace it.',
      closing: [
        'Good multiplayer systems protect fairness first, because fairness is what keeps players playing.',
      ],
    },
  },
];
