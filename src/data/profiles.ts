/**
 * Curated department profiles: the sections a department page can carry beyond
 * what Airtable holds — a dated history, the money, how coverage is split, what
 * the job is like, where residents go for permits. Keyed by the page's slug
 * under /departments.
 *
 * Every figure names its source by key into `sources`, and the page prints the
 * sources at the foot. Nothing here is estimated: a number the department or
 * the city has not published is left out, not filled in.
 *
 * Simple facts that Airtable has a field for (chief, phone, history text) belong
 * in Airtable; `contact` here is a stop-gap for pages whose records are still
 * empty, and Airtable wins wherever it has a value.
 */

export interface Source {
  label: string;
  href: string;
  /** What was taken from it, when it is not obvious from the label. */
  note?: string;
}

export interface Event {
  year: number;
  text: string;
  /** Calls for service that year, where the source gives them. */
  calls?: number;
  /** True where the calls figure is the source's rounded "approximately". */
  callsApprox?: boolean;
  source: string;
}

export interface MoneyLine {
  label: string;
  amount: number;
}

/** One bar in a chart. `value` null draws a gap: a year with no published figure. */
export interface Bar {
  label: string;
  value: number | null;
  /** A second line under the label, e.g. the vehicle's make or the basis of the year. */
  sub?: string;
  /** The source rounds it ("over 7,000"); drawn lighter and marked. */
  approx?: boolean;
}

export interface Chart {
  title: string;
  bars: Bar[];
  note: string;
  source: string;
}

export interface Profile {
  /** Search description, written for this department. */
  description: string;
  /** Replaces the list of Airtable record names under the heading, where those are a muddle. */
  subtitle?: string;
  /** Rows added to the facts at the top of the page. */
  facts: [string, string][];
  contact?: { chief?: string; phone?: string; website?: string; source: string };
  history: { intro: string; events: Event[] };
  money?: {
    intro: string;
    /** The year the lines below are for, e.g. "fiscal year 2027 (proposed)". */
    year: string;
    lines: MoneyLine[];
    linesNote: string;
    capital: { title: string; lines: MoneyLine[]; note: string };
    source: string;
  };
  coverage?: {
    intro: string;
    /** Column headings for the table; default District / First due / From. */
    columns?: [string, string, string];
    districts: { name: string; firstDue: string; from: string; href?: string; note: string }[];
    source: string;
  };
  /** Notes printed under a station, keyed by the station's slug. */
  stationNotes?: Record<string, { text: string; source: string }>;
  careers?: { intro: string; points: string[]; applyUrl: string; source: string };
  /** Calls charts: by year (columns), by type and by vehicle (horizontal bars). */
  calls?: { intro: string; byYear?: Chart; byYear2?: Chart; byType?: Chart; byUnit?: Chart };
  /** Buildings the state lists as fire stations that turned out not to be, checked on the ground. */
  corrections?: { intro: string; items: { address: string; finding: string }[] };
  residents: { label: string; href: string; text: string }[];
  sources: Record<string, Source>;
}

const SB = "https://www.southburlingtonvt.gov";
const BTV = "https://www.burlingtonvt.gov";
const COL = "https://colchestervt.gov";
const WIL = "https://www.willistonfire.com";
const SHEL = "https://www.shelburnefire.org";
const WIN = "https://www.winooskivt.gov";
const WILT = "https://www.town.williston.vt.us/vertical/sites/%7BF506B13C-605B-4878-8062-87E5927E49F0%7D/uploads";

const MIL = "https://www.miltonvt.gov";
const CVF = "https://www.cvfrs.com";
const HIN = "https://www.hinesburg.org";
const UJ = "https://www.ujfd.org";

const EJ = "https://www.essexjctfire.org";
const ET = "https://www.essexvt.gov";
const WF = "https://www.westfordfire.org";
const WT = "https://westfordvt.us";
const HUN = "https://www.huntingtonvt.org";

// One department, two town pages: Underhill and Jericho share the profile.
const UJFD: Profile = {
  description:
    "Underhill-Jericho Fire Department: a volunteer fire and first-response EMS department since 1913, " +
    "two stations, a weekday duty crew, backcountry rescue, burn permits and how to join.",
  facts: [
    ["Formed", "1913"],
    ["Covers", "Underhill, Jericho and parts of Westford"],
    ["Stations", "2: Underhill Village (main) and Jericho Center"],
    ["EMS", "First response, 24/7, with over 10 EMT responders"],
    ["ISO rating", "4/6/10, effective 1 March 2014"],
  ],
  contact: { chief: "Todd Fischer", phone: "802-899-4025", website: UJ, source: "home" },
  history: {
    intro:
      "Townspeople worried about their homes and businesses formed the department in 1913. Jericho " +
      "joined Underhill in paying for it in 1936, and it has served both towns since, today from " +
      "two stations with six pieces of firefighting apparatus.",
    events: [
      { year: 1913, text: "The department is formed. Its first equipment is a chemical tank on two wagon wheels, kept in a shed beside the Elbridge Nealy furniture and jewelry store on Park Street.", source: "about" },
      { year: 1936, text: "A fire station is built at Park Street and Route 15, housing a 1923 Model T Ford and a 1927 Packard coupe, each fitted with two 40-gallon chemical tanks. Jericho begins contributing, and the department covers both towns.", source: "about" },
      { year: 1964, text: "The first factory-built fire truck, an International Model V196, arrives. Before it came a 1942 Army-surplus Chevrolet with a 500 gpm pump.", source: "about" },
      { year: 1982, text: "The Jericho substation is built on Browns Trace Road, on land given by Don and Alice Rivers.", source: "about" },
      { year: 1997, text: "The main station opens on Route 15 in Underhill Village, built as both a fire station and an emergency operations center.", source: "about" },
      { year: 2014, text: "A new ISO rating of 4/6/10 takes effect on 1 March, which may lower homeowners' insurance premiums for many residents.", source: "about" },
    ],
  },
  stationNotes: {
    "underhill-420-vt-route-15": {
      text:
        "The main station and administrative offices, built in 1997: a 6,400 sq ft apparatus bay and a " +
        "4,100 sq ft administrative section. Engine 11, the attack pumper sent first to large fires; " +
        "Engine 8, a pumper-tanker; Squad 51 for EMS and mountain rescue, with the mountain rescue trailer and the Gator.",
      source: "apparatus",
    },
    "jericho-288-browns-trce": {
      text:
        "The Jericho Center substation, built in 1982 and used mainly as a quick-response station for " +
        "Jericho Center. Engine 2 responds from here as a pumper-tanker.",
      source: "apparatus",
    },
  },
  careers: {
    intro:
      "Members are volunteers from Underhill, Jericho and parts of Westford, joining as firefighters, " +
      "EMS first responders or specialists. On weekdays a full-time duty crew runs Squad 52, the first " +
      "vehicle out on every call.",
    points: [
      "An apprenticeship of about a year, after the free online NIMS 100, 200 and 700 courses",
      "A medical exam with a department physician, paid for by the department",
      "Firefighters: the Chittenden County basic course or Firefighter 1 within two years; under-18s need a parent's approval",
      "EMS first responders: 18 or over, with a Vermont EMR, EMT or AEMT licence and a National Registry card",
    ],
    applyUrl: `${UJ}/join-the-ujfd`,
    source: "apply",
  },
  residents: [
    { label: "Burn permits", href: "https://ujfd.burnpermits.com/", text: "Apply online; the permit is issued at once and lasts a single 24-hour period." },
    { label: "Homeowner information form", href: `${UJ}/fire-safety-new`, text: "Tell the department about your home ahead of an emergency, renters included." },
    { label: "Reflective address signs", href: `${UJ}/fire-safety-new`, text: "Help crews find your house faster." },
    { label: "Dry hydrants", href: `${UJ}/fire-safety-new`, text: "Have a pond a truck can reach? The department reimburses the strainer and coupling hardware." },
    { label: "Community CPR", href: UJ, text: "Classes about every three months; call 802-899-4025." },
  ],
  sources: {
    home: { label: "Underhill Jericho Fire Department", href: UJ },
    about: { label: "Underhill Jericho Fire Department, About", href: `${UJ}/about-ujfd` },
    apparatus: { label: "Underhill Jericho Fire Department, Apparatus", href: `${UJ}/apparatus` },
    apply: { label: "Underhill Jericho Fire Department, Membership application", href: `${UJ}/membership-application`, note: "Requirements for members" },
  },
};

export const profiles: Record<string, Profile> = {
  "south-burlington": {
    description:
      "South Burlington Fire Department: two career stations, about 5,100 calls a year, " +
      "its history since 1970, apparatus, budget, coverage and how to join.",
    facts: [
      ["Founded", "1970"],
      ["Staffing", "3 shifts of 13, around the clock"],
      ["Calls for service", "About 5,100 (2024)"],
      ["Fire and ambulance budget", "$7.53 million (FY2027 proposed)"],
      ["Transport ambulance", "Since 2004; paramedics since 2012"],
    ],
    contact: {
      chief: "Steven Locke",
      phone: "802-846-4110",
      website: `${SB}/165/Fire`,
      source: "fire",
    },
    history: {
      intro:
        "South Burlington had its fire and ambulance service from Burlington until 1970. " +
        "Since then the department has grown from two firefighters a shift answering 190 " +
        "calls a year to three shifts of thirteen answering about 5,100.",
      events: [
        {
          year: 1970,
          text:
            "Department founded, with three 24-hour shifts of two firefighters. Engines ran " +
            "from what is now JayCee Park on Patchen Road while the Dorset Street station was built.",
          calls: 190,
          source: "history",
        },
        {
          year: 1988,
          text: "Station 2 built on Holmes Road, off Shelburne Road; staffed from 1990 with one firefighter a shift.",
          source: "history",
        },
        {
          year: 1997,
          text: "A second firefighter added to each shift at Station 2, so it is always staffed.",
          source: "history",
        },
        {
          year: 2000,
          text:
            "A fifth firefighter a shift: at least two at each station, meeting the state's " +
            "“two in, two out” rule for entering a burning building.",
          source: "history",
        },
        {
          year: 2004,
          text:
            "Voters back fire-based ambulance transport; the department takes patients to " +
            "hospital itself instead of handing them to UVM Rescue.",
          source: "history",
        },
        {
          year: 2008,
          text: "A federal SAFER grant funds six new firefighter positions.",
          source: "history",
        },
        {
          year: 2012,
          text:
            "Seven members begin working as paramedics; a full-time deputy chief is added. " +
            "Medical calls are about 80% of the work.",
          calls: 2870,
          source: "history",
        },
        {
          year: 2024,
          text: "Six firefighters approved to staff a second ambulance, based at Station 2.",
          calls: 5100,
          callsApprox: true,
          source: "careers",
        },
        {
          year: 2025,
          text: "A 48-hour week: 24 hours on, 48 off, about 416 fewer hours a year for each firefighter.",
          source: "careers",
        },
        {
          year: 2026,
          text: "Voters approve a $2.3 million addition to Station 1, 2,651 to 1,018.",
          source: "vote",
        },
        {
          year: 2027,
          text: "Construction of the Station 1 addition expected to begin in the spring.",
          source: "addition",
        },
      ],
    },
    money: {
      intro:
        "Fire and ambulance is a fifth of South Burlington's general fund, second only to " +
        "police. Part of it comes back: ambulance billing and the department's permit and " +
        "inspection fees together bring in about $3 million.",
      year: "fiscal year 2027, as proposed",
      lines: [
        { label: "Fire and ambulance, spending", amount: 7528864 },
        { label: "Ambulance billing, revenue", amount: 1801000 },
        { label: "Fire permits and inspections, revenue", amount: 1252476 },
      ],
      linesNote:
        "Out of a general fund of $37.18 million. Voters approved the city budget on 3 March 2026.",
      capital: {
        title: "Ten-year capital plan, fiscal 2027–2036",
        lines: [
          { label: "Fire apparatus (two engines, a ladder, a rescue)", amount: 2670000 },
          { label: "Ambulances (two in service, one reserve)", amount: 1910000 },
          { label: "Command and prevention vehicles", amount: 658000 },
          { label: "Breathing apparatus, end of life in FY2029", amount: 500000 },
          { label: "Station 1 sleeping and restroom renovations", amount: 300000 },
        ],
        note:
          "$6.04 million in all, almost all of it from the general fund. The Station 1 " +
          "addition is a separate bond, repaid from fire department permit fees.",
      },
      source: "budget",
    },
    coverage: {
      intro:
        "The city is split into fire districts named for the unit that arrives first, and " +
        "each is drawn around whichever station can get there fastest. Districts 1 and 2 " +
        "are the built-up city; District 7 is rural.",
      districts: [
        {
          name: "District 1",
          firstDue: "Ladder 1",
          from: "Station 1, Dorset Street",
          note: "Urban cluster",
        },
        {
          name: "District 2",
          firstDue: "Engine 2",
          from: "Station 2, Holmes Road",
          note: "Urban cluster",
        },
        {
          name: "District 7",
          firstDue: "Engine 7",
          from: "Vermont Air National Guard, at the airport",
          href: "/departments/vermont-air-national-guard-fire-department",
          note: "Rural; the Guard's engine is first due",
        },
      ],
      source: "stations",
    },
    stationNotes: {
      "south-burlington-575-dorset-st": {
        text:
          "Built in 1970, with a minimum of five on duty. A 2,333 sq ft addition for the " +
          "Fire Prevention Division and Rental Registry was approved by voters in March " +
          "2026; construction is expected from spring 2027.",
        source: "addition",
      },
      "south-burlington-3-holmes-rd": {
        text: "Built in 1988, with a minimum of three on duty; home of the second ambulance since 2024.",
        source: "stations",
      },
    },
    careers: {
      intro:
        "A career department of three shifts of thirteen, staffing a ladder, an engine and " +
        "two ambulances from two stations. It hires firefighters who are also EMTs or paramedics.",
      points: [
        "Starting pay $60,208.68 including holidays, rising to $69,167.16 after three years",
        "EMS pay on top: 4.5% for AEMTs, 8.5% for paramedics",
        "24 hours on, 48 off, with a Kelly Day every seventh shift",
        "Union membership from the day of hire: South Burlington Firefighters, IAFF Local 3671",
        "Vermont municipal pension (VMERS-C)",
      ],
      applyUrl: `${SB}/170/Careers`,
      source: "careers",
    },
    residents: [
      {
        label: "Community Connect",
        href: `${SB}/569/Community-Connect`,
        text: "Tell responders who lives at your home, any access needs, pets or hazards — free and private.",
      },
      {
        label: "Permits and inspections",
        href: `${SB}/224/Permit-Applications`,
        text: "Construction, fire alarm, sprinkler, kitchen hood and tent permits, applied for online.",
      },
      {
        label: "Fire prevention",
        href: `${SB}/554/Fire-Prevention`,
        text: "The Fire Marshal's office: inspections, plan review, complaints and the rental registry.",
      },
      {
        label: "Fire safety ordinance",
        href: "https://library.municode.com/vt/south_burlington/codes/code_of_ordinances?nodeId=PTIICOOR_CH16FIPRPR",
        text: "The city's fire prevention and protection code, chapter 16.",
      },
    ],
    sources: {
      fire: { label: "City of South Burlington, Fire Department", href: `${SB}/165/Fire` },
      history: { label: "City of South Burlington, Department History", href: `${SB}/552/Department-History` },
      stations: {
        label: "City of South Burlington, Fire Stations",
        href: `${SB}/559/Fire-Stations`,
        note: "Stations, staffing minimums, apparatus and fire districts",
      },
      careers: {
        label: "City of South Burlington, Careers",
        href: `${SB}/170/Careers`,
        note: "2024 calls, staffing, pay and schedule",
      },
      addition: { label: "City of South Burlington, Fire Station 1 Addition", href: `${SB}/693/Fire-Station-1-Addition` },
      vote: {
        label: "City of South Burlington, March 3, 2026 Town Meeting Day Results",
        href: `${SB}/697/March-3-2026-Town-Meeting-Day-Results`,
      },
      budget: {
        label: "City of South Burlington, FY27 City Manager's Proposed Budget Book (December 2025)",
        href: `${SB}/DocumentCenter/View/5211`,
        note: "Pages 16–17 (general fund), 123–128 (fire department capital plan)",
      },
    },
  },

  burlington: {
    description:
      "Burlington Fire Department: five career stations, a record 11,345 calls in FY2025, " +
      "Vermont's busiest engine and ambulance, history since 1895, budget and how to join.",
    facts: [
      ["Founded", "1895, as a paid department"],
      ["Calls for service", "11,345 in FY2025, about 31 a day"],
      ["Fire budget", "$20.7 million (FY2027, Mayor's recommended)"],
      ["Schedule", "48 hours on, 96 off"],
      ["Chief", "Michael Curtin, the department's 20th"],
    ],
    contact: {
      chief: "Michael Curtin",
      phone: "802-864-4554",
      website: `${BTV}/Fire`,
      source: "fire",
    },
    history: {
      intro:
        "Burlington has had a paid fire department since 1895, and one of its first firehouses " +
        "is still in service. It now answers more calls than any other department in Vermont: " +
        "11,345 in fiscal 2025, the busiest year in its history.",
      events: [
        {
          year: 1895,
          text:
            "After the station near the site burned, the city founds a paid fire department. " +
            "Station 3 on Mansfield Avenue goes into service with a horse-drawn steam engine " +
            "and hose cart; it is still the oldest working firehouse in Vermont.",
          source: "st3",
        },
        {
          year: 1926,
          text: "Central Fire Station, Station 1, opens on South Winooski Avenue.",
          source: "st1",
        },
        {
          year: 1980,
          text: "Station 2, the John D. Boardman Station, opens on North Avenue in the Old North End.",
          source: "st2",
        },
        {
          year: 1991,
          text:
            "Stations 4 and 5 are completed. Station 4 is built around the 1950s firehouse that " +
            "once held one engine and three firefighters' beds.",
          source: "st4",
        },
        {
          year: 2021,
          text: "Ambulance 4 in the New North End is permanently staffed, with voters' support.",
          source: "st4",
        },
        {
          year: 2022,
          text: "Calls jump by nearly 1,600 in a year, to 9,864; medical calls are about 70%.",
          calls: 9864,
          source: "ar2022",
        },
        {
          year: 2025,
          text:
            "The busiest year in the department's history: 11,345 calls, about 31 a day. Chief " +
            "Michael LaChance retires and Michael Curtin becomes the 20th chief.",
          calls: 11345,
          source: "ar2025",
        },
        {
          year: 2027,
          text: "A new recruit academy begins on 25 January; a replacement ambulance is due in May.",
          source: "hire",
        },
        {
          year: 2028,
          text: "A second new ambulance and a replacement for Ladder 2 are due.",
          source: "ar2025",
        },
      ],
    },
    calls: {
      intro:
        "Calls have risen by more than half in a decade. About three in four are medical: " +
        "every Burlington engine and ladder carries paramedic-level equipment, and every " +
        "ambulance crew are firefighters too.",
      byYear: {
        title: "Calls for service, by year",
        bars: [
          { label: "FY14", value: 7000, approx: true },
          { label: "FY15", value: 7200, approx: true },
          { label: "FY16", value: 7465 },
          { label: "FY17", value: 7598 },
          { label: "FY18", value: 7895 },
          { label: "FY19", value: 8229 },
          { label: "FY20", value: null },
          { label: "2021", value: 8423 },
          { label: "2022", value: 9864 },
          { label: "2023", value: 10974 },
          { label: "FY24", value: 11096 },
          { label: "FY25", value: 11345 },
        ],
        note:
          "From the fire department's section of each year's city annual report. FY is the " +
          "fiscal year to June; 2021–2023 are calendar years, as those reports gave them. FY14 " +
          "and FY15 are given as \u201cover\u201d a figure; the FY20 report gives no total.",
        source: "annual",
      },
      byType: {
        title: "What the calls were, 2022",
        bars: [
          { label: "Medical and rescue", value: 6817 },
          { label: "False alarms", value: 1332 },
          { label: "Service calls", value: 793 },
          { label: "Good intent, nothing found", value: 648 },
          { label: "Hazardous conditions", value: 151 },
          { label: "Fires", value: 116 },
        ],
        note: "Calendar 2022, by national incident class (NFIRS); 9,864 in all, 7 others.",
        source: "ar2022",
      },
      byUnit: {
        title: "The busiest vehicles",
        bars: [
          { label: "Engine 1", sub: "Station 1 · busiest engine in Vermont", value: 3806 },
          { label: "Ambulance 1", sub: "Station 1 · busiest ambulance in Vermont", value: 3604 },
          { label: "Ambulance 2", sub: "Station 2", value: 3140 },
          { label: "Engine 3", sub: "Station 3 · 2022", value: 2273 },
          { label: "Ladder 2", sub: "Station 2", value: 2213 },
          { label: "Tower 1", sub: "Station 1", value: 2068 },
          { label: "Ambulance 4", sub: "Station 4", value: 2002 },
          { label: "Ladder 4", sub: "Station 4", value: 1558 },
          { label: "Engine 5", sub: "Station 5 · 2022", value: 1022 },
          { label: "Battalion 1", sub: "Station 1 · command", value: 669 },
        ],
        note:
          "Calls each vehicle answered in 2023, except Engines 3 and 5, for which the city gives " +
          "2022. A call usually sends more than one vehicle, so these add up to more than the total.",
        source: "stations",
      },
    },
    money: {
      intro:
        "The fire department is budgeted at $20.7 million for fiscal 2027. Ambulance billing " +
        "brings back $3.2 million of it; the net cost to the city has grown by about half in " +
        "four years.",
      year: "fiscal year 2027, Mayor's recommended",
      lines: [
        { label: "Fire department, spending", amount: 20718651 },
        { label: "Ambulance fees, revenue", amount: 3212155 },
        { label: "Fire safety fees, revenue", amount: 430000 },
      ],
      linesNote:
        "Total revenue $4.10 million, including grants and transfers. From the draft FY27 budget documents.",
      capital: {
        title: "Net cost to the city after fees and grants",
        lines: [
          { label: "FY2027, recommended", amount: 16616496 },
          { label: "FY2026, amended budget", amount: 14948252 },
          { label: "FY2025, actual", amount: 12311955 },
          { label: "FY2024, actual", amount: 11736898 },
          { label: "FY2023, actual", amount: 11156490 },
        ],
        note:
          "Spending less revenue, as the budget worksheet reports it. The 2025 annual report " +
          "puts the front-line fleet at an average of five years old, with a new Ladder 2 on order for 2028.",
      },
      source: "budget",
    },
    coverage: {
      intro:
        "Each station answers first in its own part of the city, and the others back it up. " +
        "Burlington also gives automatic aid to Winooski for some calls, and technical rescue " +
        "to a neighbouring town.",
      columns: ["Area", "First due", "From"],
      districts: [
        { name: "Downtown", firstDue: "Engine 1, Tower 1, Ambulance 1", from: "Station 1, South Winooski Ave", note: "Church Street, the waterfront, offices and schools" },
        { name: "Old North End", firstDue: "Ladder 2, Ambulance 2", from: "Station 2, North Ave", note: "Homes, apartments, a state highway" },
        { name: "The Hill and UVM", firstDue: "Engine 3", from: "Station 3, Mansfield Ave", note: "UVM and UVM Medical Center, about 22,000 people" },
        { name: "New North End", firstDue: "Ladder 4, Ambulance 4", from: "Station 4, North Ave", note: "Homes, schools and senior living" },
        { name: "South End", firstDue: "Engine 5", from: "Station 5, Ferguson Ave", note: "Homes, breweries, light industry, a fuel depot" },
      ],
      source: "stations",
    },
    stationNotes: {
      "burlington-136-s-winooski-ave": {
        text:
          "Central Fire Station, in service since 1926 and the busiest firehouse in Vermont. Home " +
          "to Engine 1, Ambulance 1, Tower 1, Rescue 1 and the shift's Battalion Chief.",
        source: "st1",
      },
      "burlington-132-north-ave": {
        text:
          "The John D. Boardman Station, opened 1980, also houses the Fire Marshal's office and " +
          "training. It is dedicated to the five members of the department who died in the line " +
          "of duty: Firefighter Scott L. Allen, Deputy Chief George K. Carty, Firefighter Frank " +
          "S. Osicky, Captain Joseph J. Linnan and Lieutenant Steven N. \u201cVinny\u201d Costello.",
        source: "st2",
      },
      "burlington-20-mansfield-ave": {
        text:
          "In service since 1895, the oldest working firehouse in Vermont and one of the oldest " +
          "in the country. Engine 3 is assigned three firefighters but, short-staffed, usually runs with two.",
        source: "st3",
      },
      "burlington-1391-north-ave": {
        text:
          "Completed in 1991 around the original 1950s station, which is now its gym. The city's " +
          "page gives the address as 1397 North Avenue; the state's E911 record, which 911 " +
          "dispatch uses, has the building at 1391.",
        source: "st4",
      },
      "burlington-23-ferguson-ave": {
        text: "Completed in 1991. Engine 5 is assigned three firefighters but usually runs with two.",
        source: "st5",
      },
    },
    careers: {
      intro:
        "Burlington is hiring now: applications for entry-level and lateral firefighters close " +
        "at 5 p.m. on 12 October 2026, for a recruit academy starting 25 January 2027.",
      points: [
        "Entry-level starting pay $67,556.02; lateral $70,933.82 to $85,049.27",
        "On top: 4% for Advanced EMTs, 10% for paramedics",
        "48 hours on, 96 off, after a 16-week in-house academy",
        "EMT certification needed to apply; Advanced EMT within two years, with classes provided",
        "Entry-level: a current CPAT by 31 December 2026; Firefighter 1 within a year of hire",
      ],
      applyUrl: `${BTV}/180/How-to-Become-a-Burlington-Firefighter`,
      source: "hire",
    },
    residents: [
      {
        label: "Fire Marshal's office",
        href: `${BTV}/181/Office-of-the-Fire-Marshal`,
        text: "Plan review, fire investigation, public education and a juvenile fire-setter programme.",
      },
      {
        label: "Fire permits and forms",
        href: `${BTV}/182/Fire-Marshal-Forms-and-Permits`,
        text: "Fire alarm, sprinkler, kitchen hood and tent permits, applied for online.",
      },
      {
        label: "Doing work on a building?",
        href: `${BTV}/181/Office-of-the-Fire-Marshal`,
        text: "Call Fire Dispatch on 802-864-5311 first; if an alarm goes off unreported, the owner pays for the false alarm.",
      },
      {
        label: "Fire code of ordinances",
        href: "http://codepublishing.com/vt/burlington/?Burlington13/Burlington13.html",
        text: "The city's fire prevention code, chapter 13.",
      },
    ],
    sources: {
      fire: { label: "City of Burlington, Fire Department", href: `${BTV}/Fire` },
      stations: { label: "City of Burlington, Firehouses", href: `${BTV}/526/Firehouses`, note: "Each station's page gives its vehicles and their calls" },
      st1: { label: "City of Burlington, Station 1", href: `${BTV}/527/Station-1` },
      st2: { label: "City of Burlington, Station 2", href: `${BTV}/528/Station-2` },
      st3: { label: "City of Burlington, Station 3", href: `${BTV}/529/Station-3` },
      st4: { label: "City of Burlington, Station 4", href: `${BTV}/530/Station-4` },
      st5: { label: "City of Burlington, Station 5", href: `${BTV}/531/Station-5` },
      annual: { label: "City of Burlington, Annual Reports 2014–2025", href: `${BTV}/740/Annual-Reports`, note: "Fire department section of each year" },
      ar2022: { label: "City of Burlington, Annual Report 2022", href: `${BTV}/DocumentCenter/View/3205/Annual-Report-2022`, note: "Page 41, incidents by class" },
      ar2025: { label: "City of Burlington, Annual Report 2025", href: `${BTV}/DocumentCenter/View/11639/Annual-Report-2025`, note: "Pages 39–41" },
      budget: { label: "City of Burlington, FY27 budget, 15 – Fire", href: `${BTV}/DocumentCenter/View/12153/15---Fire`, note: "Draft budget documents, Mayor's recommended" },
      hire: { label: "City of Burlington, How to Become a Burlington Firefighter", href: `${BTV}/180/How-to-Become-a-Burlington-Firefighter`, note: "With the Fire Department Employment page for pay" },
    },
  },
  colchester: {
    subtitle: "Colchester Fire · Colchester Rescue · Colchester Technical Rescue",
    description:
      "Colchester's fire department, rescue squad and technical rescue team: four fire stations, " +
      "about 3,300 calls a year, history since 1961, how to volunteer and the town's own figures.",
    facts: [
      ["Services", "Fire, Rescue (paramedic) and Technical Rescue, all town departments"],
      ["Calls, FY2025", "Fire 1,091 · Rescue 2,181 · Technical Rescue 28"],
      ["People", "38+ call firefighters, 6 fire staff, 50+ EMS providers, 24 rescue technicians"],
      ["Fire and rescue chief", "Scott Crady"],
    ],
    contact: {
      chief: "Scott Crady",
      phone: "802-862-4415",
      website: `${COL}/3245/Fire-Department`,
      source: "fire",
    },
    history: {
      intro:
        "Colchester's emergency services grew out of the Malletts Bay Fire Department, one of the " +
        "first volunteer departments in the area. Its members started the town's ambulance squad " +
        "in 1961; the town brought fire, rescue and technical rescue together as its own departments.",
      events: [
        { year: 1955, text: "Around the mid-1950s, the volunteer Malletts Bay Fire Department forms to cover the Malletts Bay part of town.", source: "rhistory" },
        { year: 1961, text: "Its association founds the Malletts Bay Rescue Squad, one of the first volunteer ambulance squads in the area.", source: "rhistory" },
        { year: 1962, text: "The squad's first call comes early in the year; 20 that year, 33 the next, in a town of under 5,000.", calls: 20, source: "rhistory" },
        { year: 1970, text: "The town takes over funding the squad, as its own budget line.", source: "rhistory" },
        { year: 1977, text: "Renamed Colchester Rescue Squad, to make clear it covers the whole town.", source: "rhistory" },
        { year: 1984, text: "Rescue moves from the fire station on Church Road to Blakely Road, near the middle of town.", source: "rhistory" },
        { year: 1990, text: "Rescue starts a dive team with the police and harbormaster, the start of today's Technical Rescue Team (the team's own page dates it to 1989).", source: "tech" },
        { year: 2020, text: "Colchester Fire begins as a town department: career staff supporting mostly volunteer firefighters.", source: "fire" },
        { year: 2023, text: "Fourteen Technical Rescue members deploy for ten days, around the clock, in the July floods.", source: "tr2024" },
        { year: 2025, text: "Rescue answers 2,181 calls; the town proposes paying its fire volunteers on call.", calls: 2181, source: "tr2025" },
      ],
    },
    calls: {
      intro:
        "Rescue answers about twice as many calls as Fire, and a fifth of them are outside its own " +
        "area, helping neighbouring towns. Both have grown since the town fire department began.",
      byYear: {
        title: "Colchester Rescue, calls by fiscal year",
        bars: [
          { label: "FY20", value: 1607 },
          { label: "FY21", value: 1914 },
          { label: "FY22", value: 1990 },
          { label: "FY23", value: 2219 },
          { label: "FY24", value: 2279 },
          { label: "FY25", value: 2181 },
        ],
        note: "From each year's town report. In FY25, 449 calls (20%) were outside Colchester Rescue's primary area.",
        source: "reports",
      },
      byYear2: {
        title: "Colchester Fire, calls by fiscal year",
        bars: [
          { label: "FY21", value: 975 },
          { label: "FY22", value: 1049 },
          { label: "FY23", value: 1152 },
          { label: "FY24", value: null },
          { label: "FY25", value: 1091 },
        ],
        note: "From each year's town report, starting with the department's first year; the FY24 report gives no total.",
        source: "reports",
      },
    },
    corrections: {
      intro:
        "The state's E911 file lists seven fire stations in Colchester. Going to look found that " +
        "three are not fire stations at all, so they are not on this map:",
      items: [
        { address: "245 Main St", finding: "Now a food shelf." },
        { address: "838 Church Rd", finding: "The Colchester Water Department, Fire District No. 2 — a water utility named like a fire department." },
        { address: "282 Ethan Allen Ave", finding: "A small single-bay building with nothing fire-related around it." },
      ],
    },
    money: {
      intro:
        "Fire, Rescue, Technical Rescue, Police and Dispatch together take 44% of Colchester's town " +
        "budget. The town says it now has to pay its volunteers to keep stations staffed.",
      year: "fiscal year 2027, as proposed",
      lines: [
        { label: "Municipal services budget", amount: 18163756 },
        { label: "Public safety: police, fire, rescue, technical rescue, dispatch", amount: 7967487 },
      ],
      linesNote: "A 7.2% increase, including paid on-call staffing for the Fire Department.",
      capital: {
        title: "What it costs the town when someone leaves",
        lines: [
          { label: "Police officer", amount: 134870 },
          { label: "Career firefighter", amount: 112751 },
          { label: "Volunteer EMS provider", amount: 51727 },
        ],
        note: "The town's own estimates of hiring, outfitting and a first year of training.",
      },
      source: "tr2025",
    },
    coverage: {
      intro:
        "Three town services answer different calls, and partners fill the gaps. Colchester Rescue " +
        "covers the whole town except the Route 15 corridor, which St. Michael's Rescue covers.",
      columns: ["Service", "Answers", "From"],
      districts: [
        { name: "Colchester Fire", firstDue: "Fires, alarms, crashes, hazmat, marine and medical first response", from: "Four stations across town", note: "In partnership with St. Michael's College Fire & Rescue" },
        { name: "Colchester Rescue", firstDue: "Ambulance, at paramedic level", from: "687 Blakely Road", note: "Also answers 1 in 5 calls in neighbouring towns" },
        { name: "Technical Rescue", firstDue: "Water, ice, rope, confined space and collapse rescue", from: "687 Blakely Road", note: "Called across Vermont; part of the state's urban search and rescue team" },
      ],
      source: "tr2025",
    },
    stationNotes: {
      "colchester-687-blakely-rd": {
        text: "Home of Colchester Rescue since May 1984, and of the Technical Rescue Team and its five boats.",
        source: "rhistory",
      },
      "colchester-844-church-rd": {
        text: "On Church Road, where the Malletts Bay Fire Department housed the town's first ambulance squad until 1984.",
        source: "rhistory",
      },
    },
    careers: {
      intro:
        "All three services rely on volunteers, and the town now pays fire volunteers on call. Rescue " +
        "has a waiting list; Fire is recruiting all the time.",
      points: [
        "Fire: call firefighters, paid on call, with two hours of training a week",
        "Rescue: volunteer and paid EMTs and paramedics; the squad runs its own CPR training centre",
        "Technical Rescue: at least 24 training sessions a year; divers need advanced open water certification, 50 logged dives and dry-suit certification",
      ],
      applyUrl: `${COL}/3249/Volunteer-Information`,
      source: "fire",
    },
    residents: [
      { label: "Burn permit", href: `${COL}/FormCenter/Police-8/Permit-to-Burn-49`, text: "Request a permit to burn online. Check the state's fire danger first." },
      { label: "911 house sign", href: "https://form.jotform.com/253363968514062", text: "Order a reflective sign so crews can find your house, through Colchester Rescue." },
      { label: "CPR training", href: `${COL}/297/CPR-Training-Center`, text: "Courses from Colchester Rescue's CPR Training Center." },
      { label: "Volunteer with Fire", href: `${COL}/FormCenter/Fire-Department-15/Fire-Volunteer-Application-79`, text: "The town's application for call firefighters." },
    ],
    sources: {
      fire: { label: "Town of Colchester, Fire Department", href: `${COL}/3245/Fire-Department` },
      rescue: { label: "Town of Colchester, Colchester Rescue Squad", href: `${COL}/295/Rescue-Squad` },
      rhistory: { label: "Town of Colchester, Colchester Rescue history", href: `${COL}/300/History` },
      tech: { label: "Town of Colchester, Technical Rescue Team", href: `${COL}/306/Technical-Rescue` },
      reports: { label: "Town of Colchester, Annual Town Reports", href: `${COL}/368/Town-Reports`, note: "Fire, Rescue and Technical Rescue sections, FY2020–FY2025" },
      tr2024: { label: "Town of Colchester, 2023–2024 Annual Town Report", href: `${COL}/Archive.aspx?ADID=1007`, note: "Technical Rescue, page 23" },
      tr2025: { label: "Town of Colchester, 2024–2025 Annual Town Report", href: `${COL}/DocumentCenter/View/11893`, note: "Fire, Rescue and Technical Rescue pages 22–24; budget pages 33–35" },
    },
  },
  williston: {
    description:
      "Williston Fire Department: a career and paid-on-call fire and paramedic service, 2,681 calls " +
      "in 2025, up 41% since 2021, with its history since 1949, apparatus, budget and burn permits.",
    facts: [
      ["Founded", "1949, by local volunteers"],
      ["On duty every day", "An engine with 3 and a paramedic ambulance with 2"],
      ["Calls for service", "2,681 in 2025, up 41% since 2021"],
      ["Fire and EMS budget", "$4.37 million (FY2027, proposed)"],
      ["Chief", "Aaron J. Collette"],
    ],
    contact: { chief: "Aaron J. Collette", phone: "(802) 878-5622", website: WIL, source: "wsite" },
    history: {
      intro:
        "Williston started its own fire department in 1949, when a handful of local men offered their " +
        "services after a serious fire. It now answers more than 2,600 calls a year, most of them medical, " +
        "with career firefighter-paramedics backed by paid-on-call staff.",
      events: [
        { year: 1949, text: "Local volunteers, turned down at first by the Selectboard, organise the Williston Volunteer Fire Department; it answers five calls in its first year.", source: "whistory" },
        { year: 2016, text: "More than 30 call staff on the roster.", source: "r2021" },
        { year: 2021, text: "Call staff fall to an all-time low of eight, as demand rises; the town leans on career firefighter-paramedics.", calls: 1722, source: "r2021" },
        { year: 2023, text: "Nearly 500 calls come in while the on-duty crew is already out on another.", calls: 2324, source: "r2023" },
        { year: 2025, text: "2,681 calls, more than 750 of them overlapping; an American Heart Association Mission: Lifeline Gold award; a one-acre wildfire on Brownell Mountain needs a helicopter.", calls: 2681, source: "r2025" },
      ],
    },
    calls: {
      intro:
        "Calls have risen 41% since 2021, and medical calls by 59% since 2020; two in three calls are " +
        "medical. More and more arrive while the crew is already busy: over 750 overlapping calls in 2025.",
      byYear: {
        title: "Calls for service, by year",
        bars: [
          { label: "FY21", value: 1722 },
          { label: "FY22", value: 2065 },
          { label: "FY23", value: 2189 },
          { label: "FY24", value: 2354 },
          { label: "2025", value: 2681 },
        ],
        note: "From the incident tables in each year's town report: fiscal years to June, then calendar 2025 as the 2025 report gives it.",
        source: "reports",
      },
      byType: {
        title: "What the calls were, 2025",
        bars: [
          { label: "Medical and rescue", value: 1802 },
          { label: "Alarm activations", value: 464 },
          { label: "Good intent, nothing found", value: 200 },
          { label: "Hazardous conditions", value: 75 },
          { label: "Service calls", value: 69 },
          { label: "Fires", value: 67 },
        ],
        note: "Calendar 2025, by national incident class; 2,681 in all, 4 others.",
        source: "r2025",
      },
    },
    money: {
      intro:
        "Fire and EMS spending has grown from $2.4 million in fiscal 2022 to $4.4 million proposed for " +
        "2027. Ambulance billing is budgeted to bring back about $1 million.",
      year: "fiscal year 2027, as proposed",
      lines: [
        { label: "Fire and EMS, spending", amount: 4365070 },
        { label: "Ambulance billing, revenue", amount: 980000 },
      ],
      linesNote: "From the town's proposed FY2027 operating budget.",
      capital: {
        title: "Fire and EMS spending, by year",
        lines: [
          { label: "FY2027, proposed", amount: 4365070 },
          { label: "FY2026, approved", amount: 3957925 },
          { label: "FY2025, actual", amount: 3589557 },
          { label: "FY2024, actual", amount: 3352382 },
          { label: "FY2023, actual", amount: 3127957 },
          { label: "FY2022, actual", amount: 2380326 },
        ],
        note: "Operating spending only; the 2021 ladder and engine purchase ($1.4 million) is on a bond to 2041.",
      },
      source: "r2025",
    },
    stationNotes: {
      "williston-645-talcott-rd": {
        text:
          "Staffed around the clock with an engine company of three and an advanced life support " +
          "ambulance of two. Fleet: two engines, a pumper-tanker for areas without hydrants, a 105-foot " +
          "ladder, ambulances, a command vehicle and an off-road UTV for patient rescue.",
        source: "r2025",
      },
    },
    careers: {
      intro:
        "Williston hires career firefighter-EMTs and paramedics and runs a paid-on-call staff of about " +
        "ten. Its call-staff application is closed until spring 2027.",
      points: [
        "Call staff: experienced firefighters and EMS providers who fill in on busy days and big incidents",
        "About a third of the department's medical providers are paramedics; the rest are Advanced EMTs and EMTs",
        "More than 3,000 hours of training in 2025",
      ],
      applyUrl: WIL,
      source: "wsite",
    },
    residents: [
      { label: "Burn permits online", href: "https://williston.burnpermits.com", text: "Brush piles need a same-day permit with a photo; campfires that meet the town's rules don't. 121 permits in 2025." },
      { label: "Burn permits and campfires", href: `${WIL}/burn-permits--campfires.html`, text: "What counts as a campfire, what you can burn, and the 4 mph wind limit." },
      { label: "Fire station", href: WIL, text: "645 Talcott Road; the department welcomes visitors with questions." },
    ],
    sources: {
      wsite: { label: "Williston Fire Department", href: WIL },
      whistory: { label: "Williston Fire Department, History", href: `${WIL}/history.html` },
      reports: { label: "Town of Williston, Annual Town Reports 2021–2025", href: "https://www.town.williston.vt.us/index.asp?Type=B_BASIC&SEC=%7B0FDD35C4-979C-482B-B25F-B9A97AAFC2B1%7D", note: "Fire Department section, incident tables" },
      r2021: { label: "Town of Williston, 2021 Annual Town Report", href: `${WILT}/2021_Annual_Town_Report.pdf`, note: "Pages 52–53" },
      r2023: { label: "Town of Williston, 2023 Annual Town Report", href: `${WILT}/2023_Annual_Town_Report.pdf`, note: "Pages 54–57" },
      r2025: { label: "Town of Williston, 2025 Annual Town Report", href: `${WILT}/Final_Town_Report_2025.pdf`, note: "Fire Department pages 54–57; budget pages 27 and 32" },
    },
  },
  shelburne: {
    description:
      "Shelburne Fire Department: an all-volunteer fire, heavy rescue, marine rescue and hazmat " +
      "department since 1941, about 30 members and nearly 300 emergencies a year, and how to join.",
    facts: [
      ["Founded", "1941; first town fire money voted in 1923"],
      ["Members", "About 30, all volunteers"],
      ["Emergencies", "Nearly 300 a year"],
      ["Services", "Fire, heavy rescue, marine rescue, hazmat"],
    ],
    contact: { phone: "(802) 985-2366", website: SHEL, source: "contact" },
    history: {
      intro:
        "Shelburne's fire service began with a town meeting vote in 1923 and became a chartered " +
        "department in 1941. It still runs entirely on volunteers, from one station built in 1983.",
      events: [
        { year: 1923, text: "Town Meeting appropriates the first money for fire protection: a chemical engine on a Ford chassis.", source: "history" },
        { year: 1924, text: "The first town fire committee is set up.", source: "about" },
        { year: 1941, text: "The department is chartered and a station built for its new 1941 Buffalo pumper. In its first year members answer ten fire calls, taken by phone at the Shelburne Farms Inn's front desk, with a siren on the schoolhouse roof.", source: "about" },
        { year: 1983, text: "The current station on Shelburne Road opens.", source: "contact" },
        { year: 2016, text: "The department marks 75 years of service.", source: "about" },
        { year: 2023, text: "A century since the town first paid for fire protection.", source: "about" },
      ],
    },
    stationNotes: {
      "shelburne-5380-shelburne-rd": {
        text: "The volunteer station, built in 1983. Shelburne Rescue, a separate volunteer service, provides ambulance cover around the clock.",
        source: "contact",
      },
    },
    careers: {
      intro:
        "Shelburne's firefighters are all volunteers: lawyers, vets, contractors, parents and students. " +
        "New members are onboarded twice a year; experienced firefighters can join any time.",
      points: [
        "Apply, then an interview, which is also your chance to ask questions",
        "No experience needed: the department trains new firefighters from scratch",
        "Applications to join@shelburnefire.org",
      ],
      applyUrl: `${SHEL}/join-our-department`,
      source: "join",
    },
    residents: [
      { label: "Burn permits", href: `${SHEL}/resources`, text: "Request online or through Shelburne Dispatch, (802) 985-8051. Same day only; out before dark; brush only." },
      { label: "Reflective mailbox signs", href: `${SHEL}/resources`, text: "Help crews find your house; proceeds go to the Shelburne Firefighters' Association." },
      { label: "Knox Box programme", href: `${SHEL}/resources`, text: "A locked key box for businesses, so crews can get in without forcing doors." },
      { label: "Support the firefighters", href: `${SHEL}/about/donate-to-firefighters-association`, text: "The Shelburne Firefighters' Association, a 501(c)(3), buys equipment beyond the town budget." },
    ],
    sources: {
      about: { label: "Shelburne Fire Department, About", href: `${SHEL}/about` },
      history: { label: "Shelburne Fire Department, history by Tom Tompkins (2015)", href: `${SHEL}/about/shelburne-fire-history-by-tom-tompkins` },
      join: { label: "Shelburne Fire Department, Join our department", href: `${SHEL}/join-our-department` },
      contact: { label: "Shelburne Fire Department, Contact", href: `${SHEL}/contact` },
    },
  },
  winooski: {
    description:
      "Winooski Fire Department: one station on Main Street, a new 100-foot ladder truck, its fleet, " +
      "staffing, fire prevention and part-time on-call jobs.",
    facts: [
      ["Station", "120 Main Street"],
      ["Staff listed by the city", "9: chief, officers, firefighters and fire inspectors"],
      ["New ladder", "E-One 100-foot ladder truck"],
      ["Chief", "John Audy"],
    ],
    contact: { chief: "John Audy", phone: "802-655-6420", website: `${WIN}/1687/Fire-Department`, source: "about" },
    history: {
      intro:
        "Winooski's fire department covers a small, dense city from one station on Main Street. Recent " +
        "years have brought a new 100-foot ladder truck, a Fire Marshal and a second fire inspector.",
      events: [
        { year: 2025, text: "A Fire Marshal is hired to lead community risk reduction, with a second fire inspector; new part-time on-call firefighters finish the county's basic firefighter class.", source: "budget" },
        { year: 2026, text: "A new 100-foot ladder truck, bought with help from $500,000 of federal recovery (ARPA) money, is expected in service in fiscal 2027 after weeks of training; a station renovation is being planned to help with staffing.", source: "budget" },
      ],
    },
    stationNotes: {
      "winooski-120-main-st": {
        text:
          "Ladder 1, an E-One HR100 100-foot ladder; Engine 1, a 2014 Sutphen Monarch pumper (1,500 gpm, " +
          "1,000 gallons, seats 8); Engine 2, a 1995 Sutphen (1,250 gpm); a utility truck and two command cars.",
        source: "team",
      },
    },
    careers: {
      intro:
        "The department is short-staffed, especially on weekday nights from 6 p.m. to 6 a.m., and is " +
        "hiring part-time on-call firefighters, trained through the Chittenden County basic firefighter class.",
      points: [
        "Part-time, on-call firefighter positions, posted on the city's jobs page",
        "Career staff include a battalion chief, captains, a lieutenant, firefighters and fire inspectors",
      ],
      applyUrl: `${WIN}/jobs`,
      source: "budget",
    },
    residents: [
      { label: "Fire safety resources", href: `${WIN}/348/Fire-Safety-Resources`, text: "Smoke and CO alarms, cooking and heating safety." },
      { label: "Code enforcement", href: `${WIN}/1687/Fire-Department`, text: "The department's code enforcement team keeps rental housing and buildings safe." },
    ],
    sources: {
      about: { label: "City of Winooski, Fire Department", href: `${WIN}/1700/About` },
      team: { label: "City of Winooski, Our Team & Fleet", href: `${WIN}/347/Our-Team-Fleet` },
      budget: { label: "City of Winooski, FY27 Budget Book", href: `${WIN}/DocumentCenter/View/10406/Fiscal-Year-2027-Budget-Book`, note: "Public Safety: Fire Department, page 28; reserves, page 23" },
    },
  },
  milton: {
    description:
      "Milton Fire Department: 40 volunteer firefighters and 10 cadets, about 240 calls a year from the " +
      "Bombardier Road station, Milton Rescue's ambulance service, burn permits and how to join.",
    facts: [
      ["Members", "40 volunteer firefighters, 10 cadets and one part-time employee"],
      ["Calls", "About 240 a year"],
      ["Station", "47 Bombardier Road, opened 2003"],
      ["Also handles", "Hazmat, water rescue and basic vehicle extrication"],
      ["Ambulance", "Milton Rescue, advanced life support, about 1,700 calls a year"],
    ],
    contact: { chief: "Chris Poirier", phone: "802-891-8080", website: `${MIL}/180/Fire`, source: "fire" },
    history: {
      intro:
        "For 66 years Milton's fire department was run by the village, with money from the town. In 2003 " +
        "it moved into a new station and became a town department when the two governments merged.",
      events: [
        { year: 2003, text: "On 27 January the department moves into its new station at 47 Bombardier Road: 12,000 sq ft, finished on time and within budget.", source: "fire" },
        { year: 2003, text: "On 30 June the village and town governments merge, ending 66 years of the village running the fire department.", source: "fire" },
      ],
    },
    stationNotes: {
      "milton-47-bombardier-rd": {
        text:
          "Home to eight pieces of apparatus, two boats and a hazmat trailer. Milton Rescue, the town's " +
          "advanced life support ambulance, works from the same address.",
        source: "fire",
      },
    },
    careers: {
      intro:
        "The fire department is volunteer and paid on call; Milton Rescue has more than 50 volunteers, " +
        "per-diem and full-time members, certified up to paramedic.",
      points: [
        "Firefighters: fill in the volunteer application and the membership committee will set up an interview",
        "The department meets Monday evenings at 7: a business meeting on the first Monday, training on the second and third",
        "Rescue volunteers work one 12-hour shift a week and one 12-hour weekend shift a month",
        "Milton Rescue is hiring per-diem AEMT and paramedic crew chiefs",
      ],
      applyUrl: `${MIL}/180/Fire`,
      source: "fire",
    },
    residents: [
      { label: "Burn permits", href: `${MIL}/197/Burn-Permit`, text: "State law requires a permit from the Town Forest Fire Warden to burn natural wood or debris outdoors." },
      { label: "Green 911 address signs", href: `${MIL}/251/Rescue`, text: "Order a sign so crews, and deliveries, can find your address." },
      { label: "Ambulance billing", href: `${MIL}/375/Billing`, text: "Milton Rescue's billing page." },
    ],
    sources: {
      fire: { label: "Town of Milton, Fire", href: `${MIL}/180/Fire` },
      rescue: { label: "Town of Milton, Rescue", href: `${MIL}/251/Rescue` },
    },
  },
  charlotte: {
    description:
      "Charlotte Volunteer Fire & Rescue Services: a nonprofit fire department and paramedic ambulance " +
      "serving Charlotte since 1950, its fleet, its staffing and current openings.",
    facts: [
      ["Founded", "1950"],
      ["Run by", "Charlotte Volunteer Fire & Rescue Services, Inc., a nonprofit"],
      ["Ambulance", "Two-person paid crew around the clock; paramedic level since 2011"],
      ["Rescue calls", "Over 500 a year"],
      ["Chief", "Jamie Valyou, Director of Emergency Services"],
    ],
    contact: { chief: "Jamie Valyou", website: CVF, source: "members" },
    history: {
      intro:
        "Charlotte's fire and rescue services are run by a private, not-for-profit corporation with two " +
        "agencies, the Charlotte Volunteer Fire Department and the Charlotte Volunteer Rescue Squad. The " +
        "town provides most of its money; private gifts pay for extras the town budget doesn't.",
      events: [
        { year: 1950, text: "Charlotte Volunteer Fire & Rescue Services is founded.", source: "about" },
        { year: 2011, text: "In March, Charlotte Rescue begins paramedic coverage.", source: "ems" },
      ],
    },
    stationNotes: {
      "charlotte-170-ferry-rd": {
        text:
          "Engine 1, a 2004 Seagrave, and Engine 2, a 2019 KME, both 2,000 gpm with compressed-air foam; " +
          "Engine 4, a 2008 GMC; a 1993 International tanker (1,500 gallons); Rescue 3, a 2012 Spartan heavy " +
          "rescue; ambulances A-1 (2014 Ford F450) and A-2 (2020 Ford F-550); two boats and a Kawasaki Mule.",
        source: "fleet",
      },
    },
    careers: {
      intro:
        "The rescue squad keeps a two-person crew at the station 24 hours a day, about 17,472 shift hours " +
        "a year, with permanent staff, 12 per-diem providers and volunteers. Firefighters train every " +
        "Tuesday at 6:30 p.m.",
      points: [
        "Openings: full-time and part-time AEMT or paramedic crew chief, part-time firefighter, per-diem crew chief",
        "Volunteer EMS providers and volunteer firefighters are welcome",
        "Send a cover letter and application to admin@cvfrs.org",
      ],
      applyUrl: `${CVF}/join-us`,
      source: "join",
    },
    residents: [
      { label: "Station tours", href: `${CVF}/the-membership-1`, text: "Stop by to see the station and meet the members." },
      { label: "Ambulance billing", href: `${CVF}/rescue-1`, text: "Handled by ECP Services, the squad's billing partner." },
      { label: "Form 990", href: `${CVF}/about-cvfrs`, text: "The corporation's public inspection copy of its tax return." },
    ],
    sources: {
      about: { label: "CVFRS, About", href: `${CVF}/about-cvfrs` },
      ems: { label: "CVFRS, EMS", href: `${CVF}/rescue-1` },
      members: { label: "CVFRS, Fire members", href: `${CVF}/the-membership-1` },
      fleet: { label: "CVFRS, Apparatus", href: `${CVF}/apparatus-1`, note: "Ambulances from the rescue fleet page, /apparatus" },
      join: { label: "CVFRS, Join our team", href: `${CVF}/join-us`, note: "Staffing from the EMS members page, /the-membership" },
    },
  },
  hinesburg: {
    description:
      "Hinesburg Fire Department: fire, rescue and advanced EMT first response for Hinesburg and St. George, " +
      "641 calls in 2025, three full-time staff and 35 on call, and the budget.",
    facts: [
      ["Staff", "3 full-time, 35 paid on call"],
      ["Calls", "641 in 2025, up 3.7%; 73% rescue and EMS"],
      ["Covers", "Hinesburg and St. George"],
      ["EMS", "Non-transport licence at the Advanced EMT level"],
    ],
    contact: { chief: "Prescott Nadeau", phone: "802-482-2455", website: `${HIN}/1236/Hinesburg-Fire-Department-First-Response`, source: "dept" },
    history: {
      intro:
        "Hinesburg's department answers fire, medical, hazmat and rescue calls from one station on Route 116, " +
        "with paid on-call members and a small full-time staff that the town has been adding to.",
      events: [
        { year: 2024, text: "In September the town hires a full-time chief, Prescott Nadeau; Nick Baker stays on as Deputy Chief.", source: "meeting" },
        {
          year: 2025,
          text:
            "641 calls, 22 of them fires. The department sells Tanker 1, buys a new air compressor and builds a gym in the " +
            "station, partly with donations, and staffs 24-hour shifts with a full-time member four days a week.",
          calls: 641,
          source: "report",
        },
      ],
    },
    calls: {
      intro:
        "Rescue and EMS made up 73% of 2025's calls; Tuesday, Monday and Thursday were the busiest days, and " +
        "10 to 11 a.m. the busiest hour. Calls overlapped 69 times. On 109 calls (17%) the department could not " +
        "respond and mutual aid took over; it gave mutual aid 24 times and received fire mutual aid 26 times.",
    },
    stationNotes: {
      "hinesburg-10340-vt-route-116": {
        text:
          "The department's one station. Its page lists three engines, a tanker, a first-response medical unit " +
          "and a command vehicle; the 2025 report records Tanker 1 being sold.",
        source: "dept",
      },
    },
    money: {
      intro:
        "Hinesburg votes the fire budget as its own article at Town Meeting. For fiscal 2027 the town proposed " +
        "$140,993 (24%) more for fire and rescue, $108,000 of it for a full-time firefighter/EMT to staff six " +
        "days a week around the clock, partly offset by $30,000 less on-call pay.",
      year: "fiscal year 2026, approved at Town Meeting 2025",
      lines: [
        { label: "Fire Department budget", amount: 693775 },
        { label: "Raised through taxes", amount: 625275 },
      ],
      linesNote: "Article VII of the 2025 Town Meeting, as recorded in the minutes.",
      capital: {
        title: "Added to the fiscal 2027 capital budget (proposed)",
        lines: [
          { label: "Set aside to replace Med 1", amount: 20000 },
          { label: "Fire equipment", amount: 5000 },
          { label: "Facilities, increase", amount: 4000 },
        ],
        note: "The main fire additions named in the budget overview.",
      },
      source: "report",
    },
    residents: [
      { label: "Impact fee: fire protection analysis", href: `${HIN}/1254/Fire-Protection-Analysis`, text: "The study behind the fire share of the town's development impact fee." },
    ],
    sources: {
      dept: { label: "Town of Hinesburg, Fire Department & First Response", href: `${HIN}/1236/Hinesburg-Fire-Department-First-Response` },
      report: { label: "Town of Hinesburg, Annual Report FY2025", href: `${HIN}/DocumentCenter/View/3679/Hinesburg-Annual-Report-FY2025`, note: "Fire Department, pages 62-63; FY2027 budget overview, pages 8-12" },
      meeting: { label: "Town of Hinesburg, Annual Report FY2025: minutes of the 2025 Town Meeting", href: `${HIN}/DocumentCenter/View/3679/Hinesburg-Annual-Report-FY2025` },
    },
  },
  "essex-junction-city": {
    description:
      "Essex Junction Fire Department: a paid-on-call department since 1893, 666 calls in 2025, " +
      "a 105-foot ladder and two engines from one station, its history, its pay and how to join.",
    facts: [
      ["Established", "4 March 1893, the day the village charter was approved"],
      ["Members", "About 30, paid on call"],
      ["Calls", "666 in 2025"],
      ["Area protected", "4.6 square miles"],
      ["Station address used by the department", "2 Lincoln Street"],
    ],
    contact: { phone: "802-878-6958", website: EJ, source: "contact" },
    history: {
      intro:
        "Essex Junction's department began as a bucket brigade on the day the village was chartered. " +
        "It is still paid on call: its members work full time as teachers, electricians, nurses, " +
        "carpenters and engineers, and answer the tones when neighbours need help.",
      events: [
        { year: 1893, text: "On 4 March voters approve the village charter, and the department begins the same day as a volunteer bucket brigade.", source: "about" },
        { year: 1895, text: "In December the department buys its first chemical engine, for $750. No fire calls are recorded that year; three are in 1896.", source: "about" },
        { year: 1909, text: "The first alarm box: a rope tied to the striker on the Congregational Church. Break the glass, and pull hard and fast.", source: "about" },
        { year: 1927, text: "The first motorised rig, a Foamite-Childs pumper. In 1929 it helps Burlington twice, the first recorded mutual aid to the city.", source: "about" },
        { year: 1948, text: "An American-LaFrance pumper arrives in July; it serves the village until 1987.", source: "about" },
        { year: 1960, text: "The first recorded operating budget: $6,429.", source: "about" },
        { year: 1962, text: "On 30 November a tank truck carrying 3,000 gallons of vinyl acetate overturns and burns near the Green Mountain Power station on Park Street. The NFPA calls it the first fire of its kind in the country.", source: "about" },
        { year: 1984, text: "On 7 July the department answers the Amtrak derailment in Williston: 35 members, 559 hours of rescue work, and national praise.", source: "about" },
        { year: 2006, text: "In June the station is dedicated to former Assistant Chief Ernie Martin, after his 65 years of service.", source: "about" },
        { year: 2024, text: "The roster stands at 39, six of them new that year. The city starts paying members for training.", calls: 584, source: "review24" },
        { year: 2025, text: "Calls rise 14% in a year.", calls: 666, source: "review25" },
      ],
    },
    calls: {
      intro:
        "Essex Rescue is the city's ambulance; the fire department's first responders are sent when Essex " +
        "Rescue is already on a call and a second one comes in. In 2024 the department gave mutual aid 110 " +
        "times, 84 of them to the Town of Essex, and received it 24 times.",
      byYear: {
        title: "Calls for service by year",
        bars: [
          { label: "2024", value: 584 },
          { label: "2025", value: 666 },
        ],
        note: "Calendar years. The 2025 review gives 2024 as 572; the bar uses the 584 in the department's own 2024 review.",
        source: "review25",
      },
      byType: {
        title: "Calls by type, 2025",
        bars: [
          { label: "First response and medical", value: 217 },
          { label: "Minor fires and fire alarms", value: 145 },
          { label: "Public assistance", value: 120 },
          { label: "Assists to Essex Police and Rescue", value: 51 },
          { label: "Miscellaneous", value: 51 },
          { label: "Fires", value: 45 },
          { label: "Motor vehicle crashes", value: 37 },
        ],
        note: "666 calls in all.",
        source: "review25",
      },
    },
    stationNotes: {
      "essex-junction-city-3-pearl-st": {
        text:
          "The department's one station, which it gives as 2 Lincoln Street. Ladder 3, a 2013 Pierce Arrow XT " +
          "with a 105-foot aerial; Engine 5, a 2008 KME carrying the extrication gear; Engine 7, a 2018 Pierce " +
          "Arrow XT, first due to fires; and Car 9, a 2019 Ford F-150 for command, first response and wildland " +
          "fires. The three big rigs carry the names of the old companies that became Essex Junction Fire: " +
          "Five Corners Hook & Ladder, Hubbells Falls Engine and Painesville Hose.",
        source: "fleet",
      },
    },
    careers: {
      intro:
        "Members are paid on call, starting at $17.50 an hour with a two-hour minimum on every call and " +
        "$1 an hour more for each certification: Firefighter I and II, EMT, Advanced EMT. Gear and classes are paid for.",
      points: [
        "18 or over, living within responding distance of the station; no experience needed",
        "New members take the Chittenden County Basic Course, which runs each February and October",
        "Respond to about 10% of fire calls, roughly 40 a year, and train 10 hours a quarter",
        "Experienced firefighters who meet the interior requirements can be hired any time of year",
      ],
      applyUrl: `${EJ}/become-a-member`,
      source: "join",
    },
    residents: [
      { label: "Knox Box programme", href: `${EJ}/key-access-box`, text: "Required for new and changing commercial and apartment buildings; available for homes too." },
      { label: "Fire prevention visits", href: `${EJ}/fire-prevention`, text: "Presentations, extinguisher training and station tours on request." },
      { label: "Recent calls", href: `${EJ}/recent-calls`, text: "The department writes up its working fires." },
    ],
    sources: {
      home: { label: "Essex Junction Fire Department", href: EJ },
      about: { label: "Essex Junction Fire Department, About", href: `${EJ}/about` },
      fleet: { label: "Essex Junction Fire Department, Apparatus", href: `${EJ}/apparatus` },
      join: { label: "Essex Junction Fire Department, Become a member", href: `${EJ}/become-a-member` },
      contact: { label: "Essex Junction Fire Department, Contact", href: `${EJ}/contact` },
      review24: { label: "Essex Junction Fire Department, 2024 Year in Review", href: `${EJ}/single-post/2024-year-in-review` },
      review25: { label: "Essex Junction Fire Department, 2025 Year in Review", href: `${EJ}/single-post/2025-year-in-review-a-closer-look-at-call-volume` },
    },
  },
  "essex-town": {
    description:
      "Essex Fire Department: the Town of Essex's paid-on-call department, about 37 members and 2,034 calls " +
      "in 2025 from the Sand Hill Road station, plans for a new station, and how to join.",
    facts: [
      ["Staffing", "Paid on call, with per-diem staff; no full- or part-time employees"],
      ["Members", "About 37"],
      ["Calls", "2,034 dispatched in 2025"],
      ["Services", "Fire protection and EMS first response"],
      ["Chief", "Charles Cole"],
    ],
    contact: { chief: "Charles Cole", phone: "802-878-5308", website: `${ET}/616/ESSEX-TOWN-FIRE`, source: "fire" },
    history: {
      intro:
        "The Town of Essex runs its fire department with paid on-call members and per-diem staff, and no " +
        "full-time employees. In 2025 it was dispatched to 2,034 calls; the chief notes it is busier than " +
        "many Vermont departments that do have full-time staff.",
      events: [
        { year: 2022, text: "The Village of Essex Junction separates from the Town of Essex and becomes a city, with its own fire department.", source: "report" },
        { year: 2023, text: "The town buys 80–90 Upper Main Street for $3 million, using federal ARPA money, for a future municipal complex. Among the reasons: the existing fire station has become small and outdated.", source: "report" },
        { year: 2025, text: "The Selectboard adopts a conceptual master plan for the site, with room for a new fire station, and in June picks a fire impact fee that leaves out new-station costs. The department is dispatched to 2,034 calls.", calls: 2034, source: "report" },
        { year: 2026, text: "The fire budget proposed for fiscal 2027 is 10.9% lower than the year before, with capital equipment moved to the capital budget. Town Meeting's ballot carries advisory questions on designing the Upper Main Street site.", source: "report" },
      ],
    },
    stationNotes: {
      "essex-town-188-sand-hill-rd": {
        text:
          "The town gives the station's address as 190 Sand Hill Road. It shares its site with the Water and " +
          "Sewer building and the Highway Garage, and is not usually staffed: for urgent questions that aren't " +
          "emergencies, call Essex Police dispatch on 802-878-8331. If a new station is built, this one would " +
          "become space for Public Works.",
        source: "fire",
      },
    },
    careers: {
      intro:
        "About 37 volunteer and per-diem members, many cross-trained as EMTs, hazmat technicians, police " +
        "officers or nurses. New members with little experience are trained from the ground up.",
      points: [
        "Start with station duties, radio, hydrant hook-ups, tanker fills and hose; responsibilities grow with rank and certifications",
        "The department provides all training and equipment",
        "Employers in Essex are asked to let staff leave work to answer calls",
        "Ask about joining or the cadet programme on 802-878-5308",
      ],
      applyUrl: `${ET}/1410/Volunteer-Join-the-Team`,
      source: "join",
    },
    residents: [
      { label: "Open house", href: `${ET}/1580/FIRE-DEPARTMENT-OPEN-HOUSE`, text: "Every October, closing Fire Prevention Week: demos, the trucks and free food." },
      { label: "Fireworks permits", href: `${ET}/947/Fireworks-Permitting`, text: "How to get a permit for a display in town." },
      { label: "Commercial fire safety", href: `${ET}/1405/Commercial-Fire-Safety-Guidelines`, text: "Guidelines for businesses." },
      { label: "Essex Firefighters' Association", href: `${ET}/1412/Essex-Firefighters-Association`, text: "A nonprofit that buys equipment and supports members beyond what taxes cover." },
    ],
    sources: {
      fire: { label: "Town of Essex, Essex Town Fire", href: `${ET}/616/ESSEX-TOWN-FIRE` },
      join: { label: "Town of Essex, Volunteer & Join the Team", href: `${ET}/1410/Volunteer-Join-the-Team` },
      report: { label: "Town of Essex, Annual Report 2025", href: `${ET}/Archive.aspx?ADID=10415`, note: "Fire Department, page 59; Upper Main Street, pages 10–12" },
    },
  },
  westford: {
    description:
      "Westford Volunteer Fire Department: founded in 1982, about 35 to 45 calls a year from the Cambridge Road " +
      "station, its four trucks, its budget and how to volunteer.",
    facts: [
      ["Founded", "1982"],
      ["Calls", "33 in fiscal 2025; 35 to 45 in a usual year"],
      ["Station", "35 Cambridge Road, joined to the town highway garage"],
      ["Chief", "Garrett Bartlett, also the Town Fire Warden"],
    ],
    contact: { chief: "Garrett Bartlett", phone: "(802) 879-6505", website: WF, source: "town" },
    history: {
      intro:
        "Westford's volunteers organised in 1982 to give the town fire protection and mutual aid for its " +
        "neighbours. Members come from Westford, Cambridge, Essex and Jericho.",
      events: [
        { year: 1982, text: "The Westford Volunteer Fire Department is established by community members.", source: "home" },
        { year: 2025, text: "33 calls in the fiscal year, motor vehicle crashes the largest share. Joint training with Fairfax and Essex, including a live burn in a donated building. The paid-on-call programme, giving volunteers modest pay, is in its second year, and a new pumper-tanker is being built, expected in spring 2026.", source: "report" },
      ],
    },
    calls: {
      intro:
        "A rural town with few hydrants: the department drafts from ponds and dry hydrants and shuttles water " +
        "by tanker, and is often called to tanker task forces in neighbouring towns.",
      byType: {
        title: "Calls by type, fiscal 2025",
        bars: [
          { label: "Motor vehicle crashes", value: 11 },
          { label: "Carbon monoxide alarms", value: 4 },
          { label: "EMS and rescue assists", value: 4 },
          { label: "Cancelled en route", value: 4 },
          { label: "Chimney fires", value: 2 },
          { label: "Mutual aid", value: 2 },
          { label: "Structure fire", value: 1 },
          { label: "Smoke or gas in a building", value: 1 },
          { label: "Fire alarm", value: 1 },
          { label: "Tree down", value: 1 },
          { label: "Goodwill call", value: 1 },
        ],
        note: "July 2024 to June 2025. The report gives 33 calls; its list adds up to 32.",
        source: "report",
      },
    },
    stationNotes: {
      "westford-35-cambridge-rd": {
        text:
          "Engine 10, a 2017 E-One pumper (1,250 gpm, 1,280 gallons), first out to alarms and fires; Engine 11, " +
          "a 1995 Desorcie pumper that supplies water; Tanker 12, a 1992 Desorcie with 1,800 gallons; and Rescue " +
          "14, a 2008 E-One rescue carrying the Jaws of Life.",
        source: "apparatus",
      },
    },
    money: {
      intro:
        "The fire budget for fiscal 2027 was proposed unchanged from fiscal 2026. The capital plan puts money " +
        "aside each year for the next engine, air packs, extrication tools, turnout gear and the rescue truck.",
      year: "fiscal year 2027 (proposed)",
      lines: [
        { label: "Fire Department, total", amount: 137668 },
        { label: "Operations", amount: 69086 },
        { label: "Capital reserve", amount: 39730 },
        { label: "Loan payment, pumper truck", amount: 28852 },
      ],
      linesNote: "Fiscal 2025 actual spending was $147,204.",
      capital: {
        title: "Fire capital plan, fiscal 2027–2031",
        lines: [
          { label: "FY2029", amount: 61704 },
          { label: "FY2030", amount: 47704 },
          { label: "FY2028", amount: 43100 },
          { label: "FY2027", amount: 39730 },
          { label: "FY2031", amount: 32604 },
        ],
        note: "Largest year first. The plan replaces the 1995 tanker in 2026, at $675,000.",
      },
      source: "report",
    },
    careers: {
      intro:
        "Westford Fire is recruiting firefighters, fire police and auxiliary support. Training is provided " +
        "and no experience is needed.",
      points: [
        "16 or over; under-18s need a parent's permission",
        "Apply by email, at the town office or at Monday training, 7 to 8:30 p.m. at the station",
        "About six months' probation, then full membership",
        "CPR/AED and the free online ICS 100 and 700 courses within a year",
      ],
      applyUrl: `${WF}/join/`,
      source: "join",
    },
    residents: [
      { label: "Burn permits", href: `${WT}/administration/fire-warden/`, text: "Apply online. The Fire Warden opens or closes the system each day, and closes it when strong winds are forecast." },
      { label: "Ambulance", href: `${WT}/emergency/`, text: "Essex Rescue and Fairfax Rescue, which covers the north of town." },
    ],
    sources: {
      home: { label: "Westford Volunteer Fire Department", href: WF },
      apparatus: { label: "Westford Volunteer Fire Department, Apparatus", href: `${WF}/apparatus/` },
      join: { label: "Westford Volunteer Fire Department, Join", href: `${WF}/join/` },
      town: { label: "Town of Westford, Emergency", href: `${WT}/emergency/` },
      report: { label: "Town of Westford, 2026 Annual Town Report", href: `${WT}/wp-content/uploads/2026/02/Town-Report-2026.pdf`, note: "Fire Department, pages 51–53; budget, pages 16–17; capital plan, page 27" },
    },
  },
  huntington: {
    description:
      "Huntington Fire Department: about 18 volunteers answering fire, medical first response and backcountry " +
      "search and rescue calls, around 100 a year, and how burn permits work.",
    facts: [
      ["Members", "About 18 active volunteers, all from town"],
      ["Calls", "About 100 a year"],
      ["Services", "Fire, medical first response, backcountry search and rescue"],
      ["Station", "4960 Main Road, Upper Village"],
      ["Chief", "Ben Roll"],
    ],
    contact: { chief: "Ben Roll", website: `${HUN}/fire-department/`, source: "dept" },
    history: {
      intro:
        "Huntington has no ambulance of its own, so the department's licensed first responders treat patients " +
        "at medical calls and crashes until an ambulance arrives. Its members also run a backcountry search and " +
        "rescue team.",
      events: [
        { year: 2001, text: "In October the town adopts its ordinance regulating outdoor burning, which the Fire Warden enforces.", source: "warden" },
      ],
    },
    careers: {
      intro: "Every member is a volunteer from Huntington, serving as a firefighter, first responder or EMT, or on the search and rescue team.",
      points: [
        "Firefighters train the first three Mondays of the month at 7 p.m.",
        "EMS members meet on the fourth Monday at 7 p.m.",
        "The backcountry search and rescue team meets once or twice a month, evenings or Saturdays",
      ],
      applyUrl: `${HUN}/fire-department/`,
      source: "dept",
    },
    residents: [
      { label: "Burn permits", href: `${HUN}/fire-warden/`, text: "Needed for brush and for campfires over 36 inches across; the Fire Warden can issue one over the phone. Burning garbage is illegal." },
    ],
    sources: {
      dept: { label: "Town of Huntington, Fire Department", href: `${HUN}/fire-department/` },
      warden: { label: "Town of Huntington, Fire Warden", href: `${HUN}/fire-warden/` },
    },
  },
  jericho: UJFD,
  underhill: UJFD,
};

/** Thousands separators, no decimals: 7528864 → "7,528,864". */
export const dollars = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
