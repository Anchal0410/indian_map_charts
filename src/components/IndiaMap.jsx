import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useState, useEffect } from "react";

const IndiaMap = ({ onStateClick }) => {
  const [geoData, setGeoData] = useState(null);
  const [stateData, setStateData] = useState([]);
  const [tooltipContent, setTooltipContent] = useState("");

  useEffect(() => {
    fetch("/india-map.json")
      .then((response) => response.json())
      .then((data) => setGeoData(data))
      .catch((error) => console.error("Error loading India map:", error));

    fetch("/stateData.json")
      .then((response) => response.json())
      .then((data) => setStateData(data))
      .catch((error) => console.error("Error loading state data:", error));
  }, []);

  if (!geoData)
    return <div className="text-center text-gray-500">Loading Map...</div>;

  return (
    <div className="bg-white w-full shadow-md">
      <h2 className="text-lg font-bold ">India State-wise Data</h2>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1000, center: [80, 22] }}
        width={900}
        height={500}
        className="w-full"
      >
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.NAME_1;
              const stateBranches = stateData.filter(
                (s) => s["State Name"] === stateName
              );

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setTooltipContent(stateName)}
                  onMouseLeave={() => setTooltipContent("")}
                  onClick={() => onStateClick(stateBranches)}
                  style={{
                    default: {
                      fill: stateBranches.length > 0 ? "#36A2EB" : "#DDD",
                      stroke: "#607D8B",
                      outline: "none",
                    },
                    hover: { fill: "#FFA726", outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      {tooltipContent && (
        <div className="text-center text-sm mt-2 bg-black p-2 rounded-md">
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default IndiaMap;
