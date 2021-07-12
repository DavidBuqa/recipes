import './App.css';
import IndexPage from './Components/Pages/IndexPage';
import RecipePage from './Components/Pages/RecipePage';
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => {
  return (
    
    <BrowserRouter>
        <Route path="/" exact component={IndexPage} />
        <Route path="/recipe/:id" component={RecipePage} />
    </BrowserRouter>
  );
};

export default App;
