import { FunctionComponent } from 'react';

type StatusComponentType = {
  status: string;
};

const StatusComponentStyle = {
  container: {
    display: 'flex',
  },
  circle: {
    height: '10px',
    width: '10px',
    marginRight: '5px',
    borderRadius: '50%',
    display: 'inline-block',
  },
};

const StatusComponent: FunctionComponent<StatusComponentType> = ({
  status,
}) => {
  const getStatusClass = () => {
    switch (status) {
      case 'REQUESTED':
        return '#008CBA';

      case 'EXPIRED':
        return '#f44336';

      default:
        return '#04AA6D';
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '5px',
      }}
    >
      <p>Status:</p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            ...StatusComponentStyle.circle,
            backgroundColor: getStatusClass(),
          }}
        ></div>
        <p>{status.toLocaleUpperCase()}</p>
      </div>
    </div>
  );
};

export default StatusComponent;
