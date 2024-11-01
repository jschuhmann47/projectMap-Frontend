import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

export default function Stage4View({
  loading,
  pdcaData,
  onClickBack,
}) {
  return (
    <Box sx={{
      marginLeft: '5%',
      marginRight: '5%',
      marginTop: '5%',
      display: 'flex',
      flexDirection: 'column',
      width: '90%',
      alignItems: 'center',
    }}>
      <Box sx={{
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        marginBottom: '10px',
        alignItems: 'center',
        width: '100%',
      }}>
        <IconButton size="small" onClick={onClickBack} sx={{ position: 'absolute', left: 0 }}>
          <ArrowBack />
        </IconButton>
        <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 30, fontWeight: 'bold' }}>
          {pdcaData.name}
        </Typography>
      </Box>
      <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 26, fontWeight: 'bold', marginBottom: '10px' }}>
        Etapa 4: actuar
      </Typography>
      <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 20, marginBottom: '5px' }}>
        El grado de cumplimiento de lo planificado es: {pdcaData.progress}%
      </Typography>
      <Box sx={{ border: '1px black solid', backgroundColor: '#E1ECEB', padding: 2 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et tortor fringilla, rhoncus augue et, egestas nunc. Fusce luctus viverra odio, a dignissim magna egestas ut. Morbi commodo leo ante, id ultrices erat laoreet ut. Fusce congue ipsum in molestie ornare. Praesent vestibulum facilisis dui. In mattis, ex non aliquet consectetur, mauris purus consequat tellus, vitae suscipit tortor mi vitae enim. Proin vehicula laoreet est, eget volutpat nulla aliquet in. Morbi non odio ac nulla porta dictum. Sed convallis, elit facilisis iaculis sodales, ante odio posuere lectus, eu lobortis est purus vitae tellus. Fusce ut ligula suscipit, venenatis urna ut, bibendum lacus. 
      </Box>
    </Box>
  )
}
