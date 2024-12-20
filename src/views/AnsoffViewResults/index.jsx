import React from 'react';
import { Grid, IconButton, Typography, Chip } from '@mui/material';

import { COLORS } from 'helpers/enums/colors';

import { ArrowBack } from '@mui/icons-material';
import {
  Estrategia,
  EstrategiaClasificacion,
  EstrategiaTextos,
  getEstrategiaLabel,
} from 'helpers/enums/ansoff';
import { TitleContainer } from 'components/commons/ProjectCard/styles';
import { ButtonContainer } from 'views/ProjectView/styles';

const AnsoffViewResults = (props) => {
  const { productosFiltered, porcentajes, onClickGoBackButton, openComments } =
    props;

  return (
    <>
      <TitleContainer>
        <ButtonContainer
          sx={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}
        >
          <IconButton size="small" onClick={onClickGoBackButton}>
            <ArrowBack />
          </IconButton>
        </ButtonContainer>
      </TitleContainer>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            margin: '30px 0',
            borderBottom: '1px solid black',
          }}
          display="flex"
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 800,
            }}
          >
            Informes consolidados
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            display="flex"
            sx={{
              padding: '30px 0',
              backgroundColor: COLORS.GreenBayLeaf,
              color: COLORS.white,
              borderRadius: '15px 15px 0 0',
              fontSize: '20px',
              fontWeight: 800,
            }}
          >
            <Grid
              item
              xs={3}
              display="flex"
              justifyContent={'center'}
              alignItems="center"
            >
              <span style={{ textAlign: 'center' }}>Estrategia</span>
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              justifyContent={'center'}
              alignItems="center"
            >
              <span style={{ textAlign: 'center' }}>
                Porcentaje de productos
              </span>
            </Grid>
            <Grid
              item
              xs={5}
              display="flex"
              justifyContent={'center'}
              alignItems="center"
            >
              <span style={{ textAlign: 'center' }}>Consejo</span>
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              justifyContent={'center'}
              alignItems="center"
            >
              <span style={{ textAlign: 'center' }}>Clasificación</span>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container display="flex">
            {Object.values(Estrategia)?.map((estrategia) => (
              <Grid
                container
                display="flex"
                sx={{
                  padding: '20px 10px',
                }}
              >
                <Grid
                  item
                  xs={3}
                  display="flex"
                  justifyContent={'center'}
                  alignItems="center"
                >
                  <span style={{ textAlign: 'center' }}>
                    {getEstrategiaLabel(estrategia)}
                  </span>
                </Grid>
                <Grid
                  item
                  xs={2}
                  display="flex"
                  justifyContent={'center'}
                  alignItems="center"
                >
                  <span style={{ textAlign: 'center' }}>
                    {porcentajes[estrategia]?.porcentaje || 0}
                  </span>
                </Grid>
                <Grid
                  item
                  xs={5}
                  display="flex"
                  justifyContent={'center'}
                  alignItems="center"
                >
                  <span style={{ textAlign: 'center' }}>
                    {porcentajes[estrategia]?.consejo || ''}
                  </span>
                </Grid>
                <Grid
                  item
                  xs={2}
                  display="flex"
                  justifyContent={'center'}
                  alignItems="center"
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                    }}
                  >
                    <Chip
                      label={
                        EstrategiaClasificacion[estrategia].situacionDelProducto
                      }
                      variant="outlined"
                      sx={{ color: '#06d6a0', borderColor: '#06d6a0' }}
                    />
                    <Chip
                      label={
                        EstrategiaClasificacion[estrategia].situacionDelMercado
                      }
                      variant="outlined"
                      sx={{ color: '#006d77', borderColor: '#006d77' }}
                    />
                  </div>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            margin: '30px 0',
            borderBottom: '1px solid black',
          }}
          display="flex"
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 800,
            }}
          >
            Informes por estrategia
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            padding: '30px 0',
          }}
          display="flex"
        >
          <Grid container display="flex" spacing={4}>
            {Object.values(Estrategia)?.map((estrategia) => (
              <Grid item xs={12} md={6}>
                <div
                  style={{
                    display: 'flex',
                    height: '100%',
                    background: COLORS.BlueDianne,
                    color: 'white',
                    borderRadius: '15px',
                  }}
                >
                  <div
                    style={{
                      padding: '10px',
                      display: 'flex',
                      height: '100%',
                      flexDirection: 'column',
                      gap: '15px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <Chip
                        label={porcentajes[estrategia]?.porcentaje || 0}
                        variant="outlined"
                        sx={{ color: 'white' }}
                      />
                      <Typography
                        sx={{
                          fontSize: '16px',
                          fontWeight: 800,
                        }}
                      >
                        {getEstrategiaLabel(estrategia)}
                      </Typography>
                    </div>
                    <span>{EstrategiaTextos[estrategia].definicion}</span>
                    <span>{EstrategiaTextos[estrategia].reflexion}</span>
                    <div
                      style={{
                        display: 'flex',
                        height: '100%',
                        flexDirection: 'column',
                        gap: '5px',
                      }}
                    >
                      <span>Productos dentro de esta estrategia:</span>
                      {productosFiltered[estrategia] ? (
                        <ul>
                          {productosFiltered[estrategia]?.map((productos) => (
                            <li>{productos?.nombre}</li>
                          ))}
                        </ul>
                      ) : (
                        <span>No hay productos para esta estrategia</span>
                      )}
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AnsoffViewResults;
