# QuantumCalc

Next-gen scientific calculator, graphing engine, and interactive AI-powered math assistant designed for deep space engineering and advanced scientific modeling.

QuantumCalc combines a high-precision symbolic math parser, a dynamic Cartesian graphing engine, a robust engineering metrics suite, and step-by-step AI math analysis to solve advanced engineering problems.

## Features

- **Precision Engine**: Scientific computations supporting trigonometric functions, logs, powers, roots, and angle mode conversions (DEG/RAD).
- **Interactive Graphing**: Live rendering of complex algebraic functions and expressions.
- **AI Math Assistant**: Explains step-by-step solutions for algebraic, calculus, and physics expressions.
- **Engineering Dashboard**: Telemetry dashboard tracking calculation states, system parameters, and constants.

---

## Run Locally

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Startup

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY="your_api_key_here"
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Technologies Used

- **Frontend**: React, TypeScript, TailwindCSS, Lucide Icons, Motion (Framer Motion)
- **Backend**: Express, Node.js, TSX, `@google/genai`
- **Bundler/Dev Server**: Vite
