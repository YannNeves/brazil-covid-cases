import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiShield } from 'react-icons/fi';
import { GiDeathSkull, GiHealthNormal } from 'react-icons/gi';
import api from '../../services/api';
import ICities from '../../interfaces/Cities';
import { Header, CountryInfo } from './styles';

interface CityParams {
  city: string;
}

const Country: React.FC = () => {
  const [city, setCity] = useState<ICities>();
  const { params } = useRouteMatch<CityParams>();

  useEffect(() => {
    async function gatherData(): Promise<void> {
      const tmp = await api.get(`/brazil/uf/${params.city}`);
      setCity(tmp?.data);
    }

    gatherData();
  }, [params.city]);

  return (
    <>
      <Header>
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {city && (
        <CountryInfo>
          <header>
            <img src={`https://devarthurribeiro.github.io/covid19-brazil-api/static/flags/${city.uf}.png`} alt={city.state} />
            <div>
              <strong>
                {city.state}
                <p>{city.cases ? <span> {city.cases} Casos</span> : ''}</p>
              </strong>
            </div>
          </header>
          <ul>
            <li>
              <span> <GiDeathSkull /> Mortos</span>
              <strong>
                {city.deaths}
              </strong>
            </li>
            <li>
              <span> <GiHealthNormal /> Curados</span>
              <strong>
                {city.refuses}
              </strong>
            </li>
            <li>
              <span> <FiShield /> Suspeitos</span>
              <strong>
                {city.suspects}
              </strong>
            </li>
          </ul>
        </CountryInfo>
      )}
    </>
  );
};

export default Country;
