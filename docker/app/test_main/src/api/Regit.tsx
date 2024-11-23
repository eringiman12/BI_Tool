import React, { useState } from 'react';
import '../assets/css/Regit.css';
import axios from 'axios';

function Regit() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // デフォルトのフォーム送信動作を無効化

    // バリデーション
    if (!username || !email || !password) {
      setError('全てのフィールドを入力してください。');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('正しいメールアドレスを入力してください。');
      return;
    }
    if (password.length < 6) {
      setError('パスワードは6文字以上にしてください。');
      return;
    }

    setError(''); // エラーがない場合、エラー状態をクリア
    if (username != '') {
      console.log('登録情報:', { username, email, password });
      const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
        try {
          const response = await axios.post('http://example.com/api/register', {
            username,
            email,
            password,
          });
          console.log('登録成功:', response.data);
        } catch (error) {
          console.error('登録失敗:', error);
          setError('登録に失敗しました。再度お試しください。');
        }
      };
    }
    // 入力フィールドをリセット
    setUsername('');
    setEmail('');
    setPassword('');
  };



  return (
    <div className="register-form">
      <h2>登録フォーム</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">ユーザー名:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  );
}

export default Regit;