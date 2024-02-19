// Monitor.tsx

import React, { useContext, useEffect, useRef, useState } from 'react';
import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Card, message, Tag, Modal } from 'antd';
import {
  FireFilled,
  FieldTimeOutlined,
  AreaChartOutlined,
  CloudFilled,
  AlertOutlined,
  DingdingOutlined,
} from '@ant-design/icons';
import { WebSocketContext } from 'app/context';
import { Container, Content, Display, Header, StatusConnect, TagStatus, ContentDisplay } from './Monitor.styles';

interface MonitorProps {
  onClose: () => void;
  visible: boolean;
}

const Monitor: React.FC<MonitorProps> = ({ onClose, visible }) => {
  const socket = useContext(WebSocketContext);
  const [dataValues, setDataValues] = useState<number[]>([]);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [connectedModule, setConnectedModule] = useState(false);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      const dataArray: string[] = data.split(',');
      
      const numericValues: number[] = dataArray.slice(0, dataArray.length).map(Number);
      
      numericValues.map((value, index) => {
        if (index === 0 || index === 1 || index === 2) {
          numericValues[index] = Number(value.toFixed(2)) / 10;
        }
      });

      const dateAndTime: string = `${dataArray[dataArray.length - 2]} ${dataArray[dataArray.length - 1]}`;

      setTimestamp(dateAndTime);
      setDataValues(numericValues);
    });

    if (socket.disconnected) {
      setConnectedModule(false);
      message.warning('Aguardando conexão!');
      socket.off('message');
    } else {
      setConnectedModule(true);
      message.success('Conexão estabelecida!');
    }
  }, [socket.disconnected]);

  const scrollToBottom = () => {
    const messageContainer: any = messageContainerRef;
    if (messageContainer.current) {
      messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [dataValues, timestamp]);

  const sensorDataLabelsTop = ['Temperatura', 'Umidade', 'pH'];
  const sensorDataLabelsBottom = ['Nitrogenio', 'Fosforo', 'Potassio'];

  const sensorDataUnits = ['°C', '%', '', 'mg/kg', 'mg/kg', 'mg/kg'];

  const statisticsDataTop = sensorDataLabelsTop.map((label, index) => ({
    title: label,
    value: `${dataValues[index]} ${sensorDataUnits[index]}`,
    icon: getIcon(label),
  }));

  const statisticsDataBottom = sensorDataLabelsBottom.map((label, index) => ({
    title: label,
    value: `${dataValues[index + sensorDataLabelsTop.length]} ${sensorDataUnits[index + sensorDataLabelsTop.length]}`,
    icon: getIcon(label),
  }));

  function getIcon(label: string) {
    switch (label) {
      case 'Temperatura':
        return <FieldTimeOutlined />;
      case 'Umidade':
        return <CloudFilled />;
      case 'pH':
        return <DingdingOutlined />;
      case 'Nitrogênio':
        return <FireFilled />;
      case 'Fósforo':
        return <DingdingOutlined />;
      case 'Potássio':
        return <AreaChartOutlined />;
      default:
        return null;
    }
  }

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      width="50vw"  // Ajuste o tamanho conforme necessário
    >
      <Container>
        <Content>
          <Display>
            <Header>
              <h1>Monitor de recursos</h1>
              <StatusConnect>
                <TagStatus
                  icon={
                    connectedModule ? (
                      <CheckCircleOutlined />
                    ) : (
                      <SyncOutlined spin />
                    )
                  }
                  color={connectedModule ? 'success' : 'processing'}
                >
                  {connectedModule ? 'Conectado' : 'Sincronizando...'}
                </TagStatus>
              </StatusConnect>
            </Header>
            <ContentDisplay ref={messageContainerRef}>
              <div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  {statisticsDataTop.map((data, index) => (
                    <Card key={index} style={{ width: '300px', margin: '20px' }}>
                      <div>
                        <div>{data.icon}</div>
                        <div>
                          <div>{data.title}</div>
                          <div>{data.value}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  {statisticsDataBottom.map((data, index) => (
                    <Card key={index} style={{ width: '300px', margin: '20px' }}>
                      <div>
                        <div>{data.icon}</div>
                        <div>
                          <div>{data.title}</div>
                          <div>{data.value}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </ContentDisplay>
          </Display>
        </Content>
      </Container>
    </Modal>
  );
};

export default Monitor;
