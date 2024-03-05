import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'


let initialState = {
  createdToll:{},
  CREATE_TOLL_LOADING:false,
  CREATE_TOLL_SUCCESS:false,
  CREATE_TOLL_ERROR:false,
  SOURCE_DESTINATION_TOLLS_AND_COORDINATES:{},
  SOURCE_DESTINATION_TOLLS_AND_COORDINATES_LOADING: false,
  SOURCE_DESTINATION_TOLLS_AND_COORDINATES_SUCCESS: false,
  SOURCE_DESTINATION_TOLLS_AND_COORDINATES_ERROR: false,
}


let fetchSourceDestinationTollsAndCoordinates=createAsyncThunk('toll/fetchSourceDestinationTollsAndCoordinates',async ({source,destination})=>
{
    console.log(process.env);
    let sourceUrl = `https://geocode.maps.co/search?q=${source}&api_key=65dacbfb919bf588134874bsi8bae6b`;
    let destinationUrl = `https://geocode.maps.co/search?q=${destination}&api_key=65dadea571b76600105954ahn0963ca`;
    let sourceResponse=await axios.get(sourceUrl,{"content-type":"application/json"})
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    let destinationResponse=await axios.get(destinationUrl,{"content-type":"application/json"})
    
    let coordinates = await axios.get(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248b135f3df0f6548b3905522ce5cf93088&start=${sourceResponse.data[0].lon},${sourceResponse.data[0].lat}&end=${destinationResponse.data[0].lon},${destinationResponse.data[0].lat}`
    );
    
    let foundTollData=await axios.post('http://localhost:2000/toll/get',{source:source,destination:destination})

    return {coordinates:coordinates.data.features[0].geometry.coordinates,foundTollData:foundTollData.data.foundTollData};
})


let createToll=createAsyncThunk('toll/createToll',async (data)=>
{
    console.log("ANDREW TATE",data)
    let response=await axios.post('http://localhost:2000/toll/create',data)
    console.log(response)
})


let TollSlice=createSlice({
    name:"toll",
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>
    {
        builder
        .addCase(fetchSourceDestinationTollsAndCoordinates.pending,(state)=>
        {
            state.SOURCE_DESTINATION_TOLLS_AND_COORDINATES_LOADING=true
            state.SOURCE_DESTINATION_TOLLS_AND_COORDINATES_SUCCESS=false
        })
        .addCase(fetchSourceDestinationTollsAndCoordinates.fulfilled,(state,action)=>
        {
            state.SOURCE_DESTINATION_TOLLS_AND_COORDINATES_LOADING=false 
            state.SOURCE_DESTINATION_TOLLS_AND_COORDINATES_SUCCESS=true
            state.SOURCE_DESTINATION_TOLLS_AND_COORDINATES=action.payload;
            console.log(action.payload)
        })
        .addCase(fetchSourceDestinationTollsAndCoordinates.rejected,(state)=>
        {
            state.SOURCE_DESTINATION_TOLLS_AND_COORDINATES_LOADING=false 
            state.SOURCE_DESTINATION_TOLLS_AND_COORDINATES_SUCCESS=false 
            state.SOURCE_DESTINATION_TOLLS_AND_COORDINATES_ERROR=true
        })
        .addCase(createToll.pending,(state)=>
        {
            state.CREATE_TOLL_LOADING=true 
            state.CREATE_TOLL_SUCCESS=false
        })
        .addCase(createToll.fulfilled,(state,action)=>
        {
            state.CREATE_TOLL_LOADING=false 
            state.CREATE_TOLL_SUCCESS=true
        })
        .addCase(createToll.rejected,(state,action)=>
        {
            state.CREATE_TOLL_LOADING=false 
            state.CREATE_TOLL_SUCCESS=false 
            state.CREATE_TOLL_ERROR=true
        })
    }
})


export default TollSlice.reducer
export {fetchSourceDestinationTollsAndCoordinates,createToll}