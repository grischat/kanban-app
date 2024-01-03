import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import { useDispatch } from "react-redux";
import "../CreateColumnModal/CreateColumnModal.scss";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CreateColumnModal() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
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
                <label htmlFor="boardName">Board Name</label>
                <Field id="boardName" name="boardName" placeholder="e.g Work" />

                <FieldArray name="columns">
                  {({ push, remove }) => (
                    <div>
                      {values.columns.map((column, index) => (
                        <div key={index}>
                          <Field
                            name={`columns.${index}`}
                            placeholder={`Column Name ${index + 1}`}
                          />
                          <button type="button" onClick={() => remove(index)}>
                            Remove
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={() => push("")}>
                        Add Column
                      </button>
                    </div>
                  )}
                </FieldArray>

                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
}

export default CreateColumnModal;
