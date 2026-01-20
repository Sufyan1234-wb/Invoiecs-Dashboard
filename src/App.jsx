import { useEffect, useState } from 'react'
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

const SummaryRow = ({ label, value, gray }) => (
  <div
    className={`w-full flex justify-between items-center px-6 py-4 text-lg sm:text-xl font-semibold ${
      gray ? "bg-gray-200" : ""
    }`}
  >
    <h1>{label}</h1>
    <h2>{value}</h2>
  </div>
);

  return (
    <>
     
      <div className="min-h-screen relative w-full bg-no-repeat">
        <img
          className="h-full w-full absolute top-0 left-0 z-10 object-cover"
          src={bg}
          alt="background"
        />

        
        <div className="relative z-30 min-h-screen w-full px-4 sm:px-6 lg:px-10">

        
          <div className="w-full flex flex-wrap justify-between items-center py-4 gap-4">
            <img className="h-20 sm:h-28 lg:h-40 daewoo" src={logo2} alt="logo2" />
            <img className="h-16 sm:h-24 lg:h-35 suthra" src={logo1} alt="logo1" />
            <img className="h-20 sm:h-24  lg:h-40 Gogreen" src={logo3} alt="logo3" />
          </div>

        
          <div className="w-full mt-6 flex flex-col lg:flex-row gap-6 justify-center items-center">

            
            <div className="w-full lg:w-[45%] rounded-2xl bg-white shadow-lg overflow-hidden">

              <div className="bg-black text-white lg:text-4xl md:text-2xl sm:text-xl font-bold flex justify-between items-center px-6 py-4">
                <h1>Manual Summary Till</h1>
                <h2>{sheetData[1]?.[1]}</h2>
              </div>

              <SummaryRow label="Average" value={sheetData[2]?.[1]} gray />
              <SummaryRow label="Total Invoice Amount" value={sheetData[3]?.[1]} />
              <SummaryRow label="Total Penalties" value={sheetData[4]?.[1]} gray />
              <SummaryRow label="Net Receivable" value={sheetData[5]?.[1]} />

            </div>

          
            <div className="w-full lg:w-[45%] rounded-2xl bg-white shadow-lg overflow-hidden">

              <div className="bg-black text-white   lg:text-4xl md:text-2xl sm:text-xl font-bold flex justify-between items-center px-6 py-4">
                <h1>PED Summary Till</h1>
                <h2>{sheetData[1]?.[3]}</h2>
              </div>

              <SummaryRow label="Average" value={sheetData[2]?.[3]} gray />
              <SummaryRow label="Total Invoice Amount" value={sheetData[3]?.[3]} />
              <SummaryRow label="Total Penalties" value={sheetData[4]?.[3]} gray />
              <SummaryRow label="Net Receivable" value={sheetData[5]?.[3]} />

            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
