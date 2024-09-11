import { useCallback, useEffect, useRef, useState } from 'react';
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
import { getOrganizationalChart, saveOrganizationalChart } from 'services/projects.services';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, Alert } from '@mui/material';

export default function OrganizationChartTab({ projectId }) {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [newNodeName, setNewNodeName] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState('success');
  const [snackbarText, setSnackbarText] = useState('');
  const [inputNewNodeError, setInputNewNodeError] = useState(false);

  useEffect(() => {
    const fetchChart = async () => {
      const { data } = await getOrganizationalChart(projectId);
      setNodes(data.nodes);
      setEdges(data.edges);
    };

    fetchChart();
  }, []);

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

  const doOnSaveNewNode = () => {
    const nodeId = `${generateNextNodeId()}`
    const newNode = {
      id: nodeId,
      data: { label: newNodeName },
      type: 'default',
      position: {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
      },
    };
    setNodes((nds) => nds ? nds.concat(newNode) : [newNode]);
    setShowPopup(false);
    setNewNodeName('');
  }

  const onSaveNewNode = () => {
    setInputNewNodeError(false);

    if (newNodeName.length == 0) {
      setInputNewNodeError(true);
    } else {
      doOnSaveNewNode()
    }
  }

  const onAddNewNode = () => {
    setShowPopup(true);
  };

  const onSaveDiagram = async () => {
    const { nodes, edges } = reactFlowInstance.toObject();
    const data = { nodes, edges };
    try {
      await saveOrganizationalChart(projectId, data);
      setSnackbarStatus('success');
      setSnackbarText('Guardado exitosamente')
    } catch (e) {
      setSnackbarStatus('error');
      setSnackbarText('Hubo un error al guardar')
    } finally {
      setOpenSnackbar(true);
    }
  }

  const handleNewNodeInputName = (event) => {
    setInputNewNodeError(false);
    setNewNodeName(event.target.value);
  };

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
      {showPopup &&
        <Dialog open={showPopup}>
          <DialogTitle>Ingresa el nombre de la nueva entidad</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre nueva entidad"
              type="text"
              fullWidth
              value={newNodeName}
              onChange={handleNewNodeInputName}
              error={inputNewNodeError}
              helperText={inputNewNodeError ? "Este campo es obligatorio" : ""}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setShowPopup(false) }}>Cancelar</Button>
            <Button disabled onClick={onSaveNewNode}>Aceptar</Button>
          </DialogActions>
        </Dialog>
      }
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