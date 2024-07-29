import type { AudioToTextResponse } from '../../interfaces';

export const audioToTextUseCase = async (audioFile: File, prompt?: string) => {
  try {
    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('prompt', prompt);

    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/audio-to-text`, {
      method: 'POST',
      body: formData,
    });

    if (!resp.ok) {
      throw new Error('No se pudo procesar el audio');
    }

    const data = await resp.json() as AudioToTextResponse;

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};