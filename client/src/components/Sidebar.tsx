import { Link, useLocation } from "wouter";
import { 
  HomeIcon, 
  SkullIcon, 
  ClipboardListIcon, 
  BookIcon, 
  InfoIcon 
} from "lucide-react";

export function Sidebar() {
  const [location] = useLocation();
  
  const navItems = [
    {
      name: "Home",
      icon: <HomeIcon className="w-5 h-5" />,
      href: "/"
    },
    {
      name: "Graveyard",
      icon: <SkullIcon className="w-5 h-5" />,
      href: "/graveyard"
    },
    {
      name: "Changelog",
      icon: <ClipboardListIcon className="w-5 h-5" />,
      href: "/changelog"
    },
    {
      name: "Articles",
      icon: <BookIcon className="w-5 h-5" />,
      href: "/articles"
    },
    {
      name: "About & Info",
      icon: <InfoIcon className="w-5 h-5" />,
      href: "/about"
    }
  ];
  
  return (
    <div className="fixed left-0 top-0 bottom-0 w-56 bg-neutral-900 text-white z-40 flex flex-col">
      <div className="p-4 flex items-center justify-center border-b border-neutral-800">
        <div className="text-xl font-bold">EverythingMoe</div>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-1 p-2">
          {navItems.map((item) => {
            const isActive = (
              item.href === "/" ? location === "/" : location.startsWith(item.href)
            );
            
            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <div className={`flex items-center space-x-3 p-3 rounded-md transition-colors cursor-pointer ${
                    isActive 
                      ? "bg-neutral-800 text-primary" 
                      : "text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100"
                  }`}>
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}