import { FunctionComponent } from 'react';

import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import PopupComponent from './Popup';

import 'leaflet/dist/leaflet.css';

type MapContainerComponentType = {
  data: { [key: string]: string }[];
  showStatus: boolean;
};

// San Franciso Position
const defaultPosition = { lat: 37.7557, lon: -122.4429 };

const MapContainerComponent: FunctionComponent<MapContainerComponentType> = ({
  data,
  showStatus = true,
}) => {

  return (
    <MapContainer
      center={[defaultPosition.lat, defaultPosition.lon]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data.map(({ latitude, longitude, locationid, ...props }) => (
        <Marker
          key={locationid}
          position={[Number(latitude), Number(longitude)]}
        >
          <PopupComponent showStatus={showStatus} {...props} />
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapContainerComponent;
