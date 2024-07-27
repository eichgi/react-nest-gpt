import { TranslateResponse } from '../../interfaces';

export const translateTextUseCase = async (prompt: string, lang: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_GPT_API}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!response.ok) {
      throw new Error('No se pudo realizar la traducción');
    }

    const data = await response.json() as TranslateResponse;

    return {
      ok: true,
      ...data,
    };

  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo realizar la traducción',
    };
  }
};