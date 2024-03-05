import React, { useEffect, useState, useRef} from 'react'
import allTollGates from '../utils/data'
import { useDispatch, useSelector } from 'react-redux';
import { createToll } from '../slices/TollSlice';

const AdminActions = () => {

    let {CREATE_TOLL_LOADING}=useSelector(state=>state.Toll)
    let dispatch=useDispatch()

    let [activateSuggestions,setActivateSuggestions]=useState(false);
    let [autoSuggestInput,setAutoSuggestInput]=useState("")
    let [autoSuggestData,setAutoSuggestData]=useState()
    let [selectedToll,setSelectedToll]=useState({})

    let [source,setSource]=useState("")
    let [destination,setDestination]=useState("")
    let [noOfTolls,setNoOfTolls]=useState("")
    let [distance,setDistance]=useState("")


    let handleSelection=(data)=>
    {
        setSelectedToll(data)
        setAutoSuggestInput(data.tollName)
        setActivateSuggestions(false)
    }

    let handleSubmit=()=>
    {
        console.log("ARE MAWA",selectedToll)
        dispatch(createToll({source:source,destination:destination,noOfTolls:noOfTolls,distance:distance,...selectedToll}))
    }

    useEffect(()=>
    {
        console.log(selectedToll)
    },[selectedToll])


    useEffect(()=>
    {
        let filtered=allTollGates.filter((items)=>
        {
            return items.tollName.toLowerCase().includes(autoSuggestInput.toLowerCase())
        })
        setAutoSuggestData(filtered)
    },[autoSuggestInput])

    console.log([...allTollGates.sort((a,b)=>
        {
            return b.tollName-a.tollName
        })])


  return (
    <main>
        <input type="text" value={source} onChange={(e)=>setSource(e.target.value)}/>
        <br />
        <input type="text" value={destination} onChange={(e)=>setDestination(e.target.value)}/>
        <input type="text" value={noOfTolls} onChange={(e)=>setNoOfTolls(parseInt(e.target.value))}/>
        <input type="text" value={distance} onChange={(e)=>setDistance(parseFloat(e.target.value))}/>
        <div className="auto-suggest">
            <input type="text" value={autoSuggestInput} onChange={(e)=>setAutoSuggestInput(e.target.value)} onFocus={()=>setActivateSuggestions(true)}/>
            <div className="suggestions max-h-[500px] overflow-scroll overflow-x-hidden">
                {activateSuggestions && autoSuggestData.slice().sort((a,b)=>
                {
                    return a.tollName.localeCompare(b.tollName)
                }).map((items,idx)=>
                {
                    return <p key={idx} onClick={()=>handleSelection(items)} className='cursor-pointer'>{items.tollName}</p>
                })}
            </div>
        </div>
        <button onClick={handleSubmit}>Submit</button>
        
    </main>
  )
}



export default AdminActions