import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import '../assets/css/Main.css';

type ApiResponse = {
  id: number;
  name: string;
  address: string;
  date: string;
  cose: string;
};

function UserData() {
  const [data, setData] = useState<ApiResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 編集用の状態
  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [cose, setcose] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // バリデーションチェック
    if (!name || !address || !date || !cose) {
      setError('全てのフィールドを入力してください。');
      return;
    }

    try {
      if (editId !== null) {
        // 編集モードの場合
        await axios.put(`http://localhost:80/api/este-update/${editId}/`, {
          name,
          address,
          date,
          cose,
        });
        console.log('更新成功');
      } else {
        // 新規登録モードの場合
        await axios.post('http://localhost:80/api/este-regist/', {
          name,
          address,
          date,
          cose,
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
  
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:80/api/este-delete/${id}/`);
      console.log(`ID ${id} の削除に成功`);
      fetchData(); // データを再取得して画面を更新
    } catch (error) {
      console.error(`ID ${id} の削除に失敗:`, error);
      setError('削除に失敗しました。再度お試しください。');
    }
  };

  const handleEdit = (item: ApiResponse) => {
    setEditId(item.id);
    setName(item.name);
    setAddress(item.address);
    setDate(item.date);
    setcose(item.cose);
  };

  const resetForm = () => {
    setEditId(null);
    setName('');
    setAddress('');
    setDate('');
    setcose('');
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<ApiResponse[]>('http://localhost:80/api/este-list/');
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

  console.log(data.length)
  if (data.length != 0) {
    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <table>
            <thead>
              <tr>
                <th>操作</th>
                <th>ID</th>
                <th>名前</th>
                <th>メール</th>
                <th>日付</th>
                <th>コスト</th>
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
                      type="text"
                      value={editId === item.id ? cose : item.cose}
                      onChange={(e) => setcose(e.target.value)}
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
  } else {
    return (
      <div className="container">データが登録されてません</div>
    )
  }
  
}

export default UserData;