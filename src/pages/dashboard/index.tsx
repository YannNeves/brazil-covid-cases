import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight, FiSearch } from 'react-icons/fi';
import { FcBiohazard } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import ICities from '../../interfaces/Cities';

import { Title, Subtitle, Form, Countries, Error } from './styles';

const Dashboard: React.FC = () => {
  const [states, setStates] = useState<ICities[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tip, setTip] = useState('');

  async function handleFormSubmit(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    try {
      const response = await api.get<ICities[]>(`/brazil/uf/${search}`);
      const ctr = response.data;
      setStates(ctr);
      setSearch('');
    } catch (err) {
      setTip(
        'Não foi possível realizar a pesquisa com os dados informados, tente novamente',
      );
    }
  }

  useEffect(() => {
    async function gatherData(): Promise<void> {
      const tmp = await api.get('');
      setStates(tmp?.data.data);
      setLoading(false);
    }

    gatherData();
  }, []);

  return (
    <>
      <Title>
        <FcBiohazard /> Brazil Covid Cases
      </Title>
      <Subtitle>#FiqueEmCasa</Subtitle>
      {loading && (
        <div className="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      )}
      {!loading && (
        <>
          <Form tip={!!tip} onSubmit={handleFormSubmit}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              type="text"
              placeholder="Procure por nomes (incluindo nomes secundários)"
            />
            <button type="submit">
              <FiSearch />
            </button>
          </Form>
          {tip && <Error>{tip}</Error>}
          <Countries>
            {states.map(states => (
              <Link key={states.uf.toLowerCase()} to={`/city/${states.uf.toLowerCase()}`}>
                <img src={`https://devarthurribeiro.github.io/covid19-brazil-api/static/flags/${states.uf}.png`} alt={states.state} />
                <div>
                  <strong>
                    {states.state}
                  </strong>
                  <p><span>{states.cases} Casos</span></p>
                </div>
                <FiChevronRight size={20} />
              </Link>
            ))}
          </Countries>
        </>
      )}
    </>
  );
};

export default Dashboard;

