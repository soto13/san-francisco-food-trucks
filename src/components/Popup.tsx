import { FunctionComponent, useEffect, useState } from 'react';

import { Popup } from 'react-leaflet';
import StatusComponent from './Status';

const PopupComponentStyle = {
  p: {
    marginTop: '5px',
    marginBottom: '5px',
  },
};

const PopupComponent: FunctionComponent<{
  [key: string]: string | boolean;
}> = ({ showStatus, applicant, fooditems, dayshours, zipcodes, status }) => {
  const [menu, setMenu] = useState<string[]>([]);

  useEffect(() => {
    if (fooditems) {
      const menu = (fooditems as string)
        .split(':')
        .map((value) => value.trim());

      setMenu(menu);
    }
  }, [fooditems]);

  return (
    <Popup>
      <div>
        {showStatus && <StatusComponent status={status as string} />}
        <p style={PopupComponentStyle.p}>Name: {applicant || '...'}</p>
        <div>
          Todays Menu:
          <ul>
            {menu.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <p style={PopupComponentStyle.p}>Working days: {dayshours || '...'}</p>
        <p style={PopupComponentStyle.p}>Zip Codes: {zipcodes || '...'}</p>
      </div>
    </Popup>
  );
};

export default PopupComponent;
