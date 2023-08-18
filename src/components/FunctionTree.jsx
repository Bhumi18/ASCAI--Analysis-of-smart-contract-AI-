import React, { useCallback, useEffect, useState } from "react";
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
// import Loader from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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

export default function FunctionTree({ data, error }) {
  console.log(error);
  console.log(data);
  const [nodes, setNodes, onNodesChange] = useNodesState();
  const [edges, setEdges, onEdgesChange] = useEdgesState();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const computeData = async () => {
    console.log(data);
    // Use map to transform the dataInfo array into initialNodes
    const initialNodes = data.map((info, index) => ({
      id: String(index + 1),
      position: { x: (index + 1) * 150, y: (index + 1) * 100 }, // Adjust position as needed
      data: {
        label: `contract name: ${info[0] ? info[0] : "Not Available"}\n
          function name: ${info[1] ? info[1] : "Not Available"}`,
      },
      style: {
        background: "rgb(77, 77, 77)",
        color: "white",
        fontSize: "1rem",
        fontFamily: "Fredoka",
        width: "300px",
        borderRadius: "10px", // Change this to the desired background color
      },
    }));

    console.log(initialNodes);
    if (error != null) {
      initialNodes.push({
        id: String(data.length + 1),
        position: { x: (data.length + 1) * 150, y: (data.length + 1) * 100 }, // Adjust position as needed
        data: {
          label: `contract name: ${error[0] ? error[0] : "Unknown"}\n
        method name: ${error[1] ? error[1] : "Unknown"}\n
        error: ${error[2]}`,
        },
        style: {
          background: "rgb(77, 77, 77)",
          color: "white",
          fontSize: "1rem",
          fontFamily: "Fredoka",
          width: "300px",
          borderRadius: "10px", // Change this to the desired background color
        },
      });
    }
    setNodes(initialNodes);

    // Create edges based on the dynamically generated initialNodes

    const initialEdges = [];

    for (let i = 0; i < initialNodes.length - 1; i++) {
      initialEdges.push({
        id: `e${i + 1}-${i + 2}`,
        source: String(i + 1),
        target: String(i + 2),
      });
      initialEdges.push({
        id: `e${data.length + 1}-${data.length + 2}`,
        source: String(data.length + 1),
        target: String(data.length + 2),
      });
      setEdges(initialEdges);
    }

    console.log(initialEdges);
    if (error) {
    }
  };

  useEffect(() => {
    if (data) {
      computeData();
    }
  }, [data]);

  if (data) {
    return (
      <div style={{ height: "100vh" }}>
        {data.length != 0 ? (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            // Handle node click
          >
            <Controls />
          </ReactFlow>
        ) : (
          <h1 style={{ fontSize: "1.2rem", marginTop: "50px" }}>
            This transaction does not have an internal function calls
          </h1>
        )}
      </div>
    );
  } else {
    return "loading";
  }
}
