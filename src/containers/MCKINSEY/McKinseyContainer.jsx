import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';

import {
  onAddUnidad,
  onDeleteUnidad,
  onGetOne,
} from 'redux/actions/mckinsey.actions';
import {
  cuadrantesSelector,
  titleSelector,
} from 'redux/selectors/mckinsey.selector';
import { onGetAll as onGetAllComments } from 'redux/actions/comments.actions';

import LayoutContainer from 'containers/LayoutContainer';
import Button from 'components/commons/Button';

import McKinseyView from 'views/McKinseyView';
import SliderInput from 'components/inputs/SliderInput';
import { Box, Grid } from '@mui/material';

import { Menu, MenuItem } from '@mui/material';
import Comments from 'components/comments/Comments';
import { COLORS } from 'helpers/enums/colors';
import { validateField } from 'helpers/validateField';
import { Container } from 'views/FodaView/styles';
import ToolTip from 'components/commons/ToolTip';
import Loading from 'components/commons/Loading';
import { onGetOne as onGetProject } from 'redux/actions/projects.actions';
import permission from 'helpers/permissions';
import ModalV2 from 'components/commons/ModalV2';
import InputV2 from 'components/inputs/InputV2';
import { ButtonsContainer } from 'styles/form';

const McKinseyContainer = () => {
  const { matrizId, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickResultsButton = () =>
    navigate(`/projects/${id}/mckinsey/${matrizId}/results`);

  const onClickGoBackButton = () => navigate(`/projects/${id}`);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const cuadrantes = useSelector(cuadrantesSelector);
  const loading = useSelector((state) => state.mckinsey.loading);

  const [anchorElement, setAnchorElement] = useState(null);

  const root = useSelector((state) => state);
  const userPermission = permission(root, 'competitiveStrategy');

  useEffect(() => {
    dispatch(onGetOne(matrizId));
    dispatch(onGetAllComments('MCKINSEY', matrizId));
    dispatch(onGetProject(id));
  }, []);

  const onAdd = () => {
    setAddModalOpen(true);
  };

  const onSubmit = (formData) => {
    dispatch(onAddUnidad(matrizId, { ...formData, projectId: id }));
    setAddModalOpen(false);
  };

  const onDeleteItem = (unidadId) =>
    dispatch(onDeleteUnidad(matrizId, unidadId));

  const initialValues = {
    nombre: '',
    fuerzaCompetitiva: 10,
    atractivoDeMercado: 10,
  };

  const { title } = useSelector(titleSelector);

  return (
    <LayoutContainer>
      <Container>
        <Grid container sx={{ height: '100%' }}>
          <Grid item sx={{ height: '100%' }}>
            <McKinseyView
              onAdd={onAdd}
              cuadrantes={cuadrantes}
              onClickResultsButton={onClickResultsButton}
              onClickGoBackButton={onClickGoBackButton}
              openComments={(target) => setAnchorElement(target)}
              title={title}
              onDeleteItem={onDeleteItem}
              userPermission={userPermission}
            />
          </Grid>
        </Grid>
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
        <ModalV2
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          title='Agregar Unidad de Negocio'
        >
          <Formik onSubmit={onSubmit} initialValues={initialValues}>
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="nombre"
                  fieldLabel="Nombre"
                  component={InputV2}
                  validate={validateField}
                />
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Field
                    name="fuerzaCompetitiva"
                    component={SliderInput}
                    label="Fuerza Competitiva"
                    validate={validateField}
                  />
                  <ToolTip
                    text="Fuerza competiva: Dentro del mercado en el que se da la actividad economica: ¿como se esta posicionado en comparación con productos competitivos?"
                    placement="right"
                    fontSize="14px"
                  />
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Field
                    name="atractivoDeMercado"
                    component={SliderInput}
                    label="Atractivo de mercado"
                    validate={validateField}
                  />
                  <ToolTip
                    text="¿Cómo se compara su mercado con otros? Esta en auge o en decadencia?"
                    placement="right"
                    fontSize="14px"
                  />
                </Box>
                <ButtonsContainer>
                  <Button
                    color="secondary"
                    onClick={() => setAddModalOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button color="primary" type="submit">
                    Agregar
                  </Button>
                </ButtonsContainer>
              </Form>
            )}
          </Formik>
        </ModalV2>
      </Container>
      {loading && <Loading isModalMode message="Cargando McKinsey" />}
    </LayoutContainer>
  );
};

export default McKinseyContainer;
