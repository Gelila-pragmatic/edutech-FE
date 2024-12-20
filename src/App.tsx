import { Route, Routes } from "react-router-dom";
import English from "./English";
import Math from "./Math";

function App() {
  return (
    <Routes>
      {/* Uncomment and add a wrapper route if needed */}
      {/* <Route element={<ClientAlreadyLogged />}> */}
      <Route path="/" element={<English />} />
      <Route path="/math" element={<Math />} />
      {/* </Route> */}
    </Routes>
  );
}

export default App;
