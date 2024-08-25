import { useQuery } from "@apollo/client";
import {
  GET_ANALYTICS_DASHBOARD_DATA
} from "../graphql/queries/analyticsQueries";
import { Chart } from "react-google-charts";
import styles from "../styles/Dashboard.module.css";
import Navbar from "../src/components/general/Navbar";

function Dashboard() {
  const { data, loading, error } = useQuery(GET_ANALYTICS_DASHBOARD_DATA, {
    variables: { startDate: "2024-01-01", endDate: "2024-08-01" },
  });

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;


  const dailyClickCounts = [
    ["Date", "Daily Count"],
    ...data.jobClicksDaily.map((item: any) => [item.date, item.count]),
    ...data.applyClicksDaily.map((item: any) => [item.date, item.count]),
    ...data.employerClicksDaily.map((item: any) => [item.date, item.count])
  ];
  const dailyChartOptions = {
    title: "Daily Clicks",
  };

  return (
    <>
      <Navbar />
      <main>
        <Chart
          chartType="Line"
          width="80%"
          height="400px"
          data={dailyClickCounts}
          options={dailyChartOptions}
        />
      </main>
    </>
  );
}

export default Dashboard;
