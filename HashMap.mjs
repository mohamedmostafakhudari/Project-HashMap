import MapLinkedList from "./MapLinkedList.mjs";

export default class HashMap {
	capacity = 16;
	loadFactor = 0.75;

	constructor() {
		this.table = new Array(this.capacity);
	}
	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
		}

		return hashCode;
	}
	set(key, value) {
		const hashCode = this.hash(key);
		let bucket = this.table[hashCode];

		if (bucket == null || bucket.head == null) {
			const exceededLoadFactor = this.checkCapacity();
			if (exceededLoadFactor) {
				this.growTable();
			}
			this.table[hashCode] = new MapLinkedList(key, value);
		} else {
			let current = bucket.head;
			while (current) {
				if (current.key === key) {
					current.value = value;
					return;
				}
				current = current.next;
			}
			bucket.append(key, value);
		}
	}
	get(key) {
		const hashCode = this.hash(key);
		let bucket = this.table[hashCode];

		if (bucket == null || bucket.head == null) return null;

		let current = bucket.head;
		while (current) {
			if (current.key === key) {
				return current.value;
			}
			current = current.next;
		}
		return null;
	}
	has(key) {
		const hashCode = this.hash(key);
		let bucket = this.table[hashCode];

		if (bucket == null || bucket.head == null) return false;

		return bucket.contains(key);
	}
	remove(key) {
		const hashCode = this.hash(key);
		let bucket = this.table[hashCode];

		if (bucket == null || bucket.head == null) return false;

		const removedItemIndex = bucket.find(key);
		if (removedItemIndex == null) return false;

		return bucket.removeAt(removedItemIndex + 1);
	}
	length() {
		let length = 0;
		for (const bucket of this.table) {
			if (bucket && bucket.head) {
				length += 1;
			}
		}
		return length;
	}
	clear() {
		for (let i = 0; i < this.table.length; i++) {
			this.table[i] = null;
		}
	}
	keys() {
		const keys = [];
		for (const bucket of this.table) {
			if (bucket && bucket.head) {
				let current = bucket.head;
				while (current) {
					keys.push(current.key);
					current = current.next;
				}
			}
		}
		return keys;
	}
	values() {
		const values = [];
		for (const bucket of this.table) {
			if (bucket && bucket.head) {
				let current = bucket.head;
				while (current) {
					values.push(current.value);
					current = current.next;
				}
			}
		}
		return values;
	}
	entries() {
		const entries = [];
		for (const bucket of this.table) {
			if (bucket && bucket.head) {
				let current = bucket.head;
				while (current) {
					entries.push([current.key, current.value]);
					current = current.next;
				}
			}
		}
		return entries;
	}
	growTable() {
		this.capacity *= 2;
		const newTable = new Array(this.capacity);

		for (let i = 0; i < this.table.length; i++) {
			newTable[i] = this.table[i] || null;
		}
		this.table = newTable;
	}
	checkCapacity() {
		const numOfFilledBuckets = this.length();
		const percent = numOfFilledBuckets / this.capacity;
		return percent >= this.loadFactor;
	}
}
