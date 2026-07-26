import { Facebook, Instagram, ShoppingBag } from "lucide-react";
import { socialLinks } from "@/lib/data";

const ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  ebay: ShoppingBag,
};

export function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((link) => {
        const Icon = ICONS[link.icon];
        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            title={link.label}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-valley-gold/40 text-current transition-colors hover:border-valley-gold hover:text-valley-gold"
          >
            <Icon size={18} strokeWidth={2} />
          </a>
        );
      })}
    </div>
  );
}
