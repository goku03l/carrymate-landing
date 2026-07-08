/**
 * CarryMate landing page — content configuration.
 *
 * This is the ONLY file you need to touch to change what the site says.
 * app.js reads this object and builds the page from it — index.html has no
 * hardcoded copy, so editing here is enough; you don't need to touch HTML/CSS.
 */
window.CARRYMATE_CONFIG = {

  // ---- The two links every button on the page uses ----
  appUrl: 'https://your-carrymate-app-url.example.com',
  repoUrl: 'https://github.com/your-username/carrymate',

  brand: {
    name: 'CarryMate',
    // Small SVG luggage-tag mark next to the name — leave as-is unless you
    // want a different icon; edit the path in index.html's <svg> if so.
  },

  nav: {
    ctaLabel: 'Open the app',
  },

  hero: {
    eyebrow: 'Free · No middleman · Posts vanish in 5 days',
    headlineLine1: 'That empty suitcase',
    headlineEmphasis: 'space? Somebody needs it.',
    lede: "CarryMate matches travellers with spare luggage room to people who need "
        + "something carried on the same route — no courier markup, no shipping delay, "
        + "just two people who happen to be going the same way.",
    ctaPrimary: { label: "✈️ I'm travelling" },
    ctaSecondary: { label: '📦 I need something carried' },
    note: '<strong>No app store needed</strong> — it installs straight from the browser.',
  },

  // Sample routes that cycle in the luggage-tag visual on the hero. Add, remove,
  // or edit as many as you like — the ticker rotates through them in order.
  ticker: [
    { from: 'BLR', to: 'GOA', meta: '12 Jul – 14 Jul · ~4 kg free', quote: '₹500 quote', weight: '4 kg free', mode: '✈️ Flight' },
    { from: 'DEL', to: 'LON', meta: '18 Jul – 22 Jul · ~6 kg free', quote: '₹2,200 quote', weight: '6 kg free', mode: '✈️ Flight' },
    { from: 'BOM', to: 'DXB', meta: '9 Jul – 11 Jul · ~3 kg free', quote: '₹900 quote', weight: '3 kg free', mode: '✈️ Flight' },
    { from: 'MAA', to: 'SIN', meta: '15 Jul – 17 Jul · ~5 kg free', quote: '₹1,400 quote', weight: '5 kg free', mode: '✈️ Flight' },
    { from: 'PUN', to: 'HYD', meta: '8 Jul · same day · ~8 kg free', quote: 'No quote', weight: '8 kg free', mode: '🚆 Train' },
  ],
  tickerIntervalMs: 2800,

  paths: {
    eyebrow: 'Two sides, one match',
    headline: "Post a trip, or post a request. Either way, you're a call away from a match.",
    cards: [
      {
        icon: '✈️',
        title: 'Travelling somewhere?',
        subtitle: 'Got a few free kilos in your bag? List the trip once.',
        steps: [
          'Post your route, mode of travel, and dates.',
          'Add a quote if you want one — totally optional.',
          'Seekers on your route call or WhatsApp you directly.',
        ],
        ctaLabel: 'Post a trip →',
      },
      {
        icon: '📦',
        title: 'Need something carried?',
        subtitle: "Documents, gifts, a forgotten charger — someone's already headed that way.",
        steps: [
          'Search your route, or broadcast a request of your own.',
          'Match with a traveller already going there.',
          "Hand it over — even inside the terminal, if you're on the same flight.",
        ],
        ctaLabel: 'Find a traveller →',
      },
    ],
  },

  features: {
    eyebrow: "What's in the app",
    headline: 'Built for the way this actually happens in real life.',
    text: 'Every feature exists because people already do this informally over WhatsApp groups — CarryMate just makes it findable.',
    items: [
      {
        icon: '🎫',
        title: 'Same-flight matching',
        text: 'Optionally share a flight/train number, PNR, and departure time — if someone else is on the exact same leg, you can arrange to meet past security instead of at the gate outside.',
        highlight: true,
      },
      {
        icon: '📍',
        title: 'Near-me map',
        text: 'See everyone within 10–100 km plotted on a free, no-API-key map — no need to type a destination.',
      },
      {
        icon: '🔔',
        title: 'Two-way alerts',
        text: "Subscribe to a route and get notified the moment a matching trip or request is posted — even if you've closed the app.",
      },
      {
        icon: '⏳',
        title: 'Posts vanish in 5 days',
        text: 'Nothing lingers. Old trips and requests clean themselves up automatically.',
      },
      {
        icon: '🔐',
        title: 'Quick Google sign-in',
        text: 'No passwords, no spam accounts. Your phone number is only ever shared for the posts you choose to make.',
      },
      {
        icon: '💸',
        title: 'Free, always',
        text: 'No commission, no ads, no premium tier. Payment and logistics stay directly between the two of you.',
      },
    ],
  },

  trust: {
    html: '<strong>Trust works the same way it does when a friend\'s friend is travelling.</strong><br>'
        + 'CarryMate makes the introduction. What happens next — payment, packing, meeting up — is entirely between the two of you.',
    ctaLabel: 'See it in action',
  },

  final: {
    eyebrow: 'Ready when you are',
    headline: 'Your next trip could be someone\'s delivery.',
    text: 'Takes under a minute to post. No account setup beyond signing in with Google.',
    ctaLabel: 'Open CarryMate →',
  },

  footer: {
    text: 'CarryMate — earn as you travel.',
    appLinkLabel: 'Open the app',
    repoLinkLabel: 'GitHub',
  },
};
