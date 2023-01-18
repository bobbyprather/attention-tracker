import './App.css';
import { Chart } from "react-google-charts"
import { useState, useEffect } from 'react';

const fetchNotesUsage = () => {
  return fetch("http://localhost:3500/notes")
    .then((resp) =>
      resp.json()).then((data) => console.log(data));
}

function App() {
  let [notes, setNotes] = useState(null);
 
  useEffect(() => {
    fetch("http://localhost:3500/notes")
      .then((resp) =>
        resp.json()).then((data) => setNotes(data));
  }, [])

  let data = [];
  let notesData=[];
   const options ={ 
    title: "App Usage",
  }

  if(notes){
    notes.notesUsage.forEach(note => {
      console.log(`note: `,JSON.stringify(note));
      if(note.app != null){
      let temp = [note.app,note.usage];
      notesData.push(temp);
      }
    });
    
   data = [["App","Usage"],...notesData]
   console.log(`notesData: `,data);
    return (
    
      <div className="App">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
      </div>
    );
  }

}

export default App;
