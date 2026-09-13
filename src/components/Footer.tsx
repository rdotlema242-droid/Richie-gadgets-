import Link from "next/link";

const shopLinks = [
  { name: "Phones", href: "/shop?category=smartphones" },
  { name: "Gaming", href: "/shop?category=gaming" },
  { name: "Computers", href: "/shop?category=computers" },
  { name: "Audio", href: "/shop?category=audio" },
  { name: "Wearables", href: "/shop?category=wearables" },
  { name: "Accessories", href: "/shop?category=accessories" },
  { name: "Deals", href: "/deals" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

const supportLinks = [
  { name: "Delivery", href: "/faq#delivery" },
  { name: "Returns", href: "/faq#returns" },
  { name: "Warranty", href: "/faq#warranty" },
  { name: "Help", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-xl font-semibold tracking-tight">
                RICHIE<span className="font-normal text-muted"> GADGETS</span>
              </span>
            </Link>
            <p className="mt-3 text-muted-foreground text-sm max-w-xs leading-relaxed">
              Technology, thoughtfully selected.
            </p>
            <p className="mt-4 text-muted-foreground text-sm max-w-sm leading-relaxed">
              A modern electronics retailer offering smartphones, gaming
              systems, computers, audio and everyday technology.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Richie Gadgets. Portfolio demonstration website.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              TikTok
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              X
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
