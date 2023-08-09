import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "../style/main.css";

import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      label: "Contract 1 address: 0x9876543210 name: Contract 3",
      content: "address: 0x9876543210 name: Contract 3",
    },
    style: {
      background: "rgb(77, 77, 77)",
      color: "white",
      fontSize: "1rem",
      width: "300px",
      borderRadius: "10px",
    },
  },
  {
    id: "2",
    position: { x: 50, y: 100 },
    data: {
      label: "Contract 1 address: 0x9876543210 name: Contract 3",
      content: "address: 0x9876543210 name: Contract 3",
    },
    style: {
      background: "rgb(77, 77, 77)",
      color: "white",
      fontSize: "1rem",
      width: "300px",
      borderRadius: "10px", // Change this to the desired background color
    },
  },
  {
    id: "3",
    position: { x: 100, y: 200 },
    data: {
      label: "Contract 1 address: 0x9876543210 name: Contract 3",
      content: "address: 0x9876543210 name: Contract 3",
    },
  },
  // ... other initial nodes ...
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  // ... other initial edges ...
];

export default function FunctionTree() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const [selectedNode, setSelectedNode] = useState("");

  const handleNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const closePopup = () => {
    setSelectedNode(null);
  };

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onElementClick={handleNodeClick} // Handle node click
      >
        <Controls />

        <style>
          {`
            .react-flow__edge {
              stroke: #888;
              stroke-width: 2px;
              animation: pulse 1s infinite alternate;
            }

            @keyframes pulse {
              0% {
                stroke-dasharray: 5 5;
              }
              100% {
                stroke-dasharray: 10 10;
              }
            }
          `}
        </style>
      </ReactFlow>

      {/* Popup */}
      {selectedNode && (
        <div className="popup">
          <div className="popup-content">
            <h3>Node Details</h3>
            <p>{selectedNode.data.label}</p>
            <p>{selectedNode.data.content}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
      <style>
        {`
          .popup {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
            z-index: 1000;
          }

          .popup-content {
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}
