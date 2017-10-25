import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { ApiConfig } from './ApiConfig';

export default class ApiCore {
	private _apiConfig: ApiConfig;
	private _apiHost: string;
	private _AXIOS: AxiosInstance;

	constructor(apiConfig: ApiConfig, apiHost: string) {
		this._apiConfig = apiConfig;
		this._AXIOS = generateAxiosInstance(this._apiConfig);
		this._apiHost = apiHost;
	}

	public async delete(urlPath: string): Promise<AxiosResponse['data']> {
		const res = await this._AXIOS.delete(urlPath);

		try {
			return res.data;
		} catch (error) {
			handleErrors(error);
		}
	}

	public async get(urlPath: string, params): Promise<AxiosResponse['data']> {
		const res = await this._AXIOS.get(urlPath, { params });

		try {
			return res.data;
		} catch (error) {
			handleErrors(error);
		}
	}

	public async patch(urlPath: string, data): Promise<AxiosResponse['data']> {
		const res = await this._AXIOS.patch(urlPath, data);

		try {
			return res.data;
		} catch (error) {
			handleErrors(error);
		}
	}

	public async patchFormData(urlPath: string, data): Promise<AxiosResponse['data']> {
		const res = await this._AXIOS.patch(urlPath, getFormData(data));

		try {
			return res.data;
		} catch (error) {
			handleErrors(error);
		}
	}

	public async post(urlPath: string, data): Promise<AxiosResponse['data']> {
		const res = await this._AXIOS.post(urlPath, data);

		try {
			return res.data;
		} catch (error) {
			handleErrors(error);
		}
	}

	public async postFormData(urlPath: string, data): Promise<AxiosResponse['data']> {
		const res = await this._AXIOS.post(urlPath, getFormData(data));

		try {
			return res.data;
		} catch (error) {
			handleErrors(error);
		}
	}

	public async put(urlPath: string, data): Promise<AxiosResponse['data']> {
		const res = await this._AXIOS.put(urlPath, data);

		try {
			return res.data;
		} catch (error) {
			handleErrors(error);
		}
	}

	public async putFormData(urlPath: string, data): Promise<AxiosResponse['data']> {
		const res = await this._AXIOS.put(urlPath, getFormData(data));

		try {
			return res.data;
		} catch (error) {
			handleErrors(error);
		}
	}
}

function generateAxiosInstance(apiConfig: ApiConfig): AxiosInstance {
	return axios.create(apiConfig);
}

function getFormData(object): FormData {
	const formData: FormData = new FormData();
	Object.keys(object).forEach(key => formData.append(key, object[key]));

	return formData;
}

function handleErrors(error: AxiosError): void {
	if (error.response) {
		console.error(error.response.data);
		console.error(error.response.status);
		console.error(error.response.headers);
	} else if (error.request) {
		console.error(error.request);
	} else {
		console.error('Api Core Error', error.message);
	}

	console.error(error.config);
}
