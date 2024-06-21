import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../../firebase/FirebaseProvider';

const fetchMonthlyRequests = async (email) => {
  const { data } = await axios.get(`http://localhost:5000/monthly-requests/${email}`);
  return data;
};

const MonthlyRequests = () => {
  const {user} = useContext(AuthContext)
  const email = user?.email
  const { data: requests = [], error, isLoading } = useQuery({
    queryKey: ['monthly-requests', email],
    queryFn: () => fetchMonthlyRequests(email),
    enabled: !!email, // Ensure query runs only when email is available
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="md:text-3xl text-xl font-semibold">My Monthly Requests</h2>
      <div className="my-4">
        <div className="overflow-x-auto pt-4">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Type</th>
                <th>Request Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{request.product}</div>
                      </div>
                    </div>
                  </td>
                  <td>{request.productType}</td>
                  <td>{request.requestedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MonthlyRequests;
