import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { TickerMarquee } from './components/TickerMarquee';
import { MorningBriefing } from './components/MorningBriefing';
import { WatchlistGrid } from './components/WatchlistGrid';
import { AddTickerModal } from './components/AddTickerModal';
import { Footer } from './components/Footer';
import { TickerItem, MorningBriefingData } from './types';
import { 
  getSavedWatchlist, 
  saveWatchlist, 
  fetchLiveCryptoUpdates 
} from './services/marketData';
import { 
  loadMorningBriefing, 
  generateDynamicBriefing 
} from './services/aiBriefingService';

export const App: React.FC = () => {
  const [tickers, setTickers] = useState<TickerItem[]>(() => getSavedWatchlist());
  const [briefing, setBriefing] = useState<MorningBriefingData>(() => generateDynamicBriefing(tickers));
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sync to localStorage whenever tickers change
  useEffect(() => {
    saveWatchlist(tickers);
  }, [tickers]);

  // Load briefing initially
  useEffect(() => {
    loadMorningBriefing(tickers).then((data) => {
      setBriefing(data);
    });
  }, []);

  // Fetch live updates
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const updated = await fetchLiveCryptoUpdates(tickers);
      setTickers(updated);
      const newBriefing = generateDynamicBriefing(updated);
      setBriefing(newBriefing);
    } catch (err) {
      console.error('Refresh failed', err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  }, [tickers]);

  // Auto-refresh crypto every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 30000);
    return () => clearInterval(interval);
  }, [handleRefresh]);

  const handleAddTicker = (newTicker: TickerItem) => {
    const updated = [newTicker, ...tickers];
    setTickers(updated);
    setBriefing(generateDynamicBriefing(updated));
  };

  const handleRemoveTicker = (id: string) => {
    const updated = tickers.filter((t) => t.id !== id);
    setTickers(updated);
    setBriefing(generateDynamicBriefing(updated));
  };

  return (
    <div className="min-h-screen bg-[#090c13] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Subtle Ticker Marquee */}
      <TickerMarquee tickers={tickers} />

      {/* Clean Header */}
      <Header
        briefing={briefing}
        onRefresh={handleRefresh}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        isRefreshing={isRefreshing}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Morning 45-Second AI Briefing */}
        <section>
          <MorningBriefing
            briefing={briefing}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        </section>

        {/* Real-Time Watchlist Grid */}
        <section>
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
