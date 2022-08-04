import React from 'react';
import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`https://internal-prawn-29.hasura.app/api/rest/article`, {
      headers: {
        "x-hasura-admin-secret": "NbM1EjAYdMF71q6NA6SuJ931t3G2JU8KI4V8kUj6TMMB2USfc0Ziun4VMqNWRnfl"
      }
     })
      .then(res => {
        const persons = res.data._onetomany_article;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.persons
            .map(person =>
              <li key={person.id}>{person.title}</li>
            )
        }
      </ul>
    )
  }
}