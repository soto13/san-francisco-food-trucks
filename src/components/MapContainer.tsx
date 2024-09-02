import 'leaflet/dist/leaflet.css';

import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import { FunctionComponent } from 'react';
import PopupComponent from './Popup';
import { useMediaQueries } from '@food-app/hooks';

type MapContainerComponentType = {
  data: { [key: string]: string }[];
  showStatus: boolean;
};

const defaultPosition = { lat: 37.7557, lon: -122.4429 };

const MapStyles = {
  mapMobile: { height: '100%', width: '100%' },
  mapDesktop: { height: '100%', width: '100%' },
};

const MapContainerComponent: FunctionComponent<MapContainerComponentType> = ({
  data,
  showStatus = true,
}) => {
  const { sm } = useMediaQueries();

  return (
    <MapContainer
      center={[defaultPosition.lat, defaultPosition.lon]}
      zoom={13}
      scrollWheelZoom={true}
      style={sm ? MapStyles.mapMobile : MapStyles.mapDesktop}
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
