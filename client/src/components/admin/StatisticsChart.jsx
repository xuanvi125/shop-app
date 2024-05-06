import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

import Chart from "react-apexcharts";

export default function StatisticsChart({ chart, title, description }) {
  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardHeader
        variant="gradient"
        color="white"
        floated={false}
        shadow={false}
      >
        <Chart {...chart} />
      </CardHeader>
      <CardBody className="px-6 pt-0">
        <Typography variant="h6" color="blue-gray">
          {title}
        </Typography>
      </CardBody>
    </Card>
  );
}
