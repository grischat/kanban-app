import Box from "@mui/material/Box";
import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddColumnBtn from "../Buttons/AddColumnBtn/AddColumnBtn";
import SubmitBtn from "../Buttons/SubmitBtn/SubmitBtn";
import { useState } from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import crossIcon from "../../assets/icon-cross.svg";
import './EditBoardModal.scss'
function EditBoardModal() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const currentBoard = useSelector(
    (state) => state.createColumnsReducer.currentBoard
  );
  
  return (
    <>
      <Button className="editBtn__container" onClick={handleOpen}>
        <p className="editBtn">Edit</p>
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className="container__modal">
          <h2 className="header__modal">Edit Board</h2>
          <Formik
            initialValues={{
              boardName: currentBoard.boardName,
              columns: currentBoard.columns || [""],
            }}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));

              dispatch({ type: "editBoard", payload: values });
              

              handleClose();
            }}
          >
            {({ values }) => (
              <Form className="create-column__modal">
                <label id="boardName__label" htmlFor="boardName">
                  Board Name*
                </label>
                <Field
                  id="boardName"
                  className="create-board__field"
                  name="boardName"
                  required
                ></Field>

                <FieldArray name="columns">
                  {({ push, remove }) => (
                    <div className="columns__container">
                      <label id="boardColumns__label" htmlFor="columns">
                        Columns
                      </label>
                      {values.columns.map((column, index) => (
                        <div key={index}>
                          <Field
                            className="create-board__field"
                            name={`columns.${index}`}
                            placeholder={`Column Name ${index + 1}`}
                          />

                          <button
                            id="btn-delete"
                            type="button"
                            onClick={() => remove(index)}
                          >
                            <img src={crossIcon} alt="Delete cross icon"></img>
                          </button>
                        </div>
                      ))}

                      <AddColumnBtn
                        className="button-addColumn__modal"
                        btnText={"+ Add New Column"}
                        onClick={() => push("")}
                      />
                    </div>
                  )}
                </FieldArray>

                <SubmitBtn btnText={"Edit Board"} />
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
}

export default EditBoardModal;
