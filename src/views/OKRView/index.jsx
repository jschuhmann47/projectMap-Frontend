import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Rating,
  Tooltip,
  Typography,
} from '@mui/material';
import { COLORS } from 'helpers/enums/colors';
import {
  Add,
  ArrowBack,
  Cancel,
  Check,
  Comment,
  Delete,
} from '@mui/icons-material';
import Button from 'components/commons/Button';
import { getKeyResultWitValues, monthsPerQuarter } from 'helpers/enums/okr';
import KeyResultInput from './components/KeyResultInput';
import { KeyResultCell, OkrContainer } from './styles';
import Edit from '@mui/icons-material/Edit';
import { Field, Form, Formik } from 'formik';
import Input from './components/Input';
import { validateField } from 'helpers/validateField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ToolTip from 'components/commons/ToolTip';

const tableHeaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string?.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 24,
      height: 24,
      fontSize: 14,
    },
    children: `${name && name.split(' ')[0][0]}${
      name.split(' ')[1] ? name.split(' ')[1][0] : ''
    }`,
  };
}

const OKRView = ({
  openAddOkrModal,
  okrs,
  onSubmitKeyResult,
  titulo,
  onEditKeyResultStatus,
  openComments,
  deleteOkr,
  onClickBack,
  deleteKeyResult,
}) => {
  const [okrInputId, setOkrInputId] = useState(null);
  const [keyResultId, setKeyResultId] = useState(null);

  return (
    <Grid
      container
      sx={{
        padding: '30px',
      }}
    >
      <Grid item xs={9} sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton size="small" onClick={() => onClickBack()}>
          <ArrowBack />
        </IconButton>
        <Typography style={{ fontSize: 30, fontWeight: 800 }}>
          {titulo}
        </Typography>
      </Grid>
      <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          size="small"
          onClick={(event) => openComments(event.currentTarget)}
        >
          <Comment />
        </IconButton>
      </Grid>
      <Grid item xs={2}>
        <Button onClick={openAddOkrModal}>
          <span style={{ fontSize: 15 }}>Agregar OKR</span>
        </Button>
      </Grid>
      <OkrContainer>
        {okrs?.length > 0 ? (
          okrs?.map((okr) => (
            <Box>
              <Grid item xs={12}>
                <Grid
                  container
                  sx={{ padding: '20px 0', alignItems: 'center' }}
                >
                  <Grid item md={3} sx={{ paddingLeft: '10px' }}>
                    <span style={{ fontSize: 20, fontWeight: 800 }}>
                      {okr.description}
                    </span>
                  </Grid>
                  <Grid item md={1} sx={tableHeaderStyle}>
                    <span>Responsable</span>
                    <ToolTip
                      text="Es importante que todo el equipo sepa quien es el responsable de que se haga seguimiento de este objetivo."
                      placement="right"
                      fontSize="14px"
                    />
                  </Grid>
                  {monthsPerQuarter[okr.quarter]?.map((month) => (
                    <Grid item md={1} sx={tableHeaderStyle}>
                      <span>{month}</span>
                    </Grid>
                  ))}
                  <Grid item md={1} sx={tableHeaderStyle}>
                    <span>Objetivo</span>
                    <ToolTip
                      text="Piense un objetivo desafiante pero posible, aunque usted tiene la posibilidad de editar el mismo, recomendamos mantener la primera aproximación al mismo para poder observar mejor los desvíos."
                      placement="right"
                      fontSize="14px"
                    />
                  </Grid>
                  <Grid item md={2} sx={tableHeaderStyle}>
                    <span>Prioridad</span>
                    <ToolTip
                      text="Sea inteligente a la hora de definir una prioridad, ya que la misma será una guía para su equipo a la hora de planificar. No tenga miedo de re-priorizar objetivos"
                      placement="right"
                      fontSize="14px"
                    />
                  </Grid>
                  <Grid item md={1} sx={tableHeaderStyle}>
                    <span>Avance</span>
                    <ToolTip
                      text="Representa el avance porcentual a su objetivo. Recuerde comparar esto con el lugar en el que está en el trimestre para entender su situación actual."
                      placement="right"
                      fontSize="14px"
                    />
                  </Grid>
                  <Grid item md={1} sx={tableHeaderStyle}>
                    <IconButton
                      type="button"
                      onClick={() => deleteOkr(okr._id)}
                    >
                      <Delete fontSize="inherit" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              {okr?.keyResults?.map((keyResult) => (
                <Formik
                  initialValues={{
                    keyStatus: getKeyResultWitValues(
                      okr.quarter,
                      keyResult.keyStatus
                    ),
                    priority: keyResult.priority,
                    responsible: keyResult.responsible,
                  }}
                  onSubmit={(values, actions) => {
                    onEditKeyResultStatus(okr._id, keyResult._id, values);
                    setKeyResultId(null);
                  }}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      <Grid item xs={12}>
                        <Grid
                          container
                          sx={{
                            padding: '10px 0',
                            background: COLORS.AthensGray,
                            alignItems: 'center',
                          }}
                        >
                          <Grid
                            item
                            md={3}
                            sx={{ display: 'flex', paddingLeft: '10px' }}
                          >
                            <div style={{ flex: 1 }}>
                              <span>{keyResult.description}</span>
                            </div>
                            <Divider orientation="vertical" flexItem />
                          </Grid>
                          <Grid item md={1} sx={{ display: 'flex' }}>
                            <KeyResultCell>
                              {keyResultId === keyResult._id ? (
                                <Field
                                  name="responsible"
                                  placeholder="Responsable"
                                  component={Input}
                                  inputProps={{
                                    style: { textAlign: 'center' },
                                  }}
                                  hiddenLabel
                                  variant="standard"
                                  size="small"
                                  validate={validateField}
                                />
                              ) : (
                                <Tooltip
                                  title={keyResult?.responsible}
                                  placement="top"
                                  arrow
                                >
                                  <Avatar
                                    {...stringAvatar(
                                      keyResult?.responsible || ''
                                    )}
                                  />
                                </Tooltip>
                              )}
                            </KeyResultCell>
                            <Divider orientation="vertical" flexItem />
                          </Grid>
                          <>
                            {keyResult.keyStatus?.map((keyStatus, index) => (
                              <Grid item md={1} sx={{ display: 'flex' }}>
                                <KeyResultCell>
                                  {keyResultId === keyResult._id ? (
                                    <Field
                                      name={`keyStatus[${index}].value`}
                                      placeholder="Valor"
                                      component={Input}
                                      inputProps={{
                                        style: { textAlign: 'center' },
                                      }}
                                      hiddenLabel
                                      variant="standard"
                                      size="small"
                                      type="number"
                                      validate={validateField}
                                    />
                                  ) : (
                                    <span>{keyStatus.value}</span>
                                  )}
                                </KeyResultCell>
                                <Divider orientation="vertical" flexItem />
                              </Grid>
                            ))}
                          </>
                          <Grid item md={1} sx={{ display: 'flex' }}>
                            <KeyResultCell>
                              <span>{keyResult.goal}</span>
                            </KeyResultCell>
                            <Divider orientation="vertical" flexItem />
                          </Grid>
                          <Grid item md={2} sx={{ display: 'flex' }}>
                            <KeyResultCell>
                              {keyResultId === keyResult._id ? (
                                <Field
                                  name={`priority`}
                                  placeholder="Prioridad"
                                  component={({ field, ...props }) => (
                                    <Rating
                                      {...field}
                                      {...props}
                                      onChange={(e, value) =>
                                        setFieldValue('priority', value)
                                      }
                                    />
                                  )}
                                  validate={validateField}
                                />
                              ) : (
                                <Rating
                                  name="read-only"
                                  value={keyResult.priority}
                                  readOnly
                                />
                              )}
                            </KeyResultCell>
                            <Divider orientation="vertical" flexItem />
                          </Grid>
                          <Grid item md={1} sx={{ display: 'flex' }}>
                            <KeyResultCell>
                              <span>
                                {keyResult.progress.toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                  minimumFractionDigits: 0,
                                })}
                                %
                              </span>
                            </KeyResultCell>
                            <Divider orientation="vertical" flexItem />
                          </Grid>
                          <Grid item md={1} sx={{ display: 'flex' }}>
                            <KeyResultCell>
                              <>
                                <IconButton
                                  type="submit"
                                  style={{
                                    display:
                                      keyResultId === keyResult._id
                                        ? 'flex'
                                        : 'none',
                                  }}
                                >
                                  <Check fontSize="inherit" />
                                </IconButton>
                              </>
                              <>
                                <IconButton
                                  type="button"
                                  style={{
                                    display:
                                      keyResultId === keyResult._id
                                        ? 'flex'
                                        : 'none',
                                  }}
                                  onClick={() => setKeyResultId(null)}
                                >
                                  <Cancel fontSize="inherit" />
                                </IconButton>
                              </>
                              <IconButton
                                type="button"
                                onClick={() => setKeyResultId(keyResult._id)}
                                style={{
                                  display:
                                    keyResultId === keyResult._id
                                      ? 'none'
                                      : 'flex',
                                }}
                              >
                                <Edit fontSize="inherit" />
                              </IconButton>
                              <IconButton
                                type="button"
                                onClick={() =>
                                  deleteKeyResult(okr._id, keyResult._id)
                                }
                                style={{
                                  display:
                                    keyResultId === keyResult._id
                                      ? 'none'
                                      : 'flex',
                                }}
                              >
                                <Delete fontSize="inherit" />
                              </IconButton>
                            </KeyResultCell>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              ))}
              {okrInputId === okr._id && (
                <Grid item xs={12}>
                  <KeyResultInput
                    okr={okr}
                    onSubmit={onSubmitKeyResult}
                    onClickCancel={() => setOkrInputId(null)}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Grid
                  container
                  sx={{
                    padding: '10px 0',
                  }}
                >
                  <Grid
                    item
                    md={12}
                    sx={{
                      paddingLeft: '10px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <IconButton
                      sx={{
                        paddingLeft: '0',
                        fontSize: '1rem',
                        ':hover': {
                          background: 'none',
                        },
                      }}
                      onClick={() => setOkrInputId(okr._id)}
                    >
                      <Add fontSize="inherit" />
                      <span>Agregar</span>
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item md={7} />
                  <Grid
                    item
                    md={1}
                    sx={{
                      display: 'flex',
                      padding: '10px 0',
                      justifyContent: 'center',
                      borderRadius: '0 0 10px 10px',
                      background: COLORS.AthensGray,
                    }}
                  >
                    <span>{okr.goal}</span>
                  </Grid>
                  <Grid
                    item
                    md={2}
                    sx={{
                      display: 'flex',
                      padding: '10px 0',
                      justifyContent: 'center',
                      borderRadius: '0 0 10px 10px',
                      background: COLORS.AthensGray,
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={okr.priority}
                      readOnly
                      precision={0.1}
                    />
                  </Grid>
                  <Grid
                    item
                    md={1}
                    sx={{
                      display: 'flex',
                      padding: '10px 0',
                      justifyContent: 'center',
                      borderRadius: '0 0 10px 10px',
                      background: COLORS.AthensGray,
                    }}
                  >
                    <span>
                      {(okr.progress || 0).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 0,
                      })}
                      %
                    </span>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          ))
        ) : (
          <Alert severity="warning">
            <AlertTitle>Atencion</AlertTitle>
            No hay OKRs cargados.
          </Alert>
        )}
      </OkrContainer>
    </Grid>
  );
};

export default OKRView;
