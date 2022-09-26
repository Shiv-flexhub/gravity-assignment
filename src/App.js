import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
  VStack,
} from '@chakra-ui/react'
import {  FaTimes} from 'react-icons/fa'
import {MdGpsFixed} from "react-icons/md";


import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'


const center = { lat: 12.9716, lng:  77.5946 }//latitude and longitude of bangalore

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  return (
    <Flex
      position='relative'
      flexDirection='row'
      alignItems='center'
      h='100vh'
      w='100vw'
      bgColor='#e5f6fa'
      top={0}
      left={0}
    >
      <Box position='absolute' top='0' width="100%" height={20} bgColor='white' ><img src={require('../src/graviti.jpg')} alt="#" /></Box>

      <Box position='absolute' top={120} left={500}>
      <header><Text color='blue'>Let's calculate <span style={{fontWeight:'bolder'}}>distance</span> from Google Maps</Text></header>
      </Box>
      <Box position='absolute' left={670} top={160} h='55%' w='45%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
      position='absolute'  top={150} h='61%' w='48%'
        p={4}
        borderRadius='lg'
        m={2}
        bgColor='#e5f6fa'
        shadow='base'
        
        
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
        <VStack mt={0}>
          <Box flexGrow={1} m={8} mt={2}>
              <Text fontSize='14px' fontWeight={600}>Origin</Text>
            <Autocomplete>
              <Input type='text' ref={originRef} bgColor='white' />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Text fontSize='14px' fontWeight={600}>Destination</Text>
            <Autocomplete>
              <Input
                type='text'
                bgColor='white'
                
                ref={destiantionRef}
                />
            </Autocomplete>
          </Box>
          </VStack>

          <ButtonGroup>
            <Button bgColor='#1B31A8' color='white' type='submit' onClick={calculateRoute} mr={10} marginTop="50px"
            borderRadius={40} fontSize='16px' lineHeight='20px' fontFamily='Work Sans' fontStyle='normal'>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
              marginTop="50px"
            />
          </ButtonGroup>
        </HStack>
        <VStack>
        <HStack
         spacing={2} mt={8} justifyContent='space-between' bgColor='white'
         p={3}
         width='85%'
         borderRadius='8px'
         >
          
        
          <Text>Distance:<span style={{color:'darkblue' , fontSize:'23px' , fontWeight:'bolder' , padding:'5px'}}> {distance} </span></Text>
          
          <IconButton
            aria-label='center back'
            icon={<MdGpsFixed />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(10)
            }}
          />
          
        </HStack>
          <Box>
          {directionsResponse && (
              <Text>The distance between <span style={{fontWeight:'bolder'}}>{originRef.current.value}</span> and <span style={{fontWeight:'bolder'}}> {destiantionRef.current.value} </span> is: <span style={{fontWeight:'bolder'}}>{distance}</span> </Text>
            )}
          </Box>
        </VStack>
        
       
      </Box>
    </Flex>
  )
}

export default App
