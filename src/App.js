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

	let t = 0
	
	function drawPreOrder(tree, depth, x) { 
		// depth: depth of the current node, x: x-coordinate of the current node
		if (tree == null)
			return

		if (animation)
			setTimeout(function () {
				tree.node = new BinaryNode(tree, depth, x);
			}, 500 * (t++));
		else
			tree.node = new BinaryNode(tree, depth, x);

		drawPreOrder(tree.left, depth + 1, x - (1 / Math.pow(2, depth)))
		drawPreOrder(tree.right, depth + 1, x + (1 / Math.pow(2, depth)))
	};

	function getHeight(tree) {
		if (tree == null)
			return 0;

		return Math.max(getHeight(tree.left) + 1, getHeight(tree.right) + 1)
	};

	drawPreOrder(tree, 0, 0)
};

let time = 0;

function deleteTreeVisual(tree) {
	if (tree == null)
		return;

	deleteTreeVisual(tree.left);
	deleteTreeVisual(tree.right);

	if (tree.node.leftEdge)
		tree.node.leftEdge.remove();

	if (tree.node.rightEdge)
		tree.node.rightEdge.remove();

	tree.node.circle.remove();
	tree.node.text.remove();

	view.update()
};

window.evaluate = function () {
	let exp = document.getElementById("expression").value;
	tree = createTree(JSON.parse(exp));
	new VisualTree(tree, false)

	document.getElementById("inorder").innerHTML = '';
	document.getElementById("preorder").innerHTML = '';
	document.getElementById("postorder").innerHTML = '';
};

function postOrderTraverse(tree) {
	if (tree == null)
		return

	setTimeout(function () {
		tree.node.circle.strokeColor = 'red';
		view.update()
	}, 750 * (time++));

	postOrderTraverse(tree.left)
	postOrderTraverse(tree.right)

	setTimeout(function () {
		tree.node.circle.fillColor = 'black';
		tree.node.text.fillColor = 'red';
		document.getElementById("postorder").innerHTML += tree.element + ' ';

		view.update()
	}, 750 * (time++));
};

function inOrderTraverse(tree) {
	if (tree == null)
		return

	setTimeout(function () {
		tree.node.circle.strokeColor = 'red';
		view.update()
	}, 750 * (time++));

	inOrderTraverse(tree.left)
	setTimeout(function () {
		tree.node.circle.fillColor = 'black';
		tree.node.text.fillColor = 'red';
		document.getElementById("inorder").innerHTML += tree.element + ' ';
		view.update()
	}, 750 * (time++));
	inOrderTraverse(tree.right)
};

function BfsTraverse(tree, queue, visited) {
	if (tree == null && queue.length == 0)
		return

	setTimeout(function () {
		tree.node.circle.strokeColor = 'red';
		view.update()
	}, 750 * (time++));

	if (tree.left && !visited[tree.left.node.text._id]) {
		queue.push(tree.left);
	}

	if (tree.right && !visited[tree.right.node.text._id]) {
		queue.push(tree.right);
	}

	setTimeout(function () {
		tree.node.circle.fillColor = 'black';
		tree.node.text.fillColor = 'red';
		document.getElementById("bfsorder").innerHTML += tree.element + ' ';
		view.update()
	}, 750 * (time++));

	visited[tree.node.text._id] = true;
	let q = queue.shift();

	BfsTraverse(q, queue, visited);
};

function preOrderTraverse(tree) {
	if (tree == null)
		return

	setTimeout(function () {
		tree.node.circle.strokeColor = 'red';
		view.update()
	}, 750 * (time++));

	setTimeout(function () {
		tree.node.circle.fillColor = 'black';
		tree.node.text.fillColor = 'red';
		document.getElementById("preorder").innerHTML += tree.element + ' ';
		view.update()
	}, 750 * (time++));

	preOrderTraverse(tree.left)
	preOrderTraverse(tree.right)
};

window.bfsOrder = function () {
	let queue = [];
	let visite = [];
	document.getElementById("bfsorder").innerHTML = '';
	deleteTreeVisual(tree)
	new VisualTree(tree, false)

	time = 0;
	BfsTraverse(tree, queue, visite);
};

window.preOrder = function () {
	document.getElementById("preorder").innerHTML = '';
	deleteTreeVisual(tree)
	new VisualTree(tree, false)
	time = 0;
	preOrderTraverse(tree);
};

window.inOrder = function () {
	document.getElementById("inorder").innerHTML = '';
	deleteTreeVisual(tree)
	new VisualTree(tree, false)
	time = 0;
	inOrderTraverse(tree);
};

window.postOrder = function () {
	document.getElementById("postorder").innerHTML = ''
	deleteTreeVisual(tree)
	new VisualTree(tree, false)
	time = 0;
	postOrderTraverse(tree);
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
