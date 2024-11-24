import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { onGetOne } from 'redux/actions/mckinsey.actions';
import {
  cuadrantesSelector,
  titleSelector,
} from 'redux/selectors/mckinsey.selector';

import LayoutContainer from 'containers/LayoutContainer';
import CustomizedTables from 'components/commons/Table';

import McKinseyView from 'views/McKinseyView';
import { SectionRadar, Title } from 'views/McKinseyView/styles';
import { Box, Grid } from '@mui/material';

import { Menu, MenuItem } from '@mui/material';
import Comments from 'components/comments/Comments';
import { COLORS } from 'helpers/enums/colors';
import { Container } from 'views/PestelView/styles';
import RadarChartCustom from 'components/commons/RadarChart';

const McKinseyContainerResults = () => {
  const { matrizId, id } = useParams();
  const disptch = useDispatch();
  const navigate = useNavigate();
  const onClickGoBackButton = () =>
    navigate(`/projects/${id}/mckinsey/${matrizId}`);
  const cuadrantes = useSelector(cuadrantesSelector);
  const cuadrantesOrdenados = [
    cuadrantes[2],
    cuadrantes[1],
    cuadrantes[5],
    cuadrantes[0],
    cuadrantes[4],
    cuadrantes[8],
    cuadrantes[3],
    cuadrantes[7],
    cuadrantes[6],
  ];

  const buildChartData = () => {
    const chartData = [];
    let total = 0;
    cuadrantesOrdenados?.map(
      (cuadrante) => (total += cuadrante.unidades.length)
    );
    cuadrantesOrdenados?.map((cuadrante) => {
      const data = {
        subject: cuadrante.name,
        A: cuadrante.unidades.length,
        fullMark: total,
      };

      chartData.push(data);
    });

    return chartData;
  };

  const [anchorElement, setAnchorElement] = useState(null);

  useEffect(() => {
    disptch(onGetOne(matrizId));
  }, []);

  const { title } = useSelector(titleSelector);
  return (
    <LayoutContainer>
      <Container>
        <Box sx={{ width: '90%' }}>
          <Box sx={{ height: 'max-content' }}>
            <McKinseyView
              cuadrantes={cuadrantes}
              showResults
              openComments={(target) => setAnchorElement(target)}
              title={title}
              onClickGoBackButton={onClickGoBackButton}
            />
          </Box>
          <Menu
            anchorEl={anchorElement}
            onClose={() => setAnchorElement(null)}
            open={!!anchorElement}
            PaperProps={{
              style: {
                width: 500,
              },
            }}
            sx={{
              '& .MuiMenu-list': {
                background: COLORS.AthensGray,
              },
            }}
          >
            <MenuItem key={1} disableRipple>
              <Comments show tool="MCKINSEY" toolId={matrizId} projectId={id} />
            </MenuItem>
          </Menu>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%'
            }}>
              <Title>Tabla de Resultados</Title>
              <Box sx={{ paddingLeft: '30px', paddingRight: '30px' }}>
                <CustomizedTables
                  items={cuadrantesOrdenados}
                  columns={[
                    {
                      label: 'Cuadrante',
                      value: 'title',
                    },
                    {
                      label: '¿Qué significa para la Unidad de Negocio?',
                      value: 'significado',
                    },
                    {
                      label: 'Cantidad de Unidades de Negocio',
                      value: (item) => item.unidades?.length,
                    },
                  ]}
                />
              </Box>
            </Box>
          <SectionRadar>
            <Title>Gráfico de Radar</Title>
            <RadarChartCustom data={buildChartData()} />
          </SectionRadar>
        </Box>
      </Container>
    </LayoutContainer>
  );
};

export default McKinseyContainerResults;
