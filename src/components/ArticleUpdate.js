import axios from "axios";
import React, { useState, useEffect }  from "react";

const client = axios.create({
  baseURL: "https://internal-prawn-29.hasura.app/api/rest/article",
  headers: { "x-hasura-admin-secret": "NbM1EjAYdMF71q6NA6SuJ931t3G2JU8KI4V8kUj6TMMB2USfc0Ziun4VMqNWRnfl"}
});

export default function ArticleUpdate() {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);

  const [authorId, setAuthorId] = useState("");
  const [id, setId] = useState("");
  const [rating, setRating] = useState("");
  const [title, setTitle] = useState("");
  
  useEffect(() => {
    async function getArticle() {
      const response = await client.get("/");
      setArticle(response.data._onetomany_article);
    }
    if (loading) getArticle();
    setLoading(false);
  }, [loading]);

  // Update
  async function updateArticle(evt) {
    evt.preventDefault();
    await client.put(id, {
      author_id: authorId,
      rating: rating,
      title: title
    });
    setLoading(true);
  }

  if (!article) return "No post!"

  return (
    <div>

      {/* Update */}
      <h3>Update</h3>
      <form onSubmit={updateArticle}>
        <label>
          Author Id:
          <input
            type="text"
            value={authorId}
            onChange={e => setAuthorId(e.target.value)}
          />
        </label>

        <label>
          Id:
          <input
            type="text"
            value={id}
            onChange={e => setId(e.target.value)}
          />
        </label>

        <label>
          Rating:
          <input
            type="text"
            value={rating}
            onChange={e => setRating(e.target.value)}
          />
        </label>

        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
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