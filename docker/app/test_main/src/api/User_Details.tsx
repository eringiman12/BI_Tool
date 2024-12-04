import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../assets/css/Main.css';

type ApiResponse = {
  id: number;
  name: string;
  address: string;
  date: string;
  tel: string;
  birthday: string;
};

function UserData() {
  const [data, setData] = useState<ApiResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams(); 

  const fetchData = async () => {
    
    try {
      const response = await axios.get<ApiResponse[]>(`http://localhost:80/api/este-userDetails/${id}/`);
      setData(response.data);
    } catch (err) {
      setError('データの取得に失敗しました');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(data)
  if (data.length != 0) {
    return (
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>操作</th>
              <th>ID</th>
              {/* <th>名前</th>
              <th>メール</th>
              <th>日付</th>
              <th>電話番号</th>
              <th>誕生日</th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <button>編集</button>
              </td>
              <td>{data.id}</td>
            </tr>
          </tbody>
          
        </table>
        
      </div>
    );
  } else {
    return (
      <div className="container">データが登録されてません</div>
    )
  }
  
}

export default UserData;