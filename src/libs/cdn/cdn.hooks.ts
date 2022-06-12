import { useEffect, useState } from "react";
import { getAudience, getBandwidth } from "./cdn-provider";

const useCDNFetch = <R>(
  getData: (fetcher: typeof fetch) => Promise<R>,
  fetcher: typeof fetch
) => {
  const [data, setData] = useState<R | undefined>(undefined);
  const [error, setError] = useState<string>();

  useEffect(() => {
    getData(fetcher)
      .then(setData)
      .catch((e: Error) => {
        setError(e.message);
      });
  }, []);

  return { data, error };
};

export const useCDNBandwidth = (fetcher: typeof fetch) =>
  useCDNFetch(getBandwidth, fetcher);

export const useCDNAudience = (fetcher: typeof fetch) =>
  useCDNFetch(getAudience, fetcher);
