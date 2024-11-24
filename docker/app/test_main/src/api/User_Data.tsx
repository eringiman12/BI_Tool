import { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/Main.css';

type ApiResponse = {
  id: number;
  name: string;
  address: string;
  date: string;
  cost: string;
};

function UserData() {
  const [data, setData] = useState<ApiResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<ApiResponse[]>('http://localhost:80/api/este/');
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
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>名前</th>
            <th>住所</th>
            <th>日付</th>
            <th>コスト</th>
            <th>実行</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.date}</td>
              <td>{item.cose}</td>
              <td>
                <button>編集</button>
                <button>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserData;