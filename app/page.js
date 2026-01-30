'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, TrendingUp, Bell, Star, ChevronLeft, ChevronRight, Search, X, Clock, Filter, Zap, Globe, Building2, Coins, BarChart3, ExternalLink, AlertCircle, FileText, BarChart2, DollarSign, Loader2, RefreshCw, List, Grid3X3, CalendarDays } from 'lucide-react';

// Generate lots of economic events for realism
const generateEconomicEvents = () => {
  const events = [];
  const countries = [
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'CN', name: 'China', flag: '🇨🇳' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'EU', name: 'European Union', flag: '🇪🇺' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
    { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
    { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
    { code: 'NO', name: 'Norway', flag: '🇳🇴' },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
    { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  ];
  
  const economicIndicators = [
    { name: 'GDP Growth Rate QoQ', impact: 'high' },
    { name: 'GDP Growth Rate YoY', impact: 'high' },
    { name: 'Inflation Rate YoY', impact: 'critical' },
    { name: 'CPI MoM', impact: 'high' },
    { name: 'CPI YoY', impact: 'high' },
    { name: 'Core CPI MoM', impact: 'high' },
    { name: 'Core CPI YoY', impact: 'high' },
    { name: 'PPI MoM', impact: 'medium' },
    { name: 'PPI YoY', impact: 'medium' },
    { name: 'Unemployment Rate', impact: 'high' },
    { name: 'Employment Change', impact: 'high' },
    { name: 'Retail Sales MoM', impact: 'high' },
    { name: 'Retail Sales YoY', impact: 'medium' },
    { name: 'Industrial Production MoM', impact: 'medium' },
    { name: 'Industrial Production YoY', impact: 'medium' },
    { name: 'Manufacturing PMI', impact: 'high' },
    { name: 'Services PMI', impact: 'high' },
    { name: 'Composite PMI', impact: 'medium' },
    { name: 'Consumer Confidence', impact: 'medium' },
    { name: 'Business Confidence', impact: 'medium' },
    { name: 'Trade Balance', impact: 'medium' },
    { name: 'Current Account', impact: 'medium' },
    { name: 'Imports YoY', impact: 'low' },
    { name: 'Exports YoY', impact: 'low' },
    { name: 'Housing Starts', impact: 'medium' },
    { name: 'Building Permits', impact: 'medium' },
    { name: 'Construction Orders YoY', impact: 'low' },
    { name: 'Money Supply M2 YoY', impact: 'low' },
    { name: 'Private Sector Credit YoY', impact: 'low' },
    { name: 'Interest Rate Decision', impact: 'critical' },
    { name: 'Household Consumption MoM', impact: 'medium' },
    { name: 'Import Prices MoM', impact: 'low' },
    { name: 'Import Prices YoY', impact: 'low' },
    { name: 'Tourism Revenues', impact: 'low' },
    { name: 'Tourist Arrivals YoY', impact: 'low' },
  ];

  // Generate events for Jan 27 - Feb 7
  const dates = [
    '2026-01-27', '2026-01-28', '2026-01-29', '2026-01-30', '2026-01-31',
    '2026-02-01', '2026-02-02', '2026-02-03', '2026-02-04', '2026-02-05',
    '2026-02-06', '2026-02-07'
  ];

  let id = 1000;
  dates.forEach(date => {
    // Add 15-40 economic events per day
    const numEvents = 15 + Math.floor(Math.random() * 25);
    const usedCombos = new Set();
    
    for (let i = 0; i < numEvents; i++) {
      const country = countries[Math.floor(Math.random() * countries.length)];
      const indicator = economicIndicators[Math.floor(Math.random() * economicIndicators.length)];
      const combo = `${country.code}-${indicator.name}`;
      
      if (usedCombos.has(combo)) continue;
      usedCombos.add(combo);
      
      const hour = Math.floor(Math.random() * 14) + 1; // 1:00 - 15:00
      const minute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      const actual = (Math.random() * 10 - 2).toFixed(1) + '%';
      const forecast = (Math.random() * 10 - 2).toFixed(1) + '%';
      const previous = (Math.random() * 10 - 2).toFixed(1) + '%';
      
      events.push({
        id: id++,
        title: indicator.name,
        date,
        time,
        category: 'economic',
        impact: indicator.impact,
        country: country.code,
        countryName: country.name,
        actual,
        forecast,
        previous,
        searchTerms: [country.name, indicator.name],
      });
    }
  });
  
  return events;
};

// Generate lots of earnings events
const generateEarningsEvents = () => {
  const events = [];
  
  const companies = [
    // US Companies
    { ticker: 'AAPL', name: 'Apple Inc.', country: 'US', marketCap: '3.4T' },
    { ticker: 'MSFT', name: 'Microsoft Corp.', country: 'US', marketCap: '3.1T' },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', country: 'US', marketCap: '1.9T' },
    { ticker: 'AMZN', name: 'Amazon.com Inc.', country: 'US', marketCap: '1.8T' },
    { ticker: 'NVDA', name: 'NVIDIA Corp.', country: 'US', marketCap: '1.5T' },
    { ticker: 'META', name: 'Meta Platforms', country: 'US', marketCap: '1.2T' },
    { ticker: 'TSLA', name: 'Tesla Inc.', country: 'US', marketCap: '785B' },
    { ticker: 'JPM', name: 'JPMorgan Chase', country: 'US', marketCap: '548B' },
    { ticker: 'V', name: 'Visa Inc.', country: 'US', marketCap: '562B' },
    { ticker: 'MA', name: 'Mastercard Inc.', country: 'US', marketCap: '421B' },
    { ticker: 'XOM', name: 'Exxon Mobil', country: 'US', marketCap: '428B' },
    { ticker: 'CVX', name: 'Chevron Corp.', country: 'US', marketCap: '264B' },
    { ticker: 'BA', name: 'Boeing Co.', country: 'US', marketCap: '112B' },
    { ticker: 'CAT', name: 'Caterpillar Inc.', country: 'US', marketCap: '178B' },
    { ticker: 'IBM', name: 'IBM Corp.', country: 'US', marketCap: '187B' },
    { ticker: 'INTC', name: 'Intel Corp.', country: 'US', marketCap: '92B' },
    { ticker: 'AMD', name: 'AMD Inc.', country: 'US', marketCap: '224B' },
    { ticker: 'QCOM', name: 'Qualcomm Inc.', country: 'US', marketCap: '192B' },
    { ticker: 'NOW', name: 'ServiceNow Inc.', country: 'US', marketCap: '182B' },
    { ticker: 'LRCX', name: 'Lam Research', country: 'US', marketCap: '98B' },
    { ticker: 'GM', name: 'General Motors', country: 'US', marketCap: '52B' },
    { ticker: 'F', name: 'Ford Motor', country: 'US', marketCap: '48B' },
    { ticker: 'T', name: 'AT&T Inc.', country: 'US', marketCap: '142B' },
    { ticker: 'VZ', name: 'Verizon', country: 'US', marketCap: '168B' },
    { ticker: 'PFE', name: 'Pfizer Inc.', country: 'US', marketCap: '158B' },
    { ticker: 'MRK', name: 'Merck & Co.', country: 'US', marketCap: '312B' },
    { ticker: 'ABBV', name: 'AbbVie Inc.', country: 'US', marketCap: '298B' },
    { ticker: 'LLY', name: 'Eli Lilly', country: 'US', marketCap: '568B' },
    { ticker: 'KO', name: 'Coca-Cola', country: 'US', marketCap: '258B' },
    { ticker: 'PEP', name: 'PepsiCo Inc.', country: 'US', marketCap: '238B' },
    
    // Japanese Companies
    { ticker: '7203', name: 'Toyota Motor Corp.', country: 'JP', marketCap: '298B' },
    { ticker: '6758', name: 'Sony Group Corp.', country: 'JP', marketCap: '118B' },
    { ticker: '9984', name: 'SoftBank Group', country: 'JP', marketCap: '85B' },
    { ticker: '6902', name: 'Denso Corp.', country: 'JP', marketCap: '48B' },
    { ticker: '4502', name: 'Takeda Pharma', country: 'JP', marketCap: '52B' },
    { ticker: '4568', name: 'Daiichi Sankyo', country: 'JP', marketCap: '35B' },
    { ticker: '6501', name: 'Hitachi Ltd.', country: 'JP', marketCap: '68B' },
    { ticker: '8306', name: 'Mitsubishi UFJ', country: 'JP', marketCap: '98B' },
    { ticker: '9432', name: 'NTT Corp.', country: 'JP', marketCap: '92B' },
    { ticker: '4661', name: 'Oriental Land', country: 'JP', marketCap: '58B' },
    
    // European Companies
    { ticker: 'ASML', name: 'ASML Holding', country: 'NL', marketCap: '298B' },
    { ticker: 'SAP', name: 'SAP SE', country: 'DE', marketCap: '234B' },
    { ticker: 'NVO', name: 'Novo Nordisk', country: 'DK', marketCap: '428B' },
    { ticker: 'SHEL', name: 'Shell PLC', country: 'GB', marketCap: '218B' },
    { ticker: 'AZN', name: 'AstraZeneca', country: 'GB', marketCap: '198B' },
    { ticker: 'HSBC', name: 'HSBC Holdings', country: 'GB', marketCap: '158B' },
    { ticker: 'BP', name: 'BP PLC', country: 'GB', marketCap: '98B' },
    { ticker: 'RY', name: 'Royal Bank Canada', country: 'CA', marketCap: '148B' },
    { ticker: 'TD', name: 'Toronto-Dominion', country: 'CA', marketCap: '118B' },
    { ticker: 'NESN', name: 'Nestle SA', country: 'CH', marketCap: '268B' },
    { ticker: 'ROG', name: 'Roche Holding', country: 'CH', marketCap: '218B' },
    { ticker: 'NOVN', name: 'Novartis AG', country: 'CH', marketCap: '198B' },
    { ticker: 'SIE', name: 'Siemens AG', country: 'DE', marketCap: '138B' },
    { ticker: 'ALV', name: 'Allianz SE', country: 'DE', marketCap: '98B' },
    { ticker: 'MC', name: 'LVMH', country: 'FR', marketCap: '358B' },
    { ticker: 'OR', name: "L'Oreal SA", country: 'FR', marketCap: '228B' },
    { ticker: 'SAN', name: 'Sanofi SA', country: 'FR', marketCap: '128B' },
    
    // Asian Companies (ex-Japan)
    { ticker: '005930', name: 'Samsung Electronics', country: 'KR', marketCap: '328B' },
    { ticker: '000660', name: 'SK Hynix', country: 'KR', marketCap: '98B' },
    { ticker: 'TSM', name: 'Taiwan Semi', country: 'TW', marketCap: '548B' },
    { ticker: 'BABA', name: 'Alibaba Group', country: 'CN', marketCap: '198B' },
    { ticker: 'TCEHY', name: 'Tencent Holdings', country: 'CN', marketCap: '378B' },
    { ticker: 'RELIANCE', name: 'Reliance Industries', country: 'IN', marketCap: '198B' },
    { ticker: 'TCS', name: 'Tata Consultancy', country: 'IN', marketCap: '158B' },
  ];

  const dates = [
    '2026-01-27', '2026-01-28', '2026-01-29', '2026-01-30', '2026-01-31',
    '2026-02-01', '2026-02-02', '2026-02-03', '2026-02-04', '2026-02-05',
    '2026-02-06', '2026-02-07'
  ];

  let id = 2000;
  const usedCompanies = new Set();
  
  dates.forEach(date => {
    // Add 20-60 earnings events per day
    const numEvents = 20 + Math.floor(Math.random() * 40);
    
    for (let i = 0; i < numEvents && usedCompanies.size < companies.length; i++) {
      let company;
      let attempts = 0;
      do {
        company = companies[Math.floor(Math.random() * companies.length)];
        attempts++;
      } while (usedCompanies.has(company.ticker) && attempts < 100);
      
      if (usedCompanies.has(company.ticker)) continue;
      usedCompanies.add(company.ticker);
      
      const times = ['00:00', '06:00', '06:30', '07:00', '07:30', '08:00', '12:00', '16:00', '16:30', '17:00'];
      const time = times[Math.floor(Math.random() * times.length)];
      
      const estimate = (Math.random() * 5 + 0.1).toFixed(2);
      const actual = (parseFloat(estimate) * (0.9 + Math.random() * 0.2)).toFixed(2);
      const previous = (parseFloat(estimate) * (0.85 + Math.random() * 0.15)).toFixed(2);
      const surprise = (((parseFloat(actual) - parseFloat(estimate)) / parseFloat(estimate)) * 100).toFixed(2);
      
      // Determine impact based on market cap
      let impact = 'medium';
      if (company.marketCap.includes('T') || parseFloat(company.marketCap) > 200) {
        impact = 'critical';
      } else if (parseFloat(company.marketCap) > 50) {
        impact = 'high';
      }
      
      events.push({
        id: id++,
        title: `${company.name} Earnings`,
        ticker: company.ticker,
        company: company.name,
        date,
        time,
        category: 'earnings',
        impact,
        country: company.country,
        marketCap: company.marketCap,
        estimateEPS: estimate,
        actualEPS: actual,
        previousEPS: previous,
        surprise: surprise + '%',
        searchTerms: [company.ticker, company.name],
      });
    }
  });
  
  // Reset for next batch if needed
  return events;
};

// Key events (manually curated important ones)
const keyEvents = [
  // Jan 29 - MEGA DAY
  { id: 1, title: 'FOMC Interest Rate Decision', date: '2026-01-29', time: '14:00', category: 'central-bank', impact: 'critical', country: 'US', description: 'Federal Reserve monetary policy decision.', forecast: 'Hold 4.25%', previous: '4.25%', searchTerms: ['FOMC', 'Fed', 'interest rate'] },
  { id: 2, title: 'US GDP Q4 Advance', date: '2026-01-29', time: '08:30', category: 'economic', impact: 'critical', country: 'US', forecast: '2.5%', previous: '3.1%', searchTerms: ['GDP', 'growth'] },
  
  // Jan 30
  { id: 3, title: 'Bank of Japan Decision', date: '2026-01-30', time: '03:00', category: 'central-bank', impact: 'critical', country: 'JP', forecast: 'Hold 0.25%', previous: '0.25%', searchTerms: ['BOJ', 'Japan rate'] },
  { id: 4, title: 'US PCE Price Index', date: '2026-01-30', time: '08:30', category: 'economic', impact: 'critical', country: 'US', forecast: '2.6%', previous: '2.6%', searchTerms: ['PCE', 'inflation'] },
  { id: 5, title: 'Eurozone GDP Q4 Flash', date: '2026-01-30', time: '05:00', category: 'economic', impact: 'high', country: 'EU', forecast: '0.2%', previous: '0.4%', searchTerms: ['Eurozone GDP'] },
  
  // Jan 31
  { id: 6, title: 'China Manufacturing PMI', date: '2026-01-31', time: '01:30', category: 'economic', impact: 'high', country: 'CN', forecast: '50.2', previous: '50.1', searchTerms: ['China PMI'] },
  { id: 7, title: 'Bitcoin ETF Options Expiry', date: '2026-01-31', time: '16:00', category: 'crypto', impact: 'high', country: 'US', searchTerms: ['Bitcoin', 'BTC', 'crypto'] },
  
  // Feb 6
  { id: 8, title: 'ECB Interest Rate Decision', date: '2026-02-06', time: '08:15', category: 'central-bank', impact: 'critical', country: 'EU', forecast: '25bp cut', previous: '3.00%', searchTerms: ['ECB', 'Europe rate'] },
  
  // Feb 7
  { id: 9, title: 'US Non-Farm Payrolls', date: '2026-02-07', time: '08:30', category: 'economic', impact: 'critical', country: 'US', forecast: '+180K', previous: '+216K', searchTerms: ['NFP', 'jobs', 'employment'] },
  { id: 10, title: 'US Unemployment Rate', date: '2026-02-07', time: '08:30', category: 'economic', impact: 'critical', country: 'US', forecast: '4.1%', previous: '4.1%', searchTerms: ['unemployment'] },
];

// Combine all events
const allEvents = [...keyEvents, ...generateEconomicEvents(), ...generateEarningsEvents()];

const categories = [
  { id: 'all', label: 'All', icon: Calendar, color: '#6366f1' },
  { id: 'earnings', label: 'Earnings', icon: BarChart3, color: '#10b981' },
  { id: 'economic', label: 'Economic', icon: TrendingUp, color: '#f59e0b' },
  { id: 'central-bank', label: 'Central Banks', icon: Building2, color: '#ef4444' },
  { id: 'crypto', label: 'Crypto', icon: Coins, color: '#8b5cf6' },
];

const impactConfig = {
  critical: { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)' },
  high: { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' },
  medium: { color: '#6366f1', bg: 'rgba(99, 102, 241, 0.12)' },
  low: { color: '#71717a', bg: 'rgba(113, 113, 122, 0.12)' },
};

const countryFlags = {
  US: '🇺🇸', DE: '🇩🇪', JP: '🇯🇵', GB: '🇬🇧', CN: '🇨🇳', EU: '🇪🇺', 
  NL: '🇳🇱', FR: '🇫🇷', CA: '🇨🇦', AU: '🇦🇺', CH: '🇨🇭', AT: '🇦🇹',
  KR: '🇰🇷', IN: '🇮🇳', BR: '🇧🇷', MX: '🇲🇽', ZA: '🇿🇦', TR: '🇹🇷',
  NZ: '🇳🇿', SG: '🇸🇬', NO: '🇳🇴', SE: '🇸🇪', PL: '🇵🇱', DK: '🇩🇰',
  TW: '🇹🇼', HK: '🇭🇰', ES: '🇪🇸', IT: '🇮🇹', BE: '🇧🇪', FI: '🇫🇮',
};

const countryNames = {
  US: 'United States', DE: 'Germany', JP: 'Japan', GB: 'United Kingdom', 
  CN: 'China', EU: 'European Union', NL: 'Netherlands', FR: 'France',
  CA: 'Canada', AU: 'Australia', CH: 'Switzerland', KR: 'South Korea',
  IN: 'India', BR: 'Brazil', MX: 'Mexico', ZA: 'South Africa', TR: 'Turkey',
  NZ: 'New Zealand', SG: 'Singapore', NO: 'Norway', SE: 'Sweden', PL: 'Poland',
  DK: 'Denmark', TW: 'Taiwan', HK: 'Hong Kong', ES: 'Spain', IT: 'Italy',
};

// Polymarket API search
async function searchPolymarket(searchTerms) {
  const results = [];
  for (const term of searchTerms.slice(0, 2)) {
    try {
      const response = await fetch(`https://gamma-api.polymarket.com/markets?_limit=5&active=true&closed=false&_q=${encodeURIComponent(term)}`);
      if (response.ok) {
        const markets = await response.json();
        for (const market of markets) {
          if (!results.find(r => r.id === market.id)) {
            results.push({ id: market.id, question: market.question, slug: market.slug, outcomePrices: market.outcomePrices ? JSON.parse(market.outcomePrices) : null, volume: market.volume });
          }
        }
      }
    } catch (e) { console.log('Polymarket error:', e); }
  }
  return results.slice(0, 5);
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 29));
  const [enabledCategories, setEnabledCategories] = useState(['earnings', 'economic', 'central-bank', 'crypto']);
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlist, setWatchlist] = useState([1, 2, 3, 4, 9]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [polymarketResults, setPolymarketResults] = useState([]);
  const [polymarketLoading, setPolymarketLoading] = useState(false);
  const [impactFilter, setImpactFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date(2026, 0, 1));

  // Get week dates
  const getWeekDates = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() + 1);
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const weekDates = getWeekDates(selectedDate);

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return allEvents.filter(e => {
      const matchDate = e.date === dateStr;
      const matchCategory = enabledCategories.includes(e.category);
      const matchSearch = !searchQuery || 
        e.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.ticker?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.company?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchImpact = impactFilter === 'all' || e.impact === impactFilter;
      const matchCountry = countryFilter === 'all' || e.country === countryFilter;
      return matchDate && matchCategory && matchSearch && matchImpact && matchCountry;
    }).sort((a, b) => a.time.localeCompare(b.time));
  };

  const selectedDateEvents = getEventsForDate(selectedDate);

  const toggleCategory = (catId) => {
    if (enabledCategories.includes(catId)) {
      setEnabledCategories(enabledCategories.filter(c => c !== catId));
    } else {
      setEnabledCategories([...enabledCategories, catId]);
    }
  };

  const toggleWatchlist = (id, e) => {
    if (e) e.stopPropagation();
    setWatchlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setActiveTab('overview');
    setPolymarketResults([]);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setSelectedDate(newDate);
  };

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getCategoryCounts = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const events = allEvents.filter(e => e.date === dateStr);
    return {
      economic: events.filter(e => e.category === 'economic' || e.category === 'central-bank').length,
      earnings: events.filter(e => e.category === 'earnings').length,
      crypto: events.filter(e => e.category === 'crypto').length,
    };
  };

  // Calendar picker functions
  const getCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    const startDay = firstDay.getDay() || 7; // Monday = 1
    
    for (let i = startDay - 1; i > 0; i--) {
      const d = new Date(year, month, 1 - i);
      days.push({ date: d, isCurrentMonth: false });
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    while (days.length < 42) {
      const d = new Date(year, month + 1, days.length - lastDay.getDate() - startDay + 2);
      days.push({ date: d, isCurrentMonth: false });
    }
    return days;
  };

  const calendarDays = getCalendarDays(calendarMonth);

  const selectDateFromCalendar = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  useEffect(() => {
    if (activeTab === 'predict' && selectedEvent && polymarketResults.length === 0 && !polymarketLoading) {
      setPolymarketLoading(true);
      searchPolymarket(selectedEvent.searchTerms || [selectedEvent.title])
        .then(results => { setPolymarketResults(results); setPolymarketLoading(false); })
        .catch(() => setPolymarketLoading(false));
    }
  }, [activeTab, selectedEvent]);

  const getCategoryInfo = (id) => categories.find(c => c.id === id) || categories[0];

  // Get unique countries from today's events for filter
  const availableCountries = useMemo(() => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const countries = new Set(allEvents.filter(e => e.date === dateStr).map(e => e.country));
    return Array.from(countries).sort();
  }, [selectedDate]);

  return (
    <div style={{ minHeight: '100vh', background: '#09090b', color: '#fafafa' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #27272a', background: '#09090b', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1800, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar size={20} color="#fff" />
              </div>
              <span style={{ fontSize: 20, fontWeight: 700 }}>FinCal</span>
            </div>

            <div style={{ position: 'relative', width: 400 }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#71717a' }} />
              <input type="text" placeholder="Search events, tickers, companies..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 40px', background: '#18181b', border: '1px solid #27272a', borderRadius: 8, color: '#fafafa', fontSize: 14, outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#6366f1', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
                <Bell size={16} /> Alerts
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Week Navigation */}
      <div style={{ borderBottom: '1px solid #27272a', background: '#0f0f12' }}>
        <div style={{ maxWidth: 1800, margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={() => setSelectedDate(new Date(2026, 0, 29))} style={{ padding: '6px 12px', background: '#27272a', border: 'none', borderRadius: 6, color: '#fafafa', fontSize: 13, cursor: 'pointer' }}>Today</button>
              <button onClick={() => navigateWeek(-1)} style={{ padding: 6, background: 'transparent', border: '1px solid #27272a', borderRadius: 6, color: '#fafafa', cursor: 'pointer', display: 'flex' }}><ChevronLeft size={18} /></button>
              <button onClick={() => navigateWeek(1)} style={{ padding: 6, background: 'transparent', border: '1px solid #27272a', borderRadius: 6, color: '#fafafa', cursor: 'pointer', display: 'flex' }}><ChevronRight size={18} /></button>
              
              {/* Calendar Picker Button */}
              <div style={{ position: 'relative' }}>
                <button onClick={() => setShowCalendar(!showCalendar)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: 'transparent', border: '1px solid #27272a', borderRadius: 6, color: '#fafafa', fontSize: 14, cursor: 'pointer' }}>
                  <CalendarDays size={16} />
                  {shortMonths[weekDates[0].getMonth()]} {weekDates[0].getDate()} — {shortMonths[weekDates[6].getMonth()]} {weekDates[6].getDate()}, {weekDates[0].getFullYear()}
                </button>

                {/* Calendar Dropdown */}
                {showCalendar && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 8, background: '#18181b', border: '1px solid #27272a', borderRadius: 12, padding: 16, zIndex: 1000, width: 300, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <button onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1))} style={{ background: 'transparent', border: 'none', color: '#a1a1aa', cursor: 'pointer', padding: 4 }}><ChevronLeft size={18} /></button>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{monthNames[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}</span>
                      <button onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1))} style={{ background: 'transparent', border: 'none', color: '#a1a1aa', cursor: 'pointer', padding: 4 }}><ChevronRight size={18} /></button>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 8 }}>
                      {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
                        <div key={d} style={{ textAlign: 'center', fontSize: 11, color: '#71717a', padding: 4 }}>{d}</div>
                      ))}
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
                      {calendarDays.map((day, idx) => {
                        const isSelected = day.date.toDateString() === selectedDate.toDateString();
                        const isToday = day.date.toDateString() === new Date(2026, 0, 29).toDateString();
                        const hasEvents = allEvents.some(e => e.date === day.date.toISOString().split('T')[0]);
                        
                        return (
                          <button key={idx} onClick={() => selectDateFromCalendar(day.date)}
                            style={{
                              padding: 8, border: 'none', borderRadius: 6, cursor: 'pointer',
                              background: isSelected ? '#6366f1' : isToday ? '#27272a' : 'transparent',
                              color: isSelected ? '#fff' : day.isCurrentMonth ? '#fafafa' : '#52525b',
                              fontSize: 13, position: 'relative'
                            }}>
                            {day.date.getDate()}
                            {hasEvents && !isSelected && (
                              <span style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: '#6366f1' }} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <select value={impactFilter} onChange={(e) => setImpactFilter(e.target.value)} style={{ padding: '6px 12px', background: '#18181b', border: '1px solid #27272a', borderRadius: 6, color: '#fafafa', fontSize: 13 }}>
                <option value="all">All Impact</option>
                <option value="critical">🔴 Critical</option>
                <option value="high">🟡 High</option>
                <option value="medium">🟣 Medium</option>
              </select>
              <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} style={{ padding: '6px 12px', background: '#18181b', border: '1px solid #27272a', borderRadius: 6, color: '#fafafa', fontSize: 13 }}>
                <option value="all">🌍 All Countries</option>
                {availableCountries.map(code => (
                  <option key={code} value={code}>{countryFlags[code]} {countryNames[code] || code}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Week Day Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
            {weekDates.map((date, idx) => {
              const counts = getCategoryCounts(date);
              const isSelected = date.toDateString() === selectedDate.toDateString();
              const isToday = date.toDateString() === new Date(2026, 0, 29).toDateString();
              const totalEvents = counts.economic + counts.earnings + counts.crypto;
              
              return (
                <button key={idx} onClick={() => setSelectedDate(date)}
                  style={{ padding: '12px', background: isSelected ? '#27272a' : '#18181b', border: isSelected ? '1px solid #6366f1' : '1px solid #27272a', borderRadius: 10, cursor: 'pointer', textAlign: 'left', position: 'relative' }}>
                  {isToday && <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%', background: '#6366f1' }} />}
                  <div style={{ fontSize: 12, color: '#71717a', marginBottom: 4 }}>{dayNames[idx]}</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: isSelected ? '#fafafa' : '#a1a1aa', marginBottom: 8 }}>{date.getDate()}</div>
                  {totalEvents > 0 && (
                    <div style={{ fontSize: 11, color: '#71717a' }}>
                      {counts.economic > 0 && <div>Economic <span style={{ color: '#f59e0b', float: 'right' }}>{counts.economic}</span></div>}
                      {counts.earnings > 0 && <div>Earnings <span style={{ color: '#10b981', float: 'right' }}>{counts.earnings}</span></div>}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div style={{ borderBottom: '1px solid #27272a', background: '#09090b' }}>
        <div style={{ maxWidth: 1800, margin: '0 auto', padding: '12px 24px', display: 'flex', gap: 8 }}>
          {categories.filter(c => c.id !== 'all').map(cat => {
            const isEnabled = enabledCategories.includes(cat.id);
            const Icon = cat.icon;
            return (
              <button key={cat.id} onClick={() => toggleCategory(cat.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: isEnabled ? `${cat.color}20` : 'transparent', border: `1px solid ${isEnabled ? cat.color : '#27272a'}`, borderRadius: 20, color: isEnabled ? cat.color : '#71717a', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                <Icon size={14} /> {cat.label}
              </button>
            );
          })}
          <div style={{ marginLeft: 'auto', fontSize: 13, color: '#71717a', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: '#fafafa', fontWeight: 600 }}>{selectedDateEvents.length}</span> events
          </div>
        </div>
      </div>

      {/* Click outside to close calendar */}
      {showCalendar && <div onClick={() => setShowCalendar(false)} style={{ position: 'fixed', inset: 0, zIndex: 50 }} />}

      {/* Main Content - List View */}
      <div style={{ maxWidth: 1800, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </h2>
        </div>

        {selectedDateEvents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 24px', background: '#18181b', borderRadius: 12, border: '1px solid #27272a' }}>
            <Calendar size={40} color="#3f3f46" style={{ marginBottom: 16 }} />
            <div style={{ fontSize: 16, color: '#71717a' }}>No events for this day</div>
            <div style={{ fontSize: 13, color: '#52525b', marginTop: 4 }}>Try selecting a different date or adjusting filters</div>
          </div>
        ) : (
          <div style={{ background: '#18181b', borderRadius: 12, border: '1px solid #27272a', overflow: 'hidden' }}>
            {/* Table Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '70px 100px 1fr 120px 120px 120px 100px 50px', padding: '12px 16px', borderBottom: '1px solid #27272a', fontSize: 11, color: '#71717a', textTransform: 'uppercase', fontWeight: 600 }}>
              <div>Time</div>
              <div>Country</div>
              <div>Event</div>
              <div style={{ textAlign: 'right' }}>{enabledCategories.includes('earnings') ? 'Estimate' : 'Forecast'}</div>
              <div style={{ textAlign: 'right' }}>Actual</div>
              <div style={{ textAlign: 'right' }}>Previous</div>
              <div style={{ textAlign: 'right' }}>Surprise</div>
              <div></div>
            </div>

            {/* Event Rows */}
            <div style={{ maxHeight: 'calc(100vh - 380px)', overflowY: 'auto' }}>
              {selectedDateEvents.map(event => {
                const catInfo = getCategoryInfo(event.category);
                const flag = countryFlags[event.country] || '🌍';
                
                return (
                  <div key={event.id} onClick={() => openEventModal(event)}
                    style={{
                      display: 'grid', gridTemplateColumns: '70px 100px 1fr 120px 120px 120px 100px 50px',
                      padding: '12px 16px', borderBottom: '1px solid #27272a', cursor: 'pointer',
                      background: event.impact === 'critical' ? 'rgba(239, 68, 68, 0.04)' : 'transparent',
                      alignItems: 'center', fontSize: 13
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#1f1f23'}
                    onMouseLeave={(e) => e.currentTarget.style.background = event.impact === 'critical' ? 'rgba(239, 68, 68, 0.04)' : 'transparent'}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: impactConfig[event.impact]?.color || '#71717a' }} />
                      <span style={{ color: '#a1a1aa' }}>{event.time}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 16 }}>{flag}</span>
                      <span style={{ color: '#71717a', fontSize: 12 }}>{event.country}</span>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {event.ticker && (
                          <span style={{ fontSize: 11, fontWeight: 600, color: catInfo.color, background: `${catInfo.color}20`, padding: '2px 6px', borderRadius: 4 }}>
                            {event.ticker}
                          </span>
                        )}
                        <span style={{ fontWeight: 500 }}>{event.company || event.title}</span>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', color: '#a1a1aa' }}>
                      {event.estimateEPS ? `${event.estimateEPS} USD` : event.forecast || '-'}
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      {event.actualEPS ? `${event.actualEPS} USD` : event.actual || '-'}
                    </div>

                    <div style={{ textAlign: 'right', color: '#71717a' }}>
                      {event.previousEPS ? `${event.previousEPS} USD` : event.previous || '-'}
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      {event.surprise ? (
                        <span style={{ color: parseFloat(event.surprise) >= 0 ? '#10b981' : '#ef4444' }}>
                          {parseFloat(event.surprise) >= 0 ? '+' : ''}{event.surprise}
                        </span>
                      ) : '-'}
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <button onClick={(e) => toggleWatchlist(event.id, e)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: watchlist.includes(event.id) ? '#f59e0b' : '#3f3f46', padding: 4 }}>
                        <Star size={14} fill={watchlist.includes(event.id) ? '#f59e0b' : 'none'} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div onClick={() => setSelectedEvent(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#18181b', borderRadius: 16, border: '1px solid #27272a', maxWidth: 560, width: '100%', maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #27272a' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 24 }}>{countryFlags[selectedEvent.country] || '🌍'}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: impactConfig[selectedEvent.impact]?.color, background: impactConfig[selectedEvent.impact]?.bg, padding: '4px 10px', borderRadius: 4, textTransform: 'uppercase' }}>{selectedEvent.impact}</span>
              </div>
              <button onClick={() => setSelectedEvent(null)} style={{ background: '#27272a', border: 'none', borderRadius: 6, padding: 8, cursor: 'pointer', color: '#a1a1aa', display: 'flex' }}><X size={18} /></button>
            </div>

            <div style={{ display: 'flex', borderBottom: '1px solid #27272a' }}>
              {[{ id: 'overview', label: 'Overview', icon: BarChart2 }, { id: 'predict', label: 'Predict', icon: DollarSign }].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', background: 'transparent', border: 'none', borderBottom: activeTab === tab.id ? '2px solid #6366f1' : '2px solid transparent', color: activeTab === tab.id ? '#fafafa' : '#71717a', fontSize: 14, cursor: 'pointer' }}>
                  <tab.icon size={16} /> {tab.label}
                </button>
              ))}
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
              {activeTab === 'overview' && (
                <>
                  {selectedEvent.ticker && <div style={{ fontSize: 13, color: getCategoryInfo(selectedEvent.category).color, fontWeight: 600, marginBottom: 4 }}>{selectedEvent.ticker}</div>}
                  <h2 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 4px' }}>{selectedEvent.company || selectedEvent.title}</h2>
                  <div style={{ fontSize: 13, color: '#71717a', marginBottom: 16 }}>{countryNames[selectedEvent.country] || selectedEvent.country} • {selectedEvent.time} ET</div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
                    <div style={{ background: '#27272a', borderRadius: 8, padding: 12 }}>
                      <div style={{ fontSize: 10, color: '#71717a', marginBottom: 4 }}>ESTIMATE</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: '#10b981' }}>{selectedEvent.estimateEPS || selectedEvent.forecast || '-'}</div>
                    </div>
                    <div style={{ background: '#27272a', borderRadius: 8, padding: 12 }}>
                      <div style={{ fontSize: 10, color: '#71717a', marginBottom: 4 }}>ACTUAL</div>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>{selectedEvent.actualEPS || selectedEvent.actual || '-'}</div>
                    </div>
                    <div style={{ background: '#27272a', borderRadius: 8, padding: 12 }}>
                      <div style={{ fontSize: 10, color: '#71717a', marginBottom: 4 }}>PREVIOUS</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: '#a1a1aa' }}>{selectedEvent.previousEPS || selectedEvent.previous || '-'}</div>
                    </div>
                  </div>

                  {selectedEvent.surprise && (
                    <div style={{ background: parseFloat(selectedEvent.surprise) >= 0 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', borderRadius: 8, padding: 12, marginBottom: 16, textAlign: 'center' }}>
                      <div style={{ fontSize: 10, color: '#71717a', marginBottom: 4 }}>SURPRISE</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: parseFloat(selectedEvent.surprise) >= 0 ? '#10b981' : '#ef4444' }}>
                        {parseFloat(selectedEvent.surprise) >= 0 ? '+' : ''}{selectedEvent.surprise}
                      </div>
                    </div>
                  )}

                  {selectedEvent.marketCap && (
                    <div style={{ fontSize: 13, color: '#71717a', marginBottom: 16 }}>Market Cap: <span style={{ color: '#fafafa' }}>${selectedEvent.marketCap}</span></div>
                  )}

                  <button onClick={(e) => toggleWatchlist(selectedEvent.id, e)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', background: watchlist.includes(selectedEvent.id) ? '#f59e0b' : '#27272a', border: 'none', borderRadius: 8, color: watchlist.includes(selectedEvent.id) ? '#000' : '#fafafa', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
                    <Star size={16} fill={watchlist.includes(selectedEvent.id) ? '#000' : 'none'} />
                    {watchlist.includes(selectedEvent.id) ? 'Watching' : 'Add to Watchlist'}
                  </button>
                </>
              )}

              {activeTab === 'predict' && (
                <>
                  <div style={{ marginBottom: 16 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 4px' }}>Prediction Markets</h3>
                    <p style={{ fontSize: 12, color: '#71717a', margin: 0 }}>Live from Polymarket</p>
                  </div>

                  {polymarketLoading && (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                      <Loader2 size={28} color="#6366f1" style={{ animation: 'spin 1s linear infinite' }} />
                    </div>
                  )}

                  {!polymarketLoading && polymarketResults.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px', background: '#09090b', borderRadius: 10, border: '1px solid #27272a' }}>
                      <div style={{ fontSize: 13, color: '#71717a', marginBottom: 8 }}>No markets found</div>
                      <a href={`https://polymarket.com/search?query=${encodeURIComponent(selectedEvent.searchTerms?.[0] || selectedEvent.title)}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#6366f1', textDecoration: 'none' }}>
                        Search Polymarket <ExternalLink size={10} style={{ marginLeft: 4 }} />
                      </a>
                    </div>
                  )}

                  {!polymarketLoading && polymarketResults.map(market => {
                    const yesPrice = market.outcomePrices ? Math.round(parseFloat(market.outcomePrices[0]) * 100) : null;
                    return (
                      <a key={market.id} href={`https://polymarket.com/event/${market.slug}`} target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: '#09090b', border: '1px solid #27272a', borderRadius: 10, padding: 14, marginBottom: 10, textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>{market.question}</div>
                        {yesPrice !== null && (
                          <div style={{ display: 'flex', gap: 8 }}>
                            <div style={{ flex: yesPrice, background: 'rgba(16,185,129,0.2)', borderRadius: 4, padding: '6px 10px', textAlign: 'center' }}>
                              <div style={{ fontSize: 16, fontWeight: 700, color: '#10b981' }}>{yesPrice}¢</div>
                              <div style={{ fontSize: 9, color: '#71717a' }}>Yes</div>
                            </div>
                            <div style={{ flex: 100 - yesPrice, background: 'rgba(239,68,68,0.2)', borderRadius: 4, padding: '6px 10px', textAlign: 'center' }}>
                              <div style={{ fontSize: 16, fontWeight: 700, color: '#ef4444' }}>{100 - yesPrice}¢</div>
                              <div style={{ fontSize: 9, color: '#71717a' }}>No</div>
                            </div>
                          </div>
                        )}
                      </a>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 8px center; padding-right: 28px; }
      `}</style>
    </div>
  );
}
