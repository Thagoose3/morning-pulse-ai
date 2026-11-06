import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { TickerMarquee } from './components/TickerMarquee';
import { MorningBriefing } from './components/MorningBriefing';
import { MarketPulse } from './components/MarketPulse';
import { WatchlistGrid } from './components/WatchlistGrid';
import { AddTickerModal } from './components/AddTickerModal';
import { Footer } from './components/Footer';
import { ReadingProgress } from './components/ReadingProgress';
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
    <div className="min-h-screen bg-tea-pattern text-[#3d2e24] flex flex-col font-sans selection:bg-[#c5dec9] selection:text-[#1e4d30]">
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
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10 sm:space-y-12">

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
