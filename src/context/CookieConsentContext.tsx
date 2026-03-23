import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'eco_resume_cookie_consent';

export type CookieConsentChoice = 'essential' | 'analytics';

function readStored(): CookieConsentChoice | null {
  if (typeof window === 'undefined') return null;
  const v = localStorage.getItem(STORAGE_KEY);
  return v === 'essential' || v === 'analytics' ? v : null;
}

type CookieConsentContextValue = {
  consent: CookieConsentChoice | null;
  allowAnalytics: boolean;
  openPreferences: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null
);

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider');
  }
  return ctx;
}

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsent] = useState<CookieConsentChoice | null>(() =>
    readStored()
  );
  const [forceOpen, setForceOpen] = useState(false);

  const applyChoice = useCallback((choice: CookieConsentChoice) => {
    localStorage.setItem(STORAGE_KEY, choice);
    setConsent(choice);
    setForceOpen(false);
  }, []);

  const openPreferences = useCallback(() => {
    setForceOpen(true);
  }, []);

  React.useEffect(() => {
    const onOpen = () => setForceOpen(true);
    window.addEventListener('eco-open-cookie-preferences', onOpen);
    return () => window.removeEventListener('eco-open-cookie-preferences', onOpen);
  }, []);

  const value = useMemo(
    () => ({
      consent,
      allowAnalytics: consent === 'analytics',
      openPreferences,
    }),
    [consent, openPreferences]
  );

  const bannerVisible = consent === null || forceOpen;

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {bannerVisible && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none"
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-desc"
        >
          <div className="max-w-4xl mx-auto pointer-events-auto rounded-xl border border-gray-200 bg-white shadow-xl p-5 md:p-6 text-gray-800">
            <h2
              id="cookie-banner-title"
              className="text-lg font-semibold text-gray-900 mb-2"
            >
              Cookies and privacy
            </h2>
            <p id="cookie-banner-desc" className="text-sm text-gray-600 mb-4 leading-relaxed">
              We use essential storage so the builders work in your browser. With your
              permission, we also use Vercel Analytics to understand traffic in aggregate.
              See our{' '}
              <Link to="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link to="/cookies" className="text-blue-600 hover:underline">
                Cookie Policy
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={() => applyChoice('essential')}
                className="order-2 sm:order-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-800 font-medium hover:bg-gray-50 transition-colors"
              >
                Essential only
              </button>
              <button
                type="button"
                onClick={() => applyChoice('analytics')}
                className="order-1 sm:order-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Accept analytics
              </button>
            </div>
          </div>
        </div>
      )}
    </CookieConsentContext.Provider>
  );
}
