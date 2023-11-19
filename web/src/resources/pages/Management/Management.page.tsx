// Management.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, ZoomControl } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { Wrapper } from '../../components';
import { Container } from './Mangement.styles';
import SoilStatistics from './SoilStatistics';

export function Management(): JSX.Element {
  const { latitude, longitude, zoom, mapboxAccessToken } = {
    latitude: -24.022030,
    longitude: -52.502797,
    zoom: 16,
    mapboxAccessToken: '',
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
  const [showStatistics, setShowStatistics] = useState(false);

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  const handlePolygonClick = () => {
    setShowStatistics(!showStatistics);
  };

  const handleCloseStatistics = () => {
    setShowStatistics(false);
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

        {showStatistics && (
          <SoilStatistics onClose={handleCloseStatistics} />
        )}
      </Container>
    </Wrapper>
  );
}
