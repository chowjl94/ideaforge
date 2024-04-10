export class APIThrottler {
	maxRequestsPerMinute: number;
	requestQueue: Function[];
	lastRequestTimestamp: number | null;

	constructor(maxRequestsPerMinute: number) {
		this.maxRequestsPerMinute = maxRequestsPerMinute;
		this.requestQueue = [];
		this.lastRequestTimestamp = null;
	}

	async throttleRequest(request: Function): Promise<any> {
		const currentTimestamp = Date.now();

		if (
			!this.lastRequestTimestamp ||
			currentTimestamp - this.lastRequestTimestamp > 60000
		) {
			this.requestQueue = [];
			this.lastRequestTimestamp = currentTimestamp; // Update last request timestamp
		}
		// Add the current request to the queue
		this.requestQueue.push(request);
		if (this.requestQueue.length <= this.maxRequestsPerMinute) {
			// If the queue is still below the limit, execute the request immediately
			return await request();
		} else {
			// If the queue is full, wait until the next minute to execute the request
			const waitTime = 60000 - (currentTimestamp - this.lastRequestTimestamp);
			await new Promise((resolve) => setTimeout(resolve, waitTime));
			this.lastRequestTimestamp = Date.now(); // Update last request timestamp
			return await request();
		}
	}
}
