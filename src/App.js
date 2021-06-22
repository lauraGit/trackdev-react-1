import { useState } from 'react'
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import UserContext from './contexts/UserContext'
import Header from './components/Header'
import Main from './components/Main'

function App() {
  const [user, setUser] = useState({ loggedIn: false, username: null})

  return (
    <UserContext.Provider value={{user: user, setUser: setUser}}>
      <Router>
        <div className="app">
          <Header />
          <Main />
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
