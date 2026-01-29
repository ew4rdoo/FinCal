'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, TrendingUp, Bell, Star, ChevronLeft, ChevronRight, Search, X, Clock, Filter, Zap, Globe, Building2, Coins, BarChart3, ExternalLink, AlertCircle, FileText, BarChart2, DollarSign, Percent } from 'lucide-react';

const allEvents = [
  { id: 1, title: 'FOMC Interest Rate Decision', date: '2026-01-29', time: '14:00', category: 'central-bank', impact: 'critical', description: 'The Federal Reserve will announce its monetary policy decision.', consensus: 'Hold at 4.25%', previous: '4.25%', followers: 45200, searchTerms: ['Federal Reserve interest rate', 'FOMC decision'], relatedTickers: ['SPY', 'QQQ', 'TLT', 'GLD'],
    polymarket: { question: 'Will the Fed cut rates in January?', yesPrice: 12, url: 'https://polymarket.com/event/fed-meeting-january' }
  },
  { id: 2, title: 'Tesla Q4 Earnings', date: '2026-01-29', time: '17:00', category: 'earnings', impact: 'high', ticker: 'TSLA', description: 'Tesla reports Q4 2025 results.', consensus: '$0.78 EPS', previous: '$0.72 EPS', followers: 38100, searchTerms: ['Tesla earnings Q4', 'TSLA stock'], relatedTickers: ['RIVN', 'LCID', 'F', 'GM'],
    polymarket: { question: 'Will Tesla beat Q4 earnings estimates?', yesPrice: 58, url: 'https://polymarket.com/event/tesla-q4-earnings' }
  },
  { id: 3, title: 'Microsoft Q2 Earnings', date: '2026-01-29', time: '16:00', category: 'earnings', impact: 'high', ticker: 'MSFT', description: 'Microsoft reports fiscal Q2 2026 results.', consensus: '$3.12 EPS', previous: '$2.99 EPS', followers: 29400, searchTerms: ['Microsoft earnings', 'MSFT Azure'], relatedTickers: ['GOOGL', 'AMZN', 'NVDA'],
    polymarket: { question: 'Will Microsoft beat Q2 earnings?', yesPrice: 72, url: 'https://polymarket.com/event/microsoft-q2-earnings' }
  },
  { id: 4, title: 'Apple Q1 Earnings', date: '2026-01-30', time: '16:30', category: 'earnings', impact: 'high', ticker: 'AAPL', description: 'Apple reports fiscal Q1 2026 results.', consensus: '$2.35 EPS', previous: '$2.18 EPS', followers: 52300, searchTerms: ['Apple earnings', 'AAPL iPhone'], relatedTickers: ['QCOM', 'TSM', 'AVGO'],
    polymarket: { question: 'Will Apple beat Q1 earnings?', yesPrice: 65, url: 'https://polymarket.com/event/apple-q1-earnings' }
  },
  { id: 5, title: 'US Non-Farm Payrolls', date: '2026-02-07', time: '08:30', category: 'economic', impact: 'critical', description: 'January employment data release.', consensus: '+180K', previous: '+216K', followers: 41000, searchTerms: ['non-farm payrolls', 'jobs report'], relatedTickers: ['SPY', 'DIA', 'IWM'],
    polymarket: { question: 'Will NFP exceed 200K jobs?', yesPrice: 35, url: 'https://polymarket.com/event/january-jobs-report' }
  },
  { id: 6, title: 'US CPI Inflation', date: '2026-02-12', time: '08:30', category: 'economic', impact: 'critical', description: 'January Consumer Price Index release.', consensus: '2.9% YoY', previous: '2.9% YoY', followers: 38700, searchTerms: ['CPI inflation', 'consumer price index'], relatedTickers: ['TIP', 'GLD'],
    polymarket: { question: 'Will CPI come in above 3%?', yesPrice: 22, url: 'https://polymarket.com/event/january-cpi' }
  },
  { id: 7, title: 'Bitcoin ETF Options Expiry', date: '2026-01-31', time: '16:00', category: 'crypto', impact: 'high', description: 'Monthly options expiration for spot Bitcoin ETFs.', followers: 67800, searchTerms: ['Bitcoin ETF options', 'BTC options'], relatedTickers: ['IBIT', 'FBTC', 'GBTC'],
    polymarket: { question: 'Will BTC be above $100K on Jan 31?', yesPrice: 45, url: 'https://polymarket.com/event/bitcoin-100k-january' }
  },
  { id: 8, title: 'ETHDenver 2026', date: '2026-02-28', time: '09:00', category: 'crypto', impact: 'medium', description: 'Largest Ethereum community gathering.', location: 'Denver, CO', followers: 23400, searchTerms: ['ETHDenver 2026', 'Ethereum conference'],
    polymarket: { question: 'Will ETH be above $4K by ETHDenver?', yesPrice: 38, url: 'https://polymarket.com/event/ethereum-price-february' }
  },
  { id: 9, title: 'Nvidia Q4 Earnings', date: '2026-02-26', time: '16:20', category: 'earnings', impact: 'critical', ticker: 'NVDA', description: 'Most anticipated earnings - AI chip demand focus.', consensus: '$0.89 EPS', previous: '$0.81 EPS', followers: 71200, searchTerms: ['Nvidia earnings', 'NVDA AI chips'], relatedTickers: ['AMD', 'INTC', 'TSM'],
    polymarket: { question: 'Will Nvidia beat Q4 earnings?', yesPrice: 78, url: 'https://polymarket.com/event/nvidia-q4-earnings' }
  },
  { id: 10, title: 'Amazon Q4 Earnings', date: '2026-02-06', time: '16:00', category: 'earnings', impact: 'high', ticker: 'AMZN', description: 'Amazon reports Q4 2025 results.', consensus: '$1.85 EPS', previous: '$1.43 EPS', followers: 34500, searchTerms: ['Amazon earnings', 'AMZN AWS'], relatedTickers: ['MSFT', 'GOOGL', 'WMT'],
    polymarket: { question: 'Will Amazon beat Q4 earnings?', yesPrice: 70, url: 'https://polymarket.com/event/amazon-q4-earnings' }
  },
  { id: 11, title: 'ECB Interest Rate Decision', date: '2026-02-06', time: '08:15', category: 'central-bank', impact: 'high', description: 'European Central Bank monetary policy decision.', consensus: '25bp cut expected', previous: '3.00%', followers: 18900, searchTerms: ['ECB interest rate', 'European Central Bank'], relatedTickers: ['EWG', 'FXE', 'VGK'],
    polymarket: { question: 'Will ECB cut rates in February?', yesPrice: 82, url: 'https://polymarket.com/event/ecb-february-decision' }
  },
  { id: 12, title: 'Meta Q4 Earnings', date: '2026-02-05', time: '16:00', category: 'earnings', impact: 'high', ticker: 'META', description: 'Meta reports Q4 2025 results.', consensus: '$6.82 EPS', previous: '$5.33 EPS', followers: 28700, searchTerms: ['Meta earnings', 'META Facebook'], relatedTickers: ['GOOGL', 'SNAP', 'PINS'],
    polymarket: { question: 'Will Meta beat Q4 earnings?', yesPrice: 68, url: 'https://polymarket.com/event/meta-q4-earnings' }
  },
  { id: 13, title: 'Stripe IPO', date: '2026-03-15', time: '09:30', category: 'ipo', impact: 'critical', description: 'Stripe NYSE debut - largest tech IPO since 2021.', followers: 89400, searchTerms: ['Stripe IPO', 'Stripe stock'], relatedTickers: ['PYPL', 'SQ', 'FIS'],
    polymarket: { question: 'Will Stripe IPO in Q1 2026?', yesPrice: 55, url: 'https://polymarket.com/event/stripe-ipo-2026' }
  },
  { id: 14, title: 'Consensus 2026', date: '2026-05-14', time: '09:00', category: 'crypto', impact: 'medium', description: 'Major crypto conference', location: 'Austin, TX', followers: 15600, searchTerms: ['Consensus crypto 2026'] },
  { id: 15, title: 'OPEC+ Meeting', date: '2026-02-01', time: '10:00', category: 'global', impact: 'high', description: 'Oil production quota decision', followers: 21800, searchTerms: ['OPEC meeting oil'], relatedTickers: ['USO', 'XLE', 'OXY'],
    polymarket: { question: 'Will OPEC cut production?', yesPrice: 40, url: 'https://polymarket.com/event/opec-february' }
  },
  { id: 16, title: 'Alphabet Q4 Earnings', date: '2026-02-04', time: '16:00', category: 'earnings', impact: 'high', ticker: 'GOOGL', description: 'Google parent reports Q4.', followers: 31200, searchTerms: ['Google earnings', 'GOOGL stock'], relatedTickers: ['META', 'MSFT'],
    polymarket: { question: 'Will Alphabet beat Q4 earnings?', yesPrice: 64, url: 'https://polymarket.com/event/alphabet-q4-earnings' }
  },
  { id: 17, title: 'JPMorgan Q4 Earnings', date: '2026-01-31', time: '07:00', category: 'earnings', impact: 'high', ticker: 'JPM', description: 'Largest US bank reports.', followers: 19800, searchTerms: ['JPMorgan earnings'], relatedTickers: ['BAC', 'WFC', 'GS'] },
  { id: 18, title: 'Bank of Japan Decision', date: '2026-01-30', time: '23:00', category: 'central-bank', impact: 'high', description: 'BOJ monetary policy statement', followers: 16400, searchTerms: ['Bank of Japan', 'BOJ decision'], relatedTickers: ['EWJ', 'DXJ'],
    polymarket: { question: 'Will BOJ raise rates in January?', yesPrice: 28, url: 'https://polymarket.com/event/boj-january' }
  },
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
};

const generateResearchLinks = (event) => {
  const links = [];
  const q = event.searchTerms?.[0] || event.title;
  
  links.push({ id: 'google', source: 'Google News', desc: 'Latest news coverage', icon: '🔍', url: `https://news.google.com/search?q=${encodeURIComponent(q)}` });
  
  if (event.ticker) {
    links.push({ id: 'yahoo', source: 'Yahoo Finance', desc: `${event.ticker} news & data`, icon: '📈', url: `https://finance.yahoo.com/quote/${event.ticker}/` });
    links.push({ id: 'seeking', source: 'Seeking Alpha', desc: `${event.ticker} analysis`, icon: '📊', url: `https://seekingalpha.com/symbol/${event.ticker}` });
    links.push({ id: 'mwatch', source: 'MarketWatch', desc: `${event.ticker} quotes`, icon: '📰', url: `https://www.marketwatch.com/investing/stock/${event.ticker.toLowerCase()}` });
  }
  
  if (event.category === 'crypto') {
    links.push({ id: 'coindesk', source: 'CoinDesk', desc: 'Crypto news', icon: '₿', url: `https://www.coindesk.com/search?s=${encodeURIComponent(q)}` });
    links.push({ id: 'cointegraph', source: 'Cointelegraph', desc: 'Blockchain coverage', icon: '🪙', url: `https://cointelegraph.com/search?query=${encodeURIComponent(q)}` });
  }
  
  if (event.category === 'central-bank' || event.category === 'economic') {
    links.push({ id: 'reuters', source: 'Reuters', desc: 'Breaking news', icon: '🌐', url: `https://www.reuters.com/site-search/?query=${encodeURIComponent(q)}` });
    links.push({ id: 'bloomberg', source: 'Bloomberg', desc: 'Markets & data', icon: '📱', url: `https://www.bloomberg.com/search?query=${encodeURIComponent(q)}` });
  }
  
  return links;
};

const generateSocialLinks = (event) => {
  const q = event.searchTerms?.[0] || event.title;
  return [
    { id: 'x', label: 'Twitter/X', icon: '𝕏', url: `https://twitter.com/search?q=${encodeURIComponent(q)}&f=live` },
    { id: 'reddit', label: 'Reddit', icon: '🔴', url: event.ticker ? `https://www.reddit.com/r/wallstreetbets/search/?q=${event.ticker}` : `https://www.reddit.com/search/?q=${encodeURIComponent(q)}` },
    { id: 'yt', label: 'YouTube', icon: '▶️', url: `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}` },
  ];
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlist, setWatchlist] = useState([1, 4, 5, 9, 13]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 28));
  const [impactFilter, setImpactFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [researchLinks, setResearchLinks] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    if (selectedEvent) {
      setResearchLinks(generateResearchLinks(selectedEvent));
      setSocialLinks(generateSocialLinks(selectedEvent));
    }
  }, [selectedEvent]);

  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      const matchCat = selectedCategory === 'all' || event.category === selectedCategory;
      const matchSearch = !searchQuery || event.title.toLowerCase().includes(searchQuery.toLowerCase()) || event.ticker?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchImpact = impactFilter === 'all' || event.impact === impactFilter;
      return matchCat && matchSearch && matchImpact;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [selectedCategory, searchQuery, impactFilter]);

  const upcomingEvents = filteredEvents.filter(e => new Date(e.date) >= new Date('2026-01-28')).slice(0, 10);
  const criticalEvents = allEvents.filter(e => e.impact === 'critical' && new Date(e.date) >= new Date('2026-01-28')).slice(0, 5);

  const toggleWatchlist = (id, e) => { if (e) e.stopPropagation(); setWatchlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]); };
  const formatFollowers = (n) => n >= 1000 ? (n/1000).toFixed(1)+'K' : n;
  const getCategoryInfo = (id) => categories.find(c => c.id === id) || categories[0];
  const openEventModal = (event) => { setSelectedEvent(event); setActiveTab('overview'); };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear(), month = date.getMonth();
    const firstDay = new Date(year, month, 1), lastDay = new Date(year, month + 1, 0);
    const days = [], startDay = firstDay.getDay();
    for (let i = startDay - 1; i >= 0; i--) days.push({ day: new Date(year, month, -i).getDate(), isCurrentMonth: false, date: new Date(year, month, -i) });
    for (let i = 1; i <= lastDay.getDate(); i++) days.push({ day: i, isCurrentMonth: true, date: new Date(year, month, i) });
    while (days.length < 42) { const d = days.length - lastDay.getDate() - startDay + 1; days.push({ day: d, isCurrentMonth: false, date: new Date(year, month + 1, d) }); }
    return days;
  };

  const getEventsForDate = (date) => filteredEvents.filter(e => e.date === date.toISOString().split('T')[0]);
  const days = getDaysInMonth(currentMonth);
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  return (
    <div style={{ minHeight: '100vh', background: '#09090b' }}>
      <header style={{ borderBottom: '1px solid #27272a', background: 'rgba(9,9,11,0.95)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Calendar size={20} color="#fff" /></div>
              <span style={{ fontSize: 20, fontWeight: 700 }}>FinCal</span>
            </div>
            <div style={{ position: 'relative', width: 400 }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#71717a' }} />
              <input type="text" placeholder="Search events, tickers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '10px 12px 10px 40px', background: '#18181b', border: '1px solid #27272a', borderRadius: 8, color: '#fafafa', fontSize: 14, outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowFilters(!showFilters)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: showFilters ? '#27272a' : 'transparent', border: '1px solid #27272a', borderRadius: 8, color: '#fafafa', fontSize: 14, cursor: 'pointer' }}><Filter size={16} /> Filters</button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#6366f1', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}><Bell size={16} /> Alerts</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4, paddingBottom: 12, overflowX: 'auto' }}>
            {categories.map(cat => { const Icon = cat.icon; const isActive = selectedCategory === cat.id; return (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: isActive ? '#27272a' : 'transparent', border: 'none', borderRadius: 6, color: isActive ? '#fafafa' : '#a1a1aa', fontSize: 14, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                <Icon size={16} color={isActive ? cat.color : '#71717a'} /> {cat.label}
              </button>
            ); })}
          </div>
        </div>
      </header>

      {showFilters && (
        <div style={{ background: '#18181b', borderBottom: '1px solid #27272a', padding: '16px 24px' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>IMPACT LEVEL</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['all','critical','high','medium'].map(level => (
                <button key={level} onClick={() => setImpactFilter(level)} style={{ padding: '6px 12px', background: impactFilter === level ? '#27272a' : 'transparent', border: '1px solid #27272a', borderRadius: 6, color: impactFilter === level ? '#fafafa' : '#a1a1aa', fontSize: 13, cursor: 'pointer', textTransform: 'capitalize' }}>{level === 'all' ? 'All Levels' : level}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24, display: 'flex', gap: 24 }}>
        <main style={{ flex: 1 }}>
          {criticalEvents.length > 0 && (
            <div style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.02))', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}><AlertCircle size={18} color="#ef4444" /><span style={{ fontSize: 14, fontWeight: 600, color: '#ef4444' }}>Market-Moving Events</span></div>
              <div style={{ display: 'flex', gap: 12, overflowX: 'auto' }}>
                {criticalEvents.map(event => (
                  <div key={event.id} onClick={() => openEventModal(event)} style={{ minWidth: 220, background: '#18181b', borderRadius: 10, padding: 16, cursor: 'pointer', border: '1px solid #27272a' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{event.ticker && <span style={{ color: '#6366f1' }}>${event.ticker} </span>}{event.title.substring(0, 25)}</div>
                    <div style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · {event.time}</div>
                    {event.polymarket && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '4px 8px', borderRadius: 4, width: 'fit-content' }}>
                        <DollarSign size={12} /> {event.polymarket.yesPrice}% Yes
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ background: '#18181b', borderRadius: 12, border: '1px solid #27272a', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #27272a' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} style={{ background: 'transparent', border: '1px solid #27272a', borderRadius: 6, padding: 8, cursor: 'pointer', color: '#fafafa', display: 'flex' }}><ChevronLeft size={18} /></button>
                <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0, minWidth: 180, textAlign: 'center' }}>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} style={{ background: 'transparent', border: '1px solid #27272a', borderRadius: 6, padding: 8, cursor: 'pointer', color: '#fafafa', display: 'flex' }}><ChevronRight size={18} /></button>
              </div>
              <button onClick={() => setCurrentMonth(new Date(2026, 0, 28))} style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #27272a', borderRadius: 6, color: '#a1a1aa', fontSize: 13, cursor: 'pointer' }}>Today</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #27272a' }}>{dayNames.map(d => <div key={d} style={{ padding: 10, textAlign: 'center', fontSize: 12, color: '#71717a' }}>{d}</div>)}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {days.map((dayInfo, idx) => {
                const events = getEventsForDate(dayInfo.date);
                const isToday = dayInfo.date.toDateString() === new Date(2026, 0, 28).toDateString();
                return (
                  <div key={idx} style={{ minHeight: 100, padding: 8, borderRight: (idx+1)%7 !== 0 ? '1px solid #27272a' : 'none', borderBottom: idx < 35 ? '1px solid #27272a' : 'none', background: isToday ? 'rgba(99,102,241,0.08)' : 'transparent', opacity: dayInfo.isCurrentMonth ? 1 : 0.4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, fontSize: 13, color: isToday ? '#fff' : '#a1a1aa', background: isToday ? '#6366f1' : 'transparent' }}>{dayInfo.day}</span>
                      {events.some(e => e.impact === 'critical') && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {events.slice(0, 3).map(ev => {
                        const cat = getCategoryInfo(ev.category);
                        return <div key={ev.id} onClick={() => openEventModal(ev)} style={{ fontSize: 11, padding: '4px 6px', background: `${cat.color}15`, borderLeft: `2px solid ${cat.color}`, borderRadius: '0 4px 4px 0', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#e4e4e7' }}>{ev.ticker ? `$${ev.ticker}` : ev.title.split(' ').slice(0,2).join(' ')}</div>;
                      })}
                      {events.length > 3 && <div style={{ fontSize: 10, color: '#71717a', paddingLeft: 6 }}>+{events.length - 3} more</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        <aside style={{ width: 360, flexShrink: 0 }}>
          <div style={{ background: '#18181b', borderRadius: 12, border: '1px solid #27272a', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid #27272a' }}><Star size={16} color="#f59e0b" fill="#f59e0b" /><span style={{ fontSize: 14, fontWeight: 600, marginLeft: 8 }}>Watchlist</span><span style={{ fontSize: 12, color: '#71717a', background: '#27272a', padding: '2px 8px', borderRadius: 100, marginLeft: 8 }}>{watchlist.length}</span></div>
            <div style={{ maxHeight: 280, overflowY: 'auto' }}>
              {allEvents.filter(e => watchlist.includes(e.id)).map(ev => (
                <div key={ev.id} onClick={() => openEventModal(ev)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #27272a' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: impactConfig[ev.impact]?.color || '#6b7280' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{ev.ticker && <span style={{ color: '#6366f1' }}>${ev.ticker} </span>}{ev.title.substring(0, 20)}</div>
                    <div style={{ fontSize: 11, color: '#71717a' }}>{new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {ev.time}</div>
                  </div>
                  <button onClick={(e) => toggleWatchlist(ev.id, e)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f59e0b' }}><Star size={14} fill="#f59e0b" /></button>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#18181b', borderRadius: 12, border: '1px solid #27272a' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 16px', borderBottom: '1px solid #27272a' }}><Clock size={16} color="#6366f1" /><span style={{ fontSize: 14, fontWeight: 600 }}>Upcoming</span></div>
            {upcomingEvents.slice(0, 6).map(ev => {
              const cat = getCategoryInfo(ev.category); const Icon = cat.icon;
              return (
                <div key={ev.id} onClick={() => openEventModal(ev)} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', cursor: 'pointer', borderBottom: '1px solid #27272a' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={18} color={cat.color} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 10, fontWeight: 600, color: impactConfig[ev.impact]?.color || '#6b7280', textTransform: 'uppercase' }}>{ev.impact}</span>
                      {ev.polymarket && <span style={{ fontSize: 10, color: '#10b981' }}>📊 {ev.polymarket.yesPrice}%</span>}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4 }}>{ev.ticker && <span style={{ color: '#6366f1' }}>${ev.ticker} </span>}{ev.title.substring(0, 22)}</div>
                    <div style={{ fontSize: 12, color: '#71717a', marginTop: 4 }}>{new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {ev.time}</div>
                  </div>
                  <button onClick={(e) => toggleWatchlist(ev.id, e)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: watchlist.includes(ev.id) ? '#f59e0b' : '#3f3f46' }}><Star size={14} fill={watchlist.includes(ev.id) ? '#f59e0b' : 'none'} /></button>
                </div>
              );
            })}
          </div>
        </aside>
      </div>

      {selectedEvent && (
        <div onClick={() => setSelectedEvent(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#18181b', borderRadius: 16, border: '1px solid #27272a', maxWidth: 640, width: '100%', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #27272a' }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: impactConfig[selectedEvent.impact]?.color, background: impactConfig[selectedEvent.impact]?.bg, padding: '4px 10px', borderRadius: 4, textTransform: 'uppercase' }}>{selectedEvent.impact}</span>
                <span style={{ fontSize: 11, color: '#71717a', background: '#27272a', padding: '4px 10px', borderRadius: 4 }}>{getCategoryInfo(selectedEvent.category).label}</span>
              </div>
              <button onClick={() => setSelectedEvent(null)} style={{ background: '#27272a', border: 'none', borderRadius: 6, padding: 8, cursor: 'pointer', color: '#a1a1aa', display: 'flex' }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', borderBottom: '1px solid #27272a' }}>
              {[{ id: 'overview', label: 'Overview', icon: BarChart2 }, { id: 'research', label: 'Research', icon: FileText, count: researchLinks.length }, { id: 'predict', label: 'Predict', icon: DollarSign }].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px', background: 'transparent', border: 'none', borderBottom: activeTab === tab.id ? '2px solid #6366f1' : '2px solid transparent', color: activeTab === tab.id ? '#fafafa' : '#71717a', fontSize: 14, cursor: 'pointer' }}>
                  <tab.icon size={16} /> {tab.label} {tab.count > 0 && <span style={{ fontSize: 11, background: activeTab === tab.id ? '#6366f1' : '#27272a', padding: '2px 6px', borderRadius: 4 }}>{tab.count}</span>}
                </button>
              ))}
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
              {activeTab === 'overview' && (<>
                {selectedEvent.ticker && <div style={{ fontSize: 14, color: '#6366f1', fontWeight: 600, marginBottom: 8 }}>${selectedEvent.ticker}</div>}
                <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 12px' }}>{selectedEvent.title}</h2>
                {selectedEvent.description && <p style={{ fontSize: 14, color: '#a1a1aa', marginBottom: 24, lineHeight: 1.6 }}>{selectedEvent.description}</p>}
                
                {/* Polymarket Preview in Overview */}
                {selectedEvent.polymarket && (
                  <a href={selectedEvent.polymarket.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(16,185,129,0.02))', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 12, padding: 16, marginBottom: 20, textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 24, height: 24, background: '#10b981', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DollarSign size={14} color="#fff" /></div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#10b981' }}>PREDICTION MARKET</span>
                      <ExternalLink size={12} color="#10b981" style={{ marginLeft: 'auto' }} />
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#fafafa', marginBottom: 8 }}>{selectedEvent.polymarket.question}</div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <div style={{ flex: 1, background: 'rgba(16,185,129,0.2)', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                        <div style={{ fontSize: 24, fontWeight: 700, color: '#10b981' }}>{selectedEvent.polymarket.yesPrice}%</div>
                        <div style={{ fontSize: 11, color: '#71717a' }}>Yes</div>
                      </div>
                      <div style={{ flex: 1, background: 'rgba(239,68,68,0.2)', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                        <div style={{ fontSize: 24, fontWeight: 700, color: '#ef4444' }}>{100 - selectedEvent.polymarket.yesPrice}%</div>
                        <div style={{ fontSize: 11, color: '#71717a' }}>No</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: '#71717a', marginTop: 10, textAlign: 'center' }}>Trade on Polymarket →</div>
                  </a>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                  <div style={{ background: '#27272a', borderRadius: 10, padding: 14 }}><div style={{ fontSize: 11, color: '#71717a', marginBottom: 4 }}>DATE</div><div style={{ fontSize: 15, fontWeight: 500 }}>{new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div></div>
                  <div style={{ background: '#27272a', borderRadius: 10, padding: 14 }}><div style={{ fontSize: 11, color: '#71717a', marginBottom: 4 }}>TIME</div><div style={{ fontSize: 15, fontWeight: 500 }}>{selectedEvent.time} ET</div></div>
                </div>
                {(selectedEvent.consensus || selectedEvent.previous) && (
                  <div style={{ background: '#09090b', borderRadius: 10, padding: 16, marginBottom: 20 }}>
                    <div style={{ fontSize: 12, color: '#71717a', marginBottom: 12 }}>EXPECTATIONS</div>
                    <div style={{ display: 'flex', gap: 32 }}>
                      {selectedEvent.consensus && <div><div style={{ fontSize: 11, color: '#71717a' }}>Consensus</div><div style={{ fontSize: 20, fontWeight: 600, color: '#10b981' }}>{selectedEvent.consensus}</div></div>}
                      {selectedEvent.previous && <div><div style={{ fontSize: 11, color: '#71717a' }}>Previous</div><div style={{ fontSize: 20, fontWeight: 600, color: '#a1a1aa' }}>{selectedEvent.previous}</div></div>}
                    </div>
                  </div>
                )}
                {selectedEvent.relatedTickers?.length > 0 && (
                  <div style={{ marginBottom: 20 }}><div style={{ fontSize: 12, color: '#71717a', marginBottom: 10 }}>RELATED TICKERS</div><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{selectedEvent.relatedTickers.map(t => <span key={t} style={{ fontSize: 13, color: '#6366f1', background: 'rgba(99,102,241,0.1)', padding: '6px 12px', borderRadius: 6 }}>${t}</span>)}</div></div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 13, color: '#71717a' }}><Bell size={14} /><span><strong style={{ color: '#fafafa' }}>{formatFollowers(selectedEvent.followers)}</strong> tracking</span></div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={(e) => toggleWatchlist(selectedEvent.id, e)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', background: watchlist.includes(selectedEvent.id) ? '#f59e0b' : '#27272a', border: 'none', borderRadius: 10, color: watchlist.includes(selectedEvent.id) ? '#000' : '#fafafa', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}><Star size={16} fill={watchlist.includes(selectedEvent.id) ? '#000' : 'none'} />{watchlist.includes(selectedEvent.id) ? 'Watching' : 'Add to Watchlist'}</button>
                  <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', background: '#6366f1', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}><Bell size={16} /> Set Alert</button>
                </div>
              </>)}

              {activeTab === 'research' && (<>
                <div style={{ marginBottom: 20 }}><h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px' }}>Research & News</h3><p style={{ fontSize: 13, color: '#71717a', margin: 0 }}>Click to open in new tab</p></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {researchLinks.map(link => (
                    <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, background: '#09090b', borderRadius: 10, border: '1px solid #27272a', textDecoration: 'none', color: 'inherit' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: '#27272a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{link.icon}</div>
                      <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: '#fafafa' }}>{link.source}</div><div style={{ fontSize: 12, color: '#71717a' }}>{link.desc}</div></div>
                      <ExternalLink size={18} color="#6366f1" />
                    </a>
                  ))}
                </div>
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #27272a' }}>
                  <div style={{ fontSize: 12, color: '#71717a', marginBottom: 12 }}>COMMUNITY</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {socialLinks.map(link => (<a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: '#27272a', borderRadius: 8, color: '#fafafa', fontSize: 13, textDecoration: 'none' }}>{link.icon} {link.label} <ExternalLink size={12} /></a>))}
                  </div>
                </div>
              </>)}

              {activeTab === 'predict' && (<>
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px' }}>Prediction Markets</h3>
                  <p style={{ fontSize: 13, color: '#71717a', margin: 0 }}>See what the market predicts & trade your conviction</p>
                </div>

                {selectedEvent.polymarket ? (
                  <>
                    <a href={selectedEvent.polymarket.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: '#09090b', border: '1px solid #27272a', borderRadius: 12, padding: 20, textDecoration: 'none', color: 'inherit', marginBottom: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <img src="https://polymarket.com/favicon.ico" alt="Polymarket" style={{ width: 24, height: 24, borderRadius: 4 }} onError={(e) => e.target.style.display = 'none'} />
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#fafafa' }}>Polymarket</span>
                        <span style={{ fontSize: 11, color: '#71717a', marginLeft: 'auto' }}>Live Market</span>
                        <ExternalLink size={14} color="#6366f1" />
                      </div>
                      
                      <div style={{ fontSize: 16, fontWeight: 600, color: '#fafafa', marginBottom: 16 }}>{selectedEvent.polymarket.question}</div>
                      
                      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                        <div style={{ flex: 1, background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))', borderRadius: 10, padding: 16, textAlign: 'center', border: '1px solid rgba(16,185,129,0.3)' }}>
                          <div style={{ fontSize: 32, fontWeight: 700, color: '#10b981' }}>{selectedEvent.polymarket.yesPrice}¢</div>
                          <div style={{ fontSize: 12, color: '#71717a', marginTop: 4 }}>Yes</div>
                        </div>
                        <div style={{ flex: 1, background: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05))', borderRadius: 10, padding: 16, textAlign: 'center', border: '1px solid rgba(239,68,68,0.3)' }}>
                          <div style={{ fontSize: 32, fontWeight: 700, color: '#ef4444' }}>{100 - selectedEvent.polymarket.yesPrice}¢</div>
                          <div style={{ fontSize: 12, color: '#71717a', marginTop: 4 }}>No</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', background: '#6366f1', borderRadius: 8, color: '#fff', fontWeight: 500 }}>
                        <DollarSign size={16} /> Trade on Polymarket
                      </div>
                    </a>

                    <div style={{ padding: 16, background: 'rgba(99,102,241,0.08)', borderRadius: 10, border: '1px solid rgba(99,102,241,0.2)' }}>
                      <div style={{ fontSize: 13, color: '#a5b4fc', marginBottom: 4 }}>💡 How it works</div>
                      <div style={{ fontSize: 13, color: '#71717a' }}>Buy "Yes" shares if you think this will happen, "No" if you don't. Prices reflect the crowd's probability estimate. If you're right, shares pay out $1 each.</div>
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '48px 24px', background: '#09090b', borderRadius: 12, border: '1px solid #27272a' }}>
                    <DollarSign size={32} color="#3f3f46" style={{ marginBottom: 12 }} />
                    <div style={{ fontSize: 14, color: '#71717a', marginBottom: 8 }}>No prediction market found for this event</div>
                    <a href={`https://polymarket.com/search?query=${encodeURIComponent(selectedEvent.title)}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#6366f1', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      Search Polymarket <ExternalLink size={12} />
                    </a>
                  </div>
                )}

                <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #27272a' }}>
                  <div style={{ fontSize: 12, color: '#71717a', marginBottom: 12 }}>OTHER PREDICTION PLATFORMS</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <a href={`https://kalshi.com/search?query=${encodeURIComponent(selectedEvent.searchTerms?.[0] || selectedEvent.title)}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: '#09090b', borderRadius: 10, border: '1px solid #27272a', textDecoration: 'none', color: 'inherit' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#27272a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🎯</div>
                      <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 500, color: '#fafafa' }}>Kalshi</div><div style={{ fontSize: 12, color: '#71717a' }}>CFTC-regulated prediction markets</div></div>
                      <ExternalLink size={16} color="#6366f1" />
                    </a>
                    <a href={`https://www.predictit.org/`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: '#09090b', borderRadius: 10, border: '1px solid #27272a', textDecoration: 'none', color: 'inherit' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#27272a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📊</div>
                      <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 500, color: '#fafafa' }}>PredictIt</div><div style={{ fontSize: 12, color: '#71717a' }}>Political prediction markets</div></div>
                      <ExternalLink size={16} color="#6366f1" />
                    </a>
                    <a href={`https://metaculus.com/questions/?search=${encodeURIComponent(selectedEvent.searchTerms?.[0] || selectedEvent.title)}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: '#09090b', borderRadius: 10, border: '1px solid #27272a', textDecoration: 'none', color: 'inherit' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#27272a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🔮</div>
                      <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 500, color: '#fafafa' }}>Metaculus</div><div style={{ fontSize: 12, color: '#71717a' }}>Forecasting community</div></div>
                      <ExternalLink size={16} color="#6366f1" />
                    </a>
                  </div>
                </div>
              </>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
