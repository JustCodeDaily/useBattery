import { useState } from "react";
import { BatteryVisual } from "./components/BatteryVisual";
import { StatGrid } from "./components/StatGrid";
import { StateDisplay } from "./components/StateDisplay";
import { SimulatorControls } from "./components/SimulatorControls";
import styles from "./App.module.css";

export default function App() {
  const [levelPct, setLevelPct] = useState(72);
  const [charging, setCharging] = useState(false);
  const [supported, setSupported] = useState(true);
  const level = supported ? levelPct / 100 : null;

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

      <section
        className={supported ? styles.card : `${styles.card} ${styles.dimmed}`}
      >
        <p className={styles.cardLabel}>Battery State</p>
        <BatteryVisual
          level={level}
          charging={charging}
          supported={supported}
        />
        <StatGrid
          charging={charging}
          supported={supported}
        />
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

      <SimulatorControls
        level={levelPct}
        charging={charging}
        supported={supported}
        onLevel={(v) => setLevelPct(v)}
        onCharge={() => setCharging((c) => !c)}
        onSupport={() => setSupported((s) => !s)}
      />
    </div>
  );
}
