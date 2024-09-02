
import { ChangeEvent, useState } from 'react';

import { useFoodTruckInformation } from '@food-app/hooks';
import { MapContainerComponent } from '@food-app/components';

import 'leaflet/dist/leaflet.css';
import './App.css';

const AppStyles = {
  buttonShow: { backgroundColor: '#e7e7e7', color: 'black' },
  buttonHide: { backgroundColor: '#555555' },
};

function App() {
  const { response, filterStatus, filterByStatus } = useFoodTruckInformation();
  const [showStatus, setShowStatus] = useState(false);

  const handleStatus = () => setShowStatus(!showStatus);
  const handleFilterStatus = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => filterByStatus(value);

  return (
    <div className='food-truck-container'>
      <div>
        <h1 className='food-truck-title'>
          San Francisco Food Trucks!
        </h1>
        <div className='left-side-panel'>
          <div className="filters filter-select">
            <label>
              Select Food Truck Status:
              <select value={filterStatus} onChange={handleFilterStatus}>
                <option value="ALL">All</option>
                <option value="REQUESTED">Requested</option>
                <option value="APPROVED">Approved</option>
                <option value="EXPIRED">Expired</option>
              </select>
            </label>
          </div>

          <button
            className={'filters filter-button'}
            style={showStatus ? AppStyles.buttonHide : AppStyles.buttonShow}
            onClick={handleStatus}
          >
            {showStatus ? 'Hide' : 'Show'} Status
          </button>
        </div>
      </div>

      <div className='right-side-panel'>
        <MapContainerComponent showStatus={showStatus} data={response} />
      </div>
    </div>
  );
}

export default App;
