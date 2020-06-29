import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    background-color: #383838;
    color: #a8a8b3;
    padding: 2px 10px;
    border-radius: 0.25rem;
    transition: 0.25s;

    &:hover {
      background: ${shade(0.2, 'green')};
      color: #fff;
      transform: translateX(-10px);
    }

    svg {
      margin-right: 4px;
    }
  }
`;

export const CountryInfo = styled.section`
  margin-top: 80px;
  background-color: #111;
  border-radius: 5px;

  header {
    padding-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 160px;
      height: 120px;
    }

    div {
      margin-left: 24px;

      strong {
        font-size: 36px;
        color: #fff;

        span {
          background-color: #3d3d3d;
          border-radius: 0.5rem;
          font-size: 20px;
          color: #afafaf;
          padding: 2px 10px;
        }
      }

      p {
        font-size: 18px;
        color: #737380;
        margin-top: 4px;
      }
    }
  }

  ul {
    display: flex;
    justify-content: space-around;
    padding: 0;
    list-style: none;
    
    margin-top: 40px;

    li {
      display: inline-block;

      margin-top: 20px;
      margin-bottom: 20px;


      strong {
        display: block;
        font-size: 24px;
        color: #fff;
        margin: initial 10px;

        &#ln{
          display: flex;
        }

        span {
          background-color: #3d3d3d;
          border-radius: 0.5rem;
          font-size: 20px;
          color: #afafaf;
          padding: 2px 10px;
          text-align: center;
          margin-left: 15px;
        }
      }

      span {
        display: block;
        margin-top: 4px;
        color: #9d9d9d;
      }
    }
  }
`;
