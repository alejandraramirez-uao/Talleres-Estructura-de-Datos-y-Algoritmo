
import { Graph as GraphVisualization } from "react-d3-graph";

const config = {
  width: 800,
  height: 450,
  directed: false,
  nodeHighlightBehavior: true,
  highlightDegree: 1,
  node: {
    color: "#2563eb",
    size: 450,
    highlightStrokeColor: "#0f172a",
    fontColor: "#1e293b",
    fontSize: 13,
    labelProperty: "name",
  },
  link: {
    color: "#94a3b8",
    highlightColor: "#2563eb",
    renderLabel: false,
  },
  d3: {
    gravity: -250,
    linkLength: 150,
    disableLinkForce: false,
  },
  panAndZoom: true,
  staticGraph: false,
};

function GraphView({ data }) {
  return (
    <div className="graph-container">
      {data.nodes.length > 0 ? (
        <GraphVisualization
          id="friends-cities-graph"
          data={data}
          config={config}
        />
      ) : (
        <p className="empty-message">No hay datos para mostrar.</p>
      )}
    </div>
  );
}

export default GraphView;
