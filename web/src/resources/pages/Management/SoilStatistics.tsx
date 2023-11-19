import React, { useState } from 'react';
import { Modal, Button, Progress, Card } from 'antd';
import {
  FireFilled,
  FieldTimeOutlined,
  AreaChartOutlined,
  CloudFilled,
  AlertOutlined,
  DingdingOutlined,
} from '@ant-design/icons';
import styles from './SoilStatistics.styles';
interface SoilStatisticsProps {
  onClose: () => void;
}

const SoilStatistics: React.FC<SoilStatisticsProps> = ({ onClose }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onClose && onClose();
  };

  const statisticsData = [
    { title: 'Nitrogênio', value: 'Valor do Nitrogênio', icon: <FireFilled /> },
    { title: 'Potássio', value: 'Valor do Potássio', icon: <AreaChartOutlined /> },
    { title: 'Fósforo', value: 'Valor do Fósforo', icon: <DingdingOutlined /> },
    { title: 'Temperatura', value: 'Valor da Temperatura', icon: <FieldTimeOutlined /> },
    { title: 'Umidade', value: 'Valor da Umidade', icon: <CloudFilled /> },
    { title: 'PH', value: 'Valor do PH', icon: <AlertOutlined /> },
  ];

  const topCards = statisticsData.slice(0, 3);
  const bottomCards = statisticsData.slice(3);

  return (
    <Modal
      title="Estatísticas do Solo"
      visible={visible}
      onCancel={handleClose}
      footer={[
        <Button key="close" onClick={handleClose}>
          Fechar
        </Button>
      ]}
      style={styles.modal}
    >
      <div style={styles.cardContainer}>
        {topCards.map((data, index) => (
          <Card key={index} style={styles.card}>
            <div>
              <div>{data.icon}</div>
              <div>
                <div>{data.title}</div>
                <div>{data.value}</div>
                <Progress percent={90} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div style={styles.cardContainer}>
        {bottomCards.map((data, index) => (
          <Card key={index} style={styles.card}>
            <div>
              <div>{data.icon}</div>
              <div>
                <div>{data.title}</div>
                <div>{data.value}</div>
                <Progress percent={50} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Modal>
  );
};

export default SoilStatistics;
