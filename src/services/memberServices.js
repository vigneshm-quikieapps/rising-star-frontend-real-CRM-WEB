import axios from "./axiosIntance";

const fetchgetAllErolmentOfAMember = async (params) => {
  console.log(params);
  const response = await axios.post(
    "/enrolments/of-a-member-in-a-business",
    params
  );
  return response;
};

export default fetchgetAllErolmentOfAMember;
