import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeads, deleteLeads } from "../../actions/leads";

const Leads = () => {
  const leads = useSelector((state) => state.leads.leads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeads());
  }, [dispatch]);

  return (
    <>
      <h2>Leads</h2>
      <br />
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {leads.map((ele, index) => {
            return (
              <tr key={index}>
                <td>{ele.id}</td>
                <td>{ele.name}</td>
                <td>{ele.email}</td>
                <td>{ele.message}</td>
                <td>
                  <button
                    className="btn rounded btn-sm btn-danger"
                    onClick={() => dispatch(deleteLeads(ele.id))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Leads;
