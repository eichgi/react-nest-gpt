export const prosConsStreamUseCase = async (prompt: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
      //todo abortSignal
    });

    if (!response.ok) {
      throw new Error('error occured');
    }

    const reader = await response.body?.getReader();

    if (!reader) {
      console.log('no se pudo generar el reader');
      return null;
    }

    return reader;
    // const decoder = new TextDecoder();
    // let text = '';
    //
    // while (1) {
    //   const { value, done } = await reader.read();
    //   if (done) {
    //     break;
    //   }
    //
    //   const decodedChunk = await decoder.decode(value, { stream: true });
    //   text += decodedChunk;
    //   console.log(text);
    // }
    //
    // return text;

  } catch (error) {
    console.log(error);
    return null;
  }
};