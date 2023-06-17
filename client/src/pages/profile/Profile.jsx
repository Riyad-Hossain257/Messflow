import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';

import Cards from '../../components/usuals/Cards';
import TableView from '../../components/Tables/Tables';
import userImg from '../../img/User_Circle.png';

import {
  createMeal,
  getMonthlyMeal,
  getMonthlyMealRate,
  getMonthlyUserBill,
} from '../../redux/slices/userSlice';
import { reloadingOn, reloadingOff } from '../../redux/slices/reload';
import { getMessInfo } from '../../redux/slices/messSlice';
import { clearMessage } from '../../redux/slices/message';

const Profile = () => {
  const dispatch = useDispatch();

  const { monthlyUserMeal, monthlyUserBill, monthlyMealRate } = useSelector(
    (state) => state.userInfo
  );
  console.log(monthlyUserBill);
  const { user } = useSelector((state) => state.auth);

  const { messInfo } = useSelector((state) => state.mess);
  const { isReload } = useSelector((state) => state.reload);

  const { message } = useSelector((state) => state.message);

  const [loading, setLoading] = useState(false);

  const initialValues = {
    morning: 0,
    day: 0,
    night: 0,
  };

  let mealCount = 0;
  for (let i = 0; i < monthlyUserMeal.length; i++) {
    mealCount +=
      monthlyUserMeal[i].morning +
      monthlyUserMeal[i].day +
      monthlyUserMeal[i].night;
  }

  const totalMBPayable =
    parseInt(messInfo.perSeatRent) +
    parseInt(messInfo.homeMaid) +
    parseInt(messInfo.wifi) +
    parseInt(messInfo.currentBill);

  const totalMBPaid =
    parseInt(monthlyUserBill.rent) +
    parseInt(monthlyUserBill.homeMaid) +
    parseInt(monthlyUserBill.wifi) +
    parseInt(monthlyUserBill.currentBill);

  const due = parseInt(totalMBPayable) - parseInt(totalMBPaid);

  const mealCost = parseFloat(monthlyMealRate.mealRate) * parseFloat(mealCount);

  const remainingMealMony =
    parseInt(monthlyUserBill.mealBudget) - parseInt(mealCost);

  const handleSubmit = (formValue, { resetForm }) => {
    setLoading(true);
    dispatch(reloadingOff());
    dispatch(createMeal(formValue))
      .then(() => {
        dispatch(reloadingOn());
        setLoading(false);
        toast.success('Successfully create');
        resetForm();
        // props.onHide(true);
      })
      .catch(() => setLoading(false));
  };

  function dateFormatter(params) {
    // return new Date(params.value).toUTCString("en-US", {
    //   timeZone: "Asia/Dhaka",
    //   hour: "numeric",
    //   hour12: true,
    // });
    console.log(new Date(params.value).toUTCString());
    return new Date(params.value).toUTCString();
  }

  useEffect(() => {
    dispatch(getMessInfo());
    dispatch(getMonthlyMeal());
    dispatch(getMonthlyMealRate());
    dispatch(getMonthlyUserBill());
  }, [isReload, dispatch]);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  return (
    <>
      <div className="container ">
        <div className="row d-flex align-items-center mb-5">
          <div className="col-md-4 text-center">
            <img alt="img_logo" src={userImg} width="200px" />
          </div>
          <div className="col-md-8">
            <div className="h1">{user.name}</div>
            <div className="h5">Mobile No: {user.phone}</div>
            <div className="h5">Email: {user.email}</div>
          </div>
        </div>

        <hr />

        <div className="row my-5">
          <div className="col-md-3">
            <Cards name="Total Payable (mess)" value={totalMBPayable} />
          </div>
          <div className="col-md-3">
            <Cards name="Total Paid (mess)" value={totalMBPaid} />
          </div>
          <div className="col-md-3">
            <Cards name="Due (mess)" value={due} />
          </div>
          <div className="col-md-3">
            <Cards
              name="Total Paid (meal)"
              value={monthlyUserBill.mealBudget}
            />
          </div>
          <div className="col-md-3">
            <Cards name="Total Meal Count (monthly)" value={mealCount} />
          </div>
          <div className="col-md-3">
            <Cards
              name="Meal Rate (monthly)"
              value={parseFloat(monthlyMealRate.mealRate).toFixed(2)}
            />
          </div>

          <div className="col-md-3">
            <Cards
              name="Total Meal Cost"
              value={parseFloat(mealCost).toFixed(2)}
            />
          </div>
          <div className="col-md-3">
            <Cards name="Remaining Money (meal)" value={remainingMealMony} />
          </div>
        </div>

        <hr />

        <div className="my-5 card bg-transparent clearfix p-4">
          <div className="h3 mb-4 text-uppercase">
            Enter meal information for today
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="row">
              <div className="card bg-transparent col-sm-4 p-3">
                <div className="h4">Morning</div>
                <div className="form-group">
                  <Field as="select" name="morning">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Field>
                </div>
              </div>
              <div className="card bg-transparent col-sm-4 p-3">
                <div className="h4">Day</div>
                <div className="form-group">
                  <Field as="select" name="day">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Field>
                </div>
              </div>
              <div className="card bg-transparent col-sm-4 p-3">
                <div className="h4">Night</div>
                <div className="form-group">
                  <Field as="select" name="night">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Field>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary col-sm-2 d-block my-3"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Submit</span>
              </button>
            </Form>
          </Formik>
        </div>

        <hr />

        <div className="card mt-4 bg-transparent">
          <div className="h3 m-4">Meal Details</div>
          <div className="card-body">
            <div>
              <TableView
                columnDefs={[
                  {
                    headerName: 'Date',
                    field: 'date',
                    valueFormatter: dateFormatter,
                    flex: 1,
                  },
                  { headerName: 'Morning', field: 'morning', flex: 1 },
                  { headerName: 'Day', field: 'day', flex: 1 },
                  {
                    headerName: 'Night',
                    field: 'night',
                    flex: 1,
                  },
                ]}
                rowData={monthlyUserMeal}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
