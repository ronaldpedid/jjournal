import React from 'react';
import './index.scss';
import App from './App';
import { render, unmountComponentAtNode } from 'react-dom';


function startup() {
  let targetNode = document.getElementById('root');
  Promise.resolve(initializeClient(targetNode))
    .catch(err => {
      console.error('An error occurred when starting the client');
      console.error(err);
    });
}


export async function initializeClient(targetNode) {
  clearTargetNode(targetNode);
  render(
    <App />,
    targetNode,
  );
}

function clearTargetNode(targetNode) {
  unmountComponentAtNode(targetNode);
}

if (module.hot) {
  module.hot.accept(function () {
    startup();
  });
  startup();
} else {
  startup();
}







