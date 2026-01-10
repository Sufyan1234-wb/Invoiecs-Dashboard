import {useEffect, useState } from 'react'
import bg from "./assets/images/bg pic.jpg";
import logo1 from "./assets/images/bglogo1.png"
import logo2 from "./assets/images/logo6.png"
import logo3 from "./assets/images/bglogo3.png"
function App() {

 const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFWFWzDARomRfAoSmQN4lK_LEVficcY_mE5fzlhADnNSdIDvdeY1O1jHbi-vBdvyj3oRP9muc0rOd_/pub?gid=0&single=true&output=csv";

  const [sheetData, setSheetData] = useState([]);

 useEffect(() => {

  const fetchData = () => {
    fetch(SHEET_URL)
      .then(res => res.text())
      .then(csv => {
        const rows = csv
          .trim()
          .split("\n")
          .map(row => {
            const matches = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
            return matches.map(val => val.replace(/"/g, ""));
          });

        setSheetData(rows);
      });
  };

  fetchData(); // load first time

  const interval = setInterval(fetchData, 10000); // reload every 30 sec

  return () => clearInterval(interval); // cleanup

}, []);



  return (
    <>
      <div className="h-screen relative  w-full border  bg-no-repeat">
        <img className="h-full w-full absolute top-0 left-0 z-10" src={bg} />

        <div className='h-screen w-full absolute top-0 left-0 z-30  item'>
          <div className='h-max w-full flex justify-between items-center'>
            <img className='h-40 w-70' src={logo2} />
            <img className='h-35' src={logo1} />
            <img className='h-40' src={logo3} />
          </div>
          <div className='h-[75vh] w-full  mt-2 flex justify-evenly items-center'>

            <div className='h-[50vh] w-[40vw] rounded-2xl bg-white'>
              <div className='h-[10vh] w-full  rounded-tr-2xl rounded-tl-2xl bg-black text-white text-4xl font-bold flex justify-evenly items-center'>
                <h1>Maunal Summary Till</h1>
                <h2>{sheetData[1]?.[1]}</h2>
              </div>
              <div className='h-[10vh] w-full  bg-gray-200 text-2xl font-bold flex justify-between items-center'>
                <h1 className='pl-12'>Avaerage</h1>
                <h2 className='pr-12' >{sheetData[2]?.[1]}</h2>
              </div>
              <div className='h-[10vh] w-full  text-2xl font-bold flex justify-between items-center'>
                <h1 className='pl-12'>Total Invoice Amount</h1>
                <h2 className='pr-12'>{sheetData[3]?.[1]}</h2>
              </div>
              <div className='h-[10vh] w-full  bg-gray-200 text-2xl font-bold flex justify-between items-center'>
                <h1 className='pl-12'>Total Penalities</h1>
                <h2 className='pr-12'>{sheetData[4]?.[1]}</h2>
              </div>
              <div className='h-[10vh] w-full  text-2xl font-bold flex justify-between items-center'>
                <h1 className='pl-12'>Total Remaining Amount</h1>
                <h2 className='pr-12'>{sheetData[5]?.[1]}</h2>
              </div>

            </div>
            <div className='h-[50vh] w-[40vw] rounded-2xl bg-white'>
              <div className='h-[10vh] w-full  rounded-tr-2xl rounded-tl-2xl bg-black text-white text-4xl font-bold flex justify-evenly items-center'>
                <h1>PED Summary Till</h1>
                <h2>{sheetData[1]?.[3]}</h2>
              </div>
              <div className='h-[10vh] w-full  bg-gray-200 text-2xl font-bold flex justify-between items-center'>
                <h1 className='pl-12'>Avaerage</h1>
                <h2 className='pr-12'>{sheetData[2]?.[3]}</h2>
              </div>
              <div className='h-[10vh] w-full  text-2xl font-bold flex justify-between items-center'>
                <h1 className='pl-12'>Total Invoice Amount</h1>
                <h2 className='pr-12'>{sheetData[3]?.[3]}</h2>
              </div>
              <div className='h-[10vh] w-full  bg-gray-200 text-2xl font-bold flex justify-between items-center'>
                <h1 className='pl-12'>Total Penalities</h1>
                <h2 className='pr-12'>{sheetData[4]?.[3]}</h2>
              </div>
              <div className='h-[10vh] w-full  text-2xl font-bold flex justify-between items-center'>
                <h1 className='pl-12'>Total Remaining Amount</h1>
                <h2 className='pr-12'>{sheetData[5]?.[3]}</h2>
              </div>

            </div>
          </div>







        </div>
      </div>
    </>
  )
}

export default App
