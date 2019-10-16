import React, { useState } from 'react'
import ReactMapGl, { Marker, Popup } from 'react-map-gl'
import styled from 'styled-components'

const token = process.env.REACT_APP_MAPBOX_TOKEN

export default function MapPage({ animalList, initAnimal }) {
  const [activeAnimal, setActiveAnimal] = useState(initAnimal)
  const [isPopupVisible, setIsPopupVisible] = useState(initAnimal != null)
  const [viewport, setViewport] = useState({
    latitude: 53.23756,
    longitude: 10.044543,
    width: '100vw',
    height: '80vh',
    zoom: 16
  })

  return (
    <>
      <h2>Parkplan</h2>

      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={token}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        onViewportChange={viewport => setViewport(viewport)}
      >
        {animalList.map(animal => (
          <Marker
            key={animal.station}
            latitude={parseFloat(animal.latitude)}
            longitude={parseFloat(animal.longitude)}
          >
            <ButtonStyled onClick={() => showPopup(animal)}>
              {animal.station}
            </ButtonStyled>
          </Marker>
        ))}
        {renderPopup()}
      </ReactMapGl>
    </>
  )

  function renderPopup() {
    if (isPopupVisible && activeAnimal) {
      return (
        <Popup
          latitude={parseFloat(activeAnimal.latitude)}
          longitude={parseFloat(activeAnimal.longitude)}
        >
          <div>{activeAnimal.title}</div>
        </Popup>
      )
    }
  }
  function showPopup(animal) {
    setActiveAnimal(animal)
    activeAnimal === animal
      ? setIsPopupVisible(!isPopupVisible)
      : setIsPopupVisible(true)
  }
}

const ButtonStyled = styled.button`
  display: flex;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: white;
  text-align: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2em;
  transform: translateX(-50%);
`