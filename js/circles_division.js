//-----------------------------------------------------------------------
// Circles division
//
// Author: delimitry
//-----------------------------------------------------------------------

function getRandomRange(min, max) {
	return Math.random() * (max - min + 1) + min;
}

function getRandomRangeRGBColor(min, max) {
	r = getRandomRange(min, max) | 0;
	g = getRandomRange(min, max) | 0;
	b = getRandomRange(min, max) | 0;
	return 'rgb(' + r + ',' + g + ',' + b + ')'; 
} 

function TheNode(x, y, w, h, color) {

	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;	
	this.visible = true;
	this.color = color;
	this.children = [null, null, null, null]; // four subnodes

	// add four subnodes
	this.add_sub_nodes = function() {
		this.children[0] = new TheNode(this.x, this.y, this.w / 2, this.h / 2, getRandomRangeRGBColor(64, 256));
		this.children[1] = new TheNode(this.x + this.w / 2, this.y, this.w / 2, this.h / 2, getRandomRangeRGBColor(64, 256));
		this.children[2] = new TheNode(this.x, this.y + this.h / 2, this.w / 2, this.h / 2, getRandomRangeRGBColor(64, 256));
		this.children[3] = new TheNode(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, this.h / 2, getRandomRangeRGBColor(64, 256));
	}

	// draw all circles
	this.draw = function(context) {
		if (this.visible) {
			context.beginPath();
			context.fillStyle = color;
			context.arc(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, 0, 2 * Math.PI, false);
			context.fill();
			context.lineWidth = 1;
			context.stroke();
		}

		// for four subnodes
		for (var i = 0; i < 4; i++) {		
			if (this.children[i]) {
				var child = this.children[i];
				while (child) {
					child.draw(context);
					child = child.children[i];
				}
			}
		}
	}

	// update nodes
	this.update = function(mx, my) {

		// for four subnodes
		for (var i = 0; i < 4; i++) {
			if (this.children[i]) {
				var child = this.children[i];
				child.update(mx, my);
				child = child.children[i];	
			}
		}

		// split the root node into four subnodes
		if ((mx > this.x && mx < this.x + this.w) && (my > this.y && my < this.y + this.h)) {
			if (this.visible) {
				if (this.w > 4 && this.h > 4) {
					this.add_sub_nodes();
					this.visible = false;
				}
			}
		} 
	}

}