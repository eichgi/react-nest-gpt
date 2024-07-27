import {useState} from "react";
import {GptMessage, MyMessage, TextMessageBox, TypingLoader} from "../components";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ChatTemplate = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, {text, isGpt: false}]);

    //todo useCase
    setIsLoading(false);

    // todo add is gpt true
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Soy IA Assistant, puedes preguntartme sobre cualquier cosa."/>
          {
            messages.map((message, index) => (
              message.isGpt ? (<GptMessage key={index} text="Mensaje de Open AI"/>)
                : <MyMessage key={index} text={message.text}/>
            ))
          }
          {isLoading &&
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader className="fade-in"/>
            </div>
          }
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe aqui cualquier cosa"
        disableCorrections
      />
    </div>
  );
};