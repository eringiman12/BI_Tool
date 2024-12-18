import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../assets/css/User_Details.css';

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

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [tel, setTel] = useState('');
  const [birthday, setBirthday] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  // 初期行データ
  const [rows, setRows] = useState([
    { courseName: '', courseDetails: '', price: '', treatmentArea: '' },
  ]);

  // 行を追加する関数
  const addRow = () => {
    setRows([
      ...rows,
      { courseName: '', courseDetails: '', price: '', treatmentArea: '' },
    ]);
  };

  // 行データを変更する関数
  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // バリデーションチェック
    if (!name || !address || !date || !tel || !birthday) {
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
          tel,
          birthday
        });
        console.log('更新成功');
      } 
      // else {
      //   // 新規登録モードの場合
      //   await axios.post('http://localhost:80/api/este-regist/', {
      //     name,
      //     address,
      //     date,
      //     tel,
      //     birthday
      //   });
      //   console.log('登録成功');
      // }

      fetchData(); // 最新データを取得
    } catch (error) {
      console.error('登録/更新失敗:', error);
      setError('登録または更新に失敗しました。再度お試しください。');
    }

    resetForm();
  };

  const handleEdit = (item: ApiResponse) => {
    setEditId(item.id);
    setName(item.name);
    setAddress(item.address);
    setDate(item.date);
    setTel(item.tel);
    setBirthday(item.birthday);
  };

  const resetForm = () => {
    setEditId(null);
    setName('');
    setAddress('');
    setDate('');
    setTel('');
    setBirthday('');
  };


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
        <div class="process">
        {editId === data.id ? (
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
              <button type="button" onClick={() => handleEdit(data)}>
                編集
              </button>
              {/* <button type="button" onClick={() => handleDelete(item.id)}>
                削除
              </button> */}
            </>
          )}
        </div>
        <div className="content_user_details">
          <table>
            <thead>
              <tr>
                <th colspan="7">ユーザー情報</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>ID</th>
                <th>名前</th>
                <th>メール</th>
                <th>日付</th>
                <th>電話番号</th>
                <th>誕生日</th>
              </tr>
              <tr>
                <td>{data.id}</td>
                <td>
                  <input
                    type="text"
                    value={editId === data.id ? name : data.name} // 編集中ならstateを表示
                    onChange={(e) => setName(e.target.value)} // 編集中はstateを更新
                    disabled={editId !== data.id} // 編集中の行だけ操作可能
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editId === data.id ? address : data.address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={editId !== data.id}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={editId === data.id ? date : data.date}
                    onChange={(e) => setDate(e.target.value)}
                    disabled={editId !== data.id}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editId === data.id ? tel : data.tel}
                    onChange={(e) => setTel(e.target.value)}
                    disabled={editId !== data.id}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editId === data.id ? birthday : data.birthday}
                    onChange={(e) => setTel(e.target.value)}
                    disabled={editId !== data.id}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="content_user_details">
          <table>
            <thead>
              <tr>
                <th colSpan="7">コース履歴</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>コース名</th>
                <th colSpan="3">コース内容</th>
                <th>価格</th>
                <th>施術部位</th>
                <th>操作</th>
              </tr>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={row.courseName}
                      onChange={(e) =>
                        handleInputChange(index, 'courseName', e.target.value)
                      }
                    />
                  </td>
                  <td colSpan="3">
                    <input
                      type="text"
                      value={row.courseDetails}
                      onChange={(e) =>
                        handleInputChange(index, 'courseDetails', e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.price}
                      onChange={(e) =>
                        handleInputChange(index, 'price', e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.treatmentArea}
                      onChange={(e) =>
                        handleInputChange(index, 'treatmentArea', e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {/* 行を削除するボタン */}
                    <button onClick={() => setRows(rows.filter((_, i) => i !== index))}>
                      削除
                    </button>
                  </td>
                </tr>
              ))} 
              </tbody>
          </table>
          <button onClick={addRow}>＋行を追加</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">データが登録されてません</div>
    )
  }
}

export default UserData;