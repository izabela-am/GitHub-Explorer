import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import {
  Title,
  Form,
  Repositories,
  Error,
} from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const localStorageRepos = localStorage.getItem('@GitHubExplorer:repositories');

    if (localStorageRepos) {
      return JSON.parse(localStorageRepos);
    }
  });
  const [inputError, setInputError] = useState('');
  const [newRepo, setNewRepo] = useState('');

  useEffect(() => {
    localStorage.setItem('@GitHubExplorer:repositories', JSON.stringify(repositories));
  }, [repositories]);

  async function addRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!newRepo) {
      setInputError('Digite autor/nome-do-repositório');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);
      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca do repositório');
    }
  }

  return (
    <>
        <img src={logoImg} alt="Logo"/>
        <Title>Explore repositórios no GitHub</Title>

        <Form hasError={!!inputError} onSubmit={addRepository}>
            <input
                value={newRepo}
                onChange={(e) => setNewRepo(e.target.value)}
                placeholder='Nome do repositório'
                type="text"
            />
            <button type="submit">Pesquisar</button>
        </Form>

        { inputError && <Error> {inputError} </Error> }

        <Repositories>
            {repositories.map((repository) => (
              <Link key={repository.full_name} to={`/repositories/${repository.full_name}`}>
                <img
                    src={repository.owner.avatar_url}
                    alt={repository.owner.login}
                />
                <div>
                    <strong>{repository.full_name}</strong>
                    <p>{repository.description}</p>
                </div>
                <FiChevronRight size={20}/>
              </Link>
            ))}
        </Repositories>
    </>
  );
};

export default Dashboard;
