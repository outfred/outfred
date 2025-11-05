import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Facebook, Twitter, Instagram, Mail, Linkedin, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({});

  const loadSocialLinks = () => {
    try {
      const settings = localStorage.getItem('admin_site_settings');
      if (settings) {
        const parsed = JSON.parse(settings);
        if (parsed.social) {
          setSocialLinks(parsed.social);
        }
      }
    } catch (error) {
      console.error('Failed to load social links:', error);
    }
  };

  useEffect(() => {
    loadSocialLinks();
    
    const handleStorageChange = () => {
      loadSocialLinks();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <footer className="mt-20 backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 border-t border-white/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground">O</span>
              </div>
              <span className="text-xl text-primary">
                Outfred.eg
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Fashion platform with AI-powered search and outfit generation
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <div className="space-y-2">
              <button
                onClick={() => onNavigate('home')}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('home')}
              </button>
              <button
                onClick={() => onNavigate('merchants')}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('merchants')}
              </button>
              <button
                onClick={() => onNavigate('join')}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('joinAsMerchant')}
              </button>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="mb-4">Information</h3>
            <div className="space-y-2">
              <button
                onClick={() => onNavigate('about')}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('about')}
              </button>
              <button
                onClick={() => onNavigate('privacy')}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('privacy')}
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('contact')}
              </button>
              <button
                onClick={() => onNavigate('debug')}
                className="block text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
              >
                🔧 Debug Panel
              </button>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4">Follow Us</h3>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/50 dark:bg-gray-800/50 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                  title="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/50 dark:bg-gray-800/50 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/50 dark:bg-gray-800/50 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all"
                  title="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/50 dark:bg-gray-800/50 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/50 dark:bg-gray-800/50 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
                  title="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
              {!socialLinks.facebook && !socialLinks.instagram && !socialLinks.twitter && !socialLinks.linkedin && !socialLinks.youtube && (
                <p className="text-sm text-muted-foreground">
                  {t('language') === 'ar' ? 'لا توجد روابط اجتماعية' : 'No social links configured'}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 Outfred.eg - All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
