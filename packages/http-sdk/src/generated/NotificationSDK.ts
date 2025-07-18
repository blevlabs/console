/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AlertCreateInput {
  data:
    | {
        /** @format uuid */
        userId: string;
        /** @format uuid */
        contactPointId: string;
        /** @default true */
        enabled?: boolean;
        /** @minLength 3 */
        summary: string;
        /** @minLength 3 */
        description: string;
        type: "CHAIN_MESSAGE";
        conditions:
          | {
              operator: "and";
              /** @minItems 2 */
              value: {
                operator: "eq" | "lt" | "gt" | "lte" | "gte";
                field: string;
                value: string | number | boolean;
              }[];
            }
          | {
              operator: "or";
              /** @minItems 2 */
              value: {
                operator: "eq" | "lt" | "gt" | "lte" | "gte";
                field: string;
                value: string | number | boolean;
              }[];
            }
          | {
              operator: "eq" | "lt" | "gt" | "lte" | "gte";
              field: string;
              value: string | number | boolean;
            };
      }
    | {
        /** @format uuid */
        userId: string;
        /** @format uuid */
        contactPointId: string;
        /** @default true */
        enabled?: boolean;
        /** @minLength 3 */
        summary: string;
        /** @minLength 3 */
        description: string;
        type: "DEPLOYMENT_BALANCE";
        conditions:
          | {
              operator: "and";
              /** @minItems 2 */
              value: {
                operator: "eq" | "lt" | "gt" | "lte" | "gte";
                field: "balance";
                value: number;
              }[];
            }
          | {
              operator: "or";
              /** @minItems 2 */
              value: {
                operator: "eq" | "lt" | "gt" | "lte" | "gte";
                field: "balance";
                value: number;
              }[];
            }
          | {
              operator: "eq" | "lt" | "gt" | "lte" | "gte";
              field: "balance";
              value: number;
            };
        params: {
          dseq: string;
          owner: string;
        };
      };
}

export interface AlertOutputResponse {
  data:
    | {
        /** @format uuid */
        userId: string;
        /** @format uuid */
        contactPointId: string;
        enabled: boolean;
        /** @minLength 3 */
        summary: string;
        /** @minLength 3 */
        description: string;
        /** @format uuid */
        id: string;
        status: string;
        createdAt: any;
        updatedAt: any;
        type: "CHAIN_MESSAGE";
        conditions:
          | {
              operator: "and";
              /** @minItems 2 */
              value: {
                operator: "eq" | "lt" | "gt" | "lte" | "gte";
                field: string;
                value: string | number | boolean;
              }[];
            }
          | {
              operator: "or";
              /** @minItems 2 */
              value: {
                operator: "eq" | "lt" | "gt" | "lte" | "gte";
                field: string;
                value: string | number | boolean;
              }[];
            }
          | {
              operator: "eq" | "lt" | "gt" | "lte" | "gte";
              field: string;
              value: string | number | boolean;
            };
      }
    | {
        /** @format uuid */
        userId: string;
        /** @format uuid */
        notificationChannelId: string;
        enabled: boolean;
        /** @minLength 3 */
        summary: string;
        /** @minLength 3 */
        description: string;
        /** @format uuid */
        id: string;
        status: string;
        createdAt: any;
        updatedAt: any;
        type: "DEPLOYMENT_BALANCE";
        conditions:
          | {
              operator: "and";
              /** @minItems 2 */
              value: {
                operator: "eq" | "lt" | "gt" | "lte" | "gte";
                field: "balance";
                value: number;
              }[];
            }
          | {
              operator: "or";
              /** @minItems 2 */
              value: {
                operator: "eq" | "lt" | "gt" | "lte" | "gte";
                field: "balance";
                value: number;
              }[];
            }
          | {
              operator: "eq" | "lt" | "gt" | "lte" | "gte";
              field: "balance";
              value: number;
            };
        params: {
          dseq: string;
          owner: string;
        };
      };
}

export interface AlertPatchInput {
  data: {
    /** @format uuid */
    userId?: string;
    /** @format uuid */
    notificationChannelId?: string;
    /** @default true */
    enabled?: boolean;
    /** @minLength 3 */
    summary?: string;
    /** @minLength 3 */
    description?: string;
    conditions?:
      | (
          | {
              operator: "and";
              /** @minItems 2 */
              value: {
                operator: "eq" | "lt" | "gt" | "lte" | "gte";
                field: string;
                value: string | number | boolean;
              }[];
            }
          | {
              operator: "or";
              /** @minItems 2 */
              value: {
                operator: "eq" | "lt" | "gt" | "lte" | "gte";
                field: string;
                value: string | number | boolean;
              }[];
            }
          | {
              operator: "eq" | "lt" | "gt" | "lte" | "gte";
              field: string;
              value: string | number | boolean;
            }
        )
      | (
          | {
              operator: "and";
              /** @minItems 2 */
              value: {
                operator: "eq" | "lt" | "gt" | "lte" | "gte";
                field: "balance";
                value: number;
              }[];
            }
          | {
              operator: "or";
              /** @minItems 2 */
              value: {
                operator: "eq" | "lt" | "gt" | "lte" | "gte";
                field: "balance";
                value: number;
              }[];
            }
          | {
              operator: "eq" | "lt" | "gt" | "lte" | "gte";
              field: "balance";
              value: number;
            }
        );
  };
}

export interface ContactPointCreateInput {
  data: {
    /** @format uuid */
    userId: string;
    type: "email";
    config: {
      addresses: string[];
    };
  };
}

export interface ContactPointOutput {
  data: {
    /** @format uuid */
    userId: string;
    type: "email";
    config: {
      addresses: string[];
    };
    /** @format uuid */
    id: string;
    createdAt: any;
    updatedAt: any;
  };
}

export interface ContactPointPatchInput {
  data: {
    type?: "email";
    config?: {
      addresses: string[];
    };
  };
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain"
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer"
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(key => "undefined" !== typeof query[key]);
    return keys.map(key => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key))).join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) => (input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input),
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob ? property : typeof property === "object" && property !== null ? JSON.stringify(property) : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input)
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) && this.securityWorker && (await this.securityWorker(this.securityData))) || {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {})
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body)
    }).then(async response => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then(data => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch(e => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title NotificationsAPI
 * @version 1.0
 * @contact
 *
 * Notifications API
 */
export class NotificationSDK<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  alert = {
    /**
     * No description
     *
     * @tags Alert
     * @name CreateAlert
     * @request POST:/alerts
     */
    createAlert: (data: AlertCreateInput, params: RequestParams = {}) =>
      this.request<AlertOutputResponse, any>({
        path: `/alerts`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags Alert
     * @name GetAlert
     * @request GET:/alerts/{id}
     */
    getAlert: (id: string, params: RequestParams = {}) =>
      this.request<AlertOutputResponse, any>({
        path: `/alerts/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags Alert
     * @name PatchAlert
     * @request PATCH:/alerts/{id}
     */
    patchAlert: (id: string, data: AlertPatchInput, params: RequestParams = {}) =>
      this.request<AlertOutputResponse, any>({
        path: `/alerts/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags Alert
     * @name DeleteAlert
     * @request DELETE:/alerts/{id}
     */
    deleteAlert: (id: string, params: RequestParams = {}) =>
      this.request<AlertOutputResponse, any>({
        path: `/alerts/${id}`,
        method: "DELETE",
        format: "json",
        ...params
      })
  };
  contactPoint = {
    /**
     * No description
     *
     * @tags ContactPoint
     * @name CreateContactPoint
     * @request POST:/contact-points
     */
    createContactPoint: (data: ContactPointCreateInput, params: RequestParams = {}) =>
      this.request<ContactPointOutput, any>({
        path: `/contact-points`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags ContactPoint
     * @name GetContactPoint
     * @request GET:/contact-points/{id}
     */
    getContactPoint: (id: string, params: RequestParams = {}) =>
      this.request<ContactPointOutput, any>({
        path: `/contact-points/${id}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags ContactPoint
     * @name PatchContactPoint
     * @request PATCH:/contact-points/{id}
     */
    patchContactPoint: (id: string, data: ContactPointPatchInput, params: RequestParams = {}) =>
      this.request<ContactPointOutput, any>({
        path: `/contact-points/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags ContactPoint
     * @name DeleteContactPoint
     * @request DELETE:/contact-points/{id}
     */
    deleteContactPoint: (id: string, params: RequestParams = {}) =>
      this.request<ContactPointOutput, any>({
        path: `/contact-points/${id}`,
        method: "DELETE",
        format: "json",
        ...params
      })
  };
}
