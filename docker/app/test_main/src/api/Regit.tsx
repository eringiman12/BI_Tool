import React, { useState } from 'react';
import '../assets/css/Regit.css';
import axios from 'axios';

function Regit() {
  const [name, setname] = useState('');
  const [address, setaddress] = useState('');
  const [date, setdate] = useState('');
  const [cose, setcose] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // デフォルトのフォーム送信動作を無効化
    // バリデーション
    if (!name || !address || !date || !cose) {
      setError('全てのフィールドを入力してください。');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(address)) {
      setError('正しいメールアドレスを入力してください。');
      return;
    }
    // if (date.length < 6) {
    //   setError('パスワードは6文字以上にしてください。');
    //   return;
    // }

    setError(''); // エラーがない場合、エラー状態をクリア
    if (name != '') {
      console.log('登録情報:', { name, address, date, cose});
      console.log('登録処理をお粉います');
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:80/api/este-regist/', {
          name,
          address,
          date,
          cose
        });
        console.log('登録成功:', response.data);
      } catch (error) {
        console.error('登録失敗:', error);
        setError('登録に失敗しました。再度お試しください。');
      }
    }
    // 入力フィールドをリセット
    setname('');
    setaddress('');
    setdate('');
    setcose('');
  };

  return (
    <div className="register-form">
      <h2>登録フォーム</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">ユーザー名:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">メールアドレス:</label>
          <input
            type="address"
            id="address"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="text">コース:</label>
          <input
            type="text"
            id="cose"
            value={cose}
            onChange={(e) => setcose(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="date">日付:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
          />
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  );
}

export default Regit;