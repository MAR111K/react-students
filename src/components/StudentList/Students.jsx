import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import axios from "axios";
import "./students.css";

import FormStudents from "../AddFormComponent/FormStudents";
import DeleteStudent from "../DeleteComponent/DeleteStudent";
import EditStudent from "../EditComponent/EditStudent";

export default function Students() {
  //Список студентов и метод для присваивания
  const [studentsList, setStudents] = useState([]);

  useEffect(() => {
    //Запрос на получение списка студентов
    const apiUrl = "http://localhost:8080/students";
    axios.get(apiUrl).then((resp) => {
      setStudents(resp.data);
    });
  }, []);

  const addStudentToList = (user) => {
    //Добавление нового студента при успешном запросе POST
    setStudents((prevArray) => [...prevArray, user]);
  };

  const deleteStudentFromList = (id) => {
    //Удаление студента при успешном запросе DELETE
    setStudents((prevArray) => prevArray.filter((elem) => elem.id !== id));
  };
  const editStudentFromList = (data) => {
    //Изменение студента при успешном запросе PUT
    let index = studentsList.findIndex((elem) => elem.id === data.id);
    setStudents([
      ...studentsList.slice(0, index),
      { ...data },
      ...studentsList.slice(index + 1),
    ]);
  };
  return (
    <div>
      <div className="students-toolbar">
        <FormStudents addNewStudent={addStudentToList} />
        <DeleteStudent deletedStudent={deleteStudentFromList} />
        <EditStudent editedStudent={editStudentFromList} />
      </div>
      <DataTable
        value={studentsList}
        tableStyle={{ minWidth: "50rem" }}
        header="Students"
      >
        <Column field="id" header="ID"></Column>
        <Column field="name" header="Name"></Column>
      </DataTable>
    </div>
  );
}
