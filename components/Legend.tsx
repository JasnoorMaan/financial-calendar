import {
  PriceUp,
  PriceDown,
  VolatilityHigh,
  VolatilityLow,
  VolatilityWave,
  PriceFlat,
} from "./icons/TileIcons";

const Legend = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
        {/* Price Section */}
        <div className="flex flex-col justify-center items-center space-y-3 min-w-fit">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Price Movement
          </h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 shadow-sm border border-slate-100 dark:border-slate-600">
              <PriceUp />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Up
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 shadow-sm border border-slate-100 dark:border-slate-600">
              <PriceFlat />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Flat
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 shadow-sm border border-slate-100 dark:border-slate-600">
              <PriceDown />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Down
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-16 bg-slate-200 dark:bg-slate-600"></div>

        {/* Volatility Section */}
        <div className="flex justify-center items-center flex-col space-y-3 min-w-fit">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Volatility
          </h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 shadow-sm border border-slate-100 dark:border-slate-600">
              <VolatilityHigh />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                High
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 shadow-sm border border-slate-100 dark:border-slate-600">
              <VolatilityWave />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Medium
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 shadow-sm border border-slate-100 dark:border-slate-600">
              <VolatilityLow />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Low
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-16 bg-slate-200 dark:bg-slate-600"></div>

        {/* Volume Section */}
        <div className="flex justify-center items-center flex-col space-y-3 min-w-fit">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Volume
          </h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 shadow-sm border border-slate-100 dark:border-slate-600">
              <div className="w-5 h-5 bg-green-200 rounded-md shadow-sm border border-emerald-200"></div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Low
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 shadow-sm border border-slate-100 dark:border-slate-600">
              <div className="w-5 h-5 bg-yellow-200 rounded-md shadow-sm border border-amber-200"></div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Medium
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 shadow-sm border border-slate-100 dark:border-slate-600">
              <div className="w-5 h-5 bg-red-400 rounded-md shadow-sm border border-rose-200"></div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                High
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Legend;
