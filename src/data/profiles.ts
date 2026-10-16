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

const MFD = "https://www.middleburyfiredept.org";
const MIDT = "https://www.townofmiddlebury.org";
const VERG = "https://www.vergennes.org";
const BFD = "https://www.bristolfiredepartment.org";
const BRT = "https://bristolvt.org/wp-content/uploads";

const STK = "https://www.starksborovt.org";
const HAN = "https://www.hancockvt.org";
const RIP = "https://www.riptonvermont.org";

const BRP = "https://bridportvt.org";
const ORW = "https://townoforwellvt.org";

const ENO = "https://www.enosburghvt.org";
const FFD = "https://fairfieldvermont.us";
const FFX = "https://www.fairfax-vt.gov";
const SAT = "https://www.stalbanstown.com";
const SWA = "https://www.swantonvt.gov";

const RCH = "https://www.richfordvt.org";
const FRK = "https://www.franklinvermont.org";

const GIF = "https://grandislefire.org";
const GIT = "https://grandislevt.org";
const SHF = "https://southherofire.com";
const SHT = "https://southherovt.org";
const ILM = "https://islelamotte.us";

const MPL = "https://www.montpelier-vt.org";
const BAC = "https://www.barrecity.org";
const BAT = "https://www.barretown.org";
const WFD = "https://www.waterburyvtfire.com/WFD";
const NFD = "https://www.northfield-vt.gov";

const WRN = "https://www.warrenvt.org";
const EMF = "https://www.emfd.org";
const EMT = "https://eastmontpeliervt.org";
const CAB = "https://cabotvt.us";
const ROX = "https://roxburyvt.org";
const MOR = "https://www.moretownvt.org";

const STW = "https://www.stowevt.gov";
const HYP = "https://www.hydeparkvt.com";
const EDN = "https://www.edenvt.org";
const ELM = "https://elmorevt.org";

const SJB = "https://www.stjvt.com";
const BRK = "https://www.burkevermont.org";
const NWK = "https://www.newarkvtfire.org";
const RYE = "https://ryegatevt.org";
const HWK = "https://hardwickvt.gov";
const PCH = "https://peachamfiredepartment.com";

const BRA = "https://brattleboro.gov";
const GVF = "https://www.gvfd90.org";
const NBF = "https://www.newbrookfire.org";
const RKM = "https://www.rockinghamvt.org";
const WMS = "https://www.westminstervt.org";
const VER = "https://vernonvt.org/vernon-volunteer-fire-department";

// One department since 2025 for the whole town of Rockingham, shown on the three
// pages that cover it: Rockingham, Bellows Falls and Saxtons River.
const ROCKINGHAM: Profile = {
  description:
    "Rockingham Fire & Rescue: the Town of Rockingham's unified fire and EMS department since 2025, carrying on the " +
    "Bellows Falls Fire Department (1825), Rockingham and Saxtons River volunteers and Saxtons River First Response.",
  subtitle: "Rockingham Fire & Rescue",
  facts: [
    ["Department", "Rockingham Fire & Rescue, one municipal department since 2025"],
    ["Roots", "Bellows Falls Fire Department, founded 1825"],
    ["EMS", "Advanced EMT-level first response"],
    ["Chief", "Shaun McGinnis"],
  ],
  contact: { chief: "Shaun McGinnis", phone: "802-463-4343", website: `${RKM}/firedepartment`, source: "rfr" },
  history: {
    intro:
      "Fire protection in Rockingham goes back nearly two centuries, to the Bellows Falls Fire Department in a dense " +
      "mill, railroad and river village. In 2025 the town brought its fire and rescue organisations together into one " +
      "municipal department, working from several stations.",
    events: [
      { year: 1825, text: "The Bellows Falls Fire Department is founded.", source: "rfr" },
      { year: 1907, text: "The Island House fire.", source: "rfr" },
      { year: 1912, text: "In March the Great Bellows Falls Fire devastates part of the downtown business district.", source: "rfr" },
      { year: 1970, text: "The Rockingham Volunteer Fire Department is formed on 16 August.", source: "rfr" },
      { year: 1981, text: "On 29 December Bellows Falls firefighters Terry Brown and Dana Fuller die in the line of duty at the Star Hotel fire.", source: "rfr" },
      { year: 1989, text: "Saxtons River First Response Rescue begins on 1 January, giving Advanced EMT-level care.", source: "rfr" },
      { year: 2024, text: "The Vermont Department of Health names Saxtons River First Response Rescue the state's First Responder Service of the Year.", source: "rfr" },
      { year: 2025, text: "On 1 March Town Meeting approves a consolidated fire and rescue model, after an AP Triton feasibility study. Saxtons River First Response ends on 31 October and the Rockingham VFD on 1 November, as Rockingham Fire & Rescue takes over.", source: "rfr" },
    ],
  },
  residents: [],
  sources: {
    rfr: { label: "Town of Rockingham, Rockingham Fire & Rescue", href: `${RKM}/firedepartment` },
  },
};

const NPT = "https://www.newportvermont.org";
const TRY = "https://www.troyvt.gov";

const RUC = "https://www.rutlandcity.org";
const RUT = "https://www.rutlandtown.com";
const PAW = "https://pawletfire.org";
const PIT = "https://www.pittsfordvermont.com";

const POU = "https://www.poultneyvt.gov";
const CAS = "https://www.castletonvermont.org/sites/g/files/vyhlif376/f";
const FH = "https://fairhavenvt.gov";
const PRO = "https://proctorvermont.com";
const WAL = "https://www.wallingfordvt.com";

const WRT = "https://www.westrutlandvt.org";
const CLA = "https://www.clarendonvt.gov";
const MHO = "https://www.mounthollyvt.org";
const SHR = "https://www.shrewsburyvt.org";
const MSP = "https://middletownsprings.vt.gov";

// One department, two town pages: Underhill and Jericho share the profile.
const UJFD: Profile = {
  description:
    "Underhill-Jericho Fire Department: a volunteer fire and first-response EMS department since 1913, " +
    "two stations, a weekday duty crew, backcountry rescue, burn permits and how to join.",
  facts: [
    ["Founded", "1913"],
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
      ["Founded", "1893"],
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
  middlebury: {
    description:
      "Middlebury Fire Department: a paid on-call department since 1920, 262 calls in 2025, a technical " +
      "rescue team for water, rope and ice, Middlebury College student firefighters, and burn permits.",
    facts: [
      ["Calls", "262 in 2025, of 50 different kinds"],
      ["Staffing", "Paid on call; residents and selected Middlebury College students"],
      ["Technical rescue", "Swift water, rope, ice and land search"],
      ["Chief", "David Shaw, a member since 1980"],
    ],
    contact: { chief: "David Shaw", phone: "802-388-4462", website: MFD, source: "contact" },
    history: {
      intro:
        "Middlebury's fire department took its current name on 7 May 1920, though fire protection in the " +
        "town is much older. It is paid on call, and its own technical rescue team handles water, rope and " +
        "ice rescue.",
      events: [
        { year: 1920, text: "The Middlebury Fire Department is established under its current name on 7 May.", source: "history" },
        {
          year: 2025,
          text:
            "262 calls, 1,825 hours on calls and more than 2,260 hours of training. A $19,500 grant pays for two " +
            "new dry hydrants, in Otter Creek and the East Middlebury River, put in with the highway " +
            "department. A $30,000 campaign, led by G. Stone Motors and three other donors, renews the " +
            "technical rescue team's equipment.",
          calls: 262,
          source: "report",
        },
        { year: 2028, text: "A new utility truck is expected early in the year.", source: "report" },
      ],
    },
    stationNotes: {
      "middlebury-5-seymour-st": {
        text:
          "Station 1, on Seymour Street. The technical rescue team keeps two motorised Zodiac boats here and " +
          "a rescue truck with a winch and lighting. The non-emergency line, 802-388-4462, is answered only " +
          "when members are at the station.",
        source: "rescue",
      },
    },
    careers: {
      intro:
        "Membership has dipped slightly and the department is looking for people with the time to give. " +
        "No fire or EMT experience is needed.",
      points: [
        "Live in Middlebury and be 18 or over; cadets from 16",
        "Contact the membership coordinator at mfdvtmembership@gmail.com",
        "Middlebury College students apply through the department's student, faculty and staff liaisons",
        "Any member can train with and join the technical rescue team",
      ],
      applyUrl: `${MFD}/apply-now`,
      source: "apply",
    },
    residents: [
      { label: "Burn permits", href: `${MFD}/your-safety`, text: "Always required. Burning only from 1 November to the third Sunday of April, 8 a.m. to 4 p.m.; permits issued on the day, at the police station or from Chief Shaw." },
      { label: "Technical rescue", href: `${MFD}/technical-rescue`, text: "For water, ice or rope emergencies call 911, or the department's dispatch on 802-388-2217." },
      { label: "Fire safety for kids", href: `${MFD}/your-safety`, text: "Links to Sparky and the U.S. Fire Administration." },
    ],
    sources: {
      history: { label: "Middlebury Fire Department, Our History", href: `${MFD}/our-history` },
      contact: { label: "Middlebury Fire Department, Contact", href: `${MFD}/contact-us` },
      rescue: { label: "Middlebury Fire Department, Technical Rescue Team", href: `${MFD}/technical-rescue` },
      apply: { label: "Middlebury Fire Department, Become a Firefighter", href: `${MFD}/apply-now` },
      report: { label: "Town of Middlebury, 2025 Town Report", href: `${MIDT}/Document/Government/Selectboard/Town%20Meeting/2026/2025%20Town%20Report.pdf`, note: "Middlebury Fire Department, pages 14–15. A scanned report, read with text recognition" },
    },
  },
  vergennes: {
    description:
      "Vergennes Fire Department: 40 volunteers serving Vergennes, Panton, Waltham and Ferrisburgh, " +
      "185+ calls in 2025, a newly bought 100-foot tower ladder, and plans for the ageing station.",
    facts: [
      ["Members", "40 active volunteers, a full roster"],
      ["Calls", "More than 185 in 2025"],
      ["Covers", "Vergennes, Panton, Waltham and Ferrisburgh"],
      ["Out the door", "Typically under five minutes"],
      ["Chief", "David DiBiase"],
    ],
    contact: { chief: "David DiBiase", phone: "802-877-3201", website: `${VERG}/departments/accessor.php`, source: "fire" },
    history: {
      intro:
        "Vergennes' volunteer department answers for the city and three neighbouring towns, and keeps a full " +
        "roster at a time when many departments can't. Its station, renovated in 1978, is the big question now.",
      events: [
        { year: 2023, text: "A Dubois & King assessment of the fire station, with mould, asbestos and lead surveys.", source: "fire" },
        { year: 2024, text: "VIA produces concept designs and budget options for renovating or replacing the station.", source: "fire" },
        {
          year: 2025,
          text:
            "More than 185 calls. The department buys two used trucks in excellent condition, a 100-foot tower " +
            "ladder and a pumper-tanker, and dedicates the ladder to Michael Collette, a member for more than " +
            "60 years. Deputy Chief Matt Fraley is named Chief Officer of the Year by the state and county " +
            "firefighters' associations.",
          calls: 185,
          callsApprox: true,
          source: "report",
        },
        { year: 2026, text: "In February the city manager sets up a committee from the four towns to weigh renovating the station, building a new one or adding a satellite station; in March the city applies for congressionally directed spending. The department also begins a community risk reduction programme with Fire Safe 802.", source: "fire" },
      ],
    },
    stationNotes: {
      "vergennes-50-green-st": {
        text:
          "The department's one station, renovated in 1978. The 2025 annual report says it has deteriorated " +
          "and no longer meets the department's needs; studies, concept designs and the committee's meetings " +
          "are posted on the city's fire page.",
        source: "fire",
      },
    },
    residents: [
      { label: "Fire station plans", href: `${VERG}/departments/accessor.php`, text: "The committee's agendas, minutes and videos, and the station studies." },
      { label: "Knox Box", href: `${VERG}/departments/accessor.php`, text: "How to buy a key box for your property." },
    ],
    sources: {
      fire: { label: "City of Vergennes, Fire Department", href: `${VERG}/departments/accessor.php` },
      report: { label: "City of Vergennes, 2026 Annual Report", href: "https://www.dropbox.com/scl/fi/6nexrlvrr71dfvy1naqld/2026-Annual-Report-Corrected-ver.1.pdf?rlkey=sx1tpjd6iz5y06omf8zp1icoz&dl=0", note: "Fire Department annual report for 2025, pages 19–20" },
    },
  },
  bristol: {
    description:
      "Bristol Fire Department: paid on-call firefighters answering about 130 calls a year, six years of call " +
      "figures, the engines, the cadet programme, Knox Boxes and burn permits.",
    facts: [
      ["Calls", "127 in 2025, 1,784 hours of work"],
      ["Staffing", "Paid on call"],
      ["Station address used by the department", "62 Firehouse Drive"],
      ["Mutual aid", "One of 17 departments in the Addison County system"],
    ],
    contact: { chief: "Brett LaRose", phone: "802-453-3201", website: BFD, source: "contact" },
    history: {
      intro:
        "Bristol's firefighters are paid on call: everyone holds a full-time job elsewhere, carries a pager and " +
        "responds when they can. The department is part of the Addison County Fire Mutual Aid System of 17 departments.",
      events: [
        { year: 2024, text: "133 incidents. Gifts from a local business, a nonprofit and memorial donations buy a turnout-gear dryer, cutting drying time from about 36 hours to 4.", calls: 133, source: "r2024" },
        { year: 2025, text: "127 incidents, 1,020 hours of training. Peter Bouvier marks 40 years of service, John \"Peeker\" Heffernan 35, and Chief Brett LaRose and Matthew Lathrop 30 each.", calls: 127, source: "r2025" },
      ],
    },
    calls: {
      intro:
        "Bristol's call volume has held between about 110 and 150 a year. In 2024 the hours behind those " +
        "calls came to 1,698, plus about 1,900 hours of training, inspections and station upkeep.",
      byYear: {
        title: "Calls for service by year",
        bars: [
          { label: "2020", value: 108 },
          { label: "2021", value: 132 },
          { label: "2022", value: 146 },
          { label: "2023", value: 125 },
          { label: "2024", value: 133 },
          { label: "2025", value: 127 },
        ],
        note: "Calendar years, from the fire chief's report in each year's town report.",
        source: "r2025",
      },
    },
    stationNotes: {
      "bristol-79-west-st": {
        text:
          "The department gives its address as 62 Firehouse Drive; the state's E911 file lists 79 West St. " +
          "Engine 1, a 2023 pumper-tanker (1,500 gpm, 1,000 gallons), is first due; Engine 2, a 2007 Spartan " +
          "pumper-tanker (2,000 gpm, 3,000 gallons), brings water and answers mutual aid calls; plus a 2001 " +
          "Ford heavy rescue for crashes and technical rescue.",
        source: "fleet",
      },
    },
    careers: {
      intro:
        "Paid on call at the state minimum wage for calls, training, inspections and station duties. The " +
        "average firefighter answers about 30% of calls.",
      points: [
        "18 or over, a high school diploma or GED, and a Vermont driver's licence",
        "Live within 10 minutes of the station",
        "About 230 hours of training for Firefighter 1, within two years",
        "Answer at least 15% of calls a year",
        "Cadets aged 15 to 18 train with the department, with a parent's consent",
      ],
      applyUrl: `${BFD}/paidoncall.html`,
      source: "join",
    },
    residents: [
      { label: "Burn permits", href: `${BFD}/open-burning.html`, text: "Free, same-day only, issued after 8 a.m. once the morning fire danger rating is out. Natural wood only." },
      { label: "Knox Box programme", href: `${BFD}/knox-box-program.html`, text: "A key box keyed to the department's master key, so crews can get in without forcing doors." },
      { label: "Car seat checks", href: `${BFD}/car-seats.html`, text: "Free child safety seat inspections by a certified technician." },
      { label: "Cadet programme", href: `${BFD}/bfd-Cadet-firefighter-program.html`, text: "For 15- to 18-year-olds interested in the fire service." },
    ],
    sources: {
      contact: { label: "Bristol Fire Department, Contact", href: `${BFD}/contact-us.html` },
      fleet: { label: "Bristol Fire Department, Apparatus", href: `${BFD}/apparatus.html` },
      join: { label: "Bristol Fire Department, Paid on-call firefighter", href: `${BFD}/paidoncall.html` },
      r2024: { label: "Town of Bristol, 2024 Annual Town Report", href: `${BRT}/2025/02/Town_of_Bristol_FY2024_Annual_Report_web.pdf`, note: "Fire Department report, pages 70–71" },
      r2025: { label: "Town of Bristol, 2025 Annual Town Report", href: `${BRT}/2026/02/Town_of_Bristol_FY2025_Annual_Report_web.pdf`, note: "Fire Department report, page 77. Earlier years from the 2020–2023 town reports on bristolvt.org" },
    },
  },
  starksboro: {
    description:
      "Starksboro Volunteer Fire Department: about 50 to 65 calls a year from two stations, a new Engine 1 " +
      "in 2025, plans for a new Station 2 in South Starksboro, and the town's volunteer first responders.",
    facts: [
      ["Calls", "54 in 2025"],
      ["Stations", "Main station off Route 116; Station 2 in South Starksboro"],
      ["Run by", "Starksboro Volunteer Fire Department, Inc., with a $24,000 town appropriation"],
      ["First response", "Volunteer EMTs, 108 calls in 2025"],
      ["Chief", "Tom Estey"],
    ],
    contact: { chief: "Tom Estey", phone: "802-373-6529", website: `${STK}/fire-department`, source: "dept" },
    history: {
      intro:
        "Starksboro's firefighters are volunteers, organised as a nonprofit the town helps fund. A separate " +
        "volunteer first response team of EMTs, unpaid and without even a stipend, answers medical calls in town.",
      events: [
        { year: 2022, text: "48 calls, 536 hours on calls and 399 hours of training. The department asks Town Meeting to approve a new fire truck.", calls: 48, source: "r2023" },
        { year: 2023, text: "The Development Review Board approves the site plan for a new two-bay Station 2 beside the 1874 Jerusalem Schoolhouse, replacing a deteriorating 1970s addition.", source: "station2" },
        { year: 2024, text: "64 calls, 17 more than the year before, with 672 hours on calls and 629 of training. Three new members join.", calls: 64, source: "r2024" },
        { year: 2025, text: "The new Engine 1 arrives in June and goes into service at the end of July, once the pump operators are trained. 54 calls, 426 hours on calls, 251 of training.", calls: 54, source: "r2025" },
      ],
    },
    calls: {
      intro:
        "Firefighters answer building fires, crashes, carbon monoxide calls, medical assists and mutual aid. " +
        "The first responders logged 158 calls in 2024 and 108 in 2025, most of them medical.",
      byYear: {
        title: "Fire department calls by year",
        bars: [
          { label: "2022", value: 48 },
          { label: "2023", value: 47 },
          { label: "2024", value: 64 },
          { label: "2025", value: 54 },
        ],
        note: "Calendar years, from the chief's report in each town report. 2023 is worked out from the 2024 report's \"17 more calls than last year\".",
        source: "r2025",
      },
    },
    stationNotes: {
      "starksboro-397-jerusalem-rd": {
        text:
          "Station 2, a small 1970s addition to the 1874 Jerusalem Schoolhouse, houses one truck for South " +
          "Starksboro. The town plans a stand-alone two-bay station here and a renovated schoolhouse as a " +
          "community centre; approvals are in place and the town is seeking funding.",
        source: "station2",
      },
    },
    money: {
      intro:
        "The department is a nonprofit corporation. The town appropriates $24,000 a year; donations and the " +
        "coin drop make up much of the rest. Fiscal 2025 included a down payment on the new truck.",
      year: "fiscal year 2025 (July 2024 to June 2025), receipts",
      lines: [
        { label: "Town appropriation", amount: 24000 },
        { label: "Donations", amount: 5579 },
        { label: "Coin drop", amount: 3508 },
        { label: "Other income", amount: 2216 },
      ],
      linesNote: "The treasurer's report, rounded to the dollar.",
      capital: {
        title: "Largest spending, fiscal 2025",
        lines: [
          { label: "Down payment on the new truck", amount: 4620 },
          { label: "Heating, Station 1", amount: 3737 },
          { label: "Fire equipment", amount: 3117 },
          { label: "Radios, pagers and repairs", amount: 2959 },
        ],
        note: "Total spending that year was $31,035.",
      },
      source: "r2025",
    },
    careers: {
      intro: "The department is always looking for new members.",
      points: [
        "Business meetings the first Monday of the month; drills the third Monday and the last Wednesday",
        "Stop by the station, or contact the chief",
        "First response members must have lived in town a year and hold a Vermont EMS certification",
      ],
      applyUrl: `${STK}/fire-department`,
      source: "r2025",
    },
    residents: [
      { label: "Burn permits", href: `${STK}/fire-department`, text: "For grass, leaves, brush or untreated natural wood: call Chief Tom Estey or Assistant Chief Tony Porter. All other burning is illegal." },
      { label: "Station 2 project", href: `${STK}/schoolhouse-fire-station-2-project`, text: "Plans, assessments and approvals for the Jerusalem Community Center and fire station." },
    ],
    sources: {
      dept: { label: "Town of Starksboro, Fire Department", href: `${STK}/fire-department` },
      station2: { label: "Town of Starksboro, Jerusalem Community Center & Fire Station Project", href: `${STK}/schoolhouse-fire-station-2-project` },
      r2023: { label: "Town of Starksboro, Town Report 2022–23", href: `${STK}/sites/default/files/uploads/town%20reports/2022-2023-town-report-final.pdf`, note: "Fire Department, page 61" },
      r2024: { label: "Town of Starksboro, Town Report 2023–24", href: `${STK}/sites/default/files/uploads/town%20reports/town-report-2023-2024-final.pdf`, note: "Fire Department, page 63; First Response, page 61" },
      r2025: { label: "Town of Starksboro, Town Report 2024–25", href: `${STK}/sites/default/files/uploads/content/web_starksboro.pdf`, note: "Fire Department, pages 58–59; First Response, page 56" },
    },
  },
  hancock: {
    description:
      "Hancock Volunteer Fire Department: a small volunteer department answering about 20 calls " +
      "a year, mostly crashes, and looking for volunteers and a first responder team.",
    facts: [
      ["Calls", "19 in fiscal 2025"],
      ["Budget", "Raised to $15,000 by Town Meeting 2025"],
      ["Chief", "Jacques Veilleux"],
    ],
    contact: { chief: "Jacques Veilleux", website: HAN, source: "report" },
    history: {
      intro:
        "Hancock's volunteer department answers the town's emergencies and helps run its community " +
        "events, from the summer concerts on the green to Trunk or Treat and the tree lighting.",
      events: [
        { year: 2025, text: "On 4 March Town Meeting adds $3,000 to the fire department's budget, and agrees to roll any surplus into the Fire Department Equipment Fund for future trucks. Ryan Veilleux leaves after 15 years of service.", source: "report" },
      ],
    },
    calls: {
      intro: "Motor vehicle crashes were nearly half of the year's calls.",
      byType: {
        title: "Calls by type, fiscal 2025",
        bars: [
          { label: "Motor vehicle crashes", value: 9 },
          { label: "Trees on power lines", value: 3 },
          { label: "Rescues", value: 2 },
          { label: "Phone crash alert", value: 1 },
          { label: "Fire alarm", value: 1 },
          { label: "Chimney fire (in Granville)", value: 1 },
          { label: "Car or garage fire", value: 1 },
          { label: "Lift assist", value: 1 },
        ],
        note: "July 2024 to June 2025; 19 calls in all.",
        source: "report",
      },
    },
    careers: {
      intro: "The department is looking for more volunteers, and for people to start a first responder team.",
      points: ["Get in touch through the town office or any member"],
      applyUrl: HAN,
      source: "report",
    },
    residents: [],
    sources: {
      report: { label: "Town of Hancock, 2026 Town Report", href: `${HAN}/wp-content/uploads/2026/02/Town-Report-2026-Hancock.pdf`, note: "Fire Department Report, page 27; 2025 Town Meeting minutes. A scanned report, read with text recognition" },
    },
  },
  ripton: {
    description:
      "Ripton Fire & First Response: a volunteer fire and first response department on Dugway Road, with cadets, " +
      "members from Salisbury, a search and rescue call list, and burn permits.",
    facts: [
      ["Services", "Fire and first response"],
      ["Members", "18 listed, plus 4 cadets; three live in Salisbury"],
      ["Station", "25 Dugway Road, near Lincoln Road"],
      ["Chief", "Chris Pike"],
    ],
    contact: { chief: "Chris Pike", phone: "(802) 388-4506", website: `${RIP}/fire-rescue`, source: "page" },
    history: {
      intro:
        "Ripton's volunteers answer fire and medical calls, backed by a search and rescue " +
        "call list and members who live over the line in Salisbury.",
      events: [],
    },
    residents: [
      { label: "Burn permits", href: `${RIP}/fire-rescue`, text: "Required when there is no snow cover; call 388-4506 or the Fire Warden. The town's page says no permits are being issued from October 2025 until further notice." },
      { label: "Medical wishes", href: `${RIP}/fire-rescue`, text: "Keep a DNR/COLST form, filled out with your doctor, somewhere easy for responders to find." },
    ],
    sources: {
      page: { label: "Town of Ripton, Fire & Rescue", href: `${RIP}/fire-rescue` },
    },
  },
  bridport: {
    description:
      "Bridport Volunteer Fire Department: 110 calls in 2025, 24 active members, two engines and three tankers, " +
      "75 years of service, and how the department raises most of its own budget.",
    facts: [
      ["Calls", "110 in 2025, with 607 firefighter responses"],
      ["Members", "24 active, 2 auxiliary, 7 life members"],
      ["Fleet", "Two engines, three tankers and a utility/response vehicle"],
      ["Chief", "Dusty Huestis"],
    ],
    contact: { chief: "Dusty Huestis", website: BRP, source: "report" },
    history: {
      intro:
        "Bridport's volunteers marked 75 years in 2024. The department raises most of its budget itself, " +
        "with help from its Ladies Auxiliary, and answers more medical calls than fires.",
      events: [
        { year: 2024, text: "The department celebrates its 75th anniversary in June with a party at the station on Crown Point Road: a helicopter, live music, a street dance and fireworks.", source: "anniv" },
        {
          year: 2025,
          text:
            "110 calls and 1,166 hours of training, including live fire training in a building in town. Tanker 2 " +
            "gets a 2010 Mack chassis from the town in place of its 1985 Ford. The department says farewell to " +
            "longtime members Bruce Stocker and Edgar \"Bub\" Crosby.",
          calls: 110,
          source: "report",
        },
      ],
    },
    calls: {
      intro:
        "Medical calls were well over half of 2025's total: the department gives first response alongside " +
        "Town Line First Response, Middlebury Regional EMS and Vergennes Rescue. Six fire calls were mutual aid " +
        "to Addison, Shoreham and Crown Point, New York.",
      byType: {
        title: "Calls by type, 2025",
        bars: [
          { label: "Medical", value: 65 },
          { label: "Motor vehicle crashes", value: 25 },
          { label: "Fires and alarms, incl. 4 carbon monoxide", value: 18 },
          { label: "Public service", value: 2 },
        ],
        note: "110 calls in all.",
        source: "report",
      },
    },
    money: {
      intro:
        "The town gave $30,000 in 2025; members and the Ladies Auxiliary raised another $43,613, 59% of the " +
        "budget, through the Father's Day barbecue, a poker series, a gun raffle, bingo and donations. A set of " +
        "turnout gear costs $4,854 and an air pack $12,000; the department replaces about three sets of gear " +
        "and one air pack a year.",
      year: "2025, income",
      lines: [
        { label: "Raised by members and the Ladies Auxiliary", amount: 43613 },
        { label: "Town appropriation", amount: 30000 },
      ],
      linesNote: "From the chief's 2025 report. Total spending that year was $67,913; the department asked for $30,000 again for 2026.",
      capital: {
        title: "What it costs to equip a firefighter",
        lines: [
          { label: "Planned yearly replacement: 3 sets of gear and 1 air pack", amount: 26562 },
          { label: "One self-contained breathing apparatus", amount: 12000 },
          { label: "One set of protective gear", amount: 4854 },
        ],
        note: "A gear set is jacket, pants, boots, helmet, hood and gloves.",
      },
      source: "report",
    },
    stationNotes: {
      "bridport-82-crown-point-rd": {
        text: "The fire station on Crown Point Road, where the department meets at 6:30 p.m. on the first Monday of each month.",
        source: "report",
      },
    },
    careers: {
      intro: "Volunteers fill a range of firefighting, first response and support roles, and new members are always welcome.",
      points: [
        "Come to the monthly meeting, first Monday at 6:30 p.m. at the station",
        "Or ask Corey Pratt at the store, or email bridportfire1@yahoo.com",
      ],
      applyUrl: BRP,
      source: "report",
    },
    residents: [
      { label: "Burn permits", href: `${BRP}/s/2025-Town-Report-Website.pdf`, text: "Required for any open burning in town; contact the Fire Warden. The department helps with large burns of brush piles and fallow fields." },
    ],
    sources: {
      report: { label: "Town of Bridport, 2025 Town Report", href: `${BRP}/s/2025-Town-Report-Website.pdf`, note: "Bridport Volunteer Fire Department annual and financial reports, pages 47–49 (scanned, read with text recognition); Fire Warden, page 37" },
      anniv: { label: "Town of Bridport, Fire Department 75th Anniversary Celebration", href: `${BRP}/town-events/2024/6/15/bridport-fire-department-75th-anniversary-celebration` },
    },
  },
  orwell: {
    description:
      "Orwell Volunteer Fire Department: 55 calls in 2025, mostly crashes and brush fires, new battery-powered " +
      "rescue tools and thermal cameras, and a welcome for new volunteers.",
    facts: [
      ["Calls", "55 in 2025"],
      ["Largest share", "Motor vehicle crashes, 20"],
      ["Chief", "Alex Kansky"],
    ],
    contact: { chief: "Alex Kansky", website: ORW, source: "report" },
    history: {
      intro:
        "Orwell's volunteers answer fires, crashes, rescues and mutual aid calls, often in bad weather and remote " +
        "parts of town. The department also holds the fund for the Champlain Large Animal Technical Rescue team.",
      events: [
        { year: 2025, text: "55 calls. The department buys battery-powered extrication tools and two thermal imaging cameras, and puts up new signs at the firehouse and the roadside.", calls: 55, source: "report" },
      ],
    },
    calls: {
      intro: "A year with many crashes and seasonal brush fires.",
      byType: {
        title: "Calls by type, 2025",
        bars: [
          { label: "Motor vehicle crashes", value: 20 },
          { label: "Brush fires", value: 8 },
          { label: "Structure fires, incl. mutual aid", value: 5 },
          { label: "Utility emergencies", value: 4 },
          { label: "Rescue assists", value: 3 },
          { label: "Vehicle fires", value: 3 },
          { label: "Fire alarms", value: 3 },
          { label: "Other fires", value: 3 },
          { label: "Public assists", value: 2 },
          { label: "Cancelled", value: 2 },
          { label: "Chimney fire", value: 1 },
          { label: "Odour investigation", value: 1 },
        ],
        note: "55 calls in all.",
        source: "report",
      },
    },
    careers: {
      intro: "New volunteers are welcome: no experience is needed, and training is provided.",
      points: ["Get in touch with any member, or through the town office"],
      applyUrl: ORW,
      source: "report",
    },
    residents: [],
    sources: {
      report: { label: "Town of Orwell, 2025 Town Report", href: `${ORW}/wp-content/uploads/2015/09/orwell-town-report-2025.pdf`, note: "Orwell Volunteer Fire Department annual and financial reports, pages 42–45. A scanned report, read with text recognition" },
    },
  },
  enosburgh: {
    description:
      "Enosburgh Fire Department: volunteers answering 138 calls in 2025 from Sampsonville Road, a fleet " +
      "from 1991 to 2017, a used pumper bought from Colchester, and a call for daytime volunteers.",
    facts: [
      ["Calls", "138 in 2025"],
      ["Hours", "2,793 hours of training and calls by volunteers in 2025"],
      ["Certified", "11 at Firefighter 1, 3 at Firefighter 2"],
      ["Chief", "Mark LaRose"],
    ],
    contact: { chief: "Mark LaRose", phone: "802-933-4345", website: `${ENO}/fire`, source: "dept" },
    history: {
      intro:
        "Enosburgh's volunteers fight fires and also handle search and rescue, vehicle extrication and medical " +
        "help for the Enosburgh Ambulance Service. The fleet is ageing, and the department has started replacing it.",
      events: [
        {
          year: 2025,
          text:
            "138 calls. Rather than wait two to three years for a new truck, the department buys a Ford F550 4x4 " +
            "pumper that Colchester was retiring: about an 80% match for what it would have ordered, at a saving of " +
            "about $300,000. The 1995 Engine 2 goes up for sale. Five recruits join, including high school students " +
            "and transfers from other towns.",
          calls: 138,
          source: "report",
        },
      ],
    },
    stationNotes: {
      "enosburgh-83-sampsonville-rd": {
        text:
          "The fire station. In service at the start of 2026: Engine 1, a 2017 HME/Arens custom engine; Rescue 1, a " +
          "2001 Freightliner; Tanker 1, a 2006 Freightliner; Ladder 1, a 1991 Spartan/Smeal; and Engine 2 (M), a 2015 Ford/HME.",
        source: "report",
      },
    },
    careers: {
      intro:
        "Overall numbers are good, but the department is short of people in the daytime. A structure fire can " +
        "need 20 to 25 people, which is why three, four or five departments often turn up.",
      points: [
        "Firefighting or a support role: there is something for everyone",
        "Three training evenings a month and a fourth for vehicle and equipment maintenance",
        "The station phone, 933-4345, is answered on Tuesday evenings, 7 to 9",
        "Or email fire@enosburghvt.org",
      ],
      applyUrl: `${ENO}/fire`,
      source: "report",
    },
    residents: [
      { label: "Station visits", href: `${ENO}/fire`, text: "School groups visit the station for fire prevention lessons." },
    ],
    sources: {
      dept: { label: "Town of Enosburgh, Fire Department", href: `${ENO}/fire` },
      report: { label: "Town of Enosburgh, 2025 Town Report", href: `${ENO}/_files/ugd/0cacb0_46276147a3034200952e9bceb0f550b2.pdf`, note: "Fire Department year-end report, PDF pages 15–16. A scanned report, read with text recognition" },
    },
  },
  fairfield: {
    description:
      "Fairfield Volunteer Fire Department: 64 calls in 2025, a new pumper-tanker for Station 2, members with 50 " +
      "and 65 years of service, a cadet programme in the works, and the budget.",
    facts: [
      ["Calls", "64 in 2025, many of them mutual aid"],
      ["Stations", "2"],
      ["New in 2025", "A pumper-tanker for Station 2"],
      ["Town appropriation", "$120,000"],
    ],
    contact: { website: FFD, source: "report" },
    history: {
      intro:
        "Fairfield's volunteers stay a long time: in 2025 one member passed 65 years of service and two reached 50, " +
        "and the department mourned a member of 60 years.",
      events: [
        {
          year: 2025,
          text:
            "64 calls. The department buys its first new pumper-tanker for Station 2, updates its by-laws and starts " +
            "a cadet programme. Training includes solar panel safety, Narcan and roof ventilation, much of it with " +
            "neighbouring departments.",
          calls: 64,
          source: "report",
        },
      ],
    },
    money: {
      intro:
        "The department's own accounts show what a new truck takes: in 2025 it spent $419,151 on the pumper-tanker, " +
        "with the help of a $116,000 loan, alongside the town's $120,000 appropriation.",
      year: "2025, income",
      lines: [
        { label: "Town appropriation", amount: 120000 },
        { label: "Loan for the truck", amount: 116000 },
        { label: "Miscellaneous", amount: 10087 },
        { label: "Interest", amount: 4549 },
      ],
      linesNote: "From the department's 2025 financial report, rounded to the dollar. It proposed $120,000 again for 2026, including $50,000 for the truck and equipment fund.",
      capital: {
        title: "Largest spending, 2025",
        lines: [
          { label: "New pumper-tanker", amount: 419151 },
          { label: "Insurance", amount: 17254 },
          { label: "Loan payments", amount: 17116 },
          { label: "Fuel and oil", amount: 8763 },
        ],
        note: "Total spending was $477,707; the department's balances fell from $436,429 to $209,358.",
      },
      source: "report",
    },
    residents: [
      { label: "Fire Safety Day", href: FFD, text: "An annual day of demonstrations and safety education." },
      { label: "9/11 Remembrance Walk", href: FFD, text: "Held by the department each year." },
    ],
    sources: {
      report: { label: "Town of Fairfield, 2025 Annual Report", href: "https://img1.wsimg.com/blobby/go/bcfe7f6a-21a0-4365-83b2-ca876176b0e8/downloads/99ffbda2-4059-43c0-8424-05732c5d0e0e/2025%20Annual%20Report.pdf", note: "Fairfield Volunteer Fire Department, pages 32–33. A scanned report, read with text recognition" },
    },
  },
  fairfax: {
    description:
      "Fairfax Fire Department: a full-time chief and on-call firefighters at the James Field station on Goodall " +
      "Street, its trucks, and how burn permits work.",
    facts: [
      ["Staffing", "A full-time chief and on-call firefighters"],
      ["Station", "James Field Fairfax Fire Station, 15 Goodall Street"],
      ["Chief", "Micah Genzlinger"],
    ],
    contact: { chief: "Micah Genzlinger", phone: "802-849-6075", website: `${FFX}/departments/fire/index.php`, source: "dept" },
    history: {
      intro: "Fairfax has a full-time fire chief leading an on-call department from one station.",
      events: [
        { year: 1991, text: "The four-bay James Field Fairfax Fire Station is built on Goodall Street.", source: "dept" },
        { year: 2024, text: "The town's fire page says the station is to get a fifth bay this year.", source: "dept" },
      ],
    },
    stationNotes: {
      "fairfax-15-goodall-st": {
        text: "The James Field Fairfax Fire Station: two engines, two tankers, a ladder truck, a utility truck and an ATV.",
        source: "dept",
      },
    },
    careers: {
      intro: "On-call firefighters work under the full-time chief.",
      points: ["Ask Chief Genzlinger about joining on 802-849-6075, or email fire@fairfax-vt.gov"],
      applyUrl: `${FFX}/departments/fire/index.php`,
      source: "dept",
    },
    residents: [
      { label: "Burn permits", href: `${FFX}/departments/fire/burn_permits___open_burning/index.php`, text: "Free, needed for brush and leaf piles but not small campfires; call 802-849-6075, and a permit can often be given over the phone. Natural wood only." },
      { label: "Building inspection", href: `${FFX}/departments/fire/building_inspection___code_enforcement/index.php`, text: "Building inspection and code enforcement." },
    ],
    sources: {
      dept: { label: "Town of Fairfax, Fire", href: `${FFX}/departments/fire/index.php` },
    },
  },
  "saint-albans-town": {
    description:
      "St. Albans Town Fire Department: a volunteer department chartered in 1975, with marine and ice rescue on " +
      "Lake Champlain, crashes, hazmat and mutual aid, from the Lake Road station.",
    facts: [
      ["Founded", "1975"],
      ["Staffing", "Volunteer, with a full-time firefighter"],
      ["Station", "428 Lake Road"],
      ["Chief", "Matt Mulheron"],
    ],
    contact: { chief: "Matt Mulheron", phone: "(802) 527-7646", website: `${SAT}/departments/fire/index.php`, source: "dept" },
    history: {
      intro:
        "Chartered in 1975 to fight fires in the town, the department has taken on far more since: marine " +
        "emergencies and ice rescue on Lake Champlain, crashes, hazardous materials and mutual aid.",
      events: [
        { year: 1975, text: "The St. Albans Town Fire Department is chartered.", source: "dept" },
      ],
    },
    residents: [
      { label: "Department by-laws", href: `${SAT}/Document_Center/Departments/Fire/Final-Signed-FD-Bylaws-2.1.2016.pdf`, text: "The volunteer department's by-laws." },
    ],
    sources: {
      dept: { label: "Town of St. Albans, Fire Department", href: `${SAT}/departments/fire/index.php` },
    },
  },
  swanton: {
    description:
      "Swanton Village Fire Department: a paid-on-call department for fire, hazardous materials and water rescue, " +
      "and the village's forest fire wardens.",
    facts: [
      ["Staffing", "Paid on call"],
      ["Specialties", "Fire, prevention and education, hazmat, water rescue"],
      ["Chief", "Daniel Chevalier, also the village hydro plant supervisor"],
    ],
    contact: { chief: "Daniel Chevalier", phone: "802-868-4200", website: `${SWA}/services/fire`, source: "dept" },
    history: {
      intro:
        "Swanton Village's paid-on-call firefighters handle fires, hazardous materials and water rescue, and teach " +
        "fire prevention. Its motto spells the department's initials: Safety, Vigilance, Family, Dedication.",
      events: [],
    },
    residents: [
      { label: "Burn permits", href: `${SWA}/services/forest-fire-warden`, text: "Contact the Forest Fire Warden, Chief Chevalier, or one of the two deputy wardens." },
    ],
    sources: {
      dept: { label: "Village of Swanton, Swanton Village Fire Department", href: `${SWA}/services/fire` },
      warden: { label: "Village of Swanton, Forest Fire Warden", href: `${SWA}/services/forest-fire-warden` },
    },
  },
  // Richford has no station in the E911 file or Airtable's Fire Stations table yet,
  // so there is no page for this to appear on until one is added.
  richford: {
    description:
      "Richford Fire Department: a volunteer department since 1889, 142 calls in 2025, new hose and a tower truck " +
      "repaired, Breakfast with Santa, and how to join.",
    facts: [
      ["Founded", "1889"],
      ["Calls", "142 in 2025"],
      ["Staffing", "Volunteer, with cadets"],
      ["Chief", "Andy Pond"],
    ],
    contact: { chief: "Andy Pond", phone: "802-848-7443", website: `${RCH}/richford-fire-department.html`, source: "dept" },
    history: {
      intro:
        "Richford's volunteer department dates from 1889. Its members also run community traditions: Breakfast with " +
        "Santa, the Christmas parade, the Harvest Festival and the Easter egg hunt.",
      events: [
        { year: 1889, text: "The Richford Fire Department is founded.", source: "dept" },
        {
          year: 2025,
          text:
            "142 calls. At Town Meeting the department sets up a special fund to save for future equipment. More than 1,500 feet of hose, most of it over 20 years old, is replaced, and the tower truck gets " +
            "hydraulic repairs. About 180 children come to Breakfast with Santa. Two members start Firefighter 1 training.",
          calls: 142,
          source: "report",
        },
      ],
    },
    careers: {
      intro: "The department welcomes new members, and has a cadet application for those under 18.",
      points: [
        "Training every Tuesday at 6 p.m.",
        "Ask through the Town Clerk's office, contact the department, or come to a Tuesday meeting",
      ],
      applyUrl: `${RCH}/richford-fire-department.html`,
      source: "dept",
    },
    residents: [],
    sources: {
      dept: { label: "Town of Richford, Richford Fire Department", href: `${RCH}/richford-fire-department.html` },
      report: { label: "Town of Richford, 2025 Town Report", href: `${RCH}/uploads/1/2/0/4/120478017/town_report_2025.pdf`, note: "Fire Department Report, page 33" },
    },
  },
  franklin: {
    description:
      "Franklin Fire Department: the volunteer department on Main Street, its Monday meetings, and burn permits " +
      "from the fire warden.",
    facts: [
      ["Station", "5154 Main Street"],
      ["Meets", "Monday nights, 6:30 p.m."],
      ["Chief", "Mike Lawyer, also the Fire Warden"],
    ],
    contact: { chief: "Mike Lawyer", phone: "285-2050", website: `${FRK}/boards-commissions-departments/franklin-fire-department`, source: "dept" },
    history: {
      intro: "Franklin's department meets every Monday night at the station on Main Street. Its chief is also the town's fire warden.",
      events: [],
    },
    careers: {
      intro: "Anyone interested can come to a Monday meeting or call the chief.",
      points: ["Mondays at 6:30 p.m. at the station; Chief Mike Lawyer, 285-2050"],
      applyUrl: `${FRK}/boards-commissions-departments/franklin-fire-department`,
      source: "dept",
    },
    residents: [
      { label: "Burn permits", href: `${FRK}/boards-commissions-departments/franklin-fire-department`, text: "From Fire Warden Michael Lawyer, on 285-2050." },
    ],
    sources: {
      dept: { label: "Town of Franklin, Franklin Fire Department", href: `${FRK}/boards-commissions-departments/franklin-fire-department` },
    },
  },
  "grand-isle": {
    description:
      "Grand Isle Volunteer Fire Department: a record 148 calls in 2025 with 22 active members, serving since 1951 " +
      "from the Hyde Road station, with marine and ice rescue, its budget and how to join.",
    facts: [
      ["Founded", "1951"],
      ["Calls", "148 in 2025, a record"],
      ["Active members", "22, plus an auxiliary"],
      ["Station", "7,400 sq ft, on Hyde Road"],
      ["Chief", "Adam White"],
    ],
    contact: { chief: "Adam White", phone: "802-372-5012", website: GIF, source: "join" },
    history: {
      intro:
        "Grand Isle's department began in 1951 with a 1928 Chevrolet truck carrying a portable pump, and someone's " +
        "garage for a station. Calls have climbed in recent years, and 2025 set a new record.",
      events: [
        { year: 1951, text: "The department starts with a 1928 Chevrolet truck with a portable pump on the back, kept in a member's garage.", source: "about" },
        {
          year: 2025,
          text:
            "148 calls, a record, with July averaging nearly one a day: structure fires, crashes, alarms, hazardous " +
            "materials, medical assists, and marine and ice rescues. The department proposes a level budget for the " +
            "second year running, at the Selectboard's request.",
          calls: 148,
          source: "report",
        },
      ],
    },
    stationNotes: {
      "grand-isle-17-hyde-rd": {
        text:
          "The 7,400 sq ft station on Hyde Road. Engine 1, a 2018 Freightliner/Ferrara, and Engine 2, a 1993 " +
          "Freightliner/E-One, each carry 1,250 gallons; plus a tanker, a heavy rescue, a brush truck, a trailer and a boat.",
        source: "fleet",
      },
    },
    money: {
      intro:
        "About three-quarters of the operating budget comes from the town and a quarter from fundraising and " +
        "donations. With the town's share held level, the auxiliary has been asked to raise more in 2026.",
      year: "fiscal year 2027 (proposed)",
      lines: [
        { label: "Town appropriation", amount: 105000 },
        { label: "Fundraising and events", amount: 26000 },
      ],
      linesNote: "A proposed total of $131,000, up from $127,500 for fiscal 2026.",
      capital: {
        title: "Town appropriation by year",
        lines: [
          { label: "FY2027 (proposed)", amount: 105000 },
          { label: "FY2026", amount: 105000 },
          { label: "FY2025", amount: 105000 },
          { label: "FY2024", amount: 90000 },
          { label: "FY2023", amount: 75000 },
        ],
        note: "From the department's budget page in the 2025 town report.",
      },
      source: "report",
    },
    careers: {
      intro:
        "With 22 active members covering the town around the clock, the department wants more volunteers, for " +
        "interior firefighting, traffic control, driving and pumping, exterior support and more.",
      points: [
        "Junior firefighters at 16 and 17; firefighters from 18",
        "Training at your own pace and level",
        "Training nights are Tuesdays at 6:30 p.m., per the 2025 report (the website still says Wednesdays)",
        "Stop by the station, call 802-372-5012, or email Chief White at awhite@grandislefire.org",
      ],
      applyUrl: `${GIF}/join-us`,
      source: "report",
    },
    residents: [
      { label: "Address signs", href: GIF, text: "The department's reflective 911 address signs help crews find your house." },
      { label: "Fireworks", href: `${GIF}/fireworks`, text: "The department's fireworks information." },
    ],
    sources: {
      about: { label: "Grand Isle Fire Department, About Us", href: `${GIF}/about-us` },
      fleet: { label: "Grand Isle Fire Department, Apparatus", href: `${GIF}/apparatus` },
      join: { label: "Grand Isle Fire Department, Join Us", href: `${GIF}/join-us` },
      report: { label: "Town of Grand Isle, 2025 Town Report", href: `${GIT}/wp-content/uploads/2026/02/2025-Town-Report.pdf`, note: "Fire Department letter and budget, pages 37–38. A scanned report, read with text recognition" },
    },
  },
  "south-hero": {
    description:
      "South Hero Volunteer Fire Department: serving since 1953, calls by year, a new E-One engine, a landing-craft " +
      "fire boat, first response, and members from age 14.",
    facts: [
      ["Founded", "1953"],
      ["Calls", "211 in fiscal 2023, down from 259 in fiscal 2021"],
      ["Services", "Fire, first response EMS, water rescue"],
      ["Chief", "Patrick Robinson"],
    ],
    contact: { chief: "Patrick Robinson", website: SHF, source: "personnel" },
    history: {
      intro:
        "South Hero's volunteers have served the town since 1953 and are part of the Grand Isle County mutual aid group " +
        "with Alburgh, Grand Isle and North Hero. Members include certified EMTs who run the town's first response service.",
      events: [
        { year: 1953, text: "The South Hero Volunteer Fire Department begins.", source: "report" },
        { year: 2019, text: "A landing-craft fire boat is built, able to launch around the county and pull up to islands' shores.", source: "fleet" },
        { year: 2023, text: "The department's old fire boat, from the Coast Guard and known as \"the Titanic\", goes to Isle La Motte. A new E-One engine goes into service.", source: "fleet" },
      ],
    },
    calls: {
      intro: "Call volume has fallen over the years the town report covers.",
      byYear: {
        title: "Calls by fiscal year",
        bars: [
          { label: "FY2021", value: 259 },
          { label: "FY2022", value: 217 },
          { label: "FY2023", value: 211 },
        ],
        note: "Fiscal years end in June. From the chief's report in the town report labelled 2024.",
        source: "report",
      },
    },
    stationNotes: {
      "south-hero-131-community-ln": {
        text:
          "Engine 2, a 2023 E-One with a 1,250 gpm pump and 1,250 gallons, is first due; Engine 1, a 2007 HME, " +
          "supplies water; Water 1 carries 2,300 gallons; Squad 3 leads first response; and Fire Boat 1, built in 2019, " +
          "has twin 115 hp motors.",
        source: "fleet",
      },
    },
    careers: {
      intro: "There's a job for everyone: interior firefighting, pumping, water supply, traffic, EMS, and support roles from graphics to supplies.",
      points: [
        "Cadets at 14 and 15: training, fire prevention and equipment upkeep",
        "Junior members at 16 and 17: training with air packs and most calls",
        "Regular members from 18, after a probation period",
        "Fill in the form on the Join page for a call and a station tour",
      ],
      applyUrl: `${SHF}/join/`,
      source: "cadets",
    },
    residents: [
      { label: "Burn permits", href: `${SHF}/burn-permits/`, text: "Through the Town Clerk, 372-5552. Campfires under 4 feet in a ring don't need one; no permits during red flag warnings or moderate fire danger." },
      { label: "Fire safety", href: `${SHF}/fire-safety-and-prevention/`, text: "Smoke and CO alarms, extinguishers, emergency access and boater safety." },
    ],
    sources: {
      personnel: { label: "South Hero Volunteer Fire Department, Personnel", href: `${SHF}/personnel/` },
      fleet: { label: "South Hero Volunteer Fire Department, Apparatus", href: `${SHF}/apparatus/` },
      cadets: { label: "South Hero Volunteer Fire Department, Become a Cadet or Junior Member", href: `${SHF}/2025/04/10/become-a-cadet-or-junior-member/` },
      report: { label: "Town of South Hero, Annual Report 2024", href: `${SHT}/wp-content/uploads/2025/12/South-HeroTown-Report-2024.pdf`, note: "Fire Department, page 55. A scanned report, read with text recognition" },
    },
  },
  "isle-la-motte": {
    description:
      "Isle La Motte Volunteer Fire Company: an independent, all-volunteer company with a marine rescue boat, EMT-trained " +
      "members, and mutual aid reaching New York and Canada.",
    facts: [
      ["Run by", "An independent company of volunteers, partly town-funded"],
      ["Station", "2241 Main Road"],
      ["Marine rescue", "A rescue boat docked at Lakehurst Campground"],
      ["Chief", "Bill Johnson IV"],
    ],
    contact: { chief: "Bill Johnson IV", website: `${ILM}/firerescue/`, source: "page" },
    history: {
      intro:
        "Isle La Motte's fire company is independent and staffed entirely by volunteers, with town money voted at each " +
        "Town Meeting. Five members are trained in emergency medical care and answer 911 medical calls; ambulances come from Alburgh.",
      events: [
        { year: 2023, text: "South Hero's former fire boat, a one-time Coast Guard boat known as \"the Titanic\", comes to Isle La Motte.", source: "shfleet" },
      ],
    },
    residents: [
      { label: "Burn permits", href: `${ILM}/firerescue/`, text: "Contact the Forest Fire Warden before lighting any open fire." },
    ],
    sources: {
      page: { label: "Town of Isle La Motte, Fire & Rescue", href: `${ILM}/firerescue/` },
      shfleet: { label: "South Hero Volunteer Fire Department, Apparatus", href: `${SHF}/apparatus/` },
    },
  },
  montpelier: {
    description:
      "Montpelier Fire & Ambulance: the capital's career fire and ambulance department, firefighter-EMTs on Main " +
      "Street, ambulance service for three neighbouring towns, and its fleet.",
    facts: [
      ["Services", "Fire and ambulance, from one station"],
      ["Staff", "Career firefighters, all dual-trained as EMTs"],
      ["Ambulance", "Also serves three surrounding towns under contract"],
      ["Chief", "Derek Libby"],
    ],
    contact: { chief: "Derek Libby", phone: "802-229-4913", website: `${MPL}/200/Fire-Ambulance`, source: "dept" },
    history: {
      intro:
        "Montpelier's department runs both the fire service and the ambulance for Vermont's capital. Its staff are " +
        "trained as both firefighters and EMTs, and ambulance fees and contracts cover more than 20% of the budget.",
      events: [],
    },
    stationNotes: {
      "montpelier-61-main-st": {
        text: "The city's one fire station, on Main Street: two pumpers, a tower truck, two ambulances and two utility vehicles. The department also keeps a training area.",
        source: "dept",
      },
    },
    residents: [
      { label: "Ambulance billing", href: `${MPL}/200/Fire-Ambulance`, text: "The department's ambulance billing specialist, 802-262-6010." },
    ],
    sources: {
      dept: { label: "City of Montpelier, Fire & Ambulance", href: `${MPL}/200/Fire-Ambulance` },
    },
  },
  // Barre City's station is missing from the E911 file, so this has no page until
  // a Fire Stations record is added for 15 Fourth Street.
  "barre-city": {
    description:
      "Barre City Fire & EMS: a career fire and ambulance department answering over 2,000 calls a year in four square " +
      "miles, through two floods, with code enforcement and a needle disposal programme.",
    facts: [
      ["Calls", "2,559 in fiscal 2023: 2,045 EMS, 514 fire"],
      ["Services", "Fire, ambulance and code enforcement"],
      ["Station", "15 Fourth Street"],
      ["Chief", "Keith Cushman, since 2023"],
    ],
    contact: { chief: "Keith Cushman", phone: "802-476-0254", website: `${BAC}/fire/`, source: "dept" },
    history: {
      intro:
        "Barre City's department answers fire and medical calls, and runs the ambulance, in a coverage area of about four " +
        "square miles. About a fifth of its calls overlap with another, which means calling in off-duty staff.",
      events: [
        { year: 2023, text: "Keith Cushman becomes chief. In April a fire destroys a downtown building; mutual aid keeps it from spreading to neighbours as close as two feet away. In July the city floods, and crews answer more than 50 calls in 12 hours.", source: "r2023" },
        { year: 2024, text: "The department reaches full staffing for the first time in over a year, buys new rescue tools to replace a 20-year-old set, and orders a new ambulance.", source: "r2024" },
      ],
    },
    calls: {
      intro:
        "Most calls are medical. The department also runs a sharps disposal programme, collecting about 1,000 gallons " +
        "of needles a year from five sites around the city.",
      byYear: {
        title: "Calls for service by fiscal year",
        bars: [
          { label: "FY2020", value: 2314 },
          { label: "FY2021", value: 2177 },
          { label: "FY2022", value: 2270 },
          { label: "FY2023", value: 2559 },
        ],
        note: "Fiscal years end in June. From the fire department's section of each city annual report.",
        source: "r2023",
      },
    },
    stationNotes: {
      "barre-city-15-fourth-st": {
        text: "The city's fire station, on Fourth Street.",
        source: "dept",
      },
    },
    residents: [
      { label: "Code enforcement", href: `${BAC}/fire/`, text: "Rental registry, complaints, and the codes the department enforces; 1,736 inspections in 2024." },
      { label: "Burn permits", href: `${BAC}/fire/`, text: "The city's guidance on open burning and outdoor burn permit rules." },
      { label: "E911 address signs", href: `${BAC}/fire/`, text: "Help crews find your house." },
    ],
    sources: {
      dept: { label: "City of Barre, Fire, EMS & Code Enforcement", href: `${BAC}/fire/` },
      r2023: { label: "City of Barre, 2023 Annual Report", href: `${BAC}/client_media/files/CityMgr/Annual.Reports/2023%20Barre%20City%20Annual%20Report%20-%20Online.pdf`, note: "Fire department section. FY2020–2022 from the 2020, 2021 and 2022 reports on barrecity.org" },
      r2024: { label: "City of Barre, 2024 Annual Report", href: `${BAC}/client_media/files/CityMgr/Annual.Reports/2024%20Annual%20Report%20-%20Online%20Version.pdf`, note: "Barre City Fire Department, pages 99–105" },
    },
  },
  "barre-town": {
    description:
      "Barre Town Fire Department: a call/paid department with about 30 firefighters, two stations in East Barre and " +
      "South Barre, about 200 calls a year, and burn permits.",
    facts: [
      ["Staffing", "Call/paid, about 30 firefighters"],
      ["Calls", "About 200 a year"],
      ["Covers", "Barre Town and parts of Orange"],
      ["Chief", "Andy Lange"],
    ],
    contact: { chief: "Andy Lange", website: `${BAT}/departments/emergency_services/fire/index.php`, source: "dept" },
    history: {
      intro:
        "Barre Town's firefighters work from two stations in the unincorporated villages of East Barre and South Barre, " +
        "each assigned to one. Each station has an assistant chief.",
      events: [],
    },
    stationNotes: {
      "barre-town-119-mill-st": {
        text: "East Barre: two pumpers, a tanker and a pickup, plus the heavy rescue with its air-bottle filling system, a side-by-side off-road rescue vehicle and a trailer.",
        source: "dept",
      },
      "barre-town-528-s-barre-rd": {
        text: "South Barre, which the town lists at 529 South Barre Road: two pumpers, two tankers and a pickup with a wildland skid.",
        source: "dept",
      },
    },
    residents: [
      { label: "Burn permits", href: `${BAT}/departments/emergency_services/fire/index.php`, text: "From the town's fire warden; see the Fire Warden page." },
    ],
    sources: {
      dept: { label: "Town of Barre, Fire Department", href: `${BAT}/departments/emergency_services/fire/index.php` },
    },
  },
  waterbury: {
    description:
      "Waterbury Fire Department: a volunteer department since 1882, two stations in Waterbury and Waterbury Center, a " +
      "95-foot tower ladder, and a roster with members of 25 and 50 years.",
    facts: [
      ["Founded", "1882"],
      ["Stations", "Main Street, Waterbury, and Maple Street, Waterbury Center"],
      ["Chief Engineer", "Gary Dillon, chief since 2009"],
    ],
    contact: { chief: "Gary Dillon", phone: "802-244-8856", website: "https://www.waterburyvtfire.com/", source: "roster" },
    history: {
      intro:
        "The Waterbury Village Fire Department was formed on 20 December 1882, and the village was divided into four " +
        "fire wards. Today's department works from two stations, with members who have served 25 and even 50 years.",
      events: [
        { year: 1882, text: "The Waterbury Village Fire Department is formed on 20 December.", source: "history" },
        { year: 1965, text: "Bob Grace joins; he is still on the roster, a half-century member.", source: "roster" },
        { year: 2009, text: "Gary Dillon, a member since 1981, becomes chief.", source: "roster" },
      ],
    },
    stationNotes: {
      "waterbury-43-s-main-st": {
        text: "The larger station, downtown: Engines 1 and 2, Rescue 1, the 95-foot Tower 1, Tanker 1 and Engine 11, with a radio room, offices, kitchen, meeting room and gym.",
        source: "stations",
      },
      "waterbury-158-maple-st": {
        text: "Waterbury Center: Engines 3 and 4, Tanker 2, Engine 12 (the brush truck) and a boat.",
        source: "stations",
      },
    },
    careers: {
      intro: "Members train in two companies, with interior, exterior, probationary and junior members.",
      points: ["Contact the department at waterburyfd@waterburyvt.com or 802-244-8856"],
      applyUrl: "https://www.waterburyvtfire.com/WFD/ContactUs.html",
      source: "companies",
    },
    residents: [],
    sources: {
      history: { label: "Waterbury Fire Department, History", href: `${WFD}/History.html` },
      roster: { label: "Waterbury Fire Department, Roster", href: `${WFD}/Roster.html` },
      stations: { label: "Waterbury Fire Department, Stations", href: `${WFD}/Stations.html` },
      companies: { label: "Waterbury Fire Department, Training Companies 2026", href: `${WFD}/Companies.html` },
    },
  },
  northfield: {
    description:
      "Northfield Fire Department: the Wall Street station, its role in Capital Fire Mutual Aid, and burn permits from " +
      "the town's fire wardens.",
    facts: [
      ["Station", "128 Wall Street"],
      ["Mutual aid", "Capital Fire Mutual Aid"],
      ["Chief", "Peter J. DeMasi"],
    ],
    contact: { chief: "Peter J. DeMasi", website: `${NFD}/fire-department`, source: "dept" },
    history: {
      intro:
        "Northfield's department fights fires and protects life and property in town, gives and receives mutual aid " +
        "through Capital Fire Mutual Aid, reviews fire protection plans with the state, and helps the fire warden prevent wildfires.",
      events: [],
    },
    residents: [
      { label: "Burn permits", href: `${NFD}/fire-department`, text: "Required in Northfield: contact the Fire Warden or Assistant Fire Warden before you burn." },
    ],
    sources: {
      dept: { label: "Town of Northfield, Fire Department", href: `${NFD}/fire-department` },
    },
  },
  warren: {
    description:
      "Warren Volunteer Fire Department: serving since 1947 from stations in Warren Village and at Sugarbush's " +
      "Lincoln Peak, 48 to 90 calls a year, burn permits and fire alarm registration.",
    facts: [
      ["Founded", "1947"],
      ["Calls", "48 to 90 a year over the past five years"],
      ["Stations", "Warren Village and Sugarbush Resort's Lincoln Peak base area"],
      ["Chief", "Jeff Campbell, also the town's public safety officer and emergency management director"],
    ],
    contact: { chief: "Jeff Campbell", website: `${WRN}/departments/volunteer-fire-department/`, source: "dept" },
    history: {
      intro:
        "Warren's volunteers have protected the town since 1947, working with Waitsfield, Moretown and Fayston in " +
        "mutual aid. Ambulance service comes from Mad River Valley Ambulance.",
      events: [
        { year: 1947, text: "The Warren Volunteer Fire Department is founded.", source: "dept" },
      ],
    },
    residents: [
      { label: "Burn permits", href: `${WRN}/departments/volunteer-fire-department/`, text: "From the Forest Fire Warden, Garrett Swann." },
      { label: "Fire alarm registration", href: `${WRN}/documents/fire-alarm-registration-fomr/`, text: "Register your fire alarm with the department, free, in addition to the state police." },
      { label: "911 addresses", href: `${WRN}/departments/volunteer-fire-department/`, text: "Make sure your address sign can be seen from the road." },
    ],
    sources: {
      dept: { label: "Town of Warren, Volunteer Fire Department", href: `${WRN}/departments/volunteer-fire-department/` },
    },
  },
  "east-montpelier": {
    description:
      "East Montpelier Volunteer Fire Department: a nonprofit since 1964 giving fire and rescue to East Montpelier and " +
      "Calais, ambulance service to four towns, two stations and how to volunteer.",
    facts: [
      ["Founded", "1964"],
      ["Run by", "East Montpelier Volunteer Fire Department, Inc., a 501(c)(3) nonprofit"],
      ["Covers", "Fire for East Montpelier and Calais; ambulance also for Plainfield and Marshfield"],
      ["Members", "More than 20 active volunteers and more than a dozen EMTs"],
      ["Chief", "Troy Seckington, also the fire warden"],
    ],
    contact: { chief: "Troy Seckington", phone: "(802) 225-6245", website: EMF, source: "home" },
    history: {
      intro:
        "Volunteers founded the department in 1964. Today it runs a 24-hour ambulance staffed by licensed EMTs; the town " +
        "posts its interlocal agreement and the joint meetings of the towns it serves.",
      events: [
        { year: 1964, text: "East Montpelier Volunteer Fire Department, Inc. is founded.", source: "home" },
        { year: 2014, text: "A second station is built at 54 Village Acres.", source: "home" },
        { year: 2024, text: "A new Ford F-450/Medix ambulance and a Freightliner/Toyne engine join the fleet.", source: "home" },
      ],
    },
    stationNotes: {
      "east-montpelier-365-templeton-rd": {
        text: "The first station, built in the 1960s and expanded in the 1980s: a 2003 International/V-Tec engine and a 2007 Freightliner/V-Tec 2,000-gallon tanker.",
        source: "home",
      },
      "east-montpelier-54-village-acres": {
        text:
          "The second station, built in 2014, where would-be members can drop in on Tuesday evenings: a 2024 Freightliner/Toyne engine, a 2013 KME " +
          "rescue-pumper, two ambulances (a 2024 Ford/Medix and a 2016 Ford/McCoy Miller), a pickup, a UTV and a special " +
          "operations trailer.",
        source: "home",
      },
    },
    careers: {
      intro:
        "Volunteers fight fires, and also help with organisation, technical work and fundraising. Licensed BLS, ALS and " +
        "paramedic providers can ask about paid ambulance work.",
      points: ["Come by the station at 54 Village Acres any Tuesday evening"],
      applyUrl: EMF,
      source: "home",
    },
    residents: [
      { label: "Burn permits", href: EMF, text: "From the Town Fire Warden, (802) 229-1153." },
      { label: "Emergency shelter", href: `${EMT}/east-montpelier-fire-department/`, text: "The fire station can serve as a cooling, warming, charging or overnight shelter in an emergency." },
      { label: "Support the department", href: EMF, text: "A nonprofit; donations by post to PO Box 146, East Montpelier." },
    ],
    sources: {
      home: { label: "East Montpelier Volunteer Fire Department", href: EMF },
      town: { label: "Town of East Montpelier, East Montpelier Fire Department", href: `${EMT}/east-montpelier-fire-department/` },
    },
  },
  cabot: {
    description:
      "Cabot Volunteer Fire Department: an all-volunteer, unpaid town department at work since at least 1908, its " +
      "monthly meeting, and burn permits.",
    facts: [
      ["Staffing", "100% volunteer; members are unpaid"],
      ["On record since", "1908 or earlier"],
      ["Chief", "Dean Deasy"],
    ],
    contact: { chief: "Dean Deasy", website: `${CAB}/volunteer-fire-dept/`, source: "dept" },
    history: {
      intro:
        "Nobody knows exactly when Cabot's department began. Marshfield's town records show it helping fight a fire there " +
        "in 1908. It is a town department; its budget is voted as a separate line at Town Meeting, and its members are " +
        "Cabot residents who are paid nothing.",
      events: [
        { year: 1908, text: "Marshfield's records note \"the Cabot Fire Department\" helping at a fire in that town, the earliest mention found.", source: "dept" },
      ],
    },
    careers: {
      intro: "Active firefighters are welcome, and so is help with administration or weekly equipment checks.",
      points: ["The department meets the second Wednesday of each month at the fire station", "Contact Chief Dean Deasy"],
      applyUrl: `${CAB}/volunteer-fire-dept/`,
      source: "dept",
    },
    residents: [
      { label: "Burn permits", href: `${CAB}/volunteer-fire-dept/`, text: "Required whenever there's no snow on the ground; from Chief Deasy." },
      { label: "Key box ordinance", href: `${CAB}/volunteer-fire-dept/`, text: "The town's key box rules." },
    ],
    sources: {
      dept: { label: "Town of Cabot, Volunteer Fire Department", href: `${CAB}/volunteer-fire-dept/` },
    },
  },
  roxbury: {
    description:
      "Roxbury Volunteer Fire Department: nine volunteers, a three-bay station, automatic response with Northfield, " +
      "five dry hydrants, and burn permits.",
    facts: [
      ["Members", "9 active volunteers, 6 with state fire certification"],
      ["Mutual aid", "Capital Fire Mutual Aid (27 towns); automatic response with Northfield"],
      ["Chief", "Clarence Baker, also the forest fire warden"],
    ],
    contact: { chief: "Clarence Baker", phone: "(802) 485-6707", website: `${ROX}/our-roxbury-vt/roxbury-vt-fire-department/`, source: "dept" },
    history: {
      intro:
        "Roxbury's nine volunteers answer fires and assist the ambulance, with automatic help from Northfield and the " +
        "27-town Capital Fire Mutual Aid district behind them.",
      events: [],
    },
    stationNotes: {
      "roxbury-1726-roxbury-rd": {
        text: "The three-bay station, built in 1960 and 2000. The town has five dry hydrants, the newest on Bull Run Road.",
        source: "dept",
      },
    },
    careers: {
      intro: "The department is always looking for volunteers to join its meetings and emergency responses.",
      points: ["Meetings on Sunday evenings at the station", "Contact Don Randall, (802) 485-8341"],
      applyUrl: `${ROX}/our-roxbury-vt/roxbury-vt-fire-department/`,
      source: "dept",
    },
    residents: [
      { label: "Burn permits", href: `${ROX}/our-roxbury-vt/roxbury-vt-fire-department/`, text: "Needed unless there's snow on the ground; from the deputy forest fire wardens, or at Tim Martin's Auto during office hours." },
    ],
    sources: {
      dept: { label: "Town of Roxbury, Roxbury Volunteer Fire Department", href: `${ROX}/our-roxbury-vt/roxbury-vt-fire-department/` },
    },
  },
  moretown: {
    description:
      "Moretown Fire Department: the Route 100B station, twice-monthly meetings, its officers, and burn permits from " +
      "the fire warden.",
    facts: [
      ["Station", "1049 Route 100B"],
      ["Meets", "1st and 3rd Tuesdays, 7 p.m."],
      ["Chief", "Stefan Pratt, also the fire warden"],
    ],
    contact: { chief: "Stefan Pratt", phone: "(802) 496-3254", website: `${MOR}/town-departments/fire/`, source: "dept" },
    history: {
      intro: "Moretown's department meets twice a month at the station on Route 100B. Its chief also serves as the town's fire warden.",
      events: [],
    },
    residents: [
      { label: "Burn permits", href: `${MOR}/town-departments/fire/`, text: "From the Fire Warden, Stefan Pratt." },
    ],
    sources: {
      dept: { label: "Town of Moretown, Fire Department", href: `${MOR}/town-departments/fire/` },
    },
  },
  stowe: {
    description:
      "Stowe Fire & Rescue: a fire and paramedic-level ambulance service with more than a century of history, a " +
      "per-diem crew, Stowe Mountain Rescue for Smugglers' Notch and the backcountry, and online burn permits.",
    facts: [
      ["Services", "Fire and EMS, licensed at the paramedic level"],
      ["Serves", "Over 5,200 residents and thousands of daily visitors"],
      ["Staffing", "Full-time officers and staff, with per-diem firefighters and EMS"],
      ["Mountain rescue", "Stowe Mountain Rescue, 45 to 55 calls a year"],
      ["Chief", "Ed Webster Jr."],
    ],
    contact: { chief: "Ed Webster Jr.", website: `${STW}/Departments/Fire-Rescue`, source: "dept" },
    history: {
      intro:
        "Stowe's fire service goes back more than 100 years. It covers Vermont's second-largest town by land area, " +
        "and works in mutual aid with Waterbury, Morristown and Cambridge.",
      events: [
        { year: 1975, text: "The Stowe Rescue Squad is established.", source: "dept" },
        { year: 1980, text: "Stowe Mountain Rescue is founded for technical rescue on the Smugglers' Notch cliffs, popular with rock and ice climbers.", source: "mtn" },
        { year: 2008, text: "Stowe Fire takes over EMS from the Stowe Rescue Squad.", source: "dept" },
        { year: 2026, text: "Burn permits move online.", source: "dept" },
      ],
    },
    stationNotes: {
      "stowe-350-s-main-st": {
        text: "The Stowe firehouse on South Main Street.",
        source: "dept",
      },
    },
    careers: {
      intro:
        "Part-time firefighters are per diem: paid when they respond to calls and for their training every two weeks. " +
        "No experience is needed, just a positive attitude and a strong work ethic.",
      points: [
        "Firefighters: complete an employment application and contact Chief Ed Webster",
        "EMS: complete the Stowe EMS application",
        "Stowe Mountain Rescue: open enrolment in November and December, then a nine-month observation and probation programme",
        "Junior firefighters are on the roster",
      ],
      applyUrl: `${STW}/Departments/Fire-Rescue`,
      source: "dept",
    },
    residents: [
      { label: "Burn permits", href: "https://townofstowe.burnpermits.com", text: "Online, since 2026." },
      { label: "Mountain rescue is free", href: `${STW}/Departments/Mountain-Rescue`, text: "Stowe Mountain Rescue doesn't charge; it's funded mainly by the town, with grants and donations." },
      { label: "Lock box and address markers", href: `${STW}/Departments/Fire-Rescue`, text: "The town's lock box application and reflective address markers." },
    ],
    sources: {
      dept: { label: "Town of Stowe, Fire & Rescue", href: `${STW}/Departments/Fire-Rescue` },
      mtn: { label: "Town of Stowe, Mountain Rescue", href: `${STW}/Departments/Mountain-Rescue` },
    },
  },
  "hyde-park": {
    description:
      "Hyde Park's fire departments: the Hyde Park Town Fire Department, 87 calls in fiscal 2025 and a new truck, and " +
      "the North Hyde Park/Eden Fire Department, 83 calls in 2025, plus the volunteer FAST Squad.",
    subtitle: "Hyde Park Town Fire Department · North Hyde Park/Eden Fire Department",
    facts: [
      ["Hyde Park Town FD", "87 calls in fiscal 2025; Chief Ryan Nolan"],
      ["North Hyde Park/Eden FD", "83 calls in 2025; Chief Brent Lanpher"],
      ["First aid", "Hyde Park FAST Squad, volunteer EMRs and EMTs"],
    ],
    contact: { chief: "Ryan Nolan", website: `${HYP}/department/fire_departments.php`, source: "dept" },
    history: {
      intro:
        "Hyde Park has two volunteer fire departments: the town department on Centerville Road, and the North Hyde " +
        "Park/Eden Fire Department, which also covers the town of Eden. The FAST Squad, once part of the town fire " +
        "department, has been separate since 2009.",
      events: [
        { year: 2009, text: "The Selectboard makes the Hyde Park FAST Squad a stand-alone service, outside the fire department.", source: "r2025" },
        { year: 2024, text: "North Hyde Park/Eden receives its new Engine 2, a 2024 Ford F-550 Alexis mini-pumper, in September, and renovates its bathrooms so the station can serve as an emergency shelter. Captain Scott Audet retires after 35 years.", source: "r2024" },
        { year: 2025, text: "The Hyde Park Town FD takes delivery of a new truck ordered two and a half years earlier; construction of a voter-approved station addition is set to start in May.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Automatic alarms were the town department's most common call.",
      byType: {
        title: "Hyde Park Town FD calls by type, fiscal 2025",
        bars: [
          { label: "Automatic alarms", value: 26 },
          { label: "Motor vehicle crashes", value: 13 },
          { label: "Other", value: 12 },
          { label: "Mutual aid", value: 10 },
          { label: "Chimney fires", value: 8 },
          { label: "Medical assists", value: 5 },
          { label: "CO alarms", value: 4 },
          { label: "Structure fires", value: 3 },
          { label: "Hazardous materials", value: 2 },
          { label: "Vehicle fires", value: 2 },
          { label: "Brush fires", value: 2 },
        ],
        note: "July 2024 to June 2025: 87 calls, against 88 the year before.",
        source: "r2025",
      },
    },
    stationNotes: {
      "hyde-park-212-centerville-rd": {
        text: "The Hyde Park Town Fire Department's station, where it meets on the first three Tuesdays of the month at 6:30 p.m.",
        source: "dept",
      },
    },
    careers: {
      intro: "Both departments, and the FAST Squad, are short of members and recruiting.",
      points: [
        "Hyde Park Town FD: talk to any officer or member",
        "North Hyde Park/Eden FD: meets on the first, second and third Tuesdays of each month",
        "FAST Squad: email Brad Carriere at hpfsems1@yahoo.com",
      ],
      applyUrl: `${HYP}/department/fire_departments.php`,
      source: "r2025",
    },
    residents: [
      { label: "Burn permits", href: `${HYP}/department/fire_departments.php`, text: "From Fire Warden Ryan Nolan, weekdays 4 to 8 p.m. only; none issued at weekends, or for more than three days in a row." },
      { label: "Fireworks", href: `${HYP}/department/fire_departments.php`, text: "Consumer displays need a permit; the town doesn't issue commercial display permits." },
    ],
    sources: {
      dept: { label: "Town of Hyde Park, Fire Departments", href: `${HYP}/department/fire_departments.php` },
      eden: { label: "Town of Eden, Fire Department", href: `${EDN}/community/fire-department/` },
      r2024: { label: "Town of Hyde Park, 2024 Town Report", href: `${HYP}/Documents/Resources/Town%20Plans%20&%20Reports/1%20-%20FINAL%20Web%20Ready%202025%20Town%20Report.pdf`, note: "North Hyde Park Eden Fire Department, page 41" },
      r2025: { label: "Town of Hyde Park, 2025 Town Report", href: `${HYP}/Documents/Department/Finance/1%20REPRO_web_hyde-park.pdf`, note: "Fire departments, pages 31–33; FAST Squad, page 36" },
    },
  },
  elmore: {
    description:
      "Elmore Fire Department: the Lake Elmore firehouse on Beach Road, weekly Thursday meetings, and online burn permits.",
    facts: [
      ["Station", "343 Beach Road, Lake Elmore"],
      ["Meets", "Thursdays, 7 p.m."],
    ],
    contact: { phone: "802-888-0311", website: `${ELM}/community/elmore-fire-department/`, source: "dept" },
    history: {
      intro: "Elmore's department meets every Thursday evening at the firehouse on Beach Road, and new members are always welcome.",
      events: [],
    },
    residents: [
      { label: "Burn permits", href: "https://sites.google.com/elmorefire.org/elmorefire/burn-permit", text: "Apply online for a reply within 24 hours, or call the fire warden." },
    ],
    sources: {
      dept: { label: "Town of Elmore, Elmore Fire Department", href: `${ELM}/community/elmore-fire-department/` },
      permit: { label: "Elmore Fire Department, Burn Permit", href: "https://sites.google.com/elmorefire.org/elmorefire/burn-permit" },
    },
  },
  // St. Johnsbury's station is missing from the E911 file, so this has no page
  // until a Fire Stations record is added for 1187 Main Street.
  "saint-johnsbury": {
    description:
      "St. Johnsbury Fire Department: a combination department since 1843, 12 full-time and 6 paid on-call firefighters " +
      "in one downtown firehouse, protecting the Northeast Kingdom's largest community.",
    facts: [
      ["Founded", "1843"],
      ["Staffing", "12 full-time, 6 paid on call"],
      ["Area", "All 37 square miles of St. Johnsbury"],
      ["Services", "Fire, EMS first response, extrication, hazmat, technical rescue, prevention"],
    ],
    contact: { phone: "802-748-8925", website: `${SJB}/st-johnsbury-vt-fire-department`, source: "dept" },
    history: {
      intro:
        "St. Johnsbury's department dates from 1843 and is known for large, destructive fires that have taken out parts " +
        "of downtown and cost lives; the tightly packed 19th-century brick blocks make fire protection hard. Two " +
        "interstates, two US routes and a freight railroad run through town.",
      events: [
        { year: 1843, text: "On 31 October the department is established with its first hose company, \"The Torrent\", in Fairbanks Village.", source: "dept" },
      ],
    },
    stationNotes: {
      "saint-johnsbury-1187-main-st": {
        text: "The single downtown firehouse that replaced five volunteer companies spread around town.",
        source: "dept",
      },
    },
    residents: [],
    sources: {
      dept: { label: "Town of St. Johnsbury, Fire Department", href: `${SJB}/st-johnsbury-vt-fire-department` },
    },
  },
  burke: {
    description:
      "Burke's two volunteer fire departments: the East Burke Volunteer Fire Brigade, a record 115 incidents in 2025, and " +
      "the West Burke Volunteer Fire Department, 89 calls, its most ever.",
    subtitle: "East Burke Volunteer Fire Brigade · West Burke Volunteer Fire Department",
    facts: [
      ["East Burke Fire Brigade", "115 incidents in 2025, 21 members; Chief Joshua M. Willey"],
      ["West Burke VFD", "89 calls, its most ever; Chief Tom Villeneuve"],
      ["Staffing", "Both all-volunteer"],
    ],
    contact: { website: `${BRK}/fire-departments`, source: "town" },
    history: {
      intro:
        "Burke has two fire departments, one on each side of town, and both are busier than ever. East Burke answered " +
        "about 35 calls a year in the early 2000s; in 2025 it set a record for the third year running.",
      events: [
        {
          year: 2025,
          text:
            "East Burke answers 115 incidents, including remote rescues and eight calls in four hours during the summer " +
            "flooding, when it helped bring in state swift-water teams. Its main engine suffers a catastrophic mechanical " +
            "failure. For 2026 it asks the town for $50,000 to keep operating, buy modern gear, train and maintain its trucks.",
          calls: 115,
          source: "town",
        },
      ],
    },
    calls: {
      intro:
        "East Burke's 2025 response: 8 minutes 53 seconds from dispatch to the first truck leaving, 13:13 to the first " +
        "arriving, six members on an average call, and 58 minutes on scene. Its 21 members trained 544 hours. West Burke, 100% " +
        "volunteer, answered 89 calls in its latest year, its most ever; its budget covers running costs but not major repairs.",
      byType: {
        title: "West Burke VFD calls by type",
        bars: [
          { label: "Alarm activations", value: 26 },
          { label: "Motor vehicle crashes", value: 19 },
          { label: "Medical assists", value: 12 },
          { label: "Fires, structure and chimney", value: 9 },
          { label: "Grass and wildland", value: 9 },
          { label: "Trees or power lines down", value: 6 },
          { label: "Investigations", value: 3 },
          { label: "Service calls", value: 2 },
          { label: "Vehicle fires", value: 2 },
          { label: "Station coverage", value: 1 },
        ],
        note: "89 calls, from the department's most recent year-end report.",
        source: "town",
      },
    },
    careers: {
      intro: "Both departments want volunteers.",
      points: ["West Burke meets every other week", "Contact either department through the town's fire departments page"],
      applyUrl: `${BRK}/fire-departments`,
      source: "town",
    },
    residents: [],
    sources: {
      town: { label: "Town of Burke, Fire Departments", href: `${BRK}/fire-departments` },
    },
  },
  newark: {
    description:
      "Newark Volunteer Fire Department: a nonprofit with twelve volunteer firefighters, three of them EMTs, four " +
      "apparatus in two bays of the town garage, and plans for a new station.",
    facts: [
      ["Run by", "Newark Volunteer Fire Department, Inc., a 501(c)(3) nonprofit"],
      ["Members", "12 firefighters (3 also EMTs) and a junior"],
      ["Serves", "About 581 residents, more in summer"],
    ],
    contact: { phone: "802-467-0003", website: NWK, source: "join" },
    history: {
      intro:
        "Newark's volunteers are unpaid, independent of the town but funded by a town appropriation and donations. They " +
        "answer fire and medical calls, with Lyndon Rescue providing the ambulance.",
      events: [
        { year: 2011, text: "Tanker 51, a 1977 Maxim rebuilt in 1997, is donated by Georgetown, Connecticut.", source: "station" },
        { year: 2017, text: "Rescue 55 is bought from Waterford, Vermont.", source: "station" },
        { year: 2019, text: "The town forms a committee and hires a consultant to plan a renovated or new station.", source: "station" },
      ],
    },
    stationNotes: {
      "newark-1558-newark-st": {
        text:
          "The department shares the town highway garage, using two of its five bays. Three vehicles fit in two bays, " +
          "so Rescue 55 can only leave after a truck in front is moved, and the bays limit trucks to 25 feet. Engine 52, " +
          "a 2005 E-One/International, is first due.",
        source: "station",
      },
    },
    careers: {
      intro: "No experience is needed; training and certifications are provided.",
      points: [
        "Live or work near Newark",
        "Apply online, with Vermont criminal record and abuse registry checks",
        "After a few department events, the members vote on your application",
        "Benefits include training, NVFC and VSFA membership and line-of-duty insurance",
      ],
      applyUrl: `${NWK}/recruitment/`,
      source: "join",
    },
    residents: [
      { label: "Fire safety", href: `${NWK}/fire-safety/`, text: "The department's fire safety pages." },
      { label: "Support the station project", href: `${NWK}/support-us/`, text: "Donations towards the department's share of a new or renovated station." },
    ],
    sources: {
      about: { label: "Newark Volunteer Fire Department, About Us", href: `${NWK}/about-us/` },
      station: { label: "Newark Volunteer Fire Department, Fire Station and Apparatus", href: `${NWK}/about-us/fire-station/` },
      join: { label: "Newark Volunteer Fire Department, Recruitment", href: `${NWK}/recruitment/` },
    },
  },
  ryegate: {
    description:
      "Ryegate Fire Department: established in 1974, a paid department since Town Meeting 2023, with a main station on " +
      "Witherspoon Road and a substation on Scott Highway.",
    facts: [
      ["Established", "1974"],
      ["Staffing", "Paid, since 2023; 24 on the roster, 16 active"],
      ["Chief", "Greg Murray"],
    ],
    contact: { chief: "Greg Murray", phone: "(802) 584-4300", website: `${RYE}/departments/fire`, source: "dept" },
    history: {
      intro: "Ryegate's department was all-volunteer for almost fifty years, until the town voted to pay its firefighters.",
      events: [
        { year: 1974, text: "The Ryegate Fire Department is established.", source: "dept" },
        { year: 2023, text: "On 7 March Town Meeting votes to make it a paid department.", source: "dept" },
      ],
    },
    stationNotes: {
      "ryegate-57-witherspoon-rd": {
        text: "The main station: a 1996 pumper (1,500 gpm, 1,250 gallons), a 2005 tanker (3,000 gallons) and a 1987 equipment truck and command centre. The substation, which the town lists at 2360 Scott Highway, has a 1980 pumper/forestry truck.",
        source: "dept",
      },
    },
    residents: [],
    sources: {
      dept: { label: "Town of Ryegate, Fire Department", href: `${RYE}/departments/fire` },
    },
  },
  hardwick: {
    description:
      "Hardwick Fire Department: its officers, from chief to foreman, pipeman and axe man, and burn permits from the " +
      "forest fire wardens.",
    facts: [
      ["Chief", "Perley Allen, also the forest fire warden"],
      ["Officers", "Including the traditional foreman, pipeman and axe man"],
    ],
    contact: { chief: "Perley Allen", phone: "802-472-5482", website: `${HWK}/government/services/hardwick-fire-department/`, source: "dept" },
    history: {
      intro:
        "Hardwick's officer list keeps old fire-company ranks alongside the modern ones: a foreman and assistant foreman, " +
        "a pipeman and assistant pipeman, and an axe man. The station phone isn't staffed regularly.",
      events: [],
    },
    residents: [
      { label: "Burn permits", href: `${HWK}/government/services/hardwick-fire-department/`, text: "From the forest fire warden, Chief Perley Allen, or one of two deputies." },
    ],
    sources: {
      dept: { label: "Town of Hardwick, Hardwick Fire Department", href: `${HWK}/government/services/hardwick-fire-department/` },
    },
  },
  peacham: {
    description:
      "Peacham Volunteer Fire Department: founded in 1950, unpaid volunteers protecting about 772 people over 36 square " +
      "miles, one chief since 1986, and how to join.",
    facts: [
      ["Founded", "1950"],
      ["Serves", "About 772 people over 36 square miles"],
      ["Services", "Fire, prevention, medical first response, all hazards"],
      ["Chief", "Jeffrey Berwick, since 1986"],
    ],
    contact: { chief: "Jeffrey Berwick", phone: "802-592-3392", website: PCH, source: "contact" },
    history: {
      intro:
        "Peacham's department has always been all volunteer; its members are unpaid. Jeff Berwick has been chief since 1986.",
      events: [
        { year: 1950, text: "The Peacham Fire Department is founded.", source: "history" },
        { year: 1986, text: "Jeff Berwick becomes chief.", source: "history" },
        { year: 2026, text: "Under a new state law, Act 162, the fire chief becomes Peacham's forest fire warden from 1 July.", source: "permits" },
      ],
    },
    careers: {
      intro: "The department is recruiting firefighters and EMS medical first responders.",
      points: ["Stop by the station any Monday at 7:30 p.m.", "Roles include firefighter, EMT, building upkeep and office work"],
      applyUrl: PCH,
      source: "home",
    },
    residents: [
      { label: "Burn permits", href: `${PCH}/burn-permits/`, text: "Needed whenever there's no snow on the ground; from Chief Berwick or a deputy warden." },
    ],
    sources: {
      home: { label: "Peacham Volunteer Fire Department", href: PCH },
      history: { label: "Peacham Volunteer Fire Department, History", href: `${PCH}/history/` },
      permits: { label: "Peacham Volunteer Fire Department, Burn Permits", href: `${PCH}/burn-permits/` },
      contact: { label: "Peacham Volunteer Fire Department, Contact", href: `${PCH}/contact/` },
    },
  },
  brattleboro: {
    description:
      "Brattleboro Fire Department: founded in 1831, 33 career firefighter-EMTs on duty around the clock, more than 4,500 " +
      "emergencies a year, inspections, burn permits and careers.",
    facts: [
      ["Founded", "1831"],
      ["Staff", "33 career firefighters and EMS providers, on duty 24/7"],
      ["Emergencies", "More than 4,500 a year"],
      ["EMS", "Every firefighter is a nationally registered EMS provider"],
    ],
    contact: { phone: "802-254-4831", website: `${BRA}/brattleboro-fire-department`, source: "dept" },
    history: {
      intro:
        "Founded in 1831, Brattleboro's department is a career service answering fires, medical emergencies, crashes, " +
        "hazardous materials, technical rescues and wildland fires.",
      events: [
        { year: 1831, text: "The Brattleboro Fire Department is founded.", source: "dept" },
      ],
    },
    stationNotes: {
      "brattleboro-103-elliot-st": { text: "The department's headquarters on Elliot Street.", source: "dept" },
    },
    careers: {
      intro: "The department is hiring career firefighters.",
      points: ["See the Careers page for openings"],
      applyUrl: `${BRA}/brattleboro-fire-department`,
      source: "dept",
    },
    residents: [
      { label: "Community Connect", href: `${BRA}/brattleboro-fire-department`, text: "Share details about your household that help responders at your address; free and secure." },
      { label: "Burn permits and inspections", href: `${BRA}/brattleboro-fire-department`, text: "Burn permits, building inspections and rental housing registration." },
      { label: "EMS billing", href: `${BRA}/brattleboro-fire-department`, text: "The department's EMS billing programme." },
    ],
    sources: {
      dept: { label: "Town of Brattleboro, Brattleboro Fire Department", href: `${BRA}/brattleboro-fire-department` },
    },
  },
  guilford: {
    description:
      "Guilford Volunteer Fire Department: a nonprofit since 1949, more than 300 fire and EMS calls a year, 25 members, " +
      "the town's first response service since 2004, and a junior programme.",
    facts: [
      ["Founded", "1949"],
      ["Calls", "More than 300 fire and EMS calls a year"],
      ["Members", "25 active firefighters, EMTs and first responders"],
      ["EMS", "The town's first response service since 2004"],
    ],
    contact: { phone: "(802) 254-4413", website: GVF, source: "home" },
    history: {
      intro:
        "Guilford's first fire truck was a 1949 Chevrolet with a 500-gallon tank that used to be an oil tank; strangers " +
        "were sometimes surprised to see a truck that seemed to be pumping oil onto a fire.",
      events: [
        { year: 1949, text: "Residents form the Broad Brook Fire Control; two weeks later it becomes the Guilford Volunteer Fire Department. The truck lives in a barn.", source: "history" },
        { year: 1957, text: "A firehouse is finished on Guilford Center Road, begun in 1954.", source: "history" },
        { year: 1999, text: "The department starts helping Rescue Inc. on medical calls in town.", source: "history" },
        { year: 2004, text: "With enough members certified, it becomes the town's EMS service; Rescue Inc. still transports.", source: "history" },
        { year: 2006, text: "A new station is finished after the old one, too small for new trucks (Tanker 1 stood three inches taller than its doors), was demolished in 2005.", source: "history" },
      ],
    },
    stationNotes: {
      "guilford-108-guilford-center-rd": {
        text:
          "The station finished in 2006: Engine 1, a 2008 Pierce, and Engine 2, a 2019 Pierce (both 1,500 gpm, 1,000 " +
          "gallons); Tanker 1, a 2006 KME/International with 2,500 gallons; a utility pickup, a brush truck, an off-road " +
          "rescue unit and a water rescue trailer.",
        source: "apparatus",
      },
    },
    careers: {
      intro: "Firefighters and EMTs need Vermont certification and annual training hours.",
      points: [
        "Training every Tuesday evening",
        "Juniors from 16, living in or near Guilford, with at least a learner's permit; not on interstate or mutual aid calls, or after 9:30 p.m. on school nights",
        "Call (802) 254-4413 or email guilford.fire@gmail.com",
      ],
      applyUrl: `${GVF}/membership-information/`,
      source: "join",
    },
    residents: [],
    sources: {
      home: { label: "Guilford Volunteer Fire Department", href: GVF },
      history: { label: "Guilford Volunteer Fire Department, History", href: `${GVF}/history/` },
      apparatus: { label: "Guilford Volunteer Fire Department, Apparatus", href: `${GVF}/apparatus/` },
      join: { label: "Guilford Volunteer Fire Department, Membership Information", href: `${GVF}/membership-information/` },
    },
  },
  newfane: {
    description:
      "NewBrook Fire & Rescue: the volunteer fire and EMS service for Newfane and Brookline since 1948, about 240 calls a " +
      "year, a 1942 Army truck still in service, and no bills, ever.",
    facts: [
      ["Founded", "1948, for Newfane and Brookline"],
      ["Members", "About 60 volunteers: 20 firefighters, 8 EMS responders, about 25 support staff"],
      ["Calls", "About 240 in an average year"],
      ["Run by", "The NewBrook Volunteer Fire Association, a nonprofit"],
    ],
    contact: { website: NBF, source: "home" },
    history: {
      intro:
        "NewBrook began in 1948 with a dozen volunteers, no firehouse, no trucks and some used hose. It owns its firehouse " +
        "and trucks outright, takes most of its money from donations and fundraising, and never sends a bill.",
      events: [
        { year: 1948, text: "The combined Newfane-Brookline fire district is formed.", source: "home" },
        { year: 1950, text: "The first firehouse is built on Route 30, half a mile south of the village; around then the department turns a 1942 Army surplus 4WD truck into a 500-gallon pumper. It's still in service as the brush truck.", source: "home" },
        { year: 1968, text: "Membership reaches about 100.", source: "home" },
        { year: 1984, text: "NewBrook becomes a principal EMS provider for the district.", source: "home" },
        { year: 1993, text: "The present firehouse opens, half a mile north of the village on Route 30.", source: "home" },
        { year: 2014, text: "FEMA designates the firehouse a Disaster Recovery Center.", source: "home" },
      ],
    },
    careers: {
      intro: "Every member is a volunteer, including firefighters, EMS responders and support staff; a 45-member auxiliary raises money and feeds crews at scenes.",
      points: ["Juniors are welcome", "Get in touch through the department's website"],
      applyUrl: NBF,
      source: "home",
    },
    residents: [
      { label: "Bingo and benefit events", href: NBF, text: "Saturday bingo, the Fourth of July open house and barbecue, the Hunters' Breakfast and more." },
      { label: "Emergency shelter", href: NBF, text: "The firehouse, with a generator and full kitchen, has served as a public shelter." },
    ],
    sources: {
      home: { label: "NewBrook Volunteer Fire and Rescue", href: NBF },
    },
  },
  westminster: {
    description:
      "Westminster Volunteer Fire and Rescue: Westminster Fire District #3, fire protection for the town and mutual aid " +
      "for its neighbours, and burn permits.",
    facts: [["Run by", "Westminster Fire District #3"], ["Station", "103 Grout Avenue"]],
    contact: { website: `${WMS}/services/fire/`, source: "dept" },
    history: {
      intro: "Westminster Volunteer Fire and Rescue, run by Westminster Fire District #3, protects the town and gives mutual aid to its neighbours.",
      events: [],
    },
    residents: [
      { label: "Burn permits", href: `${WMS}/services/fire/`, text: "Call one of the two permit contacts listed on the town's fire page." },
    ],
    sources: {
      dept: { label: "Town of Westminster, Fire Department", href: `${WMS}/services/fire/` },
    },
  },
  vernon: {
    description:
      "Vernon Volunteer Fire Department: serving since its first meeting in July 1951, fire, EMS, hazmat and alarms, its " +
      "chiefs over seventy years, and its volunteers today.",
    facts: [
      ["Founded", "1951"],
      ["Services", "Fire, EMS, hazardous materials, alarms, carbon monoxide"],
      ["Chief", "Alex Dunklee"],
    ],
    contact: { chief: "Alex Dunklee", website: VER, source: "dept" },
    history: {
      intro:
        "Vernon's volunteers have gone from a phone tree to a siren, pagers and now text alerts, and from fires and " +
        "crashes to medical calls, hazmat, alarms and carbon monoxide. Thirteen chiefs led the department before Alex Dunklee.",
      events: [
        { year: 1951, text: "On 5 July the department holds its first meeting and limits membership to \"25 men, plus several call men\". On 9 July its fire truck is tested; the pump has to go for repairs.", source: "dept" },
      ],
    },
    careers: {
      intro: "Members serve as firefighters, EMS providers or support personnel.",
      points: ["Contact the chief at firechief@vernonvt.org"],
      applyUrl: VER,
      source: "dept",
    },
    residents: [],
    sources: {
      dept: { label: "Town of Vernon, Vernon Volunteer Fire Department", href: VER },
    },
  },
  rockingham: ROCKINGHAM,
  "bellows-falls": ROCKINGHAM,
  "saxtons-river": ROCKINGHAM,
  "newport-city": {
    description:
      "City of Newport Fire Department: 24 members, marine and ice rescue, an 85-foot " +
      "tower and a rescue airboat, 2024 calls by type, and a junior programme from age 14.",
    facts: [
      ["Members", "24, with over 300 combined years of experience, plus 3 juniors"],
      ["Services", "Fire, heavy rescue and extrication, marine and ice rescue, hazmat, risk reduction"],
      ["Station", "350 Western Avenue, built 1998"],
      ["Chief", "Kevin Lacoss, appointed 2024"],
    ],
    contact: { chief: "Kevin Lacoss", phone: "(802) 334-7919", website: `${NPT}/city-information/fire-department/`, source: "dept" },
    history: {
      intro:
        "Newport's department protects the city and part of Coventry. It meets on Tuesday evenings, and all training " +
        "and gear are paid for.",
      events: [
        {
          year: 2024,
          text:
            "Kevin Lacoss, a member since 2002, is appointed chief, and a full-time administrative firefighter is hired. " +
            "Coventry shrinks the area Newport covers, though its share of capital costs stays the same. New Holmatro " +
            "rescue tools free a trapped driver on Pine Hill Road within days of arriving. Longtime member Lucius " +
            "\"Butch\" Provencher dies after more than 40 years.",
          source: "r2024",
        },
        { year: 2025, text: "A new engine, ordered in 2023, is due in September.", source: "r2024" },
      ],
    },
    calls: {
      intro:
        "Alarms and crashes made up most of 2024's calls. The report gives a total of 184; its list also counts 26 " +
        "trainings and 11 outreach events, which the chart leaves out, and adds up to more than that total.",
      byType: {
        title: "Calls by type, 2024",
        bars: [
          { label: "Fire alarms", value: 62 },
          { label: "Crashes", value: 32 },
          { label: "Fires, other", value: 12 },
          { label: "Agency assists", value: 11 },
          { label: "Carbon monoxide alarms", value: 8 },
          { label: "Medical assists", value: 6 },
          { label: "Burning complaints", value: 5 },
          { label: "Vehicle fires", value: 4 },
          { label: "Power line incidents", value: 4 },
          { label: "Smoke investigations", value: 4 },
          { label: "Structure fires", value: 3 },
          { label: "Illegal burning", value: 3 },
          { label: "Brush or grass fires", value: 2 },
          { label: "Mutual aid fires", value: 2 },
          { label: "Ice or water rescues", value: 2 },
          { label: "Flooding", value: 2 },
        ],
        note: "Calendar 2024. Five types with one call each (cooking fire, traffic detail, gas, sprinkler, odour) are left off.",
        source: "r2024",
      },
    },
    stationNotes: {
      "newport-city-350-western-ave": {
        text:
          "The 1998 station: Engine 1 (1998 Ferrara), Engine 2 (2010 Smeal), Tower 1 (a 2001 Smeal 85-foot platform), " +
          "Rescue 5 (a 2014 RescueOne heavy rescue), Brush 23, a Rivercraft rescue airboat and a UTV.",
        source: "r2024",
      },
    },
    careers: {
      intro: "Roles include interior firefighter, driver/operator and support. All training and gear are funded by the department.",
      points: [
        "18 or over, with a driver's licence and a background check",
        "Junior firefighters aged 14 to 17",
        "Stop by the station on a Tuesday evening, or call",
      ],
      applyUrl: `${NPT}/city-information/fire-department/`,
      source: "r2024",
    },
    residents: [
      { label: "Burn permits", href: `${NPT}/city-information/fire-department/`, text: "Request online or call 802-334-7919; allow two to three business days." },
      { label: "Open house", href: `${NPT}/city-information/fire-department/`, text: "An annual fire prevention and safety open house each October, with live-fire extinguisher training." },
    ],
    sources: {
      dept: { label: "City of Newport, Fire Department", href: `${NPT}/city-information/fire-department/` },
      r2024: { label: "City of Newport, 2024 Annual Report", href: `${NPT}/wp-content/uploads/2025/02/2024-Newport-City-Annual-Report.pdf`, note: "Newport City Fire Department, pages 50–52" },
    },
  },
  troy: {
    description:
      "Troy Volunteer Fire Department: unpaid volunteers on Route 100, a 1999 75-foot ladder bought in 2025 to replace a " +
      "105-foot truck, and the town's fire funding; North Troy has its own department.",
    facts: [
      ["Staffing", "100% volunteer, with no pay or stipends"],
      ["Town funding", "$33,974.77 requested for 2026, the same as 2025"],
      ["Chief", "Bobby Jacobs"],
    ],
    contact: { chief: "Bobby Jacobs", phone: "802-673-4144", website: `${TRY}/services/ambulance-and-fire`, source: "town" },
    history: {
      intro:
        "Troy's volunteers answer fires, crashes, medical assists, hazardous conditions and water rescues. The village of " +
        "North Troy has its own fire department, with its own chief, which the town also helps fund.",
      events: [
        { year: 2025, text: "The department sells its 105-foot ladder truck to another Vermont department and buys a used 1999 E-One 75-foot Cyclone: shorter, more manoeuvrable, and able to work as an engine with its 500-gallon tank and 1,500 gpm pump.", source: "report" },
      ],
    },
    residents: [
      { label: "Clear your driveway", href: `${TRY}/services/ambulance-and-fire`, text: "Trim trees and branches along driveways so trucks can reach you." },
      { label: "Burn permits", href: `${TRY}/services/ambulance-and-fire`, text: "From the Fire Warden, who covers both Troy and North Troy." },
    ],
    sources: {
      town: { label: "Town of Troy, Ambulance and Fire", href: `${TRY}/services/ambulance-and-fire` },
      report: { label: "Town of Troy, 2025 Annual Report", href: `${TRY}/fileadmin/files/General/Troy_Annual_Report_2025.pdf`, note: "Troy Volunteer Fire Department, page 18; appropriations, pages 5–9. A scanned report, read with text recognition" },
    },
  },
  "rutland-city": {
    description:
      "City of Rutland Fire Department: a career department since 1894, from the 1829 Rutland Fire Society to Vermont's " +
      "first paramedic programme, with 30 full-time firefighters, a call force and the city's FY2027 fire budget.",
    subtitle: "City of Rutland Fire Department",
    facts: [
      ["Staffing", "30 full-time firefighters on three shifts, plus a call force of 18"],
      ["Career since", "1 January 1894"],
      ["Apparatus", "Three engines, a 102-foot aerial platform, a 75-foot quint and a 48-foot bucket truck"],
      ["Union", "IAFF Local 2323, since 1974"],
      ["FY2027 budget", "$4,628,606"],
    ],
    contact: { chief: "William Lovett", phone: "802-773-1812", website: `${RUC}/departments/fire-department/`, source: "dept" },
    history: {
      intro:
        "Rutland's department works from one central station on Center Street. It answers fires in homes, businesses and " +
        "industry, crashes, hazardous materials, confined-space and high-angle rope rescues, and natural disasters.",
      events: [
        { year: 1829, text: "The Rutland Fire Society is organised by Act of the Vermont Legislature and buys a used hand-pump engine, the Torrent.", source: "history" },
        { year: 1858, text: "Nickwackett Engine Company No. 1 forms and builds a house at Center and Nickwackett Streets for $1,200.", source: "history" },
        { year: 1860, text: "Washington Engine Company No. 2 and Union Hook & Ladder Company No. 1 are organised; they later move into the new city hall on Washington Street.", source: "history" },
        { year: 1868, text: "Fires burn the west side of Main Street, the north side of Center Street and both sides of Merchants Row. The town buys an Amoskeag steamer, the first in Vermont, and forms the Killington Steamer Company.", source: "history" },
        { year: 1874, text: "Between 1874 and 1886 five hose companies are formed, at the height of Rutland's volunteer era.", source: "history" },
        { year: 1894, calls: 100, text: "With 225 volunteers and insurance rates climbing, the new city starts a paid department on 1 January: eight full-time men and 32 call men, with horse-drawn hose wagons at two stations. It answers 100 calls in its first year.", source: "history" },
        { year: 1916, text: "The first motorised apparatus arrives from American LaFrance. The last horses are gone by 1929.", source: "history" },
        { year: 1970, text: "A new central station opens on Center Street, approved by voters in 1969 for $500,000, replacing the two old stations.", source: "history" },
        { year: 1973, text: "The Berwick Hotel fire on 7 January kills five residents. The city calls in eight towns for mutual aid in sub-zero cold.", source: "rtown" },
        { year: 1974, text: "Firefighters join the International Association of Fire Fighters as Local 2323.", source: "history" },
        { year: 1975, text: "The department has 36 full-time firefighters and 24 call members, and begins answering medical emergencies.", source: "history" },
        { year: 1981, text: "Rutland starts the first paramedic programme in Vermont.", source: "history" },
      ],
    },
    money: {
      intro:
        "The fire department's budget for fiscal 2027 is $4.6 million of the city's $27.5 million, up $290,027 on the " +
        "year, most of it in salaries.",
      year: "fiscal year 2027, as approved",
      lines: [
        { label: "Salaries", amount: 2424182 },
        { label: "Health insurance", amount: 599846 },
        { label: "Workers' compensation", amount: 350000 },
        { label: "Pensions (VMERS and city)", amount: 258081 },
        { label: "Social Security and Medicare", amount: 208889 },
        { label: "Overtime, training and events", amount: 198000 },
      ],
      linesNote: "The six largest lines in the fire department's budget detail; the department total is $4,628,606.",
      capital: {
        title: "Fire department budget, by year",
        lines: [
          { label: "FY2027", amount: 4628606 },
          { label: "FY2026", amount: 4338579 },
        ],
        note: "The general fund also moves $175,000 a year to the fire equipment fund, in both years.",
      },
      source: "budget",
    },
    residents: [
      { label: "Fire safety", href: `${RUC}/departments/fire-department/`, text: "The department's guides on smoke alarms, woodstoves, holiday safety and reducing risks for older adults." },
      { label: "Non-emergency line", href: `${RUC}/departments/fire-department/`, text: "802-773-1812, at 104 Center Street. Dial 911 for emergencies." },
    ],
    sources: {
      dept: { label: "City of Rutland, Fire Department", href: `${RUC}/departments/fire-department/` },
      history: { label: "City of Rutland, Fire Department history", href: `${RUC}/departments/fire-department/history/`, note: "By Deputy Chief Michael J. Walsh" },
      rtown: { label: "Rutland Town Fire Department, a look back (1976)", href: `${RUT}/town-departments/rutland-town-fire-department/` },
      budget: { label: "City of Rutland, FY2027 budget detail", href: `${RUC}/wp-content/uploads/2026/04/Budget-Detail-for-Website.pdf`, note: "Fire Department, pages 6–7; summary by department; voter approved March 2026" },
    },
  },
  "rutland-town": {
    description:
      "Rutland Town Fire Department: volunteers since 1968, when the town stopped buying protection from the city; " +
      "two stations, a new Public Safety Building on McKinley Avenue, calls by year and type, and the fire budget.",
    facts: [
      ["Founded", "1968"],
      ["Members", "34 active firefighters, 22 certified Level 1 or higher (2025)"],
      ["Stations", "McKinley Avenue (Public Safety Building, 2025) and Center Rutland"],
      ["Chief", "Chris Clark, term to January 2029"],
    ],
    contact: { chief: "Chris Clark", phone: "(802) 773-2528, option 2", website: `${RUT}/town-departments/rutland-town-fire-department/`, source: "dept" },
    history: {
      intro:
        "Until 1968 Rutland Town bought its fire protection from the City of Rutland. When the city's price rose sharply, " +
        "voters chose to form their own department, and sixty men turned out to volunteer.",
      events: [
        { year: 1967, text: "Selectmen fail to agree a price with the city's aldermen; a special town vote backs a town department. C. John Morse is appointed the first chief, every volunteer takes a 45-hour course, and Pumper 1 arrives from Ward LaFrance on 2 November.", source: "dept" },
        { year: 1968, text: "Stations go up on McKinley Avenue and in Center Rutland. The town takes over from the city on 1 October under Chief Richard Spicer, and answers its first official fire eleven days later.", source: "dept" },
        { year: 1969, text: "The department joins the Rutland County Mutual Aid Association, then sixteen departments, and answers its first mutual aid call, to a barn fire in Clarendon, on 16 January.", source: "dept" },
        { year: 1973, text: "Town firefighters help the city at the Berwick Hotel fire. Cleto DelBianco, an original volunteer who helped design the tankers' quick-dump system, is named Vermont State Fireman of the Year.", source: "dept" },
        { year: 2020, calls: 173, text: "Calls for service.", source: "r2021" },
        { year: 2021, calls: 192, text: "Training moves outdoors during the pandemic, including at the Pittsford fire academy and on a roof prop built at the stations.", source: "r2021" },
        { year: 2022, calls: 189, text: "Calls for service.", source: "r2023" },
        { year: 2023, calls: 190, text: "The 1960s McKinley Avenue station is demolished in September to make way for a $5.5 million Public Safety Building approved by voters.", source: "r2024" },
        { year: 2024, calls: 186, text: "Calls for service.", source: "r2024" },
        { year: 2025, calls: 194, text: "Fire and police move into the new Public Safety Building in February; an open house follows on 17 May. A new air cascade system, paid for largely by local businesses, arrives in September.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Medical assists and crashes, cancelled or unfounded calls, and alarm malfunctions make up most of the work.",
      byYear: {
        title: "Calls for service, by year",
        bars: [
          { label: "2020", value: 173 },
          { label: "2021", value: 192 },
          { label: "2022", value: 189 },
          { label: "2023", value: 190 },
          { label: "2024", value: 186 },
          { label: "2025", value: 194 },
        ],
        note: "As the chief reports them in each year's town report.",
        source: "r2025",
      },
      byType: {
        title: "Calls by type, 2025",
        bars: [
          { label: "Rescue and crashes", value: 48 },
          { label: "Good intent calls", value: 45 },
          { label: "False alarms", value: 43 },
          { label: "Fires", value: 17 },
          { label: "Hazardous conditions", value: 17 },
          { label: "Service calls", value: 7 },
        ],
        note: "Good intent: cancelled en route, nothing found, smoke scares, controlled burns. The incidents listed by type add up to 177 of the 194 the report states.",
        source: "r2025",
      },
    },
    money: {
      intro:
        "The fire budget is small because the firefighters are volunteers: $266,444 proposed for fiscal 2027. Voters " +
        "are also asked to raise the fire depreciation fund rate from 1.75 to 2 cents per $100 of property value.",
      year: "fiscal year 2027, as proposed",
      lines: [
        { label: "Salaries", amount: 75028 },
        { label: "New equipment", amount: 40000 },
        { label: "Vehicle maintenance and equipment", amount: 28000 },
        { label: "Administrative salaries", amount: 24239 },
        { label: "Daytime wage", amount: 20600 },
      ],
      linesNote: "The five largest lines in the fire budget.",
      capital: {
        title: "Fire budget, total expenses",
        lines: [
          { label: "FY2027, proposed", amount: 266444 },
          { label: "FY2026, budget", amount: 262538 },
          { label: "FY2025, budget", amount: 250038 },
          { label: "FY2025, actual", amount: 222953 },
        ],
        note: "Paid for by property taxes.",
      },
      source: "r2025",
    },
    stationNotes: {
      "rutland-town-272-mckinley-ave": { text: "The Public Safety Building, shared with the town police, opened in 2025 on the site of the 1968 station.", source: "r2025" },
      "rutland-town-619-business-route-4": { text: "The Center Rutland station, one of the department's two original 1968 stations.", source: "dept" },
    },
    careers: {
      intro: "Open to residents of Rutland Town, Rutland City and Mendon. Training night is Wednesday at either station.",
      points: [
        "Cadet firefighters aged 14 and 15",
        "Junior firefighters aged 16 and 17",
        "Senior firefighters 18 and over",
        "Fill in the short form on the town's page, or stop by on a Wednesday evening",
      ],
      applyUrl: `${RUT}/town-departments/rutland-town-fire-department/`,
      source: "dept",
    },
    residents: [
      { label: "Burn permits", href: `${RUT}/town-departments/rutland-town-fire-department/`, text: "Call the chief for a permit; a voicemail or email is not enough. Fires out by dusk, none on Sundays, yard waste and clean wood only." },
      { label: "Fireworks permits", href: `${RUT}/town-departments/rutland-town-fire-department/`, text: "From the fire chief; approved displays are listed on the town's page." },
    ],
    sources: {
      dept: { label: "Town of Rutland, Fire Department", href: `${RUT}/town-departments/rutland-town-fire-department/`, note: "Including the department's 1976 history by Michael R. McCarthy" },
      r2021: { label: "Town of Rutland, 2021 Town Report", href: `${RUT}/wp-content/uploads/2022/02/2021-Town-Report.pdf`, note: "Fire Department report" },
      r2023: { label: "Town of Rutland, 2023 Town Report", href: `${RUT}/wp-content/uploads/2024/03/2023-Town-Report-Final.pdf`, note: "Fire Department report" },
      r2024: { label: "Town of Rutland, 2024 Town Report", href: `${RUT}/wp-content/uploads/2025/02/2024-Town-Report.pdf`, note: "Select Board report, page 4; Fire Department report" },
      r2025: { label: "Town of Rutland, FY2025 Town Report", href: `${RUT}/wp-content/uploads/2026/02/FY-2025-Town-report.pdf`, note: "Fire Department report, calls and fire budget, pages 22–25; warning article 21" },
    },
  },
  pawlet: {
    description:
      "Pawlet Volunteer Fire Department: an all-volunteer nonprofit covering 25 square miles of eastern Pawlet, " +
      "from an 1895 fire to a 2023 Ahrens-Fox engine, dispatched from Washington County, New York.",
    facts: [
      ["Staffing", "All volunteer, unpaid; a 501(c)(3) nonprofit funded mainly by the town"],
      ["District", "25 square miles, the eastern half of Pawlet"],
      ["ISO rating", "Class 8B"],
      ["Dispatch", "Washington County (NY) Department of Public Safety, since the mid-1990s"],
      ["Incorporated", "1967"],
      ["Chief", "Jon Weiss"],
    ],
    contact: { chief: "Jon Weiss", phone: "(802) 325-3222", website: `${PAW}/`, source: "contact" },
    history: {
      intro:
        "Pawlet's volunteers answer fires, crashes, hazardous materials, gas and carbon monoxide calls and wildland fires, " +
        "assist the Vermont State Police and the Granville Rescue Squad, and train more than 70 hours a year at home. " +
        "West Pawlet has its own department.",
      events: [
        { year: 1895, text: "A fire in West Pawlet kills three people and destroys almost all of the downtown; the village has no means of fighting it.", source: "history" },
        { year: 1904, text: "The Crescent Valley Hotel burns. The town buys a horse-drawn, gasoline-powered pump, kept in the shed by the Mill Pond, which still stands.", source: "history" },
        { year: 1950, text: "In the early 1950s young men in town organise the Pawlet Volunteer Fire Department, with a 1947 ex-Army tanker kept in a barn on Route 133.", source: "history" },
        { year: 1967, text: "The department is formally incorporated, and holds its first game supper the next autumn.", source: "history" },
        { year: 1973, text: "Today's firehouse is built, just before the temporary one burns down; the trucks are saved.", source: "history" },
        { year: 1979, text: "The Methodist Church on Route 133 is lost to fire in February despite many departments' work.", source: "history" },
        { year: 1990, text: "In the early 1990s radio pagers replace the fire phones, a ten-phone party line answered by firefighters. Mid-decade, dispatch moves to Washington County, New York, for better radio reach past the Taconics.", source: "history" },
        { year: 1998, text: "An E-One on a Freightliner chassis becomes Pawlet's first brand-new fire truck.", source: "history" },
        { year: 2023, text: "ETA 542, an HME Ahrens-Fox pumper-tanker built for Pawlet, enters service in October.", source: "today" },
        { year: 2025, text: "Members build Attack 543, a small initial-attack and wildland truck, on a Ford F350 chassis.", source: "today" },
        { year: 2026, text: "Under Act 162, signed in June, the Pawlet and West Pawlet departments take over issuing burn permits.", source: "burn" },
      ],
    },
    stationNotes: {
      "pawlet-155-vt-route-133": {
        text:
          "The firehouse, built in 1973: ETA 542 (2023 HME Ahrens-Fox, 1,500 gpm, 1,000 gallons), ETA 541 (2001 E-One, " +
          "1,250 gpm, 1,250 gallons) and Attack 543. Members meet Tuesdays at 7 pm.",
        source: "today",
      },
    },
    careers: {
      intro:
        "No experience needed: the department trains every week and pays for any fire service course a member takes. " +
        "Not every role is structural firefighting.",
      points: [
        "18 or over, with a background check",
        "Juniors from 16, training alongside adults but not responding to calls",
        "At least 24 training hours a year, 6 each quarter",
        "A one-month probation, then a vote at the next monthly meeting",
        "Fill in the form, call the station, or drop by on a Tuesday at 7 pm",
      ],
      applyUrl: `${PAW}/volunteer/`,
      source: "volunteer",
    },
    residents: [
      { label: "Burn permits", href: `${PAW}/fire-safety-information/burn-permits/`, text: "Request online, or call 325-3222 (Pawlet) or 645-0276 (West Pawlet). No permit is needed for a fire pit 36 inches or less." },
      { label: "Pool fills", href: `${PAW}/frequently-asked-questions/`, text: "In the Pawlet fire district, $30 per 1,000 gallons; call the station a few weeks ahead." },
      { label: "Address markers", href: `${PAW}/address-marker-program/`, text: "Green reflective 911 address signs made by the department for homes and businesses." },
      { label: "Dry hydrants", href: `${PAW}/non-emergency-services/`, text: "Have a pond? The department installs dry hydrants with landowners, often at little or no cost." },
      { label: "Home safety visits", href: `${PAW}/non-emergency-services/`, text: "Fire safety evaluations and free smoke and CO detectors." },
    ],
    sources: {
      contact: { label: "Pawlet Volunteer Fire Department, Contact", href: `${PAW}/contact/` },
      today: { label: "Pawlet Volunteer Fire Department, Today", href: `${PAW}/today/` },
      history: { label: "Pawlet Volunteer Fire Department, History", href: `${PAW}/history/` },
      volunteer: { label: "Pawlet Volunteer Fire Department, Volunteer", href: `${PAW}/volunteer/` },
      burn: { label: "Pawlet Volunteer Fire Department, Burn permits", href: `${PAW}/fire-safety-information/burn-permits/` },
    },
  },
  pittsford: {
    description:
      "Pittsford Fire Department: 44 members serving Pittsford and Florence since 1948 from two stations, with eight " +
      "pieces of apparatus and a 45-square-mile first-due area.",
    facts: [
      ["Founded", "1948"],
      ["Members", "44"],
      ["Stations", "2"],
      ["Apparatus", "3 engines, a ladder, a tanker, a medium rescue, a brush truck and an off-road utility vehicle"],
      ["Area", "About 45 square miles and 3,000 residents, in Pittsford and Florence"],
      ["Chief", "Bill Hemple, since 2017"],
    ],
    contact: { chief: "Bill Hemple", website: `${PIT}/fire-department/`, source: "town" },
    history: {
      intro:
        "Pittsford's department is a member of the Rutland County Fire Mutual Aid Association; when called for mutual aid " +
        "its area grows to nearly 300 square miles and 56,000 people.",
      events: [
        { year: 1948, text: "The Pittsford Fire Department begins serving Pittsford and Florence.", source: "town" },
        { year: 2017, text: "Bill Hemple becomes chief.", source: "town" },
      ],
    },
    residents: [
      { label: "Join", href: `${PIT}/fire-department/`, text: "Pick up an application at the town clerk's office, or stop by the firehouse on the 2nd or 4th Tuesday of the month." },
    ],
    sources: {
      town: { label: "Town of Pittsford, Fire Department", href: `${PIT}/fire-department/` },
    },
  },
  poultney: {
    description:
      "Poultney Fire Department, the volunteer Poultney Hose Company No. 1: calls by year and type for 2023–2025, " +
      "a new 4x4 mini pumper, a trail-rescue UTV, and the town's fire budget.",
    facts: [
      ["Known as", "Poultney Hose Company No. 1"],
      ["Staffing", "Volunteer: 19 senior members at the end of 2025, down from 24 in 2023"],
      ["Station", "55 Firehouse Lane, since 1998"],
      ["Chief", "Aaron Kerber"],
      ["Meets", "Tuesday evenings, 6:30 to 8:30"],
    ],
    contact: { chief: "Aaron Kerber", website: `${POU}/services/police-fire-emergencies`, source: "town" },
    history: {
      intro:
        "Poultney's volunteers answer crashes, structure fires, EMS assists, alarms and wilderness rescues. On calls alone " +
        "they gave 1,518.5 hours in 2025, and the department logs about 1,500 hours of training a year.",
      events: [
        { year: 1998, text: "The department moves into its new building at 55 Firehouse Lane.", source: "town" },
        { year: 2023, calls: 159, text: "A gift from the Conine Family Foundation buys a UTV for off-road rescues as the Slate Valley Trails grow. Nate Bourn, a junior firefighter who rose to assistant chief and town fire warden, leaves after 14 years to become a full-time firefighter.", source: "r2023" },
        { year: 2024, calls: 167, text: "A 2022 Ford F-550 4x4 mini pumper, ordered in 2022, arrives in April to replace a 1994 International as the first truck out to crashes and rescues. Fifteen members train at a Vermont Fire Academy live-burn day.", source: "r2024" },
        { year: 2025, calls: 150, text: "Town meeting is asked for $20,000 to start a length-of-service award for members of 5, 10, 15 and 20 years. Ten members attend the academy's live-burn day.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Crashes are the largest single call type every year, followed by EMS assists, structure fires and alarms.",
      byYear: {
        title: "Calls for service, by year",
        bars: [
          { label: "2023", value: 159 },
          { label: "2024", value: 167 },
          { label: "2025", value: 150 },
        ],
        note: "Calendar years, from the chief's report in each town report.",
        source: "r2025",
      },
      byType: {
        title: "Calls by type, 2025",
        bars: [
          { label: "Motor vehicle crashes", value: 31 },
          { label: "EMS assists", value: 20 },
          { label: "Structure fires", value: 19 },
          { label: "Fire alarms", value: 18 },
          { label: "Grass and brush fires", value: 12 },
          { label: "Good intent", value: 12 },
          { label: "Carbon monoxide alarms", value: 7 },
          { label: "Hazmat", value: 6 },
          { label: "Utility calls", value: 6 },
          { label: "Service calls", value: 5 },
          { label: "Vehicle fires", value: 4 },
          { label: "Smell of propane", value: 3 },
          { label: "Rescues", value: 3 },
          { label: "Smoke conditions", value: 3 },
          { label: "Rubbish fire", value: 1 },
        ],
        note: "Calendar 2025; the types add up to the 150 calls reported.",
        source: "r2025",
      },
    },
    money: {
      intro:
        "The town funds the department, a truck payment, an equipment fund and firehouse repairs: $341,283 in all " +
        "proposed for fiscal 2027.",
      year: "fiscal year 2027, as proposed",
      lines: [
        { label: "Fire Department", amount: 173550 },
        { label: "Fire equipment fund", amount: 130000 },
        { label: "Firehouse capital repair", amount: 20483 },
        { label: "Fire truck payment", amount: 17250 },
      ],
      linesNote: "From the town's general government budget.",
      capital: {
        title: "Fire Department line, by year",
        lines: [
          { label: "FY2027, proposed", amount: 173550 },
          { label: "FY2026, budget", amount: 166350 },
          { label: "FY2025, spent", amount: 128050 },
        ],
        note: "The town's appropriation for the department's running costs.",
      },
      source: "r2025b",
    },
    stationNotes: {
      "poultney-55-firehouse-ln": { text: "The firehouse since 1998, and the town's polling place.", source: "town" },
    },
    residents: [
      { label: "Join", href: `${POU}/services/police-fire-emergencies`, text: "Stop by the firehouse any Tuesday night, 6:30 to 8:30. Roles range from scene support to firefighting; juniors are welcome." },
    ],
    sources: {
      town: { label: "Town of Poultney, Police, Fire & Emergencies", href: `${POU}/services/police-fire-emergencies` },
      r2023: { label: "Town of Poultney, 2023 Town Report", href: `${POU}/fileadmin/files/Selectboard/Town_Reports/2023_Poultney_Report.pdf`, note: "Fire Department report, PDF page 43. A scanned report, read with text recognition" },
      r2024: { label: "Town of Poultney, 2024 Town Report", href: `${POU}/fileadmin/files/Selectboard/Town_Reports/Poultney_2024_VermontMunicipalReport.pdf`, note: "Fire Department report, PDF page 41. A scanned report, read with text recognition; its listed types add up to 161 of the 167 calls" },
      r2025: { label: "Town of Poultney, 2025 Town Report", href: `${POU}/fileadmin/files/Selectboard/Town_Reports/2025_Poultney_Report.pdf`, note: "Fire Department report, PDF page 41; 2025 town meeting minutes, PDF page 9" },
      r2025b: { label: "Town of Poultney, 2025 Town Report: proposed budget", href: `${POU}/fileadmin/files/Selectboard/Town_Reports/2025_Poultney_Report.pdf`, note: "General government budget, PDF page 24" },
    },
  },
  castleton: {
    description:
      "Castleton Volunteer Fire Department: established 1946, calls from the town reports, the Gilmore's Home Center " +
      "fire, a refurbished tower truck and a 35% budget increase proposed for 2025.",
    facts: [
      ["Founded", "1946"],
      ["Chief", "Heath Goyette"],
      ["Town fire budget", "$262,807 proposed for FY2025, up 35% from $194,288"],
      ["Meets", "Wednesday nights, around six"],
    ],
    contact: { chief: "Heath Goyette", phone: "802-468-5060", source: "r2024" },
    history: {
      intro:
        "Castleton's volunteers answer vehicle crashes, fire alarms, carbon monoxide alarms, downed lines and storm calls, " +
        "and help neighbouring towns at structure fires through the Rutland County mutual aid group.",
      events: [
        { year: 1946, text: "The Castleton Fire Department is established.", source: "r2021" },
        { year: 2021, calls: 133, text: "Emergency calls reported for the 2020–21 town year.", source: "r2021" },
        { year: 2023, text: "In the year to June, fire destroys the Gilmore's Home Center hardware store. Nine departments and Rutland Regional assist, with over 100 firefighters on scene and only minor injuries. Castleton also helps at eight structure fires through mutual aid.", source: "r2023" },
        { year: 2024, calls: 145, text: "A refurbished tower truck is about to enter service, a new mini pumper is on order, and a 50% state grant pays for lightweight wildland gear. The fire warden issues 97 burn permits.", source: "r2024" },
      ],
    },
    residents: [
      { label: "Join", href: `${CAS}/news/final_2023-2024_town_report_0.pdf`, text: "Stop by the firehouse any Wednesday night around six for an application. A junior programme is open to ages 16 to 18." },
      { label: "Burn permits", href: `${CAS}/news/final_2023-2024_town_report_0.pdf`, text: "From the town fire warden." },
    ],
    sources: {
      r2021: { label: "Town of Castleton, Annual Report 2020–21", href: `${CAS}/uploads/town_report_2020_21.pdf`, note: "Fire Department report, PDF page 32" },
      r2023: { label: "Town of Castleton, Annual Report 2022–23", href: `${CAS}/news/2022-2023_town_report_master.pdf`, note: "Fire Department report, PDF pages 33–34" },
      r2024: { label: "Town of Castleton, Annual Report 2023–24", href: `${CAS}/news/final_2023-2024_town_report_0.pdf`, note: "Directory, page 3; budget, PDF page 9; Fire Department and Fire Warden reports, PDF pages 33–36" },
    },
  },

  "fair-haven": {
    description:
      "Fair Haven Fire Department: on-call volunteers in the old high school on the town park, calls by type for " +
      "2018–19 and 2023–24, a new Alexis pumper-tanker, and weekday automatic aid from Poultney.",
    facts: [
      ["Staffing", "On-call volunteers, paid minimum wage for alarms and training (policy of July 2025)"],
      ["Station", "In the town building at the north end of the park, with the town offices and police"],
      ["Chief", "Jim Heller, also emergency management coordinator"],
      ["Meets", "Tuesdays at 6:30 pm: officers, two training nights, then the monthly meeting"],
    ],
    contact: { chief: "Jim Heller", phone: "802-265-3125", website: `${FH}/fire-department/`, source: "dept" },
    history: {
      intro:
        "Fair Haven's firehouse is in a two-and-a-half-storey building that was once the town's high school. The " +
        "department averages about 100 calls a year in town and on mutual aid with Benson, Castleton, Hubbardton, West " +
        "Haven, and Hampton and Whitehall, New York.",
      events: [
        { year: 2019, calls: 109, text: "79 calls in the district and 30 on mutual aid, including 11 structure fires in other towns. Lt. Steve Marcoux leaves for a career post with the Rutland City Fire Department.", source: "r2019" },
        { year: 2024, calls: 90, text: "70 calls in the district and 20 on mutual aid; members log 363 training hours. In March voters approve up to $600,000 for a new pumper-tanker, $236,000 from the fire equipment reserve and the rest borrowed from the town's general fund at 1%. It replaces a 1996 International/E-One, with a Freightliner chassis and an Alexis body due in late 2025.", source: "r2024" },
        { year: 2025, text: "The selectboard adopts a pay policy: members earn the state minimum wage from dispatch to release on alarms and at sanctioned training, with a one-hour minimum.", source: "pay" },
      ],
    },
    calls: {
      intro: "Crashes and EMS assists lead in town; structure fires were all on mutual aid in both years shown.",
      byType: {
        title: "Calls by type, 2023–24",
        bars: [
          { label: "EMS assists", value: 25, sub: "24 in town, 1 mutual aid" },
          { label: "Crashes", value: 21, sub: "12 in town, 9 mutual aid" },
          { label: "Alarms", value: 17, sub: "16 in town, 1 mutual aid" },
          { label: "Hazardous conditions", value: 10 },
          { label: "Structure fires", value: 6, sub: "All mutual aid" },
          { label: "Good intent", value: 6 },
          { label: "Grass and brush fires", value: 4 },
          { label: "Other responses", value: 4 },
          { label: "Vehicle fires", value: 1 },
          { label: "Other fires", value: 1 },
        ],
        note: "Fiscal year July 2023 to June 2024; 90 calls in all.",
        source: "r2024",
      },
    },
    residents: [
      { label: "Join", href: `${FH}/fire-department/`, text: "Download the application from the town's page, or stop in on a Tuesday evening. Junior and cadet membership from age 15." },
      { label: "Burn permits", href: `${FH}/fire-department/`, text: "Required; Fair Haven has an open burning ordinance." },
      { label: "Detectors", href: `${FH}/fire-department/`, text: "Change smoke and CO detector batteries each spring; replace detectors more than 5 to 10 years old." },
    ],
    sources: {
      dept: { label: "Town of Fair Haven, Fire Department", href: `${FH}/fire-department/` },
      r2019: { label: "Town of Fair Haven, 2019 Annual Report", href: "http://www.fairhavenvt.org/wp-content/uploads/2020/03/2019-Annual-Report.pdf", note: "Fire Department report, PDF pages 39–40" },
      r2024: { label: "Town of Fair Haven, 2024 Annual Report", href: `${FH}/wp-content/uploads/2025/02/WEB-Fair-Haven.pdf`, note: "Fire Department report and roster, PDF pages 30–31; March 2024 town meeting, article 4, PDF page 23" },
      pay: { label: "Town of Fair Haven, compensation policy for fire department members", href: `${FH}/wp-content/uploads/2025/07/FD-compensation-Policy.pdf`, note: "Adopted 8 July 2025; a scanned page, read with text recognition" },
    },
  },
  proctor: {
    description:
      "Proctor Volunteer Fire Department, the Sutherland Falls Hose Company: formed 1898, a restored 1923 American " +
      "LaFrance, incidents by type, a junior programme and a new engine-tanker.",
    facts: [
      ["Founded", "1898"],
      ["Known as", "Sutherland Falls Hose Company"],
      ["Members", "24, including 4 junior firefighters"],
      ["Chief", "Joshua Webb"],
    ],
    contact: { chief: "Joshua Webb", phone: "(802) 459-3640", website: `${PRO}/fire/`, source: "r2023" },
    history: {
      intro:
        "Proctor's volunteers work from the station on Main Street. Beyond calls, the department meets more than a hundred " +
        "times a year for training, maintenance, cadet nights and community events.",
      events: [
        { year: 1898, text: "The Proctor Volunteer Fire Department is formed.", source: "dept" },
        { year: 1923, text: "The department's first motorised truck, an American LaFrance, arrives. It has never left the department.", source: "r2023" },
        { year: 2020, calls: 47, text: "Incidents from December 2019 to November 2020, among 112 meetings and events. Three members finish Firefighter I and II despite Covid.", source: "r2020" },
        { year: 2022, calls: 39, text: "Incidents from November 2021 to November 2022. A truck committee starts planning one truck to replace Engine 2 and Tanker 1, and a Mortimer Proctor Fund grant pays for a communications tower on the east mountain water tank building.", source: "r2022" },
        { year: 2023, calls: 80, text: "Incidents from November 2022 to November 2023, a large increase. The department marks its 125th anniversary and shows off the 1923 American LaFrance after motor restoration. A new engine-tanker is ordered: 1,800 gallons and 1,500 gpm, due April 2025.", source: "r2023" },
      ],
    },
    calls: {
      intro: "False alarms are the largest single type in both years the town broke down.",
      byType: {
        title: "Incidents by type, Nov 2021 – Nov 2022",
        bars: [
          { label: "False alarms", value: 12 },
          { label: "Medical assists", value: 5 },
          { label: "Special type", value: 5 },
          { label: "Good intent", value: 4 },
          { label: "Fires, other", value: 3 },
          { label: "Building fires", value: 2 },
          { label: "Carbon monoxide", value: 2 },
          { label: "Vehicle crashes", value: 2 },
          { label: "Severe weather", value: 2 },
          { label: "Flammable liquid spill", value: 1 },
          { label: "Animal rescue", value: 1 },
        ],
        note: "39 incidents, 7 November 2021 to 17 November 2022.",
        source: "r2022",
      },
    },
    residents: [
      { label: "Burn permits", href: `${PRO}/fire/`, text: "Required for any open burning unless there is snow cover; free, from the town fire warden." },
      { label: "Fireworks", href: `${PRO}/fire/`, text: "A display needs a permit from the fire department; get the form from the town and return it 15 days ahead." },
      { label: "Juniors", href: `${PRO}/fire/`, text: "Students aged 14 to 17 can join the junior programme: support roles on the fireground and monthly training." },
    ],
    sources: {
      dept: { label: "Town of Proctor, Fire Department", href: `${PRO}/fire/` },
      r2020: { label: "Town of Proctor, 2020 Annual Report", href: `${PRO}/wp-content/uploads/Final-from-Printer.pdf`, note: "Fire Department report, PDF page 40. A scanned report, read with text recognition" },
      r2022: { label: "Town of Proctor, 2022 Annual Report", href: `${PRO}/wp-content/uploads/Annual-Report-PDF.pdf`, note: "Fire Department report, PDF page 43. A scanned report, read with text recognition" },
      r2023: { label: "Town of Proctor, Annual Report 2022–23", href: `${PRO}/wp-content/uploads/web-proctor-Final-Report.pdf`, note: "Fire Department report, PDF page 2. A scanned report, read with text recognition" },
    },
  },
  wallingford: {
    description:
      "Wallingford Fire Department, run by Fire District No. 1 since its 1906 charter: volunteers training 288 hours " +
      "a year, juniors from 13, the Lights on for Safety programme and the fire protection budget.",
    facts: [
      ["Run by", "Wallingford Fire District No. 1, chartered by the Legislature in 1906"],
      ["Station", "17 Railroad Street"],
      ["Training", "About 288 hours per firefighter a year"],
      ["Chief", "Michael Hughes"],
      ["Fire protection fund", "$182,330 for 2025–26; $188,967.75 proposed for 2026–27"],
    ],
    contact: { chief: "Michael Hughes", phone: "802-446-2295", website: `${WAL}/boards-minutes/fire-district-1/`, source: "fd1" },
    history: {
      intro:
        "Fire District No. 1 is separate from the town: it runs the fire department along with water and sewer, and its " +
        "voters elect the fire chief each year. East Wallingford has its own department, Wallingford Fire District #2, on " +
        "Route 140.",
      events: [
        { year: 1906, text: "The Legislature charters Fire District No. 1; its charter is amended six times, last in 1929.", source: "fd1" },
        { year: 2020, text: "Just under 100 calls, from structure fires and crashes to elevator rescues and lift assists for Wallingford Rescue. Firefighters meet the goal of 24 training hours a month, the same as a full-time department.", source: "r2020" },
        { year: 2025, text: "Nearly 100 calls. The department keeps up its Lights on for Safety campaign, asking residents to turn on lights, if safe, while firefighters are on the way.", source: "b2025" },
      ],
    },
    residents: [
      { label: "Join", href: `${WAL}/boards-minutes/fire-district-1/`, text: "No experience needed; full training. Junior programme for ages 13 to 17. Stop by the station any Tuesday evening." },
      { label: "Lights on for Safety", href: `${WAL}/boards-minutes/fire-district-1/`, text: "In an emergency, and only if safe, turn on as many lights as you can so crews find you." },
      { label: "House numbers", href: `${WAL}/boards-minutes/fire-district-1/`, text: "Make sure your number is visible from the road." },
    ],
    sources: {
      fd1: { label: "Town of Wallingford, Fire District No. 1", href: `${WAL}/boards-minutes/fire-district-1/` },
      r2020: { label: "Town of Wallingford, 2020 Town Report", href: `${WAL}/wp-content/uploads/2021/02/Town-Report-Rev.pdf`, note: "Fire Chief's Report, PDF page 25" },
      b2025: { label: "Wallingford Fire District No. 1, 2025 annual meeting booklet", href: `${WAL}/wp-content/uploads/2026/03/2025-Annual-Meeting-Booklet.pdf`, note: "Fire Chief's Report, PDF page 10; warning, PDF page 4; 2025 meeting minutes, PDF page 16. A scanned booklet, read with text recognition" },
      neris: { label: "NERIS, Wallingford Fire District #2", href: "https://neris.fsri.org/departments/FD50021837" },
    },
  },
  killington: {
    description:
      "Killington Fire and Rescue Services: founded in 1955 as the Sherburne Volunteer Fire Department, a town " +
      "department since 2022, working from the Public Safety Building on Killington Road.",
    facts: [
      ["Founded", "1955, as the Sherburne Volunteer Fire Department"],
      ["Town department since", "2022, with the first full-time staff from January 2023"],
      ["Station", "Public Safety Building, 800 Killington Road, opened 2020"],
    ],
    contact: { phone: "802-855-5775", website: "https://www.killingtonfirerescue.com/", source: "assoc" },
    history: {
      intro:
        "Killington's department, volunteer and career, answers fire, rescue and emergency medical calls. The Killington " +
        "Firefighters Association, formed in 2024, supports it with training, help for fire victims and free CPR classes.",
      events: [
        { year: 1955, text: "The Sherburne Volunteer Fire Department is formed.", source: "history" },
        { year: 2020, text: "The department moves into the new Public Safety Building, shared with the police: 14,000 square feet, five apparatus bays, a hose tower and a community room.", source: "history" },
        { year: 2022, text: "In March voters make fire and rescue a town department, replacing the private volunteer company.", source: "mt2022" },
        { year: 2023, text: "The first full-time paid staff start in January, under the name Killington Fire and Rescue Services.", source: "history" },
        { year: 2026, text: "The town advertises for a full-time fire chief in September.", source: "notice" },
      ],
    },
    residents: [
      { label: "Knox-Box", href: "https://www.killingtonfirerescue.com/knox-box-program", text: "The town requires a Knox-Box for homes and businesses, so firefighters can get in without forcing doors." },
      { label: "Burn permits", href: "https://www.killingtonfirerescue.com/", text: "Needed for brush and leaf piles; not for a small campfire. From the town fire warden." },
      { label: "Join", href: "https://www.killingtonfirerescue.com/join-us", text: "Stop in on the first or third Tuesday of the month at 6 pm." },
    ],
    sources: {
      assoc: { label: "Killington Firefighters Association", href: "https://www.killingtonfirerescue.com/" },
      history: { label: "Killington Fire and Rescue, About us", href: "https://www.killingtonfirerescue.com/blank-1" },
      mt2022: { label: "Mountain Times, June 2022", href: "https://mountaintimes.info/?p=38457" },
      notice: { label: "Rutland Herald, legal notice: Seeking Full Time Fire Chief", href: "https://www.rutlandherald.com/legals/seeking-full-time-fire-chief/article_152f6666-48f7-5b01-9a77-84a4867dc5ae.html", note: "5 September 2026" },
    },
  },
  "west-rutland": {
    description:
      "West Rutland Fire Department: protecting the town without a break since 1891, with calls for 2021–2025, a new " +
      "Pierce rescue pumper, free smoke detectors, and a river dry hydrant in Whipple Hollow.",
    facts: [
      ["Founded", "1891"],
      ["Staffing", "About 20 volunteer firefighters"],
      ["Chief", "Michael Skaza, since 2020"],
      ["Non-emergency", "802-438-2433"],
    ],
    contact: { chief: "Michael Skaza", phone: "802-438-2433", website: `${WRT}/fire-department/`, source: "dept" },
    history: {
      intro:
        "West Rutland's department has given the town fire protection continuously since 1891; 2026 is its 135th year. " +
        "Each October it brings West Rutland School's youngest classes to the station for Fire Prevention Week.",
      events: [
        { year: 1891, text: "The West Rutland Fire Department is established.", source: "dept" },
        { year: 2019, text: "Joseph Skaza retires as chief at the end of the year after 28 years, staying on as a member after 47 years of service. Michael Skaza becomes chief for 2020.", source: "r2020" },
        { year: 2021, calls: 85, text: "Firefighters hand out or install 172 smoke and 55 carbon monoxide detectors in 32 homes, from a state programme. A dry hydrant goes into the river at the end of Pleasant Street, in Whipple Hollow, with a conservation districts grant.", source: "r2021" },
        { year: 2022, calls: 72, text: "A new rescue pumper is ordered to replace Engine 3, a mini-pumper.", source: "r2022" },
        { year: 2023, calls: 87, text: "New battery-powered extrication tools are ordered to replace a set about 25 years old, and the radios are upgraded, all from capital savings.", source: "r2023" },
        { year: 2024, calls: 81, text: "A 2025 Freightliner-Pierce rescue pumper arrives, replacing the 2006 Ford mini-pumper, with a new radio repeater at the station.", source: "r2024" },
        { year: 2025, calls: 88, text: "Members pay for a monument and an engraved board at the station listing every known member, past and present. Three new members join.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Calls have held between 72 and 88 a year.",
      byYear: {
        title: "Emergency calls, by year",
        bars: [
          { label: "2021", value: 85 },
          { label: "2022", value: 72 },
          { label: "2023", value: 87 },
          { label: "2024", value: 81 },
          { label: "2025", value: 88 },
        ],
        note: "Each figure is from the fire chief's report in the following year's town report, which describes the past year.",
        source: "r2025",
      },
    },
    careers: {
      intro: "No experience needed: the department provides all the training and equipment.",
      points: [
        "18 or over",
        "A West Rutland resident and citizen in good standing",
        "A valid Vermont driver's licence",
        "Able to do the physical work of a firefighter",
        "Contact the fire chief",
      ],
      applyUrl: `${WRT}/fire-department/`,
      source: "dept",
    },
    residents: [
      { label: "Burn permits", href: `${WRT}/fire-department/`, text: "Required for outdoor burning; from the town's forest fire warden. See the town's 2019 fire ordinance." },
      { label: "Key boxes", href: `${WRT}/fire-department/`, text: "Required with a new or upgraded fire alarm or sprinkler system, except in single-family homes." },
    ],
    sources: {
      dept: { label: "Town of West Rutland, Fire Department", href: `${WRT}/fire-department/` },
      r2020: { label: "West Rutland Fire Department, 2019–2020 annual report of the fire chief", href: `${WRT}/wp-content/uploads/2020/05/fire-chief-report.pdf`, note: "A scanned page, read with text recognition" },
      r2021: { label: "Town of West Rutland, town report (fire chief's report 2021–2022)", href: `${WRT}/wp-content/uploads/2022/08/TownofWestRutland-2021-VermontM.pdf`, note: "PDF page 39, read with text recognition" },
      r2022: { label: "Town of West Rutland, town report published 2023", href: `${WRT}/wp-content/uploads/2023/02/TownofWestRutland-2022-VermontM.pdf`, note: "Fire chief's report, PDF page 39" },
      r2023: { label: "Town of West Rutland, town report published 2024", href: `${WRT}/wp-content/uploads/2024/02/TownofWestRutland-2023-VermontM.pdf`, note: "Fire chief's report, PDF page 41" },
      r2024: { label: "Town of West Rutland, town report published 2025", href: `${WRT}/wp-content/uploads/2025/02/TownofWestRutland-2024-VermontM.pdf`, note: "Fire chief's report, PDF page 42" },
      r2025: { label: "Town of West Rutland, town report published 2026", href: `${WRT}/wp-content/uploads/2026/02/TownofWestRutland-2025-VermontM.pdf`, note: "Fire chief's report 2025–2026, PDF page 40, read with text recognition" },
    },
  },
  clarendon: {
    description:
      "Clarendon Fire Association: two stations and four trucks, a 2024 tanker-pumper dedicated to a 35-year member, " +
      "94 calls, a new dry hydrant on Route 133, and the town's appropriation.",
    facts: [
      ["Stations", "Two, with four trucks"],
      ["Chief", "Matthew Jakubowski"],
      ["Town funding", "$82,000 for the association plus $50,000 toward its 2020 pumper; $90,000 proposed for FY2027"],
    ],
    contact: { chief: "Matthew Jakubowski", website: `${CLA}/fire-department/`, source: "dept" },
    history: {
      intro:
        "Clarendon's volunteers answer calls in town and give mutual aid to Rutland Town, Ira, West Rutland and " +
        "Wallingford. They also fill pools, water the Mill River football fields, and turn out for parades and school " +
        "fire prevention days.",
      events: [
        { year: 2020, text: "A new E-One pumper arrives; a yearly $50,000 town article pays it off.", source: "r2025" },
        { year: 2025, calls: 94, text: "Tanker 2, a 2024 BME tanker-pumper carrying 2,000 gallons that can pump while creeping along a roadside fire, is delivered in March and dedicated to Steve Hill, a member for over 35 years. A new dry hydrant at Casella Construction on Route 133, from the Vermont Rural Fire Protection Task Force, serves Clarendon, West Rutland and Ira.", source: "r2025" },
      ],
    },
    residents: [
      { label: "Burn permits", href: `${CLA}/fire-department/`, text: "From the town fire warden, listed on the town's fire department page." },
      { label: "Pool fills", href: `${CLA}/fire-department/`, text: "One of the association's summer fundraisers." },
    ],
    sources: {
      dept: { label: "Town of Clarendon, Fire Department", href: `${CLA}/fire-department/` },
      r2025: { label: "Town of Clarendon, Annual Report, fiscal year ending June 30, 2025", href: `${CLA}/wp-content/uploads/2025/02/annual-report-fy2025.pdf`, note: "Fire Association report, PDF page 37; votes, PDF page 9; warning, PDF page 12; budget, PDF page 25. A scanned report, read with text recognition" },
    },
  },
  danby: {
    description:
      "Danby-Mt. Tabor Volunteer Fire Department: one department for two towns, 65 calls in 2025 by type, a station " +
      "addition built by its own members, and the 80/20 split of its capital request.",
    subtitle: "Danby-Mt. Tabor Volunteer Fire Department",
    facts: [
      ["Serves", "Danby and Mount Tabor"],
      ["Stations", "590 North Main Street, and the #2 station at the Four Corners"],
      ["Chief", "Kenneth G. Abbott"],
      ["Capital request", "$42,636 for 2025: 80% from Danby, 20% from Mount Tabor"],
    ],
    contact: { chief: "Kenneth G. Abbott", source: "r2025" },
    history: {
      intro:
        "The department serves Danby and Mount Tabor together, and the two towns share its costs four to one. Its members " +
        "put about 5,000 hours a year into calls, drills, administration and building their own station addition.",
      events: [
        { year: 2024, calls: 71, text: "Members build an addition to the station, paying as they go to stay out of debt; Danby marble countertops are donated by Vermont Quarries. The communications system moves to the #2 station at the Four Corners.", source: "r2024" },
        { year: 2025, calls: 65, text: "The addition's heating and wiring are finished. The towns are asked for $42,636 in capital spending and $31,000 for a savings fund for equipment, communications and vehicle replacement.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Rescues and assists, crashes and mutual aid made up over half of 2025's calls.",
      byType: {
        title: "Calls by type, 2025",
        bars: [
          { label: "Rescue and assist", value: 14 },
          { label: "Vehicle", value: 12 },
          { label: "Mutual aid", value: 12 },
          { label: "Alarms", value: 8 },
          { label: "Miscellaneous", value: 8 },
          { label: "Structure fires", value: 6 },
          { label: "Grass fires", value: 5 },
        ],
        note: "Calendar 2025; the types add up to the 65 calls reported.",
        source: "r2025",
      },
    },
    residents: [
      { label: "Fundraisers", href: "https://www.danbyvt.org/annual-report", text: "The community calendar, the summer lawn party, the tractor pull and bingo all support the department." },
    ],
    sources: {
      r2024: { label: "Town of Danby, Annual Report 2024", href: "https://www.danbyvt.org/_files/ugd/f9b078_d57aa6c2455f41d6b12873ca95238fb5.pdf", note: "Fire department letter, PDF page 28. A scanned report, read with text recognition" },
      r2025: { label: "Town of Danby, Annual Report 2025", href: "https://www.danbyvt.org/_files/ugd/f9b078_998234b13f6048af95a8694db8088898.pdf", note: "Fire department letter and request, PDF pages 29–30; property article, PDF page 14. A scanned report, read with text recognition" },
    },
  },
  "mount-holly": {
    description:
      "Mount Holly Volunteer Fire Department: two stations, on School Street and in Belmont village, with first " +
      "response for medical calls since June 2024.",
    facts: [
      ["Stations", "School Street, and the Belmont station on Church Street"],
      ["Chief", "Bill Austin"],
      ["First response", "Licensed for non-transporting first response since 1 June 2024"],
    ],
    contact: { chief: "Bill Austin", phone: "(802) 259-2700", website: `${MHO}/emergency-services/fire-rescue/`, source: "dept" },
    history: {
      intro:
        "Mount Holly's volunteers work from the main station on School Street and a substation in Belmont village.",
      events: [
        { year: 2024, text: "Licensed for first response, the department starts answering medical calls on 1 June, and asks the selectboard to let it sell the former rescue squad's ambulance to buy a pickup.", source: "may2024" },
      ],
    },
    residents: [
      { label: "Meetings", href: `${MHO}/wp-content/uploads/2026/02/1-January-2026.pdf`, text: "The business meeting is on the first of the month at 7 pm at the Belmont station; drills and work nights follow on Thursdays." },
      { label: "Burn permits", href: `${MHO}/emergency-services/fire-rescue/`, text: "From the town fire warden, listed on the town's fire and rescue page." },
    ],
    sources: {
      dept: { label: "Town of Mount Holly, Fire and Rescue", href: `${MHO}/emergency-services/fire-rescue/` },
      may2024: { label: "Mount Holly Select Board minutes, 14 May 2024", href: `${MHO}/wp-content/uploads/2024/05/05-May-14-2024-Minutes.pdf`, note: "Fire Department update" },
      plan: { label: "Mount Holly Town Plan, 2018", href: `${MHO}/wp-content/uploads/2020/07/TOWN-PLAN-2018-new-draftSB.pdf`, note: "Emergency services" },
      news: { label: "Mount Holly town newsletter, January 2026", href: `${MHO}/wp-content/uploads/2026/02/1-January-2026.pdf`, note: "Calendar" },
    },
  },

  shrewsbury: {
    description:
      "Shrewsbury Volunteer Fire Department: founded 1952, working from the Cuttingsville station, with calls for " +
      "2023–2025, a new Rescue 1 mini pumper paid for from a reserve saved since 2013, and its finances.",
    facts: [
      ["Founded", "1952"],
      ["Station", "Cuttingsville"],
      ["Chief", "Phil Severy"],
      ["Town appropriation", "$35,000 a year"],
      ["Meets", "Most Thursday evenings, to train and maintain the trucks"],
    ],
    contact: { chief: "Phil Severy", website: `${SHR}/fire-department/`, source: "r2025" },
    history: {
      intro:
        "Shrewsbury's all-volunteer department answers crashes, alarms, chimney and brush fires, trail rescues and " +
        "mutual aid calls. Membership is stable but ageing, and the Cuttingsville station, built about seventy years " +
        "ago, is too small for most modern trucks.",
      events: [
        { year: 1952, text: "The Shrewsbury Volunteer Fire Department is founded.", source: "r2023" },
        { year: 2023, calls: 24, text: "20 calls in town and 4 on mutual aid. During July's flooding the Cuttingsville station opens as a temporary shelter and members check on homes. New defibrillators and thermal imaging cameras arrive.", source: "r2023" },
        { year: 2024, calls: 45, text: "Crashes lead with 16. A night search for a missing hunter off Gaynor Road ends well, and extrication tools practised one evening free a trapped operator the next day. Members begin looking at options for the station with NBF Architects.", source: "r2024" },
        { year: 2025, calls: 46, text: "Three structure fires, eleven alarm responses and nine crashes. In October Rescue 1 arrives: a 4x4 Ford F-550 mini pumper built by Fouts Fire, small enough for the station, bought for $415,309 from the town's equipment reserve.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Calls nearly doubled from 2023 to 2024 and held there in 2025.",
      byYear: {
        title: "Emergency calls, by year",
        bars: [
          { label: "2023", value: 24 },
          { label: "2024", value: 45 },
          { label: "2025", value: 46 },
        ],
        note: "Calendar years, from the department's report in each town report.",
        source: "r2025",
      },
      byType: {
        title: "Calls by type, 2025",
        bars: [
          { label: "Alarm responses", value: 11 },
          { label: "Vehicle crashes", value: 9 },
          { label: "Downed trees and lines", value: 5 },
          { label: "Structure fires", value: 3 },
          { label: "Chimney fires", value: 3 },
          { label: "Vehicle fires", value: 3 },
          { label: "Brush fires", value: 3 },
          { label: "Smoke investigations", value: 3 },
          { label: "Other fires", value: 2 },
          { label: "Injured hikers", value: 2 },
          { label: "Medical assists", value: 2 },
        ],
        note: "Calendar 2025; the types add up to the 46 calls reported.",
        source: "r2025",
      },
    },
    money: {
      intro:
        "The town gives $35,000 a year; donations, break-open tickets and endowments do the rest. Spending jumped in 2025 " +
        "with new equipment, part of it drawn from the department's replacement fund.",
      year: "calendar 2025, actual",
      lines: [
        { label: "New equipment", amount: 54763 },
        { label: "Communications", amount: 7945 },
        { label: "Fundraising", amount: 4497 },
        { label: "Stations", amount: 3282 },
        { label: "Maintenance", amount: 3117 },
        { label: "Operating", amount: 3114 },
      ],
      linesNote: "The six largest lines in the department's 2025 operating statement; total spending was $84,356.",
      capital: {
        title: "Operating spending, by year",
        lines: [
          { label: "2025", amount: 84356 },
          { label: "2024", amount: 50691 },
        ],
        note: "Rescue 1 ($415,309) was paid from the town's separate equipment reserve, not from these accounts.",
      },
      source: "r2025b",
    },
    residents: [
      { label: "Burn permits", href: `${SHR}/fire-department/`, text: "Call one of the town's fire wardens, listed on the town's fire department page." },
      { label: "Join", href: `${SHR}/fire-department/`, text: "The department welcomes new members; volunteers meet most Thursday evenings." },
    ],
    sources: {
      r2023: { label: "Town of Shrewsbury, 2023 Annual Report", href: `${SHR}/wp-content/uploads/2024/02/2023-Annual-Report-FINAL.pdf`, note: "Fire department report, PDF page 42; dedication, PDF page 2" },
      r2024: { label: "Town of Shrewsbury, 2024 Annual Report", href: `${SHR}/wp-content/uploads/2025/02/2024-ANNUAL-REPORT-FINAL.pdf`, note: "Fire department report, PDF page 43" },
      r2025: { label: "Town of Shrewsbury, 2025 Annual Report", href: `${SHR}/wp-content/uploads/2026/02/2025-Shrewsbury-Annual-Report.pdf`, note: "Fire department report, PDF page 44" },
      r2025b: { label: "Town of Shrewsbury, 2025 Annual Report: department finances", href: `${SHR}/wp-content/uploads/2026/02/2025-Shrewsbury-Annual-Report.pdf`, note: "Operating statement, PDF page 45; town equipment reserve, PDF page 17" },
    },
  },
  "middletown-springs": {
    description:
      "Middletown Springs Volunteer Fire Department: five apparatus from 1973 to 1995, a certified ice-water rescue " +
      "team, federal grants for air packs and hose, and the town's appropriation.",
    facts: [
      ["Staffing", "100% volunteer"],
      ["Station", "8 Firehouse Lane: a 1950 two-bay block building with a 1984 addition"],
      ["Apparatus", "Ladder truck, engine/rescue, attack truck, engine/tanker and heavy rescue"],
      ["Chief", "Joe Castle"],
      ["Town appropriation", "$86,000 for FY2026 and FY2027, the first rise since 2019"],
    ],
    contact: { chief: "Joe Castle", phone: "802-235-2300", website: `${MSP}/fire-department-fire-warden`, source: "r2026" },
    history: {
      intro:
        "The department answers crashes, structure and chimney fires, alarms, EMS assists, brush fires and hazardous " +
        "materials calls, and gives mutual aid to Poultney, Ira and Wallingford. A nonprofit board of trustees oversees " +
        "its finances and fundraising.",
      events: [
        { year: 1950, text: "The first firehouse, a two-bay concrete block building, goes up.", source: "study" },
        { year: 1984, text: "A large addition joins the firehouse.", source: "study" },
        { year: 2021, text: "A feasibility study for rebuilding the firehouse puts the total cost at about $2.1 million. A 2018 plan for a new building on the same site had preceded it.", source: "study" },
        { year: 2024, text: "Assistant Chief Deryk Knipes qualifies as an ice-water rescue technician and instructor; with six more certified technicians, the department becomes a certified ice-water rescue team. A federal grant of $59,357 pays for new hose for every truck.", source: "r2024" },
        { year: 2025, text: "The new hose goes into service. The fleet, 1973 to 1995 and fully paid off, would cost about $5.5 million to replace.", source: "r2026" },
      ],
    },
    stationNotes: {
      "middletown-springs-8-firehouse-ln": { text: "The firehouse: the 1950 block building and its 1984 addition. The 2021 rebuilding study noted that the ladder truck is kept off site.", source: "study" },
    },
    residents: [
      { label: "Burn permits", href: `${MSP}/fire-department-fire-warden`, text: "Free verbal permits from the forest fire warden: brush and branches only, attended, and out before dark." },
      { label: "Join", href: `${MSP}/fire-department-fire-warden`, text: "Training is on Tuesday evenings at the firehouse; community members are welcome to stop in." },
    ],
    sources: {
      r2026: { label: "Town of Middletown Springs, 2026 Town Report (covering 2025)", href: "https://storage.googleapis.com/juniper-media-library/359/2026/02/2026%20Town%20Report%20Full%202.2.26.pdf", note: "Fire department report, PDF pages 45–46; appropriations, PDF page 36" },
      r2024: { label: "Town of Middletown Springs, FY2024 Town Report", href: "https://storage.googleapis.com/juniper-media-library/359/2025/07/FY%202024%20Town%20Report.pdf", note: "Fire department report, PDF page 47" },
      study: { label: "Middletown Springs Firehouse Reconstruction study, Centerline Architects", href: "https://storage.googleapis.com/juniper-media-library/359/2025/08/Middletown-Springs_Firehouse-Reconstruction_Final_01202021.pdf", note: "January 2021; pages 4–6" },
    },
  },
  chittenden: {
    description:
      "Chittenden Volunteer Fire Department: formed in 1957 by 52 residents after a barn fire, with a $50 surplus " +
      "1941 American LaFrance, First Response since 1980, and today's trucks.",
    facts: [
      ["Founded", "1957, with 52 original members"],
      ["Station", "266 Chittenden Road, on the original site"],
      ["Chief", "Gary Rowe, a member since 1982 and chief since 2017"],
      ["Also runs", "Chittenden First Response, for medical calls, since 1980"],
    ],
    contact: { chief: "Gary Rowe", phone: "(802) 483-6200 (Tuesdays at 7 pm)", website: "https://sites.google.com/view/cvfdvt", source: "chief" },
    history: {
      intro:
        "Chittenden's volunteers built their own firehouse on land, money, materials and labour given by the town's " +
        "residents, and it still stands on the same piece of land.",
      events: [
        { year: 1956, text: "A barn is lost to fire, and townspeople vote to create a volunteer fire department and buy an engine.", source: "history" },
        { year: 1957, text: "The department forms with 52 members and buys a military-surplus 1941 American LaFrance from the Ethan Allen Air Force Base for $50.", source: "history" },
        { year: 1980, text: "Chittenden First Response is founded to provide medical coverage; a response vehicle follows in 1983.", source: "history" },
        { year: 1993, text: "An addition gives the firehouse a second-floor meeting room and three more apparatus bays.", source: "history" },
        { year: 2024, text: "Capt. Charley Parker, a member for over 40 years, collapses at the firehouse after returning from a barn fire on 8 July and dies. The department unveils a marble memorial to him in July 2025.", source: "memorial" },
        { year: 2025, text: "A Freightliner pumper-tanker with 1,500 gallons and a 1,250 gpm pump joins the fleet.", source: "trucks" },
      ],
    },
    stationNotes: {
      "chittenden-266-chittenden-rd": {
        text:
          "The firehouse: Brush 44 (2006 Ford F-450), Engine 1 (2006 Ford F-550, ex-West Rutland, 500 gpm, 300 gallons), " +
          "Engine 2 (2025 Freightliner pumper-tanker, 1,250 gpm, 1,500 gallons) and Engine 4 (2019 Kenworth, 1,250 gpm, " +
          "1,000 gallons), plus a 6x6 utility vehicle.",
        source: "trucks",
      },
    },
    residents: [
      { label: "Call the firehouse", href: "https://sites.google.com/view/cvfdvt/contact", text: "(802) 483-6200, answered Tuesdays at 7 pm. Dial 911 for emergencies." },
    ],
    sources: {
      history: { label: "Chittenden Volunteer Fire Department, History", href: "https://sites.google.com/view/cvfdvt/history" },
      chief: { label: "Chittenden Volunteer Fire Department, Meet the Chief", href: "https://sites.google.com/view/cvfdvt/chief" },
      trucks: { label: "Chittenden Volunteer Fire Department, Trucks", href: "https://sites.google.com/view/cvfdvt/trucks" },
      memorial: { label: "WCAX, 13 July 2025", href: "https://www.wcax.com/2025/07/13/fallen-chittenden-fire-captain-honored-with-memorial/", note: "With Firehouse.com, 9 July 2024" },
    },
  },
  jericho: UJFD,
  underhill: UJFD,
};

/** Thousands separators, no decimals: 7528864 → "7,528,864". */
export const dollars = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
