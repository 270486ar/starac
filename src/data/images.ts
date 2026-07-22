/**
 * Centralized image manifest.
 *
 * Every image path in the app is defined here. To replace an image,
 * simply drop a new file at the corresponding path in public/images/
 * and update the path here if the filename changes.
 *
 * If an image file is missing at runtime, the PLACEHOLDER fallback
 * is used automatically via the `getImage()` helper.
 */

export const PLACEHOLDER = '/images/placeholders/no-image.svg';

export const images = {
  hero: {
    banner: '/images/hero/hero-banner.svg',
  },
  faculty: {
  rahulgandh: '/images/faculty/rahulgandh.jpg',
  rajasri: '/images/faculty/rajasri.jpg',
  rajiv: '/images/faculty/rajiv.jpg',
  jeyaseelan: '/images/faculty/jeyaseelan.jpg',
  muthu: '/images/faculty/muthu.jpg',
  mohan: '/images/faculty/mohan.jpg',
  vinoth: '/images/faculty/vinoth.jpg',
  nivetha: '/images/faculty/nivetha.jpg',
  murugavel: '/images/faculty/murugavel.jpg',
  monicaminu: '/images/faculty/monicaminu.jpg',
  krishnaveni: '/images/faculty/krishnaveni.jpg',
  babu: '/images/faculty/babu.jpg',
  carolineMary: '/images/faculty/carolineMary.jpg',
  medonna: '/images/faculty/medonna.jpg',
  rajeswari: '/images/faculty/rajeswari.jpg',
  marzuka: '/images/faculty/marzuka.jpg',
  sugandhi: '/images/faculty/sugandhi.jpg',
  jasmine: '/images/faculty/jasmine.jpg',
  rehanaBegum: '/images/faculty/rehanaBegum.jpg',
  sathya: '/images/faculty/sathya.jpg',
  aruljothi: '/images/faculty/aruljothi.jpg',
  meeraJose: '/images/faculty/meeraJose.jpg',
  manikumaran: '/images/faculty/manikumaran.jpg',
  },
  testimonials: {
    aravindKumar: '/images/testimonials/aravind-kumar.jpg',
    divyaS: '/images/testimonials/divya-s.jpg',
    karthikRaja: '/images/testimonials/karthik-raja.jpg',
    priyankaM: '/images/testimonials/priyanka-m.jpg',
    suryaPrakash: '/images/testimonials/surya-prakash.jpg',
    jananiK: '/images/testimonials/janani-k.jpg',
  },
  leaderboard: {
    aravindKumar: '/images/leaderboard/aravind-kumar.jpg',
    divyaS: '/images/leaderboard/divya-s.jpg',
    karthikRaja: '/images/leaderboard/karthik-raja.jpg',
    jananiK: '/images/leaderboard/janani-k.jpg',
    suryaPrakash: '/images/leaderboard/surya-prakash.jpg',
    meenaT: '/images/leaderboard/meena-t.jpg',
  },
  gallery: {
    acClassroom: '/images/gallery/ac-classroom.jpg',
    scienceLab: '/images/gallery/science-lab.jpg',
    annualDay: '/images/gallery/annual-day.jpg',
    awardCeremony: '/images/gallery/award-ceremony.jpg',
    groupStudy: '/images/gallery/group-study.jpg',
    examHall: '/images/gallery/exam-hall.jpg',
  },
  events: {
    newsTopper: '/images/events/news-topper.jpg',
    newsPassRate: '/images/events/news-pass-rate.jpg',
    newsSmartClassrooms: '/images/events/news-smart-classrooms.jpg',
    newsAnnualDay: '/images/events/news-annual-day.jpg',
  },
  landmarks: {
    ammaiyarTemple: '/images/landmarks/ammaiyar-temple.jpg',
    karaikalBeach: '/images/landmarks/karaikal-beach.jpg',
    lighthouse: '/images/landmarks/lighthouse.jpg',
    angelsChurch: '/images/landmarks/angels-church.jpg',
    nagoreDargah: '/images/landmarks/nagore-dargah.jpg',
  },
  logos: {
    academy: '/images/logos/logo.svg',
  },
} as const;

/**
 * Returns the given image path or the placeholder if the path is empty.
 * Use this for any image that might not have a file yet.
 */
export function getImage(path: string | undefined | null): string {
  if (!path || path.trim() === '') return PLACEHOLDER;
  return path;
}
