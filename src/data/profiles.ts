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
  /** Rows added to the facts at the top of the page. */
  facts: [string, string][];
  contact?: { chief?: string; phone?: string; website?: string; source: string };
  history: { intro: string; events: Event[] };
  money: {
    intro: string;
    /** The year the lines below are for, e.g. "fiscal year 2027 (proposed)". */
    year: string;
    lines: MoneyLine[];
    linesNote: string;
    capital: { title: string; lines: MoneyLine[]; note: string };
    source: string;
  };
  coverage: {
    intro: string;
    /** Column headings for the table; default District / First due / From. */
    columns?: [string, string, string];
    districts: { name: string; firstDue: string; from: string; href?: string; note: string }[];
    source: string;
  };
  /** Notes printed under a station, keyed by the station's slug. */
  stationNotes?: Record<string, { text: string; source: string }>;
  careers: { intro: string; points: string[]; applyUrl: string; source: string };
  /** Calls charts: by year (columns), by type and by vehicle (horizontal bars). */
  calls?: { intro: string; byYear?: Chart; byType?: Chart; byUnit?: Chart };
  residents: { label: string; href: string; text: string }[];
  sources: Record<string, Source>;
}

const SB = "https://www.southburlingtonvt.gov";
const BTV = "https://www.burlingtonvt.gov";

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
};

/** Thousands separators, no decimals: 7528864 → "7,528,864". */
export const dollars = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
