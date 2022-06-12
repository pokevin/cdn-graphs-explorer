const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;

const defaultErrorMessage = "An error occured";

export interface BandwidthResponse {
  cdn: [timestamp: number, value: number][];
  p2p: [timestamp: number, value: number][];
}

export const getBandwith = async (
  fetcher: typeof fetch
): Promise<BandwidthResponse> => {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 15);
  const response = await fetcher(`${BACKEND_ENDPOINT}/bandwidth`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      from: fromDate.getTime(),
      to: Date.now(),
    }),
  });

  if (response.ok) {
    return response.json();
  }
  throw new Error(await response.text().catch(() => defaultErrorMessage));
};
