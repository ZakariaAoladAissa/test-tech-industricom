
import { useEffect, useRef, useState } from "react"
import "../styling/modal.css"
const  Modal  = ({setTrigger, getTickets})=>{
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [speciality,setSpeciality] = useState("informatique")
    const [isSubmitting,setIsSubmitting] = useState(false)
    const [error,setError] = useState(false)

    const handleClick=(e)=>{
            setTrigger(prev=>!prev)}

    const handleSubmit = async(ev)=>{
        try{
            setIsSubmitting(true)
           const response = await fetch(`http://127.0.0.1:8000/api/tickets`,
            {method:"POST",
            headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
            },
            body:JSON.stringify({
                title,
                description,
                speciality
            })
         });

          if (response.ok){
            const data = await response.json();
            //console.log(data)
            setTrigger(prev=>!prev)
            getTickets()
          }else{
            setError(true)
          }
            
        }catch(e){
            console.log(e)
            setError(true)
        }finally{
            setIsSubmitting(false)
        }
    }

    return(
        <div onClick={handleClick}>

            <div  id="myModal" className="modal">

            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span onClick={handleClick} className="close">&times;</span>
                <h2>Ajouter un ticket</h2>

                
                <div className="scroll-buttons">
                </div>

                <div className="description-event">
                    <label htmlFor="title">Titre</label>
                    <input onChange={(e) => setTitle(e.target.value)} value={title} id="title" type="text" placeholder="Entrer le titre.." required/>
                </div>
                <div className="description-event">
                    <label htmlFor="description">Description</label>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} id="description" type="text" placeholder="Entrer la description.." required></textarea>
                </div>
                <div className="description-event">
                    <label htmlFor="speciality">Spécialité</label>
                    <select value={speciality} onChange={(e) => setSpeciality(e.target.value)}>
                        <option value="informatique">Informatique</option>
                        <option value="finance">Finance</option>
                        <option value="marketing">Marketing</option>                        
                    </select>
                </div>
                {error && <p style={{color:"red", fontSize:12}}>*Veuillez completer tous les champs !</p>}
                <button disabled={isSubmitting} onClick={handleSubmit} className="button-create">
                    Créer Ticket
                </button>
            </div>

            </div>
        </div>
    )
}
export default  Modal 