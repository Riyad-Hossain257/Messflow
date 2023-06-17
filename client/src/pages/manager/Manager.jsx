import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './manager.css';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import CreateMess from '../../components/createMess/CreateMess';
import CreateExpense from '../../components/createExpense/CreateExpense';
import TableView from '../../components/Tables/Tables';
import UpdateMess from '../../components/createMess/UpdateMess';
import CreateBill from '../../components/CreateBill/CreateBill';
import UpdateExpense from '../../components/createExpense/UpdateExpense';
import UpdateBill from '../../components/CreateBill/UpdateBill';
import FindUserDetails from '../../components/findUser/FindUserDetails';
import UpdateMeal from '../../components/meal/UpdateMeal';

import {
  getMessInfo,
  getMonthlyBill,
  getMonthlyExpense,
} from '../../redux/slices/messSlice';
import { getAllMonthlyMeal } from '../../redux/slices/userSlice';
import { reloadingOn, reloadingOff } from '../../redux/slices/reload';
import Confirmation from '../../components/confirmation/Confirmation';

const Manager = () => {
  const [confirmationShow, setConfirmationShow] = React.useState(false);
  const [removeId, setRemoveId] = React.useState(null);

  const [messModalShow, setMessModalShow] = React.useState(false);
  const [messUpdate, setMessUpdate] = React.useState(false);

  const [expModalShow, setExpModalShow] = React.useState(false);
  const [expUpdateShow, setExpUpdateShow] = React.useState(false);
  const [expDataUp, setExpDataUp] = React.useState({});

  const [createBillModel, setCreateBillModel] = React.useState(false);
  const [billUpdateShow, setBillUpdateShow] = React.useState(false);
  const [billDataUp, setBillDataUp] = React.useState({});

  const [mealUpdateShow, setMealUpdateShow] = React.useState(false);
  const [mealDataUp, setMealDataUp] = React.useState({});

  const [findUsers, setFindUsers] = React.useState(false);

  const [startDate, setStartDate] = React.useState(new Date());
  const month = startDate.getMonth() + 1;
  const year = startDate.getFullYear();

  const dispatch = useDispatch();

  const { messInfo, monthlyExpense, monthlyBill, isSuccess } = useSelector(
    (state) => state.mess
  );
  const { allMonthlyMeal } = useSelector((state) => state.userInfo);
  const { isReload } = useSelector((state) => state.reload);

  // const { message } = useSelector((state) => state.message);
  // console.log(allMonthlyMeal);

  // useEffect(() => {
  //   dispatch(clearMessage());
  // }, [dispatch]);

  function dateFormatter(params) {
    return new Date(params.value).toDateString('en-US', {
      timeZone: 'Asia/Dhaka',
    });
  }

  const monthlyBills = () => {
    dispatch(getMonthlyExpense({ month, year }));
    dispatch(getMonthlyBill({ month, year }));
    dispatch(getAllMonthlyMeal({ month, year }));
  };

  const handleExpenseUpdate = (exp) => {
    setExpDataUp(exp);
    setExpUpdateShow(true);
  };

  const handleBillUpdate = (bill) => {
    setBillDataUp(bill);
    setBillUpdateShow(true);
  };

  const handleMealUpdate = (meal) => {
    setMealDataUp(meal);
    setMealUpdateShow(true);
  };

  const handleRemoveBill = (id) => {
    setRemoveId(id);
    setConfirmationShow(true);
  };

  useEffect(() => {
    dispatch(getMessInfo());
  }, [isReload, isSuccess, dispatch]);

  useEffect(() => {
    dispatch(getMonthlyExpense({ month, year }));
    dispatch(getMonthlyBill({ month, year }));
    dispatch(getAllMonthlyMeal({ month, year }));
  }, [isReload, month, year, dispatch]);

  useEffect(() => {
    dispatch(reloadingOff());
  }, [dispatch]);
  return (
    <>
      <CreateMess show={messModalShow} onHide={() => setMessModalShow(false)} />
      <UpdateMess
        data={messInfo}
        show={messUpdate}
        onHide={() => setMessUpdate(false)}
      />
      <UpdateExpense
        data={expDataUp}
        show={expUpdateShow}
        onHide={() => setExpUpdateShow(false)}
      />
      <CreateExpense
        show={expModalShow}
        onHide={() => setExpModalShow(false)}
      />
      <CreateBill
        show={createBillModel}
        onHide={() => setCreateBillModel(false)}
      />
      <UpdateBill
        data={billDataUp}
        show={billUpdateShow}
        onHide={() => setBillUpdateShow(false)}
      />

      <UpdateMeal
        data={mealDataUp}
        show={mealUpdateShow}
        onHide={() => setMealUpdateShow(false)}
      />

      <FindUserDetails show={findUsers} onHide={() => setFindUsers(false)} />

      <Confirmation
        data={removeId}
        show={confirmationShow}
        pop_up_type="Remove"
        onHide={() => setConfirmationShow(false)}
      />

      <div className="moderatorWraper">
        <div className="container">
          <div className="row my-3">
            {/* MessInfo */}
            <div className="col-md-6 mb-3">
              <Button
                variant="primary"
                className="me-2"
                onClick={() => setMessModalShow(true)}
                disabled={Object.keys(messInfo).length !== 0}
              >
                Create Mess
              </Button>
              {/* <Button
                variant="outline-danger"
                className="me-2"
                // onClick={() => setMessModalShow(true)}
              >
                Remove Mess
              </Button> */}

              <Button
                variant="outline-success"
                onClick={() => setFindUsers(true)}
              >
                Users
              </Button>
              <div className="card bg-transparent text-white mt-4 ">
                <div className="card-body row">
                  <h5 className="card-title col-8 mb-5">Mess Informations</h5>
                  <div className="text-end col-4 mt-2">
                    <Button
                      variant="outline-warning"
                      onClick={() => setMessUpdate(true)}
                    >
                      Edit
                    </Button>
                  </div>
                  {Object.keys(messInfo).length !== 0 ? (
                    <>
                      <p className="card-text">Mess ID : {messInfo._id}</p>
                      <p className="card-text">
                        Mess Name : {messInfo.messName}
                      </p>
                      <p className="card-text ">
                        Total Seats : {messInfo.totalSeats}
                      </p>
                      <p className="card-text">
                        Per Seat Rent : {messInfo.perSeatRent}
                      </p>
                      <p className="card-text">
                        Home Maid Bill : {messInfo.homeMaid}
                      </p>
                      <p className="card-text">Wifi Bill : {messInfo.wifi}</p>
                      <p className="card-text">
                        Per User Electricity Bill : {messInfo.currentBill}
                      </p>
                    </>
                  ) : (
                    <>
                      <h5>Loading...</h5>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Expense Info */}
            <div className="col-md-6 bg-transparent ">
              <div className="d-flex  justify-content-around">
                <div>
                  <Button
                    variant="primary"
                    onClick={() => setExpModalShow(true)}
                  >
                    Create Expense
                  </Button>
                </div>
                <div className="input-container ">
                  <div>
                    <DatePicker
                      className="date-input-field"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="MMMM/yyyy"
                      showMonthYearPicker
                      withPortal
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => monthlyBills()}
                    >
                      &#x1F50E;
                    </button>
                  </div>
                </div>
              </div>
              {/* Expense Table */}
              <div className="card bg-transparent mt-4">
                <div className="card-body  expense_table">
                  <div>
                    <TableView
                      columnDefs={[
                        {
                          headerName: 'Date',
                          field: 'date',
                          valueFormatter: dateFormatter,
                        },
                        { headerName: 'Spender', field: 'spender' },
                        { headerName: 'Type', field: 'expType' },
                        { headerName: 'Amount', field: 'expAmount' },
                        {
                          headerName: 'Actions',
                          field: '_id',
                          resizable: true,
                          width: 120,
                          cellRendererFramework: (params) => (
                            <div>
                              <button
                                className="btn btn-outline-primary"
                                onClick={() => handleExpenseUpdate(params.data)}
                              >
                                update
                              </button>
                            </div>
                          ),
                        },
                      ]}
                      rowData={monthlyExpense}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 card bg-transparent">
            {/* Bill Info */}
            <div className="text-start ms-3 mt-3">
              <Button
                variant="success"
                onClick={() => setCreateBillModel(true)}
              >
                Create Bill
              </Button>
            </div>
            {/* Bill Table */}
            <div className="card-body">
              <h4 className="text-center">Bills</h4>
              <TableView
                columnDefs={[
                  {
                    headerName: 'Date',
                    field: 'date',
                    valueFormatter: dateFormatter,
                  },
                  // { headerName: 'phone', field: 'phone' },
                  { headerName: 'User Name', field: 'userName' },
                  { headerName: 'Rent', field: 'rent' },
                  {
                    headerName: 'Meal Budget',
                    field: 'mealBudget',
                  },
                  { headerName: 'Current Bill', field: 'currentBill' },
                  { headerName: 'Wifi', field: 'wifi' },
                  { headerName: 'Home Maid', field: 'homeMaid' },
                  {
                    headerName: 'Actions',
                    field: '_id',
                    resizable: true,
                    // width: 150,
                    cellRendererFramework: (params) => (
                      <div>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => handleBillUpdate(params.data)}
                        >
                          update
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleRemoveBill(params.data._id)}
                        >
                          Remove
                        </button>
                      </div>
                    ),
                  },
                ]}
                rowData={monthlyBill}
              />
            </div>
            {/* Meal Info */}
            <div className="card-body">
              <h4 className="text-center">All Meals</h4>
              <TableView
                columnDefs={[
                  {
                    headerName: 'Date',
                    field: 'date',
                    valueFormatter: dateFormatter,
                  },
                  // { headerName: 'User Id', field: 'userId' },
                  { headerName: 'User Name', field: 'name' },
                  { headerName: 'Morning', field: 'morning' },
                  {
                    headerName: 'Day',
                    field: 'day',
                  },
                  { headerName: 'Night', field: 'night' },
                  {
                    headerName: 'Actions',
                    field: '_id',
                    resizable: true,
                    // width: 150,
                    cellRendererFramework: (params) => (
                      <div>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => handleMealUpdate(params.data)}
                        >
                          update
                        </button>
                        {/* <button
                          className="btn btn-outline-danger"
                          onClick={() => dispatch(removeBill(params.data._id))}
                        >
                          Remove
                        </button> */}
                      </div>
                    ),
                  },
                ]}
                rowData={allMonthlyMeal}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
