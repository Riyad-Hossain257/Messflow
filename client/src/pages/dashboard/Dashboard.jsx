import React, { useEffect } from 'react';
import BarChart from '../../components/usuals/BarChart';
import Cards from '../../components/usuals/Cards';
import LineChart from '../../components/usuals/LineChart';
import TableView from '../../components/Tables/Tables';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMessInfo,
  getMonthlyBill,
  getUser,
} from '../../redux/slices/messSlice';
import {
  getDailyMeals,
  getMonthlyMealRate,
  getYearlyData,
} from '../../redux/slices/userSlice';
const Dashboard = () => {
  const dispatch = useDispatch();

  const { messInfo, allusers, monthlyBill } = useSelector(
    (state) => state.mess
  );
  const { monthlyMealRate, dailyMeals, yearlyData } = useSelector(
    (state) => state.userInfo
  );

  const [startDate, setStartDate] = React.useState(new Date());
  const month = startDate.getMonth() + 1;
  const year = startDate.getFullYear();

  const PayableMessBill =
    (parseInt(messInfo.perSeatRent) +
      parseInt(messInfo.homeMaid) +
      parseInt(messInfo.wifi) +
      parseInt(messInfo.currentBill)) *
    // parseInt(allusers.length);
    parseInt(messInfo.totalSeats);

  // console.log(messInfo.totalSeats);
  let collectedBill = 0;
  for (let i = 0; i < monthlyBill.length; i++) {
    collectedBill +=
      monthlyBill[i].rent +
      monthlyBill[i].homeMaid +
      monthlyBill[i].currentBill +
      monthlyBill[i].wifi;
  }

  const remainingMessBill = parseInt(PayableMessBill) - parseInt(collectedBill);

  let totalMealBudget = 0;
  for (let i = 0; i < monthlyBill.length; i++) {
    totalMealBudget += monthlyBill[i].mealBudget;
  }

  const remainginMealBudget =
    parseInt(totalMealBudget) - parseInt(monthlyMealRate.totalExpense);

  let dailyMorning = 0;
  for (let i = 0; i < dailyMeals.length; i++) {
    dailyMorning += dailyMeals[i].morning;
  }

  let dailyDay = 0;
  for (let i = 0; i < dailyMeals.length; i++) {
    dailyDay += dailyMeals[i].day;
  }

  let dailyNight = 0;
  for (let i = 0; i < dailyMeals.length; i++) {
    dailyNight += dailyMeals[i].night;
  }

  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Expense',
        data: yearlyData.yearlyExpenses,
        fill: false,

        backgroundColor: [
          'rgba(255, 99, 132, 0.9)',
          'rgba(54, 162, 235, 0.9)',
          'rgba(255, 206, 86, 0.9)',
          'rgba(75, 192, 192, 0.9)',
          'rgba(153, 102, 255, 0.9)',
          'rgba(255, 159, 64, 0.9)',
          'rgba(144, 70, 39, 0.9)',
          'rgba(204, 201, 51, 0.9)',
          'rgba(20, 235, 173, 0.9)',
          'rgba(155, 100, 149, 0.9)',
          'rgba(66, 252, 158, 0.9)',
          'rgba(195, 52, 120, 0.9)',
        ],
        tension: 0.1,
      },
      {
        label: 'Meal',
        data: yearlyData.yearlyMeal,
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.9)',
          'rgba(54, 162, 235, 0.9)',
          'rgba(255, 206, 86, 0.9)',
          'rgba(75, 192, 192, 0.9)',
          'rgba(153, 102, 255, 0.9)',
          'rgba(255, 159, 64, 0.9)',
          'rgba(144, 70, 39, 0.9)',
          'rgba(204, 201, 51, 0.9)',
          'rgba(20, 235, 173, 0.9)',
          'rgba(155, 100, 149, 0.9)',
          'rgba(66, 252, 158, 0.9)',
          'rgba(195, 52, 120, 0.9)',
        ],
        tension: 0.1,
      },
      {
        label: 'Meal Rate',
        data: yearlyData.yearlyMealRate,
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.9)',
          'rgba(54, 162, 235, 0.9)',
          'rgba(255, 206, 86, 0.9)',
          'rgba(75, 192, 192, 0.9)',
          'rgba(153, 102, 255, 0.9)',
          'rgba(255, 159, 64, 0.9)',
          'rgba(144, 70, 39, 0.9)',
          'rgba(204, 201, 51, 0.9)',
          'rgba(20, 235, 173, 0.9)',
          'rgba(155, 100, 149, 0.9)',
          'rgba(66, 252, 158, 0.9)',
          'rgba(195, 52, 120, 0.9)',
        ],
        tension: 0.1,
      },
    ],
  };

  useEffect(() => {
    dispatch(getMessInfo());
    dispatch(getUser());
    dispatch(getDailyMeals());
    dispatch(getMonthlyMealRate());
    dispatch(getYearlyData());
    dispatch(getMonthlyBill({ month, year }));
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-3">
            <Cards name="Total Payable Bill" value={PayableMessBill} />
          </div>
          <div className="col-md-3">
            <Cards name="Total Collected Bill" value={collectedBill} />
          </div>
          <div className="col-md-3">
            <Cards name="Remaining Bill" value={remainingMessBill} />
          </div>
          <div className="col-md-3">
            <Cards
              name="Utility Bill"
              value={parseInt(messInfo.currentBill) * allusers.length}
            />
          </div>
          <div className="col-md-3">
            <Cards name="Meal Budget" value={totalMealBudget} />
          </div>
          <div className="col-md-3">
            <Cards
              name="Total Mess Expense"
              value={monthlyMealRate.totalExpense}
            />
          </div>
          <div className="col-md-3">
            <Cards name="Remaining Money" value={remainginMealBudget} />
          </div>
          <div className="col-md-3">
            <Cards name="Total Meal" value={monthlyMealRate.totalMeal} />
          </div>
          <div className="col-md-6 mt-5">
            <BarChart data={data} />
          </div>
          <div className=" col-md-6 mt-5">
            <LineChart data={data} />
          </div>
          <div className=" col-12 my-5">
            <div className="row">
              <div className="col-md-4">
                <Cards name="Morning" value={dailyMorning} />
              </div>
              <div className="col-md-4">
                <Cards name="Day" value={dailyDay} />
              </div>
              <div className="col-md-4">
                <Cards name="Night" value={dailyNight} />
              </div>
              <TableView
                columnDefs={[
                  // { headerName: 'User Id', field: 'userId' },
                  {
                    headerName: 'User Name',
                    field: 'name',
                    flex: 1,
                  },
                  { headerName: 'Morning', field: 'morning', flex: 1 },
                  { headerName: 'Day', field: 'day', flex: 1 },
                  { headerName: 'Night', field: 'night', flex: 1 },
                ]}
                rowData={dailyMeals}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
