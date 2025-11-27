import { AuthServer } from "@/tmsui/core";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosInstance, CancelTokenSource } from "axios";

interface IQueryConfig {
  key: string[];
  url: string;
}

export interface ApiResponse<TData> {
  nonce: number;
  status: number;
  message: string;
  error: null | string;
  pageable: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
  };
  items: TData[];
}

interface IUseFetchListQueryProps {
  query: IQueryConfig;
  pageIndex: number;
  pageSize: number;
  globalFilter: string;
  sorting: { id: string; desc: boolean }[];
  columnFilters: { id: string; value: unknown }[];
  filters?: Record<string, string | number | boolean | undefined | null>;
  server?: AxiosInstance;
  sortBy?: string;
  staleTime?: number;
}

export function useFetchListQuery<TData>({
  query,
  pageIndex,
  pageSize,
  globalFilter,
  sorting,
  columnFilters,
  filters,
  server = AuthServer,
  sortBy = "updatedAt:desc",
  staleTime = 1000 * 60 * 5,
}: IUseFetchListQueryProps) {
  return useQuery<ApiResponse<TData>>({
    queryKey: [
      ...query.key,
      pageIndex,
      pageSize,
      globalFilter,
      sorting,
      columnFilters,
      filters,
    ],
    queryFn: async ({ signal }) => {
      const cancelSource: CancelTokenSource = axios.CancelToken.source();
      signal?.addEventListener("abort", () => cancelSource.cancel());

      const params = {
        page: pageIndex + 1,
        per_page: pageSize,
        // q: globalFilter,
        // ...Object.entries(filters ?? {})
        //   .filter(([, value]) => value !== undefined && value !== null)
        //   .reduce(
        //     (acc, [key, value]) => {
        //       acc[key] = String(value);
        //       return acc;
        //     },
        //     {} as Record<string, string>,
        //   ),
        // sortBy: [
        //   ...(sortBy ? sortBy.split(",").filter(Boolean) : []),
        //   ...sorting.map((s) => `${s.id}:${s.desc ? "desc" : "asc"}`),
        // ]
        //   .filter((value, index, array) => array.indexOf(value) === index) // deduplicate
        //   .slice(-1) // keep only the LAST (most recent) sort field
        //   .join(","),
        // ...columnFilters.reduce(
        //   (acc, filter) => {
        //     acc[filter.id] = filter.value;
        //     return acc;
        //   },
        //   {} as Record<string, unknown>,
        // ),
      };

      const [baseUrl] = query.url.split("?");

      try {
        const response = await server.get<ApiResponse<TData>>(baseUrl ?? "", {
          params,
          cancelToken: cancelSource.token,
        });

        return {
          ...response.data,
          items: response?.data.items ?? [],

        }
      } catch (error: any) {
        if (axios.isCancel(error)) {
          console.warn("Cancelled request:", error.message);
        } else {
          throw error; // Interceptors handle the user alerts
        }

        return {
          nonce: 0,
          status: 500,
          message: "Canceled or failed request",
          error: error.message ?? "Request failed",
          pageable: {
            pageNumber: 0,
            pageSize,
            totalPages: 0,
            totalElements: 0,
            first: true,
            last: true,
          },
          items: [],
        };
      }
    },
    staleTime: staleTime,
  });
}
