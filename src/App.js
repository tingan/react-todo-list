import React, {Component} from 'react';
import './App.css';

import ListItem from './ListItem';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: '',
      searchTodo: '',
      editing: false,
      editingIndex: null,
      notification: null,
      todos: [{
        id: 1, name: 'Play golf'
      }, {
        id: 2, name: 'Buy some clothes'
      }, {
        id: 3, name: 'Buy milk'
      }, {
        id: 4, name: 'Watch TV'
      }],
      filters: [],
      filtering: false,
    };


    this.alert = this.alert.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(event) {
    this.setState({
      newTodo: event.target.value
    });
  }

  handleSearch(event) {
    this.setState({
      searchTodo: event.target.value
    });
    if (event.target.value.trim().length > 0) {
      let filtered_arr = this.state.todos.filter(function(item){
        return item.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
      });
      console.log(filtered_arr);
      this.setState( {
        filtering: true,
        editing: false,
        filters: filtered_arr
      });
    }
    else {
      this.setState( {
        filtering: false,
        editing: false,
        filters: []
      });
    }

  }


  generateTodoId() {
    const lastTodo = this.state.todos[this.state.todos.length - 1];
    if (lastTodo) {
      return lastTodo.id + 1;
    }

    return 1;
  }

  addTodo() {
    const newTodo = {
      name: this.state.newTodo,
      id: this.generateTodoId()
    };

    const todos = this.state.todos;
    todos.push(newTodo);

    this.setState({
      todos: todos,
      newTodo: ''
    });
    this.alert('Todo added successfully.');
  }

  editTodo(index) {
    index = this.state.todos.findIndex(x => x.id == index);
    const todo = this.state.todos[index];
    this.setState({
      editing: true,
      filtering: false,
      searchTodo: '',
      newTodo: todo.name,
      editingIndex: index
    });
  }

  updateTodo() {
    const todo = this.state.todos[this.state.editingIndex];

    todo.name = this.state.newTodo;

    const todos = this.state.todos;
    todos[this.state.editingIndex] = todo;
    this.setState({
      todos: todos,
      editing: false,
      editingIndex: null,
      newTodo: ''
    });
    this.alert('Todo updated successfully.');
  }

  alert(notification) {
    this.setState({
      notification
    });

    setTimeout(() => {
      this.setState({
        notification: null
      });
    }, 2000);
  }

  deleteTodo(index) {
    index = this.state.todos.findIndex(x => x.id == index);
    const todos = this.state.todos;
    delete todos[index];

    this.setState({
      todos: todos,
      editing: false,
      filtering: false,
      searchTodo: '',
    });
    this.alert('Todo deleted successfully.');
  }
  render() {
    return (
      <div className="App">
        <header className="App-top">
          <h1 className="App-title">React ToDo List</h1>
        </header>
        <div className="container">

          {
            this.state.notification &&
            <div className="alert mt-3 alert-success">
              <p className="text-center">{this.state.notification}</p>
            </div>
          }
          <div className="form-group">

          <input
            type="text"
            name="todo"
            className="my-4 form-control"
            placeholder="Add a new todo"
            onChange={this.handleChange}
            value={this.state.newTodo}
          />
          </div>
          <button
            onClick={this.state.editing ? this.updateTodo : this.addTodo}
            className="btn-add mb-3 form-control"
            disabled={this.state.newTodo.trim().length < 1}
          >
            {this.state.editing ? 'Update todo' : 'Add todo'}
          </button>
          {
            (!this.state.editing && !this.state.filtering) &&
             <div>
            <ul className="list-group">
              {this.state.todos.map((item, index) => {
                return <ListItem
                  key={item.id}
                  item={item}
                  editTodo={() => {
                    this.editTodo(item.id);
                  }}
                  deleteTodo={() => {
                    this.deleteTodo(item.id);
                  }}
                />;
              })}
            </ul>
            <input
            type="text"
            name="search-input"
            className="form-control form-search"
            placeholder="Search todos"
            onChange={this.handleSearch}
            value={this.state.searchTodo}
            />
             </div>
          }
          {
            (!this.state.editing && this.state.filtering) &&
              <div>
                <div>
                  <ul className="list-group">
                    {this.state.filters.map((item, index) => {
                      return <ListItem
                        key={item.id}
                        item={item}
                        editTodo={() => {
                          this.editTodo(item.id);
                        }}
                        deleteTodo={() => {
                          this.deleteTodo(item.id);
                        }}
                      />;
                    })}
                  </ul>
                  <input
                    type="text"
                    name="search-input"
                    className="form-control form-search"
                    placeholder="Search todos"
                    onChange={this.handleSearch}
                    value={this.state.searchTodo}
                  />
                </div>
              </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
