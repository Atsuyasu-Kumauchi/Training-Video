import { AuthServer } from "@/tmsui/core";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosInstance, CancelTokenSource } from "axios";

interface IQueryConfig {
  key: string[];
  url: string;
}

export interface ApiResponse<TData> {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  resultCount: number;
  sortBy: string;
  sortDirection: string;
  data: TData[];
}

interface IUseFetchListQueryProps {
  query: IQueryConfig;
  pageIndex: number;
  pageSize: number;
  sorting: { id: string; desc: boolean }[];
  columnFilters: { id: string; value: unknown }[];
  filters?: Record<string, string | number | boolean | undefined | null>;
  searchQuery?: Record<string, string>;
  server?: AxiosInstance;
  sortBy?: string;
  staleTime?: number;
}

export function useFetchListQuery<TData>({
  query,
  pageIndex,
  pageSize,
  filters,
  server = AuthServer,
  staleTime = 1000 * 60 * 5,
}: IUseFetchListQueryProps) {
  return useQuery<ApiResponse<TData>>({
    queryKey: [
      ...query.key,
      pageIndex,
      pageSize,
      filters,
    ],
    queryFn: async ({ signal }) => {
      const cancelSource: CancelTokenSource = axios.CancelToken.source();
      signal?.addEventListener("abort", () => cancelSource.cancel());
      const params = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        ...Object.entries(filters ?? {})
          .filter(([, value]) => value !== undefined && value !== null)
          .reduce(
            (acc, [key, value]) => {
              acc[key] = String(value);
              return acc;
            },
            {} as Record<string, string>,
          ),

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
          data: response?.data.data ?? [],

        }
      } catch (error: unknown) {
        if (axios.isCancel(error)) {
          console.warn("Cancelled request:", error.message);
        } else {
          throw error; // Interceptors handle the user alerts
        }

        return {
          pageIndex: 0,
          pageSize: 0,
          pageCount: 0,
          resultCount: 0,
          sortBy: "",
          sortDirection: "",
          data: [],
        };
      }
    },
    staleTime: staleTime,
  });
}
