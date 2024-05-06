import StatisticsCard from "../../components/admin/StatisticsCard";
import StatisticsChart from "../../components/admin/StatisticsChart";
import TableTopBestSeller from "../../components/admin/TableTopBestSeller";
import {
  CurrencyDollarIcon,
  BookOpenIcon,
  UserIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

import { useState, useEffect } from "react";
import { StatisticsService } from "../../services/statisticsService";

const columnChart = {
  type: "bar",
  height: 320,
  series: [
    {
      name: "Quantity",
      data: [],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    colors: "#388e3c",
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "15%",
        borderRadius: 5,
      },
    },
    xaxis: {
      axisTicks: {
        show: true,
      },
      labels: {
        formatter: function (value) {
          return typeof value === "string" && value.slice(0, 10) + "...";
        },
      },
      categories: [],
    },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const quantity = series[seriesIndex][dataPointIndex];
        const category = w.globals.labels[dataPointIndex];
        return `<Card class="p-2">
                  <CardHeader class="">
                    <p class="font-bold" >${category}</p>
                  </CardHeader>
                  <CardBody class="text-sm">
                    <p class="" >Quantity: ${quantity}</p>
                  </CardBody>
                </Card>`;
      },
    },
  },
};

const monthlyRevenue = {
  type: "line",
  height: 320,
  series: [
    {
      name: "Sales",
      data: [],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    colors: ["#0288d1"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      categories: [],
    },
  },
};

export default function Dashboard() {
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(0);
  const [sales, setSales] = useState(0);

  const [topProductsOptionChart, setTopProductsOptionChart] =
    useState(columnChart);
  const [monthlyRevenueOptionChart, setMonthlyRevenueOptionChart] =
    useState(monthlyRevenue);

  // Get data for statistics cards
  useEffect(() => {
    const getRevenue = async () => {
      const statistics = await StatisticsService.getTotalRevenue();
      const revenueFormat = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      setSales(revenueFormat.format(statistics.totalRevenue));
    };

    const getProducts = async () => {
      const statistics = await StatisticsService.getTotalProducts();
      setProducts(statistics.totalProduct);
    };

    const getUsers = async () => {
      const statistics = await StatisticsService.getTotalUsers();
      setUsers(statistics);
    };

    const getOrders = async () => {
      const statistics = await StatisticsService.getTotalOrders();
      setOrders(statistics.count);
    };

    getProducts();
    getUsers();
    getOrders();
    getRevenue();
  }, []);

  // Get data for charts
  useEffect(() => {
    const getTopProducts = async () => {
      const statistics = await StatisticsService.getTopProducts();
      const categories = statistics.map((item) => item.productDetails.name);
      const quantities = statistics.map((item) => item.totalQuantitySold);

      setTopProductsOptionChart({
        ...topProductsOptionChart,
        series: [{ data: quantities }],
        options: {
          ...topProductsOptionChart.options,
          xaxis: {
            ...topProductsOptionChart.options.xaxis,
            categories: categories,
          },
        },
      });
    };

    const getMonthlyRevenue = async () => {
      const statistics = await StatisticsService.getMonthlyRevenue();
      const categories = statistics.map((item) => item.month + "/" + item.year);
      const revenue = statistics.map((item) => item.totalRevenue);
      setMonthlyRevenueOptionChart({
        ...monthlyRevenueOptionChart,
        series: [{ data: revenue }],
        options: {
          ...monthlyRevenueOptionChart.options,
          xaxis: {
            ...monthlyRevenueOptionChart.options.xaxis,
            categories: categories,
          },
        },
      });
    };

    getTopProducts();
    getMonthlyRevenue();
  }, []);

  return (
    <>
      <div className="mb-12 mt-4 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard title="Total Users" value={users} icon={<UserIcon />} />

        <StatisticsCard
          title="Total Products"
          value={products}
          color="bg-red-500"
          icon={<BookOpenIcon />}
        />

        <StatisticsCard
          title="Total Orders"
          value={orders}
          color="bg-red-500"
          icon={<DocumentTextIcon />}
        />

        <StatisticsCard
          title="Total Sales"
          value={sales}
          color="bg-red-500"
          icon={<CurrencyDollarIcon />}
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2">
        <StatisticsChart chart={topProductsOptionChart} title="Top Products" />

        <StatisticsChart
          chart={monthlyRevenueOptionChart}
          title="Monthly Revenue"
        />
      </div>

      <TableTopBestSeller />
    </>
  );
}
