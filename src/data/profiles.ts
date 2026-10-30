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

const HFD = "https://www.hartford-vt.org";
const WIN2 = "https://www.windsorvt.org";
const NOR = "https://norwich.vt.us";

const ROY = "https://royaltonvt.gov";
const WEA = "https://weathersfieldvt.org";
const POM = "https://pomfretvt.us";
const ROC = "https://rochestervermont.org";

const CAN = "https://canaan-vt.org";
const BEN = "https://benningtonvt.org";
const SHF2 = "https://shaftsburyvt.gov";
const RDB = "https://readsborovt.org";
const CHE = "https://www.chelseavt.org/wp/wp-content/uploads";
const TUN = "https://tunbridgevt.org";
const STR = "https://www.straffordvt.org";
const WMT = "https://williamstownvt.org";

const PUT = "https://putneyvt.gov";
const PUTR = "https://putneyvt.gov/Documents/Department/Clerk/Town%20Reports";
const DUM = "https://dummerston.org/gov/2023%20Town%20Report.pdf";
const GRA = "https://graftonvt.org";
const TSH = "https://www.townshendvtfire.org";
const TSHR = "https://www.townshendvt.gov/fileadmin/files/Boards_and_Committees/Selectboard/Town_Reports/2026_Twn_Report.Final.pdf";
const JAM = "https://www.jamaicavermont.org/wp-content/uploads/2025/11/2025-Town-Report.pdf";

const GRB = "https://greensborovt.gov";
const GRBR = "https://greensborovt.gov/wp-content/uploads/town-office-documents/Town-Report";
const CHA = "https://charlestonvt.org/wp-content/uploads";
const NWT = "https://townofnewport.org/wp-content/uploads/2025/03/ANNUAL-REPORT-2024.pdf";

const TIN = "https://www.tinmouthvt.gov/volunteer-fire-department";
const TINR = "https://storage.googleapis.com/juniper-media-library/611/2026/06/2025-Tinmouth-Town-Report.pdf";
const IRAR = "https://img1.wsimg.com/blobby/go/630ba3dc-3b66-416f-813c-e6ad9997a9cb/downloads/189898f3-bcbc-4374-9486-780df8f7cf33/2025%20Town%20Report%20e-copy.pdf";
const PTF = "https://www.pittsfieldvt.com";
const HUBP = "https://www.rutlandrpc.org/wp-content/uploads/2023/07/2024-Hubbardton-Town-Plan-Amended.pdf";

const BAR = "https://barnetvt.org/wp-content/uploads/2026/02/Barnet_2025_VermontMunicipalReport.pdf";
const GLV = "https://townofglover.com/wp-content/uploads/2023-Annual-Report-Electronic.pdf";
const WSM = "https://irp.cdn-website.com/2728571a/files/uploaded/Westmore_2025.F.pdf";

const HFX = "https://halifaxvt.com/wp-content/uploads";
const MRB = "https://marlborovt.us/wp-content/uploads/2026/01/Marlboro_2025_Vermont-Municipal-Report.pdf";
const WHT = "https://whitinghamvt.org";

const GRT = "https://grotonvt.com/fire-department";
const GRTR = "https://storage.googleapis.com/juniper-media-library/243/2025/03/2024%20Town%20Report.pdf";
const SUT = "https://irp.cdn-website.com/e7d9f92e/files/uploaded/2025+Town+Report.pdf";
const WTF = "https://waterfordvt.gov/services_1";
const WTFD = "https://0201.nccdn.net/1_2";
const BER = "https://www.berlinvt.gov/s/2021-Berlin-Town-Report-FINAL-compressed.pdf";
const WFF = "https://www.waitsfieldvt.gov";

const ADDR = "https://addisonvt.gov/wp-content/uploads/sites/12/2025/02/Town-of-Addison-2024-Town-Report.pdf";
const CWR = "https://cornwallvt.com/wp-content/uploads/2022/08/THE-Final-Town-Report-2021-February-11-2022.pdf";
const MKR = "https://monktonvt.com/wp-content/uploads/2023/02/93bcef0fb7ab61d9e2c88e72e5be49f0.pdf";
const SHMR = "https://shorehamvt.us/_files/ugd/d53131_33c17627411d4d2ab8ed4eb677d4812a.pdf";

const BRKF = "https://www.brookfieldvt.org/wp/wp-content/uploads";
const WSHR = "https://www.washingtonvt.org/s/Annual-Town-Report-2026-Final.pdf";
const VSHR = "https://vershirevt.org/wp-content/uploads/2026/02/Town-Report-2026-Final-Draft-02.23.26-compressed.pdf";
const WSTN = "https://www.westonvt.org";

const BRAD = "https://bradford-vt.us/services/emergency_services_dial_911/fire/index.php";
const TRORC = "https://www.trorc.org/wp-content/uploads";
const FRLE = "https://fairleevt.gov/uploads/dm/7108/2025_Fairlee_Town_Report";
const NWBY = "https://www.newburyvt.org/DocumentCenter/View/934/Newbury-2025-Town-Report";
const RAND = "https://randolphtownvt.org";
const THET = "https://www.thetfordfire.org";
const WFLE = "https://westfairleevt.gov/vertical/sites/%7B11C05066-8FAE-4AAC-9EBF-DC9E04E9CB00%7D/uploads/WestFairleeVT_2025TownReport.pdf";
const MSHF = "https://marshfieldvt.gov/vertical/Sites/%7BDE838A07-5D57-4E6F-95DF-7C05B7FB1126%7D/uploads/Town_Report_Final_from_L._Brown.pdf";
const PLFD = "https://www.plainfieldvt.gov";
const WDBY = "https://woodburyvt.org/2026/05/27/town-meeting-feb-28-draft-minutes-2/";
const WRCS = "https://www.worcestervt.org/wp/public_html/wp/wp-content/uploads/2023/02/109956-ToW_2022-Town-Report_REV2-PROOF-2.pdf";

const DRST = "https://dorsetvt.org/fire-districts--water-systems.html";
const DFDP = "https://cdn.prod.website-files.com/60f6d459e35277644593b943/69f77b6966330c2ead14d290_DFD%20Packet%205.4.26.pdf";
const DR25 = "https://www.dorsetvt.org/uploads/3/5/3/5/35356792/2025_town_report_final.pdf";
const MVT24 = "https://manchester-vt.gov/uploads/dm/21809/2024_Town_Report_including_Fiscal_Year_2025_Budget__Financial_Reports_";
const PERU = "https://peruvt.org/wp-content/uploads/2025/13/2025%20PERU%20TOWN%20REPORT.pdf";
const PWNL = "https://www.townofpownal.org/uploads/1/3/7/4/137413037/town_report_2025.pdf";
const RUPT = "https://rupert.vt.gov/wp-content/uploads/2026/03/Town-of-Rupert-TR-2024-2025.pdf";
const STMF = "https://www.stamfordvt.net/mediaItems/Town%20Report%202023.pdf";
const WNHL = "https://www.winhallfire.org";
const DOVTP = "https://outside.vermont.gov/agency/ACCD/bylaws/Bylaws%20and%20Plans%20Approved/Dover_Proposed_TownPlan_March_2024.pdf";
const LDRY = "https://www.londonderryvt.gov";
const WNDM = "https://townofwindhamvt.org/wp-content/uploads/2023/05/Town-of-Windham_Town-Report-2022.pdf";

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
  hartford: {
    description:
      "Hartford Fire Department: a career department of 38 for White River Junction, Quechee and Wilder, the first in " +
      "New England to be accredited, with nearly 3,000 calls a year, a rebuilt Quechee station and its budget.",
    subtitle: "Hartford Fire Department",
    facts: [
      ["Staffing", "38 full-time, plus about 3 call firefighters; fire and advanced life support"],
      ["Accreditation", "The first department in New England accredited by the Commission on Fire Accreditation International; held since 2004"],
      ["Stations", "Station 1, 812 VA Cutoff Road, White River Junction; Station 2, 131 Willard Road, Quechee"],
      ["Area", "38 square miles, five villages, about 10,000 people"],
      ["Chief", "Scott D. Cooney"],
    ],
    contact: { chief: "Scott D. Cooney", phone: "802-295-3232", website: `${HFD}/2440/Fire-Department`, source: "dept" },
    history: {
      intro:
        "Hartford's department provides fire protection and paramedic-level ambulance service, and is an all-hazards " +
        "team: confined space, heights, structural collapse, swift water and trench rescue, plus a mobile support unit " +
        "for Vermont Emergency Management.",
      events: [
        { year: 1982, text: "The Quechee station, Station 2, opens and is dedicated.", source: "st2" },
        { year: 2004, text: "Hartford becomes the first fire department in New England to be accredited by the Commission on Fire Accreditation International.", source: "about" },
        { year: 2024, calls: 2694, text: "47 fires, 1,879 EMS and rescue calls, and 768 service calls and alarms. The swift water team rescues more than 24 people and pets in Barre, Groton and Lyndonville during the storms.", source: "r2024" },
        { year: 2024, text: "On Town Meeting Day voters approve a $1.3 million bond to expand Station 2.", source: "st2" },
        { year: 2025, calls: 2967, text: "The expanded Station 2 reopens on 30 July, staffed around the clock by two firefighters with an engine and an ambulance. A community nurse programme, begun in December 2024, is running; three firefighters are hired, a new ambulance arrives, and 1,012 building inspections are carried out.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Seven in ten calls are medical or rescue; fires are under 2%.",
      byType: {
        title: "Calls by type, FY2024",
        bars: [
          { label: "EMS and rescue", value: 1879 },
          { label: "Service calls and alarms", value: 768 },
          { label: "Fires", value: 47 },
        ],
        note: "2,694 calls in the year reported in 2024. The 2025 report gives 2,967, \"an increase of 419\", which would put the year before at 2,548; the reports do not explain the difference.",
        source: "r2024",
      },
    },
    money: {
      intro:
        "Hartford's department is mostly payroll: firefighters' salaries, overtime and benefits. Ambulance billing " +
        "brings back about $800,000 a year.",
      year: "fiscal year 2026, budget",
      lines: [
        { label: "Firefighter salaries", amount: 1097984 },
        { label: "Health insurance", amount: 582398 },
        { label: "Overtime", amount: 410000 },
        { label: "Retirement", amount: 289101 },
        { label: "Workers' compensation", amount: 267755 },
        { label: "Fire chief's salary", amount: 137738 },
      ],
      linesNote: "Six of the fire department's lines in the town's general fund; captains' and lieutenants' pay are budgeted separately.",
      capital: {
        title: "Ambulance billing revenue",
        lines: [
          { label: "FY2027, recommended", amount: 825000 },
          { label: "FY2026, budget", amount: 700000 },
          { label: "FY2025, actual", amount: 854834 },
          { label: "FY2024, actual", amount: 821069 },
        ],
        note: "Money the town collects for ambulance transports.",
      },
      source: "r2025b",
    },
    stationNotes: {
      "hartford-131-willard-rd": { text: "Station 2, Quechee: the 1982 garage plus a 3,102-square-foot expansion with quarters for four, reopened in July 2025.", source: "st2" },
    },
    residents: [
      { label: "Non-emergency", href: `${HFD}/2440/Fire-Department`, text: "802-295-3232, or Station 2 in Quechee at 802-295-9679. Dial 911 for emergencies." },
    ],
    sources: {
      dept: { label: "Town of Hartford, Fire Department", href: `${HFD}/2440/Fire-Department` },
      about: { label: "Town of Hartford, About the Fire Department", href: `${HFD}/3774/About-the-Department` },
      st2: { label: "Town of Hartford, Fire Station 2", href: `${HFD}/3860/Fire-Station-2` },
      r2024: { label: "Town of Hartford, 2024 Annual Report", href: `${HFD}/DocumentCenter/View/12050/2024-Town-and-School-District-Annual-Report-compressed`, note: "Fire Department report, PDF pages 90–92" },
      r2025: { label: "Town of Hartford, 2025 Annual Report", href: `${HFD}/DocumentCenter/View/13209/2025-Hartford-Town-and-School-District-Annual-Report`, note: "Fire Department report, PDF pages 148–149" },
      r2025b: { label: "Town of Hartford, 2025 Annual Report: FY2027 budget", href: `${HFD}/DocumentCenter/View/13209/2025-Hartford-Town-and-School-District-Annual-Report`, note: "Fire department lines, PDF pages 47–49; ambulance revenue, PDF page 21" },
    },
  },
  windsor: {
    description:
      "Windsor Fire Department: fire and paramedic ambulance from 29 Union Street, four ambulances covering six towns in " +
      "Vermont and New Hampshire, calls by type, swiftwater and technical rescue teams, and its budget.",
    facts: [
      ["Services", "Fire and EMS, with an advanced life support ambulance service"],
      ["Station", "29 Union Street"],
      ["Ambulances", "Four, covering six contracted towns: four in Vermont, two in New Hampshire"],
      ["Chief", "Kevin McAllister"],
      ["Fire and ambulance budget", "$1,630,300 for FY2025; $1,622,830 proposed for FY2026"],
    ],
    contact: { chief: "Kevin McAllister", phone: "802-674-9043", website: `${WIN2}/1224/Fire-EMS`, source: "dept" },
    history: {
      intro:
        "Windsor's department answers 911 calls in town and in its contracted towns, but most of its ambulance work is " +
        "transfers between hospitals; ambulance revenue covers most of its budget. It also runs swiftwater and technical " +
        "rescue teams.",
      events: [
        { year: 2023, text: "In the year to June the department's incident categories add up to 1,705, including two swiftwater rescues.", source: "r2023" },
        { year: 2024, text: "In the year to June the incident categories add up to 1,714. The 1999 ladder truck is taken out of service for good and a search for a replacement begins; a federal grant buys a pumper-tanker to replace a 30-year-old engine and a 33-year-old tanker. Two van-style ambulances replace the old ones. The swiftwater team works the floods, and the technical rescue team stands by for ice rescues at the April eclipse in Pittsburg, New Hampshire.", source: "r2024" },
      ],
    },
    calls: {
      intro: "Ambulance calls make up most of the work: about seven in ten incidents in fiscal 2024.",
      byType: {
        title: "Incidents by type, FY2024",
        bars: [
          { label: "ALS emergency (level 1)", value: 400 },
          { label: "BLS emergency", value: 395 },
          { label: "BLS non-emergency", value: 384 },
          { label: "Other", value: 129 },
          { label: "Service calls", value: 109 },
          { label: "Motor vehicle crashes", value: 68 },
          { label: "Fire alarms", value: 58 },
          { label: "False alarms", value: 58 },
          { label: "Mutual aid to other towns", value: 38 },
          { label: "ALS emergency (level 2)", value: 21 },
          { label: "Hazardous materials", value: 19 },
          { label: "Structure fires", value: 16 },
          { label: "Vehicle fires", value: 10 },
          { label: "Technical rescues", value: 4 },
          { label: "Vegetation fires", value: 3 },
          { label: "ALS non-emergency", value: 2 },
        ],
        note: "Year to June 2024. The report lists categories without a total; they add up to 1,714, and include calls in the contracted towns.",
        source: "r2024",
      },
    },
    residents: [
      { label: "Burn permits", href: `${WIN2}/1224/Fire-EMS`, text: "Call the fire station; a permit is issued when the weather allows." },
      { label: "Join", href: `${WIN2}/1224/Fire-EMS`, text: "The department is always looking for call personnel: stop in or call." },
    ],
    sources: {
      dept: { label: "Town of Windsor, Fire / EMS", href: `${WIN2}/1224/Fire-EMS` },
      r2023: { label: "Town of Windsor, FY2022–23 Annual Report", href: `${WIN2}/DocumentCenter/View/1954/FY22-23--Town-of-Windsor-Annual-Report`, note: "Fire Department report, PDF pages 27–29" },
      r2024: { label: "Town of Windsor, FY2023–24 Annual Report", href: `${WIN2}/DocumentCenter/View/1956/FY23-24-Town-of-Windsor-Annual-Report`, note: "Fire Department report and incidents, PDF pages 30–32; fire and ambulance budget, PDF page 70" },
    },
  },
  norwich: {
    description:
      "Norwich Fire Department: volunteers protecting Norwich since 1920, first-response medical care through the " +
      "F.A.S.T. Squad since 2001, and the town's fire and EMS budget.",
    facts: [
      ["Founded", "1920"],
      ["Staffing", "Volunteers from Norwich and nearby towns"],
      ["EMS", "First-responder (non-transport) medical care through the F.A.S.T. Squad, a state-licensed EMS agency, since 2001"],
      ["Chief", "Alex Northern"],
    ],
    contact: { chief: "Alex Northern", phone: "802-649-1133", website: `${NOR}/fire-department/`, source: "r2025" },
    history: {
      intro:
        "Norwich's volunteers provide fire protection and first-response medical care; the town buys ambulance transport " +
        "under contract. Each October the department takes fire safety programmes to the town's nursery school and " +
        "childcare centre.",
      events: [
        { year: 1920, text: "The Norwich Fire Department begins protecting the town.", source: "dept" },
        { year: 2001, text: "The department starts providing emergency medical services, through its F.A.S.T. Squad.", source: "r2025" },
        { year: 2025, text: "Three members are promoted, one to captain and two to lieutenant, and six firefighters enrol in the Vermont Fire Academy's recruit school.", source: "r2025" },
      ],
    },
    money: {
      intro:
        "The town's Fire/FAST budget covers the department and the ambulance contract; $639,195 is requested for " +
        "fiscal 2027, up 5.1%.",
      year: "fiscal year 2027, as requested",
      lines: [
        { label: "Ambulance contract", amount: 188783 },
        { label: "Fire chief's wages", amount: 88138 },
        { label: "Firefighters' wages", amount: 32000 },
      ],
      linesNote: "Three of the Fire/FAST lines in the town's budget.",
      capital: {
        title: "Fire/FAST budget, by year",
        lines: [
          { label: "FY2027, requested", amount: 639195 },
          { label: "FY2026, budget", amount: 608294 },
          { label: "FY2025, budget", amount: 588765 },
          { label: "FY2025, actual", amount: 533386 },
        ],
        note: "The Norwich Fire District is a separate body that runs the village water system; its budget is not included.",
      },
      source: "r2025b",
    },
    residents: [
      { label: "Burn permits", href: "https://norwichfire.com/burnpermit", text: "Required for any outdoor fire without enough snow cover; campfire rings and enclosed stoves are exempt. Request by text, phone or online from the fire warden." },
      { label: "Statistics", href: `${NOR}/fire-department/`, text: "The department's call statistics and roster are available on request." },
    ],
    sources: {
      dept: { label: "Town of Norwich, Fire Department", href: `${NOR}/fire-department/` },
      r2025: { label: "Town of Norwich, Annual Report 2025", href: `${NOR}/wp-content/uploads/2026/02/Norwich-Annual-Report-2025.pdf`, note: "Fire & EMS Department and Fire Warden reports, PDF page 123" },
      r2025b: { label: "Town of Norwich, Annual Report 2025: budget", href: `${NOR}/wp-content/uploads/2026/02/Norwich-Annual-Report-2025.pdf`, note: "Budget summary, PDF page 20; Fire/FAST detail" },
    },
  },

  woodstock: {
    description:
      "Woodstock Fire/EMS: fire and ambulance for Woodstock since 1975, a crew on duty around the clock in a rebuilt " +
      "emergency services building, 1,352 calls in fiscal 2024, and fire calls by type.",
    facts: [
      ["Services", "Fire and EMS; ice rescue, vehicle extrication and wildland search and rescue teams"],
      ["Staffing", "10 full-time and 30 call members (FY2026 plan)"],
      ["Station One", "454 Woodstock Road, shared with the police"],
      ["Chief", "David Green"],
      ["Fire budget", "$703,814 recommended for FY2026; the ambulance is budgeted separately"],
    ],
    contact: { chief: "David Green", phone: "(802) 457-2337", website: "https://fire-ems.townofwoodstock.org/fire-ems", source: "town" },
    history: {
      intro:
        "Woodstock Fire/EMS is the town's fire department and its primary ambulance, with contracts to cover parts of " +
        "Pomfret, Plymouth, Reading, Hartland and Bridgewater. It also runs inspection programmes for short-term rentals " +
        "and rooftop solar.",
      events: [
        { year: 1975, text: "The ambulance service is established.", source: "town" },
        { year: 2016, text: "Woodstock loses a grade on its ISO fire-protection rating, raising some insurance premiums by up to $500; the department sets out to win back two grades.", source: "r2023" },
        { year: 2022, calls: 271, text: "Fire calls in the calendar year, plus 826 EMS calls and 84 building inspections. The remodelled and enlarged emergency services building nears completion: with two to four people on duty around the clock, a truck now leaves in under two minutes, where it once could take up to twenty.", source: "r2023" },
        { year: 2024, calls: 308, text: "Fire calls in fiscal 2024, among 1,352 calls in all including 964 EMS events. The department buys a new ambulance and three cardiac monitors, certifies a full-time member as a paramedic, and trains 40 residents in CPR.", source: "r2024" },
      ],
    },
    calls: {
      intro: "Fire alarms and calls for other departments lead the fire calls; the ambulance answers three times as many again.",
      byType: {
        title: "Fire calls by type, 2022",
        bars: [
          { label: "Other department calls", value: 99 },
          { label: "Fire alarms", value: 96 },
          { label: "Motor vehicle crashes", value: 22 },
          { label: "Power lines", value: 14 },
          { label: "Brush or grass fires", value: 8 },
          { label: "EMS assists", value: 8 },
          { label: "Electrical fires", value: 5 },
          { label: "Chimney fires", value: 4 },
          { label: "Fuel spills, hazmat, propane", value: 4 },
          { label: "CO alarm malfunctions", value: 4 },
          { label: "Carbon monoxide incidents", value: 3 },
          { label: "Building fires", value: 2 },
          { label: "Vehicle fires", value: 2 },
        ],
        note: "Calendar 2022; the types add up to the 271 fire calls reported. EMS calls (826) are counted separately.",
        source: "r2023",
      },
    },
    stationNotes: {
      "woodstock-454-woodstock-rd": { text: "Station One, the emergency services building, remodelled and enlarged in 2022 and shared with the police.", source: "r2023" },
    },
    residents: [
      { label: "Burn permits", href: "https://townofwoodstock.org/wp-content/uploads/2023/02/2023-Town-Report.pdf", text: "Needed for any outdoor fire, all year, even with snow on the ground. Get the first at the fire station; after that a phone call will do. Natural brush and wood only." },
      { label: "Short-term rentals", href: "https://townofwoodstock.org/wp-content/uploads/2023/02/2023-Town-Report.pdf", text: "Every short-term rental in the town and village needs an annual fire department permit and inspection." },
      { label: "Smoke and CO alarms", href: "https://townofwoodstock.org/wp-content/uploads/2023/02/2023-Town-Report.pdf", text: "Free checks on request. CO alarms expire after 5 years, smoke alarms after 10." },
      { label: "Join", href: "https://fire-ems.townofwoodstock.org/fire-ems", text: "Always looking for residents to become firefighters or EMTs, part-time or on call. Ask at the fire station." },
    ],
    sources: {
      town: { label: "Town of Woodstock, Emergency Services", href: "https://townofwoodstock.org/departments/emergency-services/" },
      dept: { label: "Woodstock Fire/EMS", href: "https://fire-ems.townofwoodstock.org/fire-ems" },
      r2023: { label: "Town of Woodstock, 2023 Town Report", href: "https://townofwoodstock.org/wp-content/uploads/2023/02/2023-Town-Report.pdf", note: "Fire/EMS report and calls, PDF pages 46–47" },
      r2024: { label: "Town of Woodstock, 2024 Town Report", href: "https://www.townofwoodstock.org/fileadmin/files/Fire-EMS/TownReport2024.pdf", note: "Fire/EMS, PDF page 26; budget summary, PDF page 14; fire budget, PDF page 43" },
    },
  },
  chester: {
    description:
      "Chester Fire Department: a state-endorsed technical rescue team, a 2024 swiftwater deployment to Fayston and " +
      "Moretown, calls for 2024–2025, a grant-funded pumper-tanker, and the ambulance joining in 2025.",
    facts: [
      ["Serves", "Chester and Andover"],
      ["Station", "Yosemite Fire House, 716 Depot Street"],
      ["Technical rescue", "One of 11 teams endorsed and supported by Vermont Urban Search and Rescue"],
      ["Chief", "Scott Richardson, since 1 September 2024"],
      ["EMS", "Chester Ambulance Service became part of the fire department in 2025"],
    ],
    contact: { chief: "Scott Richardson", website: "https://www.chestervt.gov/fire-department.html", source: "r2024" },
    history: {
      intro:
        "Chester's firefighters train at least three times a month, and the department is equipped for swiftwater, ice, " +
        "and low- and high-angle rope rescue. The Yosemite Engine Company, a nonprofit of current and past firefighters, " +
        "raises money for training and equipment.",
      events: [
        { year: 2024, calls: 190, text: "Chief Wilson retires in January; acting chief Ben Whalen leaves in May to become Ludlow's first full-time chief, and Scott Richardson, a former Springfield deputy chief with 45 years in public safety, takes over in September. On 10 July the swiftwater team is sent north for the floods, making three rescues in Fayston, one of them a dog, and a rescue and two evacuations in Moretown over 24 hours.", source: "r2024" },
        { year: 2025, calls: 209, text: "The fire department and the Chester Ambulance Service become one, with the ambulance chief as deputy chief for EMS; together they answer 1,074 calls. A 2023 International/E-One pumper-tanker carrying 3,000 gallons arrives in May, bought largely with a $475,000 federal grant the members wrote. Five members train in Oregon for Rope Technician certification.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Calls rose about 10% in 2025. The department went to Andover 18 times that year.",
      byYear: {
        title: "Fire calls, by year",
        bars: [
          { label: "2024", value: 190 },
          { label: "2025", value: 209 },
        ],
        note: "Calendar years, from the fire chief's report. Ambulance calls are counted separately.",
        source: "r2025",
      },
    },
    residents: [
      { label: "Yosemite Engine Company", href: "https://www.chestervt.gov/fire-department.html", text: "The department's nonprofit support group runs fundraisers through the year for its equipment and training." },
    ],
    sources: {
      r2024: { label: "Town of Chester, 2024 Annual Report", href: "https://www.chestervt.gov/uploads/1/1/9/4/119456679/chester_2024_vermontmunicipalreport.pdf", note: "Report of the Fire Chief, PDF pages 55–56; town property list (Yosemite Fire House, 716 Depot St), PDF page 11. A scanned report, read with text recognition" },
      r2025: { label: "Town of Chester, 2025 Annual Report", href: "https://www.chestervt.gov/uploads/1/1/9/4/119456679/2025_town_report.pdf", note: "Report of the Fire Chief, PDF page 55. A scanned report, read with text recognition" },
    },
  },
  royalton: {
    description:
      "South Royalton Fire Department: Royalton's volunteer department, run by Fire District #1, with 145 calls in 2022 " +
      "by type, mutual aid, and the town's appropriation; the South Royalton Rescue Squad answers medical calls.",
    facts: [
      ["Run by", "Royalton Fire District #1, separate from the town; it also runs the water system"],
      ["Staffing", "Volunteer"],
      ["Station", "53 Safford Street, South Royalton"],
      ["Meets", "2nd and 4th Thursdays, 7 pm, at the firehouse"],
      ["Town appropriation", "$132,515 requested for 2023, up from $106,340"],
    ],
    contact: { website: `${ROY}/services/south_royalton_fire_department.php`, source: "dept" },
    history: {
      intro:
        "The South Royalton Fire Department serves the whole town of Royalton and helps its neighbours through mutual aid. " +
        "The South Royalton Rescue Squad, staffed around the clock since the 1960s, covers medical calls for Royalton, " +
        "Sharon and Tunbridge.",
      events: [
        { year: 2022, calls: 145, text: "Crashes lead with 44 calls. Of 14 structure fires, 5 are in Royalton and 9 in other towns; the department gives mutual aid 12 times and receives it 9 times. Members put 863 hours into calls. Chief Paul Brock.", source: "r2022" },
      ],
    },
    calls: {
      intro: "Crashes, alarms and medical assists made up more than half of 2022's calls.",
      byType: {
        title: "Calls by type, 2022",
        bars: [
          { label: "Motor vehicle crashes", value: 44 },
          { label: "Alarm activations", value: 28 },
          { label: "Medical assists", value: 17 },
          { label: "Power line or utility calls", value: 15 },
          { label: "Structure fires", value: 14, sub: "5 in Royalton, 9 elsewhere" },
          { label: "Mutual aid to other towns", value: 12 },
          { label: "Service calls", value: 7 },
          { label: "Chimney fires", value: 5 },
          { label: "Illegal burns", value: 4 },
          { label: "Wildland fires", value: 3 },
          { label: "Car fires", value: 3 },
          { label: "Miscellaneous", value: 2 },
          { label: "Hazmat", value: 1 },
          { label: "Water rescue", value: 1 },
        ],
        note: "Calendar 2022. The report states 145 calls; the types it lists add up to 156, or 144 without the mutual aid calls.",
        source: "r2022",
      },
    },
    residents: [
      { label: "Join", href: `${ROY}/services/south_royalton_fire_department.php`, text: "New members are welcome: come to a meeting on the 2nd or 4th Thursday at 7 pm at the firehouse." },
      { label: "Burn permits", href: `${ROY}/services/south_royalton_fire_department.php`, text: "From the town fire warden, listed on the town's fire department page." },
    ],
    sources: {
      dept: { label: "Town of Royalton, South Royalton Fire Department", href: `${ROY}/services/south_royalton_fire_department.php` },
      fd1: { label: "Town of Royalton, Fire District #1 Prudential Committee", href: `${ROY}/committees/fire_district_1_prudential_committee.php` },
      r2022: { label: "Town of Royalton, 2023 Town Report (year 2022)", href: `${ROY}/Document_Center/2023%20Town%20Report.pdf`, note: "Fire Department and Rescue Squad reports, PDF pages 51–52; appropriations, PDF pages 8 and 23" },
    },
  },

  weathersfield: {
    description:
      "Weathersfield Fire Department: Ascutney and West Weathersfield joined in August 2025 to form one municipal " +
      "department with two stations on Route 131, with each department's calls, the fire budget and its history.",
    subtitle: "Weathersfield Fire Department",
    facts: [
      ["Formed", "August 2025, from the Ascutney and West Weathersfield volunteer departments"],
      ["Stations", "Station 1, 540 Route 131, Ascutney; Station 2, 7259 Route 131, Perkinsville"],
      ["Chief", "Josh Compo, the town's first municipal fire chief"],
      ["Fire budget", "$315,964 proposed for FY2026"],
    ],
    contact: { chief: "Josh Compo", phone: "(802) 674-6869", website: `${WEA}/246/Fire-Department`, source: "dept" },
    history: {
      intro:
        "Until 2025 Weathersfield was protected by two nonprofit volunteer departments under contract to the town, " +
        "Ascutney and West Weathersfield. They now form a single town department, with Mychael Spaulding as deputy chief " +
        "and Josh Dauphin, West Weathersfield's chief for 15 years, as assistant chief and fire warden.",
      events: [
        { year: 1956, text: "The Ascutney Volunteer Fire Department is founded; Rodney Spaulding is among its first members, and serves as chief from 1976 to 1995.", source: "r2024" },
        { year: 1995, text: "Darrin Spaulding succeeds his father as Ascutney's chief.", source: "r2024" },
        { year: 2023, text: "In the year to June, Ascutney answers 397 calls and West Weathersfield 160. West Weathersfield's auxiliary is dissolved after 55 years.", source: "r2023" },
        { year: 2024, text: "Chief Darrin Spaulding dies on 9 April, aged 59, after 44 years with Ascutney; his sons Mychael and Jackson serve on the department. In the year to June, Ascutney answers 353 calls and West Weathersfield 218. Ascutney takes delivery of a 2,000-gallon Dingee tanker, and a $51,000 federal grant buys West Weathersfield new extrication tools.", source: "r2024" },
        { year: 2025, text: "In August the two departments merge into the Weathersfield Fire Department, and Josh Compo is appointed its first municipal chief. Its rescue licence is extended to the whole town.", source: "r2025" },
      ],
    },
    money: {
      intro: "The town's Fire & Emergency Services line funds both stations; most of it comes from property taxes.",
      year: "fiscal year 2026, as proposed",
      lines: [
        { label: "Debt service (principal and interest)", amount: 46284 },
        { label: "Maintenance and repairs", amount: 31220 },
        { label: "Vehicle maintenance", amount: 31000 },
        { label: "Supplies", amount: 29105 },
        { label: "Dispatching", amount: 27988 },
        { label: "Protective equipment", amount: 24490 },
        { label: "Golden Cross Ambulance", amount: 22308 },
      ],
      linesNote: "The largest lines in the proposed Fire & Emergency Services budget.",
      capital: {
        title: "Fire & Emergency Services, by year",
        lines: [
          { label: "FY2026, proposed", amount: 315964 },
          { label: "FY2025, approved", amount: 325898 },
          { label: "FY2024, estimated", amount: 285414 },
          { label: "FY2023, actual", amount: 211786 },
          { label: "FY2022, actual", amount: 234664 },
        ],
        note: "As printed in the FY2024 town report.",
      },
      source: "r2024b",
    },
    residents: [
      { label: "Burn permits", href: `${WEA}/250/Fire-Warden`, text: "Required all year, verbal or written, from the fire warden. Clean untreated wood, brush, weeds and grass only; no household trash." },
      { label: "Non-emergency", href: `${WEA}/246/Fire-Department`, text: "Station 1, (802) 674-6869; Station 2, (802) 295-9425. Dial 911 for emergencies." },
    ],
    sources: {
      dept: { label: "Town of Weathersfield, Fire Department", href: `${WEA}/246/Fire-Department` },
      r2023: { label: "Town of Weathersfield, FY2023 Town Report", href: `${WEA}/DocumentCenter/View/417/FY2023-Town-Report`, note: "Ascutney and West Weathersfield reports, PDF pages 105–106; auxiliary, PDF page 55. A scanned report, read with text recognition; Ascutney's page gives both 376 and 397 calls, the table 397" },
      r2024: { label: "Town of Weathersfield, FY2024 Town Report", href: `${WEA}/DocumentCenter/View/418/FY2024-Town-Report`, note: "In memoriam, PDF page 84; department reports, PDF pages 135–136" },
      r2024b: { label: "Town of Weathersfield, FY2024 Town Report: budget", href: `${WEA}/DocumentCenter/View/418/FY2024-Town-Report`, note: "Fire & Emergency Services, PDF page 100" },
      r2025: { label: "Town of Weathersfield, FY2025 Town Report", href: `${WEA}/DocumentCenter/View/419/FY2025-Town-Report`, note: "Selectboard report, PDF page 140; fire department, PDF page 170" },
    },
  },
  pomfret: {
    description:
      "Pomfret-Teago Volunteer Fire Department: two departments merged in 2012, two stations on Pomfret Road, 43 calls " +
      "in 2024, response times, the Pomfret Pull, and the town's fire budget and vehicle reserve.",
    facts: [
      ["Formed", "November 2012, when the Pomfret and Teago departments merged"],
      ["Stations", "Teago Station, 2026 Pomfret Road; Pomfret Station, 7373 Pomfret Road"],
      ["Members", "21 firefighters and 1 cadet (2024); 12 certified Firefighter I or higher, 5 also EMTs"],
      ["Chief", "Jacob Astbury, since January 2025"],
      ["Average response", "8.86 minutes in 2024"],
    ],
    contact: { chief: "Jacob Astbury", phone: "(802) 457-1125", website: `${POM}/index.php/dep/em/f/`, source: "dept" },
    history: {
      intro:
        "Pomfret-Teago's volunteers work from two stations and roll an average of six people and almost three trucks to " +
        "each call. Five members are EMTs who also respond with the Pomfret FAST Squad.",
      events: [
        { year: 2012, text: "In November the members of the Pomfret Volunteer Fire Department and the Teago Fire Department vote to merge.", source: "dept" },
        { year: 2023, calls: 40, text: "Average response falls to 9.43 minutes, from 10.79 the year before.", source: "r2023" },
        { year: 2024, calls: 43, text: "Average response 8.86 minutes. Fundraising pays for a wildland truck, a rescue UTV and a trailer. Kevin Rice retires as chief after 16 years, staying on as a member.", source: "r2024" },
      ],
    },
    money: {
      intro: "Most of the town's fire budget goes into a reserve for replacing fire trucks.",
      year: "fiscal year 2026, as proposed",
      lines: [
        { label: "Fire vehicle reserve", amount: 60000 },
        { label: "Insurance", amount: 20055 },
        { label: "Non-vehicle reserve", amount: 7600 },
        { label: "Equipment", amount: 6900 },
      ],
      linesNote: "The largest lines in the town's Fire Department budget.",
      capital: {
        title: "Fire Department budget, by year",
        lines: [
          { label: "FY2026, proposed", amount: 129435 },
          { label: "FY2025, budget", amount: 138957 },
          { label: "FY2024, actual", amount: 137454 },
        ],
        note: "Earlier years' figures leave out the reserve transfers, so they are not comparable.",
      },
      source: "r2024b",
    },
    residents: [
      { label: "Join", href: `${POM}/index.php/dep/em/f/`, text: "Stop by either station on a Tuesday night. Volunteers who can respond from North Pomfret are especially wanted." },
      { label: "Pomfret Pull and Pancake Breakfast", href: `${POM}/index.php/dep/em/f/`, text: "The August ox pull and October breakfast are the department's two fundraisers." },
    ],
    sources: {
      dept: { label: "Town of Pomfret, Fire Department", href: `${POM}/index.php/dep/em/f/` },
      r2023: { label: "Town of Pomfret, Annual Report for 2023", href: `${POM}/index.php/download_file/view/2368/1`, note: "Fire department report, PDF pages 43–44" },
      r2024: { label: "Town of Pomfret, Annual Report for 2024", href: `${POM}/index.php/download_file/view/2584/1`, note: "Fire department report, PDF pages 42–43; department accounts, PDF page 45" },
      r2024b: { label: "Town of Pomfret, Annual Report for 2024: budget", href: `${POM}/index.php/download_file/view/2584/1`, note: "Fire Department budget, PDF pages 30–31" },
    },
  },
  rochester: {
    description:
      "Rochester Volunteer Fire Department: an all-volunteer department in a station built in 2013, calls for 2023–2025, " +
      "a new first response team, and the town's fire budget.",
    facts: [
      ["Staffing", "All volunteer: 26 members including 1 junior (2025); half are in their 60s"],
      ["Station", "Built in 2013"],
      ["First response", "A first response and rescue team since 16 October 2025, with White River Valley Ambulance"],
      ["Chief", "Terry Severy"],
    ],
    contact: { chief: "Terry Severy", phone: "(802) 767-1136", website: `${ROC}/rfd/`, source: "dept" },
    history: {
      intro:
        "Rochester's volunteers meet twice a month, once to plan and once to train and work on the trucks. The Easter " +
        "pancake breakfast is their biggest fundraiser.",
      events: [
        { year: 2013, text: "The current fire station is built.", source: "dept" },
        { year: 2023, calls: 45, text: "Members drill with Killington Rescue, State Police and a trail group for rescues on the Velomont Trail.", source: "r2023" },
        { year: 2024, calls: 45, text: "Donations from a fundraising letter buy new jaws of life and cordless tools; less than a week after training, members use them at a call.", source: "r2024" },
        { year: 2025, calls: 54, text: "Calls rise 18%. In October the department starts a first response and rescue team, which answers 12 calls in its first six weeks.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Crashes and alarms lead, with house and chimney fires a steady share.",
      byType: {
        title: "Calls by type, 2025",
        bars: [
          { label: "Motor vehicle crashes", value: 12 },
          { label: "Fire alarms", value: 8 },
          { label: "Mutual aid", value: 6 },
          { label: "House fires", value: 5 },
          { label: "False alarms", value: 4 },
          { label: "Chimney fires", value: 3 },
          { label: "Auto fires", value: 3 },
          { label: "Downed power lines", value: 3 },
          { label: "Search and rescue", value: 3 },
          { label: "Carbon monoxide", value: 2 },
          { label: "Trees down", value: 2 },
          { label: "DHART helicopter", value: 2 },
          { label: "Brush fire", value: 1 },
        ],
        note: "Calendar 2025; the types add up to the 54 calls reported.",
        source: "r2025",
      },
    },
    money: {
      intro: "The fire budget is modest: $63,200 proposed for fiscal 2027, plus $11,800 for the new rescue team.",
      year: "fiscal year 2027, as proposed",
      lines: [
        { label: "Salaries", amount: 10000 },
        { label: "Supplies and repair", amount: 8000 },
        { label: "Property and auto insurance", amount: 7500 },
        { label: "Bunker gear", amount: 7000 },
        { label: "Hoses", amount: 4000 },
        { label: "Radios and pagers", amount: 4000 },
      ],
      linesNote: "The largest lines in the town's fire department budget.",
      capital: {
        title: "Fire department expenses, by year",
        lines: [
          { label: "FY2027, proposed", amount: 63200 },
          { label: "FY2026, budget", amount: 58350 },
          { label: "FY2025, actual", amount: 90473 },
          { label: "FY2025, budget", amount: 58050 },
        ],
        note: "FY2025 ran over on truck maintenance: $44,871 against $2,500 budgeted.",
      },
      source: "r2025b",
    },
    residents: [
      { label: "Burn permits", href: `${ROC}/rfd/`, text: "Call the fire warden at 767-3241." },
      { label: "Join", href: `${ROC}/rfd/`, text: "Contact the chief or any member. The new first response team aims for 15 to 20 members." },
    ],
    sources: {
      dept: { label: "Town of Rochester, Fire Department", href: `${ROC}/rfd/` },
      r2023: { label: "Town of Rochester, Town Report, year ending June 2023", href: `${ROC}/wp-content/uploads/2024/03/Rochester-TR-Yr-2023-FOR-WEBSITE.pdf`, note: "Fire department report, PDF page 26" },
      r2024: { label: "Town of Rochester, Town Report published 2025", href: `${ROC}/wp-content/uploads/2025/03/93180-Rochester-Town-Report-for-web-225-002.pdf`, note: "Fire department report, PDF page 26. A scanned report, read with text recognition" },
      r2025: { label: "Town of Rochester, Town Report FY2025", href: `${ROC}/wp-content/uploads/2026/02/Rochester-Town-Report-FY-2025.pdf`, note: "Fire & Rescue report, PDF page 22" },
      r2025b: { label: "Town of Rochester, Town Report FY2025: budget", href: `${ROC}/wp-content/uploads/2026/02/Rochester-Town-Report-FY-2025.pdf`, note: "Fire department expenses, PDF page 30" },
    },
  },
  canaan: {
    description:
      "Beecher Falls Volunteer Fire Department, Canaan: 33 volunteers at the Quebec and New Hampshire border, 94 calls " +
      "in its 2025 year including the June Ethan Allen fire, ageing trucks and the cost of a new engine.",
    subtitle: "Beecher Falls Volunteer Fire Department",
    facts: [
      ["Members", "33 named on the 2025 roster; five joined that year"],
      ["Town contract", "$50,000 a year (FY2025 and FY2026)"],
      ["Chief", "Steve Young"],
      ["Meets", "Most Wednesday evenings, for training or work sessions"],
    ],
    contact: { chief: "Steve Young", phone: "802-266-3422", website: `${CAN}/publicsafety/firedepartment.html`, source: "r2025" },
    history: {
      intro:
        "Beecher Falls's volunteers protect Canaan, in Vermont's north-east corner on the New Hampshire line. In 2025 " +
        "the town hosted a firefighter appreciation day in its park with the departments of Stratford, Errol, Colebrook " +
        "and Pittsburg, New Hampshire.",
      events: [
        { year: 2025, calls: 94, text: "Calls for the year to November, six fewer than the year before, including six structure fires. In June, on a day near 100 degrees, members and mutual aid crews fight the Ethan Allen fire and contain it, saving many jobs. Members train with United Fire Company of Manchester, New Hampshire, on breathing apparatus, search and rescue and firefighter survival.", source: "r2025" },
      ],
    },
    stationNotes: {
      "canaan-1252-vt-route-253": {
        text:
          "Engine 1 was bought in 1973 and upgraded twice; Engine 2, the tanker and the small rescue are 19 years old; " +
          "Engine 3, the newest, is nine. A new engine would cost $750,000 to $800,000, with a three-year wait.",
        source: "r2025",
      },
    },
    residents: [
      { label: "Burn permits", href: `${CAN}/publicsafety/firedepartment.html`, text: "From the Canaan fire warden." },
      { label: "Fundraisers", href: `${CAN}/publicsafety/firedepartment.html`, text: "A bocce tournament, a cornhole tournament and the annual wood raffle support the department; ten new sets of turnout gear are expected to cost nearly $40,000." },
    ],
    sources: {
      r2025: { label: "Town of Canaan, 2025 Town Report", href: `${CAN}/images/2025_Town_Report.Reduced.pdf`, note: "Beecher Falls Volunteer Fire Department report, PDF page 57; selectboard report, PDF page 11; budget, PDF page 22" },
    },
  },
  lunenburg: {
    description:
      "Lunenburg Volunteer Fire Department: stations in Lunenburg village and Gilman, its trucks, the department's " +
      "2025 accounts, and grants for the fire department and the Gilman Lunenburg Rescue Squad.",
    facts: [
      ["Stations", "291 West Main Street (the town barn and fire station) and the Gilman Fire & Rescue Station, 41 Treatment Plant Road"],
      ["Apparatus", "Engine 2 (1997), Engine 4 (2009 KME International), tankers from 1994 and 1986, a 1986 forestry truck, a support van and a 2005 Ranger ATV"],
      ["Chief", "Stephen Colby, also the department's treasurer"],
    ],
    contact: { chief: "Stephen Colby", website: "https://www.lunenburg-gilmanvt.gov/reports---plans", source: "r2025" },
    history: {
      intro:
        "Lunenburg's volunteers serve the town and the village of Gilman. The Gilman Lunenburg Rescue Squad, also " +
        "volunteer, answers medical calls, and the town budgets separately for ambulance coverage from Lancaster.",
      events: [
        { year: 2025, text: "Grants bring $26,500 to the fire department. The town gives the department $20,000 for its running costs, of which $8,591 goes on gear and equipment and $7,996 on truck repairs. Energy-efficiency work at the Gilman fire station, funded by a $397,321 state grant to the town, continues.", source: "r2025" },
      ],
    },
    residents: [
      { label: "Town report", href: "https://www.lunenburg-gilmanvt.gov/reports---plans", text: "The department's accounts and equipment list are printed in the town's annual report each year." },
    ],
    sources: {
      r2025: { label: "Town of Lunenburg, 2025 Annual Auditors' Report", href: "https://irp.cdn-website.com/cefd8893/files/uploaded/2025+Annual+Auditors+Report+-+Lunenburg-+VT+-+FINAL.pdf", note: "Fire department accounts, PDF page 11; rescue squad and grants, PDF page 20; property and equipment, PDF pages 33–34; grant summary, PDF page 37" },
    },
  },
  bennington: {
    description:
      "Bennington's fire departments: the volunteer Village Fire Department, founded in 1850 with four companies on " +
      "River Street, and the Bennington Rural Fire Department, founded by the Grange in 1953.",
    facts: [
      ["Village Fire Department", "Founded 1850; four companies in one firehouse at 130 River Street; Chief Nathan Berres"],
      ["Rural Fire Department", "Founded 1953 as Bennington Fire District No. 1; stations on Orchard Road, West Road and Gore Road; Chief Steven Waters"],
      ["Staffing", "Both all volunteer"],
    ],
    contact: { chief: "Nathan Berres (Village); Steven Waters (Rural)", phone: "802-442-1051 (Village); 802-447-7765 (Rural)", website: `${BEN}/services/fire.php`, source: "town" },
    history: {
      intro:
        "Two volunteer departments protect Bennington: the Village Fire Department in the centre, and the Rural Fire " +
        "Department, a separate fire district, across the rest of the town and, by contract, Woodford. North Bennington " +
        "has its own department and fire warden.",
      events: [
        { year: 1850, text: "On 18 March the village trustees establish the Bennington Fire Department, with two firehouses: Spartan Engine Company No. 1 on Pleasant Street and Protection Engine Company No. 2 on East Main Street.", source: "r180" },
        { year: 1866, text: "The W.H. Bradford Hook and Ladder Company No. 1 is established.", source: "r180" },
        { year: 1871, text: "Spartan Engine Company becomes the General Stark Steamer Company, ancestor of today's Stark Hose Company No. 1.", source: "r180" },
        { year: 1887, text: "The H.W. Putnam Company No. 3 is organised; the Eagle Hose Company No. 4 follows in 1894. All four companies are now at the central station on River Street.", source: "r180" },
        { year: 1953, text: "The Bennington Pomona Grange founds the Bennington Rural Fire District, with T. Howard Mattison as chief; by the end of its first year 35 volunteers answer every call. It later reorganises as Bennington Fire District No. 1.", source: "hcr111" },
        { year: 1959, text: "Rural firefighters build their first firehouse on Willow Road, enlarged in 1976 and 1992; more follow on Beech Street (1966) and at Fairdale Farms (1969, rebuilt 1985).", source: "hcr111" },
        { year: 2000, text: "The Vermont State Firefighters' Association names Rural Chief Walt Sweet its Chief of the Year; Rural members serve as the association's president in 1985 and 2000.", source: "hcr111" },
        { year: 2024, text: "The General Assembly congratulates the Rural Fire Department on its 70th anniversary; it now has five companies, each with its own officers.", source: "hcr111" },
        { year: 2025, text: "The General Assembly commemorates the Village Fire Department's 175th anniversary.", source: "r180" },
      ],
    },
    stationNotes: {
      "bennington-130-river-st": { text: "The Village Fire Department's central station, home to all four companies.", source: "r180" },
    },
    residents: [
      { label: "Burn permits", href: `${BEN}/services/fire.php`, text: "All outdoor burning needs a town permit: $10 for a campfire permit good for the rest of the year, $5 for a two-week brush permit. Call the town office at 802-442-1037. North Bennington has its own fire warden." },
      { label: "Join", href: `${BEN}/services/fire.php`, text: "The Village Fire Department is run entirely by volunteers: download an application, call, or stop by." },
    ],
    sources: {
      town: { label: "Town of Bennington, Fire", href: `${BEN}/services/fire.php` },
      r180: { label: "Vermont General Assembly, Resolution R-180 (2025)", href: "https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACTR180/ACTR180%20As%20Adopted.pdf", note: "Commemorating the 175th anniversary of the Bennington Fire Department" },
      hcr111: { label: "Vermont House, H.C.R. 111 (2024)", href: "https://legislature.vermont.gov/Documents/2024/Docs/RESOLUTN/HCR111/HCR111%20As%20Introduced.pdf", note: "Congratulating the Bennington Rural Fire Department on its 70th anniversary" },
    },
  },
  arlington: {
    description:
      "Arlington Fire Department: two firehouses serving Arlington, Sunderland and Sandgate, 190 calls in 2025, " +
      "1,291 training hours, and a town budget that now includes the firehouses.",
    subtitle: "Arlington Fire Department",
    facts: [
      ["Serves", "Arlington, and by agreement Sunderland and Sandgate"],
      ["Stations", "East Station, 184 Old Mill Road; West Station, 41 Berwal Road"],
      ["Chief", "Brian Hawley, with assistant chiefs Eric Marko and Vince Thompson"],
      ["Fire budget", "$324,000 proposed for 2026, up from $272,286 spent in 2025"],
    ],
    contact: { chief: "Brian Hawley", phone: "(802) 375-2323", website: "https://arlingtonvermont.org/", source: "r2025" },
    history: {
      intro:
        "Arlington's department answers calls in three towns and gives mutual aid to its neighbours. The town has long " +
        "paid for its operations; the Arlington Fire Protection Company, a nonprofit, used to own and run the two " +
        "firehouses.",
      events: [
        { year: 2025, calls: 190, text: "72 calls in Arlington, 64 in Sunderland and 15 in Sandgate, the rest mutual aid. Members log 1,291 training hours, adding joint drills on interior attack and water supply. The fire wardens issue 67 burn permits. The Fire Protection Company hands both firehouses to the town, which takes on about $40,000 a year to run them.", source: "r2025" },
      ],
    },
    money: {
      intro:
        "The town pays for the department, with contributions from Sunderland and Sandgate, and puts $100,000 a year " +
        "into a fire truck reserve.",
      year: "2025, actual",
      lines: [
        { label: "Fire truck capital reserve", amount: 100000 },
        { label: "New equipment", amount: 65983 },
        { label: "Truck maintenance", amount: 31110 },
        { label: "Volunteer stipends", amount: 13750 },
        { label: "Communications and WiFi", amount: 12040 },
        { label: "Insurance", amount: 11090 },
      ],
      linesNote: "The largest lines in the town's 2025 fire department spending.",
      capital: {
        title: "Fire department, by year",
        lines: [
          { label: "2026, proposed", amount: 324000 },
          { label: "2025, actual", amount: 272286 },
          { label: "2025, budget", amount: 275430 },
        ],
        note: "2026 adds the firehouses' upkeep and utilities, and grant writing.",
      },
      source: "r2025b",
    },
    residents: [
      { label: "Burn permits", href: "https://arlingtonvermont.org/", text: "From the town's fire wardens; 67 were issued in 2025." },
      { label: "Join", href: "https://arlingtonvermont.org/", text: "Stop by the firehouse any time: the department is always looking for volunteers." },
    ],
    sources: {
      r2025: { label: "Town of Arlington, 2025 Town Report", href: "https://arlingtonvermont.org/wp-content/uploads/2026/02/2025-ARL-Town-Report-Master.pdf", note: "Fire Department report, PDF page 43; Select Board, PDF pages 36–37; budget notes, PDF page 18; fire wardens, PDF page 44" },
      r2025b: { label: "Town of Arlington, 2025 Town Report: budget", href: "https://arlingtonvermont.org/wp-content/uploads/2026/02/2025-ARL-Town-Report-Master.pdf", note: "Fire department revenue and spending, PDF pages 27–28" },
    },
  },
  shaftsbury: {
    description:
      "Shaftsbury Fire Company: 32 volunteers in two stations, now an independent fire company, with 2024 calls by " +
      "type and plans for a new wildland truck.",
    facts: [
      ["Members", "32 volunteer firefighters"],
      ["Stations", "Station 1, 166 Buck Hill Road; Station 2, 364 Old Depot Road"],
      ["Status", "An independent, tax-exempt fire company, funded by taxes, donations and fundraisers"],
      ["Chief", "Joseph Vadakin, with assistant chiefs Mike Taylor and Ed Shewell"],
    ],
    contact: { chief: "Joseph Vadakin", phone: "802-442-4226", website: `${SHF2}/town-officials/fire-department`, source: "dept" },
    history: {
      intro:
        "Shaftsbury's main station is in the centre of town on Buck Hill Road, with a sub-station in the north on Old " +
        "Depot Road near Route 7A. The department recently became its own tax-exempt fire company.",
      events: [
        { year: 2024, calls: 102, text: "Crashes and extrications lead with 31, with 18 mutual aid calls and 6 structure fires. The 40-year-old furnace at Station 2 is being replaced, and with wildland fires on the rise the department plans to replace its 20-year-old brush truck. Former chief Ron Lindsey dies.", source: "r2024" },
      ],
    },
    calls: {
      intro: "Crashes, mutual aid and good-intent calls made up two thirds of 2024's calls.",
      byType: {
        title: "Calls by type, 2024",
        bars: [
          { label: "Car accidents and extrication", value: 31 },
          { label: "Good intent", value: 18 },
          { label: "Mutual aid", value: 18 },
          { label: "Wildland fires", value: 8 },
          { label: "Structure fires", value: 6 },
          { label: "Weather related", value: 6 },
          { label: "Search and rescue", value: 5 },
          { label: "Hazardous materials", value: 4 },
          { label: "EMS assists", value: 4 },
          { label: "Vehicle fire", value: 1 },
          { label: "Chimney or pellet stove", value: 1 },
        ],
        note: "Calendar 2024. The table totals 102; the chief's letter says 100.",
        source: "r2024",
      },
    },
    residents: [
      { label: "Non-emergency", href: `${SHF2}/town-officials/fire-department`, text: "Station 1, 802-442-4226; Station 2, 802-375-9308. Dial 911 for emergencies." },
      { label: "Burn permits", href: `${SHF2}/town-officials/fire-department`, text: "Call the town's forest fire warden 24 hours ahead." },
    ],
    sources: {
      dept: { label: "Town of Shaftsbury, Fire Department", href: `${SHF2}/town-officials/fire-department` },
      r2024: { label: "Town of Shaftsbury, Annual Report 2024", href: `${SHF2}/all-docs/archived-docs/town-reports/2024/Shaftsbury-Annual-Report-2024.pdf`, note: "Fire Department report, PDF page 57; directory" },
    },
  },
  readsboro: {
    description:
      "Readsboro Fire Department: an all-volunteer fire and ambulance department with 22 members, 79 calls in 2025, " +
      "a new Engine 3, and the town's fire budget.",
    facts: [
      ["Services", "Fire and ambulance, all volunteer"],
      ["Members", "22 active (2025)"],
      ["Chief", "Adam Codogni; EMS director Andrew Massari"],
      ["Fire budget", "$60,368 proposed for FY2027"],
    ],
    contact: { chief: "Adam Codogni", website: `${RDB}/pages/emergency-services`, source: "dept" },
    history: {
      intro:
        "Readsboro's volunteers answer fire and rescue calls in town and give mutual aid to neighbouring towns. The " +
        "Readsboro Fire Fighters Association, a nonprofit, and the Firemen's Auxiliary raise money for the members.",
      events: [
        { year: 2025, calls: 79, text: "19 fire calls, many on mutual aid, 49 rescue calls, 3 false alarms, a weather call and 7 others. The department takes delivery of a new fire truck, 92 Engine 3, and adds two members. The association spends $13,830 on a computer for the firehouse and fittings for the new truck; the auxiliary buys turnout gear and signs for the town's dry hydrants.", source: "r2025" },
      ],
    },
    money: {
      intro: "The town's fire department budget has held near $60,000.",
      year: "fiscal year 2025, actual",
      lines: [
        { label: "Membership dues", amount: 15806 },
        { label: "New equipment", amount: 7290 },
        { label: "Equipment repairs", amount: 5044 },
        { label: "Equipment testing", amount: 3431 },
        { label: "Radio repairs", amount: 2978 },
        { label: "Office supplies", amount: 2067 },
      ],
      linesNote: "The largest lines in the town's fire department accounts.",
      capital: {
        title: "Fire department budget, by year",
        lines: [
          { label: "FY2027, proposed", amount: 60368 },
          { label: "FY2026, budget", amount: 58467 },
          { label: "FY2025, actual", amount: 51825 },
          { label: "FY2025, budget", amount: 60203 },
        ],
        note: "From the town's budget report.",
      },
      source: "r2025b",
    },
    residents: [
      { label: "Open house", href: `${RDB}/pages/emergency-services`, text: "The department plans an open house in 2026 to show the new truck and firehouse improvements." },
    ],
    sources: {
      dept: { label: "Town of Readsboro, Emergency Services", href: `${RDB}/pages/emergency-services` },
      r2025: { label: "Town of Readsboro, 2025 Town Report", href: `${RDB}/uploads/2025-town-report-final.pdf`, note: "Readsboro Fire Department report, PDF page 33" },
      r2025b: { label: "Town of Readsboro, 2025 Town Report: budget", href: `${RDB}/uploads/2025-town-report-final.pdf`, note: "Fire Department accounts, PDF pages 15–16" },
    },
  },
  chelsea: {
    description:
      "Chelsea Fire Department: volunteers of the Chelsea Fire District, calls by type for 2024 and 2025, new pagers, " +
      "radios and turnout gear, and a fire tax that roughly doubles for 2026.",
    facts: [
      ["Run by", "The Chelsea Fire District and its Prudential Committee"],
      ["Chief", "Ed Coburn"],
      ["Meets", "Monday evenings, 7 to 9 pm, at the fire station"],
      ["Fire tax", "$174,520 proposed for 2026, up from $88,250 in 2025"],
    ],
    contact: { chief: "Ed Coburn", phone: "802-685-3112", source: "r2025" },
    history: {
      intro:
        "Chelsea's volunteers answer fires, crashes, alarms and ambulance assists, and give mutual aid to neighbouring " +
        "towns. Like its neighbours, the district has seen its membership fall.",
      events: [
        { year: 2024, calls: 38, text: "Eight structure fires, nine crashes and ten alarm calls. John R. Champney Sr., in his first year as chief, begins assessing the ageing equipment, trucks and station.", source: "r2024" },
        { year: 2025, calls: 48, text: "The department starts replacing its pagers and portable radios and buys three sets of turnout gear; the Prudential Committee plans for new or refurbished apparatus.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Alarms and mutual aid led 2025; in 2024 structure fires and crashes had led.",
      byType: {
        title: "Calls by type, 2025",
        bars: [
          { label: "CO detectors and fire alarms", value: 13 },
          { label: "Mutual aid", value: 8 },
          { label: "Ambulance assists", value: 7 },
          { label: "Motor vehicle crashes", value: 7 },
          { label: "Smoke investigations", value: 4 },
          { label: "Trees down", value: 3 },
          { label: "Structure fire", value: 1 },
          { label: "Chimney fire", value: 1 },
          { label: "Gas spill", value: 1 },
          { label: "Propane smell", value: 1 },
          { label: "Lawnmower fire", value: 1 },
          { label: "Citizen assist", value: 1 },
        ],
        note: "Calendar 2025; the types add up to the 48 calls reported.",
        source: "r2025",
      },
    },
    money: {
      intro: "The district's budget is funded mostly by its fire tax, plus rent from the ambulance service.",
      year: "2025, as adopted",
      lines: [
        { label: "Insurance", amount: 23000 },
        { label: "Building utilities", amount: 16600 },
        { label: "Communications", amount: 13700 },
        { label: "Equipment", amount: 12000 },
        { label: "Firefighter reimbursement", amount: 12000 },
        { label: "Apparatus", amount: 11500 },
      ],
      linesNote: "The largest lines in the 2025 budget, which totalled $97,550.",
      capital: {
        title: "Fire tax, by year",
        lines: [
          { label: "2026, proposed", amount: 174520 },
          { label: "2025, budget", amount: 88250 },
        ],
        note: "Proposed 2026 spending is $107,320.",
      },
      source: "r2025",
    },
    residents: [
      { label: "Join", href: `${CHE}/2025/02/2025-Town-Report-Final.pdf`, text: "Stop by the fire station any Monday evening between 7 and 9 pm, or talk to a member." },
      { label: "Burn permits", href: `${CHE}/2025/02/2025-Town-Report-Final.pdf`, text: "From the town fire warden, listed in the town report." },
    ],
    sources: {
      r2024: { label: "Town of Chelsea, Town Report (year 2024)", href: `${CHE}/2025/02/2025-Town-Report-Final.pdf`, note: "Fire Department report, PDF page 34" },
      r2025: { label: "Town of Chelsea, Town Report (year 2025)", href: `${CHE}/2026/02/2025-Chelsea-Town-Report-FINAL-comp-2.pdf`, note: "Fire Department and Prudential Committee reports, PDF pages 34–35; budget, PDF page 36" },
    },
  },
  tunbridge: {
    description:
      "Tunbridge Volunteer Fire Department: weekly Thursday training, 36 calls in its 2025 year by type, a new Alexis " +
      "engine due in 2026, and the department's budget and reserve funds.",
    facts: [
      ["Station", "2 Monarch Hill Road"],
      ["Chief", "Simon Bradford"],
      ["Meets", "Every Thursday at 7 pm: training on the 1st and 3rd, business on the 2nd, maintenance on the last"],
      ["Reserves", "$274,364 across the department's funds at 30 June 2025"],
    ],
    contact: { chief: "Simon Bradford", phone: "802-889-3212", website: `${TUN}/fire-department/`, source: "dept" },
    history: {
      intro: "Tunbridge's department is an independent volunteer organisation that the town funds; it raises money with a coin drop at the Tunbridge Fair and a Memorial Day chicken barbecue.",
      events: [
        { year: 2025, calls: 36, text: "Two structure fires, 11 mutual aid responses, 11 service calls, 8 medical assists, 3 wildland fires and a hazmat incident. A new engine from Alexis Fire Apparatus nears completion after almost two years in production. One firefighter earns Firefighter I and another qualifies as a pump operator, and the whole department trains in hazmat awareness and operations.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Mutual aid and service calls made up most of the 2025 year.",
      byType: {
        title: "Calls by type, 2025",
        bars: [
          { label: "Mutual aid", value: 11 },
          { label: "Service calls", value: 11 },
          { label: "Medical assists", value: 8 },
          { label: "Wildland fires", value: 3 },
          { label: "Structure fires", value: 2 },
          { label: "Hazmat", value: 1 },
        ],
        note: "The types add up to the 36 calls reported.",
        source: "r2025",
      },
    },
    money: {
      intro: "The town pays the department; it keeps separate funds for trucks and equipment.",
      year: "fiscal year to June 2025, actual",
      lines: [
        { label: "Radio and equipment maintenance", amount: 13410 },
        { label: "Insurance", amount: 10771 },
        { label: "Compensation", amount: 7000 },
        { label: "Truck maintenance", amount: 4710 },
        { label: "Building gas", amount: 3387 },
      ],
      linesNote: "The largest lines in the department's spending.",
      capital: {
        title: "Department spending, by year",
        lines: [
          { label: "FY2027, proposed", amount: 70000 },
          { label: "FY2026, budget", amount: 82094 },
          { label: "FY2025, actual", amount: 56242 },
          { label: "FY2025, budget", amount: 49500 },
        ],
        note: "Fiscal years July to June.",
      },
      source: "r2025b",
    },
    residents: [
      { label: "Join", href: `${TUN}/fire-department/`, text: "Contact any officer or come to the station on a Thursday evening." },
    ],
    sources: {
      dept: { label: "Town of Tunbridge, Fire Department", href: `${TUN}/fire-department/` },
      r2025: { label: "Town of Tunbridge, 2025 Town Report", href: `${TUN}/wp-content/uploads/2026/02/2025-town-report-tunbridge-vt.pdf`, note: "Fire Department report, PDF page 48" },
      r2025b: { label: "Town of Tunbridge, 2025 Town Report: fire budget", href: `${TUN}/wp-content/uploads/2026/02/2025-town-report-tunbridge-vt.pdf`, note: "Fire department budget and fund balances, PDF pages 48–49" },
    },
  },
  strafford: {
    description:
      "Strafford Fire & Rescue: the volunteer fire department and FAST Squad of the Strafford Firemen's Association, " +
      "85 calls in 2025, a grant-funded cardiac monitor, and its spending line by line.",
    facts: [
      ["Run by", "The Strafford Firemen's Association, which elects the fire chief"],
      ["Services", "Fire, and first-aid response through the FAST Squad"],
      ["Chief", "Aaron Dotter; EMS chief John Lloyd"],
      ["Spending", "$79,919 in 2025, against a budget of $74,025"],
    ],
    contact: { chief: "Aaron Dotter", website: `${STR}/emergency-services`, source: "r2025" },
    history: {
      intro:
        "Strafford's volunteers provide fire protection and first-aid response. The town keeps a fire truck fund, which " +
        "carries the loan for the department's 2019 International engine.",
      events: [
        { year: 2019, text: "The department's International 4400 fire truck is bought, financed with a $288,806 loan.", source: "r2025b" },
        { year: 2025, calls: 85, text: "Fire and FAST Squad calls combined, in keeping with recent years. With a Mascoma Bank grant the squad buys a used cardiac monitor for $7,500, where a new one would cost over $30,000. Two members take the Vermont Fire Academy's Firefighter I/II course.", source: "r2025" },
      ],
    },
    money: {
      intro: "Dispatch is the department's largest single cost.",
      year: "2025, actual",
      lines: [
        { label: "Dispatch", amount: 19671 },
        { label: "Insurance", amount: 12942 },
        { label: "Utilities", amount: 10847 },
        { label: "Equipment purchase and maintenance", amount: 9722 },
        { label: "Vehicle repairs", amount: 9649 },
        { label: "EMS supplies", amount: 8078 },
      ],
      linesNote: "The largest lines in the department's 2025 report.",
      capital: {
        title: "Department spending, 2025",
        lines: [
          { label: "Actual", amount: 79919 },
          { label: "Budget", amount: 74025 },
        ],
        note: "EMS supplies include the cardiac monitor.",
      },
      source: "r2025",
    },
    residents: [
      { label: "Burn permits", href: `${STR}/fire-warden`, text: "Free, from the town fire warden, usually within 24 hours." },
      { label: "Contact", href: `${STR}/emergency-services`, text: "Non-emergency questions by email to the chief; dial 911 for emergencies." },
    ],
    sources: {
      dept: { label: "Town of Strafford, Emergency Services", href: `${STR}/emergency-services` },
      r2025: { label: "Town of Strafford, 2025 Town Report", href: `${STR}/_files/ugd/0580b2_de7d1acc95e948dcbd8d8e838fc753b3.pdf`, note: "Strafford Fire and Rescue report and budget, PDF pages 127–128; town officers, PDF page 7" },
      r2025b: { label: "Town of Strafford, 2025 Town Report: fire truck fund", href: `${STR}/_files/ugd/0580b2_de7d1acc95e948dcbd8d8e838fc753b3.pdf`, note: "Loan schedule, PDF pages 101–107" },
    },
  },
  williamstown: {
    description:
      "Williamstown Fire Department: a town department at the Public Safety Building on Meadow Street, 155 calls in " +
      "fiscal 2025, a refurbished Engine 1, a FAST Squad since 2024, and 12 Pro-Board firefighters.",
    subtitle: "Williamstown Fire Department",
    facts: [
      ["Station", "Public Safety Building, Meadow Street"],
      ["Apparatus", "Three engines and a tanker, including an HME 1,000-gallon rescue pumper"],
      ["Chief", "William Graham, since January 2015"],
      ["Certified", "12 firefighters with Pro-Board Firefighter I certification"],
    ],
    contact: { chief: "William Graham", phone: "802-433-5907", website: `${WMT}/fire-department/`, source: "dept" },
    history: {
      intro:
        "Williamstown's department is sanctioned by the selectboard and shares the Public Safety Building with the " +
        "town's FAST Squad, which began answering medical calls in April 2024.",
      events: [
        { year: 2015, text: "William Graham, a volunteer since 2008, becomes chief.", source: "dept" },
        { year: 2024, text: "The FAST Squad is established.", source: "r2025" },
        { year: 2025, calls: 155, text: "Calls in the fiscal year to June. Engine 1, built in 1996, returns after a year-long refurbishment by Har-Rob Fire Apparatus, for a little over $300,000 against $800,000 to $1 million for a new truck. Assistant Chief Norwood Southworth retires after 27 years, and Tanker 1 is dedicated to him. Three new firefighters join.", source: "r2025" },
      ],
    },
    residents: [
      { label: "Burn permits", href: `${WMT}/fire-department/`, text: "From the fire warden, with 24 hours' notice." },
      { label: "Join", href: `${WMT}/fire-department/`, text: "An application is on the town's fire department page." },
    ],
    sources: {
      dept: { label: "Town of Williamstown, Fire Department", href: `${WMT}/fire-department/` },
      r2025: { label: "Town of Williamstown, 2025 Town Report", href: `${WMT}/wp-content/uploads/2026/02/2025-town-report-williamstown-vt.pdf`, note: "Fire Department and FAST Squad reports, PDF pages 38–39. A scanned report, read with text recognition" },
    },
  },
  putney: {
    description:
      "Putney Fire and Rescue: the town's fire and EMS department since 1903, 564 requests for service by type, " +
      "its apparatus, the 2006 fire station and the fire and EMS budgets.",
    facts: [
      ["Serving Putney", "Since 1903"],
      ["Run by", "The Town of Putney: a municipal fire and EMS department"],
      ["Responders", "35, plus 3 junior members (fiscal 2026 plan)"],
      ["Station", "21 Carl Snyder Drive, built 2006"],
      ["Requests for service", "An average of 529 a year"],
    ],
    contact: { chief: "Brian Harlow (interim)", phone: "802-387-4372", website: `${PUT}/departments/fire.php`, source: "dept" },
    history: {
      intro:
        "Putney's department answers fires, alarms, storms and medical calls; its first responders handle medical " +
        "emergencies and Rescue Inc. provides the ambulance. The department was reorganised in 2024 under an " +
        "interim chief, and a town advisory committee has been studying its long-term model.",
      events: [
        { year: 1903, text: "The department's own page dates its service to Putney from 1903.", source: "dept" },
        { year: 2006, text: "The present fire station is built on Carl Snyder Drive.", source: "r2024" },
        { year: 2024, calls: 564, text: "Requests for service from July 2023 to 3 April 2024, a shortened year: members also logged over 5,114 hours of training, maintenance and public education. Brian Harlow becomes interim chief; fire service resumes on 25 May and EMS on 24 July.", source: "r2024" },
        { year: 2025, text: "A new cardiac monitor and defibrillator, helped by a $10,000 gift from the Putney Volunteer Firefighters Association. Plans for fiscal 2026 include finishing the fire house's second floor and planning Engine 1's replacement.", source: "fy26" },
      ],
    },
    calls: {
      intro: "Medical calls were nearly half of all requests in 2023–24.",
      byType: {
        title: "Requests for service by type, July 2023 – April 2024",
        bars: [
          { label: "Emergency medical", value: 265 },
          { label: "Alarm activation", value: 77 },
          { label: "Public assist", value: 67 },
          { label: "Fire", value: 40 },
          { label: "Mutual aid given", value: 35 },
          { label: "Hazardous materials", value: 29 },
          { label: "Good intent", value: 28 },
          { label: "Storm event", value: 14 },
          { label: "Special incident", value: 9 },
        ],
        note: "1 July 2023 to 3 April 2024; the types add up to the 564 requests reported.",
        source: "r2024",
      },
      byUnit: {
        title: "Apparatus, by model year",
        bars: [
          { label: "Engine 3", value: 1999, sub: "E-One" },
          { label: "Engine 1", value: 2006, sub: "E-One pumper" },
          { label: "Ladder truck", value: 1994 },
          { label: "Rescue", value: 2004, sub: "Ford" },
          { label: "Squad 1", value: 2019, sub: "Fire rescue vehicle" },
        ],
        note: "Model years from the town's capital asset schedule, which also lists three pickups (2009 Ford F350, 2016 and 2019 Chevrolet Silverado) and a 2017 Polaris ATV.",
        source: "r2024",
      },
    },
    money: {
      intro: "Fire and EMS are paid for in the town budget. For fiscal 2026 the town split EMS into its own section.",
      year: "fiscal year 2026 (proposed)",
      lines: [
        { label: "Fire on-call pay", amount: 32500 },
        { label: "Fire training", amount: 15000 },
        { label: "Equipment and supplies", amount: 5500 },
        { label: "Radio", amount: 5000 },
        { label: "Medical exams", amount: 3500 },
        { label: "Special detail", amount: 3500 },
        { label: "Fire prevention", amount: 2500 },
      ],
      linesNote: "Firefighting, $67,500 in all. Fire station maintenance is a further $42,200.",
      capital: {
        title: "EMS, fiscal year 2026 (proposed)",
        lines: [
          { label: "EMS on-call pay", amount: 42500 },
          { label: "EMS training", amount: 20000 },
          { label: "EMS equipment", amount: 10000 },
        ],
        note: "$72,500 in all. The Rescue Inc. ambulance contract is $64,771.",
      },
      source: "r2024",
    },
    residents: [
      { label: "Burn permits", href: `${PUT}/departments/fire.php`, text: "Call the department's non-emergency line, 802-387-4372." },
      { label: "Fire and Rescue Advisory Committee", href: `${PUT}/government/boards_and_committees/fire_and_rescue_advisory_committee.php`, text: "The committee's reports on the department's future model." },
    ],
    sources: {
      dept: { label: "Town of Putney, Fire Department", href: `${PUT}/departments/fire.php` },
      r2024: { label: "Town of Putney, 2024 Annual Town Report", href: `${PUTR}/2024%20Putney%20Annual%20Town%20Report%20Final.pdf`, note: "Fire and EMS report, PDF pages 15–16; budget, pages 35–38; capital assets, page 46" },
      fy26: { label: "Town of Putney, FY26 Town Report Supplement", href: `${PUTR}/Town%20Report%20Sup/FY26%20Supplement%20FINAL.pdf`, note: "Fire department objectives, PDF pages 34–35" },
    },
  },
  dummerston: {
    description:
      "West Dummerston Volunteer Fire Department: all-volunteer since 1950, two stations, 239 calls by type, " +
      "the 2017 Center Station, budgets and how to join.",
    facts: [
      ["Founded", "1950, 100% volunteer"],
      ["Members", "About 20, on fire, rescue or both, plus an auxiliary"],
      ["Stations", "2: Center Station (built 2017) and West Station"],
      ["Calls", "239 (December 2022 – November 2023)"],
      ["Chief", "Larry Pratt Jr., elected October 2023"],
    ],
    contact: { chief: "Larry Pratt Jr.", phone: "802-579-9494", source: "r2023" },
    history: {
      intro:
        "A nonprofit volunteer department serving Dummerston and, through mutual aid, its neighbours. Its members " +
        "carry pagers around the clock, and its rescue side answers medical calls alongside the fire side.",
      events: [
        { year: 1950, text: "The West Dummerston Volunteer Fire Department is founded.", source: "r2023" },
        { year: 2017, text: "The new Center Station is built after a fundraising drive led by Chief Rick Looman.", source: "r2023" },
        { year: 2022, calls: 264, text: "A record year for calls.", source: "r2023" },
        { year: 2023, calls: 239, text: "Calls from December 2022 to November 2023, including a record 38 crashes. Larry Pratt Jr. is elected chief in October, and seven members take two days of emergency medical training in December. A new partnership with Dummerston Cares installs smoke detectors in homes.", source: "r2023" },
      ],
    },
    calls: {
      intro: "Medical calls were well over half the total.",
      byType: {
        title: "Calls by type, December 2022 – November 2023",
        bars: [
          { label: "Medical", value: 138 },
          { label: "Motor vehicle crashes", value: 38 },
          { label: "Trees and wires", value: 22 },
          { label: "Mutual aid given", value: 22 },
          { label: "Automatic fire alarms", value: 11 },
          { label: "Carbon monoxide", value: 4 },
          { label: "Brush and illegal burns", value: 2 },
          { label: "Chimney fire", value: 1 },
          { label: "Structure fire", value: 1 },
        ],
        note: "The types add up to the 239 calls reported. Mutual aid was received 4 times.",
        source: "r2023",
      },
    },
    money: {
      intro: "The town pays most of the department's operating budget; fundraisers, a golf tournament and an annual fund drive among them, cover much of the rest.",
      year: "fiscal year 2024–25 (proposed)",
      lines: [
        { label: "Town appropriation to the department", amount: 101968 },
        { label: "Mutual aid assessment", amount: 33500 },
        { label: "Insurance", amount: 13195 },
      ],
      linesNote: "The department's proposed budget is $154,748 of income in all; the mutual aid and insurance lines are its two largest costs.",
      capital: {
        title: "Fundraising, fiscal year 2022–23 (actual)",
        lines: [
          { label: "Golf tournament", amount: 23395 },
          { label: "Fund drive", amount: 18572.75 },
          { label: "Pancake breakfast", amount: 4545 },
          { label: "Barbecue", amount: 3216.5 },
        ],
        note: "From the department's operating budget printed in the town report.",
      },
      source: "r2023",
    },
    careers: {
      intro: "New volunteers are welcome on the fire or rescue side, and non-responding auxiliary members help with bookkeeping, fundraising and events.",
      points: [
        "Fire volunteers typically complete the 184-hour State Fire Academy course, then several dozen hours a year of continuing education",
        "Rescue volunteers complete similar training and keep their certifications each year",
        "Drop by a station on a Tuesday evening, or call Chief Pratt",
      ],
      applyUrl: DUM,
      source: "r2023",
    },
    residents: [
      { label: "Smoke detectors", href: DUM, text: "Installed in homes around town through the department's partnership with Dummerston Cares." },
    ],
    sources: {
      r2023: { label: "Town of Dummerston, 2023 Town Report", href: DUM, note: "Fire department report, PDF pages 53–56; town fire budget, page 37" },
    },
  },
  grafton: {
    description:
      "Grafton Volunteer Fire Department: a hundred years of service since 1924, 49 emergency calls, " +
      "its engine and 75-foot ladder, the Stanley Mack firehouse and coverage of Athens.",
    facts: [
      ["Founded", "1924, approved at Town Meeting"],
      ["Members", "18 active volunteers"],
      ["Covers", "Grafton, and Athens by contract"],
      ["Apparatus", "58 Engine One (2015 Pierce) and 58 Ladder One (2002 American LaFrance, 75 ft aerial)"],
      ["Calls", "A three-year average of 53 a year"],
    ],
    contact: { chief: "Robbie Sprague", phone: "802-843-2401", website: `${GRA}/?p=146`, source: "town" },
    history: {
      intro:
        "Grafton's fire company and its Rescue Squad are separate volunteer organisations that share members and " +
        "the firehouse east of the village. Both cover Athens by contract and raise most of their own operating money.",
      events: [
        { year: 1847, text: "Newspapers report firefighting efforts in Grafton.", source: "town" },
        { year: 1924, text: "The Grafton Fire Company is officially approved at Town Meeting. Its first fundraiser is a square dance.", source: "town" },
        { year: 1925, text: "A garage on Kidder Hill Road houses a hand-drawn pumper, built around 1830, and a hand-drawn chemical tank; both are now at the Grafton Historical Society.", source: "town" },
        { year: 1933, text: "The first motorised fire truck: a converted Cadillac touring car.", source: "town" },
        { year: 1938, text: "The old schoolhouse on Main Street becomes the firehouse.", source: "town" },
        { year: 1981, text: "The Fire and Rescue Auxiliary holds its first October tag sale for the department.", source: "town" },
        { year: 1992, text: "The present firehouse on Route 121 East opens, named for longtime Chief Stanley Mack.", source: "town" },
        { year: 2024, calls: 49, text: "Emergency calls in the fiscal year to June: 34 in Grafton, 10 in Athens and 5 mutual aid. A grant buys a brush insert for the UTV. The department marks 100 years with a community square dance.", source: "r2024" },
      ],
    },
    stationNotes: {
      "grafton-711-route-121-e": {
        text: "The firehouse, built in 1992 and named for Chief Stanley Mack, shared with the Grafton Rescue Squad.",
        source: "town",
      },
    },
    careers: {
      intro: "New members may join at any time. The company is headed by a chief, assistant chief, captain and two lieutenants, under the Grafton Firefighters Association.",
      points: [
        "In-house training monthly, at 7 pm on the third Wednesday: a good time to come and learn more",
        "Monthly training with other West River area departments",
      ],
      applyUrl: `${GRA}/?p=146`,
      source: "town",
    },
    residents: [
      { label: "Burn permits", href: `${GRA}/?p=146`, text: "From the forest fire warden; 63 were issued in 2024." },
      { label: "Fire and Rescue tag sale", href: `${GRA}/?p=146`, text: "Every October since 1981, run by the auxiliary." },
    ],
    sources: {
      town: { label: "Town of Grafton, Fire and Rescue", href: `${GRA}/?p=146` },
      r2024: { label: "Town of Grafton, 2024 Town Report", href: `${GRA}/wp-content/uploads/2025/01/Town-Report-2024-Digital-2025.pdf`, note: "Fire Department annual report, PDF page 48; permits, page 35" },
    },
  },
  townshend: {
    description:
      "Townshend Fire Department: volunteers working from a 1952 firehouse beside Grace Cottage Hospital, " +
      "a new pumper due in 2026, fire ponds, budgets and how to join.",
    facts: [
      ["Run by", "Townshend Volunteer Fire Association, Inc.; the town owns the firehouse and vehicles"],
      ["Station", "208 Grafton Road, built 1952"],
      ["Apparatus", "Engines 1, 2 and 4, Brush 1 and 2, Utility 1 and an ATV"],
      ["Meets", "Business meeting 2nd Thursday, 7 pm; work detail 4th Monday, 6 pm"],
    ],
    contact: { phone: "802-365-4017", website: TSH, source: "dept" },
    history: {
      intro:
        "Most of Townshend's calls are crashes, DHART helicopter landings at Grace Cottage Hospital, and assists " +
        "for odors, alarms and people needing help. The department also builds and tests the town's fire ponds.",
      events: [
        { year: 1952, text: "The Townshend fire house is built.", source: "house" },
        { year: 2018, text: "A truck committee forms to replace a 32-year-old engine, and finds a standard chassis will not fit the old station; a building committee follows.", source: "house" },
        { year: 2025, text: "Another fire pond is established with the Trousdell family, and every pond in town is tested. A second brush truck is bought by bid from the Town of Bradford.", source: "r2026" },
        { year: 2026, text: "A new pumper, ordered three years earlier, is due by September.", source: "r2026" },
      ],
    },
    money: {
      intro: "The town's budget carries the fire house and fire vehicles; voters also put money aside for a truck and for fire ponds.",
      year: "fiscal year 2027 (proposed)",
      lines: [
        { label: "Mutual aid district dues", amount: 25000 },
        { label: "Fire house equipment", amount: 10000 },
        { label: "Communications", amount: 6000 },
        { label: "Fuel oil", amount: 5000 },
        { label: "Fire house repair", amount: 2000 },
      ],
      linesNote: "Fire house and department, $52,900 in all; fire vehicles are a further $8,800.",
      capital: {
        title: "Reserves asked of voters, 2026 warning",
        lines: [
          { label: "Fire truck capital fund, toward a future pumper", amount: 20000 },
          { label: "Fire department reserve, for vehicle repair", amount: 15000 },
          { label: "Fire pond reserve", amount: 4000 },
        ],
        note: "Articles XIII to XV of the town meeting warning.",
      },
      source: "r2026",
    },
    careers: {
      intro: "The department provides all equipment and training. Like most volunteer departments, it is always looking for members.",
      points: [
        "Training in-house or through the West River Training Group, with support for formal courses such as Firefighter I",
        "Two meetings a month plus training",
      ],
      applyUrl: `${TSH}/join-our-team`,
      source: "join",
    },
    residents: [
      { label: "Burn permits", href: `${TSH}/obtain-burn-permit`, text: "From the town clerk or the fire warden; call mutual aid dispatch, 603-352-1291, before burning." },
      { label: "Fire ponds", href: TSHR, text: "Know of a good spot for a pond? Tell any officer." },
    ],
    sources: {
      dept: { label: "Townshend Fire Department", href: TSH },
      house: { label: "Townshend Fire Department, Fire House", href: `${TSH}/fire-house` },
      join: { label: "Townshend Fire Department, Join our team", href: `${TSH}/join-our-team` },
      r2026: { label: "Town of Townshend, 2026 Town Report", href: TSHR, note: "Fire Department report, PDF page 36; budget, pages 15–16; warning, page 5" },
    },
  },
  jamaica: {
    description:
      "Jamaica Volunteer Fire & Rescue: a 14-member fire and rescue squad, 148 calls in 2024, " +
      "over 3,000 volunteer hours and a $110,000 operating budget.",
    facts: [
      ["Members", "14 volunteers, five of them new in 2024"],
      ["Calls", "148 in 2024, about 60% medical"],
      ["Operating budget", "About $110,000, mostly from the town"],
      ["Chief", "Scott Gordon"],
    ],
    history: {
      intro:
        "A combined fire and rescue squad answering medical emergencies, fires, crashes and wellness checks, " +
        "and giving mutual aid to neighbouring towns.",
      events: [
        { year: 2024, calls: 148, text: "Over 3,000 volunteer hours. Two members certify as Emergency Medical Responders and two begin Firefighter 1. The squad replaces gas-powered tools with a cordless battery system, new lights, fans, heaters and chainsaws, and puts new furnaces in the truck bays.", source: "r2024" },
      ],
    },
    money: {
      intro: "The operating budget is financed largely by the town of Jamaica.",
      year: "2024, as described by the department",
      lines: [
        { label: "Regional dispatch membership", amount: 23700 },
        { label: "Fire department building", amount: 20000 },
        { label: "Equipment maintenance", amount: 17000 },
        { label: "Insurance", amount: 10000 },
      ],
      linesNote: "Of a $110,000 operating budget; the department notes little is left to replace worn-out equipment.",
      capital: { title: "Town appropriation", lines: [{ label: "Fiscal 2025–26 (proposed)", amount: 109725 }], note: "The same as the amount voted for 2024–25." },
      source: "r2024",
    },
    residents: [
      { label: "Community events", href: JAM, text: "Santa lands at the fire station each year; the squad joins Jamaica Day and Halloween." },
    ],
    sources: {
      r2024: { label: "Town of Jamaica, 2024 Annual Report", href: JAM, note: "Jamaica Volunteer Fire & Rescue letter, PDF page 31; budget, page 16" },
    },
  },
  greensboro: {
    description:
      "Greensboro Volunteer Fire Department: first response for Greensboro and Stannard, 44 calls by type, " +
      "a new E-One engine, the firehouse loan and the fire budget.",
    facts: [
      ["Covers", "Greensboro and Stannard"],
      ["Calls", "44 in fiscal 2025; 43 in fiscal 2024"],
      ["Mutual aid", "Given 14 times, received twice (fiscal 2025)"],
      ["Station", "765 Breezy Avenue"],
      ["Fire budget", "$66,139.50 proposed for fiscal 2027"],
    ],
    contact: { chief: "Dave Brochu Jr.", website: `${GRB}/government/contact/`, source: "contact" },
    history: {
      intro:
        "Greensboro's volunteers are first response for a wide range of 911 calls, from structure fires to " +
        "assists for Hardwick Rescue, and work closely with Hardwick and their other mutual aid partners.",
      events: [
        { year: 2024, calls: 43, text: "Calls in the fiscal year to June. After the July 2023 flooding, the department helps clear culverts and report road closures.", source: "r2025" },
        { year: 2025, calls: 44, text: "Calls in the fiscal year to June, 3 of them in Stannard. A new E-One truck is bought, financed over 10 years.", source: "r2026" },
      ],
    },
    calls: {
      intro: "Cancelled dispatches, crashes and structure fires led fiscal 2025.",
      byType: {
        title: "Calls by type, July 2024 – June 2025",
        bars: [
          { label: "Dispatched but cancelled", value: 9 },
          { label: "Car accidents", value: 8 },
          { label: "Structure fires", value: 7 },
          { label: "Hardwick Rescue assists", value: 6 },
          { label: "False alarms and detector faults", value: 4 },
          { label: "Car fires", value: 2 },
          { label: "Electrical wiring", value: 2 },
          { label: "Smoke or odor removal", value: 1 },
          { label: "Propane or flammable liquid", value: 1 },
          { label: "Water or steam leak", value: 1 },
          { label: "Cell phone 911 activation", value: 1 },
          { label: "CO alarm", value: 1 },
          { label: "Grass fire", value: 1 },
        ],
        note: "The types add up to the 44 calls reported.",
        source: "r2026",
      },
    },
    money: {
      intro: "The fire department is a line in the town budget; its building and trucks are in the town's capital plan.",
      year: "fiscal year 2027 (proposed)",
      lines: [
        { label: "Payroll", amount: 13000 },
        { label: "New equipment", amount: 13000 },
        { label: "Dispatch", amount: 7600 },
        { label: "Property and casualty insurance", amount: 7025 },
        { label: "Equipment repairs", amount: 5000 },
        { label: "Truck repair", amount: 4000 },
        { label: "Heating fuel", amount: 3000 },
      ],
      linesNote: "The largest lines of $66,139.50 in all, 3.15% less than fiscal 2026.",
      capital: {
        title: "Capital plan",
        lines: [
          { label: "Firehouse roof, 2029", amount: 100000 },
          { label: "Engine #1 replacement, fiscal 2030", amount: 830000 },
        ],
        note: "The firehouse's 20-year loan is paid off in fiscal 2029. Engine #1 is nearly 25 years old; its replacement would be financed over 10 years.",
      },
      source: "r2026",
    },
    residents: [
      { label: "911 address signs", href: `${GRB}/government/contact/`, text: "The department's sign program for Greensboro and Stannard homes." },
      { label: "Fireworks permits", href: `${GRB}/government/contact/`, text: "From the fire department; burn permits come from the forest fire warden." },
    ],
    sources: {
      contact: { label: "Town of Greensboro, Contact", href: `${GRB}/government/contact/` },
      r2026: { label: "Town of Greensboro, 2026 Town Report", href: `${GRBR}/2026-Town-Report.pdf`, note: "Fire Department report for FY 2025, PDF page 45; budget, page 17; capital plan, pages 21–22" },
      r2025: { label: "Town of Greensboro, 2025 Town Report", href: `${GRBR}/2025-Town-Report.pdf`, note: "Fire Department report for FY 2024, PDF pages 37–38. A scanned report, read with text recognition" },
    },
  },
  charleston: {
    description:
      "Charleston Volunteer Fire Department: 70 years of unpaid volunteers serving Charleston and Morgan, " +
      "45 calls in 2024, 26 members, a new tracked Argo and the oyster supper.",
    facts: [
      ["Covers", "Charleston and Morgan"],
      ["Members", "26 regular members, all unpaid"],
      ["Calls", "45 in 2024; 29 in 2023"],
      ["Town appropriation", "$55,609, level for 2025"],
    ],
    contact: { phone: "802-723-5029", source: "r2023" },
    history: {
      intro:
        "No member is paid for their time; every dollar the department receives goes to running it. Calls " +
        "include structure and chimney fires, ambulance assists, crashes, alarms and mutual aid.",
      events: [
        { year: 2023, calls: 29, text: "The department's 69th year. Membership rises to 26 regular and 2 junior members, and the August barbecue and October oyster supper both set records.", source: "r2023" },
        { year: 2024, calls: 45, text: "The 70th year. A tracked, eight-wheeled Argo joins the fleet for back-country rescue, ice rescue and brush fires.", source: "r2024" },
        { year: 2025, text: "The oyster supper returns, to be held at the fire station from now on.", source: "r2024" },
      ],
    },
    calls: {
      intro: "Calls rose by more than half from 2023 to 2024.",
      byYear: {
        title: "Emergency calls by year",
        bars: [
          { label: "2023", value: 29 },
          { label: "2024", value: 45 },
        ],
        note: "Calendar years, from the department's reports to the town.",
        source: "r2024",
      },
    },
    residents: [
      { label: "Oyster supper", href: `${CHA}/2025/02/2024CharlestonTownReport-1-27-Final.pdf`, text: "The department's October fundraiser, at the fire station." },
    ],
    sources: {
      r2023: { label: "Town of Charleston, 2023 Town Report", href: `${CHA}/2024/02/2023CharlestonTownReportFINALReduced.pdf`, note: "Fire department report, PDF page 41" },
      r2024: { label: "Town of Charleston, 2024 Town Report", href: `${CHA}/2025/02/2024CharlestonTownReport-1-27-Final.pdf`, note: "Fire department report, PDF page 40. A scanned page, read with text recognition" },
    },
  },
  "newport-town": {
    description:
      "Newport Center Volunteer Fire Department: 23 volunteers serving the Town of Newport, a new fire pond " +
      "with dry hydrants, the town appropriation and the equipment fund.",
    facts: [
      ["Members", "23: six officers and 17 firefighters (2024)"],
      ["Chief", "Jason Willis"],
      ["Training", "At least once a month"],
      ["Town appropriation", "$45,000 requested for 2025, plus $30,000 for the equipment fund"],
    ],
    contact: { chief: "Jason Willis", source: "r2024" },
    history: {
      intro:
        "The Town of Newport's volunteer department, separate from the City of Newport's. It trains at least " +
        "monthly and raises money through a July chicken barbecue and a year-long raffle.",
      events: [
        { year: 2024, text: "The town's new fire pond, with dry hydrants, proves itself at a business fire off Vance Hill, where tankers shuttle water and the scene never runs out, and again at a structure fire on Route 100 in the fall. The department adds a breakfast with Santa in December.", source: "r2024" },
      ],
    },
    money: {
      intro: "The town appropriates money each year for operations and dispatch, and a separate sum for an equipment and vehicle reserve.",
      year: "2025 (requested)",
      lines: [
        { label: "General", amount: 41081.53 },
        { label: "Dispatching", amount: 3918.47 },
      ],
      linesNote: "$45,000 in all, up $4,321.87 from the $40,678.13 approved for 2024.",
      capital: {
        title: "Equipment fund, 2024",
        lines: [
          { label: "Town deposit", amount: 30000 },
          { label: "SCBA gear", amount: 7487.19 },
          { label: "Protective gear", amount: 6707.5 },
        ],
        note: "The deposit and the two purchases made from the fund in 2024; voters are asked for another $30,000 for 2025.",
      },
      source: "r2024",
    },
    residents: [
      { label: "Breakfast with Santa", href: NWT, text: "Added in December 2024, alongside the July chicken barbecue." },
    ],
    sources: {
      r2024: { label: "Town of Newport, 2024 Annual Report", href: NWT, note: "Newport Center Volunteer Fire Department report, PDF pages 27–28; warning, page 8" },
    },
  },
  tinmouth: {
    description:
      "Tinmouth Volunteer Fire Department: formed in 1967, over twenty volunteers, a firehouse on the site of the " +
      "old church, two pumper tankers, the Wild Game Supper and the department's finances.",
    facts: [
      ["Founded", "1967"],
      ["Members", "Over twenty active volunteers"],
      ["Apparatus", "Two pumper tankers, a tanker pickup for wildland fires and a utility truck"],
      ["Meets", "First Thursday of the month, at the fire house"],
      ["Mutual aid", "Automatic, with Danby"],
    ],
    contact: { chief: "Marshall Squier", phone: "802-446-2460", website: TIN, source: "dept" },
    history: {
      intro:
        "Tinmouth's volunteers answer structure, wildland and chimney fires, crashes and entrapments, and support " +
        "law enforcement and area rescue squads. If 9-1-1 is down, someone is at the fire station on 802-446-2460.",
      events: [
        { year: 1967, text: "The department is formed. Its first truck is an old 750-gallon oil truck with a portable pump; its first pumper, a 1947 model, came from Connecticut.", source: "dept" },
        { year: 1969, text: "The Community Church burns on the corner of Route 140 and Mountain View Road. The church is rebuilt on the green across the road, and in the 1970s a new firehouse goes up where it stood; the old Grange building, the first firehouse, becomes the \"Old Firehouse\".", source: "dept" },
        { year: 1998, text: "The firehouse gets a small addition and a new shell.", source: "dept" },
        { year: 2025, text: "A hard start to the year, with several structure fires in Danby. Two grants, for wildland fire gear and a gear washing station, and a Tinmouth Community Fund grant for a commercial warming oven. The department joins a statewide emergency management drill.", source: "r2025" },
      ],
    },
    money: {
      intro: "The department is a nonprofit with its own books; the town gives it $25,000 a year, and the supper, raffle and tag sale bring in much of the rest.",
      year: "the year to 30 September 2025",
      lines: [
        { label: "Town allotment", amount: 25000 },
        { label: "Game supper", amount: 6270 },
        { label: "Donations", amount: 5594 },
        { label: "Tag sale", amount: 4926 },
        { label: "Interest", amount: 4563 },
        { label: "Raffle", amount: 4015 },
      ],
      linesNote: "Income of $51,262 in all; spending was $31,253, the largest share ($10,755) on small tools.",
      capital: {
        title: "Fund balances, 30 September 2025",
        lines: [
          { label: "Truck fund (restricted)", amount: 80000 },
          { label: "Unrestricted", amount: 90781 },
        ],
        note: "The truck fund held $70,000 a year earlier. In 2024 the department spent $29,520 on building improvements, helped by $25,000 of the town's ARPA money.",
      },
      source: "r2025",
    },
    careers: {
      intro: "Anyone interested in joining is welcome at a meeting, or can talk to any member.",
      points: ["Meetings on the first Thursday of the month at 7 pm, at the fire house"],
      applyUrl: TIN,
      source: "dept",
    },
    residents: [
      { label: "Wild Game Supper", href: TIN, text: "The department's big fundraiser, the Saturday before Thanksgiving at the Community Center." },
      { label: "Burn permits", href: TINR, text: "Needed unless there is snow on the ground; from the fire warden or the town's permit administrator." },
    ],
    sources: {
      dept: { label: "Town of Tinmouth, Volunteer Fire Department", href: TIN },
      r2025: { label: "Town of Tinmouth, 2025 Town Report", href: TINR, note: "Volunteer Fire Department report and finances, PDF pages 23–25" },
    },
  },
  ira: {
    description:
      "Ira Volunteer Fire Department: 20 calls by type in 2025, a 1993 tanker bought from Clarendon, " +
      "plans for a new station, and a truck fund built up year by year.",
    facts: [
      ["Calls", "20 in 2025"],
      ["Members", "14, including officers, a mechanic and the board"],
      ["Chief", "Dan Perry"],
      ["New station", "Proposed; options under review with state fire safety officials"],
    ],
    contact: { chief: "Dan Perry", source: "r2025" },
    history: {
      intro:
        "A small incorporated volunteer department with its own board, always looking for firefighters, helpers " +
        "and grant writers.",
      events: [
        { year: 2025, calls: 20, text: "Seven of the calls are crashes. The department buys a 1993 International tanker from Clarendon Volunteer Fire Department for $5,000 and spends $10,000 from its truck fund to equip it; Clarendon houses it free at the Chippenhook station. A probationary firefighter joins.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Crashes and medical calls made up more than half of 2025's calls.",
      byType: {
        title: "Calls by type, 2025",
        bars: [
          { label: "Motor vehicle accidents", value: 7 },
          { label: "Medical", value: 5 },
          { label: "Mutual aid", value: 2 },
          { label: "Wildland fires", value: 2 },
          { label: "Structure fire", value: 1 },
          { label: "Unpermitted burn", value: 1 },
          { label: "Carbon monoxide", value: 1 },
          { label: "Lost hiker", value: 1 },
        ],
        note: "The types add up to the 20 calls reported.",
        source: "r2025",
      },
    },
    residents: [
      { label: "Join", href: "https://townofira.com/activities-organizations", text: "Contact the chief; the department welcomes firefighters, helpers and grant writers." },
    ],
    sources: {
      r2025: { label: "Town of Ira, 2025 Town Report", href: IRAR, note: "Ira Volunteer Fire Department report, PDF page 16. A scanned report, read with text recognition" },
    },
  },
  pittsfield: {
    description:
      "Pittsfield Volunteer Fire & Rescue: the Eugene E. Martin Memorial Fire House, new vehicle rescue tools, " +
      "first-responder training with White River Valley Ambulance, and the department's funds.",
    facts: [
      ["Station", "Eugene E. Martin Memorial Fire House"],
      ["Chief", "David Colton, an elected two-year office"],
      ["Meets", "2nd Tuesday of the month, 7:30 pm, at the firehouse"],
      ["Ambulance", "White River Valley Ambulance, Bethel"],
    ],
    contact: { chief: "David Colton", website: `${PTF}/emergency-services.html`, source: "dept" },
    history: {
      intro:
        "Pittsfield's volunteers handle fire and vehicle rescue, and assist White River Valley Ambulance's crews " +
        "at medical scenes. With the town's fire fleet modernised, the town now puts smaller sums into reserve.",
      events: [
        { year: 2025, text: "New stabilisation struts and an air-bag lift system for vehicle rescues. Three members take the one-day Vermont First Responder course. The 2008 Ford rescue truck is sold for $35,000, which goes back to the town for a new capital reserve fund. ARPA money buys the department a snowmobile.", source: "r2025" },
      ],
    },
    money: {
      intro: "Pittsfield Volunteer Fire & Rescue has its own fund in the town budget, supported by town taxes and the department's fundraising.",
      year: "2025",
      lines: [
        { label: "Bazaar food and silent auction (profit)", amount: 5580.69 },
        { label: "Annual coin drop", amount: 3913.12 },
      ],
      linesNote: "The department's two fundraisers in 2025.",
      capital: {
        title: "Sale of the 2008 rescue truck",
        lines: [{ label: "Returned to the town as a new capital reserve fund", amount: 35000 }],
        note: "Not earmarked: kept for unexpected building repairs or equipment failures.",
      },
      source: "r2025",
    },
    residents: [
      { label: "Burn permits", href: `${PTF}/emergency-services.html`, text: "From the town fire warden." },
      { label: "Smoke and CO alarms", href: `${PTF}/emergency-services.html`, text: "The department's reminder: change the batteries, and have chimneys cleaned at least once a year." },
    ],
    sources: {
      dept: { label: "Town of Pittsfield, Emergency Services", href: `${PTF}/emergency-services.html` },
      r2025: { label: "Town of Pittsfield, 2025 Town Report", href: `${PTF}/uploads/2/7/3/2/27322481/2025_pittsfield_town_report_final_feb_11.pdf`, note: "Pittsfield Volunteer Fire and Rescue report, PDF page 37" },
    },
  },
  hubbardton: {
    description:
      "Hubbardton Fire Department: 16 volunteers, two stations within five miles of every home, " +
      "a four-bay fire house approved in 2009, and a mutual aid pact with six towns.",
    facts: [
      ["Members", "16 volunteers"],
      ["Stations", "2: Hortonia and West Roads, and Monument Hill Road near the Hubbardton Battlefield"],
      ["Apparatus", "4: three pumpers and a tanker"],
      ["Mutual aid", "Castleton, Fair Haven, Benson, Sudbury, Pittsford and West Rutland"],
    ],
    history: {
      intro:
        "Hubbardton's volunteers work from two stations placed so that every home in town is within five miles " +
        "of one. The department is funded through the town budget, local fundraisers, and the HVFD Boosters, who also bring food and water to firefighters on calls.",
      events: [
        { year: 2009, text: "Residents approve a new four-bay fire house and training facility, with room for four trucks, a dispatch room and a training and meeting room.", source: "plan" },
      ],
    },
    residents: [],
    sources: {
      plan: { label: "Town of Hubbardton, 2024 Town Plan (amended)", href: HUBP, note: "Fire department, page 16" },
    },
  },
  barnet: {
    description:
      "Barnet Fire & Rescue: 172 incidents in 2025, most of them medical, 20 members including EMTs, " +
      "a new brush truck on the way, and the fire and rescue budget line by line.",
    facts: [
      ["Calls", "172 in 2025; 210 in 2024"],
      ["Members", "20: 4 EMTs, 1 VEFR, 4 firefighter/VERs and 9 firefighters, with 2 awaiting EMS training"],
      ["Stations", "Bimson Road and West Barnet"],
      ["Meets", "1st and 3rd Tuesdays of the month, at the station"],
    ],
    contact: { chief: "Ronald L. Morse", website: "https://barnetvt.org/town-information/town-report/", source: "r2025" },
    history: {
      intro:
        "A combined fire and rescue department: in 2025 seven in ten of its incidents were medical, and every " +
        "crash brought both an EMS and a fire response. Volunteers are paid minimum wage for time at fires.",
      events: [
        { year: 2024, calls: 210, text: "A new four-wheel-drive Dodge Ram chassis arrives to replace the 1984 GMC forestry truck.", source: "r2025" },
        { year: 2025, calls: 172, text: "121 medical emergencies, 22 crashes and 29 fire calls. The new chassis goes to the builder in December for an aluminium fire body, due in service for the spring brush fire season. Assistant Chief David Shields, with 50 years of service, is honoured on the cover of the town report.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Medical emergencies made up 70% of 2025's incidents.",
      byType: {
        title: "Incidents by type, 2025",
        bars: [
          { label: "Medical emergencies", value: 121 },
          { label: "Fire-related calls", value: 29 },
          { label: "Motor vehicle accidents", value: 22 },
        ],
        note: "Calendar 2025; the types add up to the 172 incidents reported.",
        source: "r2025",
      },
    },
    money: {
      intro: "Fire & Rescue's operating costs are a line in the town budget; a separate fund saves toward the next fire truck.",
      year: "2025 (actual)",
      lines: [
        { label: "Volunteers' reimbursement", amount: 12278.3 },
        { label: "Equipment and supplies", amount: 11425.37 },
        { label: "Mutual aid dues and dispatching", amount: 5308.44 },
        { label: "Vehicle maintenance", amount: 3110.33 },
        { label: "Insurance claim expense", amount: 1815 },
        { label: "Annual equipment testing", amount: 1780.82 },
        { label: "Rescue squad expenses", amount: 1421.43 },
      ],
      linesNote: "$37,450.83 spent of a $42,000 budget; $41,400 is budgeted for 2026. Mutual aid dues go to Twin State Mutual Aid and Grafton County Sheriff dispatch.",
      capital: {
        title: "Barnet Fire and Rescue association, 2025",
        lines: [
          { label: "Barbecue", amount: 3530 },
          { label: "Donations", amount: 1010 },
          { label: "911 sign sales", amount: 476 },
        ],
        note: "The members' association's own income, $5,042.05 in all.",
      },
      source: "r2025",
    },
    careers: {
      intro: "Barnet Fire & Rescue is always looking for members.",
      points: [
        "Stop by the station on the first or third Tuesday of the month",
        "Or register interest at Makemeafirefighter.org",
      ],
      applyUrl: "https://makemeafirefighter.org/",
      source: "r2025",
    },
    residents: [
      { label: "Burn permits", href: BAR, text: "From the local fire warden. Burning construction or commercial waste also needs a state permit (802-661-8937)." },
      { label: "911 address signs", href: BAR, text: "Sold by the fire and rescue association." },
    ],
    sources: {
      r2025: { label: "Town of Barnet, 2025 Annual Report", href: BAR, note: "Report of Barnet Fire & Rescue, PDF pages 40–41; budget, page 57. Read with text recognition" },
    },
  },
  glover: {
    description:
      "Glover Volunteer Fire Department: 32 calls in 2023, the Barton River flash flood, a new chief, " +
      "donated Jaws of Life, and Turkey BINGO.",
    facts: [
      ["Calls", "32 in 2023"],
      ["Chief", "Job Breitmeyer, since May 2023"],
      ["Governed by", "A board of trustees, as at its founding in 1959"],
      ["Town budget", "$35,000 for the fire department in 2024"],
    ],
    contact: { chief: "Job Breitmeyer", source: "r2023" },
    history: {
      intro: "Glover's volunteers recruit continuously; any member can tell you how to join.",
      events: [
        { year: 1959, text: "The department is founded, governed by a board of trustees.", source: "r2023" },
        { year: 2023, calls: 32, text: "Long-time Chief Allen Matthews retires in May and First Assistant Chief Job Breitmeyer succeeds him. On 10 July the Barton River floods: the department answers 12 locations in three hours, opens an overnight shelter at the fire station and spends days pumping basements. In the fall the bylaws, unchanged since 1999, are revised. The Terry Farrell Fund donates hydraulic Jaws of Life, used a week later to free a crash victim, and Underhill-Jericho Fire Department gives stabilisation jacks.", source: "r2023" },
      ],
    },
    money: {
      intro: "The fire department is funded through the town's emergency services budget.",
      year: "2023 (budget)",
      lines: [
        { label: "Fire department", amount: 27500 },
      ],
      linesNote: "The fire department spent $23,728.70 in 2023; its 2024 budget is $35,000.",
      capital: { title: "Reserve", lines: [{ label: "Fire department reserve fund, 2023", amount: 7500 }], note: "Paid into the reserve in full." },
      source: "r2023",
    },
    residents: [
      { label: "Turkey BINGO", href: GLV, text: "The department's November fundraiser, so popular it borrowed extra tables." },
    ],
    sources: {
      r2023: { label: "Town of Glover, 2023 Annual Report", href: GLV, note: "Glover Fire Department report, PDF page 25; budget, page 11" },
    },
  },
  westmore: {
    description:
      "Westmore Fire & Rescue: the Lake Willoughby department, with boat rescues, a 2025 call log, " +
      "dry hydrants and its 2026 budget request.",
    facts: [
      ["Run by", "Westmore Fireman's Association, Inc."],
      ["Station", "5712 Willoughby Lake Road"],
      ["Calls", "20 logged in 2025"],
      ["Apparatus", "Engine 1, two more vehicles and a rescue boat"],
    ],
    history: {
      intro:
        "Westmore's volunteers cover Lake Willoughby and the mountains around it, so their calls include boats in " +
        "distress and mountain rescues as well as alarms and fires. Glover Ambulance or Lyndon Rescue provides the ambulance, by zone.",
      events: [
        { year: 2025, calls: 20, text: "Two boats in distress on one July day and a sinking pontoon in October; a dog rescued on Mount Pisgah; a rockslide on Route 5A. Members train at the NEIMA fire school in April and in boat operation in September.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Smoke alarms were the most common call in 2025.",
      byType: {
        title: "Calls by type, 2025",
        bars: [
          { label: "Smoke alarms", value: 9 },
          { label: "Fires", value: 5, sub: "Oven, campfire, brush, underground and one at the south end of Willoughby" },
          { label: "Lake: boats in distress or sinking", value: 3 },
          { label: "Mountain rescue", value: 1 },
          { label: "Vehicle rescue", value: 1 },
          { label: "Rockslide", value: 1 },
        ],
        note: "Counted from the department's call log, January to 8 December 2025.",
        source: "r2025",
      },
    },
    money: {
      intro: "The association asks the town for an appropriation each year, and plans to seek about $30,000 more in state and private grants for equipment and apparatus.",
      year: "2026 (requested)",
      lines: [
        { label: "Insurance, vehicle and liability", amount: 8600 },
        { label: "Vehicle replacement matching funds", amount: 7500 },
        { label: "Stipends", amount: 5200 },
        { label: "Dispatch", amount: 3650 },
        { label: "Large washing machine", amount: 3000 },
        { label: "Training", amount: 2860 },
        { label: "Pontoon sled for ice rescue", amount: 2500 },
      ],
      linesNote: "The largest lines of a $44,660 request.",
      capital: {
        title: "Dry hydrants, 2026 (requested)",
        lines: [
          { label: "New dry hydrant at Willoughby South End", amount: 1750 },
          { label: "Servicing, and moving two for better access", amount: 875 },
        ],
        note: "From the same request.",
      },
      source: "r2025",
    },
    residents: [
      { label: "Westmore Fall Festival", href: WSM, text: "The department takes part each October, and lights the town Christmas tree." },
    ],
    sources: {
      r2025: { label: "Town of Westmore, 2025 Annual Report", href: WSM, note: "Westmore Fire & Rescue budget request and call log, PDF pages 43–44" },
    },
  },
  halifax: {
    description:
      "Halifax Fire Company: volunteers who answer medical calls for their neighbours, 97 calls in 2023, " +
      "a new chief after more than 50 years, and the clambake and auction that pay most of the bills.",
    facts: [
      ["Run by", "Halifax Fire Company, Inc."],
      ["Calls", "97 in 2023; 103 in 2022"],
      ["Chief", "Dennis M. Annear, since January 2023"],
      ["Meets", "1st and 3rd Monday evenings, at the station"],
    ],
    contact: { chief: "Dennis M. Annear", source: "r2023" },
    history: {
      intro:
        "The company raises most of its own money through donations, a monthly 50/50 raffle, an annual auction " +
        "and a clambake. It is not a licensed first-response agency, but its members answer medical calls " +
        "\"because you are our neighbors\", and help Whitingham Rescue and Deerfield Valley Ambulance find houses.",
      events: [
        { year: 2021, calls: 70, callsApprox: true, text: "Over 70 calls, 43 of them assisting Rescue and 16 mutual aid. The auction and clambake go well.", source: "r2021" },
        { year: 2022, calls: 103, text: "64 calls assist ambulances; mutual aid is given 18 times and received 7. A bad year for brush fires.", source: "r2022" },
        { year: 2023, calls: 97, text: "Wayne Courser retires after more than 50 years as chief and stays a member. The company elects Dennis Annear, with over 45 years in the fire service, 23 of them as full-time chief in Orange, Massachusetts. The company begins replacing protective gear at two sets a year.", source: "r2023" },
      ],
    },
    calls: {
      intro: "Medical emergencies were the largest share of calls in 2023, followed by mutual aid.",
      byYear: {
        title: "Calls by year",
        bars: [
          { label: "2021", value: 70, approx: true },
          { label: "2022", value: 103 },
          { label: "2023", value: 97 },
        ],
        note: "As reported by the company each year; 2021 is \"over 70\".",
        source: "r2023",
      },
      byType: {
        title: "Calls by type, 2023",
        bars: [
          { label: "Medical emergencies", value: 44 },
          { label: "Mutual aid", value: 15, sub: "13 to fire scenes, 2 covering a town" },
          { label: "Motor vehicle crashes", value: 10 },
          { label: "Wires and trees down", value: 5 },
          { label: "Fire alarms", value: 4 },
        ],
        note: "The types the company names; they account for 78 of the 97 calls.",
        source: "r2023",
      },
    },
    money: {
      intro: "The town budget pays dispatching and ambulance service and gives the company money for equipment and gear.",
      year: "fiscal year 2026 (proposed)",
      lines: [
        { label: "Contracted ambulance", amount: 21137 },
        { label: "Dispatching", amount: 17474 },
      ],
      linesNote: "Part of the town's $55,211 line for the fire company and ambulance, up 11.35%.",
      capital: { title: "Protective gear", lines: [{ label: "One full set of turnout gear, about", amount: 5000 }], note: "Gear must be replaced every 10 years; the company buys at least two sets a year." },
      source: "r2024",
    },
    residents: [
      { label: "Reflective house numbers", href: `${HFX}/2024/02/TOWN-MEETING-REPORT-FY23_FINAL.pdf`, text: "A fundraiser that also helps crews and ambulances find you; order with the form at the town office." },
      { label: "Auction and clambake", href: `${HFX}/2024/02/TOWN-MEETING-REPORT-FY23_FINAL.pdf`, text: "The company's main fundraisers." },
    ],
    sources: {
      r2021: { label: "Town of Halifax, Annual Town Report FYE 2021", href: `${HFX}/2022/04/Halifax-Annual-Town-Report-FYE-2021.pdf`, note: "Halifax Fire Company report, PDF page 32" },
      r2022: { label: "Town of Halifax, Town Report (2022)", href: `${HFX}/2023/02/Halifax-Town-Report-FY24-pages.pdf`, note: "Halifax Fire Co. report, PDF page 30" },
      r2023: { label: "Town of Halifax, Town Meeting Report FY23", href: `${HFX}/2024/02/TOWN-MEETING-REPORT-FY23_FINAL.pdf`, note: "Report of the Halifax Fire Company for 2023, PDF pages 40–41" },
      r2024: { label: "Town of Halifax, Town Meeting Book FY2024", href: `${HFX}/2025/02/2024_Halifax-TOWN-MEETING-BOOK_FY2024_FINAL_20250207.pdf`, note: "Budget, PDF page 11" },
    },
  },
  marlboro: {
    description:
      "Marlboro Volunteer Fire Company: 16 first responders, 116 calls last year and 106 in five months, " +
      "the firehouse on South Road, and what the company asks of the town.",
    facts: [
      ["Run by", "Marlboro Volunteer Fire Company, a nonprofit"],
      ["Responders", "16, including 2 juniors; 4 are trained to enter a burning building"],
      ["Calls", "116 last year; 106 from July to November 2025"],
      ["Station", "779 South Road"],
      ["Meets", "6 pm, 2nd and 4th Wednesdays; EMT training the 3rd Wednesday"],
    ],
    contact: { chief: "Dan Elliott", source: "r2025" },
    history: {
      intro:
        "Marlboro's responders answer structure and car fires, downed wires, crashes, medical emergencies and " +
        "checks on elderly residents. Five of them live outside Marlboro.",
      events: [
        { year: 2025, text: "The IRS grants the company 501(c)(3) status. Three fire safety talks at Marlboro Elementary in January introduce its mascot, Phoenix; the State Fire Marshal's office gives extinguisher demonstrations at the Town Fair. Brush fires along Route 9 keep the company \"crazy busy\" in the fall, and by 30 November it has answered 106 calls in five months.", source: "r2025" },
      ],
    },
    money: {
      intro: "The town appropriates money each year; donations and grants, including an annual one from the Marlboro Alliance, cover the rest.",
      year: "fiscal year 2026 (requested by the company)",
      lines: [
        { label: "Operating", amount: 42000 },
        { label: "Capital: turnout gear, SCBA and firehouse heating", amount: 48000 },
      ],
      linesNote: "The capital request is $2,000 less than last year's. The operating request includes a new stipend of $5 per call for each responder, toward fuel, and an incident-reporting software upgrade of over $4,000.",
      capital: { title: "Town appropriation", lines: [{ label: "Fiscal 2025 (actual)", amount: 86400.51 }, { label: "Fiscal 2026 (proposed)", amount: 90000 }], note: "The town budget line for the fire company." },
      source: "r2025",
    },
    careers: {
      intro: "No experience is needed, and there are jobs for everyone: running hoses, directing traffic, looking after equipment, checking on elders. The company also needs board members and help with building and fundraising.",
      points: [
        "Drop by a training at 6 pm on the 2nd or 4th Wednesday, at the firehouse",
        "Email MVFC.recruitment@gmail.com with questions",
      ],
      applyUrl: MRB,
      source: "r2025",
    },
    residents: [
      { label: "Burn permits", href: MRB, text: "From the town fire wardens, for the day of the burn only." },
    ],
    sources: {
      r2025: { label: "Town of Marlboro, 2025 Annual Report", href: MRB, note: "Marlboro Volunteer Fire Company report, PDF pages 41–42; budget, page 23" },
    },
  },
  whitingham: {
    description:
      "Whitingham Volunteer Fire Department: two stations, Jacksonville and Whitingham, 207 calls, " +
      "a new brush truck, new air packs, and the town's fire budget.",
    facts: [
      ["Stations", "2: Jacksonville and Whitingham"],
      ["Calls", "207 last year, down from 333"],
      ["Chief", "Stanley Janovsky Jr."],
      ["Meets", "Second Monday, 6 pm, Jacksonville Station"],
      ["Town budget", "$193,425 for fiscal 2025, plus $60,000 to the equipment fund"],
    ],
    contact: { chief: "Stanley Janovsky Jr.", phone: "802-368-2900", website: `${WHT}/departments/fire-department`, source: "dept" },
    history: {
      intro:
        "Whitingham's volunteers cover the town from two stations and give mutual aid to neighbours in Vermont " +
        "and Massachusetts, from Dover and Readsboro to Rowe and Monroe.",
      events: [
        { year: 2024, calls: 207, text: "A new GMC brush truck, Brush 1, replaces the Suburban and is housed at the Whitingham station. Capt. Dennis Pike wins a grant for a new air pack, alongside six more the department buys; three more will complete the replacement.", source: "r2024" },
      ],
    },
    money: {
      intro: "The fire department is run by the town, which votes its operating money and an equipment fund each March.",
      year: "fiscal year 2025 (voted March 2024)",
      lines: [
        { label: "Operation of the town fire department", amount: 193425 },
      ],
      linesNote: "Voted at the 5 March 2024 town meeting.",
      capital: { title: "Equipment fund", lines: [{ label: "Fiscal 2025 deposit", amount: 60000 }], note: "Saved toward apparatus and equipment." },
      source: "r2024",
    },
    careers: {
      intro: "\"We need volunteers. We will train you.\"",
      points: [
        "Come to a meeting, every second Monday at 6 pm at the Jacksonville Station",
        "The Whitingham Firemen's Association holds first-responder training on the third Monday, 7 pm",
      ],
      applyUrl: `${WHT}/departments/fire-department`,
      source: "r2024",
    },
    residents: [
      { label: "Burn permits", href: `${WHT}/departments/fire-warden`, text: "From the town fire warden; no permit form, no burning." },
    ],
    sources: {
      dept: { label: "Town of Whitingham, Fire Department", href: `${WHT}/departments/fire-department` },
      r2024: { label: "Town of Whitingham, Annual Town Report FYE 30 June 2024", href: `${WHT}/sites/default/files/Annual%20Town%20Report%20fye%2006.30.24.pdf`, note: "Fire Department report, PDF page 46; town meeting votes, page 10. A scanned report, read with text recognition" },
    },
  },
  groton: {
    description:
      "Groton Volunteer Fire Department: 22 volunteers protecting 984 people over 54 square miles, " +
      "an engine, a tanker and a rescue, the FAST Squad shared with Ryegate, and how to join.",
    facts: [
      ["Protects", "984 people over 54 square miles, from one station"],
      ["Members", "22 active, firefighters and EMTs (2024)"],
      ["Apparatus", "An engine, a tanker and a rescue vehicle"],
      ["Meets", "Tuesday nights, for meetings and training"],
    ],
    contact: { chief: "Aaron Smith", phone: "802-584-3855", website: GRT, source: "dept" },
    history: {
      intro:
        "Groton's members are certified firefighters and EMTs. The town also runs the Groton/Ryegate FAST Squad " +
        "for medical calls, and the department joins Ryegate and Wells River for an annual prevention program at Blue Mountain Union School.",
      events: [
        { year: 2024, calls: 40, callsApprox: true, text: "\"40 plus\" calls. The July flood washes out two dry hydrants, at Cold Water Brook and behind Clark's Landing. The fire station gets a new roof, extended over the east entry and the generator. Eight members certify as traffic control flaggers, and others train in CPR and ice rescue.", source: "r2024" },
        { year: 2025, text: "Wayne Knott, chief through 2024, is named Honorary Fire Chief.", source: "dept" },
      ],
    },
    careers: {
      intro: "Members can train as firefighters or help with non-firefighting work.",
      points: [
        "18 or older, or 16 for a junior membership",
        "Live or work full time in Groton",
        "Come to a Tuesday night meeting and training, or contact the chief",
      ],
      applyUrl: GRT,
      source: "dept",
    },
    residents: [
      { label: "Green 911 address signs", href: GRTR, text: "Reflective signs, available from any member, that save minutes finding your house." },
    ],
    sources: {
      dept: { label: "Town of Groton, Fire Department", href: GRT },
      r2024: { label: "Town of Groton, 2024 Town Report", href: GRTR, note: "Groton Volunteer Fire Department annual report, PDF page 46. A scanned report, read with text recognition" },
    },
  },
  sutton: {
    description:
      "Sutton Fire Department: 32 calls in 2025, a 22-member roster, a compact mini pumper for steep " +
      "driveways, and meetings at the Burke Road station.",
    facts: [
      ["Calls", "32 in 2025"],
      ["Members", "22, including a junior firefighter and four lifetime members"],
      ["Station", "691 Burke Road"],
      ["Meets", "Training 1st and 3rd Tuesdays, 7 pm; business meeting 2nd Tuesday, 7:30 pm"],
    ],
    contact: { chief: "Kyle Seymour", source: "r2025" },
    history: {
      intro: "A small volunteer department working Sutton's long, steep driveways and narrow roads, which the weather keeps testing.",
      events: [
        { year: 2025, calls: 32, text: "For the third year running, a major rain storm on 10 July damages the town's roads. The pump on Tanker 43 is rebuilt. The 1988 Engine 41 is sold and replaced by a 2001 E-One mini pumper on an F550 chassis, with a 300-gallon tank and 750 gpm pump, small enough for driveways the big engines can't reach. A few new members join.", source: "r2025" },
      ],
    },
    residents: [
      { label: "Smoke and CO detectors", href: SUT, text: "The chief's reminder: test them monthly, and have furnaces and chimneys serviced every year." },
    ],
    sources: {
      r2025: { label: "Town of Sutton, 2025 Town Report", href: SUT, note: "Chief's report and roster, PDF pages 52–53; meeting times, page 3. A scanned report, read with text recognition" },
    },
  },
  waterford: {
    description:
      "Waterford Volunteer Fire Department: founded in 1985, 30 members and a cadet program, 127 calls " +
      "in 2022, and the new tanker voters approved in 2024.",
    facts: [
      ["Founded", "1985; bylaws adopted 16 October 1985"],
      ["Members", "30, including cadets (2023)"],
      ["Calls", "127 in 2022"],
      ["Station", "2661 Duck Pond Road"],
    ],
    contact: { website: WTF, source: "dept" },
    history: {
      intro:
        "Waterford's volunteers train almost every Tuesday night and respond around the clock, to structure and " +
        "brush fires, crashes, hazmat, extrications and medical calls, alongside their mutual aid partners and the ambulance service.",
      events: [
        { year: 1985, text: "The department is founded; its charter members joined between September 1985 and September 1986. One of them, Howard Jones, is still active 38 years later.", source: "update" },
        { year: 2022, calls: 127, text: "Members log about 780 hours on calls, 685 in fire and EMS training and 420 on maintenance and meetings.", source: "update" },
        { year: 2023, text: "Three high school students move up from the cadet program to probationary membership. The bylaws are revised in August.", source: "update" },
        { year: 2024, text: "On 5 March voters approve a new tanker, up to $495,865, by 203 to 96: $220,865 in cash and $275,000 financed over up to seven years.", source: "vote" },
      ],
    },
    careers: {
      intro: "The department welcomes members from Waterford and neighbouring towns, and runs a cadet program for younger members.",
      points: [
        "16 or older, with a driver's licence",
        "Live or work in Waterford or a neighbouring town",
        "Mail an application to PO Box 56, Lower Waterford, VT 05848",
      ],
      applyUrl: WTF,
      source: "dept",
    },
    residents: [],
    sources: {
      dept: { label: "Town of Waterford, Fire Department", href: WTF },
      update: { label: "Waterford Fire Department, Town Meeting Update, 7 March 2023", href: `${WTFD}/000/000/13f/cb7/mx-m2651_20230323_150138.pdf`, note: "A scanned statement, read with text recognition; founding dates also from the department's bylaws" },
      vote: { label: "Town of Waterford, Official Return, Australian ballot of 5 March 2024", href: `${WTFD}/000/000/139/f85/fire.pdf` },
    },
  },
  berlin: {
    description:
      "Berlin Volunteer Fire Department: 661 calls in a year, most of them medical, a six-vehicle fleet, " +
      "a Fast Squad, and a community survey that shaped its plans.",
    facts: [
      ["Calls", "661 in 2021: 237 fire service and 424 medical"],
      ["Fleet", "Six vehicles, from a 1979 tower truck to a 2011 pickup"],
      ["Meets", "Every Tuesday, 6:30 to 9:30 pm"],
      ["Phone", "802-223-5531 (business)"],
    ],
    contact: { phone: "802-223-5531", website: "https://www.berlinfiredepartment.org", source: "r2021" },
    history: {
      intro:
        "Berlin's department covers the interstate, commercial buildings, the hospital, and back-country and " +
        "cold-water rescue around Irish Hill and Berlin Pond. More volunteers can respond on nights and weekends than on weekdays.",
      events: [
        { year: 2021, calls: 661, text: "Two structure fires, eight car fires, four outside fires and one extrication, plus seven fires in neighbouring towns. Battery-powered extrication tools replace an obsolete hose-powered tool. A community survey finds residents value training (29%), response times (27%) and equipment (18.9%) most, and the department plans paid weekend staffing and an overnight bunk-in program.", source: "r2021" },
      ],
    },
    calls: {
      intro: "Nearly two in three calls were medical.",
      byType: {
        title: "Calls by type, 2021",
        bars: [
          { label: "Medical", value: 424 },
          { label: "Fire service", value: 237 },
        ],
        note: "The two add up to the 661 calls reported.",
        source: "r2021",
      },
    },
    careers: {
      intro: "Berlin is looking for firefighters, EMTs and corporation support members.",
      points: ["Weekly meetings every Tuesday, 6:30 to 9:30 pm: training, maintenance and business"],
      applyUrl: "https://www.berlinfiredepartment.org",
      source: "r2021",
    },
    residents: [],
    sources: {
      r2021: { label: "Town of Berlin, 2021 Town Report", href: BER, note: "Berlin Volunteer Fire Department report, PDF pages 56–58" },
    },
  },
  waitsfield: {
    description:
      "Waitsfield-Fayston Fire Department: one volunteer department for two towns, 126 calls by town and type, " +
      "the 60/40 cost split, and its budget.",
    subtitle: "Waitsfield-Fayston Volunteer Fire Department",
    facts: [
      ["Covers", "Waitsfield and Fayston"],
      ["Cost split", "Waitsfield 60%, Fayston 40%, by historical share of calls"],
      ["Calls", "126 in 2023: 73 in Waitsfield, 44 in Fayston, 9 mutual aid"],
      ["Town budget", "$191,648 for fiscal 2025 (proposed), 7% of Waitsfield's general fund"],
    ],
    contact: { chief: "Jared Young", phone: "802-496-2404", website: `${WFF}/departments/public-safety/fire`, source: "dept" },
    history: {
      intro:
        "A volunteer department shared by two towns, with mutual aid agreements with its neighbours. Its main goal for " +
        "2024 was a decontamination space in the fire house, with a gear extractor, to protect firefighters from cancer.",
      events: [
        { year: 2023, calls: 126, text: "23 training sessions. Five members attend the Franklin Fire School and one completes Firefighter One; about six more plan to take the 220-hour course in 2024.", source: "r2023" },
      ],
    },
    calls: {
      intro: "Alarms with no fire were over a third of 2023's calls; crashes came next.",
      byType: {
        title: "Calls by type, 2023",
        bars: [
          { label: "Smoke or fire alarm, no fire", value: 45 },
          { label: "Motor vehicle accidents", value: 22 },
          { label: "Good intent", value: 9 },
          { label: "Chemical or propane smell", value: 7 },
          { label: "Power lines or trees down", value: 6 },
          { label: "Medical assists", value: 5 },
          { label: "Structure fires", value: 4 },
          { label: "CO alarm, no CO", value: 4 },
          { label: "Vehicle fires", value: 3 },
          { label: "Appliance fires", value: 3 },
          { label: "CO in building", value: 3 },
          { label: "Wildland fires", value: 3 },
          { label: "Service calls", value: 3 },
          { label: "Other", value: 9, sub: "Unpermitted burns, rekindle, pole fire and others" },
        ],
        note: "The types add up to the 126 calls reported.",
        source: "r2023",
      },
    },
    money: {
      intro: "Waitsfield carries the department in its budget and bills Fayston for 40%.",
      year: "fiscal year 2025 (proposed)",
      lines: [
        { label: "Fire department, Waitsfield budget", amount: 191648 },
        { label: "Fayston's 40% share (revenue)", amount: 76659 },
      ],
      linesNote: "Up $16,814 (9.6%) from fiscal 2024, partly for new tires for every vehicle.",
      capital: { title: "Reserves", lines: [{ label: "Vehicle reserve (estimated, start of fiscal 2025)", amount: 172085.13 }, { label: "Building and equipment reserve", amount: 34962.84 }], note: "From the town's reserve fund schedules." },
      source: "r2023",
    },
    residents: [
      { label: "Burn permits", href: `${WFF}/departments/public-safety/fire`, text: "From the fire warden, one day ahead." },
    ],
    sources: {
      dept: { label: "Town of Waitsfield, Fire", href: `${WFF}/departments/public-safety/fire` },
      r2023: { label: "Town of Waitsfield, 2023 Annual Report", href: `${WFF}/fileadmin/files/Departments/Town_Clerk/Annual_Reports/2023_Waitsfield_Annual_Report.pdf`, note: "Chief's report and calls by type, PDF pages 57–58; budget, pages 19 and 29; reserves, pages 35–36" },
    },
  },
  addison: {
    description:
      "Addison Volunteer Fire Department: established in 1961, a record 126 calls in 2024, 32 members " +
      "averaging 23 years of service, a water rescue boat and new FEMA-funded air packs.",
    facts: [
      ["Established", "1961"],
      ["Calls", "126 in 2024, the most in the department's history"],
      ["Members", "32, with an average of 23 years of service"],
      ["Meets", "Second Monday of the month, 7 pm, at the fire house"],
    ],
    contact: { chief: "Brad Clark", source: "r2024" },
    history: {
      intro:
        "Addison's volunteers stay a long time: the chief has 42 years in, and a charter member nearly 64. " +
        "The department raises money through pancake breakfasts and an annual fundraising letter.",
      events: [
        { year: 1961, text: "The department is established.", source: "r2024" },
        { year: 2024, calls: 126, text: "A record year. Charter member Buster Grant has the Addison County Firefighters Association's Senior Firefighter award named for him. Five junior members join, the most in years. Fifteen new MSA air packs go into service, bought with a $114,000 FEMA grant and about $6,000 from the department; some of those they replace were over 20 years old. Larry Blacklock, a 53-year member and former first assistant chief, dies in October.", source: "r2024" },
      ],
    },
    calls: {
      intro: "The department's apparatus at the end of 2024.",
      byUnit: {
        title: "Apparatus, by model year",
        bars: [
          { label: "Tanker 1", value: 1986, sub: "Marmon, 3,500 gal" },
          { label: "Hose Reel 1", value: 1987, sub: "International mini-pumper, 1,600 ft of 4-inch hose" },
          { label: "Tanker 2", value: 1991, sub: "Ford, 2,600 gal" },
          { label: "Engine 1", value: 2002, sub: "Freightliner/Smeal, 1,500 gpm" },
          { label: "Water Rescue 1", value: 2008, sub: "22 ft Glassmaster boat" },
          { label: "Utility 1", value: 2014, sub: "Freightliner/Hackney" },
        ],
        note: "From the chief's report.",
        source: "r2024",
      },
    },
    money: {
      intro: "The town pays the department an assessment and saves toward a new pumper; the department's own budget covers operations and gear.",
      year: "2025 (town budget)",
      lines: [
        { label: "Fire department assessment", amount: 41000 },
        { label: "Firehouse maintenance", amount: 15000 },
        { label: "Fire department fund (pumper)", amount: 12000 },
        { label: "Insurance", amount: 9000 },
        { label: "Dispatching", amount: 1400 },
        { label: "Fire alarm annual fee", amount: 1000 },
      ],
      linesNote: "$79,900 in all, up from $69,900 in 2024, mostly for firehouse maintenance.",
      capital: { title: "FEMA air pack grant, 2024", lines: [{ label: "SCBA purchase (actual)", amount: 120663.36 }], note: "Paid for with a $114,000 Assistance to Firefighters grant and a 5% department match." },
      source: "r2024",
    },
    careers: {
      intro: "Addison is always looking for people to help protect their neighbours, juniors included.",
      points: ["Meetings on the second Monday of the month, 7 pm, at the fire house", "See any member"],
      applyUrl: ADDR,
      source: "r2024",
    },
    residents: [
      { label: "911 address signs", href: ADDR, text: "$10 from any member." },
      { label: "Clear the road", href: ADDR, text: "Your road needs room for a truck 11 feet wide and 13 feet tall, clear of branches and signs." },
      { label: "Burn permits", href: ADDR, text: "From the town fire warden; 66 were issued in 2024." },
    ],
    sources: {
      r2024: { label: "Town of Addison, 2024 Town Report", href: ADDR, note: "Addison Volunteer Fire Department report, PDF pages 65–67; town fire budget, page 46" },
    },
  },
  cornwall: {
    description:
      "Cornwall Volunteer Fire Department: 85 calls by type in 2021, EMT members, a new Engine 1 from Dingee, " +
      "the 46-acre West Street fire, and the fire budget.",
    facts: [
      ["Calls", "85 in 2021, within the normal range"],
      ["Experience", "More than 525 combined years"],
      ["Town appropriation", "$67,950 for fiscal 2023"],
    ],
    history: {
      intro:
        "Cornwall's volunteers include several EMTs, who answer medical calls and in 2021 volunteered at vaccination clinics. " +
        "To join, ask the town clerk; at 50, the department says, you are still young in the volunteer service.",
      events: [
        { year: 2021, calls: 85, text: "A 46-acre spring wildfire west of West Street at Sunset Orchard Road, fought with help from Middlebury. A drive-thru chicken dinner fundraiser. A new Engine 1 is designed with Dingee Machine Company of Cornish, New Hampshire, builders of the department's Utility and Brush trucks, due in 2022.", source: "r2021" },
      ],
    },
    calls: {
      intro: "Medical calls were more than half of 2021's total.",
      byType: {
        title: "Calls by type, 2021",
        bars: [
          { label: "Medical and MREMS assists", value: 46 },
          { label: "Fire, smoke and CO investigations", value: 13 },
          { label: "Motor vehicle incidents", value: 7 },
          { label: "Grass, brush and agricultural fires", value: 7 },
          { label: "Fallen wires and trees", value: 7 },
          { label: "Structure fires", value: 3 },
          { label: "Mutual aid given", value: 2 },
          { label: "Other", value: 2 },
        ],
        note: "The types add up to the 85 calls reported.",
        source: "r2021",
      },
    },
    residents: [
      { label: "Join", href: CWR, text: "Contact the town clerk, who will point you in the right direction." },
    ],
    sources: {
      r2021: { label: "Town of Cornwall, 2021 Annual Report", href: CWR, note: "Cornwall Volunteer Fire Department report and budget, PDF pages 38–40" },
    },
  },
  monkton: {
    description:
      "Monkton Volunteer Fire Department: 57 emergency calls in 2022, 12 active members, five vehicles " +
      "averaging 20 years old, and a truck replacement fund.",
    facts: [
      ["Calls", "57 in 2022"],
      ["Members", "12 active, training weekly"],
      ["Station", "3747 States Prison Hollow Road"],
      ["Apparatus", "Five vehicles, averaging 20 years old"],
    ],
    contact: { chief: "Curtis Layn", source: "r2022" },
    history: {
      intro:
        "Monkton's volunteers answer fires, crashes, CO alarms, medical assists and downed lines, working with " +
        "Monkton First Response and the Bristol, Vergennes and Charlotte rescue squads.",
      events: [
        { year: 2022, calls: 57, text: "The truck committee begins specifying a new truck, and finds prices sharply higher and a build time of nearly two years. Mike New retires after almost twenty years and is made a life member; Dan Reinhart is voted Outstanding Firefighter.", source: "r2022" },
      ],
    },
    calls: {
      intro: "The department's fleet.",
      byUnit: {
        title: "Apparatus, by model year",
        bars: [
          { label: "Engine #2", value: 1992, sub: "GMC TopKick mini-pumper" },
          { label: "Utility #1", value: 1994, sub: "GMC S8500 heavy rescue" },
          { label: "Engine #1", value: 1999, sub: "Freightliner pumper" },
          { label: "Brush #1", value: 2002, sub: "Ford F250" },
          { label: "Tanker", value: 2006, sub: "Freightliner M2" },
        ],
        note: "From the department's vehicle list.",
        source: "r2022",
      },
    },
    careers: {
      intro: "There is a place for everyone.",
      points: ["Stop by the station on a Wednesday night, or talk to any member"],
      applyUrl: MKR,
      source: "r2022",
    },
    residents: [],
    sources: {
      r2022: { label: "Town of Monkton, 2022 Annual Report", href: MKR, note: "Monkton Volunteer Fire Department report, PDF pages 67–69. A scanned report, read with text recognition" },
    },
  },
  shoreham: {
    description:
      "Shoreham Fire Department: 35 calls in 2023, Operation Mayday and other outreach, Firefighter I " +
      "graduates, electric-vehicle extrication training and a cold-water rescue program.",
    facts: [
      ["Calls", "35 in 2023"],
      ["Meets", "1st and 3rd Tuesdays, 7 pm, at the firehouse (2022)"],
      ["Equipment reserve", "$94,812.64 at the end of 2023"],
    ],
    history: {
      intro: "Shoreham's volunteers answer fires, crashes, alarms and mutual aid, and assist Shoreham First Response. Their meetings are open to anyone thinking of joining.",
      events: [
        { year: 2022, text: "Dispatch moves from Shelburne to MREMS. A 1996 Freightliner utility truck is bought, and ARPA money buys battery-powered extrication tools.", source: "r2022" },
        { year: 2023, calls: 35, text: "The department opens its doors for Operation Mayday with a free pancake breakfast, holds its annual barbecue and visits Shoreham Elementary for Fire Awareness Week. Ryan Fitzsimmons and Jesse Wing complete Firefighter I, and members train with Orwell and Bridport on extrication from electric and hybrid vehicles.", source: "r2023" },
        { year: 2024, text: "Plans for a cold-water rescue program, and for replacing air packs that are nearly 20 years old.", source: "r2023" },
      ],
    },
    residents: [
      { label: "Burn permits", href: SHMR, text: "From the town fire warden; 75 were issued in 2023." },
    ],
    sources: {
      r2023: { label: "Town of Shoreham, 2023 Annual Report", href: SHMR, note: "Shoreham Fire Department report, PDF page 19; reserve fund, page 63" },
      r2022: { label: "Town of Shoreham, 2022 Annual Report", href: "https://shorehamvt.us/_files/ugd/d53131_28b58702dd36420a99dcb302a37e856a.pdf", note: "Fire department report, PDF page 37; meetings, page 2" },
    },
  },
  brookfield: {
    description:
      "Brookfield Volunteer Fire Department: 75 years in 2023, crashes the most common call, new bunker gear, " +
      "an air fill station and battery-powered jaws of life.",
    facts: [
      ["Anniversary", "75 years, celebrated in 2023"],
      ["Most common call", "Motor vehicle accidents: 21 in each of 2023 and 2024"],
      ["Town budget", "$58,400 for fiscal 2025"],
    ],
    history: {
      intro:
        "Most of Brookfield's calls are crashes, so vehicle rescue tools are a priority. The department says it needs more young people: " +
        "anyone can visit and get involved.",
      events: [
        { year: 2023, text: "The department celebrates its 75th anniversary, and mourns Ed Koren, a member for 35 years. The July flood keeps it busy checking on neighbours, closing roads and pumping basements.", source: "r2023" },
        { year: 2024, text: "Three more sets of bunker gear put every member in new protective equipment. Two neighbouring departments give an air compressor and storage bottles, and the department buys a fill station for its own air tanks. A Genesis battery-powered jaws of life is added. Kevin Wheatley steps down after ten years as chief and stays on as a member.", source: "r2024" },
      ],
    },
    calls: {
      intro: "Crashes made up nearly half of the calls the department listed for 2024.",
      byType: {
        title: "Calls by type, 2024",
        bars: [
          { label: "Motor vehicle accidents", value: 21 },
          { label: "Trees and power lines down", value: 6 },
          { label: "Mutual aid and assists", value: 5 },
          { label: "CO and fire alarms", value: 5 },
          { label: "Miscellaneous", value: 5 },
          { label: "Grass and brush fires", value: 3 },
          { label: "Vehicle fires", value: 2 },
          { label: "Structure fire", value: 1 },
        ],
        note: "The department's call log for 2024; it gives no total.",
        source: "r2024",
      },
    },
    money: {
      intro: "The fire department is a line in the town's general fund.",
      year: "fiscal year 2025 (budget)",
      lines: [{ label: "Fire department", amount: 58400 }],
      linesNote: "Fiscal 2024's budget was $47,050; actual spending was $56,875.07.",
      capital: { title: "Recent years", lines: [{ label: "Fiscal 2023 (actual)", amount: 41889.76 }, { label: "Fiscal 2024 (actual)", amount: 56875.07 }], note: "From the town reports' general fund tables." },
      source: "r2024",
    },
    residents: [],
    sources: {
      r2023: { label: "Town of Brookfield, 2023 Town Report", href: `${BRKF}/2024/02/87963-Brookfield-Report-2023.pdf`, note: "Fire department report, PDF page 30; budget, page 18" },
      r2024: { label: "Town of Brookfield, 2024 Town Report", href: `${BRKF}/2025/02/Final-93258-Brookfield-Report-2024_3.pdf`, note: "Fire department report, PDF page 36; budget, page 24" },
    },
  },
  washington: {
    description:
      "Washington Fire Department and Fast Squad: 57 calls and 556 personnel hours in 2025, 17 members, " +
      "weekly Wednesday meetings, and the department's budget.",
    facts: [
      ["Calls", "57 in 2025, above the usual average"],
      ["Hours", "95 hours on calls, 556 personnel hours (2025)"],
      ["Members", "17, including seven officers"],
      ["Meets", "Every Wednesday, 7 pm, at the fire station"],
    ],
    contact: { chief: "Ryan Bresette", source: "r2025" },
    history: {
      intro: "Washington's volunteers give mutual aid to crashes across the area, and the town pays down the loan on a fire truck.",
      events: [
        { year: 2025, calls: 57, text: "A busier year than usual, including 18 mutual aid calls to crashes and 10 for trees and wires.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Mutual aid to crashes was the largest group of calls.",
      byType: {
        title: "Calls by type, 2025",
        bars: [
          { label: "Mutual aid: motor vehicle crashes", value: 18 },
          { label: "Trees and wires", value: 10 },
          { label: "Medical assists", value: 6 },
          { label: "Service and miscellaneous", value: 5 },
          { label: "Fire alarms", value: 4 },
          { label: "Good intent", value: 2 },
          { label: "Structure fire", value: 1 },
          { label: "Chimney fire", value: 1 },
          { label: "Brush or grass fire", value: 1 },
          { label: "Vehicle fire", value: 1 },
        ],
        note: "The types the department lists; they account for 49 of the 57 calls.",
        source: "r2025",
      },
    },
    money: {
      intro: "Voters approve the department's operating budget as a town meeting article.",
      year: "fiscal year 2025 (actual)",
      lines: [
        { label: "Long-term debt", amount: 23070 },
        { label: "Apparatus replacement fund", amount: 15000 },
        { label: "Firefighting", amount: 10300 },
        { label: "Dispatch", amount: 9742 },
        { label: "Protective gear", amount: 8148.81 },
      ],
      linesNote: "The largest lines of $87,639.01 spent against an $86,250 budget. $87,070 is budgeted for fiscal 2026 and $92,523 proposed for 2027.",
      capital: { title: "Fire truck loan", lines: [{ label: "Balance, 30 June 2025", amount: 42727 }], note: "Town long-term debt for the fire truck." },
      source: "r2025",
    },
    careers: {
      intro: "\"The hardest step is the first step through the door.\" New members are welcome, especially younger ones.",
      points: ["Come by on a Wednesday at 7 pm, or talk to any member"],
      applyUrl: WSHR,
      source: "r2025",
    },
    residents: [],
    sources: {
      r2025: { label: "Town of Washington, 2026 Annual Town Report", href: WSHR, note: "Fire department report and budget, PDF pages 57–60" },
    },
  },
  vershire: {
    description:
      "Vershire Fire & Rescue: firefighters and EMTs answering 225 calls with West Fairlee in 2025, five AEDs, " +
      "a debt-free truck fund and a neighbours' support team.",
    facts: [
      ["Calls", "225 in 2025, in mutual aid with West Fairlee"],
      ["Station", "9111 VT Route 113"],
      ["AEDs", "Five: one on the rescue truck, the rest in EMTs' jump kits"],
      ["Town appropriation", "$84,525 asked for fiscal 2027"],
    ],
    history: {
      intro:
        "Most calls are medical: Vershire's EMTs stabilise and monitor patients until the ambulance arrives. Fundraising from Vershire Day " +
        "and coin drops goes into a capital fund, so trucks can be replaced without debt.",
      events: [
        { year: 2025, text: "The department and West Fairlee Volunteer Fire Department answer 225 calls. Voters exempt the station from property tax for five years. A grant writer is engaged to replace the breathing apparatus.", source: "r2025" },
      ],
    },
    money: {
      intro: "Voters set the department's appropriation each year by Australian ballot.",
      year: "fiscal year 2027 (warned)",
      lines: [{ label: "Vershire Fire & Rescue", amount: 84525 }],
      linesNote: "Article 21 of the town meeting warning. Fundraising goes separately into a capital equipment fund.",
      capital: { title: "Earlier appropriations", lines: [{ label: "Fiscal 2024", amount: 66608 }, { label: "Fiscal 2025", amount: 68675 }, { label: "Fiscal 2026", amount: 70735 }], note: "From the town report's appropriations table." },
      source: "r2025",
    },
    careers: {
      intro: "The department needs firefighters and first responders to train and certify, and also truck drivers, first aid providers, traffic controllers and good communicators.",
      points: [
        "A support team of neighbours helps at scenes: moving cars, spreading sand, taking notes, comforting a child",
      ],
      applyUrl: VSHR,
      source: "r2025",
    },
    residents: [
      { label: "Burn permits", href: VSHR, text: "All outdoor burning needs a permit; call Steve Ward, 802-685-2238." },
      { label: "Used motor oil", href: VSHR, text: "The department will collect it to heat the station." },
    ],
    sources: {
      r2025: { label: "Town of Vershire, 2025 Annual Report", href: VSHR, note: "Vershire Fire & Rescue report, PDF pages 84–85; appropriations, page 21; station exemption, page 52" },
    },
  },
  weston: {
    description:
      "Weston Volunteer Fire Department: an all-hazards volunteer department in a flood-prone firehouse on Route 100, " +
      "51 calls by type, and its push for a safer station.",
    facts: [
      ["Station", "734 Main Street, on Route 100 just north of the village"],
      ["Meets", "Business meeting 1st Thursday, 7 pm; training other Thursdays, 6:30 pm"],
      ["Town appropriation", "$51,000 (2025)"],
    ],
    contact: { chief: "Brian Lundberg", phone: "802-824-3539", website: `${WSTN}/fire`, source: "dept" },
    history: {
      intro:
        "The town leases the firehouse to the department. It sits in the West River flood hazard area and has flooded several times, " +
        "most recently in July 2023, damaging the building, vehicles and equipment.",
      events: [
        { year: 2021, calls: 51, text: "Training in ventilation, extrication and tanker shuttles; the department marches in Londonderry's Fourth of July parade and brings Santa to Christmas in Weston.", source: "r2021" },
        { year: 2023, text: "The July flood damages the firehouse, trucks and equipment.", source: "pc" },
        { year: 2024, text: "The department seeks federal funding for a new, flood-resilient fire station, backed by the town's planning commission.", source: "pc" },
        { year: 2025, text: "The firehouse gets a new roof.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Crashes, alarms and mutual aid made up most of 2021's calls.",
      byType: {
        title: "Calls by type, 2021",
        bars: [
          { label: "Motor vehicle accidents", value: 15 },
          { label: "Automatic fire alarms", value: 13 },
          { label: "Mutual aid, including structure fires", value: 12 },
          { label: "Trees on wires", value: 4 },
          { label: "Public assists", value: 4 },
          { label: "Brush fires and investigations", value: 2 },
          { label: "Lift assist", value: 1 },
        ],
        note: "The types add up to the 51 calls reported.",
        source: "r2021",
      },
    },
    careers: {
      intro: "With roles in response and public education, the department welcomes visitors to stop by the station for a tour and consider joining.",
      points: ["Business meeting on the first Thursday at 7 pm; training most other Thursdays at 6:30 pm"],
      applyUrl: `${WSTN}/fire`,
      source: "r2021",
    },
    residents: [
      { label: "Burn permits", href: `${WSTN}/fire`, text: "Call the fire warden before burning." },
    ],
    sources: {
      dept: { label: "Town of Weston, Fire", href: `${WSTN}/fire` },
      r2021: { label: "Town of Weston, 2021 Town Report", href: `${WSTN}/s/2021-Town-Report.pdf`, note: "Weston Fire Department letter, PDF page 62" },
      pc: { label: "Weston Planning Commission, letter supporting the WVFD's new station request, 6 May 2024", href: `${WSTN}/s/PC-Support-Letter-for-WVFD-Earmark-Bid.pdf` },
      r2025: { label: "Town of Weston, 2025 Town Report", href: `${WSTN}/s/25-Digital-TR.pdf`, note: "Selectboard report and appropriations" },
    },
  },
  bradford: {
    description:
      "Bradford Fire Department: a six-bay station on Carson Lane built in 1998, 206 calls in 2022, " +
      "two mutual aid networks, and how to get a burn permit.",
    facts: [
      ["Station", "135 Carson Lane, completed 1998: six bays, a chief's office and a large meeting room"],
      ["Calls", "206 in 2022"],
      ["Mutual aid", "Part of two mutual aid networks"],
    ],
    contact: { chief: "Nate Brooks", phone: "802-222-5224", website: BRAD, source: "dept" },
    history: {
      intro:
        "Bradford's firefighters answer structure and chimney fires and every automobile rescue call in town. " +
        "The phone at the station is not staffed around the clock: for an emergency, call 911.",
      events: [
        { year: 1998, text: "The new fire station at 135 Carson Lane is completed, with six bays for fire and rescue vehicles.", source: "lhmp" },
        { year: 2022, calls: 206, text: "The department answers 206 calls.", source: "lhmp" },
      ],
    },
    residents: [
      { label: "Burn permits", href: BRAD, text: "Get one from the forest fire warden. Have ready your name, mailing and 911 addresses, and what you will burn." },
    ],
    sources: {
      dept: { label: "Town of Bradford, Fire Department", href: BRAD, note: "Station, officers, non-emergency number, burn permits" },
      lhmp: { label: "Town of Bradford Local Hazard Mitigation Plan (TRORC, adopted 2024)", href: `${TRORC}/2013/11/Bradford_LHMP_FINAL.pdf`, note: "Fire station and calls, PDF page 7" },
    },
  },
  corinth: {
    description:
      "Corinth Volunteer Fire Department: about 20 volunteers, a new four-bay station on Fairground Road " +
      "approved by voters in 2018, and stations in East Corinth and Cookeville.",
    facts: [
      ["Members", "An average of 20, many trained in Fire 1 and 2, hazmat and cold water rescue (2019 town plan)"],
      ["Organisation", "A nonprofit, separate from the town"],
      ["Burn permits", "By permit only, from the fire warden"],
    ],
    history: {
      intro:
        "Since at least 1980 the department worked out of two stations, in East Corinth village and in Cookeville. " +
        "Corinth often gives mutual aid to Bradford.",
      events: [
        { year: 2017, text: "The town's hazard plan lists two engines, an engine-tanker, a heavy rescue, a wildland truck and two defibrillators.", source: "lhmp" },
        { year: 2018, text: "On 24 July voters approve, 221 to 156, an $850,000 bond for a four-bay station on donated land on Fairground Road. The village station is to close; Cookeville stays. The department then had 23 members.", source: "vn18" },
        { year: 2020, text: "The new station is under construction, with running water, which neither old station had.", source: "vn20" },
      ],
    },
    residents: [
      { label: "Burn permits", href: `${TRORC}/2013/10/Town-of-Corinth-TP-Adopted-10.21.19-small.pdf`, text: "Open burning is by permit only, from the town's fire warden." },
    ],
    sources: {
      tp: { label: "Town of Corinth Town Plan, adopted 21 October 2019 (TRORC)", href: `${TRORC}/2013/10/Town-of-Corinth-TP-Adopted-10.21.19-small.pdf`, note: "Fire protection, PDF page 13" },
      lhmp: { label: "Town of Corinth Hazard Mitigation Plan, 2017 (TRORC)", href: `${TRORC}/2013/10/Corinth_FinalAdopted.pdf`, note: "Equipment, PDF page 8" },
      vn18: { label: "Valley News, \"Corinth Fire Station a Long Time Coming\" (August 2018)", href: "https://www.vnews.com/Corinth-Fire-Station-a-Long-Time-Coming-19179187" },
      vn20: { label: "Valley News, Corinth fire station (28 August 2020)", href: "https://vnews.com/2020/08/28/corinth-fire-station-35930151/" },
    },
  },
  fairlee: {
    description:
      "Fairlee Fire Department and FAST Squad: 128 calls in 2025, a new E-ONE engine, the fire and rescue budget " +
      "and meeting nights.",
    facts: [
      ["Calls", "128 in 2025, fire department and FAST Squad together"],
      ["Newest engine", "Engine 6, a 2025 International HV built by E-ONE"],
      ["Meets", "First Thursday, 7:30 pm; drill third Thursday, 6 pm"],
    ],
    contact: { chief: "Andrew Godfrey", source: "r2025" },
    history: {
      intro:
        "Fairlee's firefighters and FAST Squad answer fires, crashes and medical calls, and help neighbouring departments at structure, silo and brush fires.",
      events: [
        { year: 1995, text: "A donation of stock sets up the Firemen's Stock Fund.", source: "r2025" },
        { year: 2025, calls: 128, text: "Engine 6 arrives in October and is in service just over a month later, with a bigger pump and 75 gallons more water. Mike Moore retires after 35 years on the department.", source: "r2025" },
      ],
    },
    money: {
      intro: "Fire and rescue is a department of the town's general fund.",
      year: "2026 (proposed)",
      lines: [
        { label: "Dispatch", amount: 14500 },
        { label: "Salaries and wages", amount: 13000 },
        { label: "New equipment", amount: 12000 },
        { label: "Insurance", amount: 10500 },
        { label: "Vehicle operation and maintenance", amount: 10000 },
        { label: "Computer, internet and software", amount: 10000 },
      ],
      linesNote: "The largest lines of $82,740 proposed for 2026. The 2025 budget was $87,771; $69,404 was spent.",
      capital: { title: "Engine and equipment, 2026 (proposed)", lines: [{ label: "Fire engine debt service", amount: 54789 }, { label: "Emergency equipment reserve", amount: 27500 }], note: "Separate from the department budget." },
      source: "r2025",
    },
    careers: {
      intro: "The department and FAST Squad are always looking for help, even from people who can't make every call.",
      points: ["Regular meeting first Thursday at 7:30 pm; drill third Thursday at 6 pm"],
      applyUrl: FRLE,
      source: "r2025",
    },
    residents: [],
    sources: {
      r2025: { label: "Town of Fairlee, 2025 Annual Town Report", href: FRLE, note: "Fire department and FAST Squad letter, PDF page 54; budget, page 25; reserves, page 14" },
    },
  },
  newbury: {
    description:
      "Newbury's fire department: Newbury Village, Wells River and West Newbury stations, a new village station in 2025, " +
      "79 calls for Wells River and the fire budget.",
    subtitle: "Newbury Village, Wells River and West Newbury stations",
    facts: [
      ["Stations", "Newbury Village, Wells River and West Newbury"],
      ["New station", "Newbury Village, occupied October 2025"],
      ["Wells River", "79 calls and over 611 hours in 2025; 14 members"],
      ["Burn permits", "150 issued in 2025"],
    ],
    history: {
      intro:
        "The town's fire department works from three stations. Newbury Village and Wells River share coverage of the town, and all of Newbury's structure fires " +
        "draw help from surrounding departments. Many of Wells River's crashes are on I-91.",
      events: [
        { year: 2025, calls: 79, text: "The 90-year-old Newbury Village station at 60 Chapel Street is demolished in May; the trucks wait in a farm barn, and the new three-bay station, with a community space for meetings and voting, is approved for occupancy on 22 October. The 79 calls are Wells River's.", source: "r2025" },
      ],
    },
    money: {
      intro: "The fire department is a line in the town budget.",
      year: "2026 (budget)",
      lines: [
        { label: "Non-recurring fire equipment", amount: 125000 },
        { label: "Transfer to equipment reserve", amount: 60000 },
        { label: "Station bond payment", amount: 41000 },
        { label: "Payroll", amount: 35000 },
        { label: "Equipment", amount: 17400 },
      ],
      linesNote: "The largest lines of $331,910 budgeted for 2026. In 2025, $145,846.77 was spent against a $170,520 budget.",
      capital: { title: "New village station", lines: [{ label: "20-year bond applied for", amount: 500000 }], note: "The figure in the town report. A Valley News report before the 2025 vote gave $700,000." },
      source: "r2025",
    },
    careers: {
      intro: "Being a firefighter is \"a very rewarding way to give back to your community\". Any member can give you an application.",
      points: ["Wells River meets the first Monday at 7 pm and trains the third Monday at 6 pm"],
      applyUrl: NWBY,
      source: "r2025",
    },
    residents: [
      { label: "Burn permits", href: NWBY, text: "Permits for brush, grass, leaves and clean wood come from the town's permit issuers." },
      { label: "No power?", href: NWBY, text: "The Newbury Village station has backup power and heat. Contact any firefighter if you are in a cold house without power." },
    ],
    sources: {
      r2025: { label: "Town of Newbury, 2025 Annual Report", href: NWBY, note: "Station reports, PDF pages 23 and 26–27; budget, page 14; burn permits, page 25" },
      dir: { label: "Town of Newbury, Fire Department directory", href: "https://newburyvt.org/Directory.aspx?DID=19" },
      vn: { label: "Valley News, \"Newbury voters consider funding new fire station\" (20 February 2025)", href: "https://vnews.com/2025/02/20/newbury-voters-consider-funding-new-fire-station-59495693/" },
    },
  },
  randolph: {
    description:
      "Randolph's three volunteer fire departments, Randolph Village, Randolph Center and East Randolph: why there are three, " +
      "their stations and their trucks.",
    subtitle: "Randolph Village, Randolph Center and East Randolph fire departments",
    facts: [
      ["Departments", "Three, all volunteer: Randolph Village, Randolph Center and East Randolph"],
      ["Why three", "A high ridge runs through the middle of the town"],
      ["Non-emergency", "802-728-5433 (town)"],
    ],
    history: {
      intro:
        "Each of the three stations can hold a roster of 20 firefighters (25 at the village), and all three give mutual aid to neighbouring towns. " +
        "Randolph Village also provides contracted fire protection to Braintree.",
      events: [
        { year: 2015, text: "Fire destroys the Randolph Village fire station and a rescue pumper.", source: "vn" },
        { year: 2018, text: "A new Randolph Village station is complete on the same site.", source: "vn" },
      ],
    },
    residents: [],
    sources: {
      town: { label: "Town of Randolph, Fire Departments", href: `${RAND}/fire` },
      village: { label: "Town of Randolph, Randolph Village Fire Department", href: `${RAND}/fire-department-randolph-village` },
      center: { label: "Town of Randolph, Randolph Center Fire Department", href: `${RAND}/fire-department-randolph-center` },
      east: { label: "Town of Randolph, East Randolph Fire Department", href: `${RAND}/fire-department-east-randolph` },
      rvfd: { label: "Randolph Village Fire Department", href: "https://www.rvfdvt.com/" },
      vn: { label: "Valley News, \"Randolph Sues to Recover Expense of New Fire Station\" (15 May 2018)", href: "https://vnews.com/2018/05/15/randolph-sues-truck-companies-over-blaze-that-destroyed-fire-station-17457560/" },
    },
  },
  thetford: {
    description:
      "Thetford Volunteer Fire Department: incorporated in 1960, about 18 volunteers aged 15 to over 65, " +
      "stations on Thetford Hill and in Post Mills, and its trucks.",
    facts: [
      ["Founded", "Incorporated 1960"],
      ["Members", "About 18 volunteers, aged 15 to more than 65"],
      ["Stations", "Thetford Hill (main) and Post Mills"],
      ["Organisation", "A private nonprofit, under contract as the town's sole fire protection"],
      ["Trucks", "Three E-One engines (2009, 2014, 2018), a 2015 rescue, a 2008 forestry truck and two six-wheelers"],
    ],
    contact: { chief: "Chad Whitcomb", phone: "802-785-2412", website: THET, source: "contact" },
    history: {
      intro:
        "Residents formed the department after some large fires in town. Its first station stood where Interstate 91 now runs, " +
        "and was rebuilt on Thetford Hill after the highway came through.",
      events: [
        { year: 1960, text: "The Thetford Volunteer Fire Department is incorporated.", source: "history" },
        { year: 1995, text: "Volunteers build an office, kitchen, bathroom and training room onto the Thetford Hill station.", source: "stations" },
        { year: 2005, text: "Volunteers add another truck bay, so every truck is housed indoors.", source: "stations" },
        { year: 2025, text: "A silo fire at Pompanoosuc Mills in October goes to a second alarm after a dust explosion.", source: "press" },
        { year: 2026, text: "A silo fire on Route 5 in East Thetford on 26 March draws mutual aid from New Hampshire and Vermont; no one is hurt.", source: "press" },
      ],
    },
    residents: [
      { label: "Burn permits", href: `${THET}/burn-permits.html`, text: "Free. Call the department or use its online form; permits aren't given by text." },
    ],
    sources: {
      contact: { label: "Thetford Volunteer Fire Department, Contact", href: `${THET}/contact.html` },
      history: { label: "Thetford Volunteer Fire Department, History", href: `${THET}/history.html` },
      stations: { label: "Thetford Volunteer Fire Department, Stations", href: `${THET}/stations.html` },
      about: { label: "Thetford Volunteer Fire Department, About Us", href: `${THET}/about-us.html` },
      apparatus: { label: "Thetford Volunteer Fire Department, Apparatus", href: `${THET}/apparatus.html` },
      press: { label: "Thetford Volunteer Fire Department, Press releases", href: `${THET}/press-releases.html` },
    },
  },
  topsham: {
    description:
      "Tri-Village Fire Association in Topsham: all-volunteer, about 10 firefighters at each of the East and West Topsham stations, " +
      "and mutual aid across 28 towns.",
    subtitle: "Tri-Village Fire Association: East Topsham and West Topsham stations",
    facts: [
      ["Department", "Tri-Village Fire Association, which also includes the Orange Volunteer Fire Department"],
      ["Firefighters", "About 10 at each Topsham station (2023 town plan)"],
      ["Mutual aid", "Formal agreements covering 28 towns, as far north as Stowe"],
    ],
    history: {
      intro:
        "The association is a private organisation, not run by the town, though the town contributes to it. It gives Topsham round-the-clock volunteer coverage; " +
        "the town plan notes it is short of firefighters in the daytime.",
      events: [
        { year: 1976, text: "The three-bay East Topsham station is built in the village on Powder Spring Road.", source: "tp" },
        { year: 2014, text: "The association installs a water supply at the East Topsham station, which had none.", source: "tp" },
      ],
    },
    residents: [],
    sources: {
      tp: { label: "Topsham Town Plan, adopted 21 August 2023 (TRORC)", href: `${TRORC}/2023/09/Topsham-2023-Final-Plan-adopted-8-21-23.pdf`, note: "Fire protection services, PDF page 21" },
    },
  },
  "west-fairlee": {
    description:
      "West Fairlee Volunteer Fire Department: over 200 calls in 2025, mostly medical, 14 members, a FEMA radio grant, " +
      "and the department's budget.",
    facts: [
      ["Calls", "202 in 2025: 133 EMS and 69 fire"],
      ["Members", "14, seven of them certified interior firefighters"],
      ["Requested for 2026", "$94,000"],
    ],
    contact: { chief: "Cory Austin", source: "r2025" },
    history: {
      intro:
        "Medical calls are most of the work: the department's EMS crew is usually first on scene and starts care before the ambulance arrives. " +
        "Calls are up 50% since 2020 and more than double 2015's.",
      events: [
        { year: 2025, calls: 202, text: "A $107,000 FEMA grant buys 14 new radios. The 1999 Rescue I catches fire on the way to a call; the crew treats the patient and puts out the truck. A 2003 replacement is bought for $30,000.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Two in three calls in 2025 were medical.",
      byType: {
        title: "Calls by type, 2025",
        bars: [
          { label: "EMS", value: 133 },
          { label: "Fire", value: 69, sub: "including 10 building fires" },
        ],
        note: "The department also attended 20 auto accidents.",
        source: "r2025",
      },
    },
    money: {
      intro: "The department reports its spending to the town and asks voters for its appropriation.",
      year: "2025 (actual)",
      lines: [
        { label: "Capital reserve, equipment", amount: 20000 },
        { label: "Insurance", amount: 10144 },
        { label: "Capital reserve, truck", amount: 10000 },
        { label: "Air pack, mask and bottles (one set)", amount: 9255 },
        { label: "Truck loan", amount: 7593.67 },
      ],
      linesNote: "The largest lines of $89,020.32 spent in 2025. The department estimates $93,900 for 2026.",
      capital: { title: "Reserves, end of 2025", lines: [{ label: "Equipment", amount: 40000 }, { label: "Truck", amount: 31200 }], note: "After matching the radio grant and buying a generator and the replacement rescue truck." },
      source: "r2025",
    },
    careers: {
      intro: "Monthly meetings and trainings keep members ready, and firefighters train further at regional and state academies, including swiftwater and ice rescue.",
      points: ["EMS crew in 2025: one EMT, three Vermont First Responders and one paramedic"],
      applyUrl: WFLE,
      source: "r2025",
    },
    residents: [],
    sources: {
      r2025: { label: "Town of West Fairlee, 2025 Town Report", href: WFLE, note: "Fire department report and budget, PDF page 40" },
    },
  },
  marshfield: {
    description:
      "Marshfield Volunteer Fire Department: 116 years old in 2025, 105 calls by type, an all-unpaid crew, " +
      "the fire budget and meeting nights.",
    facts: [
      ["Founded", "116th birthday in 2025"],
      ["Calls", "105 in 2025, substantially above average"],
      ["Pay", "None: a 100% volunteer department"],
      ["Meets", "Second and fourth Tuesdays, 7 pm, at the fire station"],
    ],
    contact: { chief: "Will Schwarz", source: "r2025" },
    history: {
      intro:
        "Apart from alarm activations, crashes lead every year in both number and severity. The department keeps three trucks, including a brush truck; " +
        "the two larger ones were refurbished to save the town money.",
      events: [
        { year: 2025, calls: 105, text: "Three new members join. At town meeting the chief explains a reluctant budget increase, including $4,000 for new turnout gear, since older gear contains PFAS.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Crashes were 42 of the 105 calls.",
      byType: {
        title: "Calls by type, 2025",
        bars: [
          { label: "Crashes, no injuries", value: 26 },
          { label: "Crashes with injuries", value: 16 },
          { label: "Alarm activations", value: 10 },
          { label: "Medical assists", value: 9 },
          { label: "Structure fires", value: 7 },
          { label: "Brush, grass and illegal burns", value: 7 },
          { label: "Smoke and hazardous conditions", value: 6 },
          { label: "Service calls", value: 4 },
          { label: "Chimney fires", value: 3 },
          { label: "Heating and appliance fires", value: 3 },
          { label: "Unfounded", value: 3 },
          { label: "Other", value: 3 },
          { label: "Vehicle fires", value: 2 },
          { label: "Wires, trees and pole fires", value: 2 },
          { label: "Search and rescue", value: 2 },
          { label: "Lithium-ion battery", value: 1 },
          { label: "Traffic control", value: 1 },
        ],
        note: "The types add up to the 105 calls reported.",
        source: "r2025",
      },
    },
    money: {
      intro: "The fire department is a line in the town's general fund.",
      year: "2026 (budget)",
      lines: [{ label: "Fire department", amount: 123740 }],
      linesNote: "In 2025, $91,620 was spent against a $98,649 budget. The pumper will need replacing in 10 to 15 years, at about $500,000 to $600,000.",
      capital: { title: "Fire department budget over time", lines: [{ label: "2019", amount: 69082 }, { label: "2024", amount: 80023 }, { label: "2025", amount: 98649 }], note: "From the town's net budget history." },
      source: "r2025",
    },
    careers: {
      intro: "The department is \"ALWAYS looking for new members\".",
      points: ["Training and meetings on the second and fourth Tuesdays at 7 pm at the fire station"],
      applyUrl: MSHF,
      source: "r2025",
    },
    residents: [],
    sources: {
      r2025: { label: "Town of Marshfield, 2025 Annual Report", href: MSHF, note: "Fire department report, PDF page 48; town meeting, page 12; budget, pages 25–26" },
    },
  },
  plainfield: {
    description:
      "Plainfield Fire & Rescue: 113 years of service, 20 members, a new rescue truck, CPR classes for about 100 people, " +
      "and the department's budget.",
    facts: [
      ["Service", "113 years, as of 2025"],
      ["Members", "20"],
      ["Station", "169 Main Street"],
    ],
    contact: { chief: "Johnathan Matthew", website: `${PLFD}/fire--rescue-department.html`, source: "r2025" },
    history: {
      intro: "Plainfield's department answers fire and rescue calls in town and helps its neighbours.",
      events: [
        { year: 2025, text: "A new rescue truck goes into service, the firemen's club buys six handheld radios, and about 100 people are certified in CPR through classes the department arranged.", source: "r2025" },
      ],
    },
    money: {
      intro: "The fire department is a line in the town's selectboard budget.",
      year: "2026–27 (proposed)",
      lines: [
        { label: "Dispatch", amount: 25100 },
        { label: "Protective equipment fund", amount: 12500 },
        { label: "Equipment fund", amount: 10000 },
        { label: "Building fund", amount: 10000 },
        { label: "Heating", amount: 7000 },
      ],
      linesNote: "Lines of the $100,100 proposed, up from $98,150. Firefighter and EMT stipends are $6,150 each.",
      capital: { title: "Loans, 2026–27", lines: [{ label: "Fire truck note", amount: 20000 }], note: "Plus $2,960 interest. Ambulance service is a separate line." },
      source: "r2025",
    },
    careers: {
      intro: "The department pays for all the training to get certified, on the fire side or the rescue side; you don't have to do both.",
      points: ["Apply by email to the chief"],
      applyUrl: `${PLFD}/fire--rescue-department.html`,
      source: "r2025",
    },
    residents: [
      { label: "Burn permits", href: `${PLFD}/burn-permits.html`, text: "Free from the fire warden. Call before you burn." },
    ],
    sources: {
      r2025: { label: "Town of Plainfield, Annual Report 2025", href: `${PLFD}/uploads/8/1/0/6/81063668/plainfield_town_report_2025.pdf`, note: "Fire and rescue report, PDF page 81; budget, pages 48–49" },
      page: { label: "Town of Plainfield, Fire & Rescue Department", href: `${PLFD}/fire--rescue-department.html` },
    },
  },
  woodbury: {
    description:
      "Woodbury Volunteer Fire Department: about 220 calls a year, a new station on Route 14 since January 2025, " +
      "cost sharing with Calais, and what voters fund.",
    facts: [
      ["Calls", "About 220 in 2025"],
      ["New station", "On Route 14, moved in 25 January 2025"],
      ["Shared with Calais", "Calais pays half of capital and a third of operating costs"],
      ["Fire station", "802-472-5050"],
    ],
    contact: { chief: "Paul Cerutti", phone: "802-472-5050", source: "minutes" },
    history: {
      intro:
        "The department is a nonprofit serving Woodbury and Calais; Calais has slightly more of its calls. Members are paid a stipend of $12.50 a call, however long it lasts.",
      events: [
        { year: 2025, text: "Equipment moves into the new station on Route 14 on 25 January.", source: "gazette" },
        { year: 2026, text: "At town meeting members report about 220 calls the year before. The new station, planned at 7,000 square feet, was cut to 4,100 to fit the funding; the old one, flooded in 2023 and 2024, couldn't be saved.", source: "minutes" },
      ],
    },
    money: {
      intro: "Woodbury voters fund the department by article at town meeting.",
      year: "2026 (voted)",
      lines: [
        { label: "Fire and Emergency Operations Center loan", amount: 100100 },
        { label: "Operating expenses", amount: 99990.88 },
        { label: "Capital replacement fund", amount: 35000 },
      ],
      linesNote: "Articles 6, 7 and 8 of the February 2026 town meeting, all passed.",
      capital: { title: "Truck", lines: [{ label: "Truck loan payment", amount: 23888 }, { label: "Truck maintenance reserve", amount: 2000 }], note: "Article 6. A station addition is paid for entirely by a Congressional earmark." },
      source: "minutes",
    },
    residents: [],
    sources: {
      minutes: { label: "Town of Woodbury, town meeting 28 February 2026, draft minutes", href: WDBY },
      gazette: { label: "Hardwick Gazette, Woodbury fire department move (28 January 2025)", href: "https://hardwickgazette.org/2025/01/28/woodbury-fire-department-move/" },
    },
  },
  worcester: {
    description:
      "Worcester Volunteer Fire & Rescue: about 30 fire and 60 Fast Squad calls a year, a new tanker in 2022, " +
      "and meeting and training times.",
    facts: [
      ["Calls", "About 30 fire and 60 Fast Squad a year (2022)"],
      ["Trucks", "2009 and 2013 engines; 2022 tanker"],
      ["Meets", "Fourth Wednesday, 7 pm; training second Sunday, 9 am"],
    ],
    history: {
      intro: "Worcester's department combines firefighting and a Fast Squad for medical calls, and works within the Central Vermont mutual aid community.",
      events: [
        { year: 2022, text: "The new Mid-West Fire tanker arrives after an 18-month build and a 1,600-mile drive home. The town sets aside $100,000 to repair the station floor and $10,000 for six AEDs. Ten active firefighters and one EMT.", source: "r2022" },
      ],
    },
    careers: {
      intro: "The department says it is struggling with membership and welcomes anyone interested in community service.",
      points: ["Business meeting the fourth Wednesday at 7 pm; training the second Sunday at 9 am"],
      applyUrl: "https://worcestervt.org/wp/town-government/fire/",
      source: "r2022",
    },
    residents: [],
    sources: {
      r2022: { label: "Town of Worcester, 2022 Town Report", href: WRCS, note: "Fire & rescue report, PDF page 40; other items, pages 5, 27" },
      page: { label: "Town of Worcester, Fire", href: "https://worcestervt.org/wp/town-government/fire/" },
    },
  },
  dorset: {
    description:
      "Dorset's two fire districts: Dorset Fire Department, with a record 144 calls in 2024 and a new tanker, " +
      "and East Dorset Fire Department, with 148 calls in 2025, plus both budgets.",
    subtitle: "Dorset Fire District #1 and East Dorset Fire District #1",
    facts: [
      ["Departments", "Two fire districts, each run by a five-member Prudential Committee that also runs a water system"],
      ["Dorset FD calls", "144 in 2024, a record"],
      ["East Dorset FD calls", "148 in 2025"],
      ["Meets", "Both departments meet Tuesdays, 7 pm, at their stations"],
    ],
    history: {
      intro:
        "Dorset is covered by two departments, each a fire district of its own: Dorset Fire Department on Route 30 and East Dorset Fire Department on Village Street. " +
        "Fire district taxes now appear on the town's property tax bill.",
      events: [
        { year: 2024, calls: 144, text: "Dorset Fire Department has its busiest year on record, adds a new attack truck and starts building a 3,000-gallon tanker. Manchester's police begin dispatching for East Dorset.", source: "dfd" },
        { year: 2025, text: "East Dorset answers 148 calls, puts in 550 hours of in-house training and 1,480 firefighter-hours on calls, and holds monthly winter pancake breakfasts toward a side-by-side to replace a 20-year-old six-wheeler.", source: "r2025" },
      ],
    },
    money: {
      intro: "Each district sets its own budget.",
      year: "fiscal year 2027 (budget)",
      lines: [
        { label: "Dorset Fire District, fire budget", amount: 215503 },
        { label: "East Dorset Fire District", amount: 167537 },
      ],
      linesNote: "Dorset's fire budget was $209,250 for fiscal 2026; East Dorset's was $157,537.",
      capital: { title: "East Dorset's largest lines, fiscal 2027", lines: [{ label: "Truck payment", amount: 36237 }, { label: "Firehouse maintenance and repair", amount: 13500 }, { label: "Apparatus maintenance and repair", amount: 11500 }], note: "From the district's budget in the town report." },
      source: "dfd",
    },
    careers: {
      intro: "Dorset Fire Department is recruiting firefighters, drivers and firehouse helpers. Training, gear and expenses are covered, with a stipend based on involvement.",
      points: ["Weekly meetings on Tuesdays at 7 pm at each station"],
      applyUrl: "https://www.dorsetfiredistrict.org",
      source: "site",
    },
    residents: [
      { label: "Burn permits", href: "https://www.dorsetfiredistrict.org", text: "When burning is allowed, you need a written permit from a fire department official." },
    ],
    sources: {
      town: { label: "Town of Dorset, Fire Districts & Water Systems", href: DRST },
      site: { label: "Dorset Fire District", href: "https://www.dorsetfiredistrict.org" },
      dfd: { label: "Dorset Fire District #1, 2026 annual meeting packet", href: DFDP, note: "2025 meeting minutes and FY27 budgets, PDF pages 12 and 18" },
      r2025: { label: "Town of Dorset, 2025 Town Report", href: DR25, note: "East Dorset Fire District report and budget, PDF page 22" },
      mvt: { label: "Town of Manchester, 2024 Town Report", href: MVT24, note: "Dispatch, PDF page 56" },
    },
  },
  manchester: {
    description:
      "Manchester Fire Department: an all-volunteer department of about 40, 319 calls in fiscal 2024, " +
      "and its home at the Public Safety Facility.",
    facts: [
      ["Calls", "319 in fiscal year 2024"],
      ["Members", "About 40 volunteers"],
      ["Station", "Public Safety Facility, Jeff Williams Way"],
    ],
    contact: { chief: "Chris Towslee", phone: "802-362-2121", website: "https://manchester-vt.gov/fire", source: "page" },
    history: {
      intro: "Manchester's volunteers answer fires, rescues on the roads, on the water and in the wilderness, and mutual aid across the area. Fundraising pays for much of their equipment.",
      events: [
        { year: 2024, calls: 319, text: "The fiscal year's calls include 70 rescues and 34 mutual aid requests.", source: "r2024" },
      ],
    },
    calls: {
      intro: "Most calls are fire-related, including false alarms and standbys.",
      byType: {
        title: "Calls by type, fiscal year 2024",
        bars: [
          { label: "Fire-related", value: 197, sub: "working fires, false alarms, hazmat, standbys" },
          { label: "Rescue", value: 70, sub: "crashes, water and wilderness rescues" },
          { label: "Mutual aid given", value: 34 },
          { label: "Carbon monoxide", value: 16 },
          { label: "Brush and grass fires", value: 2 },
        ],
        note: "The types add up to the 319 calls reported.",
        source: "r2024",
      },
    },
    residents: [],
    sources: {
      page: { label: "Town of Manchester, Fire Department", href: "https://manchester-vt.gov/fire" },
      r2024: { label: "Town of Manchester, 2024 Town Report", href: MVT24, note: "Fire Department report, PDF page 55" },
    },
  },
  "north-bennington": {
    description:
      "North Bennington Fire Department: established in 1834 and recognised as Vermont's oldest active volunteer fire department, " +
      "with an ice and cold-water rescue team.",
    facts: [
      ["Established", "1834"],
      ["Recognised as", "Vermont's oldest active volunteer fire department"],
      ["Special team", "Ice and cold-water rescue"],
    ],
    contact: { chief: "Ed Myers Jr.", source: "banner" },
    history: {
      intro:
        "Besides firefighting and emergency response, the village department keeps a team trained and equipped for rescues from frigid water and unstable ice.",
      events: [
        { year: 1834, text: "The North Bennington Fire Department is established.", source: "banner" },
      ],
    },
    residents: [],
    sources: {
      banner: { label: "Bennington Banner, \"Fire departments honored in Bennington\" (20 October 2026)", href: "https://www.benningtonbanner.com/local-news/fire-departments-honored-in-bennington/5039932" },
    },
  },
  peru: {
    description:
      "Peru Fire Department: 58 incidents in 2025, a new chief after Chuck Black's 40 years, $22,215 of donated equipment " +
      "and 41 burn permits.",
    facts: [
      ["Calls", "58 incidents in 2025"],
      ["Donated equipment", "$22,215 bought by the Fire Company and given to the town in 2025"],
      ["Burn permits", "41 issued in 2025"],
    ],
    contact: { chief: "Mike Gayda", source: "r2025" },
    history: {
      intro: "Peru's Fire Company raises money to equip the town's department. Half its incidents are automatic alarms.",
      events: [
        { year: 2025, calls: 58, text: "Chuck Black retires as fire chief after 40 years and stays on as treasurer; Mike Gayda takes over. A September wildland fire on National Forest land spreads underground from a campfire ring, and a statewide burn ban follows.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Automatic alarms were nearly half of 2025's incidents.",
      byType: {
        title: "Incidents by type, 2025",
        bars: [
          { label: "Automatic alarms", value: 28 },
          { label: "Agency assist or mutual aid", value: 7 },
          { label: "Motor vehicle accidents", value: 6 },
          { label: "CO alarms", value: 4 },
          { label: "Wildland fires", value: 4 },
          { label: "Odor investigations", value: 2 },
          { label: "Structure fire", value: 1 },
        ],
        note: "The types add up to the 58 incidents reported.",
        source: "r2025",
      },
    },
    residents: [
      { label: "Burn permits", href: PERU, text: "Needed for debris burning when there is no snow on the ground; only unpainted, untreated wood may be burned." },
    ],
    sources: {
      r2025: { label: "Town of Peru, 2025 Town Report", href: PERU, note: "Fire department and fire warden reports, PDF page 13" },
    },
  },
  pownal: {
    description:
      "Pownal's two fire departments: Pownal Valley Fire Department, with three stations and a push to replace its Center Station, " +
      "and the Pownal Fire Protective Association, with over 140 calls in 2025.",
    subtitle: "Pownal Valley Fire Department and Pownal Fire Protective Association",
    facts: [
      ["Departments", "Two: Pownal Valley Fire Department and Pownal Fire Protective Association"],
      ["Pownal Valley", "Three stations: Center, East and North"],
      ["Protective Association calls", "Over 140 in 2025"],
    ],
    history: {
      intro:
        "Pownal Valley spends its town funds on operations, maintenance and the upkeep of its three stations, and teaches fire prevention at the elementary school. " +
        "The Protective Association uses a UTV for rescues off Pownal's mountains.",
      events: [
        { year: 2025, calls: 140, callsApprox: true, text: "The Protective Association's new truck arrives in February; it adds thermal imaging cameras and another AED, and wins grants for protective and wildland gear. Pownal Valley applies for Congressional project funding to replace its Center Station.", source: "r2025" },
      ],
    },
    careers: {
      intro: "The Protective Association makes training a top priority and hosts classes for departments across the area.",
      points: ["The Protective Association meets most Monday nights at 7 pm"],
      applyUrl: PWNL,
      source: "r2025",
    },
    residents: [],
    sources: {
      r2025: { label: "Town of Pownal, Annual Report for the year ending 30 June 2025", href: PWNL, note: "Department reports, PDF pages 83–84; firehouse tax exemption, page 92" },
    },
  },
  rupert: {
    description:
      "Rupert Volunteer Fire Department: 42 calls in 2025, half of them helping neighbouring towns, its officers, " +
      "and why it asked voters for $50,000.",
    facts: [
      ["Calls", "42 in 2025: 21 in town, 21 for neighbours"],
      ["Town funding asked", "$50,000"],
      ["Dispatch", "911, or dispatch directly at 1-518-747-3325"],
    ],
    contact: { chief: "Jimmy Joe Lewis", source: "r2025" },
    history: {
      intro:
        "Rupert's volunteers help their neighbours as often as they work at home, including Salem and Hebron across the New York line.",
      events: [
        { year: 2025, calls: 42, text: "The department asks to raise its town funding to $50,000. Gear now expires after five years instead of ten, and air packs after ten: a set of gear costs almost $5,000, an air pack with two bottles about $10,000.", source: "r2025" },
      ],
    },
    calls: {
      intro: "Calls in town and to neighbouring communities, 2025.",
      byType: {
        title: "Calls in town, 2025",
        bars: [
          { label: "EMS assists", value: 7 },
          { label: "Alarm activations", value: 6 },
          { label: "False alarms", value: 3 },
          { label: "Motor vehicle accidents", value: 2 },
          { label: "Lines down", value: 2 },
          { label: "Water emergency", value: 1 },
        ],
        note: "The 21 in-town calls; another 21 went to Salem (5), Arlington, Hebron, Wells and Dorset (3 each), West Pawlet (2), Pawlet and Manchester (1 each).",
        source: "r2025",
      },
    },
    residents: [
      { label: "Burn permits", href: RUPT, text: "Needed whenever there is no snow cover." },
    ],
    sources: {
      r2025: { label: "Town of Rupert, Town Report 2024–2025", href: RUPT, note: "Fire chief's report, PDF page 33 (scanned; read by OCR); fire warden, page 32" },
    },
  },
  stamford: {
    description:
      "Stamford Volunteer Fire Company: 86 calls in 2023 including 37 medical, an 11-minute average response, " +
      "Appalachian Trail rescues and a week of pumping basements.",
    facts: [
      ["Calls", "86 in 2023"],
      ["Average response", "11 minutes, with about 7 members per call (2023)"],
      ["Mutual aid", "Readsboro, and Clarksburg, Monroe and New Ashford in Massachusetts"],
    ],
    history: {
      intro:
        "Medical calls are the biggest share. Rescues on the Appalachian Trail are long: the only way out is to hike in and carry the patient.",
      events: [
        { year: 2022, text: "The Seth Warner Shelter moves two miles north, stretching a rescue there from 1½ to 4½ hours; the company sets up a tiered response with Southern Vermont search and rescue.", source: "r2023" },
        { year: 2023, calls: 86, text: "Trees felled by a 30-inch snowstorm damage the station. After the July floods, crews pump 10 basements around the clock for six days. A new truck is ordered, with a 650-day wait.", source: "r2023" },
      ],
    },
    calls: {
      intro: "Medical emergencies were 37 of 2023's 86 calls.",
      byType: {
        title: "Calls by type, 2023",
        bars: [
          { label: "Medical emergencies", value: 37 },
          { label: "Car accidents", value: 14 },
          { label: "Weather-related", value: 10 },
          { label: "Searches", value: 7 },
          { label: "Power lines", value: 5 },
          { label: "Structure fires", value: 3 },
          { label: "Chimney fires", value: 3 },
          { label: "Illegal burning", value: 3 },
          { label: "Alarm activations", value: 2 },
          { label: "Vehicle fire", value: 1 },
          { label: "Service call", value: 1 },
        ],
        note: "The types add up to the 86 calls reported.",
        source: "r2023",
      },
    },
    residents: [],
    sources: {
      r2023: { label: "Town of Stamford, 2023 Town Report", href: STMF, note: "Stamford Volunteer Fire Company report, PDF page 36" },
    },
  },
  winhall: {
    description:
      "Winhall Fire Department in Bondville: more than 60 years of volunteer service, the town's fire equipment fund, " +
      "and how to join.",
    facts: [
      ["Service", "More than 60 years"],
      ["Station", "107 Vermont Route 30, Bondville"],
      ["Equipment fund", "$175,000 set aside by the town (fiscal 2025)"],
    ],
    history: {
      intro:
        "Winhall's volunteers answer fires, accidents and natural disasters in Winhall and the surrounding towns. " +
        "The Winhall-Stratton Fire District is a water and sewer district, not part of the fire department.",
      events: [
        { year: 2025, text: "Voters are asked to set up a Fire Equipment Maintenance Fund, and the selectboard continues to study the future of the firehouse property.", source: "r2025" },
      ],
    },
    careers: {
      intro: "The department takes new members through a membership form on its website.",
      points: [],
      applyUrl: `${WNHL}/members.html`,
      source: "members",
    },
    residents: [],
    sources: {
      dept: { label: "Winhall Fire Department", href: WNHL },
      members: { label: "Winhall Fire Department, Members", href: `${WNHL}/members.html` },
      r2025: { label: "Town of Winhall, 2025 Town Report (draft)", href: "https://www.winhall.org/TownReportDraftFull.pdf", note: "Warning article 4; selectboard report; fund appropriations" },
    },
  },
  dover: {
    description:
      "Dover's two fire departments: the East Dover Volunteer Fire Company, protecting the town since 1948, " +
      "and the town-run West Dover Fire Department, with a firehouse built in 1995.",
    subtitle: "East Dover Volunteer Fire Company and West Dover Fire Department",
    facts: [
      ["Departments", "Two: East Dover (independent, since 1948) and West Dover (run by the town)"],
      ["West Dover", "Firehouse completed 1995; includes a search and rescue team"],
      ["Trucks", "Each station has two engines and a tanker"],
    ],
    history: {
      intro:
        "Because of rapid growth on the west side of Dover, the town took over the West Dover Fire Department. East Dover's company stayed independent, " +
        "with yearly allocations from the town. West Dover's search and rescue team finds lost and injured people in remote recreation areas.",
      events: [
        { year: 1948, text: "The East Dover Volunteer Fire Company begins protecting the community.", source: "edfd" },
        { year: 1995, text: "West Dover's new firehouse is completed across Route 100 from the original, which becomes the police station.", source: "tp" },
        { year: 2013, text: "West Dover celebrates its 50th anniversary with an open house, a parade on Route 100 and the dedication of an antique 1927 Seagrave truck.", source: "fma" },
      ],
    },
    residents: [],
    sources: {
      edfd: { label: "East Dover Volunteer Fire Department", href: "https://eastdoverfd.com/" },
      tp: { label: "Town of Dover, Town Plan (March 2024)", href: DOVTP, note: "Fire protection, PDF pages 11 and 50–51" },
      fma: { label: "Fire Mutual Aid news, \"West Dover FD celebrates 50 years\" (2013)", href: "https://firemutualaid.com/news/story/west-dover-fd-celebrates-50-years" },
    },
  },
  londonderry: {
    description:
      "Londonderry's two volunteer fire companies: Champion Fire Company #5 in South Londonderry, with 47 calls in 2025 and a junior program, " +
      "and Phoenix Fire Company #6.",
    subtitle: "Champion Fire Company #5 and Phoenix Fire Company #6",
    facts: [
      ["Companies", "Champion #5 (South Londonderry Fire Department) and Phoenix #6 (Londonderry Fire Department)"],
      ["Champion calls", "47 in 2025, plus 16 mutual aid calls"],
      ["Juniors", "Three active junior firefighters at Champion"],
    ],
    history: {
      intro:
        "The town is served by two volunteer companies. Both receive money from trust funds held for them by the town: the Tyler Fund for Champion and the Boynton Fund for Phoenix.",
      events: [
        { year: 2024, text: "The town's trustees pay $37,511.65 from the Tyler Fund to Champion and $14,619.46 from the Boynton Fund to Phoenix, after street lighting costs.", source: "r2026" },
        { year: 2025, calls: 47, text: "Champion's calls fall from 2024; it gives mutual aid in eight towns. Assistant Chief Matthew Mosher, with Champion since 2003, retires.", source: "r2026" },
      ],
    },
    careers: {
      intro: "Champion asks only for \"the desire to help your friends and neighbors in times of crisis\": no experience is necessary.",
      points: ["Juniors train, attend meetings and go to calls in a support role"],
      applyUrl: `${LDRY}/services/fire_and_rescue/index.php`,
      source: "r2026",
    },
    residents: [],
    sources: {
      page: { label: "Town of Londonderry, Fire and Rescue", href: `${LDRY}/services/fire_and_rescue/index.php` },
      r2026: { label: "Town of Londonderry, Town Report 2026 (fiscal year 2025)", href: `${LDRY}/Documents/Departments/Town%20Clerk/Annual%20Town%20Meeting/Town%20Reports/Londonderry%20Town%20Report%202026.pdf`, note: "Champion report, PDF page 40; trust funds, page 18" },
    },
  },
  windham: {
    description:
      "Windham Volunteer Fire Company: 28 calls in 2022, a pie auction and chicken barbecue, monthly meetings, " +
      "and plans for the firehouse.",
    facts: [
      ["Calls", "28 in 2022: 20 in town, 8 mutual aid"],
      ["Meets", "First Thursday of the month, 6 pm, at the fire station"],
      ["Firehouse", "802-875-5332"],
    ],
    history: {
      intro:
        "Windham's company is funded partly by its own events: a basket party, a chicken barbecue and a pie auction. It visits the school for fire prevention.",
      events: [
        { year: 2022, calls: 28, text: "The company starts planning an equipment replacement schedule and the firehouse's future: an update or a complete rebuild. Every pupil gets a Windham fire shirt at the school visit.", source: "r2022" },
      ],
    },
    careers: {
      intro: "The company is looking for new members.",
      points: ["Meetings the first Thursday of the month at 6 pm; call the firehouse with questions"],
      applyUrl: WNDM,
      source: "r2022",
    },
    residents: [],
    sources: {
      r2022: { label: "Town of Windham, 2022 Town Report", href: WNDM, note: "Windham Volunteer Fire Company report, PDF page 41" },
    },
  },
  jericho: UJFD,
  underhill: UJFD,
};

/** Thousands separators, no decimals: 7528864 → "7,528,864". */
export const dollars = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
