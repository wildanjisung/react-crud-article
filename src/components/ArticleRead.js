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

  function setReload() {
    setLoading(true)
  }

  // show string No Article when no data displayed
  if (!article) return "No Article!"

  return (
    <div>

      <h3>Read Article</h3>
      <button onClick={setReload}>
        Refresh
      </button>

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