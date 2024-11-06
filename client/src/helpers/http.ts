export const postStream = async (
  url: string,
  data: any,
  settings: RequestInit = {},
) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}${url}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", ...settings.headers },
    ...settings,
  });

  if (!response.ok)
    throw new Error(`Post request failed: ${response.statusText}`);

  const textDecoderStream = new TextDecoderStream();
  const readableStream = response.body?.pipeThrough(textDecoderStream);
  return readableStream?.getReader();
};
