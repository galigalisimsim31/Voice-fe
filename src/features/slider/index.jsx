import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from "./index.module.css";
import { Box, Slider, Typography } from '@mui/material';

const MuiSlider = ({
    min = 0,
    max = 100,
    step = 1,
    label = "Min",
    value,
    setValue,
    isRangeSlider = false
}) => {

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box width="100%" display="flex" gap={2}>
            <Slider
                value={value}
                onChange={handleChange}
                min={min}
                max={max}
                step={step}
                color="secondary"
                sx={{
                    '& .MuiSlider-thumb': {
                        width: 15,  // Change the width of the thumb
                        height: 15, // Change the height of the thumb
                        borderRadius: '50%', // Make the thumb circular
                    },
                    ml: 1
                }}
            />
            <Typography display="flex" gap={2} className={styles.slider_heading} sx={{ color: 'var(--text-color)' }}>
                <label>{isRangeSlider ? `${value[0]},${value[1]}` : value}</label>
                <label>{label}</label>
            </Typography>
        </Box>
    );
};

MuiSlider.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
};

export default MuiSlider;
