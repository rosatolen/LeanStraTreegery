import React from "react";

export default function D3Node(props) {

  let node = props.node;

  let onButtonClick = (event) => {
    console.log(`I clicked the button in ${node.data.name}`);
    event.preventDefault();
  }

  let height = props.height ? props.height : 170;
  let width = props.width ? props.width : 150;
  let description = node.parent ? `${node.data.name} is the offspring of ${node.parent.data.name}.` : "No idea where this person sprang from";

  return (
    <foreignObject x={node.x} y={node.y} height={height} width={width}>
      <div>
        <img
          src="http://flagpedia.net/data/flags/mini/br.png"
          width="31"
          height="20"
          alt="br"
          style={{
            margin: "0 5px 0 0"
          }
          }
        />
        <b>{node.data.name}</b>
      </div>
      <div>
        {description}
        <button onClick={onButtonClick}>It's a button</button>
      </div>
    </foreignObject>
  );
}