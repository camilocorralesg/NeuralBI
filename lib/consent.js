// The visitor's analytics choice, as the cookie notice stores it. The site sets no cookies of its own: Vercel Web
// Analytics is cookieless and the language and this choice live in localStorage.
export const CONSENT_KEY = 'neuralbi_cookie_consent';
export const ACCEPTED = 'accepted';
export const DECLINED = 'essential';

export function readConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function saveConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked (a private window): the choice holds for this visit only.
  }
}

/** Anonymous analytics run unless the visitor declined them. */
export const analyticsAllowed = () => readConsent() !== DECLINED;

// Runs in <head>, before the first paint: marks a visitor who has not chosen yet (storage blocked counts as not
// chosen), so the notice the server drew shows from the first frame for them and never flashes for anyone else.
export const CONSENT_BOOTSTRAP = `(()=>{let v=null;try{v=localStorage.getItem('${CONSENT_KEY}')}catch{}if(!v)document.documentElement.dataset.consent='pending'})();`;
