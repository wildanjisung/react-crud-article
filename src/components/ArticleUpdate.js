import axios from "axios";
import React, { useState, useEffect }  from "react";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/products",
});

export default function ArticleUpdate() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  
  useEffect(() => {
    async function getArticle() {
      const response = await client.get("/");
      setProduct(response.data.data);
    }
    if (loading) getArticle();
    setLoading(false);
  }, [loading]);

  // Update
  async function updateArticle(evt) {
    evt.preventDefault();
    await client.put(id, {
      name: name,
      detail: detail,
    });
    setLoading(true);
  }

  if (!product) return "No post!"

  return (
    <div>

      <h3>Update</h3>
      <form onSubmit={updateArticle}>

        <label>
          id:
          <input
            type="text"
            value={id}
            onChange={e => setId(e.target.value)}
          />
        </label>

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