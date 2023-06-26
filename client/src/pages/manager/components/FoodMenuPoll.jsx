import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Tables from '../../../components/Tables/Tables';
import CreatePoll from '../../../components/poll/CreatePoll';
import { useDispatch, useSelector } from 'react-redux';
import {
  addVote,
  deletePoll,
  getAllPoll,
} from '../../../redux/slices/pollSlice';

const FoodMenuPoll = () => {
  const dispatch = useDispatch();
  const [createPoll, setCreatePoll] = React.useState(false);
  const { allPoll } = useSelector((state) => state.poll);
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];

  const handleDateChange = (e) => {
    dispatch(getAllPoll(e.target.value));
  };
  const handleDelete = (id) => {
    dispatch(deletePoll(id))
      .unwrap()
      .then(() => {
        dispatch(getAllPoll(formattedDate));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitVote = (pollId, value) => {
    const updatedValue = {
      ...value,
      pollId: pollId,
      vote: value.vote + 1,
      // voters: [...value.voters, user.email],
      voter: user.email,
    };
    dispatch(addVote(updatedValue))
      .unwrap()
      .then(() => {
        dispatch(getAllPoll(formattedDate));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(getAllPoll(formattedDate));
  }, []);

  return (
    <div>
      <CreatePoll show={createPoll} onHide={() => setCreatePoll(false)} />
      {/* Poll Info */}
      <div className="d-flex justify-content-between w-100 text-start ms-3 mt-3">
        {user.type === 'manager' && (
          <Button onClick={() => setCreatePoll(true)}>Create Poll</Button>
        )}
        <CreatePoll show={createPoll} onHide={() => setCreatePoll(false)} />
        <input
          type="date"
          // value={formData.date}
          onChange={handleDateChange}
        />
      </div>
      {/* Poll Table */}
      <div className="card-body text-white">
        <h4 className="text-center">Poll</h4>

        {allPoll.map((poll) => (
          <div key={poll._id}>
            <div className="d-flex justify-content-around py-2">
              <span>{poll.when}</span>
              <span>{poll.date}</span>
              {user.type === 'manager' && (
                <button onClick={() => handleDelete(poll._id)}>Remove</button>
              )}
            </div>
            <Tables
              columnDefs={[
                { headerName: 'Food Name', field: 'item_name', flex: 1 },
                { headerName: 'Vote', field: 'vote', flex: 1 },
                {
                  headerName: 'Actions',
                  field: '_id',
                  flex: 1,
                  resizable: true,
                  // width: 150,
                  cellRendererFramework: (params) => (
                    <div>
                      <button
                        disabled={poll.food_items.some((item) =>
                          item.voters.includes(user.email)
                        )}
                        onClick={() => submitVote(poll._id, params.data)}
                      >
                        Vote
                      </button>
                    </div>
                  ),
                },
              ]}
              rowData={poll.food_items}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodMenuPoll;
