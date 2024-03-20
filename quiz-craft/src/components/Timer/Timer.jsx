import { useTimer } from 'react-timer-hook';
import PropTypes from "prop-types";


const Timer = ({ setOnStart, expiryTimestamp, onFinish }) => {
    const { hours, seconds, minutes } = useTimer({
        expiryTimestamp,
        onExpire: () => {
            setOnStart(false);
            onFinish();
        }
    });

    return (
        <>
            <div>
                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
        </>
    );
};

Timer.propTypes = {
    setOnStart: PropTypes.func.isRequired,
    expiryTimestamp: PropTypes.object.isRequired,
    onFinish: PropTypes.func.isRequired
}

export default Timer;