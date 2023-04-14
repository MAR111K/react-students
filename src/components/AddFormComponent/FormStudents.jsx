import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

import axios from "axios";
import "./form.css";

export default function FormStudents({ addNewStudent }) {
  //Флаг для открытия модального окна
  const [visible, setVisible] = useState(false);
  //Новое имя студента
  const [studentName, setNewStudentName] = useState("");
  //ID студента которого мы изменяем
  const [studentId, setNewStudentId] = useState(null);
  //Флаг для неактивности кнопки удаления
  const [disable, setDisabled] = useState(true);

  useEffect(() => {
    //Слежение за полем ID и новым именем для изменения флага активности кнопки
    if (studentId !== null && studentName !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [studentId, studentName]);

  const addStudent = async () => {
    //Запрос на добавление
    const { data } = await axios.post(
      "http://localhost:8080/students",
      {
        id: studentId,
        name: studentName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //Закрываем модальное окно
    setVisible(false);
    //Отправляем событие наверх для фильтрации массива
    addNewStudent(data);
  };

  return (
    <div className="card">
      <Button label="Add" icon="pi pi-plus" onClick={() => setVisible(true)} />
      <Dialog
        header="Add New student"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="form">
          <div className="form__item">
            <label htmlFor="id">ID</label>

            <InputNumber
              value={studentId}
              onValueChange={(e) => setNewStudentId(e.value)}
            />
          </div>
          <div className="form__item">
            <label htmlFor="username">Username</label>

            <InputText
              value={studentName}
              onChange={(e) => setNewStudentName(e.target.value)}
            />
          </div>
          <Button
            disabled={disable}
            label="Save"
            icon="pi pi-plus"
            onClick={() => addStudent()}
            className="form__button"
          />
        </div>
      </Dialog>
    </div>
  );
}
