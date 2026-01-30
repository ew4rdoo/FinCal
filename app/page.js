'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, TrendingUp, Bell, Star, ChevronLeft, ChevronRight, Search, X, Clock, Filter, Zap, Globe, Building2, Coins, BarChart3, ExternalLink, AlertCircle, FileText, BarChart2, DollarSign, Loader2, RefreshCw, List, Grid3X3, ChevronDown } from 'lucide-react';

// Expanded events data with more realistic daily data
const allEvents = [
  // Jan 27 - Monday
  { id: 101, title: 'AT&T Q4 Earnings', date: '2026-01-27', time: '06:30', category: 'earnings', impact: 'high', ticker: 'T', company: 'AT&T Inc.', country: 'US', estimateEPS: '0.57', previousEPS: '0.54', marketCap: '142.5B', searchTerms: ['AT&T', 'T', 'telecom earnings'] },
  { id: 102, title: 'Nucor Q4 Earnings', date: '2026-01-27', time: '07:00', category: 'earnings', impact: 'medium', ticker: 'NUE', company: 'Nucor Corporation', country: 'US', estimateEPS: '3.42', previousEPS: '4.10', marketCap: '38.2B', searchTerms: ['Nucor', 'steel'] },
  { id: 103, title: 'Germany IFO Business Climate', date: '2026-01-27', time: '04:00', category: 'economic', impact: 'high', country: 'DE', consensus: '86.4', previous: '86.3', searchTerms: ['IFO', 'Germany business'] },
  { id: 104, title: 'US New Home Sales', date: '2026-01-27', time: '10:00', category: 'economic', impact: 'medium', country: 'US', consensus: '670K', previous: '664K', searchTerms: ['home sales', 'housing'] },
  
  // Jan 28 - Tuesday
  { id: 105, title: 'SAP Q4 Earnings', date: '2026-01-28', time: '01:00', category: 'earnings', impact: 'high', ticker: 'SAP', company: 'SAP SE', country: 'DE', estimateEPS: '1.48', previousEPS: '1.32', marketCap: '234.8B', searchTerms: ['SAP', 'enterprise software'] },
  { id: 106, title: 'General Motors Q4 Earnings', date: '2026-01-28', time: '06:30', category: 'earnings', impact: 'high', ticker: 'GM', company: 'General Motors', country: 'US', estimateEPS: '1.72', previousEPS: '1.59', marketCap: '52.1B', searchTerms: ['GM', 'General Motors', 'auto'] },
  { id: 107, title: 'Lockheed Martin Q4 Earnings', date: '2026-01-28', time: '07:00', category: 'earnings', impact: 'high', ticker: 'LMT', company: 'Lockheed Martin', country: 'US', estimateEPS: '7.21', previousEPS: '6.73', marketCap: '108.4B', searchTerms: ['Lockheed', 'defense'] },
  { id: 108, title: 'US Consumer Confidence', date: '2026-01-28', time: '10:00', category: 'economic', impact: 'high', country: 'US', consensus: '105.8', previous: '104.7', searchTerms: ['consumer confidence'] },
  { id: 109, title: 'JetBlue Q4 Earnings', date: '2026-01-28', time: '06:00', category: 'earnings', impact: 'medium', ticker: 'JBLU', company: 'JetBlue Airways', country: 'US', estimateEPS: '-0.12', previousEPS: '-0.08', marketCap: '2.1B', searchTerms: ['JetBlue', 'airline'] },
  { id: 110, title: 'Sysco Q2 Earnings', date: '2026-01-28', time: '08:00', category: 'earnings', impact: 'medium', ticker: 'SYY', company: 'Sysco Corporation', country: 'US', estimateEPS: '0.98', previousEPS: '0.92', marketCap: '38.5B', searchTerms: ['Sysco', 'food distribution'] },
  
  // Jan 29 - Wednesday (MAJOR DAY)
  { id: 1, title: 'FOMC Interest Rate Decision', date: '2026-01-29', time: '14:00', category: 'central-bank', impact: 'critical', country: 'US', description: 'Federal Reserve monetary policy decision.', consensus: 'Hold at 4.25%', previous: '4.25%', followers: 45200, searchTerms: ['Federal Reserve', 'FOMC', 'interest rate', 'Fed'] },
  { id: 2, title: 'Tesla Q4 Earnings', date: '2026-01-29', time: '16:00', category: 'earnings', impact: 'critical', ticker: 'TSLA', company: 'Tesla Inc.', country: 'US', estimateEPS: '0.78', previousEPS: '0.72', marketCap: '785.2B', followers: 38100, searchTerms: ['Tesla', 'TSLA', 'EV'] },
  { id: 3, title: 'Microsoft Q2 Earnings', date: '2026-01-29', time: '16:00', category: 'earnings', impact: 'critical', ticker: 'MSFT', company: 'Microsoft Corp.', country: 'US', estimateEPS: '3.12', previousEPS: '2.99', marketCap: '3.1T', followers: 29400, searchTerms: ['Microsoft', 'MSFT', 'cloud'] },
  { id: 111, title: 'Meta Q4 Earnings', date: '2026-01-29', time: '16:00', category: 'earnings', impact: 'critical', ticker: 'META', company: 'Meta Platforms', country: 'US', estimateEPS: '6.82', previousEPS: '5.33', marketCap: '1.2T', searchTerms: ['Meta', 'Facebook'] },
  { id: 112, title: 'ServiceNow Q4 Earnings', date: '2026-01-29', time: '16:00', category: 'earnings', impact: 'high', ticker: 'NOW', company: 'ServiceNow Inc.', country: 'US', estimateEPS: '3.65', previousEPS: '3.11', marketCap: '182.4B', searchTerms: ['ServiceNow'] },
  { id: 113, title: 'IBM Q4 Earnings', date: '2026-01-29', time: '16:00', category: 'earnings', impact: 'high', ticker: 'IBM', company: 'IBM Corporation', country: 'US', estimateEPS: '3.78', previousEPS: '3.64', marketCap: '187.2B', searchTerms: ['IBM'] },
  { id: 114, title: 'US GDP Q4 (Advance)', date: '2026-01-29', time: '08:30', category: 'economic', impact: 'critical', country: 'US', consensus: '2.5%', previous: '3.1%', searchTerms: ['GDP', 'growth'] },
  { id: 115, title: 'Boeing Q4 Earnings', date: '2026-01-29', time: '07:30', category: 'earnings', impact: 'high', ticker: 'BA', company: 'Boeing Co.', country: 'US', estimateEPS: '-0.48', previousEPS: '-0.92', marketCap: '112.8B', searchTerms: ['Boeing', 'aerospace'] },
  { id: 116, title: 'Lam Research Q2 Earnings', date: '2026-01-29', time: '16:00', category: 'earnings', impact: 'high', ticker: 'LRCX', company: 'Lam Research', country: 'US', estimateEPS: '8.15', previousEPS: '7.85', marketCap: '98.5B', searchTerms: ['Lam Research', 'semiconductor'] },
  { id: 117, title: 'ASML Q4 Earnings', date: '2026-01-29', time: '01:00', category: 'earnings', impact: 'critical', ticker: 'ASML', company: 'ASML Holding', country: 'NL', estimateEPS: '6.72', previousEPS: '5.89', marketCap: '298.4B', searchTerms: ['ASML', 'semiconductor', 'lithography'] },
  
  // Jan 30 - Thursday
  { id: 4, title: 'Apple Q1 Earnings', date: '2026-01-30', time: '16:30', category: 'earnings', impact: 'critical', ticker: 'AAPL', company: 'Apple Inc.', country: 'US', estimateEPS: '2.35', previousEPS: '2.18', marketCap: '3.4T', followers: 52300, searchTerms: ['Apple', 'AAPL', 'iPhone'] },
  { id: 118, title: 'Amazon Q4 Earnings', date: '2026-01-30', time: '16:00', category: 'earnings', impact: 'critical', ticker: 'AMZN', company: 'Amazon.com Inc.', country: 'US', estimateEPS: '1.85', previousEPS: '1.43', marketCap: '1.9T', searchTerms: ['Amazon', 'AMZN', 'AWS'] },
  { id: 119, title: 'Visa Q1 Earnings', date: '2026-01-30', time: '16:00', category: 'earnings', impact: 'high', ticker: 'V', company: 'Visa Inc.', country: 'US', estimateEPS: '2.68', previousEPS: '2.41', marketCap: '562.1B', searchTerms: ['Visa', 'payments'] },
  { id: 120, title: 'Mastercard Q4 Earnings', date: '2026-01-30', time: '08:00', category: 'earnings', impact: 'high', ticker: 'MA', company: 'Mastercard Inc.', country: 'US', estimateEPS: '3.42', previousEPS: '3.18', marketCap: '421.8B', searchTerms: ['Mastercard', 'payments'] },
  { id: 18, title: 'Bank of Japan Decision', date: '2026-01-30', time: '23:00', category: 'central-bank', impact: 'high', country: 'JP', description: 'BOJ monetary policy statement', consensus: 'Hold', previous: '0.25%', searchTerms: ['Bank of Japan', 'BOJ'] },
  { id: 121, title: 'Eurozone GDP Q4 (Flash)', date: '2026-01-30', time: '05:00', category: 'economic', impact: 'high', country: 'EU', consensus: '0.2%', previous: '0.4%', searchTerms: ['Eurozone GDP', 'Europe growth'] },
  { id: 122, title: 'US PCE Price Index', date: '2026-01-30', time: '08:30', category: 'economic', impact: 'critical', country: 'US', consensus: '2.6%', previous: '2.6%', searchTerms: ['PCE', 'inflation', 'Fed preferred'] },
  { id: 123, title: 'Intel Q4 Earnings', date: '2026-01-30', time: '16:00', category: 'earnings', impact: 'high', ticker: 'INTC', company: 'Intel Corp.', country: 'US', estimateEPS: '0.12', previousEPS: '0.03', marketCap: '92.4B', searchTerms: ['Intel', 'semiconductors'] },
  { id: 124, title: 'Caterpillar Q4 Earnings', date: '2026-01-30', time: '06:30', category: 'earnings', impact: 'high', ticker: 'CAT', company: 'Caterpillar Inc.', country: 'US', estimateEPS: '5.18', previousEPS: '5.28', marketCap: '178.2B', searchTerms: ['Caterpillar', 'machinery'] },
  
  // Jan 31 - Friday
  { id: 7, title: 'Bitcoin ETF Options Expiry', date: '2026-01-31', time: '16:00', category: 'crypto', impact: 'high', country: 'US', description: 'Monthly options expiration for spot Bitcoin ETFs.', followers: 67800, searchTerms: ['Bitcoin', 'BTC', 'crypto'] },
  { id: 17, title: 'JPMorgan Q4 Earnings', date: '2026-01-31', time: '07:00', category: 'earnings', impact: 'high', ticker: 'JPM', company: 'JPMorgan Chase', country: 'US', estimateEPS: '4.12', previousEPS: '3.97', marketCap: '548.2B', searchTerms: ['JPMorgan', 'bank'] },
  { id: 125, title: 'Exxon Mobil Q4 Earnings', date: '2026-01-31', time: '07:30', category: 'earnings', impact: 'high', ticker: 'XOM', company: 'Exxon Mobil Corp.', country: 'US', estimateEPS: '2.08', previousEPS: '2.24', marketCap: '428.5B', searchTerms: ['Exxon', 'oil'] },
  { id: 126, title: 'Chevron Q4 Earnings', date: '2026-01-31', time: '07:00', category: 'earnings', impact: 'high', ticker: 'CVX', company: 'Chevron Corp.', country: 'US', estimateEPS: '3.21', previousEPS: '3.48', marketCap: '264.1B', searchTerms: ['Chevron', 'oil'] },
  { id: 127, title: 'Abbvie Q4 Earnings', date: '2026-01-31', time: '08:00', category: 'earnings', impact: 'high', ticker: 'ABBV', company: 'AbbVie Inc.', country: 'US', estimateEPS: '2.92', previousEPS: '2.79', marketCap: '298.4B', searchTerms: ['Abbvie', 'pharma'] },
  { id: 128, title: 'US Employment Cost Index', date: '2026-01-31', time: '08:30', category: 'economic', impact: 'high', country: 'US', consensus: '0.9%', previous: '1.1%', searchTerms: ['employment cost', 'wages'] },
  { id: 129, title: 'China PMI Manufacturing', date: '2026-01-31', time: '20:30', category: 'economic', impact: 'high', country: 'CN', consensus: '50.2', previous: '50.1', searchTerms: ['China PMI', 'manufacturing'] },
  
  // Feb 1 - Saturday (some global markets)
  { id: 15, title: 'OPEC+ Meeting', date: '2026-02-01', time: '10:00', category: 'global', impact: 'high', country: 'AT', description: 'Oil production quota decision', searchTerms: ['OPEC', 'oil'] },
  
  // More future events
  { id: 5, title: 'US Non-Farm Payrolls', date: '2026-02-07', time: '08:30', category: 'economic', impact: 'critical', country: 'US', consensus: '+180K', previous: '+216K', followers: 41000, searchTerms: ['jobs report', 'NFP', 'employment'] },
  { id: 9, title: 'Nvidia Q4 Earnings', date: '2026-02-26', time: '16:20', category: 'earnings', impact: 'critical', ticker: 'NVDA', company: 'NVIDIA Corp.', country: 'US', estimateEPS: '0.89', previousEPS: '0.81', marketCap: '1.8T', followers: 71200, searchTerms: ['Nvidia', 'NVDA', 'AI chips'] },
  { id: 13, title: 'Stripe IPO', date: '2026-03-15', time: '09:30', category: 'ipo', impact: 'critical', company: 'Stripe Inc.', country: 'US', description: 'Stripe NYSE debut - largest tech IPO since 2021.', followers: 89400, searchTerms: ['Stripe', 'IPO', 'fintech'] },
];

const categories = [
  { id: 'all', label: 'All', icon: Calendar, color: '#6366f1' },
  { id: 'earnings', label: 'Earnings', icon: BarChart3, color: '#10b981' },
  { id: 'economic', label: 'Economic', icon: TrendingUp, color: '#f59e0b' },
  { id: 'central-bank', label: 'Central Banks', icon: Building2, color: '#ef4444' },
  { id: 'crypto', label: 'Crypto', icon: Coins, color: '#8b5cf6' },
  { id: 'ipo', label: 'IPO', icon: Zap, color: '#06b6d4' },
  { id: 'global', label: 'Global', icon: Globe, color: '#ec4899' },
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
  KR: '🇰🇷', IN: '🇮🇳', BR: '🇧🇷', MX: '🇲🇽',
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
            results.push({
              id: market.id, question: market.question, slug: market.slug,
              outcomePrices: market.outcomePrices ? JSON.parse(market.outcomePrices) : null,
              volume: market.volume, image: market.image,
            });
          }
        }
      }
    } catch (e) { console.log('Polymarket error:', e); }
  }
  return results.slice(0, 5);
}

export default function Home() {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 29));
  const [enabledCategories, setEnabledCategories] = useState(['earnings', 'economic', 'central-bank', 'crypto', 'ipo', 'global']);
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlist, setWatchlist] = useState([1, 4, 2, 9, 13]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [polymarketResults, setPolymarketResults] = useState([]);
  const [polymarketLoading, setPolymarketLoading] = useState(false);
  const [impactFilter, setImpactFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');

  // Get week dates
  const getWeekDates = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() + 1); // Monday
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
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  const formatMarketCap = (mc) => mc || '-';
  const formatVolume = (n) => { if (!n) return '$0'; if (n >= 1000000) return '$' + (n/1000000).toFixed(1) + 'M'; if (n >= 1000) return '$' + (n/1000).toFixed(0) + 'K'; return '$' + n.toFixed(0); };

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
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Count events per category for selected date
  const getCategoryCounts = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const events = allEvents.filter(e => e.date === dateStr);
    return {
      economic: events.filter(e => e.category === 'economic' || e.category === 'central-bank').length,
      earnings: events.filter(e => e.category === 'earnings').length,
      crypto: events.filter(e => e.category === 'crypto').length,
      ipo: events.filter(e => e.category === 'ipo').length,
    };
  };

  // Fetch Polymarket when predict tab opened
  useEffect(() => {
    if (activeTab === 'predict' && selectedEvent && polymarketResults.length === 0 && !polymarketLoading) {
      setPolymarketLoading(true);
      searchPolymarket(selectedEvent.searchTerms || [selectedEvent.title])
        .then(results => { setPolymarketResults(results); setPolymarketLoading(false); })
        .catch(() => setPolymarketLoading(false));
    }
  }, [activeTab, selectedEvent]);

  const getCategoryInfo = (id) => categories.find(c => c.id === id) || categories[0];

  return (
    <div style={{ minHeight: '100vh', background: '#09090b', color: '#fafafa' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #27272a', background: '#09090b', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 24px' }}>
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
              <div style={{ display: 'flex', background: '#18181b', borderRadius: 8, border: '1px solid #27272a' }}>
                <button onClick={() => setViewMode('list')} style={{ padding: '8px 12px', background: viewMode === 'list' ? '#27272a' : 'transparent', border: 'none', borderRadius: '7px 0 0 7px', color: viewMode === 'list' ? '#fafafa' : '#71717a', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><List size={18} /></button>
                <button onClick={() => setViewMode('calendar')} style={{ padding: '8px 12px', background: viewMode === 'calendar' ? '#27272a' : 'transparent', border: 'none', borderRadius: '0 7px 7px 0', color: viewMode === 'calendar' ? '#fafafa' : '#71717a', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Grid3X3 size={18} /></button>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#6366f1', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
                <Bell size={16} /> Alerts
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Week Navigation */}
      <div style={{ borderBottom: '1px solid #27272a', background: '#0f0f12' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={() => setSelectedDate(new Date(2026, 0, 29))} style={{ padding: '6px 12px', background: '#27272a', border: 'none', borderRadius: 6, color: '#fafafa', fontSize: 13, cursor: 'pointer' }}>Today</button>
              <button onClick={() => navigateWeek(-1)} style={{ padding: 6, background: 'transparent', border: '1px solid #27272a', borderRadius: 6, color: '#fafafa', cursor: 'pointer', display: 'flex' }}><ChevronLeft size={18} /></button>
              <button onClick={() => navigateWeek(1)} style={{ padding: 6, background: 'transparent', border: '1px solid #27272a', borderRadius: 6, color: '#fafafa', cursor: 'pointer', display: 'flex' }}><ChevronRight size={18} /></button>
              <span style={{ fontSize: 16, fontWeight: 600 }}>
                {monthNames[weekDates[0].getMonth()]} {weekDates[0].getDate()} — {monthNames[weekDates[6].getMonth()]} {weekDates[6].getDate()}, {weekDates[0].getFullYear()}
              </span>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <select value={impactFilter} onChange={(e) => setImpactFilter(e.target.value)} style={{ padding: '6px 12px', background: '#18181b', border: '1px solid #27272a', borderRadius: 6, color: '#fafafa', fontSize: 13 }}>
                <option value="all">All Impact</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
              </select>
              <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} style={{ padding: '6px 12px', background: '#18181b', border: '1px solid #27272a', borderRadius: 6, color: '#fafafa', fontSize: 13 }}>
                <option value="all">All Countries</option>
                <option value="US">🇺🇸 United States</option>
                <option value="DE">🇩🇪 Germany</option>
                <option value="JP">🇯🇵 Japan</option>
                <option value="GB">🇬🇧 United Kingdom</option>
                <option value="CN">🇨🇳 China</option>
                <option value="EU">🇪🇺 Eurozone</option>
              </select>
            </div>
          </div>

          {/* Week Day Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
            {weekDates.map((date, idx) => {
              const counts = getCategoryCounts(date);
              const isSelected = date.toDateString() === selectedDate.toDateString();
              const isToday = date.toDateString() === new Date(2026, 0, 29).toDateString();
              const totalEvents = counts.economic + counts.earnings + counts.crypto + counts.ipo;
              
              return (
                <button key={idx} onClick={() => setSelectedDate(date)}
                  style={{
                    padding: '12px', background: isSelected ? '#27272a' : '#18181b',
                    border: isSelected ? '1px solid #6366f1' : '1px solid #27272a',
                    borderRadius: 10, cursor: 'pointer', textAlign: 'left',
                    position: 'relative'
                  }}>
                  {isToday && <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%', background: '#6366f1' }} />}
                  <div style={{ fontSize: 12, color: '#71717a', marginBottom: 4 }}>{dayNames[idx]}</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: isSelected ? '#fafafa' : '#a1a1aa', marginBottom: 8 }}>{date.getDate()}</div>
                  {totalEvents > 0 && (
                    <div style={{ fontSize: 11, color: '#71717a' }}>
                      {counts.economic > 0 && <div>Economic <span style={{ color: '#f59e0b', float: 'right' }}>{counts.economic}</span></div>}
                      {counts.earnings > 0 && <div>Earnings <span style={{ color: '#10b981', float: 'right' }}>{counts.earnings}</span></div>}
                      {counts.crypto > 0 && <div>Crypto <span style={{ color: '#8b5cf6', float: 'right' }}>{counts.crypto}</span></div>}
                      {counts.ipo > 0 && <div>IPO <span style={{ color: '#06b6d4', float: 'right' }}>{counts.ipo}</span></div>}
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
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '12px 24px', display: 'flex', gap: 8 }}>
          {categories.filter(c => c.id !== 'all').map(cat => {
            const isEnabled = enabledCategories.includes(cat.id);
            const Icon = cat.icon;
            return (
              <button key={cat.id} onClick={() => toggleCategory(cat.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px',
                  background: isEnabled ? `${cat.color}20` : 'transparent',
                  border: `1px solid ${isEnabled ? cat.color : '#27272a'}`,
                  borderRadius: 20, color: isEnabled ? cat.color : '#71717a',
                  fontSize: 13, fontWeight: 500, cursor: 'pointer'
                }}>
                <Icon size={14} /> {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content - List View */}
      <div style={{ maxWidth: 1600, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            <span style={{ color: '#71717a', fontWeight: 400, marginLeft: 8 }}>({selectedDateEvents.length} events)</span>
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
            <div style={{ display: 'grid', gridTemplateColumns: '80px 50px 1fr 120px 100px 100px 100px 120px 50px', padding: '12px 16px', borderBottom: '1px solid #27272a', fontSize: 11, color: '#71717a', textTransform: 'uppercase', fontWeight: 600 }}>
              <div>Time</div>
              <div></div>
              <div>Event</div>
              <div style={{ textAlign: 'right' }}>Estimate</div>
              <div style={{ textAlign: 'right' }}>Previous</div>
              <div style={{ textAlign: 'right' }}>Actual</div>
              <div style={{ textAlign: 'right' }}>Surprise</div>
              <div style={{ textAlign: 'right' }}>Market Cap</div>
              <div></div>
            </div>

            {/* Event Rows */}
            {selectedDateEvents.map(event => {
              const catInfo = getCategoryInfo(event.category);
              const flag = countryFlags[event.country] || '🌍';
              
              return (
                <div key={event.id} onClick={() => openEventModal(event)}
                  style={{
                    display: 'grid', gridTemplateColumns: '80px 50px 1fr 120px 100px 100px 100px 120px 50px',
                    padding: '14px 16px', borderBottom: '1px solid #27272a', cursor: 'pointer',
                    background: event.impact === 'critical' ? 'rgba(239, 68, 68, 0.04)' : 'transparent',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#1f1f23'}
                  onMouseLeave={(e) => e.currentTarget.style.background = event.impact === 'critical' ? 'rgba(239, 68, 68, 0.04)' : 'transparent'}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: impactConfig[event.impact]?.color || '#71717a' }} />
                    <span style={{ fontSize: 13, color: '#a1a1aa' }}>{event.time}</span>
                  </div>

                  <div style={{ fontSize: 16 }}>{flag}</div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {event.ticker && (
                        <span style={{ fontSize: 12, fontWeight: 600, color: catInfo.color, background: `${catInfo.color}20`, padding: '2px 8px', borderRadius: 4 }}>
                          {event.ticker}
                        </span>
                      )}
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{event.company || event.title}</span>
                    </div>
                    {event.ticker && <div style={{ fontSize: 12, color: '#71717a', marginTop: 2 }}>{event.title}</div>}
                  </div>

                  <div style={{ textAlign: 'right', fontSize: 13 }}>
                    {event.estimateEPS ? `${event.estimateEPS} USD` : event.consensus || '-'}
                  </div>

                  <div style={{ textAlign: 'right', fontSize: 13, color: '#a1a1aa' }}>
                    {event.previousEPS ? `${event.previousEPS} USD` : event.previous || '-'}
                  </div>

                  <div style={{ textAlign: 'right', fontSize: 13, color: '#71717a' }}>-</div>

                  <div style={{ textAlign: 'right', fontSize: 13, color: '#71717a' }}>-</div>

                  <div style={{ textAlign: 'right', fontSize: 13, color: '#a1a1aa' }}>
                    {event.marketCap ? `${event.marketCap} USD` : '-'}
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <button onClick={(e) => toggleWatchlist(event.id, e)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: watchlist.includes(event.id) ? '#f59e0b' : '#3f3f46', padding: 4 }}>
                      <Star size={16} fill={watchlist.includes(event.id) ? '#f59e0b' : 'none'} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div onClick={() => setSelectedEvent(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#18181b', borderRadius: 16, border: '1px solid #27272a', maxWidth: 640, width: '100%', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #27272a' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 20 }}>{countryFlags[selectedEvent.country] || '🌍'}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: impactConfig[selectedEvent.impact]?.color, background: impactConfig[selectedEvent.impact]?.bg, padding: '4px 10px', borderRadius: 4, textTransform: 'uppercase' }}>{selectedEvent.impact}</span>
                <span style={{ fontSize: 11, color: '#71717a', background: '#27272a', padding: '4px 10px', borderRadius: 4 }}>{getCategoryInfo(selectedEvent.category).label}</span>
              </div>
              <button onClick={() => setSelectedEvent(null)} style={{ background: '#27272a', border: 'none', borderRadius: 6, padding: 8, cursor: 'pointer', color: '#a1a1aa', display: 'flex' }}><X size={18} /></button>
            </div>

            <div style={{ display: 'flex', borderBottom: '1px solid #27272a' }}>
              {[{ id: 'overview', label: 'Overview', icon: BarChart2 }, { id: 'predict', label: 'Predict', icon: DollarSign }].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px', background: 'transparent', border: 'none', borderBottom: activeTab === tab.id ? '2px solid #6366f1' : '2px solid transparent', color: activeTab === tab.id ? '#fafafa' : '#71717a', fontSize: 14, cursor: 'pointer' }}>
                  <tab.icon size={16} /> {tab.label}
                </button>
              ))}
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
              {activeTab === 'overview' && (
                <>
                  {selectedEvent.ticker && <div style={{ fontSize: 14, color: getCategoryInfo(selectedEvent.category).color, fontWeight: 600, marginBottom: 8 }}>${selectedEvent.ticker}</div>}
                  <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 4px' }}>{selectedEvent.company || selectedEvent.title}</h2>
                  {selectedEvent.company && <div style={{ fontSize: 14, color: '#71717a', marginBottom: 16 }}>{selectedEvent.title}</div>}
                  {selectedEvent.description && <p style={{ fontSize: 14, color: '#a1a1aa', marginBottom: 24, lineHeight: 1.6 }}>{selectedEvent.description}</p>}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                    <div style={{ background: '#27272a', borderRadius: 10, padding: 14 }}>
                      <div style={{ fontSize: 11, color: '#71717a', marginBottom: 4 }}>DATE</div>
                      <div style={{ fontSize: 15, fontWeight: 500 }}>{new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
                    </div>
                    <div style={{ background: '#27272a', borderRadius: 10, padding: 14 }}>
                      <div style={{ fontSize: 11, color: '#71717a', marginBottom: 4 }}>TIME</div>
                      <div style={{ fontSize: 15, fontWeight: 500 }}>{selectedEvent.time} ET</div>
                    </div>
                  </div>

                  {(selectedEvent.estimateEPS || selectedEvent.consensus) && (
                    <div style={{ background: '#09090b', borderRadius: 10, padding: 16, marginBottom: 20 }}>
                      <div style={{ fontSize: 12, color: '#71717a', marginBottom: 12 }}>EXPECTATIONS</div>
                      <div style={{ display: 'flex', gap: 32 }}>
                        <div>
                          <div style={{ fontSize: 11, color: '#71717a' }}>Estimate</div>
                          <div style={{ fontSize: 20, fontWeight: 600, color: '#10b981' }}>{selectedEvent.estimateEPS || selectedEvent.consensus}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: '#71717a' }}>Previous</div>
                          <div style={{ fontSize: 20, fontWeight: 600, color: '#a1a1aa' }}>{selectedEvent.previousEPS || selectedEvent.previous || '-'}</div>
                        </div>
                        {selectedEvent.marketCap && (
                          <div>
                            <div style={{ fontSize: 11, color: '#71717a' }}>Market Cap</div>
                            <div style={{ fontSize: 20, fontWeight: 600, color: '#a1a1aa' }}>${selectedEvent.marketCap}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={(e) => toggleWatchlist(selectedEvent.id, e)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', background: watchlist.includes(selectedEvent.id) ? '#f59e0b' : '#27272a', border: 'none', borderRadius: 10, color: watchlist.includes(selectedEvent.id) ? '#000' : '#fafafa', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
                      <Star size={16} fill={watchlist.includes(selectedEvent.id) ? '#000' : 'none'} />
                      {watchlist.includes(selectedEvent.id) ? 'Watching' : 'Add to Watchlist'}
                    </button>
                    <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', background: '#6366f1', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
                      <Bell size={16} /> Set Alert
                    </button>
                  </div>
                </>
              )}

              {activeTab === 'predict' && (
                <>
                  <div style={{ marginBottom: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px' }}>Prediction Markets</h3>
                    <p style={{ fontSize: 13, color: '#71717a', margin: 0 }}>Live markets from Polymarket</p>
                  </div>

                  {polymarketLoading && (
                    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                      <Loader2 size={32} color="#6366f1" style={{ animation: 'spin 1s linear infinite', marginBottom: 12 }} />
                      <div style={{ fontSize: 14, color: '#71717a' }}>Searching Polymarket...</div>
                    </div>
                  )}

                  {!polymarketLoading && polymarketResults.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '48px 24px', background: '#09090b', borderRadius: 12, border: '1px solid #27272a' }}>
                      <DollarSign size={32} color="#3f3f46" style={{ marginBottom: 12 }} />
                      <div style={{ fontSize: 14, color: '#71717a', marginBottom: 8 }}>No active markets found</div>
                      <a href={`https://polymarket.com/search?query=${encodeURIComponent(selectedEvent.searchTerms?.[0] || selectedEvent.title)}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#6366f1', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        Search Polymarket <ExternalLink size={12} />
                      </a>
                    </div>
                  )}

                  {!polymarketLoading && polymarketResults.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {polymarketResults.map(market => {
                        const yesPrice = market.outcomePrices ? Math.round(parseFloat(market.outcomePrices[0]) * 100) : null;
                        const noPrice = yesPrice ? 100 - yesPrice : null;
                        return (
                          <a key={market.id} href={`https://polymarket.com/event/${market.slug}`} target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: '#09090b', border: '1px solid #27272a', borderRadius: 12, padding: 16, textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ fontSize: 14, fontWeight: 500, color: '#fafafa', marginBottom: 12 }}>{market.question}</div>
                            {yesPrice !== null && (
                              <div style={{ display: 'flex', gap: 8 }}>
                                <div style={{ flex: yesPrice, background: 'rgba(16,185,129,0.2)', borderRadius: 6, padding: '8px 12px', textAlign: 'center' }}>
                                  <div style={{ fontSize: 18, fontWeight: 700, color: '#10b981' }}>{yesPrice}¢</div>
                                  <div style={{ fontSize: 10, color: '#71717a' }}>Yes</div>
                                </div>
                                <div style={{ flex: noPrice, background: 'rgba(239,68,68,0.2)', borderRadius: 6, padding: '8px 12px', textAlign: 'center' }}>
                                  <div style={{ fontSize: 18, fontWeight: 700, color: '#ef4444' }}>{noPrice}¢</div>
                                  <div style={{ fontSize: 10, color: '#71717a' }}>No</div>
                                </div>
                              </div>
                            )}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
