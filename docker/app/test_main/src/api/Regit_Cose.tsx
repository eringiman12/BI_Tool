import React, { useState } from 'react';
import '../assets/css/Regit.css';
import axios from 'axios';

function Regit_Cose() {
  const [cose_name, setcose_name] = useState('');
  const [contents, setcontents] = useState('');
  const [price, setprice] = useState('');
  const [treatment_area, settreatment_area] = useState('');
  
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // デフォルトのフォーム送信動作を無効化
    // バリデーション
    if (!cose_name || !contents || !price || !treatment_area) {
      setError('全てのフィールドを入力してください。');
      return;
    }

    // if (date.length < 6) {
    //   setError('パスワードは6文字以上にしてください。');
    //   return;
    // }

    setError(''); // エラーがない場合、エラー状態をクリア
    if (cose_name != '') {
      console.log('登録情報:', { cose_name, contents, price, treatment_area});
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:80/api/este-regist-cose/', {
          cose_name,
          contents,
          price,
          treatment_area,
        });
        console.log('登録成功:', response.data);
      } catch (error) {
        console.error('登録失敗:', error);
        setError('登録に失敗しました。再度お試しください。');
      }
    }
    // 入力フィールドをリセット
    setcose_name('');
    setcontents('');
    setprice('');
    settreatment_area('');
  };

  return (
    <div className="register-form">
      <h2>コース登録フォーム</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cose_name">コース名:</label>
          <input
            type="text"
            id="cose_name"
            value={cose_name}
            onChange={(e) => setcose_name(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contents">コース内容:</label>
          <input
            type="text"
            id="contents"
            value={contents}
            onChange={(e) => setcontents(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="text">価格:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="text">施術部位:</label>
          <input
            type="text"
            id="treatment_area"
            value={treatment_area}
            onChange={(e) => settreatment_area(e.target.value)}
          />
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  );
}

export default Regit_Cose;