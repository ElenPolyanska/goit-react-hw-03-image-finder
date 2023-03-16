import styled from 'styled-components';

export const LoadBtn = styled.button`
  display: inline-block;
  min-width: 180px;
  margin-top: 20px;
  padding: 8px 16px;

  border-radius: 8px;
  background-color: #408482;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

  text-align: center;
  color: #fff;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

  :hover,
  :focus {
    background-color: #303f9f;
  }
`;
