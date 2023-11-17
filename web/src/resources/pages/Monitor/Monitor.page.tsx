import { Wrapper } from 'resources/components';
import {
  Container,
  Content,
  ContentDisplay,
  Display,
  Header,
  StatusConnect,
  TagStatus
} from './Monitor.styles';
import { useContext, useEffect, useRef, useState } from 'react';
import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { MessageData } from './components';
import { WebSocketContext } from 'app/context';
import { message } from 'antd';
import { type MessageDataType } from './Monitor.types';

export function Monitor(): JSX.Element {
  const socket = useContext(WebSocketContext);
  const [messages, setMessages] = useState<MessageDataType[]>([]);
  const [connectedModule, setConnectedModule] = useState(false);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      const dataRef: string = data.replace(/'/g, '"');

      const dataString: MessageDataType = JSON.parse(dataRef);

      setMessages(prev => [...prev, dataString]);
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
    const messageContainer : any  = messageContainerRef;
    if (messageContainer.current) {
      messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
    }
  };

  useEffect(()=>{
    scrollToBottom();
  }, [messages])

  return (
    <Wrapper title='Monitor de recursos'>
      <Container>
        <Content>
          <Display>
            <Header>
              <h1>Dados de saída do tracker</h1>
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
              {messages.map((message, index) => (
                <MessageData
                  key={index}
                  message={message.message}
                  date={message.date}
                />
              ))}
            </ContentDisplay>
          </Display>
        </Content>
      </Container>
    </Wrapper>
  );
}
