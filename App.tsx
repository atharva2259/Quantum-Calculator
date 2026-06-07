import React, { useState } from "react";
import { TabType, HistoryItem } from "./types";
import Calculator from "./components/Calculator";
import GraphingEngine from "./components/GraphingEngine";
import AiAssistant from "./components/AiAssistant";
import EngineeringMode from "./components/EngineeringMode";
import { Calculator as CalcIcon, TrendingUp, Brain, Cpu, History, Settings, X, Check, Star } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("CALC");
  const [historyList, setHistory] = useState<HistoryItem[]>([
    { id: "1", expression: "sin(45) + log(100)", result: "4.7071", type: "Trig", timestamp: "07:44 PM" },
    { id: "2", expression: "Math.sqrt(16) * 5", result: "20", type: "Arithmetic", timestamp: "07:42 PM" },
  ]);
  const [angleMode, setAngleMode] = useState<"DEG" | "RAD">("RAD");
  const [aiSolveExpression, setAiSolveExpression] = useState<string>("x² - 5x + 6 = 0");
  const [showHistoryDrawer, setShowHistoryDrawer] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [themeMode, setThemeMode] = useState<"space" | "neon" | "monochrome">("space");

  const handleAddHistory = (item: HistoryItem) => {
    setHistory((prev) => [item, ...prev]);
  };

  // Helper bridging Calculator button clicks straight to the step-by-step assistant tab
  const handleSolveExpressionFromCalc = (expr: string) => {
    setAiSolveExpression(expr);
    setActiveTab("HISTORY");
  };

  return (
    <div className="min-h-screen text-on-surface font-sans flex flex-col justify-between overflow-x-hidden antialiased bg-[#050811] relative select-none">
      
      {/* Background Decorative Cosmic Nebulas/Ambient Glow */}
      <div 
        className="fixed top-[-10%] right-[-10%] w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none z-0 transition-opacity duration-1000"
        style={{ opacity: themeMode === "neon" ? 0.9 : 0.4 }}
      ></div>
      <div 
        className="fixed bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-[#8B5CF6]/5 rounded-full blur-[100px] pointer-events-none z-0 transition-opacity duration-1000"
        style={{ opacity: themeMode === "neon" ? 0.9 : 0.3 }}
      ></div>

      {/* Floating stars effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

      {/* TopAppBar header */}
      <header className="fixed top-0 left-0 right-0 w-full bg-surface-container/40 backdrop-blur-xl border-b border-glass-border shadow-glow-blue flex items-center justify-between px-6 h-16 z-40 select-none">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHistoryDrawer(true)}
            className="flex items-center justify-center p-2 rounded-xl bg-surface-graphite/60 border border-glass-border hover:border-secondary hover:text-white cursor-pointer active:scale-95 duration-200 transition-all text-secondary"
            title="Open calculation history"
          >
            <History size={18} />
          </button>
          
          <h1 className="font-display-result text-2xl text-primary tracking-tighter cursor-pointer flex items-center gap-1 select-none">
            QuantumCalc
          </h1>
        </div>

        {/* Global info indicators & custom theme panel triggers */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex bg-surface-container-high/60 px-3 py-1 rounded-full border border-glass-border select-none">
            <span className="text-[10px] uppercase font-mono tracking-widest text-secondary font-bold">Processing: 98%</span>
          </div>

          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="flex items-center justify-center p-2 rounded-xl bg-surface-graphite/60 border border-glass-border hover:border-secondary hover:text-white cursor-pointer active:scale-95 duration-200 transition-all text-secondary"
            title="Quantum Dashboard Controls"
          >
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* Settings popover contextual config */}
      {settingsOpen && (
        <div className="fixed top-20 right-6 w-72 glass-panel p-5 rounded-2xl border border-secondary/20 shadow-2xl z-50 animate-in fade-in slide-in-from-top-3 duration-200 bg-surface-container/90 backdrop-blur-2xl">
          <div className="flex justify-between items-center pb-3 border-b border-glass-border mb-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Engine Customization</h4>
            <button 
              onClick={() => setSettingsOpen(false)}
              className="text-outline hover:text-white transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-outline uppercase tracking-wider block">Visual Presets</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setThemeMode("space")}
                  className={`px-2 py-1.5 rounded-lg text-[9px] font-mono uppercase font-bold text-center border cursor-pointer transition-all ${
                    themeMode === "space"
                      ? "bg-secondary-container text-on-secondary-container border-secondary/40 shadow-sm"
                      : "bg-[#0b0f19] border-glass-border text-outline hover:text-white"
                  }`}
                >
                  Space Void
                </button>
                <button
                  onClick={() => setThemeMode("neon")}
                  className={`px-2 py-1.5 rounded-lg text-[9px] font-mono uppercase font-bold text-center border cursor-pointer transition-all ${
                    themeMode === "neon"
                      ? "bg-secondary-container text-on-secondary-container border-secondary/40 shadow-sm"
                      : "bg-[#0b0f19] border-glass-border text-outline hover:text-white"
                  }`}
                >
                  Hyper Neon
                </button>
                <button
                  onClick={() => setThemeMode("monochrome")}
                  className={`px-2 py-1.5 rounded-lg text-[9px] font-mono uppercase font-bold text-center border cursor-pointer transition-all ${
                    themeMode === "monochrome"
                      ? "bg-secondary-container text-on-secondary-container border-secondary/40 shadow-sm"
                      : "bg-[#0b0f19] border-glass-border text-outline hover:text-white"
                  }`}
                >
                  Onyx Mono
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-mono text-outline/50 uppercase block">Engine Revision</span>
              <span className="text-xs text-secondary font-medium font-mono">v4.2-Quantum.Stable</span>
            </div>
          </div>
        </div>
      )}

      {/* Left drawer sliding panel representing history logs */}
      {showHistoryDrawer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-start transition-opacity duration-300">
          <div className="w-80 bg-[#070b13] border-r border-glass-border h-full flex flex-col justify-between p-6 shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-glass-border">
                <div className="flex items-center gap-2 text-primary">
                  <History size={18} />
                  <span className="font-bold text-sm uppercase tracking-wide">Operation Logs</span>
                </div>
                <button 
                  onClick={() => setShowHistoryDrawer(false)}
                  className="p-1 px-2 rounded-lg bg-surface-graphite text-outline hover:text-white border border-glass-border cursor-pointer transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* logs list view */}
              <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-1">
                {historyList.length === 0 ? (
                  <p className="text-xs text-outline/50 text-center py-10 font-mono">Logs are totally empty.</p>
                ) : (
                  historyList.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setAiSolveExpression(item.expression);
                        setActiveTab("HISTORY");
                        setShowHistoryDrawer(false);
                      }}
                      className="p-3.5 bg-surface-container-low/40 hover:bg-white/[0.04] border border-glass-border rounded-xl cursor-pointer hover:border-secondary transition-all"
                    >
                      <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest text-[#adc6ff]/50">
                        <span>{item.type || "Symbolic"}</span>
                        <span>{item.timestamp}</span>
                      </div>
                      <p className="text-sm font-mono text-white mt-1 select-all truncate">{item.expression}</p>
                      <p className="text-sm font-mono text-secondary tracking-tight font-semibold mt-0.5 truncate">= {item.result}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-glass-border">
              <button
                onClick={() => setHistory([])}
                className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl font-mono text-[10px] uppercase font-bold tracking-widest cursor-pointer transition-colors"
              >
                Flush Logs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main workspace container holding screen content */}
      <main className="flex-grow pt-24 pb-28 px-4 sm:px-8 max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-start">
        {activeTab === "CALC" && (
          <Calculator
            onAddHistory={handleAddHistory}
            angleMode={angleMode}
            setAngleMode={setAngleMode}
            onSolveExpression={handleSolveExpressionFromCalc}
          />
        )}

        {activeTab === "GRAPH" && (
          <GraphingEngine
            angleMode={angleMode}
            setAngleMode={setAngleMode}
          />
        )}

        {activeTab === "HISTORY" && (
          <AiAssistant
            initialExpression={aiSolveExpression}
          />
        )}

        {activeTab === "ENGINE" && (
          <EngineeringMode />
        )}
      </main>

      {/* Bottom NavBar matching look and feel exactly */}
      <nav className="fixed bottom-0 left-0 right-0 w-full z-40 h-20 bg-[#070b13]/60 backdrop-blur-xl border-t border-glass-border shadow-[0_-4px_25px_rgba(6,182,212,0.12)] flex justify-around items-center px-4 rounded-t-2xl select-none">
        
        {/* Tab 1: CALC */}
        <button
          onClick={() => setActiveTab("CALC")}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer select-none active:scale-90 ${
            activeTab === "CALC"
              ? "text-primary drop-shadow-[0_0_12px_rgba(173,198,255,0.7)] scale-105"
              : "text-outline opacity-60 hover:opacity-100 hover:text-white"
          }`}
        >
          <CalcIcon size={20} className={`${activeTab === "CALC" ? "stroke-[2.5px]" : "stroke-[1.8px]"}`} />
          <span className="font-mono text-[9px] uppercase tracking-widest mt-1.5 font-bold">CALC</span>
        </button>

        {/* Tab 2: GRAPH */}
        <button
          onClick={() => setActiveTab("GRAPH")}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer select-none active:scale-90 ${
            activeTab === "GRAPH"
              ? "text-primary drop-shadow-[0_0_12px_rgba(173,198,255,0.7)] scale-105"
              : "text-outline opacity-60 hover:opacity-100 hover:text-white"
          }`}
        >
          <TrendingUp size={20} className={`${activeTab === "GRAPH" ? "stroke-[2.5px]" : "stroke-[1.8px]"}`} />
          <span className="font-mono text-[9px] uppercase tracking-widest mt-1.5 font-bold">GRAPH</span>
        </button>

        {/* Tab 3: AI SOLVE */}
        <button
          onClick={() => setActiveTab("HISTORY")}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer select-none active:scale-90 ${
            activeTab === "HISTORY"
              ? "text-primary drop-shadow-[0_0_12px_rgba(173,198,255,0.7)] scale-105"
              : "text-outline opacity-60 hover:opacity-100 hover:text-white"
          }`}
        >
          <Brain size={20} className={`${activeTab === "HISTORY" ? "stroke-[2.5px]" : "stroke-[1.8px]"}`} />
          <span className="font-mono text-[9px] uppercase tracking-widest mt-1.5 font-bold">AI SOLVER</span>
        </button>

        {/* Tab 4: ENGINE */}
        <button
          onClick={() => setActiveTab("ENGINE")}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer select-none active:scale-90 ${
            activeTab === "ENGINE"
              ? "text-primary drop-shadow-[0_0_12px_rgba(173,198,255,0.7)] scale-105"
              : "text-outline opacity-60 hover:opacity-100 hover:text-white"
          }`}
        >
          <Cpu size={20} className={`${activeTab === "ENGINE" ? "stroke-[2.5px]" : "stroke-[1.8px]"}`} />
          <span className="font-mono text-[9px] uppercase tracking-widest mt-1.5 font-bold">ENGINE</span>
        </button>

      </nav>

    </div>
  );
}
