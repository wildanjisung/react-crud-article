import axios from "axios";
import React, { useState, useEffect }  from "react";

// Init Axios baseURL and headers
const client = axios.create({
  baseURL: "https://internal-prawn-29.hasura.app/api/rest/article",
  headers: { "x-hasura-admin-secret": "NbM1EjAYdMF71q6NA6SuJ931t3G2JU8KI4V8kUj6TMMB2USfc0Ziun4VMqNWRnfl"}
});

export default function ArticleCreate() {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);

  const [authorId, setAuthorId] = useState("");
  const [id, setId] = useState("");
  const [rating, setRating] = useState("");
  const [title, setTitle] = useState("");
  
  useEffect(() => {
    // Http request Read Article
    async function getArticle() {
      const response = await client.get("/");
      setArticle(response.data._onetomany_article);
    }
    // Check Condition if loading true then execute getArticle function for get new list article
    if (loading) getArticle();
    // change loading variable to false
    setLoading(false);
  }, [loading]); // only when variable loading change value will execute Hook useEffect

  // Create function for call http request Create Article
  async function createArticle(evt) {
    evt.preventDefault();
    await client.post("/", 
    {
      author_id: authorId,
      id: id,
      rating: rating,
      title: title
    });
    // change value to call Hook useEffect
    setLoading(true);
  }

  // show string No Article when no data displayed
  if (!article) return "No Article!"

  return (
    <div>

      <h3>Create</h3>
      <form onSubmit={createArticle}>
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

      <ul>
        {
          article
            .map(person =>
              <li key={person.id}>{person.id} - {person.title}</li>
            )
        }
      </ul>

    </div>
  );
}