import { useCookieConsent } from '../context/CookieConsentContext';

type Props = {
  className?: string;
};

export function CookieSettingsLink({ className }: Props) {
  const { openPreferences } = useCookieConsent();
  return (
    <button
      type="button"
      onClick={openPreferences}
      className={
        className ??
        'text-gray-500 hover:text-white transition-colors text-left underline-offset-2 hover:underline'
      }
    >
      Cookie settings
    </button>
  );
}
