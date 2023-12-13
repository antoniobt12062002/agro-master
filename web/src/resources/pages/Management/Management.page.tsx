// Management.tsx

import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, ZoomControl } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { Wrapper } from '../../components';
import Monitor from '../Monitor/Monitor.page';
import { Container } from '../Monitor/Monitor.styles';

export function Management(): JSX.Element {
  const { latitude, longitude, zoom, mapboxAccessToken } = {
    latitude: -24.022030,
    longitude: -52.502797,
    zoom: 16,
    mapboxAccessToken: 'pk.eyJ1IjoiYW50b25pb2J0IiwiYSI6ImNscDMzMHJmZTB3NHgya21qeWVqN24yOTEifQ.CfGnnfcWzNVd6Nq_fAY3qA',
  };

  const coordinates: LatLngTuple[] = [
    [-24.018433, -52.503709],
    [-24.025293, -52.504374],
    [-24.025479, -52.501820],
    [-24.019854, -52.501198],
  ];

  const limeOptions = { color: '#008000' };
  const limeHoverOptions = { color: '#086404', fillOpacity: 0.8 };

  const [isHovered, setIsHovered] = useState(false);
  const [showMonitor, setShowMonitor] = useState(false);

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  const handlePolygonClick = () => {
    setShowMonitor(!showMonitor);
  };

  const handleCloseMonitor = () => {
    setShowMonitor(false);
  };

  return (
    <Wrapper title='Dashboard'>
      <Container>
        <MapContainer
          center={[latitude, longitude]}
          zoom={zoom}
          style={{ height: '100%', width: '100%', zIndex: '0' }}
        >
          <TileLayer
            attribution='&copy; Agro Soil development | Map data &copy; OpenStreetMap contributors, Imagery &copy; Mapbox'
            url={`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
          />

          <Polygon
            pathOptions={isHovered ? limeHoverOptions : limeOptions}
            positions={coordinates}
            eventHandlers={{
              mouseover: handleMouseOver,
              mouseout: handleMouseOut,
              click: handlePolygonClick,
            }}
          />

          <ZoomControl position="bottomright" />
        </MapContainer>

        {showMonitor && (
          <Monitor onClose={handleCloseMonitor} visible={showMonitor} />
        )}
      </Container>
    </Wrapper>
  );
}
