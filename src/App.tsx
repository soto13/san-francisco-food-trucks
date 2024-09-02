import 'leaflet/dist/leaflet.css';

import { useFoodTruckInformation, useMediaQueries } from '@food-app/hooks';

import { MapContainerComponent } from '@food-app/components';
import { useState } from 'react';

// I had not time to create classes. Sorry :c
const AppStyles = {
  foodTruckContainer: {
    backgroundColor: '#ecf2ff',
    height: '100vh',
    width: '100%',
    display: 'flex',
  },
  leftSidePanel: { margin: '10px', display: 'flex' },
  button: {
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
  },
  buttonShow: { backgroundColor: '#e7e7e7', color: 'black' },
  buttonHide: { backgroundColor: '#555555' },
};

function App() {
  const { response } = useFoodTruckInformation();
  const { sm } = useMediaQueries();
  const [showStatus, setShowStatus] = useState(false);

  const handleStatus = () => setShowStatus(!showStatus);

  return (
    <div
      style={{
        ...AppStyles.foodTruckContainer,
        flexDirection: !sm ? 'column' : 'row',
      }}
    >
      <div>
        <h1 style={{ color: '#008CBA', textAlign: !sm ? 'center' : 'start' }}>
          San Francisco Food Trucks!
        </h1>
        <div
          style={{
            ...AppStyles.leftSidePanel,
            justifyContent: !sm ? 'center' : 'flex-start',
          }}
        >
          <button
            style={{
              ...AppStyles.button,
              textAlign: 'center',
              ...(showStatus ? AppStyles.buttonHide : AppStyles.buttonShow),
            }}
            onClick={handleStatus}
          >
            {showStatus ? 'Hide' : 'Show'} Status
          </button>
        </div>
      </div>

      <div style={{ width: '100%', height: '100%' }}>
        <MapContainerComponent showStatus={showStatus} data={response} />
      </div>
    </div>
  );
}

export default App;
