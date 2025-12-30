import { Facebook, Instagram, Mail, Phone } from 'lucide-react';
import { activeContent } from '~/configs/content-active';

export function Footer() {
  const { about, quickLinks, contact, whatsappButton } = activeContent.footer;

  return (
    <footer className="relative bg-gradient-to-b from-[#fffcf9] to-[#fff6f2] border-t-2 border-[#f2e3dd]" dir="rtl">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-main via-primary-light to-primary-main opacity-20" />
      
      <div className="container mx-auto max-w-6xl py-16 md:py-20 px-4 md:px-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12 md:mb-16">
          {/* About Section */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-main to-primary-light rounded-full" />
              <h3 className="text-xl font-bold text-text-primary">{about.heading}</h3>
            </div>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-md text-center md:text-right">
              {about.text}
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-main to-primary-light rounded-full" />
              <h3 className="text-xl font-bold text-text-primary">{quickLinks.heading}</h3>
            </div>
            <ul className="space-y-3 text-text-secondary text-sm md:text-base">
              {quickLinks.links.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="hover:text-primary-main transition-all duration-200 hover:translate-x-[-4px]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-main to-primary-light rounded-full" />
              <h3 className="text-xl font-bold text-text-primary">{contact.heading}</h3>
            </div>
            <div className="flex flex-col gap-3 text-text-secondary text-sm md:text-base w-full">
              <a 
                href={`tel:${contact.phone}`} 
                className="inline-flex items-center gap-3 hover:text-primary-main transition-all duration-200 hover:translate-x-[-4px] group p-2 rounded-lg hover:bg-white/50"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-lighter/30 to-primary-light/30 flex items-center justify-center group-hover:from-primary-lighter group-hover:to-primary-light transition-all">
                  <Phone className="w-5 h-5 text-primary-main" />
                </div>
                <span className="font-medium">{contact.phone}</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-3 hover:text-primary-main transition-all duration-200 hover:translate-x-[-4px] group p-2 rounded-lg hover:bg-white/50"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-lighter/30 to-primary-light/30 flex items-center justify-center group-hover:from-primary-lighter group-hover:to-primary-light transition-all">
                  <Mail className="w-5 h-5 text-primary-main" />
                </div>
                <span className="font-medium">{contact.email}</span>
              </a>
              <a
                href={`https://wa.me/${contact.whatsappNumber}`}
                className="inline-flex items-center gap-3 hover:text-primary-main transition-all duration-200 hover:translate-x-[-4px] group p-2 rounded-lg hover:bg-white/50"
                target="_blank"
                rel="noreferrer"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-lighter/30 to-primary-light/30 flex items-center justify-center group-hover:from-primary-lighter group-hover:to-primary-light transition-all">
                  <svg
                    className="w-5 h-5 text-primary-main"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <span className="font-medium">{contact.phone}</span>
              </a>
            </div>
            
            {/* Social Media */}
            <div className="flex flex-col gap-3 mt-4 w-full">
              <span className="font-semibold text-text-primary text-sm md:text-base">{contact.followUs}</span>
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <a 
                  href="#" 
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-lighter/30 to-primary-light/30 flex items-center justify-center text-text-secondary hover:text-primary-main hover:from-primary-lighter hover:to-primary-light transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md" 
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-lighter/30 to-primary-light/30 flex items-center justify-center text-text-secondary hover:text-primary-main hover:from-primary-lighter hover:to-primary-light transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-md" 
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border & Copyright */}
        <div className="border-t border-[#f2e3dd] pt-8 md:pt-10">
          <p className="text-center text-sm text-text-muted">
            © {new Date().getFullYear()} Feed-Ease. כל הזכויות שמורות.
          </p>
        </div>
      </div>

      <a
        href={`https://wa.me/${whatsappButton.whatsappNumber}`}
        className="fixed z-[999] bottom-24 right-4 w-12 h-12 rounded-full bg-ui-whatsapp text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
        target="_blank"
        rel="noreferrer"
        aria-label={whatsappButton.ariaLabel}
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </footer>
  );
}
