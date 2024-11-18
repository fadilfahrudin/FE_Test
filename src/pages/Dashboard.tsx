import React, { useEffect, useMemo, useState } from 'react'
import {
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart, Pie, Sector, Cell,
} from 'recharts';
import { useGetLalinQuery } from '../redux/services/lalinService';
import { useGetGerbangsQuery } from '../redux/services/gerbangService';


const COLORS = ['#08448E', '#00C49F', '#FDCD00'];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#021526">{`${value} Lalin`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(${(percent * 100).toFixed(0)}%)`}
            </text>
        </g>
    );
};


const Dashboard: React.FC = () => {
    const { data: dataLalin, isSuccess } = useGetLalinQuery()
    const { data: dataGerbang, isSuccess: suceessDataGerbang } = useGetGerbangsQuery({ limit: 5, page: 1 })

    const [activeIndex, setActiveIndex] = useState(0);
    const [activeIndex2, setActiveIndex2] = useState(0);

    const onPieEnter = (_, index: number) => {
        setActiveIndex(index);
    };
    const onPieEnter2 = (_, index: number) => {
        setActiveIndex2(index);
    };

    const chartData = useMemo(() => {
        if (!isSuccess || !dataLalin?.data) return [];
        const paymentMethods = ["eBca", "eBri", "eBni", "eDKI", "eMandiri", "eMega", "eFlo", "eNobu", "Tunai"];
        const labels = ["BCA", "BRI", "BNI", "DKI", "Mandiri", "Mega", "Flo", "Nobu", "Tunai"];
        return paymentMethods.map((method, index) => ({
            name: labels[index],
            payment: dataLalin.data.rows.rows.reduce((sum, row) => sum + (row[method] || 0), 0),
        }));
    }, [isSuccess, dataLalin]);

    const pieChartData = useMemo(() => {
        if (!isSuccess || !dataLalin?.data) return [];
        const totalLalin = dataLalin.data.rows.rows.reduce(
            (acc, row) => {
                const totalPayment =
                    row.Tunai +
                    row.eMandiri +
                    row.eBri +
                    row.eBni +
                    row.eBca +
                    row.eNobu +
                    row.eDKI +
                    row.eMega +
                    row.eFlo;

                if (row.Shift === 1) acc.shift1 += totalPayment;
                if (row.Shift === 2) acc.shift2 += totalPayment;
                if (row.Shift === 3) acc.shift3 += totalPayment;

                return acc;
            },
            { shift1: 0, shift2: 0, shift3: 0 }
        );
        const total = totalLalin.shift1 + totalLalin.shift2 + totalLalin.shift3;
        return [
            { name: "Shift 1", payment: ((totalLalin.shift1 / total) * 100) },
            { name: "Shift 2", payment: ((totalLalin.shift2 / total) * 100) },
            { name: "Shift 3", payment: ((totalLalin.shift3 / total) * 100) },
        ];
    }, [isSuccess, dataLalin]);

    const ChartDataGerbang = useMemo(() => {

        if (dataGerbang && dataLalin) {
            dataGerbang.data.rows.rows.map((gerbang) => {
                const totalPembayaran = dataLalin.data.rows.rows
                    .filter((lalin) => lalin.IdGerbang === gerbang.id) // Filter data lalin berdasarkan IdGerbang
                    .reduce((total, current) => {
                        // Hitung total pembayaran dari metode pembayaran
                        const pembayaranGerbang =
                            current.eMandiri +
                            current.eBri +
                            current.eBni +
                            current.eBca +
                            current.eNobu +
                            current.eDKI +
                            current.eMega +
                            current.eFlo +
                            current.Tunai +
                            current.DinasOpr +
                            current.DinasMitra +
                            current.DinasKary;
                        return total + pembayaranGerbang;
                    }, 0);

                return {
                    NamaGerbang: gerbang.NamaGerbang,
                    TotalPembayaran: totalPembayaran,
                };
            })
        }

        return [];

    }, [isSuccess, dataLalin])

    console.log(ChartDataGerbang)


    return (
        <main className='h-full w-full float-right px-5 pb-12 '>
            <h1 className='text-2xl text-dark'>Dashboard</h1>
            <form className='flex gap-4 mt-5 w-3/12'>
                <input type="date" name="date" id="date" className='outline-none focus:outline-none focus:shadow-sm transition-all ease-in-out w-full p-3 rounded-md text-dark shadow-md' />
                <button type='submit' className='bg-yellow outline-none focus:outline-none focus:shadow-sm transition-all ease-in-out w-full px-4 py-3 rounded-md text-sm font-semibold transform uppercase  text-dark shadow-md'>Filter</button>
            </form>
            <section className='mt-5 w-full h-full flex gap-4'>
                <div className='flex flex-col gap-2 w-7/12'>
                    <div className='w-full h-[350px] rounded-lg bg-light shadow-md relative'>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart
                                data={chartData}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    bottom: 20,
                                    left: 20,
                                }}
                            >
                                <CartesianGrid stroke="#f5f5f5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="payment" barSize={20} fill="#08448E" />
                            </ComposedChart>
                        </ResponsiveContainer>
                        <h3 className='absolute top-1/4 left-2 writing-mode-vertical font-semibold'>Jumlah Lalin</h3>
                    </div>

                    <div className='w-5/6 h-[300px] rounded-lg bg-light shadow-md relative'>
                        {/* <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart
                                data={dataGerbang}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    bottom: 20,
                                    left: 20,
                                }}
                            >
                                <CartesianGrid stroke="#f5f5f5" />
                                <XAxis dataKey="name" className='text-xs' />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="driver" barSize={20} fill="#08448E" />
                            </ComposedChart>
                        </ResponsiveContainer> */}
                        <h3 className='absolute top-1/4 left-2 writing-mode-vertical font-semibold'>Jumlah Lalin</h3>

                    </div>
                </div>
                <div className='flex flex-col gap-2 w-5/12'>
                    <div className='w-full h-[300px] rounded-lg bg-light shadow-md relative p-3'>
                        <h3 className='block text-center font-semibold'>Total Lalin</h3>

                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={70}
                                    fill="#8884d8"
                                    dataKey="payment"
                                    onMouseEnter={onPieEnter}
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className='w-full h-[300px] rounded-lg bg-light shadow-md relative p-3'>
                        <h3 className='block text-center font-semibold'>Total Ruas</h3>

                        {/* <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    activeIndex={activeIndex2}
                                    activeShape={renderActiveShape2}
                                    data={dataGerbang}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={70}
                                    fill="#8884d8"
                                    dataKey="driver"
                                    onMouseEnter={onPieEnter2}
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer> */}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Dashboard