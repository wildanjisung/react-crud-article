import logo from './logo.svg';
import './App.css';
import ArticleRead from './components/ArticleRead';
import ArticleCreate from './components/ArticleCreate';
import ArticleUpdate from './components/ArticleUpdate';
import ArticleDelete from './components/ArticleDelete';

function App() {
  return (
    <div className="App">
      <ArticleRead/>
      <hr></hr>
      <ArticleCreate/>
      <hr></hr>
      <ArticleUpdate/>
      <hr></hr>
      <ArticleDelete/>
    </div>
  );
}

export default App;
