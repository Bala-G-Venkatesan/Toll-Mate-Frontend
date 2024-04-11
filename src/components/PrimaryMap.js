import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import "leaflet/dist/leaflet.css";
import {MapContainer,TileLayer,Marker,Polyline,Popup} from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSourceDestinationTollsAndCoordinates } from '../slices/TollSlice';
import {Icon} from 'leaflet'

const PrimaryMap = () => {
    let {
      SOURCE_DESTINATION_TOLLS_AND_COORDINATES,
      SOURCE_DESTINATION_TOLLS_AND_COORDINATES_LOADING,
      SOURCE_DESTINATION_TOLLS_AND_COORDINATES_SUCCESS,
    } = useSelector((state) => state.Toll);
    let dispatch=useDispatch()
    let [source,setSource]=useState('')
    let [destination,setDestination]=useState('')
    let [vehicleType,setVehicleType]=useState('')
    let [adjustedCoordinates,setAdjustedCoordinates]=useState([])
    let position = [28.7041, 77.1025];

    
    let icon = new Icon({
      iconUrl: require("../images/location-pin (1).png"),
      iconSize:[30,30]
    })

    let handleClick=()=>
    {
        dispatch(fetchSourceDestinationTollsAndCoordinates({source:source,destination:destination,vehicleType:vehicleType}))
    }

    useEffect(()=>
    {
      if (SOURCE_DESTINATION_TOLLS_AND_COORDINATES && SOURCE_DESTINATION_TOLLS_AND_COORDINATES_SUCCESS) {
        let reversed = SOURCE_DESTINATION_TOLLS_AND_COORDINATES.coordinates;
        let ultimate=[]
        for(let i=0;i<reversed.length;i++)
        {
          ultimate.push([reversed[i][1],reversed[i][0]]);
        }
        setAdjustedCoordinates(ultimate)
      }
    },[SOURCE_DESTINATION_TOLLS_AND_COORDINATES])
    useEffect(()=>
    {
      console.log(source,destination,vehicleType)
    },[source,destination,vehicleType])

    if (SOURCE_DESTINATION_TOLLS_AND_COORDINATES_LOADING) {
      return <h2>Loading...</h2>;
    }


  return (
    <StyledPrimaryMap>
      <section className="w-[1170px] h-[500px] mx-auto">
        <div className="portside flex flex-col">
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Source"
            className="h-[35px] border-[1px] mb-1 outline-none px-[5px] focus:border-blue-500 rounded-sm"
          />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Destination"
            className="h-[35px] border-[1px] outline-none px-[5px] focus:border-blue-500 rounded-sm"
          />
          <p>Select Your Vehicle</p>
          <select
            name=""
            id=""
            onChange={(e) => setVehicleType(e.target.value)}
            className="h-[35px] outline-none cursor-pointer rounded-sm"
          >
            <option
              value="car"
              style={{
                backgroundImage: `url(${require("../images/car.png")})`,
              }}
            >
              Car/Jeep/SUV
            </option>
            <option value="lcv">LCV/Taxi</option>
            <option value="busMultiAxle">Bus Multi Axle</option>
            <option value="heavyVehicle">Heavy Vehicle</option>
            <option value="fourToSixAxle">Four To Six Axle</option>
            <option value="sevenOrMoreAxle">Seven Or More Axle</option>
          </select>
          <button onClick={handleClick}>Click</button>
        </div>
        <div className="starboard bg-yellow-300 rounded overflow-hidden">
          <MapContainer
            center={adjustedCoordinates[0] || position}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {SOURCE_DESTINATION_TOLLS_AND_COORDINATES_SUCCESS && (
              <Polyline
                positions={adjustedCoordinates}
                pathOptions={{ color: "blue", weight: 4 }}
              />
            )}
            {SOURCE_DESTINATION_TOLLS_AND_COORDINATES_SUCCESS &&  SOURCE_DESTINATION_TOLLS_AND_COORDINATES?.foundTollData.tollsBetween.map((items)=>
            {
             return (
               <Marker position={items.tollLocation} icon={icon}>
                 <Popup className="capitalize">
                   <span>
                     <strong>{items.tollName}</strong>
                   </span>
                   <br />
                   <span>
                     Lat & Lng:{items.tollLocation[0]}, {items.tollLocation[1]}
                   </span>
                   <br />
                   <span>
                     <strong>Toll Charges</strong>
                   </span>
                   <br />
                   <span>Car: {items.car}</span>
                   <br />
                   <span>LCV: {items.lcv}</span>
                   <br />
                   <span>BusMultiAxle: {items.busMultiAxle}</span>
                   <br />
                   <span>HeavyVehicle: {items.heavyVehicle}</span>
                   <br />
                   <span>FourToSixAxle: {items.fourToSixAxle}</span>
                   <br />
                   <span>SevenOrMoreAxle: {items.sevenOrMoreAxle}</span>
                   <br />
                 </Popup>
               </Marker>
             );
            })}
          </MapContainer>
        </div>
      </section>
    </StyledPrimaryMap>
  );
}


let StyledPrimaryMap=styled.section` 

section
{
  display: grid;
  grid-template-columns: 2fr 5fr;
  gap:1rem;
}


`


export default PrimaryMap
