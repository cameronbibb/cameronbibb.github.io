import React, { useState } from "react";

interface Swatch {
  label: string;
  cssVar: string;
  className: string;
  default: string;
}

const primary: Swatch[] = [
  { label: "primary-50", cssVar: "--color-primary-50", className: "bg-primary-50", default: "#faf3e9" },
  { label: "primary-400", cssVar: "--color-primary-400", className: "bg-primary-400", default: "#dec29c" },
  { label: "primary-500", cssVar: "--color-primary-500", className: "bg-primary-500", default: "#d2b48c" },
  { label: "primary-600", cssVar: "--color-primary-600", className: "bg-primary-600", default: "#b08f62" },
  { label: "primary-900", cssVar: "--color-primary-900", className: "bg-primary-900", default: "#5a4326" },
];

const accent: Swatch[] = [
  { label: "accent-50", cssVar: "--color-accent-50", className: "bg-accent-50", default: "#fbf0e9" },
  { label: "accent-400", cssVar: "--color-accent-400", className: "bg-accent-400", default: "#e0946c" },
  { label: "accent-500", cssVar: "--color-accent-500", className: "bg-accent-500", default: "#c4622d" },
  { label: "accent-600", cssVar: "--color-accent-600", className: "bg-accent-600", default: "#984a20" },
  { label: "accent-900", cssVar: "--color-accent-900", className: "bg-accent-900", default: "#43210e" },
];

const dark: Swatch[] = [
  { label: "dark-900", cssVar: "--color-dark-900", className: "bg-dark-900", default: "#0f172a" },
  { label: "dark-800", cssVar: "--color-dark-800", className: "bg-dark-800", default: "#1e293b" },
  { label: "dark-700", cssVar: "--color-dark-700", className: "bg-dark-700", default: "#334155" },
  { label: "dark-600", cssVar: "--color-dark-600", className: "bg-dark-600", default: "#475569" },
  { label: "dark-500", cssVar: "--color-dark-500", className: "bg-dark-500", default: "#64748b" },
];

const gray: Swatch[] = [
  { label: "gray-100", cssVar: "--color-gray-100", className: "bg-gray-100", default: "#f1f5f9" },
  { label: "gray-200", cssVar: "--color-gray-200", className: "bg-gray-200", default: "#e2e8f0" },
  { label: "gray-300", cssVar: "--color-gray-300", className: "bg-gray-300", default: "#cbd5e1" },
  { label: "gray-400", cssVar: "--color-gray-400", className: "bg-gray-400", default: "#94a3b8" },
  { label: "gray-500", cssVar: "--color-gray-500", className: "bg-gray-500", default: "#64748b" },
  { label: "gray-600", cssVar: "--color-gray-600", className: "bg-gray-600", default: "#475569" },
  { label: "gray-700", cssVar: "--color-gray-700", className: "bg-gray-700", default: "#334155" },
  { label: "gray-800", cssVar: "--color-gray-800", className: "bg-gray-800", default: "#1e293b" },
  { label: "gray-900", cssVar: "--color-gray-900", className: "bg-gray-900", default: "#0f172a" },
];

const misc: Swatch[] = [
  { label: "navy-950", cssVar: "--color-navy-950", className: "bg-navy-950", default: "oklch(0.15 0.03 260)" },
];

const allSwatches = [...primary, ...accent, ...dark, ...gray, ...misc];

function ColorGroup({ title, swatches, values, onChange, onReset }: {
  title: string;
  swatches: Swatch[];
  values: Record<string, string>;
  onChange: (cssVar: string, value: string) => void;
  onReset: (cssVar: string) => void;
}) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
        {title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {swatches.map((s) => {
          const value = values[s.cssVar] ?? s.default;
          const changed = value !== s.default;
          const isHex = /^#([0-9a-f]{3}){1,2}$/i.test(value);
          return (
            <div key={s.cssVar} className="border border-dark-700/50 rounded-lg overflow-hidden">
              <div className={`h-16 ${s.className}`} />
              <div className="p-3 space-y-2 bg-dark-800/50">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-white">{s.label}</span>
                  {changed && (
                    <button
                      onClick={() => onReset(s.cssVar)}
                      className="text-[10px] text-primary-400 hover:text-primary-500"
                    >
                      reset
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {isHex ? (
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => onChange(s.cssVar, e.target.value)}
                      className="w-6 h-6 rounded border border-dark-600 bg-transparent cursor-pointer"
                    />
                  ) : null}
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(s.cssVar, e.target.value)}
                    className="w-full min-w-0 text-[11px] bg-dark-900 text-gray-300 rounded px-1.5 py-1 border border-dark-700 focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const ThemePlayground: React.FC = () => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const setVar = (cssVar: string, value: string) => {
    setValues((prev) => ({ ...prev, [cssVar]: value }));
    document.documentElement.style.setProperty(cssVar, value);
  };

  const resetVar = (cssVar: string) => {
    setValues((prev) => {
      const next = { ...prev };
      delete next[cssVar];
      return next;
    });
    document.documentElement.style.removeProperty(cssVar);
  };

  const resetAll = () => {
    allSwatches.forEach((s) => document.documentElement.style.removeProperty(s.cssVar));
    setValues({});
  };

  const changedCount = Object.keys(values).length;

  const copyTheme = async () => {
    const lines = allSwatches.map(
      (s) => `  ${s.cssVar}: ${values[s.cssVar] ?? s.default};`
    );
    const css = `@theme {\n${lines.join("\n")}\n}`;
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-16">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-gray-400 max-w-prose">
          Edit any value below to preview it live across this page. Changes are
          not saved to <code className="text-primary-400">global.css</code> —
          use "Copy updated @theme block" and paste the values you want to keep.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          {changedCount > 0 && (
            <button
              onClick={resetAll}
              className="text-xs text-gray-400 hover:text-white border border-dark-600 rounded px-3 py-1.5"
            >
              Reset all ({changedCount})
            </button>
          )}
          <button
            onClick={copyTheme}
            className="text-xs bg-primary-500 hover:bg-primary-600 text-white rounded px-3 py-1.5 transition-colors"
          >
            {copied ? "Copied!" : "Copy updated @theme block"}
          </button>
        </div>
      </div>

      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-white">Colors</h2>
        <ColorGroup title="Primary" swatches={primary} values={values} onChange={setVar} onReset={resetVar} />
        <ColorGroup title="Accent" swatches={accent} values={values} onChange={setVar} onReset={resetVar} />
        <ColorGroup title="Dark" swatches={dark} values={values} onChange={setVar} onReset={resetVar} />
        <ColorGroup title="Gray" swatches={gray} values={values} onChange={setVar} onReset={resetVar} />
        <ColorGroup title="Misc" swatches={misc} values={values} onChange={setVar} onReset={resetVar} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">In context</h2>
        <div className="flex flex-wrap items-center gap-4 p-6 rounded-lg bg-dark-800/50 border border-dark-700/50">
          <button className="bg-primary-500 hover:bg-primary-600 transition-colors text-white text-sm font-medium rounded-md px-4 py-2">
            Primary button
          </button>
          <span className="text-primary-400 font-medium">Accent text</span>
          <span className="text-primary-500 hover:text-primary-600 transition-colors underline cursor-pointer">
            Link
          </span>
          <div className="bg-dark-800 border border-dark-700 rounded-md px-4 py-2 text-gray-300 text-sm">
            Card on dark-800
          </div>
          <button className="bg-accent-500 hover:bg-accent-600 transition-colors text-white text-sm font-medium rounded-md px-4 py-2">
            Accent button
          </button>
          <span className="text-accent-400 font-medium">Accent text</span>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Font — --font-body</h2>
        <p className="text-xs text-gray-500">"Inter Variable", sans-serif</p>
        <div className="space-y-2 p-6 rounded-lg bg-dark-800/50 border border-dark-700/50">
          <p className="font-body font-light text-3xl text-white">Aa Bb Cc — font-light</p>
          <p className="font-body font-normal text-3xl text-white">Aa Bb Cc — font-normal</p>
          <p className="font-body font-medium text-3xl text-white">Aa Bb Cc — font-medium</p>
          <p className="font-body font-bold text-3xl text-white">Aa Bb Cc — font-bold</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Font — --font-display</h2>
        <p className="text-xs text-gray-500">"Fraunces Variable", ui-serif, Georgia, serif</p>
        <div className="space-y-2 p-6 rounded-lg bg-dark-800/50 border border-dark-700/50">
          <p className="font-display font-normal text-3xl text-white">Aa Bb Cc — font-normal</p>
          <p className="font-display italic text-3xl text-white">Aa Bb Cc — italic</p>
          <p className="font-display font-bold text-3xl text-white">Aa Bb Cc — font-bold</p>
          <p className="font-display font-black text-3xl text-white">Aa Bb Cc — font-black</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Font — --font-mono</h2>
        <p className="text-xs text-gray-500">"IBM Plex Mono", monospace</p>
        <div className="space-y-2 p-6 rounded-lg bg-dark-800/50 border border-dark-700/50">
          <p className="font-mono font-normal text-3xl text-white">Aa Bb Cc — font-normal</p>
          <p className="font-mono font-medium text-3xl text-white">Aa Bb Cc — font-medium</p>
          <p className="font-mono font-bold text-3xl text-white">Aa Bb Cc — font-bold</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Animations</h2>
        <div className="flex flex-wrap gap-6 p-6 rounded-lg bg-dark-800/50 border border-dark-700/50">
          <div className="space-y-2">
            <div
              key={`fade-${animKey}`}
              className="animate-fade-in w-32 h-16 rounded-md bg-primary-500 flex items-center justify-center text-white text-xs"
            >
              fade-in
            </div>
          </div>
          <div className="space-y-2">
            <div
              key={`slide-${animKey}`}
              className="animate-slide-up w-32 h-16 rounded-md bg-primary-500 flex items-center justify-center text-white text-xs"
            >
              slide-up
            </div>
          </div>
          <button
            onClick={() => setAnimKey((k) => k + 1)}
            className="self-start text-xs text-gray-400 hover:text-white border border-dark-600 rounded px-3 py-1.5"
          >
            Replay
          </button>
        </div>
      </section>
    </div>
  );
};
