
import {
  Bot,
  FileText,
  Calculator,
  Folder,
  Terminal,
  Gamepad2,
  Settings,
  Cloud,
  Layout,
  Scissors,
  Bomb,
  Calendar,
  Image as ImageIcon,
  Monitor,
  Timer,
  Globe,
  Hammer,
  Hand,
  Music
} from 'lucide-react';

export const apps = {
  'xiviagent': {
    id: 'xiviagent',
    title: 'Xivi Agent',
    component: 'XiviAgent',
    icon: Bot,
    category: 'Communication'
  },
  'photoviewer': {
    id: 'photoviewer',
    title: 'Photo Viewer',
    component: 'PhotoViewer',
    icon: ImageIcon,
    category: 'Entertainment'
  },
  'pdfviewer': {
    id: 'pdfviewer',
    title: 'PDF Viewer',
    component: 'PDFViewer',
    icon: FileText,
    category: 'Media'
  },
  'balloonsbullets': {
    id: 'balloonsbullets',
    title: 'Balloons & Bullets',
    component: 'BalloonsBullets',
    icon: Gamepad2,
    category: 'Games'
  },
  'dodgebrawl': {
    id: 'dodgebrawl',
    title: 'Dodge Brawl',
    component: 'DodgeBrawl',
    icon: Gamepad2,
    category: 'Games'
  },
  'dungeonfish': {
    id: 'dungeonfish',
    title: 'Dungeon Fish',
    component: 'DungeonFish',
    icon: Gamepad2,
    category: 'Games'
  },
  'folkware': {
    id: 'folkware',
    title: 'Folkware',
    component: 'Folkware',
    icon: Gamepad2,
    category: 'Games'
  },
  'silentheist': {
    id: 'silentheist',
    title: 'Silent Heist',
    component: 'SilentHeist',
    icon: Gamepad2,
    category: 'Games'
  },
  'snow': {
    id: 'snow',
    title: 'Snow',
    component: 'Snow',
    icon: Gamepad2,
    category: 'Games'
  },
  'worstcasescenario': {
    id: 'worstcasescenario',
    title: 'Worst Case Scenario',
    component: 'WorstCaseScenario',
    icon: Gamepad2,
    category: 'Games'
  },
  'browser': {
    id: 'browser',
    title: 'Web Browser',
    component: 'Browser',
    icon: Globe,
    category: 'Internet'
  },
  'notepad': {
    id: 'notepad',
    title: 'Text Editor',
    component: 'TextEditor',
    icon: FileText,
    category: 'Productivity'
  },
  'calculator': {
    id: 'calculator',
    title: 'Calculator',
    component: 'Calculator',
    icon: Calculator,
    category: 'Utilities'
  },
  'settings': {
    id: 'settings',
    title: 'Settings',
    component: 'Settings',
    icon: Settings,
    category: 'System'
  },
  'music': {
    id: 'music',
    title: 'Music Player',
    component: 'MusicPlayer',
    icon: Music,
    category: 'Media'
  },
  'paint': {
    id: 'paint',
    title: 'Paint',
    component: 'Paint',
    icon: ImageIcon,
    category: 'Media'
  },
  'games': {
    id: 'games',
    title: 'Games',
    component: 'Games',
    icon: Gamepad2,
    category: 'Games'
  },
  'terminal': {
    id: 'terminal',
    title: 'Terminal',
    component: 'Terminal',
    icon: Terminal,
    category: 'System'
  },
  'weather': {
    id: 'weather',
    title: 'Weather',
    component: 'Weather',
    icon: Cloud,
    category: 'Internet'
  },
  'fileexplorer': {
    id: 'fileexplorer',
    title: 'File Explorer',
    component: 'FileExplorer',
    icon: Folder,
    category: 'System'
  },
  'systeminfo': {
    id: 'systeminfo',
    title: 'System Info',
    component: 'SystemInfo',
    icon: Monitor,
    category: 'System'
  },
  'timerclock': {
    id: 'timerclock',
    title: 'Timer Clock',
    component: 'TimerClock',
    icon: Timer,
    category: 'Utilities'
  },
  'todo': {
    id: 'todo',
    title: 'Todo List',
    component: 'Todo',
    icon: Calendar,
    category: 'Productivity'
  },
  'minesweeper': {
    id: 'minesweeper',
    title: 'Minesweeper',
    component: 'Minesweeper',
    icon: Bomb,
    category: 'Games'
  },
  'snake': {
    id: 'snake',
    title: 'Snake',
    component: 'Snake',
    icon: Scissors,
    category: 'Games'
  },
  'tetris': {
    id: 'tetris',
    title: 'Tetris',
    component: 'Tetris',
    icon: Layout,
    category: 'Games'
  },
  'whackamole': {
    id: 'whackamole',
    title: 'Whack A Mole',
    component: 'WhackAMole',
    icon: Hammer,
    category: 'Games'
  },
  'welcome': {
    id: 'welcome',
    title: 'Welcome',
    component: 'Welcome',
    icon: Hand,
    category: 'System'
  }
} as const;

export type AppId = keyof typeof apps;
export type AppComponent = typeof apps[AppId]['component'];

export const getAppIcon = (component: string) => {
  const app = Object.values(apps).find(app => app.component === component);
  return app?.icon;
};

export const getAppByComponent = (component: string) => {
  return Object.values(apps).find(app => app.component === component);
};
