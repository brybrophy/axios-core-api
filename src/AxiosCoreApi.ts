import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig
} from 'axios';
import FormData from 'form-data';

interface IObject {
  [key: string]: string | number;
}

export default class ApiCore {
  private _apiConfig: AxiosRequestConfig;
  private _AXIOS: AxiosInstance;
  private _AXIOS_FORM: AxiosInstance;

  constructor(apiConfig: AxiosRequestConfig) {
    this._apiConfig = apiConfig;
    this._AXIOS = this._generateAxiosInstance(this._apiConfig);
    this._AXIOS_FORM = this._generateFormDataAxiosInstance(this._apiConfig);
  }

  public async delete(url: string): Promise<AxiosResponse['data']> {
    try {
      const res = await this._AXIOS.delete(url);

      return res.data;
    } catch (error) {
      return this._handleErrors(error);
    }
  }

  public async get(
    url: string,
    params?: IObject
  ): Promise<AxiosResponse['data']> {
    try {
      const res = await this._AXIOS.get(url, { params });

      return res.data;
    } catch (error) {
      return this._handleErrors(error);
    }
  }

  public async patch(
    url: string,
    data: IObject
  ): Promise<AxiosResponse['data']> {
    try {
      const res = await this._AXIOS.patch(url, data);

      return res.data;
    } catch (error) {
      return this._handleErrors(error);
    }
  }

  public async post(
    url: string,
    data: IObject
  ): Promise<AxiosResponse['data']> {
    try {
      const res = await this._AXIOS.post(url, data);

      return res.data;
    } catch (error) {
      return this._handleErrors(error);
    }
  }

  public async postFormData(
    url: string,
    data: IObject
  ): Promise<AxiosResponse['data']> {
    try {
      const res = await this._AXIOS_FORM.post(url, this._getFormData(data));

      return res.data;
    } catch (error) {
      return this._handleErrors(error);
    }
  }

  public async put(url: string, data: IObject): Promise<AxiosResponse['data']> {
    try {
      const res = await this._AXIOS.put(url, data);

      return res.data;
    } catch (error) {
      return this._handleErrors(error);
    }
  }

  public refreshApiInstance(newConfig: AxiosRequestConfig) {
    this._apiConfig = newConfig;
    this._AXIOS = this._generateAxiosInstance(this._apiConfig);
    this._AXIOS_FORM = this._generateFormDataAxiosInstance(this._apiConfig);
  }

  private _generateAxiosInstance(apiConfig: AxiosRequestConfig): AxiosInstance {
    return axios.create(apiConfig);
  }

  private _generateFormDataAxiosInstance(
    apiConfig: AxiosRequestConfig
  ): AxiosInstance {
    const formDataConfig = apiConfig;

    formDataConfig.headers['Content-Type'] =
      'application/x-www-form-urlencoded';

    return this._generateAxiosInstance(formDataConfig);
  }

  private _getFormData(object: IObject): FormData {
    const formData: FormData = new FormData();

    Object.keys(object).forEach(key => formData.append(key, object[key]));

    return formData;
  }

  private _handleErrors(error: AxiosError): void {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Api Core Error', error.message);
    }

    return console.error(error.config);
  }
}

// for tests
export const axiosInstance = axios;
