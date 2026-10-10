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
};

/** Thousands separators, no decimals: 7528864 → "7,528,864". */
export const dollars = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
