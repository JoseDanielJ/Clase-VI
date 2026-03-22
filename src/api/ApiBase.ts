export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type RequestOptions = Omit<RequestInit, "body"> & {
  params?: QueryParams;
  body?: unknown;
  headers?: HeadersInit;
};

export default class ApiBase {
  private static instance: ApiBase | null = null;

  private readonly baseUrl = "http://localhost:8000";
  private readonly defaultHeaders: HeadersInit = {
    Accept: "application/json",
  };

  private constructor() {}

  private static getInstance() {
    if (!ApiBase.instance) {
      ApiBase.instance = new ApiBase();
    }

    return ApiBase.instance;
  }

  static get<T>(endpoint: string, options: RequestOptions = {}) {
    return ApiBase.getInstance().request<T>(endpoint, {
      ...options,
      method: "GET",
    });
  }

  static post<T>(endpoint: string, body?: unknown, options: RequestOptions = {}) {
    return ApiBase.getInstance().request<T>(endpoint, {
      ...options,
      method: "POST",
      body,
    });
  }

  static put<T>(endpoint: string, body?: unknown, options: RequestOptions = {}) {
    return ApiBase.getInstance().request<T>(endpoint, {
      ...options,
      method: "PUT",
      body,
    });
  }

  static patch<T>(endpoint: string, body?: unknown, options: RequestOptions = {}) {
    return ApiBase.getInstance().request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body,
    });
  }

  static delete<T>(endpoint: string, options: RequestOptions = {}) {
    return ApiBase.getInstance().request<T>(endpoint, {
      ...options,
      method: "DELETE",
    });
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, body, headers, ...fetchOptions } = options;
    const url = this.buildUrl(endpoint, params);

    const requestHeaders = new Headers(this.defaultHeaders);

    if (body !== undefined && !(body instanceof FormData)) {
      requestHeaders.set("Content-Type", "application/json");
    }

    if (headers) {
      new Headers(headers).forEach((value, key) => {
        requestHeaders.set(key, value);
      });
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers: requestHeaders,
      body: this.serializeBody(body),
    });

    const data = await this.parseResponse(response);

    if (!response.ok) {
      throw new ApiError(
        `Request failed with status ${response.status}`,
        response.status,
        data
      );
    }

    return data as T;
  }

  private buildUrl(endpoint: string, params?: QueryParams) {
    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = new URL(`${this.baseUrl}${path}`);

    if (!params) {
      return url.toString();
    }

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }

      url.searchParams.append(key, String(value));
    });

    return url.toString();
  }

  private serializeBody(body?: unknown) {
    if (body === undefined || body === null) {
      return undefined;
    }

    if (body instanceof FormData || typeof body === "string") {
      return body;
    }

    return JSON.stringify(body);
  }

  private async parseResponse(response: Response) {
    if (response.status === 204) {
      return null;
    }

    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      return response.json();
    }

    return response.text();
  }
}
