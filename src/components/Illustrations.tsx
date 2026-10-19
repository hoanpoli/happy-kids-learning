import React from 'react';

interface IllustrationProps {
  itemId: string;
  className?: string;
}

export const ItemIllustration: React.FC<IllustrationProps> = ({ itemId, className = 'w-24 h-24' }) => {
  switch (itemId) {
    // === ANIMALS ===
    case 'dog':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="54" rx="34" ry="30" fill="#F59E0B" />
          <ellipse cx="22" cy="42" rx="10" ry="18" fill="#B45309" transform="rotate(-15 22 42)" />
          <ellipse cx="78" cy="42" rx="10" ry="18" fill="#B45309" transform="rotate(15 78 42)" />
          <circle cx="38" cy="50" r="4.5" fill="#1E293B" />
          <circle cx="40" cy="48" r="1.5" fill="white" />
          <circle cx="62" cy="50" r="4.5" fill="#1E293B" />
          <circle cx="64" cy="48" r="1.5" fill="white" />
          <ellipse cx="50" cy="62" rx="14" ry="10" fill="#FEF3C7" />
          <ellipse cx="50" cy="58" rx="6" ry="4.5" fill="#1E293B" />
          <path d="M46 64 C48 67, 52 67, 54 64" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M50 67 C50 72, 54 72, 54 68" fill="#F43F5E" />
          <circle cx="32" cy="60" r="4" fill="#FCA5A5" opacity="0.6" />
          <circle cx="68" cy="60" r="4" fill="#FCA5A5" opacity="0.6" />
        </svg>
      );

    case 'cat':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="22,42 34,14 44,34" fill="#FB7185" />
          <polygon points="26,38 34,20 40,34" fill="#FECDD3" />
          <polygon points="78,42 66,14 56,34" fill="#FB7185" />
          <polygon points="74,38 66,20 60,34" fill="#FECDD3" />
          <circle cx="50" cy="56" r="32" fill="#FDA4AF" />
          <circle cx="38" cy="52" r="5" fill="#047857" />
          <circle cx="39.5" cy="50.5" r="1.8" fill="white" />
          <circle cx="62" cy="52" r="5" fill="#047857" />
          <circle cx="63.5" cy="50.5" r="1.8" fill="white" />
          <polygon points="47,60 53,60 50,64" fill="#E11D48" />
          <path d="M44 65 Q50 71 50 66 Q50 71 56 65" stroke="#881337" strokeWidth="2" fill="none" strokeLinecap="round" />
          <line x1="20" y1="56" x2="34" y2="58" stroke="#881337" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="64" x2="33" y2="63" stroke="#881337" strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="56" x2="66" y2="58" stroke="#881337" strokeWidth="2" strokeLinecap="round" />
          <line x1="82" y1="64" x2="67" y2="63" stroke="#881337" strokeWidth="2" strokeLinecap="round" />
          <circle cx="30" cy="62" r="4.5" fill="#FB7185" opacity="0.6" />
          <circle cx="70" cy="62" r="4.5" fill="#FB7185" opacity="0.6" />
        </svg>
      );

    case 'elephant':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="52" rx="30" ry="26" fill="#818CF8" />
          <circle cx="20" cy="46" r="15" fill="#6366F1" />
          <circle cx="80" cy="46" r="15" fill="#6366F1" />
          <circle cx="40" cy="48" r="4.5" fill="#1E293B" />
          <circle cx="41.5" cy="46.5" r="1.5" fill="white" />
          <circle cx="60" cy="48" r="4.5" fill="#1E293B" />
          <circle cx="61.5" cy="46.5" r="1.5" fill="white" />
          {/* Trunk */}
          <path d="M46 56 C46 72, 54 82, 64 76 C66 74, 62 70, 56 71 C52 72, 52 64, 54 56" fill="#6366F1" />
          <circle cx="34" cy="58" r="4" fill="#C7D2FE" opacity="0.7" />
          <circle cx="66" cy="58" r="4" fill="#C7D2FE" opacity="0.7" />
        </svg>
      );

    case 'lion':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="36" fill="#F97316" />
          {/* Mane bumps */}
          <circle cx="20" cy="36" r="10" fill="#EA580C" />
          <circle cx="80" cy="36" r="10" fill="#EA580C" />
          <circle cx="22" cy="64" r="10" fill="#EA580C" />
          <circle cx="78" cy="64" r="10" fill="#EA580C" />
          <circle cx="50" cy="18" r="10" fill="#EA580C" />
          <circle cx="32" cy="22" r="10" fill="#EA580C" />
          <circle cx="68" cy="22" r="10" fill="#EA580C" />
          {/* Face */}
          <circle cx="50" cy="54" r="25" fill="#FDE047" />
          <circle cx="40" cy="48" r="4" fill="#1E293B" />
          <circle cx="41" cy="46" r="1.5" fill="white" />
          <circle cx="60" cy="48" r="4" fill="#1E293B" />
          <circle cx="61" cy="46" r="1.5" fill="white" />
          <polygon points="46,56 54,56 50,60" fill="#78350F" />
          <path d="M46 62 Q50 67 54 62" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'panda':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="26" r="12" fill="#1E293B" />
          <circle cx="72" cy="26" r="12" fill="#1E293B" />
          <circle cx="50" cy="54" r="32" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          {/* Eye patches */}
          <ellipse cx="36" cy="48" rx="8" ry="11" fill="#1E293B" transform="rotate(-15 36 48)" />
          <circle cx="36" cy="47" r="3" fill="white" />
          <ellipse cx="64" cy="48" rx="8" ry="11" fill="#1E293B" transform="rotate(15 64 48)" />
          <circle cx="64" cy="47" r="3" fill="white" />
          <ellipse cx="50" cy="62" rx="5" ry="3.5" fill="#1E293B" />
          <path d="M45 68 Q50 72 55 68" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <circle cx="28" cy="62" r="5" fill="#FDA4AF" opacity="0.6" />
          <circle cx="72" cy="62" r="5" fill="#FDA4AF" opacity="0.6" />
        </svg>
      );

    case 'rabbit':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ears */}
          <ellipse cx="36" cy="24" rx="8" ry="22" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
          <ellipse cx="36" cy="24" rx="4" ry="15" fill="#F472B6" />
          <ellipse cx="64" cy="24" rx="8" ry="22" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
          <ellipse cx="64" cy="24" rx="4" ry="15" fill="#F472B6" />
          <circle cx="50" cy="60" r="28" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
          <circle cx="39" cy="54" r="4.5" fill="#831843" />
          <circle cx="40" cy="52" r="1.5" fill="white" />
          <circle cx="61" cy="54" r="4.5" fill="#831843" />
          <circle cx="62" cy="52" r="1.5" fill="white" />
          <polygon points="47,62 53,62 50,65" fill="#F472B6" />
          <path d="M45 68 Q50 72 55 68" stroke="#831843" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="62" x2="36" y2="64" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          <line x1="76" y1="62" x2="64" y2="64" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'duck':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="56" rx="30" ry="26" fill="#FACC15" />
          <circle cx="36" cy="46" r="4.5" fill="#1E293B" />
          <circle cx="37.5" cy="44.5" r="1.5" fill="white" />
          {/* Bill */}
          <ellipse cx="20" cy="52" rx="14" ry="7" fill="#F97316" />
          {/* Wing */}
          <path d="M50 52 C64 52, 74 62, 70 70 C60 74, 52 68, 50 52" fill="#EAB308" />
          <circle cx="48" cy="54" r="4" fill="#FDE047" opacity="0.6" />
        </svg>
      );

    case 'dolphin':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 62 C26 40, 52 30, 78 40 C68 46, 60 52, 54 62 C40 68, 28 72, 22 62" fill="#0EA5E9" />
          <path d="M48 30 C50 20, 58 24, 54 34" fill="#0284C7" />
          {/* Tail */}
          <polygon points="18,66 10,58 14,76" fill="#0284C7" />
          <circle cx="66" cy="40" r="3.5" fill="#1E293B" />
          <circle cx="67" cy="39" r="1.2" fill="white" />
          <ellipse cx="76" cy="45" rx="5" ry="3" fill="#38BDF8" />
          {/* Water waves */}
          <path d="M12 82 Q25 76 38 82 T64 82 T90 82" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      );

    // === FRUITS ===
    case 'apple':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 24 Q52 12 58 10" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <path d="M52 18 C64 12, 68 22, 56 22" fill="#22C55E" />
          <ellipse cx="40" cy="56" rx="24" ry="28" fill="#EF4444" />
          <ellipse cx="60" cy="56" rx="24" ry="28" fill="#EF4444" />
          <circle cx="36" cy="42" r="5" fill="#FCA5A5" opacity="0.6" />
          <circle cx="42" cy="52" r="3" fill="#1E293B" />
          <circle cx="58" cy="52" r="3" fill="#1E293B" />
          <path d="M46 62 Q50 67 54 62" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'banana':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 28 C26 58, 52 82, 82 72 C74 76, 42 78, 24 46" fill="#FACC15" />
          <path d="M24 24 L22 30" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          <circle cx="82" cy="72" r="2.5" fill="#78350F" />
          <circle cx="42" cy="52" r="3" fill="#1E293B" />
          <circle cx="54" cy="56" r="3" fill="#1E293B" />
          <path d="M46 62 Q50 66 54 62" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'strawberry':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Calyx */}
          <polygon points="50,22 42,12 40,24 30,16 34,28 50,30" fill="#22C55E" />
          <polygon points="50,22 58,12 60,24 70,16 66,28 50,30" fill="#22C55E" />
          <path d="M50 28 C74 28, 80 56, 50 86 C20 56, 26 28, 50 28" fill="#E11D48" />
          {/* Seeds */}
          <circle cx="40" cy="40" r="1.8" fill="#FDE047" />
          <circle cx="60" cy="40" r="1.8" fill="#FDE047" />
          <circle cx="50" cy="48" r="1.8" fill="#FDE047" />
          <circle cx="36" cy="56" r="1.8" fill="#FDE047" />
          <circle cx="64" cy="56" r="1.8" fill="#FDE047" />
          <circle cx="44" cy="68" r="1.8" fill="#FDE047" />
          <circle cx="56" cy="68" r="1.8" fill="#FDE047" />
          <circle cx="42" cy="50" r="2.5" fill="#1E293B" />
          <circle cx="58" cy="50" r="2.5" fill="#1E293B" />
          <path d="M46 58 Q50 62 54 58" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'orange_fruit':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="54" r="32" fill="#F97316" />
          <path d="M50 22 C52 14, 56 12, 62 14" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <path d="M54 18 C64 12, 70 20, 60 22" fill="#22C55E" />
          <circle cx="38" cy="48" r="3.5" fill="#1E293B" />
          <circle cx="62" cy="48" r="3.5" fill="#1E293B" />
          <path d="M45 58 Q50 64 55 58" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="56" r="4" fill="#FDBA74" opacity="0.6" />
          <circle cx="68" cy="56" r="4" fill="#FDBA74" opacity="0.6" />
        </svg>
      );

    case 'watermelon':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 46 Q50 94 84 46 Z" fill="#16A34A" />
          <path d="M22 46 Q50 86 78 46 Z" fill="#DCFCE7" />
          <path d="M26 46 Q50 80 74 46 Z" fill="#EF4444" />
          {/* Seeds */}
          <circle cx="42" cy="56" r="2" fill="#1E293B" />
          <circle cx="58" cy="56" r="2" fill="#1E293B" />
          <circle cx="50" cy="66" r="2" fill="#1E293B" />
          <circle cx="36" cy="50" r="1.8" fill="#1E293B" />
          <circle cx="64" cy="50" r="1.8" fill="#1E293B" />
        </svg>
      );

    case 'grapes':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 20 Q54 12, 60 14" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <path d="M54 16 C66 12, 68 22, 58 22" fill="#22C55E" />
          {/* Grape spheres */}
          <circle cx="40" cy="36" r="10" fill="#9333EA" />
          <circle cx="60" cy="36" r="10" fill="#9333EA" />
          <circle cx="32" cy="52" r="10" fill="#A855F7" />
          <circle cx="50" cy="50" r="10" fill="#7E22CE" />
          <circle cx="68" cy="52" r="10" fill="#A855F7" />
          <circle cx="40" cy="66" r="9" fill="#9333EA" />
          <circle cx="60" cy="66" r="9" fill="#9333EA" />
          <circle cx="50" cy="78" r="8" fill="#7E22CE" />
          <circle cx="48" cy="48" r="2.5" fill="white" opacity="0.6" />
        </svg>
      );

    case 'mango':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M46 20 C48 12, 52 14, 56 16" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 16 C60 10, 66 18, 56 20" fill="#22C55E" />
          <path d="M48 24 C72 24, 78 54, 62 78 C46 92, 28 72, 34 46 C36 32, 42 24, 48 24" fill="#FACC15" />
          <circle cx="46" cy="46" r="3.5" fill="#1E293B" />
          <circle cx="62" cy="48" r="3.5" fill="#1E293B" />
          <path d="M50 58 Q54 64 58 58" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <circle cx="40" cy="54" r="4" fill="#FB923C" opacity="0.6" />
        </svg>
      );

    // === VEHICLES ===
    case 'car':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 62 L28 44 C30 38, 38 36, 44 36 L62 36 C68 36, 74 40, 78 46 L86 62 Z" fill="#EF4444" />
          <rect x="14" y="58" width="76" height="18" rx="6" fill="#DC2626" />
          <rect x="34" y="40" width="16" height="14" rx="2" fill="#BAE6FD" />
          <rect x="54" y="40" width="18" height="14" rx="2" fill="#BAE6FD" />
          {/* Wheels */}
          <circle cx="32" cy="76" r="10" fill="#1E293B" />
          <circle cx="32" cy="76" r="4.5" fill="#E2E8F0" />
          <circle cx="72" cy="76" r="10" fill="#1E293B" />
          <circle cx="72" cy="76" r="4.5" fill="#E2E8F0" />
          <circle cx="86" cy="64" r="3.5" fill="#FEF08A" />
        </svg>
      );

    case 'bus':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="16" y="28" width="70" height="44" rx="8" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
          {/* Windows */}
          <rect x="22" y="34" width="16" height="14" rx="3" fill="#E0F2FE" />
          <rect x="42" y="34" width="16" height="14" rx="3" fill="#E0F2FE" />
          <rect x="62" y="34" width="18" height="14" rx="3" fill="#E0F2FE" />
          {/* Wheels */}
          <circle cx="32" cy="74" r="10" fill="#1E293B" />
          <circle cx="32" cy="74" r="4" fill="#E2E8F0" />
          <circle cx="70" cy="74" r="10" fill="#1E293B" />
          <circle cx="70" cy="74" r="4" fill="#E2E8F0" />
          <circle cx="82" cy="56" r="3" fill="#EF4444" />
        </svg>
      );

    case 'airplane':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="50" rx="36" ry="12" fill="#38BDF8" transform="rotate(-15 50 50)" />
          {/* Wings */}
          <polygon points="44,48 30,22 46,26" fill="#0284C7" />
          <polygon points="56,54 44,78 60,74" fill="#0284C7" />
          {/* Tail */}
          <polygon points="20,44 14,30 24,34" fill="#0284C7" />
          <circle cx="76" cy="44" r="3" fill="#FEF08A" />
          <circle cx="56" cy="48" r="2" fill="white" />
          <circle cx="64" cy="46" r="2" fill="white" />
        </svg>
      );

    case 'train':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="38" width="58" height="34" rx="4" fill="#7C3AED" />
          <rect x="52" y="24" width="24" height="20" rx="3" fill="#8B5CF6" />
          <rect x="56" y="28" width="16" height="12" rx="2" fill="#E0F2FE" />
          {/* Chimney */}
          <rect x="28" y="24" width="8" height="14" fill="#6D28D9" />
          <circle cx="32" cy="18" r="5" fill="#E2E8F0" opacity="0.8" />
          <circle cx="36" cy="12" r="6" fill="#E2E8F0" opacity="0.6" />
          {/* Wheels */}
          <circle cx="30" cy="74" r="8" fill="#1E293B" />
          <circle cx="50" cy="74" r="8" fill="#1E293B" />
          <circle cx="70" cy="74" r="8" fill="#1E293B" />
          <line x1="28" y1="74" x2="72" y2="74" stroke="#CBD5E1" strokeWidth="3" />
        </svg>
      );

    case 'bicycle':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="64" r="14" stroke="#16A34A" strokeWidth="4" fill="none" />
          <circle cx="72" cy="64" r="14" stroke="#16A34A" strokeWidth="4" fill="none" />
          <polyline points="28,64 48,64 62,44 42,44 28,64" stroke="#22C55E" strokeWidth="4" strokeLinejoin="round" fill="none" />
          <line x1="48" y1="64" x2="42" y2="36" stroke="#22C55E" strokeWidth="4" />
          <line x1="36" y1="36" x2="48" y2="36" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
          <line x1="62" y1="44" x2="72" y2="64" stroke="#22C55E" strokeWidth="4" />
          <line x1="62" y1="44" x2="66" y2="34" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'boat':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="18,60 30,76 72,76 84,60" fill="#0891B2" />
          <line x1="50" y1="20" x2="50" y2="60" stroke="#78350F" strokeWidth="3" />
          <polygon points="50,22 74,48 50,48" fill="#EF4444" />
          <polygon points="50,28 32,52 50,52" fill="#F8FAFC" />
          <path d="M12 80 Q25 76 38 80 T64 80 T90 80" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'fire_truck':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="16" y="44" width="46" height="26" fill="#DC2626" />
          <path d="M62 44 L78 44 C82 44, 86 50, 86 56 L86 70 L62 70 Z" fill="#EF4444" />
          <rect x="66" y="48" width="14" height="12" fill="#E0F2FE" />
          {/* Ladder */}
          <rect x="20" y="34" width="38" height="6" fill="#E2E8F0" stroke="#94A3B8" />
          {/* Light */}
          <polygon points="72,40 76,44 68,44" fill="#38BDF8" />
          {/* Wheels */}
          <circle cx="32" cy="72" r="9" fill="#1E293B" />
          <circle cx="72" cy="72" r="9" fill="#1E293B" />
        </svg>
      );

    // === COLORS ===
    case 'red':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="34" fill="#EF4444" />
          <circle cx="38" cy="38" r="8" fill="#FCA5A5" opacity="0.6" />
          <circle cx="50" cy="50" r="34" stroke="#DC2626" strokeWidth="4" />
          <circle cx="42" cy="50" r="3.5" fill="white" />
          <circle cx="58" cy="50" r="3.5" fill="white" />
          <path d="M46 58 Q50 63 54 58" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'blue':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="34" fill="#0284C7" />
          <circle cx="38" cy="38" r="8" fill="#BAE6FD" opacity="0.6" />
          <circle cx="50" cy="50" r="34" stroke="#0369A1" strokeWidth="4" />
          <circle cx="42" cy="50" r="3.5" fill="white" />
          <circle cx="58" cy="50" r="3.5" fill="white" />
          <path d="M46 58 Q50 63 54 58" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'yellow':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="34" fill="#FACC15" />
          <circle cx="38" cy="38" r="8" fill="#FEF08A" opacity="0.8" />
          <circle cx="50" cy="50" r="34" stroke="#EAB308" strokeWidth="4" />
          <circle cx="42" cy="50" r="3.5" fill="#713F12" />
          <circle cx="58" cy="50" r="3.5" fill="#713F12" />
          <path d="M46 58 Q50 63 54 58" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'green':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="34" fill="#16A34A" />
          <circle cx="38" cy="38" r="8" fill="#BBF7D0" opacity="0.6" />
          <circle cx="50" cy="50" r="34" stroke="#15803D" strokeWidth="4" />
          <circle cx="42" cy="50" r="3.5" fill="white" />
          <circle cx="58" cy="50" r="3.5" fill="white" />
          <path d="M46 58 Q50 63 54 58" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'orange_color':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="34" fill="#EA580C" />
          <circle cx="38" cy="38" r="8" fill="#FED7AA" opacity="0.6" />
          <circle cx="50" cy="50" r="34" stroke="#C2410C" strokeWidth="4" />
          <circle cx="42" cy="50" r="3.5" fill="white" />
          <circle cx="58" cy="50" r="3.5" fill="white" />
          <path d="M46 58 Q50 63 54 58" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'purple':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="34" fill="#9333EA" />
          <circle cx="38" cy="38" r="8" fill="#E9D5FF" opacity="0.6" />
          <circle cx="50" cy="50" r="34" stroke="#7E22CE" strokeWidth="4" />
          <circle cx="42" cy="50" r="3.5" fill="white" />
          <circle cx="58" cy="50" r="3.5" fill="white" />
          <path d="M46 58 Q50 63 54 58" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'pink':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="34" fill="#EC4899" />
          <circle cx="38" cy="38" r="8" fill="#FCE7F3" opacity="0.6" />
          <circle cx="50" cy="50" r="34" stroke="#DB2777" strokeWidth="4" />
          <circle cx="42" cy="50" r="3.5" fill="white" />
          <circle cx="58" cy="50" r="3.5" fill="white" />
          <path d="M46 58 Q50 63 54 58" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    // === SHAPES & WONDERS ===
    case 'circle':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="34" fill="#F59E0B" stroke="#D97706" strokeWidth="4" />
          <circle cx="42" cy="46" r="4" fill="#78350F" />
          <circle cx="58" cy="46" r="4" fill="#78350F" />
          <path d="M44 56 Q50 64 56 56" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <circle cx="34" cy="52" r="4" fill="#FDE68A" />
          <circle cx="66" cy="52" r="4" fill="#FDE68A" />
        </svg>
      );

    case 'square':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="60" height="60" rx="12" fill="#4F46E5" stroke="#3730A3" strokeWidth="4" />
          <circle cx="42" cy="46" r="4" fill="white" />
          <circle cx="58" cy="46" r="4" fill="white" />
          <path d="M44 56 Q50 64 56 56" stroke="white" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'star':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="50,12 61,36 86,39 67,56 72,82 50,68 28,82 33,56 14,39 39,36"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <circle cx="44" cy="46" r="3" fill="#713F12" />
          <circle cx="56" cy="46" r="3" fill="#713F12" />
          <path d="M46 54 Q50 58 54 54" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'heart':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50 82 C22 62, 14 44, 26 28 C36 16, 48 24, 50 32 C52 24, 64 16, 74 28 C86 44, 78 62, 50 82 Z"
            fill="#E11D48"
            stroke="#BE123C"
            strokeWidth="3.5"
          />
          <circle cx="42" cy="42" r="3" fill="white" />
          <circle cx="58" cy="42" r="3" fill="white" />
          <path d="M46 50 Q50 54 54 50" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'sun':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sun rays */}
          <line x1="50" y1="10" x2="50" y2="18" stroke="#EAB308" strokeWidth="5" strokeLinecap="round" />
          <line x1="50" y1="82" x2="50" y2="90" stroke="#EAB308" strokeWidth="5" strokeLinecap="round" />
          <line x1="10" y1="50" x2="18" y2="50" stroke="#EAB308" strokeWidth="5" strokeLinecap="round" />
          <line x1="82" y1="50" x2="90" y2="50" stroke="#EAB308" strokeWidth="5" strokeLinecap="round" />
          <line x1="22" y1="22" x2="28" y2="28" stroke="#EAB308" strokeWidth="5" strokeLinecap="round" />
          <line x1="72" y1="72" x2="78" y2="78" stroke="#EAB308" strokeWidth="5" strokeLinecap="round" />
          <line x1="22" y1="78" x2="28" y2="72" stroke="#EAB308" strokeWidth="5" strokeLinecap="round" />
          <line x1="72" y1="28" x2="78" y2="22" stroke="#EAB308" strokeWidth="5" strokeLinecap="round" />
          {/* Sun body */}
          <circle cx="50" cy="50" r="26" fill="#FACC15" stroke="#CA8A04" strokeWidth="3" />
          <circle cx="43" cy="46" r="3.5" fill="#713F12" />
          <circle cx="57" cy="46" r="3.5" fill="#713F12" />
          <path d="M45 56 Q50 62 55 56" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="37" cy="52" r="3" fill="#FDE047" />
          <circle cx="63" cy="52" r="3" fill="#FDE047" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="32" fill="#E2E8F0" />
          <text x="50" y="58" textAnchor="middle" fontSize="24" fill="#64748B">✨</text>
        </svg>
      );
  }
};
