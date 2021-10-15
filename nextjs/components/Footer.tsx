import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import palette from '../styles/palette';

const Container = styled.footer`
  width: 100%;
  height: 10vh;
  position: sticky;
  bottom: 5vh;
  border: 1px solid ${palette.gray};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  .footer-button {
    font-size: 32px;
    width: 32px;
    height: 32px;
    border-radius: 5px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 0;
    line-height: 0;
    outline: none;
    text-decoration: none;
    color: black;
  }
`;
const Footer: React.FC = () => {
  const router = useRouter();
  const isMain = router.pathname === '/';
  return (
    <Container>
      <Link href={isMain ? '/todo/add' : '/'}>
        <a className="footer-button">{isMain ? '+' : '-'}</a>
      </Link>
    </Container>
  );
};

export default Footer;
