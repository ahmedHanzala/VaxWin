import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listVaccinesFilter } from "../graphql/queries";
import { Checkbox } from "react-native-paper";
import { View, FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  removeVaccinesGiven,
  setVaccinesGiven,
} from "../Redux/Slices/AddChildSlice";
import { windowWidth } from "../assets/constants";
import colors from "../assets/colors/colors";
import { fonts } from "../assets/fonts/fonts";

let vaccineList = [];
const RenderItemVaccine = (props) => {
  const vaccinesInSlice = useSelector((state) => state.AddChild.vaccinesGiven);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const onPressResponse = (item) => {
    setChecked(!checked);
    if (checked === false) {
      var found = false;
      vaccinesInSlice.forEach((vaccine) => {
        vaccine.name === item.name ? (found = true) : (found = false);
      });
      console.log("ADDING::", vaccinesInSlice);
      console.log("FOUND:",found)
      if (found !== true) {
        dispatch(setVaccinesGiven(props.props.item));
      }
    } else {
      console.log("REMOVING::::", vaccinesInSlice);
      if (vaccinesInSlice.includes(props.props.item)) {
        dispatch(removeVaccinesGiven(props.props.item));
      }
    }
  };
  return (
    <Checkbox.Item
      label={props.props.item.name}
      labelStyle={[fonts.smallText, { color: colors.textDefault }]}
      status={checked ? "checked" : "unchecked"}
      onPress={onPressResponse}
      style={{ borderRadius: 30, width: windowWidth / 1.3 }}
    />
  );
};
const SelectVaccines = ({ date }) => {
  const [loading, setLoading] = useState(false);
  const [dateState, setDateState] = useState(date);

  const calculateAge = (birthDate) => {
    //get bday get todays date
    //minus both
    //check age in weeks
    //run query to list all the vaccine
    //filter and show only those vaccines which can be given to child
    var dob = new Date(birthDate);

    //check user provide input or not
    if (birthDate === null || birthDate === "") {
      console.log("ERROR date is null");
      return false;
    } else {
      //extract the year, month, and date from user date input
      var dobYear = dob.getYear();
      var dobMonth = dob.getMonth();
      var dobDate = dob.getDate();
      var now = new Date();
      var currentYear = now.getYear();
      var currentMonth = now.getMonth();
      var currentDate = now.getDate();
      var weekAge = 0;
      var age = {};

      //get years
      var yearAge = currentYear - dobYear;

      //get months
      if (currentMonth >= dobMonth)
        //get months when current month is greater
        var monthAge = currentMonth - dobMonth;
      else {
        yearAge--;
        var monthAge = 12 + currentMonth - dobMonth;
      }

      //get days
      if (currentDate >= dobDate)
        //get days when the current date is greater
        var dateAge = currentDate - dobDate;
      else {
        monthAge--;
        var dateAge = 31 + currentDate - dobDate;

        if (monthAge < 0) {
          monthAge = 11;
          yearAge--;
        }
      }
      //group the age in a single variable
      weekAge = (365 * yearAge + 30 * monthAge + dateAge) / 7;
      age = {
        years: parseInt(yearAge),
        months: monthAge,
        weeks: weekAge,
        days: dateAge,
      };
      console.log("AGE IS::", age);
      return Math.ceil(weekAge);
    }
  };
  const getVaccines = async () => {
    setLoading(true);

    const age = calculateAge(dateState);
    console.log("AGE", age);
    console.log("TYPEOF", typeof age);
    const response = await API.graphql({
      ...graphqlOperation(listVaccinesFilter, {
        filter: { timingWeeks: { le: age } },
      }),
      authMode: "API_KEY",
    });
    vaccineList = response.data.listVaccines.items;
    setLoading(false);
  };
  useEffect(() => {
    getVaccines();
  }, [dateState]);

  return loading ? null : (
    <View
      style={{
        flex: 1,
        width: windowWidth - (16 * 2 + 10 * 2 + 20),
      }}
    >
      <FlatList
        renderItem={(props) => <RenderItemVaccine props={props} />}
        data={vaccineList}
      />
    </View>
  );
};

export default SelectVaccines;
