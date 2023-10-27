import { useEffect, useState } from "react";
import {Navigate, useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<any[]>([]);
    const [taskss, setTaskss] = useState([]);
    const [newTask, setNewTask] = useState("");
    const storedToken = localStorage.getItem("jwtToken");
    const UserId = localStorage.getItem("UserId");


    const handleCheckboxChange = (taskId:number) => {
        fetch(`http://localhost:5282/api/ToDo/ChangeTaskCompleted?id=${taskId}`, {
            method: "POST", // HTTP metodunu belirtin
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${storedToken}`
            },
            body: JSON.stringify({ id: taskId }), // JSON verisini gönderin
          })
            .then(response => response.json())
            .then(data => {
              // Yanıt verilerini işleyin
              console.log(data);
            })
            .catch(error => {
              // Hata durumu
              console.error(error);
            });
        
      };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.target.value);
    }

    const handleDelete = (taskId: number) => {
        fetch(`http://localhost:5282/api/ToDo/Delete?id=${taskId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${storedToken}`
            },
        })
            .then(response => {
                if (response.ok) {
                    // Başarılı yanıt
                    return response.json();
                } else {
                    // Hata durumu
                    throw new Error("Silme işlemi başarisiz.");
                }
            })
            .then(data => {
                // Silme işlemi başarıyla tamamlandı
                console.log(data);
            })
            .catch(error => {
                // Hata durumu
                console.error(error);
            });
    };

    const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {


            fetch("http://localhost:5282/api/ToDo/Save", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storedToken}`
                },
                body: JSON.stringify({
                    id: 0,
                    userId: UserId,
                    tasks: newTask,
                    isTaskCompleted: false
                })
            })
        }
    }

    useEffect(() => {
        if (storedToken == null) {
           return navigate("/login")}
        (
            async () => {
                const response = await fetch(`http://localhost:5282/api/ToDo/GetTodoListByUserId?id=${UserId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${storedToken}`
                    },
                    credentials: 'include',
                })
                const data = await response.json();
                setTasks(data);

            }

        )();

    })
    return (
        <div className="container">
            <div className="row">
                <h1 style={{ textAlign: 'center' }}>ToDo List</h1>
                <div className="col-md-12">
                    <div className="card card-white">
                        <div className="card-body">
                            <form action="javascript:void(0);">
                                <input
                                    type="text"
                                    className="form-control add-task"
                                    placeholder="New Task..."
                                    value={newTask}
                                    onChange={handleInputChange}
                                    onKeyPress={handleInputKeyPress} // Enter tuşuna basıldığında çalışacak
                                />
                            </form>
                            {/* <ul className="nav nav-pills todo-nav">
                            <li role="presentation" className="nav-item all-task active"><a href="#" className="nav-link">All</a></li>
                            <li role="presentation" className="nav-item active-task"><a href="#" className="nav-link">Active</a></li>
                            <li role="presentation" className="nav-item completed-task"><a href="#" className="nav-link">Completed</a></li>
                        </ul> */}
                            <div className="todo-list">
                                {tasks.map((task) => (
                                    <div className="todo-item">
                                    <div className="checker">
                                      <span className="">
                                        <input
                                          type="checkbox"
                                          checked={task.isTaskCompleted} // Checkbox işaretli mi değil mi?
                                          onChange={() => handleCheckboxChange(task.id)} // Checkbox işaret değiştiğinde işlem yap
                                        />
                                      </span>
                                    </div>
                                    <span key={task.id}>{task.tasks}</span>
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(task.id)}>Del</button>
                                  </div>

                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div>
        //     <h1>Todo List</h1>
        //     <ul>
        //  {tasks.map((task) => (
        //     <li key={task.id}>{task.tasks}</li>
        // ))}
        //     </ul>
        // </div>
    );
};

export default Home;