import axios from "axios";
import React, { useState, useEffect }  from "react";

// Init Axios baseURL and headers
const client = axios.create({
  baseURL: "http://127.0.0.1:8000/products",
});

export default function ArticleCreate() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  
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

  // Create function for call http request Create product
  async function createArticle(evt) {
    evt.preventDefault();
    await client.post("/", 
    {
      name: name,
      detail: detail,
    });
    // change value to call Hook useEffect
    setLoading(true);
  }

  // show string No product when no data displayed
  if (!product) return "No product!"

  return (
    <div>

      <h3>Create</h3>
      <form onSubmit={createArticle}>
        <label>
          name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>

        <label>
          detail:
          <input
            type="text"
            value={detail}
            onChange={e => setDetail(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>

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