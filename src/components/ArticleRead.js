import axios from "axios";
import React, { useState, useEffect }  from "react";

// Init Axios baseURL and headers
const client = axios.create({
  baseURL: "http://127.0.0.1:8000/products",
});

export default function ArticleRead() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Http request Read product
    async function getArticle() {
      const response = await client.get("/");
      setProduct(response.data.data);
    }
    // Check Condition if loading true then execute getArticle function for get new list product
    if (loading) getArticle();
    // change loading variable to false
    setLoading(false);
  }, [loading]); // only when variable loading change value will execute Hook useEffect

  function setReload() {
    setLoading(true)
  }

  // show string No product when no data displayed
  if (!product) return "No product!"

  return (
    <div>

      <h3>Read product</h3>
      <button onClick={setReload}>
        Refresh
      </button>

      <ul>
        {
          product
            .map(data =>
              <li key={data.id}>{data.id} - {data.name} - {data.detail}</li>
            )
        }
      </ul>

    </div>
  );
}