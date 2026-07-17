import Link from "next/link"

const footerLinks = {
  site: [
    { href: "/", label: "Ana Sayfa" },
    { href: "/haberler", label: "Haberler" },
    { href: "/incelemeler", label: "Incelemeler" },
    { href: "/karsilastirmalar", label: "Karsilastirmalar" },
  ],
  other: [
    { href: "/tartismalar", label: "Tartismalar" },
    { href: "/hakkimizda", label: "Hakkimizda" },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-[#283339] bg-[#0d171c] mt-auto">
      <div className="px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 bg-[#0b95da] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">AT</span>
              </div>
              <span className="text-white text-xl font-bold group-hover:text-[#0b95da] transition-colors duration-300">
                Araba Tutkunlari
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Otomobil dunyasina dair en son haberler, derinlemesine incelemeler ve tutkulu hikayeler.
            </p>
          </div>

          {/* Site Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Site</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.site.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-[#0b95da] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Diger</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.other.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-[#0b95da] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#283339] mt-8 pt-6">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Araba Tutkunlari. Tum haklari saklidir.
          </p>
        </div>
      </div>
    </footer>
  )
}
