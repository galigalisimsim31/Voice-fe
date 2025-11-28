import React from "react";
import styles from "./index.module.css";
import detectionIcon from "../../assets/icons/layer_three.svg";
import validationIcon from "../../assets/icons/layer_three.svg";
import tickIcon from "../../assets/icons/correct_icon.svg";

const DetectionValidationPanel = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.panelContent}>
        {/* Left Box — Detection Methods */}
        <div className={styles.box}>
          <div className={styles.sectionHeader}>
            <img
              src={detectionIcon}
              alt="Detection"
              className={styles.sectionIcon}
            />
            <h4 className={styles.sectionTitle}>Detection Methods</h4>
          </div>
          <div className={styles.sectionBody}>
            <p>
              <strong>Header Analysis:</strong> Detected Cloudflare-specific
              headers (CF-Ray, CF-Cache-Status)
            </p>
            <p>
              <strong>Response Patterns:</strong> Identified WAF-specific error
              responses and rate limiting behavior
            </p>
            <p>
              <strong>Challenge Pages:</strong> Detected JavaScript challenge
              pages typical of Cloudflare WAF
            </p>
            <p>
              <strong>IP Reputation:</strong> Verified Cloudflare IP ranges in
              response headers
            </p>
          </div>
        </div>

        {/* Right Box — Validation Results */}
        <div className={styles.box}>
          <div className={styles.sectionHeader}>
            <img
              src={validationIcon}
              alt="Validation"
              className={styles.sectionIcon}
            />
            <h4 className={styles.sectionTitle}>Validation Results</h4>
          </div>
          <div className={styles.sectionBody}>
            <p>
              <strong>CF-Ray Header:</strong>
              <span>
                7878787878
                <span className={styles.present}>
                  Present
                  <img src={tickIcon} alt="tick" className={styles.tick} />
                </span>
              </span>
            </p>
            <p>
              <strong>CF-Cache-Status:</strong>
              <span>
                Identified WAF-specific error responses and rate limiting
                behavior
                <span className={styles.present}>
                  Present
                  <img src={tickIcon} alt="tick" className={styles.tick} />
                </span>
              </span>
            </p>
            <p>
              <strong>Server Header:</strong>
              <span>
                Identified WAF-specific error responses and rate limiting
                behavior
                <span className={styles.present}>
                  Present
                  <img src={tickIcon} alt="tick" className={styles.tick} />
                </span>
              </span>
            </p>
            <p>
              <strong>Challenge Detection:</strong>
              <span>
                Identified WAF-specific error responses and rate limiting
                behavior
                <span className={styles.confirmed}>
                  Confirmed
                  <img src={tickIcon} alt="tick" className={styles.tick} />
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectionValidationPanel;
