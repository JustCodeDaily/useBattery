# useBattery

A React hook that reads your device's battery status in real time — level, charging state, and time estimates. Built on the [Battery Status API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API) with automatic event listener cleanup and graceful fallback for unsupported browsers.

This repo includes the hook itself plus an interactive simulator UI so you can preview every state without a real device.

---

## Running the demo

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

The simulator lets you drag battery level, toggle charging, and flip the supported flag — all updating the live state object in real time.

> The Battery API may be blocked sandboxed environments (iframes, CodeSandbox, etc.), which is why the demo uses simulated state instead of the real hook. In a normal browser tab, `useBattery()` reads live device values.

For Demo Open [https://use-battery.vercel.app/]

---

## The hook

`src/hooks/useBattery.js` — drop this into any React project.

### Usage

```jsx
import { useBattery } from "./hooks/useBattery";

function BatteryStatus() {
  const { supported, loading, level, charging } = useBattery();

  if (!supported) return <p>Battery API not supported in this browser.</p>;
  if (loading)    return <p>Reading battery…</p>;

  return (
    <div>
      <p>{Math.round(level * 100)}%</p>
      <p>{charging ? "Charging" : "Discharging"}</p>
    </div>
  );
}
```

### Return value

| Field | Type | Default | Description |
|---|---|---|---|
| `supported` | `boolean` | `true` | Flips to `false` if `navigator.getBattery` doesn't exist |
| `loading` | `boolean` | `true` | `true` until the first battery read completes |
| `level` | `number \| null` | `null` | `0.0` to `1.0` — multiply by 100 for percentage |
| `charging` | `boolean \| null` | `null` | `true` when plugged in |

All fields start as `null` while `loading: true`. If `supported: false`, they stay `null` permanently.


## How it works

```js
// 1. Safe browser check — Firefox, Safari, and IE all fail here
if (!("getBattery" in navigator)) {
  setState({ supported: false, loading: false, ... });
  return;
}

// 2. One function handles both the initial read and all 4 change events
const sync = () => setState({ level: battery.level, charging: battery.charging, ... });

navigator.getBattery().then((b) => {
  battery = b;
  sync(); // read immediately on mount

  b.addEventListener("levelchange",           sync);
  b.addEventListener("chargingchange",        sync);
  b.addEventListener("chargingtimechange",    sync);
  b.addEventListener("dischargingtimechange", sync);
});

// 3. Cleanup on unmount — removes all 4 listeners, no memory leaks
return () => {
  battery.removeEventListener("levelchange",           sync);
  battery.removeEventListener("chargingchange",        sync);
  battery.removeEventListener("chargingtimechange",    sync);
  battery.removeEventListener("dischargingtimechange", sync);
};
```

Hooks used: `useState` + `useEffect`. Nothing else.

---

## Project structure

```
src/
├── hooks/
│   └── useBattery.js          ← The hook
├── components/
│   ├── BatteryVisual.jsx      ← Battery bar + big percentage number
│   ├── StatGrid.jsx           ← Charging / Charge-in / Empty-in chips
│   ├── StateDisplay.jsx       ← Live syntax-highlighted state object
│   └── SimulatorControls.jsx  ← Slider + toggle buttons
├── App.jsx                    ← Wires everything, owns simulator state
├── index.css                  ← Design tokens + global keyframes
└── main.jsx                   ← React entry point
```

Every component has a paired `.module.css` file. No inline styles except where level or color must be dynamic.

---

## Browser support

| Browser | Supported |
|---|---|
| Chrome / Chromium | ✅ v38+ |
| Edge (Chromium) | ✅ v79+ |
| Opera | ✅ v25+ |
| Firefox | ❌ Dropped in v52 |
| Safari | ❌ Never |
| IE | ❌ Never |

Requires **HTTPS** in production. Localhost is exempt.

---

## References

- [MDN — Battery Status API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API)
- [MDN — Navigator.getBattery()](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getBattery)
- [Can I Use — Battery Status API](https://caniuse.com/battery-status)
