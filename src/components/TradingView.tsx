import { memo, useEffect, useRef } from "react";

function TradingViewWidget({ symbol }: { symbol: string }) {
  const container = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
          "autosize": true,
          "width": "100%",
          "height": "100%",
          "symbol": "${symbol}",
          "interval": "30",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "backgroundColor": "rgba(19, 19, 19, 1)",
          "gridColor": "rgba(42, 46, 57, 0.5)",
          "hide_top_toolbar": false,
          "withdateranges": true,
          "hide_legend": false,
          "allow_symbol_change": false,
          "calendar": false,
          "studies": [],
          "hide_volume": false,
          "support_host": "https://www.tradingview.com"
        }`;
    if (container.current) container.current.appendChild(script);
    scriptLoaded.current = true;

    return () => {
      if (container.current && script.parentNode === container.current) {
        container.current.removeChild(script);
      }
      scriptLoaded.current = false;
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container " ref={container}>
      <div className="tradingview-widget-container__widget rounded"></div>
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
}

export default memo(TradingViewWidget);
