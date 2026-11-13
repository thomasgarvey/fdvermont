/**
 * A tel: link for a phone number as printed, which may carry a note ("(802)
 * 483-6200 (Tuesdays at 7 pm)") or leave off the area code ("285-2050"). Takes the
 * first number in the text; a seven-digit one is given Vermont's 802.
 */
export const telHref = (phone: string): string | null => {
  const m = phone.match(/(?:\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}|\b\d{3}[\s.-]\d{4}\b/);
  if (!m) return null;
  let d = m[0].replace(/\D/g, '');
  if (d.length === 7) d = '802' + d;
  if (d.length === 10) d = '1' + d;
  return `tel:+${d}`;
};
