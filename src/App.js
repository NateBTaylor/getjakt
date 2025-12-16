import React, { useState, useEffect } from 'react';

// ============================================
// GET JAKT - Supplement Directory Website
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
    question: 'What\'s your primary training goal right now?',
    subtext: 'Pick the one that matters most to you',
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
    question: 'How often do you train?',
    subtext: 'Be honest—consistency matters for supplement needs',
    options: [
      { value: '1-2', label: '1-2 days per week', icon: '📅' },
      { value: '3-4', label: '3-4 days per week', icon: '📆' },
      { value: '5-6', label: '5-6 days per week', icon: '🗓️' },
      { value: '7+', label: 'Daily or twice daily', icon: '🔄' }
    ]
  },
  {
    id: 'experience',
    question: 'What\'s your training experience level?',
    subtext: 'This helps us recommend appropriate supplements',
    options: [
      { value: 'beginner', label: 'Beginner (< 1 year)', icon: '🌱' },
      { value: 'intermediate', label: 'Intermediate (1-3 years)', icon: '🌿' },
      { value: 'advanced', label: 'Advanced (3+ years)', icon: '🌳' }
    ]
  },
  {
    id: 'diet',
    question: 'Any dietary restrictions?',
    subtext: 'We\'ll only recommend supplements that fit your diet',
    options: [
      { value: 'none', label: 'No restrictions', icon: '🍽️' },
      { value: 'vegan', label: 'Vegan / Plant-based', icon: '🌱' },
      { value: 'dairyFree', label: 'Dairy-free', icon: '🥛' },
      { value: 'glutenFree', label: 'Gluten-free', icon: '🌾' }
    ]
  },
  {
    id: 'stimulant',
    question: 'How do you feel about stimulants (caffeine)?',
    subtext: 'Some supplements contain caffeine for energy',
    options: [
      { value: 'love', label: 'Love them—give me energy', icon: '☕' },
      { value: 'moderate', label: 'Moderate is fine', icon: '👍' },
      { value: 'avoid', label: 'Prefer to avoid', icon: '🚫' },
      { value: 'sensitive', label: 'Very sensitive', icon: '⚠️' }
    ]
  },
  {
    id: 'budget',
    question: 'What\'s your monthly supplement budget?',
    subtext: 'We\'ll prioritize the best value for your budget',
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
  
  // Score each supplement
  Object.values(supplements).forEach(supp => {
    let score = 0;
    let reasons = [];
    
    // Goal matching (highest weight)
    if (supp.goals.includes(goal)) {
      score += 30;
      reasons.push(`Directly supports your ${goal.replace(/([A-Z])/g, ' $1').toLowerCase()} goal`);
    }
    
    // Experience level matching
    if (supp.experience.includes(experience)) {
      score += 15;
    } else {
      score -= 20; // Penalize mismatched experience
    }
    
    // Diet constraint matching
    if (diet === 'vegan' && !supp.constraints.includes('vegan')) {
      score -= 100; // Exclude non-vegan
    }
    if (diet === 'dairyFree' && supp.id === 'wheyProtein') {
      score -= 100; // Exclude whey for dairy-free
    }
    
    // Stimulant preference
    if ((stimulant === 'avoid' || stimulant === 'sensitive') && supp.stimulant) {
      score -= 100; // Exclude stimulants
    }
    if (stimulant === 'love' && supp.stimulant) {
      score += 10;
      reasons.push('Contains the stimulants you prefer');
    }
    
    // Budget matching
    if (budget === 'minimal' && supp.priceRange === 'budget') {
      score += 10;
      reasons.push('Budget-friendly option');
    }
    if (budget === 'minimal' && supp.priceRange === 'premium') {
      score -= 15;
    }
    
    // Training frequency bonuses
    if (frequency === '5-6' || frequency === '7+') {
      if (supp.id === 'electrolytes' || supp.id === 'omega3' || supp.id === 'magnesium') {
        score += 10;
        reasons.push('Helps support high training volume');
      }
    }
    
    // Foundational supplements for beginners
    if (experience === 'beginner') {
      if (['creatine', 'wheyProtein', 'vitaminD', 'plantProtein'].includes(supp.id)) {
        score += 5;
        reasons.push('Great foundational supplement');
      }
    }
    
    // Add default reason if none specific
    if (reasons.length === 0 && score > 0) {
      reasons.push('Complements your training approach');
    }
    
    recommended.push({ ...supp, score, reasons });
  });
  
  // Sort by score and return top 4
  return recommended
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

// ============================================
// COMPONENTS
// ============================================

// Navigation
function Navigation({ currentPage, setCurrentPage }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'quiz', label: 'Take the Quiz' },
    { id: 'directory', label: 'Browse Supplements' },
    { id: 'about', label: 'About' }
  ];
  
  return (
    <nav className="nav">
      <div className="nav-container">
        <button className="nav-logo" onClick={() => setCurrentPage('home')}>
          <span className="logo-icon">🎯</span>
          <span className="logo-text">get<span className="logo-accent">jakt</span></span>
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

// Hero Section
function Hero({ setCurrentPage }) {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-shape hero-shape-1"></div>
        <div className="hero-shape hero-shape-2"></div>
        <div className="hero-shape hero-shape-3"></div>
      </div>
      <div className="hero-content">
        <span className="hero-tag">Supplement Finder</span>
        <h1 className="hero-title">
          Stop guessing.<br />
          <span className="hero-accent">Start hunting.</span>
        </h1>
        <p className="hero-subtitle">
          Get matched with supplements that actually fit your training—based on your goals, 
          experience, and constraints. No hype. No BS. Just what works for you.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary btn-lg" onClick={() => setCurrentPage('quiz')}>
            <span>Start the Hunt</span>
            <span className="btn-arrow">→</span>
          </button>
          <button className="btn btn-secondary btn-lg" onClick={() => setCurrentPage('directory')}>
            Browse All Supplements
          </button>
        </div>
        <div className="hero-trust">
          <span className="trust-item">✓ No medical claims</span>
          <span className="trust-item">✓ Transparent recommendations</span>
          <span className="trust-item">✓ Research-backed info</span>
        </div>
      </div>
    </section>
  );
}

// How It Works
function HowItWorks({ setCurrentPage }) {
  const steps = [
    { num: '01', title: 'Take the Quiz', desc: 'Answer 6 quick questions about your training, goals, and preferences.', icon: '📋' },
    { num: '02', title: 'Get Your Stack', desc: 'Receive 2-4 personalized supplement recommendations with clear explanations.', icon: '🎯' },
    { num: '03', title: 'Make Informed Choices', desc: 'Review details, compare options, and decide what\'s right for you.', icon: '✅' }
  ];
  
  return (
    <section className="how-it-works">
      <div className="section-container">
        <span className="section-tag">How It Works</span>
        <h2 className="section-title">Your personalized hunt in 3 steps</h2>
        <div className="steps-grid">
          {steps.map((step, i) => (
            <div key={i} className="step-card">
              <span className="step-icon">{step.icon}</span>
              <span className="step-num">{step.num}</span>
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

// Trust Section
function TrustSection() {
  const points = [
    { title: 'No Medical Claims', desc: 'We provide educational information only. Always consult a healthcare professional.', icon: '🏥' },
    { title: 'Transparent Affiliates', desc: 'We earn commissions on purchases. This doesn\'t affect our recommendations.', icon: '🤝' },
    { title: 'Research-Based', desc: 'Our information comes from peer-reviewed research and established guidelines.', icon: '📚' },
    { title: 'Goal-Focused', desc: 'We recommend based on your specific needs, not what pays us the most.', icon: '🎯' }
  ];
  
  return (
    <section className="trust-section">
      <div className="section-container">
        <span className="section-tag">Our Approach</span>
        <h2 className="section-title">Why trust Jakt?</h2>
        <p className="section-subtitle">
          The supplement industry is full of hype and misinformation. We're different.
        </p>
        <div className="trust-grid">
          {points.map((point, i) => (
            <div key={i} className="trust-card">
              <span className="trust-icon">{point.icon}</span>
              <h3 className="trust-title">{point.title}</h3>
              <p className="trust-desc">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Featured Supplements
function FeaturedSupplements({ setCurrentPage, setSelectedSupplement }) {
  const featured = ['creatine', 'wheyProtein', 'caffeine', 'omega3'];
  
  return (
    <section className="featured-section">
      <div className="section-container">
        <span className="section-tag">Popular Picks</span>
        <h2 className="section-title">Most recommended supplements</h2>
        <div className="featured-grid">
          {featured.map(id => {
            const supp = supplements[id];
            return (
              <button 
                key={id} 
                className="featured-card"
                onClick={() => { setSelectedSupplement(supp); setCurrentPage('supplement'); }}
              >
                <span className="featured-icon">{supp.image}</span>
                <div className="featured-content">
                  <span className="featured-category">{supp.category}</span>
                  <h3 className="featured-name">{supp.name}</h3>
                  <p className="featured-desc">{supp.shortDesc}</p>
                </div>
                <span className="featured-arrow">→</span>
              </button>
            );
          })}
        </div>
        <div className="section-cta">
          <button className="btn btn-secondary" onClick={() => setCurrentPage('directory')}>
            View All Supplements →
          </button>
        </div>
      </div>
    </section>
  );
}

// Disclaimer Banner
function DisclaimerBanner() {
  return (
    <div className="disclaimer-banner">
      <div className="disclaimer-content">
        <span className="disclaimer-icon">ℹ️</span>
        <p>
          <strong>Not medical advice.</strong> This site provides general information about dietary supplements 
          for educational purposes only. Always consult a qualified healthcare provider before starting any 
          supplement regimen.
        </p>
      </div>
    </div>
  );
}

// Quiz Component
function Quiz({ setCurrentPage, setQuizResults }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animating, setAnimating] = useState(false);
  
  const currentQuestion = quizQuestions[step];
  const progress = ((step) / quizQuestions.length) * 100;
  
  const handleSelect = (value) => {
    if (animating) return;
    
    setAnimating(true);
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    
    setTimeout(() => {
      if (step < quizQuestions.length - 1) {
        setStep(step + 1);
      } else {
        // Calculate results
        const recommendations = getRecommendations(newAnswers);
        setQuizResults({ answers: newAnswers, recommendations });
        setCurrentPage('results');
      }
      setAnimating(false);
    }, 300);
  };
  
  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };
  
  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-header">
          <div className="quiz-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="progress-text">Question {step + 1} of {quizQuestions.length}</span>
          </div>
          {step > 0 && (
            <button className="quiz-back" onClick={handleBack}>← Back</button>
          )}
        </div>
        
        <div className={`quiz-question ${animating ? 'fade-out' : 'fade-in'}`}>
          <h2 className="question-title">{currentQuestion.question}</h2>
          <p className="question-subtext">{currentQuestion.subtext}</p>
          
          <div className="options-grid">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                className={`option-card ${answers[currentQuestion.id] === option.value ? 'selected' : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                <span className="option-icon">{option.icon}</span>
                <span className="option-label">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Results Page
function Results({ quizResults, setCurrentPage, setSelectedSupplement }) {
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  if (!quizResults) {
    return (
      <div className="results-page">
        <div className="results-container">
          <h2>No results yet</h2>
          <button className="btn btn-primary" onClick={() => setCurrentPage('quiz')}>
            Take the Quiz
          </button>
        </div>
      </div>
    );
  }
  
  const { recommendations } = quizResults;
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };
  
  return (
    <div className="results-page">
      <div className="results-container">
        <div className="results-header">
          <span className="results-tag">Your Results</span>
          <h1 className="results-title">Here's your personalized stack</h1>
          <p className="results-subtitle">
            Based on your answers, these are the supplements most likely to support your goals. 
            Remember: supplements work best alongside proper nutrition and training.
          </p>
        </div>
        
        <div className="results-grid">
          {recommendations.map((supp, i) => (
            <div key={supp.id} className="result-card">
              <div className="result-rank">#{i + 1}</div>
              <div className="result-header">
                <span className="result-icon">{supp.image}</span>
                <div>
                  <span className="result-category">{supp.category}</span>
                  <h3 className="result-name">{supp.name}</h3>
                </div>
              </div>
              <p className="result-desc">{supp.shortDesc}</p>
              <div className="result-reasons">
                <span className="reasons-label">Why we recommend this:</span>
                <ul className="reasons-list">
                  {supp.reasons.map((reason, j) => (
                    <li key={j}>{reason}</li>
                  ))}
                </ul>
              </div>
              <div className="result-actions">
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => { setSelectedSupplement(supp); setCurrentPage('supplement'); }}
                >
                  Learn More
                </button>
                <a href={supp.affiliateUrl} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
                  Shop Now →
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {!showEmail && !subscribed && (
          <div className="email-prompt">
            <h3>Want to save your results?</h3>
            <p>Get your recommendations sent to your inbox, plus occasional tips on getting the most from your supplements.</p>
            <button className="btn btn-primary" onClick={() => setShowEmail(true)}>
              Save My Results
            </button>
          </div>
        )}
        
        {showEmail && !subscribed && (
          <form className="email-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Send Results</button>
          </form>
        )}
        
        {subscribed && (
          <div className="email-success">
            <span>✓</span> Results saved! Check your inbox.
          </div>
        )}
        
        <div className="results-cta">
          <button className="btn btn-secondary" onClick={() => setCurrentPage('quiz')}>
            Retake Quiz
          </button>
          <button className="btn btn-secondary" onClick={() => setCurrentPage('directory')}>
            Browse All Supplements
          </button>
        </div>
        
        <div className="results-disclaimer">
          <p>
            <strong>Disclaimer:</strong> These recommendations are for educational purposes only and do not 
            constitute medical advice. Individual results may vary. Consult with a healthcare professional 
            before starting any supplement regimen, especially if you have existing health conditions or 
            take medications.
          </p>
        </div>
      </div>
    </div>
  );
}

// Directory Page
function Directory({ setCurrentPage, setSelectedSupplement }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filterType, setFilterType] = useState('goal');
  
  const filters = {
    goal: [
      { value: 'all', label: 'All' },
      { value: 'muscle', label: 'Build Muscle' },
      { value: 'fatLoss', label: 'Fat Loss' },
      { value: 'endurance', label: 'Endurance' },
      { value: 'recovery', label: 'Recovery' },
      { value: 'health', label: 'General Health' }
    ],
    constraint: [
      { value: 'all', label: 'All' },
      { value: 'vegan', label: 'Vegan-Friendly' },
      { value: 'stimulant-free', label: 'Stimulant-Free' },
      { value: 'budget', label: 'Budget-Friendly' }
    ],
    experience: [
      { value: 'all', label: 'All Levels' },
      { value: 'beginner', label: 'Beginner' },
      { value: 'intermediate', label: 'Intermediate' },
      { value: 'advanced', label: 'Advanced' }
    ]
  };
  
  const filteredSupplements = Object.values(supplements).filter(supp => {
    if (activeFilter === 'all') return true;
    if (filterType === 'goal') return supp.goals.includes(activeFilter);
    if (filterType === 'constraint') return supp.constraints.includes(activeFilter) || (activeFilter === 'stimulant-free' && !supp.stimulant);
    if (filterType === 'experience') return supp.experience.includes(activeFilter);
    return true;
  });
  
  return (
    <div className="directory-page">
      <div className="directory-container">
        <div className="directory-header">
          <span className="section-tag">Supplement Directory</span>
          <h1 className="directory-title">Browse all supplements</h1>
          <p className="directory-subtitle">
            Filter by your goals, dietary needs, or experience level to find what fits.
          </p>
        </div>
        
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filterType === 'goal' ? 'active' : ''}`}
            onClick={() => { setFilterType('goal'); setActiveFilter('all'); }}
          >
            By Goal
          </button>
          <button 
            className={`filter-tab ${filterType === 'constraint' ? 'active' : ''}`}
            onClick={() => { setFilterType('constraint'); setActiveFilter('all'); }}
          >
            By Constraint
          </button>
          <button 
            className={`filter-tab ${filterType === 'experience' ? 'active' : ''}`}
            onClick={() => { setFilterType('experience'); setActiveFilter('all'); }}
          >
            By Experience
          </button>
        </div>
        
        <div className="filter-options">
          {filters[filterType].map(filter => (
            <button
              key={filter.value}
              className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="directory-grid">
          {filteredSupplements.map(supp => (
            <button 
              key={supp.id}
              className="directory-card"
              onClick={() => { setSelectedSupplement(supp); setCurrentPage('supplement'); }}
            >
              <span className="directory-icon">{supp.image}</span>
              <span className="directory-category">{supp.category}</span>
              <h3 className="directory-name">{supp.name}</h3>
              <p className="directory-desc">{supp.shortDesc}</p>
              <div className="directory-tags">
                {supp.constraints.slice(0, 2).map(c => (
                  <span key={c} className="directory-tag">{c}</span>
                ))}
                {!supp.stimulant && <span className="directory-tag">stimulant-free</span>}
              </div>
              <span className="directory-link">Learn more →</span>
            </button>
          ))}
        </div>
        
        {filteredSupplements.length === 0 && (
          <div className="no-results">
            <p>No supplements match this filter. Try a different selection.</p>
          </div>
        )}
        
        <div className="directory-cta">
          <p>Not sure what you need?</p>
          <button className="btn btn-primary" onClick={() => setCurrentPage('quiz')}>
            Take the Quiz →
          </button>
        </div>
      </div>
    </div>
  );
}

// Supplement Detail Page
function SupplementDetail({ supplement, setCurrentPage, setSelectedSupplement }) {
  if (!supplement) {
    return (
      <div className="supplement-page">
        <div className="supplement-container">
          <h2>Supplement not found</h2>
          <button className="btn btn-primary" onClick={() => setCurrentPage('directory')}>
            Browse All Supplements
          </button>
        </div>
      </div>
    );
  }
  
  const alternatives = supplement.alternatives.map(alt => {
    const found = Object.values(supplements).find(s => 
      s.name.toLowerCase().includes(alt.toLowerCase().split(' ')[0])
    );
    return found || null;
  }).filter(Boolean);
  
  return (
    <div className="supplement-page">
      <div className="supplement-container">
        <button className="back-link" onClick={() => setCurrentPage('directory')}>
          ← Back to Directory
        </button>
        
        <div className="supplement-hero">
          <span className="supplement-icon-lg">{supplement.image}</span>
          <div className="supplement-intro">
            <span className="supplement-category">{supplement.category}</span>
            <h1 className="supplement-title">{supplement.name}</h1>
            <p className="supplement-short">{supplement.shortDesc}</p>
            <div className="supplement-meta">
              {supplement.constraints.map(c => (
                <span key={c} className="meta-tag">{c}</span>
              ))}
              {!supplement.stimulant && <span className="meta-tag">stimulant-free</span>}
              <span className="meta-tag">{supplement.priceRange} price</span>
            </div>
          </div>
        </div>
        
        <div className="supplement-content">
          <section className="content-section">
            <h2>What is it?</h2>
            <p>{supplement.longDesc}</p>
          </section>
          
          <section className="content-section">
            <h2>Who it's for</h2>
            <ul className="who-list who-for">
              {supplement.whoFor.map((item, i) => (
                <li key={i}><span className="who-icon">✓</span>{item}</li>
              ))}
            </ul>
          </section>
          
          <section className="content-section">
            <h2>Who it's NOT for</h2>
            <ul className="who-list who-not">
              {supplement.whoNotFor.map((item, i) => (
                <li key={i}><span className="who-icon">✗</span>{item}</li>
              ))}
            </ul>
          </section>
          
          <section className="content-section">
            <h2>Key Ingredients</h2>
            <div className="ingredients-list">
              {supplement.ingredients.map((ing, i) => (
                <div key={i} className="ingredient-card">
                  <div className="ingredient-header">
                    <span className="ingredient-name">{ing.name}</span>
                    <span className="ingredient-amount">{ing.amount}</span>
                  </div>
                  <p className="ingredient-purpose">{ing.purpose}</p>
                </div>
              ))}
            </div>
          </section>
          
          <section className="content-section">
            <h2>Pros & Cons</h2>
            <div className="pros-cons">
              <div className="pros">
                <h3>Pros</h3>
                <ul>
                  {supplement.pros.map((pro, i) => (
                    <li key={i}><span>✓</span>{pro}</li>
                  ))}
                </ul>
              </div>
              <div className="cons">
                <h3>Cons</h3>
                <ul>
                  {supplement.cons.map((con, i) => (
                    <li key={i}><span>✗</span>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          
          <section className="content-section">
            <h2>Alternatives to Consider</h2>
            <ul className="alternatives-list">
              {supplement.alternatives.map((alt, i) => (
                <li key={i}>{alt}</li>
              ))}
            </ul>
            {alternatives.length > 0 && (
              <div className="alt-links">
                {alternatives.map(alt => (
                  <button 
                    key={alt.id}
                    className="btn btn-secondary btn-sm"
                    onClick={() => { setSelectedSupplement(alt); window.scrollTo(0, 0); }}
                  >
                    View {alt.name} →
                  </button>
                ))}
              </div>
            )}
          </section>
          
          <div className="supplement-cta">
            <a href={supplement.affiliateUrl} className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
              Shop {supplement.name} →
            </a>
            <p className="affiliate-note">
              We may earn a commission if you purchase through this link. This doesn't affect our recommendations.
            </p>
          </div>
          
          <div className="supplement-disclaimer">
            <h3>Important Disclaimer</h3>
            <p>
              This information is for educational purposes only and is not intended as medical advice. 
              Supplements are not intended to diagnose, treat, cure, or prevent any disease. 
              Always consult with a qualified healthcare provider before starting any supplement, 
              especially if you have existing health conditions, take medications, or are pregnant or nursing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// About Page
function About({ setCurrentPage }) {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <span className="section-tag">About Jakt</span>
          <h1 className="about-title">Helping you find what actually works</h1>
        </div>
        
        <div className="about-content">
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              The supplement industry is overwhelming. Thousands of products, conflicting claims, 
              aggressive marketing, and very little clarity. We built Jakt to cut through the noise.
            </p>
            <p>
              "Jakt" means "hunt" — and that's exactly what we help you do. Instead of guessing 
              what might work or falling for hype, you get matched with supplements based on your 
              specific goals, experience, and constraints.
            </p>
          </section>
          
          <section className="about-section">
            <h2>Our Approach</h2>
            <div className="approach-grid">
              <div className="approach-item">
                <h3>🎯 Goal-Focused</h3>
                <p>We recommend based on what you're trying to achieve, not what's trending.</p>
              </div>
              <div className="approach-item">
                <h3>📚 Research-Based</h3>
                <p>Our information draws from peer-reviewed studies and established guidelines.</p>
              </div>
              <div className="approach-item">
                <h3>🚫 No Medical Claims</h3>
                <p>We never claim supplements can treat, cure, or prevent any disease.</p>
              </div>
              <div className="approach-item">
                <h3>💬 Plain Language</h3>
                <p>No jargon, no hype — just clear information you can actually use.</p>
              </div>
            </div>
          </section>
          
          <section className="about-section">
            <h2>Affiliate Disclosure</h2>
            <p>
              <strong>We earn commissions.</strong> When you click our links and make a purchase, 
              we may receive a small commission from the retailer. This is how we keep the site running.
            </p>
            <p>
              <strong>This doesn't affect our recommendations.</strong> We recommend supplements 
              based on their fit for your goals and the available research — not based on which 
              products pay us the highest commission.
            </p>
            <p>
              We believe in transparency. If you ever have questions about how we make recommendations 
              or generate revenue, we're happy to explain.
            </p>
          </section>
          
          <section className="about-section">
            <h2>What We're Not</h2>
            <ul className="not-list">
              <li>We are <strong>not doctors</strong> and do not provide medical advice</li>
              <li>We are <strong>not a replacement</strong> for professional healthcare</li>
              <li>We do <strong>not guarantee results</strong> from any supplement</li>
              <li>We are <strong>not affiliated</strong> with any single supplement brand</li>
            </ul>
          </section>
        </div>
        
        <div className="about-cta">
          <h2>Ready to find your supplements?</h2>
          <button className="btn btn-primary btn-lg" onClick={() => setCurrentPage('quiz')}>
            Start the Hunt →
          </button>
        </div>
      </div>
    </div>
  );
}

// Legal Pages
function Legal({ type }) {
  const content = {
    disclaimer: {
      title: 'Medical Disclaimer',
      content: `
        <h2>Not Medical Advice</h2>
        <p>The information provided on get-jakt.com is for general educational and informational purposes only. It is not intended to be, and should not be construed as, medical advice, diagnosis, or treatment recommendations.</p>
        
        <h2>No Doctor-Patient Relationship</h2>
        <p>Use of this website does not create a doctor-patient or healthcare provider relationship. The content on this site is not a substitute for professional medical advice, diagnosis, or treatment.</p>
        
        <h2>Consult Healthcare Providers</h2>
        <p>Always seek the advice of your physician or other qualified healthcare provider before starting any new supplement, diet, or fitness program. Never disregard professional medical advice or delay seeking it because of something you have read on this website.</p>
        
        <h2>Supplement Limitations</h2>
        <p>Dietary supplements are not intended to diagnose, treat, cure, or prevent any disease. The FDA has not evaluated any statements made on this website. Individual results may vary.</p>
        
        <h2>At Your Own Risk</h2>
        <p>Any action you take based on information from this website is strictly at your own risk. We are not liable for any damages or negative consequences resulting from the use of information provided here.</p>
      `
    },
    privacy: {
      title: 'Privacy Policy',
      content: `
        <h2>Information We Collect</h2>
        <p>We collect information you provide directly, such as when you take our quiz or subscribe to our email list. This may include your email address and quiz responses.</p>
        
        <h2>How We Use Information</h2>
        <p>We use collected information to provide personalized supplement recommendations, send requested emails, and improve our services.</p>
        
        <h2>Cookies and Analytics</h2>
        <p>We use cookies and similar technologies to analyze site traffic and usage patterns. You can control cookie settings through your browser.</p>
        
        <h2>Third-Party Links</h2>
        <p>Our site contains affiliate links to third-party retailers. These sites have their own privacy policies, which we encourage you to review.</p>
        
        <h2>Data Security</h2>
        <p>We implement reasonable security measures to protect your information. However, no internet transmission is completely secure.</p>
        
        <h2>Your Rights</h2>
        <p>You may request access to, correction of, or deletion of your personal information by contacting us.</p>
        
        <h2>Updates</h2>
        <p>We may update this policy periodically. Continued use of the site constitutes acceptance of changes.</p>
      `
    },
    affiliate: {
      title: 'Affiliate Disclosure',
      content: `
        <h2>Affiliate Relationships</h2>
        <p>Get-jakt.com participates in affiliate marketing programs. This means we may earn commissions when you click links on our site and make purchases from our partner retailers.</p>
        
        <h2>How It Works</h2>
        <p>When you click an affiliate link and make a purchase, the retailer pays us a small percentage of the sale. This comes at no additional cost to you — the price you pay is the same whether you use our link or not.</p>
        
        <h2>Our Commitment</h2>
        <p>Affiliate relationships do not influence our recommendations. We recommend supplements based on their fit for specific goals, the available research, and user constraints — not based on commission rates.</p>
        
        <h2>Transparency</h2>
        <p>We believe in full transparency about our business model. If you have questions about our affiliate relationships, please contact us.</p>
      `
    },
    terms: {
      title: 'Terms of Service',
      content: `
        <h2>Acceptance of Terms</h2>
        <p>By accessing and using get-jakt.com, you agree to these terms. If you disagree, please do not use the site.</p>
        
        <h2>Use of Site</h2>
        <p>You may use this site for personal, non-commercial purposes. You may not copy, reproduce, or redistribute site content without permission.</p>
        
        <h2>Disclaimer of Warranties</h2>
        <p>This site is provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or usefulness of any information.</p>
        
        <h2>Limitation of Liability</h2>
        <p>We are not liable for any damages arising from your use of this site or reliance on its content.</p>
        
        <h2>External Links</h2>
        <p>We are not responsible for the content or practices of third-party websites linked from this site.</p>
        
        <h2>Changes to Terms</h2>
        <p>We may modify these terms at any time. Continued use constitutes acceptance of changes.</p>
        
        <h2>Governing Law</h2>
        <p>These terms are governed by applicable law. Any disputes will be resolved in the appropriate jurisdiction.</p>
      `
    }
  };
  
  const page = content[type] || content.disclaimer;
  
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1 className="legal-title">{page.title}</h1>
        <div className="legal-content" dangerouslySetInnerHTML={{ __html: page.content }} />
        <p className="legal-updated">Last updated: January 2025</p>
      </div>
    </div>
  );
}

// Footer
function Footer({ setCurrentPage, setLegalType }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <span className="footer-logo">🎯 get<span>jakt</span></span>
            <p>Stop guessing. Start hunting.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Navigate</h4>
              <button onClick={() => setCurrentPage('home')}>Home</button>
              <button onClick={() => setCurrentPage('quiz')}>Take the Quiz</button>
              <button onClick={() => setCurrentPage('directory')}>Browse Supplements</button>
              <button onClick={() => setCurrentPage('about')}>About</button>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <button onClick={() => { setLegalType('disclaimer'); setCurrentPage('legal'); }}>Medical Disclaimer</button>
              <button onClick={() => { setLegalType('privacy'); setCurrentPage('legal'); }}>Privacy Policy</button>
              <button onClick={() => { setLegalType('affiliate'); setCurrentPage('legal'); }}>Affiliate Disclosure</button>
              <button onClick={() => { setLegalType('terms'); setCurrentPage('legal'); }}>Terms of Service</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 get-jakt.com. All rights reserved.</p>
          <p className="footer-disclaimer">
            This site provides general information about dietary supplements for educational purposes only. 
            Not medical advice. Always consult a healthcare provider before starting any supplement regimen.
          </p>
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
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&display=swap');
        
        :root {
          --forest: #1a3a2f;
          --forest-light: #2d5a47;
          --sage: #6b8f71;
          --sand: #e8dfd0;
          --sand-light: #f5f1ea;
          --cream: #faf8f5;
          --stone: #4a4a48;
          --stone-light: #6b6b69;
          --white: #ffffff;
          --accent: #c17f59;
          --accent-light: #d4a07a;
          --shadow: rgba(26, 58, 47, 0.08);
          --shadow-md: rgba(26, 58, 47, 0.12);
          
          --font-display: 'Fraunces', Georgia, serif;
          --font-body: 'DM Sans', system-ui, sans-serif;
          
          --space-xs: 0.5rem;
          --space-sm: 0.75rem;
          --space-md: 1rem;
          --space-lg: 1.5rem;
          --space-xl: 2rem;
          --space-2xl: 3rem;
          --space-3xl: 4rem;
          --space-4xl: 6rem;
          
          --radius-sm: 6px;
          --radius-md: 10px;
          --radius-lg: 16px;
          --radius-xl: 24px;
          
          --transition: 0.2s ease;
        }
        
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.6;
          color: var(--stone);
          background: var(--cream);
          -webkit-font-smoothing: antialiased;
        }
        
        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        /* ===== NAVIGATION ===== */
        .nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--cream);
          border-bottom: 1px solid var(--sand);
          backdrop-filter: blur(10px);
        }
        
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-md) var(--space-lg);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .nav-logo {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--forest);
        }
        
        .logo-icon {
          font-size: 1.75rem;
        }
        
        .logo-accent {
          color: var(--accent);
        }
        
        .nav-links {
          display: flex;
          gap: var(--space-md);
        }
        
        .nav-link {
          background: none;
          border: none;
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--stone-light);
          cursor: pointer;
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-sm);
          transition: var(--transition);
        }
        
        .nav-link:hover, .nav-link.active {
          color: var(--forest);
          background: var(--sand-light);
        }
        
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--forest);
        }
        
        @media (max-width: 768px) {
          .mobile-toggle {
            display: block;
          }
          
          .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            flex-direction: column;
            background: var(--cream);
            border-bottom: 1px solid var(--sand);
            padding: var(--space-md);
            display: none;
          }
          
          .nav-links.open {
            display: flex;
          }
          
          .nav-link {
            padding: var(--space-md);
            text-align: left;
          }
        }
        
        /* ===== HERO ===== */
        .hero {
          position: relative;
          padding: var(--space-4xl) var(--space-lg);
          background: linear-gradient(135deg, var(--forest) 0%, var(--forest-light) 100%);
          color: var(--white);
          overflow: hidden;
        }
        
        .hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        
        .hero-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
        }
        
        .hero-shape-1 {
          width: 600px;
          height: 600px;
          background: var(--sage);
          top: -200px;
          right: -100px;
        }
        
        .hero-shape-2 {
          width: 400px;
          height: 400px;
          background: var(--accent);
          bottom: -150px;
          left: -100px;
        }
        
        .hero-shape-3 {
          width: 200px;
          height: 200px;
          background: var(--sand);
          top: 50%;
          left: 30%;
        }
        
        .hero-content {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        
        .hero-tag {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--sand);
          margin-bottom: var(--space-lg);
        }
        
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: var(--space-lg);
        }
        
        .hero-accent {
          color: var(--accent-light);
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--sand);
          max-width: 600px;
          margin: 0 auto var(--space-xl);
          line-height: 1.7;
        }
        
        .hero-cta {
          display: flex;
          gap: var(--space-md);
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: var(--space-xl);
        }
        
        .hero-trust {
          display: flex;
          gap: var(--space-lg);
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .trust-item {
          font-size: 0.9rem;
          color: var(--sand);
          opacity: 0.9;
        }
        
        /* ===== BUTTONS ===== */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 600;
          padding: var(--space-md) var(--space-xl);
          border-radius: var(--radius-md);
          border: none;
          cursor: pointer;
          transition: all var(--transition);
          text-decoration: none;
        }
        
        .btn-primary {
          background: var(--accent);
          color: var(--white);
        }
        
        .btn-primary:hover {
          background: var(--accent-light);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px var(--shadow-md);
        }
        
        .btn-secondary {
          background: var(--white);
          color: var(--forest);
          border: 2px solid var(--sand);
        }
        
        .btn-secondary:hover {
          border-color: var(--forest);
          background: var(--sand-light);
        }
        
        .btn-lg {
          padding: var(--space-lg) var(--space-2xl);
          font-size: 1.1rem;
        }
        
        .btn-sm {
          padding: var(--space-sm) var(--space-md);
          font-size: 0.9rem;
        }
        
        .btn-arrow {
          transition: transform var(--transition);
        }
        
        .btn:hover .btn-arrow {
          transform: translateX(4px);
        }
        
        /* ===== SECTIONS ===== */
        .section-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-4xl) var(--space-lg);
        }
        
        .section-tag {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--sage);
          margin-bottom: var(--space-md);
          text-align: center;
        }
        
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700;
          color: var(--forest);
          text-align: center;
          margin-bottom: var(--space-lg);
        }
        
        .section-subtitle {
          font-size: 1.1rem;
          color: var(--stone-light);
          text-align: center;
          max-width: 600px;
          margin: 0 auto var(--space-2xl);
        }
        
        .section-cta {
          text-align: center;
          margin-top: var(--space-2xl);
        }
        
        /* ===== HOW IT WORKS ===== */
        .how-it-works {
          background: var(--sand-light);
        }
        
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-xl);
        }
        
        .step-card {
          background: var(--white);
          padding: var(--space-2xl);
          border-radius: var(--radius-lg);
          text-align: center;
          position: relative;
          box-shadow: 0 4px 20px var(--shadow);
        }
        
        .step-icon {
          font-size: 2.5rem;
          margin-bottom: var(--space-md);
          display: block;
        }
        
        .step-num {
          position: absolute;
          top: var(--space-lg);
          right: var(--space-lg);
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          color: var(--sand);
        }
        
        .step-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--forest);
          margin-bottom: var(--space-sm);
        }
        
        .step-desc {
          color: var(--stone-light);
          font-size: 0.95rem;
        }
        
        /* ===== TRUST SECTION ===== */
        .trust-section {
          background: var(--cream);
        }
        
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-lg);
        }
        
        .trust-card {
          padding: var(--space-xl);
          border: 1px solid var(--sand);
          border-radius: var(--radius-lg);
          text-align: center;
          transition: var(--transition);
        }
        
        .trust-card:hover {
          border-color: var(--sage);
          background: var(--sand-light);
        }
        
        .trust-icon {
          font-size: 2rem;
          margin-bottom: var(--space-md);
          display: block;
        }
        
        .trust-title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--forest);
          margin-bottom: var(--space-sm);
        }
        
        .trust-desc {
          font-size: 0.9rem;
          color: var(--stone-light);
        }
        
        /* ===== FEATURED ===== */
        .featured-section {
          background: var(--white);
        }
        
        .featured-grid {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        
        .featured-card {
          display: flex;
          align-items: center;
          gap: var(--space-lg);
          padding: var(--space-lg);
          background: var(--cream);
          border: 1px solid var(--sand);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: var(--transition);
          text-align: left;
          width: 100%;
        }
        
        .featured-card:hover {
          border-color: var(--forest);
          transform: translateX(4px);
        }
        
        .featured-icon {
          font-size: 2.5rem;
          flex-shrink: 0;
        }
        
        .featured-content {
          flex: 1;
        }
        
        .featured-category {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--sage);
        }
        
        .featured-name {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--forest);
          margin: var(--space-xs) 0;
        }
        
        .featured-desc {
          font-size: 0.9rem;
          color: var(--stone-light);
        }
        
        .featured-arrow {
          font-size: 1.25rem;
          color: var(--sage);
          transition: var(--transition);
        }
        
        .featured-card:hover .featured-arrow {
          color: var(--forest);
          transform: translateX(4px);
        }
        
        /* ===== DISCLAIMER BANNER ===== */
        .disclaimer-banner {
          background: var(--sand);
          padding: var(--space-lg);
        }
        
        .disclaimer-content {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          align-items: flex-start;
          gap: var(--space-md);
        }
        
        .disclaimer-icon {
          font-size: 1.25rem;
          flex-shrink: 0;
        }
        
        .disclaimer-content p {
          font-size: 0.85rem;
          color: var(--stone);
          margin: 0;
        }
        
        /* ===== QUIZ ===== */
        .quiz-page {
          min-height: calc(100vh - 80px);
          background: linear-gradient(135deg, var(--forest) 0%, var(--forest-light) 100%);
          padding: var(--space-2xl) var(--space-lg);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .quiz-container {
          max-width: 700px;
          width: 100%;
        }
        
        .quiz-header {
          margin-bottom: var(--space-2xl);
        }
        
        .quiz-progress {
          margin-bottom: var(--space-md);
        }
        
        .progress-bar {
          height: 6px;
          background: rgba(255,255,255,0.2);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: var(--space-sm);
        }
        
        .progress-fill {
          height: 100%;
          background: var(--accent);
          border-radius: 3px;
          transition: width 0.3s ease;
        }
        
        .progress-text {
          font-size: 0.85rem;
          color: var(--sand);
        }
        
        .quiz-back {
          background: none;
          border: none;
          color: var(--sand);
          font-size: 0.9rem;
          cursor: pointer;
          padding: var(--space-sm) 0;
        }
        
        .quiz-back:hover {
          color: var(--white);
        }
        
        .quiz-question {
          text-align: center;
        }
        
        .quiz-question.fade-in {
          animation: fadeIn 0.3s ease;
        }
        
        .quiz-question.fade-out {
          animation: fadeOut 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }
        
        .question-title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 700;
          color: var(--white);
          margin-bottom: var(--space-sm);
        }
        
        .question-subtext {
          color: var(--sand);
          margin-bottom: var(--space-2xl);
        }
        
        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-md);
        }
        
        .option-card {
          background: var(--white);
          border: 2px solid transparent;
          border-radius: var(--radius-lg);
          padding: var(--space-xl);
          cursor: pointer;
          transition: var(--transition);
          text-align: center;
        }
        
        .option-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        
        .option-card.selected {
          border-color: var(--accent);
          background: var(--sand-light);
        }
        
        .option-icon {
          font-size: 2rem;
          display: block;
          margin-bottom: var(--space-sm);
        }
        
        .option-label {
          font-weight: 600;
          color: var(--forest);
        }
        
        /* ===== RESULTS ===== */
        .results-page {
          background: var(--sand-light);
          min-height: calc(100vh - 80px);
          padding: var(--space-3xl) var(--space-lg);
        }
        
        .results-container {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .results-header {
          text-align: center;
          margin-bottom: var(--space-3xl);
        }
        
        .results-tag {
          display: inline-block;
          background: var(--forest);
          color: var(--white);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: var(--space-xs) var(--space-md);
          border-radius: var(--radius-sm);
          margin-bottom: var(--space-md);
        }
        
        .results-title {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700;
          color: var(--forest);
          margin-bottom: var(--space-md);
        }
        
        .results-subtitle {
          color: var(--stone-light);
          max-width: 600px;
          margin: 0 auto;
        }
        
        .results-grid {
          display: grid;
          gap: var(--space-lg);
          margin-bottom: var(--space-2xl);
        }
        
        .result-card {
          background: var(--white);
          border-radius: var(--radius-lg);
          padding: var(--space-xl);
          position: relative;
          box-shadow: 0 4px 20px var(--shadow);
        }
        
        .result-rank {
          position: absolute;
          top: var(--space-md);
          right: var(--space-md);
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--sand);
        }
        
        .result-header {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-bottom: var(--space-md);
        }
        
        .result-icon {
          font-size: 2.5rem;
        }
        
        .result-category {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--sage);
        }
        
        .result-name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--forest);
        }
        
        .result-desc {
          color: var(--stone-light);
          margin-bottom: var(--space-lg);
        }
        
        .result-reasons {
          background: var(--sand-light);
          padding: var(--space-md);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-lg);
        }
        
        .reasons-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--forest);
          display: block;
          margin-bottom: var(--space-sm);
        }
        
        .reasons-list {
          list-style: none;
          font-size: 0.9rem;
          color: var(--stone);
        }
        
        .reasons-list li {
          padding: var(--space-xs) 0;
        }
        
        .reasons-list li::before {
          content: '✓ ';
          color: var(--sage);
        }
        
        .result-actions {
          display: flex;
          gap: var(--space-md);
        }
        
        .email-prompt, .email-form, .email-success {
          background: var(--white);
          padding: var(--space-xl);
          border-radius: var(--radius-lg);
          text-align: center;
          margin-bottom: var(--space-2xl);
        }
        
        .email-prompt h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          color: var(--forest);
          margin-bottom: var(--space-sm);
        }
        
        .email-prompt p {
          color: var(--stone-light);
          margin-bottom: var(--space-lg);
        }
        
        .email-form {
          display: flex;
          gap: var(--space-md);
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .email-form input {
          padding: var(--space-md) var(--space-lg);
          border: 2px solid var(--sand);
          border-radius: var(--radius-md);
          font-size: 1rem;
          min-width: 250px;
        }
        
        .email-form input:focus {
          outline: none;
          border-color: var(--forest);
        }
        
        .email-success {
          color: var(--forest);
          font-weight: 600;
        }
        
        .email-success span {
          color: var(--sage);
        }
        
        .results-cta {
          display: flex;
          gap: var(--space-md);
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: var(--space-2xl);
        }
        
        .results-disclaimer {
          background: var(--sand);
          padding: var(--space-lg);
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          color: var(--stone);
        }
        
        /* ===== DIRECTORY ===== */
        .directory-page {
          background: var(--cream);
          min-height: calc(100vh - 80px);
        }
        
        .directory-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-3xl) var(--space-lg);
        }
        
        .directory-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }
        
        .directory-title {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700;
          color: var(--forest);
          margin-bottom: var(--space-md);
        }
        
        .directory-subtitle {
          color: var(--stone-light);
        }
        
        .filter-tabs {
          display: flex;
          justify-content: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-lg);
        }
        
        .filter-tab {
          background: none;
          border: none;
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--stone-light);
          padding: var(--space-sm) var(--space-lg);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition);
        }
        
        .filter-tab.active {
          background: var(--forest);
          color: var(--white);
        }
        
        .filter-options {
          display: flex;
          justify-content: center;
          gap: var(--space-sm);
          flex-wrap: wrap;
          margin-bottom: var(--space-2xl);
        }
        
        .filter-btn {
          background: var(--white);
          border: 1px solid var(--sand);
          font-size: 0.9rem;
          color: var(--stone);
          padding: var(--space-sm) var(--space-md);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition);
        }
        
        .filter-btn:hover {
          border-color: var(--forest);
        }
        
        .filter-btn.active {
          background: var(--sand-light);
          border-color: var(--forest);
          color: var(--forest);
          font-weight: 600;
        }
        
        .directory-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-lg);
          margin-bottom: var(--space-2xl);
        }
        
        .directory-card {
          background: var(--white);
          border: 1px solid var(--sand);
          border-radius: var(--radius-lg);
          padding: var(--space-xl);
          cursor: pointer;
          transition: var(--transition);
          text-align: left;
          display: flex;
          flex-direction: column;
        }
        
        .directory-card:hover {
          border-color: var(--forest);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px var(--shadow-md);
        }
        
        .directory-icon {
          font-size: 2rem;
          margin-bottom: var(--space-md);
        }
        
        .directory-category {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--sage);
        }
        
        .directory-name {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--forest);
          margin: var(--space-xs) 0 var(--space-sm);
        }
        
        .directory-desc {
          font-size: 0.9rem;
          color: var(--stone-light);
          flex: 1;
          margin-bottom: var(--space-md);
        }
        
        .directory-tags {
          display: flex;
          gap: var(--space-xs);
          flex-wrap: wrap;
          margin-bottom: var(--space-md);
        }
        
        .directory-tag {
          font-size: 0.75rem;
          background: var(--sand-light);
          color: var(--stone);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
        }
        
        .directory-link {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--forest);
        }
        
        .no-results {
          text-align: center;
          padding: var(--space-3xl);
          color: var(--stone-light);
        }
        
        .directory-cta {
          text-align: center;
          padding: var(--space-2xl);
          background: var(--sand-light);
          border-radius: var(--radius-lg);
        }
        
        .directory-cta p {
          margin-bottom: var(--space-md);
          color: var(--stone);
        }
        
        /* ===== SUPPLEMENT DETAIL ===== */
        .supplement-page {
          background: var(--cream);
          min-height: calc(100vh - 80px);
        }
        
        .supplement-container {
          max-width: 800px;
          margin: 0 auto;
          padding: var(--space-2xl) var(--space-lg) var(--space-4xl);
        }
        
        .back-link {
          background: none;
          border: none;
          color: var(--sage);
          font-size: 0.9rem;
          cursor: pointer;
          margin-bottom: var(--space-xl);
          display: inline-block;
        }
        
        .back-link:hover {
          color: var(--forest);
        }
        
        .supplement-hero {
          display: flex;
          gap: var(--space-xl);
          align-items: flex-start;
          margin-bottom: var(--space-3xl);
          flex-wrap: wrap;
        }
        
        .supplement-icon-lg {
          font-size: 5rem;
        }
        
        .supplement-intro {
          flex: 1;
          min-width: 300px;
        }
        
        .supplement-category {
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--sage);
        }
        
        .supplement-title {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700;
          color: var(--forest);
          margin: var(--space-sm) 0 var(--space-md);
        }
        
        .supplement-short {
          font-size: 1.1rem;
          color: var(--stone-light);
          margin-bottom: var(--space-lg);
        }
        
        .supplement-meta {
          display: flex;
          gap: var(--space-sm);
          flex-wrap: wrap;
        }
        
        .meta-tag {
          font-size: 0.8rem;
          background: var(--sand-light);
          color: var(--stone);
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-sm);
        }
        
        .supplement-content {
          background: var(--white);
          border-radius: var(--radius-lg);
          padding: var(--space-2xl);
        }
        
        .content-section {
          margin-bottom: var(--space-2xl);
          padding-bottom: var(--space-2xl);
          border-bottom: 1px solid var(--sand);
        }
        
        .content-section:last-of-type {
          border-bottom: none;
          margin-bottom: 0;
        }
        
        .content-section h2 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--forest);
          margin-bottom: var(--space-md);
        }
        
        .content-section p {
          color: var(--stone);
          line-height: 1.7;
        }
        
        .who-list {
          list-style: none;
        }
        
        .who-list li {
          display: flex;
          gap: var(--space-sm);
          padding: var(--space-sm) 0;
          color: var(--stone);
        }
        
        .who-icon {
          font-weight: 700;
        }
        
        .who-for .who-icon {
          color: var(--sage);
        }
        
        .who-not .who-icon {
          color: var(--accent);
        }
        
        .ingredients-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        
        .ingredient-card {
          background: var(--sand-light);
          padding: var(--space-md);
          border-radius: var(--radius-md);
        }
        
        .ingredient-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-xs);
        }
        
        .ingredient-name {
          font-weight: 600;
          color: var(--forest);
        }
        
        .ingredient-amount {
          font-size: 0.85rem;
          color: var(--sage);
          font-weight: 600;
        }
        
        .ingredient-purpose {
          font-size: 0.9rem;
          color: var(--stone-light);
          margin: 0;
        }
        
        .pros-cons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-xl);
        }
        
        @media (max-width: 600px) {
          .pros-cons {
            grid-template-columns: 1fr;
          }
        }
        
        .pros h3, .cons h3 {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: var(--space-md);
        }
        
        .pros h3 {
          color: var(--sage);
        }
        
        .cons h3 {
          color: var(--accent);
        }
        
        .pros ul, .cons ul {
          list-style: none;
        }
        
        .pros li, .cons li {
          display: flex;
          gap: var(--space-sm);
          padding: var(--space-xs) 0;
          font-size: 0.95rem;
          color: var(--stone);
        }
        
        .pros li span {
          color: var(--sage);
        }
        
        .cons li span {
          color: var(--accent);
        }
        
        .alternatives-list {
          list-style: disc;
          padding-left: var(--space-lg);
          color: var(--stone);
        }
        
        .alternatives-list li {
          padding: var(--space-xs) 0;
        }
        
        .alt-links {
          margin-top: var(--space-lg);
          display: flex;
          gap: var(--space-sm);
          flex-wrap: wrap;
        }
        
        .supplement-cta {
          text-align: center;
          margin: var(--space-2xl) 0;
        }
        
        .affiliate-note {
          font-size: 0.85rem;
          color: var(--stone-light);
          margin-top: var(--space-md);
        }
        
        .supplement-disclaimer {
          background: var(--sand);
          padding: var(--space-lg);
          border-radius: var(--radius-md);
        }
        
        .supplement-disclaimer h3 {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          color: var(--forest);
          margin-bottom: var(--space-sm);
        }
        
        .supplement-disclaimer p {
          font-size: 0.85rem;
          color: var(--stone);
          margin: 0;
        }
        
        /* ===== ABOUT ===== */
        .about-page {
          background: var(--cream);
          min-height: calc(100vh - 80px);
        }
        
        .about-container {
          max-width: 800px;
          margin: 0 auto;
          padding: var(--space-3xl) var(--space-lg);
        }
        
        .about-header {
          text-align: center;
          margin-bottom: var(--space-3xl);
        }
        
        .about-title {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700;
          color: var(--forest);
        }
        
        .about-content {
          background: var(--white);
          padding: var(--space-2xl);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-2xl);
        }
        
        .about-section {
          margin-bottom: var(--space-2xl);
          padding-bottom: var(--space-2xl);
          border-bottom: 1px solid var(--sand);
        }
        
        .about-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        
        .about-section h2 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--forest);
          margin-bottom: var(--space-md);
        }
        
        .about-section p {
          color: var(--stone);
          line-height: 1.7;
          margin-bottom: var(--space-md);
        }
        
        .about-section p:last-child {
          margin-bottom: 0;
        }
        
        .approach-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-lg);
        }
        
        .approach-item h3 {
          font-size: 1rem;
          color: var(--forest);
          margin-bottom: var(--space-xs);
        }
        
        .approach-item p {
          font-size: 0.9rem;
          color: var(--stone-light);
          margin: 0;
        }
        
        .not-list {
          list-style: none;
        }
        
        .not-list li {
          padding: var(--space-sm) 0;
          color: var(--stone);
        }
        
        .about-cta {
          text-align: center;
          background: var(--forest);
          padding: var(--space-2xl);
          border-radius: var(--radius-lg);
        }
        
        .about-cta h2 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: var(--white);
          margin-bottom: var(--space-lg);
        }
        
        /* ===== LEGAL ===== */
        .legal-page {
          background: var(--cream);
          min-height: calc(100vh - 80px);
        }
        
        .legal-container {
          max-width: 800px;
          margin: 0 auto;
          padding: var(--space-3xl) var(--space-lg);
        }
        
        .legal-title {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700;
          color: var(--forest);
          margin-bottom: var(--space-2xl);
        }
        
        .legal-content {
          background: var(--white);
          padding: var(--space-2xl);
          border-radius: var(--radius-lg);
        }
        
        .legal-content h2 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--forest);
          margin: var(--space-xl) 0 var(--space-md);
        }
        
        .legal-content h2:first-child {
          margin-top: 0;
        }
        
        .legal-content p {
          color: var(--stone);
          line-height: 1.7;
          margin-bottom: var(--space-md);
        }
        
        .legal-updated {
          margin-top: var(--space-xl);
          font-size: 0.85rem;
          color: var(--stone-light);
        }
        
        /* ===== FOOTER ===== */
        .footer {
          background: var(--forest);
          color: var(--sand);
          margin-top: auto;
        }
        
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-3xl) var(--space-lg) var(--space-xl);
        }
        
        .footer-main {
          display: flex;
          justify-content: space-between;
          gap: var(--space-3xl);
          flex-wrap: wrap;
          margin-bottom: var(--space-2xl);
          padding-bottom: var(--space-2xl);
          border-bottom: 1px solid var(--forest-light);
        }
        
        .footer-brand {
          max-width: 300px;
        }
        
        .footer-logo {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: var(--space-sm);
          display: block;
        }
        
        .footer-logo span {
          color: var(--accent);
        }
        
        .footer-brand p {
          font-size: 0.95rem;
          opacity: 0.8;
        }
        
        .footer-links {
          display: flex;
          gap: var(--space-3xl);
          flex-wrap: wrap;
        }
        
        .footer-col h4 {
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--white);
          margin-bottom: var(--space-md);
        }
        
        .footer-col button {
          display: block;
          background: none;
          border: none;
          color: var(--sand);
          font-size: 0.9rem;
          cursor: pointer;
          padding: var(--space-xs) 0;
          opacity: 0.8;
          transition: var(--transition);
          text-align: left;
        }
        
        .footer-col button:hover {
          opacity: 1;
          color: var(--white);
        }
        
        .footer-bottom {
          text-align: center;
        }
        
        .footer-bottom p {
          font-size: 0.85rem;
          opacity: 0.7;
          margin-bottom: var(--space-md);
        }
        
        .footer-disclaimer {
          max-width: 600px;
          margin: 0 auto;
          font-size: 0.8rem;
        }
      `}</style>
      
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main>
        {renderPage()}
      </main>
      
      <Footer setCurrentPage={setCurrentPage} setLegalType={setLegalType} />
    </div>
  );
}
