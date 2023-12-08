import './App.css';
import AuthProvider from './Context/AuthContext';
import Pages from './Pages/Pages';


function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Pages/>
        </AuthProvider>
        </div>
  );
}

export default App;
