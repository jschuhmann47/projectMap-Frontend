import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './index.css';
import Button from 'components/commons/Button';
import {
  ChartButtons,
} from '../styles';
import { Snackbar, Alert } from '@mui/material';
import { onGetOrganizationalChart, onSaveOrganizationalChart } from 'redux/actions/projects.actions';
import ModalV2 from 'components/commons/ModalV2';
import { Field, Form, Formik } from 'formik';
import InputV2 from 'components/inputs/InputV2';
import { validateField } from 'helpers/validateField';
import { ButtonsContainer } from 'styles/form';

export default function OrganizationChartTab({ projectId }) {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState('success');
  const [snackbarText, setSnackbarText] = useState('');
  const dispatch = useDispatch();
  const { organizationalChart } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(onGetOrganizationalChart(projectId));
  }, [dispatch]);

  useEffect(() => {
    if (organizationalChart.success != null) {
      processChartSnackbar()
    }

    if (organizationalChart.data != null) {
      const {nodes, edges } = organizationalChart.data;
      if (nodes != null) {
        setNodes(nodes);
      }

      if (edges != null) {
        setEdges(edges);
      }
    }
  }, [organizationalChart]);

  const processChartSnackbar = () => {
    if (organizationalChart.success) {
      setSnackbarStatus('success');
      setSnackbarText('Guardado exitosamente')
    } else {
      setSnackbarStatus('error');
      setSnackbarText('Hubo un error al guardar')
    } 

    setOpenSnackbar(true);
  }

  const generateNextNodeId = () => {
    const { nodes } = reactFlowInstance.toObject();
    let maxIdValue = 0;

    nodes.forEach(node => {
      if (Number(node.id) > maxIdValue) {
        maxIdValue = Number(node.id);
      }
    })
    return maxIdValue + 1;
  }

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        return addEdge({ ...params, type: ConnectionLineType.Step }, eds)
      })
    },
    [],
  );

  const doOnSaveNewNode = (name) => {
    const nodeId = `${generateNextNodeId()}`
    const newNode = {
      id: nodeId,
      data: { label: name },
      type: 'default',
      position: {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
      },
    };
    setNodes((nds) => nds ? nds.concat(newNode) : [newNode]);
    setShowPopup(false);
  }

  const onSaveNewNode = ({ name }) => {
    doOnSaveNewNode(name);
  }

  const onAddNewNode = () => {
    setShowPopup(true);
  };

  const onSaveDiagram = async () => {
    const { nodes, edges } = reactFlowInstance.toObject();
    const data = { nodes, edges };
    dispatch(onSaveOrganizationalChart(projectId, data));
  }


  return (
    <div className="dndflow">
      <ChartButtons>
        <Button onClick={onSaveDiagram}>
          Guardar
        </Button>
        <Button onClick={onAddNewNode}>
          Agregar
        </Button>
      </ChartButtons>
      <ModalV2
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title='Agregar nueva área'
        width={600}
      >
        <Formik onSubmit={onSaveNewNode} initialValues={{ name: '' }}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                name='name'
                fieldLabel='Nombre de la nueva entidad'
                component={InputV2}
                validate={validateField}
              />
              <ButtonsContainer>
                <Button color='secondary' onClick={() => setShowPopup(false)}>Cancelar</Button>
                <Button type='submit'>Aceptar</Button>
              </ButtonsContainer>
            </Form>
          )}
        </Formik>
      </ModalV2>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => { setOpenSnackbar(false) }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbarStatus} sx={{ width: '100%' }}>
          {snackbarText}
        </Alert>
      </Snackbar>
    </div>
  );
}