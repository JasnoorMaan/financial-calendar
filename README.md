1. Win Rate
   What it is: The percentage of trading days with positive returns out of total trading days.
   Formula: Win Rate = (Number of Profitable Days / Total Trading Days) × 100

2. Sharpe Ratio
   What it is: A risk-adjusted return measure that tells you how much extra return you get for the volatility (risk) you endure.
   Formula: Sharpe Ratio = (Average Daily Return / Daily Volatility) × √252
   Interpretation:

   > 1.0: Good risk-adjusted returns
   > 2.0: Very good
   > 3.0: Excellent
   > < 0: You're losing money relative to risk
   > Note: The √252 factor annualizes the ratio (252 = typical trading days per year).

3. Daily Volatility
   What it is: Measures how much the stock price fluctuates from day to day.
   A) Intraday Volatility (per day):
   const volatility = ((data.high - data.low) / data.open) \* 100;
   This measures how much the price moved within a single trading day.

B) Daily Return Volatility (across days):
const volatility = Math.sqrt(
dailyMetrics.reduce((sum, day) =>
sum + Math.pow(day.return - avgDailyReturn, 2), 0
) / dailyMetrics.length
);
This measures the standard deviation of daily returns.
Example: If a stock opens at $100, hits a high of $105, and low of $95, the intraday volatility is ((105-95)/100) × 100 = 10%.

4. RSI (Relative Strength Index)
   What it is: A momentum oscillator that measures the speed and change of price movements, ranging from 0 to 100.
   RS = Average Gain / Average Loss (over 14 days typically)
   RSI = 100 - (100 / (1 + RS))

private static calculateRSI(data: CalcedData[], currentIndex: number, period: number = 14): number | undefined {
if (currentIndex < period) return undefined;

const gains: number[] = [];
const losses: number[] = [];

for (let i = currentIndex - period + 1; i <= currentIndex; i++) {
const change = data[i].close - data[i - 1].close;
if (change > 0) {
gains.push(change);
losses.push(0);
} else {
gains.push(0);
losses.push(Math.abs(change));
}
}

const avgGain = gains.reduce((sum, gain) => sum + gain, 0) / period;
const avgLoss = losses.reduce((sum, loss) => sum + loss, 0) / period;

if (avgLoss === 0) return 100;

const rs = avgGain / avgLoss;
return 100 - (100 / (1 + rs));
}

Interpretation:
RSI > 70: Potentially overbought (sell signal)
RSI < 30: Potentially oversold (buy signal)
RSI 50: Neutral momentum
