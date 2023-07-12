/* eslint-disable tailwindcss/no-custom-classname */
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Typography,
} from '@mui/material'
import { useConfigurator } from './Context'
export const Interface = () => {
  const { arms, setArms, body, setBody, head, setHead, legs, setLegs, weapon, setWeapon } = useConfigurator()

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
      }}
      p={3}
    >
      <Stack spacing={3}>
        <Typography variant='caption'>Table Configurator</Typography>
        <Box className='glass' p={3}>
          <FormControl>
            <FormLabel>{`setArms`}</FormLabel>
            <Slider
              sx={{
                width: '200px',
              }}
              min={50}
              max={200}
              value={arms}
              onChange={(e) => {
                // console.log(`tableWidth: ${(e.target as HTMLInputElement).value}`)
                setArms(parseInt((e.target as HTMLInputElement).value))
              }}
              valueLabelDisplay='auto'
            />
          </FormControl>
        </Box>
        <Box className='glass' p={3}>
          <FormControl>
            <FormLabel>Legs Layout</FormLabel>
            <RadioGroup value={legs} onChange={(e) => setLegs({ ...legs, layout: e.target.value })}>
              <FormControlLabel value={'standard'} control={<Radio />} label='Standard' />
              <FormControlLabel value={'solid'} control={<Radio />} label='Solid' />
              <FormControlLabel value={'design'} control={<Radio />} label='Design' />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box className='glass' p={3}>
          <FormControl>
            <FormLabel>Legs Color</FormLabel>
            <RadioGroup value={legs.color} onChange={(e) => setLegs({ ...legs, color: e.target.value })}>
              <FormControlLabel value={'#777777'} control={<Radio />} label='Black' />
              <FormControlLabel value={'#ECECEC'} control={<Radio />} label='Chrome' />
              <FormControlLabel value={'#C9BD71'} control={<Radio />} label='Gold' />
              <FormControlLabel value={'#C9A3B9'} control={<Radio />} label='Pink Gold' />
            </RadioGroup>
          </FormControl>
        </Box>
      </Stack>
    </Box>
  )
}
