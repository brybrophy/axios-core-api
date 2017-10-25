import axios, { AxiosError, AxiosInstance } from 'axios';

type ApiConfig = {
	headers: {
		Accept: string;
		Authorization: string;
		'Content-Type': string;
	};
	timeout: number;
};

export default class ApiCore {
	private _apiConfig: ApiConfig;
	private _apiHost: string;
	private _AXIOS: AxiosInstance;

	constructor(apiConfig: ApiConfig, apiHost: string) {
		this._apiConfig = apiConfig;
		this._AXIOS = generateAxiosInstance(this._apiConfig);
		this._apiHost = apiHost;
	}

	public async delete(urlPath: string) {
		const res = await this._AXIOS.delete(urlPath);

		try {
			return res.data;
		} catch (error) {
			handleErrors(error);
		}
	}

	public async get(urlPath: string, params) {
		const res = await this._AXIOS.get(urlPath, { params });

		try {
			return res.data;
		} catch (error) {
			handleErrors(error);
		}
	}

	public async post(urlPath: string, data) {
		const res = await this._AXIOS.post(urlPath, data);

		try {
			return res.data;
		} catch (error) {
			handleErrors(error);
		}
	}

	public async postFormData(urlPath: string, data) {
		const res = await this._AXIOS.post(urlPath, getFormData(data));

		try {
			return res.data;
		} catch (error) {
			handleErrors(error);
		}
	}

	public async put(urlPath: string, data) {
		const res = await this._AXIOS.put(urlPath, data);

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

function getFormData(object) {
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
