import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";

const Alerts = () => {
  const alert = useAlert();
  const error = useSelector((state) => state.error);
  const message = useSelector((state) => state.messages);
  useEffect(() => {
    if (error.msg !== "") {
      alert.error(error.msg);
    }
    if (error.msg.username) {
      alert.error(error.msg.username.join());
    }
    if (message.deleteLead) {
      alert.success(message.deleteLead);
    }
    if (message.addLead) {
      alert.success(message.addLead);
    }
    if (message.passwordNotMatch) {
      alert.error(message.passwordNotMatch);
    }
  }, [error, message]);
  return <div />;
};

export default Alerts;
