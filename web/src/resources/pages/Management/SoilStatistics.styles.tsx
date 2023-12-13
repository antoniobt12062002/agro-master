// SoilStatistics.styles.ts
import { CSSProperties } from 'react';

interface Styles {
  [key: string]: CSSProperties;
}

const styles: Styles = {
  modal: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    margin: '20px', // Ajuste conforme necessário
    flex: '0 0 calc(30% - 40px)', // Ajuste conforme necessário
    maxWidth: '300px', // Defina uma largura máxima para evitar que os cartões fiquem muito largos
  },
};

export default styles;
