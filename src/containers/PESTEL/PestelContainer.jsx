import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import LayoutContainer from 'containers/LayoutContainer';
import Button from 'components/commons/Button';
import { COLORS } from 'helpers/enums/colors';
import {
  Container,
} from 'views/PestelView/styles';
import PestelView from 'views/PestelView';
import {
  onGetOne,
  onGetOptions,
  onInsertFactor,
  onUpdateFactor,
  onDeleteFactor,
} from 'redux/actions/pestel.actions';
import { onGetOne as onGetProject } from 'redux/actions/projects.actions';
import { Formik, Field, Form } from 'formik';
import {
  politicoSelector,
  economicoSelector,
  socialSelector,
  tecnologicoSelector,
  ambientalSelector,
  legalSelector,
  titleSelector,
} from 'redux/selectors/pestel.selector';
import Comments from 'components/comments/Comments';
import { Menu, MenuItem } from '@mui/material';
import { validateField } from 'helpers/validateField';
import Loading from 'components/commons/Loading';
import { onGetAll as onGetAllComments } from 'redux/actions/comments.actions';
import permission from 'helpers/permissions';
import ModalV2 from 'components/commons/ModalV2';
import SelectInputV2 from 'components/inputs/SelectInputV2';
import InputV2 from 'components/inputs/InputV2';
import { ButtonsContainer } from 'styles/form';
import { StageByTool, Tools } from 'helpers/enums/steps';

const PestelContainer = () => {
  const { pestelId, id } = useParams();
  const [factor, setFactor] = useState(null);
  const navigate = useNavigate();
  const onClickResultsButton = () =>
    navigate(`/projects/${id}/pestel/${pestelId}/results`);
  const onClickResultsButtonGoBack = () => {
    const stage = StageByTool[Tools.Pestel];
    navigate(`/projects/${id}/stage/${stage}`)
  };
  const dispatch = useDispatch();
  const { importancia, intensidad, tendencia } = useSelector((state) => {
    return state.pestel.options;
  });

  const [anchorElement, setAnchorElement] = useState(null);

  const politicos = useSelector(politicoSelector);
  const economicos = useSelector(economicoSelector);
  const sociales = useSelector(socialSelector);
  const tecnologicos = useSelector(tecnologicoSelector);
  const ambientales = useSelector(ambientalSelector);
  const legales = useSelector(legalSelector);
  const seeds = useSelector((state) => state.pestel.seeds);
  const loading = useSelector((state) => state.pestel.loading);
  const { title } = useSelector(titleSelector);

  const root = useSelector((state) => state);
  const userPermission = permission(root, 'externalEnvironment');

  useEffect(() => {
    dispatch(onGetOptions());
    dispatch(onGetOne(pestelId));
    dispatch(onGetAllComments('PESTEL', pestelId));
    dispatch(onGetProject(id));
  }, []);

  const onAdd = (factor) => setFactor(factor);

  const onEdit = (factor) => setFactor(factor);

  const onDelete = (factor) => dispatch(onDeleteFactor(pestelId, factor._id));

  const onSubmitFactor = (formData) => {
    if (factor._id)
      dispatch(onUpdateFactor(pestelId, factor._id, { ...formData }));
    else dispatch(onInsertFactor(pestelId, { ...formData, area: factor }));
    setFactor('');
  };

  const defaultValues = {
    descripcion: '',
    importancia: '',
    tendencia: '',
    intensidad: '',
    area: factor,
  };
  const initialValues = !!factor?._id ? { ...factor } : { ...defaultValues };

  return (
    <LayoutContainer>
      <Container>
        <PestelView
          onAdd={onAdd}
          politicos={politicos}
          economicos={economicos}
          sociales={sociales}
          tecnologicos={tecnologicos}
          ambientales={ambientales}
          legales={legales}
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
            <Comments show tool="PESTEL" toolId={pestelId} projectId={id} />
          </MenuItem>
        </Menu>
        <ModalV2
          isOpen={!!factor}
          title={
            !!factor?.area
            ? `Editar factor ${factor?.area}`
            : `Agregar factor ${factor}`
          }
          onClose={() => setFactor('')}
        >
          <Formik onSubmit={onSubmitFactor} initialValues={initialValues}>
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="descripcion"
                  fieldLabel="Descripción"
                  component={InputV2}
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
                  name='intensidad'
                  component={SelectInputV2}
                  options={intensidad}
                  fieldLabel='Intensidad'
                  validate={validateField}
                  tooltip="Los factores a agregar se pueden manifestar con fuerza variable. No es lo mismo por ejemplo, una inflación del 2% a una de 20%. Utilice esta escala para describir ese comportamiento."
                />
                <Field
                  name="tendencia"
                  component={SelectInputV2}
                  options={tendencia}
                  fieldLabel='Tendencia'
                  validate={validateField}
                  tooltip="Un factor necesariamente tiene una tendencia, ¿Está empeorando o mejorando?, ¿Está tendiendo a desaparecer o se está volviendo más importante?. Utilice estas 5 posibilidades para representar este comportamiento."
                />
                <ButtonsContainer>
                  <Button color="secondary" onClick={() => setFactor('')}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {!!factor?.area ? 'Editar' : 'Agregar'}
                  </Button>
                </ButtonsContainer>
              </Form>
            )}
          </Formik>
        </ModalV2>
      </Container>
      {loading && <Loading isModalMode message="Cargando Pestel" />}
    </LayoutContainer>
  );
};

export default PestelContainer;
