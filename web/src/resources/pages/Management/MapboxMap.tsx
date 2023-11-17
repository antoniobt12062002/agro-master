import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { Feature, Geometry, GeoJsonProperties } from 'geojson';

interface MapboxGLMapProps {
  width: number;
  height: number;
  latitude: number;
  longitude: number;
  zoom: number;
  mapboxAccessToken: string;
}

const MapboxGLMap: React.FC<MapboxGLMapProps> = ({ width, height, latitude, longitude, zoom, mapboxAccessToken }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = mapboxAccessToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [longitude, latitude],
      zoom: zoom,
    });

    map.on('load', () => {
      map.setFog({});

      const selectedArea: Feature<Geometry, GeoJsonProperties> = {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-52.408053, -24.022239],
              [-52.412784, -24.028050],
              [-52.408289, -24.032097],
              [-52.405285, -24.031401],
              [-52.406068, -24.023562],
              [-52.408053, -24.022239],
            ],
          ],
        },
        properties: {}, 
      };

      map.addLayer({
        id: 'selected-area',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [selectedArea],
          },
        },
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.7,
        },
      });

      map.on('mouseenter', 'selected-area', () => {
        map.setPaintProperty('selected-area', 'fill-color', '#045');
      });

      map.on('mouseleave', 'selected-area', () => {
        map.setPaintProperty('selected-area', 'fill-color', '#088');
      });
    });

    return () => {
      if (map.getLayer('selected-area')) {
        map.removeLayer('selected-area');
      }

      if (map.getSource('selected-area')) {
        map.removeSource('selected-area');
      }

      map.remove();
    };
  }, [latitude, longitude, zoom, mapboxAccessToken]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '90%' }} />;
};

export default MapboxGLMap;
