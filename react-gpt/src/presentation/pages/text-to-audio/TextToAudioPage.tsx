import { useState } from 'react';
import { GptMessage, GptMessageAudio, MyMessage, TextMessageBoxSelect, TypingLoader } from '../../components';
import { textToAudioUseCase } from '../../../core/use-cases';

interface TextMessage {
  text: string;
  isGpt: boolean;
  type: 'text';
}

const voices = [
  { id: 'nova', text: 'nova' },
  { id: 'alloy', text: 'alloy' },
];

interface AudioMessage {
  text: string;
  isGpt: boolean;
  audio: string;
  type: 'audio';
}

type Message = TextMessage | AudioMessage;

export const TextToAudioPage = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, selectedVoice: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { text, isGpt: false, type: 'text' }]);

    const { ok, message, audioUrl } = await textToAudioUseCase(text, selectedVoice);
    console.log(audioUrl);
    setIsLoading(false);

    if (!ok) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      { text: `${selectedVoice} - ${message}`, isGpt: true, type: 'audio', audio: audioUrl! },
    ]);
  };

  return <div className="chat-container">
    <div className="chat-messages">
      <div className="grid grid-cols-12 gap-y-2">
        <GptMessage text="Escribe el audio que quieras generar mediante IA" />
        {
          messages.map((message, index) => message.isGpt ? (
                message.type === 'audio'
                  ? (<GptMessageAudio
                    key={index}
                    text={message.text}
                    audio={message?.audio}
                  />)
                  : <MyMessage key={index} text={message.text} />
              )
              : <MyMessage key={index} text={message.text} />,
          )
        }
        {isLoading &&
          <div className="col-start-1 col-end-12 fade-in">
            <TypingLoader className="fade-in" />
          </div>
        }
      </div>
    </div>

    <TextMessageBoxSelect
      onSendMessage={handlePost}
      placeholder="Escribe aqui cualquier cosa"
      options={voices}
    />
  </div>;
};