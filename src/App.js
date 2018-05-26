import React, { Component } from 'react';
import './App.css';


import {
	paper,
	Path,
	view,
	Point,
	PointText
} from "paper";

paper.install(window)

function BinaryTree(el) {
	this.element = el;
	this.left = null;
	this.right = null;
	this.node = null;
}

class App extends Component {
	
	render() {
		return (
			<div className="container">
				<div className="row center">
					<div className="btn-group" role="group" aria-label="...">
						<button type="button" onClick={window.bfsOrder} className="btn btn-primary">BFS Order</button>
						<div className="btn-group" role="group">
							<button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							DFS Order
							<span className="caret"></span>
							</button>
							<ul className="dropdown-menu">
								<li><a onClick={window.preOrder}>Preorder</a></li>
								<li><a onClick={window.inOrder}>Inorder</a></li>
								<li><a onClick={window.postOrder}>Postorder</a></li>
							</ul>
						</div>
					</div>
				</div>
				<div className="row center">
					<div>
						<canvas id="myCanvas"></canvas>
					</div>
				</div>
				<div className="panel panel-default">
					<div className="panel-body">
						<div className="column">
							<div className="col-md-12">
								<p>
									<span>BFS order Traversal : </span>
									<span id="bfsorder">No attempt</span>
								</p>
							</div>
							<div className="col-md-12">
								<p>
									<span>Preorder Traversal : </span>
									<span id="preorder">No attempt</span>
								</p>
							</div>
							<div className="col-md-12">
								<p>
									<span>Inorder Traversal : </span>
									<span id="inorder">No attempt</span>
								</p>
							</div>
							<div className="col-md-12">
								<p>
									<span>Postorder Traversal : </span>
									<span id="postorder">No attempt</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>			
    	);
	}
}

export default App;
