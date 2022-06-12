import "chart.js/auto";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BandwithChart } from "../../components/BandwitdhChart";
import { Header } from "../../components/Header";
import { useAuth } from "../../libs/auth/AuthContext";
import { getBandwith } from "../../libs/cdn/cdn-provider";
import { ColumnPage } from "./Home.styled";
import type { BandwidthResponse } from "../../libs/cdn/cdn-provider";

const HomePage = () => {
  const { authFetcher } = useAuth();
  const [data, setData] = useState<BandwidthResponse | undefined>(undefined);
  const [error, setError] = useState<string>();

  useEffect(() => {
    getBandwith(authFetcher)
      .then(setData)
      .catch((e: Error) => {
        setError(e.message);
      });
  }, []);

  return (
    <>
      <Header />
      <ColumnPage>
        <BandwithChart data={data} />
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
      </ColumnPage>
    </>
  );
};

export default HomePage;
