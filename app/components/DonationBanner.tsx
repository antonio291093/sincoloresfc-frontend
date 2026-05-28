export default function DonationBanner() {
  return (
    <div className="w-full bg-gold-100 border-b border-gold-300 py-2 px-4 md:px-8 flex justify-center items-center gap-3 flex-wrap">
      <span className="font-body font-medium text-gold-800 text-sm md:text-base text-center">
        ¿Te gusta el proyecto? ¡Apóyalo con una donación!
      </span>
      <a
        href="https://paypal.me/antonio291093?country.x=MX&locale.x=es_XC"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gold-400 hover:bg-gold-500 text-gold-900 font-body font-bold px-3 py-1 rounded-[var(--radius-button)] transition-colors text-sm md:text-base shrink-0"
      >
        Donar
      </a>
    </div>
  )
}
