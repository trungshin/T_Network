import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activationEmail } from "../redux/apiRequests";
import ShowSuccessMsg from "./Notification";

const ActivationEmail = () => {
	const { activationToken } = useParams();
	const dispatch = useDispatch();
	// const success = useSelector((state) => state.auth.activationEmail.message);
	// const [err, setErr] = useState("");
	const [success, setSuccess] = useState("");

	useEffect(() => {
		if (activationToken) {
			activationEmail(activationToken, dispatch, setSuccess);
		}
	}, [activationToken, dispatch]);

	return (
		<div>
			{/* {err && showErrMsg(err)} */}
			{success && ShowSuccessMsg(success)}
		</div>
	);
};

export default ActivationEmail;
