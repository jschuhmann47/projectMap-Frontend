import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

function progressText(progress) {
  if (progress < 60) {
    return <>
      Es importante reconocer que los resultados no fueron los esperados, lo que indica la necesidad de una revisión exhaustiva del plan inicial. Este bajo nivel de cumplimiento puede señalar fallas significativas en la identificación de causas raíz, una planificación insuficiente, o barreras imprevistas durante la ejecución. Es esencial llevar a cabo un análisis detallado para determinar si hubo errores en la asignación de recursos, problemas en la comunicación, o falta de seguimiento adecuado.
      <br />
      <br />
      A partir de estos hallazgos, el equipo debe replantear las estrategias utilizadas, ajustar los procesos y establecer medidas de corrección y mejora. En el próximo ciclo PDCA, se deben rediseñar los accionables para hacerlos más realistas y alcanzables, revaluar las prioridades, y fortalecer el soporte y capacitación del equipo involucrado. Esta fase de aprendizaje es fundamental para evitar la repetición de errores y para construir un ciclo de mejora continua más robusto y eficiente.
    </>
  }
  if (progress < 90) {
    return <>
      Se puede considerar que se ha logrado un avance significativo, aunque aún quedan áreas de mejora. Este nivel de cumplimiento sugiere que la planificación fue adecuada en gran parte, pero que hubo algunos factores que impidieron alcanzar el máximo potencial, como problemas menores en la ejecución o la subestimación de ciertos riesgos. Identificar estos elementos específicos permitirá mejorar la estrategia y asegurar un mayor grado de cumplimiento en futuros ciclos.
      <br />
      <br />
      En este contexto, es clave analizar qué aspectos del plan fueron efectivos y cuáles necesitan optimización. Las conclusiones deben enfocarse en afianzar los puntos fuertes, como metodologías y enfoques que funcionaron bien, y corregir las áreas que generaron obstáculos. Es también recomendable realizar un ajuste en los recursos o en la asignación de tareas para cerrar las brechas identificadas. Con una revisión cuidadosa, la siguiente iteración del ciclo P.D.C.A. puede reflejar un progreso aún mayor, aprovechando la experiencia adquirida.
    </>
  }
  return <>
    Se puede considerar que esta iteración ha sido altamente exitosa. La planificación fue efectiva y que los procesos de ejecución y monitoreo funcionaron adecuadamente. El equipo puede estar satisfecho con los resultados obtenidos, ya que muestran que la organización fue capaz de identificar con precisión las causas raíz y establecer acciones adecuadas para solucionarlas. Sin embargo, es importante no caer en la complacencia y buscar siempre oportunidades para la mejora continua.
    <br />
    <br />
    En esta situación, las conclusiones deben centrarse en consolidar las buenas prácticas implementadas y explorar áreas en las que, aunque se alcanzaron los objetivos, aún se podría aumentar la eficiencia o innovar. Reflexionar sobre los elementos que llevaron al éxito, como la correcta asignación de responsabilidades, el seguimiento riguroso y la adaptabilidad durante la ejecución, permitirá replicar y mejorar estos enfoques en futuros ciclos. Este análisis refuerza la cultura de mejora continua y motiva al equipo a mantener altos estándares en sus próximas iniciativas.
  </>
}

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
        {progressText(pdcaData.progress)}
      </Box>
    </Box>
  )
}
