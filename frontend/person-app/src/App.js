import PersonList from './views/PersonList'
import Header from './components/Header'
import React, { useState } from 'react'
import Socket from './components/Socket'
function App() {
  
  const [render,setRender] = useState(false);

  const rerender = () => {
    setRender(!render);
  }

  return (
    <>    
    <Socket rerender={rerender}></Socket>
    <Header></Header>
    <PersonList></PersonList>
    </>
  );
}




export default App;
