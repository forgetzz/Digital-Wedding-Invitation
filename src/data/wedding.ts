// ---------------------------------------------------------------------------
// All wedding-specific content lives here. To reuse this invitation for a
// different couple, this is the only file that needs to change.
// ---------------------------------------------------------------------------

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export type EventDetail = {
  name: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapUrl: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  span?: "tall" | "wide" | "normal";
};

export const wedding = {
  couple: {
    initials: "A & F",
    bride: {
      firstName: "Kak caca",
      fullName: "kak caca yang baik hati",
      parents: "Putri dari ibunya",
      photo:
        "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=800&auto=format&fit=crop",
    },
    groom: {
      firstName: "calon suami",
      fullName: "calon suami",
      parents: "anak dari ibunya",
      photo:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop",
    },
  },

  weddingDate: "2026-12-12T08:00:00+08:00",
  weddingDateLabel: "12 December 2026",

  greeting: "Assalamu'alaikum Warahmatullahi Wabarakatuh",

  quote: {
    arabic:
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا",
    translation:
      "\u201cAnd of His signs is that He created for you from yourselves mates that you may find tranquility in them.\u201d",
    source: "QS. Ar-Rum: 21",
  },

  story: [
    {
      year: "2019",
      title: "Where We Met",
      description:
        "Nanti di isi karna devlopernya belum mengerti hehe",
    },
    {
      year: "2022",
      title: "Our First Chapter",
      description:
        "Nanti di isi karna devlopernya belum mengerti hehe",
    },
    {
      year: "2025",
      title: "The Proposal",
      description:
        "Nanti di isi karna devlopernya belum mengerti hehe",
    },
    {
      year: "2026",
      title: "Our Wedding",
      description:
        "Nanti di isi karna devlopernya belum mengerti hehe",
    },
  ] satisfies TimelineItem[],

  events: [
    {
      name: "Akad Nikah",
      date: "Saturday, 12 December 2026",
      time: "08:00 — 10:00 WIB",
      venue: "Masjid Al-Hikmah",
      address: "Jl. Melati Indah No. 21, Makassar, South Sulawesi",
      mapUrl: "https://maps.google.com/?q=Masjid+Al-Hikmah+Makassar",
    },
    {
      name: "Wedding Reception",
      date: "Saturday, 12 December 2026",
      time: "11:00 — 14:00 WIB",
      venue: "Grand Ballroom",
      address: "Jl. Sudirman No. 88, Makassar, South Sulawesi",
      mapUrl: "https://maps.google.com/?q=Grand+Ballroom+Makassar",
    },
  ] satisfies EventDetail[],

  gallery: [
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
      alt: "Alya & Fajar candid portrait",
      span: "tall",
    },
    {
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop",
      alt: "Engagement session by golden hour",
    },
    {
      src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=1000&auto=format&fit=crop",
      alt: "Hands with wedding rings",
    },
    {
      src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1000&auto=format&fit=crop",
      alt: "Couple walking together",
      span: "wide",
    },
    {
      src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1000&auto=format&fit=crop",
      alt: "Bride portrait with floral veil",
      span: "tall",
    },
    {
      src: "https://images.unsplash.com/photo-1537907510278-2b76e19e3bd6?q=80&w=1000&auto=format&fit=crop",
      alt: "Wedding bouquet detail",
    },
  ] satisfies GalleryImage[],

  closing: {
    lead: "Two hearts, one journey, and a lifetime to share.",
    message:
      "We would be honored to have you celebrate this special day with us, and to receive your prayers for our new journey together.",
  },
};

export type Wedding = typeof wedding;
