import React, { FC } from 'react'
import classes from './TrainLoader.module.css'

const TrainLoader:FC = () => {
    return (
        <div className={classes.loader}>
            <div className={classes.train}></div>
            <div className={classes.track}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default TrainLoader;