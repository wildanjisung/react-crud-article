import logo from './logo.svg';
import './App.css';
import ArticleCreate from './components/ArticleCreate';
import ArticleUpdate from './components/ArticleUpdate';
import ArticleDelete from './components/ArticleDelete';

function App() {
  return (
    <div className="App">
      <ArticleCreate/>
      <hr></hr>
      <ArticleUpdate/>
      <hr></hr>
      <ArticleDelete/>
    </div>
  );
}

export default App;
