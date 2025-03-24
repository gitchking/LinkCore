import fetch from 'node-fetch';

async function addSite(site) {
  try {
    const response = await fetch('http://localhost:5000/api/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(site),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Failed to add site ${site.title}: ${error}`);
      return false;
    }

    console.log(`Added ${site.title} successfully`);
    return true;
  } catch (error) {
    console.error(`Error adding site ${site.title}: ${error.message}`);
    return false;
  }
}

async function addAllSites() {
  const sites = [
    {
      url: "https://nyaa.si",
      title: "Nyaa",
      description: "A popular BitTorrent community focused on East Asian media, including anime, manga, and games.",
      category: "download",
      tags: ["torrent", "anime", "manga", "games"],
      nsfw: false
    },
    {
      url: "https://animetosho.org",
      title: "AnimeTosho",
      description: "An automated service that mirrors torrents from Nyaa, providing direct download links and Usenet integration.",
      category: "download",
      tags: ["torrent", "anime", "usenet"],
      nsfw: false
    },
    {
      url: "https://anidex.info",
      title: "AniDex",
      description: "A torrent tracker and indexer for anime-related content, supporting both torrents and XDCC downloads.",
      category: "download",
      tags: ["torrent", "anime", "xdcc"],
      nsfw: false
    },
    {
      url: "https://subsplease.org",
      title: "SubsPlease",
      description: "Provides timely releases of anime episodes with English subtitles, offering both torrent and XDCC download options.",
      category: "download",
      tags: ["torrent", "anime", "subtitles", "xdcc"],
      nsfw: false
    },
    {
      url: "https://tokyotosho.info",
      title: "Tokyo Toshokan",
      description: "A BitTorrent library for Japanese media, including anime, manga, and music.",
      category: "download",
      tags: ["torrent", "anime", "manga", "music"],
      nsfw: false
    },
    {
      url: "https://www.cdjapan.co.jp",
      title: "CDJapan",
      description: "An online retailer offering physical copies of Japanese CDs, DVDs, Blu-rays, and other merchandise.",
      category: "download",
      tags: ["official", "physical", "merchandise"],
      nsfw: false
    },
    {
      url: "https://releases.moe",
      title: "SeaDex",
      description: "A torrent tracker dedicated to Southeast Asian media, including anime and drama series.",
      category: "download",
      tags: ["torrent", "anime", "drama"],
      nsfw: false
    },
    {
      url: "https://sneedex.moe",
      title: "Sneedex",
      description: "A platform offering a variety of anime torrents for download.",
      category: "download",
      tags: ["torrent", "anime"],
      nsfw: false
    },
    {
      url: "https://tokyoinsider.com",
      title: "TokyoInsider",
      description: "Provides direct download links for various Japanese media, including anime and music.",
      category: "download",
      tags: ["direct download", "anime", "music"],
      nsfw: false
    },
    {
      url: "https://mangazip.net",
      title: "MangaZip",
      description: "Offers raw (untranslated) manga for direct download.",
      category: "download",
      tags: ["direct download", "manga", "raw"],
      nsfw: false
    },
    {
      url: "https://dlraw.net",
      title: "DLRaw",
      description: "Provides raw manga scans and light novels for download.",
      category: "download",
      tags: ["direct download", "manga", "light novel", "raw"],
      nsfw: false
    },
    {
      url: "https://dl-raw.net",
      title: "DL-Raw",
      description: "Another source for downloading raw manga and light novels.",
      category: "download",
      tags: ["direct download", "manga", "light novel", "raw"],
      nsfw: false
    },
    {
      url: "https://hi10anime.com",
      title: "Hi10Anime",
      description: "Specializes in high-quality, compressed anime releases in 10-bit color depth, requiring user registration for access.",
      category: "download",
      tags: ["direct download", "anime", "high quality"],
      nsfw: false
    },
    {
      url: "https://animeout.xyz",
      title: "AnimeOut",
      description: "Offers direct downloads of anime series and movies in various resolutions, with registration required.",
      category: "download",
      tags: ["direct download", "anime", "movies"],
      nsfw: false
    },
    {
      url: "https://kayoanime.com",
      title: "KayoAnime",
      description: "Provides direct download links for anime series and movies.",
      category: "download",
      tags: ["direct download", "anime", "movies"],
      nsfw: false
    },
    {
      url: "https://mkvseries.com",
      title: "MKVseries",
      description: "Hosts a collection of anime series available for direct download in MKV format.",
      category: "download",
      tags: ["direct download", "anime", "mkv"],
      nsfw: false
    },
    {
      url: "https://moriyashrine.org",
      title: "Moriya Shrine",
      description: "Dedicated to Touhou Project content, offering games, music, and related media for download.",
      category: "download",
      tags: ["direct download", "games", "touhou", "music"],
      nsfw: false
    },
    {
      url: "https://pandabackup.com",
      title: "Panda Backup",
      description: "Provides backup links for various anime series and movies.",
      category: "download",
      tags: ["direct download", "anime", "backup"],
      nsfw: false
    },
    {
      url: "https://animk.info",
      title: "AniMK",
      description: "An XDCC bot offering anime series and movies for download via IRC.",
      category: "download",
      tags: ["xdcc", "irc", "anime"],
      nsfw: false
    },
    {
      url: "https://nibl.co.uk",
      title: "nibl.co.uk",
      description: "Hosts XDCC bots providing anime downloads through IRC channels.",
      category: "download",
      tags: ["xdcc", "irc", "anime"],
      nsfw: false
    },
    {
      url: "https://beatrice-raws.org",
      title: "Beatrice-Raws",
      description: "Offers raw (unsubtitled) anime releases via XDCC.",
      category: "download",
      tags: ["xdcc", "anime", "raw"],
      nsfw: false
    },
    {
      url: "https://shanaproject.com",
      title: "Shana Project",
      description: "Automates anime torrent downloads by allowing users to subscribe to their favorite series.",
      category: "download",
      tags: ["torrent", "anime", "subscription"],
      nsfw: false
    },
    {
      url: "https://acgnx.se",
      title: "AcgnX",
      description: "A platform offering a variety of anime torrents.",
      category: "download",
      tags: ["torrent", "anime"],
      nsfw: false
    },
    {
      url: "https://sakuracircle.com",
      title: "SakuraCircle",
      description: "Provides direct download links for anime.",
      category: "download",
      tags: ["direct download", "anime"],
      nsfw: false
    },
    {
      url: "https://acg.rip",
      title: "ACG.RIP",
      description: "Hosts a collection of anime torrents for download.",
      category: "download",
      tags: ["torrent", "anime"],
      nsfw: false
    },
    {
      url: "https://anirena.com",
      title: "AniRena",
      description: "A torrent tracker focusing on anime series and movies.",
      category: "download",
      tags: ["torrent", "anime", "movies"],
      nsfw: false
    },
    {
      url: "https://bangumi.moe",
      title: "Bangumi.moe",
      description: "Offers a selection of anime torrents for download.",
      category: "download",
      tags: ["torrent", "anime"],
      nsfw: false
    },
    {
      url: "https://nipponsei.minglong.org",
      title: "Nipponsei",
      description: "Specializes in anime music releases available via XDCC.",
      category: "download",
      tags: ["xdcc", "anime", "music"],
      nsfw: false
    },
    {
      url: "https://dkb.io",
      title: "DKB",
      description: "Provides direct download links for various anime series.",
      category: "download",
      tags: ["direct download", "anime"],
      nsfw: false
    },
    {
      url: "https://flugelanime.com",
      title: "Flugel Anime",
      description: "Hosts a collection of anime series and movies available for direct download.",
      category: "download",
      tags: ["direct download", "anime", "movies"],
      nsfw: false
    },
    {
      url: "https://noobsubs.com",
      title: "NoobSubs",
      description: "Offers direct downloads of anime series with a focus on high-quality releases.",
      category: "download",
      tags: ["direct download", "anime", "high quality"],
      nsfw: false
    },
    {
      url: "https://animekaizoku.com",
      title: "AnimeKaizoku",
      description: "Provides direct download links for anime series and movies.",
      category: "download",
      tags: ["direct download", "anime", "movies"],
      nsfw: false
    },
    {
      url: "https://toonworld4all.me",
      title: "ToonWorld4All",
      description: "Hosts a variety of animated series, including anime, available for direct download.",
      category: "download",
      tags: ["direct download", "anime", "cartoons"],
      nsfw: false
    },
    {
      url: "https://cartoonsarea.com",
      title: "CartoonsArea",
      description: "Offers direct downloads of various animated series, including anime.",
      category: "download",
      tags: ["direct download", "anime", "cartoons"],
      nsfw: false
    },
    {
      url: "https://toonshub.com",
      title: "ToonsHub",
      description: "Provides direct download links for anime and other animated series.",
      category: "download",
      tags: ["direct download", "anime", "cartoons"],
      nsfw: false
    },
    {
      url: "https://coolsanime.me",
      title: "CoolsAnime",
      description: "Hosts a collection of anime series and movies available for direct download.",
      category: "download",
      tags: ["direct download", "anime", "movies"],
      nsfw: false
    },
    {
      url: "https://animerss.com",
      title: "AnimeRss",
      description: "Provides raw anime episodes for direct download.",
      category: "download",
      tags: ["direct download", "anime", "raw"],
      nsfw: false
    },
    {
      url: "https://jpfiles.eu",
      title: "JPFiles",
      description: "Offers raw Japanese media files, including anime, for direct download.",
      category: "download",
      tags: ["direct download", "anime", "raw", "japanese"],
      nsfw: false
    },
    {
      url: "https://chauthanh.info",
      title: "Chauthanh",
      description: "Hosts a variety of anime series and movies available for direct download.",
      category: "download",
      tags: ["direct download", "anime", "movies"],
      nsfw: false
    },
    {
      url: "https://deadtoons.co",
      title: "DeadToons",
      description: "Provides direct download links for various animated series, including anime.",
      category: "download",
      tags: ["direct download", "anime", "cartoons"],
      nsfw: false
    },
    {
      url: "https://anilot.org",
      title: "Anilot",
      description: "Offers direct downloads of anime series and movies.",
      category: "download",
      tags: ["direct download", "anime", "movies"],
      nsfw: false
    },
    {
      url: "https://anidl.org",
      title: "AniDL",
      description: "Hosts a collection of anime series available for direct download.",
      category: "download",
      tags: ["direct download", "anime"],
      nsfw: false
    },
    {
      url: "https://animetime.pl",
      title: "Anime Time",
      description: "Provides a platform to watch anime series online.",
      category: "download",
      tags: ["anime", "streaming"],
      nsfw: false
    }
  ];

  for (const site of sites) {
    await addSite(site);
  }

  console.log('All download sites have been added!');
}

addAllSites().catch(error => {
  console.error('Failed to add download sites:', error);
});