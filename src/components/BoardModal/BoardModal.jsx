import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, FieldArray, Form } from "formik";
import { Modal, Button } from "@mui/material";
import AddColumnBtn from "../Buttons/AddColumnBtn/AddColumnBtn";
import SubmitBtn from "../Buttons/SubmitBtn/SubmitBtn";
import crossIcon from "../../assets/icon-cross.svg";
import "./BoardModal.scss";

function BoardModal({ mode, buttonText, initialValues }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        className={`btn-${mode}`}
        onClick={handleOpen}
      >
        <p className={`btn__text-${mode}`}>{buttonText}</p>
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className="container__modal">
          <h2 className="header__modal">
            {mode === "create" ? "Add New Board" : "Edit Board"}
          </h2>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));

              if (mode === "create") {
                dispatch({ type: "addBoard", payload: values });
              } else {
                dispatch({ type: "editBoard", payload: values });
              }

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
                />

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

                <SubmitBtn
                  btnText={
                    mode === "create" ? "Create New Board" : "Edit Board"
                  }
                />
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
}

export default BoardModal;
