import React from 'react'
import './Button.css';

const Button = ({showAddTask, onClick}) => {

    //Style Variable - Background color is based on showAddTask value
    const style = {
        backgroundColor: showAddTask ? '#adb5bd' : '#0d6efd'
    }
    return (
        <div className='button'>
            {/*Text and background color is based on showAddTask value*/}
            <button onClick={onClick} className="btn" style={style}>{showAddTask ? 'Close' : 'Add'}</button>
        </div>
    )
}

export default Button
