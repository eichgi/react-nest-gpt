import Markdown from 'react-markdown';

interface Props {
  text: string;
  audio: string;
}

export const GptMessageAudio = ({ text, audio }: Props) => {
  return (
    <div className="col-start-1 col-end-10 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
          G
        </div>
        <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
          <Markdown>{text}</Markdown>
          <audio src={audio} controls autoPlay className="w-full" />
        </div>
      </div>
    </div>
  );
};