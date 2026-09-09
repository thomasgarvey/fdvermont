# Public records request — VFIRS incident data

The one item on a town page that cannot be sourced from anything published. The
Report of the State Fire Marshal gives statewide totals only, and the VFIRS
system that holds per-department figures is open to fire departments, not to the
public. This is the route to it.

## Where to send it

**Vermont Division of Fire Safety**
1311 US Route 302, Suite 600, Barre VT 05641-2351
`dps.vfirs@vermont.gov` · 802-479-7561 · 800-640-2106

Send by email to `dps.vfirs@vermont.gov`, which is the address the Division
publishes for VFIRS. If nothing comes back within the statutory window, the
appeal goes to the Commissioner: Department of Public Safety, Attn: Record
Request Appeal, 45 State Drive, Waterbury VT 05671-1300.

Under 1 V.S.A. § 318(a) the Division must respond within **three business days**,
or give notice of a ten-day extension.

---

## The letter

**To:** dps.vfirs@vermont.gov
**Subject:** Public records request — VFIRS incident counts (1 V.S.A. §§ 315–320)

To the Division of Fire Safety,

Under Vermont's Public Records Act, 1 V.S.A. §§ 315–320, I request the following
records held by the Division, for calendar years **2021 through 2025**.

**1. Richmond Fire Department (FDID 4519).** A count of the incidents recorded
in VFIRS, broken down by NFIRS incident type code and by year. If the VFIRS
reporting module produces a standard report of this kind, that report is what I
am after.

**2. The same table for every reporting department in Vermont**, identified by
FDID and department name. I ask for this in the same request because I expect it
is the same query without the filter on one department, and it would spare us
both a great many separate requests. If it turns out to be materially more
work, please treat it as severable and fill item 1 alone — I would rather have
Richmond promptly than hold up both.

**3. In the alternative,** if no summary of that kind exists as a record: an
export of the incident records for the same period containing only these fields
— FDID, incident date, NFIRS incident type code and description, and aid given
or received.

**What I am not asking for.** No personally identifying information of any kind:
no names, no patient information, no street addresses, no narrative fields, no
casualty details. If any part of what I have described is exempt from
disclosure, please release the remainder and cite the exemption relied on for
whatever is withheld, as 1 V.S.A. § 318(b) provides.

**Format and cost.** Electronic delivery — CSV, Excel or PDF — to this address
is preferred. If filling this request will incur charges, please give me an
estimate before doing the work.

**Why I am asking.** I maintain fdvermont.org, a free public archive of every
fire station in Vermont — 274 stations across 196 towns, with a page for each
department setting out what is on the public record: coverage, contact, budget,
burn permits, how to join. The Report of the State Fire Marshal publishes
statewide totals but no department-level figures, so this is the only route to
what a given department actually turns out for. Anything the Division releases
will be published with the Division named as its source, free to read.

Thank you for your help.

Tom Garvey
fdvermont.org
hello@fdvermont.org

---

## Notes on how this was framed

**Asking for the summary first, the export second.** 1 V.S.A. § 316(c) does not
oblige an agency to create a record that does not already exist, so a request for
a "summary" can be refused on that ground alone. Naming the VFIRS reporting
module meets that — a report the system already generates is a record — and the
field-limited export is the fallback if it is not.

**Ruling out personal information up front.** The broad VFIRS set includes EMS
calls, and an unbounded request touching those invites a slow refusal on
patient-privacy and personal-records grounds (1 V.S.A. § 317(c)(7) among others).
Incident date, type code and aid given carry none of that, and asking for only
those fields should make this a quick yes.

**A note on the statute.** 20 V.S.A. § 2833 requires the chief of a fire
department — or the selectboard chair where there is none — to report to the
State Fire Marshal within five days any fire causing serious injury or more than
$200 of damage. That mandate is narrower than what VFIRS actually collects:
VFIRS gathers the full NFIRS incident set, EMS included, and participation is
short of universal (77.53% of Vermont departments in 2016, 85% in 2014). So do
not tell the Division that the law requires everything in VFIRS. It does not.

**Asking for the whole state, severably.** Item 2 is the same query as item 1
without the filter, so the marginal effort is small and the payoff is every
department at once rather than 196 separate requests. Saying plainly that it can
be severed protects item 1: an agency that would refuse a broad request as
burdensome can drop it and still fill the narrow one, rather than refusing the
lot. Do not drop that sentence.

## If it works

Answers go in the `Calls Note` field on the Fire Departments table in Airtable,
with the Division named as the source and the date it was received — the town
page renders that field verbatim, so the source travels with the figure.

If only item 1 comes back, the same letter serves any other department: swap the
name and FDID, both of which are on its department page already.

**Status: not sent yet.** Record the date here when it goes, so the
three-business-day clock under 1 V.S.A. § 318(a) can be counted.
