import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getLeads } from "../../actions/leads";

const Leads = () => {
  const leads = useSelector((state) => state.leads.leads);
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(getLeads())}>Click ME</button>;
};

export default Leads;
