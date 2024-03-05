import { AxiosResponse } from "axios";

export interface ChatCreationRequest {
	file_key: string;
	file_name: string;
}

export interface UploadResponse {
	message: string;
	status: Number;
}
