import { useState } from "react";

const MostRequested = () => {

  
  const [items, setItems] = useState(5)

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-semibold">Most Requested Items :</h2>
      <div>

      </div>
    </div>
  );
};

export default MostRequested;