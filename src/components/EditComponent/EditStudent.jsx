import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import axios from "axios";
import "./editForm.css";

export default function EditStudent({ editedStudent }) {
  //Флаг для открытия модального окна
  const [visible, setVisible] = useState(false);
  //Новое имя студента
  const [studentName, setNewStudentName] = useState("");
  //ID студента которого мы изменяем
  const [studentId, setNewStudentId] = useState(null);
  //Флаг для неактивности кнопки удаления
  const [disable, setDisabled] = useState(true);

  const editStudent = async () => {
    //Запрос на изменение
    const { data } = await axios.put(
      `http://localhost:8080/students/${studentId}`,
      studentName,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
    //Закрываем модальное окно
    setVisible(false);
    //Отправляем событие наверх для фильтрации массива
    editedStudent(data);
  };

  useEffect(() => {
    //Слежение за полем ID и новым именем для изменения флага активности кнопки
    if (studentId !== null && studentName !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [studentId, studentName]);

  return (
    <div className="card">
      <Button icon="pi pi-pencil" rounded outlined onClick={() => setVisible(true)} />
      <Dialog
        header="Header"
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
            label="Edit"
            icon="pi pi-pencil"
            onClick={() => editStudent()}
            disabled={disable}
            className="form__button"
          />
        </div>
      </Dialog>
    </div>
  );
}
