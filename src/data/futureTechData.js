import roboticsImg from '../assets/Autonomous Warehouse Fleet.jpg'
import surgeryImg from '../assets/Surgical Microrobots.jpg'
import assistImg from '../assets/Domestic Assist Bots.jpg'

import launchImg from '../assets/Pocket Quantum Sensors.jpg'
import lunarImg from '../assets/Net-Zero Districts.jpg'
import orbitalImg from '../assets/Urban Digital Twins.jpg'

import trafficImg from '../assets/Adaptive Traffic Grids,jpg.jpg'
import netzeroImg from '../assets/Net-Zero Districts.jpg'
import twinsImg from '../assets/Urban Digital Twins.jpg'

import arImg from '../assets/Ambient AR Lenses.jpg'
import wearableImg from '../assets/Neural Wearables.jpg'
import sensorsImg from '../assets/Pocket Quantum Sensors.jpg'

import osImg from '../assets/Personal AI Operating Systems.jpg'
import securityImg from '../assets/Autonomous Security Layers.jpg'
import researchImg from '../assets/Synthetic Research Assistants.jpg'

// (legacy constants kept for backward-compat)
const placeholder = osImg
const roboticsImage = roboticsImg
const spaceImage = launchImg
const cityImage = trafficImg
const gadgetImage = arImg


export const futureTechSections = [
  {
    id: 'robotics',
    title: 'Robotics',
    cards: [
      { title: 'Autonomous Warehouse Fleet', description: 'Swarm robots improve logistics throughput and accuracy.', image: roboticsImage },
      { title: 'Surgical Microrobots', description: 'Precision robotics is reducing invasive procedures in healthcare.', image: surgeryImg },
      { title: 'Domestic Assist Bots', description: 'Multimodal assistants are entering eldercare and home support.', image: assistImg },
    ],
  },
  {
    id: 'space-tech',
    title: 'Space Tech',
    cards: [
      { title: 'Reusable Launch Systems', description: 'Launch costs drop as turnaround times tighten.', image: launchImg },
      { title: 'Lunar Infrastructure', description: 'Power and habitat prototypes push Moon missions forward.', image: lunarImg },
      { title: 'Orbital Manufacturing', description: 'Microgravity creates new opportunities for advanced materials.', image: orbitalImg },
    ],
  },
  {
    id: 'smart-cities',
    title: 'Smart Cities',
    cards: [
      { title: 'Adaptive Traffic Grids', description: 'Signals coordinate with real-time traffic intelligence.', image: trafficImg },
      { title: 'Net-Zero Districts', description: 'AI-managed power balancing cuts urban emissions.', image: netzeroImg },
      { title: 'Urban Digital Twins', description: 'City planning decisions are tested in simulation first.', image: twinsImg },
    ],
  },
  {
    id: 'future-gadgets',
    title: 'Future Gadgets',
    cards: [
      { title: 'Ambient AR Lenses', description: 'Context-aware overlays blend digital and physical worlds.', image: arImg },
      { title: 'Neural Wearables', description: 'Non-invasive brain interfaces unlock new assistive controls.', image: wearableImg },
      { title: 'Pocket Quantum Sensors', description: 'Tiny sensors improve medical and geospatial diagnostics.', image: sensorsImg },
    ],
  },
  {
    id: 'predictions',
    title: 'Tech Predictions',
    cards: [
      { title: 'Personal AI Operating Systems', description: 'Users manage a single AI profile across all devices.', image: osImg },
      { title: 'Autonomous Security Layers', description: 'Threat detection moves from reactive to predictive models.', image: securityImg },
      { title: 'Synthetic Research Assistants', description: 'Lab teams accelerate discovery via model-driven workflows.', image: researchImg },
    ],
  },
]

export const predictionTimeline = [
  { year: '2030', forecast: 'AI copilots become standard in education, medicine, and law.' },
  { year: '2040', forecast: 'Human-robot collaboration dominates logistics, mobility, and manufacturing.' },
  { year: '2050', forecast: 'Smart cities operate as adaptive, low-emission, data-informed ecosystems.' },
]
