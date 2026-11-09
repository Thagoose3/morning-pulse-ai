import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { TickerMarquee } from './components/TickerMarquee';
import { MorningBriefing } from './components/MorningBriefing';
import { MarketPulse } from './components/MarketPulse';
import { WatchlistGrid } from './components/WatchlistGrid';
import { AddTickerModal } from './components/AddTickerModal';
import { Footer } from './components/Footer';
import { ReadingProgress } from './components/ReadingProgress';
import { useSpotlight } from './components/ui';
import { TickerItem, MorningBriefingData } from './types';
import {
  getSavedWatchlist,
  saveWatchlist,
  fetchLiveMarketUpdates
} from './services/marketData';
import {
  loadMorningBriefing,
  generateDynamicBriefing
} from './services/aiBriefingService';

export const App: React.FC = () => {
  const [tickers, setTickers] = useState<TickerItem[]>(() => getSavedWatchlist());
  // The editorial briefing (headline, bullets, catalysts) comes from the daily cron JSON.
  const [baseBriefing, setBaseBriefing] = useState<MorningBriefingData>(() => generateDynamicBriefing(tickers));
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  useSpotlight();

  // Live market mood (sentiment / fear-greed / movers) is recomputed from current prices,
  // while the written briefing from the morning JSON is kept intact.
  const briefing = useMemo<MorningBriefingData>(() => {
    const live = generateDynamicBriefing(tickers);
    return {
      ...baseBriefing,
      sentiment: live.sentiment,
      fearGreedIndex: live.fearGreedIndex,
      topGainers: live.topGainers,
      topLosers: live.topLosers
    };
  }, [baseBriefing, tickers]);

  // Sync to localStorage whenever tickers change
  useEffect(() => {
    saveWatchlist(tickers);
  }, [tickers]);

  // Fetch live updates from Yahoo Finance
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const updated = await fetchLiveMarketUpdates(tickers);
      setTickers(updated);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Refresh failed', err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  }, [tickers]);

  // Initial load: Load briefing and fetch live Yahoo Finance prices immediately
  useEffect(() => {
    loadMorningBriefing(tickers).then((data) => {
      setBaseBriefing(data);
    });
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-refresh every 60s
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 60000);
    return () => clearInterval(interval);
  }, [handleRefresh]);

  const handleAddTicker = (newTicker: TickerItem) => {
    setTickers((prev) => [newTicker, ...prev]);
  };

  const handleRemoveTicker = (id: string) => {
    setTickers((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="relative min-h-screen night-backdrop grain text-[#f3ebe0] flex flex-col font-sans overflow-x-clip">
      {/* Ambient aurora (matcha + amber steam) */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[820px] max-h-[820px] rounded-full bg-[#3f8f5a]/20 blur-[120px] animate-aurora" />
        <div className="absolute top-[10%] -right-[15%] w-[55vw] h-[55vw] max-w-[760px] max-h-[760px] rounded-full bg-[#c99a5b]/15 blur-[120px] animate-aurora-slow" />
        <div className="absolute inset-x-0 top-0 h-[70vh] bg-gradient-to-b from-transparent via-transparent to-[#0e0b09]" />
      </div>
      <ReadingProgress />

      {/* Top Subtle Ticker Marquee */}
      <TickerMarquee tickers={tickers} />

      {/* Clean Header */}
      <Header
        briefing={briefing}
        onRefresh={handleRefresh}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        isRefreshing={isRefreshing}
        lastUpdated={lastUpdated}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12 pb-16 space-y-24 sm:space-y-32">

        {/* Morning 45-Second AI Briefing */}
        <section id="briefing" className="scroll-mt-24">
          <MorningBriefing
            briefing={briefing}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        </section>

        {/* Market Pulse: mood gauge, movers & today's agenda */}
        <section id="pulse" className="scroll-mt-24">
          <MarketPulse briefing={briefing} tickers={tickers} />
        </section>

        {/* Real-Time Watchlist Grid */}
        <section id="watchlist" className="scroll-mt-24">
          <WatchlistGrid
            tickers={tickers}
            onRemoveTicker={handleRemoveTicker}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        </section>

      </main>

      {/* Modal for adding custom ticker */}
      <AddTickerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTicker={handleAddTicker}
      />

      {/* Clean Footer */}
      <Footer />

    </div>
  );
};

export default App;
