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
    districts: { name: string; firstDue: string; from: string; href?: string; note: string }[];
    source: string;
  };
  /** Notes printed under a station, keyed by the station's slug. */
  stationNotes?: Record<string, { text: string; source: string }>;
  careers: { intro: string; points: string[]; applyUrl: string; source: string };
  residents: { label: string; href: string; text: string }[];
  sources: Record<string, Source>;
}

const SB = "https://www.southburlingtonvt.gov";

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
};

/** Thousands separators, no decimals: 7528864 → "7,528,864". */
export const dollars = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
