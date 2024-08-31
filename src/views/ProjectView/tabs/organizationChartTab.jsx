import { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './sidebar';
import './index.css';
import Button from 'components/commons/Button';
import {
  ButtonContainer,
  ButtonContent,
} from '../styles';
import { getOrganizationalChart, saveOrganizationalChart } from 'services/projects.services';

function Popup({ onSubmit }) {
  const fixedPosition = { top: "50%", left: "50%" };
  const [name, setName] = useState("");

  const handleSubmit = () => {
    onSubmit(name);
  };

  return (
    <div className="popup" style={{ zIndex: 900, position: 'relative',top: fixedPosition.top, left: fixedPosition.left }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default function OrganizationChartTab({projectId}) {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentDropEvent, setCurrentDropEvent] = useState(null)

  useEffect(() => {
    const fetchChart = async () => {
      const {data} = await getOrganizationalChart(projectId);
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
    return  maxIdValue + 1;
  }
  
  const handlePopupSubmit = (name) => {
    currentDropEvent.dataTransfer.inputName = name;
    setShowPopup(false)
    onDrop(currentDropEvent);
  };

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        const ed = addEdge(params, eds)
        return ed;
      })
    },
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      setShowPopup(false)

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `${generateNextNodeId()}`,
        type: 'default',
        position,
        data: { label: `${event.dataTransfer.inputName}` },
      };

      setNodes((nds) => {
        const result = nds.concat(newNode);
        return result;
      });
      setCurrentDropEvent(null);
    },
    [reactFlowInstance],
  );

  const onSaveDiagram = () => {
    const { nodes, edges } = reactFlowInstance.toObject();
    const data = {nodes, edges};
    saveOrganizationalChart(projectId, data);
  }

  return (
    <div className="dndflow">
      <ButtonContainer>
        <Button onClick={onSaveDiagram}>
          Guardar
        </Button>
      </ButtonContainer>
      {showPopup &&
        <Popup onSubmit={handlePopupSubmit} event={currentDropEvent}></Popup>
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
            onDrop={(event) => {setCurrentDropEvent(event); setShowPopup(true)}}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
}