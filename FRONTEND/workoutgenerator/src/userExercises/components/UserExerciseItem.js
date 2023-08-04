import React from "react";
import { Link } from 'react-router-dom';

import './UserExerciseItem.css';

import Card from '../../shared/components/UIElements/Card';
import Button from "../../shared/components/FormElements/Button";

const UserExerciseItem = props => {
    return (
        <li className="user-exercise-item">
            <div >
                <Card className='user-exercise-item__content'>
                <div className='user-exercise-item__info'>
                    <h2>Exercise name: {props.name}</h2>
                    <h3>User: {props.user}</h3>
                    <h4>Exercise lift weight: {props.liftWeight}</h4>
                    <h4>exercise repetition: {props.repetition}</h4>
                </div>
                <div className="user-exercise-item__actions">
                    <Button to={`/userExercise/${props.id}`}>EDIT</Button>
                    <Button danger>DELETE</Button>
                </div>
                </Card>
            </div>

        </li>
    )

};


export default UserExerciseItem;