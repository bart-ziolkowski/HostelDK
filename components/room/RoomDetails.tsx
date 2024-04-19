import { IRoom } from "@/backend/models/room";
import React from "react";
import StarRatings from "react-star-ratings";

interface Props {
  data: {
    room: IRoom;
  };
}

export const RoomDetails = ({ data }: Props) => {
  const { room } = data;
  return (
    <div className="container container-fluid">
      <h2 className="mt-5">Lorem Ipsum Room</h2>
      <p>1234 Lorem Ipsum Street, Lorem City</p>

      <div className="ratings mt-auto mb-3">
        <StarRatings
          rating={room?.ratings}
          starRatedColor="#326647"
          numberOfStars={5}
          starDimension="18px"
          starSpacing="1px"
          name="rating"
        />
        <span className="no-of-reviews">(50 Reviews)</span>
      </div>

      <div style={{ width: "100%", height: "460px" }}>
        <img
          className="d-block m-auto"
          src="./images/default_room_image.jpg"
          alt="images/default_room_image.jpg"
        />
      </div>

      <div className="row my-5">
        <div className="col-12 col-md-6 col-lg-8">
          <h3>Description</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            fermentum nulla sit amet eros iaculis, id venenatis purus tempor.
            Sed bibendum bibendum tellus, sed suscipit elit condimentum nec.
            Aliquam id venenatis ipsum. Sed vel lorem vitae leo sodales iaculis.
            Sed vehicula, tellus in ultrices vestibulum, erat quam fermentum
            tortor, quis feugiat erat dolor in est.
          </p>

          <div className="features mt-5">
            <h3 className="mb-4">Features:</h3>
            <div className="room-feature">
              <i className="fa fa-cog fa-fw fa-users" aria-hidden="true"></i>
              <p>4 Guests</p>
            </div>
            <div className="room-feature">
              <i className="fa fa-cog fa-fw fa-bed" aria-hidden="true"></i>
              <p>2 Beds</p>
            </div>
            <div className="room-feature">
              <i className="fa fa-check text-success" aria-hidden="true"></i>
              <p>Breakfast</p>
            </div>
            <div className="room-feature">
              <i className="fa fa-check text-success" aria-hidden="true"></i>
              <p>Internet</p>
            </div>
            <div className="room-feature">
              <i className="fa fa-check text-success" aria-hidden="true"></i>
              <p>Air Conditioned</p>
            </div>
            <div className="room-feature">
              <i className="fa fa-check text-success" aria-hidden="true"></i>
              <p>Pets Allowed</p>
            </div>
            <div className="room-feature">
              <i className="fa fa-check text-success" aria-hidden="true"></i>
              <p>Room Cleaning</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="booking-card shadow p-4">
            <p className="price-per-night">
              <b>$100</b> / night
            </p>
            <hr />
            <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn form-btn mt-4 mb-5"
        data-bs-toggle="modal"
        data-bs-target="#ratingModal"
      >
        Submit Your Review
      </button>

      <div
        className="modal fade"
        id="ratingModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="ratingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ratingModalLabel">
                Submit Review
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                consectetur, mi nec tristique vehicula, elit tellus vulputate
                ex, nec bibendum libero elit at orci.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn my-3 form-btn w-100"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="reviews w-75 mb-5">
        <h3>3 Reviews</h3>
        <hr />

        <div className="review-card my-3">
          <div className="row">
            <div className="col-3 col-lg-1">
              <img
                src="./images/avatar.jpg"
                alt="John Doe"
                width="60"
                height="60"
                className="rounded-circle"
              />
            </div>
            <div className="col-9 col-lg-11">
              <div className="star-ratings">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-half"></i>
              </div>
              <p className="review_user mt-1">by John Doe</p>

              <p className="review_comment">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                consectetur, mi nec tristique vehicula, elit tellus vulputate
                ex, nec bibendum libero elit at orci.
              </p>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};
