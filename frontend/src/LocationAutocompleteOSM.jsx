import { useEffect, useState } from "react";

const LocationAutocompleteOSM = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    const fetchLocations = async () => {
      try {
        const res = await fetch(
          `https://photon.komoot.io/api/?q=${query}&limit=5`,
          { signal: controller.signal }
        );

        const data = await res.json();
        setResults(data.features || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    };

    fetchLocations();
    return () => controller.abort();
  }, [query]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search location"
        className="w-full rounded-lg border border-gray-300 px-4 py-2
                   focus:outline-none focus:ring-2 focus:ring-rose-500"
      />

      {results.length > 0 && (
        <ul className="absolute z-10 bg-white w-full border rounded mt-1 max-h-60 overflow-y-auto">
          {results.map((place) => (
            <li
              key={place.properties.osm_id}
              onClick={() => {
                const { name, city, country } = place.properties;
                onSelect({
                  address: [name, city, country].filter(Boolean).join(", "),
                  lat: place.geometry.coordinates[1],
                  lng: place.geometry.coordinates[0],
                });
                setQuery(
                  [name, city, country].filter(Boolean).join(", ")
                );
                setResults([]);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
            >
              {[place.properties.name, place.properties.city, place.properties.country]
                .filter(Boolean)
                .join(", ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocompleteOSM;
