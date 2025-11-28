import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from "./index.module.css";

import RightIcon from "../../assets/icons/right_icon.svg";

const CustomAlert = (props) => {
    const {
        customAlert = {},
    } = props;

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (customAlert?.message) {
            setVisible(true)
        }
        if (customAlert?.isShowAlways) return;
        const timer = setTimeout(() => {
            setVisible(false);
        }, 10000);

        return () => clearTimeout(timer); // cleanup on unmount
    }, [customAlert]);

    if (!visible || !customAlert?.message) return null;

    return (
        <>
            <div className={`${styles.custom_alert_outer} ${styles[`custom_alert_${customAlert?.type?.toLowerCase()}`]}`}>
                {customAlert?.type == "SUCCESS" && <div style={{ width: 24, height: 24, position: 'relative', overflow: 'hidden' }}>
                    <img src={RightIcon} alt="Right Icon" className={styles.alert_icon} />
                </div>}
                <div className={styles.alert_message}>{customAlert?.message}</div>
            </div>
            {customAlert?.description && <div className={`${styles.alert_description} ${styles['alert_description_' + customAlert?.type?.toLowerCase()]}`}>{customAlert?.description}</div>}
        </>
    );
};

CustomAlert.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
};

export default CustomAlert;
