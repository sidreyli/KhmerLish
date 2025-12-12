import { useState } from 'react'

// SVG Icons (rounded, friendly style)
const Icons = {
  Home: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Book: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
  Quiz: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Profile: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Fire: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Sun: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
}

// Color data
const colors = {
  primary: [
    { name: 'Primary', var: '--color-primary', value: '#E8913A', textColor: 'white' },
    { name: 'Primary Hover', var: '--color-primary-hover', value: '#D4802E', textColor: 'white' },
    { name: 'Primary Light', var: '--color-primary-light', value: '#FFF4E6', textColor: '#B56D1F' },
  ],
  secondary: [
    { name: 'Secondary', var: '--color-secondary', value: '#1A6B6B', textColor: 'white' },
    { name: 'Secondary Hover', var: '--color-secondary-hover', value: '#145858', textColor: 'white' },
    { name: 'Secondary Light', var: '--color-secondary-light', value: '#E6F5F5', textColor: '#0F4545' },
  ],
  feedback: [
    { name: 'Success', var: '--color-success', value: '#4A9B5C', textColor: 'white' },
    { name: 'Success Light', var: '--color-success-light', value: '#E8F5EA', textColor: '#2E7A3D' },
    { name: 'Error', var: '--color-error', value: '#D4614B', textColor: 'white' },
    { name: 'Error Light', var: '--color-error-light', value: '#FDEAE7', textColor: '#A84435' },
  ],
  neutral: [
    { name: 'Background', var: '--color-background', value: '#FFFBF5', textColor: '#2D2319' },
    { name: 'Surface', var: '--color-surface', value: '#FFFFFF', textColor: '#2D2319' },
    { name: 'Border', var: '--color-border', value: '#E8DFD3', textColor: '#2D2319' },
    { name: 'Text Primary', var: '--color-text-primary', value: '#2D2319', textColor: 'white' },
    { name: 'Text Secondary', var: '--color-text-secondary', value: '#6B5D4D', textColor: 'white' },
  ],
}

// Typography scale data
const typeScale = [
  {
    level: 'Display',
    khmer: 'រៀនភាសាអង់គ្លេស',
    english: 'Learn English',
    size: '2.5rem',
    weight: '700',
    lineHeight: '1.2 / 1.7',
  },
  {
    level: 'Heading 1',
    khmer: 'សូមស្វាគមន៍មកកាន់',
    english: 'Welcome to Khmerlish',
    size: '2rem',
    weight: '700',
    lineHeight: '1.3 / 1.7',
  },
  {
    level: 'Heading 2',
    khmer: 'មេរៀនថ្មី',
    english: 'New Lessons',
    size: '1.5rem',
    weight: '600',
    lineHeight: '1.4 / 1.7',
  },
  {
    level: 'Heading 3',
    khmer: 'ពាក្យថ្មីសម្រាប់ថ្ងៃនេះ',
    english: "Today's New Words",
    size: '1.25rem',
    weight: '600',
    lineHeight: '1.5 / 1.7',
  },
  {
    level: 'Body',
    khmer: 'ការរៀនភាសាអង់គ្លេសជារៀងរាល់ថ្ងៃនឹងជួយឱ្យអ្នកប្រសើរឡើង។',
    english: 'Practicing English every day will help you improve steadily.',
    size: '1rem',
    weight: '400',
    lineHeight: '1.5 / 1.7',
  },
  {
    level: 'Caption',
    khmer: 'បន្តរៀន ១០ នាទីទៀត',
    english: '10 more minutes of learning',
    size: '0.875rem',
    weight: '400',
    lineHeight: '1.5 / 1.7',
  },
]

// Spacing scale
const spacingScale = [
  { token: '1', value: '4px' },
  { token: '2', value: '8px' },
  { token: '3', value: '12px' },
  { token: '4', value: '16px' },
  { token: '5', value: '24px' },
  { token: '6', value: '32px' },
  { token: '7', value: '48px' },
  { token: '8', value: '64px' },
]

// Radius scale
const radiusScale = [
  { token: 'sm', value: '8px' },
  { token: 'md', value: '12px' },
  { token: 'lg', value: '16px' },
  { token: 'xl', value: '24px' },
  { token: 'full', value: '9999px' },
]

function DesignSystem() {
  const [isDark, setIsDark] = useState(false)
  const [activeNav, setActiveNav] = useState('home')

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark')
  }

  return (
    <div className="design-system">
      {/* Theme Toggle */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDark ? <Icons.Sun /> : <Icons.Moon />}
        <span>{isDark ? 'Light' : 'Dark'}</span>
      </button>

      {/* Header */}
      <header className="ds-header angkor-pattern">
        <h1>Khmerlish</h1>
        <p className="subtitle">Design System v1.0</p>
        <p style={{ marginTop: 'var(--space-2)', color: 'var(--color-text-tertiary)', fontSize: 'var(--text-caption)' }}>
          Warm Tropical Minimalism
        </p>
      </header>

      {/* Color Palette Section */}
      <section className="ds-section">
        <h2 className="ds-section-title">Color Palette</h2>

        <h3 style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          Primary Colors — Golden Mango
        </h3>
        <div className="color-grid">
          {colors.primary.map((color) => (
            <div className="color-swatch" key={color.var}>
              <div
                className="color-swatch-preview"
                style={{ background: `var(${color.var})` }}
              >
                <span className="contrast-text" style={{ color: color.textColor }}>Aa</span>
              </div>
              <div className="color-swatch-info">
                <div className="color-swatch-name">{color.name}</div>
                <div className="color-swatch-value">{color.value}</div>
              </div>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
          Secondary Colors — Peacock Teal
        </h3>
        <div className="color-grid">
          {colors.secondary.map((color) => (
            <div className="color-swatch" key={color.var}>
              <div
                className="color-swatch-preview"
                style={{ background: `var(${color.var})` }}
              >
                <span className="contrast-text" style={{ color: color.textColor }}>Aa</span>
              </div>
              <div className="color-swatch-info">
                <div className="color-swatch-name">{color.name}</div>
                <div className="color-swatch-value">{color.value}</div>
              </div>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
          Feedback Colors — Success & Error
        </h3>
        <div className="color-grid">
          {colors.feedback.map((color) => (
            <div className="color-swatch" key={color.var}>
              <div
                className="color-swatch-preview"
                style={{ background: `var(${color.var})` }}
              >
                <span className="contrast-text" style={{ color: color.textColor }}>Aa</span>
              </div>
              <div className="color-swatch-info">
                <div className="color-swatch-name">{color.name}</div>
                <div className="color-swatch-value">{color.value}</div>
              </div>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
          Neutral Colors — Backgrounds & Text
        </h3>
        <div className="color-grid">
          {colors.neutral.map((color) => (
            <div className="color-swatch" key={color.var}>
              <div
                className="color-swatch-preview"
                style={{ background: `var(${color.var})`, border: color.value === '#FFFFFF' ? '1px solid var(--color-border)' : 'none' }}
              >
                <span className="contrast-text" style={{ color: color.textColor }}>Aa</span>
              </div>
              <div className="color-swatch-info">
                <div className="color-swatch-name">{color.name}</div>
                <div className="color-swatch-value">{color.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Section */}
      <section className="ds-section">
        <h2 className="ds-section-title">Typography Scale</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-5)' }}>
          <strong>Khmer:</strong> Battambang &nbsp;|&nbsp; <strong>English:</strong> Nunito
        </p>

        <div className="typography-scale">
          {typeScale.map((spec) => (
            <div className="type-specimen" key={spec.level}>
              <div className="type-label">
                <span>{spec.level}</span>
                <span className="type-meta">{spec.size} / {spec.weight} / LH: {spec.lineHeight}</span>
              </div>
              <div
                className="type-khmer"
                style={{
                  fontSize: spec.size,
                  fontWeight: spec.weight,
                }}
              >
                {spec.khmer}
              </div>
              <div
                className="type-english"
                style={{
                  fontSize: spec.size,
                  fontWeight: spec.weight,
                }}
              >
                {spec.english}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Components Section */}
      <section className="ds-section">
        <h2 className="ds-section-title">Component Library</h2>

        <div className="component-grid">
          {/* Buttons */}
          <div className="component-card">
            <div className="component-card-title">Buttons</div>
            <div className="button-group">
              <button className="btn btn-primary khmer">បន្ត</button>
              <button className="btn btn-secondary khmer">រំលង</button>
            </div>
            <div className="button-group" style={{ marginTop: 'var(--space-3)' }}>
              <button className="btn btn-success khmer">
                <Icons.Check />
                ត្រឹមត្រូវ
              </button>
              <button className="btn btn-ghost khmer">មើលចម្លើយ</button>
            </div>
          </div>

          {/* Input */}
          <div className="component-card">
            <div className="component-card-title">Input Field</div>
            <div className="input-wrapper">
              <label className="input-label">សរសេរចម្លើយ</label>
              <input
                type="text"
                className="input khmer"
                placeholder="វាយបញ្ចូលនៅទីនេះ..."
              />
            </div>
          </div>

          {/* Card */}
          <div className="component-card">
            <div className="component-card-title">Content Card</div>
            <div className="card card-angkor">
              <h3 className="card-title">មេរៀនទី ១</h3>
              <p className="card-text">Learn basic greetings and introductions in English.</p>
              <div style={{ marginTop: 'var(--space-3)' }}>
                <span className="badge badge-primary khmer">រៀនថ្មី</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="component-card">
            <div className="component-card-title">Progress Bar</div>
            <div className="progress-wrapper">
              <div className="progress-label">
                <span className="khmer">កម្រិតវិវឌ្ឍន៍</span>
                <span>650 XP</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div className="progress-wrapper" style={{ marginTop: 'var(--space-4)' }}>
              <div className="progress-label">
                <span className="khmer">ថ្ងៃរៀនជាប់គ្នា</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-primary)' }}>
                  <Icons.Fire /> 7 Days
                </span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="component-card">
            <div className="component-card-title">Badges & Chips</div>
            <div className="badge-group">
              <span className="badge badge-primary khmer">រៀនថ្មី</span>
              <span className="badge badge-success khmer">បានបញ្ចប់</span>
              <span className="badge badge-error khmer">ពិបាក</span>
              <span className="badge badge-secondary khmer">វេយ្យាករណ៍</span>
            </div>
            <div className="badge-group" style={{ marginTop: 'var(--space-3)' }}>
              <span className="badge badge-primary" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Icons.Star style={{ width: '14px', height: '14px', color: 'var(--color-primary)' }} />
                <span>100 XP</span>
              </span>
              <span className="badge badge-primary" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Icons.Fire style={{ width: '14px', height: '14px', color: 'var(--color-primary)' }} />
                <span>7 Day Streak</span>
              </span>
            </div>
          </div>

          {/* Bottom Nav */}
          <div className="component-card">
            <div className="component-card-title">Bottom Navigation</div>
            <nav className="bottom-nav">
              {[
                { id: 'home', icon: Icons.Home, label: 'ទំព័រដើម' },
                { id: 'learn', icon: Icons.Book, label: 'រៀន' },
                { id: 'quiz', icon: Icons.Quiz, label: 'ប្រលង' },
                { id: 'profile', icon: Icons.Profile, label: 'គណនី' },
              ].map((item) => (
                <div
                  key={item.id}
                  className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
                  onClick={() => setActiveNav(item.id)}
                >
                  <item.icon className="nav-item-icon" />
                  <span className="nav-item-label">{item.label}</span>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Icons Section */}
      <section className="ds-section">
        <h2 className="ds-section-title">Iconography</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
          Rounded, friendly style with 2px stroke weight
        </p>
        <div className="icon-grid">
          <div className="icon-item">
            <Icons.Home />
            <span>Home</span>
          </div>
          <div className="icon-item">
            <Icons.Book />
            <span>Book</span>
          </div>
          <div className="icon-item">
            <Icons.Quiz />
            <span>Quiz</span>
          </div>
          <div className="icon-item">
            <Icons.Profile />
            <span>Profile</span>
          </div>
          <div className="icon-item">
            <Icons.Fire />
            <span>Streak</span>
          </div>
          <div className="icon-item" style={{ color: 'var(--color-warning)' }}>
            <Icons.Star />
            <span>XP Star</span>
          </div>
          <div className="icon-item">
            <Icons.Check />
            <span>Check</span>
          </div>
        </div>
      </section>

      {/* Spacing Section */}
      <section className="ds-section">
        <h2 className="ds-section-title">Spacing Scale</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
          4px base unit system
        </p>
        <div className="spacing-grid">
          {spacingScale.map((space) => (
            <div className="spacing-item" key={space.token}>
              <div
                className="spacing-box"
                style={{
                  width: space.value,
                  height: space.value,
                }}
              />
              <span className="spacing-label">--space-{space.token}</span>
              <span className="spacing-label">{space.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Radius Section */}
      <section className="ds-section">
        <h2 className="ds-section-title">Border Radius</h2>
        <div className="radius-grid">
          {radiusScale.map((radius) => (
            <div className="radius-item" key={radius.token}>
              <div
                className="radius-box"
                style={{
                  borderRadius: radius.token === 'full' ? '9999px' : radius.value,
                  width: radius.token === 'full' ? '80px' : '80px',
                }}
              />
              <span className="radius-label">--radius-{radius.token}</span>
              <span className="radius-label">{radius.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: 'var(--space-7) 0',
        borderTop: '1px solid var(--color-border)',
        marginTop: 'var(--space-7)',
      }}>
        <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-caption)' }}>
          Khmerlish Design System — Built for Cambodian learners
        </p>
        <p className="khmer" style={{ color: 'var(--color-primary)', marginTop: 'var(--space-2)', fontWeight: 'var(--weight-bold)' }}>
          រៀនភាសាអង់គ្លេសជាមួយយើង
        </p>
      </footer>
    </div>
  )
}

export default DesignSystem
