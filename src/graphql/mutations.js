/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateVaccine = /* GraphQL */ `
  mutation UpdateVaccine(
    $input: UpdateVaccineInput!
    $condition: ModelVaccineConditionInput
  ) {
    updateVaccine(input: $input, condition: $condition) {
      id
      name
      timingWeeks
      childID
      ChildrenVaccinated {
        items {
          id
          vaccineID
          childID
          createdAt
          updatedAt
          username
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteVaccine = /* GraphQL */ `
  mutation DeleteVaccine(
    $input: DeleteVaccineInput!
    $condition: ModelVaccineConditionInput
  ) {
    deleteVaccine(input: $input, condition: $condition) {
      id
      name
      timingWeeks
      childID
      ChildrenVaccinated {
        items {
          id
          vaccineID
          childID
          createdAt
          updatedAt
          username
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const createBooking = /* GraphQL */ `
  mutation CreateBooking(
    $input: CreateBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    createBooking(input: $input, condition: $condition) {
      id
      date
      status
      childID
      bookingVaccineId
      location
      address
      
    }
  }
`;
export const updateBooking = /* GraphQL */ `
  mutation UpdateBooking(
    $input: UpdateBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    updateBooking(input: $input, condition: $condition) {
      id
      date
      status
      childID
      bookingVaccineId
    
    }
  }
`;
export const deleteBooking = /* GraphQL */ `
  mutation DeleteBooking(
    $input: DeleteBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    deleteBooking(input: $input, condition: $condition) {
      id
      date
      childID
      status
      vaccine {
        id
        name
        timingWeeks
        childID
        ChildrenVaccinated {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      bookingVaccineId
      username
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      email
      name
      phone_number
      children {
        items {
          id
          name
          DOB
          image
          parent
          createdAt
          updatedAt
          username
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      email
      name
      phone_number
      children {
        items {
          id
          name
          DOB
          image
          parent
          createdAt
          updatedAt
          username
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      email
      name
      phone_number
      children {
        items {
          id
          name
          DOB
          image
          parent
          createdAt
          updatedAt
          username
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id 
      name
      description
      email 
    
    }
  }
`;


export const createChild = /* GraphQL */ `
  mutation CreateChild(
    $input: CreateChildInput!
    $condition: ModelChildConditionInput
  ) {
    createChild(input: $input, condition: $condition) {
      id
      name
      DOB
      image
      parent
    
    }
  }
`;
export const updateChild = /* GraphQL */ `
  mutation UpdateChild(
    $input: UpdateChildInput!
    $condition: ModelChildConditionInput
  ) {
    updateChild(input: $input, condition: $condition) {
      id
      name
      DOB
      image
      parent
      Bookings {
        items {
          id
          date
          childID
          createdAt
          updatedAt
          bookingVaccineId
          username
        }
        nextToken
      }
      VaccinesTaken {
        items {
          id
          name
          timingWeeks
          childID
          createdAt
          updatedAt
        }
        nextToken
      }
      vaccines {
        items {
          id
          vaccineID
          childID
          createdAt
          updatedAt
          username
        }
        nextToken
      }
      createdAt
      updatedAt
      username
    }
  }
`;
export const deleteChild = /* GraphQL */ `
  mutation DeleteChild(
    $input: DeleteChildInput!
    $condition: ModelChildConditionInput
  ) {
    deleteChild(input: $input, condition: $condition) {
      id
      name
      DOB
      
      }
     
  }
`;
export const createBlog = /* GraphQL */ `
  mutation CreateBlog(
    $input: CreateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    createBlog(input: $input, condition: $condition) {
      id
      title
      description
      category
      createdAt
      updatedAt
    }
  }
`;
export const updateBlog = /* GraphQL */ `
  mutation UpdateBlog(
    $input: UpdateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    updateBlog(input: $input, condition: $condition) {
      id
      title
      description
      category
      createdAt
      updatedAt
    }
  }
`;
export const deleteBlog = /* GraphQL */ `
  mutation DeleteBlog(
    $input: DeleteBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    deleteBlog(input: $input, condition: $condition) {
      id
      title
      description
      category
      createdAt
      updatedAt
    }
  }
`;
export const updateVaccineChild = /* GraphQL */ `
  mutation UpdateVaccineChild(
    $input: UpdateVaccineChildInput!
    $condition: ModelVaccineChildConditionInput
  ) {
    updateVaccineChild(input: $input, condition: $condition) {
      id
      vaccineID
      childID
      vaccine {
        id
        name
        timingWeeks
        childID
        ChildrenVaccinated {
          nextToken
        }
        createdAt
        updatedAt
      }
      child {
        id
        name
        DOB
        image
        parent
        Bookings {
          nextToken
        }
        VaccinesTaken {
          nextToken
        }
        vaccines {
          nextToken
        }
        createdAt
        updatedAt
        username
      }
      createdAt
      updatedAt
      username
    }
  }
`;
export const deleteVaccineChild = /* GraphQL */ `
  mutation DeleteVaccineChild(
    $input: DeleteVaccineChildInput!
    $condition: ModelVaccineChildConditionInput
  ) {
    deleteVaccineChild(input: $input, condition: $condition) {
      id
      vaccineID
      childID
      vaccine {
        id
        name
        timingWeeks
        childID
        ChildrenVaccinated {
          nextToken
        }
        createdAt
        updatedAt
      }
      child {
        id
        name
        DOB
        image
        parent
        Bookings {
          nextToken
        }
        VaccinesTaken {
          nextToken
        }
        vaccines {
          nextToken
        }
        createdAt
        updatedAt
        username
      }
      createdAt
      updatedAt
      username
    }
  }
`;
export const createVaccine = /* GraphQL */ `
  mutation CreateVaccine(
    $input: CreateVaccineInput!
    $condition: ModelVaccineConditionInput
  ) {
    createVaccine(input: $input, condition: $condition) {
      id
      name
      timingWeeks
      childID
      ChildrenVaccinated {
        items {
          id
          vaccineID
          childID
          createdAt
          updatedAt
          username
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createVaccineChild = /* GraphQL */ `
  mutation CreateVaccineChild(
    $input: CreateVaccineChildInput!
    $condition: ModelVaccineChildConditionInput
  ) {
    createVaccineChild(input: $input, condition: $condition) {
      id
      vaccineID
      vaccine {
        id               
        name
        timingWeeks
        createdAt
        updatedAt
      }
      createdAt

      
    }
  }
`;
