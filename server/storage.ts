import { Link, InsertLink, links, type User, type InsertUser, users, type ContactMessage, type InsertContactMessage, contactMessages } from "@shared/schema";

// Interface with all the CRUD methods we need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Link methods
  getAllLinks(): Promise<Link[]>;
  getLink(id: number): Promise<Link | undefined>;
  createLink(link: InsertLink & { createdAt: string, featured: boolean }): Promise<Link | null>;
  updateLink(link: Link): Promise<Link>;
  updateLinkFeatured(id: number, featured: boolean): Promise<Link | undefined>;
  deleteLink(id: number): Promise<boolean>;
  getFeaturedLinks(): Promise<Link[]>;
  getLinksByCategory(category: string): Promise<Link[]>;
  searchLinks(query: string): Promise<Link[]>;
  
  // Contact message methods
  getAllContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markContactMessageAsRead(id: number): Promise<ContactMessage | undefined>;
  deleteContactMessage(id: number): Promise<boolean>;
}

import * as fs from 'fs';
import * as path from 'path';

// Define the file path for data persistence
const DATA_FILE = path.join(process.cwd(), 'links.json');

// Helper function to load data from file with caching
let cachedData: any = null;
let lastLoadTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function loadFromFile(): any {
  try {
    const now = Date.now();
    // Return cached data if it's still valid
    if (cachedData && (now - lastLoadTime) < CACHE_DURATION) {
      return cachedData;
    }

    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      cachedData = JSON.parse(data);
      lastLoadTime = now;
      return cachedData;
    }
  } catch (error) {
    console.error('Error loading data from file:', error);
  }
  return null;
}

// Helper function to save data to file
function saveToFile(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    // Update cache after saving
    cachedData = data;
    lastLoadTime = Date.now();
  } catch (error) {
    console.error('Error saving data to file:', error);
  }
}

// Add cache for tools category
let toolsCache: Link[] | null = null;
let toolsCacheTime: number = 0;
const TOOLS_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

class MemStorage implements IStorage {
  private users: Map<number, User>;
  private links: Map<number, Link>;
  private contactMessages: Map<number, ContactMessage>;
  private userId: number;
  private linkId: number;
  private contactMessageId: number;

  constructor() {
    // Initialize with empty maps
    this.users = new Map();
    this.links = new Map();
    this.contactMessages = new Map();
    this.userId = 1;
    this.linkId = 1;
    this.contactMessageId = 1;
    
    // Try to load data from file
    const savedData = loadFromFile();
    if (savedData) {
      if (savedData.links) {
        savedData.links.forEach((link: Link) => {
          this.links.set(link.id, link);
          if (link.id >= this.linkId) {
            this.linkId = link.id + 1;
          }
        });
        console.log(`Loaded ${this.links.size} links from file storage`);
      }
      
      if (savedData.users) {
        savedData.users.forEach((user: User) => {
          this.users.set(user.id, user);
          if (user.id >= this.userId) {
            this.userId = user.id + 1;
          }
        });
      }
      
      if (savedData.contactMessages) {
        savedData.contactMessages.forEach((message: ContactMessage) => {
          this.contactMessages.set(message.id, message);
          if (message.id >= this.contactMessageId) {
            this.contactMessageId = message.id + 1;
          }
        });
      }
    }
    
    // Initialize with links for Anime category
    // Add all anime websites to the initial data
    const animeLinks = [
      { url: "https://www.animekai.com", title: "AnimeKai", description: "Free anime streaming website" },
      { url: "https://animepahe.com", title: "animepahe", description: "High-quality anime streaming site" },
      { url: "https://www.hianime.com", title: "HiAnime", description: "Popular anime streaming platform" },
      { url: "https://www.animez.com", title: "AnimeZ", description: "Anime streaming with large collection" },
      { url: "https://www.crunchyroll.com", title: "Crunchyroll", description: "Legal anime streaming service with free tier" },
      { url: "https://www.youtube.com", title: "YouTube", description: "Video platform with anime content" },
      { url: "https://www.animestream.com", title: "AnimeStream", description: "Free anime streaming site" },
      { url: "https://www.kickassanime.com", title: "KickAssAnime", description: "Anime streaming with minimal ads" },
      { url: "https://www.animeowl.com", title: "AnimeOwl", description: "Free anime streaming site" },
      { url: "https://www.wco.tv", title: "WCO", description: "Watch Cartoon Online also has anime" },
      { url: "https://www.animegg.org", title: "ANIMEGG", description: "Free anime streaming site" },
      { url: "https://www.animenexus.com", title: "Anime Nexus", description: "Anime streaming platform" },
      { url: "https://www.animeonsen.com", title: "AnimeOnsen", description: "Free anime streaming site" },
      { url: "https://www.animeheaven.eu", title: "AnimeHeaven", description: "Popular anime streaming site" },
      { url: "https://www.bilibili.com", title: "Bilibili", description: "Chinese video sharing platform with anime" },
      { url: "https://www.hikari.com", title: "Hikari", description: "Anime streaming website" },
      { url: "https://www.allanime.com", title: "AllAnime", description: "Comprehensive anime streaming platform" },
      { url: "https://www.sudatchi.com", title: "Sudatchi", description: "Free anime streaming site" },
      { url: "https://www.animedefenders.com", title: "Anime defenders", description: "Anime streaming website" },
      { url: "https://www.anizone.com", title: "AniZone", description: "Free anime streaming platform" },
      { url: "https://www.miruro.com", title: "Miruro MULT", description: "Multilanguage anime streaming site" },
      { url: "https://www.gojo.com", title: "Gojo MULT", description: "Multilanguage anime platform" },
      { url: "https://www.shiroko.com", title: "Shiroko MULT", description: "Multilanguage anime streaming" },
      { url: "https://animixplay.name", title: "animixplay.name HIA", description: "High-quality anime streaming" },
      { url: "https://www.animeparadise.com", title: "AnimeParadise HIA", description: "High-quality anime content" },
      { url: "https://www.hidive.com", title: "HIDIVE", description: "Legal anime streaming service" },
      { url: "https://www.aniworld.com", title: "AniWorld", description: "Anime streaming platform" },
      { url: "https://www.anify.com", title: "Anify", description: "Free anime streaming website" },
      { url: "https://www.kuudere.com", title: "Kuudere", description: "Anime streaming site" },
      { url: "https://www.animehub.com", title: "AnimeHub", description: "Free anime streaming platform" },
      { url: "https://www.kisskh.com", title: "Kisskh", description: "Anime streaming site" },
      { url: "https://www.kawaiifu.com", title: "Kawaiifu", description: "Free anime streaming" },
      { url: "https://www.anime-stream.com", title: "Anime-Stream", description: "Anime streaming website" },
      { url: "https://www.aniplay.com", title: "AniPlay MULT", description: "Multilanguage anime streaming" },
      { url: "https://www.animerealms.com", title: "Anime Realms MULT", description: "Multilanguage anime platform" },
      { url: "https://www.vumeto.com", title: "Vumeto MULT", description: "Multilanguage anime content" },
      { url: "https://www.anikoto.com", title: "Anikoto MULT", description: "Multilanguage anime site" },
      { url: "https://www.animelon.com", title: "Animelon", description: "Learn Japanese while watching anime" },
      { url: "https://www.otaku-streamers.com", title: "Otaku-Streamers LOGIN", description: "Anime streaming with login required" },
      { url: "https://www.animehi.com", title: "AnimeHi MULT", description: "Multilanguage anime platform" },
      { url: "https://www.animia.com", title: "Animia MULT", description: "Multilanguage anime site" },
      { url: "https://www.aniversehd.com", title: "AniverseHD MULT", description: "HD multilanguage anime content" },
      { url: "https://aniwave.lv", title: "aniwave.lv HIA", description: "High-quality anime streaming" },
      { url: "https://www.freek.com", title: "Freek HIA", description: "Free anime streaming site" }
    ];
    
    // List of popular anime sites to feature
    const popularAnimeSites = [
      "https://www.crunchyroll.com",
      "https://www.bilibili.com",
      "https://www.youtube.com",
      "https://www.hidive.com",
      "https://animepahe.com",
      "https://www.animeheaven.eu",
      "https://animestream.name",
      "https://aniwave.lv"
    ];

    // Add all anime links
    for (const link of animeLinks) {
      this.createLink({
        url: link.url,
        title: link.title,
        description: link.description,
        category: "anime",
        tags: ["anime", "streaming"],
        nsfw: false,
        createdAt: new Date().toISOString(),
        featured: popularAnimeSites.includes(link.url) // Mark popular sites as featured
      } as InsertLink & { createdAt: string, featured: boolean });
    }
    
    // Add hentai websites (NSFW content)
    const hentaiWebsites = [
      { url: "https://hanime.tv", title: "Hanime.tv", description: "A popular streaming site offering high-quality hentai videos with a clean interface" },
      { url: "https://hentai.tv", title: "hentai.tv", description: "A platform focused on hentai streaming with a variety of animated content" },
      { url: "https://hentaihaven.xxx", title: "hentaihaven", description: "A legendary name in free hentai streaming with classic and new titles" },
      { url: "https://hentaicity.com", title: "HentaiCity", description: "A hub for hentai videos and manga with a decent selection of episodes" },
      { url: "https://haho.moe", title: "haho.moe", description: "A site offering hentai streams and downloads with niche content" },
      { url: "https://watchhentai.net", title: "WatchHentai", description: "A free streaming site with English-subtitled hentai clips and series" },
      { url: "https://hentaverse.net", title: "Hentaverse", description: "Known for extensive hentai video collection and community features" },
      { url: "https://underhentai.net", title: "UnderHentai DDL", description: "Specializes in direct download links alongside streaming options" },
      { url: "https://oppai.stream", title: "oppai.stream", description: "A streaming-focused site with an emphasis on high-quality hentai" },
      { url: "https://hstream.moe", title: "HStream.moe", description: "Offers ad-free 1080p streaming and downloads with some 4K upscales" },
      { url: "https://hentaistream.com", title: "HentaiStream", description: "A long-standing site for streaming hentai with download options" },
      { url: "https://hentaiplay.net", title: "HentaiPlay", description: "A free platform with uncensored hentai videos and manga" },
      { url: "https://hentaistream.me", title: "HentaiStream.me", description: "A reliable option for streaming enthusiasts with a varied library" },
      { url: "https://myhentaimovie.com", title: "MyHentaiMovie", description: "Focuses on full-length hentai movies rather than episodic content" },
      { url: "https://onlyhentaistuff.com", title: "OnlyHentaiStuff", description: "A site curating exclusive hentai videos and images" },
      { url: "https://hentaiworld.tv", title: "HentaiWorld", description: "A free streaming site with robust collection optimized for high-quality playback" },
      { url: "https://hentai2w.com", title: "Hentai2W", description: "Combines streaming with community aspects and interactive features" },
      { url: "https://hentaimama.io", title: "HentaiMama", description: "A modern site with clean layout and calendar of upcoming releases" },
      { url: "https://hentai0.com", title: "Hentai0.com", description: "A newer platform providing streams and downloads with growing library" },
      { url: "https://iwara.tv", title: "Iwara", description: "A unique platform hosting user-uploaded 3D hentai animations" },
      { url: "https://hentaifox.tv", title: "HentaiFox.tv", description: "Offers hentai videos and manga with massive tag list for easy browsing" },
      { url: "https://hentaibros.net", title: "Hentaibros", description: "A free site with latest episodes and older classics" },
      { url: "https://aki-h.com", title: "Aki-H", description: "A niche site focusing on specific hentai genres or artists" },
      { url: "https://hentai-for.me", title: "hentai-for.me", description: "A straightforward streaming site for quick access" },
      { url: "https://eshentai.com", title: "ESHentai", description: "Offers a mix of manga and videos with focus on free, high-quality content" },
      { url: "https://xanimeporn.com", title: "Xanimeporn", description: "A YouTube-like platform for hentai with subbed and dubbed options" },
      { url: "https://hentaini.com", title: "Hentaini", description: "Provides streaming and downloads with regular updates" },
      { url: "https://hentaifreak.org", title: "HentaiFreak", description: "Known for HD streams and diverse categories including unusual fetishes" },
      { url: "https://hanime1.me", title: "Hanime1.me", description: "An alternative to Hanime.tv with similar high-quality streaming" },
      { url: "https://hentaimoon.com", title: "HentaiMoon", description: "A free streaming site with Spanish-subbed options for broader appeal" },
      { url: "https://mitestream.com", title: "MiteStream", description: "A lesser-known site offering streams with focus on niche content" },
      { url: "https://hentaiser.com", title: "hentaiser", description: "Streams hentai with a simple interface and navigation" },
      { url: "https://muchohentai.com", title: "MuchoHentai", description: "Features Spanish-subbed hentai alongside English with preview section" },
      { url: "https://hentaicloud.com", title: "HentaiCloud", description: "Offers free videos and manga with cloud-based streaming for fast loading" },
      { url: "https://hentaigasm.com", title: "Hentaigasm", description: "A vast library with genre-based navigation and straightforward design" },
      { url: "https://hentia.com", title: "Hentia", description: "Provides standard hentai streaming with basic setup" },
      { url: "https://hentaisea.com", title: "Hentaisea", description: "A free platform with streaming and downloadable content" }
    ];
    
    // List of popular hentai sites to feature
    const popularHentaiSites = [
      "https://hanime.tv",
      "https://hentaihaven.xxx",
      "https://hentaiworld.tv",
      "https://iwara.tv",
      "https://hentaifox.tv",
      "https://hentaifreak.org",
      "https://hanime1.me"
    ];
    
    // Add all hentai websites
    for (const site of hentaiWebsites) {
      this.createLink({
        url: site.url,
        title: site.title,
        description: site.description,
        category: "anime",
        tags: ["anime", "hentai", "nsfw"],
        nsfw: true,
        createdAt: new Date().toISOString(),
        featured: popularHentaiSites.includes(site.url) // Mark popular sites as featured
      } as InsertLink & { createdAt: string, featured: boolean });
    }
    
    // Add download sites
    const downloadSites = [
      {
        url: "https://nyaa.si",
        title: "Nyaa",
        description: "A popular BitTorrent community focused on East Asian media, including anime, manga, and games.",
        tags: ["torrent", "anime", "manga", "games"]
      },
      {
        url: "https://animetosho.org",
        title: "AnimeTosho",
        description: "An automated service that mirrors torrents from Nyaa, providing direct download links and Usenet integration.",
        tags: ["torrent", "anime", "usenet"]
      },
      {
        url: "https://anidex.info",
        title: "AniDex",
        description: "A torrent tracker and indexer for anime-related content, supporting both torrents and XDCC downloads.",
        tags: ["torrent", "anime", "xdcc"]
      },
      {
        url: "https://subsplease.org",
        title: "SubsPlease",
        description: "Provides timely releases of anime episodes with English subtitles, offering both torrent and XDCC download options.",
        tags: ["torrent", "anime", "subtitles", "xdcc"]
      },
      {
        url: "https://tokyotosho.info",
        title: "Tokyo Toshokan",
        description: "A BitTorrent library for Japanese media, including anime, manga, and music.",
        tags: ["torrent", "anime", "manga", "music"]
      },
      {
        url: "https://www.cdjapan.co.jp",
        title: "CDJapan",
        description: "An online retailer offering physical copies of Japanese CDs, DVDs, Blu-rays, and other merchandise.",
        tags: ["official", "physical", "merchandise"]
      },
      {
        url: "https://releases.moe",
        title: "SeaDex",
        description: "A torrent tracker dedicated to Southeast Asian media, including anime and drama series.",
        tags: ["torrent", "anime", "drama"]
      },
      {
        url: "https://sneedex.moe",
        title: "Sneedex",
        description: "A platform offering a variety of anime torrents for download.",
        tags: ["torrent", "anime"]
      },
      {
        url: "https://tokyoinsider.com",
        title: "TokyoInsider",
        description: "Provides direct download links for various Japanese media, including anime and music.",
        tags: ["direct download", "anime", "music"]
      },
      {
        url: "https://mangazip.net",
        title: "MangaZip",
        description: "Offers raw (untranslated) manga for direct download.",
        tags: ["direct download", "manga", "raw"]
      },
      {
        url: "https://dlraw.net",
        title: "DLRaw",
        description: "Provides raw manga scans and light novels for download.",
        tags: ["direct download", "manga", "light novel", "raw"]
      },
      {
        url: "https://dl-raw.net",
        title: "DL-Raw",
        description: "Another source for downloading raw manga and light novels.",
        tags: ["direct download", "manga", "light novel", "raw"]
      },
      {
        url: "https://hi10anime.com",
        title: "Hi10Anime",
        description: "Specializes in high-quality, compressed anime releases in 10-bit color depth, requiring user registration for access.",
        tags: ["direct download", "anime", "high quality"]
      },
      {
        url: "https://animeout.xyz",
        title: "AnimeOut",
        description: "Offers direct downloads of anime series and movies in various resolutions, with registration required.",
        tags: ["direct download", "anime", "movies"]
      },
      {
        url: "https://kayoanime.com",
        title: "KayoAnime",
        description: "Provides direct download links for anime series and movies.",
        tags: ["direct download", "anime", "movies"]
      },
      {
        url: "https://mkvseries.com",
        title: "MKVseries",
        description: "Hosts a collection of anime series available for direct download in MKV format.",
        tags: ["direct download", "anime", "mkv"]
      },
      {
        url: "https://moriyashrine.org",
        title: "Moriya Shrine",
        description: "Dedicated to Touhou Project content, offering games, music, and related media for download.",
        tags: ["direct download", "games", "touhou", "music"]
      },
      {
        url: "https://pandabackup.com",
        title: "Panda Backup",
        description: "Provides backup links for various anime series and movies.",
        tags: ["direct download", "anime", "backup"]
      },
      {
        url: "https://animk.info",
        title: "AniMK",
        description: "An XDCC bot offering anime series and movies for download via IRC.",
        tags: ["xdcc", "irc", "anime"]
      },
      {
        url: "https://nibl.co.uk",
        title: "nibl.co.uk",
        description: "Hosts XDCC bots providing anime downloads through IRC channels.",
        tags: ["xdcc", "irc", "anime"]
      },
      {
        url: "https://beatrice-raws.org",
        title: "Beatrice-Raws",
        description: "Offers raw (unsubtitled) anime releases via XDCC.",
        tags: ["xdcc", "anime", "raw"]
      },
      {
        url: "https://shanaproject.com",
        title: "Shana Project",
        description: "Automates anime torrent downloads by allowing users to subscribe to their favorite series.",
        tags: ["torrent", "anime", "subscription"]
      },
      {
        url: "https://acgnx.se",
        title: "AcgnX",
        description: "A platform offering a variety of anime torrents.",
        tags: ["torrent", "anime"]
      },
      {
        url: "https://sakuracircle.com",
        title: "SakuraCircle",
        description: "Provides direct download links for anime.",
        tags: ["direct download", "anime"]
      },
      {
        url: "https://acg.rip",
        title: "ACG.RIP",
        description: "Hosts a collection of anime torrents for download.",
        tags: ["torrent", "anime"]
      },
      {
        url: "https://anirena.com",
        title: "AniRena",
        description: "A torrent tracker focusing on anime series and movies.",
        tags: ["torrent", "anime", "movies"]
      },
      {
        url: "https://bangumi.moe",
        title: "Bangumi.moe",
        description: "Offers a selection of anime torrents for download.",
        tags: ["torrent", "anime"]
      },
      {
        url: "https://nipponsei.minglong.org",
        title: "Nipponsei",
        description: "Specializes in anime music releases available via XDCC.",
        tags: ["xdcc", "anime", "music"]
      },
      {
        url: "https://dkb.io",
        title: "DKB",
        description: "Provides direct download links for various anime series.",
        tags: ["direct download", "anime"]
      },
      {
        url: "https://flugelanime.com",
        title: "Flugel Anime",
        description: "Hosts a collection of anime series and movies available for direct download.",
        tags: ["direct download", "anime", "movies"]
      },
      {
        url: "https://noobsubs.com",
        title: "NoobSubs",
        description: "Offers direct downloads of anime series with a focus on high-quality releases.",
        tags: ["direct download", "anime", "high quality"]
      },
      {
        url: "https://animekaizoku.com",
        title: "AnimeKaizoku",
        description: "Provides direct download links for anime series and movies.",
        tags: ["direct download", "anime", "movies"]
      },
      {
        url: "https://toonworld4all.me",
        title: "ToonWorld4All",
        description: "Hosts a variety of animated series, including anime, available for direct download.",
        tags: ["direct download", "anime", "cartoons"]
      },
      {
        url: "https://cartoonsarea.com",
        title: "CartoonsArea",
        description: "Offers direct downloads of various animated series, including anime.",
        tags: ["direct download", "anime", "cartoons"]
      },
      {
        url: "https://toonshub.com",
        title: "ToonsHub",
        description: "Provides direct download links for anime and other animated series.",
        tags: ["direct download", "anime", "cartoons"]
      },
      {
        url: "https://coolsanime.me",
        title: "CoolsAnime",
        description: "Hosts a collection of anime series and movies available for direct download.",
        tags: ["direct download", "anime", "movies"]
      },
      {
        url: "https://animerss.com",
        title: "AnimeRss",
        description: "Provides raw anime episodes for direct download.",
        tags: ["direct download", "anime", "raw"]
      },
      {
        url: "https://jpfiles.eu",
        title: "JPFiles",
        description: "Offers raw Japanese media files, including anime, for direct download.",
        tags: ["direct download", "anime", "raw", "japanese"]
      },
      {
        url: "https://chauthanh.info",
        title: "Chauthanh",
        description: "Hosts a variety of anime series and movies available for direct download.",
        tags: ["direct download", "anime", "movies"]
      },
      {
        url: "https://deadtoons.co",
        title: "DeadToons",
        description: "Provides direct download links for various animated series, including anime.",
        tags: ["direct download", "anime", "cartoons"]
      },
      {
        url: "https://anilot.org",
        title: "Anilot",
        description: "Offers direct downloads of anime series and movies.",
        tags: ["direct download", "anime", "movies"]
      },
      {
        url: "https://anidl.org",
        title: "AniDL",
        description: "Hosts a collection of anime series available for direct download.",
        tags: ["direct download", "anime"]
      },
      {
        url: "https://animetime.pl",
        title: "Anime Time",
        description: "Provides a platform to watch anime series online.",
        tags: ["anime", "streaming"]
      }
    ];
    
    // List of popular download sites to feature
    const popularDownloadSites = [
      "https://nyaa.si",
      "https://animetosho.org",
      "https://subsplease.org",
      "https://tokyotosho.info",
      "https://www.cdjapan.co.jp",
      "https://hi10anime.com"
    ];
    
    // Add download links
    for (const site of downloadSites) {
      this.createLink({
        url: site.url,
        title: site.title,
        description: site.description,
        category: "downloads",
        tags: site.tags,
        nsfw: false,
        createdAt: new Date().toISOString(),
        featured: popularDownloadSites.includes(site.url) // Mark popular sites as featured
      } as InsertLink & { createdAt: string, featured: boolean });
    }
    
    // Add manga site with featured status
    this.createLink({
      url: "https://mangaplus.shueisha.co.jp",
      title: "Manga Plus",
      description: "Read manga officially from Shueisha",
      category: "manga",
      tags: ["reading", "official"],
      nsfw: false,
      createdAt: new Date().toISOString(),
      featured: true
    } as InsertLink & { createdAt: string, featured: boolean });
    
    // Add NSFW manga site
    this.createLink({
      url: "https://nhentai.net",
      title: "nHentai",
      description: "Popular site for manga with adult content",
      category: "manga",
      tags: ["manga", "hentai", "nsfw"],
      nsfw: true,
      createdAt: new Date().toISOString(),
      featured: true
    } as InsertLink & { createdAt: string, featured: boolean });
    
    // NSFW manga sites
    const nsfwMangaSites = [
      { url: "https://e-hentai.org", title: "E-Hentai", description: "Large adult manga collection with a variety of categories", tags: ["manga", "hentai", "doujinshi", "nsfw"] },
      { url: "https://hentaifox.com", title: "HentaiFox", description: "Popular doujinshi and manga site with adult content", tags: ["manga", "doujinshi", "nsfw"] },
      { url: "https://hitomi.la", title: "Hitomi.la", description: "Adult manga and doujinshi repository", tags: ["manga", "doujinshi", "nsfw"] }
    ];
    
    // Add NSFW manga sites
    for (const site of nsfwMangaSites) {
      this.createLink({
        url: site.url,
        title: site.title,
        description: site.description,
        category: "manga",
        tags: site.tags,
        nsfw: true,
        createdAt: new Date().toISOString(),
        featured: site.url === "https://e-hentai.org" // Feature E-Hentai as a popular site
      } as InsertLink & { createdAt: string, featured: boolean });
    }

    const movieLinks = [
      { url: "https://www.cineby.app/", title: "Cineby Movie Streaming", description: "Streams movies and TV shows for free with subtitles." },
      { url: "https://www.bitcine.app/", title: "BitCine Movie Streaming", description: "Offers free streaming of movies and series." },
      { url: "https://www.fmovies.cat/", title: "FMovies Movie Streaming", description: "Provides free streaming of movies and TV shows." },
      { url: "https://hexa.watch/", title: "Hexa Watch Movie Streaming", description: "Streams movies and series for free with a clean interface." },
      { url: "https://xprime.tv/", title: "XPrime Movie Streaming", description: "Offers free streaming of movies and TV content." },
      { url: "https://watch.bludclart.com/", title: "BludClart Movie Streaming", description: "Streams movies and shows for free with subtitles." },
      { url: "https://watch.streamflix.one/", title: "StreamFlix Movie Streaming", description: "Provides free streaming of movies and series." },
      { url: "https://cinemaos.live/", title: "CinemaOS Live Movie Streaming", description: "Streams movies and TV shows for free." },
      { url: "https://cinemaos-v3.vercel.app/", title: "CinemaOS V3 Movie Streaming", description: "Alternative CinemaOS domain for free movie streaming." },
      { url: "https://veloratv.ru/", title: "VeloraTV Movie Streaming", description: "Streams movies and TV content for free." },
      { url: "https://456movie.net/", title: "456Movie Movie Streaming", description: "Offers free streaming of movies and series." },
      { url: "https://345movie.net/", title: "345Movie Movie Streaming", description: "Provides free movie and TV show streaming." },
      { url: "https://watch.spencerdevs.xyz/", title: "SpencerDevs Movie Streaming", description: "Streams movies and shows for free with subtitles." },
      { url: "https://flixer.su/", title: "Flixer Movie Streaming", description: "Offers free streaming of movies and TV series." },
      { url: "https://flickystream.net/", title: "FlickyStream Movie Streaming", description: "Streams movies and shows for free with a modern interface." },
      { url: "https://www.1shows.ru/", title: "1Shows Movie Streaming", description: "Provides free streaming of movies and TV shows." },
      { url: "https://www.rgshows.me/", title: "RGShows Movie Streaming", description: "Streams movies and series for free with subtitle support." },
      { url: "https://vidbox.to/", title: "VidBox Movie Streaming", description: "Offers free streaming of movies and TV content." },
      { url: "https://rivestream.org/", title: "Rivestream Movie Streaming", description: "Streams movies and shows for free via Rivestream platform." },
      { url: "https://rivestream.xyz/", title: "Rivestream XYZ Movie Streaming", description: "Alternative Rivestream domain for free movie streaming." },
      { url: "https://cinemaos-v2.vercel.app/", title: "CinemaOS V2 Movie Streaming", description: "Another CinemaOS domain for free movie streaming." },
      { url: "https://rivestream.net/", title: "Rivestream Net Movie Streaming", description: "Streams movies and series for free on Rivestream." },
      { url: "https://beech.watch/", title: "Beech Watch Movie Streaming", description: "Offers free streaming of movies and TV shows." },
      { url: "https://mocine.cam/", title: "MoCine Movie Streaming", description: "Streams movies and series for free with subtitles." },
      { url: "https://watch.vidora.su/", title: "Vidora Movie Streaming", description: "Provides free streaming of movies and TV content." },
      { url: "https://willow.arlen.icu/", title: "Willow Movie Streaming", description: "Streams movies and shows for free with a simple interface." },
      { url: "https://salix.pages.dev/", title: "Salix Movie Streaming", description: "Offers free streaming of movies and series." },
      { url: "https://asgardstream.xyz/", title: "AsgardStream Movie Streaming", description: "Streams movies and TV shows for free with subtitles." },
      { url: "https://uira.live/", title: "Uira Live Movie Streaming", description: "Provides free streaming of movies and series." },
      { url: "https://netplayz.ru/", title: "NetPlayz Movie Streaming", description: "Streams movies and TV content for free." },
      { url: "https://nunflix.org/", title: "NunFlix Movie Streaming", description: "Offers free streaming of movies and TV shows." },
      { url: "https://nunflix-firebase.web.app/", title: "NunFlix Firebase Movie Streaming", description: "Alternative NunFlix domain for free movie streaming." },
      { url: "https://nunflix-ey9.pages.dev/", title: "NunFlix EY9 Movie Streaming", description: "Another NunFlix domain for free movie streaming." },
      { url: "https://nunflix-firebase.firebaseapp.com/", title: "NunFlix Firebase App Movie Streaming", description: "Streams movies for free via NunFlix Firebase platform." },
      { url: "https://nunflix-doc.pages.dev/", title: "NunFlix Doc Movie Streaming", description: "Provides free streaming of movies on NunFlix." },
      { url: "https://moviemaze.cc/", title: "MovieMaze Movie Streaming", description: "Streams movies and series for free with subtitles." },
      { url: "https://ee3.me/", title: "EE3 Movie Streaming", description: "Offers free streaming of movies and TV shows." },
      { url: "https://rips.cc/", title: "Rips Movie Streaming", description: "Provides free streaming of movies and series." },
      { url: "https://hydrahd.sh/", title: "HydraHD Movie Streaming", description: "Streams movies and TV shows for free with subtitles." },
      { url: "https://hydrahd.info/", title: "HydraHD Info Movie Streaming", description: "Alternative HydraHD domain for free movie streaming." },
      { url: "https://popcornmovies.org/", title: "PopcornMovies Movie Streaming", description: "Offers free streaming of movies and series." },
      { url: "https://vidjoy.pro/", title: "VidJoy Movie Streaming", description: "Streams movies and TV content for free." },
      { url: "https://mapple.tv/", title: "Mapple TV Movie Streaming", description: "Provides free streaming of movies and shows." },
      { url: "https://maxflix.top/", title: "MaxFlix Movie Streaming", description: "Streams movies and series for free with subtitles." },
      { url: "https://bingeflix.tv/", title: "BingeFlix Movie Streaming", description: "Offers free streaming of movies and TV shows." },
      { url: "https://movies.7xtream.com/", title: "7Xtream Movies Streaming", description: "Streams movies for free via 7Xtream platform." },
      { url: "https://cinema.7xtream.com/", title: "7Xtream Cinema Streaming", description: "Provides free movie streaming on 7Xtream." },
      { url: "https://movies2.7xtream.com/", title: "7Xtream Movies2 Streaming", description: "Alternative 7Xtream domain for free movie streaming." },
      { url: "https://nepu.to/", title: "Nepu Movie Streaming", description: "Streams movies and series for free with subtitles." },
      { url: "https://alienflix.net/", title: "AlienFlix Movie Streaming", description: "Offers free streaming of movies and TV shows." },
      { url: "https://hexawatch.cc/", title: "HexaWatch Movie Streaming", description: "Streams movies and series for free with a clean interface." },
      { url: "https://movies7.im/", title: "Movies7 Movie Streaming", description: "Provides free streaming of movies and TV content." },
      { url: "https://redflix.co/", title: "RedFlix Movie Streaming", description: "Streams movies and shows for free with subtitles." },
      { url: "https://enjoytown.pro/", title: "EnjoyTown Movie Streaming", description: "Offers free streaming of movies and series." },
      { url: "https://watch.hopfly.site/", title: "HopFly Movie Streaming", description: "Streams movies and TV shows for free." },
      { url: "https://neoxa.transdev.pw/", title: "Neoxa Movie Streaming", description: "Provides free streaming of movies and series." },
      { url: "https://lookmovie2.to/", title: "LookMovie2 Movie Streaming", description: "Streams movies and shows for free with subtitles." },
      { url: "https://proxymirrorlookmovie.github.io/", title: "LookMovie Proxy Streaming", description: "Alternative proxy for LookMovie free movie streaming." },
      { url: "https://broflix.si/", title: "BroFlix Movie Streaming", description: "Offers free streaming of movies and TV shows." },
      { url: "https://www.arabiflix.com/", title: "ArabiFlix Movie Streaming", description: "Streams Arabic movies and series for free." },
      { url: "https://www.kaitovault.com/", title: "KaitoVault Movie Streaming", description: "Provides free streaming of movies and TV content." },
      { url: "https://yampi.live/", title: "Yampi Live Movie Streaming", description: "Streams movies and shows for free with subtitles." },
      { url: "https://www.m-zone.org/", title: "M-Zone Movie Streaming", description: "Offers free streaming of movies and series." },
      { url: "https://lekuluent.et/", title: "Lekuluent Movie Streaming", description: "Streams movies and TV shows for free." },
      { url: "https://catflix.su/", title: "CatFlix Movie Streaming", description: "Provides free streaming of movies and series." },
      { url: "https://soaper.top/", title: "Soaper Top Movie Streaming", description: "Streams movies and TV shows for free with subtitles." },
      { url: "https://soaper.vip/", title: "Soaper VIP Movie Streaming", description: "Alternative Soaper domain for free movie streaming." },
      { url: "https://soaper.cc/", title: "Soaper CC Movie Streaming", description: "Streams movies and series for free on Soaper." },
      { url: "https://soaper.live/", title: "Soaper Live Movie Streaming", description: "Offers free streaming of movies and TV shows." },
      { url: "https://www.soaperpage.com/", title: "SoaperPage Movie Streaming", description: "Provides free streaming of movies and series." },
      { url: "https://ridomovies.tv/", title: "RidoMovies Movie Streaming", description: "Streams movies and shows for free with subtitles." },
      { url: "https://cinemadeck.com/", title: "CinemaDeck Movie Streaming", description: "Offers free streaming of movies and TV content." },
      { url: "https://cinemadeck.st/", title: "CinemaDeck ST Movie Streaming", description: "Alternative CinemaDeck domain for free movie streaming." },
      { url: "https://wooflix.tv/", title: "WooFlix Movie Streaming", description: "Streams movies and series for free with subtitles." },
      { url: "https://qstream.pages.dev/", title: "QStream Movie Streaming", description: "Provides free streaming of movies and TV shows." },
      { url: "https://watch.flixindia.site/", title: "FlixIndia Movie Streaming", description: "Streams Indian movies and shows for free." },
      { url: "https://watch2me.site/", title: "Watch2Me Movie Streaming", description: "Offers free streaming of movies and series." },
      { url: "https://smashystream.xyz/", title: "SmashyStream Movie Streaming", description: "Streams movies and TV shows for free with subtitles." },
      { url: "https://flix.smashystream.xyz/", title: "SmashyStream Flix Streaming", description: "Alternative SmashyStream domain for free movie streaming." },
      { url: "https://onionplay.ch/", title: "OnionPlay Movie Streaming", description: "Streams movies and series for free with subtitles." },
      { url: "https://yassflix.net/", title: "YassFlix Movie Streaming", description: "Provides free streaming of movies and TV shows." },
      { url: "https://stigstream.xyz/", title: "StigStream Movie Streaming", description: "Offers free streaming of movies and TV content." },
      { url: "https://stigstream.co.uk/", title: "StigStream UK Movie Streaming", description: "Alternative StigStream domain for free movie streaming." },
      { url: "https://flickermini.pages.dev/", title: "FlickerMini Movie Streaming", description: "Streams movies and series for free with a simple interface." },
      { url: "https://flickeraddon.pages.dev/", title: "FlickerAddon Movie Streaming", description: "Provides free streaming of movies via Flicker platform." },
      { url: "https://mp4hydra.org/", title: "MP4Hydra Movie Streaming", description: "Streams movies and TV shows for free with subtitles." },
      { url: "https://mp4hydra.top/", title: "MP4Hydra Top Movie Streaming", description: "Alternative MP4Hydra domain for free movie streaming." },
      { url: "https://ableflix.xyz/", title: "AbleFlix Movie Streaming", description: "Offers free streaming of movies and series." },
      { url: "https://ableflix.cc/", title: "AbleFlix CC Movie Streaming", description: "Streams movies for free via AbleFlix's CC domain." },
      { url: "https://altair.mollusk.top/", title: "Altair Movie Streaming", description: "Provides free streaming of movies and TV shows." },
      { url: "https://novastream.top/", title: "NovaStream Movie Streaming", description: "Streams movies and series for free with subtitles." },
      { url: "https://nkiri.cc/", title: "Nkiri Movie Streaming", description: "Offers free streaming of movies, including Nollywood titles." },
      { url: "https://soapertv.cc/", title: "SoaperTV Movie Streaming", description: "Streams movies and TV shows for free with subtitles." },
      { url: "https://popcorntimeonline.cc/", title: "PopcornTime Movie Streaming", description: "Provides free streaming of movies and series." },
      { url: "https://streammovies.to/", title: "StreamMovies Movie Streaming", description: "Streams movies and TV content for free." },
      { url: "https://watch.autoembed.cc/", title: "AutoEmbed Movie Streaming", description: "Offers free streaming of movies with embedded players." },
      { url: "https://nextplay.pages.dev/", title: "NextPlay Movie Streaming", description: "Streams movies and series for free with subtitles." },
      { url: "https://netplex-v2.pages.dev/", title: "NetPlex V2 Movie Streaming", description: "Provides free streaming of movies via NetPlex platform." },
      { url: "https://www.showbox.media/", title: "ShowBox Movie Streaming", description: "Streams movies and TV shows for free." },
      { url: "https://uniquestream.net/", title: "UniqueStream Movie Streaming", description: "Offers free streaming of movies and series." },
      { url: "https://streamm4u.com.co/", title: "StreamM4U Movie Streaming", description: "Streams movies and TV shows for free with subtitles." },
      { url: "https://www.watchroo.com/", title: "WatchRoo Movie Streaming", description: "Provides free streaming of movies and series." },
      { url: "https://fireflix.pages.dev/", title: "FireFlix Movie Streaming", description: "Streams movies and TV content for free." },
      { url: "https://www.letstream.site/", title: "LetStream Movie Streaming", description: "Offers free streaming of movies and shows." },
      { url: "https://mokmobi.ovh/", title: "MokMobi OVH Movie Streaming", description: "Streams movies and series for free with subtitles." },
      { url: "https://mokmobi.site/", title: "MokMobi Site Movie Streaming", description: "Alternative MokMobi domain for free movie streaming." },
      { url: "https://net3lix.world/", title: "Net3lix Movie Streaming", description: "Provides free streaming of movies and TV shows." },
      { url: "https://viewvault.org/", title: "ViewVault Movie Streaming", description: "Streams movies and series for free with subtitles." },
      { url: "https://noxe.live/", title: "Noxe Live Movie Streaming", description: "Offers free streaming of movies and TV content." },
      { url: "https://cinego.co/", title: "CineGo Movie Streaming", description: "Streams movies and shows for free with subtitles." },
      { url: "https://bflix.sh/", title: "BFlix Movie Streaming", description: "Provides free streaming of movies and series." },
      { url: "https://www.primewire.tf/", title: "PrimeWire Movie Streaming", description: "Streams movies and TV shows for free with subtitles." },
      { url: "https://novafork.cc/", title: "NovaFork Movie Streaming", description: "Offers free streaming of movies via NovaFork platform." },
      { url: "https://www.levidia.ch/", title: "Levidia Movie Streaming", description: "Streams movies and series for free with subtitles." },
      { url: "https://supernova.to/", title: "SuperNova Movie Streaming", description: "Provides free streaming of movies and TV shows." },
      { url: "https://ww1.goojara.to/", title: "Goojara Movie Streaming", description: "Streams movies and shows for free with subtitles." },
      { url: "https://uflix.to/", title: "UFlix Movie Streaming", description: "Offers free streaming of movies and series." },
      { url: "https://uflix.cc/", title: "UFlix CC Movie Streaming", description: "Alternative UFlix domain for free movie streaming." },
      { url: "https://movies4f.com/", title: "Movies4F Movie Streaming", description: "Streams movies and TV content for free." },
      { url: "https://netplex.site/", title: "NetPlex Site Movie Streaming", description: "Provides free streaming of movies via NetPlex." },
      { url: "https://netplex.pages.dev/", title: "NetPlex Pages Movie Streaming", description: "Streams movies for free on NetPlex's Pages platform." },
      { url: "https://www.pressplay.top/", title: "PressPlay Movie Streaming", description: "Offers free streaming of movies and series." },
      { url: "https://pressplay.cam/", title: "PressPlay Cam Movie Streaming", description: "Streams movies and TV shows for free with subtitles." },
      { url: "https://fsharetv.co/", title: "FShareTV Movie Streaming", description: "Provides free streaming of movies and series." },
      { url: "https://azmovies.ag/", title: "AZMovies Movie Streaming", description: "Streams movies and TV shows for free with subtitles." },
      { url: "https://corsflix.net/", title: "CorsFlix Movie Streaming", description: "Offers free streaming of movies and series." },
      { url: "https://yoyomovies.net/", title: "YoyoMovies Movie Streaming", description: "Streams movies and TV content for free." },
      { url: "https://fmovies-hd.to/", title: "FMovies HD Movie Streaming", description: "Provides free streaming of movies in high quality." },
      { url: "https://slidemovies.org/", title: "SlideMovies Movie Streaming", description: "Streams movies and series for free with subtitles." },
      { url: "https://heartive.pages.dev/", title: "Heartive Movie Streaming", description: "Offers free streaming of movies and TV shows." },
      { url: "https://soapy.to/", title: "Soapy Movie Streaming", description: "Streams movies and series for free with subtitles." },
      { url: "https://yesmovies.ag/", title: "YesMovies Movie Streaming", description: "Provides free streaming of movies and TV content." },
      { url: "https://solarmovieru.com/home.html", title: "SolarMovie Movie Streaming", description: "Streams movies and shows for free with subtitles." },
      { url: "https://zmov.vercel.app/", title: "ZMov Movie Streaming", description: "Offers free streaming of movies via Vercel platform." },
      { url: "https://watch.coen.ovh/", title: "Coen Watch Movie Streaming", description: "Streams movies and series for free with subtitles." },
      { url: "https://plexmovies.online/", title: "PlexMovies Movie Streaming", description: "Provides free streaming of movies and TV shows." },
      { url: "https://watchstream.site/", title: "WatchStream Movie Streaming", description: "Streams movies and series for free with subtitles." },
      { url: "https://wovie.vercel.app/", title: "Wovie Movie Streaming", description: "Offers free streaming of movies via Vercel platform." },
      { url: "https://sflix2.to/", title: "SFlix2 Movie Streaming", description: "Streams movies and TV shows for free with subtitles." },
      { url: "https://hollymoviehd.cc/", title: "HollyMovieHD Movie Streaming", description: "Provides free streaming of movies in high quality." },
      { url: "https://yeshd.net/", title: "YesHD Movie Streaming", description: "Streams movies and series for free with subtitles." },
      { url: "https://novamovie.net/", title: "NovaMovie Movie Streaming", description: "Offers free streaming of movies and TV content." },
      { url: "https://hollymoviehd-official.com/", title: "HollyMovieHD Official Streaming", description: "Streams movies for free via official HollyMovieHD site." },
      { url: "https://projectfreetv.sx/", title: "ProjectFreeTV Movie Streaming", description: "Provides free streaming of movies and series." },
      { url: "https://www.tvids.net/", title: "TVids Movie Streaming", description: "Streams movies and TV shows for free with subtitles." },
      { url: "https://watch-tvseries.net/", title: "WatchTVSeries Movie Streaming", description: "Offers free streaming of movies and TV series." },
      { url: "https://zoechip.org/", title: "ZoeChip Movie Streaming", description: "Streams movies and shows for free with subtitles." },
      { url: "https://www.downloads-anymovies.co/", title: "Downloads AnyMovies Streaming", description: "Provides free streaming and downloads of movies." },
      { url: "https://tubitv.com/", title: "TubiTV Movie Streaming", description: "Streams movies and shows for free with ads legally." },
      { url: "https://watch.plex.tv/", title: "Plex TV Movie Streaming", description: "Offers free, ad-supported movie and TV streaming." },
      { url: "https://pluto.tv/", title: "Pluto TV Movie Streaming", description: "Streams movies and TV shows for free with ads." },
      { url: "https://www.freegreatmovies.com/", title: "FreeGreatMovies Streaming", description: "Provides free streaming of classic movies and shows." },
      { url: "https://vole.wtf/voleflix/", title: "VoleFlix Movie Streaming", description: "Streams movies and series for free with a unique interface." },
      { url: "https://moviesfoundonline.com/", title: "MoviesFoundOnline Streaming", description: "Offers free streaming of public domain movies." },
      { url: "https://www.crackle.com/", title: "Crackle Movie Streaming", description: "Streams movies and shows for free with ads legally." },
      { url: "https://www.amazon.com/gp/video/storefront/?ie=UTF8&contentId=freetv", title: "Amazon FreeTV Streaming", description: "Provides free, ad-supported movies via Amazon." },
      { url: "https://therokuchannel.roku.com/", title: "Roku Channel Movie Streaming", description: "Streams movies and TV shows for free with ads." },
      { url: "https://www.darkroom.film/", title: "DarkRoom Film Streaming", description: "Offers free streaming of independent movies." },
      { url: "https://watch.sling.com/", title: "Sling Free Movie Streaming", description: "Streams free movies and shows with ads via Sling." },
      { url: "https://www.vudu.com/content/movies/uxpage/View-All-Free-Movies-TV/207", title: "Vudu Free Movie Streaming", description: "Provides free, ad-supported movies via Vudu." },
      { url: "https://athome.fandango.com/content/browse/free", title: "Fandango AtHome Free Streaming", description: "Streams free movies and shows with ads." },
      { url: "https://shout-tv.com/", title: "Shout TV Movie Streaming", description: "Provides free streaming of cult movies and shows." },
      { url: "https://kanopy.com/", title: "Kanopy Movie Streaming", description: "Streams free movies with a library card account." },
      { url: "https://www.hoopladigital.com/", title: "Hoopla Digital Movie Streaming", description: "Provides free movie streaming with library access." },
      { url: "https://watch.foundtv.com/", title: "FoundTV Movie Streaming", description: "Streams free movies and TV shows with ads." },
      { url: "https://7plus.com.au/", title: "7Plus Movie Streaming", description: "Offers free streaming of movies and shows in Australia." },
      { url: "https://www.playary.com/", title: "Playary Movie Streaming", description: "Streams movies and series for free with subtitles." },
      { url: "https://filmzie.com/", title: "Filmzie Movie Streaming", description: "Provides free, ad-supported movie and show streaming." },
      { url: "https://fawesome.tv/", title: "Fawesome TV Movie Streaming", description: "Streams movies and TV shows for free with ads." },
      { url: "https://www.arte.tv/en", title: "Arte TV Movie Streaming", description: "Streams free European movies and shows." },
      { url: "https://www.bbc.co.uk/iplayer", title: "BBC iPlayer Movie Streaming", description: "Streams free movies and shows for UK residents." },
      { url: "https://moviexfilm.com/", title: "MovieXFilm Movie Streaming", description: "Streams movies and series for free with subtitles." },
      { url: "https://flixhouse.com/", title: "FlixHouse Movie Streaming", description: "Offers free streaming of independent movies and shows." }
    ];

    // Add all movie links
    for (const link of movieLinks) {
      this.createLink({
        url: link.url,
        title: link.title,
        description: link.description,
        category: "movie",
        tags: ["movie", "streaming"],
        nsfw: false,
        createdAt: new Date().toISOString(),
        featured: false
      } as InsertLink & { createdAt: string, featured: boolean });
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Link methods
  async getAllLinks(): Promise<Link[]> {
    return Array.from(this.links.values());
  }

  async getLink(id: number): Promise<Link | undefined> {
    return this.links.get(id);
  }

  async createLink(link: InsertLink & { createdAt: string, featured: boolean }): Promise<Link | null> {
    const data = loadFromFile();
    if (!data) {
      throw new Error('Failed to load data');
    }

    // Check if link with same URL already exists
    const existingLink = data.links.find((l: Link) => l.url === link.url);
    if (existingLink) {
      console.log(`Link with URL ${link.url} already exists, skipping...`);
      return existingLink;
    }

    // Skip if it's a movie category link with anime tags
    if (link.category === 'movie' && link.tags && link.tags.some(tag => tag.toLowerCase().includes('anime'))) {
      console.log(`Skipping movie link with anime tags: ${link.url}`);
      return null;
    }

    const newLink: Link = {
      id: data.links.length + 1,
      url: link.url,
      title: link.title,
      description: link.description || null,
      category: link.category,
      tags: link.tags || null,
      nsfw: link.nsfw || null,
      createdAt: link.createdAt,
      featured: link.featured,
      views: 0
    };

    data.links.push(newLink);
    saveToFile(data);
    return newLink;
  }
  
  // Helper method to save all data to file
  private saveData() {
    const data = {
      links: Array.from(this.links.values()),
      users: Array.from(this.users.values()),
      contactMessages: Array.from(this.contactMessages.values())
    };
    saveToFile(data);
  }

  async updateLink(link: Link): Promise<Link> {
    // Ensure the link exists
    if (!this.links.has(link.id)) {
      throw new Error(`Link with ID ${link.id} not found`);
    }
    
    // Update the link in storage
    this.links.set(link.id, link);
    
    // Save to file to persist data
    this.saveData();
    
    return link;
  }
  
  async updateLinkFeatured(id: number, featured: boolean): Promise<Link | undefined> {
    const link = this.links.get(id);
    if (!link) return undefined;
    
    const updatedLink = { ...link, featured };
    this.links.set(id, updatedLink);
    return updatedLink;
  }
  
  async deleteLink(id: number): Promise<boolean> {
    if (!this.links.has(id)) {
      return false;
    }
    
    return this.links.delete(id);
  }

  async getFeaturedLinks(): Promise<Link[]> {
    return Array.from(this.links.values()).filter(link => link.featured);
  }

  async getLinksByCategory(category: string): Promise<Link[]> {
    // Special handling for tools category
    if (category === 'tools') {
      const now = Date.now();
      if (toolsCache && (now - toolsCacheTime) < TOOLS_CACHE_DURATION) {
        return toolsCache;
      }
      
      const tools = Array.from(this.links.values()).filter(link => link.category === category);
      toolsCache = tools;
      toolsCacheTime = now;
      return tools;
    }
    
    // For movie category, filter out links with anime tags
    if (category === 'movie') {
      return Array.from(this.links.values()).filter(link => 
        link.category === category && 
        (!link.tags || !link.tags.some(tag => tag.toLowerCase().includes('anime')))
      );
    }
    
    return Array.from(this.links.values()).filter(link => link.category === category);
  }

  async searchLinks(query: string): Promise<Link[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.links.values()).filter(link => 
      link.title.toLowerCase().includes(lowerQuery) ||
      (link.description && link.description.toLowerCase().includes(lowerQuery)) ||
      link.url.toLowerCase().includes(lowerQuery) ||
      (link.tags && link.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );
  }
  
  // Contact message methods
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
  
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }
  
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageId++;
    const now = new Date().toISOString();
    
    const message: ContactMessage = {
      id,
      name: insertMessage.name,
      email: insertMessage.email,
      message: insertMessage.message,
      createdAt: now,
      read: false
    };
    
    this.contactMessages.set(id, message);
    return message;
  }
  
  async markContactMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const message = this.contactMessages.get(id);
    if (!message) return undefined;
    
    const updatedMessage = { ...message, read: true };
    this.contactMessages.set(id, updatedMessage);
    return updatedMessage;
  }
  
  async deleteContactMessage(id: number): Promise<boolean> {
    if (!this.contactMessages.has(id)) {
      return false;
    }
    
    return this.contactMessages.delete(id);
  }
}

// Export a singleton instance
export const storage = new MemStorage();
