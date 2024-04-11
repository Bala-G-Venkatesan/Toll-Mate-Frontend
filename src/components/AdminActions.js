import React, { useEffect, useState } from 'react'
import allTollGates from '../utils/data'
import { useDispatch, useSelector } from 'react-redux';

const AdminActions = () => {

    let {CREATE_TOLL_LOADING}=useSelector(state=>state.Toll)
    let dispatch=useDispatch()

    let [activateSuggestions,setActivateSuggestions]=useState(false);
    let [autoSuggestInput,setAutoSuggestInput]=useState("")
    let [autoSuggestData,setAutoSuggestData]=useState()
    let [selectedToll,setSelectedToll]=useState({})

    let [source,setSource]=useState("")
    let [destination,setDestination]=useState("")
    let [noOfTolls,setNoOfTolls]=useState(null)
    let [distance,setDistance]=useState(null)


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
      <input
        type="text"
        value={source}
        placeholder="Source"
        onChange={(e) => setSource(e.target.value)}
        className="h-[35px] border-[1px] mb-1 outline-none px-[5px] focus:border-blue-500 rounded-sm"
      />
      <br />
      <input
        type="text"
        value={destination}
        placeholder="Destination"
        onChange={(e) => setDestination(e.target.value)}
        className="h-[35px] border-[1px] mb-1 outline-none px-[5px] focus:border-blue-500 rounded-sm"
      />
      <input
        type="number"
        value={noOfTolls}
        placeholder="No Of Tolls"
        onChange={(e) => setNoOfTolls(parseInt(e.target.value))}
        className="h-[35px] border-[1px] mb-1 outline-none px-[5px] focus:border-blue-500 rounded-sm"
      />
      <input
        type="number"
        value={distance}
        placeholder="Distance (In km)"
        onChange={(e) => setDistance(parseFloat(e.target.value))}
        className="h-[35px] border-[1px] mb-1 outline-none px-[5px] focus:border-blue-500 rounded-sm"
      />
      <div className="auto-suggest">
        <input
          type="text"
          value={autoSuggestInput}
          onChange={(e) => setAutoSuggestInput(e.target.value)}
          onFocus={() => setActivateSuggestions(true)}
          className="h-[35px] border-[1px] mb-1 outline-none px-[5px] focus:border-blue-500 rounded-sm"
        />
        <div className="suggestions max-h-[500px] overflow-scroll overflow-x-hidden">
          {activateSuggestions &&
            autoSuggestData
              .slice()
              .sort((a, b) => {
                return a.tollName.localeCompare(b.tollName);
              })
              .map((items, idx) => {
                return (
                  <p
                    key={idx}
                    onClick={() => handleSelection(items)}
                    className="cursor-pointer"
                  >
                    {items.tollName}
                  </p>
                );
              })}
        </div>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </main>
  );
}



export default AdminActions
