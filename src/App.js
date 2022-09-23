// import {
//   Box,
//   Button,
//   ButtonGroup,
//   Flex,
//   HStack,
//   VStack,
//   IconButton,
//   Input,
//   SkeletonText,
//   Text,
// } from '@chakra-ui/react'
// import { FaLocationArrow, FaTimes } from 'react-icons/fa'

// import {
//   useJsApiLoader,
//   GoogleMap,
//   Marker,
//   Autocomplete,
//   DirectionsRenderer,
// } from '@react-google-maps/api'
// import { useRef, useState } from 'react'

// const center = { lat: 12.9716, lng:  77.5946 }//latitude and longitude of bangalore

// function App() {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     libraries: ['places'],
//   })

//   const [map, setMap] = useState(/** @type google.maps.Map */ (null))
//   const [directionsResponse, setDirectionsResponse] = useState(null)
//   const [distance, setDistance] = useState('')

//   /** @type React.MutableRefObject<HTMLInputElement> */
//   const originRef = useRef()
//   /** @type React.MutableRefObject<HTMLInputElement> */
//   const destiantionRef = useRef()

//   if (!isLoaded) {
//     return <SkeletonText />
//   }

//   async function calculateRoute() {
//     if (originRef.current.value === '' || destiantionRef.current.value === '') {
//       return
//     }
//     // eslint-disable-next-line no-undef
//     const directionsService = new google.maps.DirectionsService()
//     const results = await directionsService.route({
//       origin: originRef.current.value,
//       destination: destiantionRef.current.value,
//       // eslint-disable-next-line no-undef
//       travelMode: google.maps.TravelMode.DRIVING,
//     })
    
//     setDirectionsResponse(results)
//     setDistance(results.routes[0].legs[0].distance.text)
    
//   }

//   function clearRoute() {
//     setDirectionsResponse(null)
//     setDistance('')
//     originRef.current.value = ''
//     destiantionRef.current.value = ''
//   }

//   return (
//     <Flex
//       position='relative'
//       flexDirection='row'
//       alignItems='center'
//       h='100vh'
//       w='100vw'
//     >
      
//       <Box
//         p={4}
//         borderRadius='lg'
//         m={2}
//         bgColor='light-blue'
//         shadow='base'
     
//         zIndex='-1'
//       >
//       <VStack>
//         <HStack alignItems="baseline">
//         <VStack spacing={2} >
//           <Box flexGrow={1}>
             
//             <Autocomplete>
//               <Input type='text' placeholder='Origin' ref={originRef} marginBottom={3} />
//             </Autocomplete>
//           </Box>
//           <Box flexGrow={1}>
          
//             <Autocomplete>
//               <Input
//                 type='text'
//                 placeholder='Destination'
//                 ref={destiantionRef}
//                 marginTop={3}
//               />
//             </Autocomplete>
//           </Box>
//         </VStack>
//         <HStack >
//           <ButtonGroup>
//             <Button colorScheme='blue' type='submit'  borderRadius={40} onClick={calculateRoute}>
//               Calculate Route
//             </Button>
//             <IconButton
//               aria-label='center back'
//               icon={<FaTimes />}
//               onClick={clearRoute}
//             />
//             <IconButton
//             aria-label='center back'
           
//             icon={<FaLocationArrow />}
//             isRound
//             onClick={() => {
//               map.panTo(center)
//               map.setZoom(10)
//             }}
//           />
//           </ButtonGroup>
//         </HStack>
//         </HStack>
        
//         <Box spacing={2} mt={2} justifyContent='space-between'>
//         {directionsResponse && (
//              <Text>The distance between {originRef.current.value} and {destiantionRef.current.value} is: {distance} </Text>
//           )}
//         </Box>
//         </VStack>
//       </Box>


//       <Box position='absolute' left={600} top={200}  h='50%' w='50%'>
//         {/* Google Map Box */}
//         <GoogleMap
//           center={center}
//           zoom={10}
//           mapContainerStyle={{ width: '100%', height: '100%' }}
//           options={{
//             zoomControl: false,
//             streetViewControl: false,
//             mapTypeControl: false,
//             fullscreenControl: false,
//           }}
//           onLoad={map => setMap(map)}
//         >
//           <Marker position={center} />
//           {directionsResponse && (
//             <DirectionsRenderer directions={directionsResponse} />
//           )}
//         </GoogleMap>
//       </Box>
     
//     </Flex>
//   )
// }

// export default App

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

      <Box position='absolute' top={100} left={500}>
      <header><Text color='blue'>Let's calculate <span style={{fontWeight:'bolder'}}>distance</span> from Google Maps</Text></header>
      </Box>
      <Box position='absolute' left={670} top={130} h='55%' w='45%' className='map'>
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
        p={4}
        borderRadius='lg'
        m={2}
        bgColor='#e5f6fa'
        shadow='base'
        maxW="630px"
        minH="300px"
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
        <VStack mt={4}>
          <Box flexGrow={1} m={8}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
                />
            </Autocomplete>
          </Box>
          </VStack>

          <ButtonGroup>
            <Button colorScheme='blue' type='submit' onClick={calculateRoute} mr={10} marginTop="50px"
            borderRadius={40}>
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
         width='50%'
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
            <Text>The distance between {originRef.current.value} and {destiantionRef.current.value} is: {distance} </Text>
           )}


        </Box>
        </VStack>
      </Box>
    </Flex>
  )
}

export default App