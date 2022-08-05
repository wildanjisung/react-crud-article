import axios from "axios";
import React, { useState, useEffect }  from "react";

const client = axios.create({
  baseURL: "https://internal-prawn-29.hasura.app/api/rest/article",
  headers: { "x-hasura-admin-secret": "NbM1EjAYdMF71q6NA6SuJ931t3G2JU8KI4V8kUj6TMMB2USfc0Ziun4VMqNWRnfl"}
});

export default function ArticleDelete() {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);

  const [id, setId] = useState("");
  
  useEffect(() => {
    async function getArticle() {
      const response = await client.get("/");
      setArticle(response.data._onetomany_article);
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

  if (!article) return "No post!"

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
          article
            .map(article =>
              <li key={article.id}>{article.id} - {article.title}</li>
            )
        }
      </ul>

    </div>
  );
}