
import { useEffect, useMemo, useState } from "react";
import Table from "./components/Table";
import "./styling/dashboard.css"
import Modal from "./components/Modal";

const Dashboard = () => {
const COLUMNS = [

    {
        header: 'Ticket',
        accessorKey: 'title',
    },
    {
        header: 'Description',
        accessorKey: 'description',
    },
    {
        header: 'Commercial',
        accessorKey: 'user.name',
    },
    {
        header: 'specialté',
        accessorKey: 'speciality',
    },

    ];
    const columns = useMemo(() => COLUMNS, []);
    const [trigger,setTrigger] = useState(false)

    const [tickets, setTickets] = useState([]);
    const getTickets=async()=>{

        try{
          const response = await fetch(`http://127.0.0.1:8000/api/tickets`,
            {method:"GET",
              headers: {
            'Content-Type': 'application/json',
          },
          
        });
        
        if (response.ok) {
      //setLoading(false)
      const data = await response.json();
      //console.log(data)
      setTickets(data)
      }
        
        }catch(e){
          console.log(e)
        }
      }

useEffect(()=>{
      getTickets()
    },[])
  return (
    <div className="p-4 max-w-sm w-full" style={{color:"#ecedee",width:"max-content"}}>
      <div style={{display:"flex",justifyContent:"space-between", alignItems:"center", gap:15}}>
        <h1 className="text-2xl font-bold mb-4 pr-2 " >Liste des Tickets</h1>
        <div onClick={()=>setTrigger(prev=>!prev)} style={{cursor:"pointer",border:"1px solid rgb(91, 91, 91)", borderRadius:5,paddingBlock: 4, paddingInline: 25 }}><i style ={{fontWeight:500}} className="fa-solid fa-pen-to-square"></i></div>
      </div>
      <div className="liste-tickets">
        <Table data={tickets} columns={columns}/>
      </div>
      {trigger && <Modal setTrigger={setTrigger} getTickets={getTickets}/>}
    </div>
  );
};

export default Dashboard;
