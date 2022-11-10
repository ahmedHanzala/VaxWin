/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
          Bookings {
          items {
            bookingVaccineId
            id
            status
            childID
            date
          }
        }
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        name
        phone_number
        children {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChild = /* GraphQL */ `
  query GetChild($id: ID!) {
    getChild(id: $id) {
      id
      name
      DOB
      image
      parent
      Bookings {
        items {
          id
          status
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
export const listChildren = /* GraphQL */ `
  query ListChildren(
    $filter: ModelChildFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChildren(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getVaccine = /* GraphQL */ `
  query GetVaccine($id: ID!) {
    getVaccine(id: $id) {
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
export const listVaccines = /* GraphQL */ `
  query ListVaccines(
    $id: ID
    $filter: ModelVaccineFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listVaccines(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        timingWeeks
        
        
      }
      
    }
  }
`;
export const listVaccinesFilter = /* GraphQL */ `
  query ListVaccines(
    $id: ID
    $filter: ModelVaccineFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listVaccines(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        timingWeeks
       
      }
    }
  }
`;

export const getBooking = /* GraphQL */ `
  query GetBooking($id: ID!) {
    getBooking(id: $id) {
      id
      date
      status
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
export const listBookings = /* GraphQL */ `
  query ListBookings(
    $filter: ModelBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        status
        Vaccine {
          id
          name
          timingWeeks
        }
        bookingVaccineId
        address
        location
      }
    }
  }
`;
export const getBlog = /* GraphQL */ `
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
      id
      title
      description
      category
      createdAt
      updatedAt
    }
  }
`;
export const listBlogs = /* GraphQL */ `
  query ListBlogs(
    $filter: ModelBlogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        image
        
      }
    }
  }
`;

export const listVaccinationCenters = /* GraphQL */ `
  query listVaccinationCenters(
    $filter: ModelVaccinationCenterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVaccinationCenters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
      address
      name
      id
        
      }
    }
  }
`;
export const getVaccineChild = /* GraphQL */ `
  query GetVaccineChild($id: ID!) {
    getVaccineChild(id: $id) {
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
export const listVaccineChildren = /* GraphQL */ `
  query ListVaccineChildren(
    $filter: ModelVaccineChildFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVaccineChildren(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        vaccineID
        childID
        vaccine {
          id
          name
          timingWeeks
          childID
          createdAt
          updatedAt
        }
       }
    }
  }
`;
