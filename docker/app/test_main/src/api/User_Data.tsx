import { useState, useEffect } from 'react';
import axios from 'axios';

type ApiResponse = {
  id: number;
  name: string;
  address: string;
  date: string;
  cost: string; // APIレスポンスに応じて変更
};

function UserData() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<ApiResponse>('http://localhost:80/api/este/');
        console.log(response)
        setData(response.data);
      } catch (err) {
        setError('データの取得に失敗しました');
        console.error(err);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <p>ID: {item.id}</p>
          <p>名前: {item.name}</p>
          <p>住所: {item.address}</p>
          <p>日付: {item.date}</p>
          <p>コスト: {item.cost}</p>
        </div>
      ))}
    </div>
  );
}

export default UserData;