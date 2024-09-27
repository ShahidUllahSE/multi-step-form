import { Routes, Route } from 'react-router-dom';
import Step1 from './Components/Step1';
import Step2 from './Components/Step2';
import Final from './Components/Final';

function App() {
  return (
    <div className="container mx-auto">
      <Routes>
        <Route path="/" element={<Step1 />} />
        <Route path="/AddFamilyMembers" element={<Step2 />} />
        <Route path="/result" element={<Final />} />
      </Routes>
    </div>
  );
}

export default App;
