"use client";

import { locations } from "@/services/locations";
import "ol/ol.css";
import { useEffect, useRef, useState } from "react";

interface Location {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  category: string;
  address: string;
  icon: string;
  color: string;
}

interface ClientMapProps {
  className?: string;
}

const ClientMap = ({ className }: ClientMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [locationsData, setLocationsData] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        setLoading(true);
        const data = await locations();
        setLocationsData(data);
        setFilteredLocations(data);

        const uniqueCategories = Array.from(
          new Set(data.map((loc) => loc.category))
        );
        setCategories(uniqueCategories);
      } catch (err) {
        setError("Erro ao carregar localizações");
        console.error("Error loading locations:", err);
      } finally {
        setLoading(false);
      }
    };

    loadLocations();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredLocations(locationsData);
    } else {
      setFilteredLocations(
        locationsData.filter((loc) => loc.category === selectedCategory)
      );
    }
  }, [selectedCategory, locationsData]);

  useEffect(() => {
    const initMap = async () => {
      if (
        mapRef.current &&
        typeof window !== "undefined" &&
        filteredLocations.length > 0
      ) {
        const { Map, View } = await import("ol");
        const { OSM, Vector } = await import("ol/source");
        const { Tile, Vector: VectorLayer } = await import("ol/layer");
        const { Point } = await import("ol/geom");
        const { Feature } = await import("ol");
        const { fromLonLat } = await import("ol/proj");
        const { Style, Circle, Fill, Stroke } = await import("ol/style");

        if (mapInstance.current) {
          mapInstance.current.setTarget(null);
        }

        const featuresPoints = filteredLocations.map((location) => {
          const feature = new Feature({
            geometry: new Point(fromLonLat(location.coordinates)),
            name: location.name,
            description: location.description,
            category: location.category,
            address: location.address,
            locationData: location,
          });

          return feature;
        });

        const vectorSource = new Vector({
          features: featuresPoints,
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
          style: (feature) => {
            const locationData = feature.get("locationData") as Location;
            const color = locationData.color || "#3B82F6";

            return new Style({
              image: new Circle({
                radius: 8,
                fill: new Fill({ color: color }),
                stroke: new Stroke({ color: "#FFFFFF", width: 2 }),
              }),
            });
          },
        });

        const map = new Map({
          target: mapRef.current,
          layers: [
            new Tile({
              source: new OSM(),
            }),
            vectorLayer,
          ],
          view: new View({
            center: fromLonLat([-38.5, -9.5]), // Nordeste do Brasil
            zoom: 6,
          }),
        });

        mapInstance.current = map;
      }
    };

    if (!loading && !error) {
      initMap();
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(null);
      }
    };
  }, [filteredLocations, loading, error]);

  if (loading) {
    return (
      <div className={`bg-[#1A1D23] rounded-2xl p-6 h-full ${className || ""}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white text-lg font-medium">
            Mapa de clientes por região
          </h3>
        </div>
        <div className="flex items-center justify-center h-96">
          <div className="text-white text-lg">Carregando localizações...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-[#1A1D23] rounded-2xl p-6 h-full ${className || ""}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white text-lg font-medium">
            Mapa de clientes por região
          </h3>
        </div>
        <div className="flex items-center justify-center h-96">
          <div className="text-red-500 text-lg">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-card-bg border border-blue-500/20 rounded-2xl p-6 h-full ${
        className || ""
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white text-lg font-medium">
          Mapa de clientes por região
        </h3>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#2A2F37] text-white text-sm px-3 py-2 rounded-lg border border-[#3A3F47] focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">Todas as categorias</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div ref={mapRef} className="w-full h-96 rounded-lg overflow-hidden" />
    </div>
  );
};

export default ClientMap;
