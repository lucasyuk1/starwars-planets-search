const fetchApi = async (url) => {
  try {
    const dataApi = await fetch(url)
      .then((response) => response.json())
      .then((data) => data);
    return dataApi;
  } catch (e) {
    throw new Error('Erro ao buscar dados da API');
  }
};

export default fetchApi;
