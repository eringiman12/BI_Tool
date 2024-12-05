import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/css/Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = (menuIndex: number) => {
    setActiveMenu(activeMenu === menuIndex ? null : menuIndex);
  };

  const navigate = useNavigate();

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="hamburger" onClick={toggleSidebar}>
        {isOpen ? '☰' : '☰'}
      </button>
      {isOpen && (
        <div className="sidebar-content">
        <div className="menu">
            <div className="menu-title" onClick={() => toggleMenu(1)}>
                <button onClick={() => navigate('/')}>ホーム</button>
            </div>
          </div>
          <div className="menu">
            <div className="menu-title" onClick={() => toggleMenu(1)}>
              データ関連
            </div>
            {activeMenu === 1 && (
              <div className="menu-content">
                <div className="content-name">
                    <Link to={`/regit_user`}>ユーザー登録</Link>
                </div>
                <div className="content-name">
                    <Link to={`/regit_cose`}>コース登録</Link>
                </div>
                
              </div>
            )}
          </div>
          <div className="menu">
            <div className="menu-title" onClick={() => toggleMenu(2)}>
              メニュー2
            </div>
            {activeMenu === 2 && (
              <div className="menu-content">
                <p>メニュー2-1</p>
                <p>メニュー2-2</p>
              </div>
            )}
          </div>
          <div className="menu">
            <div className="menu-title" onClick={() => toggleMenu(3)}>
              メニュー3
            </div>
            {activeMenu === 3 && (
              <div className="menu-content">
                <p>メニュー3-1</p>
                <p>メニュー3-2</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;