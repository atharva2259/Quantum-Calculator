export type TabType = "CALC" | "GRAPH" | "HISTORY" | "ENGINE";

export interface GraphFunction {
  id: string;
  name: string; // e.g. "f(x) Sine"
  expr: string; // e.g. "sin(x) * math.pi"
  color: string; // e.g. "#06b6d4"
  amplitude: number;
  shiftX: number;
  scaleY: number;
  visible: boolean;
}

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  type?: string;
  timestamp: string;
}

export interface SolveStep {
  num: string;
  title: string;
  math: string;
  desc: string;
}

export interface SolveResponse {
  type: string;
  explanation: string;
  steps: SolveStep[];
  finalResults: string[];
  suggestion: string;
  suggestionOptions: string[];
}

export interface PresetConstant {
  symbol: string;
  name: string;
  value: string;
  unit: string;
}
