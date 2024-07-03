import { PieChart } from "@mui/x-charts";
import { Col } from "react-bootstrap";

const CustomPieChart = ({ data }: any) => {
  return (
    <Col md={4} className="m-3">
      <PieChart
        slotProps={{
          legend: {
            direction: "column",
            padding: -5,
          },
        }}
        series={[
          {
            data,
            innerRadius: 30,
            paddingAngle: 3,
            cornerRadius: 5,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: {
              innerRadius: 30,
              additionalRadius: -30,
              color: "gray",
            },
          },
        ]}
        height={200}
      />
    </Col>
  );
};

export default CustomPieChart;
