import ModalV2 from "components/commons/ModalV2";
import { useEffect, useState } from "react";
import KrForm from "./KrForm";
import { Box, Slider, Stack, Typography } from "@mui/material";

export default function KeyResultPopup({
  krData,
  editKr,
  deleteKr,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const data = {
    title: "Reducir en 10% los carritos abandonados",
    responsable: 'Pepito el pistolero',
    prioridad: 2,
    lineaBase: 30,
    resultadoEsperado: 80,
    porcentajeProgresoActual: 50,
    progresoActual: 30,
    rangoFechaValores: [
      { "fecha": "20/09/24", "valor": 39 },
      { "fecha": "27/09/24", "valor": 45 },
      { "fecha": "04/10/24", "valor": 51 },
      { "fecha": "11/10/24", "valor": 59 },
      { "fecha": "18/10/24", "valor": 61 },
      { "fecha": "25/10/24", "valor": 63 },
      { "fecha": "01/11/24", "valor": 68 },
      { "fecha": "08/11/24", "valor": 72 },
      { "fecha": "15/11/24", "valor": 79 },
    ]
  }

  return (
    <ModalV2 width={900} isOpen={isOpen} background={'#FFFFFF'} onClose={() => {console.log('Cerrando ...')}} title={data.title}>
      <Box
        sx={{
          position: "relative",
          display: 'flex',
          justifyContent: 'center', // Centrar horizontalmente
          alignItems: 'center',     // Centrar verticalmente
        }}
      >
        <Stack spacing={4} direction="row" sx={{ width: '400px', alignItems: 'center', mb: 1 }}>
          <p>{data.lineaBase}</p>
            <Slider 
              valueLabelDisplay="on" 
              value={data.porcentajeProgresoActual} 
              aria-label="Default"
              valueLabelFormat={() => (
                <Box
                  sx={{
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    top: '500%', // Mover el label debajo de la barra
                    color: "black",
                    transform: 'translateX(-50%)', // Centrar el texto
                    left: `${data.porcentajeProgresoActual}-1%`,
                    padding: '0px',
                    marginTop: '5px',
                  }}
                >
                  {`${data.progresoActual} `}
                </Box>
              )} />
          <p>{data.resultadoEsperado}</p>
        </Stack>
      </Box>
      <KrForm onSubmit={() => {console.log('submit')}} data={data}/>
    </ModalV2>
  )
  
}