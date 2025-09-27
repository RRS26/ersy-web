import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';

const Chart = () => {
  const chartContainerRef = useRef();
  const chart = useRef();
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [interval, setInterval] = useState('1h');
  const [limit, setLimit] = useState(500);

  const loadData = React.useCallback(async (series) => {
    try {
      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
      );
      const data = await response.json();
      
      const formattedData = data.map(item => ({
        time: item[0] / 1000, // Конвертируем в секунды
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4]),
      }));

      series.setData(formattedData);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  }, [symbol, interval, limit]);

  useEffect(() => {
    if (chartContainerRef.current && !chart.current) {
      chart.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
        layout: {
          background: { color: '#1e1e1e' },
          textColor: '#d1d4dc',
        },
        grid: {
          vertLines: { color: '#2B2B43' },
          horzLines: { color: '#2B2B43' },
        },
        crosshair: {
          mode: 1,
        },
        rightPriceScale: {
          borderColor: '#485158',
        },
        timeScale: {
          borderColor: '#485158',
        },
      });

      // Добавляем серию данных
      const candlestickSeries = chart.current.addSeries({
        type: 'Candlestick',
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      });

      // Загружаем данные
      loadData(candlestickSeries);
    }

    return () => {
      if (chart.current) {
        chart.current.remove();
        chart.current = null;
      }
    };
  }, [loadData]);

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };

  const handleIntervalChange = (e) => {
    setInterval(e.target.value);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
  };

  const handleLoadData = () => {
    if (chart.current && chart.current.series().length > 0) {
      const series = chart.current.series()[0];
      loadData(series);
    }
  };

  return (
    <div className="chart-container">
      <div className="controls">
        <div className="control-group">
          <label>Символ:</label>
          <select value={symbol} onChange={handleSymbolChange}>
            <option value="BTCUSDT">BTC/USDT</option>
            <option value="ETHUSDT">ETH/USDT</option>
            <option value="BNBUSDT">BNB/USDT</option>
            <option value="ADAUSDT">ADA/USDT</option>
          </select>
        </div>

        <div className="control-group">
          <label>Интервал:</label>
          <select value={interval} onChange={handleIntervalChange}>
            <option value="1m">1 минута</option>
            <option value="5m">5 минут</option>
            <option value="15m">15 минут</option>
            <option value="1h">1 час</option>
            <option value="4h">4 часа</option>
            <option value="1d">1 день</option>
          </select>
        </div>

        <div className="control-group">
          <label>Лимит:</label>
          <select value={limit} onChange={handleLimitChange}>
            <option value={100}>100</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
          </select>
        </div>

        <button onClick={handleLoadData} className="load-btn">
          Загрузить данные
        </button>
      </div>

      <div 
        ref={chartContainerRef} 
        style={{ 
          width: '100%', 
          height: '400px',
          marginTop: '20px',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      />
    </div>
  );
};

export default Chart;