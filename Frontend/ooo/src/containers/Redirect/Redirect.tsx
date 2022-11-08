import { useLocation } from "react-router-dom";

const Redirect = () => {
	const location = useLocation();
	const { url } = location.state as { url: string };
	if (url) window.location.href = url;

	return null;
};

export default Redirect;
