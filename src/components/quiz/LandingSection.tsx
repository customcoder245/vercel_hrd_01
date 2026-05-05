import { forwardRef } from "react";
import hormoneLogo from "@/assets/hormone-reset-diet-logo.webp";
import heroWoman from "@/assets/hero-woman-original.webp";

// Inline tiny SVG instead of importing the whole lucide-react module on the
// landing page. Avoids pulling the icon library into the landing chunk.
const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

interface LandingSectionProps {
  onStart: (sex: string) => void;
  liveCount: number;
}

const LandingSection = forwardRef<HTMLElement, LandingSectionProps>(({ onStart, liveCount }, ref) => {
  return (
    <>
    <section className="min-h-screen md:h-screen flex flex-col bg-white overflow-visible relative" aria-label="Hormone Reset Diet Quiz">
      <header className="pt-4 pb-2">
        <nav className="px-6 md:px-16 lg:px-24 flex items-start justify-between" aria-label="Main navigation">
          <img src={hormoneLogo} alt="Hormone Reset Diet" className="h-12 md:h-14 w-auto" width={200} height={67} decoding="async" loading="eager" />
        </nav>
      </header>

      <div className="flex-1 relative overflow-hidden min-h-0">
        <div className="hidden lg:flex absolute inset-y-0 -right-8 w-[34%] z-0 items-end justify-center">
          <div className="w-full animate-fade-in-right flex items-end justify-center h-full">
            <img
              src={heroWoman}
              alt="Confident woman after Hormone Reset Diet"
              className="h-full w-auto object-contain pointer-events-none select-none"
              width={620}
              height={900}
              decoding="async"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>

        <div className="px-6 sm:px-4 md:px-12 lg:px-24 py-6 sm:pt-24 sm:pb-20 lg:py-0 relative z-10 w-full h-full flex flex-col justify-center">
          <div className="w-full max-w-md sm:max-w-[36rem] lg:max-w-5xl text-left">
            <div className="animate-fade-in-up">
              
              <h1 className="text-[2rem] sm:text-[2.5rem] lg:text-6xl font-display font-bold text-foreground leading-[1.08] mb-5 sm:mb-4">
                Discover what happens<br />when you fix your hormones.
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-foreground/80 font-body font-semibold mb-8 sm:mb-12 lg:mb-8 max-w-lg">How much weight would you like to lose?</p>
              <div className="grid grid-cols-2 gap-3 max-w-sm sm:max-w-[28.8rem] w-full">
                {["0–20 lbs", "20–40 lbs", "40–60 lbs", "60+ lbs"].map((label) => (
                  <button
                    key={label}
                    onClick={() => onStart(label)}
                    className="py-4 px-6 rounded-full bg-primary text-primary-foreground font-body font-semibold text-base shadow-medium hover:shadow-glow active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 max-w-sm sm:max-w-[28.8rem] w-full">
                <div className="flex items-center gap-1.5 flex-wrap select-none pointer-events-none" aria-hidden="true">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-3.5 h-3.5 text-honey" />)}
                  <span className="text-xs font-display font-semibold text-foreground ml-1">4.85</span>
                  <span className="text-xs text-foreground/60 font-body">stars</span>
                  <span className="text-xs text-foreground/30 font-body">·</span>
                  <span className="text-xs font-display font-semibold text-foreground">3K+</span>
                  <span className="text-xs text-foreground/60 font-body">reviews</span>
                  <span className="text-xs text-foreground/30 font-body">·</span>
                  <span className="text-xs font-display font-semibold text-foreground">18K+</span>
                  <span className="text-xs text-foreground/60 font-body">members</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Trust bar hidden for now */}

      <footer className="bg-[rgb(32,36,44)] border-t border-white/10 px-6 py-4">
        <p className="text-center text-xs text-white/40 font-body mb-2">
          © 2026 <a href="https://hormonereset.diet" className="underline hover:text-white/60 transition-colors">hormonereset.diet</a>. All rights reserved. Results may vary depending on the individual.
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-white/40 font-body mb-3">
          <a href="https://hormonereset.diet/privacy" className="hover:text-white/60 transition-colors" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          <span>|</span>
          <a href="https://hormonereset.diet/terms" className="hover:text-white/60 transition-colors" target="_blank" rel="noopener noreferrer">Product Support</a>
        </div>
        <div className="flex items-center justify-center gap-4">
          <a href="https://instagram.com/mediterraneanplan" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/70 transition-colors" aria-label="Instagram">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://x.com/themedplan/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/70 transition-colors" aria-label="X">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>
      </footer>
    </section>

    {/* SEO text block hidden for now */}
    </>
  );
});

LandingSection.displayName = "LandingSection";

export default LandingSection;
