import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from "reactflow";
import "../style/main.css";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: {
      label: "Contract 1 ",
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
    position: { x: 150, y: 170 },
    data: {
      label: "Contract 2",
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
    position: { x: 300, y: 300 },
    data: {
      label: "Contract 3",
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
  // ... other initial nodes ...
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  // ... other initial edges ...
];

export default function FunctionTree({ data }) {
  console.log(data);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  function FlowRenderer(props) {
    const { flowData } = props;

    return (
      <ReactFlowProvider>
        <ReactFlow elements={flowData}></ReactFlow>
      </ReactFlowProvider>
    );
  }

  if (data) {
    return (
      <div style={{ height: "100vh" }}>
        {data.map((flowData, index) => (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            // Handle node click
          >
            <Controls />
            <h1 style={{ color: "red" }}>hey</h1>
          </ReactFlow>
          // <div>
          //   {console.log(flowData[0])}
          //   <ReactFlow
          //     key={index}
          //     flowData={flowData}
          //     style={{ color: "ffffff" }}
          //   ></ReactFlow>
          // </div>
        ))}
      </div>
    );
  } else {
    return "loading";
  }
}
