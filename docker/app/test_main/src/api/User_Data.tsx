import { useState, useEffect } from 'react';
import React from 'react';
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

  // 編集用の状態
  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [cost, setCost] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // バリデーションチェック
    if (!name || !address || !date || !cost) {
      setError('全てのフィールドを入力してください。');
      return;
    }

    try {
      if (editId !== null) {
        // 編集モードの場合
        await axios.put(`http://localhost:80/api/este/${editId}/`, {
          name,
          address,
          date,
          cost,
        });
        console.log('更新成功');
      } else {
        // 新規登録モードの場合
        await axios.post('http://localhost:80/api/este-regist/', {
          name,
          address,
          date,
          cost,
        });
        console.log('登録成功');
      }

      fetchData(); // 最新データを取得
    } catch (error) {
      console.error('登録/更新失敗:', error);
      setError('登録または更新に失敗しました。再度お試しください。');
    }

    resetForm();
  };

  const handleEdit = (item: ApiResponse) => {
    setEditId(item.id); // 編集対象のIDを設定
    setName(item.name);
    setAddress(item.address);
    setDate(item.date);
    setCost(item.cost);
  };

  const resetForm = () => {
    setEditId(null);
    setName('');
    setAddress('');
    setDate('');
    setCost('');
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<ApiResponse[]>('http://localhost:80/api/este/');
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

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>名前</th>
              <th>住所</th>
              <th>日付</th>
              <th>コスト</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  {editId === item.id ? (
                    <>
                      <button type="button" onClick={() => handleSubmit(event)}>
                        保存
                      </button>
                      <button type="button" onClick={resetForm}>
                        キャンセル
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => handleEdit(item)}>
                        編集
                      </button>
                      <button type="button" onClick={() => handleDelete(item.id)}>
                        削除
                      </button>
                    </>
                  )}
                </td>
                <td>{item.id}</td>
                <td>
                  <input
                    type="text"
                    value={editId === item.id ? name : item.name} // 編集中ならstateを表示
                    onChange={(e) => setName(e.target.value)} // 編集中はstateを更新
                    disabled={editId !== item.id} // 編集中の行だけ操作可能
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editId === item.id ? address : item.address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={editId !== item.id}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={editId === item.id ? date : item.date}
                    onChange={(e) => setDate(e.target.value)}
                    disabled={editId !== item.id}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={editId === item.id ? cost : item.cost}
                    onChange={(e) => setCost(e.target.value)}
                    disabled={editId !== item.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default UserData;