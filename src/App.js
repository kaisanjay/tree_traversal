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

function createTree(nodes) { 
	// it is kind of preorder style, because we have node itself first then its children
	function datum(tree) {
		return tree[0]
	};

	function leftChild(tree) {
		return tree[1]
	};

	function rightChild(tree) {
		return tree[2]
	};

	if (nodes == null)
		return null;

	let tree = new BinaryTree(datum(nodes) || nodes);
	tree.left = createTree(leftChild(nodes));
	tree.right = createTree(rightChild(nodes));

	return tree;
};

/*
var tree = new BinaryTree(1); 
tree.left  = new BinaryTree(2);
tree.right = new BinaryTree(3);

tree.printPreOrder(tree)
*/
let nodes = [1, [2, 4, 5],
	[3, "x", "y"]
];

let tree = createTree(nodes);
// new VisualTree(tree, false)
//deleteTreeVisual(tree2)

//var v2 = new VisualTree(createTree(JSON.parse('[1, 2, [3, 6, 7] ]')), true) 

//var v = new VisualTree(createTree('[1, [2,[4,'x','y'],[5,9,[1,'s','t']]], [3,[6,[1,'o','m'],2],7] ]'), 'myCanvas2')
/********************** Visual Representation Part   *****************/

function VisualTree(tree, animation) {

	let origin = [400, 25];
	let height = getHeight(tree);

	paper.setup("myCanvas");
	document.getElementById("myCanvas").height = height * 60 + 10;

	function BinaryNode(tree, depth, x) {
		let pos = new Point(origin[0] + x * height * 40, origin[1] + depth * 60)

		function drawEdge(pos1, pos2) {
			return new Path.Line({
				from: pos1,
				to: pos2,
				strokeColor: 'black',
				strokeWidth: 2
			}).sendToBack()
		};

		if (tree.left) // if left exists, the right child also exists
			this.leftEdge = drawEdge(pos, pos.add([-(1 / Math.pow(2, depth)) * height * 40, 60]))
		if (tree.right)
			this.rightEdge = drawEdge(pos, pos.add([(1 / Math.pow(2, depth)) * height * 40, 60]))

		this.circle = new Path.Circle({
			radius: 20,
			strokeWidth: 2,
			fillColor: 'white',
			strokeColor: 'black',
			center: pos
		});
		this.text = new PointText({
			position: new Point(pos.x - 8, pos.y + 10),
			fontSize: '30px',
			fillColor: 'black',
			content: '' + tree.element
		});
		this.text.bringToFront();

		view.update();
	};


	

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
