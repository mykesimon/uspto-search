import classes from './ErrorMessage.module.css';

const ErrorMessage = ({ error }: { error: string }) => {
	return <div className={classes.ErrorMessage}>{error}</div>;
};

export default ErrorMessage;
