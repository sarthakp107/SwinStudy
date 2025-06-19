//Transfroms any block of text into Vector Strings, making it easier to send context with API calls
//Function provided by our Server hosted in GCP
export const Embedder = async (text: string) => {
    const response = await fetch("http://34.27.68.140:8000/embed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    return data.embedding;
  };
  