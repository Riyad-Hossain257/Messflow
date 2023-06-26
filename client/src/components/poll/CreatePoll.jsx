import { Modal } from 'react-bootstrap';
import './poll.css';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { createPoll, getAllPoll } from '../../redux/slices/pollSlice';
import { toast } from 'react-toastify';
import { clearMessage } from '../../redux/slices/message';
const CreatePoll = (props) => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    when: '',
    date: '',
    food_items: [
      {
        item_name: '',
      },
    ],
  });

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      date: e.target.value,
    });
  };

  const handleItemNameChange = (index, e) => {
    const updatedFoodItems = [...formData.food_items];
    updatedFoodItems[index].item_name = e.target.value;
    setFormData({
      ...formData,
      food_items: updatedFoodItems,
    });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      food_items: [
        ...formData.food_items,
        {
          item_name: '',
        },
      ],
    });
  };

  const handleRemoveItem = (index) => {
    const updatedFoodItems = [...formData.food_items];
    updatedFoodItems.splice(index, 1);
    setFormData({
      ...formData,
      food_items: updatedFoodItems,
    });
  };

  const reset = () => {
    setFormData({
      when: '',
      date: '',
      food_items: [
        {
          item_name: '',
        },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearMessage());
    dispatch(createPoll(formData))
      .unwrap()
      .then(() => {
        toast.success('Successfully poll created');
        dispatch(getAllPoll(formattedDate));
        reset();
        props.onHide(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Poll
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          {/* Select  User */}
          <form className="form_poll" onSubmit={handleSubmit}>
            <div>
              <label>Date:</label>
              <input
                type="date"
                value={formData.date}
                onChange={handleDateChange}
                required
              />
            </div>

            <label for="shift">When Create Poll:</label>
            <select
              name="when"
              value={formData.when}
              onChange={(e) =>
                setFormData({ ...formData, when: e.target.value })
              }
              required
            >
              <option value="">Which time</option>
              <option value="morning">Morning</option>
              <option value="day">Day</option>
              <option value="night">Night</option>
            </select>

            {formData.food_items.map((item, index) => (
              <div key={index} className="dynamic_input">
                <input
                  type="text"
                  className="input_list"
                  name="item_name"
                  placeholder="Enter Food Name"
                  value={item.item_name}
                  onChange={(e) => handleItemNameChange(index, e)}
                  required
                />
                <span onClick={() => handleRemoveItem(index)}>
                  <i class="fa-solid fa-trash-can"></i>
                </span>
              </div>
            ))}
            <span onClick={handleAddItem} className="add_item_btn">
              <i class="fa-solid fa-plus"></i>
            </span>

            <button type="submit" className="poll_new_items">
              AddPoll
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreatePoll;
