/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($username: String) {
    onCreateUser(username: $username) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($username: String) {
    onUpdateUser(username: $username) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($username: String) {
    onDeleteUser(username: $username) {
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
export const onCreateChild = /* GraphQL */ `
  subscription OnCreateChild($username: String) {
    onCreateChild(username: $username) {
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
export const onUpdateChild = /* GraphQL */ `
  subscription OnUpdateChild($username: String) {
    onUpdateChild(username: $username) {
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
export const onDeleteChild = /* GraphQL */ `
  subscription OnDeleteChild($username: String) {
    onDeleteChild(username: $username) {
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
export const onCreateVaccine = /* GraphQL */ `
  subscription OnCreateVaccine {
    onCreateVaccine {
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
export const onUpdateVaccine = /* GraphQL */ `
  subscription OnUpdateVaccine {
    onUpdateVaccine {
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
export const onDeleteVaccine = /* GraphQL */ `
  subscription OnDeleteVaccine {
    onDeleteVaccine {
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
export const onCreateBooking = /* GraphQL */ `
  subscription OnCreateBooking($username: String) {
    onCreateBooking(username: $username) {
      id
      date
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
      createdAt
      updatedAt
      bookingVaccineId
      username
    }
  }
`;
export const onUpdateBooking = /* GraphQL */ `
  subscription OnUpdateBooking($username: String) {
    onUpdateBooking(username: $username) {
      id
      date
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
      createdAt
      updatedAt
      bookingVaccineId
      username
    }
  }
`;
export const onDeleteBooking = /* GraphQL */ `
  subscription OnDeleteBooking($username: String) {
    onDeleteBooking(username: $username) {
      id
      date
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
      createdAt
      updatedAt
      bookingVaccineId
      username
    }
  }
`;
export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog {
    onCreateBlog {
      id
      title
      description
      category
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog {
    onUpdateBlog {
      id
      title
      description
      category
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog {
    onDeleteBlog {
      id
      title
      description
      category
      createdAt
      updatedAt
    }
  }
`;
export const onCreateVaccineChild = /* GraphQL */ `
  subscription OnCreateVaccineChild($username: String) {
    onCreateVaccineChild(username: $username) {
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
export const onUpdateVaccineChild = /* GraphQL */ `
  subscription OnUpdateVaccineChild($username: String) {
    onUpdateVaccineChild(username: $username) {
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
export const onDeleteVaccineChild = /* GraphQL */ `
  subscription OnDeleteVaccineChild($username: String) {
    onDeleteVaccineChild(username: $username) {
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
