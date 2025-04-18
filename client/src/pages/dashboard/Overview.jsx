import {
  Divider, Unstable_Grid2 as Grid, Box, Container
} from "@mui/material"
import Heading from "../../components/ui/Heading"
import StatisticsCard from "../../components/Dashboard/overview/StatisticsCard"
import Trophy from "../../components/Dashboard/overview/Trophy"
import WeeklyOverview from "../../components/Dashboard/overview/WeeklyOverview"
import { useCallback, useEffect, useState } from "react"
import { dashboardApi } from "../../api/dashboardApi"
import { useMounted } from "../../hooks/use-mounted"
import { toast } from "react-hot-toast"


function Overview() {
  const [data, setData] = useState([])
  const isMounted = useMounted()

  const getInfo = useCallback(async () => {
    try {
      toast.promise(
        dashboardApi.getInfo(),
        {
          loading: 'Fetching data...',
          error: 'Error while fetching data',
        },
        { id: 'fetching', success: { style: { display: 'none' } } }
      )
        .then((response) => {
          if (isMounted()) {
            setData(response);
          }
        })
        .catch((error) => {
          if (isMounted()) {
            console.error(error);
          }
        });
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container maxWidth='xl' >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: '1rem',
            marginRight: '1rem',
            marginTop: '1rem',
          }}
        >
          <Heading title="Dashboard" description="Overview of your store" />
        </Box>
        <Divider
          sx={{
            marginY: 2,
            marginLeft: '1rem',
            marginRight: '1rem',
          }} />

      </Container >
      <Grid sx={{
        marginLeft: '1rem',
        marginRight: '1rem'
      }}
        container
        spacing={3}>
        <Grid
          xs={12}
          md={4}
        >
          <Trophy />
        </Grid>
        <Grid
          xs={12}
          md={8}
        >
          <StatisticsCard data={data} />
        </Grid>
        <Grid
          xs={12}
          md={12}
        >
          <WeeklyOverview data={data?.dailyRevenue} />
        </Grid>
      </Grid>
    </>
  )
}

export default Overview