const getListData: (
  url: string,
  query: string,
  id: string | number
) => Promise<any> = async (url: string, query: string, id: string | number) => {
  const response: Response = await fetch(
    `http://localhost:3000/${url}/?${query}=${id}`
  );
  const data = await response.json();
  return data;
};

const getIdData: (url: string, id: string | number) => Promise<any> = async (
  url: string,
  id: string | number
) => {
  const response: Response = await fetch(`http://localhost:3000/${url}/${id}`);
  const data = await response.json();
  return data;
};

export { getListData, getIdData };
