import { Link, InsertLink, links, type User, type InsertUser, users, type ContactMessage, type InsertContactMessage, contactMessages } from "@shared/schema";

// Interface with all the CRUD methods we need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Link methods
  getAllLinks(): Promise<Link[]>;
  getLink(id: number): Promise<Link | undefined>;
  createLink(link: InsertLink & { createdAt: string, featured: boolean }): Promise<Link>;
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

class MemStorage implements IStorage {
  private users: Map<number, User>;
  private links: Map<number, Link>;
  private contactMessages: Map<number, ContactMessage>;
  private userId: number;
  private linkId: number;
  private contactMessageId: number;

  constructor() {
    this.users = new Map();
    this.links = new Map();
    this.contactMessages = new Map();
    this.userId = 1;
    this.linkId = 1;
    this.contactMessageId = 1;
    
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
        featured: false
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
        featured: false
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
        featured: false
      } as InsertLink & { createdAt: string, featured: boolean });
    }
    
    // Add a featured anime site
    this.createLink({
      url: "https://www.crunchyroll.com",
      title: "Crunchyroll",
      description: "Premium anime streaming service with free tier",
      category: "anime",
      tags: ["streaming", "official"],
      nsfw: false,
      createdAt: new Date().toISOString(),
      featured: true
    } as InsertLink & { createdAt: string, featured: boolean });
    
    // Add a featured downloads site
    this.createLink({
      url: "https://nyaa.si",
      title: "Nyaa",
      description: "A popular BitTorrent community focused on East Asian media, including anime, manga, and games.",
      category: "downloads",
      tags: ["torrent", "anime", "manga", "games"],
      nsfw: false,
      createdAt: new Date().toISOString(),
      featured: true
    } as InsertLink & { createdAt: string, featured: boolean });
    
    this.createLink({
      url: "https://mangaplus.shueisha.co.jp",
      title: "Manga Plus",
      description: "Read manga officially from Shueisha",
      category: "manga",
      tags: ["reading", "official"],
      nsfw: false,
      createdAt: new Date().toISOString(),
      featured: false
    } as InsertLink & { createdAt: string, featured: boolean });
    
    // NSFW link
    this.createLink({
      url: "https://example-nsfw-anime.com",
      title: "Adult Anime Content",
      description: "Site with adult-oriented anime content",
      category: "anime",
      tags: ["adult", "18+"],
      nsfw: true,
      createdAt: new Date().toISOString(),
      featured: false
    } as InsertLink & { createdAt: string, featured: boolean });
    
    // Another NSFW link
    this.createLink({
      url: "https://example-nsfw-manga.com",
      title: "Adult Manga",
      description: "Adult manga collection",
      category: "manga",
      tags: ["adult", "mature"],
      nsfw: true,
      createdAt: new Date().toISOString(),
      featured: false
    } as InsertLink & { createdAt: string, featured: boolean });
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

  async createLink(insertLink: InsertLink & { createdAt: string, featured: boolean }): Promise<Link> {
    const id = this.linkId++;
    
    // Type assertion to properly define the structure of insertLink
    const typedLink = insertLink as unknown as {
      url: string;
      title: string;
      description: string;
      category: string;
      tags: string[];
      nsfw: boolean;
      createdAt: string;
      featured: boolean;
    };
    
    // Extract all the properties we need to create a valid Link object
    const {
      url,
      title,
      description,
      category,
      tags,
      nsfw = false, // Default to false if undefined
      createdAt,
      featured
    } = typedLink;
    
    // Create the complete link object
    const link: Link = {
      id,
      url,
      title,
      description,
      category,
      tags,
      nsfw,
      createdAt,
      featured
    };
    
    this.links.set(id, link);
    return link;
  }

  async updateLink(link: Link): Promise<Link> {
    // Ensure the link exists
    if (!this.links.has(link.id)) {
      throw new Error(`Link with ID ${link.id} not found`);
    }
    
    // Update the link in storage
    this.links.set(link.id, link);
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

import { FirebaseStorage } from './firebaseStorage';

// Create a resilient storage class that wraps FirebaseStorage and falls back to MemStorage
class ResilientStorage implements IStorage {
  private primaryStorage: IStorage;
  private fallbackStorage: IStorage;
  private useFallbackOnly: boolean = false;

  constructor(primary: IStorage, fallback: IStorage) {
    this.primaryStorage = primary;
    this.fallbackStorage = fallback;
    console.log('ResilientStorage initialized with primary and fallback storage');
    
    // Check if Firebase credentials are missing - if so, use fallback only
    const firebaseCredentialsMissing = !process.env.FIREBASE_PROJECT_ID || 
                                      !process.env.FIREBASE_CLIENT_EMAIL || 
                                      !process.env.FIREBASE_PRIVATE_KEY;
    if (firebaseCredentialsMissing) {
      this.useFallbackOnly = true;
      console.log('Firebase credentials are missing, using fallback storage directly');
    }
  }

  // Generic method to handle all operations with fallback support
  private async withFallback<T>(operation: () => Promise<T>, fallbackOperation: () => Promise<T>, methodName: string): Promise<T> {
    // If we've determined Firebase is not usable, go straight to fallback
    if (this.useFallbackOnly) {
      try {
        console.log(`Using fallback directly for ${methodName}`);
        return await fallbackOperation();
      } catch (fallbackError) {
        console.error(`Fallback storage failed in ${methodName}:`, fallbackError);
        throw fallbackError;
      }
    }
    
    try {
      // First attempt with primary storage
      return await operation();
    } catch (error) {
      // Log the error and try the fallback
      console.error(`Error in ${methodName}, using fallback:`, error);
      try {
        return await fallbackOperation();
      } catch (fallbackError) {
        console.error(`Fallback also failed in ${methodName}:`, fallbackError);
        throw fallbackError; // If both fail, propagate the fallback error
      }
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.withFallback(
      () => this.primaryStorage.getUser(id),
      () => this.fallbackStorage.getUser(id),
      'getUser'
    );
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.withFallback(
      () => this.primaryStorage.getUserByUsername(username),
      () => this.fallbackStorage.getUserByUsername(username),
      'getUserByUsername'
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    return this.withFallback(
      () => this.primaryStorage.createUser(user),
      () => this.fallbackStorage.createUser(user),
      'createUser'
    );
  }

  // Link methods
  async getAllLinks(): Promise<Link[]> {
    return this.withFallback(
      () => this.primaryStorage.getAllLinks(),
      () => this.fallbackStorage.getAllLinks(),
      'getAllLinks'
    );
  }

  async getLink(id: number): Promise<Link | undefined> {
    return this.withFallback(
      () => this.primaryStorage.getLink(id),
      () => this.fallbackStorage.getLink(id),
      'getLink'
    );
  }

  async createLink(link: InsertLink & { createdAt: string, featured: boolean }): Promise<Link> {
    return this.withFallback(
      () => this.primaryStorage.createLink(link),
      () => this.fallbackStorage.createLink(link),
      'createLink'
    );
  }

  async updateLink(link: Link): Promise<Link> {
    return this.withFallback(
      () => this.primaryStorage.updateLink(link),
      () => this.fallbackStorage.updateLink(link),
      'updateLink'
    );
  }

  async updateLinkFeatured(id: number, featured: boolean): Promise<Link | undefined> {
    return this.withFallback(
      () => this.primaryStorage.updateLinkFeatured(id, featured),
      () => this.fallbackStorage.updateLinkFeatured(id, featured),
      'updateLinkFeatured'
    );
  }

  async deleteLink(id: number): Promise<boolean> {
    return this.withFallback(
      () => this.primaryStorage.deleteLink(id),
      () => this.fallbackStorage.deleteLink(id),
      'deleteLink'
    );
  }

  async getFeaturedLinks(): Promise<Link[]> {
    return this.withFallback(
      () => this.primaryStorage.getFeaturedLinks(),
      () => this.fallbackStorage.getFeaturedLinks(),
      'getFeaturedLinks'
    );
  }

  async getLinksByCategory(category: string): Promise<Link[]> {
    return this.withFallback(
      () => this.primaryStorage.getLinksByCategory(category),
      () => this.fallbackStorage.getLinksByCategory(category),
      'getLinksByCategory'
    );
  }

  async searchLinks(query: string): Promise<Link[]> {
    return this.withFallback(
      () => this.primaryStorage.searchLinks(query),
      () => this.fallbackStorage.searchLinks(query),
      'searchLinks'
    );
  }

  // Contact message methods
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return this.withFallback(
      () => this.primaryStorage.getAllContactMessages(),
      () => this.fallbackStorage.getAllContactMessages(),
      'getAllContactMessages'
    );
  }

  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.withFallback(
      () => this.primaryStorage.getContactMessage(id),
      () => this.fallbackStorage.getContactMessage(id),
      'getContactMessage'
    );
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    return this.withFallback(
      () => this.primaryStorage.createContactMessage(message),
      () => this.fallbackStorage.createContactMessage(message),
      'createContactMessage'
    );
  }

  async markContactMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    return this.withFallback(
      () => this.primaryStorage.markContactMessageAsRead(id),
      () => this.fallbackStorage.markContactMessageAsRead(id),
      'markContactMessageAsRead'
    );
  }

  async deleteContactMessage(id: number): Promise<boolean> {
    return this.withFallback(
      () => this.primaryStorage.deleteContactMessage(id),
      () => this.fallbackStorage.deleteContactMessage(id),
      'deleteContactMessage'
    );
  }
}

// Create the appropriate storage implementation
let storage: IStorage;

// Check for environment variable to determine which storage to use
const useFirebase = process.env.USE_FIREBASE === 'true';

// Create in-memory storage regardless
const memStorage = new MemStorage();

// Let's immediately check what links are available in memory storage
memStorage.getAllLinks().then(links => {
  console.log(`Memory Storage initialized with ${links.length} links`);
  const animeLinks = links.filter(link => link.category === 'anime');
  console.log(`Memory Storage has ${animeLinks.length} anime links`);
});

if (useFirebase) {
  try {
    console.log('Setting up resilient storage with Firebase primary and in-memory fallback');
    const firebaseStorage = new FirebaseStorage();
    // Create a resilient storage that will gracefully fall back to in-memory if Firebase fails
    storage = new ResilientStorage(firebaseStorage, memStorage);
  } catch (error) {
    console.error('Error initializing Firebase storage:', error);
    console.log('Using in-memory storage due to Firebase initialization failure');
    storage = memStorage;
  }
} else {
  console.log('Using in-memory storage (by configuration)');
  storage = memStorage;
}

// Export a function to get the memory storage instance when needed
export function getMemoryStorageInstance() {
  // Return the already initialized memStorage instead of creating a new one
  return memStorage;
}

export { storage };
