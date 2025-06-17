import { Star, Tv, Book, BookOpen, Film, Gamepad, Smartphone, Music, 
  Download, Database, Wrench, Headphones, TrendingUp, FileText, 
  Image, Video, MessageSquare, Link } from "lucide-react";

export const CATEGORIES: Record<string, { name: string, icon: JSX.Element, color: string }> = {
  featured: {
    name: 'Featured',
    icon: <Star className="text-yellow-500 mr-2 h-5 w-5" />,
    color: 'yellow'
  },
  anime: {
    name: 'Anime',
    icon: <Tv className="text-violet-500 mr-2 h-5 w-5" />,
    color: 'violet'
  },
  movie: {
    name: 'Movies',
    icon: <Film className="text-red-500 mr-2 h-5 w-5" />,
    color: 'red'
  },
  manga: {
    name: 'Manga',
    icon: <Book className="text-rose-500 mr-2 h-5 w-5" />,
    color: 'rose'
  },
  novels: {
    name: 'Novels',
    icon: <BookOpen className="text-sky-500 mr-2 h-5 w-5" />,
    color: 'sky'
  },
  dramas: {
    name: 'Dramas',
    icon: <Film className="text-fuchsia-500 mr-2 h-5 w-5" />,
    color: 'fuchsia'
  },
  games: {
    name: 'Games',
    icon: <Gamepad className="text-emerald-500 mr-2 h-5 w-5" />,
    color: 'emerald'
  },
  apps: {
    name: 'Apps',
    icon: <Smartphone className="text-indigo-500 mr-2 h-5 w-5" />,
    color: 'indigo'
  },
  downloads: {
    name: 'Downloads',
    icon: <Download className="text-cyan-500 mr-2 h-5 w-5" />,
    color: 'cyan'
  },
  music: {
    name: 'Music',
    icon: <Music className="text-amber-500 mr-2 h-5 w-5" />,
    color: 'amber'
  },
  databases: {
    name: 'Databases',
    icon: <Database className="text-slate-500 mr-2 h-5 w-5" />,
    color: 'slate'
  },
  tools: {
    name: 'Tools',
    icon: <Wrench className="text-teal-500 mr-2 h-5 w-5" />,
    color: 'teal'
  },
  ASMR: {
    name: 'ASMR',
    icon: <Headphones className="text-lime-500 mr-2 h-5 w-5" />,
    color: 'lime'
  },
  trends: {
    name: 'Trends',
    icon: <TrendingUp className="text-orange-500 mr-2 h-5 w-5" />,
    color: 'orange'
  },
  guides: {
    name: 'Guides',
    icon: <FileText className="text-blue-500 mr-2 h-5 w-5" />,
    color: 'blue'
  },
  imageboards: {
    name: 'Imageboards',
    icon: <Image className="text-pink-500 mr-2 h-5 w-5" />,
    color: 'pink'
  },
  vtubers: {
    name: 'VTubers',
    icon: <Video className="text-purple-500 mr-2 h-5 w-5" />,
    color: 'purple'
  },
  amvs: {
    name: 'AMVs',
    icon: <Video className="text-indigo-500 mr-2 h-5 w-5" />,
    color: 'indigo'
  },
  forums: {
    name: 'Forums',
    icon: <MessageSquare className="text-green-500 mr-2 h-5 w-5" />,
    color: 'green'
  }
};
