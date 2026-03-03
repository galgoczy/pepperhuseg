import { BottomNav, Header } from '../../components/navigation';
import { formatCurrency } from '../../utils/helpers';

const today = new Date().toLocaleDateString('hu-HU', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const DAILY_MENU = {
  soup: {
    name: 'Paradicsomleves pirítóssal',
    allergens: 'Glutén, tej',
    price: 900,
  },
  menuA: {
    label: 'A menü',
    starter: 'Paradicsomleves',
    main: 'Töltött paprika rizzsel',
    dessert: 'Túrógombóc',
    price: 1800,
  },
  menuB: {
    label: 'B menü',
    starter: 'Paradicsomleves',
    main: 'Sertésszelet lecsóval, hasábburgonyával',
    dessert: 'Almáspite',
    price: 2100,
  },
  menuFitt: {
    label: 'Fitt menü',
    starter: 'Paradicsomleves',
    main: 'Grillezett csirkemell párolt zöldséggel, bulgurral',
    dessert: null,
    price: 2500,
  },
  mains: [
    { name: 'Wiener Schnitzel hasábburgonyával', price: 2600, tags: ['Népszerű'] },
    { name: 'Csirkepaprikás nokedlivel', price: 2400, tags: [] },
    { name: 'Pörkölt galuska körettel', price: 2200, tags: ['Házi'] },
    { name: 'Rácsos pisztráng petrezselymes burgonyával', price: 2900, tags: ['Séf ajánlata'] },
  ],
  desserts: [
    { name: 'Somlói galuska tejszínhabbal', price: 650 },
    { name: 'Rétes (alma / meggyes)', price: 500 },
    { name: 'Panna cotta gyümölcsöntettel', price: 700 },
  ],
};

const SectionTitle = ({ children }) => (
  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 px-1">
    {children}
  </h3>
);

const Tag = ({ children }) => {
  const colors = {
    'Népszerű': 'bg-orange-100 text-orange-700',
    'Séf ajánlata': 'bg-primary bg-opacity-10 text-primary',
    'Házi': 'bg-green-100 text-green-700',
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors[children] || 'bg-gray-100 text-gray-600'}`}>
      {children}
    </span>
  );
};

const MenuRow = ({ name, price, tags = [], sub }) => (
  <div className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0 gap-2">
    <div className="flex-1">
      <p className="font-medium text-secondary text-sm leading-snug">{name}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      {tags.length > 0 && (
        <div className="flex gap-1 mt-1">
          {tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>
      )}
    </div>
    <span className="font-bold text-secondary tabular-nums whitespace-nowrap text-sm">
      {formatCurrency(price)}
    </span>
  </div>
);

export const Menu = () => {
  return (
    <>
      <div className="min-h-screen bg-light-gray pb-20">
        <Header title="Étlap" />

        {/* Hero section */}
        <div className="relative w-full h-52 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80&fit=crop"
            alt="Budai Knorr étterem"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Restaurant info */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Pepperhouse</p>
            <h2 className="text-white text-2xl font-bold leading-tight">Budai Knorr</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 text-white/80 text-xs">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Budapest, I. ker.
              </span>
              <span className="text-white/40">·</span>
              <span className="inline-flex items-center gap-1 text-white/80 text-xs">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                11:00–15:00
              </span>
            </div>
          </div>
        </div>

        {/* Date banner */}
        <div className="bg-white border-b border-gray-100 px-4 py-2.5">
          <p className="text-center text-xs text-gray-500 capitalize">{today}</p>
        </div>

        <div className="max-w-md mx-auto px-4 py-5 space-y-6">

          {/* Leves */}
          <div>
            <SectionTitle>Leves</SectionTitle>
            <div className="bg-white rounded-card shadow-card px-4">
              <MenuRow name={DAILY_MENU.soup.name} price={DAILY_MENU.soup.price} sub={`Allergének: ${DAILY_MENU.soup.allergens}`} />
            </div>
          </div>

          {/* Menük */}
          <div>
            <SectionTitle>Napi menük</SectionTitle>
            <div className="space-y-3">
              {[DAILY_MENU.menuA, DAILY_MENU.menuB, DAILY_MENU.menuFitt].map((m) => (
                <div key={m.label} className="bg-white rounded-card shadow-card px-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-secondary">{m.label}</span>
                    <span className="font-bold text-primary tabular-nums">{formatCurrency(m.price)}</span>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-300 mt-0.5">›</span>
                      <span>{m.starter}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-300 mt-0.5">›</span>
                      <span>{m.main}</span>
                    </li>
                    {m.dessert && (
                      <li className="flex items-start gap-2">
                        <span className="text-gray-300 mt-0.5">›</span>
                        <span>{m.dessert}</span>
                      </li>
                    )}
                  </ul>
                  {m.label === 'Fitt menü' && (
                    <p className="mt-2 text-xs text-green-600 font-medium">🥗 Desszert nélkül</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Főételek */}
          <div>
            <SectionTitle>Főételek</SectionTitle>
            <div className="bg-white rounded-card shadow-card px-4">
              {DAILY_MENU.mains.map((item) => (
                <MenuRow key={item.name} name={item.name} price={item.price} tags={item.tags} />
              ))}
            </div>
          </div>

          {/* Desszert */}
          <div>
            <SectionTitle>Desszert</SectionTitle>
            <div className="bg-white rounded-card shadow-card px-4">
              {DAILY_MENU.desserts.map((item) => (
                <MenuRow key={item.name} name={item.name} price={item.price} />
              ))}
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-gray-400 pb-2">
            Az árak bruttó fogyasztói árak. Az allergén információkért kérdezze a személyzetet.
          </p>
        </div>
      </div>

      <BottomNav />
    </>
  );
};
