/* eslint-disable */
// this is an auto generated file. This will be overwritten
import { API, graphqlOperation } from "aws-amplify";
import { createBooking,createVaccineChild, updateBooking } from "./mutations";
import { listBlogs, listBookings, listVaccinationCenters } from "./queries";

export const addBooking = async (child, date, vaccine, status,value,address) => {
  try {
    const response = await API.graphql(
      graphqlOperation(createBooking, {
        input: {
          childID: child,
          date: date,
          bookingVaccineId: vaccine,
          status: status,
          location:value,
          address:address,
        },
      })
    );
    return response;
  } catch (e) {
    console.log("ERROR IN CREATING BOOKING", e);
  }

  //getting Vaccine
};

export const getPendingBookings = async (childID) => {
  try {
    const response = await API.graphql({
      ...graphqlOperation(listBookings, {
        filter: { childID: { eq: childID }, status: { eq: "Pending" } },
      }),
      authMode: "API_KEY",
    });
    return response;
  } catch (e) {
    console.log("ERROR IN LISTING BOOKING", e);
  }
};

export const completeBookingQuery = async (bookingID, vaccineID,childID) => {
  try {
    const response = await API.graphql(
      graphqlOperation(updateBooking, {
        input: {
          bookingVaccineId: vaccineID,
          id: bookingID,
          status: "Completed",
        },
      })

    );
    const addVaccinesTaken = await API.graphql({
        ...graphqlOperation(createVaccineChild, {
          input: {
            vaccineID: vaccineID,
            childID: childID,
          },
        }),
        authMode: "API_KEY",
      });
      return addVaccinesTaken;

    } catch (e) {
    console.log("ERR", e);
    return false;
  }
};

export const getBlogsAsync = async (limit) => {
  try {
    const response = await API.graphql({
      ...graphqlOperation(listBlogs, {
        limit:limit
      }),
      authMode: "API_KEY",
    });
    return response.data.listBlogs.items;
  } catch (e) {
    console.log("ERROR IN LISTING BLOGS", e);
  }
};

export const getVaccinationCenters = async () => {
  try {
    const response = await API.graphql({
      ...graphqlOperation(listVaccinationCenters),
      authMode: "API_KEY",
    });
    return response.data.listVaccinationCenters.items;
  } catch (e) {
    console.log("ERROR IN LISTING VACCINATION CENTERS", e);
    return false;
  }
};

