import { useState } from "react";
import { BatteryVisual } from "./components/BatteryVisual";
import { StatGrid } from "./components/StatGrid";
import { StateDisplay } from "./components/StateDisplay";
import { SimulatorControls } from "./components/SimulatorControls";
import useBattery from "./hooks/useBattery";
import styles from "./App.module.css";

export default function App() {
  const [levelPct, setLevelPct] = useState(72);
  const [charging, setCharging] = useState(false);
  const [supported, setSupported] = useState(true);
  const level = supported ? levelPct / 100 : null;

  const realBattery = useBattery();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.hookName}>
          <span className={styles.accent}>use</span>
          Battery
          <span className={styles.accent}>()</span>
        </h1>
        <span className={styles.badge}>Hook Preview</span>
      </header>

      <div className={styles.container}>
        {/* Left Column: Real Hook State */}
        <div className={styles.column}>
          <section
            className={
              realBattery.supported
                ? styles.card
                : `${styles.card} ${styles.dimmed}`
            }
          >
            <p className={styles.cardLabel}>Real Hook Output</p>
            <BatteryVisual
              level={realBattery.level}
              charging={realBattery.charging}
              supported={realBattery.supported}
            />
            <StatGrid
              charging={realBattery.charging}
              supported={realBattery.supported}
            />
          </section>

          {!realBattery.supported && !realBattery.loading && (
            <p className={styles.unsupportedMsg}>
              Your device/browser does not support the Battery Status API.
            </p>
          )}

          <StateDisplay
            supported={realBattery.supported}
            loading={realBattery.loading}
            level={realBattery.level}
            charging={realBattery.charging}
          />
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Middle Column: Simulated State */}
        <div className={styles.column}>
          <section
            className={
              supported ? styles.card : `${styles.card} ${styles.dimmed}`
            }
          >
            <p className={styles.cardLabel}>Simulated State</p>
            <BatteryVisual
              level={level}
              charging={charging}
              supported={supported}
            />
            <StatGrid charging={charging} supported={supported} />
          </section>

          {!supported && (
            <p className={styles.unsupportedMsg}>
              supported: false — hook returns null for all battery values
            </p>
          )}

          <StateDisplay
            supported={supported}
            loading={false}
            level={level}
            charging={supported ? charging : null}
          />
        </div>

        {/* Right Column: Simulated Controls */}
        <div className={styles.column}>
          <SimulatorControls
            level={levelPct}
            charging={charging}
            supported={supported}
            onLevel={(v) => setLevelPct(v)}
            onCharge={() => setCharging((c) => !c)}
            onSupport={() => setSupported((s) => !s)}
          />
        </div>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://github.com/JustCodeDaily/useBattery"
          target="_blank"
          rel="noreferrer"
          className={styles.githubBtn}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          View on GitHub
        </a>
      </footer>
    </div>
  );
}
