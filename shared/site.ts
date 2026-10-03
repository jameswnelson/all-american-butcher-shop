export type Field<T> = {
  value: T;
  placeholder: boolean;
  source: string;
};

function confirmed<T>(value: T, source: string): Field<T> {
  return { value, placeholder: false, source };
}

function placeholder<T>(value: T, source: string): Field<T> {
  return { value, placeholder: true, source };
}

export type Service = {
  name: string;
  summary: string;
};

export type PriceItem = {
  label: string;
  price: string;
};

export type PriceGroup = {
  title: string;
  items: PriceItem[];
};

export type PriceSection = {
  title: string;
  groups: PriceGroup[];
};

export type PriceList = {
  sections: PriceSection[];
  travel: { fee: string; areas: string }[];
  killPen: string;
  appliesTo: string;
};

export const site = {
  name: confirmed("All American Butcher Shop", "Logo and Facebook page name"),
  tagline: confirmed("Premium Quality Meats", "Logo"),
  secondary: confirmed("Locally Sourced · Custom Cuts", "Logo"),
  faith: confirmed("Praise God for wholesome meats.", "Logo"),
  city: confirmed("Weiser, ID", "Facebook page location"),
  facebookUrl: confirmed(
    "https://www.facebook.com/people/All-American-Butcher-Shop/61593873486939/",
    "Facebook page",
  ),
  facebookHandle: confirmed("All American Butcher Shop", "Facebook page name"),

  addressLine1: confirmed("698 Pioneer Rd.", "Owner-confirmed shop address"),
  addressLine2: confirmed("Weiser, ID 83672", "Owner-confirmed city and ZIP"),
  mapQuery: confirmed(
    "698 Pioneer Rd, Weiser, ID 83672",
    "Owner-confirmed shop address",
  ),

  phone: confirmed("(208) 414-1515", "Owner-confirmed shop phone"),
  phoneHref: confirmed("tel:+12084141515", "Matches the confirmed shop phone"),
  email: placeholder(
    "hello@allamericanbutchershop.example",
    "Invented address — .example will not deliver mail",
  ),

  hours: placeholder(
    [
      { days: "Monday – Friday", time: "8:00am – 6:00pm" },
      { days: "Saturday", time: "9:00am – 4:00pm" },
      { days: "Sunday", time: "Closed" },
    ],
    "Sample hours for layout — owners have not confirmed",
  ),

  shortDescription: confirmed(
    "Custom mobile butcher in Weiser — locally sourced meats from our farm and neighboring families, with a retail case forthcoming.",
    "Shop About flyer; retail case forthcoming per owners",
  ),

  aboutHeadline: confirmed(
    "About who we are",
    "Shop About flyer",
  ),
  aboutLead: confirmed(
    "We are Riley Shippy and Ty Hamilton, both Weiser locals and owners of All American Butcher Shop. We purchased the meat shop and started operations September of 2026.",
    "Shop About flyer",
  ),
  aboutBody: confirmed(
    [
      "We do custom mobile butcher and run a meat shop based out of Weiser, Idaho. A retail case is forthcoming.",
      "We are Christian owners and uphold Christian values and principles in our business. We emphasize a healthy & wholesome approach to feeding our families and communities with high-quality, nutritional meats.",
      "We provide locally sourced meats from our farm and other local farmers. We have great farming families in our community who put their heart into raising quality, healthy livestock. We are passionate about being a part of putting local food back on your plate!",
      "When the retail case opens, we will offer cuts of pork, lamb, and two lines of beef: 100% grass-fed & grass-finished, and grass-fed & grain-finished.",
    ],
    "Shop About flyer; retail case forthcoming per owners",
  ),
  owners: confirmed("Ty Hamilton and Riley Shippy", "Owner-confirmed names"),

  servicesIntro: confirmed(
    "Custom mobile slaughter and cut & wrap for beef, hogs, sheep, and goats. A retail case of locally sourced meats is forthcoming in Weiser.",
    "Shop About flyer, price list; retail case forthcoming per owners",
  ),
  services: confirmed(
    [
      {
        name: "Custom beef processing",
        summary:
          "Base kill fee by hanging weight, then cut & wrap bone-in or bone-out. Organs optional.",
      },
      {
        name: "Hogs",
        summary:
          "Kill fee by hanging weight, cut & wrap, and smoke/cure when you want it.",
      },
      {
        name: "Sheep & goats",
        summary:
          "Market lambs/goats and older animals — flat-fee cut & wrap with bone-out and organs available.",
      },
      {
        name: "Mobile butcher",
        summary:
          "We come to you across the Weiser area, or bring animals to the Mann Creek kill pen for the base kill fee.",
      },
      {
        name: "Retail case",
        summary:
          "Forthcoming — pork, lamb, and two beef lines: 100% grass-fed & grass-finished, and grass-fed & grain-finished.",
      },
    ] satisfies Service[],
    "Shop About flyer, price list; retail case forthcoming per owners",
  ),
  pricingNote: confirmed(
    "Processing rates from our printed price list. Call if you are outside the listed travel zones — we will give you an approximate fee.",
    "Printed shop price list",
  ),
  priceList: confirmed(
    {
      sections: [
        {
          title: "Beef",
          groups: [
            {
              title: "Base kill fee",
              items: [
                { label: "Up to 750 lb hanging weight", price: "$75" },
                { label: "750–999 lb hanging weight", price: "$95" },
                { label: "1000+ lb hanging weight", price: "$150" },
              ],
            },
            {
              title: "Beef cut & wrap",
              items: [
                { label: "Standard bone in", price: "$0.85 / lb" },
                { label: "Bone out", price: "$0.95 / lb" },
                { label: "Organs (optional)", price: "$2 / lb" },
              ],
            },
          ],
        },
        {
          title: "Hogs",
          groups: [
            {
              title: "Base kill fee",
              items: [
                { label: "Up to 225 lb hanging weight", price: "$75" },
                { label: "Over 225 lb hanging weight", price: "$100" },
              ],
            },
            {
              title: "Hog cut & wrap",
              items: [
                { label: "Standard bone in", price: "$0.85 / lb" },
                { label: "Bone out", price: "$0.95 / lb" },
                { label: "Smoke / cure", price: "$0.95 / lb" },
                { label: "Organs (optional)", price: "$2 / lb" },
              ],
            },
          ],
        },
        {
          title: "Sheep & goats",
          groups: [
            {
              title: "Base kill fee",
              items: [
                { label: "Market lambs/goats (up to 1 yr)", price: "$75" },
                { label: "Older sheep/goats (over 1 yr)", price: "$85" },
              ],
            },
            {
              title: "Sheep/goat cut & wrap",
              items: [
                { label: "Market lambs/goats", price: "$80 flat" },
                { label: "Older sheep/goats", price: "$100 flat" },
                { label: "Bone out", price: "$15" },
                { label: "Organs (optional)", price: "$2 / lb" },
              ],
            },
          ],
        },
      ],
      travel: [
        {
          fee: "No additional travel fees",
          areas: "Weiser, Annex, Mann Creek & Oregon Slope",
        },
        {
          fee: "$35 travel fee",
          areas: "Payette, Fruitland, Ontario, Midvale, and Cambridge",
        },
        {
          fee: "$50 typical travel fee",
          areas: "Areas beyond those listed (call for approximate price)",
        },
      ],
      killPen:
        "Mann Creek kill pen: option to bring animals there for the base kill fee price.",
      appliesTo:
        "Travel fees and kill pen options apply to all beef, hogs, sheep, and goats.",
    } satisfies PriceList,
    "Printed All American Butcher Shop price list",
  ),

  photos: {
    exterior: placeholder(
      {
        src: "/shop-exterior.jpg",
        alt: "Butcher shop storefront and parking lot",
        caption: "Shop exterior — temporary stand-in until we shoot Pioneer Road",
        width: 1024,
        height: 522,
      },
      "Temporary stand-in photo — replace with All American Butcher Shop exterior",
    ),
    owners: confirmed(
      {
        src: "/owners.jpg",
        alt: "Ty Hamilton and Riley Shippy with their wives",
        caption: "Ty Hamilton and Riley Shippy with their wives",
        width: 1024,
        height: 765,
      },
      "Owner-provided photo",
    ),
    case: placeholder(
      {
        src: "/shop-case.jpg",
        alt: "Retail meat case with steaks and deli items",
        caption: "Retail case — forthcoming; temporary stand-in photo",
        width: 1024,
        height: 1024,
      },
      "Temporary stand-in photo — retail case not open yet",
    ),
    cutting: placeholder(
      {
        src: "/shop-cutting.jpg",
        alt: "Butcher cutting beef on a processing table",
        caption: "Custom cutting — temporary stand-in photo",
        width: 611,
        height: 400,
      },
      "Temporary stand-in photo — replace with shop cutting photos",
    ),
    wrapped: placeholder(
      "Finished, wrapped orders",
      "No photoshoot yet",
    ),
  },
};

export function mapsUrl(query: string) {
  return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}

export function mapsEmbedUrl(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
}
