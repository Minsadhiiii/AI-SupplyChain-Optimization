import './index.css';
import PredictForm from './components/PredictForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-center text-3xl font-bold mb-8">AI Supply Chain Optimizer</h1>
      <PredictForm />
    </div>
  );
}

export default App;