import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSourceDestinationTollsAndCoordinates } from '../slices/TollSlice';

const PrimaryMap = () => {
    let { SOURCE_DESTINATION_LAT_LNG_LOADING,SOURCE_DESTINATION_LAT_LNG_SUCCESS} = useSelector(
      (state) => state.Toll
    );
    let dispatch=useDispatch()

    let handleClick=()=>
    {
        dispatch(fetchSourceDestinationTollsAndCoordinates({source:"chennai",destination:"bangalore"}))
    }

    if(SOURCE_DESTINATION_LAT_LNG_LOADING)
    {
        return <h2>Loading...</h2>
    }


  return (
    <div>
        <button onClick={handleClick}>Click</button>
    </div>
  )
}


export default PrimaryMap