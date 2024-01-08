import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddColumnBtn from "../Buttons/AddColumnBtn/AddColumnBtn";
import SubmitBtn from "../Buttons/SubmitBtn/SubmitBtn";
import { useState } from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import { useDispatch } from "react-redux";
import "./CreateBoardModal.scss";
import boardIcon from "../../assets/icon-plus.svg";
import crossIcon from "../../assets/icon-cross.svg";
function CreateBoardModal() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <>
      <Button onClick={handleOpen}>
        <img src={boardIcon}></img>
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className="container__modal">
          <h2 className="header__modal">Add New Board</h2>
          <Formik
            initialValues={{
              boardName: "",
              columns: [""],
            }}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));

              dispatch({ type: "addBoard", payload: values });

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
                  placeholder='e.g Work'
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

                <SubmitBtn btnText={"Create New Board"} />
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
}

export default CreateBoardModal;
