/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary colors (using CSS variables from theme)
        'primary-main': 'var(--color-primary-main)',
        'primary-light': 'var(--color-primary-light)',
        'primary-lighter': 'var(--color-primary-lighter)',
        'primary-dark': 'var(--color-primary-dark)',
        
        // Text colors
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'text-price': 'var(--color-text-price)',
        
        // Background colors
        'bg-page': 'var(--color-bg-page)',
        'bg-card': 'var(--color-bg-card)',
        'bg-hover': 'var(--color-bg-hover)',
        'bg-alt': 'var(--color-bg-alt)',
        
        // Border colors
        'border-default': 'var(--color-border-default)',
        'border-selected': 'var(--color-border-selected)',
        'border-divider': 'var(--color-border-divider)',
        
        // UI colors
        'ui-radio-unchecked': 'var(--color-ui-radio-unchecked)',
        'ui-star': 'var(--color-ui-star)',
        'ui-success': 'var(--color-ui-success)',
        'ui-announcement': 'var(--color-ui-announcement)',
        'ui-selling-bg': 'var(--color-ui-selling-bg)',
        'ui-icon-bg': 'var(--color-ui-icon-bg)',
        'ui-icon-color': 'var(--color-ui-icon-color)',
        'ui-tag': 'var(--color-ui-tag)',
        'ui-whatsapp': 'var(--color-ui-whatsapp)',
        
        // Gradient colors (for manual gradient construction)
        'gradient-from': 'var(--color-gradient-from)',
        'gradient-via': 'var(--color-gradient-via)',
        'gradient-to': 'var(--color-gradient-to)',
        
        // Keep old aliases for backward compatibility (will be removed after refactor)
        'brand-bg': 'var(--color-bg-page)',
        'brand-surface': 'var(--color-bg-card)',
        'brand-surface-alt': 'var(--color-bg-alt)',
        'brand-primary': 'var(--color-primary-main)',
        'brand-primary-dark': 'var(--color-primary-dark)',
        'brand-accent': 'var(--color-primary-light)',
        'brand-text-primary': 'var(--color-text-primary)',
        'brand-text-secondary': 'var(--color-text-secondary)',
        'brand-muted': 'var(--color-text-muted)',
        'brand-success': 'var(--color-ui-success)',
        'brand-danger': 'var(--color-primary-main)',
        'brand-divider': 'var(--color-border-divider)',
        'brand-tag': 'var(--color-ui-tag)',
        'brand-announcement': 'var(--color-ui-announcement)',
        'brand-selling-bg': 'var(--color-ui-selling-bg)',
        'brand-icon-bg': 'var(--color-ui-icon-bg)',
        'brand-icon-color': 'var(--color-ui-icon-color)',
      },
      fontFamily: {
        sans: ['var(--font-family-main)', 'system-ui', 'sans-serif'],
        // Keep heebo alias for backward compatibility
        heebo: ['var(--font-family-main)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '22px',
        '2xl': '28px',
        '3xl': '34px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '32px',
        'xxl': '48px',
      },
      borderRadius: {
        'card': '16px',
        'rounded': '12px',
        'pill': '999px',
      },
      boxShadow: {
        'card': '0 10px 30px rgba(0,0,0,0.06)',
        'button': '0 6px 16px rgba(224,122,99,0.35)',
      },
      maxWidth: {
        'content': '1120px',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
      },
    },
  },
  plugins: [],
};
