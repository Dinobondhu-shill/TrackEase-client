import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import useRoll from "../../../hooks/useRoll";

const MostRequested = () => {
  const [role] = useRoll();
  const company = role ? role[2] : '';
  
  const topItems = async () => {
    const { data } = await axios.get(`http://localhost:5000/most-requested/${company}`);
    return data;
  };
  
  const mostRequestedItems = () => {
    const { data: count = {}, error, isLoading } = useQuery({
      queryKey: ['top-items'],
      queryFn: topItems,
    });
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error fetching data: {error.message}</div>;
    }

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-semibold">Most Requested Items :</h2>
      <div>

      </div>
    </div>
  );
};
}

export default MostRequested;