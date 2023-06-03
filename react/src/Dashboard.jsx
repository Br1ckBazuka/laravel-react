import React, { useState } from "react";
import { getRandomData } from "./axios-client";
import "./Dashboard.css";

function Dashboard() {
  const [data, setData] = useState(null);

  const handleGenerateData = async () => {
    const data = await getRandomData();
    setData(data);
  };

  return (
    <div>
      {data && (
        <>
          <h2>Random Users</h2>
          <ul>
            {data.users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>

          <h2>Random Categories</h2>
          <ul>
            {data.categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>

          <h2>Random Products</h2>
          <ul>
            {data.products.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </>
      )}
      <button className="btn-generate" onClick={handleGenerateData}>
        Generate Random Data
      </button>
    </div>
  );
}

export default Dashboard;
