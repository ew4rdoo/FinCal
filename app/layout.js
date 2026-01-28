import './globals.css'

export const metadata = {
  title: 'FinCal - Financial Events Calendar',
  description: 'Track earnings, economic data, Fed meetings, crypto events, and IPOs in one place. Never miss a market-moving event.',
  keywords: 'financial calendar, earnings calendar, economic calendar, fed meeting, crypto events, ipo calendar',
  openGraph: {
    title: 'FinCal - Financial Events Calendar',
    description: 'Track earnings, economic data, Fed meetings, crypto events, and IPOs in one place.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
