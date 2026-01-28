# FinCal - Financial Events Calendar

A modern financial events calendar that aggregates earnings, economic data, Fed meetings, crypto events, and IPOs in one place.

## 🚀 Quick Deploy to Vercel (No Coding Required!)

### Step 1: Create Free Accounts
1. Go to [github.com](https://github.com) and create a free account
2. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account

### Step 2: Upload to GitHub
1. Log into GitHub
2. Click the **+** icon in the top right → **New repository**
3. Name it `fincal` (or whatever you want)
4. Keep it **Public** (or Private if you prefer)
5. Click **Create repository**
6. On the next page, click **"uploading an existing file"**
7. Drag and drop ALL the files from this folder
8. Click **Commit changes**

### Step 3: Deploy to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import** next to your `fincal` repository
3. Click **Deploy**
4. Wait 1-2 minutes...
5. 🎉 Your site is live! Vercel gives you a URL like `fincal-xyz.vercel.app`

### Step 4: Custom Domain (Optional)
1. Buy a domain from [Namecheap](https://namecheap.com) (~$10/year for .com)
2. In Vercel dashboard → Your project → Settings → Domains
3. Add your domain and follow their DNS instructions

---

## 📁 Project Structure

```
fincal-app/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.js        # Root layout with metadata
│   └── page.js          # Main calendar component
├── package.json         # Dependencies
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── README.md            # This file
```

---

## 🛠 Local Development (Optional)

If you want to run this locally and make changes:

### Prerequisites
- Install [Node.js](https://nodejs.org) (LTS version)
- Install [VS Code](https://code.visualstudio.com) (optional but recommended)

### Setup
```bash
# Navigate to project folder
cd fincal-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔮 Next Steps to Build a Real Business

### Phase 1: Launch MVP (Current)
- [x] Calendar with events
- [x] Category filtering
- [x] Watchlist
- [x] Research/articles section
- [ ] Deploy to Vercel ← YOU ARE HERE

### Phase 2: Add Real Data
- [ ] Integrate earnings data API (Finnhub, Alpha Vantage)
- [ ] Add economic calendar API (Trading Economics)
- [ ] Crypto events from CoinGecko/CoinMarketCal
- [ ] News API for articles (NewsAPI, Benzinga)

### Phase 3: User Accounts
- [ ] Add authentication (Clerk, NextAuth)
- [ ] Save watchlists to database (Supabase, PlanetScale)
- [ ] Email/push notifications

### Phase 4: Monetization
- [ ] Free tier (basic calendar)
- [ ] Pro tier ($9.99/mo) - alerts, full research
- [ ] API access for developers

---

## 📊 Recommended APIs for Real Data

| Data Type | API | Cost |
|-----------|-----|------|
| Earnings | [Finnhub](https://finnhub.io) | Free tier available |
| Economic | [Trading Economics](https://tradingeconomics.com/api) | $50+/mo |
| Crypto | [CoinGecko](https://coingecko.com/api) | Free |
| News | [NewsAPI](https://newsapi.org) | Free for dev |

---

## 💬 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs

Good luck with your launch! 🚀
