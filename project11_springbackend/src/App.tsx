import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import "./assets/css/style.css";
import { CompleteRouting } from './app/utils/routes/CompleteRouting';

const loading = (
  <div>Dream is waiting...</div>
)

function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={loading}> 
          <CompleteRouting/>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
