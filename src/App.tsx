import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { About } from './pages/About';
import { Hardware } from './pages/Hardware';
import { Validation } from './pages/Validation';
import { RPC } from './pages/RPC';
import { Sequencing } from './pages/Sequencing';
import { ZKProver } from './pages/ZKProver';
import { GPUCompute } from './pages/GPUCompute';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/hardware" element={<Hardware />} />
      <Route path="/validation" element={<Validation />} />
      <Route path="/rpc" element={<RPC />} />
      <Route path="/sequencing" element={<Sequencing />} />
      <Route path="/zk-prover" element={<ZKProver />} />
      <Route path="/gpu-compute" element={<GPUCompute />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;