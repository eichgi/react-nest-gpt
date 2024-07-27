import {
  GptMessage,
  GptOrthographyMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '../../components';
import { useState } from 'react';
import { orthographyUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}

export const OrthographyPage = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { text, isGpt: false }]);

    const data = await orthographyUseCase(text);

    if (!data.ok) {
      setMessages((prev) => [...prev, { text: 'No se pudo realizar la corrección', isGpt: true }]);
    } else {
      setMessages((prev) => [...prev, {
        text: data.message,
        isGpt: true,
        info: {
          errors: data.errors,
          message: data.message,
          userScore: data.userScore,
        },
      }]);
    }

    setIsLoading(false);

    // todo add is gpt true
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Soy IA Assistant, puedes preguntartme sobre cualquier cosa." />
          {
            messages.map((message, index) => (
              message.isGpt
                ? (<GptOrthographyMessage
                  key={index}
                  errors={message.info!.errors}
                  message={message.info!.message}
                  userScore={message.info!.userScore}
                />)
                : <MyMessage key={index} text={message.text} />
            ))
          }
          {isLoading &&
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader className="fade-in" />
            </div>
          }
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe aqui cualquier cosa"
        disableCorrections
      />
      {/*<TextMessageBoxFile*/}
      {/*  onSendMessage={handlePost}*/}
      {/*  placeholder="Escribe aqui cualquier cosa"*/}
      {/*/>*/}
      {/*<TextMessageBoxSelect*/}
      {/*  onSendMessage={() => console.log("selected option")}*/}
      {/*  options={[{id: '1', text: 'Hola mundo'}, {id: '2', text: 'Adios mundo'}]}*/}
      {/*/>*/}
    </div>
  );
};