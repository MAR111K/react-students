import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import axios from "axios";
import "./deleteForm.css";
export default function DeleteStudent({ deletedStudent }) {
  //Флаг для открытия модального окна
  const [visible, setVisible] = useState(false);
  //Флаг для неактивности кнопки удаления
  const [disable, setDisabled] = useState(true);
  //ID студента которого мы удаляем
  const [studentId, setStudentId] = useState(null);

  const deleteStudent = async () => {
    //Запрос для удаления студента
    await axios.delete(`http://localhost:8080/students/${studentId}`);
    //Закрываем модальное окно
    setVisible(false);
    //Отправляем событие наверх для фильтрации массива
    deletedStudent(studentId);
  };

  useEffect(() => {
    //Слежение за полем ID для изменения флага активности кнопки
    studentId !== null ? setDisabled(false) : setDisabled(true);
  }, [studentId]);

  return (
    <div className="card">
      <Button
        icon="pi pi-trash"
        rounded
        outlined
        severity="danger"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Delete Student"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="form">
          <div className="form__item">
            <label htmlFor="id">ID</label>
            <InputNumber value={studentId} onValueChange={(e) => setStudentId(e.value)} />
          </div>
          <Button
            disabled={disable}
            label="Delete"
            icon="pi pi-trash"
            severity="danger"
            onClick={() => deleteStudent()}
          />
        </div>
      </Dialog>
    </div>
  );
}
