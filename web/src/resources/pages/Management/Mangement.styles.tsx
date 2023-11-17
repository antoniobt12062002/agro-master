import { Input } from 'antd';
import { Popup } from 'react-leaflet';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
`;

export const PopMarker = styled(Popup)`
  border: 1px solid red;
  z-index: 1;
`;

export const InteractiveBox = styled.div`
  position: absolute;
  width: 100%;
  z-index: 99999;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
`;

export const InteractiveBoxSearch = styled.div`
  margin-top: 3rem;
  width: min(100%, 650px);
  height: 100px;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 12px 12px 12px 0 rgba(0, 0, 0, 0.25);
  padding: 1rem 2rem;

  display: flex;
  align-items: center;
`;

export const InteractiveSearch = styled(Input.Search)``;
