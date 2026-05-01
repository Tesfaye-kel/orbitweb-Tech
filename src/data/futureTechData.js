const placeholder = 'https://placehold.co/900x600/101827/5eead4?text=OrbitWeb+Tech'
const roboticsImage = 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b2a?auto=format&fit=crop&w=1400&q=80'
const spaceImage = 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=80'
const cityImage = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=80'
const gadgetImage = 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1400&q=80'

export const futureTechSections = [
  {
    id: 'robotics',
    title: 'Robotics',
    cards: [
      { title: 'Autonomous Warehouse Fleet', description: 'Swarm robots improve logistics throughput and accuracy.', image: roboticsImage },
      { title: 'Surgical Microrobots', description: 'Precision robotics is reducing invasive procedures in healthcare.', image: roboticsImage },
      { title: 'Domestic Assist Bots', description: 'Multimodal assistants are entering eldercare and home support.', image: roboticsImage },
    ],
  },
  {
    id: 'space-tech',
    title: 'Space Tech',
    cards: [
      { title: 'Reusable Launch Systems', description: 'Launch costs drop as turnaround times tighten.', image: spaceImage },
      { title: 'Lunar Infrastructure', description: 'Power and habitat prototypes push Moon missions forward.', image: spaceImage },
      { title: 'Orbital Manufacturing', description: 'Microgravity creates new opportunities for advanced materials.', image: spaceImage },
    ],
  },
  {
    id: 'smart-cities',
    title: 'Smart Cities',
    cards: [
      { title: 'Adaptive Traffic Grids', description: 'Signals coordinate with real-time traffic intelligence.', image: cityImage },
      { title: 'Net-Zero Districts', description: 'AI-managed power balancing cuts urban emissions.', image: cityImage },
      { title: 'Urban Digital Twins', description: 'City planning decisions are tested in simulation first.', image: cityImage },
    ],
  },
  {
    id: 'future-gadgets',
    title: 'Future Gadgets',
    cards: [
      { title: 'Ambient AR Lenses', description: 'Context-aware overlays blend digital and physical worlds.', image: gadgetImage },
      { title: 'Neural Wearables', description: 'Non-invasive brain interfaces unlock new assistive controls.', image: gadgetImage },
      { title: 'Pocket Quantum Sensors', description: 'Tiny sensors improve medical and geospatial diagnostics.', image: gadgetImage },
    ],
  },
  {
    id: 'predictions',
    title: 'Tech Predictions',
    cards: [
      { title: 'Personal AI Operating Systems', description: 'Users manage a single AI profile across all devices.', image: placeholder },
      { title: 'Autonomous Security Layers', description: 'Threat detection moves from reactive to predictive models.', image: placeholder },
      { title: 'Synthetic Research Assistants', description: 'Lab teams accelerate discovery via model-driven workflows.', image: placeholder },
    ],
  },
]

export const predictionTimeline = [
  { year: '2030', forecast: 'AI copilots become standard in education, medicine, and law.' },
  { year: '2040', forecast: 'Human-robot collaboration dominates logistics, mobility, and manufacturing.' },
  { year: '2050', forecast: 'Smart cities operate as adaptive, low-emission, data-informed ecosystems.' },
]
