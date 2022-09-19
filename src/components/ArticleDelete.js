import axios from "axios";
import React, { useState, useEffect }  from "react";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/products",
});

export default function ArticleDelete() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const [id, setId] = useState("");
  
  useEffect(() => {
    async function getArticle() {
      const response = await client.get("/");
      setProduct(response.data.data);
    }
    if (loading) getArticle();
    setLoading(false);
  }, [loading]);

  // Delete
  async function deleteArticle(evt) {
    evt.preventDefault();
    await client.delete(id);
    setLoading(true);
  }

  if (!product) return "No post!"

  return (
    <div>

      {/* Delete */}
      <h3>Delete</h3>
      <form onSubmit={deleteArticle}>
        <label>
          Id:
          <input
            type="text"
            value={id}
            onChange={e => setId(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      
      <br></br>
      
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