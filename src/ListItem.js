import React from 'react';
import '../node_modules/font-awesome/css/font-awesome.min.css'

const ListItem = (props) => {
  return <li className="list-group-item">
    <button
      className="btn-update"
      onClick={props.editTodo}
    ><i className="fa fa-pencil"></i></button>
    {props.item.name}
    <button
      className="btn-delete"
      onClick={props.deleteTodo}
    ><i className="fa fa-remove"></i></button>
  </li>;
};

export default ListItem;
