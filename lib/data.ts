export type StoreLocation = {
  id: "herkimer" | "cooperstown";
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: { days: string; time: string }[];
  mapQuery: string;
};

export const locations: StoreLocation[] = [
  {
    id: "herkimer",
    name: "Herkimer",
    address: "105 S Main St",
    city: "Herkimer",
    state: "NY",
    zip: "13350",
    phone: "(315) 868-7537",
    hours: [
      { days: "Monday – Friday", time: "10:00 AM – 6:00 PM" },
      { days: "Saturday", time: "9:00 AM – 2:00 PM" },
      { days: "Sunday", time: "Closed" },
    ],
    mapQuery: "105 S Main St, Herkimer, NY 13350",
  },
  {
    id: "cooperstown",
    name: "Cooperstown",
    address: "139 Main St",
    city: "Cooperstown",
    state: "NY",
    zip: "13326",
    phone: "(315) 868-7537",
    hours: [
      { days: "Wednesday – Friday", time: "10:00 AM – 6:00 PM" },
      { days: "Saturday – Sunday", time: "10:00 AM – 5:00 PM" },
      { days: "Monday – Tuesday", time: "Closed" },
    ],
    mapQuery: "139 Main St, Cooperstown, NY 13326",
  },
];

export const business = {
  name: "The Valley Sports Cards & Collectibles",
  shortName: "The Valley",
  tagline: "Herkimer & Cooperstown's home for sports cards & collectibles",
  email: "valleysportcards@yahoo.com",
  foundedYear: 2019,
  ebayUsername: "lyonman24collectables",
  ebayStoreUrl: "https://www.ebay.com/str/lyonman24collectables",
  ebayHandle: "Lyonman24",
};

export const socialLinks = [
  {
    label: "Facebook (Herkimer)",
    href: "https://www.facebook.com/p/The-Valley-Sports-Cards-Collectibles-100057453068756/",
    icon: "facebook" as const,
  },
  {
    label: "Facebook (Cooperstown)",
    href: "https://www.facebook.com/p/Valley-Sports-Cards-Collectibles-Cooperstown-61558990273481/",
    icon: "facebook" as const,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/valleysportscards/",
    icon: "instagram" as const,
  },
  {
    label: "eBay Store",
    href: "https://www.ebay.com/str/lyonman24collectables",
    icon: "ebay" as const,
  },
];
