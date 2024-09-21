import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import LayoutContainer from 'containers/LayoutContainer';
import FodaView from 'views/FodaView';
import Modal from 'components/commons/Modal';
import Button from 'components/commons/Button';
import { COLORS } from 'helpers/enums/colors';
import {
  ButtonsContainer,
  CardTitle,
  CreateContent,
  Container,
} from 'views/FodaView/styles';
import SelectInput from 'components/inputs/SelectInput';
import {
  onGetOne,
  onGetOptions,
  onInsertFactor,
  onUpdateFactor,
  onDeleteFactor,
  onGetSeeds,
} from 'redux/actions/foda.actions';
import { CustomForm } from 'styles/form';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import {
  amenazasSelector,
  debilidadesSelector,
  fortalezasSelector,
  oportunidadesSelector,
  titleSelector,
} from 'redux/selectors/foda.selector';
import AutoComplete from 'components/inputs/Autocomplete';
import Comments from 'components/comments/Comments';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import { validateField } from 'helpers/validateField';
import ToolTip from 'components/commons/ToolTip';
import Loading from 'components/commons/Loading';
import { onGetOne as onGetProject } from 'redux/actions/projects.actions';
import permission from 'helpers/permissions';
import SelectInputV2 from 'components/inputs/SelectInputV2';
import ModalV2 from 'components/commons/ModalV2';

const FodaContainer = () => {
  const { fodaId, id } = useParams();
  const [factor, setFactor] = useState(null);
  const navigate = useNavigate();
  const onClickResultsButton = () =>
    navigate(`/projects/${id}/foda/${fodaId}/results`);
  const onClickResultsButtonGoBack = () => navigate(`/projects/${id}`);
  const dispatch = useDispatch();
  const [anchorElement, setAnchorElement] = useState(null);
  const { importancia, intensidad, tendencia, urgencia } = useSelector(
    (state) => state.foda.options
  );
  const debilidades = useSelector(debilidadesSelector);
  const amenazas = useSelector(amenazasSelector);
  const fortalezas = useSelector(fortalezasSelector);
  const oportunidades = useSelector(oportunidadesSelector);
  const seeds = useSelector((state) => state.foda.seeds);
  const loading = useSelector((state) => state.foda.loading);
  const { title } = useSelector(titleSelector);

  const root = useSelector((state) => state);
  const userPermission = permission(root, 'internalSituation');

  useEffect(() => {
    dispatch(onGetOptions());
    dispatch(onGetSeeds());
    dispatch(onGetOne(fodaId));
    dispatch(onGetProject(id));
  }, []);

  const onAdd = (factor) => setFactor(factor);

  const onEdit = (factor) => setFactor(factor);

  const onDelete = (factor) => dispatch(onDeleteFactor(fodaId, factor._id));

  const onSubmitFactor = (formData) => {
    if (factor._id)
      dispatch(onUpdateFactor(fodaId, factor._id, { ...formData }));
    else dispatch(onInsertFactor(fodaId, { ...formData, area: factor }));
    setFactor('');
  };

  const defaultValues = {
    descripcion: '',
    importancia: '',
    tendencia: '',
    area: factor,
  };
  const showUrgencia = ['Oportunidad', 'Amenaza'].includes(
    factor?.area || factor
  );
  const optionalValues = showUrgencia ? { urgencia: '' } : { intensidad: '' };
  const initialValues = !!factor?._id
    ? { ...factor }
    : { ...defaultValues, ...optionalValues };

  console.log('seeds, factor', seeds, factor)

  return (
    <LayoutContainer>
      <Container>
        <FodaView
          onAdd={onAdd}
          debilidades={debilidades}
          amenazas={amenazas}
          oportunidades={oportunidades}
          fortalezas={fortalezas}
          onEdit={onEdit}
          onDelete={onDelete}
          title={title}
          onClickButton={onClickResultsButton}
          onClickButtonGoBack={onClickResultsButtonGoBack}
          buttonTitle="Resultados"
          openComments={(target) => setAnchorElement(target)}
          userPermission={userPermission}
        />
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
            <Comments show tool="FODA" toolId={fodaId} projectId={id} />
          </MenuItem>
        </Menu>
        <ModalV2
          isOpen={!!factor}
          title={!!factor?.area ? `Editar ${factor?.area}` : `Agregar ${factor}`}
          onClose={() => setFactor('')}
        >
          <Formik onSubmit={onSubmitFactor} initialValues={initialValues}>
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="descripcion"
                  fieldLabel="Descripción"
                  component={SelectInputV2}
                  options={(seeds[factor] || seeds[factor?.area] || []).map((s) => s.descripcion)}
                  validate={validateField}
                  tooltip="Seleccione o escriba el factor que quiere agregar a su análisis."
                />
                <Field
                  name="importancia"
                  component={SelectInputV2}
                  options={importancia}
                  fieldLabel="Importancia"
                  validate={validateField}
                  tooltip="Algunos factores que agregue en su análisis tendrán mayor impacto que otros. Si algo tiene un gran impacto, positivo o negativo, en su organización, utilice la opción superior, de ser menos importante, la inferior"
                />
                <Field
                  name={showUrgencia ? 'urgencia' : 'intensidad'}
                  component={SelectInputV2}
                  options={showUrgencia ? urgencia : intensidad}
                  fieldLabel={showUrgencia ? 'Urgencia' : 'Intensidad'}
                  validate={validateField}
                  tooltip={
                    showUrgencia
                      ? 'El factor que está agregando tiene asignada una urgencia. Si es una oportunidad, representa la ventana de oportunidad para explotarlo y de ser una amenaza representa con qué rapidez está percibida amenaza se volverá realidad.'
                      : 'Los factores a agregar se pueden manifestar con fuerza variable. No es lo mismo por ejemplo, una inflación del 2% a una de 20%. Utilice esta escala para describir ese comportamiento.'
                  }
                />
                <Field
                  name="tendencia"
                  component={SelectInputV2}
                  options={tendencia}
                  fieldLabel="Tendencia"
                  validate={validateField}
                  tooltip="Un factor necesariamente tiene una tendencia, ¿Está empeorando o mejorando?, ¿Está tendiendo a desaparecer o se está volviendo más importante?. Utilice estas 5 posibilidades para representar este comportamiento."
                />
                <ButtonsContainer>
                  <Button color="secondary" onClick={() => setFactor('')}>
                    Cancelar
                  </Button>
                  <Button color="primary" type="submit">
                    {!!factor?.area ? 'Editar' : 'Agregar'}
                  </Button>
                </ButtonsContainer>
              </Form>
            )}
          </Formik>
        </ModalV2>
      </Container>
      {loading && <Loading isModalMode message="Cargando FODA" />}
    </LayoutContainer>
  );
};

export default FodaContainer;
