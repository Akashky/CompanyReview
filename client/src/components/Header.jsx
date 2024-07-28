import { Link } from 'react-router-dom'


function Header({globalSearchValue, handleGlobalSearchValueChange}) {
  return (
    <header className="app-header">
    <div className="app-logo">
      <i className="fas fa-star" />
      <h1><Link to="/">Review&RATE</Link></h1>
    </div>
    <div className="app-search">
      <input type="text" placeholder="Search..." value={globalSearchValue} 
      onChange={handleGlobalSearchValueChange}
      style={{padding:"5px 5px", border:"none"}} />
      <i className="fas fa-search" />
    </div>
    <div className="app-actions">
      <button className="app-action-button">SignUp</button>
      <button className="app-action-button">Login</button>
    </div>
  </header>
  )
}

export default Header