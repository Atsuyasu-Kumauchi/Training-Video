import { AuthServer, selectConvert } from "@/tmsui";
import { useQuery } from "@tanstack/react-query";
import axios, { CancelTokenSource } from "axios";

export interface ISelectConvertProps {
  label: string;
  value: string;
}

interface IQueryConfig {
  key: string[];
  url: string;
}

export interface IApiResponse<TData> {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  resultCount: number;
  sortBy: string;
  sortDirection: string;
  data: TData[];
}

interface IUseFetchListProps {
  query: IQueryConfig;
  pageIndex?: number;
  pageSize?: number;
  keyName?: ISelectConvertProps;
  statusFilter?: boolean | string | null;
}

export function useFetchList<TData>({ query, pageIndex = 0, pageSize = 1000, keyName, statusFilter }: IUseFetchListProps): ISelectConvertProps[] {
  const { data, isLoading, isFetching } = useQuery<IApiResponse<TData>>({
    queryKey: [...query.key, pageIndex, pageSize, statusFilter],
    queryFn: async ({ signal }) => {
      const cancelSource: CancelTokenSource = axios.CancelToken.source();
      signal?.addEventListener("abort", () => cancelSource.cancel());
      const params: Record<string, any> = {
        pageIndex: pageIndex,
        pageSize: pageSize,
      };
      if (statusFilter !== undefined && statusFilter !== null) {
        params.statusFilter = statusFilter;
      }
      const [baseUrl] = query.url.split("?");
      try {
        const response = await AuthServer.get<IApiResponse<TData>>(baseUrl ?? "", {
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
  });
  const options = keyName ? selectConvert<TData>(data?.data ?? [], keyName ?? { label: "", value: "" }) : data?.data ?? [];
  if (isLoading || isFetching) return [];
  return options as ISelectConvertProps[];
}