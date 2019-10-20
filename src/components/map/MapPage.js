import React, { useState } from 'react'
import ReactMapGl, { Popup, GeolocateControl } from 'react-map-gl'
import styled from 'styled-components'
import Page from '../common/Page'
import RenderMarkers from './RenderMarkers'
import { hospitalityList, wcList, playgroundList } from '../../data/listsForMap'

const token = process.env.REACT_APP_MAPBOX_TOKEN

const geolocateStyle = {
  float: 'left',
  margin: '10px',
  padding: '10px'
}
const bounds = [[53.235344, 10.039464], [53.240696, 10.052925]]

export default function MapPage({ animalList, initAnimal, pageTitle }) {
  const [activeMarker, setActiveMarker] = useState(initAnimal)
  const [isPopupVisible, setIsPopupVisible] = useState(initAnimal != null)
  const [isAnimalActive, setIsAnimalActive] = useState(true)
  const [isHospitalityActive, setIsHospitalityActive] = useState(true)
  const [isWashroomActive, setIsWashroomActive] = useState(true)
  const [isPlaygroundActive, setIsPlaygroundActive] = useState(true)

  const [viewport, setViewport] = useState({
    latitude: 53.237547,
    longitude: 10.042346,
    width: '100vw',
    height: '100vh',
    zoom: 16,
    maxZoom: 18,
    minZoom: 14
  })

  function withMarkers() {
    let list = []
    if (isAnimalActive) {
      list = [...list, ...animalList]
    }
    if (isHospitalityActive) {
      list = [...list, ...hospitalityList]
    }
    if (isWashroomActive) {
      list = [...list, ...wcList]
    }
    if (isPlaygroundActive) {
      list = [...list, ...playgroundList]
    }

    return <RenderMarkers list={list} onClick={handlePopup} />
  }

  return (
    <>
      <Page pageTitle={pageTitle}>
        <MapStyled>
          <ReactMapGl
            onTouchStart={() => setActiveMarker(null)}
            {...viewport}
            mapboxApiAccessToken={token}
            mapStyle="mapbox://styles/qesmo/ck1ywet8u23o61co9xbxqr6z2"
            maxBounds={bounds}
            onViewportChange={viewport => setViewport(viewport)}
          >
            <GeolocateControl
              style={geolocateStyle}
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />
            {withMarkers()}
            {renderPopup()}
          </ReactMapGl>
          <FilterStyled>
            <FilterIconStyled
              active={isAnimalActive}
              src={
                'https://res.cloudinary.com/duwqflakd/image/upload/v1571574791/icons8-hundeabdruck-100_mipsdi.png'
              }
              onClick={() => {
                setIsAnimalActive(!isAnimalActive)
                setIsPopupVisible(false)
              }}
            />
            <FilterIconStyled
              active={isHospitalityActive}
              src={
                'https://res.cloudinary.com/duwqflakd/image/upload/v1571574791/icons8-restaurant-100_nhglvg.png'
              }
              onClick={() => {
                setIsHospitalityActive(!isHospitalityActive)
                setIsPopupVisible(false)
              }}
            />

            <FilterIconStyled
              active={isWashroomActive}
              src={
                'https://res.cloudinary.com/duwqflakd/image/upload/v1571574794/icons8-undefined-100_cuwgao.png'
              }
              onClick={() => {
                setIsWashroomActive(!isWashroomActive)
                setIsPopupVisible(false)
              }}
            />

            <FilterIconStyled
              active={isPlaygroundActive}
              src={
                'https://res.cloudinary.com/duwqflakd/image/upload/v1571574793/icons8-undefined-100-2_gzu5iw.png'
              }
              onClick={() => {
                setIsPlaygroundActive(!isPlaygroundActive)
                setIsPopupVisible(false)
              }}
            />
          </FilterStyled>
        </MapStyled>
      </Page>
    </>
  )

  function renderPopup() {
    if (isPopupVisible && activeMarker) {
      return (
        <Popup
          latitude={parseFloat(activeMarker.latitude)}
          longitude={parseFloat(activeMarker.longitude)}
          onClose={() => {
            setActiveMarker(null)
          }}
          onClick={togglePopup}
        >
          <div>{activeMarker.title}</div>
        </Popup>
      )
    }
  }
  function handlePopup(marker) {
    setActiveMarker(marker)
    activeMarker === marker
      ? setIsPopupVisible(!isPopupVisible)
      : setIsPopupVisible(true)
  }

  function togglePopup() {
    setIsPopupVisible(!isPopupVisible)
  }
}

const FilterStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  z-index: 10;
  max-height: 80px;
  position: absolute;
  top: 0;
  right: 0px;
`

const MapStyled = styled.div`
  position: relative;
  height: 100vh;
`
const FilterIconStyled = styled.img`
  padding: 10px;
  width: 50px;
  margin-top: 10px;
  margin-right: 10px;
  box-shadow: ${props =>
    props.active ? 'inset -10px -10px 20px -3px #0003' : 'none'};
  border-radius: 4px;
  border: 1px solid darkgray;
  background: white;
`
