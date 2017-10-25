import axios, { AxiosError, AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

export default class ApiCore {
	private _apiConfig: AxiosRequestConfig;
	private _AXIOS: AxiosInstance;
	private _AXIOS_FORM: AxiosInstance;

	constructor(apiConfig: AxiosRequestConfig, apiHost: string) {
		this._apiConfig = apiConfig;
		this._AXIOS = generateAxiosInstance(this._apiConfig);
		this._AXIOS_FORM = generateFormDataAxiosInstance(this._apiConfig);
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

	public async post(urlPath: string, data): Promise<AxiosResponse['data']> {
		const res = await this._AXIOS.post(urlPath, data);

		try {
			return res.data;
		} catch (error) {
			handleErrors(error);
		}
	}

	public async postFormData(urlPath: string, data): Promise<AxiosResponse['data']> {
		const res = await this._AXIOS_FORM.post(urlPath, getFormData(data));

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

	public refreshApiInstance(newConfig: AxiosRequestConfig) {
		this._apiConfig = newConfig;
		this._AXIOS = generateAxiosInstance(this._apiConfig);
		this._AXIOS_FORM = generateFormDataAxiosInstance(this._apiConfig);
	}
}

function generateAxiosInstance(apiConfig: AxiosRequestConfig): AxiosInstance {
	return axios.create(apiConfig);
}

function generateFormDataAxiosInstance(apiConfig: AxiosRequestConfig): AxiosInstance {
	const formDataConfig = apiConfig;
	formDataConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded';

	return generateAxiosInstance(formDataConfig);
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
