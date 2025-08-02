import {
  PriceUp,
  PriceDown,
  VolatilityHigh,
  VolatilityLow,
  PriceFlat,
} from "./icons/TileIcons";
const Legend = () => {
  return (
    <div className="flex flex-row text-md gap-2 items-center justify-evenly rounded-lg border p-2">
      <div className="flex flex-row space-x-2">
        <span className="font-bold">Price</span>{" "}
        <div className="flex flex-row flex-wrap">
          <PriceUp />
          <span className="">Up</span>
          <PriceDown />
          <span className="">Down</span>
          <PriceFlat />
          <span className="">Flat</span>
        </div>
      </div>
      <div className="flex flex-row space-x-2">
        <div className="flex flex-row flex-wrap">
          <VolatilityHigh />{" "}
          <div className="w-4 h-4 bg-orange-400 rounded-full"></div>{" "}
          <VolatilityLow />
        </div>
        <span>Volatility High/Med/Low</span>
      </div>
      <div className="flex flex-row space-x-2">
        <div className="flex flex-row flex-wrap space-x-1">
          <div className="w-4 h-4 bg-green-200 rounded"></div>
          <div className="w-4 h-4 bg-yellow-200 rounded"></div>
          <div className="w-4 h-4 bg-red-400 rounded"></div>
        </div>
        <span>Volume Low/Med/High</span>
      </div>
    </div>
  );
};
export default Legend;
