import { Star, Tv, Book, BookOpen, Film, Gamepad, Smartphone, Music, 
  Download, Calendar, Database, Wrench, HelpCircle, TrendingUp, FileText, 
  Image, Video, MessageSquare, Link } from "lucide-react";

export const CATEGORIES: Record<string, { name: string, icon: JSX.Element, color: string }> = {
  featured: {
    name: 'Featured',
    icon: <Star className="text-yellow-500 mr-2 h-5 w-5" />,
    color: 'yellow'
  },
  anime: {
    name: 'Anime',
    icon: <Tv className="text-purple-500 mr-2 h-5 w-5" />,
    color: 'purple'
  },
  manga: {
    name: 'Manga',
    icon: <Book className="text-red-500 mr-2 h-5 w-5" />,
    color: 'red'
  },
  novels: {
    name: 'Novels',
    icon: <BookOpen className="text-blue-500 mr-2 h-5 w-5" />,
    color: 'blue'
  },
  dramas: {
    name: 'Dramas',
    icon: <Film className="text-pink-500 mr-2 h-5 w-5" />,
    color: 'pink'
  },
  games: {
    name: 'Games',
    icon: <Gamepad className="text-green-500 mr-2 h-5 w-5" />,
    color: 'green'
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
    icon: <Music className="text-orange-500 mr-2 h-5 w-5" />,
    color: 'orange'
  },
  schedules: {
    name: 'Schedules',
    icon: <Calendar className="text-lime-500 mr-2 h-5 w-5" />,
    color: 'lime'
  },
  databases: {
    name: 'Databases',
    icon: <Database className="text-gray-500 mr-2 h-5 w-5" />,
    color: 'gray'
  },
  tools: {
    name: 'Tools',
    icon: <Wrench className="text-teal-500 mr-2 h-5 w-5" />,
    color: 'teal'
  },
  quizzes: {
    name: 'Quizzes',
    icon: <HelpCircle className="text-yellow-500 mr-2 h-5 w-5" />,
    color: 'yellow'
  },
  trends: {
    name: 'Trends',
    icon: <TrendingUp className="text-rose-500 mr-2 h-5 w-5" />,
    color: 'rose'
  },
  guides: {
    name: 'Guides',
    icon: <FileText className="text-blue-500 mr-2 h-5 w-5" />,
    color: 'blue'
  },
  imageboards: {
    name: 'Imageboards',
    icon: <Image className="text-purple-500 mr-2 h-5 w-5" />,
    color: 'purple'
  },
  vtubers: {
    name: 'VTubers',
    icon: <Video className="text-pink-500 mr-2 h-5 w-5" />,
    color: 'pink'
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
