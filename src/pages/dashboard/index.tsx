import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight, FiSearch } from 'react-icons/fi';
import { FcBiohazard } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import ICities from '../../interfaces/Cities';

import { Title, Subtitle, Form, Countries, Error } from './styles';
import { exit } from 'process';

const Dashboard: React.FC = () => {
  const [states, setStates] = useState<ICities[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tip, setTip] = useState('');

  async function handleFormSubmit(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    const response = await api.get(`/brazil/uf/${search.length === 2 ? search : converterEstados(search)}`);
    
    if('error' in response.data){
      setTip(
        'Não foi possível realizar a pesquisa com os dados informados, tente novamente',
      );
      setSearch('');
      return;
    }

    let ctr = [];
    ctr.push(response.data);
    setStates(ctr);
    setSearch('');
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
              placeholder="Procure por um estado específico (Nome Completo ou Sigla)"
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

function converterEstados(val:String) {
    var data;
    val = val.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();

    switch (val) {
      case "ACRE" :					data = "AC";	break;
      case "ALAGOAS" :				data = "AL";	break;
      case "AMAZONAS" :				data = "AM";	break;
      case "AMAPA" :					data = "AP";	break;
      case "BAHIA" :					data = "BA";	break;
      case "CEARA" :					data = "CE";	break;
      case "DISTRITO FEDERAL" :		data = "DF";	break;
      case "ESPIRITO SANTO" :			data = "ES";	break;
      case "GOIAS" :					data = "GO";	break;
      case "MARANHAO" :				data = "MA";	break;
      case "MINAS GERAIS" :			data = "MG";	break;
      case "MATO GROSSO DO SUL" :		data = "MS";	break;
      case "MATO GROSSO" :			data = "MT";	break;
      case "PARA" :					data = "PA";	break;
      case "PARAABA" :				data = "PB";	break;
      case "PERNAMBUCO" :				data = "PE";	break;
      case "PIAUI" :					data = "PI";	break;
      case "PARANA" :					data = "PR";	break;
      case "RIO DE JANEIRO" :			data = "RJ";	break;
      case "RIO GRANDE DO NORTE" :	data = "RN";	break;
      case "RONDONIA" : 				data = "RO";	break;
      case "RORAIMA" :				data = "RR";	break;
      case "RIO GRANDE DO SUL" :		data = "RS";	break;
      case "SANTA CATARINA" :			data = "SC";	break;
      case "SERGIPE" :				data = "SE";	break;
      case "SAO PAULO" :				data = "SP";	break;
      case "TOCANTINS" :				data = "TO";	break;
    }

    return data;
}

export default Dashboard;

