import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(resp => {
      setRepositories(resp.data);
    });
  },[]);

  async function handleAddRepository() {
    const resp = await api.post('repositories', {
      title: "new-repository-name",
      url: "url-here-im-to-lazy-for-this",
      techs: ["Pascal", "Cobol", "Visual Basic"]
    })

    const repository = resp.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)
      setRepositories(repositories.filter(repository => repository.id !== id))
    } catch (err) {
      alert ('Algo deu errado cara! Tente outra vez.');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(
          repository =>
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button>
            </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
