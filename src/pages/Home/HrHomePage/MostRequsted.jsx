import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useRoll from '../../../hooks/useRoll';

const fetchTopItems = async (company) => {
  const { data } = await axios.get(`https://track-ease-server.vercel.app/most-requested/${company}`);
  return data;
};

const MostRequested = () => {
  const [role] = useRoll();
  const company = role ? role[2] : '';

  const { data: topItems = []} = useQuery({
    queryKey: ['top-items', company],
    queryFn: () => fetchTopItems(company),
    enabled: !!company, 
  });



  return (
    <div className="mt-8">
      <h2 className="md:text-3xl text-xl font-semibold">Most Requested Items:</h2>
      <div className="my-4">
        <div className="overflow-x-auto pt-4">
          <table className="table">
            {/* head */}
            <thead>
              <tr className='flex justify-between'>
                <th>Product Name</th>
                <th>Request Count</th>
              </tr>
            </thead>
            <tbody>
              {topItems.map((item) => (
                <tr className='flex justify-between' key={item._id}>
                  <td className='font-bold'>{item._id}</td>
                  <td>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MostRequested;
