import React, { useState, useEffect } from 'react';

// ============================================
// GET JAKT - Supplement Directory Website v2
// Clean, modern redesign with clear messaging
// ============================================

// Supplement Database
const supplements = {
  creatine: {
    id: 'creatine',
    name: 'Creatine Monohydrate',
    category: 'Performance',
    goals: ['muscle', 'strength', 'recovery'],
    constraints: ['vegan', 'budget'],
    experience: ['beginner', 'intermediate', 'advanced'],
    stimulant: false,
    priceRange: 'budget',
    shortDesc: 'The most researched sports supplement. Supports strength, power, and muscle hydration.',
    longDesc: 'Creatine monohydrate is one of the most studied supplements in sports nutrition. It works by increasing your muscles\' phosphocreatine stores, which helps produce more ATP energy during high-intensity exercise.',
    whoFor: ['Anyone looking to increase strength and power output', 'Those doing resistance training or HIIT', 'Athletes wanting improved recovery between sets', 'People seeking modest muscle fullness'],
    whoNotFor: ['Those primarily focused on endurance cardio', 'People with pre-existing kidney conditions (consult doctor)', 'Those who want stimulant-based energy'],
    ingredients: [{ name: 'Creatine Monohydrate', amount: '5g', purpose: 'Increases phosphocreatine stores for ATP production' }],
    pros: ['Extensively researched with proven benefits', 'Very affordable', 'No stimulants or crash', 'Suitable for vegetarians/vegans', 'Safe for long-term use'],
    cons: ['May cause minor water retention', 'Takes 2-4 weeks to see full effects', 'Non-responders exist (about 20% of people)'],
    alternatives: ['Creatine HCL (less water retention)', 'Beta-Alanine (different mechanism)', 'HMB (for muscle preservation)'],
    affiliateUrl: '#',
    image: '💪'
  },
  wheyProtein: {
    id: 'wheyProtein',
    name: 'Whey Protein Isolate',
    category: 'Protein',
    goals: ['muscle', 'recovery', 'fatLoss'],
    constraints: ['budget'],
    experience: ['beginner', 'intermediate', 'advanced'],
    stimulant: false,
    priceRange: 'mid',
    shortDesc: 'Fast-absorbing complete protein to support muscle protein synthesis and recovery.',
    longDesc: 'Whey protein isolate is a highly filtered form of whey that contains 90%+ protein with minimal lactose and fat. It\'s quickly absorbed, making it ideal around training.',
    whoFor: ['Anyone struggling to meet protein targets through food', 'Those wanting convenient post-workout nutrition', 'People doing resistance training', 'Those cutting calories but needing protein'],
    whoNotFor: ['Lactose intolerant individuals (consider isolate or plant-based)', 'Those who easily meet protein needs through diet', 'Vegans (choose plant protein instead)'],
    ingredients: [{ name: 'Whey Protein Isolate', amount: '25g protein per scoop', purpose: 'Complete amino acid profile for muscle protein synthesis' }],
    pros: ['Complete protein with all essential amino acids', 'Fast absorption', 'High bioavailability', 'Versatile (shakes, baking, etc.)', 'Generally well-tolerated'],
    cons: ['Dairy-based (not for vegans)', 'Some brands have artificial sweeteners', 'Quality varies significantly by brand'],
    alternatives: ['Whey Concentrate (cheaper, more lactose)', 'Casein (slow-release)', 'Plant Protein Blend (vegan)'],
    affiliateUrl: '#',
    image: '🥛'
  },
  caffeine: {
    id: 'caffeine',
    name: 'Caffeine (Pre-Workout)',
    category: 'Energy',
    goals: ['energy', 'fatLoss', 'endurance'],
    constraints: [],
    experience: ['intermediate', 'advanced'],
    stimulant: true,
    priceRange: 'budget',
    shortDesc: 'Proven stimulant for energy, focus, and enhanced workout performance.',
    longDesc: 'Caffeine is a central nervous system stimulant that blocks adenosine receptors, reducing fatigue and increasing alertness. It also enhances fat oxidation and can improve both strength and endurance performance.',
    whoFor: ['Those needing energy for early or late workouts', 'Athletes wanting improved focus and drive', 'People looking to enhance fat burning during exercise', 'Endurance athletes'],
    whoNotFor: ['Caffeine-sensitive individuals', 'Those who train in the evening (sleep disruption)', 'People with heart conditions or anxiety', 'Those already consuming high caffeine'],
    ingredients: [{ name: 'Caffeine Anhydrous', amount: '150-300mg', purpose: 'CNS stimulation for energy and focus' }],
    pros: ['Proven performance benefits', 'Very affordable', 'Fast-acting (30-60 minutes)', 'Can enhance fat oxidation', 'Available in many forms'],
    cons: ['Can disrupt sleep if taken late', 'Tolerance builds over time', 'May cause jitters or anxiety', 'Withdrawal headaches possible'],
    alternatives: ['L-Theanine + Caffeine (smoother energy)', 'Stimulant-free pre-workout', 'Green tea extract (lower caffeine)'],
    affiliateUrl: '#',
    image: '⚡'
  },
  betaAlanine: {
    id: 'betaAlanine',
    name: 'Beta-Alanine',
    category: 'Endurance',
    goals: ['endurance', 'strength'],
    constraints: ['vegan', 'stimulant-free'],
    experience: ['intermediate', 'advanced'],
    stimulant: false,
    priceRange: 'mid',
    shortDesc: 'Buffers lactic acid to extend high-intensity performance and reduce fatigue.',
    longDesc: 'Beta-alanine is an amino acid that combines with histidine to form carnosine in muscles. Carnosine acts as a buffer against acid buildup during intense exercise, potentially extending time to exhaustion.',
    whoFor: ['Athletes doing high-rep or circuit training', 'Endurance athletes (rowing, cycling, swimming)', 'Those doing HIIT workouts', 'CrossFit and functional fitness athletes'],
    whoNotFor: ['Those only doing low-intensity exercise', 'People sensitive to the "tingles" (paresthesia)', 'Pure strength athletes (limited benefit for low-rep work)'],
    ingredients: [{ name: 'Beta-Alanine', amount: '3.2-6.4g daily', purpose: 'Increases muscle carnosine for acid buffering' }],
    pros: ['Proven endurance benefits', 'Stimulant-free', 'Safe for long-term use', 'Complements creatine well', 'Vegan-friendly'],
    cons: ['Causes harmless tingling sensation', 'Takes 2-4 weeks to build up', 'Limited benefit for very short efforts', 'Must be taken daily for effect'],
    alternatives: ['Citrulline Malate (different mechanism)', 'Sodium Bicarbonate (acute buffer)', 'Beetroot Powder (nitric oxide)'],
    affiliateUrl: '#',
    image: '🔋'
  },
  omega3: {
    id: 'omega3',
    name: 'Omega-3 Fish Oil',
    category: 'Recovery',
    goals: ['recovery', 'health'],
    constraints: ['budget'],
    experience: ['beginner', 'intermediate', 'advanced'],
    stimulant: false,
    priceRange: 'mid',
    shortDesc: 'Essential fatty acids supporting recovery, joint health, and overall wellness.',
    longDesc: 'Omega-3 fatty acids (EPA and DHA) are essential fats that support numerous bodily functions. For athletes, they may help with inflammation management, joint comfort, and overall recovery.',
    whoFor: ['Anyone not eating fatty fish 2-3x per week', 'Those with joint discomfort from training', 'Athletes wanting to support recovery', 'General health optimization'],
    whoNotFor: ['Those who eat plenty of fatty fish', 'People on blood thinners (consult doctor)', 'Those allergic to fish (try algae-based)'],
    ingredients: [{ name: 'Fish Oil (EPA/DHA)', amount: '1-3g combined EPA+DHA', purpose: 'Essential fatty acids for inflammation and recovery' }],
    pros: ['Well-researched health benefits', 'Supports joint comfort', 'May aid recovery', 'General health benefits beyond fitness', 'Widely available'],
    cons: ['Fish burps possible with low-quality brands', 'Not suitable for fish allergies', 'Benefits are gradual, not immediate', 'Quality varies significantly'],
    alternatives: ['Algae Omega-3 (vegan)', 'Krill Oil (different absorption)', 'Flaxseed Oil (ALA, less efficient)'],
    affiliateUrl: '#',
    image: '🐟'
  },
  vitaminD: {
    id: 'vitaminD',
    name: 'Vitamin D3',
    category: 'Health',
    goals: ['recovery', 'health'],
    constraints: ['vegan', 'budget'],
    experience: ['beginner', 'intermediate', 'advanced'],
    stimulant: false,
    priceRange: 'budget',
    shortDesc: 'Supports bone health, immune function, and may influence muscle function.',
    longDesc: 'Vitamin D is a fat-soluble vitamin that many people are deficient in, especially those who train indoors or live in northern climates. It plays roles in bone health, immune function, and potentially muscle function.',
    whoFor: ['Those who train primarily indoors', 'People in northern latitudes', 'Anyone with tested low vitamin D', 'Those wanting immune support'],
    whoNotFor: ['Those with adequate sun exposure', 'People already taking vitamin D in a multi', 'Those with hypercalcemia (consult doctor)'],
    ingredients: [{ name: 'Vitamin D3 (Cholecalciferol)', amount: '1000-5000 IU', purpose: 'Supports calcium absorption and immune function' }],
    pros: ['Addresses common deficiency', 'Very affordable', 'Supports multiple body systems', 'Easy to take', 'Well-researched'],
    cons: ['Fat-soluble (can accumulate)', 'Benefits depend on current status', 'Blood test recommended for optimal dosing', 'Takes time to raise levels'],
    alternatives: ['Vitamin D2 (less effective)', 'Sunlight exposure', 'Vitamin D + K2 combo'],
    affiliateUrl: '#',
    image: '☀️'
  },
  citrulline: {
    id: 'citrulline',
    name: 'Citrulline Malate',
    category: 'Performance',
    goals: ['muscle', 'endurance', 'pump'],
    constraints: ['vegan', 'stimulant-free'],
    experience: ['intermediate', 'advanced'],
    stimulant: false,
    priceRange: 'mid',
    shortDesc: 'Boosts nitric oxide for enhanced blood flow, pumps, and endurance.',
    longDesc: 'Citrulline is an amino acid that converts to arginine in the body, boosting nitric oxide production. This enhances blood flow to working muscles, potentially improving performance and the "pump" sensation.',
    whoFor: ['Those wanting enhanced muscle pumps', 'Athletes doing high-volume training', 'People seeking stimulant-free pre-workout options', 'Endurance and strength athletes alike'],
    whoNotFor: ['Those on blood pressure medication (consult doctor)', 'People who don\'t notice pump effects', 'Those looking for energy/stimulant effects'],
    ingredients: [{ name: 'L-Citrulline Malate 2:1', amount: '6-8g', purpose: 'Nitric oxide precursor for blood flow' }],
    pros: ['Stimulant-free', 'Noticeable pump effect', 'May improve endurance', 'Pairs well with other supplements', 'Vegan-friendly'],
    cons: ['Effects are subtle for some', 'Large doses needed', 'No energy/focus benefits', 'Quality varies by brand'],
    alternatives: ['L-Arginine (direct, but less effective)', 'Beetroot Powder (different NO pathway)', 'Glycerol (hydration-based pump)'],
    affiliateUrl: '#',
    image: '💨'
  },
  plantProtein: {
    id: 'plantProtein',
    name: 'Plant Protein Blend',
    category: 'Protein',
    goals: ['muscle', 'recovery', 'fatLoss'],
    constraints: ['vegan'],
    experience: ['beginner', 'intermediate', 'advanced'],
    stimulant: false,
    priceRange: 'mid',
    shortDesc: 'Complete plant-based protein combining multiple sources for full amino acid profile.',
    longDesc: 'Plant protein blends typically combine pea, rice, and other plant proteins to create a complete amino acid profile comparable to whey. Modern formulas have improved taste and texture significantly.',
    whoFor: ['Vegans and vegetarians', 'Those with dairy sensitivities', 'People preferring plant-based nutrition', 'Anyone wanting protein variety'],
    whoNotFor: ['Those with legume allergies', 'People who prefer the taste of whey', 'Those not concerned about dairy'],
    ingredients: [{ name: 'Pea Protein + Rice Protein', amount: '20-25g protein per scoop', purpose: 'Complete plant-based amino acid profile' }],
    pros: ['Vegan-friendly', 'Complete amino acid profile', 'Often easier to digest than whey', 'Sustainable option', 'Hypoallergenic'],
    cons: ['Texture can be grittier', 'Taste varies more than whey', 'May need larger servings', 'Can be more expensive'],
    alternatives: ['Whey Isolate (if dairy OK)', 'Soy Protein (single source)', 'Hemp Protein (with healthy fats)'],
    affiliateUrl: '#',
    image: '🌱'
  },
  magnesium: {
    id: 'magnesium',
    name: 'Magnesium Glycinate',
    category: 'Recovery',
    goals: ['recovery', 'health', 'sleep'],
    constraints: ['vegan', 'budget', 'stimulant-free'],
    experience: ['beginner', 'intermediate', 'advanced'],
    stimulant: false,
    priceRange: 'budget',
    shortDesc: 'Essential mineral for muscle function, recovery, and sleep quality.',
    longDesc: 'Magnesium is involved in over 300 enzymatic reactions including muscle contraction, protein synthesis, and energy production. Many athletes are deficient due to losses through sweat.',
    whoFor: ['Those with muscle cramps or tension', 'Athletes wanting improved sleep', 'Anyone with signs of deficiency', 'High-volume trainers losing minerals through sweat'],
    whoNotFor: ['Those already supplementing magnesium', 'People with kidney issues (consult doctor)', 'Those not experiencing deficiency symptoms'],
    ingredients: [{ name: 'Magnesium Glycinate', amount: '200-400mg elemental', purpose: 'Highly absorbable magnesium for muscles and sleep' }],
    pros: ['Addresses common deficiency', 'Well-absorbed form', 'May improve sleep', 'Supports muscle function', 'Gentle on stomach'],
    cons: ['Effects subtle if not deficient', 'Takes time to replenish stores', 'Multiple forms available (confusing)', 'Quality varies'],
    alternatives: ['Magnesium Citrate (good absorption, looser stools)', 'Magnesium Threonate (cognitive focus)', 'ZMA (with zinc and B6)'],
    affiliateUrl: '#',
    image: '🌙'
  },
  electrolytes: {
    id: 'electrolytes',
    name: 'Electrolyte Complex',
    category: 'Hydration',
    goals: ['endurance', 'recovery', 'health'],
    constraints: ['vegan', 'budget', 'stimulant-free'],
    experience: ['beginner', 'intermediate', 'advanced'],
    stimulant: false,
    priceRange: 'budget',
    shortDesc: 'Essential minerals lost through sweat to maintain hydration and performance.',
    longDesc: 'Electrolytes (sodium, potassium, magnesium) are minerals that conduct electrical impulses in the body. They\'re lost through sweat and need to be replaced during prolonged or intense exercise to maintain performance.',
    whoFor: ['Endurance athletes', 'Those who sweat heavily', 'Hot climate trainers', 'Anyone doing long training sessions', 'Those on low-carb diets'],
    whoNotFor: ['Those doing short, low-intensity workouts', 'People with high sodium diets', 'Those with blood pressure concerns (check sodium content)'],
    ingredients: [
      { name: 'Sodium', amount: '300-1000mg', purpose: 'Primary electrolyte lost in sweat' },
      { name: 'Potassium', amount: '100-400mg', purpose: 'Muscle and nerve function' },
      { name: 'Magnesium', amount: '50-100mg', purpose: 'Muscle relaxation and recovery' }
    ],
    pros: ['Immediate hydration support', 'Can improve endurance performance', 'Prevents cramping', 'Low calorie options available', 'Essential for heavy sweaters'],
    cons: ['Not necessary for short workouts', 'Some products high in sugar', 'Sodium can be excessive', 'Many overpriced options'],
    alternatives: ['DIY electrolyte mix', 'Coconut water (natural electrolytes)', 'Salted foods + water'],
    affiliateUrl: '#',
    image: '💧'
  }
};

// Quiz Logic Configuration
const quizQuestions = [
  {
    id: 'goal',
    question: 'What\'s your main fitness goal?',
    subtext: 'Pick the one that matters most right now',
    options: [
      { value: 'muscle', label: 'Build Muscle & Strength', icon: '💪' },
      { value: 'fatLoss', label: 'Lose Fat & Get Lean', icon: '🔥' },
      { value: 'endurance', label: 'Improve Endurance', icon: '🏃' },
      { value: 'recovery', label: 'Better Recovery', icon: '😴' },
      { value: 'energy', label: 'More Energy & Focus', icon: '⚡' }
    ]
  },
  {
    id: 'frequency',
    question: 'How often do you work out?',
    subtext: 'Be honest — this affects what you actually need',
    options: [
      { value: '1-2', label: '1-2 days per week', icon: '📅' },
      { value: '3-4', label: '3-4 days per week', icon: '📆' },
      { value: '5-6', label: '5-6 days per week', icon: '🗓️' },
      { value: '7+', label: 'Daily or twice daily', icon: '🔄' }
    ]
  },
  {
    id: 'experience',
    question: 'How long have you been training?',
    subtext: 'This helps us recommend the right starting point',
    options: [
      { value: 'beginner', label: 'Under 1 year', icon: '🌱' },
      { value: 'intermediate', label: '1-3 years', icon: '🌿' },
      { value: 'advanced', label: '3+ years', icon: '🌳' }
    ]
  },
  {
    id: 'diet',
    question: 'Any dietary restrictions?',
    subtext: 'We\'ll only show supplements that work for you',
    options: [
      { value: 'none', label: 'No restrictions', icon: '🍽️' },
      { value: 'vegan', label: 'Vegan / Plant-based', icon: '🌱' },
      { value: 'dairyFree', label: 'Dairy-free', icon: '🥛' },
      { value: 'glutenFree', label: 'Gluten-free', icon: '🌾' }
    ]
  },
  {
    id: 'stimulant',
    question: 'How do you feel about caffeine?',
    subtext: 'Some supplements contain stimulants for energy',
    options: [
      { value: 'love', label: 'Love it — energize me', icon: '☕' },
      { value: 'moderate', label: 'Moderate is fine', icon: '👍' },
      { value: 'avoid', label: 'Prefer to avoid', icon: '🚫' },
      { value: 'sensitive', label: 'Very sensitive', icon: '⚠️' }
    ]
  },
  {
    id: 'budget',
    question: 'What\'s your supplement budget?',
    subtext: 'We\'ll prioritize the best value options',
    options: [
      { value: 'minimal', label: 'Under $30/month', icon: '💵' },
      { value: 'moderate', label: '$30-60/month', icon: '💰' },
      { value: 'flexible', label: '$60-100/month', icon: '💎' },
      { value: 'unlimited', label: '$100+/month', icon: '👑' }
    ]
  }
];

// Stack Recommendation Engine
function getRecommendations(answers) {
  let recommended = [];
  const { goal, frequency, experience, diet, stimulant, budget } = answers;
  
  Object.values(supplements).forEach(supp => {
    let score = 0;
    let reasons = [];
    
    if (supp.goals.includes(goal)) {
      score += 30;
      reasons.push(`Supports your ${goal.replace(/([A-Z])/g, ' $1').toLowerCase()} goal`);
    }
    
    if (supp.experience.includes(experience)) {
      score += 15;
    } else {
      score -= 20;
    }
    
    if (diet === 'vegan' && !supp.constraints.includes('vegan')) {
      score -= 100;
    }
    if (diet === 'dairyFree' && supp.id === 'wheyProtein') {
      score -= 100;
    }
    
    if ((stimulant === 'avoid' || stimulant === 'sensitive') && supp.stimulant) {
      score -= 100;
    }
    if (stimulant === 'love' && supp.stimulant) {
      score += 10;
      reasons.push('Contains caffeine for energy');
    }
    
    if (budget === 'minimal' && supp.priceRange === 'budget') {
      score += 10;
      reasons.push('Budget-friendly');
    }
    if (budget === 'minimal' && supp.priceRange === 'premium') {
      score -= 15;
    }
    
    if (frequency === '5-6' || frequency === '7+') {
      if (supp.id === 'electrolytes' || supp.id === 'omega3' || supp.id === 'magnesium') {
        score += 10;
        reasons.push('Supports high training volume');
      }
    }
    
    if (experience === 'beginner') {
      if (['creatine', 'wheyProtein', 'vitaminD', 'plantProtein'].includes(supp.id)) {
        score += 5;
        reasons.push('Great starting supplement');
      }
    }
    
    if (reasons.length === 0 && score > 0) {
      reasons.push('Complements your training');
    }
    
    recommended.push({ ...supp, score, reasons });
  });
  
  return recommended
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

// ============================================
// COMPONENTS
// ============================================

function Navigation({ currentPage, setCurrentPage }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'quiz', label: 'Find Supplements' },
    { id: 'directory', label: 'Browse All' },
    { id: 'about', label: 'About' }
  ];
  
  return (
    <nav className="nav">
      <div className="nav-container">
        <button className="nav-logo" onClick={() => setCurrentPage('home')}>
          <span className="logo-mark">J</span>
          <span className="logo-text">jakt</span>
        </button>
        
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? '✕' : '☰'}
        </button>
        
        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <button 
              key={item.id}
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => { setCurrentPage(item.id); setMobileOpen(false); }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero({ setCurrentPage }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">Free Supplement Quiz</div>
        <h1 className="hero-title">
          Find the right supplements<br />
          <span className="hero-highlight">for your goals</span>
        </h1>
        <p className="hero-subtitle">
          Answer 6 quick questions. Get personalized recommendations based on your 
          training, diet, and budget. No guesswork, no hype.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary btn-lg" onClick={() => setCurrentPage('quiz')}>
            Take the Quiz
            <span className="btn-icon">→</span>
          </button>
          <button className="btn btn-ghost btn-lg" onClick={() => setCurrentPage('directory')}>
            Browse Supplements
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">10+</span>
            <span className="stat-label">Supplements reviewed</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">2 min</span>
            <span className="stat-label">Quiz length</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Free to use</span>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-card hero-card-1">
          <span className="card-emoji">💪</span>
          <span className="card-text">Creatine</span>
        </div>
        <div className="hero-card hero-card-2">
          <span className="card-emoji">🥛</span>
          <span className="card-text">Protein</span>
        </div>
        <div className="hero-card hero-card-3">
          <span className="card-emoji">⚡</span>
          <span className="card-text">Pre-workout</span>
        </div>
        <div className="hero-card hero-card-4">
          <span className="card-emoji">🌙</span>
          <span className="card-text">Recovery</span>
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ setCurrentPage }) {
  const steps = [
    { num: '1', title: 'Take the Quiz', desc: 'Answer questions about your goals, diet, and preferences.', icon: '📝' },
    { num: '2', title: 'Get Matched', desc: 'Our algorithm finds supplements that fit your needs.', icon: '🎯' },
    { num: '3', title: 'Learn & Decide', desc: 'Read the details, compare options, and choose what\'s right for you.', icon: '✓' }
  ];
  
  return (
    <section className="how-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">How it works</h2>
          <p className="section-desc">Get personalized recommendations in under 2 minutes</p>
        </div>
        <div className="steps-row">
          {steps.map((step, i) => (
            <div key={i} className="step-item">
              <div className="step-num">{step.num}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="section-cta">
          <button className="btn btn-primary" onClick={() => setCurrentPage('quiz')}>
            Start the Quiz →
          </button>
        </div>
      </div>
    </section>
  );
}

function FeaturedSupplements({ setCurrentPage, setSelectedSupplement }) {
  const featured = ['creatine', 'wheyProtein', 'caffeine', 'omega3', 'magnesium', 'citrulline'];
  
  return (
    <section className="featured-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Popular supplements</h2>
          <p className="section-desc">The most commonly recommended options</p>
        </div>
        <div className="supplement-grid">
          {featured.map(id => {
            const supp = supplements[id];
            return (
              <button 
                key={id} 
                className="supplement-card"
                onClick={() => { setSelectedSupplement(supp); setCurrentPage('supplement'); }}
              >
                <span className="supp-emoji">{supp.image}</span>
                <div className="supp-info">
                  <span className="supp-category">{supp.category}</span>
                  <h3 className="supp-name">{supp.name}</h3>
                  <p className="supp-desc">{supp.shortDesc}</p>
                </div>
                <span className="supp-arrow">→</span>
              </button>
            );
          })}
        </div>
        <div className="section-cta">
          <button className="btn btn-secondary" onClick={() => setCurrentPage('directory')}>
            View All Supplements
          </button>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="trust-section">
      <div className="container">
        <div className="trust-grid">
          <div className="trust-item">
            <div className="trust-icon">🔬</div>
            <h3>Research-Based</h3>
            <p>Information from peer-reviewed studies, not marketing hype</p>
          </div>
          <div className="trust-item">
            <div className="trust-icon">🚫</div>
            <h3>No Medical Claims</h3>
            <p>Education only — always consult a healthcare provider</p>
          </div>
          <div className="trust-item">
            <div className="trust-icon">💬</div>
            <h3>Transparent</h3>
            <p>We disclose affiliate relationships and how we make money</p>
          </div>
          <div className="trust-item">
            <div className="trust-icon">🎯</div>
            <h3>Goal-Focused</h3>
            <p>Recommendations based on your needs, not what pays us most</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DisclaimerBanner() {
  return (
    <div className="disclaimer-banner">
      <div className="container">
        <p>
          <strong>Disclaimer:</strong> This site provides educational information only, not medical advice. 
          Always consult a healthcare provider before starting any supplement.
        </p>
      </div>
    </div>
  );
}

function Quiz({ setCurrentPage, setQuizResults }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animating, setAnimating] = useState(false);
  
  const currentQuestion = quizQuestions[step];
  const progress = ((step + 1) / quizQuestions.length) * 100;
  
  const handleSelect = (value) => {
    if (animating) return;
    
    setAnimating(true);
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    
    setTimeout(() => {
      if (step < quizQuestions.length - 1) {
        setStep(step + 1);
      } else {
        const recommendations = getRecommendations(newAnswers);
        setQuizResults({ answers: newAnswers, recommendations });
        setCurrentPage('results');
      }
      setAnimating(false);
    }, 200);
  };
  
  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-header">
          <div className="quiz-progress">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="progress-label">{step + 1} of {quizQuestions.length}</span>
          </div>
          {step > 0 && (
            <button className="quiz-back" onClick={() => setStep(step - 1)}>
              ← Back
            </button>
          )}
        </div>
        
        <div className={`quiz-body ${animating ? 'fading' : ''}`}>
          <h2 className="quiz-question">{currentQuestion.question}</h2>
          <p className="quiz-subtext">{currentQuestion.subtext}</p>
          
          <div className="quiz-options">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                className="quiz-option"
                onClick={() => handleSelect(option.value)}
              >
                <span className="option-icon">{option.icon}</span>
                <span className="option-text">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Results({ quizResults, setCurrentPage, setSelectedSupplement }) {
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);
  
  if (!quizResults) {
    return (
      <div className="results-page">
        <div className="container">
          <h2>No results yet</h2>
          <button className="btn btn-primary" onClick={() => setCurrentPage('quiz')}>
            Take the Quiz
          </button>
        </div>
      </div>
    );
  }
  
  const { recommendations } = quizResults;
  
  return (
    <div className="results-page">
      <div className="container">
        <div className="results-header">
          <div className="results-badge">Your Results</div>
          <h1 className="results-title">Your personalized stack</h1>
          <p className="results-subtitle">
            Based on your answers, here are the supplements most likely to help you reach your goals.
          </p>
        </div>
        
        <div className="results-list">
          {recommendations.map((supp, i) => (
            <div key={supp.id} className="result-card">
              <div className="result-num">#{i + 1}</div>
              <div className="result-main">
                <div className="result-top">
                  <span className="result-emoji">{supp.image}</span>
                  <div className="result-info">
                    <span className="result-cat">{supp.category}</span>
                    <h3 className="result-name">{supp.name}</h3>
                  </div>
                </div>
                <p className="result-desc">{supp.shortDesc}</p>
                <div className="result-reasons">
                  {supp.reasons.map((reason, j) => (
                    <span key={j} className="reason-tag">✓ {reason}</span>
                  ))}
                </div>
                <div className="result-actions">
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => { setSelectedSupplement(supp); setCurrentPage('supplement'); }}
                  >
                    Learn More
                  </button>
                  <a href={supp.affiliateUrl} className="btn btn-primary btn-sm">
                    Shop Now →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {!saved && (
          <div className="email-box">
            <h3>Save your results</h3>
            <p>Get your recommendations sent to your inbox</p>
            <form className="email-form" onSubmit={(e) => { e.preventDefault(); setSaved(true); }}>
              <input 
                type="email" 
                placeholder="your@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">Send</button>
            </form>
          </div>
        )}
        
        {saved && (
          <div className="email-success">
            ✓ Results sent! Check your inbox.
          </div>
        )}
        
        <div className="results-actions">
          <button className="btn btn-ghost" onClick={() => setCurrentPage('quiz')}>
            Retake Quiz
          </button>
          <button className="btn btn-ghost" onClick={() => setCurrentPage('directory')}>
            Browse All
          </button>
        </div>
        
        <div className="results-disclaimer">
          These recommendations are for educational purposes only. Individual results vary. 
          Consult a healthcare provider before starting any supplement.
        </div>
      </div>
    </div>
  );
}

function Directory({ setCurrentPage, setSelectedSupplement }) {
  const [filter, setFilter] = useState('all');
  const [filterType, setFilterType] = useState('goal');
  
  const filters = {
    goal: [
      { value: 'all', label: 'All' },
      { value: 'muscle', label: 'Muscle' },
      { value: 'fatLoss', label: 'Fat Loss' },
      { value: 'endurance', label: 'Endurance' },
      { value: 'recovery', label: 'Recovery' }
    ],
    constraint: [
      { value: 'all', label: 'All' },
      { value: 'vegan', label: 'Vegan' },
      { value: 'stimulant-free', label: 'Stim-Free' },
      { value: 'budget', label: 'Budget' }
    ]
  };
  
  const filtered = Object.values(supplements).filter(supp => {
    if (filter === 'all') return true;
    if (filterType === 'goal') return supp.goals.includes(filter);
    if (filterType === 'constraint') return supp.constraints.includes(filter) || (filter === 'stimulant-free' && !supp.stimulant);
    return true;
  });
  
  return (
    <div className="directory-page">
      <div className="container">
        <div className="directory-header">
          <h1 className="directory-title">Supplement Directory</h1>
          <p className="directory-subtitle">Browse all supplements or filter by what matters to you</p>
        </div>
        
        <div className="filter-bar">
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${filterType === 'goal' ? 'active' : ''}`}
              onClick={() => { setFilterType('goal'); setFilter('all'); }}
            >
              By Goal
            </button>
            <button 
              className={`filter-tab ${filterType === 'constraint' ? 'active' : ''}`}
              onClick={() => { setFilterType('constraint'); setFilter('all'); }}
            >
              By Need
            </button>
          </div>
          <div className="filter-pills">
            {filters[filterType].map(f => (
              <button
                key={f.value}
                className={`filter-pill ${filter === f.value ? 'active' : ''}`}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="directory-grid">
          {filtered.map(supp => (
            <button 
              key={supp.id}
              className="dir-card"
              onClick={() => { setSelectedSupplement(supp); setCurrentPage('supplement'); }}
            >
              <span className="dir-emoji">{supp.image}</span>
              <span className="dir-cat">{supp.category}</span>
              <h3 className="dir-name">{supp.name}</h3>
              <p className="dir-desc">{supp.shortDesc}</p>
              <div className="dir-tags">
                {!supp.stimulant && <span className="dir-tag">stim-free</span>}
                {supp.constraints.slice(0, 2).map(c => (
                  <span key={c} className="dir-tag">{c}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
        
        <div className="directory-cta">
          <p>Not sure where to start?</p>
          <button className="btn btn-primary" onClick={() => setCurrentPage('quiz')}>
            Take the Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

function SupplementDetail({ supplement, setCurrentPage, setSelectedSupplement }) {
  if (!supplement) {
    return (
      <div className="detail-page">
        <div className="container">
          <p>Supplement not found</p>
          <button className="btn btn-primary" onClick={() => setCurrentPage('directory')}>
            Browse All
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="detail-page">
      <div className="container">
        <button className="back-btn" onClick={() => setCurrentPage('directory')}>
          ← Back to Directory
        </button>
        
        <div className="detail-hero">
          <span className="detail-emoji">{supplement.image}</span>
          <div className="detail-intro">
            <span className="detail-cat">{supplement.category}</span>
            <h1 className="detail-title">{supplement.name}</h1>
            <p className="detail-short">{supplement.shortDesc}</p>
            <div className="detail-tags">
              {supplement.constraints.map(c => <span key={c} className="tag">{c}</span>)}
              {!supplement.stimulant && <span className="tag">stimulant-free</span>}
            </div>
          </div>
        </div>
        
        <div className="detail-content">
          <section className="detail-section">
            <h2>What is it?</h2>
            <p>{supplement.longDesc}</p>
          </section>
          
          <section className="detail-section">
            <h2>Who it's for</h2>
            <ul className="check-list green">
              {supplement.whoFor.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>
          
          <section className="detail-section">
            <h2>Who it's NOT for</h2>
            <ul className="check-list red">
              {supplement.whoNotFor.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>
          
          <section className="detail-section">
            <h2>Key Ingredients</h2>
            <div className="ingredient-list">
              {supplement.ingredients.map((ing, i) => (
                <div key={i} className="ingredient-item">
                  <div className="ing-top">
                    <span className="ing-name">{ing.name}</span>
                    <span className="ing-amount">{ing.amount}</span>
                  </div>
                  <p className="ing-purpose">{ing.purpose}</p>
                </div>
              ))}
            </div>
          </section>
          
          <section className="detail-section">
            <h2>Pros & Cons</h2>
            <div className="pros-cons-grid">
              <div className="pros-col">
                <h3>Pros</h3>
                <ul>{supplement.pros.map((p, i) => <li key={i}>{p}</li>)}</ul>
              </div>
              <div className="cons-col">
                <h3>Cons</h3>
                <ul>{supplement.cons.map((c, i) => <li key={i}>{c}</li>)}</ul>
              </div>
            </div>
          </section>
          
          <section className="detail-section">
            <h2>Alternatives</h2>
            <ul className="alt-list">
              {supplement.alternatives.map((alt, i) => <li key={i}>{alt}</li>)}
            </ul>
          </section>
          
          <div className="detail-cta">
            <a href={supplement.affiliateUrl} className="btn btn-primary btn-lg">
              Shop {supplement.name} →
            </a>
            <p className="affiliate-note">
              We may earn a commission if you purchase through this link.
            </p>
          </div>
          
          <div className="detail-disclaimer">
            <strong>Disclaimer:</strong> This information is for educational purposes only. 
            Consult a healthcare provider before starting any supplement.
          </div>
        </div>
      </div>
    </div>
  );
}

function About({ setCurrentPage }) {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1>About Jakt</h1>
          <p className="about-lead">
            We help you find supplements that actually fit your goals — without the hype and confusion.
          </p>
        </div>
        
        <div className="about-content">
          <section>
            <h2>Why we built this</h2>
            <p>
              The supplement industry is overwhelming. Thousands of products, conflicting claims, 
              aggressive marketing. We built Jakt to cut through the noise and help you make 
              informed decisions based on your specific situation.
            </p>
          </section>
          
          <section>
            <h2>Our approach</h2>
            <div className="approach-grid">
              <div className="approach-item">
                <strong>Goal-focused</strong>
                <p>Recommendations based on what you're trying to achieve</p>
              </div>
              <div className="approach-item">
                <strong>Research-based</strong>
                <p>Information from studies, not marketing claims</p>
              </div>
              <div className="approach-item">
                <strong>No medical claims</strong>
                <p>We never claim supplements treat or cure anything</p>
              </div>
              <div className="approach-item">
                <strong>Plain language</strong>
                <p>Clear information without jargon or hype</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2>How we make money</h2>
            <p>
              <strong>We use affiliate links.</strong> When you click a link and make a purchase, 
              we may earn a small commission. This doesn't cost you anything extra.
            </p>
            <p>
              <strong>This doesn't affect our recommendations.</strong> We recommend supplements 
              based on fit for your goals — not based on which products pay us the most.
            </p>
          </section>
          
          <section>
            <h2>What we're not</h2>
            <ul>
              <li>We are <strong>not doctors</strong> and don't provide medical advice</li>
              <li>We are <strong>not a replacement</strong> for professional healthcare</li>
              <li>We do <strong>not guarantee</strong> results from any supplement</li>
            </ul>
          </section>
        </div>
        
        <div className="about-cta">
          <button className="btn btn-primary btn-lg" onClick={() => setCurrentPage('quiz')}>
            Find Your Supplements →
          </button>
        </div>
      </div>
    </div>
  );
}

function Legal({ type }) {
  const pages = {
    disclaimer: {
      title: 'Medical Disclaimer',
      content: `
        <h2>Not Medical Advice</h2>
        <p>The information on this site is for educational purposes only. It is not medical advice, diagnosis, or treatment.</p>
        
        <h2>Consult a Professional</h2>
        <p>Always consult a qualified healthcare provider before starting any supplement. Never disregard professional medical advice because of something you read here.</p>
        
        <h2>Supplement Limitations</h2>
        <p>Supplements are not intended to diagnose, treat, cure, or prevent any disease. Individual results vary.</p>
        
        <h2>Your Responsibility</h2>
        <p>Any action you take based on this site is at your own risk.</p>
      `
    },
    privacy: {
      title: 'Privacy Policy',
      content: `
        <h2>What We Collect</h2>
        <p>We collect information you provide (email, quiz responses) and standard analytics data.</p>
        
        <h2>How We Use It</h2>
        <p>To provide recommendations, send emails you request, and improve our service.</p>
        
        <h2>Third Parties</h2>
        <p>We use affiliate links to third-party retailers with their own privacy policies.</p>
        
        <h2>Your Rights</h2>
        <p>You can request access to or deletion of your data by contacting us.</p>
      `
    },
    affiliate: {
      title: 'Affiliate Disclosure',
      content: `
        <h2>We Earn Commissions</h2>
        <p>When you click links on our site and make purchases, we may earn a commission from the retailer.</p>
        
        <h2>No Extra Cost</h2>
        <p>This doesn't cost you anything extra. You pay the same price whether you use our link or not.</p>
        
        <h2>Our Commitment</h2>
        <p>Affiliate relationships don't influence our recommendations. We recommend based on fit for your goals.</p>
      `
    },
    terms: {
      title: 'Terms of Service',
      content: `
        <h2>Use of Site</h2>
        <p>By using this site, you agree to these terms. Use is for personal, non-commercial purposes only.</p>
        
        <h2>No Warranties</h2>
        <p>This site is provided "as is" without warranties. We don't guarantee accuracy or completeness.</p>
        
        <h2>Limitation of Liability</h2>
        <p>We're not liable for damages from using this site or relying on its content.</p>
      `
    }
  };
  
  const page = pages[type] || pages.disclaimer;
  
  return (
    <div className="legal-page">
      <div className="container">
        <h1>{page.title}</h1>
        <div className="legal-content" dangerouslySetInnerHTML={{ __html: page.content }} />
        <p className="legal-date">Last updated: January 2025</p>
      </div>
    </div>
  );
}

function Footer({ setCurrentPage, setLegalType }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-mark">J</span>
              <span>jakt</span>
            </div>
            <p>Find supplements that fit your goals.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Site</h4>
              <button onClick={() => setCurrentPage('home')}>Home</button>
              <button onClick={() => setCurrentPage('quiz')}>Find Supplements</button>
              <button onClick={() => setCurrentPage('directory')}>Browse All</button>
              <button onClick={() => setCurrentPage('about')}>About</button>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <button onClick={() => { setLegalType('disclaimer'); setCurrentPage('legal'); }}>Disclaimer</button>
              <button onClick={() => { setLegalType('privacy'); setCurrentPage('legal'); }}>Privacy</button>
              <button onClick={() => { setLegalType('affiliate'); setCurrentPage('legal'); }}>Affiliate Disclosure</button>
              <button onClick={() => { setLegalType('terms'); setCurrentPage('legal'); }}>Terms</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Jakt. Not medical advice. Always consult a healthcare provider.</p>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// MAIN APP
// ============================================

export default function GetJakt() {
  const [currentPage, setCurrentPage] = useState('home');
  const [quizResults, setQuizResults] = useState(null);
  const [selectedSupplement, setSelectedSupplement] = useState(null);
  const [legalType, setLegalType] = useState('disclaimer');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            <HowItWorks setCurrentPage={setCurrentPage} />
            <FeaturedSupplements setCurrentPage={setCurrentPage} setSelectedSupplement={setSelectedSupplement} />
            <TrustSection />
            <DisclaimerBanner />
          </>
        );
      case 'quiz':
        return <Quiz setCurrentPage={setCurrentPage} setQuizResults={setQuizResults} />;
      case 'results':
        return <Results quizResults={quizResults} setCurrentPage={setCurrentPage} setSelectedSupplement={setSelectedSupplement} />;
      case 'directory':
        return <Directory setCurrentPage={setCurrentPage} setSelectedSupplement={setSelectedSupplement} />;
      case 'supplement':
        return <SupplementDetail supplement={selectedSupplement} setCurrentPage={setCurrentPage} setSelectedSupplement={setSelectedSupplement} />;
      case 'about':
        return <About setCurrentPage={setCurrentPage} />;
      case 'legal':
        return <Legal type={legalType} />;
      default:
        return <Hero setCurrentPage={setCurrentPage} />;
    }
  };
  
  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap');
        
        :root {
          --slate-900: #0f172a;
          --slate-800: #1e293b;
          --slate-700: #334155;
          --slate-600: #475569;
          --slate-500: #64748b;
          --slate-400: #94a3b8;
          --slate-300: #cbd5e1;
          --slate-200: #e2e8f0;
          --slate-100: #f1f5f9;
          --slate-50: #f8fafc;
          --white: #ffffff;
          
          --blue-600: #2563eb;
          --blue-500: #3b82f6;
          --blue-400: #60a5fa;
          --blue-100: #dbeafe;
          --blue-50: #eff6ff;
          
          --emerald-600: #059669;
          --emerald-500: #10b981;
          --emerald-100: #d1fae5;
          
          --amber-500: #f59e0b;
          --amber-100: #fef3c7;
          
          --red-500: #ef4444;
          --red-100: #fee2e2;
          
          --font-display: 'Outfit', system-ui, sans-serif;
          --font-body: 'Inter', system-ui, sans-serif;
          
          --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
          --shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
          --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
          --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
          
          --radius-sm: 6px;
          --radius: 8px;
          --radius-lg: 12px;
          --radius-xl: 16px;
          --radius-2xl: 24px;
        }
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        html { scroll-behavior: smooth; }
        
        body {
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.6;
          color: var(--slate-700);
          background: var(--white);
          -webkit-font-smoothing: antialiased;
        }
        
        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
        }
        
        /* ===== NAV ===== */
        .nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--slate-200);
        }
        
        .nav-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 700;
          color: var(--slate-900);
        }
        
        .logo-mark {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--blue-500), var(--blue-600));
          color: white;
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 800;
        }
        
        .nav-links {
          display: flex;
          gap: 8px;
        }
        
        .nav-link {
          background: none;
          border: none;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          color: var(--slate-600);
          cursor: pointer;
          padding: 8px 16px;
          border-radius: var(--radius);
          transition: all 0.15s;
        }
        
        .nav-link:hover { color: var(--slate-900); background: var(--slate-100); }
        .nav-link.active { color: var(--blue-600); background: var(--blue-50); }
        
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: var(--slate-700);
        }
        
        @media (max-width: 768px) {
          .mobile-toggle { display: block; }
          .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 16px;
            border-bottom: 1px solid var(--slate-200);
            box-shadow: var(--shadow-lg);
          }
          .nav-links.open { display: flex; }
        }
        
        /* ===== BUTTONS ===== */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          padding: 12px 24px;
          border-radius: var(--radius);
          border: none;
          cursor: pointer;
          transition: all 0.15s;
          text-decoration: none;
        }
        
        .btn-primary {
          background: var(--blue-600);
          color: white;
        }
        .btn-primary:hover {
          background: var(--blue-500);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }
        
        .btn-secondary {
          background: var(--slate-100);
          color: var(--slate-700);
        }
        .btn-secondary:hover {
          background: var(--slate-200);
        }
        
        .btn-ghost {
          background: transparent;
          color: var(--slate-600);
        }
        .btn-ghost:hover {
          background: var(--slate-100);
          color: var(--slate-900);
        }
        
        .btn-lg {
          padding: 16px 32px;
          font-size: 16px;
          border-radius: var(--radius-lg);
        }
        
        .btn-sm {
          padding: 8px 16px;
          font-size: 14px;
        }
        
        /* ===== HERO ===== */
        .hero {
          padding: 80px 24px;
          background: linear-gradient(180deg, var(--blue-50) 0%, var(--white) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
        }
        
        .hero-content {
          max-width: 640px;
          text-align: center;
        }
        
        .hero-badge {
          display: inline-block;
          background: var(--blue-100);
          color: var(--blue-600);
          font-size: 13px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 24px;
        }
        
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(36px, 6vw, 56px);
          font-weight: 800;
          line-height: 1.1;
          color: var(--slate-900);
          margin-bottom: 20px;
        }
        
        .hero-highlight {
          background: linear-gradient(135deg, var(--blue-600), var(--blue-400));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-subtitle {
          font-size: 18px;
          color: var(--slate-600);
          margin-bottom: 32px;
          line-height: 1.7;
        }
        
        .hero-cta {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }
        
        .hero-stats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
        }
        
        .stat {
          text-align: center;
        }
        
        .stat-number {
          display: block;
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 700;
          color: var(--slate-900);
        }
        
        .stat-label {
          font-size: 13px;
          color: var(--slate-500);
        }
        
        .stat-divider {
          width: 1px;
          height: 40px;
          background: var(--slate-200);
        }
        
        .hero-visual {
          display: none;
        }
        
        /* ===== HOW SECTION ===== */
        .how-section {
          padding: 96px 0;
          background: var(--white);
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 48px;
        }
        
        .section-title {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 700;
          color: var(--slate-900);
          margin-bottom: 8px;
        }
        
        .section-desc {
          font-size: 16px;
          color: var(--slate-500);
        }
        
        .steps-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 32px;
        }
        
        .step-item {
          text-align: center;
          padding: 32px 24px;
        }
        
        .step-num {
          width: 48px;
          height: 48px;
          background: var(--blue-600);
          color: white;
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }
        
        .step-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--slate-900);
          margin-bottom: 8px;
        }
        
        .step-desc {
          font-size: 15px;
          color: var(--slate-500);
        }
        
        .section-cta {
          text-align: center;
          margin-top: 48px;
        }
        
        /* ===== FEATURED ===== */
        .featured-section {
          padding: 96px 0;
          background: var(--slate-50);
        }
        
        .supplement-grid {
          display: grid;
          gap: 16px;
        }
        
        .supplement-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 24px;
          background: var(--white);
          border: 1px solid var(--slate-200);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all 0.15s;
          text-align: left;
          width: 100%;
        }
        
        .supplement-card:hover {
          border-color: var(--blue-300);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        
        .supp-emoji {
          font-size: 32px;
          flex-shrink: 0;
        }
        
        .supp-info {
          flex: 1;
          min-width: 0;
        }
        
        .supp-category {
          font-size: 12px;
          font-weight: 600;
          color: var(--blue-600);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .supp-name {
          font-size: 17px;
          font-weight: 600;
          color: var(--slate-900);
          margin: 4px 0;
        }
        
        .supp-desc {
          font-size: 14px;
          color: var(--slate-500);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .supp-arrow {
          font-size: 20px;
          color: var(--slate-400);
          transition: all 0.15s;
        }
        
        .supplement-card:hover .supp-arrow {
          color: var(--blue-600);
          transform: translateX(4px);
        }
        
        /* ===== TRUST ===== */
        .trust-section {
          padding: 80px 0;
          background: var(--white);
        }
        
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 32px;
        }
        
        .trust-item {
          text-align: center;
          padding: 24px;
        }
        
        .trust-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }
        
        .trust-item h3 {
          font-size: 16px;
          font-weight: 600;
          color: var(--slate-900);
          margin-bottom: 8px;
        }
        
        .trust-item p {
          font-size: 14px;
          color: var(--slate-500);
        }
        
        /* ===== DISCLAIMER BANNER ===== */
        .disclaimer-banner {
          background: var(--slate-100);
          padding: 16px 0;
        }
        
        .disclaimer-banner p {
          font-size: 13px;
          color: var(--slate-600);
          text-align: center;
        }
        
        /* ===== QUIZ ===== */
        .quiz-page {
          min-height: calc(100vh - 70px);
          background: var(--slate-900);
          padding: 48px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .quiz-container {
          max-width: 600px;
          width: 100%;
        }
        
        .quiz-header {
          margin-bottom: 32px;
        }
        
        .quiz-progress {
          margin-bottom: 16px;
        }
        
        .progress-track {
          height: 4px;
          background: var(--slate-700);
          border-radius: 2px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: var(--blue-500);
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        
        .progress-label {
          font-size: 13px;
          color: var(--slate-400);
          display: block;
          margin-top: 8px;
        }
        
        .quiz-back {
          background: none;
          border: none;
          color: var(--slate-400);
          font-size: 14px;
          cursor: pointer;
          padding: 8px 0;
        }
        
        .quiz-back:hover { color: white; }
        
        .quiz-body {
          transition: opacity 0.2s;
        }
        
        .quiz-body.fading {
          opacity: 0.5;
        }
        
        .quiz-question {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
        }
        
        .quiz-subtext {
          color: var(--slate-400);
          margin-bottom: 32px;
        }
        
        .quiz-options {
          display: grid;
          gap: 12px;
        }
        
        .quiz-option {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          background: var(--slate-800);
          border: 2px solid var(--slate-700);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all 0.15s;
          text-align: left;
        }
        
        .quiz-option:hover {
          border-color: var(--blue-500);
          background: var(--slate-700);
        }
        
        .option-icon {
          font-size: 24px;
        }
        
        .option-text {
          font-size: 16px;
          font-weight: 500;
          color: white;
        }
        
        /* ===== RESULTS ===== */
        .results-page {
          background: var(--slate-50);
          min-height: calc(100vh - 70px);
          padding: 64px 0;
        }
        
        .results-header {
          text-align: center;
          margin-bottom: 48px;
        }
        
        .results-badge {
          display: inline-block;
          background: var(--emerald-100);
          color: var(--emerald-600);
          font-size: 13px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 16px;
        }
        
        .results-title {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 700;
          color: var(--slate-900);
          margin-bottom: 12px;
        }
        
        .results-subtitle {
          font-size: 16px;
          color: var(--slate-500);
          max-width: 500px;
          margin: 0 auto;
        }
        
        .results-list {
          display: grid;
          gap: 20px;
          margin-bottom: 40px;
        }
        
        .result-card {
          background: white;
          border: 1px solid var(--slate-200);
          border-radius: var(--radius-xl);
          padding: 28px;
          display: flex;
          gap: 24px;
          position: relative;
        }
        
        .result-num {
          position: absolute;
          top: 16px;
          right: 20px;
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          color: var(--slate-300);
        }
        
        .result-main {
          flex: 1;
        }
        
        .result-top {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
        }
        
        .result-emoji {
          font-size: 40px;
        }
        
        .result-cat {
          font-size: 12px;
          font-weight: 600;
          color: var(--blue-600);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .result-name {
          font-size: 20px;
          font-weight: 600;
          color: var(--slate-900);
        }
        
        .result-desc {
          font-size: 15px;
          color: var(--slate-500);
          margin-bottom: 16px;
        }
        
        .result-reasons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }
        
        .reason-tag {
          font-size: 13px;
          color: var(--emerald-600);
          background: var(--emerald-100);
          padding: 4px 12px;
          border-radius: 100px;
        }
        
        .result-actions {
          display: flex;
          gap: 12px;
        }
        
        .email-box {
          background: white;
          border: 1px solid var(--slate-200);
          border-radius: var(--radius-xl);
          padding: 32px;
          text-align: center;
          margin-bottom: 32px;
        }
        
        .email-box h3 {
          font-size: 18px;
          font-weight: 600;
          color: var(--slate-900);
          margin-bottom: 8px;
        }
        
        .email-box p {
          font-size: 14px;
          color: var(--slate-500);
          margin-bottom: 20px;
        }
        
        .email-form {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .email-form input {
          padding: 12px 16px;
          border: 1px solid var(--slate-300);
          border-radius: var(--radius);
          font-size: 15px;
          min-width: 240px;
        }
        
        .email-form input:focus {
          outline: none;
          border-color: var(--blue-500);
          box-shadow: 0 0 0 3px var(--blue-100);
        }
        
        .email-success {
          background: var(--emerald-100);
          color: var(--emerald-600);
          padding: 16px;
          border-radius: var(--radius-lg);
          text-align: center;
          font-weight: 500;
          margin-bottom: 32px;
        }
        
        .results-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 32px;
        }
        
        .results-disclaimer {
          font-size: 13px;
          color: var(--slate-500);
          text-align: center;
          max-width: 500px;
          margin: 0 auto;
        }
        
        /* ===== DIRECTORY ===== */
        .directory-page {
          background: var(--white);
          min-height: calc(100vh - 70px);
          padding: 64px 0;
        }
        
        .directory-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .directory-title {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 700;
          color: var(--slate-900);
          margin-bottom: 8px;
        }
        
        .directory-subtitle {
          color: var(--slate-500);
        }
        
        .filter-bar {
          margin-bottom: 32px;
        }
        
        .filter-tabs {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .filter-tab {
          background: none;
          border: none;
          font-size: 14px;
          font-weight: 600;
          color: var(--slate-500);
          padding: 8px 16px;
          border-radius: var(--radius);
          cursor: pointer;
        }
        
        .filter-tab.active {
          background: var(--slate-900);
          color: white;
        }
        
        .filter-pills {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .filter-pill {
          background: var(--slate-100);
          border: none;
          font-size: 13px;
          font-weight: 500;
          color: var(--slate-600);
          padding: 6px 14px;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.15s;
        }
        
        .filter-pill:hover {
          background: var(--slate-200);
        }
        
        .filter-pill.active {
          background: var(--blue-600);
          color: white;
        }
        
        .directory-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 48px;
        }
        
        .dir-card {
          background: var(--slate-50);
          border: 1px solid var(--slate-200);
          border-radius: var(--radius-lg);
          padding: 24px;
          cursor: pointer;
          transition: all 0.15s;
          text-align: left;
        }
        
        .dir-card:hover {
          border-color: var(--blue-300);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        
        .dir-emoji {
          font-size: 28px;
          display: block;
          margin-bottom: 12px;
        }
        
        .dir-cat {
          font-size: 11px;
          font-weight: 600;
          color: var(--blue-600);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .dir-name {
          font-size: 17px;
          font-weight: 600;
          color: var(--slate-900);
          margin: 6px 0 8px;
        }
        
        .dir-desc {
          font-size: 14px;
          color: var(--slate-500);
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .dir-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        
        .dir-tag {
          font-size: 11px;
          font-weight: 500;
          color: var(--slate-500);
          background: var(--slate-200);
          padding: 3px 8px;
          border-radius: 4px;
        }
        
        .directory-cta {
          text-align: center;
          padding: 40px;
          background: var(--slate-50);
          border-radius: var(--radius-xl);
        }
        
        .directory-cta p {
          margin-bottom: 16px;
          color: var(--slate-600);
        }
        
        /* ===== DETAIL ===== */
        .detail-page {
          background: var(--white);
          min-height: calc(100vh - 70px);
          padding: 48px 0 96px;
        }
        
        .back-btn {
          background: none;
          border: none;
          color: var(--slate-500);
          font-size: 14px;
          cursor: pointer;
          margin-bottom: 32px;
          display: inline-block;
        }
        
        .back-btn:hover { color: var(--slate-900); }
        
        .detail-hero {
          display: flex;
          gap: 24px;
          align-items: flex-start;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }
        
        .detail-emoji {
          font-size: 72px;
        }
        
        .detail-intro {
          flex: 1;
          min-width: 300px;
        }
        
        .detail-cat {
          font-size: 12px;
          font-weight: 600;
          color: var(--blue-600);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .detail-title {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 700;
          color: var(--slate-900);
          margin: 8px 0 12px;
        }
        
        .detail-short {
          font-size: 17px;
          color: var(--slate-500);
          margin-bottom: 16px;
        }
        
        .detail-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .tag {
          font-size: 12px;
          font-weight: 500;
          color: var(--slate-600);
          background: var(--slate-100);
          padding: 4px 12px;
          border-radius: 100px;
        }
        
        .detail-content {
          max-width: 720px;
        }
        
        .detail-section {
          margin-bottom: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--slate-200);
        }
        
        .detail-section:last-of-type {
          border-bottom: none;
        }
        
        .detail-section h2 {
          font-size: 20px;
          font-weight: 600;
          color: var(--slate-900);
          margin-bottom: 16px;
        }
        
        .detail-section p {
          color: var(--slate-600);
          line-height: 1.7;
        }
        
        .check-list {
          list-style: none;
        }
        
        .check-list li {
          padding: 8px 0;
          padding-left: 28px;
          position: relative;
          color: var(--slate-600);
        }
        
        .check-list li::before {
          position: absolute;
          left: 0;
          font-weight: 700;
        }
        
        .check-list.green li::before {
          content: '✓';
          color: var(--emerald-500);
        }
        
        .check-list.red li::before {
          content: '✗';
          color: var(--red-500);
        }
        
        .ingredient-list {
          display: grid;
          gap: 12px;
        }
        
        .ingredient-item {
          background: var(--slate-50);
          padding: 16px 20px;
          border-radius: var(--radius);
        }
        
        .ing-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        
        .ing-name {
          font-weight: 600;
          color: var(--slate-900);
        }
        
        .ing-amount {
          font-size: 14px;
          color: var(--blue-600);
          font-weight: 500;
        }
        
        .ing-purpose {
          font-size: 14px;
          color: var(--slate-500);
          margin: 0;
        }
        
        .pros-cons-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        
        @media (max-width: 600px) {
          .pros-cons-grid { grid-template-columns: 1fr; }
        }
        
        .pros-col h3 { color: var(--emerald-600); }
        .cons-col h3 { color: var(--red-500); }
        
        .pros-col ul, .cons-col ul {
          list-style: none;
        }
        
        .pros-col li, .cons-col li {
          padding: 6px 0;
          font-size: 15px;
          color: var(--slate-600);
        }
        
        .alt-list {
          list-style: disc;
          padding-left: 20px;
          color: var(--slate-600);
        }
        
        .alt-list li { padding: 4px 0; }
        
        .detail-cta {
          text-align: center;
          margin: 48px 0;
        }
        
        .affiliate-note {
          font-size: 13px;
          color: var(--slate-500);
          margin-top: 12px;
        }
        
        .detail-disclaimer {
          background: var(--amber-100);
          color: var(--slate-700);
          padding: 16px 20px;
          border-radius: var(--radius);
          font-size: 14px;
        }
        
        /* ===== ABOUT ===== */
        .about-page {
          background: var(--white);
          padding: 64px 0;
        }
        
        .about-header {
          text-align: center;
          margin-bottom: 48px;
        }
        
        .about-header h1 {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 700;
          color: var(--slate-900);
          margin-bottom: 16px;
        }
        
        .about-lead {
          font-size: 18px;
          color: var(--slate-500);
          max-width: 500px;
          margin: 0 auto;
        }
        
        .about-content {
          max-width: 640px;
          margin: 0 auto;
        }
        
        .about-content section {
          margin-bottom: 40px;
        }
        
        .about-content h2 {
          font-size: 20px;
          font-weight: 600;
          color: var(--slate-900);
          margin-bottom: 16px;
        }
        
        .about-content p {
          color: var(--slate-600);
          margin-bottom: 12px;
          line-height: 1.7;
        }
        
        .about-content ul {
          list-style: none;
          color: var(--slate-600);
        }
        
        .about-content li {
          padding: 8px 0;
        }
        
        .approach-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        @media (max-width: 500px) {
          .approach-grid { grid-template-columns: 1fr; }
        }
        
        .approach-item {
          padding: 20px;
          background: var(--slate-50);
          border-radius: var(--radius);
        }
        
        .approach-item strong {
          display: block;
          color: var(--slate-900);
          margin-bottom: 6px;
        }
        
        .approach-item p {
          font-size: 14px;
          margin: 0;
        }
        
        .about-cta {
          text-align: center;
          margin-top: 48px;
        }
        
        /* ===== LEGAL ===== */
        .legal-page {
          background: var(--white);
          padding: 64px 0;
        }
        
        .legal-page h1 {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 700;
          color: var(--slate-900);
          margin-bottom: 32px;
        }
        
        .legal-content {
          max-width: 640px;
        }
        
        .legal-content h2 {
          font-size: 18px;
          font-weight: 600;
          color: var(--slate-900);
          margin: 32px 0 12px;
        }
        
        .legal-content h2:first-child { margin-top: 0; }
        
        .legal-content p {
          color: var(--slate-600);
          margin-bottom: 12px;
          line-height: 1.7;
        }
        
        .legal-date {
          margin-top: 40px;
          font-size: 13px;
          color: var(--slate-500);
        }
        
        /* ===== FOOTER ===== */
        .footer {
          background: var(--slate-900);
          color: var(--slate-400);
          padding: 64px 0 32px;
          margin-top: auto;
        }
        
        .footer-grid {
          display: flex;
          justify-content: space-between;
          gap: 48px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }
        
        .footer-brand {
          max-width: 280px;
        }
        
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          color: white;
          margin-bottom: 12px;
        }
        
        .footer-logo .logo-mark {
          width: 32px;
          height: 32px;
          font-size: 16px;
        }
        
        .footer-brand p {
          font-size: 14px;
        }
        
        .footer-links {
          display: flex;
          gap: 64px;
        }
        
        .footer-col h4 {
          font-size: 13px;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }
        
        .footer-col button {
          display: block;
          background: none;
          border: none;
          color: var(--slate-400);
          font-size: 14px;
          cursor: pointer;
          padding: 6px 0;
          text-align: left;
        }
        
        .footer-col button:hover {
          color: white;
        }
        
        .footer-bottom {
          padding-top: 32px;
          border-top: 1px solid var(--slate-800);
        }
        
        .footer-bottom p {
          font-size: 13px;
          text-align: center;
        }
      `}</style>
      
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer setCurrentPage={setCurrentPage} setLegalType={setLegalType} />
    </div>
  );
}