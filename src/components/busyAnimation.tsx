import React from 'react';
import classes from './busyAnimation.module.css';
import classnames from 'classnames';

interface Props {
    in: boolean;
}

const BusyAnimation = (props: Props) => {
    return (
        <div className={props.in ? classes.animation : classnames(classes.animation, classes.hide)}>
            <div className={classes.center}>
                <div className={classes.loadingio_spinner_gear_hv23gdt13ja}><div className={classes.ldio_ez3lhyqb7hd}>
                    <div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div></div>
            </div>
        </div>
    )
}

export default BusyAnimation;