import { useEffect, useState } from 'react';

import { ParseResult } from 'papaparse';
import { usePapaParse } from 'react-papaparse';

type useFoodTruckInformationType = {
  data: string[][];
  total: number;
  hasError: boolean;
  response: { [key: string]: string }[];
  filterStatus: string;
  filterByStatus: React.Dispatch<React.SetStateAction<string>>;
};

export const useFoodTruckInformation = (): useFoodTruckInformationType => {
  const { readRemoteFile } = usePapaParse();
  const [data, setData] = useState<string[][]>([]);
  const [total, setTotal] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);
  const [response, setResponse] = useState<{ [key: string]: string }[]>([]);
  const [tempResponse, setTempResponse] = useState<{ [key: string]: string }[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  useEffect(() => {
    if (!data.length) {
      readRemoteFile('https://data.sfgov.org/api/views/rqzj-sfat/rows.csv', {
        download: true,
        complete: (results: ParseResult<string[]>) => {
          setData([...results.data]);
          setTotal(results.data.length);
          transformData([...results.data]);
        },
        error: () => {
          setHasError(true);
        },
      });
    }
  }, [data, readRemoteFile]);

  useEffect(() => {
    let dataCopied = [...response];

    if (filterStatus !==  'ALL') {
      dataCopied = dataCopied.filter(({status}) => status === filterStatus);
    }

    setTempResponse(dataCopied);
  }, [filterStatus, response, tempResponse]);

  const transformData = (arr: string[][]) => {
    if (arr.length) {
      const [splicedData] = arr.splice(0, 1);
      const headers = splicedData.map((value: string) => ({
        text: value,
        key: value.replace(' ', '').replace(' ', '').toLowerCase(),
      }));

      const updated = arr.reduce<{ [key: string]: string }[]>(
        (foodTrucks, values) => {
          if (values.length !== headers.length) {
            return foodTrucks;
          }

          const updatedValue = values.reduce((prev, value, index) => {
            const { text, key } = headers[index];
            return { ...prev, [key]: value, text };
          }, {});

          return [...foodTrucks, updatedValue];
        },
        []
      );

      setResponse(updated);
      setTempResponse(updated);
    }
  };

  return { data, total, hasError, response: tempResponse, filterStatus, filterByStatus: setFilterStatus };
};
