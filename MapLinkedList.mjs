class MapLinkedList {
	#length = 1;
	constructor(key, value) {
		const newNode = createNode(key, value);
		this.head = newNode;
		this.tail = this.head;
	}
	append(key, value) {
		const newNode = createNode(key, value);
		this.tail.next = newNode;
		newNode.prev = this.tail;
		this.tail = newNode;

		// Update Length
		this.#length++;
	}
	prepend(key, value) {
		const newNode = createNode(key, value);
		newNode.next = this.head;
		this.head.prev = newNode;
		this.head = newNode;

		// Update Length
		this.#length++;
	}
	at(index) {
		let current = this.head;
		let i = 0;
		while (current) {
			if (i === index) {
				return current;
			}
			i++;
			current = current.next;
		}
		console.log("Not Found");
		return null;
	}
	pop() {
		this.tail = this.tail.prev;
		this.tail.next = null;
		this.#length--;
	}
	contains(key) {
		let current = this.head;
		while (current) {
			if (current.key === key) {
				return true;
			}
			current = current.next;
		}
		return false;
	}
	find(key) {
		let current = this.head;
		let i = 0;
		while (current) {
			if (current.key === key) {
				return i;
			}
			i++;
			current = current.next;
		}
		return null;
	}
	insertAt(key, value, pos) {
		const index = pos - 1;
		const node = this.at(index);
		if (node) {
			if (index === 0) {
				this.prepend(value);
			} else if (index === this.#length - 1) {
				this.append(value);
			} else {
				const newNode = createNode(key, value);

				newNode.prev = node.prev;
				newNode.next = node;
				node.prev.next = newNode;
				node.prev = newNode;
				this.#length++;
			}
		}
	}
	removeAt(pos) {
		const index = pos - 1;
		if (this.head === null) return;
		const node = this.at(index);
		if (node) {
			if (index === 0) {
				let temp = this.head;
				this.head = this.head.next;
				temp.next = null;
				if (this.head) {
					this.head.prev = null;
				}
				if (this.#length == 1) {
					this.tail = null;
				}
				this.#length--;
			} else if (index === this.#length - 1) {
				this.pop();
			} else {
				if (node.prev?.next) {
					node.prev.next = node.next;
				}
				if (node.next?.prev) {
					node.next.prev = node.prev;
				}
				node.next = null;
				node.prev = null;
				this.#length--;
			}

			return true;
		}
	}
	toString() {
		let current = this.head;
		let nodesValues = [];
		while (current) {
			nodesValues.push([current.key, current.value]);
			current = current.next;
		}
		// console.log(`( ${nodesValues.join(" ) -> ( ")} ) -> null`);
		return `( ${nodesValues.join(" ) -> ( ")} ) -> null`;
	}
	get size() {
		return this.#length;
	}
}

export default MapLinkedList;

function createNode(key, value) {
	return {
		key,
		value,
		next: null,
		prev: null,
	};
}
