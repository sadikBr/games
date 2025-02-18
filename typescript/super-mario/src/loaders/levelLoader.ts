export type Level = {
  backgrounds: Background[];
};

export type Background = {
  tile: string;
  ranges: number[][];
};

export default async function loadLevel(name: string): Promise<Level> {
  const response = await fetch(`/levels/${name}.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  let jsonResponse;

  try {
    jsonResponse = await response.json();
  } catch (error) {
    console.error("There was something wrong when converting the response.");
  }

  return jsonResponse;
}
