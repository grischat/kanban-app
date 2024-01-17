import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, FieldArray, Form } from "formik";
import { Modal, Button } from "@mui/material";
import CloseModal from "../CloseModal/CloseModal";
import AddColumnBtn from "../Buttons/AddColumnBtn/AddColumnBtn";
import SubmitBtn from "../Buttons/SubmitBtn/SubmitBtn";
import crossIcon from "../../assets/icon-cross.svg";
import "./BoardModal.scss";

function BoardModal({ mode, buttonText, initialValues }) {
  const [open, setOpen] = useState(false);
  const [openCloseModal, setOpenCloseModal] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.switchThemeReducer.theme);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpenCloseModal(true);
  };

  const handleCancelClick = () => {
    setOpenCloseModal(false);
    setOpen(true);
  };

  const handleConfirmClick = () => {
    setOpenCloseModal(false);
    setOpen(false);
  };

  return (
    <>
      <Button className={`btn-${mode}`} onClick={handleOpen}>
        <p className={`btn__text-${mode}`}>{buttonText}</p>
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className={`container__modal-${theme}`}>
          <h2 className={`header__modal-${theme}`}>
            {mode === "create" ? "Add New Board" : "Edit Board"}
          </h2>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              try {
                if (mode === "create") {
                  dispatch({ type: "addBoard", payload: values });
                } else {
                  dispatch({ type: "editBoard", payload: values });
                }

                // !!! We need to simulate a delay to ensure the form is not unmounted immediately
                await new Promise((resolve) => setTimeout(resolve, 500));

                // !!! Close the modal after successful submission
                handleConfirmClick();
              } catch (error) {
                console.error("Submission error:", error);
              }
            }}
          >
            {(
              { values, isSubmitting } // isSubmitting variable in the Formik component represents a boolean flag indicating whether the form is currently in the process of being submitted
            ) => (
              <Form className="create-column__modal">
                <label id="boardName__label" htmlFor="boardName">
                  Board Name*
                </label>
                <Field
                  id={`boardName-${theme}`}
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
                            className={`create-board__field-${theme}`}
                            name={`columns.${index}`}
                            placeholder={`Column Name ${index + 1}`}
                          />

                          <button
                            id="btn-delete"
                            type="button"
                            onClick={() => remove(index)}
                          >
                            <img src={crossIcon} alt="Delete cross icon" />
                          </button>
                        </div>
                      ))}

                      <AddColumnBtn
                        className={`button-addColumn__modal-${theme}`}
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
                  disabled={isSubmitting}
                />
              </Form>
            )}
          </Formik>
          <CloseModal
            open={openCloseModal}
            onClose={() => setOpenCloseModal(false)}
            handleCancelClick={handleCancelClick}
            handleConfirmClick={handleConfirmClick}
          />
        </div>
      </Modal>
    </>
  );
}

export default BoardModal;
