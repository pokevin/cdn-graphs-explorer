import { Alert, AlertIcon } from "@chakra-ui/react";
import { AudienceChart } from "../../components/Chart/AudienceChart";
import { BandwithChart } from "../../components/Chart/BandwidthChart";
import { Header } from "../../components/Header";
import { useAuth } from "../../libs/auth/AuthContext";
import { useCDNAudience, useCDNBandwidth } from "../../libs/cdn/cdn.hooks";
import { ColumnPage } from "./Home.styled";

const HomePage = () => {
  const { authFetcher } = useAuth();
  const bandwidth = useCDNBandwidth(authFetcher);
  const audience = useCDNAudience(authFetcher);

  return (
    <>
      <Header />
      <ColumnPage>
        <BandwithChart data={bandwidth.data} />
        {bandwidth.error && (
          <Alert status="error">
            <AlertIcon />
            {bandwidth.error}
          </Alert>
        )}
        <AudienceChart data={audience.data} />
        {audience.error && (
          <Alert status="error">
            <AlertIcon />
            {audience.error}
          </Alert>
        )}
      </ColumnPage>
    </>
  );
};

export default HomePage;
